import TwoColumnSectionWithImages from "./TwoColumnSectionWithImages";

export default function SchoolWorkEventsSection() {
  return (
    <TwoColumnSectionWithImages
      heading={{
        text: "Send your child to school without the worry.",
        highlightedWord: {
          word: "worry",
          color: "#65A9F2",
        },
      }}
      subtitle="Everything teachers, co-workers, and event planners need to know."
      contentBox={{
        text: "Comprehensive allergy information formatted for schools and workplaces. Includes safe snacks, emergency protocols, and prevention measures. Share with teachers, coaches, and staff who care for you.",
        backgroundColor: "#F6F5F3",
      }}
      checklist={[
        "Safe snack lists for classrooms and events",
        "Emergency action plans for teachers and staff",
        "Prevention protocols for field trips and activities",
      ]}
      imageBackgroundColor="#593688"
      images={[
        {
          src: "/assets/Screens/Web.png",
          alt: "Dine Web School Profile",
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
          alt: "Dine School Allergy Card",
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
