import { getFoodAllergiesData } from '@/lib/supabase/allergies/get_food_allergies_data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Fetch all food allergies data using a single RPC call
    const data = await getFoodAllergiesData(slug);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching food allergies data:', error);

    // Check if it's a profile not found error
    if (error instanceof Error && error.message.includes('Profile not found')) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch food allergies data' },
      { status: 500 }
    );
  }
}
