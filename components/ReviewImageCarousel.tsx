"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { COLORS } from "@/constants/colors";

interface ReviewImage {
  id: string;
  image_url: string;
  sort_order: number | null;
  created_at: string;
  restaurant_review_id?: string;
  restaurant_menu_item_review_id?: string;
  user_id: string;
  updated_at: string | null;
}

interface ReviewImageCarouselProps {
  images: ReviewImage[];
}

export default function ReviewImageCarousel({
  images,
}: ReviewImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Show placeholder if no images
  if (!images || images.length === 0) {
    return null; // Don't show anything if there are no images
  }

  // Sort images by sort_order (nulls last)
  const sortedImages = [...images].sort((a, b) => {
    if (a.sort_order === null && b.sort_order === null) return 0;
    if (a.sort_order === null) return 1;
    if (b.sort_order === null) return -1;
    return a.sort_order - b.sort_order;
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30,
    },
    [
      Autoplay({
        delay: 5500,
        stopOnInteraction: false,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full relative p-3">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {sortedImages.map((image) => (
            <div
              key={image.id}
              className="flex-[0_0_100%] min-w-0 relative"
              style={{ height: "200px" }}
            >
              <Image
                src={image.image_url}
                alt="Review image"
                fill
                className="object-cover"
                priority={image.sort_order === 0}
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Dots Indicator - Only show if multiple images */}
      {sortedImages.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
          {sortedImages.map((_, index) => (
            <div
              key={index}
              className="rounded-full transition-opacity"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#FFFFFF",
                opacity: index === selectedIndex ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
