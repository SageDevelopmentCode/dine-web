import { createClient } from '@/lib/supabase/server';
import type {
  UserSweCard,
  UserSweCategoryWithDetails,
  UserSweMeasureWithDetails,
} from '@/lib/supabase';

/**
 * Normalize category display names to slugified keys for color mapping
 * Maps display names like "In the Classroom" to keys like "classroom"
 */
function normalizeCategoryName(displayName: string): string {
  const nameMap: Record<string, string> = {
    "In the Classroom": "classroom",
    "In the Office": "office",
    "Meetings and Events": "meetings-events",
    "Birthday Parties and Celebrations": "birthday-parties",
    "Field Trips": "field-trips",
  };
  return nameMap[displayName] || displayName.toLowerCase().replace(/\s+/g, '-');
}

// Mobile RPC response types
interface MobileMeasure {
  instruction_key: string;
  instruction_text: string;
  is_custom: boolean;
  is_user_override: boolean;
  user_measure_id: string | null;
  measure_order: string;
}

interface MobileCategory {
  id: string;
  category_name: string;
  is_custom: boolean;
  default_category_id: string | null;
  measures: MobileMeasure[];
}

interface MobileRPCResponse {
  card: UserSweCard;
  categories: MobileCategory[];
  selected_cards?: unknown[];
}

/**
 * Get comprehensive SWE card data using the mobile RPC function
 * Fetches all SWE-related data in a single RPC call and transforms it for web use
 * @param cardId - The card_id to lookup
 * @returns SWE card data: card, categories, measures
 * @throws Error if the RPC call fails
 */
export async function getSweCardData(
  cardId: string
): Promise<{
  card: UserSweCard | null;
  categories: UserSweCategoryWithDetails[];
  measures: UserSweMeasureWithDetails[];
}> {
  const supabase = await createClient();

  // Call the mobile RPC function (takes TEXT parameter)
  const { data, error } = await supabase
    .schema('swe')
    .rpc('get_swe_card_data', {
      p_card_id: cardId,
    });

  if (error) {
    throw new Error(`Failed to fetch SWE card data: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No data returned for card_id "${cardId}"`);
  }

  // Parse the mobile RPC response
  const mobileData = data as unknown as MobileRPCResponse;

  // Transform mobile format to web format
  const categories: UserSweCategoryWithDetails[] = [];
  const measures: UserSweMeasureWithDetails[] = [];

  // Process each category and flatten measures
  mobileData.categories.forEach((mobileCategory) => {
    // Transform category to web format
    const webCategory: UserSweCategoryWithDetails = {
      id: mobileCategory.id,
      created_at: new Date().toISOString(), // Mobile doesn't include this
      user_id: mobileData.card.user_id,
      default_category_id: mobileCategory.default_category_id,
      custom_category_name: mobileCategory.is_custom ? mobileCategory.category_name : null,
      is_deleted: false,
      swe_card_id: mobileData.card.id,
      // Add nested swe_category object with normalized name for color matching
      swe_category: mobileCategory.default_category_id
        ? {
            id: mobileCategory.default_category_id,
            created_at: new Date().toISOString(),
            category_name: normalizeCategoryName(mobileCategory.category_name),
          }
        : null,
    };

    categories.push(webCategory);

    // Transform and flatten measures
    mobileCategory.measures.forEach((mobileMeasure) => {
      const webMeasure: UserSweMeasureWithDetails = {
        id: mobileMeasure.user_measure_id || `virtual-${mobileMeasure.instruction_key}`,
        created_at: mobileMeasure.measure_order || new Date().toISOString(),
        user_category_id: mobileCategory.id,
        instruction_text: mobileMeasure.instruction_text,
        is_deleted: false,
        is_custom: mobileMeasure.is_custom,
        user_id: mobileData.card.user_id,
        swe_card_id: mobileData.card.id,
        instruction_key: mobileMeasure.instruction_key,
        // Add nested swe_measure object (for default measures)
        swe_measure: !mobileMeasure.is_custom
          ? {
              id: `default-${mobileMeasure.instruction_key}`,
              created_at: mobileMeasure.measure_order || new Date().toISOString(),
              category_id: mobileCategory.default_category_id || '',
              instruction_key: mobileMeasure.instruction_key,
              instruction_text: mobileMeasure.instruction_text,
            }
          : null,
      };

      measures.push(webMeasure);
    });
  });

  return {
    card: mobileData.card || null,
    categories,
    measures,
  };
}
