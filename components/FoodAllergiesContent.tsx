"use client";

import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import type {
  UserReactionProfile,
  UserReactionSymptomWithDetails,
  UserSafetyLevelWithDetails,
  UserSafetyRuleWithDetails,
} from "@/lib/supabase/types";

interface FoodAllergiesContentProps {
  reactionProfile: UserReactionProfile | null;
  reactionSymptoms: UserReactionSymptomWithDetails[];
  safetyLevels: UserSafetyLevelWithDetails[];
  safetyRules: UserSafetyRuleWithDetails[];
  textColor?: string;
  variant?: "expandable" | "dedicated";
}

export default function FoodAllergiesContent({
  reactionProfile,
  reactionSymptoms,
  safetyLevels,
  safetyRules,
  textColor = COLORS.WHITE,
  variant = "expandable",
}: FoodAllergiesContentProps) {
  // Group symptoms by severity
  const severeSymptoms = reactionSymptoms.filter(
    (s) => s.symptom?.severity === "severe" || s.custom_symptom_severity === "severe"
  );
  const moderateSymptoms = reactionSymptoms.filter(
    (s) => s.symptom?.severity === "moderate" || s.custom_symptom_severity === "moderate"
  );
  const mildSymptoms = reactionSymptoms.filter(
    (s) => s.symptom?.severity === "mild" || s.custom_symptom_severity === "mild"
  );

  // Get safety level name
  const safetyLevelName = safetyLevels.length > 0
    ? safetyLevels[0].safety_level?.name || "Not specified"
    : "Not specified";

  // Filter and sort safety rules
  const activeSafetyRules = safetyRules
    .filter((rule) => !rule.is_deleted)
    .sort((a, b) => a.sort_order - b.sort_order);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return COLORS.SEVERE_BORDER;
      case "moderate":
        return COLORS.MODERATE_BORDER;
      case "mild":
        return COLORS.MILD_BORDER;
      default:
        return COLORS.SECONDARY_TEXT_GRAY;
    }
  };

  return (
    <div className="space-y-4">
      {/* Reaction Profile Section */}
      {reactionProfile && (
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#5C827C" }}
        >
          <h4 className="text-sm font-merriweather font-semibold mb-3" style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}>
            Reaction Profile
          </h4>
          <div className="space-y-2 text-xs font-merriweather" style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}>
            {reactionProfile.has_anaphylaxis && (
              <p>⚠️ Has history of anaphylaxis</p>
            )}
            {reactionProfile.first_symptom && (
              <p><strong>First symptom:</strong> {reactionProfile.first_symptom}</p>
            )}
            {reactionProfile.reaction_speed && (
              <p><strong>Reaction speed:</strong> {reactionProfile.reaction_speed} minutes</p>
            )}
          </div>
        </div>
      )}

      {/* Symptoms Section */}
      {reactionSymptoms.length > 0 && (
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#5C827C" }}
        >
          <h4 className="text-sm font-merriweather font-semibold mb-3" style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}>
            My Symptoms
          </h4>

          {/* Severe Symptoms */}
          {severeSymptoms.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-merriweather mb-2" style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE, opacity: 0.9 }}>
                Severe
              </p>
              <div className="flex flex-wrap gap-2">
                {severeSymptoms.map((symptom) => (
                  <span
                    key={symptom.id}
                    className="px-3 py-1 rounded-full text-xs font-merriweather"
                    style={{
                      backgroundColor: COLORS.WHITE,
                      color: COLORS.BLACK,
                      border: `1.5px solid ${getSeverityColor("severe")}`,
                    }}
                  >
                    {symptom.is_custom ? symptom.custom_symptom : symptom.symptom?.display_name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Moderate Symptoms */}
          {moderateSymptoms.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-merriweather mb-2" style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE, opacity: 0.9 }}>
                Moderate
              </p>
              <div className="flex flex-wrap gap-2">
                {moderateSymptoms.map((symptom) => (
                  <span
                    key={symptom.id}
                    className="px-3 py-1 rounded-full text-xs font-merriweather"
                    style={{
                      backgroundColor: COLORS.WHITE,
                      color: COLORS.BLACK,
                      border: `1.5px solid ${getSeverityColor("moderate")}`,
                    }}
                  >
                    {symptom.is_custom ? symptom.custom_symptom : symptom.symptom?.display_name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mild Symptoms */}
          {mildSymptoms.length > 0 && (
            <div>
              <p className="text-xs font-merriweather mb-2" style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE, opacity: 0.9 }}>
                Mild
              </p>
              <div className="flex flex-wrap gap-2">
                {mildSymptoms.map((symptom) => (
                  <span
                    key={symptom.id}
                    className="px-3 py-1 rounded-full text-xs font-merriweather"
                    style={{
                      backgroundColor: COLORS.WHITE,
                      color: COLORS.BLACK,
                      border: `1.5px solid ${getSeverityColor("mild")}`,
                    }}
                  >
                    {symptom.is_custom ? symptom.custom_symptom : symptom.symptom?.display_name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Safety Rules Section */}
      {activeSafetyRules.length > 0 && (
        <div>
          <h4 className="text-sm font-merriweather font-semibold mb-2" style={{ color: textColor }}>
            Safety Instructions
          </h4>
          <p className="text-xs font-merriweather mb-3" style={{ color: textColor, opacity: 0.8 }}>
            Safety Level: <span className="capitalize font-semibold">{safetyLevelName}</span>
          </p>

          <div className="space-y-2">
            {activeSafetyRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-start gap-2 text-xs font-merriweather rounded-lg p-3"
                style={{
                  backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#5C827C",
                  color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE
                }}
              >
                <span className="flex-shrink-0 mt-0.5">
                  <Twemoji
                    hex={rule.icon_type === "check" ? "2705" : "274c"}
                    size={16}
                    alt={rule.icon_type === "check" ? "checkmark" : "cross mark"}
                  />
                </span>
                <span className="flex-1">{rule.rule_text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
