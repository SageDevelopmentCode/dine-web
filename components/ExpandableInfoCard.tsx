"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { COLORS } from "@/constants/colors";
import Link from "next/link";
import FoodAllergiesContent from "./FoodAllergiesContent";
import EmergencyCardContent from "./EmergencyCardContent";
import EpipenCardContent from "./EpipenCardContent";
import SweCardContent from "./SweCardContent";
import TravelCardContent from "./TravelCardContent";
import type { Database } from "@/lib/supabase/types";
import type {
  UserReactionSymptomWithDetails,
  UserSafetyLevelWithDetails,
  UserSafetyRuleWithDetails,
} from "@/lib/supabase/allergies/get_food_allergies_data";
import type {
  UserTravelPhraseWithDetails,
  TravelPhraseCategory,
} from "@/lib/supabase/travel/get_travel_card_data";

// Type aliases for simple table types
type UserReactionProfile = Database['allergies']['Tables']['user_reaction_profiles']['Row'];
type UserEmergencyCard = Database['emergency']['Tables']['user_emergency_cards']['Row'];
type UserEmergencyCardContact = Database['emergency']['Tables']['user_emergency_card_contacts']['Row'];
type UserEmergencyCardDoctor = Database['emergency']['Tables']['user_emergency_card_doctors']['Row'];
type UserEmergencyCardHospital = Database['emergency']['Tables']['user_emergency_card_hospitals']['Row'];
type UserEpipenCard = Database['epipen']['Tables']['user_epipen_cards']['Row'];
type UserSweCard = Database['swe']['Tables']['user_swe_cards']['Row'];
type UserTravelCard = Database['travel']['Tables']['user_travel_cards']['Row'];
type UserTravelLanguage = Database['travel']['Tables']['user_travel_languages']['Row'];

// Composite types that aren't exported
type UserEpipenInstruction = Database['epipen']['Tables']['user_epipen_instructions']['Row'];
type EpipenInstruction = Database['epipen']['Tables']['epipen_instructions']['Row'];
type UserEpipenInstructionWithDetails = UserEpipenInstruction & {
  epipen_instruction?: EpipenInstruction | null;
};

type UserSweCategory = Database['swe']['Tables']['user_swe_categories']['Row'];
type SweCategory = Database['swe']['Tables']['swe_categories']['Row'];
type UserSweCategoryWithDetails = UserSweCategory & {
  swe_category?: SweCategory | null;
};

type UserSweMeasure = Database['swe']['Tables']['user_swe_measures']['Row'];
type UserSweMeasureWithDetails = UserSweMeasure;

interface ExpandableInfoCardProps {
  icon: string;
  title: string;
  description: string;
  backgroundColor: string;
  children?: React.ReactNode;
  slug?: string;
  userId?: string;
  cardType?: "food-allergies" | "emergency" | "epipen" | "swe" | "travel";
  firstName?: string | null;
}

type CardDataType =
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
      reactionProfile:
        | Database["allergies"]["Tables"]["user_reaction_profiles"]["Row"]
        | null;
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

export default function ExpandableInfoCard({
  icon,
  title,
  description,
  backgroundColor,
  children,
  slug,
  userId,
  cardType,
  firstName,
}: ExpandableInfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cardData, setCardData] = useState<CardDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch data when card is expanded and we have a cardType and slug
    if (isExpanded && cardType && slug && !cardData && !isLoading) {
      const fetchCardData = async () => {
        setIsLoading(true);
        try {
          console.log(`🔄 Fetching ${cardType} data...`);
          // Include userId as query parameter if available
          const url = userId
            ? `/api/profile/${slug}/${cardType}?user_id=${userId}`
            : `/api/profile/${slug}/${cardType}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Failed to fetch ${cardType} data`);
          }

          const data = await response.json();
          setCardData(data);
          console.log(`✅ ${cardType} data loaded:`, data);
        } catch (error) {
          console.error(`❌ Error fetching ${cardType} data:`, error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCardData();
    }
  }, [isExpanded, cardType, slug, userId, cardData, isLoading]);

  return (
    <div
      className="w-full mb-4 rounded-2xl transition-all duration-300"
      style={{ backgroundColor }}
    >
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-2 flex items-center gap-4 hover:opacity-90 min-h-[120px]"
        >
          {/* Icon */}
          <div className="flex-shrink-0 -ml-8 h-[110px]">
            <Image
              src={icon}
              alt={title}
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
              {title}
            </h3>
            <p
              className="text-xs font-lato font-regular"
              style={{ color: COLORS.WHITE }}
            >
              {description}
            </p>
          </div>

          {/* Chevron Icon */}
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUp size={28} color={COLORS.WHITE} />
            ) : (
              <ChevronDown size={28} color={COLORS.WHITE} />
            )}
          </div>
        </button>
      </div>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-6 overflow-y-auto max-h-[550px]">
          {isLoading ? (
            <p className="text-sm font-lato" style={{ color: COLORS.WHITE }}>
              Loading...
            </p>
          ) : cardData &&
            cardType === "food-allergies" &&
            "reactionSymptoms" in cardData ? (
            <FoodAllergiesContent
              reactionProfile={cardData.reactionProfile}
              reactionSymptoms={cardData.reactionSymptoms}
              safetyLevels={cardData.safetyLevels}
              safetyRules={cardData.safetyRules}
            />
          ) : cardData &&
            cardType === "emergency" &&
            "emergencyCard" in cardData ? (
            <EmergencyCardContent
              emergencyCard={cardData.emergencyCard}
              emergencyContacts={cardData.emergencyContacts}
              emergencyDoctors={cardData.emergencyDoctors}
              emergencyHospitals={cardData.emergencyHospitals}
              reactionProfile={cardData.reactionProfile}
            />
          ) : cardData && cardType === "epipen" && "epipenCard" in cardData ? (
            <EpipenCardContent
              epipenCard={cardData.epipenCard}
              epipenInstructions={cardData.epipenInstructions}
            />
          ) : cardData && cardType === "swe" && "sweCard" in cardData ? (
            <SweCardContent
              sweCard={cardData.sweCard}
              sweCategories={cardData.sweCategories}
              sweMeasures={cardData.sweMeasures}
              firstName={firstName}
            />
          ) : cardData && cardType === "travel" && "travelCard" in cardData ? (
            <TravelCardContent
              travelCard={cardData.travelCard}
              travelLanguages={cardData.travelLanguages}
              travelPhrases={cardData.travelPhrases}
              travelCategories={cardData.travelCategories}
            />
          ) : (
            children || (
              <p className="text-sm font-lato" style={{ color: COLORS.WHITE }}>
                Content coming soon...
              </p>
            )
          )}

          {/* View Full Card Button - Only show if cardType and slug are available */}
          {cardType && slug && (
            <Link
              href={`/profile/${slug}/${cardType}`}
              className="block w-full mt-4 px-4 py-3 rounded-lg text-sm font-lato font-bold text-center transition-opacity hover:opacity-80"
              style={{
                backgroundColor: COLORS.WHITE,
                color: backgroundColor,
              }}
            >
              View Full Card
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
