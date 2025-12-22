import { createClient } from '@/lib/supabase/server';
import {
  UserSweCard,
  UserSweCategoryWithDetails,
  UserSweMeasureWithDetails,
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

    // Get user SWE card
    const { data: sweCardData, error: sweCardError } = await supabase
      .schema('swe')
      .from('user_swe_cards')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (sweCardError) {
      throw new Error(`Failed to fetch SWE card: ${sweCardError.message}`);
    }

    // Get all default SWE categories
    const { data: allDefaultSweCategories, error: defaultSweCategoriesError } = await supabase
      .schema('swe')
      .from('swe_categories')
      .select('*');

    if (defaultSweCategoriesError) {
      throw new Error(`Failed to fetch default SWE categories: ${defaultSweCategoriesError.message}`);
    }

    // Get user's modified/deleted SWE categories
    const { data: userSweCategoriesRaw, error: userSweCategoriesError } = await supabase
      .schema('swe')
      .from('user_swe_categories')
      .select('*')
      .eq('user_id', userId);

    if (userSweCategoriesError) {
      throw new Error(`Failed to fetch user SWE categories: ${userSweCategoriesError.message}`);
    }

    // Create a map of default_category_id -> user modification
    const userSweCategoriesMap = new Map((userSweCategoriesRaw || []).map(uc => [uc.default_category_id, uc]));

    // Merge categories
    const mergedDefaultSweCategories: UserSweCategoryWithDetails[] = (allDefaultSweCategories || [])
      .map((defaultCategory) => {
        const userModification = userSweCategoriesMap.get(defaultCategory.id);

        if (userModification) {
          return {
            id: userModification.id,
            created_at: userModification.created_at,
            user_id: userModification.user_id,
            default_category_id: userModification.default_category_id,
            custom_category_name: userModification.custom_category_name,
            is_deleted: userModification.is_deleted,
            swe_card_id: userModification.swe_card_id,
            swe_category: defaultCategory
          };
        } else {
          return {
            id: `default-${defaultCategory.id}`,
            created_at: defaultCategory.created_at,
            user_id: userId,
            default_category_id: defaultCategory.id,
            custom_category_name: null,
            is_deleted: false,
            swe_card_id: sweCardData?.card_id || '',
            swe_category: defaultCategory
          };
        }
      });

    // Get custom categories
    const customSweCategories: UserSweCategoryWithDetails[] = (userSweCategoriesRaw || [])
      .filter(uc => !uc.default_category_id)
      .map((customCategory) => ({
        id: customCategory.id,
        created_at: customCategory.created_at,
        user_id: customCategory.user_id,
        default_category_id: customCategory.default_category_id,
        custom_category_name: customCategory.custom_category_name,
        is_deleted: customCategory.is_deleted,
        swe_card_id: customCategory.swe_card_id,
        swe_category: null
      }));

    const sweCategoriesData: UserSweCategoryWithDetails[] = [...mergedDefaultSweCategories, ...customSweCategories]
      .filter(category => !category.is_deleted);

    // Get all default SWE measures
    const { data: allDefaultSweMeasures, error: defaultSweMeasuresError } = await supabase
      .schema('swe')
      .from('swe_measures')
      .select('*');

    if (defaultSweMeasuresError) {
      throw new Error(`Failed to fetch default SWE measures: ${defaultSweMeasuresError.message}`);
    }

    // Get user's modified/deleted SWE measures
    const { data: userSweMeasuresRaw, error: userSweMeasuresError } = await supabase
      .schema('swe')
      .from('user_swe_measures')
      .select('*')
      .eq('user_id', userId);

    if (userSweMeasuresError) {
      throw new Error(`Failed to fetch user SWE measures: ${userSweMeasuresError.message}`);
    }

    // Create a map of instruction_key -> user modification
    const userSweMeasuresMap = new Map((userSweMeasuresRaw || []).map(um => [um.instruction_key, um]));

    // Merge measures
    const mergedDefaultSweMeasures: UserSweMeasureWithDetails[] = (allDefaultSweMeasures || [])
      .map((defaultMeasure) => {
        const userModification = userSweMeasuresMap.get(defaultMeasure.instruction_key);

        if (userModification) {
          return {
            id: userModification.id,
            created_at: userModification.created_at,
            user_category_id: userModification.user_category_id,
            instruction_text: userModification.instruction_text,
            is_deleted: userModification.is_deleted,
            is_custom: userModification.is_custom,
            user_id: userModification.user_id,
            swe_card_id: userModification.swe_card_id,
            instruction_key: userModification.instruction_key,
            swe_measure: defaultMeasure
          };
        } else {
          return {
            id: `default-${defaultMeasure.id}`,
            created_at: defaultMeasure.created_at,
            user_category_id: defaultMeasure.category_id,
            instruction_text: defaultMeasure.instruction_text,
            is_deleted: false,
            is_custom: false,
            user_id: userId,
            swe_card_id: sweCardData?.card_id || '',
            instruction_key: defaultMeasure.instruction_key,
            swe_measure: defaultMeasure
          };
        }
      });

    // Get custom measures
    const customSweMeasures: UserSweMeasureWithDetails[] = (userSweMeasuresRaw || [])
      .filter(um => um.instruction_key.startsWith('custom-'))
      .map((customMeasure) => ({
        id: customMeasure.id,
        created_at: customMeasure.created_at,
        user_category_id: customMeasure.user_category_id,
        instruction_text: customMeasure.instruction_text,
        is_deleted: customMeasure.is_deleted,
        is_custom: customMeasure.is_custom,
        user_id: customMeasure.user_id,
        swe_card_id: customMeasure.swe_card_id,
        instruction_key: customMeasure.instruction_key,
        swe_measure: null
      }));

    const sweMeasuresData: UserSweMeasureWithDetails[] = [...mergedDefaultSweMeasures, ...customSweMeasures]
      .filter(measure => !measure.is_deleted);

    return NextResponse.json({
      sweCard: sweCardData,
      sweCategories: sweCategoriesData,
      sweMeasures: sweMeasuresData,
    });
  } catch (error) {
    console.error('Error fetching SWE data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SWE data' },
      { status: 500 }
    );
  }
}
