"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

export default function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full px-8 py-24"
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
              Our Mission
            </h2>

            <p
              className="font-merriweather text-base lg:text-lg leading-relaxed"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              The goal of Dine is simple but ambitious:{" "}
              <span
                className="font-semibold"
                style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}
              >
                eliminate verbal miscommunication
              </span>{" "}
              between people with food allergies and chefs, waiters, and others
              in the food industry.
            </p>

            <div
              className="rounded-2xl p-6 space-y-4"
              style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
            >
              <h3
                className="font-merriweather text-xl font-semibold"
                style={{ color: COLORS.BLACK }}
              >
                We want to help people with food allergies:
              </h3>
              <p
                className="font-merriweather text-base leading-relaxed flex items-start gap-3"
                style={{ color: COLORS.BLACK }}
              >
                <Twemoji hex="2705" size={20} />
                <span>
                  Feel safer and more confident ordering food at restaurants
                </span>
              </p>
              <p
                className="font-merriweather text-base leading-relaxed flex items-start gap-3"
                style={{ color: COLORS.BLACK }}
              >
                <Twemoji hex="2705" size={20} />
                <span>
                  Navigate school events, work gatherings, and social occasions
                  without fear
                </span>
              </p>
              <p
                className="font-merriweather text-base leading-relaxed flex items-start gap-3"
                style={{ color: COLORS.BLACK }}
              >
                <Twemoji hex="2705" size={20} />
                <span>
                  Travel internationally with confidence, breaking down language
                  barriers
                </span>
              </p>
              <p
                className="font-merriweather text-base leading-relaxed flex items-start gap-3"
                style={{ color: COLORS.BLACK }}
              >
                <Twemoji hex="2705" size={20} />
                <span>
                  Clearly communicate their dietary restrictions without
                  misunderstanding
                </span>
              </p>
            </div>

            <p
              className="font-merriweather text-base lg:text-lg leading-relaxed"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              No one should have to risk their health just to enjoy a meal. Dine
              is here to change that.
            </p>
          </motion.div>

          {/* Placeholder Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center justify-center"
          >
            <div
              className="w-full h-[400px] lg:h-[500px] rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
            >
              <p
                className="font-merriweather text-lg text-center px-8"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                [Placeholder: App interface showing allergy communication
                feature or mobile mockup]
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
