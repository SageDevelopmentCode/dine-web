import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/types';

// Type aliases for better readability
type RestaurantWebProfile = Database['web_profiles']['Tables']['restaurant_web_profiles']['Row'];
type RestaurantWebProfileUrl = Database['web_profiles']['Tables']['restaurant_web_profile_urls']['Row'];
type RestaurantWebProfileImage = Database['web_profiles']['Tables']['restaurant_web_profile_images']['Row'];
type Restaurant = Database['restaurant']['Tables']['restaurants']['Row'];
type RestaurantAddress = Database['restaurant']['Tables']['restaurant_addresses']['Row'];
type RestaurantDietaryOption = Database['restaurant']['Tables']['restaurant_dietary_options']['Row'];
type RestaurantKitchenProtocol = Database['restaurant']['Tables']['restaurant_kitchen_protocols']['Row'];
type RestaurantCuisineOption = Database['restaurant']['Tables']['restaurant_cuisine_options']['Row'];
type RestaurantAllergenHandled = Database['restaurant']['Tables']['restaurant_allergens_handled']['Row'];
type RestaurantHours = Database['restaurant']['Tables']['restaurant_hours']['Row'];
type RestaurantMenuItem = Database['restaurant']['Tables']['restaurant_menu_items']['Row'];
type RestaurantMenuCategory = Database['restaurant']['Tables']['restaurant_menu_categories']['Row'];
type RestaurantMenuItemAllergenModification = Database['restaurant']['Tables']['restaurant_menu_item_allergen_modifications']['Row'];
type RestaurantMenuItemAllergen = Database['restaurant']['Tables']['restaurant_menu_item_allergens']['Row'];
type RestaurantMenuItemDietaryOption = Database['restaurant']['Tables']['restaurant_menu_item_dietary_options']['Row'];
type RestaurantMenuItemImage = Database['restaurant']['Tables']['restaurant_menu_item_images']['Row'];
type RestaurantMenuItemModificationNote = Database['restaurant']['Tables']['restaurant_menu_item_modification_notes']['Row'];
type RestaurantMenuItemPreparationMethod = Database['restaurant']['Tables']['restaurant_menu_item_preparation_methods']['Row'];
type RestaurantMenuItemProtocolOverride = Database['restaurant']['Tables']['restaurant_menu_item_protocol_overrides']['Row'];
type RestaurantReview = Database['restaurant']['Tables']['restaurant_reviews']['Row'];
type RestaurantReviewImage = Database['restaurant']['Tables']['restaurant_review_images']['Row'];
type RestaurantMenuItemReview = Database['restaurant']['Tables']['restaurant_menu_item_reviews']['Row'];
type RestaurantMenuItemReviewImage = Database['restaurant']['Tables']['restaurant_menu_item_review_images']['Row'];

// User type for review attribution
type UserInfo = {
  first_name: string;
  last_name: string;
};

// Menu item info for review context
type MenuItemInfo = {
  id: string;
  name: string;
  description: string | null;
};

// Composite type for restaurant reviews with user info and images
export type RestaurantReviewWithDetails = {
  review: RestaurantReview;
  user: UserInfo;
  images: RestaurantReviewImage[];
};

// Composite type for menu item reviews with user info, images, and menu item
export type MenuItemReviewWithDetails = {
  review: RestaurantMenuItemReview;
  user: UserInfo;
  menuItem: MenuItemInfo;
  images: RestaurantMenuItemReviewImage[];
};

// Composite type for menu items with all related data
type RestaurantMenuItemWithDetails = RestaurantMenuItem & {
  allergen_modifications: RestaurantMenuItemAllergenModification[];
  allergens: RestaurantMenuItemAllergen[];
  dietary_options: RestaurantMenuItemDietaryOption[];
  images: RestaurantMenuItemImage[];
  modification_notes: RestaurantMenuItemModificationNote[];
  preparation_methods: RestaurantMenuItemPreparationMethod[];
  protocol_overrides: RestaurantMenuItemProtocolOverride[];
};

export async function getRestaurantProfileData(slug: string): Promise<{
  url: RestaurantWebProfileUrl;
  profile: RestaurantWebProfile;
  images: RestaurantWebProfileImage[];
  restaurant: Restaurant;
  address: RestaurantAddress | null;
  dietaryOptions: RestaurantDietaryOption[];
  kitchenProtocols: RestaurantKitchenProtocol[];
  cuisineOptions: RestaurantCuisineOption[];
  allergensHandled: RestaurantAllergenHandled[];
  hours: RestaurantHours[];
  menuItems: RestaurantMenuItemWithDetails[];
  menuCategories: RestaurantMenuCategory[];
  restaurantReviews: RestaurantReviewWithDetails[];
  menuItemReviews: MenuItemReviewWithDetails[];
}> {
  const supabase = await createClient();

  // Call the RPC function to fetch all data in a single database round-trip
  const { data, error } = await supabase.rpc('get_restaurant_profile_data', {
    restaurant_slug: slug,
  });

  if (error) {
    // Check if error is about missing slug (from RAISE EXCEPTION in SQL)
    if (error.message.includes('No restaurant profile found')) {
      throw new Error(`No restaurant profile found with slug "${slug}"`);
    }
    throw new Error(`Failed to fetch restaurant data: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No restaurant profile found with slug "${slug}"`);
  }

  // The RPC function returns JSON with all the data already structured
  // Cast to unknown first to handle the Json type from Supabase, then to our specific types
  const restaurantData = data as unknown as {
    url: RestaurantWebProfileUrl;
    profile: RestaurantWebProfile;
    images: RestaurantWebProfileImage[];
    restaurant: Restaurant;
    address: RestaurantAddress | null;
    dietaryOptions: RestaurantDietaryOption[];
    kitchenProtocols: RestaurantKitchenProtocol[];
    cuisineOptions: RestaurantCuisineOption[];
    allergensHandled: RestaurantAllergenHandled[];
    hours: RestaurantHours[];
    menuItems: RestaurantMenuItemWithDetails[];
    menuCategories: RestaurantMenuCategory[];
    restaurantReviews: RestaurantReviewWithDetails[];
    menuItemReviews: MenuItemReviewWithDetails[];
  };

  return {
    url: restaurantData.url as RestaurantWebProfileUrl,
    profile: restaurantData.profile as RestaurantWebProfile,
    images: (restaurantData.images || []) as RestaurantWebProfileImage[],
    restaurant: restaurantData.restaurant as Restaurant,
    address: restaurantData.address as RestaurantAddress | null,
    dietaryOptions: (restaurantData.dietaryOptions || []) as RestaurantDietaryOption[],
    kitchenProtocols: (restaurantData.kitchenProtocols || []) as RestaurantKitchenProtocol[],
    cuisineOptions: (restaurantData.cuisineOptions || []) as RestaurantCuisineOption[],
    allergensHandled: (restaurantData.allergensHandled || []) as RestaurantAllergenHandled[],
    hours: (restaurantData.hours || []) as RestaurantHours[],
    menuItems: (restaurantData.menuItems || []) as RestaurantMenuItemWithDetails[],
    menuCategories: (restaurantData.menuCategories || []) as RestaurantMenuCategory[],
    restaurantReviews: (restaurantData.restaurantReviews || []) as RestaurantReviewWithDetails[],
    menuItemReviews: (restaurantData.menuItemReviews || []) as MenuItemReviewWithDetails[],
  };
}
