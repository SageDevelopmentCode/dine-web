"use client";

import { useState } from "react";
import { COLORS } from "@/constants/colors";
import AllergenCard from "./AllergenCard";
import ExpandableInfoCard from "./ExpandableInfoCard";
import AllergenDetailModal from "./AllergenDetailModal";
import { UserAllergen } from "@/lib/supabase/types";

interface ProfileRightSectionProps {
  slug: string;
  userId: string;
  allergens: UserAllergen[];
  firstName?: string;
}

export default function ProfileRightSection({ slug, userId, allergens, firstName }: ProfileRightSectionProps) {
  const [selectedAllergen, setSelectedAllergen] = useState<UserAllergen | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter allergens by severity
  const severeAllergens = allergens.filter(a => a.severity === 'severe');
  const moderateAllergens = allergens.filter(a => a.severity === 'moderate');
  const mildAllergens = allergens.filter(a => a.severity === 'mild');

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
        className="text-xl font-merriweather font-regular mb-4"
        style={{ color: COLORS.BLACK }}
      >
        My Allergies and Cards
      </h2>

      {/* Severe Section */}
      {severeAllergens.length > 0 && (
        <div className="mb-6">
          <h3
            className="text-sm font-merriweather mb-3"
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
            className="text-sm font-merriweather mb-3"
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
            className="text-sm font-merriweather mb-3"
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
        <h2
          className="text-xl font-merriweather font-regular mb-4"
          style={{ color: COLORS.BLACK }}
        >
          My Cards
        </h2>

        <ExpandableInfoCard
          icon="/assets/JustMe.png"
          title="Food Allergies"
          description="Includes food preferences, allergies, instructions"
          backgroundColor={COLORS.FOOD_ALLERGIES_BG}
          slug={slug}
          userId={userId}
          cardType="food-allergies"
        />

        <ExpandableInfoCard
          icon="/assets/Emergency.png"
          title="Emergency Medical"
          description="If I'm unconscious or having a severe reaction"
          backgroundColor={COLORS.EMERGENCY_MEDICAL_BG}
          slug={slug}
          userId={userId}
          cardType="emergency"
        />

        <ExpandableInfoCard
          icon="/assets/Epipen.png"
          title="Epipen Guide"
          description="How to help in an emergency"
          backgroundColor={COLORS.EPIPEN_COLOR}
          slug={slug}
          userId={userId}
          cardType="epipen"
        />

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

        <ExpandableInfoCard
          icon="/assets/Travel.png"
          title="Travel"
          description="Multi-Language Allergy Information"
          backgroundColor={COLORS.TRAVEL_BG}
          slug={slug}
          userId={userId}
          cardType="travel"
        />
      </div>

      {/* Allergen Detail Modal */}
      <AllergenDetailModal
        allergen={selectedAllergen}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
