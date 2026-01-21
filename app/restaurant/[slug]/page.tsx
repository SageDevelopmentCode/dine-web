import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import RestaurantLeftSection from "@/components/RestaurantLeftSection";
import RestaurantRightSection from "@/components/RestaurantRightSection";
import { getRestaurantProfileData } from "@/lib/supabase/restaurant_profiles/get_restaurant_profile_data";
import { notFound } from "next/navigation";

interface RestaurantPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;

  let restaurantData;
  try {
    restaurantData = await getRestaurantProfileData(slug);

    // Console.log all data as a single structured object
    console.log("Restaurant Data:", {
      webProfile: {
        url: restaurantData.url,
        profile: restaurantData.profile,
        images: restaurantData.images,
      },
      restaurant: {
        ...restaurantData.restaurant,
        address: restaurantData.address,
        dietaryOptions: restaurantData.dietaryOptions,
        kitchenProtocols: restaurantData.kitchenProtocols,
        cuisineOptions: restaurantData.cuisineOptions,
        allergensHandled: restaurantData.allergensHandled,
        hours: restaurantData.hours,
      },
      menu: {
        categories: restaurantData.menuCategories,
        items: restaurantData.menuItems,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("No restaurant profile found")
    ) {
      notFound();
    }
    throw error;
  }

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-2 py-8 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto h-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-full justify-center">
            <RestaurantLeftSection
              restaurant={restaurantData.restaurant}
              address={restaurantData.address}
              cuisineOptions={restaurantData.cuisineOptions}
              dietaryOptions={restaurantData.dietaryOptions}
            />
            <RestaurantRightSection />
          </div>
        </div>
      </main>
    </div>
  );
}
