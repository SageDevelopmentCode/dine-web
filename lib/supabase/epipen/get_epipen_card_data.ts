import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/types';

// Type aliases for better readability
type UserEpipenCard = Database['epipen']['Tables']['user_epipen_cards']['Row'];
type UserEpipenInstruction = Database['epipen']['Tables']['user_epipen_instructions']['Row'];
type EpipenInstruction = Database['epipen']['Tables']['epipen_instructions']['Row'];

// Composite type with nested details
type UserEpipenInstructionWithDetails = UserEpipenInstruction & {
  epipen_instruction?: EpipenInstruction | null;
};

/**
 * Get comprehensive epipen card data using the RPC function
 * Fetches all epipen-related data in a single RPC call instead of multiple sequential queries
 * @param cardId - The card_id to lookup
 * @returns Epipen card data: card, instructions
 * @throws Error if the RPC call fails
 */
export async function getEpipenCardData(
  cardId: string
): Promise<{
  card: UserEpipenCard | null;
  instructions: UserEpipenInstructionWithDetails[];
}> {
  const supabase = await createClient();

  // Call the RPC function in the epipen schema
  const { data, error } = await supabase
    .schema('epipen')
    .rpc('get_epipen_card_data_web', {
      p_card_id: cardId,
    });

  if (error) {
    throw new Error(`Failed to fetch epipen card data: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No data returned for card_id "${cardId}"`);
  }

  // Parse the JSON response and ensure proper typing
  return {
    card: (data.card || null) as UserEpipenCard | null,
    instructions: (data.instructions || []) as UserEpipenInstructionWithDetails[],
  };
}
