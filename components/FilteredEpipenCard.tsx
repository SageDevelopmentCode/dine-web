"use client";

import EpipenCardContent from "./EpipenCardContent";
import type {
  UserEpipenCard,
  UserEpipenInstructionWithDetails,
} from "@/lib/supabase/types";

interface FilteredEpipenCardProps {
  card: UserEpipenCard | null;
  instructions: UserEpipenInstructionWithDetails[];
  selectedSubitems: any;
  textColor: string;
  variant: "expandable" | "dedicated";
}

/**
 * Filter epipen card data based on selected subitems
 * Expected structure of selectedSubitems:
 * {
 *   instructions: string[] // array of instruction IDs
 * }
 */
export default function FilteredEpipenCard({
  card,
  instructions,
  selectedSubitems,
  textColor,
  variant,
}: FilteredEpipenCardProps) {
  let filteredInstructions = instructions;

  // Apply filtering if selectedSubitems is provided
  if (selectedSubitems && typeof selectedSubitems === 'object') {
    if (Array.isArray(selectedSubitems.instructions) && selectedSubitems.instructions.length > 0) {
      filteredInstructions = instructions.filter(instruction =>
        selectedSubitems.instructions.includes(instruction.id)
      );
    }
  }

  return (
    <EpipenCardContent
      epipenCard={card}
      epipenInstructions={filteredInstructions}
      textColor={textColor}
      variant={variant}
    />
  );
}
