"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { COLORS } from "@/constants/colors";

interface ExpandableInfoCardProps {
  icon: string;
  title: string;
  description: string;
  backgroundColor: string;
  children?: React.ReactNode;
}

export default function ExpandableInfoCard({
  icon,
  title,
  description,
  backgroundColor,
  children,
}: ExpandableInfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="w-full mb-4 rounded-2xl transition-all duration-300"
      style={{ backgroundColor }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-2 flex items-center gap-4 hover:opacity-90 min-h-[120px]"
      >
        {/* Icon */}
        <div className="flex-shrink-0 -ml-8 h-[110px]">
          <Image
            src={icon}
            alt={title}
            width={100}
            height={100}
            className="object-contain w-auto h-full"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-left">
          <h3
            className="text-lg font-merriweather font-regular mb-1"
            style={{ color: COLORS.WHITE }}
          >
            {title}
          </h3>
          <p
            className="text-xs font-merriweather font-light"
            style={{ color: COLORS.WHITE }}
          >
            {description}
          </p>
        </div>

        {/* Chevron Icon */}
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp size={28} color={COLORS.WHITE} />
          ) : (
            <ChevronDown size={28} color={COLORS.WHITE} />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          {children || (
            <p
              className="text-sm font-merriweather"
              style={{ color: COLORS.WHITE }}
            >
              Content coming soon...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
