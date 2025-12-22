import { createClient } from '@/lib/supabase/server';
import {
  UserTravelCard,
  UserTravelLanguage,
  UserTravelPhraseWithDetails,
  TravelPhraseCategory,
  UserAllergen,
  UserEmergencyCardContact,
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

    // Get user travel card
    const { data: travelCardData, error: travelCardError } = await supabase
      .schema('travel')
      .from('user_travel_cards')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (travelCardError) {
      throw new Error(`Failed to fetch travel card: ${travelCardError.message}`);
    }

    // Initialize empty arrays
    let travelLanguagesData: UserTravelLanguage[] = [];
    let travelPhrasesData: UserTravelPhraseWithDetails[] = [];
    let travelCategoriesData: TravelPhraseCategory[] = [];

    // Only fetch related data if travel card exists
    if (travelCardData) {
      // Get user travel languages
      const { data: languagesData, error: languagesError } = await supabase
        .schema('travel')
        .from('user_travel_languages')
        .select('*')
        .eq('travel_card_id', travelCardData.id);

      if (languagesError) {
        throw new Error(`Failed to fetch travel languages: ${languagesError.message}`);
      }

      travelLanguagesData = languagesData || [];

      // Get all default travel phrase categories
      const { data: allDefaultTravelCategories, error: defaultTravelCategoriesError } = await supabase
        .schema('travel')
        .from('travel_phrase_categories')
        .select('*');

      if (defaultTravelCategoriesError) {
        throw new Error(`Failed to fetch default travel categories: ${defaultTravelCategoriesError.message}`);
      }

      travelCategoriesData = allDefaultTravelCategories || [];

      // Get all default travel phrases
      const { data: allDefaultTravelPhrases, error: defaultTravelPhrasesError } = await supabase
        .schema('travel')
        .from('travel_phrases')
        .select('*');

      if (defaultTravelPhrasesError) {
        throw new Error(`Failed to fetch default travel phrases: ${defaultTravelPhrasesError.message}`);
      }

      // Get user's travel phrases
      const { data: userTravelPhrasesRaw, error: userTravelPhrasesError } = await supabase
        .schema('travel')
        .from('user_travel_phrases')
        .select('*')
        .eq('user_id', userId);

      if (userTravelPhrasesError) {
        throw new Error(`Failed to fetch user travel phrases: ${userTravelPhrasesError.message}`);
      }

      // Create a map of default_phrase_id -> user modification
      const userTravelPhrasesMap = new Map((userTravelPhrasesRaw || []).map(up => [up.default_phrase_id, up]));

      // Collect all allergen_ids and contact_ids for batch fetching
      const allAllergenIds = new Set<string>();
      const allContactIds = new Set<string>();

      (userTravelPhrasesRaw || []).forEach(phrase => {
        (phrase.allergen_ids || []).forEach((id: string) => allAllergenIds.add(id));
        (phrase.contact_ids || []).forEach((id: string) => allContactIds.add(id));
      });

      // Fetch all allergens needed
      let allergensMapForTravel = new Map<string, UserAllergen>();
      if (allAllergenIds.size > 0) {
        const { data: allergensForTravel, error: allergensForTravelError } = await supabase
          .schema('allergies')
          .from('user_allergens')
          .select('*')
          .in('id', Array.from(allAllergenIds));

        if (allergensForTravelError) {
          throw new Error(`Failed to fetch allergens for travel: ${allergensForTravelError.message}`);
        }

        allergensMapForTravel = new Map((allergensForTravel || []).map(a => [a.id, a]));
      }

      // Fetch all contacts needed
      let contactsMapForTravel = new Map<string, UserEmergencyCardContact>();
      if (allContactIds.size > 0) {
        const { data: contactsForTravel, error: contactsForTravelError } = await supabase
          .schema('emergency')
          .from('user_emergency_card_contacts')
          .select('*')
          .in('id', Array.from(allContactIds));

        if (contactsForTravelError) {
          throw new Error(`Failed to fetch contacts for travel: ${contactsForTravelError.message}`);
        }

        contactsMapForTravel = new Map((contactsForTravel || []).map(c => [c.id, c]));
      }

      // Create a map of category_id -> category
      const categoriesMap = new Map((travelCategoriesData || []).map(cat => [cat.id, cat]));

      // Merge phrases
      const mergedDefaultTravelPhrases: UserTravelPhraseWithDetails[] = (allDefaultTravelPhrases || [])
        .map((defaultPhrase) => {
          const userModification = userTravelPhrasesMap.get(defaultPhrase.id);

          if (userModification) {
            // User has modified this phrase
            const resolvedAllergens = (userModification.allergen_ids || [])
              .map((id: string) => allergensMapForTravel.get(id))
              .filter((a: UserAllergen | undefined): a is UserAllergen => a !== undefined);

            const resolvedContacts = (userModification.contact_ids || [])
              .map((id: string) => contactsMapForTravel.get(id))
              .filter((c: UserEmergencyCardContact | undefined): c is UserEmergencyCardContact => c !== undefined);

            return {
              id: userModification.id,
              created_at: userModification.created_at,
              travel_card_id: userModification.travel_card_id,
              default_phrase_id: userModification.default_phrase_id,
              allergen_ids: userModification.allergen_ids,
              user_id: userModification.user_id,
              contact_ids: userModification.contact_ids,
              travel_phrase: defaultPhrase,
              category: categoriesMap.get(defaultPhrase.category_id) || null,
              allergens: resolvedAllergens,
              contacts: resolvedContacts
            };
          } else {
            // User hasn't modified this phrase
            return {
              id: `default-${defaultPhrase.id}`,
              created_at: defaultPhrase.created_at,
              travel_card_id: travelCardData.card_id,
              default_phrase_id: defaultPhrase.id,
              allergen_ids: [],
              user_id: userId,
              contact_ids: [],
              travel_phrase: defaultPhrase,
              category: categoriesMap.get(defaultPhrase.category_id) || null,
              allergens: [],
              contacts: []
            };
          }
        });

      // Get custom phrases
      const customTravelPhrases: UserTravelPhraseWithDetails[] = (userTravelPhrasesRaw || [])
        .filter(up => !up.default_phrase_id)
        .map((customPhrase) => {
          const resolvedAllergens = (customPhrase.allergen_ids || [])
            .map((id: string) => allergensMapForTravel.get(id))
            .filter((a: UserAllergen | undefined): a is UserAllergen => a !== undefined);

          const resolvedContacts = (customPhrase.contact_ids || [])
            .map((id: string) => contactsMapForTravel.get(id))
            .filter((c: UserEmergencyCardContact | undefined): c is UserEmergencyCardContact => c !== undefined);

          return {
            id: customPhrase.id,
            created_at: customPhrase.created_at,
            travel_card_id: customPhrase.travel_card_id,
            default_phrase_id: customPhrase.default_phrase_id,
            allergen_ids: customPhrase.allergen_ids,
            user_id: customPhrase.user_id,
            contact_ids: customPhrase.contact_ids,
            travel_phrase: null,
            category: null,
            allergens: resolvedAllergens,
            contacts: resolvedContacts
          };
        });

      travelPhrasesData = [...mergedDefaultTravelPhrases, ...customTravelPhrases];
    }

    return NextResponse.json({
      travelCard: travelCardData,
      travelLanguages: travelLanguagesData,
      travelPhrases: travelPhrasesData,
      travelCategories: travelCategoriesData,
    });
  } catch (error) {
    console.error('Error fetching travel data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch travel data' },
      { status: 500 }
    );
  }
}
