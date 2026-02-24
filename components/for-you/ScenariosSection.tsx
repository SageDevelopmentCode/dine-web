"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

interface Scenario {
  emoji: string;
  title: string;
  description: string;
}

const scenarios: Scenario[] = [
  {
    emoji: "1f374",
    title: "Trying New Restaurants",
    description:
      "Walk into any restaurant with confidence, knowing your allergies are clearly communicated without awkward explanations.",
  },
  {
    emoji: "1f389",
    title: "Your Child's First Sleepover",
    description:
      "Send your child to sleepovers and parties knowing the host has all the information they need to keep them safe.",
  },
  {
    emoji: "2708-fe0f",
    title: "Traveling Abroad",
    description:
      "Explore the world without language barriers—your allergies automatically translated into 50+ languages.",
  },
  {
    emoji: "1f691",
    title: "Emergency Situations",
    description:
      "Give first responders and friends instant access to your critical medical information when you can't speak.",
  },
  {
    emoji: "1f3eb",
    title: "School & Teachers",
    description:
      "Ensure teachers understand your child's allergies with safe snack lists and emergency action plans—no constant reminders needed.",
  },
  {
    emoji: "1f4f1",
    title: "Ordering Takeout",
    description:
      "Order delivery or pickup with ease, sharing your dietary restrictions clearly with restaurant staff.",
  },
];

export default function ScenariosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="w-full py-20 md:py-28 px-8"
      style={{ backgroundColor: COLORS.WHITE }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-merriweather text-3xl md:text-4xl lg:text-5xl font-regular leading-tight mb-4"
            style={{ color: COLORS.BLACK }}
          >
            When{" "}
            <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>Dine</span> is
            for you
          </h2>
          <p
            className="font-merriweather text-base lg:text-lg max-w-2xl mx-auto"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            Every situation becomes simpler and safer when your allergies are
            clearly communicated
          </p>
        </motion.div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={index}
              className="p-6 lg:p-8 rounded-2xl"
              style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={index}
            >
              <div className="mb-4">
                <Twemoji hex={scenario.emoji} size={40} />
              </div>
              <h3
                className="font-merriweather text-xl lg:text-2xl font-regular mb-3"
                style={{ color: COLORS.BLACK }}
              >
                {scenario.title}
              </h3>
              <p
                className="font-merriweather text-sm lg:text-base leading-relaxed"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                {scenario.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
