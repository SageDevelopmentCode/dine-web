import { createClient } from '@/lib/supabase/server';
import { UserWebProfile, UserWebProfileSelectedCard } from '@/lib/supabase/types';

/**
 * Get a user's web profile by their URL slug
 * @param slug - The URL slug to lookup
 * @returns The complete user web profile data with selected cards
 * @throws Error if the slug is not found or the profile doesn't exist
 */
export async function getUserWebProfileBySlug(
  slug: string
): Promise<{ profile: UserWebProfile; selectedCards: UserWebProfileSelectedCard[] }> {
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

  // Then get the full profile using the user_web_profile_id
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

  return {
    profile: profileData,
    selectedCards: selectedCardsData || []
  };
}
