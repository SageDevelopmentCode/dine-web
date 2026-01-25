"use client";

import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import { formatTimestamp } from "@/utils/formatters";
import ReviewImageCarousel from "./ReviewImageCarousel";
import MenuItemReviewCard from "./MenuItemReviewCard";
import {
  RestaurantReviewWithDetails,
  MenuItemReviewWithDetails,
} from "@/lib/supabase/restaurant_profiles/get_restaurant_profile_data";

interface RestaurantReviewsSectionProps {
  restaurantReviews: RestaurantReviewWithDetails[];
  menuItemReviews: MenuItemReviewWithDetails[];
}

export default function RestaurantReviewsSection({
  restaurantReviews,
  menuItemReviews,
}: RestaurantReviewsSectionProps) {
  // Show nothing if there are no reviews at all
  if (restaurantReviews.length === 0 && menuItemReviews.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      {/* Restaurant Reviews Subsection */}
      {restaurantReviews.length > 0 && (
        <div className="mb-8">
          <h3
            className="text-lg font-merriweather font-bold mb-4"
            style={{ color: COLORS.BLACK }}
          >
            Restaurant Reviews
          </h3>
          <div className="flex flex-col">
            {restaurantReviews.map((restaurantReview) => {
              const { review, user, images } = restaurantReview;

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

              // Rating categories with labels
              const ratingCategories = [
                {
                  key: "atmosphere_rating",
                  label: "Atmosphere",
                  value: review.atmosphere_rating,
                },
                { key: "service_rating", label: "Service", value: review.service_rating },
                {
                  key: "food_quality_rating",
                  label: "Food Quality",
                  value: review.food_quality_rating,
                },
                {
                  key: "food_allergies_accomodation_rating",
                  label: "Allergy Accommodation",
                  value: review.food_allergies_accomodation_rating,
                },
                { key: "safe_rating", label: "Safety", value: review.safe_rating },
              ];

              // Filter out null ratings
              const activeRatings = ratingCategories.filter((cat) => cat.value !== null);

              return (
                <div key={review.id} className="rounded-lg overflow-hidden mb-3" style={{ backgroundColor: COLORS.WHITE }}>
                  {/* First row: Overall rating + timestamp */}
                  <div className="p-4 pb-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
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
                        by {user.first_name} {user.last_name}
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
            })}
          </div>
        </div>
      )}

      {/* Menu Item Reviews Subsection */}
      {menuItemReviews.length > 0 && (
        <div className="mb-6">
          <h3
            className="text-lg font-merriweather font-bold mb-4"
            style={{ color: COLORS.BLACK }}
          >
            Menu Item Reviews
          </h3>
          <div className="flex flex-col">
            {menuItemReviews.map((menuItemReview) => (
              <MenuItemReviewCard
                key={menuItemReview.review.id}
                menuItemReview={menuItemReview}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
