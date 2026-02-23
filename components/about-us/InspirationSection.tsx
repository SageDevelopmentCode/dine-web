"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";

export default function InspirationSection() {
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
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Placeholder Image - Reversed order on desktop */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center justify-center order-2 lg:order-1"
          >
            <div
              className="w-full h-[400px] lg:h-[500px] rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: COLORS.WHITE }}
            >
              <p
                className="font-merriweather text-lg text-center px-8"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                [Placeholder: UW Informatics article or University of Washington
                campus scene]
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 order-1 lg:order-2"
          >
            <h2
              className="font-merriweather text-3xl lg:text-5xl font-regular leading-tight"
              style={{ color: COLORS.BLACK }}
            >
              The Turning Point
            </h2>

            <p
              className="font-merriweather text-base lg:text-lg leading-relaxed"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              In 2020, during my college days at the University of Washington,
              an article was written about my sister and her journey with food
              allergies by the UW Informatics department.
            </p>

            <div
              className="rounded-2xl p-6 space-y-4"
              style={{ backgroundColor: COLORS.WHITE }}
            >
              <p
                className="font-merriweather text-base leading-relaxed"
                style={{ color: COLORS.BLACK }}
              >
                That article sparked something in me. As a software engineering
                student, I realized I could use technology to solve the problems
                my sister and millions of others face every day.
              </p>
              <p
                className="font-merriweather text-base leading-relaxed"
                style={{ color: COLORS.BLACK }}
              >
                I began learning to code, driven by a mission to create
                something meaningful.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="text-center">
                <p
                  className="font-merriweather text-4xl lg:text-5xl font-semibold"
                  style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}
                >
                  2020
                </p>
                <p
                  className="font-merriweather text-sm lg:text-base"
                  style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
                >
                  Started Learning
                </p>
              </div>
              <div
                className="h-1 flex-1 rounded"
                style={{ backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE }}
              />
              <div className="text-center">
                <p
                  className="font-merriweather text-4xl lg:text-5xl font-semibold"
                  style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}
                >
                  2025
                </p>
                <p
                  className="font-merriweather text-sm lg:text-base"
                  style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
                >
                  Building Dine
                </p>
              </div>
            </div>

            <p
              className="font-merriweather text-base lg:text-lg leading-relaxed"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              Five years of learning, building, and refining led to Dine—an app
              designed to eliminate the miscommunication that puts lives at
              risk.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
