import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/types';

// Type aliases for better readability
type UserWebProfile = Database['web_profiles']['Tables']['user_web_profiles']['Row'];
type UserAllergen = Database['allergies']['Tables']['user_allergens']['Row'];
type UserEmergencyCardContact = Database['emergency']['Tables']['user_emergency_card_contacts']['Row'];
type UserWebProfileSelectedCard = Database['web_profiles']['Tables']['user_web_profiles_selected_cards']['Row'];
type Restaurant = Database['restaurant']['Tables']['restaurants']['Row'];
type RestaurantAddress = Database['restaurant']['Tables']['restaurant_addresses']['Row'];
type RestaurantHours = Database['restaurant']['Tables']['restaurant_hours']['Row'];
type RestaurantCuisineOption = Database['restaurant']['Tables']['restaurant_cuisine_options']['Row'];
type RestaurantDietaryOption = Database['restaurant']['Tables']['restaurant_dietary_options']['Row'];
type RestaurantAllergenHandled = Database['restaurant']['Tables']['restaurant_allergens_handled']['Row'];
type RestaurantReview = Database['restaurant']['Tables']['restaurant_reviews']['Row'];

// Composite type for trusted restaurants with all related data
export type TrustedRestaurant = {
  id: string;
  created_at: string;
  restaurant: Restaurant;
  addresses: RestaurantAddress[];
  hours: RestaurantHours[];
  cuisineOptions: RestaurantCuisineOption[];
  dietaryOptions: RestaurantDietaryOption[];
  allergensHandled: RestaurantAllergenHandled[];
  reviews: RestaurantReview[];
};

/**
 * Get initial profile data for page load (Tier 1)
 * Fetches only the immediately visible data to optimize initial load time
 * Uses a single Supabase RPC call instead of 5 sequential queries for better performance
 * @param slug - The URL slug to lookup
 * @returns Initial profile data: profile, selectedCards, allergens, emergencyContacts, trustedRestaurants
 * @throws Error if the slug is not found or the profile doesn't exist
 */
export async function getInitialProfileData(
  slug: string
): Promise<{
  profile: UserWebProfile;
  selectedCards: UserWebProfileSelectedCard[];
  allergens: UserAllergen[];
  emergencyContacts: UserEmergencyCardContact[];
  trustedRestaurants: TrustedRestaurant[];
}> {
  const supabase = await createClient();

  // Call the RPC function that fetches all data in a single database round-trip
  const { data, error } = await supabase.rpc('get_initial_profile_data', {
    profile_slug: slug,
  });

  if (error) {
    throw new Error(`Failed to fetch profile data: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No data returned for slug "${slug}"`);
  }

  // Parse the JSON response and ensure proper typing
  const result = data as {
    profile: UserWebProfile;
    selectedCards: UserWebProfileSelectedCard[];
    allergens: UserAllergen[];
    emergencyContacts: UserEmergencyCardContact[];
    trustedRestaurants: TrustedRestaurant[];
  };

  return {
    profile: result.profile,
    selectedCards: result.selectedCards || [],
    allergens: result.allergens || [],
    emergencyContacts: result.emergencyContacts || [],
    trustedRestaurants: result.trustedRestaurants || [],
  };
}
