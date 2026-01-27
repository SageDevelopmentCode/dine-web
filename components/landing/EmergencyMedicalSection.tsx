import TwoColumnSectionWithImages from "./TwoColumnSectionWithImages";

export default function EmergencyMedicalSection() {
  return (
    <TwoColumnSectionWithImages
      heading={{
        text: "The worst might never happen. But you'll be ready.",
        highlightedWord: {
          word: "worst",
          color: "#65A9F2",
        },
      }}
      subtitle="Your complete medical profile, always accessible"
      contentBox={{
        text: "Emergency responders get instant access to your critical medical information. Includes height, weight, blood type, emergency contacts, current medications, preferred hospitals, and your primary care physician. Everything they need to make informed decisions.",
        backgroundColor: "#F6F5F3",
      }}
      checklist={[
        "Critical medical data in seconds",
        "Emergency contacts instantly notified",
        "Accessible even when you can't communicate",
      ]}
      imageBackgroundColor="#88365B"
      images={[
        {
          src: "/assets/Screens/Web.png",
          alt: "Dine Web Emergency Medical Profile",
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
          alt: "Dine Emergency Card",
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
