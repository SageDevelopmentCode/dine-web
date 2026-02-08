"use client";

import { useState } from "react";
import { COLORS } from "@/constants/colors";
import AllergenCard from "./AllergenCard";
import ExpandableInfoCard from "./ExpandableInfoCard";
import AllergenDetailModal from "./AllergenDetailModal";
import TrustedRestaurantCard from "./TrustedRestaurantCard";
import RecentReviewCard from "./RecentReviewCard";
import { Database } from "@/lib/supabase/types";
import type {
  TrustedRestaurant,
  RecentReview,
  UserWebProfileSelectedCardWithType
} from "@/lib/supabase/web_profiles/get_initial_profile_data";

// Type alias for better readability
type UserAllergen = Database['allergies']['Tables']['user_allergens']['Row'];

// Card type mapping from database enum to frontend string
type DatabaseCardType = "allergy" | "emergency" | "epipen" | "travel" | "swe";
type ValidCardType =
  | "food-allergies"
  | "emergency"
  | "epipen"
  | "swe"
  | "travel";

const cardTypeMapping: Record<DatabaseCardType, ValidCardType> = {
  allergy: "food-allergies",
  emergency: "emergency",
  epipen: "epipen",
  travel: "travel",
  swe: "swe",
};

interface ProfileRightSectionProps {
  slug: string;
  userId: string;
  allergens: UserAllergen[];
  firstName?: string | null;
  selectedCards: UserWebProfileSelectedCardWithType[];
  trustedRestaurants: TrustedRestaurant[];
  recentReviews: RecentReview[];
}

export default function ProfileRightSection({
  slug,
  userId,
  allergens,
  firstName,
  selectedCards,
  trustedRestaurants,
  recentReviews,
}: ProfileRightSectionProps) {
  const [selectedAllergen, setSelectedAllergen] = useState<UserAllergen | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map selected cards to frontend card types
  const activeCardTypes = new Set<ValidCardType>(
    selectedCards.map((card) => {
      const dbCardType = card.card_type as DatabaseCardType;
      return cardTypeMapping[dbCardType];
    }).filter(Boolean)
  );

  // Helper function to check if a card should be shown
  const shouldShowCard = (cardType: ValidCardType): boolean => {
    return activeCardTypes.has(cardType);
  };

  // Filter allergens by severity
  const severeAllergens = allergens.filter((a) => a.severity === "severe");
  const moderateAllergens = allergens.filter((a) => a.severity === "moderate");
  const mildAllergens = allergens.filter((a) => a.severity === "mild");

  const handleAllergenClick = (allergen: UserAllergen) => {
    setSelectedAllergen(allergen);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAllergen(null);
  };

  return (
    <div className="flex flex-col w-full md:w-[35%] h-full overflow-y-auto pb-20 md:pb-0">
      <h2
        className="text-xl font-merriweather font-bold mb-4"
        style={{ color: COLORS.BLACK }}
      >
        My Allergies and Cards
      </h2>

      {/* Severe Section */}
      {severeAllergens.length > 0 && (
        <div className="mb-6">
          <h3
            className="text-sm font-lato mb-3"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            Severe
          </h3>
          <div className="flex flex-wrap gap-3">
            {severeAllergens.map((allergen) => (
              <AllergenCard
                key={allergen.id}
                emojiHex={allergen.twemoji}
                label={allergen.allergen}
                severity="severe"
                onClick={() => handleAllergenClick(allergen)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Moderate Section */}
      {moderateAllergens.length > 0 && (
        <div className="mb-6">
          <h3
            className="text-sm font-lato mb-3"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            Moderate
          </h3>
          <div className="flex flex-wrap gap-3">
            {moderateAllergens.map((allergen) => (
              <AllergenCard
                key={allergen.id}
                emojiHex={allergen.twemoji}
                label={allergen.allergen}
                severity="moderate"
                onClick={() => handleAllergenClick(allergen)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mild Section */}
      {mildAllergens.length > 0 && (
        <div className="mb-6">
          <h3
            className="text-sm font-lato mb-3"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            Mild
          </h3>
          <div className="flex flex-wrap gap-3">
            {mildAllergens.map((allergen) => (
              <AllergenCard
                key={allergen.id}
                emojiHex={allergen.twemoji}
                label={allergen.allergen}
                severity="mild"
                onClick={() => handleAllergenClick(allergen)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Info Cards Section */}
      <div className="mt-8">
        {shouldShowCard("food-allergies") && (
          <ExpandableInfoCard
            icon="/assets/JustMe.png"
            title="Food Allergies"
            description="Includes food preferences, allergies, instructions"
            backgroundColor={COLORS.FOOD_ALLERGIES_BG}
            slug={slug}
            userId={userId}
            cardType="food-allergies"
          />
        )}

        {shouldShowCard("emergency") && (
          <ExpandableInfoCard
            icon="/assets/Emergency.png"
            title="Emergency Medical"
            description="If I'm unconscious or having a severe reaction"
            backgroundColor={COLORS.EMERGENCY_MEDICAL_BG}
            slug={slug}
            userId={userId}
            cardType="emergency"
          />
        )}

        {shouldShowCard("epipen") && (
          <ExpandableInfoCard
            icon="/assets/Epipen.png"
            title="Epipen Guide"
            description="How to help in an emergency"
            backgroundColor={COLORS.EPIPEN_COLOR}
            slug={slug}
            userId={userId}
            cardType="epipen"
          />
        )}

        {shouldShowCard("swe") && (
          <ExpandableInfoCard
            icon="/assets/SWE.png"
            title="School/Work/Events"
            description="For teachers, coworkers, daycare, camp, or caregivers"
            backgroundColor={COLORS.SCHOOL_WORK_EVENTS_BG}
            slug={slug}
            userId={userId}
            cardType="swe"
            firstName={firstName}
          />
        )}

        {shouldShowCard("travel") && (
          <ExpandableInfoCard
            icon="/assets/Travel.png"
            title="Travel"
            description="Multi-Language Allergy Information"
            backgroundColor={COLORS.TRAVEL_BG}
            slug={slug}
            userId={userId}
            cardType="travel"
          />
        )}
      </div>

      {/* Trusted Restaurants Section */}
      {trustedRestaurants.length > 0 && (
        <div className="mb-6 mt-8">
          <h3
            className="text-lg font-merriweather font-bold mb-4"
            style={{ color: COLORS.BLACK }}
          >
            Trusted Restaurants
          </h3>
          <div className="flex flex-col">
            {trustedRestaurants.map((tr) => (
              <TrustedRestaurantCard
                key={tr.id}
                trustedRestaurant={tr}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Reviews Section */}
      {recentReviews.length > 0 && (
        <div className="mb-6 mt-8">
          <h3
            className="text-lg font-merriweather font-bold mb-4"
            style={{ color: COLORS.BLACK }}
          >
            Recent Reviews
          </h3>
          <div className="flex flex-col">
            {recentReviews.map((rr) => (
              <RecentReviewCard
                key={rr.review.id}
                recentReview={rr}
              />
            ))}
          </div>
        </div>
      )}

      {/* Allergen Detail Modal */}
      <AllergenDetailModal
        allergen={selectedAllergen}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
