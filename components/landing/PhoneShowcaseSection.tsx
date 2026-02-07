"use client";

import Image from "next/image";
import FeatureCard from "@/components/landing/FeatureCard";
import { LANDING_FEATURES } from "@/constants/landing-features";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PhoneShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants for phone image
  const phoneVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col"
    >
      <div className="relative flex items-center justify-center w-full">
        {/* Left Cards Group */}
        <div className="hidden md:flex absolute left-[-13%] bottom-[5%] flex-row gap-4 z-10">
          {LANDING_FEATURES.left.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              backgroundColor={feature.backgroundColor}
              buttonColor={feature.buttonColor}
              iconSrc={feature.iconSrc}
              iconAlt={feature.iconAlt}
              animationDelay={feature.animationDelay}
              position="left"
            />
          ))}
        </div>

        {/* Center Phone Image */}
        <motion.div
          className="relative z-20 -mb-10"
          variants={phoneVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Image
            src="/assets/Screens/Home.png"
            alt="Dine App Home Screen"
            width={432}
            height={689}
            priority
            quality={100}
            unoptimized={true}
            className="object-contain w-[270px] h-auto"
          />
        </motion.div>

        {/* Right Cards Group */}
        <div className="hidden md:flex absolute right-[-13%] bottom-[5%] flex-row gap-4 z-10">
          {LANDING_FEATURES.right.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              backgroundColor={feature.backgroundColor}
              buttonColor={feature.buttonColor}
              iconSrc={feature.iconSrc}
              iconAlt={feature.iconAlt}
              animationDelay={feature.animationDelay}
              position="right"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
