import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import type { TrustedRestaurant } from "@/lib/supabase/web_profiles/get_initial_profile_data";
import TrustedRestaurantCardCarousel from "./TrustedRestaurantCardCarousel";
import Link from "next/link";

interface TrustedRestaurantCardProps {
  trustedRestaurant: TrustedRestaurant;
}

export default function TrustedRestaurantCard({
  trustedRestaurant,
}: TrustedRestaurantCardProps) {
  const { restaurant, addresses, cuisineOptions, dietaryOptions, allergensHandled, reviews, images, slug } = trustedRestaurant;

  // Get the first active address
  const primaryAddress = addresses.find((addr) => !addr.is_deleted);

  // Calculate average overall rating
  const calculateAverageRating = () => {
    const ratingsWithValues = reviews.filter((review) => review.overall_rating !== null);
    if (ratingsWithValues.length === 0) return null;

    const sum = ratingsWithValues.reduce((acc, review) => acc + (review.overall_rating || 0), 0);
    return (sum / ratingsWithValues.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();
  const reviewCount = reviews.length;

  // Format restaurant type for display
  const formatRestaurantType = (type: string | null) => {
    if (!type) return "";
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get active cuisine options and dietary options
  const activeCuisines = cuisineOptions.filter((c) => !c.is_deleted).slice(0, 3);
  const activeDietaryOptions = dietaryOptions.filter((d) => !d.is_deleted);

  // Get active allergens handled
  const activeAllergensHandled = allergensHandled.filter((a) => !a.is_deleted);

  // Shared card styling and classes
  const cardClassName = "flex flex-col rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md mb-3";
  const cardStyle = {
    backgroundColor: COLORS.WHITE,
    border: `1px solid ${COLORS.PAGE_BACKGROUND}`
  };

  // Card content JSX
  const cardContent = (
    <>
      {/* Image Carousel */}
      <TrustedRestaurantCardCarousel images={images} />

      {/* Content Section */}
      <div className="p-4">
        {/* Restaurant Name and Type */}
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <h4
            className="text-base font-merriweather font-bold"
            style={{ color: COLORS.BLACK }}
          >
            {restaurant.name}
          </h4>
          {/* Average Rating */}
          {averageRating && (
            <div className="flex items-center gap-1">
              <span
                className="text-sm font-lato font-semibold"
                style={{ color: COLORS.BLACK }}
              >
                {averageRating}
              </span>
              <Twemoji hex="2b50" size={16} />
              <span
                className="text-xs font-lato"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                ({reviewCount})
              </span>
            </div>
          )}
        </div>
        {restaurant.restaurant_type && (
          <p
            className="text-xs font-lato mt-1"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            {formatRestaurantType(restaurant.restaurant_type)}
          </p>
        )}
      </div>

      {/* Address */}
      {primaryAddress && (
        <div className="mb-2">
          <p
            className="text-sm font-lato"
            style={{ color: COLORS.BLACK }}
          >
            {primaryAddress.city}, {primaryAddress.state}
          </p>
        </div>
      )}

      {/* Badges Section: Dietary Options, Allergy Accommodation, and Cuisine Options */}
      {(activeDietaryOptions.length > 0 ||
        restaurant.allergy_accommodation === "yes" ||
        restaurant.allergy_accommodation === "yes_certified" ||
        activeCuisines.length > 0) && (
        <div className="flex gap-2 mb-2 flex-wrap">
          {/* Dietary Options Badges */}
          {activeDietaryOptions.map((dietary) => (
            <div
              key={dietary.dietary_id}
              className="px-3 py-1 rounded-full flex items-center gap-2"
              style={{ backgroundColor: "#3B82F6" }}
            >
              <span
                className="text-xs font-lato"
                style={{ color: "#FFFFFF" }}
              >
                {dietary.label}
              </span>
            </div>
          ))}

          {/* Allergy Accommodation Badge */}
          {(restaurant.allergy_accommodation === "yes" ||
            restaurant.allergy_accommodation === "yes_certified") && (
            <div
              className="px-3 py-1 rounded-full flex items-center gap-2"
              style={{ backgroundColor: "#2AAC7E" }}
            >
              <Twemoji hex="2705" size={14} alt="checkmark emoji" />
              <span
                className="text-xs font-lato"
                style={{ color: "#FFFFFF" }}
              >
                Allergy-Friendly
              </span>
            </div>
          )}

          {/* Cuisine Badges */}
          {activeCuisines.map((cuisine) => (
            <div
              key={cuisine.cuisine_id}
              className="px-3 py-1 rounded-full flex items-center gap-2"
              style={{ backgroundColor: "#171717" }}
            >
              <Twemoji hex={cuisine.twemoji} size={14} alt="flag emoji" />
              <span
                className="text-xs font-lato"
                style={{ color: "#FFFFFF" }}
              >
                {cuisine.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Allergens Handled - Display emoji icons with labels */}
      {activeAllergensHandled.length > 0 && (
        <div className="mt-6">
          <p
            className="text-sm font-lato font-semibold mb-3"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            We safely accommodate:
          </p>
          <div className="flex gap-4 flex-wrap">
            {activeAllergensHandled.map((allergen) => (
              <div
                key={allergen.allergen_id}
                className="flex flex-col items-center gap-1"
              >
                <Twemoji
                  hex={allergen.twemoji}
                  size={28}
                  alt={allergen.allergen}
                />
                <span
                  className="text-xs font-lato text-center"
                  style={{ color: COLORS.BLACK }}
                >
                  {allergen.allergen}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );

  // Render with Link wrapper if slug exists, otherwise plain div
  if (slug) {
    return (
      <Link href={`/restaurant/${slug}`} className={cardClassName} style={cardStyle}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={cardClassName} style={cardStyle}>
      {cardContent}
    </div>
  );
}
