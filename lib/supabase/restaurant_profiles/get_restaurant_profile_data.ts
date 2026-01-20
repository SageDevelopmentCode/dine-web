import { createClient } from '@/lib/supabase/server';
import {
  RestaurantWebProfile,
  RestaurantWebProfileUrl,
  RestaurantWebProfileImage,
} from '@/lib/supabase/types';

export async function getRestaurantProfileData(slug: string): Promise<{
  url: RestaurantWebProfileUrl;
  profile: RestaurantWebProfile;
  images: RestaurantWebProfileImage[];
}> {
  const supabase = await createClient();

  // Step 1: Get restaurant_web_profile_id and restaurant_id from the URL table using the slug
  const { data: urlData, error: urlError } = await supabase
    .schema('web_profiles')
    .from('restaurant_web_profile_urls')
    .select('*')
    .eq('slug', slug)
    .single();

  if (urlError) {
    throw new Error(
      `Failed to fetch restaurant URL data: ${urlError.message}`
    );
  }

  if (!urlData) {
    throw new Error(`No restaurant profile found with slug "${slug}"`);
  }

  // Step 2: Get profile data from restaurant_web_profiles using restaurant_web_profile_id
  const { data: profileData, error: profileError } = await supabase
    .schema('web_profiles')
    .from('restaurant_web_profiles')
    .select('*')
    .eq('id', urlData.restaurant_web_profile_id)
    .single();

  if (profileError) {
    throw new Error(
      `Failed to fetch restaurant profile: ${profileError.message}`
    );
  }

  if (!profileData) {
    throw new Error(
      `No restaurant profile found with ID "${urlData.restaurant_web_profile_id}"`
    );
  }

  // Step 3: Get images from restaurant_web_profile_images using restaurant_web_profile_id
  const { data: imagesData, error: imagesError } = await supabase
    .schema('web_profiles')
    .from('restaurant_web_profile_images')
    .select('*')
    .eq('restaurant_web_profile_id', urlData.restaurant_web_profile_id)
    .order('sort_order', { ascending: true });

  if (imagesError) {
    throw new Error(
      `Failed to fetch restaurant images: ${imagesError.message}`
    );
  }

  return {
    url: urlData as RestaurantWebProfileUrl,
    profile: profileData as RestaurantWebProfile,
    images: (imagesData || []) as RestaurantWebProfileImage[],
  };
}
