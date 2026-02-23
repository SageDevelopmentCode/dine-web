"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { COLORS } from "@/constants/colors";

export default function HeroSection() {
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

  const imagesVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full h-[85vh] md:h-[90vh] flex flex-col items-center justify-start overflow-hidden pt-12 md:pt-16"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-8 mb-6">
        {/* Logo */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <Image
            src="/assets/Logo.png"
            alt="Dine Logo"
            width={120}
            height={120}
            priority
            className="object-contain"
            quality={100}
            unoptimized={true}
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          variants={{
            ...fadeInUp,
            visible: {
              ...fadeInUp.visible,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                delay: 0.1,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h1
            className="font-merriweather text-4xl lg:text-6xl font-regular leading-tight mb-6"
            style={{ color: COLORS.BLACK }}
          >
            Why{" "}
            <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>Dine</span>{" "}
            Exists
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={{
            ...fadeInUp,
            visible: {
              ...fadeInUp.visible,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                delay: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p
            className="font-merriweather text-base lg:text-lg leading-relaxed"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            My name is{" "}
            <a
              href="https://www.juliuscecilia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-merriweather text-base lg:text-lg leading-relaxed underline hover:opacity-70 transition-opacity"
              style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}
            >
              Julius
            </a>{" "}
            and I built{" "}
            <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>Dine</span> to
            help people with food allergies share their allergies with others in
            a simple and easy way.
          </p>
        </motion.div>
      </div>

      {/* Images Container - Side by Side */}
      <motion.div
        className="flex items-end justify-center gap-4 md:gap-8 flex-1 w-full max-w-6xl px-4 -mb-[120px] md:-mb-[50px]"
        variants={imagesVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Web Image */}
        <div className="relative h-full items-end hidden md:flex md:w-auto">
          <Image
            src="/assets/Screens/Web.png"
            alt="Dine web profile showing allergy information and cards"
            width={600}
            height={700}
            className="h-[500px] w-auto object-contain"
            loading="lazy"
            quality={100}
            unoptimized={true}
          />
        </div>

        {/* Mobile Image */}
        <div className="relative h-full flex items-end w-full md:w-auto justify-center md:justify-start">
          <Image
            src="/assets/Screens/Mobile.png"
            alt="Dine mobile app showing allergy cards"
            width={350}
            height={700}
            className="h-full md:h-[500px] w-auto max-w-[250px] md:max-w-[350px] object-contain"
            loading="lazy"
            quality={100}
            unoptimized={true}
          />
        </div>
      </motion.div>
    </section>
  );
}
