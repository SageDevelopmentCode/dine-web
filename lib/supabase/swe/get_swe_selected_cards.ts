import { createClient } from '@/lib/supabase/server';
import { Database, UserAllergen, Json } from '@/lib/supabase/types';
import { getEmergencyCardData } from '@/lib/supabase/emergency/get_emergency_card_data';
import { getEpipenCardData } from '@/lib/supabase/epipen/get_epipen_card_data';
import { getTravelCardData } from '@/lib/supabase/travel/get_travel_card_data';
import { getFoodAllergiesData } from '@/lib/supabase/allergies/get_food_allergies_data';

// Type aliases
type UserSweSelectedCard = Database['swe']['Tables']['user_swe_selected_cards']['Row'];
type UserCard = Database['core']['Tables']['user_cards']['Row'];
type CardType = Database['public']['Enums']['card_type'];

// Selected subitems types for each card type
type EmergencySelectedSubitems = {
  contacts?: string[];
  doctors?: string[];
  hospitals?: string[];
} | null;

type EpipenSelectedSubitems = {
  instructions?: string[];
} | null;

type TravelSelectedSubitems = {
  languages?: string[];
  phrases?: string[];
} | null;

type AllergySelectedSubitems = string[] | null;

// Union type for all possible card data structures
export type SelectedCardData =
  | {
      type: 'emergency';
      card: Awaited<ReturnType<typeof getEmergencyCardData>>['card'];
      contacts: Awaited<ReturnType<typeof getEmergencyCardData>>['contacts'];
      doctors: Awaited<ReturnType<typeof getEmergencyCardData>>['doctors'];
      hospitals: Awaited<ReturnType<typeof getEmergencyCardData>>['hospitals'];
      reactionProfile: Awaited<ReturnType<typeof getEmergencyCardData>>['reactionProfile'];
      selectedSubitems: EmergencySelectedSubitems;
    }
  | {
      type: 'epipen';
      card: Awaited<ReturnType<typeof getEpipenCardData>>['card'];
      instructions: Awaited<ReturnType<typeof getEpipenCardData>>['instructions'];
      selectedSubitems: EpipenSelectedSubitems;
    }
  | {
      type: 'travel';
      travelCard: Awaited<ReturnType<typeof getTravelCardData>>['travelCard'];
      travelLanguages: Awaited<ReturnType<typeof getTravelCardData>>['travelLanguages'];
      travelPhrases: Awaited<ReturnType<typeof getTravelCardData>>['travelPhrases'];
      travelCategories: Awaited<ReturnType<typeof getTravelCardData>>['travelCategories'];
      selectedSubitems: TravelSelectedSubitems;
    }
  | {
      type: 'allergy';
      allergens: UserAllergen[];
      reactionProfile: Awaited<ReturnType<typeof getFoodAllergiesData>>['reactionProfile'];
      reactionSymptoms: Awaited<ReturnType<typeof getFoodAllergiesData>>['reactionSymptoms'];
      selectedSubitems: AllergySelectedSubitems;
    };

/**
 * Map database card_type to our type system
 */
function mapCardType(dbCardType: CardType): 'emergency' | 'epipen' | 'travel' | 'allergy' | null {
  switch (dbCardType) {
    case 'emergency':
      return 'emergency';
    case 'epipen':
      return 'epipen';
    case 'travel':
      return 'travel';
    case 'allergy':
      return 'allergy';
    default:
      return null;
  }
}

/**
 * Get selected cards for a SWE card
 * Fetches all cards that have been marked as important for this SWE card
 * @param sweCardId - The SWE card_id
 * @param userId - The user ID who owns the cards
 * @param allergens - User's allergens (for allergy card type)
 * @param slug - User's profile slug (for fetching full allergy data)
 * @returns Array of selected cards with their data and selectedSubitems
 */
export async function getSweSelectedCards(
  sweCardId: string,
  userId: string,
  allergens: UserAllergen[] = [],
  slug?: string
): Promise<SelectedCardData[]> {
  const supabase = await createClient();

  // Use RPC function to get selected cards with their card types
  // This avoids direct queries to core.user_cards which requires elevated permissions
  const { data: cardTypesData, error: cardTypesError } = await supabase
    .schema('swe')
    .rpc('get_swe_selected_card_types', {
      p_swe_card_id: sweCardId,
      p_user_id: userId,
    });

  if (cardTypesError) {
    console.error('=== RPC Error Debug Info ===');
    console.error('Full Supabase error:', cardTypesError);
    console.error('Error details:', JSON.stringify(cardTypesError, null, 2));
    console.error('Error code:', cardTypesError.code);
    console.error('Error hint:', cardTypesError.hint);
    console.error('Error message:', cardTypesError.message);
    console.error('Parameters passed:', { p_swe_card_id: sweCardId, p_user_id: userId });
    console.error('===========================');
    throw new Error(`Failed to fetch selected card types: ${cardTypesError.message}`);
  }

  if (!cardTypesData || cardTypesData.length === 0) {
    return [];
  }

  // Fetch data for each selected card based on its type
  const cardDataPromises = cardTypesData.map(async (row: {
    selected_card_id: string;
    card_type: string;
    selected_subitems: Json;
  }): Promise<SelectedCardData | null> => {
    const cardType = mapCardType(row.card_type as CardType);
    if (!cardType) return null;

    try {
      switch (cardType) {
        case 'emergency': {
          // For emergency cards, we need to look up the card_id from user_emergency_cards
          const { data: emergencyCardLookup } = await supabase
            .schema('emergency')
            .from('user_emergency_cards')
            .select('card_id')
            .eq('user_id', userId)
            .maybeSingle();

          if (!emergencyCardLookup) return null;

          const emergencyData = await getEmergencyCardData(emergencyCardLookup.card_id);
          return {
            type: 'emergency',
            ...emergencyData,
            selectedSubitems: row.selected_subitems as unknown as EmergencySelectedSubitems,
          };
        }

        case 'epipen': {
          // For epipen cards, look up card_id from user_epipen_cards
          const { data: epipenCardLookup } = await supabase
            .schema('epipen')
            .from('user_epipen_cards')
            .select('card_id')
            .eq('user_id', userId)
            .maybeSingle();

          if (!epipenCardLookup) return null;

          const epipenData = await getEpipenCardData(epipenCardLookup.card_id);
          return {
            type: 'epipen',
            ...epipenData,
            selectedSubitems: row.selected_subitems as unknown as EpipenSelectedSubitems,
          };
        }

        case 'travel': {
          // Travel cards use user_id directly
          const travelData = await getTravelCardData(userId);
          return {
            type: 'travel',
            ...travelData,
            selectedSubitems: row.selected_subitems as unknown as TravelSelectedSubitems,
          };
        }

        case 'allergy': {
          // Fetch full food allergies data if slug is provided
          if (slug) {
            const allergyData = await getFoodAllergiesData(slug);
            return {
              type: 'allergy',
              allergens,
              reactionProfile: allergyData.reactionProfile,
              reactionSymptoms: allergyData.reactionSymptoms,
              selectedSubitems: row.selected_subitems as unknown as AllergySelectedSubitems,
            };
          }
          // Fallback if no slug provided
          return {
            type: 'allergy',
            allergens,
            reactionProfile: null,
            reactionSymptoms: [],
            selectedSubitems: row.selected_subitems as unknown as AllergySelectedSubitems,
          };
        }

        default:
          return null;
      }
    } catch (error) {
      console.error(`Failed to fetch data for card type ${cardType}:`, error);
      return null;
    }
  });

  const results = await Promise.all(cardDataPromises);
  return results.filter((r): r is SelectedCardData => r !== null);
}
