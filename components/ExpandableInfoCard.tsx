"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { COLORS } from "@/constants/colors";
import FoodAllergiesContent from "./FoodAllergiesContent";
import type {
  UserReactionProfile,
  UserReactionSymptomWithDetails,
  UserSafetyLevelWithDetails,
  UserSafetyRuleWithDetails,
  UserEmergencyCard,
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

interface ExpandableInfoCardProps {
  icon: string;
  title: string;
  description: string;
  backgroundColor: string;
  children?: React.ReactNode;
  slug?: string;
  userId?: string;
  cardType?: "food-allergies" | "emergency" | "epipen" | "swe" | "travel";
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

export default function ExpandableInfoCard({
  icon,
  title,
  description,
  backgroundColor,
  children,
  slug,
  userId,
  cardType,
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
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-2 flex items-center gap-4 hover:opacity-90 min-h-[120px]"
      >
        {/* Icon */}
        <div className="flex-shrink-0 -ml-8 h-[110px]">
          <Image
            src={icon}
            alt={title}
            width={100}
            height={100}
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
            className="text-xs font-merriweather font-light"
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

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 overflow-y-auto max-h-[550px]">
          {isLoading ? (
            <p
              className="text-sm font-merriweather"
              style={{ color: COLORS.WHITE }}
            >
              Loading...
            </p>
          ) : cardData && cardType === "food-allergies" && "reactionProfile" in cardData ? (
            <FoodAllergiesContent
              reactionProfile={cardData.reactionProfile}
              reactionSymptoms={cardData.reactionSymptoms}
              safetyLevels={cardData.safetyLevels}
              safetyRules={cardData.safetyRules}
            />
          ) : (
            children || (
              <p
                className="text-sm font-merriweather"
                style={{ color: COLORS.WHITE }}
              >
                Content coming soon...
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
