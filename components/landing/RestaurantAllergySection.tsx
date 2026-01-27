import Image from "next/image";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

const checklistItems = [
  "Restaurant Servers understand",
  "Includes cross-contamination instructions",
  "Printable or shareable via QR code",
];

export default function RestaurantAllergySection() {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[50vh]">

          {/* Left Side - White Background with Content */}
          <div className="flex flex-col gap-6 py-24 px-8 lg:px-16 max-w-3xl lg:max-w-none lg:pr-12">
            {/* Heading */}
            <div className="max-w-md">
              <h2
                className="font-merriweather text-xl md:text-2xl lg:text-3xl font-regular leading-tight max-w-sm mb-2"
                style={{ color: COLORS.BLACK }}
              >
                Show <span className="text-[#65A9F2]">anyone</span> your allergies instantly.
              </h2>

              {/* Subtitle */}
              <p
                className="font-merriweather text-sm md:text-base"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                No more verbal miscommunications.
              </p>
            </div>
           

            {/* Content Box */}
            <div
              className="rounded-2xl p-4 md:p-6"
              style={{ backgroundColor: "#F6F5F3" }}
            >
              <p
                className="font-merriweather text-xs md:text-sm leading-relaxed"
                style={{ color: COLORS.BLACK }}
              >
                Your complete allergy information formatted for restaurant staff.
                Includes severity levels, cross-contamination warnings, and safe
                food suggestions. One QR code scan and your waiter knows everything.
              </p>
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-3">
              {checklistItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <Twemoji
                    hex="2705"
                    size={20}
                    className="shrink-0 mt-0.5"
                    alt="checkmark"
                  />
                  <span
                    className="font-merriweather text-xs md:text-sm"
                    style={{ color: COLORS.BLACK }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Teal Background with Overlapping Phone Images */}
          <div
            className="relative w-full h-full overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: COLORS.FOOD_ALLERGIES_BG }}
          >
            <div className="relative w-full h-full">

              {/* Web.png - Behind (Larger, offset right, can be cut off) */}
              <Image
                src="/assets/Screens/Web.png"
                alt="Dine Web Allergy Profile"
                width={600}
                height={700}
                quality={100}
                unoptimized={true}
                className="absolute top-[50%] z-10 h-[75%] w-auto object-contain"
                style={{ transform: "translate(0%, -50%)", left: "10%" }}
              />

              {/* Mobile.png - Front (Left side, overlapping Web) */}
              <Image
                src="/assets/Screens/Mobile.png"
                alt="Dine Home Screen"
                width={350}
                height={700}
                quality={100}
                unoptimized={true}
                className="absolute left-[3%] top-[60%] z-20 h-[70%] w-auto object-contain"
                style={{ transform: "translate(10%, -50%)" }}
              />
            </div>
          </div>

        </div>
    </section>
  );
}
