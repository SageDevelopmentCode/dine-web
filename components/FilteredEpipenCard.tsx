"use client";

import EpipenCardContent from "./EpipenCardContent";
import type { Database } from "@/lib/supabase/types";

type UserEpipenCard = Database['epipen']['Tables']['user_epipen_cards']['Row'];
type UserEpipenInstruction = Database['epipen']['Tables']['user_epipen_instructions']['Row'];
type EpipenInstruction = Database['epipen']['Tables']['epipen_instructions']['Row'];
type UserEpipenInstructionWithDetails = UserEpipenInstruction & {
  epipen_instruction?: EpipenInstruction | null;
};

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
