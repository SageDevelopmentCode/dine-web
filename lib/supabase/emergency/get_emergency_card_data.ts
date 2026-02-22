import { createClient } from '@/lib/supabase/server';
import {
  UserEmergencyCard,
  UserEmergencyCardContact,
  UserEmergencyCardDoctor,
  UserEmergencyCardHospital,
  Database,
} from '@/lib/supabase';

// Type alias for reaction profile
type UserReactionProfile = Database['allergies']['Tables']['user_reaction_profiles']['Row'];

/**
 * Get comprehensive emergency card data using the RPC function
 * Fetches all emergency-related data in a single RPC call instead of multiple sequential queries
 * @param cardId - The card_id to lookup
 * @returns Emergency card data: card, contacts, doctors, hospitals, reactionProfile
 * @throws Error if the RPC call fails
 */
export async function getEmergencyCardData(
  cardId: string
): Promise<{
  card: UserEmergencyCard | null;
  contacts: UserEmergencyCardContact[];
  doctors: UserEmergencyCardDoctor[];
  hospitals: UserEmergencyCardHospital[];
  reactionProfile: UserReactionProfile | null;
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
    reactionProfile: UserReactionProfile | null;
  };

  return {
    card: result.card || null,
    contacts: result.contacts || [],
    doctors: result.doctors || [],
    hospitals: result.hospitals || [],
    reactionProfile: result.reactionProfile || null,
  };
}
