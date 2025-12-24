"use client";

import { useState } from "react";
import { COLORS } from "@/constants/colors";
import { getLanguageName, getLanguageFlag } from "@/constants/languages";
import { Twemoji } from "@/utils/twemoji";
import type {
  UserTravelCard,
  UserTravelLanguage,
  UserTravelPhraseWithDetails,
  TravelPhraseCategory,
} from "@/lib/supabase/types";

interface TravelCardContentProps {
  travelCard: UserTravelCard | null;
  travelLanguages: UserTravelLanguage[];
  travelPhrases: UserTravelPhraseWithDetails[];
  travelCategories: TravelPhraseCategory[];
  textColor?: string;
}

export default function TravelCardContent({
  travelCard,
  travelLanguages,
  travelPhrases,
  travelCategories,
  textColor = COLORS.WHITE,
}: TravelCardContentProps) {
  // Set first language as default, or empty string if no languages
  const [selectedLanguage, setSelectedLanguage] = useState(
    travelLanguages.length > 0 ? travelLanguages[0].language_code : ""
  );

  // Helper function to replace placeholders in phrase text
  const renderPhraseText = (phrase: UserTravelPhraseWithDetails): string => {
    let text = phrase.travel_phrase?.text || "";

    // Replace allergen placeholders
    if (phrase.allergens && phrase.allergens.length > 0) {
      const allergenNames = phrase.allergens.map((a) => a.allergen).join(", ");
      text = text.replace(/\[allergens?\]/gi, allergenNames);
    }

    // Replace emergency contact placeholders
    if (phrase.contacts && phrase.contacts.length > 0) {
      const contactInfo = phrase.contacts
        .map((c) => `${c.full_name} (${c.phone_number})`)
        .join(", ");
      text = text.replace(/\[emergency contact\]/gi, contactInfo);
    }

    return text;
  };

  // Group phrases by category
  const phrasesByCategory = travelCategories.map((category) => {
    const categoryPhrases = travelPhrases.filter(
      (phrase) => phrase.category?.category_key === category.category_key
    );
    return {
      category,
      phrases: categoryPhrases,
    };
  });

  // Filter out categories with no phrases
  const activeCategoriesWithPhrases = phrasesByCategory.filter(
    (item) => item.phrases.length > 0
  );

  if (travelLanguages.length === 0) {
    return (
      <div className="space-y-4">
        <p
          className="text-sm font-merriweather"
          style={{ color: COLORS.WHITE }}
        >
          No languages selected for travel card.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Language Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {travelLanguages.map((language) => {
          const flagHex = getLanguageFlag(language.language_code);
          return (
            <button
              key={language.id}
              onClick={() => setSelectedLanguage(language.language_code)}
              className="px-4 py-2 rounded-lg text-xs font-merriweather font-semibold transition-all flex items-center gap-2"
              style={{
                backgroundColor:
                  selectedLanguage === language.language_code
                    ? COLORS.WHITE
                    : "rgba(62, 140, 144, 0.7)",
                color:
                  selectedLanguage === language.language_code
                    ? "#3E8C90"
                    : COLORS.WHITE,
              }}
            >
              {flagHex && (
                <Twemoji
                  hex={flagHex}
                  size={16}
                  alt={`${getLanguageName(language.language_code)} flag`}
                />
              )}
              {getLanguageName(language.language_code)}
            </button>
          );
        })}
      </div>

      {/* Phrases grouped by category */}
      {activeCategoriesWithPhrases.length > 0 ? (
        <div className="space-y-4">
          {activeCategoriesWithPhrases.map(({ category, phrases }) => (
            <div key={category.id}>
              <h4
                className="text-sm font-merriweather font-semibold mb-3"
                style={{ color: textColor }}
              >
                {category.category_name}
              </h4>
              <div className="space-y-2">
                {phrases.map((phrase) => (
                  <div
                    key={phrase.id}
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "#3E8C90" }}
                  >
                    <p
                      className="text-xs font-merriweather mb-2"
                      style={{ color: COLORS.WHITE }}
                    >
                      {renderPhraseText(phrase)}
                    </p>

                    {/* Display allergens if present */}
                    {phrase.allergens && phrase.allergens.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {phrase.allergens.map((allergen) => (
                          <span
                            key={allergen.id}
                            className="px-2 py-1 rounded-full text-xs font-merriweather flex items-center gap-1"
                            style={{
                              backgroundColor: COLORS.WHITE,
                              color: "#3E8C90",
                            }}
                          >
                            <Twemoji
                              hex={allergen.twemoji}
                              size={14}
                              alt={allergen.allergen}
                            />
                            {allergen.allergen}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Display emergency contacts if present */}
                    {phrase.contacts && phrase.contacts.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {phrase.contacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="text-xs font-merriweather"
                            style={{ color: COLORS.WHITE, opacity: 0.9 }}
                          >
                            <strong>{contact.full_name}</strong> (
                            {contact.relationship}): {contact.phone_number}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          className="text-sm font-merriweather"
          style={{ color: COLORS.WHITE }}
        >
          No travel phrases available.
        </p>
      )}
    </div>
  );
}
