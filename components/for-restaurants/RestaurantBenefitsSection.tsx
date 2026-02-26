"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

interface Benefit {
  emoji: string;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    emoji: "2705",
    title: "Safety Certification Badge",
    description:
      "Earn a verified badge that shows your commitment to food allergy safety protocols, building immediate trust with allergy-conscious customers.",
  },
  {
    emoji: "2b50",
    title: "Reviews & Ratings",
    description:
      "Receive detailed reviews from the allergy community highlighting your safety practices, menu accommodations, and staff knowledge.",
  },
  {
    emoji: "1f4cd",
    title: "Featured Discovery",
    description:
      "Get discovered by allergy-conscious diners searching for safe restaurants in your area through our dedicated restaurant discovery feature.",
  },
  {
    emoji: "2764",
    title: "Favorites & Bookmarks",
    description:
      "Build a loyal customer base as users save and favorite your restaurant for their go-to safe dining destinations.",
  },
  {
    emoji: "1f4ca",
    title: "Customer Insights",
    description:
      "Access valuable data about allergy trends, common dietary restrictions, and customer preferences to better serve your community.",
  },
  {
    emoji: "1f4e3",
    title: "Free Marketing Exposure",
    description:
      "Reach thousands of allergy-aware customers through our app, social features, and community engagement—at no advertising cost.",
  },
  {
    emoji: "1f4ac",
    title: "Community Engagement",
    description:
      "Connect with customers through comments, posts, and direct communication about your allergy-safe menu items and practices.",
  },
  {
    emoji: "1f680",
    title: "Competitive Advantage",
    description:
      "Stand out as an early adopter in food allergy safety, positioning your restaurant as a leader in inclusive, safe dining experiences.",
  },
];

export default function RestaurantBenefitsSection() {
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
            Benefits for{" "}
            <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>
              your restaurant
            </span>
          </h2>
          <p
            className="font-merriweather text-base lg:text-lg max-w-2xl mx-auto"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            Join a growing network of allergy-safe restaurants and unlock
            powerful tools to grow your business
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
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
                <Twemoji hex={benefit.emoji} size={40} />
              </div>
              <h3
                className="font-merriweather text-xl lg:text-2xl font-regular mb-3"
                style={{ color: COLORS.BLACK }}
              >
                {benefit.title}
              </h3>
              <p
                className="font-merriweather text-sm lg:text-base leading-relaxed"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
