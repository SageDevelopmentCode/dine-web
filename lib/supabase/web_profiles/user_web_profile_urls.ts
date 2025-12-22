import { createClient } from '@/lib/supabase/server';
import { getEpipenCardData } from '@/lib/supabase/epipen/get_epipen_card_data';
import {
  UserWebProfile,
  UserWebProfileSelectedCard,
  UserReactionProfile,
  UserReactionSymptomWithDetails,
  UserSafetyLevelWithDetails,
  UserSafetyRuleWithDetails,
  UserAllergen,
  SafetyLevel,
  UserEmergencyCard,
  UserEmergencyCardContact,
  UserEmergencyCardDoctor,
  UserEmergencyCardHospital,
  UserEpipenCard,
  UserEpipenInstructionWithDetails,
  UserSweCard,
  UserSweCategoryWithDetails,
  UserSweMeasureWithDetails,
  UserTravelCard,
  UserTravelLanguage,
  UserTravelPhraseWithDetails,
  TravelPhraseCategory
} from '@/lib/supabase/types';

/**
 * Get a user's web profile by their URL slug
 * @param slug - The URL slug to lookup
 * @returns The complete user web profile data with selected cards, allergy information, safety data, emergency card, epipen information, SWE data, and travel data
 * @throws Error if the slug is not found or the profile doesn't exist
 */
