import { COLORS } from "@/constants/colors";
import MenuItemCard from "./MenuItemCard";

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

interface MenuSectionProps {
  menuCategories: RestaurantMenuCategory[];
  menuItems: RestaurantMenuItem[];
}

export default function MenuSection({
  menuCategories,
  menuItems,
}: MenuSectionProps) {
  // Filter active categories and sort by sort_order
  const activeCategories = menuCategories
    .filter((cat) => cat.is_active !== false && cat.is_deleted !== true)
    .sort((a, b) => a.sort_order - b.sort_order);

  // Filter active menu items
  const activeMenuItems = menuItems.filter(
    (item) => item.is_active !== false && item.is_deleted !== true
  );

  // Group menu items by category
  const itemsByCategory = activeCategories.map((category) => ({
    category,
    items: activeMenuItems
      .filter((item) => item.category_id === category.id)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));

  // Don't render section if no menu items
  if (activeMenuItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2
        className="text-xl font-merriweather font-bold mb-6"
        style={{ color: COLORS.BLACK }}
      >
        Our Menu:
      </h2>

      {itemsByCategory.map(({ category, items }) => {
        // Skip empty categories
        if (items.length === 0) return null;

        return (
          <div key={category.id} className="mb-8">
            {/* Category Name as Subheading */}
            <h3
              className="text-lg font-merriweather font-semibold mb-4"
              style={{ color: COLORS.BLACK }}
            >
              {category.name}
            </h3>

            {/* Menu Items Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  name={item.name}
                  images={item.images}
                  allergens={item.allergens}
                  dietaryOptions={item.dietary_options}
                  preparationMethods={item.preparation_methods}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
