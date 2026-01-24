"use client";

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
  // Show placeholder if no images
  if (!images || images.length === 0) {
    return (
      <div
        className="w-full rounded-t-lg flex items-center justify-center"
        style={{
          height: "300px",
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
    <div className="w-full">
      <div className="overflow-hidden rounded-t-lg" ref={emblaRef}>
        <div className="flex">
          {sortedImages.map((image) => (
            <div
              key={image.id}
              className="flex-[0_0_100%] min-w-0 relative"
              style={{ height: "300px" }}
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
    </div>
  );
}
