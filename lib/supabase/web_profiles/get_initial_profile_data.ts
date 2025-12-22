import { createClient } from '@/lib/supabase/server';
import {
  UserWebProfile,
  UserWebProfileSelectedCard,
  UserAllergen,
  UserEmergencyCardContact,
} from '@/lib/supabase/types';

/**
 * Get initial profile data for page load (Tier 1)
 * Fetches only the immediately visible data to optimize initial load time
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

  // First, get the user_web_profile_id from the slug
  const { data: urlData, error: urlError } = await supabase
    .schema('web_profiles')
    .from('user_web_profile_urls')
    .select('user_web_profile_id')
    .eq('slug', slug)
    .single();

  if (urlError) {
    throw new Error(`Failed to find profile with slug "${slug}": ${urlError.message}`);
  }

  if (!urlData) {
    throw new Error(`No profile found with slug "${slug}"`);
  }

  // Get the full profile using the user_web_profile_id
  const { data: profileData, error: profileError } = await supabase
    .schema('web_profiles')
    .from('user_web_profiles')
    .select('*')
    .eq('id', urlData.user_web_profile_id)
    .single();

  if (profileError) {
    throw new Error(`Failed to fetch profile: ${profileError.message}`);
  }

  if (!profileData) {
    throw new Error(`Profile not found for slug "${slug}"`);
  }

  // Get selected cards for this profile
  const { data: selectedCardsData, error: selectedCardsError } = await supabase
    .schema('web_profiles')
    .from('user_web_profiles_selected_cards')
    .select('id, created_at, user_web_profiles_id, selected_card_id, selected_subitems, user_id, is_deleted')
    .eq('user_web_profiles_id', urlData.user_web_profile_id)
    .eq('is_deleted', false);

  if (selectedCardsError) {
    throw new Error(`Failed to fetch selected cards: ${selectedCardsError.message}`);
  }

  // Get user allergens
  const { data: allergensData, error: allergensError } = await supabase
    .schema('allergies')
    .from('user_allergens')
    .select('*')
    .eq('user_id', profileData.user_id);

  if (allergensError) {
    throw new Error(`Failed to fetch user allergens: ${allergensError.message}`);
  }

  // Get emergency contacts (without fetching full emergency card data)
  // First, get the emergency card to get the card_id
  const { data: emergencyCardData, error: emergencyCardError } = await supabase
    .schema('emergency')
    .from('user_emergency_cards')
    .select('card_id')
    .eq('user_id', profileData.user_id)
    .maybeSingle();

  if (emergencyCardError) {
    throw new Error(`Failed to fetch emergency card: ${emergencyCardError.message}`);
  }

  let emergencyContactsData: UserEmergencyCardContact[] = [];

  // Only fetch contacts if emergency card exists
  if (emergencyCardData) {
    const { data: contactsData, error: contactsError } = await supabase
      .schema('emergency')
      .from('user_emergency_card_contacts')
      .select('*')
      .eq('card_id', emergencyCardData.card_id)
      .order('priority', { ascending: true });

    if (contactsError) {
      throw new Error(`Failed to fetch emergency contacts: ${contactsError.message}`);
    }

    emergencyContactsData = contactsData || [];
  }

  return {
    profile: profileData,
    selectedCards: selectedCardsData || [],
    allergens: allergensData || [],
    emergencyContacts: emergencyContactsData,
  };
}
