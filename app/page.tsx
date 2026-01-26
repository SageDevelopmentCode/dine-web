import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      {/* Header */}
      <header className="w-full px-8 py-6">
        <nav className="w-full mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/assets/Logo.png"
              alt="Dine Logo"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-12">
            <a
              href="#about"
              className="font-merriweather text-base hover:opacity-70 transition-opacity"
              style={{ color: COLORS.BLACK }}
            >
              About us
            </a>
            <a
              href="#blog"
              className="font-merriweather text-base hover:opacity-70 transition-opacity"
              style={{ color: COLORS.BLACK }}
            >
              Blog
            </a>
            <a
              href="#contact"
              className="font-merriweather text-base hover:opacity-70 transition-opacity"
              style={{ color: COLORS.BLACK }}
            >
              Contact Us
            </a>
          </div>

          {/* Download App Button */}
          <button
            className="font-merriweather text-base px-5 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
              color: COLORS.WHITE
            }}
          >
            Download App
            <ChevronRight size={20} />
          </button>
        </nav>
      </header>

      {/* Main Content - Ready for future sections */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pt-8 pb-12">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2"
            style={{ backgroundColor: COLORS.WHITE }}
          >
            <Twemoji hex="1f44b" size={18} />
            <span className="font-merriweather text-xs">
              Hello, Dine is available <span className="font-bold">now</span>!
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="font-merriweather text-2xl md:text-3xl lg:text-4xl font-regular leading-snug mb-4 max-w-md"
            style={{ color: COLORS.BLACK }}
          >
            The <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>easy</span> way to handle food{" "}
            <span className="italic">allergies</span>.
          </h1>

          {/* Description Text */}
          <p
            className="font-merriweather text-xs md:text-sm max-w-3xl mb-6 px-4 max-w-lg"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            Stop explaining. Start sharing your complete safety profile that is ready for restaurants, schools, workplace, emergencies, and travel.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Button 1: Download App */}
            <button
              className="font-merriweather text-base px-6 py-3 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
              style={{
                backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
                color: COLORS.WHITE
              }}
            >
              Download App
            </button>

            {/* Button 2: Discover Our Story */}
            <button
              className="font-merriweather text-base px-6 py-3 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
              style={{
                backgroundColor: COLORS.WHITE,
                color: COLORS.DOWNLOAD_SECTION_BLUE,
                borderColor: COLORS.DOWNLOAD_SECTION_BLUE
              }}
            >
              Discover Our Story
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
