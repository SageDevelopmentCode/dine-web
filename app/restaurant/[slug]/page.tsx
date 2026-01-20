import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
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

    // Console.log the fetched data
    console.log("=== RESTAURANT PROFILE DATA ===");
    console.log("URL Data:", restaurantData.url);
    console.log("Web Profile:", restaurantData.profile);
    console.log("Web Profile Images:", restaurantData.images);
    console.log("\n=== RESTAURANT DATA ===");
    console.log("Restaurant:", restaurantData.restaurant);
    console.log("Address:", restaurantData.address);
    console.log("Dietary Options:", restaurantData.dietaryOptions);
    console.log("Kitchen Protocols:", restaurantData.kitchenProtocols);
    console.log("Cuisine Options:", restaurantData.cuisineOptions);
    console.log("Allergens Handled:", restaurantData.allergensHandled);
    console.log("Hours:", restaurantData.hours);
    console.log("\n=== MENU DATA ===");
    console.log("Menu Categories:", restaurantData.menuCategories);
    console.log("Menu Items (with nested data):", restaurantData.menuItems);
    console.log("\n=== MENU ITEM DETAILS ===");
    restaurantData.menuItems.forEach((item, index) => {
      console.log(`\nMenu Item ${index + 1}: ${item.name}`);
      console.log("  - Allergen Modifications:", item.allergen_modifications);
      console.log("  - Allergens:", item.allergens);
      console.log("  - Dietary Options:", item.dietary_options);
      console.log("  - Images:", item.images);
      console.log("  - Modification Notes:", item.modification_notes);
      console.log("  - Preparation Methods:", item.preparation_methods);
      console.log("  - Protocol Overrides:", item.protocol_overrides);
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
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Restaurant Profile</h1>
              <p className="text-xl text-gray-600">
                Slug: <span className="font-mono font-semibold">{slug}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
