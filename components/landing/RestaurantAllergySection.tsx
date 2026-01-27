import { COLORS } from "@/constants/colors";
import TwoColumnSectionWithImages from "./TwoColumnSectionWithImages";

export default function RestaurantAllergySection() {
  return (
    <TwoColumnSectionWithImages
      heading={{
        text: "Show anyone your allergies instantly.",
        highlightedWord: {
          word: "anyone",
          color: "#65A9F2",
        },
      }}
      subtitle="No more verbal miscommunications."
      contentBox={{
        text: "Your complete allergy information formatted for restaurant staff. Includes severity levels, cross-contamination warnings, and safe food suggestions. One QR code scan and your waiter knows everything.",
        backgroundColor: "#F6F5F3",
      }}
      checklist={[
        "Restaurant Servers understand",
        "Includes cross-contamination instructions",
        "Printable or shareable via QR code",
      ]}
      imageBackgroundColor={COLORS.FOOD_ALLERGIES_BG}
      images={[
        {
          src: "/assets/Screens/Web.png",
          alt: "Dine Web Allergy Profile",
          width: 600,
          height: 700,
          zIndex: 10,
          top: "50%",
          left: "10%",
          transform: "translate(0%, -50%)",
          heightClass: "h-[75%]",
          widthClass: "w-auto",
        },
        {
          src: "/assets/Screens/Mobile.png",
          alt: "Dine Home Screen",
          width: 350,
          height: 700,
          zIndex: 20,
          top: "60%",
          left: "3%",
          transform: "translate(10%, -50%)",
          heightClass: "h-[70%]",
          widthClass: "w-auto",
        },
      ]}
      invertLayout={false}
    />
  );
}
