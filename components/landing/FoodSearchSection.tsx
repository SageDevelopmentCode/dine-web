import TwoColumnSectionWithImages from "./TwoColumnSectionWithImages";

export default function FoodSearchSection() {
  return (
    <TwoColumnSectionWithImages
      heading={{
        text: "Search from over 1.9 million verified food items.",
        highlightedWord: {
          word: "1.9 million",
          color: "#65A9F2",
        },
      }}
      subtitle="Most items include allergen, dietary, and nutrition facts."
      contentBox={{
        text: "Save your favorite foods and share your safety ratings with the community. Provide allergen expectations and comments to help other people with food allergies make informed decisions. Your insights contribute to a growing database of real-world experiences.",
        backgroundColor: "#F6F5F3",
      }}
      checklist={[
        "Access verified allergen and nutrition data",
        "Save foods and track your safe options",
        "Share safety ratings with the allergy community",
      ]}
      imageBackgroundColor="#FF8C42"
      images={[
        {
          src: "/assets/Screens/Web.png",
          alt: "Dine Food Search Database",
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
          alt: "Dine Food Search Card",
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
