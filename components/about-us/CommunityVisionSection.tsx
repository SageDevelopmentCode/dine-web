"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

export default function CommunityVisionSection() {
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

  const cardVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
  });

  return (
    <section
      ref={ref}
      className="w-full px-8 py-24"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2
            className="font-merriweather text-3xl lg:text-5xl font-regular leading-tight mb-6"
            style={{ color: COLORS.BLACK }}
          >
            Building a Community
          </h2>
          <p
            className="font-merriweather text-base lg:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: COLORS.GRAY }}
          >
            Dine is more than just an app—it's a platform for people with food
            allergies to connect, share, and support each other.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Share Experiences */}
          <motion.div
            variants={cardVariants(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="rounded-2xl p-6 space-y-4"
            style={{ backgroundColor: COLORS.WHITE }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: COLORS.FOOD_ALLERGIES_BG }}
            >
              <Twemoji hex="1f4ac" size={32} />
            </div>
            <h3
              className="font-merriweather text-xl font-semibold"
              style={{ color: COLORS.BLACK }}
            >
              Share Your Experiences
            </h3>
            <p
              className="font-merriweather text-base leading-relaxed"
              style={{ color: COLORS.GRAY }}
            >
              Connect with others who understand your journey. Share your stories,
              challenges, and victories with a supportive community.
            </p>
          </motion.div>

          {/* Card 2: Discover & Share Recipes */}
          <motion.div
            variants={cardVariants(0.2)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="rounded-2xl p-6 space-y-4"
            style={{ backgroundColor: COLORS.WHITE }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: COLORS.EMERGENCY_MEDICAL_BG }}
            >
              <Twemoji hex="1f37d" size={32} />
            </div>
            <h3
              className="font-merriweather text-xl font-semibold"
              style={{ color: COLORS.BLACK }}
            >
              Discover & Share Recipes
            </h3>
            <p
              className="font-merriweather text-base leading-relaxed"
              style={{ color: COLORS.GRAY }}
            >
              Exchange safe recipes, cooking methods, and foods you've tried. Help
              others discover delicious options that work for their restrictions.
            </p>
          </motion.div>

          {/* Card 3: Rate Safe Restaurants */}
          <motion.div
            variants={cardVariants(0.3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="rounded-2xl p-6 space-y-4"
            style={{ backgroundColor: COLORS.WHITE }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: COLORS.RESTAURANT_DISCOVERY_BG }}
            >
              <Twemoji hex="2b50" size={32} />
            </div>
            <h3
              className="font-merriweather text-xl font-semibold"
              style={{ color: COLORS.BLACK }}
            >
              Rate Safe Restaurants
            </h3>
            <p
              className="font-merriweather text-base leading-relaxed"
              style={{ color: COLORS.GRAY }}
            >
              Help build a trusted database of allergy-aware restaurants. Vote,
              comment, and rate establishments based on your experiences.
            </p>
          </motion.div>
        </div>

        {/* Bottom Content */}
        <motion.div
          variants={cardVariants(0.4)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <div
            className="rounded-2xl p-8 lg:p-12"
            style={{ backgroundColor: COLORS.WHITE }}
          >
            <h3
              className="font-merriweather text-2xl lg:text-3xl font-semibold mb-6"
              style={{ color: COLORS.BLACK }}
            >
              For Restaurants & Stores
            </h3>
            <p
              className="font-merriweather text-base lg:text-lg leading-relaxed mb-4"
              style={{ color: COLORS.GRAY }}
            >
              Dine also provides restaurants and stores with a platform to promote
              their allergy-awareness and commitment to safe dining experiences.
            </p>
            <p
              className="font-merriweather text-base lg:text-lg leading-relaxed"
              style={{ color: COLORS.GRAY }}
            >
              By joining the community, establishments can showcase their
              practices, earn trust through transparent ratings and reviews, and
              connect with a loyal customer base that values safety and
              inclusivity.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
