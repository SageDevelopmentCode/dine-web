import { createClient } from '@/lib/supabase/server';
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
  UserEpipenInstructionWithDetails
} from '@/lib/supabase/types';

/**
 * Get a user's web profile by their URL slug
 * @param slug - The URL slug to lookup
 * @returns The complete user web profile data with selected cards, allergy information, safety data, emergency card, and epipen information
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

  // Get user epipen card from epipen schema
  const { data: epipenCardData, error: epipenCardError } = await supabase
    .schema('epipen')
    .from('user_epipen_cards')
    .select('*')
    .eq('user_id', profileData.user_id)
    .maybeSingle();

  if (epipenCardError) {
    throw new Error(`Failed to fetch epipen card: ${epipenCardError.message}`);
  }

  // Get all default epipen instructions
  const { data: allDefaultEpipenInstructions, error: defaultEpipenInstructionsError } = await supabase
    .schema('epipen')
    .from('epipen_instructions')
    .select('*')
    .order('sort_order');

  if (defaultEpipenInstructionsError) {
    throw new Error(`Failed to fetch default epipen instructions: ${defaultEpipenInstructionsError.message}`);
  }

  // Get user's modified/deleted epipen instructions
  const { data: userEpipenInstructionsRaw, error: userEpipenInstructionsError } = await supabase
    .schema('epipen')
    .from('user_epipen_instructions')
    .select('*')
    .eq('user_id', profileData.user_id);

  if (userEpipenInstructionsError) {
    throw new Error(`Failed to fetch user epipen instructions: ${userEpipenInstructionsError.message}`);
  }

  // Create a map of instruction_key -> user modification for quick lookup
  const userEpipenInstructionsMap = new Map((userEpipenInstructionsRaw || []).map(ui => [ui.instruction_key, ui]));

  // Merge: for each default instruction, check if user has modified/deleted it
  const mergedDefaultEpipenInstructions: UserEpipenInstructionWithDetails[] = (allDefaultEpipenInstructions || [])
    .map((defaultInstruction) => {
      const userModification = userEpipenInstructionsMap.get(defaultInstruction.instruction_key);

      if (userModification) {
        // User has modified this instruction
        return {
          id: userModification.id,
          created_at: userModification.created_at,
          user_id: userModification.user_id,
          instruction_key: userModification.instruction_key,
          instruction_text: userModification.instruction_text,
          icon_type: userModification.icon_type,
          sort_order: userModification.sort_order,
          is_deleted: userModification.is_deleted,
          epipen_instruction: defaultInstruction
        };
      } else {
        // User hasn't modified this instruction, create a virtual user instruction with default values
        return {
          id: `default-${defaultInstruction.id}`,
          created_at: defaultInstruction.created_at,
          user_id: profileData.user_id,
          instruction_key: defaultInstruction.instruction_key,
          instruction_text: defaultInstruction.instruction_text,
          icon_type: defaultInstruction.icon_type,
          sort_order: defaultInstruction.sort_order,
          is_deleted: false,
          epipen_instruction: defaultInstruction
        };
      }
    });

  // Get custom instructions (instructions that don't have a corresponding default instruction)
  const customEpipenInstructions: UserEpipenInstructionWithDetails[] = (userEpipenInstructionsRaw || [])
    .filter(ui => ui.instruction_key.startsWith('custom-'))
    .map((customInstruction) => ({
      id: customInstruction.id,
      created_at: customInstruction.created_at,
      user_id: customInstruction.user_id,
      instruction_key: customInstruction.instruction_key,
      instruction_text: customInstruction.instruction_text,
      icon_type: customInstruction.icon_type,
      sort_order: customInstruction.sort_order,
      is_deleted: customInstruction.is_deleted,
      epipen_instruction: null
    }));

  // Combine default instructions and custom instructions, then filter and sort
  const epipenInstructionsData: UserEpipenInstructionWithDetails[] = [...mergedDefaultEpipenInstructions, ...customEpipenInstructions]
    .filter(instruction => !instruction.is_deleted)  // Filter out deleted instructions
    .sort((a, b) => a.sort_order - b.sort_order);  // Sort by user's order

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
    epipenInstructions: epipenInstructionsData
  };
}
