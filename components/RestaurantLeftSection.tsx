import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import { formatPhoneNumber, formatStateCode } from "@/utils/formatters";
import DownloadDineSection from "./DownloadDineSection";
import { Database } from "@/lib/supabase/types";
import { Star } from "lucide-react";

type Restaurant = Database["restaurant"]["Tables"]["restaurants"]["Row"];
type RestaurantAddress =
  Database["restaurant"]["Tables"]["restaurant_addresses"]["Row"];
type RestaurantCuisineOption =
  Database["restaurant"]["Tables"]["restaurant_cuisine_options"]["Row"];
type RestaurantDietaryOption =
  Database["restaurant"]["Tables"]["restaurant_dietary_options"]["Row"];

interface RestaurantLeftSectionProps {
  restaurant: Restaurant;
  address: RestaurantAddress | null;
  cuisineOptions: RestaurantCuisineOption[];
  dietaryOptions: RestaurantDietaryOption[];
}

export default function RestaurantLeftSection({
  restaurant,
  address,
  cuisineOptions,
  dietaryOptions,
}: RestaurantLeftSectionProps) {
  // Format location string
  const locationString =
    address && address.city && address.state
      ? `${address.city}, ${formatStateCode(address.state)}`
      : "Location not available";

  // Filter out deleted cuisines and dietary options
  const activeCuisines = cuisineOptions.filter((c) => !c.is_deleted);
  const activeDietaryOptions = dietaryOptions.filter((d) => !d.is_deleted);

  // Format restaurant type for display
  const formatRestaurantType = (type: string | null) => {
    if (!type) return null;
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex flex-col items-start justify-between w-full md:w-[25%] overflow-y-visible md:overflow-y-auto h-auto md:h-[86vh]">
      {/* Top Section Group */}
      <div className="flex flex-col w-full items-center md:items-start">
        {/* Restaurant Name */}
        <h2
          className="text-3xl font-merriweather font-bold mb-4 text-center md:text-left"
          style={{ color: COLORS.BLACK }}
        >
          {restaurant.name}
        </h2>

        {/* Star Rating Section */}
        <div className="flex items-center gap-2 mb-4">
          {/* Stars */}
          <div className="flex items-center gap-1">
            {/* 4 filled stars */}
            {Array.from({ length: 4 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={COLORS.STAR_RATING}
                color={COLORS.STAR_RATING}
              />
            ))}
            {/* 80% filled star */}
            <div style={{ position: "relative", display: "inline-block" }}>
              <Star size={20} fill="none" color={COLORS.STAR_RATING} />
              <Star
                size={20}
                fill={COLORS.STAR_RATING}
                color={COLORS.STAR_RATING}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  clipPath: "inset(0 20% 0 0)",
                }}
              />
            </div>
          </div>
          {/* Review count */}
          <span
            className="text-sm font-lato"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            (127)
          </span>
        </div>

        {/* Badges Section */}
        {(activeDietaryOptions.length > 0 ||
          restaurant.allergy_accommodation === "yes" ||
          restaurant.allergy_accommodation === "yes_certified" ||
          activeCuisines.length > 0) && (
          <div className="w-full flex flex-wrap gap-2 mb-3">
            {/* Dietary Options Badges */}
            {activeDietaryOptions.map((dietary) => (
              <div
                key={dietary.dietary_id}
                className="px-3 py-2 rounded-full flex items-center gap-2"
                style={{ backgroundColor: "#3B82F6" }}
              >
                <span
                  className="text-sm font-lato"
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
                className="px-3 py-2 rounded-full flex items-center gap-2"
                style={{ backgroundColor: "#2AAC7E" }}
              >
                <Twemoji hex="2705" size={16} alt="checkmark emoji" />
                <span
                  className="text-sm font-lato"
                  style={{ color: "#FFFFFF" }}
                >
                  Accommodates Allergies
                </span>
              </div>
            )}

            {/* Restaurant Type Badge */}
            {restaurant.restaurant_type && (
              <div
                className="px-3 py-2 rounded-full flex items-center gap-2"
                style={{ backgroundColor: "#8B5CF6" }}
              >
                <span
                  className="text-sm font-lato"
                  style={{ color: "#FFFFFF" }}
                >
                  {formatRestaurantType(restaurant.restaurant_type)}
                </span>
              </div>
            )}

            {/* Cuisine Badges */}
            {activeCuisines.map((cuisine) => (
              <div
                key={cuisine.cuisine_id}
                className="px-3 py-2 rounded-full flex items-center gap-2"
                style={{ backgroundColor: "#171717" }}
              >
                <Twemoji hex={cuisine.twemoji} size={16} alt="flag emoji" />
                <span
                  className="text-sm font-lato"
                  style={{ color: "#FFFFFF" }}
                >
                  {cuisine.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* About Us Section */}
        {restaurant.about && (
          <div
            className="w-full mt-3 p-4 rounded-lg flex items-start gap-3"
            style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
          >
            <Twemoji hex="1f4c4" size={20} alt="document emoji" />
            <div className="flex-1">
              <p
                className="text-sm font-lato leading-relaxed"
                style={{ color: COLORS.BLACK }}
              >
                {restaurant.about}
              </p>
            </div>
          </div>
        )}

        {/* Location Section */}
        <div
          className="w-full mt-3 p-3 rounded-lg flex items-center gap-3"
          style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
        >
          <Twemoji hex="1f4cd" size={20} alt="pin emoji" />
          <p
            className="text-sm font-lato"
            style={{ color: COLORS.BLACK }}
          >
            {locationString}
          </p>
        </div>

        {/* Phone Section */}
        {restaurant.phone && (
          <div
            className="w-full mt-3 p-3 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
          >
            <Twemoji hex="1f4de" size={20} alt="phone emoji" />
            <p
              className="text-sm font-lato"
              style={{ color: COLORS.BLACK }}
            >
              {formatPhoneNumber(restaurant.phone)}
            </p>
          </div>
        )}

        {/* Website Section */}
        {restaurant.website && (
          <div
            className="w-full mt-3 p-3 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
          >
            <Twemoji hex="1f310" size={20} alt="globe emoji" />
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-lato hover:underline"
              style={{ color: COLORS.BLACK }}
            >
              {restaurant.website}
            </a>
          </div>
        )}
      </div>

      {/* Download Dine Section */}
      <DownloadDineSection />
    </div>
  );
}
