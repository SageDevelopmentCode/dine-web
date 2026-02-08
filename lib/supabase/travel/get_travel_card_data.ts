import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/types';

// Type aliases for better readability
export type UserTravelCard = Database['travel']['Tables']['user_travel_cards']['Row'];
export type UserTravelLanguage = Database['travel']['Tables']['user_travel_languages']['Row'];
export type TravelPhrase = Database['travel']['Tables']['travel_phrases']['Row'];
export type TravelPhraseCategory = Database['travel']['Tables']['travel_phrase_categories']['Row'];
type UserTravelPhrase = Database['travel']['Tables']['user_travel_phrases']['Row'];
type UserTravelPhraseTranslation = Database['travel']['Tables']['user_travel_phrase_translations']['Row'];

// Type aliases for nested details from other schemas
type UserAllergen = Database['allergies']['Tables']['user_allergens']['Row'];
type UserEmergencyCardContact = Database['emergency']['Tables']['user_emergency_card_contacts']['Row'];

// Extended allergen type with translations
export type UserAllergenWithTranslations = UserAllergen & {
  translations?: { [language_code: string]: string };
};

// Composite type with nested details
export type UserTravelPhraseWithDetails = UserTravelPhrase & {
  travel_phrase?: TravelPhrase | null;
  allergens?: UserAllergenWithTranslations[];
  contacts?: UserEmergencyCardContact[];
  category?: TravelPhraseCategory | null;
  translations?: { [language_code: string]: string };
};

// RPC response type (mobile-style structure with separate arrays)
interface TravelCardRPCResponse {
  travel_card_id: string | null;
  languages: UserTravelLanguage[];
  user_phrases: UserTravelPhrase[];
  all_phrases: TravelPhrase[];
  allergens: UserAllergenWithTranslations[];
  emergency_contacts: UserEmergencyCardContact[];
  translations: UserTravelPhraseTranslation[];
  categories: TravelPhraseCategory[];
}

/**
 * Get comprehensive travel card data for a user
 * Fetches all travel-related data in a single RPC call with mobile-style structure
 * Then merges translations client-side for compatibility with existing components
 * @param userId - The user ID to lookup
 * @returns Travel card data: travelCard, travelLanguages, travelPhrases, travelCategories
 * @throws Error if the fetch fails
 */
export async function getTravelCardData(
  userId: string
): Promise<{
  travelCard: UserTravelCard | null;
  travelLanguages: UserTravelLanguage[];
  travelPhrases: UserTravelPhraseWithDetails[];
  travelCategories: TravelPhraseCategory[];
}> {
  const supabase = await createClient();

  // First, look up the card_id from user_travel_cards
  const { data: travelCardLookup } = await supabase
    .schema('travel')
    .from('user_travel_cards')
    .select('card_id, id')
    .eq('user_id', userId)
    .eq('is_deleted', false)
    .maybeSingle();

  // If no travel card exists, return empty structure
  if (!travelCardLookup || !travelCardLookup.card_id) {
    return {
      travelCard: null,
      travelLanguages: [],
      travelPhrases: [],
      travelCategories: [],
    };
  }

  // Call the RPC function that fetches all data in a single database round-trip
  const { data, error } = await supabase
    .schema('travel')
    .rpc('get_travel_card_data_web', {
      p_user_id: userId,
      p_card_id: travelCardLookup.card_id,
    });

  if (error) {
    throw new Error(`Failed to fetch travel card data: ${error.message}`);
  }

  const rpcData = data as unknown as TravelCardRPCResponse;

  // Client-side merging: Transform mobile-style structure into component-ready format
  // Build a map of translations by user_travel_phrase_id
  const translationsByPhraseId = new Map<string, { [language_code: string]: string }>();

  rpcData.translations?.forEach((trans) => {
    if (!translationsByPhraseId.has(trans.user_travel_phrase_id)) {
      translationsByPhraseId.set(trans.user_travel_phrase_id, {});
    }
    translationsByPhraseId.get(trans.user_travel_phrase_id)![trans.language_code] = trans.translated_text;
  });

  // Build a map of allergens by ID for quick lookup
  const allergensById = new Map<string, UserAllergenWithTranslations>();
  rpcData.allergens?.forEach((allergen) => {
    allergensById.set(allergen.id, allergen);
  });

  // Build a map of contacts by ID for quick lookup
  const contactsById = new Map<string, UserEmergencyCardContact>();
  rpcData.emergency_contacts?.forEach((contact) => {
    contactsById.set(contact.id, contact);
  });

  // Build a map of default phrases by ID for quick lookup
  const phrasesById = new Map<string, TravelPhrase>();
  rpcData.all_phrases?.forEach((phrase) => {
    phrasesById.set(phrase.id, phrase);
  });

  // Build a map of categories by ID for quick lookup
  const categoriesById = new Map<string, TravelPhraseCategory>();
  rpcData.categories?.forEach((category) => {
    categoriesById.set(category.id, category);
  });

  // Merge user_phrases with their related data
  const mergedPhrases: UserTravelPhraseWithDetails[] = rpcData.user_phrases?.map((userPhrase) => {
    const defaultPhrase = userPhrase.default_phrase_id
      ? phrasesById.get(userPhrase.default_phrase_id)
      : undefined;

    const category = defaultPhrase?.category_id
      ? categoriesById.get(defaultPhrase.category_id)
      : undefined;

    return {
      ...userPhrase,
      travel_phrase: defaultPhrase || null,
      category: category || null,
      allergens: userPhrase.allergen_ids?.map(id => allergensById.get(id)).filter(Boolean) as UserAllergenWithTranslations[] || [],
      contacts: userPhrase.contact_ids?.map(id => contactsById.get(id)).filter(Boolean) as UserEmergencyCardContact[] || [],
      translations: translationsByPhraseId.get(userPhrase.id) || {},
    };
  }) || [];

  // Get the travel card object
  let travelCard: UserTravelCard | null = null;
  if (rpcData.travel_card_id) {
    const { data: cardData } = await supabase
      .schema('travel')
      .from('user_travel_cards')
      .select('*')
      .eq('id', rpcData.travel_card_id)
      .single();
    travelCard = cardData;
  }

  return {
    travelCard,
    travelLanguages: rpcData.languages || [],
    travelPhrases: mergedPhrases,
    travelCategories: rpcData.categories || [],
  };
}
