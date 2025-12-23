-- RPC Function: get_travel_card_data_web
-- Purpose: Fetch travel card, languages, categories, and merged phrases in a single database call for web
-- Returns data structure matching UserTravelPhraseWithDetails TypeScript type
--
-- Usage from TypeScript:
-- const { data, error } = await supabase.rpc('get_travel_card_data_web', { p_user_id: 'uuid-here' })

CREATE OR REPLACE FUNCTION travel.get_travel_card_data_web(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
  v_travel_card_id UUID;
BEGIN
  -- First get the travel_card_id from user_travel_cards
  SELECT id INTO v_travel_card_id
  FROM travel.user_travel_cards
  WHERE user_id = p_user_id
    AND (is_deleted IS NULL OR is_deleted = false)
  LIMIT 1;

  -- If no card found, return structure with nulls and empty arrays
  IF v_travel_card_id IS NULL THEN
    RETURN json_build_object(
      'travelCard', NULL,
      'travelLanguages', '[]'::json,
      'travelPhrases', '[]'::json,
      'travelCategories', '[]'::json
    );
  END IF;

  -- Build the result JSON
  SELECT json_build_object(
    'travelCard', (
      SELECT row_to_json(utc)
      FROM travel.user_travel_cards utc
      WHERE utc.id = v_travel_card_id
      LIMIT 1
    ),
    'travelLanguages', (
      SELECT COALESCE(json_agg(
        row_to_json(utl)
        ORDER BY utl.created_at ASC
      ), '[]'::json)
      FROM travel.user_travel_languages utl
      WHERE utl.user_id = p_user_id
        AND utl.travel_card_id = v_travel_card_id
    ),
    'travelCategories', (
      SELECT COALESCE(json_agg(
        row_to_json(tpc)
      ), '[]'::json)
      FROM travel.travel_phrase_categories tpc
    ),
    'travelPhrases', (
      SELECT COALESCE(json_agg(merged_phrases ORDER BY created_at ASC), '[]'::json)
      FROM (
        WITH default_phrases AS (
          -- Get all default travel phrases
          SELECT
            tp.id,
            tp.created_at,
            tp.phrase_key,
            tp.category_id,
            tp.text,
            tp.placeholder_type
          FROM travel.travel_phrases tp
        ),
        user_phrases AS (
          -- Get all user's travel phrases (both modified defaults and custom)
          SELECT
            utp.id,
            utp.created_at,
            utp.travel_card_id,
            utp.default_phrase_id,
            utp.allergen_ids,
            utp.user_id,
            utp.contact_ids
          FROM travel.user_travel_phrases utp
          WHERE utp.user_id = p_user_id
            AND utp.travel_card_id = v_travel_card_id
        )
        -- Merge: Create UserTravelPhraseWithDetails structure
        SELECT
          -- If user has modified/created this phrase, use user phrase id, otherwise create virtual id
          COALESCE(up.id::text, CONCAT('default-', dp.id::text)) AS id,
          COALESCE(up.created_at, dp.created_at) AS created_at,
          COALESCE(up.travel_card_id, v_travel_card_id) AS travel_card_id,
          dp.id AS default_phrase_id,
          COALESCE(up.allergen_ids, ARRAY[]::uuid[]) AS allergen_ids,
          p_user_id AS user_id,
          COALESCE(up.contact_ids, ARRAY[]::uuid[]) AS contact_ids,
          -- Include the default phrase reference (null for custom phrases)
          CASE
            WHEN dp.id IS NOT NULL THEN
              json_build_object(
                'id', dp.id,
                'created_at', dp.created_at,
                'phrase_key', dp.phrase_key,
                'category_id', dp.category_id,
                'text', dp.text,
                'placeholder_type', dp.placeholder_type
              )
            ELSE NULL
          END AS travel_phrase,
          -- Include category information
          CASE
            WHEN dp.category_id IS NOT NULL THEN
              (
                SELECT json_build_object(
                  'id', tpc.id,
                  'category_key', tpc.category_key,
                  'category_name', tpc.category_name
                )
                FROM travel.travel_phrase_categories tpc
                WHERE tpc.id = dp.category_id
              )
            ELSE NULL
          END AS category,
          -- Resolve allergen_ids to full allergen objects
          CASE
            WHEN up.allergen_ids IS NOT NULL AND array_length(up.allergen_ids, 1) > 0 THEN
              (
                SELECT COALESCE(json_agg(
                  json_build_object(
                    'id', ua.id,
                    'created_at', ua.created_at,
                    'updated_at', ua.updated_at,
                    'severity', ua.severity,
                    'user_id', ua.user_id,
                    'allergen', ua.allergen,
                    'twemoji', ua.twemoji
                  )
                  ORDER BY ua.created_at ASC
                ), '[]'::json)
                FROM allergies.user_allergens ua
                WHERE ua.id = ANY(up.allergen_ids)
              )
            ELSE '[]'::json
          END AS allergens,
          -- Resolve contact_ids to full contact objects
          CASE
            WHEN up.contact_ids IS NOT NULL AND array_length(up.contact_ids, 1) > 0 THEN
              (
                SELECT COALESCE(json_agg(
                  json_build_object(
                    'id', uec.id,
                    'created_at', uec.created_at,
                    'card_id', uec.card_id,
                    'user_id', uec.user_id,
                    'full_name', uec.full_name,
                    'relationship', uec.relationship,
                    'phone_number', uec.phone_number,
                    'is_mobile', uec.is_mobile,
                    'email', uec.email,
                    'priority', uec.priority
                  )
                  ORDER BY uec.priority ASC, uec.created_at ASC
                ), '[]'::json)
                FROM emergency.user_emergency_card_contacts uec
                WHERE uec.id = ANY(up.contact_ids)
              )
            ELSE '[]'::json
          END AS contacts
        FROM default_phrases dp
        FULL OUTER JOIN user_phrases up ON dp.id = up.default_phrase_id
        WHERE
          -- Include if it's a default phrase (with or without user modification)
          dp.id IS NOT NULL
          -- OR if it's a custom user phrase (not in defaults)
          OR (dp.id IS NULL AND up.default_phrase_id IS NULL)
      ) AS merged_phrases
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION travel.get_travel_card_data_web(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION travel.get_travel_card_data_web(UUID) TO anon;

-- Add comment for documentation
COMMENT ON FUNCTION travel.get_travel_card_data_web(UUID) IS
'Fetches travel card, languages, categories, and merged phrases for web app. Returns structure matching UserTravelPhraseWithDetails TypeScript type.';
