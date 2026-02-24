"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

const outcomes = [
  "You feel safe walking into any restaurant",
  "Your friends know exactly how to help in emergencies",
  "Teachers are fully aware without constant reminders",
  "Travel doesn't mean bringing stacks of paper cards",
  "You're confident, not anxious, about meals out",
  "Your child can attend events without worry",
];

export default function OutcomesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const checklistItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2 + i * 0.1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="w-full py-20 md:py-28 px-8"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Heading */}
          <div className="text-center mb-12">
            <h2
              className="font-merriweather text-3xl md:text-4xl lg:text-5xl font-regular leading-tight mb-4"
              style={{ color: COLORS.BLACK }}
            >
              Imagine a life where...
            </h2>
            <p
              className="font-merriweather text-base lg:text-lg max-w-2xl mx-auto"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              This is what life with{" "}
              <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>
                Dine
              </span>{" "}
              looks like
            </p>
          </div>

          {/* Outcomes Content Box */}
          <div
            className="rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
            style={{ backgroundColor: COLORS.WHITE }}
          >
            <div className="flex flex-col gap-5">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  variants={checklistItemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={index}
                >
                  <Twemoji
                    hex="2705"
                    size={24}
                    className="shrink-0 mt-1"
                    alt="checkmark"
                  />
                  <span
                    className="font-merriweather text-base md:text-lg leading-relaxed"
                    style={{ color: COLORS.BLACK }}
                  >
                    {outcome}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
