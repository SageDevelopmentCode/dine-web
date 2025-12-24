"use client";

import { COLORS } from "@/constants/colors";
import {
  type ValidCardType,
  cardBackgroundColors,
} from "@/constants/card-config";
import OtherCardPreview from "./OtherCardPreview";

interface UserOtherCardsSectionProps {
  availableCardTypes: ValidCardType[];
  currentCardType: ValidCardType;
  slug: string;
}

export default function UserOtherCardsSection({
  availableCardTypes,
  currentCardType,
  slug,
}: UserOtherCardsSectionProps) {
  // Filter out the current card type
  const otherCards = availableCardTypes.filter(
    (cardType) => cardType !== currentCardType
  );

  return (
    <div className="w-full mt-8">
      {/* Section Title */}
      <h2
        className="text-xl sm:text-2xl font-merriweather font-semibold mb-6"
        style={{ color: COLORS.BLACK }}
      >
        User&apos;s Other Cards
      </h2>

      {/* Cards Grid or Empty State */}
      {otherCards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {otherCards.map((cardType) => (
            <OtherCardPreview
              key={cardType}
              cardType={cardType}
              slug={slug}
              backgroundColor={cardBackgroundColors[cardType]}
            />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-8 px-4 rounded-lg"
          style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
        >
          <p
            className="text-sm sm:text-base font-merriweather"
            style={{ color: COLORS.BLACK }}
          >
            No other cards available
          </p>
        </div>
      )}
    </div>
  );
}
