"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

export default function WhyAllergyAwarenessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const imagesVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section ref={ref} className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[50vh]">
        {/* Images Column */}
        <motion.div
          className="relative w-full min-h-[300px] py-8 lg:py-0 lg:min-h-0 lg:h-full overflow-hidden flex items-center justify-center order-1 lg:order-2"
          style={{ backgroundColor: COLORS.FOOD_ALLERGIES_BG }}
          variants={imagesVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Mobile: Flex layout */}
          <div className="flex flex-row items-center justify-center gap-4 lg:hidden w-full h-full">
            <Image
              src="/assets/restaurant-discovery-1.png"
              alt="Restaurant discovery interface showing allergy-friendly options"
              width={300}
              height={650}
              quality={100}
              unoptimized={true}
              loading="lazy"
              className="h-[250px] w-auto object-contain -ml-40"
            />
            <Image
              src="/assets/restaurant-discovery-2.png"
              alt="Detailed restaurant safety information"
              width={300}
              height={650}
              quality={100}
              unoptimized={true}
              loading="lazy"
              className="h-[250px] w-auto object-contain"
            />
          </div>

          {/* Desktop: Absolute positioning */}
          <div className="hidden lg:block relative w-full h-full">
            <Image
              src="/assets/restaurant-discovery-1.png"
              alt="Restaurant discovery interface showing allergy-friendly options"
              width={300}
              height={650}
              quality={100}
              unoptimized={true}
              loading="lazy"
              className="absolute h-[400px] xl:h-[500px] w-auto object-contain"
              style={{
                transform: "translateY(-50%) rotate(-8deg)",
                top: "50%",
                left: "20%",
                zIndex: 2,
              }}
            />
            <Image
              src="/assets/restaurant-discovery-2.png"
              alt="Detailed restaurant safety information"
              width={300}
              height={650}
              quality={100}
              unoptimized={true}
              loading="lazy"
              className="absolute h-[380px] xl:h-[480px] w-auto object-contain"
              style={{
                transform: "translateY(-50%) rotate(8deg)",
                top: "50%",
                right: "15%",
                zIndex: 1,
              }}
            />
          </div>
        </motion.div>

        {/* Content Column */}
        <motion.div
          className="flex flex-col gap-4 lg:gap-6 py-12 lg:py-24 px-8 lg:px-16 max-w-3xl lg:max-w-none lg:pr-12 order-2 lg:order-1"
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Heading */}
          <div className="max-w-md">
            <h2
              className="font-merriweather text-xl md:text-2xl lg:text-3xl font-regular leading-tight max-w-sm mb-2"
              style={{ color: COLORS.BLACK }}
            >
              Why food allergy{" "}
              <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>
                safety
              </span>{" "}
              matters
            </h2>

            {/* Subtitle */}
            <p
              className="font-merriweather text-sm md:text-base"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              The growing importance of allergy-aware dining
            </p>
          </div>

          {/* Quote Box with Gray Background */}
          <div
            className="rounded-2xl p-4 md:p-6"
            style={{ backgroundColor: "#E8E8E8" }}
          >
            <p
              className="font-merriweather text-xs md:text-sm leading-relaxed mb-3"
              style={{ color: COLORS.BLACK }}
            >
              Over 33 million Americans live with food allergies, and this
              number continues to grow each year. For these individuals and
              their families, dining out isn&apos;t just about preference—it&apos;s a
              matter of safety. Restaurants that demonstrate genuine commitment
              to allergy safety don&apos;t just protect their customers; they earn
              lasting loyalty and trust.
            </p>
            {/* Source Link */}
            <a
              href="https://www.foodallergy.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-merriweather text-xs hover:opacity-70 transition-opacity inline-flex items-center gap-1"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              Source: FARE (Food Allergy Research &amp; Education)
            </a>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
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
                1 in 10 adults has a food allergy
              </span>
            </div>
            <div className="flex items-start gap-3">
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
                Cross-contamination is a leading concern for allergy-conscious
                diners
              </span>
            </div>
            <div className="flex items-start gap-3">
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
                86% of customers say they&apos;re more likely to return to
                allergy-safe restaurants
              </span>
            </div>
            <div className="flex items-start gap-3">
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
                Clear communication about ingredients builds customer confidence
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