export async function getUserWebProfileBySlug(
  slug: string
): Promise<{
  profile: UserWebProfile;
  selectedCards: UserWebProfileSelectedCard[];
  reactionProfile: UserReactionProfile | null;
  reactionSymptoms: UserReactionSymptomWithDetails[];
  safetyLevels: UserSafetyLevelWithDetails[];
  safetyRules: UserSafetyRuleWithDetails[];
  allergens: UserAllergen[];
  emergencyCard: UserEmergencyCard | null;
  emergencyContacts: UserEmergencyCardContact[];
  emergencyDoctors: UserEmergencyCardDoctor[];
  emergencyHospitals: UserEmergencyCardHospital[];
  epipenCard: UserEpipenCard | null;
  epipenInstructions: UserEpipenInstructionWithDetails[];
  sweCard: UserSweCard | null;
  sweCategories: UserSweCategoryWithDetails[];
  sweMeasures: UserSweMeasureWithDetails[];
  travelCard: UserTravelCard | null;
  travelLanguages: UserTravelLanguage[];
  travelPhrases: UserTravelPhraseWithDetails[];
  travelCategories: TravelPhraseCategory[];
}> {
  const supabase = await createClient();

  // First, get the user_web_profile_id from the slug
  const { data: urlData, error: urlError } = await supabase
    .schema('web_profiles')
    .from('user_web_profile_urls')
    .select('user_web_profile_id')
    .eq('slug', slug)
    .single();

  if (urlError) {
    throw new Error(`Failed to find profile with slug "${slug}": ${urlError.message}`);
  }

  if (!urlData) {
    throw new Error(`No profile found with slug "${slug}"`);
  }

  // Then get the full profile using the user_web_profile_id
  const { data: profileData, error: profileError } = await supabase
    .schema('web_profiles')
    .from('user_web_profiles')
    .select('*')
    .eq('id', urlData.user_web_profile_id)
    .single();

  if (profileError) {
    throw new Error(`Failed to fetch profile: ${profileError.message}`);
  }

  if (!profileData) {
    throw new Error(`Profile not found for slug "${slug}"`);
  }

  // Get selected cards for this profile
  const { data: selectedCardsData, error: selectedCardsError } = await supabase
    .schema('web_profiles')
    .from('user_web_profiles_selected_cards')
    .select('id, created_at, user_web_profiles_id, selected_card_id, selected_subitems, user_id, is_deleted')
    .eq('user_web_profiles_id', urlData.user_web_profile_id)
    .eq('is_deleted', false);

  if (selectedCardsError) {
    throw new Error(`Failed to fetch selected cards: ${selectedCardsError.message}`);
  }

  // Get user reaction profile from allergies schema
  const { data: reactionProfileData, error: reactionProfileError } = await supabase
    .schema('allergies')
    .from('user_reaction_profiles')
    .select('*')
    .eq('user_id', profileData.user_id)
    .maybeSingle();

  if (reactionProfileError) {
    throw new Error(`Failed to fetch reaction profile: ${reactionProfileError.message}`);
  }

  // Get user reaction symptoms
  const { data: reactionSymptomsRaw, error: reactionSymptomsError } = await supabase
    .schema('allergies')
    .from('user_reaction_symptoms')
    .select('*')
    .eq('user_id', profileData.user_id);

  if (reactionSymptomsError) {
    throw new Error(`Failed to fetch reaction symptoms: ${reactionSymptomsError.message}`);
  }

  // Get all unique symptom_ids from non-custom symptoms
  const symptomIds = (reactionSymptomsRaw || [])
    .filter(rs => !rs.is_custom && rs.symptom_id)
    .map(rs => rs.symptom_id);

  // Fetch symptoms data for those IDs
  let symptomsMap = new Map();
  if (symptomIds.length > 0) {
    const { data: symptomsData, error: symptomsError } = await supabase
      .schema('allergies')
      .from('symptoms')
      .select('*')
      .in('id', symptomIds);

    if (symptomsError) {
      throw new Error(`Failed to fetch symptoms: ${symptomsError.message}`);
    }

    // Create a map of symptom_id -> symptom for quick lookup
    symptomsMap = new Map((symptomsData || []).map(s => [s.id, s]));
  }

  // Merge the data to match UserReactionSymptomWithDetails type
  const reactionSymptomsData: UserReactionSymptomWithDetails[] = (reactionSymptomsRaw || []).map((rs) => ({
    id: rs.id,
    created_at: rs.created_at,
    user_reaction_profile_id: rs.user_reaction_profile_id,
    symptom_id: rs.symptom_id,
    custom_symptom: rs.custom_symptom,
    is_custom: rs.is_custom,
    user_id: rs.user_id,
    custom_symptom_severity: rs.custom_symptom_severity,
    symptom: rs.symptom_id ? symptomsMap.get(rs.symptom_id) || null : null
  }));

  // Get user allergens
  const { data: allergensData, error: allergensError } = await supabase
    .schema('allergies')
    .from('user_allergens')
    .select('*')
    .eq('user_id', profileData.user_id);

  if (allergensError) {
    throw new Error(`Failed to fetch user allergens: ${allergensError.message}`);
  }

  // Get user safety levels
  const { data: userSafetyLevelsRaw, error: userSafetyLevelsError } = await supabase
    .schema('allergies')
    .from('user_safety_levels')
    .select('*')
    .eq('user_id', profileData.user_id);

  if (userSafetyLevelsError) {
    throw new Error(`Failed to fetch user safety levels: ${userSafetyLevelsError.message}`);
  }

  // Get unique safety_level_ids for non-custom levels
  const safetyLevelIds = (userSafetyLevelsRaw || [])
    .filter(usl => !usl.is_custom && usl.safety_level_id)
    .map(usl => usl.safety_level_id);

  // Fetch default safety levels
  let safetyLevelsMap = new Map<string, SafetyLevel>();
  if (safetyLevelIds.length > 0) {
    const { data: safetyLevelsData, error: safetyLevelsError } = await supabase
      .schema('allergies')
      .from('safety_levels')
      .select('*')
      .in('id', safetyLevelIds);

    if (safetyLevelsError) {
      throw new Error(`Failed to fetch safety levels: ${safetyLevelsError.message}`);
    }

    safetyLevelsMap = new Map((safetyLevelsData || []).map(sl => [sl.id, sl]));
  }

  // Merge user safety levels with default data
  const userSafetyLevelsData: UserSafetyLevelWithDetails[] = (userSafetyLevelsRaw || []).map((usl) => ({
    id: usl.id,
    created_at: usl.created_at,
    updated_at: usl.updated_at,
    safety_level_id: usl.safety_level_id,
    is_custom: usl.is_custom,
    user_id: usl.user_id,
    safety_level: usl.safety_level_id ? safetyLevelsMap.get(usl.safety_level_id) || null : null
  }));

  // Get all default safety rules
  const { data: allDefaultRules, error: defaultRulesError } = await supabase
    .schema('allergies')
    .from('safety_rules')
    .select('*')
    .order('sort_order');

  if (defaultRulesError) {
    throw new Error(`Failed to fetch default safety rules: ${defaultRulesError.message}`);
  }

  // Get user's modified/deleted rules
  const { data: userSafetyRulesRaw, error: userSafetyRulesError } = await supabase
    .schema('allergies')
    .from('user_safety_rules')
    .select('*')
    .eq('user_id', profileData.user_id);

  if (userSafetyRulesError) {
    throw new Error(`Failed to fetch user safety rules: ${userSafetyRulesError.message}`);
  }

  // Create a map of rule_key -> user modification for quick lookup
  const userRulesMap = new Map((userSafetyRulesRaw || []).map(ur => [ur.rule_key, ur]));

  // Merge: for each default rule, check if user has modified/deleted it
  const mergedDefaultRules: UserSafetyRuleWithDetails[] = (allDefaultRules || [])
    .map((defaultRule) => {
      const userModification = userRulesMap.get(defaultRule.rule_key);

      if (userModification) {
        // User has modified this rule
        return {
          id: userModification.id,
          created_at: userModification.created_at,
          updated_at: userModification.updated_at,
          user_id: userModification.user_id,
          user_safety_level_id: userModification.user_safety_level_id,
          sort_order: userModification.sort_order,
          rule_text: userModification.rule_text,
          rule_key: userModification.rule_key,
          is_deleted: userModification.is_deleted,
          icon_type: userModification.icon_type,
          safety_rule: defaultRule
        };
      } else {
        // User hasn't modified this rule, create a virtual user rule with default values
        return {
          id: `default-${defaultRule.id}`,
          created_at: defaultRule.created_at,
          updated_at: defaultRule.created_at,
          user_id: profileData.user_id,
          user_safety_level_id: defaultRule.safety_level_id,
          sort_order: defaultRule.sort_order,
          rule_text: defaultRule.rule_text,
          rule_key: defaultRule.rule_key,
          is_deleted: false,
          icon_type: defaultRule.icon_type,
          safety_rule: defaultRule
        };
      }
    });

  // Get custom rules (rules that don't have a corresponding default rule)
  const customRules: UserSafetyRuleWithDetails[] = (userSafetyRulesRaw || [])
    .filter(ur => ur.rule_key.startsWith('custom_'))
    .map((customRule) => ({
      id: customRule.id,
      created_at: customRule.created_at,
      updated_at: customRule.updated_at,
      user_id: customRule.user_id,
      user_safety_level_id: customRule.user_safety_level_id,
      sort_order: customRule.sort_order,
      rule_text: customRule.rule_text,
      rule_key: customRule.rule_key,
      is_deleted: customRule.is_deleted,
      icon_type: customRule.icon_type,
      safety_rule: null
    }));

  // Combine default rules and custom rules, then filter and sort
  const safetyRulesData: UserSafetyRuleWithDetails[] = [...mergedDefaultRules, ...customRules]
    .filter(rule => !rule.is_deleted)  // Filter out deleted rules
    .sort((a, b) => a.sort_order - b.sort_order);  // Sort by user's order

  // Get user emergency card from emergency schema
  const { data: emergencyCardData, error: emergencyCardError } = await supabase
    .schema('emergency')
    .from('user_emergency_cards')
    .select('*')
    .eq('user_id', profileData.user_id)
    .maybeSingle();

  if (emergencyCardError) {
    throw new Error(`Failed to fetch emergency card: ${emergencyCardError.message}`);
  }

  // Initialize empty arrays for emergency data
  let emergencyContactsData: UserEmergencyCardContact[] = [];
  let emergencyDoctorsData: UserEmergencyCardDoctor[] = [];
  let emergencyHospitalsData: UserEmergencyCardHospital[] = [];

  // Only fetch related data if emergency card exists
  if (emergencyCardData) {
    // Get emergency contacts
    const { data: contactsData, error: contactsError } = await supabase
      .schema('emergency')
      .from('user_emergency_card_contacts')
      .select('*')
      .eq('card_id', emergencyCardData.card_id)
      .order('priority', { ascending: true });

    if (contactsError) {
      throw new Error(`Failed to fetch emergency contacts: ${contactsError.message}`);
    }

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

    emergencyContactsData = contactsData || [];
    emergencyDoctorsData = doctorsData || [];
    emergencyHospitalsData = hospitalsData || [];
  }

  // Get user epipen card and instructions using RPC
  let epipenCardData: UserEpipenCard | null = null;
  let epipenInstructionsData: UserEpipenInstructionWithDetails[] = [];

  // First, get the card_id for this user
  const { data: epipenCardLookup, error: epipenLookupError } = await supabase
    .schema('epipen')
    .from('user_epipen_cards')
    .select('card_id')
    .eq('user_id', profileData.user_id)
    .maybeSingle();

  if (epipenLookupError) {
    throw new Error(`Failed to lookup epipen card: ${epipenLookupError.message}`);
  }

  // If card exists, fetch all data via RPC
  if (epipenCardLookup) {
    const { card, instructions } = await getEpipenCardData(epipenCardLookup.card_id);
    epipenCardData = card;
    epipenInstructionsData = instructions;
  }

  // Get user SWE card from swe schema
  const { data: sweCardData, error: sweCardError } = await supabase
    .schema('swe')
    .from('user_swe_cards')
    .select('*')
    .eq('user_id', profileData.user_id)
    .maybeSingle();

  if (sweCardError) {
    throw new Error(`Failed to fetch SWE card: ${sweCardError.message}`);
  }

  // Get all default SWE categories
  const { data: allDefaultSweCategories, error: defaultSweCategoriesError } = await supabase
    .schema('swe')
    .from('swe_categories')
    .select('*');

  if (defaultSweCategoriesError) {
    throw new Error(`Failed to fetch default SWE categories: ${defaultSweCategoriesError.message}`);
  }

  // Get user's modified/deleted SWE categories
  const { data: userSweCategoriesRaw, error: userSweCategoriesError } = await supabase
    .schema('swe')
    .from('user_swe_categories')
    .select('*')
    .eq('user_id', profileData.user_id);

  if (userSweCategoriesError) {
    throw new Error(`Failed to fetch user SWE categories: ${userSweCategoriesError.message}`);
  }

  // Create a map of default_category_id -> user modification for quick lookup
  const userSweCategoriesMap = new Map((userSweCategoriesRaw || []).map(uc => [uc.default_category_id, uc]));

  // Merge: for each default category, check if user has modified/deleted it
  const mergedDefaultSweCategories: UserSweCategoryWithDetails[] = (allDefaultSweCategories || [])
    .map((defaultCategory) => {
      const userModification = userSweCategoriesMap.get(defaultCategory.id);

      if (userModification) {
        // User has modified this category
        return {
          id: userModification.id,
          created_at: userModification.created_at,
          user_id: userModification.user_id,
          default_category_id: userModification.default_category_id,
          custom_category_name: userModification.custom_category_name,
          is_deleted: userModification.is_deleted,
          swe_card_id: userModification.swe_card_id,
          swe_category: defaultCategory
        };
      } else {
        // User hasn't modified this category, create a virtual user category with default values
        return {
          id: `default-${defaultCategory.id}`,
          created_at: defaultCategory.created_at,
          user_id: profileData.user_id,
          default_category_id: defaultCategory.id,
          custom_category_name: null,
          is_deleted: false,
          swe_card_id: sweCardData?.card_id || '',
          swe_category: defaultCategory
        };
      }
    });

  // Get custom categories (categories that don't have a corresponding default category)
  const customSweCategories: UserSweCategoryWithDetails[] = (userSweCategoriesRaw || [])
    .filter(uc => !uc.default_category_id)
    .map((customCategory) => ({
      id: customCategory.id,
      created_at: customCategory.created_at,
      user_id: customCategory.user_id,
      default_category_id: customCategory.default_category_id,
      custom_category_name: customCategory.custom_category_name,
      is_deleted: customCategory.is_deleted,
      swe_card_id: customCategory.swe_card_id,
      swe_category: null
    }));

  // Combine default categories and custom categories, then filter deleted
  const sweCategoriesData: UserSweCategoryWithDetails[] = [...mergedDefaultSweCategories, ...customSweCategories]
    .filter(category => !category.is_deleted);  // Filter out deleted categories

  // Get all default SWE measures
  const { data: allDefaultSweMeasures, error: defaultSweMeasuresError } = await supabase
    .schema('swe')
    .from('swe_measures')
    .select('*');

  if (defaultSweMeasuresError) {
    throw new Error(`Failed to fetch default SWE measures: ${defaultSweMeasuresError.message}`);
  }

  // Get user's modified/deleted SWE measures
  const { data: userSweMeasuresRaw, error: userSweMeasuresError } = await supabase
    .schema('swe')
    .from('user_swe_measures')
    .select('*')
    .eq('user_id', profileData.user_id);

  if (userSweMeasuresError) {
    throw new Error(`Failed to fetch user SWE measures: ${userSweMeasuresError.message}`);
  }

  // Create a map of instruction_key -> user modification for quick lookup
  const userSweMeasuresMap = new Map((userSweMeasuresRaw || []).map(um => [um.instruction_key, um]));

  // Merge: for each default measure, check if user has modified/deleted it
  const mergedDefaultSweMeasures: UserSweMeasureWithDetails[] = (allDefaultSweMeasures || [])
    .map((defaultMeasure) => {
      const userModification = userSweMeasuresMap.get(defaultMeasure.instruction_key);

      if (userModification) {
        // User has modified this measure
        return {
          id: userModification.id,
          created_at: userModification.created_at,
          user_category_id: userModification.user_category_id,
          instruction_text: userModification.instruction_text,
          is_deleted: userModification.is_deleted,
          is_custom: userModification.is_custom,
          user_id: userModification.user_id,
          swe_card_id: userModification.swe_card_id,
          instruction_key: userModification.instruction_key,
          swe_measure: defaultMeasure
        };
      } else {
        // User hasn't modified this measure, create a virtual user measure with default values
        return {
          id: `default-${defaultMeasure.id}`,
          created_at: defaultMeasure.created_at,
          user_category_id: defaultMeasure.category_id,
          instruction_text: defaultMeasure.instruction_text,
          is_deleted: false,
          is_custom: false,
          user_id: profileData.user_id,
          swe_card_id: sweCardData?.card_id || '',
          instruction_key: defaultMeasure.instruction_key,
          swe_measure: defaultMeasure
        };
      }
    });

  // Get custom measures (measures that don't have a corresponding default measure)
  const customSweMeasures: UserSweMeasureWithDetails[] = (userSweMeasuresRaw || [])
    .filter(um => um.instruction_key.startsWith('custom-'))
    .map((customMeasure) => ({
      id: customMeasure.id,
      created_at: customMeasure.created_at,
      user_category_id: customMeasure.user_category_id,
      instruction_text: customMeasure.instruction_text,
      is_deleted: customMeasure.is_deleted,
      is_custom: customMeasure.is_custom,
      user_id: customMeasure.user_id,
      swe_card_id: customMeasure.swe_card_id,
      instruction_key: customMeasure.instruction_key,
      swe_measure: null
    }));

  // Combine default measures and custom measures, then filter deleted
  const sweMeasuresData: UserSweMeasureWithDetails[] = [...mergedDefaultSweMeasures, ...customSweMeasures]
    .filter(measure => !measure.is_deleted);  // Filter out deleted measures

  // Get user travel card from travel schema
  const { data: travelCardData, error: travelCardError } = await supabase
    .schema('travel')
    .from('user_travel_cards')
    .select('*')
    .eq('user_id', profileData.user_id)
    .maybeSingle();

  if (travelCardError) {
    throw new Error(`Failed to fetch travel card: ${travelCardError.message}`);
  }

  // Initialize empty arrays for travel data
  let travelLanguagesData: UserTravelLanguage[] = [];
  let travelPhrasesData: UserTravelPhraseWithDetails[] = [];
  let travelCategoriesData: TravelPhraseCategory[] = [];

  // Only fetch related data if travel card exists
  if (travelCardData) {
    // Get user travel languages
    const { data: languagesData, error: languagesError } = await supabase
      .schema('travel')
      .from('user_travel_languages')
      .select('*')
      .eq('travel_card_id', travelCardData.id);

    if (languagesError) {
      throw new Error(`Failed to fetch travel languages: ${languagesError.message}`);
    }

    travelLanguagesData = languagesData || [];

    // Get all default travel phrase categories
    const { data: allDefaultTravelCategories, error: defaultTravelCategoriesError } = await supabase
      .schema('travel')
      .from('travel_phrase_categories')
      .select('*');

    if (defaultTravelCategoriesError) {
      throw new Error(`Failed to fetch default travel categories: ${defaultTravelCategoriesError.message}`);
    }

    travelCategoriesData = allDefaultTravelCategories || [];

    // Get all default travel phrases
    const { data: allDefaultTravelPhrases, error: defaultTravelPhrasesError } = await supabase
      .schema('travel')
      .from('travel_phrases')
      .select('*');

    if (defaultTravelPhrasesError) {
      throw new Error(`Failed to fetch default travel phrases: ${defaultTravelPhrasesError.message}`);
    }

    // Get user's travel phrases
    const { data: userTravelPhrasesRaw, error: userTravelPhrasesError } = await supabase
      .schema('travel')
      .from('user_travel_phrases')
      .select('*')
      .eq('user_id', profileData.user_id);

    if (userTravelPhrasesError) {
      throw new Error(`Failed to fetch user travel phrases: ${userTravelPhrasesError.message}`);
    }

    // Create a map of default_phrase_id -> user modification for quick lookup
    const userTravelPhrasesMap = new Map((userTravelPhrasesRaw || []).map(up => [up.default_phrase_id, up]));

    // Collect all allergen_ids and contact_ids for batch fetching
    const allAllergenIds = new Set<string>();
    const allContactIds = new Set<string>();

    (userTravelPhrasesRaw || []).forEach(phrase => {
      (phrase.allergen_ids || []).forEach((id: string) => allAllergenIds.add(id));
      (phrase.contact_ids || []).forEach((id: string) => allContactIds.add(id));
    });

    // Fetch all allergens needed
    let allergensMapForTravel = new Map<string, UserAllergen>();
    if (allAllergenIds.size > 0) {
      const { data: allergensForTravel, error: allergensForTravelError } = await supabase
        .schema('allergies')
        .from('user_allergens')
        .select('*')
        .in('id', Array.from(allAllergenIds));

      if (allergensForTravelError) {
        throw new Error(`Failed to fetch allergens for travel: ${allergensForTravelError.message}`);
      }

      allergensMapForTravel = new Map((allergensForTravel || []).map(a => [a.id, a]));
    }

    // Fetch all contacts needed
    let contactsMapForTravel = new Map<string, UserEmergencyCardContact>();
    if (allContactIds.size > 0) {
      const { data: contactsForTravel, error: contactsForTravelError } = await supabase
        .schema('emergency')
        .from('user_emergency_card_contacts')
        .select('*')
        .in('id', Array.from(allContactIds));

      if (contactsForTravelError) {
        throw new Error(`Failed to fetch contacts for travel: ${contactsForTravelError.message}`);
      }

      contactsMapForTravel = new Map((contactsForTravel || []).map(c => [c.id, c]));
    }

    // Create a map of category_id -> category for quick lookup
    const categoriesMap = new Map((travelCategoriesData || []).map(cat => [cat.id, cat]));

    // Merge: for each default phrase, check if user has modified it
    const mergedDefaultTravelPhrases: UserTravelPhraseWithDetails[] = (allDefaultTravelPhrases || [])
      .map((defaultPhrase) => {
        const userModification = userTravelPhrasesMap.get(defaultPhrase.id);

        if (userModification) {
          // User has modified this phrase - resolve allergen and contact IDs
          const resolvedAllergens = (userModification.allergen_ids || [])
            .map((id: string) => allergensMapForTravel.get(id))
            .filter((a: UserAllergen | undefined): a is UserAllergen => a !== undefined);

          const resolvedContacts = (userModification.contact_ids || [])
            .map((id: string) => contactsMapForTravel.get(id))
            .filter((c: UserEmergencyCardContact | undefined): c is UserEmergencyCardContact => c !== undefined);

          return {
            id: userModification.id,
            created_at: userModification.created_at,
            travel_card_id: userModification.travel_card_id,
            default_phrase_id: userModification.default_phrase_id,
            allergen_ids: userModification.allergen_ids,
            user_id: userModification.user_id,
            contact_ids: userModification.contact_ids,
            travel_phrase: defaultPhrase,
            category: categoriesMap.get(defaultPhrase.category_id) || null,
            allergens: resolvedAllergens,
            contacts: resolvedContacts
          };
        } else {
          // User hasn't modified this phrase, create a virtual user phrase with default values
          return {
            id: `default-${defaultPhrase.id}`,
            created_at: defaultPhrase.created_at,
            travel_card_id: travelCardData.card_id,
            default_phrase_id: defaultPhrase.id,
            allergen_ids: [],
            user_id: profileData.user_id,
            contact_ids: [],
            travel_phrase: defaultPhrase,
            category: categoriesMap.get(defaultPhrase.category_id) || null,
            allergens: [],
            contacts: []
          };
        }
      });

    // Get custom phrases (phrases that don't have a corresponding default phrase)
    const customTravelPhrases: UserTravelPhraseWithDetails[] = (userTravelPhrasesRaw || [])
      .filter(up => !up.default_phrase_id)
      .map((customPhrase) => {
        const resolvedAllergens = (customPhrase.allergen_ids || [])
          .map((id: string) => allergensMapForTravel.get(id))
          .filter((a: UserAllergen | undefined): a is UserAllergen => a !== undefined);

        const resolvedContacts = (customPhrase.contact_ids || [])
          .map((id: string) => contactsMapForTravel.get(id))
          .filter((c: UserEmergencyCardContact | undefined): c is UserEmergencyCardContact => c !== undefined);

        return {
          id: customPhrase.id,
          created_at: customPhrase.created_at,
          travel_card_id: customPhrase.travel_card_id,
          default_phrase_id: customPhrase.default_phrase_id,
          allergen_ids: customPhrase.allergen_ids,
          user_id: customPhrase.user_id,
          contact_ids: customPhrase.contact_ids,
          travel_phrase: null,
          category: null,
          allergens: resolvedAllergens,
          contacts: resolvedContacts
        };
      });

    // Combine default phrases and custom phrases
    travelPhrasesData = [...mergedDefaultTravelPhrases, ...customTravelPhrases];
  }

  return {
    profile: profileData,
    selectedCards: selectedCardsData || [],
    reactionProfile: reactionProfileData,
    reactionSymptoms: reactionSymptomsData,
    safetyLevels: userSafetyLevelsData,
    safetyRules: safetyRulesData,
    allergens: allergensData || [],
    emergencyCard: emergencyCardData,
    emergencyContacts: emergencyContactsData,
    emergencyDoctors: emergencyDoctorsData,
    emergencyHospitals: emergencyHospitalsData,
    epipenCard: epipenCardData,
    epipenInstructions: epipenInstructionsData,
    sweCard: sweCardData,
    sweCategories: sweCategoriesData,
    sweMeasures: sweMeasuresData,
    travelCard: travelCardData,
    travelLanguages: travelLanguagesData,
    travelPhrases: travelPhrasesData,
    travelCategories: travelCategoriesData
  };
}
