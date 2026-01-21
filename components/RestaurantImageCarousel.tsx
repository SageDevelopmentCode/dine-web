"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface RestaurantImage {
  id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  restaurant_id: string;
  restaurant_web_profile_id: string;
}

interface RestaurantImageCarouselProps {
  images: RestaurantImage[];
}

export default function RestaurantImageCarousel({
  images,
}: RestaurantImageCarouselProps) {
  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  // Sort images by sort_order
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);

  const [emblaRef] = useEmblaCarousel(
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

  return (
    <div className="w-full mb-4 md:mb-8">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {sortedImages.map((image) => (
            <div
              key={image.id}
              className="flex-[0_0_100%] min-w-0 relative"
              style={{ height: "350px" }}
            >
              <Image
                src={image.image_url}
                alt="Restaurant image"
                fill
                className="object-cover"
                priority={image.sort_order === 0}
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
