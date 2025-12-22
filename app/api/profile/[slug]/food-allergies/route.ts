import { createClient } from '@/lib/supabase/server';
import {
  UserReactionProfile,
  UserReactionSymptomWithDetails,
  UserSafetyLevelWithDetails,
  UserSafetyRuleWithDetails,
  SafetyLevel,
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

    // Get user reaction profile
    const { data: reactionProfileData, error: reactionProfileError } = await supabase
      .schema('allergies')
      .from('user_reaction_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (reactionProfileError) {
      throw new Error(`Failed to fetch reaction profile: ${reactionProfileError.message}`);
    }

    // Get user reaction symptoms
    const { data: reactionSymptomsRaw, error: reactionSymptomsError } = await supabase
      .schema('allergies')
      .from('user_reaction_symptoms')
      .select('*')
      .eq('user_id', userId);

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

    // Get user safety levels
    const { data: userSafetyLevelsRaw, error: userSafetyLevelsError } = await supabase
      .schema('allergies')
      .from('user_safety_levels')
      .select('*')
      .eq('user_id', userId);

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
      .eq('user_id', userId);

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
            user_id: userId,
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

    // Get custom rules
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

    // Combine and filter
    const safetyRulesData: UserSafetyRuleWithDetails[] = [...mergedDefaultRules, ...customRules]
      .filter(rule => !rule.is_deleted)
      .sort((a, b) => a.sort_order - b.sort_order);

    return NextResponse.json({
      reactionProfile: reactionProfileData,
      reactionSymptoms: reactionSymptomsData,
      safetyLevels: userSafetyLevelsData,
      safetyRules: safetyRulesData,
    });
  } catch (error) {
    console.error('Error fetching food allergies data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food allergies data' },
      { status: 500 }
    );
  }
}
