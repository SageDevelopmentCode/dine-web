-- Function: public.get_user_available_cards
-- Description: Retrieves all active card types for a given user
-- Parameters:
--   p_user_id: UUID of the user
-- Returns: Array of active card_type enum values

CREATE OR REPLACE FUNCTION public.get_user_available_cards(p_user_id UUID)
RETURNS TABLE(card_type TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT uc.card_type::TEXT
  FROM core.user_cards uc
  WHERE uc.user_id = p_user_id
    AND uc.is_active = true
  ORDER BY uc.created_at ASC;
END;
$$;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION public.get_user_available_cards(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_available_cards(UUID) TO anon;

-- Add comment for documentation
COMMENT ON FUNCTION public.get_user_available_cards(UUID) IS
'Fetches all active card types for a given user. Returns card_type values from core.user_cards table.';
