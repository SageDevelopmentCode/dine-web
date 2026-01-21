"use client";

import { COLORS } from "@/constants/colors";
import {
  type ValidCardType,
  cardTitles,
  cardDescriptions,
  cardIcons,
} from "@/constants/card-config";
import Image from "next/image";
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
  UserAllergen,
} from "@/lib/supabase/types";

interface CardPageRightSectionProps {
  cardType: ValidCardType;
  backgroundColor: string;
  cardData:
    | {
        reactionProfile: UserReactionProfile | null;
        reactionSymptoms: UserReactionSymptomWithDetails[];
        safetyLevels: UserSafetyLevelWithDetails[];
        safetyRules: UserSafetyRuleWithDetails[];
        allergens?: UserAllergen[];
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
  firstName?: string | null;
}

export default function CardPageRightSection({
  cardType,
  backgroundColor,
  cardData,
  firstName,
}: CardPageRightSectionProps) {
  return (
    <div className="flex flex-col w-full md:w-[35%] h-full overflow-y-auto pb-20 md:pb-0">
      {/* Banner Header */}
      <div className="w-full mb-6 rounded-2xl" style={{ backgroundColor }}>
        <div className="px-6 py-2 flex items-center gap-4 min-h-[120px]">
          {/* Icon */}
          <div className="shrink-0 -ml-8 h-[110px]">
            <Image
              src={cardIcons[cardType]}
              alt={cardTitles[cardType]}
              width={110}
              height={110}
              quality={100}
              unoptimized={true}
              className="object-contain w-auto h-full"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 text-left">
            <h3
              className="text-lg font-merriweather font-regular mb-1"
              style={{ color: COLORS.WHITE }}
            >
              {cardTitles[cardType]}
            </h3>
            <p
              className="text-xs font-lato font-light"
              style={{ color: COLORS.WHITE }}
            >
              {cardDescriptions[cardType]}
            </p>
          </div>
        </div>
      </div>

      {/* Card Content - No outer background wrapper */}
      <div>
        {cardType === "food-allergies" && "reactionProfile" in cardData ? (
          <FoodAllergiesContent
            reactionProfile={cardData.reactionProfile}
            reactionSymptoms={cardData.reactionSymptoms}
            safetyLevels={cardData.safetyLevels}
            safetyRules={cardData.safetyRules}
            allergens={cardData.allergens}
            textColor={COLORS.BLACK}
            variant="dedicated"
          />
        ) : cardType === "emergency" && "emergencyCard" in cardData ? (
          <EmergencyCardContent
            emergencyCard={cardData.emergencyCard}
            emergencyContacts={cardData.emergencyContacts}
            emergencyDoctors={cardData.emergencyDoctors}
            emergencyHospitals={cardData.emergencyHospitals}
            textColor={COLORS.BLACK}
            variant="dedicated"
          />
        ) : cardType === "epipen" && "epipenCard" in cardData ? (
          <EpipenCardContent
            epipenCard={cardData.epipenCard}
            epipenInstructions={cardData.epipenInstructions}
            textColor={COLORS.BLACK}
            variant="dedicated"
          />
        ) : cardType === "swe" && "sweCard" in cardData ? (
          <SweCardContent
            sweCard={cardData.sweCard}
            sweCategories={cardData.sweCategories}
            sweMeasures={cardData.sweMeasures}
            firstName={firstName}
            textColor={COLORS.BLACK}
            variant="dedicated"
          />
        ) : cardType === "travel" && "travelCard" in cardData ? (
          <TravelCardContent
            travelCard={cardData.travelCard}
            travelLanguages={cardData.travelLanguages}
            travelPhrases={cardData.travelPhrases}
            travelCategories={cardData.travelCategories}
            textColor={COLORS.BLACK}
            variant="dedicated"
          />
        ) : (
          <p
            className="text-sm font-lato"
            style={{ color: COLORS.BLACK }}
          >
            No data available.
          </p>
        )}
      </div>
    </div>
  );
}
