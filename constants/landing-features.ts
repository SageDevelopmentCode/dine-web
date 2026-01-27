import { COLORS } from "./colors";

export interface FeatureCardData {
  title: string;
  description: string;
  backgroundColor: string;
  buttonColor: string;
  iconSrc: string;
  iconAlt: string;
  animationDelay: string;
}

export const LANDING_FEATURES = {
  left: [
    {
      title: "Travel",
      description: "Multi-Language Allergy Information",
      backgroundColor: "#55BEC1",
      buttonColor: "#3E8C90",
      iconSrc: "/assets/Travel.png",
      iconAlt: "Travel icon",
      animationDelay: "0.6s"
    },
    {
      title: "Emergency Medical",
      description: "If I'm unconscious or having a severe reaction",
      backgroundColor: COLORS.EMERGENCY_MEDICAL_BG,
      buttonColor: "#692B47",
      iconSrc: "/assets/Emergency.png",
      iconAlt: "Emergency icon",
      animationDelay: "0.7s"
    }
  ],
  right: [
    {
      title: "EpiPen Instructions",
      description: "How to help in an emergency",
      backgroundColor: "#7AC0E2",
      buttonColor: "#61ADCF",
      iconSrc: "/assets/Epipen.png",
      iconAlt: "EpiPen icon",
      animationDelay: "0.6s"
    },
    {
      title: "School/Work/Events",
      description: "For teachers, coworkers, daycare, camp, or caregivers",
      backgroundColor: COLORS.SCHOOL_WORK_EVENTS_BG,
      buttonColor: "#44276A",
      iconSrc: "/assets/SWE.png",
      iconAlt: "School/Work/Events icon",
      animationDelay: "0.7s"
    }
  ]
} as const;
