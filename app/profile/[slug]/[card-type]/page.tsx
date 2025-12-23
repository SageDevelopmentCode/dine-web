import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import ProfileLeftSectionCard from "@/components/ProfileLeftSectionCard";
import CardPageRightSection from "@/components/CardPageRightSection";
import { getInitialProfileData } from "@/lib/supabase/web_profiles/get_initial_profile_data";
import { getFoodAllergiesData } from "@/lib/supabase/allergies/get_food_allergies_data";
import { getEmergencyCardData } from "@/lib/supabase/emergency/get_emergency_card_data";
import { getEpipenCardData } from "@/lib/supabase/epipen/get_epipen_card_data";
import { getSweCardData } from "@/lib/supabase/swe/get_swe_card_data";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

type ValidCardType = (typeof VALID_CARD_TYPES)[number];

const cardBackgroundColors: Record<ValidCardType, string> = {
  "food-allergies": COLORS.FOOD_ALLERGIES_BG,
  emergency: COLORS.EMERGENCY_MEDICAL_BG,
  epipen: COLORS.EPIPEN_COLOR,
  swe: COLORS.SCHOOL_WORK_EVENTS_BG,
  travel: COLORS.TRAVEL_BG,
};

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

  // Fetch card-specific data based on card type
  let cardData;
  try {
    switch (validCardType) {
      case "food-allergies":
        cardData = await getFoodAllergiesData(slug);
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
          };
        } else {
          const { card, contacts, doctors, hospitals } =
            await getEmergencyCardData(emergencyCardLookup.card_id);
          cardData = {
            emergencyCard: card,
            emergencyContacts: contacts,
            emergencyDoctors: doctors,
            emergencyHospitals: hospitals,
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
        const supabase = await createClient();
        const { data, error } = await supabase
          .schema("travel")
          .rpc("get_travel_card_data_web", {
            p_user_id: userId,
          });

        if (error) {
          throw new Error(`Failed to fetch travel data: ${error.message}`);
        }

        cardData = data;
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
      className="h-screen flex flex-col"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-2 py-8 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto h-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-full justify-center">
            <ProfileLeftSectionCard
              profile={initialData.profile}
              emergencyContacts={initialData.emergencyContacts}
              slug={slug}
            />
            <CardPageRightSection
              cardType={validCardType}
              backgroundColor={cardBackgroundColors[validCardType]}
              cardData={cardData}
              firstName={initialData.profile.first_name}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
