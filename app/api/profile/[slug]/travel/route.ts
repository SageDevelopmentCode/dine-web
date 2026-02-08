import { NextRequest, NextResponse } from 'next/server';
import { getTravelCardData } from '@/lib/supabase/travel/get_travel_card_data';

export async function GET(request: NextRequest) {
  try {
    // Get user_id from query parameter
    const userId = request.nextUrl.searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'user_id query parameter is required' },
        { status: 400 }
      );
    }

    // Use the same function as the dedicated page - includes client-side merging
    const data = await getTravelCardData(userId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching travel data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch travel data' },
      { status: 500 }
    );
  }
}
