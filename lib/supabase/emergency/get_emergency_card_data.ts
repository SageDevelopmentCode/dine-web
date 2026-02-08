import { createClient } from '@/lib/supabase/server';
import {
  UserEmergencyCard,
  UserEmergencyCardContact,
  UserEmergencyCardDoctor,
  UserEmergencyCardHospital,
} from '@/lib/supabase/types';

/**
 * Get comprehensive emergency card data using the RPC function
 * Fetches all emergency-related data in a single RPC call instead of multiple sequential queries
 * @param cardId - The card_id to lookup
 * @returns Emergency card data: card, contacts, doctors, hospitals
 * @throws Error if the RPC call fails
 */
export async function getEmergencyCardData(
  cardId: string
): Promise<{
  card: UserEmergencyCard | null;
  contacts: UserEmergencyCardContact[];
  doctors: UserEmergencyCardDoctor[];
  hospitals: UserEmergencyCardHospital[];
}> {
  const supabase = await createClient();

  // Call the RPC function in the emergency schema
  const { data, error } = await supabase
    .schema('emergency')
    .rpc('get_emergency_card_data', {
      p_card_id: cardId,
    });

  if (error) {
    throw new Error(`Failed to fetch emergency card data: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No data returned for card_id "${cardId}"`);
  }

  // Parse the JSON response and ensure proper typing
  const result = data as {
    card: UserEmergencyCard | null;
    contacts: UserEmergencyCardContact[];
    doctors: UserEmergencyCardDoctor[];
    hospitals: UserEmergencyCardHospital[];
  };

  return {
    card: result.card || null,
    contacts: result.contacts || [],
    doctors: result.doctors || [],
    hospitals: result.hospitals || [],
  };
}
