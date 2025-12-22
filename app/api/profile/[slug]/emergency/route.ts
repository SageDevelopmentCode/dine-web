import { createClient } from '@/lib/supabase/server';
import {
  UserEmergencyCard,
  UserEmergencyCardDoctor,
  UserEmergencyCardHospital,
} from '@/lib/supabase/types';
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

    // Get user emergency card
    const { data: emergencyCardData, error: emergencyCardError } = await supabase
      .schema('emergency')
      .from('user_emergency_cards')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (emergencyCardError) {
      throw new Error(`Failed to fetch emergency card: ${emergencyCardError.message}`);
    }

    // Initialize empty arrays
    let emergencyDoctorsData: UserEmergencyCardDoctor[] = [];
    let emergencyHospitalsData: UserEmergencyCardHospital[] = [];

    // Only fetch related data if emergency card exists
    if (emergencyCardData) {
      // Get emergency doctors
      const { data: doctorsData, error: doctorsError } = await supabase
        .schema('emergency')
        .from('user_emergency_card_doctors')
        .select('*')
        .eq('card_id', emergencyCardData.card_id);

      if (doctorsError) {
        throw new Error(`Failed to fetch emergency doctors: ${doctorsError.message}`);
      }

      // Get emergency hospitals
      const { data: hospitalsData, error: hospitalsError } = await supabase
        .schema('emergency')
        .from('user_emergency_card_hospitals')
        .select('*')
        .eq('card_id', emergencyCardData.card_id)
        .order('priority', { ascending: true });

      if (hospitalsError) {
        throw new Error(`Failed to fetch emergency hospitals: ${hospitalsError.message}`);
      }

      emergencyDoctorsData = doctorsData || [];
      emergencyHospitalsData = hospitalsData || [];
    }

    return NextResponse.json({
      emergencyCard: emergencyCardData,
      emergencyDoctors: emergencyDoctorsData,
      emergencyHospitals: emergencyHospitalsData,
    });
  } catch (error) {
    console.error('Error fetching emergency data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emergency data' },
      { status: 500 }
    );
  }
}
