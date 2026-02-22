"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { COLORS } from "@/constants/colors";
import type {
  UserSweCard,
  UserSweCategoryWithDetails,
  UserSweMeasureWithDetails,
} from "@/lib/supabase/types";

interface SweCardContentProps {
  sweCard: UserSweCard | null;
  sweCategories: UserSweCategoryWithDetails[];
  sweMeasures: UserSweMeasureWithDetails[];
  firstName?: string | null;
  textColor?: string;
  variant?: "expandable" | "dedicated";
}

// Category background colors
const categoryColors: Record<string, string> = {
  classroom: "#E3F2FD", // Light blue
  office: "#F3E5F5", // Light purple
  "meetings-events": "#E8F5E9", // Light green
  "birthday-parties": "#FCE4EC", // Light pink
  "field-trips": "#FFF3E0", // Light orange
  default: "#F5F5F5", // Light gray for custom categories
};

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  classroom: "Safety protocols and accommodations for the classroom environment",
  office: "Prevention measures for school office and administrative areas",
  "meetings-events": "Guidelines for meetings, assemblies, and special events",
  "birthday-parties": "Safety guidelines for birthday parties and special celebrations",
  "field-trips": "Safety procedures for field trips and off-campus activities",
};

// Category display names (reverse mapping from normalized keys to display names)
const categoryDisplayNames: Record<string, string> = {
  classroom: "In the Classroom",
  office: "In the Office",
  "meetings-events": "Meetings and Events",
  "birthday-parties": "Birthday Parties and Celebrations",
  "field-trips": "Field Trips",
};

export default function SweCardContent({
  sweCard,
  sweCategories,
  sweMeasures,
  firstName,
  textColor = COLORS.WHITE,
  variant = "expandable",
}: SweCardContentProps) {
  // Helper function to replace {userName} with actual first name
  const replaceUserName = (text: string): string => {
    if (!firstName) return text;
    return text.replace(/{userName}/g, firstName);
  };

  // State to track which categories are expanded (all expanded by default)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sweCategories.forEach((category) => {
      initial[category.id] = true; // All expanded by default
    });
    return initial;
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Filter active measures (SQL now returns only user-selected measures)
  const activeMeasures = sweMeasures.filter((measure) => !measure.is_deleted);

  // Group measures by category
  const measuresByCategory = sweCategories.map((category) => {
    const categoryMeasures = activeMeasures.filter(
      (measure) => {
        // For default categories (virtual IDs), match against default_category_id
        // For user-created categories, match against the actual category ID
        if (category.id.startsWith('default-')) {
          return measure.user_category_id === category.default_category_id;
        }
        // For user categories, match the actual IDs
        return measure.user_category_id === category.id;
      }
    );
    return {
      category,
      measures: categoryMeasures,
    };
  });

  // Filter out categories with no measures
  const categoriesWithMeasures = measuresByCategory.filter(
    (item) => item.measures.length > 0
  );

  // Get background color for a category
  const getCategoryColor = (category: UserSweCategoryWithDetails): string => {
    // For expandable variant (in ProfileRightSection), use consistent purple background
    if (variant === "expandable") {
      return "#44276A";
    }
    // For dedicated variant (in card page), use multi-color system
    const categoryName = category.swe_category?.category_name;
    return categoryColors[categoryName || "default"] || categoryColors.default;
  };

  // Get description for a category
  const getCategoryDescription = (category: UserSweCategoryWithDetails): string | null => {
    const categoryName = category.swe_category?.category_name;
    return categoryDescriptions[categoryName || ""] || null;
  };

  // Get display name for a category (converts normalized key to display name)
  const getCategoryDisplayName = (category: UserSweCategoryWithDetails): string => {
    const categoryName = category.swe_category?.category_name;
    return categoryDisplayNames[categoryName || ""] || categoryName || "";
  };

  return (
    <div className="space-y-4">
      {/* Prevention Measures */}
      <div>
        <h4
          className="text-lg font-merriweather font-semibold mb-3"
          style={{ color: textColor }}
        >
          Prevention Measures
        </h4>

        {categoriesWithMeasures.length > 0 ? (
          <div className="space-y-3">
            {categoriesWithMeasures.map(({ category, measures }) => {
              const isExpanded = expandedCategories[category.id];
              const bgColor = getCategoryColor(category);
              const description = getCategoryDescription(category);

              return (
                <div
                  key={category.id}
                  className="rounded-lg overflow-hidden"
                  style={{ backgroundColor: bgColor }}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:opacity-80 transition-opacity"
                  >
                    <div className="flex-1 text-left">
                      <h5 className={`text-base font-merriweather font-semibold ${variant === "expandable" ? "text-white" : "text-gray-900"}`}>
                        {category.custom_category_name ||
                          getCategoryDisplayName(category)}
                      </h5>
                      {description && (
                        <p className={`text-xs font-merriweather mt-1 ${variant === "expandable" ? "text-white" : "text-gray-600"}`}>
                          {description}
                        </p>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className={`w-5 h-5 flex-shrink-0 ml-2 ${variant === "expandable" ? "text-white" : "text-gray-700"}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 ${variant === "expandable" ? "text-white" : "text-gray-700"}`} />
                    )}
                  </button>

                  {/* Category Content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="px-4 pb-4 space-y-2">
                      {measures.map((measure) => (
                        <div
                          key={measure.id}
                          className="flex items-start gap-2 text-xs font-merriweather rounded-lg p-3 bg-white shadow-sm"
                        >
                          <span className="flex-1 text-gray-900">
                            {replaceUserName(measure.instruction_text ?? "")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm font-merriweather" style={{ color: textColor }}>
            No measures configured yet.
          </p>
        )}
      </div>

      {/* Notes Section */}
      {sweCard?.notes && (
        <div className="rounded-lg p-4" style={{ backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#44276A" }}>
          <h4
            className="text-sm font-merriweather font-semibold mb-3"
            style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
          >
            Notes
          </h4>
          <p
            className="text-xs font-merriweather"
            style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
          >
            {sweCard.notes}
          </p>
        </div>
      )}
    </div>
  );
}
