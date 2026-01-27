import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import PhoneShowcaseSection from "@/components/landing/PhoneShowcaseSection";

export default function HomeScreenSection() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <LandingHeader />

      {/* Hero + Phone Showcase - Flexible space */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Phone Showcase Section */}
        <PhoneShowcaseSection />
      </div>
    </div>
  );
}
