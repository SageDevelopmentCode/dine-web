import type { Database } from './types';

// ============================================================================
// CORE SCHEMA TYPES
// ============================================================================
export type UserProfile = Database['core']['Tables']['user_profiles']['Row'];
export type UserCard = Database['core']['Tables']['user_cards']['Row'];

// ============================================================================
// ALLERGIES SCHEMA TYPES
// ============================================================================
export type UserAllergen = Database['allergies']['Tables']['user_allergens']['Row'];
export type UserReactionProfile = Database['allergies']['Tables']['user_reaction_profiles']['Row'];
export type UserReactionSymptom = Database['allergies']['Tables']['user_reaction_symptoms']['Row'];
export type Symptom = Database['allergies']['Tables']['symptoms']['Row'];
export type UserSafetyLevel = Database['allergies']['Tables']['user_safety_levels']['Row'];
export type SafetyLevel = Database['allergies']['Tables']['safety_levels']['Row'];
export type UserSafetyRule = Database['allergies']['Tables']['user_safety_rules']['Row'];
export type SafetyRule = Database['allergies']['Tables']['safety_rules']['Row'];

// Allergies Composite Types
export type UserReactionSymptomWithDetails = UserReactionSymptom & {
  symptom?: Symptom | null;
};

export type UserSafetyLevelWithDetails = UserSafetyLevel & {
  safety_level?: SafetyLevel | null;
};

export type UserSafetyRuleWithDetails = UserSafetyRule & {
  safety_rule?: SafetyRule | null;
};

export type UserAllergenWithTranslations = UserAllergen & {
  translations?: { [language_code: string]: string };
};

// ============================================================================
// EMERGENCY SCHEMA TYPES
// ============================================================================
export type UserEmergencyCard = Database['emergency']['Tables']['user_emergency_cards']['Row'];
export type UserEmergencyCardContact = Database['emergency']['Tables']['user_emergency_card_contacts']['Row'];
export type UserEmergencyCardDoctor = Database['emergency']['Tables']['user_emergency_card_doctors']['Row'];
export type UserEmergencyCardHospital = Database['emergency']['Tables']['user_emergency_card_hospitals']['Row'];

// ============================================================================
// EPIPEN SCHEMA TYPES
// ============================================================================
export type UserEpipenCard = Database['epipen']['Tables']['user_epipen_cards']['Row'];
export type UserEpipenInstruction = Database['epipen']['Tables']['user_epipen_instructions']['Row'];
export type EpipenInstruction = Database['epipen']['Tables']['epipen_instructions']['Row'];

// Epipen Composite Types
export type UserEpipenInstructionWithDetails = UserEpipenInstruction & {
  epipen_instruction?: EpipenInstruction | null;
};

// ============================================================================
// SWE SCHEMA TYPES
// ============================================================================
export type UserSweCard = Database['swe']['Tables']['user_swe_cards']['Row'];

export type UserSweCategory = Database['swe']['Tables']['user_swe_categories']['Row'];
export type SweCategory = Database['swe']['Tables']['swe_categories']['Row'];
export type UserSweCategoryWithDetails = UserSweCategory & {
  swe_category?: SweCategory | null;
};

export type UserSweMeasure = Database['swe']['Tables']['user_swe_measures']['Row'];
export type SweMeasure = Database['swe']['Tables']['swe_measures']['Row'];
export type UserSweMeasureWithDetails = UserSweMeasure & {
  swe_measure?: SweMeasure | null;
};

// ============================================================================
// TRAVEL SCHEMA TYPES
// ============================================================================
export type UserTravelCard = Database['travel']['Tables']['user_travel_cards']['Row'];
export type UserTravelLanguage = Database['travel']['Tables']['user_travel_languages']['Row'];
export type TravelPhrase = Database['travel']['Tables']['travel_phrases']['Row'];
export type TravelPhraseCategory = Database['travel']['Tables']['travel_phrase_categories']['Row'];
export type UserTravelPhrase = Database['travel']['Tables']['user_travel_phrases']['Row'];
export type UserTravelPhraseTranslation = Database['travel']['Tables']['user_travel_phrase_translations']['Row'];

