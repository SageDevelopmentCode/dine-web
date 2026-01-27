import TwoColumnSectionWithImages from "./TwoColumnSectionWithImages";

export default function TravelTranslationSection() {
  return (
    <TwoColumnSectionWithImages
      heading={{
        text: "Your allergies translated into 50+ languages.",
        highlightedWord: {
          word: "50+",
          color: "#65A9F2",
        },
      }}
      subtitle="Travel anywhere with confidence and clarity."
      contentBox={{
        text: "Traveling abroad? Your allergy card translates into the local language. Essential phrases, emergency instructions, and allergen names in Japanese, Spanish, French, and 50+ more languages",
        backgroundColor: "#F6F5F3",
      }}
      checklist={[
        "Automatic translation to local languages",
        "Essential emergency phrases included",
        "Recognized allergen names in 50+ countries",
      ]}
      imageBackgroundColor="#55BEC1"
      images={[
        {
          src: "/assets/Screens/Web.png",
          alt: "Dine Web Translation Feature",
          width: 600,
          height: 700,
          zIndex: 10,
          top: "50%",
          left: "-10%",
          transform: "translate(0%, -50%)",
          heightClass: "h-[75%]",
          widthClass: "w-auto",
        },
        {
          src: "/assets/Screens/Mobile.png",
          alt: "Dine Travel Translation Card",
          width: 350,
          height: 700,
          zIndex: 20,
          top: "60%",
          right: "5%",
          transform: "translate(0%, -50%)",
          heightClass: "h-[70%]",
          widthClass: "w-auto",
        },
      ]}
      invertLayout={true}
    />
  );
}
