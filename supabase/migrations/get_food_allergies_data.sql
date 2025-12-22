-- =============================================
-- Function: get_food_allergies_data
-- Description: Retrieves comprehensive food allergy data for a user profile
-- Parameters:
--   profile_slug: The URL slug for the user's web profile
-- Returns: JSON object containing:
--   - reactionProfile: User's reaction profile data
--   - reactionSymptoms: User's reaction symptoms with symptom details
--   - safetyLevels: User's safety levels with default level details
--   - safetyRules: Merged default and custom safety rules
-- =============================================

CREATE OR REPLACE FUNCTION public.get_food_allergies_data(profile_slug TEXT)
RETURNS JSON AS $$
DECLARE
  v_profile_id UUID;
  v_user_id UUID;
  v_reaction_profile JSON;
  v_reaction_symptoms JSON;
  v_safety_levels JSON;
  v_safety_rules JSON;
  v_result JSON;
BEGIN
  -- Step 1: Get profile_id from slug
  SELECT user_web_profile_id INTO v_profile_id
  FROM web_profiles.user_web_profile_urls
  WHERE slug = profile_slug;

  IF v_profile_id IS NULL THEN
    RAISE EXCEPTION 'Profile not found for slug "%"', profile_slug;
  END IF;

  -- Step 2: Get user_id from profile
  SELECT user_id INTO v_user_id
  FROM web_profiles.user_web_profiles
  WHERE id = v_profile_id;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found for profile_id "%"', v_profile_id;
  END IF;

  -- Step 3: Get user reaction profile
  SELECT row_to_json(urp.*) INTO v_reaction_profile
  FROM allergies.user_reaction_profiles urp
  WHERE urp.user_id = v_user_id;

  -- Step 4: Get user reaction symptoms with symptom details
  SELECT COALESCE(json_agg(
    json_build_object(
      'id', urs.id,
      'created_at', urs.created_at,
      'user_reaction_profile_id', urs.user_reaction_profile_id,
      'symptom_id', urs.symptom_id,
      'custom_symptom', urs.custom_symptom,
      'is_custom', urs.is_custom,
      'user_id', urs.user_id,
      'custom_symptom_severity', urs.custom_symptom_severity,
      'symptom', CASE
        WHEN urs.is_custom THEN NULL
        ELSE s_data.symptom
      END
    ) ORDER BY urs.created_at ASC
  ), '[]'::json) INTO v_reaction_symptoms
  FROM allergies.user_reaction_symptoms urs
  LEFT JOIN LATERAL (
    SELECT row_to_json(s.*) AS symptom
    FROM allergies.symptoms s
    WHERE s.id = urs.symptom_id
  ) s_data ON NOT urs.is_custom
  WHERE urs.user_id = v_user_id;

  -- Step 5: Get user safety levels with safety level details
  SELECT COALESCE(json_agg(
    json_build_object(
      'id', usl.id,
      'created_at', usl.created_at,
      'updated_at', usl.updated_at,
      'safety_level_id', usl.safety_level_id,
      'is_custom', usl.is_custom,
      'user_id', usl.user_id,
      'safety_level', CASE
        WHEN usl.is_custom THEN NULL
        ELSE sl_data.safety_level
      END
    )
  ), '[]'::json) INTO v_safety_levels
  FROM allergies.user_safety_levels usl
  LEFT JOIN LATERAL (
    SELECT row_to_json(sl.*) AS safety_level
    FROM allergies.safety_levels sl
    WHERE sl.id = usl.safety_level_id
  ) sl_data ON NOT usl.is_custom
  WHERE usl.user_id = v_user_id;

  -- Step 6: Get merged safety rules (default + user modifications + custom)
  WITH default_rules AS (
    SELECT
      sr.id,
      sr.created_at,
      sr.safety_level_id,
      sr.rule_key,
      sr.rule_text,
      sr.sort_order,
      sr.icon_type
    FROM allergies.safety_rules sr
    ORDER BY sr.sort_order ASC
  ),
  user_rules AS (
    SELECT
      usr.id,
      usr.created_at,
      usr.updated_at,
      usr.user_id,
      usr.user_safety_level_id,
      usr.rule_key,
      usr.rule_text,
      usr.sort_order,
      usr.icon_type,
      usr.is_deleted
    FROM allergies.user_safety_rules usr
    WHERE usr.user_id = v_user_id
  ),
  merged_rules AS (
    -- Merge default rules with user modifications
    SELECT
      COALESCE(ur.id::text, 'default-' || dr.id::text) AS id,
      COALESCE(ur.created_at, dr.created_at) AS created_at,
      COALESCE(ur.updated_at, dr.created_at) AS updated_at,
      COALESCE(ur.user_id, v_user_id) AS user_id,
      COALESCE(ur.user_safety_level_id, dr.safety_level_id) AS user_safety_level_id,
      COALESCE(ur.sort_order, dr.sort_order) AS sort_order,
      COALESCE(ur.rule_text, dr.rule_text) AS rule_text,
      COALESCE(ur.rule_key, dr.rule_key) AS rule_key,
      COALESCE(ur.is_deleted, false) AS is_deleted,
      COALESCE(ur.icon_type, dr.icon_type) AS icon_type,
      dr.id::text AS default_rule_id,
      dr.created_at AS default_created_at,
      dr.safety_level_id::text AS default_safety_level_id,
      dr.rule_text AS default_rule_text,
      dr.sort_order AS default_sort_order,
      dr.icon_type AS default_icon_type
    FROM default_rules dr
    LEFT JOIN user_rules ur ON dr.rule_key = ur.rule_key
    WHERE NOT ur.rule_key LIKE 'custom_%' OR ur.rule_key IS NULL

    UNION ALL

    -- Add custom rules
    SELECT
      ur.id::text,
      ur.created_at,
      ur.updated_at,
      ur.user_id,
      ur.user_safety_level_id,
      ur.sort_order,
      ur.rule_text,
      ur.rule_key,
      ur.is_deleted,
      ur.icon_type,
      NULL::text AS default_rule_id,
      NULL AS default_created_at,
      NULL::text AS default_safety_level_id,
      NULL AS default_rule_text,
      NULL AS default_sort_order,
      NULL AS default_icon_type
    FROM user_rules ur
    WHERE ur.rule_key LIKE 'custom_%'
  )
  SELECT COALESCE(json_agg(
    json_build_object(
      'id', mr.id,
      'created_at', mr.created_at,
      'updated_at', mr.updated_at,
      'user_id', mr.user_id,
      'user_safety_level_id', mr.user_safety_level_id,
      'sort_order', mr.sort_order,
      'rule_text', mr.rule_text,
      'rule_key', mr.rule_key,
      'is_deleted', mr.is_deleted,
      'icon_type', mr.icon_type,
      'safety_rule', CASE
        WHEN mr.default_rule_id IS NOT NULL THEN
          json_build_object(
            'id', mr.default_rule_id,
            'created_at', mr.default_created_at,
            'safety_level_id', mr.default_safety_level_id,
            'rule_key', mr.rule_key,
            'rule_text', mr.default_rule_text,
            'sort_order', mr.default_sort_order,
            'icon_type', mr.default_icon_type
          )
        ELSE NULL
      END
    ) ORDER BY mr.sort_order ASC
  ), '[]'::json) INTO v_safety_rules
  FROM merged_rules mr
  WHERE NOT mr.is_deleted;

  -- Step 7: Build final result
  v_result := json_build_object(
    'reactionProfile', v_reaction_profile,
    'reactionSymptoms', v_reaction_symptoms,
    'safetyLevels', v_safety_levels,
    'safetyRules', v_safety_rules
  );

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.get_food_allergies_data(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_food_allergies_data(TEXT) TO anon;
