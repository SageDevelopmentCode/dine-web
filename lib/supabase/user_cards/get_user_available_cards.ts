import { createClient } from "@/lib/supabase/server";

type DatabaseCardType = "allergy" | "emergency" | "epipen" | "travel" | "swe";
type ValidCardType =
  | "food-allergies"
  | "emergency"
  | "epipen"
  | "swe"
  | "travel";

/**
 * Maps database card_type enum values to URL-friendly card type strings
 */
const cardTypeMapping: Record<DatabaseCardType, ValidCardType> = {
  allergy: "food-allergies",
  emergency: "emergency",
  epipen: "epipen",
  travel: "travel",
  swe: "swe",
};

/**
 * Fetches all active card types for a given user
 * @param userId - The UUID of the user
 * @returns Array of URL-friendly card type strings
 */
export async function getUserAvailableCards(
  userId: string
): Promise<ValidCardType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_user_available_cards", {
    p_user_id: userId,
  });

  if (error) {
    throw new Error(`Failed to fetch user available cards: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Map database card types to URL-friendly format
  return data
    .map((row: { card_type: string }) => {
      const dbCardType = row.card_type as DatabaseCardType;
      return cardTypeMapping[dbCardType];
    })
    .filter((cardType): cardType is ValidCardType => cardType !== undefined);
}
