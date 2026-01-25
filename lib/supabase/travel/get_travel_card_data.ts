import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/types';

// Type aliases for better readability
export type UserTravelCard = Database['travel']['Tables']['user_travel_cards']['Row'];
export type UserTravelLanguage = Database['travel']['Tables']['user_travel_languages']['Row'];
export type TravelPhrase = Database['travel']['Tables']['travel_phrases']['Row'];
export type TravelPhraseCategory = Database['travel']['Tables']['travel_phrase_categories']['Row'];
type UserTravelPhrase = Database['travel']['Tables']['user_travel_phrases']['Row'];

// Type aliases for nested details from other schemas
type UserAllergen = Database['allergies']['Tables']['user_allergens']['Row'];
type UserEmergencyCardContact = Database['emergency']['Tables']['user_emergency_card_contacts']['Row'];

// Composite type with nested details
export type UserTravelPhraseWithDetails = UserTravelPhrase & {
  travel_phrase?: TravelPhrase | null;
  allergens?: UserAllergen[];
  contacts?: UserEmergencyCardContact[];
  category?: TravelPhraseCategory | null;
};

/**
 * Get comprehensive travel card data for a user
 * Fetches all travel-related data in a single RPC call
 * @param userId - The user ID to lookup
 * @returns Travel card data: travelCard, travelLanguages, travelPhrases, travelCategories
 * @throws Error if the fetch fails
 */
export async function getTravelCardData(
  userId: string
): Promise<{
  travelCard: UserTravelCard | null;
  travelLanguages: UserTravelLanguage[];
  travelPhrases: UserTravelPhraseWithDetails[];
  travelCategories: TravelPhraseCategory[];
}> {
  const supabase = await createClient();

  // Call the RPC function that fetches all data in a single database round-trip
  const { data, error } = await supabase
    .schema('travel')
    .rpc('get_travel_card_data_web', {
      p_user_id: userId,
    });

  if (error) {
    throw new Error(`Failed to fetch travel card data: ${error.message}`);
  }

  // Parse the JSON response and ensure proper typing
  return {
    travelCard: (data as any)?.travelCard || null,
    travelLanguages: (data as any)?.travelLanguages || [],
    travelPhrases: (data as any)?.travelPhrases || [],
    travelCategories: (data as any)?.travelCategories || [],
  };
}
