"use client";

import TravelCardContent from "./TravelCardContent";
import type {
  UserTravelCard,
  UserTravelLanguage,
  UserTravelPhraseWithDetails,
  TravelPhraseCategory,
} from "@/lib/supabase/types";

interface FilteredTravelCardProps {
  travelCard: UserTravelCard | null;
  travelLanguages: UserTravelLanguage[];
  travelPhrases: UserTravelPhraseWithDetails[];
  travelCategories: TravelPhraseCategory[];
  selectedSubitems: any;
  textColor: string;
  variant: "expandable" | "dedicated";
}

/**
 * Filter travel card data based on selected subitems
 * Expected structure of selectedSubitems:
 * {
 *   languages: string[],  // array of language IDs
 *   phrases: string[]     // array of phrase IDs
 * }
 */
export default function FilteredTravelCard({
  travelCard,
  travelLanguages,
  travelPhrases,
  travelCategories,
  selectedSubitems,
  textColor,
  variant,
}: FilteredTravelCardProps) {
  let filteredLanguages = travelLanguages;
  let filteredPhrases = travelPhrases;

  // Apply filtering if selectedSubitems is provided
  if (selectedSubitems && typeof selectedSubitems === 'object') {
    if (Array.isArray(selectedSubitems.languages) && selectedSubitems.languages.length > 0) {
      filteredLanguages = travelLanguages.filter(language =>
        selectedSubitems.languages.includes(language.id)
      );
    }

    if (Array.isArray(selectedSubitems.phrases) && selectedSubitems.phrases.length > 0) {
      filteredPhrases = travelPhrases.filter(phrase =>
        selectedSubitems.phrases.includes(phrase.id)
      );
    }
  }

  return (
    <TravelCardContent
      travelCard={travelCard}
      travelLanguages={filteredLanguages}
      travelPhrases={filteredPhrases}
      travelCategories={travelCategories}
      textColor={textColor}
      variant={variant}
    />
  );
}
