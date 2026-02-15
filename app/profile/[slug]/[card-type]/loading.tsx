import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COLORS } from "@/constants/colors";
import ProfileLeftSectionCardSkeleton from "@/components/ProfileLeftSectionCardSkeleton";
import CardPageRightSectionSkeleton from "@/components/CardPageRightSectionSkeleton";
import UserOtherCardsSectionSkeleton from "@/components/UserOtherCardsSectionSkeleton";

export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col overflow-y-auto"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-2 py-8 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center mb-8">
            <ProfileLeftSectionCardSkeleton />
            <CardPageRightSectionSkeleton />
          </div>

          {/* User's Other Cards Section */}
          <UserOtherCardsSectionSkeleton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
