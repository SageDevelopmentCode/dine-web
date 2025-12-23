"use client";

import { COLORS } from "@/constants/colors";
import FoodAllergiesContent from "./FoodAllergiesContent";
import EmergencyCardContent from "./EmergencyCardContent";
import EpipenCardContent from "./EpipenCardContent";
import SweCardContent from "./SweCardContent";
import TravelCardContent from "./TravelCardContent";
import type {
  UserReactionProfile,
  UserReactionSymptomWithDetails,
  UserSafetyLevelWithDetails,
  UserSafetyRuleWithDetails,
  UserEmergencyCard,
  UserEmergencyCardContact,
  UserEmergencyCardDoctor,
  UserEmergencyCardHospital,
  UserEpipenCard,
  UserEpipenInstructionWithDetails,
  UserSweCard,
  UserSweCategoryWithDetails,
  UserSweMeasureWithDetails,
  UserTravelCard,
  UserTravelLanguage,
  UserTravelPhraseWithDetails,
  TravelPhraseCategory,
} from "@/lib/supabase/types";

interface CardPageRightSectionProps {
  cardType: "food-allergies" | "emergency" | "epipen" | "swe" | "travel";
  backgroundColor: string;
  cardData:
    | {
        reactionProfile: UserReactionProfile | null;
        reactionSymptoms: UserReactionSymptomWithDetails[];
        safetyLevels: UserSafetyLevelWithDetails[];
        safetyRules: UserSafetyRuleWithDetails[];
      }
    | {
        emergencyCard: UserEmergencyCard | null;
        emergencyContacts: UserEmergencyCardContact[];
        emergencyDoctors: UserEmergencyCardDoctor[];
        emergencyHospitals: UserEmergencyCardHospital[];
      }
    | {
        epipenCard: UserEpipenCard | null;
        epipenInstructions: UserEpipenInstructionWithDetails[];
      }
    | {
        sweCard: UserSweCard | null;
        sweCategories: UserSweCategoryWithDetails[];
        sweMeasures: UserSweMeasureWithDetails[];
      }
    | {
        travelCard: UserTravelCard | null;
        travelLanguages: UserTravelLanguage[];
        travelPhrases: UserTravelPhraseWithDetails[];
        travelCategories: TravelPhraseCategory[];
      };
  firstName?: string;
}

const cardTitles = {
  "food-allergies": "Food Allergies",
  emergency: "Emergency Medical",
  epipen: "Epipen Guide",
  swe: "School/Work/Events",
  travel: "Travel",
};

export default function CardPageRightSection({
  cardType,
  backgroundColor,
  cardData,
  firstName,
}: CardPageRightSectionProps) {
  return (
    <div className="flex flex-col w-full md:w-[35%] h-full overflow-y-auto pb-20 md:pb-0">
      {/* Card Title */}
      <h2
        className="text-2xl font-merriweather font-bold mb-6"
        style={{ color: COLORS.BLACK }}
      >
        {cardTitles[cardType]}
      </h2>

      {/* Card Container */}
      <div
        className="w-full rounded-2xl p-6"
        style={{ backgroundColor }}
      >
        <div className="overflow-y-auto max-h-[calc(86vh-120px)]">
          {cardType === "food-allergies" && "reactionProfile" in cardData ? (
            <FoodAllergiesContent
              reactionProfile={cardData.reactionProfile}
              reactionSymptoms={cardData.reactionSymptoms}
              safetyLevels={cardData.safetyLevels}
              safetyRules={cardData.safetyRules}
            />
          ) : cardType === "emergency" && "emergencyCard" in cardData ? (
            <EmergencyCardContent
              emergencyCard={cardData.emergencyCard}
              emergencyContacts={cardData.emergencyContacts}
              emergencyDoctors={cardData.emergencyDoctors}
              emergencyHospitals={cardData.emergencyHospitals}
            />
          ) : cardType === "epipen" && "epipenCard" in cardData ? (
            <EpipenCardContent
              epipenCard={cardData.epipenCard}
              epipenInstructions={cardData.epipenInstructions}
            />
          ) : cardType === "swe" && "sweCard" in cardData ? (
            <SweCardContent
              sweCard={cardData.sweCard}
              sweCategories={cardData.sweCategories}
              sweMeasures={cardData.sweMeasures}
              firstName={firstName}
            />
          ) : cardType === "travel" && "travelCard" in cardData ? (
            <TravelCardContent
              travelCard={cardData.travelCard}
              travelLanguages={cardData.travelLanguages}
              travelPhrases={cardData.travelPhrases}
              travelCategories={cardData.travelCategories}
            />
          ) : (
            <p
              className="text-sm font-merriweather"
              style={{ color: COLORS.WHITE }}
            >
              No data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
