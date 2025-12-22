import { createClient } from '@/lib/supabase/server';
import {
  UserWebProfile,
  UserWebProfileSelectedCard,
  UserReactionProfile,
  UserReactionSymptomWithDetails
} from '@/lib/supabase/types';

/**
 * Get a user's web profile by their URL slug
 * @param slug - The URL slug to lookup
 * @returns The complete user web profile data with selected cards and allergy information
 * @throws Error if the slug is not found or the profile doesn't exist
 */
export async function getUserWebProfileBySlug(
  slug: string
): Promise<{
  profile: UserWebProfile;
  selectedCards: UserWebProfileSelectedCard[];
  reactionProfile: UserReactionProfile | null;
  reactionSymptoms: UserReactionSymptomWithDetails[];
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

  // Get user reaction profile from allergies schema
  const { data: reactionProfileData, error: reactionProfileError } = await supabase
    .schema('allergies')
    .from('user_reaction_profiles')
    .select('*')
    .eq('user_id', profileData.user_id)
    .maybeSingle();

  if (reactionProfileError) {
    throw new Error(`Failed to fetch reaction profile: ${reactionProfileError.message}`);
  }

  // Get user reaction symptoms
  const { data: reactionSymptomsRaw, error: reactionSymptomsError } = await supabase
    .schema('allergies')
    .from('user_reaction_symptoms')
    .select('*')
    .eq('user_id', profileData.user_id);

  if (reactionSymptomsError) {
    throw new Error(`Failed to fetch reaction symptoms: ${reactionSymptomsError.message}`);
  }

  // Get all unique symptom_ids from non-custom symptoms
  const symptomIds = (reactionSymptomsRaw || [])
    .filter(rs => !rs.is_custom && rs.symptom_id)
    .map(rs => rs.symptom_id);

  // Fetch symptoms data for those IDs
  let symptomsMap = new Map();
  if (symptomIds.length > 0) {
    const { data: symptomsData, error: symptomsError } = await supabase
      .schema('allergies')
      .from('symptoms')
      .select('*')
      .in('id', symptomIds);

    if (symptomsError) {
      throw new Error(`Failed to fetch symptoms: ${symptomsError.message}`);
    }

    // Create a map of symptom_id -> symptom for quick lookup
    symptomsMap = new Map((symptomsData || []).map(s => [s.id, s]));
  }

  // Merge the data to match UserReactionSymptomWithDetails type
  const reactionSymptomsData: UserReactionSymptomWithDetails[] = (reactionSymptomsRaw || []).map((rs) => ({
    id: rs.id,
    created_at: rs.created_at,
    user_reaction_profile_id: rs.user_reaction_profile_id,
    symptom_id: rs.symptom_id,
    custom_symptom: rs.custom_symptom,
    is_custom: rs.is_custom,
    user_id: rs.user_id,
    custom_symptom_severity: rs.custom_symptom_severity,
    symptom: rs.symptom_id ? symptomsMap.get(rs.symptom_id) || null : null
  }));

  return {
    profile: profileData,
    selectedCards: selectedCardsData || [],
    reactionProfile: reactionProfileData,
    reactionSymptoms: reactionSymptomsData
  };
}
