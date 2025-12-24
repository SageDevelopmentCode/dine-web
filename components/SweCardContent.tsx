"use client";

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
  firstName?: string;
  textColor?: string;
  variant?: "expandable" | "dedicated";
}

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

  // Filter active measures
  const activeMeasures = sweMeasures.filter((measure) => !measure.is_deleted);

  // Group measures by category
  const measuresByCategory = sweCategories.map((category) => {
    const categoryMeasures = activeMeasures.filter(
      (measure) => measure.user_category_id === category.default_category_id
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

  return (
    <div className="space-y-4">
      {/* Accommodations Required */}
      <div>
        <h4
          className="text-lg font-merriweather font-semibold mb-3"
          style={{ color: textColor }}
        >
          Accommodations Required
        </h4>

        {categoriesWithMeasures.length > 0 ? (
          categoriesWithMeasures.map(({ category, measures }) => (
            <div key={category.id} className="mb-4">
              <h4
                className="text-sm font-merriweather font-semibold mb-2"
                style={{ color: textColor }}
              >
                {category.custom_category_name ||
                  category.swe_category?.category_name}
              </h4>

              <div className="space-y-2">
                {measures.map((measure) => (
                  <div
                    key={measure.id}
                    className="flex items-start gap-2 text-xs font-merriweather rounded-lg p-3"
                    style={{
                      backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#44276A",
                      color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE,
                    }}
                  >
                    <span className="flex-1">
                      {replaceUserName(measure.instruction_text)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
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
