-- RPC Function: get_epipen_card_data_web
-- Purpose: Fetch epipen card and merged instructions in a single database call for web
-- Returns data structure matching UserEpipenInstructionWithDetails TypeScript type
--
-- Usage from TypeScript:
-- const { data, error } = await supabase.rpc('get_epipen_card_data_web', { p_card_id: 'uuid-here' })

CREATE OR REPLACE FUNCTION epipen.get_epipen_card_data_web(p_card_id UUID)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
  v_user_id UUID;
BEGIN
  -- First get the user_id from the card
  SELECT user_id INTO v_user_id
  FROM epipen.user_epipen_cards
  WHERE card_id = p_card_id
  LIMIT 1;

  -- If no card found, return null
  IF v_user_id IS NULL THEN
    RETURN NULL;
  END IF;

  -- Build the result JSON
  SELECT json_build_object(
    'card', (
      SELECT row_to_json(uec)
      FROM epipen.user_epipen_cards uec
      WHERE uec.card_id = p_card_id
      LIMIT 1
    ),
    'instructions', (
      SELECT COALESCE(json_agg(merged_instructions ORDER BY sort_order ASC), '[]'::json)
      FROM (
        WITH default_instructions AS (
          -- Get all default EpiPen instructions
          SELECT
            ei.id,
            ei.created_at,
            ei.instruction_key,
            ei.instruction_text,
            ei.icon_type,
            ei.sort_order
          FROM epipen.epipen_instructions ei
        ),
        user_instructions AS (
          -- Get all user's instructions (both modified defaults and custom)
          SELECT
            uei.id,
            uei.created_at,
            uei.user_id,
            uei.instruction_key,
            uei.instruction_text,
            uei.icon_type,
            uei.sort_order,
            uei.is_deleted
          FROM epipen.user_epipen_instructions uei
          WHERE uei.user_id = v_user_id
        )
        -- Merge: Create UserEpipenInstructionWithDetails structure
        SELECT
          -- If user has modified/created this instruction, use user instruction id, otherwise create virtual id
          COALESCE(ui.id::text, CONCAT('default-', di.id::text)) AS id,
          COALESCE(ui.created_at, di.created_at) AS created_at,
          v_user_id AS user_id,
          COALESCE(ui.instruction_key, di.instruction_key) AS instruction_key,
          COALESCE(ui.instruction_text, di.instruction_text) AS instruction_text,
          COALESCE(ui.icon_type, di.icon_type) AS icon_type,
          COALESCE(ui.sort_order, di.sort_order) AS sort_order,
          COALESCE(ui.is_deleted, false) AS is_deleted,
          -- Include the default instruction reference (null for custom instructions)
          CASE
            WHEN di.instruction_key IS NOT NULL THEN
              json_build_object(
                'id', di.id,
                'created_at', di.created_at,
                'instruction_key', di.instruction_key,
                'instruction_text', di.instruction_text,
                'icon_type', di.icon_type,
                'sort_order', di.sort_order
              )
            ELSE NULL
          END AS epipen_instruction
        FROM default_instructions di
        FULL OUTER JOIN user_instructions ui ON di.instruction_key = ui.instruction_key
        WHERE
          -- Exclude deleted instructions
          (ui.is_deleted IS NULL OR ui.is_deleted = false)
          AND (
            -- Include if it's a default instruction (with or without override)
            di.instruction_key IS NOT NULL
            -- OR if it's a custom user instruction (not in defaults)
            OR (di.instruction_key IS NULL AND ui.instruction_key IS NOT NULL)
          )
      ) AS merged_instructions
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION epipen.get_epipen_card_data_web(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION epipen.get_epipen_card_data_web(UUID) TO anon;

-- Add comment for documentation
COMMENT ON FUNCTION epipen.get_epipen_card_data_web(UUID) IS
'Fetches epipen card and merged instructions for web app. Returns structure matching UserEpipenInstructionWithDetails TypeScript type.';
