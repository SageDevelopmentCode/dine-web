import LandingHeader from "@/components/landing/LandingHeader";
import ForYouHeroSection from "@/components/for-you/ForYouHeroSection";
import ScenariosSection from "@/components/for-you/ScenariosSection";
import OutcomesSection from "@/components/for-you/OutcomesSection";
import RestaurantAllergySection from "@/components/landing/RestaurantAllergySection";
import EmergencyMedicalSection from "@/components/landing/EmergencyMedicalSection";
import SchoolWorkEventsSection from "@/components/landing/SchoolWorkEventsSection";
import TravelTranslationSection from "@/components/landing/TravelTranslationSection";
import FamilyManagementSection from "@/components/landing/FamilyManagementSection";
import CallToActionSection from "@/components/for-you/CallToActionSection";
import Footer from "@/components/Footer";
import { COLORS } from "@/constants/colors";

export const metadata = {
  title: "For You - Dine",
  description:
    "Manage your food allergies with confidence. From restaurants to travel, emergencies to daily life—Dine helps you feel safe and understood everywhere.",
};

export default function ForYouPage() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <LandingHeader />
      <ForYouHeroSection />
      <ScenariosSection />
      <OutcomesSection />
      <RestaurantAllergySection />
      <EmergencyMedicalSection />
      <SchoolWorkEventsSection />
      <TravelTranslationSection />
      <FamilyManagementSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
