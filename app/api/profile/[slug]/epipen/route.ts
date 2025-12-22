import { createClient } from '@/lib/supabase/server';
import { getEpipenCardData } from '@/lib/supabase/epipen/get_epipen_card_data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get user_id from query parameter
    const userId = request.nextUrl.searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'user_id query parameter is required' },
        { status: 400 }
      );
    }

    // First, get the card_id for this user
    const { data: epipenCardLookup, error: lookupError } = await supabase
      .schema('epipen')
      .from('user_epipen_cards')
      .select('card_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (lookupError) {
      throw new Error(`Failed to lookup epipen card: ${lookupError.message}`);
    }

    // If no card exists, return empty data
    if (!epipenCardLookup) {
      return NextResponse.json({
        epipenCard: null,
        epipenInstructions: [],
      });
    }

    // Use RPC to fetch all related data in a single call
    const { card, instructions } = await getEpipenCardData(
      epipenCardLookup.card_id
    );

    return NextResponse.json({
      epipenCard: card,
      epipenInstructions: instructions,
    });
  } catch (error) {
    console.error('Error fetching epipen data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch epipen data' },
      { status: 500 }
    );
  }
}
