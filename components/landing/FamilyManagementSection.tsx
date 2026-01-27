"use client";

import { COLORS } from "@/constants/colors";
import Image from "next/image";
import { Twemoji } from "@/utils/twemoji";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FamilyManagementSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants for content
  const contentVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // Animation variants for images - upward movement
  const imagesVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const checklistItems = [
    "Restaurant Servers understand",
    "Includes cross-contamination instructions",
    "Printable or shareable via QR code",
  ];

  return (
    <section
      ref={ref}
      className="w-full h-[85vh] flex items-center justify-center bg-white py-12"
    >
      <div
        className="w-full h-full mx-8 rounded-3xl"
        style={{ backgroundColor: "#F6F5F3" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch h-full">
          {/* Left Content */}
          <motion.div
            className="flex flex-col gap-8 justify-center p-8 md:p-12 lg:p-16"
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Heading */}
            <div>
              <h2
                className="font-merriweather text-2xl md:text-3xl lg:text-4xl font-regular leading-tight mb-3"
                style={{ color: COLORS.BLACK }}
              >
                Manage your whole family&apos;s allergies.
              </h2>

              {/* Description */}
              <p
                className="font-merriweather text-sm md:text-base"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                All your family members in one place.
              </p>
            </div>

            {/* Sub Content Box */}
            <div className="bg-white rounded-2xl p-5">
              <p
                className="font-merriweather text-xs md:text-sm leading-relaxed"
                style={{ color: COLORS.BLACK }}
              >
                Create profiles for each family member. Switch between children
                instantly. All safety cards update automatically when
                information changes. Perfect for parents managing multiple food
                allergies.
              </p>
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-2">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
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

            {/* Action Button */}
            <div>
              <button
                className="font-merriweather text-sm md:text-base px-5 
                py-2 rounded-xl hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
                  color: COLORS.WHITE,
                }}
              >
                Download App
              </button>
            </div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            className="relative h-full overflow-hidden flex items-end justify-center"
            variants={imagesVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* First Phone - Back */}
            <Image
              src="/assets/Screens/Mobile.png"
              alt="Dine mobile app - family member 1"
              width={300}
              height={600}
              className="absolute h-[450px] md:h-[500px] lg:h-[550px] w-auto object-contain -mb-10"
              style={{
                right: "50%",
                zIndex: 3,
              }}
              loading="lazy"
              quality={100}
              unoptimized={true}
            />

            {/* Second Phone - Middle */}
            <Image
              src="/assets/Screens/Mobile.png"
              alt="Dine mobile app - family member 2"
              width={300}
              height={600}
              className="absolute h-[400px] md:h-[450px] lg:h-[500px] w-auto object-contain -mb-10"
              style={{
                right: "25%",
                zIndex: 2,
              }}
              loading="lazy"
              quality={100}
              unoptimized={true}
            />

            {/* Third Phone - Front */}
            <Image
              src="/assets/Screens/Mobile.png"
              alt="Dine mobile app - family member 3"
              width={300}
              height={600}
              className="absolute h-[350px] md:h-[400px] lg:h-[450px] w-auto object-contain -mb-10"
              style={{
                right: "0%",
                zIndex: 1,
              }}
              loading="lazy"
              quality={100}
              unoptimized={true}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
