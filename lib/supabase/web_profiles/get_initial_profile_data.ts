import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/types';

// Type aliases for better readability
type UserWebProfile = Database['web_profiles']['Tables']['user_web_profiles']['Row'];
type UserWebProfileSelectedCard = Database['web_profiles']['Tables']['user_web_profiles_selected_cards']['Row'];
type UserAllergen = Database['allergies']['Tables']['user_allergens']['Row'];
type UserEmergencyCardContact = Database['emergency']['Tables']['user_emergency_card_contacts']['Row'];

/**
 * Get initial profile data for page load (Tier 1)
 * Fetches only the immediately visible data to optimize initial load time
 * Uses a single Supabase RPC call instead of 5 sequential queries for better performance
 * @param slug - The URL slug to lookup
 * @returns Initial profile data: profile, selectedCards, allergens, emergencyContacts
 * @throws Error if the slug is not found or the profile doesn't exist
 */
export async function getInitialProfileData(
  slug: string
): Promise<{
  profile: UserWebProfile;
  selectedCards: UserWebProfileSelectedCard[];
  allergens: UserAllergen[];
  emergencyContacts: UserEmergencyCardContact[];
}> {
  const supabase = await createClient();

  // Call the RPC function that fetches all data in a single database round-trip
  const { data, error } = await (supabase.rpc as any)('get_initial_profile_data', {
    profile_slug: slug,
  });

  if (error) {
    throw new Error(`Failed to fetch profile data: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No data returned for slug "${slug}"`);
  }

  // Parse the JSON response and ensure proper typing
  return {
    profile: data.profile as UserWebProfile,
    selectedCards: (data.selectedCards || []) as UserWebProfileSelectedCard[],
    allergens: (data.allergens || []) as UserAllergen[],
    emergencyContacts: (data.emergencyContacts || []) as UserEmergencyCardContact[],
  };
}
