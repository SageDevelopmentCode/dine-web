"use client";

import { COLORS } from "@/constants/colors";
import AllergenCard from "./AllergenCard";
import ExpandableInfoCard from "./ExpandableInfoCard";

interface ProfileRightSectionProps {
  slug: string;
}

export default function ProfileRightSection({ slug }: ProfileRightSectionProps) {
  return (
    <div className="flex flex-col w-[35%] h-full overflow-y-auto">
      <h2
        className="text-xl font-merriweather font-regular mb-4"
        style={{ color: COLORS.BLACK }}
      >
        My Allergies and Cards
      </h2>

      {/* Severe Section */}
      <div className="mb-6">
        <h3
          className="text-sm font-merriweather mb-3"
          style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
        >
          Severe
        </h3>
        <div className="flex flex-wrap gap-3">
          <AllergenCard emojiHex="1f9c4" label="Garlic" severity="severe" />
          <AllergenCard emojiHex="1f95c" label="Peanuts" severity="severe" />
          <AllergenCard emojiHex="1f330" label="Tree Nuts" severity="severe" />
          <AllergenCard emojiHex="1f33d" label="Corn" severity="severe" />
        </div>
      </div>

      {/* Moderate Section */}
      <div className="mb-6">
        <h3
          className="text-sm font-merriweather mb-3"
          style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
        >
          Moderate
        </h3>
        <div className="flex flex-wrap gap-3">
          <AllergenCard emojiHex="1f965" label="Coconut" severity="moderate" />
          <AllergenCard emojiHex="1f34a" label="Citrus" severity="moderate" />
        </div>
      </div>

      {/* Mild Section */}
      <div className="mb-6">
        <h3
          className="text-sm font-merriweather mb-3"
          style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
        >
          Mild
        </h3>
        <div className="flex flex-wrap gap-3">
          <AllergenCard emojiHex="1f345" label="Tomato" severity="mild" />
          <AllergenCard emojiHex="1f353" label="Strawberry" severity="mild" />
        </div>
      </div>

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
          cardType="food-allergies"
        />

        <ExpandableInfoCard
          icon="/assets/Emergency.png"
          title="Emergency Medical"
          description="If I'm unconscious or having a severe reaction"
          backgroundColor={COLORS.EMERGENCY_MEDICAL_BG}
          slug={slug}
          cardType="emergency"
        />

        <ExpandableInfoCard
          icon="/assets/Epipen.png"
          title="Epipen Guide"
          description="How to help in an emergency"
          backgroundColor={COLORS.EPIPEN_COLOR}
          slug={slug}
          cardType="epipen"
        />

        <ExpandableInfoCard
          icon="/assets/SWE.png"
          title="School/Work/Events"
          description="For teachers, coworkers, daycare, camp, or caregivers"
          backgroundColor={COLORS.SCHOOL_WORK_EVENTS_BG}
          slug={slug}
          cardType="swe"
        />

        <ExpandableInfoCard
          icon="/assets/Travel.png"
          title="Travel"
          description="Multi-Language Allergy Information"
          backgroundColor={COLORS.TRAVEL_BG}
          slug={slug}
          cardType="travel"
        />
      </div>
    </div>
  );
}
