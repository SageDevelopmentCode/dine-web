"use client";

import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants for badge
  const badgeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // Animation variants for heading
  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // Animation variants for description
  const descriptionVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="flex flex-col items-center text-center max-w-4xl mx-auto pt-4 pb-0"
    >
      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2"
        style={{
          backgroundColor: COLORS.WHITE,
        }}
        variants={badgeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Twemoji hex="1f44b" size={18} />
        <span className="font-merriweather text-xs">
          Hello, Dine is available <span className="font-bold">now</span>!
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        className="font-merriweather text-2xl md:text-3xl lg:text-4xl font-regular leading-snug mb-4 max-w-md"
        style={{
          color: COLORS.BLACK,
        }}
        variants={headingVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        The <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>easy</span>{" "}
        way to handle <span className="italic">food allergies</span>.
      </motion.h1>

      {/* Description Text */}
      <motion.p
        className="font-merriweather text-xs md:text-sm max-w-lg mb-6 px-4"
        style={{
          color: COLORS.SECONDARY_TEXT_GRAY,
        }}
        variants={descriptionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        Stop explaining. Start sharing your complete safety profile that is
        ready for restaurants, schools, workplace, emergencies, and travel.
      </motion.p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Button 1: Download App */}
        <motion.button
          className="font-merriweather text-base px-5 py-2 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
          style={{
            backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
            color: COLORS.WHITE,
          }}
          variants={buttonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          Download App
        </motion.button>

        {/* Button 2: Discover Our Story */}
        <motion.button
          className="font-merriweather text-base px-5 py-2 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
          style={{
            backgroundColor: COLORS.WHITE,
            color: COLORS.DOWNLOAD_SECTION_BLUE,
            borderColor: COLORS.DOWNLOAD_SECTION_BLUE,
          }}
          variants={buttonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.35 }}
        >
          Discover Our Story
        </motion.button>
      </div>
    </section>
  );
}
