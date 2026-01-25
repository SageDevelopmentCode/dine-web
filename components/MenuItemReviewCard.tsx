"use client";

import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import { formatTimestamp } from "@/utils/formatters";
import ReviewImageCarousel from "./ReviewImageCarousel";
import { MenuItemReviewWithDetails } from "@/lib/supabase/restaurant_profiles/get_restaurant_profile_data";

interface MenuItemReviewCardProps {
  menuItemReview: MenuItemReviewWithDetails;
}

export default function MenuItemReviewCard({
  menuItemReview,
}: MenuItemReviewCardProps) {
  const { review, user, menuItem, images } = menuItemReview;

  // Render star rating from a numeric value
  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Twemoji key={i} hex="2b50" size={16} className="inline-block" />
      );
    }
    return <span className="inline-flex gap-0.5">{stars}</span>;
  };

  // Rating categories with labels for menu item reviews
  const ratingCategories = [
    {
      key: "quality_rating",
      label: "Quality",
      value: review.quality_rating,
    },
    {
      key: "presentation_rating",
      label: "Presentation",
      value: review.presentation_rating,
    },
    {
      key: "food_allergies_accommodation_rating",
      label: "Allergy Accommodation",
      value: review.food_allergies_accommodation_rating,
    },
    { key: "safety_rating", label: "Safety", value: review.safety_rating },
    {
      key: "order_again_rating",
      label: "Order Again",
      value: review.order_again_rating,
    },
  ];

  // Filter out null ratings
  const activeRatings = ratingCategories.filter((cat) => cat.value !== null);

  // Shared card styling and classes
  const cardClassName =
    "rounded-lg overflow-hidden mb-3";
  const cardStyle = { backgroundColor: COLORS.WHITE };

  // User display name
  const userName = `${user.first_name} ${user.last_name}`;

  return (
    <div className={cardClassName} style={cardStyle}>
      {/* First row: Menu item name with icon indicator + overall rating + timestamp */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {/* Plate/utensils icon to indicate menu item review */}
            <Twemoji hex="1f37d" size={18} className="inline-block" />
            <h4
              className="font-lato font-semibold text-base"
              style={{ color: COLORS.BLACK }}
            >
              {menuItem.name}
            </h4>
            {review.overall_rating && (
              <div className="flex items-center gap-1">
                {renderStars(review.overall_rating)}
              </div>
            )}
          </div>
          <span
            className="text-sm font-lato"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            {formatTimestamp(review.created_at, review.updated_at)}
          </span>
        </div>
        {/* User name */}
        <div className="mt-1">
          <span
            className="text-sm font-lato"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            by {userName}
          </span>
        </div>
      </div>

      {/* Second row: Individual ratings with light background */}
      {activeRatings.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {activeRatings.map((rating) => (
              <div
                key={rating.key}
                className="px-3 py-1.5 rounded-md flex items-center gap-1.5"
                style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
              >
                <span
                  className="text-sm font-lato"
                  style={{ color: COLORS.BLACK }}
                >
                  {rating.label}:
                </span>
                <span
                  className="text-sm font-lato font-semibold"
                  style={{ color: COLORS.BLACK }}
                >
                  {rating.value}
                </span>
                <Twemoji hex="2b50" size={14} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review description text */}
      {review.review_description && (
        <div className="px-4 pb-3">
          <p
            className="text-sm font-lato leading-relaxed whitespace-pre-wrap"
            style={{ color: COLORS.BLACK }}
          >
            {review.review_description}
          </p>
        </div>
      )}

      {/* Review images carousel at bottom with padding */}
      {images && images.length > 0 && (
        <ReviewImageCarousel images={images} />
      )}
    </div>
  );
}
