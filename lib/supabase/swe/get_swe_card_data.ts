import { createClient } from '@/lib/supabase/server';
import {
  UserSweCard,
  UserSweCategoryWithDetails,
  UserSweMeasureWithDetails,
} from '@/lib/supabase/types';

/**
 * Get comprehensive SWE card data using the RPC function
 * Fetches all SWE-related data in a single RPC call instead of multiple sequential queries
 * @param cardId - The card_id to lookup
 * @returns SWE card data: card, categories, measures
 * @throws Error if the RPC call fails
 */
export async function getSweCardData(
  cardId: string
): Promise<{
  card: UserSweCard | null;
  categories: UserSweCategoryWithDetails[];
  measures: UserSweMeasureWithDetails[];
}> {
  const supabase = await createClient();

  // Call the RPC function in the swe schema
  const { data, error } = await supabase
    .schema('swe')
    .rpc('get_swe_card_data_web', {
      p_card_id: cardId,
    });

  if (error) {
    throw new Error(`Failed to fetch SWE card data: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No data returned for card_id "${cardId}"`);
  }

  // Parse the JSON response and ensure proper typing
  return {
    card: (data.card || null) as UserSweCard | null,
    categories: (data.categories || []) as UserSweCategoryWithDetails[],
    measures: (data.measures || []) as UserSweMeasureWithDetails[],
  };
}
