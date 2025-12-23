-- RPC Function: get_swe_card_data_web
-- Purpose: Fetch SWE card, merged categories, and merged measures in a single database call for web
-- Returns data structure matching UserSweCategoryWithDetails and UserSweMeasureWithDetails TypeScript types
--
-- Usage from TypeScript:
-- const { data, error } = await supabase.rpc('get_swe_card_data_web', { p_card_id: 'uuid-here' })

CREATE OR REPLACE FUNCTION swe.get_swe_card_data_web(p_card_id UUID)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
  v_user_id UUID;
  v_swe_card_id UUID;
BEGIN
  -- First get the user_id and swe_card_id from the card
  SELECT user_id, id INTO v_user_id, v_swe_card_id
  FROM swe.user_swe_cards
  WHERE card_id = p_card_id
  LIMIT 1;

  -- If no card found, return null
  IF v_user_id IS NULL THEN
    RETURN NULL;
  END IF;

  -- Build the result JSON
  SELECT json_build_object(
    'card', (
      SELECT row_to_json(usc)
      FROM swe.user_swe_cards usc
      WHERE usc.card_id = p_card_id
      LIMIT 1
    ),
    'categories', (
      SELECT COALESCE(json_agg(merged_categories ORDER BY created_at ASC), '[]'::json)
      FROM (
        WITH default_categories AS (
          -- Get all default SWE categories
          SELECT
            sc.id,
            sc.created_at,
            sc.category_name
          FROM swe.swe_categories sc
        ),
        user_categories AS (
          -- Get all user's categories (both modified defaults and custom)
          SELECT
            usc.id,
            usc.created_at,
            usc.user_id,
            usc.default_category_id,
            usc.custom_category_name,
            usc.is_deleted,
            usc.swe_card_id
          FROM swe.user_swe_categories usc
          WHERE usc.user_id = v_user_id
        )
        -- Merge: Create UserSweCategoryWithDetails structure
        SELECT
          -- If user has modified/created this category, use user category id, otherwise create virtual id
          COALESCE(uc.id::text, CONCAT('default-', dc.id::text)) AS id,
          COALESCE(uc.created_at, dc.created_at) AS created_at,
          v_user_id AS user_id,
          dc.id AS default_category_id,
          uc.custom_category_name,
          COALESCE(uc.is_deleted, false) AS is_deleted,
          COALESCE(uc.swe_card_id, v_swe_card_id) AS swe_card_id,
          -- Include the default category reference (null for custom categories)
          CASE
            WHEN dc.id IS NOT NULL THEN
              json_build_object(
                'id', dc.id,
                'created_at', dc.created_at,
                'category_name', dc.category_name
              )
            ELSE NULL
          END AS swe_category
        FROM default_categories dc
        FULL OUTER JOIN user_categories uc ON dc.id = uc.default_category_id
        WHERE
          -- Exclude deleted categories
          (uc.is_deleted IS NULL OR uc.is_deleted = false)
          AND (
            -- Include if it's a default category (with or without override)
            dc.id IS NOT NULL
            -- OR if it's a custom user category (not in defaults)
            OR (dc.id IS NULL AND uc.default_category_id IS NULL)
          )
      ) AS merged_categories
    ),
    'measures', (
      SELECT COALESCE(json_agg(merged_measures ORDER BY created_at ASC), '[]'::json)
      FROM (
        WITH default_measures AS (
          -- Get all default SWE measures
          SELECT
            sm.id,
            sm.created_at,
            sm.category_id,
            sm.instruction_key,
            sm.instruction_text
          FROM swe.swe_measures sm
        ),
        user_measures AS (
          -- Get all user's measures (both modified defaults and custom)
          SELECT
            usm.id,
            usm.created_at,
            usm.user_category_id,
            usm.instruction_text,
            usm.is_deleted,
            usm.is_custom,
            usm.user_id,
            usm.swe_card_id,
            usm.instruction_key
          FROM swe.user_swe_measures usm
          WHERE usm.user_id = v_user_id
        )
        -- Merge: Create UserSweMeasureWithDetails structure
        SELECT
          -- If user has modified/created this measure, use user measure id, otherwise create virtual id
          COALESCE(um.id::text, CONCAT('default-', dm.id::text)) AS id,
          COALESCE(um.created_at, dm.created_at) AS created_at,
          COALESCE(um.user_category_id, dm.category_id) AS user_category_id,
          COALESCE(um.instruction_text, dm.instruction_text) AS instruction_text,
          COALESCE(um.is_deleted, false) AS is_deleted,
          COALESCE(um.is_custom, false) AS is_custom,
          v_user_id AS user_id,
          COALESCE(um.swe_card_id, v_swe_card_id) AS swe_card_id,
          COALESCE(um.instruction_key, dm.instruction_key) AS instruction_key,
          -- Include the default measure reference (null for custom measures)
          CASE
            WHEN dm.instruction_key IS NOT NULL THEN
              json_build_object(
                'id', dm.id,
                'created_at', dm.created_at,
                'category_id', dm.category_id,
                'instruction_key', dm.instruction_key,
                'instruction_text', dm.instruction_text
              )
            ELSE NULL
          END AS swe_measure
        FROM default_measures dm
        FULL OUTER JOIN user_measures um ON dm.instruction_key = um.instruction_key
        WHERE
          -- Exclude deleted measures
          (um.is_deleted IS NULL OR um.is_deleted = false)
          AND (
            -- Include if it's a default measure (with or without override)
            dm.instruction_key IS NOT NULL
            -- OR if it's a custom user measure (custom instruction_key)
            OR (dm.instruction_key IS NULL AND um.instruction_key LIKE 'custom-%')
          )
      ) AS merged_measures
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION swe.get_swe_card_data_web(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION swe.get_swe_card_data_web(UUID) TO anon;

-- Add comment for documentation
COMMENT ON FUNCTION swe.get_swe_card_data_web(UUID) IS
'Fetches SWE card, merged categories, and merged measures for web app. Returns structure matching UserSweCategoryWithDetails and UserSweMeasureWithDetails TypeScript types.';
