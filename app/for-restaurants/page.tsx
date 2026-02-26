import { COLORS } from "@/constants/colors";
import LandingHeader from "@/components/landing/LandingHeader";
import RestaurantsHeroSection from "@/components/for-restaurants/RestaurantsHeroSection";
import WhyAllergyAwarenessSection from "@/components/for-restaurants/WhyAllergyAwarenessSection";
import RestaurantBenefitsSection from "@/components/for-restaurants/RestaurantBenefitsSection";
import PartnershipFormSection from "@/components/for-restaurants/PartnershipFormSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "For Restaurants - Dine",
  description:
    "Partner with Dine to improve food allergy safety, gain customer trust, and grow your restaurant's reputation in the allergy-aware community.",
};

export default function ForRestaurantsPage() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <LandingHeader />
      <RestaurantsHeroSection />
      <WhyAllergyAwarenessSection />
      <RestaurantBenefitsSection />
      <PartnershipFormSection />
      <Footer />
    </div>
  );
}
