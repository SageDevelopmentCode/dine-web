import { createClient } from '@/lib/supabase/server';
import {
  UserEpipenCard,
  UserEpipenInstructionWithDetails,
} from '@/lib/supabase/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    // Get user_id from slug
    const { data: urlData, error: urlError } = await supabase
      .schema('web_profiles')
      .from('user_web_profile_urls')
      .select('user_web_profile_id')
      .eq('slug', slug)
      .single();

    if (urlError || !urlData) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const { data: profileData, error: profileError } = await supabase
      .schema('web_profiles')
      .from('user_web_profiles')
      .select('user_id')
      .eq('id', urlData.user_web_profile_id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const userId = profileData.user_id;

    // Get user epipen card
    const { data: epipenCardData, error: epipenCardError } = await supabase
      .schema('epipen')
      .from('user_epipen_cards')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (epipenCardError) {
      throw new Error(`Failed to fetch epipen card: ${epipenCardError.message}`);
    }

    // Get all default epipen instructions
    const { data: allDefaultEpipenInstructions, error: defaultEpipenInstructionsError } = await supabase
      .schema('epipen')
      .from('epipen_instructions')
      .select('*')
      .order('sort_order');

    if (defaultEpipenInstructionsError) {
      throw new Error(`Failed to fetch default epipen instructions: ${defaultEpipenInstructionsError.message}`);
    }

    // Get user's modified/deleted epipen instructions
    const { data: userEpipenInstructionsRaw, error: userEpipenInstructionsError } = await supabase
      .schema('epipen')
      .from('user_epipen_instructions')
      .select('*')
      .eq('user_id', userId);

    if (userEpipenInstructionsError) {
      throw new Error(`Failed to fetch user epipen instructions: ${userEpipenInstructionsError.message}`);
    }

    // Create a map of instruction_key -> user modification for quick lookup
    const userEpipenInstructionsMap = new Map((userEpipenInstructionsRaw || []).map(ui => [ui.instruction_key, ui]));

    // Merge: for each default instruction, check if user has modified/deleted it
    const mergedDefaultEpipenInstructions: UserEpipenInstructionWithDetails[] = (allDefaultEpipenInstructions || [])
      .map((defaultInstruction) => {
        const userModification = userEpipenInstructionsMap.get(defaultInstruction.instruction_key);

        if (userModification) {
          // User has modified this instruction
          return {
            id: userModification.id,
            created_at: userModification.created_at,
            user_id: userModification.user_id,
            instruction_key: userModification.instruction_key,
            instruction_text: userModification.instruction_text,
            icon_type: userModification.icon_type,
            sort_order: userModification.sort_order,
            is_deleted: userModification.is_deleted,
            epipen_instruction: defaultInstruction
          };
        } else {
          // User hasn't modified this instruction, create a virtual user instruction with default values
          return {
            id: `default-${defaultInstruction.id}`,
            created_at: defaultInstruction.created_at,
            user_id: userId,
            instruction_key: defaultInstruction.instruction_key,
            instruction_text: defaultInstruction.instruction_text,
            icon_type: defaultInstruction.icon_type,
            sort_order: defaultInstruction.sort_order,
            is_deleted: false,
            epipen_instruction: defaultInstruction
          };
        }
      });

    // Get custom instructions
    const customEpipenInstructions: UserEpipenInstructionWithDetails[] = (userEpipenInstructionsRaw || [])
      .filter(ui => ui.instruction_key.startsWith('custom-'))
      .map((customInstruction) => ({
        id: customInstruction.id,
        created_at: customInstruction.created_at,
        user_id: customInstruction.user_id,
        instruction_key: customInstruction.instruction_key,
        instruction_text: customInstruction.instruction_text,
        icon_type: customInstruction.icon_type,
        sort_order: customInstruction.sort_order,
        is_deleted: customInstruction.is_deleted,
        epipen_instruction: null
      }));

    // Combine and filter
    const epipenInstructionsData: UserEpipenInstructionWithDetails[] = [...mergedDefaultEpipenInstructions, ...customEpipenInstructions]
      .filter(instruction => !instruction.is_deleted)
      .sort((a, b) => a.sort_order - b.sort_order);

    return NextResponse.json({
      epipenCard: epipenCardData,
      epipenInstructions: epipenInstructionsData,
    });
  } catch (error) {
    console.error('Error fetching epipen data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch epipen data' },
      { status: 500 }
    );
  }
}
