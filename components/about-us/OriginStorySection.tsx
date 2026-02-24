"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

export default function OriginStorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative z-10 w-full px-8 py-24"
      style={{ backgroundColor: COLORS.WHITE }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <h2
              className="font-merriweather text-3xl lg:text-5xl font-regular leading-tight"
              style={{ color: COLORS.BLACK }}
            >
              A Personal Story
            </h2>

            <p
              className="font-merriweather text-base lg:text-lg leading-relaxed"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              Growing up, my sister had severe food allergies. Our family faced
              challenges that many with food allergies know all too well.
            </p>

            <div
              className="rounded-2xl p-6 space-y-4"
              style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
            >
              <p
                className="font-merriweather text-base leading-relaxed flex items-start gap-3"
                style={{ color: COLORS.BLACK }}
              >
                <Twemoji hex="2705" size={20} />
                <span>
                  Food allergy attacks from cross-contamination at restaurants
                </span>
              </p>
              <p
                className="font-merriweather text-base leading-relaxed flex items-start gap-3"
                style={{ color: COLORS.BLACK }}
              >
                <Twemoji hex="2705" size={20} />
                <span>
                  Miscommunication about allergies when traveling in foreign
                  countries
                </span>
              </p>
              <p
                className="font-merriweather text-base leading-relaxed flex items-start gap-3"
                style={{ color: COLORS.BLACK }}
              >
                <Twemoji hex="2705" size={20} />
                <span>
                  Difficulty finding safe restaurants, stores, and food brands
                  she could trust
                </span>
              </p>
              <p
                className="font-merriweather text-base leading-relaxed flex items-start gap-3"
                style={{ color: COLORS.BLACK }}
              >
                <Twemoji hex="2705" size={20} />
                <span>The constant stress and anxiety around every meal</span>
              </p>
            </div>

            <p
              className="font-merriweather text-base lg:text-lg leading-relaxed"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              Watching her navigate these challenges every day made me realize
              how difficult it is for millions of people with food allergies to
              simply enjoy a meal.
            </p>
          </motion.div>

          {/* Placeholder Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center justify-center"
          >
            <Image
              src="/assets/PersonalStory.jpg"
              alt="Family photo representing food allergy awareness"
              width={1628}
              height={1025}
              className="w-full h-[300px] lg:h-[400px] object-cover rounded-2xl"
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
