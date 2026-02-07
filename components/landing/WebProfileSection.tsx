"use client";

import { COLORS } from "@/constants/colors";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WebProfileSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
  return (
    <section
      ref={ref}
      className="w-full h-[53vh] md:h-[85vh] flex flex-col items-center justify-start overflow-hidden pt-6 md:pt-12"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      {/* Content Container */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-8 mb-2 md:mb-6">
        {/* Main Heading */}
        <h2
          className="font-merriweather text-2xl md:text-3xl lg:text-4xl font-regular leading-snug mb-4 max-w-md"
          style={{ color: COLORS.BLACK }}
        >
          One{" "}
          <span style={{ color: "#65A9F2", fontStyle: "italic" }}>link</span>{" "}
          for all your allergy information
        </h2>

        {/* Description Text */}
        <p
          className="font-merriweather text-xs md:text-sm mb-5"
          style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
        >
          Beautiful web profile you can share with anyone. Updates
          automatically.
        </p>

        {/* Action Button */}
        <button
          className="font-merriweather text-base px-5 py-2 rounded-xl hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
            color: COLORS.WHITE,
          }}
        >
          Create Your Profile
        </button>
      </div>

      {/* Images Container - Side by Side */}
      <motion.div
        className="flex items-end justify-center gap-4 md:gap-8 flex-1 w-full max-w-6xl px-4 -mb-[120px] md:-mb-30"
        variants={imagesVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Web Image */}
        <div className="relative h-full flex items-end w-full md:w-auto">
          <Image
            src="/assets/Screens/Web.png"
            alt="Dine web profile showing allergy information and cards"
            width={600}
            height={700}
            className="h-full w-full md:w-auto object-contain"
            loading="lazy"
            quality={100}
            unoptimized={true}
          />
        </div>

        {/* Mobile Image */}
        <div className="relative h-full items-end hidden md:flex">
          <Image
            src="/assets/Screens/Mobile.png"
            alt="Dine mobile app showing allergy cards"
            width={350}
            height={700}
            className="h-full w-auto object-contain"
            loading="lazy"
            quality={100}
            unoptimized={true}
          />
        </div>
      </motion.div>
    </section>
  );
}
