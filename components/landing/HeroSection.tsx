import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center max-w-4xl mx-auto pt-4 pb-0">
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2"
        style={{
          backgroundColor: COLORS.WHITE,
          animation: "fadeInScale 0.4s ease-out both",
        }}
      >
        <Twemoji hex="1f44b" size={18} />
        <span className="font-merriweather text-xs">
          Hello, Dine is available <span className="font-bold">now</span>!
        </span>
      </div>

      {/* Main Heading */}
      <h1
        className="font-merriweather text-2xl md:text-3xl lg:text-4xl font-regular leading-snug mb-4 max-w-md"
        style={{
          color: COLORS.BLACK,
          animation: "fadeInUp 0.5s ease-out 0.1s both",
        }}
      >
        The <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>easy</span>{" "}
        way to handle <span className="italic">food allergies</span>.
      </h1>

      {/* Description Text */}
      <p
        className="font-merriweather text-xs md:text-sm max-w-lg mb-6 px-4"
        style={{
          color: COLORS.SECONDARY_TEXT_GRAY,
          animation: "fadeIn 0.4s ease-out 0.2s both",
        }}
      >
        Stop explaining. Start sharing your complete safety profile that is
        ready for restaurants, schools, workplace, emergencies, and travel.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Button 1: Download App */}
        <button
          className="font-merriweather text-base px-5 py-2 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
          style={{
            backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
            color: COLORS.WHITE,
            animation: "fadeInUp 0.4s ease-out 0.3s both",
          }}
        >
          Download App
        </button>

        {/* Button 2: Discover Our Story */}
        <button
          className="font-merriweather text-base px-5 py-2 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
          style={{
            backgroundColor: COLORS.WHITE,
            color: COLORS.DOWNLOAD_SECTION_BLUE,
            borderColor: COLORS.DOWNLOAD_SECTION_BLUE,
            animation: "fadeInUp 0.4s ease-out 0.35s both",
          }}
        >
          Discover Our Story
        </button>
      </div>
    </section>
  );
}
