import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

type UserWebProfile = Database['web_profiles']['Tables']['user_web_profiles']['Row'];

/**
 * Get a user's web profile by profile ID
 * @param id - The user web profile ID
 * @returns The user web profile data
 * @throws Error if the profile is not found or query fails
 */
export async function getUserWebProfileById(
  id: string
): Promise<UserWebProfile> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema('web_profiles')
    .from('user_web_profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Profile not found with id "${id}"`);
  }

  return data;
}

/**
 * Get a user's web profile by user ID
 * @param userId - The user's ID
 * @returns The user web profile data
 * @throws Error if the profile is not found or query fails
 */
export async function getUserWebProfileByUserId(
  userId: string
): Promise<UserWebProfile> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema('web_profiles')
    .from('user_web_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Profile not found for user "${userId}"`);
  }

  return data;
}
