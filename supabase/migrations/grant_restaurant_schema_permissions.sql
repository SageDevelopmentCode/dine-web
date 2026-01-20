-- Grant SELECT permissions on all restaurant schema tables to anon role
-- This allows unauthenticated users to read restaurant data

-- Core restaurant tables
GRANT SELECT ON restaurant.restaurants TO anon;
GRANT SELECT ON restaurant.restaurant_addresses TO anon;
GRANT SELECT ON restaurant.restaurant_dietary_options TO anon;
GRANT SELECT ON restaurant.restaurant_kitchen_protocols TO anon;
GRANT SELECT ON restaurant.restaurant_cuisine_options TO anon;
GRANT SELECT ON restaurant.restaurant_allergens_handled TO anon;
GRANT SELECT ON restaurant.restaurant_hours TO anon;

-- Menu tables
GRANT SELECT ON restaurant.restaurant_menu_items TO anon;
GRANT SELECT ON restaurant.restaurant_menu_categories TO anon;

-- Menu item related tables
GRANT SELECT ON restaurant.restaurant_menu_item_allergen_modifications TO anon;
GRANT SELECT ON restaurant.restaurant_menu_item_allergens TO anon;
GRANT SELECT ON restaurant.restaurant_menu_item_dietary_options TO anon;
GRANT SELECT ON restaurant.restaurant_menu_item_images TO anon;
GRANT SELECT ON restaurant.restaurant_menu_item_modification_notes TO anon;
GRANT SELECT ON restaurant.restaurant_menu_item_preparation_methods TO anon;
GRANT SELECT ON restaurant.restaurant_menu_item_protocol_overrides TO anon;
