import { COLORS } from "@/constants/colors";
import HomeScreenSection from "@/components/landing/HomeScreenSection";
import RestaurantAllergySection from "@/components/landing/RestaurantAllergySection";
import EmergencyMedicalSection from "@/components/landing/EmergencyMedicalSection";

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

      {/* Future sections go here */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Add more sections as needed */}
      </main>
    </div>
  );
}
