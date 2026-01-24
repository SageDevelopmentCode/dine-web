"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { COLORS } from "@/constants/colors";

interface RestaurantImage {
  id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  restaurant_id: string;
  restaurant_web_profile_id: string;
}

interface TrustedRestaurantCardCarouselProps {
  images: RestaurantImage[];
}

export default function TrustedRestaurantCardCarousel({
  images,
}: TrustedRestaurantCardCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Show placeholder if no images
  if (!images || images.length === 0) {
    return (
      <div
        className="w-full rounded-t-lg flex items-center justify-center"
        style={{
          height: "225px",
          backgroundColor: COLORS.PAGE_BACKGROUND
        }}
      >
        <span
          className="text-sm font-lato"
          style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
        >
          No images available
        </span>
      </div>
    );
  }

  // Sort images by sort_order
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);

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
    <div className="w-full relative">
      <div className="overflow-hidden rounded-t-lg" ref={emblaRef}>
        <div className="flex">
          {sortedImages.map((image) => (
            <div
              key={image.id}
              className="flex-[0_0_100%] min-w-0 relative"
              style={{ height: "225px" }}
            >
              <Image
                src={image.image_url}
                alt="Restaurant image"
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
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
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
