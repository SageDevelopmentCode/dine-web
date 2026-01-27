import { COLORS } from "@/constants/colors";
import HomeScreenSection from "@/components/landing/HomeScreenSection";
import RestaurantAllergySection from "@/components/landing/RestaurantAllergySection";

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

      {/* Future sections go here */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Add more sections as needed */}
      </main>
    </div>
  );
}
