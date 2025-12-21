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
    <div className="w-full mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 hover:opacity-90"
        style={{ backgroundColor }}
      >
        {/* Icon */}
        <div className="flex-shrink-0">
          <Image
            src={icon}
            alt={title}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-left">
          <h3
            className="text-xl font-merriweather font-regular mb-1"
            style={{ color: COLORS.WHITE }}
          >
            {title}
          </h3>
          <p
            className="text-sm font-merriweather font-light"
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
          isExpanded ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 rounded-xl" style={{ backgroundColor: COLORS.WHITE }}>
          {children || (
            <p
              className="text-sm font-merriweather"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              Content coming soon...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
