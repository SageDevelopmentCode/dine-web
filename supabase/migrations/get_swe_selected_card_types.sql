-- Function: swe.get_swe_selected_card_types
-- Description: Retrieves card types for selected cards in a SWE card
-- Parameters:
--   p_swe_card_id: UUID of the SWE card (references user_swe_cards.id)
--   p_user_id: UUID of the user
-- Returns: Table with selected_card_id and card_type for each selected card

-- Drop existing function if it exists (required when changing return type)
DROP FUNCTION IF EXISTS swe.get_swe_selected_card_types(UUID, UUID);

CREATE OR REPLACE FUNCTION swe.get_swe_selected_card_types(
p_swe_card_id UUID,
p_user_id UUID
)
RETURNS TABLE(
selected_card_id UUID,
card_type TEXT,
selected_subitems JSON
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
RETURN QUERY
SELECT
  sc.selected_card_id,
  uc.card_type::TEXT,
  sc.selected_subitems
FROM swe.user_swe_selected_cards sc
LEFT JOIN core.user_cards uc ON sc.selected_card_id = uc.id
WHERE sc.swe_card_id = p_swe_card_id
  AND sc.user_id = p_user_id
  AND sc.is_deleted = false
  AND uc.is_active = true
ORDER BY sc.created_at ASC;
END;
$$;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION swe.get_swe_selected_card_types(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION swe.get_swe_selected_card_types(UUID, UUID) TO anon;

-- Add comment for documentation
COMMENT ON FUNCTION swe.get_swe_selected_card_types(UUID, UUID) IS
'Fetches card types and selected subitems for selected cards in a SWE card. Uses SECURITY DEFINER to access core.user_cards safely.';
