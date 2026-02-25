"use client";

import { useState } from "react";
import { COLORS } from "@/constants/colors";
import AllergenCard from "./AllergenCard";
import ProtocolCard from "./ProtocolCard";
import MenuSection from "./MenuSection";
import RestaurantReviewsSection from "./RestaurantReviewsSection";
import {
  RestaurantReviewWithDetails,
  MenuItemReviewWithDetails,
} from "@/lib/supabase/restaurant_profiles/get_restaurant_profile_data";

interface Restaurant {
  id: string;
  name: string;
  menu_url: string | null;
  [key: string]: unknown;
}

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

interface RestaurantMenuCategory {
  id: string;
  restaurant_id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean | null;
  is_deleted: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

interface RestaurantMenuItemImage {
  id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string | null;
  menu_item_id: string;
}

interface RestaurantMenuItemAllergen {
  allergen_id: string;
  is_cross_contamination: boolean | null;
  menu_item_id: string;
}

interface RestaurantMenuItemDietaryOption {
  dietary_option: string;
  menu_item_id: string;
}

interface RestaurantMenuItemPreparationMethod {
  method: string;
  menu_item_id: string;
}

interface RestaurantMenuItemAllergenModification {
  allergen_id: string;
  can_be_removed: boolean | null;
  can_be_substituted: boolean | null;
  substitute_food: string | null;
  menu_item_id: string;
}

interface RestaurantMenuItemModificationNote {
  id: string;
  heading: string;
  description: string;
  linked_allergen_ids: string[] | null;
  created_at: string;
  menu_item_id: string;
}

interface RestaurantMenuItemProtocolOverride {
  protocol_id: string;
  menu_item_id: string;
}

interface RestaurantMenuItem {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number | null;
  is_active: boolean | null;
  is_deleted: boolean | null;
  created_at: string;
  updated_at: string;
  allergen_modifications: RestaurantMenuItemAllergenModification[];
  allergens: RestaurantMenuItemAllergen[];
  dietary_options: RestaurantMenuItemDietaryOption[];
  images: RestaurantMenuItemImage[];
  modification_notes: RestaurantMenuItemModificationNote[];
  preparation_methods: RestaurantMenuItemPreparationMethod[];
  protocol_overrides: RestaurantMenuItemProtocolOverride[];
}

interface RestaurantRightSectionProps {
  restaurant: Restaurant;
  allergensHandled: RestaurantAllergen[];
  kitchenProtocols: RestaurantKitchenProtocol[];
  menuCategories: RestaurantMenuCategory[];
  menuItems: RestaurantMenuItem[];
  restaurantReviews: RestaurantReviewWithDetails[];
  menuItemReviews: MenuItemReviewWithDetails[];
}

export default function RestaurantRightSection({
  restaurant,
  allergensHandled,
  kitchenProtocols,
  menuCategories,
  menuItems,
  restaurantReviews,
  menuItemReviews,
}: RestaurantRightSectionProps) {
  const [showAllProtocols, setShowAllProtocols] = useState(false);

  const displayedProtocols = showAllProtocols
    ? kitchenProtocols
    : kitchenProtocols.slice(0, 5);

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
            className="text-lg font-lato"
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
        <>
          <div className="flex flex-wrap gap-3">
            {displayedProtocols.map((protocol) => (
              <ProtocolCard key={protocol.protocol_id} label={protocol.label} />
            ))}
          </div>
          {kitchenProtocols.length > 5 && (
            <button
              onClick={() => setShowAllProtocols(!showAllProtocols)}
              className="mt-3 px-4 py-2 rounded-lg text-sm font-lato font-bold transition-opacity hover:opacity-80 cursor-pointer"
              style={{
                backgroundColor: COLORS.BLACK,
                color: COLORS.WHITE,
              }}
            >
              {showAllProtocols
                ? "Show Less"
                : `View All (${kitchenProtocols.length})`}
            </button>
          )}
        </>
      ) : (
        <div
          className="w-full p-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
        >
          <p
            className="text-lg font-lato"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            No safety protocol information available
          </p>
        </div>
      )}

      <MenuSection
        menuCategories={menuCategories}
        menuItems={menuItems}
        menuUrl={restaurant.menu_url}
      />

      <RestaurantReviewsSection
        restaurantReviews={restaurantReviews}
        menuItemReviews={menuItemReviews}
      />
    </div>
  );
}
