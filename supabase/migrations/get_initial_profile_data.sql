-- RPC Function: get_initial_profile_data
-- Purpose: Fetch all initial profile data in a single database call
-- Replaces 5 sequential queries with 1 optimized server-side function
--
-- Usage from TypeScript:
-- const { data, error } = await supabase.rpc('get_initial_profile_data', { profile_slug: 'user-slug' })

CREATE OR REPLACE FUNCTION public.get_initial_profile_data(profile_slug TEXT)
RETURNS JSON AS $$
DECLARE
  v_profile_id UUID;
  v_user_id UUID;
  v_result JSON;
BEGIN
  -- Step 1: Get user_web_profile_id from slug
  SELECT user_web_profile_id INTO v_profile_id
  FROM web_profiles.user_web_profile_urls
  WHERE slug = profile_slug;

  -- Error handling: slug not found
  IF v_profile_id IS NULL THEN
    RAISE EXCEPTION 'No profile found with slug "%"', profile_slug;
  END IF;

  -- Step 2: Get user_id from profile
  SELECT user_id INTO v_user_id
  FROM web_profiles.user_web_profiles
  WHERE id = v_profile_id;

  -- Error handling: profile not found
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Profile not found for slug "%"', profile_slug;
  END IF;

  -- Step 3: Build complete result object with all data
  -- This runs all subqueries in parallel on the database server
  SELECT json_build_object(
    'profile', (
      SELECT json_build_object(
        'id', p.id,
        'created_at', p.created_at,
        'updated_at', p.updated_at,
        'user_id', p.user_id,
        'about_me', p.about_me,
        'privacy_type', p.privacy_type,
        'profile_password', p.profile_password,
        'display_emergency_contact', p.display_emergency_contact,
        'display_epipen', p.display_epipen,
        'is_deleted', p.is_deleted,
        'first_name', up.first_name,
        'last_name', up.last_name,
        'account_type', up.account_type
      )
      FROM web_profiles.user_web_profiles p
      LEFT JOIN core.user_profiles up ON up.user_id = p.user_id
      WHERE p.id = v_profile_id
    ),
    'selectedCards', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', sc.id,
          'created_at', sc.created_at,
          'user_web_profiles_id', sc.user_web_profiles_id,
          'selected_card_id', sc.selected_card_id,
          'selected_subitems', sc.selected_subitems,
          'user_id', sc.user_id,
          'is_deleted', sc.is_deleted
        )
      ), '[]'::json)
      FROM web_profiles.user_web_profiles_selected_cards sc
      WHERE sc.user_web_profiles_id = v_profile_id
        AND sc.is_deleted = false
    ),
    'allergens', (
      SELECT COALESCE(json_agg(row_to_json(a.*)), '[]'::json)
      FROM allergies.user_allergens a
      WHERE a.user_id = v_user_id
    ),
    'emergencyContacts', (
      SELECT COALESCE(
        json_agg(
          row_to_json(ec.*) ORDER BY ec.priority ASC
        ),
        '[]'::json
      )
      FROM emergency.user_emergency_card_contacts ec
      WHERE ec.card_id IN (
        SELECT card_id
        FROM emergency.user_emergency_cards
        WHERE user_id = v_user_id
        LIMIT 1
      )
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
-- Adjust this based on your RLS policies and security requirements
GRANT EXECUTE ON FUNCTION public.get_initial_profile_data(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_initial_profile_data(TEXT) TO anon;

-- Add comment for documentation
COMMENT ON FUNCTION public.get_initial_profile_data(TEXT) IS
'Fetches initial profile data for page load in a single call. Returns profile, selectedCards, allergens, and emergencyContacts as JSON.';
