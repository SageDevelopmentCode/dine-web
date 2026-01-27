import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      {/* Home Screen Section - 100vh */}
      <div className="h-screen w-full flex flex-col">
        {/* Header */}
        <header className="w-full px-8 py-6">
          <nav className="w-full mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/assets/Logo.png"
                alt="Dine Logo"
                width={80}
                height={80}
                priority
                className="object-contain w-auto h-10"
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
                href="#for-you"
                className="font-merriweather text-base hover:opacity-70 transition-opacity"
                style={{ color: COLORS.BLACK }}
              >
                For You
              </a>
              <a
                href="#for-restaurants"
                className="font-merriweather text-base hover:opacity-70 transition-opacity"
                style={{ color: COLORS.BLACK }}
              >
                For Restaurants
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

        {/* Hero + Phone Showcase - Flexible space */}
        <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-8">
          {/* Hero Section */}
          <section className=" flex flex-col items-center text-center max-w-4xl mx-auto pt-4 pb-0">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2"
              style={{
                backgroundColor: COLORS.WHITE,
                animation: 'fadeInScale 0.4s ease-out both'
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
                animation: 'fadeInUp 0.5s ease-out 0.1s both'
              }}
            >
              The <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>easy</span> way to handle{" "}
              <span className="italic">food allergies</span>.
            </h1>

            {/* Description Text */}
            <p
              className="font-merriweather text-xs md:text-sm max-w-lg mb-6 px-4"
              style={{
                color: COLORS.SECONDARY_TEXT_GRAY,
                animation: 'fadeIn 0.4s ease-out 0.2s both'
              }}
            >
              Stop explaining. Start sharing your complete safety profile that is ready for restaurants, schools, workplace, emergencies, and travel.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Button 1: Download App */}
              <button
                className="font-merriweather text-base px-5 py-2 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
                style={{
                  backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
                  color: COLORS.WHITE,
                  animation: 'fadeInUp 0.4s ease-out 0.3s both'
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
                  animation: 'fadeInUp 0.4s ease-out 0.35s both'
                }}
              >
                Discover Our Story
              </button>
            </div>
          </section>

          {/* Phone Showcase Section */}
          <section className="relative flex-1 w-full flex flex-col justify-end">
            <div className="relative flex items-center justify-center w-full">

              {/* Left Cards Group */}
              <div className="hidden md:flex absolute left-[-13%] bottom-[5%] flex-row gap-4 z-10">
                {/* Travel Card */}
                <div
                  className="relative w-[300px] h-[130px] rounded-2xl p-4 overflow-hidden"
                  style={{
                    backgroundColor: "#55BEC1",
                    animation: 'fadeInLeft 0.5s ease-out 0.6s both'
                  }}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="font-merriweather text-base font-semibold mb-1" style={{ color: COLORS.WHITE }}>
                      Travel
                    </h3>
                    <p className="font-merriweather text-xs mb-3 max-w-[200px]" style={{ color: "#E2E2E2" }}>
                      Multi-Language Allergy Information
                    </p>
                    <button
                      className="font-merriweather text-xs px-3 py-1.5 rounded-lg mt-auto w-fit"
                      style={{ backgroundColor: "#3E8C90", color: COLORS.WHITE }}
                    >
                      View
                    </button>
                  </div>
                  <Image
                    src="/assets/Travel.png"
                    alt="Travel icon"
                    width={100}
                    height={100}
                    quality={100}
                    unoptimized={true}
                    className="absolute -bottom-2 -right-2 object-contain"
                  />
                </div>

                {/* Emergency Medical Card */}
                <div
                  className="relative w-[300px] h-[130px] rounded-2xl p-4 overflow-hidden"
                  style={{
                    backgroundColor: COLORS.EMERGENCY_MEDICAL_BG,
                    animation: 'fadeInLeft 0.5s ease-out 0.7s both'
                  }}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="font-merriweather text-base font-semibold mb-1" style={{ color: COLORS.WHITE }}>
                      Emergency Medical
                    </h3>
                    <p className="font-merriweather text-xs mb-3 max-w-[200px]" style={{ color: "#E2E2E2" }}>
                      If I&apos;m unconscious or having a severe reaction
                    </p>
                    <button
                      className="font-merriweather text-xs px-3 py-1.5 rounded-lg mt-auto w-fit"
                      style={{ backgroundColor: "#692B47", color: COLORS.WHITE }}
                    >
                      View
                    </button>
                  </div>
                  <Image
                    src="/assets/Emergency.png"
                    alt="Emergency icon"
                    width={100}
                    height={100}
                    quality={100}
                    unoptimized={true}
                    className="absolute -bottom-2 -right-2 object-contain"
                  />
                </div>
              </div>

              {/* Center Phone Image */}
              <div
                className="relative z-20 -mb-10"
                style={{ animation: 'fadeInScale 0.6s ease-out 0.4s both' }}
              >
                <Image
                  src="/assets/Screens/Home.png"
                  alt="Dine App Home Screen"
                  width={432}
                  height={689}
                  priority
                  quality={100}
                  unoptimized={true}
                  className="object-contain w-[270px] h-auto"
                />
              </div>

              {/* Right Cards Group */}
              <div className="hidden md:flex absolute right-[-13%] bottom-[5%] flex-row gap-4 z-10">
                {/* EpiPen Instructions Card */}
                <div
                  className="relative w-[300px] h-[130px] rounded-2xl p-4 overflow-hidden"
                  style={{
                    backgroundColor: "#7AC0E2",
                    animation: 'fadeInRight 0.5s ease-out 0.6s both'
                  }}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="font-merriweather text-base font-semibold mb-1" style={{ color: COLORS.WHITE }}>
                      EpiPen Instructions
                    </h3>
                    <p className="font-merriweather text-xs mb-3 max-w-[200px]" style={{ color: "#E2E2E2" }}>
                      How to help in an emergency
                    </p>
                    <button
                      className="font-merriweather text-xs px-3 py-1.5 rounded-lg mt-auto w-fit"
                      style={{ backgroundColor: "#61ADCF", color: COLORS.WHITE }}
                    >
                      View
                    </button>
                  </div>
                  <Image
                    src="/assets/Epipen.png"
                    alt="EpiPen icon"
                    width={100}
                    height={100}
                    quality={100}
                    unoptimized={true}  
                    className="absolute -bottom-2 -right-2 object-contain"
                  />
                </div>

                {/* School/Work/Events Card */}
                <div
                    className="relative w-[300px] h-[130px] rounded-2xl p-4 overflow-hidden"
                  style={{
                    backgroundColor: COLORS.SCHOOL_WORK_EVENTS_BG,
                    animation: 'fadeInRight 0.5s ease-out 0.7s both'
                  }}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="font-merriweather text-base font-semibold mb-1" style={{ color: COLORS.WHITE }}>
                      School/Work/Events
                    </h3>
                    <p className="font-merriweather text-xs mb-3 max-w-[200px]" style={{ color: "#E2E2E2" }}>
                      For teachers, coworkers, daycare, camp, or caregivers
                    </p>
                    <button
                      className="font-merriweather text-xs px-3 py-1.5 rounded-lg mt-auto w-fit"
                      style={{ backgroundColor: "#44276A", color: COLORS.WHITE }}
                    >
                      View
                    </button>
                  </div>
                  <Image
                    src="/assets/SWE.png"
                    alt="School/Work/Events icon"
                    width={100}
                    height={100}
                    quality={100}
                    unoptimized={true}
                    className="absolute -bottom-2 -right-2 object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* White Background Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          {/* Content will be added here */}
        </div>
      </section>

      {/* Future sections go here */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Add more sections as needed */}
      </main>
    </div>
  );
}
