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
    <div className="w-full md:w-[60%] mx-auto mt-20">
      {/* Section Title */}
      <h2
        className="text-sm sm:text-lg font-merriweather font-regular mb-3"
        style={{ color: COLORS.BLACK }}
      >
        User&apos;s Other Cards
      </h2>

      {/* Cards Grid or Empty State */}
      {otherCards.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
