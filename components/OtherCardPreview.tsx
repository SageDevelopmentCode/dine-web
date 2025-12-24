"use client";

import { COLORS } from "@/constants/colors";
import {
  type ValidCardType,
  cardTitles,
  cardDescriptions,
  cardIcons,
} from "@/constants/card-config";
import Image from "next/image";
import Link from "next/link";

interface OtherCardPreviewProps {
  cardType: ValidCardType;
  slug: string;
  backgroundColor: string;
}

export default function OtherCardPreview({
  cardType,
  slug,
  backgroundColor,
}: OtherCardPreviewProps) {
  return (
    <Link href={`/profile/${slug}/${cardType}`}>
      <div
        className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col items-center justify-center p-4"
        style={{ backgroundColor }}
      >
        {/* Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3 flex-shrink-0">
          <Image
            src={cardIcons[cardType]}
            alt={cardTitles[cardType]}
            width={80}
            height={80}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Title */}
        <h3
          className="text-sm sm:text-base font-merriweather font-semibold text-center mb-1"
          style={{ color: COLORS.WHITE }}
        >
          {cardTitles[cardType]}
        </h3>

        {/* Description - truncated */}
        <p
          className="text-[10px] sm:text-xs font-merriweather font-light text-center line-clamp-2"
          style={{ color: COLORS.WHITE }}
        >
          {cardDescriptions[cardType]}
        </p>
      </div>
    </Link>
  );
}