// Travel Composite Types
export type UserTravelPhraseWithDetails = UserTravelPhrase & {
  travel_phrase?: TravelPhrase | null;
  allergens?: UserAllergenWithTranslations[];
  contacts?: UserEmergencyCardContact[];
  category?: TravelPhraseCategory | null;
  translations?: { [language_code: string]: string };
};

// ============================================================================
// RESTAURANT SCHEMA TYPES
// ============================================================================
export type Restaurant = Database['restaurant']['Tables']['restaurants']['Row'];
export type RestaurantAddress = Database['restaurant']['Tables']['restaurant_addresses']['Row'];
export type RestaurantDietaryOption = Database['restaurant']['Tables']['restaurant_dietary_options']['Row'];
export type RestaurantKitchenProtocol = Database['restaurant']['Tables']['restaurant_kitchen_protocols']['Row'];
export type RestaurantCuisineOption = Database['restaurant']['Tables']['restaurant_cuisine_options']['Row'];
export type RestaurantAllergenHandled = Database['restaurant']['Tables']['restaurant_allergens_handled']['Row'];
export type RestaurantHours = Database['restaurant']['Tables']['restaurant_hours']['Row'];
export type RestaurantMenuItem = Database['restaurant']['Tables']['restaurant_menu_items']['Row'];
export type RestaurantMenuCategory = Database['restaurant']['Tables']['restaurant_menu_categories']['Row'];
export type RestaurantMenuItemAllergenModification = Database['restaurant']['Tables']['restaurant_menu_item_allergen_modifications']['Row'];
export type RestaurantMenuItemAllergen = Database['restaurant']['Tables']['restaurant_menu_item_allergens']['Row'];
export type RestaurantMenuItemDietaryOption = Database['restaurant']['Tables']['restaurant_menu_item_dietary_options']['Row'];
export type RestaurantMenuItemImage = Database['restaurant']['Tables']['restaurant_menu_item_images']['Row'];
export type RestaurantMenuItemModificationNote = Database['restaurant']['Tables']['restaurant_menu_item_modification_notes']['Row'];
export type RestaurantMenuItemPreparationMethod = Database['restaurant']['Tables']['restaurant_menu_item_preparation_methods']['Row'];
export type RestaurantMenuItemProtocolOverride = Database['restaurant']['Tables']['restaurant_menu_item_protocol_overrides']['Row'];
export type RestaurantReview = Database['restaurant']['Tables']['restaurant_reviews']['Row'];
export type RestaurantReviewImage = Database['restaurant']['Tables']['restaurant_review_images']['Row'];
export type RestaurantMenuItemReview = Database['restaurant']['Tables']['restaurant_menu_item_reviews']['Row'];
export type RestaurantMenuItemReviewImage = Database['restaurant']['Tables']['restaurant_menu_item_review_images']['Row'];

// Restaurant Helper Types
export type UserInfo = {
  first_name: string;
  last_name: string;
};

export type MenuItemInfo = {
  id: string;
  name: string;
  description: string | null;
};

// Restaurant Composite Types
export type RestaurantReviewWithDetails = {
  review: RestaurantReview;
  user: UserInfo;
  images: RestaurantReviewImage[];
};

export type MenuItemReviewWithDetails = {
  review: RestaurantMenuItemReview;
  user: UserInfo;
  menuItem: MenuItemInfo;
  images: RestaurantMenuItemReviewImage[];
};

export type RestaurantMenuItemWithDetails = RestaurantMenuItem & {
  allergen_modifications: RestaurantMenuItemAllergenModification[];
  allergens: RestaurantMenuItemAllergen[];
  dietary_options: RestaurantMenuItemDietaryOption[];
  images: RestaurantMenuItemImage[];
  modification_notes: RestaurantMenuItemModificationNote[];
  preparation_methods: RestaurantMenuItemPreparationMethod[];
  protocol_overrides: RestaurantMenuItemProtocolOverride[];
};

// ============================================================================
// WEB_PROFILES SCHEMA TYPES
// ============================================================================
export type UserWebProfile = Database['web_profiles']['Tables']['user_web_profiles']['Row'];
export type RestaurantWebProfile = Database['web_profiles']['Tables']['restaurant_web_profiles']['Row'];
export type RestaurantWebProfileUrl = Database['web_profiles']['Tables']['restaurant_web_profile_urls']['Row'];
export type RestaurantWebProfileImage = Database['web_profiles']['Tables']['restaurant_web_profile_images']['Row'];
