import { createClient } from '@/lib/supabase/server';
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

    // Call the RPC function to get all travel data in a single query
    const { data, error } = await supabase
      .schema('travel')
      .rpc('get_travel_card_data_web', {
        p_user_id: userId,
      });

    if (error) {
      throw new Error(`Failed to fetch travel data: ${error.message}`);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching travel data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch travel data' },
      { status: 500 }
    );
  }
}
