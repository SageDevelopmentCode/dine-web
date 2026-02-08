-- =====================================================
-- RPC Function: get_travel_card_data_web
-- =====================================================
-- Purpose: Fetch all travel card data (languages, phrases, translations, allergens, contacts) in a single query
-- Based on mobile's proven RPC structure - returns separate arrays for client-side merging
-- Parameters:
--   p_user_id: UUID - The user ID
--   p_card_id: TEXT - The core.user_cards.id (which links to user_travel_cards)
-- Returns: JSON object with all related data
-- =====================================================
--
-- Usage from TypeScript:
-- const { data, error } = await supabase.rpc('get_travel_card_data_web', {
--   p_user_id: 'uuid-here',
--   p_card_id: 'card-uuid-here'
-- })

CREATE OR REPLACE FUNCTION travel.get_travel_card_data_web(
  p_user_id UUID,
  p_card_id TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_travel_card_id UUID;
  v_result JSON;
BEGIN
  -- Step 1: Get the user_travel_cards record to obtain the travel_card_id
  -- The p_card_id parameter is core.user_cards.id, but we need user_travel_cards.id
  SELECT id INTO v_travel_card_id
  FROM travel.user_travel_cards
  WHERE user_id = p_user_id
    AND card_id = p_card_id::uuid
    AND is_deleted = false
  LIMIT 1;

  -- If no travel card found, return structure with nulls and empty arrays
  IF v_travel_card_id IS NULL THEN
    RETURN json_build_object(
      'travel_card_id', NULL,
      'languages', '[]'::json,
      'user_phrases', '[]'::json,
      'all_phrases', '[]'::json,
      'allergens', '[]'::json,
      'emergency_contacts', '[]'::json,
      'translations', '[]'::json,
      'categories', '[]'::json
    );
  END IF;

  -- Step 2: Build complete result with all related data in separate arrays
  SELECT json_build_object(
    'travel_card_id', v_travel_card_id,
    -- Languages selected by user for this travel card
    'languages', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', utl.id,
          'user_id', utl.user_id,
          'travel_card_id', utl.travel_card_id,
          'language_code', utl.language_code,
          'created_at', utl.created_at
        )
        ORDER BY utl.created_at ASC
      ), '[]'::json)
      FROM travel.user_travel_languages utl
      WHERE utl.user_id = p_user_id
        AND utl.travel_card_id = v_travel_card_id
    ),
    -- User's phrase selections (language-agnostic, one row per phrase concept)
    'user_phrases', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', utp.id,
          'user_id', utp.user_id,
          'travel_card_id', utp.travel_card_id,
          'default_phrase_id', utp.default_phrase_id,
          'allergen_ids', utp.allergen_ids,
          'contact_ids', utp.contact_ids,
          'created_at', utp.created_at
        )
        ORDER BY utp.created_at ASC
      ), '[]'::json)
      FROM travel.user_travel_phrases utp
      WHERE utp.user_id = p_user_id
        AND utp.travel_card_id = v_travel_card_id
    ),
    -- All default phrases with category info
    'all_phrases', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', tp.id,
          'phrase_key', tp.phrase_key,
          'text', tp.text,
          'category_id', tp.category_id,
          'placeholder_type', tp.placeholder_type,
          'created_at', tp.created_at,
          'category_key', tpc.category_key,
          'category_name', tpc.category_name
        )
        ORDER BY tp.created_at ASC
      ), '[]'::json)
      FROM travel.travel_phrases tp
      LEFT JOIN travel.travel_phrase_categories tpc ON tp.category_id = tpc.id
    ),
    -- User's allergens with translations
    'allergens', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', ua.id,
          'user_id', ua.user_id,
          'allergen', ua.allergen,
          'twemoji', ua.twemoji,
          'severity', ua.severity,
          'created_at', ua.created_at,
          'updated_at', ua.updated_at,
          'translations', (
            SELECT COALESCE(
              json_object_agg(
                at.language_code,
                at.translated_name
              ),
              '{}'::json
            )
            FROM travel.allergen_translations at
            WHERE at.allergen_name = ua.allergen
          )
        )
        ORDER BY ua.created_at ASC
      ), '[]'::json)
      FROM allergies.user_allergens ua
      WHERE ua.user_id = p_user_id
    ),
    -- User's emergency contacts
    'emergency_contacts', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', uec.id,
          'user_id', uec.user_id,
          'card_id', uec.card_id,
          'full_name', uec.full_name,
          'relationship', uec.relationship,
          'phone_number', uec.phone_number,
          'is_mobile', uec.is_mobile,
          'email', uec.email,
          'priority', uec.priority,
          'created_at', uec.created_at
        )
        ORDER BY uec.priority ASC, uec.created_at ASC
      ), '[]'::json)
      FROM emergency.user_emergency_card_contacts uec
      WHERE uec.user_id = p_user_id
    ),
    -- All translations for user's phrases (flat array, client will merge)
    'translations', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', utpt.id,
          'user_id', utpt.user_id,
          'user_travel_phrase_id', utpt.user_travel_phrase_id,
          'language_code', utpt.language_code,
          'translated_text', utpt.translated_text,
          'is_custom', utpt.is_custom,
          'created_at', utpt.created_at,
          'updated_at', utpt.updated_at
        )
        ORDER BY utpt.created_at ASC
      ), '[]'::json)
      FROM travel.user_travel_phrase_translations utpt
      INNER JOIN travel.user_travel_phrases utp ON utpt.user_travel_phrase_id = utp.id
      WHERE utpt.user_id = p_user_id
        AND utp.travel_card_id = v_travel_card_id
    ),
    -- All phrase categories
    'categories', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', tpc.id,
          'category_key', tpc.category_key,
          'category_name', tpc.category_name
        )
      ), '[]'::json)
      FROM travel.travel_phrase_categories tpc
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION travel.get_travel_card_data_web(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION travel.get_travel_card_data_web(UUID, TEXT) TO anon;

-- Add comment for documentation
COMMENT ON FUNCTION travel.get_travel_card_data_web(UUID, TEXT) IS
'Fetches travel card data in mobile-style structure with separate arrays. Client-side merging required for final UserTravelPhraseWithDetails format.';
