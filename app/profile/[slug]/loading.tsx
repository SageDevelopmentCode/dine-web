import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COLORS } from "@/constants/colors";
import ProfileLeftSectionSkeleton from "@/components/ProfileLeftSectionSkeleton";
import ProfileRightSectionSkeleton from "@/components/ProfileRightSectionSkeleton";

export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-2 py-8 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto h-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-full justify-center">
            <ProfileLeftSectionSkeleton />
            <ProfileRightSectionSkeleton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
