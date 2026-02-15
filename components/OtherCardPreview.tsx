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
        className="w-full h-[120px] rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex items-center gap-4 px-6 py-2 overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Icon */}
        <div className="flex-shrink-0 -ml-16 h-[110px]">
          <Image
            src={cardIcons[cardType]}
            alt={cardTitles[cardType]}
            width={110}
            height={110}
            quality={100}
            unoptimized={true}
            className="object-contain w-auto h-full"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-left pr-4">
          <h3
            className="text-base font-merriweather font-regular"
            style={{ color: COLORS.WHITE }}
          >
            {cardTitles[cardType]}
          </h3>
          <p
            className="text-xs font-lato mt-1 font-regular"
            style={{ color: COLORS.WHITE, opacity: 0.9 }}
          >
            {cardDescriptions[cardType]}
          </p>
        </div>
      </div>
    </Link>
  );
}
