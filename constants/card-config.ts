import { COLORS } from "@/constants/colors";

export type ValidCardType =
  | "food-allergies"
  | "emergency"
  | "epipen"
  | "swe"
  | "travel";

export const cardTitles: Record<ValidCardType, string> = {
  "food-allergies": "Food Allergies",
  emergency: "Emergency Medical",
  epipen: "Epipen Guide",
  swe: "School/Work/Events",
  travel: "Travel",
};

export const cardDescriptions: Record<ValidCardType, string> = {
  "food-allergies": "Includes food preferences, allergies, instructions",
  emergency: "If I'm unconscious or having a severe reaction",
  epipen: "How to help in an emergency",
  swe: "For teachers, coworkers, daycare, camp, or caregivers",
  travel: "Multi-Language Allergy Information",
};

export const cardIcons: Record<ValidCardType, string> = {
  "food-allergies": "/assets/JustMe.png",
  emergency: "/assets/Emergency.png",
  epipen: "/assets/Epipen.png",
  swe: "/assets/SWE.png",
  travel: "/assets/Travel.png",
};

export const cardBackgroundColors: Record<ValidCardType, string> = {
  "food-allergies": COLORS.FOOD_ALLERGIES_BG,
  emergency: COLORS.EMERGENCY_MEDICAL_BG,
  epipen: COLORS.EPIPEN_COLOR,
  swe: COLORS.SCHOOL_WORK_EVENTS_BG,
  travel: COLORS.TRAVEL_BG,
};
