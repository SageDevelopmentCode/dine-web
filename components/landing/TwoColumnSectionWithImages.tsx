"use client";

import Image from "next/image";
import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  zIndex: number;
  top: string;
  left?: string;
  right?: string;
  transform: string;
  heightClass: string;
  widthClass: string;
}

interface TwoColumnSectionWithImagesProps {
  heading: {
    text: string;
    highlightedWord?: {
      word: string;
      color: string;
    };
  };
  subtitle: string;
  contentBox: {
    text: string;
    backgroundColor?: string;
  };
  checklist: string[];
  imageBackgroundColor: string;
  images: ImageConfig[];
  invertLayout?: boolean; // false = content left, images right; true = images left, content right
}

export default function TwoColumnSectionWithImages({
  heading,
  subtitle,
  contentBox,
  checklist,
  imageBackgroundColor,
  images,
  invertLayout = false,
}: TwoColumnSectionWithImagesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants for content
  const contentVariants = {
    hidden: {
      opacity: 0,
      x: invertLayout ? 50 : -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  // Animation variants for images
  const imagesVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  // Split heading text to identify highlighted word
  const renderHeading = () => {
    if (!heading.highlightedWord) {
      return heading.text;
    }

    const parts = heading.text.split(heading.highlightedWord.word);
    return (
      <>
        {parts[0]}
        <span style={{ color: heading.highlightedWord.color }}>
          {heading.highlightedWord.word}
        </span>
        {parts[1]}
      </>
    );
  };

  // Content column
  const contentColumn = (
    <motion.div
      className="flex flex-col gap-6 py-24 px-8 lg:px-16 max-w-3xl lg:max-w-none lg:pr-12"
      variants={contentVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Heading */}
      <div className="max-w-md">
        <h2
          className="font-merriweather text-xl md:text-2xl lg:text-3xl font-regular leading-tight max-w-sm mb-2"
          style={{ color: COLORS.BLACK }}
        >
          {renderHeading()}
        </h2>

        {/* Subtitle */}
        <p
          className="font-merriweather text-sm md:text-base"
          style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
        >
          {subtitle}
        </p>
      </div>

      {/* Content Box */}
      <div
        className="rounded-2xl p-4 md:p-6"
        style={{ backgroundColor: contentBox.backgroundColor || "#F6F5F3" }}
      >
        <p
          className="font-merriweather text-xs md:text-sm leading-relaxed"
          style={{ color: COLORS.BLACK }}
        >
          {contentBox.text}
        </p>
      </div>

      {/* Checklist */}
      <div className="flex flex-col gap-3">
        {checklist.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <Twemoji
              hex="2705"
              size={20}
              className="shrink-0 mt-0.5"
              alt="checkmark"
            />
            <span
              className="font-merriweather text-xs md:text-sm"
              style={{ color: COLORS.BLACK }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Images column
  const imagesColumn = (
    <motion.div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: imageBackgroundColor }}
      variants={imagesVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            quality={100}
            unoptimized={true}
            loading="lazy"
            className={`absolute ${image.heightClass} ${image.widthClass} object-contain`}
            style={{
              transform: image.transform,
              top: image.top,
              left: image.left,
              right: image.right,
              zIndex: image.zIndex,
            }}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <section ref={ref} className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[50vh]">
        {invertLayout ? (
          <>
            {imagesColumn}
            {contentColumn}
          </>
        ) : (
          <>
            {contentColumn}
            {imagesColumn}
          </>
        )}
      </div>
    </section>
  );
}
