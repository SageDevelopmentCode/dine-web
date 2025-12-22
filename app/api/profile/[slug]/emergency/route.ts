import { createClient } from '@/lib/supabase/server';
import { getEmergencyCardData } from '@/lib/supabase/emergency/get_emergency_card_data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get user_id from query parameter
    const userId = request.nextUrl.searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'user_id query parameter is required' },
        { status: 400 }
      );
    }

    // First, get the card_id for this user
    const { data: emergencyCardLookup, error: lookupError } = await supabase
      .schema('emergency')
      .from('user_emergency_cards')
      .select('card_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (lookupError) {
      throw new Error(`Failed to lookup emergency card: ${lookupError.message}`);
    }

    // If no card exists, return empty data
    if (!emergencyCardLookup) {
      return NextResponse.json({
        emergencyCard: null,
        emergencyContacts: [],
        emergencyDoctors: [],
        emergencyHospitals: [],
      });
    }

    // Use RPC to fetch all related data in a single call
    const { card, contacts, doctors, hospitals } = await getEmergencyCardData(
      emergencyCardLookup.card_id
    );

    return NextResponse.json({
      emergencyCard: card,
      emergencyContacts: contacts,
      emergencyDoctors: doctors,
      emergencyHospitals: hospitals,
    });
  } catch (error) {
    console.error('Error fetching emergency data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emergency data' },
      { status: 500 }
    );
  }
}
