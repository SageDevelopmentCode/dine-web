-- RPC Function to fetch all emergency card data in a single call
-- This function returns the emergency card along with all related contacts, doctors, hospitals,
-- and the user's reaction profile (anaphylaxis information)
--
-- Usage: SELECT * FROM emergency.get_emergency_card_data('card-id-here');
--
-- Note: You need to run this SQL in your Supabase SQL Editor to create the function

CREATE OR REPLACE FUNCTION emergency.get_emergency_card_data(p_card_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
  v_user_id UUID;
BEGIN
  -- First, get the user_id from the emergency card
  SELECT user_id INTO v_user_id
  FROM emergency.user_emergency_cards
  WHERE card_id = p_card_id;

  -- Build the complete result object
  SELECT json_build_object(
    'card', (
      SELECT row_to_json(c.*)
      FROM emergency.user_emergency_cards c
      WHERE c.card_id = p_card_id
    ),
    'contacts', (
      SELECT COALESCE(json_agg(con.* ORDER BY con.priority), '[]'::json)
      FROM emergency.user_emergency_card_contacts con
      WHERE con.card_id = p_card_id
    ),
    'doctors', (
      SELECT COALESCE(json_agg(doc.*), '[]'::json)
      FROM emergency.user_emergency_card_doctors doc
      WHERE doc.card_id = p_card_id
    ),
    'hospitals', (
      SELECT COALESCE(json_agg(hosp.* ORDER BY hosp.priority), '[]'::json)
      FROM emergency.user_emergency_card_hospitals hosp
      WHERE hosp.card_id = p_card_id
    ),
    'reactionProfile', (
      SELECT row_to_json(rp.*)
      FROM allergies.user_reaction_profiles rp
      WHERE rp.user_id = v_user_id
    )
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION emergency.get_emergency_card_data(UUID) TO authenticated;

-- Example usage:
-- SELECT * FROM emergency.get_emergency_card_data('your-card-id-here');
