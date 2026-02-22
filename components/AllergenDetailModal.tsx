"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import type { Database } from "@/lib/supabase/types";

type UserAllergen = Database['allergies']['Tables']['user_allergens']['Row'];
type Severity = "severe" | "moderate" | "mild";

interface AllergenDetailModalProps {
  allergen: UserAllergen | null;
  isOpen: boolean;
  onClose: () => void;
}

const severityColors: Record<Severity, string> = {
  severe: COLORS.SEVERE_BORDER,
  moderate: COLORS.MODERATE_BORDER,
  mild: COLORS.MILD_BORDER,
};

const severityLabels: Record<Severity, string> = {
  severe: "Severe",
  moderate: "Moderate",
  mild: "Mild",
};

export default function AllergenDetailModal({
  allergen,
  isOpen,
  onClose,
}: AllergenDetailModalProps) {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !allergen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeIn 0.2s ease-out" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} style={{ color: COLORS.SECONDARY_TEXT_GRAY }} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          {/* Emoji */}
          <div className="mb-6">
            <Twemoji hex={allergen.twemoji} size={80} />
          </div>

          {/* Allergen Name */}
          <h2
            className="text-2xl font-merriweather font-semibold mb-4"
            style={{ color: COLORS.BLACK }}
          >
            {allergen.allergen}
          </h2>

          {/* Severity Badge */}
          <div
            className="px-6 py-2 rounded-full border-3 inline-block"
            style={{ borderColor: severityColors[allergen.severity] }}
          >
            <span
              className="text-sm font-merriweather font-medium"
              style={{ color: severityColors[allergen.severity] }}
            >
              {severityLabels[allergen.severity]} Allergy
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
