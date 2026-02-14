"use client";

import { UserAllergen } from "@/lib/supabase/types";

interface FilteredFoodAllergiesCardProps {
  allergens: UserAllergen[];
  selectedSubitems: any;
  textColor: string;
  variant: "expandable" | "dedicated";
}

/**
 * Filter food allergies data based on selected subitems
 * Expected structure of selectedSubitems:
 * ["dining-allergies", "symptoms"] - array of section identifiers
 *
 * For now, we'll display all allergens since the filtering is based on
 * which sections of the full food allergies card to show, not which
 * specific allergens. The allergens themselves are the core content.
 */
export default function FilteredFoodAllergiesCard({
  allergens,
  selectedSubitems,
  textColor,
  variant,
}: FilteredFoodAllergiesCardProps) {
  // For food allergies, the allergens are the main content
  // The selected_subitems typically refers to which card sections to show
  // (e.g., "dining-allergies", "symptoms", etc.)

  // Since we're in the "Important Information" context,
  // we'll display the allergens in a simple, clear format

  // Group allergens by severity
  const severeAllergens = allergens.filter(a => a.severity === 'severe');
  const moderateAllergens = allergens.filter(a => a.severity === 'moderate');
  const mildAllergens = allergens.filter(a => a.severity === 'mild');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return '#FEE2E2'; // Light red
      case 'moderate':
        return '#FEF3C7'; // Light yellow
      case 'mild':
        return '#DBEAFE'; // Light blue
      default:
        return '#F3F4F6'; // Light gray
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'severe':
        return '#DC2626'; // Red
      case 'moderate':
        return '#D97706'; // Orange
      case 'mild':
        return '#2563EB'; // Blue
      default:
        return '#9CA3AF'; // Gray
    }
  };

  if (allergens.length === 0) {
    return (
      <div style={{ color: textColor }}>
        <p className="text-sm">No allergen information available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-merriweather font-bold" style={{ color: textColor }}>
        Food Allergies
      </h3>

      {severeAllergens.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold" style={{ color: textColor }}>Severe</p>
          <div className="flex flex-wrap gap-2">
            {severeAllergens.map(allergen => (
              <div
                key={allergen.id}
                className="px-3 py-2 rounded-lg border-l-4"
                style={{
                  backgroundColor: getSeverityColor('severe'),
                  borderLeftColor: getSeverityBorder('severe'),
                }}
              >
                <span className="text-2xl mr-2">{String.fromCodePoint(parseInt(allergen.twemoji, 16))}</span>
                <span className="font-medium" style={{ color: textColor }}>{allergen.allergen}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {moderateAllergens.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold" style={{ color: textColor }}>Moderate</p>
          <div className="flex flex-wrap gap-2">
            {moderateAllergens.map(allergen => (
              <div
                key={allergen.id}
                className="px-3 py-2 rounded-lg border-l-4"
                style={{
                  backgroundColor: getSeverityColor('moderate'),
                  borderLeftColor: getSeverityBorder('moderate'),
                }}
              >
                <span className="text-2xl mr-2">{String.fromCodePoint(parseInt(allergen.twemoji, 16))}</span>
                <span className="font-medium" style={{ color: textColor }}>{allergen.allergen}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {mildAllergens.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold" style={{ color: textColor }}>Mild</p>
          <div className="flex flex-wrap gap-2">
            {mildAllergens.map(allergen => (
              <div
                key={allergen.id}
                className="px-3 py-2 rounded-lg border-l-4"
                style={{
                  backgroundColor: getSeverityColor('mild'),
                  borderLeftColor: getSeverityBorder('mild'),
                }}
              >
                <span className="text-2xl mr-2">{String.fromCodePoint(parseInt(allergen.twemoji, 16))}</span>
                <span className="font-medium" style={{ color: textColor }}>{allergen.allergen}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
