import { COLORS } from "@/constants/colors";
import { getAllergenEmoji } from "@/constants/allergens";
import Image from "next/image";

interface MenuItemImage {
  id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string | null;
  menu_item_id: string;
}

interface MenuItemAllergen {
  allergen_id: string;
  is_cross_contamination: boolean | null;
  menu_item_id: string;
}

interface MenuItemDietaryOption {
  dietary_option: string;
  menu_item_id: string;
}

interface MenuItemPreparationMethod {
  method: string;
  menu_item_id: string;
}

interface MenuItemCardProps {
  name: string;
  images: MenuItemImage[];
  allergens: MenuItemAllergen[];
  dietaryOptions: MenuItemDietaryOption[];
  preparationMethods: MenuItemPreparationMethod[];
}

const BADGE_COLORS = {
  dietary: "#3B82F6", // Blue
  preparation: "#8B5CF6", // Purple
};

export default function MenuItemCard({
  name,
  images,
  allergens,
  dietaryOptions,
  preparationMethods,
}: MenuItemCardProps) {
  // Get the first image sorted by sort_order
  const firstImage = images.sort((a, b) => a.sort_order - b.sort_order)[0];

  // Get allergen emojis
  const allergenEmojis = allergens
    .map((a) => getAllergenEmoji(a.allergen_id))
    .filter((emoji): emoji is string => emoji !== undefined);

  const displayedAllergens = allergenEmojis.slice(0, 2);
  const remainingAllergens = allergenEmojis.length - 2;

  return (
    <div className="flex flex-col gap-2" style={{ width: "220px" }}>
      {/* Image */}
      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          width: "220px",
          height: "220px",
          backgroundColor: COLORS.HEADER_BACKGROUND,
        }}
      >
        {firstImage ? (
          <Image
            src={firstImage.image_url}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke={COLORS.SECONDARY_TEXT_GRAY}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        )}
      </div>

      {/* Menu Item Name and Allergens Row */}
      <div className="flex items-start justify-between gap-2">
        <div
          className="text-sm font-merriweather font-semibold line-clamp-2 flex-1"
          style={{ color: COLORS.BLACK }}
        >
          {name}
        </div>
        {allergenEmojis.length > 0 && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {displayedAllergens.map((emojiHex, index) => (
              <img
                key={index}
                src={`https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${emojiHex}.svg`}
                alt="allergen"
                className="w-5 h-5"
              />
            ))}
            {remainingAllergens > 0 && (
              <span
                className="text-xs font-merriweather"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                +{remainingAllergens}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Dietary Options Badges */}
      {dietaryOptions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {dietaryOptions.slice(0, 3).map((option, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full text-xs font-merriweather"
              style={{
                backgroundColor: BADGE_COLORS.dietary,
                color: COLORS.WHITE,
              }}
            >
              {option.dietary_option}
            </span>
          ))}
          {dietaryOptions.length > 3 && (
            <span
              className="px-2 py-1 rounded-full text-xs font-merriweather"
              style={{
                backgroundColor: COLORS.SECONDARY_TEXT_GRAY,
                color: COLORS.WHITE,
              }}
            >
              +{dietaryOptions.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Preparation Methods Badges */}
      {preparationMethods.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {preparationMethods.slice(0, 3).map((method, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full text-xs font-merriweather"
              style={{
                backgroundColor: BADGE_COLORS.preparation,
                color: COLORS.WHITE,
              }}
            >
              {method.method}
            </span>
          ))}
          {preparationMethods.length > 3 && (
            <span
              className="px-2 py-1 rounded-full text-xs font-merriweather"
              style={{
                backgroundColor: COLORS.SECONDARY_TEXT_GRAY,
                color: COLORS.WHITE,
              }}
            >
              +{preparationMethods.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
