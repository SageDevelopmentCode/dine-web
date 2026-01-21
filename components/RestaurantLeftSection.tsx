import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import { formatPhoneNumber, formatStateCode } from "@/utils/formatters";
import DownloadDineSection from "./DownloadDineSection";
import { Database } from "@/lib/supabase/types";

type Restaurant = Database["restaurant"]["Tables"]["restaurants"]["Row"];
type RestaurantAddress =
  Database["restaurant"]["Tables"]["restaurant_addresses"]["Row"];

interface RestaurantLeftSectionProps {
  restaurant: Restaurant;
  address: RestaurantAddress | null;
}

export default function RestaurantLeftSection({
  restaurant,
  address,
}: RestaurantLeftSectionProps) {
  // Format location string
  const locationString =
    address && address.city && address.state
      ? `${address.city}, ${formatStateCode(address.state)}`
      : "Location not available";

  return (
    <div className="flex flex-col items-start justify-between w-full md:w-[25%] overflow-y-visible md:overflow-y-auto h-auto md:h-[86vh]">
      {/* Top Section Group */}
      <div className="flex flex-col w-full items-center md:items-start">
        {/* Restaurant Name */}
        <h2
          className="text-2xl font-merriweather font-bold mb-4 text-center md:text-left"
          style={{ color: COLORS.BLACK }}
        >
          {restaurant.name}
        </h2>

        {/* Location Section */}
        <div
          className="w-full mt-3 p-3 rounded-lg flex items-center gap-3"
          style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
        >
          <Twemoji hex="1f4cd" size={20} alt="pin emoji" />
          <p
            className="text-sm font-merriweather"
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
              className="text-sm font-merriweather"
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
              className="text-sm font-merriweather hover:underline"
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
