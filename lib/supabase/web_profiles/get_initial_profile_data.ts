import { createClient } from '@/lib/supabase/server';
import { Database, UserWebProfileWithUserData, UserEmergencyCardContact, Json } from '@/lib/supabase/types';

// Type aliases for better readability
type UserAllergen = Database['allergies']['Tables']['user_allergens']['Row'];

// Extended type for selected cards with card_type from JOIN with core.user_cards
export type UserWebProfileSelectedCardWithType = {
  created_at: string;
  id: string;
  is_deleted: boolean;
  selected_card_id: string;
  selected_subitems: Json | null;
  user_id: string;
  user_web_profiles_id: string;
  card_type?: Database['public']['Enums']['card_type'];
};

type Restaurant = Database['restaurant']['Tables']['restaurants']['Row'];
type RestaurantAddress = Database['restaurant']['Tables']['restaurant_addresses']['Row'];
type RestaurantHours = Database['restaurant']['Tables']['restaurant_hours']['Row'];
type RestaurantCuisineOption = Database['restaurant']['Tables']['restaurant_cuisine_options']['Row'];
type RestaurantDietaryOption = Database['restaurant']['Tables']['restaurant_dietary_options']['Row'];
type RestaurantAllergenHandled = Database['restaurant']['Tables']['restaurant_allergens_handled']['Row'];
type RestaurantReview = Database['restaurant']['Tables']['restaurant_reviews']['Row'];
type RestaurantWebProfileImage = Database['web_profiles']['Tables']['restaurant_web_profile_images']['Row'];
type RestaurantReviewImage = Database['restaurant']['Tables']['restaurant_review_images']['Row'];

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
  images: RestaurantWebProfileImage[];
  slug: string | null;
};

// Composite type for recent reviews with restaurant and images
export type RecentReview = {
  review: RestaurantReview;
  restaurant: Restaurant;
  images: RestaurantReviewImage[];
  slug: string | null;
};

/**
 * Get initial profile data for page load (Tier 1)
 * Fetches only the immediately visible data to optimize initial load time
 * Uses a single Supabase RPC call instead of multiple sequential queries for better performance
 * @param slug - The URL slug to lookup
 * @returns Initial profile data: profile, selectedCards, allergens, emergencyContacts, trustedRestaurants, recentReviews
 * @throws Error if the slug is not found or the profile doesn't exist
 */
export async function getInitialProfileData(
  slug: string
): Promise<{
  profile: UserWebProfileWithUserData;
  selectedCards: UserWebProfileSelectedCardWithType[];
  allergens: UserAllergen[];
  emergencyContacts: UserEmergencyCardContact[];
  trustedRestaurants: TrustedRestaurant[];
  recentReviews: RecentReview[];
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
    profile: UserWebProfileWithUserData;
    selectedCards: UserWebProfileSelectedCardWithType[];
    allergens: UserAllergen[];
    emergencyContacts: UserEmergencyCardContact[];
    trustedRestaurants: TrustedRestaurant[];
    recentReviews: RecentReview[];
  };

  return {
    profile: result.profile,
    selectedCards: result.selectedCards || [],
    allergens: result.allergens || [],
    emergencyContacts: result.emergencyContacts || [],
    trustedRestaurants: result.trustedRestaurants || [],
    recentReviews: result.recentReviews || [],
  };
}
