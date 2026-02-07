"use client";

import { COLORS } from "@/constants/colors";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RestaurantDiscoverySection() {
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

  // Animation variants for content
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full flex flex-col items-center justify-start overflow-hidden py-8 md:py-12"
      style={{ backgroundColor: COLORS.RESTAURANT_DISCOVERY_BG }}
    >
      {/* Images Container - Mobile Version (< lg breakpoint) */}
      <motion.div
        className="flex lg:hidden items-center justify-center gap-4 mb-8 px-4 w-full min-h-[300px]"
        variants={imagesVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src="/assets/Screens/Web.png"
          alt="Dine web profile showing restaurant discovery"
          width={700}
          height={700}
          className="h-[250px] w-auto object-contain -ml-40"
          loading="lazy"
          quality={100}
          unoptimized={true}
        />
        <Image
          src="/assets/Screens/Mobile.png"
          alt="Dine mobile app showing restaurant discovery"
          width={400}
          height={700}
          className="h-[250px] w-auto object-contain"
          loading="lazy"
          quality={100}
          unoptimized={true}
        />
      </motion.div>

      {/* Images Container - Desktop Version (>= lg breakpoint) */}
      <motion.div
        className="hidden lg:flex items-end justify-center gap-6 md:gap-10 mb-8 md:mb-12 px-4 max-w-7xl w-full"
        variants={imagesVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Web Image */}
        <div className="relative">
          <Image
            src="/assets/Screens/Web.png"
            alt="Dine web profile showing restaurant discovery"
            width={700}
            height={700}
            className="h-[350px] md:h-[450px] lg:h-[550px] w-auto object-contain"
            loading="lazy"
            quality={100}
            unoptimized={true}
          />
        </div>

        {/* Mobile Image */}
        <div className="relative">
          <Image
            src="/assets/Screens/Mobile.png"
            alt="Dine mobile app showing restaurant discovery"
            width={400}
            height={700}
            className="h-[350px] md:h-[450px] lg:h-[550px] w-auto object-contain"
            loading="lazy"
            quality={100}
            unoptimized={true}
          />
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="flex flex-col items-center text-center max-w-4xl mx-auto px-8"
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Heading */}
        <h2
          className="font-merriweather text-2xl md:text-3xl lg:text-4xl font-regular leading-snug mb-2 max-w-2xl"
          style={{ color: COLORS.WHITE }}
        >
          Find restaurants that get it right.
        </h2>

        {/* Description Text */}
        <p
          className="font-merriweather text-sm md:text-base mb-7 max-w-lg"
          style={{ color: COLORS.RESTAURANT_DESCRIPTION_TEXT }}
        >
          Discover allergy-safe restaurants near you. Real reviews from people
          with food allergies.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Download App Button */}
          <button
            className="font-merriweather text-sm md:text-base px-5 py-2 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
            style={{
              backgroundColor: COLORS.RESTAURANT_DOWNLOAD_BTN,
              color: COLORS.WHITE,
            }}
          >
            Download App
          </button>

          {/* Restaurant Button */}
          <button
            className="font-merriweather text-sm md:text-base px-5 py-2 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
            style={{
              backgroundColor: COLORS.WHITE,
              color: COLORS.RESTAURANT_DISCOVERY_BG,
            }}
          >
            Are you a restaurant?
          </button>
        </div>
      </motion.div>
    </section>
  );
}
