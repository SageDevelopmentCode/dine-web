import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import type { TrustedRestaurant } from "@/lib/supabase/web_profiles/get_initial_profile_data";

interface TrustedRestaurantCardProps {
  trustedRestaurant: TrustedRestaurant;
  onClick?: () => void;
}

export default function TrustedRestaurantCard({
  trustedRestaurant,
  onClick,
}: TrustedRestaurantCardProps) {
  const { restaurant, addresses, cuisineOptions, allergensHandled, reviews } = trustedRestaurant;

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

  // Get active cuisine options
  const activeCuisines = cuisineOptions.filter((c) => !c.is_deleted).slice(0, 3);

  // Get allergy accommodation badge color
  const getAllergyAccommodationColor = (accommodation: string | null) => {
    switch (accommodation) {
      case "yes_certified":
        return COLORS.SEVERE_BORDER;
      case "yes":
        return COLORS.MODERATE_BORDER;
      case "limited":
        return COLORS.MILD_BORDER;
      default:
        return COLORS.SECONDARY_TEXT_GRAY;
    }
  };

  const getAllergyAccommodationText = (accommodation: string | null) => {
    switch (accommodation) {
      case "yes_certified":
        return "Certified Allergy-Friendly";
      case "yes":
        return "Allergy-Friendly";
      case "limited":
        return "Limited Accommodation";
      case "no":
        return "No Accommodation";
      default:
        return "";
    }
  };

  return (
    <div
      className="flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md mb-3"
      style={{
        borderColor: COLORS.DOWNLOAD_SECTION_BLUE,
        backgroundColor: COLORS.WHITE
      }}
      onClick={onClick}
    >
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

      {/* Cuisine Options */}
      {activeCuisines.length > 0 && (
        <div className="flex gap-2 mb-2 flex-wrap">
          {activeCuisines.map((cuisine) => (
            <div
              key={cuisine.cuisine_id}
              className="flex items-center gap-1 px-2 py-1 rounded"
              style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
            >
              <Twemoji hex={cuisine.twemoji} size={14} />
              <span
                className="text-xs font-lato"
                style={{ color: COLORS.BLACK }}
              >
                {cuisine.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Allergy Accommodation Badge */}
      {restaurant.allergy_accommodation && (
        <div className="mt-2">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-lato font-semibold"
            style={{
              backgroundColor: getAllergyAccommodationColor(restaurant.allergy_accommodation),
              color: COLORS.WHITE,
            }}
          >
            {getAllergyAccommodationText(restaurant.allergy_accommodation)}
          </div>
        </div>
      )}

      {/* Allergens Handled Count */}
      {allergensHandled.filter((a) => !a.is_deleted).length > 0 && (
        <div className="mt-2">
          <p
            className="text-xs font-lato"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            Handles {allergensHandled.filter((a) => !a.is_deleted).length} allergen
            {allergensHandled.filter((a) => !a.is_deleted).length === 1 ? "" : "s"}
          </p>
        </div>
      )}
    </div>
  );
}
