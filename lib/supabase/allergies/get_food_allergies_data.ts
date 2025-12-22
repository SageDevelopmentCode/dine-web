import { createClient } from '@/lib/supabase/server';
import {
  UserReactionProfile,
  UserReactionSymptomWithDetails,
  UserSafetyLevelWithDetails,
  UserSafetyRuleWithDetails,
} from '@/lib/supabase/types';

/**
 * Get comprehensive food allergies data for a user profile
 * Fetches all allergy-related data in a single RPC call instead of 11 sequential queries
 * @param slug - The URL slug to lookup
 * @returns Food allergies data: reactionProfile, reactionSymptoms, safetyLevels, safetyRules
 * @throws Error if the slug is not found or the profile doesn't exist
 */
export async function getFoodAllergiesData(
  slug: string
): Promise<{
  reactionProfile: UserReactionProfile | null;
  reactionSymptoms: UserReactionSymptomWithDetails[];
  safetyLevels: UserSafetyLevelWithDetails[];
  safetyRules: UserSafetyRuleWithDetails[];
}> {
  const supabase = await createClient();

  // Call the RPC function that fetches all data in a single database round-trip
  const { data, error } = await (supabase.rpc as any)('get_food_allergies_data', {
    profile_slug: slug,
  });

  if (error) {
    throw new Error(`Failed to fetch food allergies data: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No data returned for slug "${slug}"`);
  }

  // Parse the JSON response and ensure proper typing
  return {
    reactionProfile: (data.reactionProfile || null) as UserReactionProfile | null,
    reactionSymptoms: (data.reactionSymptoms || []) as UserReactionSymptomWithDetails[],
    safetyLevels: (data.safetyLevels || []) as UserSafetyLevelWithDetails[],
    safetyRules: (data.safetyRules || []) as UserSafetyRuleWithDetails[],
  };
}
