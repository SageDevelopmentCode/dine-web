import { COLORS } from "@/constants/colors";
import AllergenCard from "./AllergenCard";
import ProtocolCard from "./ProtocolCard";

interface RestaurantAllergen {
  allergen_id: string;
  allergen: string;
  twemoji: string;
  restaurant_id: string;
  created_at: string;
  is_deleted: boolean;
}

interface RestaurantKitchenProtocol {
  protocol_id: string;
  label: string;
  restaurant_id: string;
  created_at: string;
  is_custom: boolean;
}

interface RestaurantRightSectionProps {
  allergensHandled: RestaurantAllergen[];
  kitchenProtocols: RestaurantKitchenProtocol[];
}

export default function RestaurantRightSection({
  allergensHandled,
  kitchenProtocols,
}: RestaurantRightSectionProps) {
  return (
    <div className="flex flex-col w-full md:w-[35%] h-full overflow-y-auto pb-20 md:pb-0">
      <h2
        className="text-xl font-merriweather font-bold mb-4"
        style={{ color: COLORS.BLACK }}
      >
        We safely accommodate:
      </h2>

      {allergensHandled.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {allergensHandled.map((allergen) => (
            <AllergenCard
              key={allergen.allergen_id}
              emojiHex={allergen.twemoji}
              label={allergen.allergen}
            />
          ))}
        </div>
      ) : (
        <div
          className="w-full p-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
        >
          <p
            className="text-lg font-merriweather"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            No allergen information available
          </p>
        </div>
      )}

      <h2
        className="text-xl font-merriweather font-bold mb-4 mt-8"
        style={{ color: COLORS.BLACK }}
      >
        Our Safety Protocols:
      </h2>

      {kitchenProtocols.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {kitchenProtocols.map((protocol) => (
            <ProtocolCard key={protocol.protocol_id} label={protocol.label} />
          ))}
        </div>
      ) : (
        <div
          className="w-full p-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
        >
          <p
            className="text-lg font-merriweather"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            No safety protocol information available
          </p>
        </div>
      )}
    </div>
  );
}
