import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import PhoneShowcaseSection from "@/components/landing/PhoneShowcaseSection";

export default function HomeScreenSection() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <LandingHeader />

      {/* Hero + Phone Showcase - Flexible space */}
      <div className="flex-1 flex flex-col justify-between max-w-7xl mx-auto w-full px-8">
        {/* Hero Section - centered with flex grow */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <HeroSection />
        </div>

        {/* Phone Showcase Section - anchored at bottom */}
        <PhoneShowcaseSection />
      </div>
    </div>
  );
}
