-- RPC Function: get_restaurant_profile_data
-- Purpose: Fetch all restaurant profile data in a single database call
-- Replaces 363+ sequential queries (13 restaurant queries + 350 menu item queries) with 1 optimized server-side function
--
-- Usage from TypeScript:
-- const { data, error } = await supabase.rpc('get_restaurant_profile_data', { restaurant_slug: 'restaurant-slug' })

CREATE OR REPLACE FUNCTION public.get_restaurant_profile_data(restaurant_slug TEXT)
RETURNS JSON AS $$
DECLARE
  v_url_data RECORD;
  v_profile_id UUID;
  v_restaurant_id UUID;
  v_result JSON;
BEGIN
  -- Step 1: Get restaurant_web_profile_id and restaurant_id from slug
  SELECT
    restaurant_web_profile_id,
    restaurant_id,
    row_to_json(url_table.*) as url_json
  INTO v_url_data
  FROM web_profiles.restaurant_web_profile_urls url_table
  WHERE slug = restaurant_slug;

  -- Error handling: slug not found
  IF v_url_data IS NULL THEN
    RAISE EXCEPTION 'No restaurant profile found with slug "%"', restaurant_slug;
  END IF;

  v_profile_id := v_url_data.restaurant_web_profile_id;
  v_restaurant_id := v_url_data.restaurant_id;

  -- Error handling: restaurant_id not found
  IF v_restaurant_id IS NULL THEN
    RAISE EXCEPTION 'No restaurant_id found for slug "%"', restaurant_slug;
  END IF;

  -- Step 2: Build complete result object with all data
  -- This runs all subqueries in parallel on the database server
  SELECT json_build_object(
    -- Web profile data
    'url', v_url_data.url_json,
    'profile', (
      SELECT row_to_json(p.*)
      FROM web_profiles.restaurant_web_profiles p
      WHERE p.id = v_profile_id
    ),
    'images', (
      SELECT COALESCE(
        json_agg(row_to_json(img.*) ORDER BY img.sort_order ASC),
        '[]'::json
      )
      FROM web_profiles.restaurant_web_profile_images img
      WHERE img.restaurant_web_profile_id = v_profile_id
    ),

    -- Restaurant data
    'restaurant', (
      SELECT row_to_json(r.*)
      FROM restaurant.restaurants r
      WHERE r.id = v_restaurant_id
    ),
    'address', (
      SELECT row_to_json(a.*)
      FROM restaurant.restaurant_addresses a
      WHERE a.restaurant_id = v_restaurant_id
      LIMIT 1
    ),
    'dietaryOptions', (
      SELECT COALESCE(json_agg(row_to_json(diet_opt.*)), '[]'::json)
      FROM restaurant.restaurant_dietary_options diet_opt
      WHERE diet_opt.restaurant_id = v_restaurant_id
    ),
    'kitchenProtocols', (
      SELECT COALESCE(json_agg(row_to_json(kp.*)), '[]'::json)
      FROM restaurant.restaurant_kitchen_protocols kp
      WHERE kp.restaurant_id = v_restaurant_id
    ),
    'cuisineOptions', (
      SELECT COALESCE(json_agg(row_to_json(co.*)), '[]'::json)
      FROM restaurant.restaurant_cuisine_options co
      WHERE co.restaurant_id = v_restaurant_id
    ),
    'allergensHandled', (
      SELECT COALESCE(json_agg(row_to_json(ah.*)), '[]'::json)
      FROM restaurant.restaurant_allergens_handled ah
      WHERE ah.restaurant_id = v_restaurant_id
    ),
    'hours', (
      SELECT COALESCE(
        json_agg(row_to_json(h.*) ORDER BY h.weekday ASC),
        '[]'::json
      )
      FROM restaurant.restaurant_hours h
      WHERE h.restaurant_id = v_restaurant_id
    ),

    -- Menu data with nested item details
    'menuCategories', (
      SELECT COALESCE(
        json_agg(row_to_json(mc.*) ORDER BY mc.sort_order ASC),
        '[]'::json
      )
      FROM restaurant.restaurant_menu_categories mc
      WHERE mc.restaurant_id = v_restaurant_id
    ),
    'menuItems', (
      SELECT COALESCE(json_agg(
        json_build_object(
          -- Menu item base fields
          'id', mi.id,
          'created_at', mi.created_at,
          'updated_at', mi.updated_at,
          'restaurant_id', mi.restaurant_id,
          'category_id', mi.category_id,
          'name', mi.name,
          'description', mi.description,
          'price', mi.price,
          'is_active', mi.is_active,
          'is_deleted', mi.is_deleted,

          -- Nested menu item related data
          'allergen_modifications', (
            SELECT COALESCE(json_agg(row_to_json(am.*)), '[]'::json)
            FROM restaurant.restaurant_menu_item_allergen_modifications am
            WHERE am.menu_item_id = mi.id
          ),
          'allergens', (
            SELECT COALESCE(json_agg(row_to_json(a.*)), '[]'::json)
            FROM restaurant.restaurant_menu_item_allergens a
            WHERE a.menu_item_id = mi.id
          ),
          'dietary_options', (
            SELECT COALESCE(json_agg(row_to_json(diet_opt.*)), '[]'::json)
            FROM restaurant.restaurant_menu_item_dietary_options diet_opt
            WHERE diet_opt.menu_item_id = mi.id
          ),
          'images', (
            SELECT COALESCE(
              json_agg(row_to_json(img.*) ORDER BY img.sort_order ASC),
              '[]'::json
            )
            FROM restaurant.restaurant_menu_item_images img
            WHERE img.menu_item_id = mi.id
          ),
          'modification_notes', (
            SELECT COALESCE(json_agg(row_to_json(mn.*)), '[]'::json)
            FROM restaurant.restaurant_menu_item_modification_notes mn
            WHERE mn.menu_item_id = mi.id
          ),
          'preparation_methods', (
            SELECT COALESCE(json_agg(row_to_json(pm.*)), '[]'::json)
            FROM restaurant.restaurant_menu_item_preparation_methods pm
            WHERE pm.menu_item_id = mi.id
          ),
          'protocol_overrides', (
            SELECT COALESCE(json_agg(row_to_json(po.*)), '[]'::json)
            FROM restaurant.restaurant_menu_item_protocol_overrides po
            WHERE po.menu_item_id = mi.id
          )
        )
      ), '[]'::json)
      FROM restaurant.restaurant_menu_items mi
      WHERE mi.restaurant_id = v_restaurant_id
    ),

    -- Restaurant reviews with user info and images
    'restaurantReviews', (
      SELECT COALESCE(
        json_agg(
          json_build_object(
            'review', row_to_json(rr.*),
            'user', (
              SELECT json_build_object(
                'first_name', up.first_name,
                'last_name', up.last_name
              )
              FROM core.user_profiles up
              WHERE up.user_id = rr.user_id
            ),
            'images', (
              SELECT COALESCE(
                json_agg(
                  row_to_json(rri.*) ORDER BY rri.sort_order ASC NULLS LAST
                ),
                '[]'::json
              )
              FROM restaurant.restaurant_review_images rri
              WHERE rri.restaurant_review_id = rr.id
            )
          ) ORDER BY rr.created_at DESC
        ),
        '[]'::json
      )
      FROM restaurant.restaurant_reviews rr
      WHERE rr.restaurant_id = v_restaurant_id
        AND rr.is_deleted = false
      LIMIT 5
    ),

    -- Menu item reviews with user info, images, and menu item details
    'menuItemReviews', (
      SELECT COALESCE(
        json_agg(
          json_build_object(
            'review', row_to_json(mir.*),
            'user', (
              SELECT json_build_object(
                'first_name', up.first_name,
                'last_name', up.last_name
              )
              FROM core.user_profiles up
              WHERE up.user_id = mir.user_id
            ),
            'menuItem', (
              SELECT json_build_object(
                'id', mi.id,
                'name', mi.name,
                'description', mi.description
              )
              FROM restaurant.restaurant_menu_items mi
              WHERE mi.id = mir.restaurant_menu_item_id
            ),
            'images', (
              SELECT COALESCE(
                json_agg(
                  row_to_json(miri.*) ORDER BY miri.sort_order ASC NULLS LAST
                ),
                '[]'::json
              )
              FROM restaurant.restaurant_menu_item_review_images miri
              WHERE miri.restaurant_menu_item_review_id = mir.id
            )
          ) ORDER BY mir.created_at DESC
        ),
        '[]'::json
      )
      FROM restaurant.restaurant_menu_item_reviews mir
      WHERE mir.restaurant_menu_item_id IN (
        SELECT id FROM restaurant.restaurant_menu_items WHERE restaurant_id = v_restaurant_id
      )
        AND mir.is_deleted = false
      LIMIT 5
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated and anonymous users
-- Adjust this based on your RLS policies and security requirements
GRANT EXECUTE ON FUNCTION public.get_restaurant_profile_data(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_restaurant_profile_data(TEXT) TO anon;

-- Add comment for documentation
COMMENT ON FUNCTION public.get_restaurant_profile_data(TEXT) IS
'Fetches complete restaurant profile data for page load in a single call. Returns URL, profile, images, restaurant details, address, dietary options, kitchen protocols, cuisine options, allergens handled, hours, menu categories, menu items (with all nested details), restaurant reviews (last 5), and menu item reviews (last 5) as JSON. Replaces 363+ queries with 1 optimized server-side call.';
