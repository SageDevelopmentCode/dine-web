"use client";

import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import { formatTimestamp } from "@/utils/formatters";
import ReviewImageCarousel from "./ReviewImageCarousel";
import { RecentReview } from "@/lib/supabase/web_profiles/get_initial_profile_data";
import Link from "next/link";

interface RecentReviewCardProps {
  recentReview: RecentReview;
}

export default function RecentReviewCard({
  recentReview,
}: RecentReviewCardProps) {
  const { review, restaurant, images, slug } = recentReview;

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

  // Shared card styling and classes
  const cardClassName = "rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200 mb-3";
  const cardStyle = { backgroundColor: COLORS.WHITE };

  // Card content JSX
  const cardContent = (
    <>
      {/* First row: Restaurant name + overall rating + timestamp */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h4
              className="font-lato font-semibold text-base"
              style={{ color: COLORS.BLACK }}
            >
              {restaurant?.name || "Unknown Restaurant"}
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
