"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

export default function ForYouHeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      className="w-full min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-12 md:pt-16 pb-16 px-8"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            backgroundColor: COLORS.WHITE,
          }}
          variants={badgeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Twemoji hex="1f4aa" size={18} />
          <span className="font-merriweather text-xs lg:text-sm">
            This is <span className="font-bold">for you</span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-merriweather text-4xl md:text-5xl lg:text-6xl font-regular leading-tight mb-6"
          style={{ color: COLORS.BLACK }}
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Food allergies shouldn&apos;t stop you from{" "}
          <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>
            living your life
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="font-merriweather text-base lg:text-lg leading-relaxed mb-8 max-w-2xl"
          style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          variants={descriptionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Whether you&apos;re managing your own allergies or protecting your child,
          Dine gives you the confidence to navigate every situation—from
          restaurants to emergencies, travel to everyday life.
        </motion.p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Button 1: Get Started */}
          <motion.button
            className="font-merriweather text-base lg:text-lg px-6 py-3 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto cursor-pointer"
            style={{
              backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
              color: COLORS.WHITE,
            }}
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            Get Started
          </motion.button>

          {/* Button 2: See How It Works */}
          <motion.button
            className="font-merriweather text-base lg:text-lg px-6 py-3 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto cursor-pointer"
            style={{
              backgroundColor: COLORS.WHITE,
              color: COLORS.DOWNLOAD_SECTION_BLUE,
              border: `2px solid ${COLORS.DOWNLOAD_SECTION_BLUE}`,
            }}
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.35 }}
          >
            See How It Works
          </motion.button>
        </div>
      </div>
    </section>
  );
}
