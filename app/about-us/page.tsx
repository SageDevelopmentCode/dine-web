import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/about-us/HeroSection";
import OriginStorySection from "@/components/about-us/OriginStorySection";
import InspirationSection from "@/components/about-us/InspirationSection";
import MissionSection from "@/components/about-us/MissionSection";
import CommunityVisionSection from "@/components/about-us/CommunityVisionSection";
import CallToAction from "@/components/about-us/CallToAction";
import Footer from "@/components/Footer";
import { COLORS } from "@/constants/colors";

export const metadata = {
  title: "About Us - Dine",
  description: "Learn about Julius's personal journey and mission to help people with food allergies communicate safely and confidently.",
};

export default function AboutUsPage() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <LandingHeader />
      <HeroSection />
      <OriginStorySection />
      <InspirationSection />
      <MissionSection />
      <CommunityVisionSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
