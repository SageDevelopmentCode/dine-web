import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import ProfileLeftSectionCard from "@/components/ProfileLeftSectionCard";
import CardPageRightSection from "@/components/CardPageRightSection";
import UserOtherCardsSection from "@/components/UserOtherCardsSection";
import { getInitialProfileData } from "@/lib/supabase/web_profiles/get_initial_profile_data";
import { getFoodAllergiesData } from "@/lib/supabase/allergies/get_food_allergies_data";
import { getEmergencyCardData } from "@/lib/supabase/emergency/get_emergency_card_data";
import { getEpipenCardData } from "@/lib/supabase/epipen/get_epipen_card_data";
import { getSweCardData } from "@/lib/supabase/swe/get_swe_card_data";
import { getTravelCardData } from "@/lib/supabase/travel/get_travel_card_data";
import { getUserAvailableCards } from "@/lib/supabase/user_cards/get_user_available_cards";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { cardBackgroundColors, type ValidCardType } from "@/constants/card-config";

interface CardPageProps {
  params: Promise<{
    slug: string;
    "card-type": string;
  }>;
}

const VALID_CARD_TYPES = [
  "food-allergies",
  "emergency",
  "epipen",
  "swe",
  "travel",
] as const;

export default async function CardPage({ params }: CardPageProps) {
  const { slug, "card-type": cardType } = await params;

  // Validate card type
  if (!VALID_CARD_TYPES.includes(cardType as ValidCardType)) {
    notFound();
  }

  const validCardType = cardType as ValidCardType;

  // Get initial profile data for the left section
  let initialData;
  try {
    initialData = await getInitialProfileData(slug);
  } catch (error) {
    if (error instanceof Error && error.message.includes("No profile found")) {
      notFound();
    }
    throw error;
  }

  const userId = initialData.profile.user_id;

  // Fetch user's available cards for the "Other Cards" section
  let availableCardTypes: ValidCardType[] = [];
  try {
    availableCardTypes = await getUserAvailableCards(userId);
  } catch (error) {
    console.error("Error fetching available cards:", error);
    // Continue without the other cards section if this fails
  }

  // Fetch card-specific data based on card type
  let cardData;
  try {
    switch (validCardType) {
      case "food-allergies":
        cardData = {
          ...(await getFoodAllergiesData(slug)),
          allergens: initialData.allergens,
        };
        break;

      case "emergency": {
        const supabase = await createClient();
        const { data: emergencyCardLookup } = await supabase
          .schema("emergency")
          .from("user_emergency_cards")
          .select("card_id")
          .eq("user_id", userId)
          .maybeSingle();

        if (!emergencyCardLookup) {
          cardData = {
            emergencyCard: null,
            emergencyContacts: [],
            emergencyDoctors: [],
            emergencyHospitals: [],
            reactionProfile: null,
          };
        } else {
          const { card, contacts, doctors, hospitals, reactionProfile } =
            await getEmergencyCardData(emergencyCardLookup.card_id);
          cardData = {
            emergencyCard: card,
            emergencyContacts: contacts,
            emergencyDoctors: doctors,
            emergencyHospitals: hospitals,
            reactionProfile: reactionProfile,
          };
        }
        break;
      }

      case "epipen": {
        const supabase = await createClient();
        const { data: epipenCardLookup } = await supabase
          .schema("epipen")
          .from("user_epipen_cards")
          .select("card_id")
          .eq("user_id", userId)
          .maybeSingle();

        if (!epipenCardLookup) {
          cardData = {
            epipenCard: null,
            epipenInstructions: [],
          };
        } else {
          const { card, instructions } = await getEpipenCardData(
            epipenCardLookup.card_id
          );
          cardData = {
            epipenCard: card,
            epipenInstructions: instructions,
          };
        }
        break;
      }

      case "swe": {
        const supabase = await createClient();
        const { data: sweCardLookup } = await supabase
          .schema("swe")
          .from("user_swe_cards")
          .select("card_id")
          .eq("user_id", userId)
          .maybeSingle();

        if (!sweCardLookup) {
          cardData = {
            sweCard: null,
            sweCategories: [],
            sweMeasures: [],
          };
        } else {
          const { card, categories, measures } = await getSweCardData(
            sweCardLookup.card_id
          );
          cardData = {
            sweCard: card,
            sweCategories: categories,
            sweMeasures: measures,
          };
        }
        break;
      }

      case "travel": {
        cardData = await getTravelCardData(userId);
        break;
      }

      default:
        notFound();
    }
  } catch (error) {
    console.error(`Error fetching ${validCardType} data:`, error);
    throw error;
  }

  return (
    <div
      className="h-screen flex flex-col overflow-y-auto"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-2 py-8 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center mb-8">
            <ProfileLeftSectionCard
              profile={initialData.profile}
              emergencyContacts={initialData.emergencyContacts}
              slug={slug}
            />
            <CardPageRightSection
              cardType={validCardType}
              backgroundColor={cardBackgroundColors[validCardType]}
              cardData={cardData}
            />
          </div>

          {/* User's Other Cards Section */}
          <UserOtherCardsSection
            availableCardTypes={availableCardTypes}
            currentCardType={validCardType}
            slug={slug}
          />
        </div>
      </main>
    </div>
  );
}
