"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full min-h-[60vh] flex items-center justify-center px-8 py-24"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h1
            className="font-merriweather text-4xl lg:text-6xl font-regular leading-tight mb-6"
            style={{ color: COLORS.BLACK }}
          >
            Why Dine Exists
          </h1>
        </motion.div>

        <motion.div
          variants={{
            ...fadeInUp,
            visible: {
              ...fadeInUp.visible,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p
            className="font-merriweather text-lg lg:text-2xl leading-relaxed"
            style={{ color: COLORS.GRAY }}
          >
            A personal journey to make dining safer and easier for everyone with
            food allergies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
