"use client";

import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import type {
  UserEpipenCard,
  UserEpipenInstructionWithDetails,
} from "@/lib/supabase/types";

interface EpipenCardContentProps {
  epipenCard: UserEpipenCard | null;
  epipenInstructions: UserEpipenInstructionWithDetails[];
  textColor?: string;
  variant?: "expandable" | "dedicated";
}

export default function EpipenCardContent({
  epipenCard,
  epipenInstructions,
  textColor = COLORS.WHITE,
  variant = "expandable",
}: EpipenCardContentProps) {
  // Sort and filter instructions
  const activeInstructions = epipenInstructions
    .filter((instruction) => !instruction.is_deleted)
    .sort((a, b) => a.sort_order - b.sort_order);

  // Format carries epipen status
  const getCarriesStatus = (status: string) => {
    switch (status) {
      case "yes-carry":
        return "Yes, I carry an EpiPen";
      case "yes-no-yet":
        return "Yes, but don't carry it yet";
      case "no-should-get":
        return "No, but should get one";
      case "no-dont-need":
        return "No, don't need one";
      default:
        return status;
    }
  };

  // Format brand type
  const getBrandLabel = (brand: string | null, customBrand: string | null) => {
    if (customBrand) return customBrand;
    if (!brand) return "Not specified";
    switch (brand) {
      case "epipen":
        return "EpiPen";
      case "epipen-jr":
        return "EpiPen Jr";
      case "auvi-q":
        return "Auvi-Q";
      case "generic":
        return "Generic";
      default:
        return brand;
    }
  };

  // Format location
  const getLocationLabel = (
    location: string | null,
    customLocation: string | null
  ) => {
    if (customLocation) return customLocation;
    if (!location) return "Not specified";
    switch (location) {
      case "purse":
        return "Purse/Bag";
      case "backpack":
        return "Backpack";
      case "car":
        return "Car";
      case "work":
        return "Work/Office";
      case "medicine-cabinet":
        return "Medicine Cabinet";
      case "school":
        return "School";
      default:
        return location;
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {/* Epipen Details Section */}
      {epipenCard && (
        <div className="rounded-lg p-4" style={{ backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#61ADCF" }}>
          <h4
            className="text-sm font-merriweather font-semibold mb-3"
            style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
          >
            EpiPen Details
          </h4>
          <div
            className="space-y-2 text-xs font-merriweather"
            style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
          >
            <p>
              <strong>Status:</strong>{" "}
              {getCarriesStatus(epipenCard.carries_epipen)}
            </p>
            {epipenCard.brand_type && (
              <p>
                <strong>Brand:</strong>{" "}
                {getBrandLabel(epipenCard.brand_type, epipenCard.custom_brand)}
              </p>
            )}
            {epipenCard.dosage && (
              <p>
                <strong>Dosage:</strong> {epipenCard.dosage}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Location Information Section */}
      {epipenCard &&
        (epipenCard.primary_location || epipenCard.secondary_location) && (
          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#61ADCF" }}
          >
            <h4
              className="text-sm font-merriweather font-semibold mb-3"
              style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
            >
              Location Information
            </h4>
            <div className="space-y-3">
              {epipenCard.primary_location && (
                <div
                  className="text-xs font-merriweather pb-3"
                  style={{
                    color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE,
                    borderBottom: epipenCard.secondary_location
                      ? variant === "dedicated"
                        ? `1px solid rgba(0, 0, 0, 0.1)`
                        : `1px solid rgba(255, 255, 255, 0.2)`
                      : "none",
                  }}
                >
                  <p className="font-semibold mb-1">Primary Location</p>
                  <p>
                    {getLocationLabel(
                      epipenCard.primary_location,
                      epipenCard.custom_primary_location
                    )}
                  </p>
                  {epipenCard.primary_expiration_date && (
                    <p className="opacity-90 mt-1">
                      Expires: {formatDate(epipenCard.primary_expiration_date)}
                    </p>
                  )}
                </div>
              )}

              {epipenCard.secondary_location && (
                <div
                  className="text-xs font-merriweather"
                  style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
                >
                  <p className="font-semibold mb-1">Secondary Location</p>
                  <p>
                    {getLocationLabel(
                      epipenCard.secondary_location,
                      epipenCard.custom_secondary_location
                    )}
                  </p>
                  {epipenCard.secondary_expiration_date && (
                    <p className="opacity-90 mt-1">
                      Expires:{" "}
                      {formatDate(epipenCard.secondary_expiration_date)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      {/* Instructions Section */}
      {activeInstructions.length > 0 && (
        <div>
          <h4
            className="text-sm font-merriweather font-semibold mb-2"
            style={{ color: textColor }}
          >
            How to Use EpiPen
          </h4>
          <p
            className="text-xs font-merriweather mb-3"
            style={{ color: textColor, opacity: 0.8 }}
          >
            Follow these steps in order during an emergency
          </p>

          <div className="space-y-2">
            {activeInstructions.map((instruction, index) => (
              <div
                key={instruction.id}
                className="flex items-start gap-2 text-xs font-merriweather rounded-lg p-3"
                style={{
                  backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#61ADCF",
                  color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE,
                }}
              >
                <span className="flex-shrink-0 mt-0.5">
                  <Twemoji
                    hex={instruction.icon_type === "check" ? "2705" : "274c"}
                    size={16}
                    alt={
                      instruction.icon_type === "check"
                        ? "checkmark"
                        : "cross mark"
                    }
                  />
                </span>
                <span className="flex-1">{instruction.instruction_text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
