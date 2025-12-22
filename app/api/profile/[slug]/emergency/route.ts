import { createClient } from '@/lib/supabase/server';
import {
  UserEmergencyCard,
  UserEmergencyCardDoctor,
  UserEmergencyCardHospital,
} from '@/lib/supabase/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    // Get user_id from slug
    const { data: urlData, error: urlError } = await supabase
      .schema('web_profiles')
      .from('user_web_profile_urls')
      .select('user_web_profile_id')
      .eq('slug', slug)
      .single();

    if (urlError || !urlData) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const { data: profileData, error: profileError } = await supabase
      .schema('web_profiles')
      .from('user_web_profiles')
      .select('user_id')
      .eq('id', urlData.user_web_profile_id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const userId = profileData.user_id;

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
