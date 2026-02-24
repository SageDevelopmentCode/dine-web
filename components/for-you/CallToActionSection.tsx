"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { COLORS } from "@/constants/colors";

export default function CallToActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full px-8 py-24"
      style={{ backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          <h2
            className="font-merriweather text-3xl lg:text-5xl font-regular leading-tight"
            style={{ color: COLORS.WHITE }}
          >
            Ready to take control?
          </h2>

          <p
            className="font-merriweather text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: COLORS.WHITE }}
          >
            Join thousands managing their food allergies with confidence. Stop
            explaining, start sharing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              className="font-merriweather text-base lg:text-lg px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: COLORS.WHITE,
                color: COLORS.DOWNLOAD_SECTION_BLUE,
              }}
            >
              Download Dine
              <ChevronRight size={20} />
            </button>

            <a
              href="/about-us"
              className="font-merriweather text-base lg:text-lg px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity border-2"
              style={{
                backgroundColor: "transparent",
                color: COLORS.WHITE,
                borderColor: COLORS.WHITE,
              }}
            >
              Learn More About Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
