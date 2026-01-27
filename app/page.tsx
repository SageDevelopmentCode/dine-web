import { COLORS } from "@/constants/colors";
import HomeScreenSection from "@/components/landing/HomeScreenSection";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      {/* Home Screen Section - 100vh */}
      <HomeScreenSection />

      {/* White Background Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          {/* Content will be added here */}
        </div>
      </section>

      {/* Future sections go here */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Add more sections as needed */}
      </main>
    </div>
  );
}
