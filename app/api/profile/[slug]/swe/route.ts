import { createClient } from '@/lib/supabase/server';
import { getSweCardData } from '@/lib/supabase/swe/get_swe_card_data';
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
    const { data: sweCardLookup, error: lookupError } = await supabase
      .schema('swe')
      .from('user_swe_cards')
      .select('card_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (lookupError) {
      throw new Error(`Failed to lookup SWE card: ${lookupError.message}`);
    }

    // If no card exists, return empty data
    if (!sweCardLookup) {
      return NextResponse.json({
        sweCard: null,
        sweCategories: [],
        sweMeasures: [],
      });
    }

    // Use RPC to fetch all related data in a single call
    const { card, categories, measures } = await getSweCardData(
      sweCardLookup.card_id
    );

    return NextResponse.json({
      sweCard: card,
      sweCategories: categories,
      sweMeasures: measures,
    });
  } catch (error) {
    console.error('Error fetching SWE data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SWE data' },
      { status: 500 }
    );
  }
}
