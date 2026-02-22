"use client";

import { COLORS } from "@/constants/colors";
import {
  type ValidCardType,
  cardTitles,
  cardDescriptions,
  cardIcons,
  cardBackgroundColors,
} from "@/constants/card-config";
import Image from "next/image";
import FoodAllergiesContent from "./FoodAllergiesContent";
import EmergencyCardContent from "./EmergencyCardContent";
import EpipenCardContent from "./EpipenCardContent";
import SweCardContent from "./SweCardContent";
import TravelCardContent from "./TravelCardContent";
import FilteredEmergencyCard from "./FilteredEmergencyCard";
import FilteredEpipenCard from "./FilteredEpipenCard";
import FilteredTravelCard from "./FilteredTravelCard";
import FilteredFoodAllergiesCard, { AllergensSection } from "./FilteredFoodAllergiesCard";
import type { Database } from "@/lib/supabase/types";
// Import only the exported composite types from data fetching modules
import type {
  UserReactionSymptomWithDetails,
  UserSafetyLevelWithDetails,
  UserSafetyRuleWithDetails,
} from "@/lib/supabase/allergies/get_food_allergies_data";
import type {
  UserTravelPhraseWithDetails,
  TravelPhraseCategory,
} from "@/lib/supabase/travel/get_travel_card_data";

// Type aliases for simple table types derived from Database schema
type UserAllergen = Database['allergies']['Tables']['user_allergens']['Row'];
type UserReactionProfile = Database['allergies']['Tables']['user_reaction_profiles']['Row'];
type UserEmergencyCard = Database['emergency']['Tables']['user_emergency_cards']['Row'];
type UserEmergencyCardContact = Database['emergency']['Tables']['user_emergency_card_contacts']['Row'];
type UserEmergencyCardDoctor = Database['emergency']['Tables']['user_emergency_card_doctors']['Row'];
type UserEmergencyCardHospital = Database['emergency']['Tables']['user_emergency_card_hospitals']['Row'];
type UserEpipenCard = Database['epipen']['Tables']['user_epipen_cards']['Row'];
type UserSweCard = Database['swe']['Tables']['user_swe_cards']['Row'];
type UserTravelCard = Database['travel']['Tables']['user_travel_cards']['Row'];
type UserTravelLanguage = Database['travel']['Tables']['user_travel_languages']['Row'];

