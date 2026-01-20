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

  // Get restaurant_id from urlData to fetch restaurant schema data
  const restaurantId = urlData.restaurant_id;

  if (!restaurantId) {
    throw new Error('No restaurant_id found in URL data');
  }

  // Step 4: Get restaurant data from restaurant.restaurants table
  const { data: restaurantData, error: restaurantError } = await supabase
    .schema('restaurant')
    .from('restaurants')
    .select('*')
    .eq('id', restaurantId)
    .single();

  if (restaurantError) {
    throw new Error(
      `Failed to fetch restaurant data: ${restaurantError.message}`
    );
  }

  // Step 5: Get restaurant address
  const { data: addressData, error: addressError } = await supabase
    .schema('restaurant')
    .from('restaurant_addresses')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .maybeSingle();

  if (addressError) {
    throw new Error(
      `Failed to fetch restaurant address: ${addressError.message}`
    );
  }

  // Step 6: Get dietary options
  const { data: dietaryOptionsData, error: dietaryError } = await supabase
    .schema('restaurant')
    .from('restaurant_dietary_options')
    .select('*')
    .eq('restaurant_id', restaurantId);

  if (dietaryError) {
    throw new Error(
      `Failed to fetch dietary options: ${dietaryError.message}`
    );
  }

  // Step 7: Get kitchen protocols
  const { data: kitchenProtocolsData, error: protocolsError } = await supabase
    .schema('restaurant')
    .from('restaurant_kitchen_protocols')
    .select('*')
    .eq('restaurant_id', restaurantId);

  if (protocolsError) {
    throw new Error(
      `Failed to fetch kitchen protocols: ${protocolsError.message}`
    );
  }

  // Step 8: Get cuisine options
  const { data: cuisineOptionsData, error: cuisineError } = await supabase
    .schema('restaurant')
    .from('restaurant_cuisine_options')
    .select('*')
    .eq('restaurant_id', restaurantId);

  if (cuisineError) {
    throw new Error(
      `Failed to fetch cuisine options: ${cuisineError.message}`
    );
  }

  // Step 9: Get allergens handled
  const { data: allergensHandledData, error: allergensError } = await supabase
    .schema('restaurant')
    .from('restaurant_allergens_handled')
    .select('*')
    .eq('restaurant_id', restaurantId);

  if (allergensError) {
    throw new Error(
      `Failed to fetch allergens handled: ${allergensError.message}`
    );
  }

  // Step 10: Get restaurant hours
  const { data: hoursData, error: hoursError } = await supabase
    .schema('restaurant')
    .from('restaurant_hours')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('weekday', { ascending: true });

  if (hoursError) {
    throw new Error(`Failed to fetch restaurant hours: ${hoursError.message}`);
  }

  // Step 11: Get menu items
  const { data: menuItemsData, error: menuItemsError } = await supabase
    .schema('restaurant')
    .from('restaurant_menu_items')
    .select('*')
    .eq('restaurant_id', restaurantId);

  if (menuItemsError) {
    throw new Error(`Failed to fetch menu items: ${menuItemsError.message}`);
  }

  // Step 12: Get menu categories
  const { data: menuCategoriesData, error: categoriesError } = await supabase
    .schema('restaurant')
    .from('restaurant_menu_categories')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('sort_order', { ascending: true });

  if (categoriesError) {
    throw new Error(
      `Failed to fetch menu categories: ${categoriesError.message}`
    );
  }

  // Step 13: For each menu item, fetch related data
  const menuItemsWithDetails: RestaurantMenuItemWithDetails[] = await Promise.all(
    (menuItemsData || []).map(async (menuItem) => {
      const menuItemId = menuItem.id;

      // Fetch all menu item related data in parallel
      const [
        allergenModifications,
        allergens,
        dietaryOptions,
        images,
        modificationNotes,
        preparationMethods,
        protocolOverrides,
      ] = await Promise.all([
        // Allergen modifications
        supabase
          .schema('restaurant')
          .from('restaurant_menu_item_allergen_modifications')
          .select('*')
          .eq('menu_item_id', menuItemId)
          .then(({ data, error }) => {
            if (error) throw error;
            return (data || []) as RestaurantMenuItemAllergenModification[];
          }),

        // Allergens
        supabase
          .schema('restaurant')
          .from('restaurant_menu_item_allergens')
          .select('*')
          .eq('menu_item_id', menuItemId)
          .then(({ data, error }) => {
            if (error) throw error;
            return (data || []) as RestaurantMenuItemAllergen[];
          }),

        // Dietary options
        supabase
          .schema('restaurant')
          .from('restaurant_menu_item_dietary_options')
          .select('*')
          .eq('menu_item_id', menuItemId)
          .then(({ data, error }) => {
            if (error) throw error;
            return (data || []) as RestaurantMenuItemDietaryOption[];
          }),

        // Images
        supabase
          .schema('restaurant')
          .from('restaurant_menu_item_images')
          .select('*')
          .eq('menu_item_id', menuItemId)
          .order('sort_order', { ascending: true })
          .then(({ data, error }) => {
            if (error) throw error;
            return (data || []) as RestaurantMenuItemImage[];
          }),

        // Modification notes
        supabase
          .schema('restaurant')
          .from('restaurant_menu_item_modification_notes')
          .select('*')
          .eq('menu_item_id', menuItemId)
          .then(({ data, error }) => {
            if (error) throw error;
            return (data || []) as RestaurantMenuItemModificationNote[];
          }),

        // Preparation methods
        supabase
          .schema('restaurant')
          .from('restaurant_menu_item_preparation_methods')
          .select('*')
          .eq('menu_item_id', menuItemId)
          .then(({ data, error }) => {
            if (error) throw error;
            return (data || []) as RestaurantMenuItemPreparationMethod[];
          }),

        // Protocol overrides
        supabase
          .schema('restaurant')
          .from('restaurant_menu_item_protocol_overrides')
          .select('*')
          .eq('menu_item_id', menuItemId)
          .then(({ data, error }) => {
            if (error) throw error;
            return (data || []) as RestaurantMenuItemProtocolOverride[];
          }),
      ]);

      return {
        ...menuItem,
        allergen_modifications: allergenModifications,
        allergens,
        dietary_options: dietaryOptions,
        images,
        modification_notes: modificationNotes,
        preparation_methods: preparationMethods,
        protocol_overrides: protocolOverrides,
      } as RestaurantMenuItemWithDetails;
    })
  );

  return {
    url: urlData as RestaurantWebProfileUrl,
    profile: profileData as RestaurantWebProfile,
    images: (imagesData || []) as RestaurantWebProfileImage[],
    restaurant: restaurantData as Restaurant,
    address: addressData as RestaurantAddress | null,
    dietaryOptions: (dietaryOptionsData || []) as RestaurantDietaryOption[],
    kitchenProtocols: (kitchenProtocolsData || []) as RestaurantKitchenProtocol[],
    cuisineOptions: (cuisineOptionsData || []) as RestaurantCuisineOption[],
    allergensHandled: (allergensHandledData || []) as RestaurantAllergenHandled[],
    hours: (hoursData || []) as RestaurantHours[],
    menuItems: menuItemsWithDetails,
    menuCategories: (menuCategoriesData || []) as RestaurantMenuCategory[],
  };
}
