import { COLORS } from "@/constants/colors";
import HomeScreenSection from "@/components/landing/HomeScreenSection";
import RestaurantAllergySection from "@/components/landing/RestaurantAllergySection";
import EmergencyMedicalSection from "@/components/landing/EmergencyMedicalSection";
import SchoolWorkEventsSection from "@/components/landing/SchoolWorkEventsSection";
import TravelTranslationSection from "@/components/landing/TravelTranslationSection";
import FoodSearchSection from "@/components/landing/FoodSearchSection";
import WebProfileSection from "@/components/landing/WebProfileSection";
import FamilyManagementSection from "@/components/landing/FamilyManagementSection";
import RestaurantDiscoverySection from "@/components/landing/RestaurantDiscoverySection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Dine - Food Allergy Communication Made Simple",
  description: "Share your food allergies with restaurants, schools, and others in a simple and easy way. Communicate safely and confidently.",
};

export default function Home() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      {/* Home Screen Section - 100vh */}
      <HomeScreenSection />

      {/* Restaurant Allergy Information Section */}
      <RestaurantAllergySection />

      {/* Emergency Medical Information Section */}
      <EmergencyMedicalSection />

      {/* School, Work, and Events Section */}
      <SchoolWorkEventsSection />

      {/* Travel and Translation Section */}
      <TravelTranslationSection />

      {/* Food Search and Community Section */}
      <FoodSearchSection />

      {/* Web Profile Section */}
      <WebProfileSection />

      {/* Family Management Section */}
      <FamilyManagementSection />

      {/* Restaurant Discovery Section */}
      <RestaurantDiscoverySection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