// Define composite types that aren't exported
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
import type { SelectedCardData } from "@/lib/supabase/swe/get_swe_selected_cards";

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
        reactionProfile: Database['allergies']['Tables']['user_reaction_profiles']['Row'] | null;
      }
    | {
        epipenCard: UserEpipenCard | null;
        epipenInstructions: UserEpipenInstructionWithDetails[];
      }
    | {
        sweCard: UserSweCard | null;
        sweCategories: UserSweCategoryWithDetails[];
        sweMeasures: UserSweMeasureWithDetails[];
        selectedCards?: SelectedCardData[];
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
        {cardType === "food-allergies" && "safetyLevels" in cardData ? (
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
            reactionProfile={cardData.reactionProfile}
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

      {/* Important Information Section - Only for SWE cards with selected cards */}
      {cardType === "swe" && "sweCard" in cardData && cardData.selectedCards && cardData.selectedCards.length > 0 && (
        <div className="mt-8">
          <h2
            className="text-xl font-merriweather font-bold mb-4"
            style={{ color: COLORS.BLACK }}
          >
            Important Information
          </h2>
          <div className="space-y-6">
            {cardData.selectedCards.map((selectedCard, index) => {
              // Map database card type to ValidCardType
              const getValidCardType = (type: string): ValidCardType => {
                switch (type) {
                  case 'allergy':
                    return 'food-allergies';
                  case 'emergency':
                    return 'emergency';
                  case 'epipen':
                    return 'epipen';
                  case 'travel':
                    return 'travel';
                  default:
                    return 'food-allergies';
                }
              };

              const validCardType = getValidCardType(selectedCard.type);
              const cardTitle = cardTitles[validCardType];
              const cardIcon = cardIcons[validCardType];
              const backgroundColor = cardBackgroundColors[validCardType];

              if (selectedCard.type === 'emergency') {
                return (
                  <div key={index} className="w-full rounded-2xl" style={{ backgroundColor }}>
                    <div className="relative">
                      <div className="w-full px-6 py-2 flex items-center gap-4 min-h-[120px]">
                        {/* Icon */}
                        <div className="flex-shrink-0 -ml-8 h-[110px]">
                          <Image
                            src={cardIcon}
                            alt={cardTitle}
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
                            className="text-lg font-merriweather font-regular"
                            style={{ color: COLORS.WHITE }}
                          >
                            {cardTitle}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="px-4 pb-6">
                      <FilteredEmergencyCard
                        card={selectedCard.card}
                        contacts={selectedCard.contacts}
                        doctors={selectedCard.doctors}
                        hospitals={selectedCard.hospitals}
                        reactionProfile={selectedCard.reactionProfile}
                        selectedSubitems={selectedCard.selectedSubitems}
                        textColor={COLORS.WHITE}
                        variant="dedicated"
                      />
                    </div>
                  </div>
                );
              } else if (selectedCard.type === 'epipen') {
                return (
                  <div key={index} className="w-full rounded-2xl" style={{ backgroundColor }}>
                    <div className="relative">
                      <div className="w-full px-6 py-2 flex items-center gap-4 min-h-[120px]">
                        {/* Icon */}
                        <div className="flex-shrink-0 -ml-8 h-[110px]">
                          <Image
                            src={cardIcon}
                            alt={cardTitle}
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
                            className="text-lg font-merriweather font-regular"
                            style={{ color: COLORS.WHITE }}
                          >
                            {cardTitle}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="px-4 pb-6">
                      <FilteredEpipenCard
                        card={selectedCard.card}
                        instructions={selectedCard.instructions}
                        selectedSubitems={selectedCard.selectedSubitems}
                        textColor={COLORS.WHITE}
                        variant="dedicated"
                      />
                    </div>
                  </div>
                );
              } else if (selectedCard.type === 'travel') {
                return (
                  <div key={index} className="w-full rounded-2xl" style={{ backgroundColor }}>
                    <div className="relative">
                      <div className="w-full px-6 py-2 flex items-center gap-4 min-h-[120px]">
                        {/* Icon */}
                        <div className="flex-shrink-0 -ml-8 h-[110px]">
                          <Image
                            src={cardIcon}
                            alt={cardTitle}
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
                            className="text-lg font-merriweather font-regular"
                            style={{ color: COLORS.WHITE }}
                          >
                            {cardTitle}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="px-4 pb-6">
                      <FilteredTravelCard
                        travelCard={selectedCard.travelCard}
                        travelLanguages={selectedCard.travelLanguages}
                        travelPhrases={selectedCard.travelPhrases}
                        travelCategories={selectedCard.travelCategories}
                        selectedSubitems={selectedCard.selectedSubitems}
                        textColor={COLORS.WHITE}
                        variant="dedicated"
                      />
                    </div>
                  </div>
                );
              } else if (selectedCard.type === 'allergy') {
                return (
                  <div key={index}>
                    {/* Card Container */}
                    <div className="w-full rounded-2xl" style={{ backgroundColor }}>
                      <div className="relative">
                        <div className="w-full px-6 py-2 flex items-center gap-4 min-h-[120px]">
                          {/* Icon */}
                          <div className="flex-shrink-0 -ml-8 h-[110px]">
                            <Image
                              src={cardIcon}
                              alt={cardTitle}
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
                              className="text-lg font-merriweather font-regular"
                              style={{ color: COLORS.WHITE }}
                            >
                              {cardTitle}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="px-4 pb-6">
                        <FilteredFoodAllergiesCard
                          allergens={selectedCard.allergens}
                          reactionProfile={selectedCard.reactionProfile}
                          reactionSymptoms={selectedCard.reactionSymptoms}
                          selectedSubitems={selectedCard.selectedSubitems}
                          textColor={COLORS.WHITE}
                          variant="dedicated"
                          hideAllergens={false}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
