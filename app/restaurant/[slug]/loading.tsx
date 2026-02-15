import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COLORS } from "@/constants/colors";
import RestaurantImageCarouselSkeleton from "@/components/RestaurantImageCarouselSkeleton";
import RestaurantLeftSectionSkeleton from "@/components/RestaurantLeftSectionSkeleton";
import RestaurantRightSectionSkeleton from "@/components/RestaurantRightSectionSkeleton";

export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-2 py-8 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto h-full flex flex-col">
          <div className="flex justify-center">
            <div className="w-full md:w-[calc(60%+2rem)]">
              <RestaurantImageCarouselSkeleton />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 justify-center">
            <RestaurantLeftSectionSkeleton />
            <RestaurantRightSectionSkeleton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
