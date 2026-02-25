"use client";

import { COLORS } from "@/constants/colors";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const PRIMARY_BLUE = "#65A9F2";

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={footerVariants as Variants}
      className="w-full px-6 py-16 md:px-12 lg:px-16"
      style={{ backgroundColor: COLORS.WHITE }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Logo Section */}
          <div className="flex items-start">
            <Image
              src="/assets/Logo.png"
              alt="Dine by SageField Logo"
              width={150}
              height={60}
              priority
              unoptimized={true}
              className="object-contain"
            />
          </div>

          {/* About Us Section */}
          <div>
            <h3
              className="font-merriweather text-base font-bold mb-4"
              style={{ color: COLORS.BLACK }}
            >
              About us
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="font-merriweather text-sm hover:opacity-70 transition-opacity flex items-center py-1 gap-0.5 cursor-pointer"
                  style={{ color: COLORS.BLACK }}
                >
                  <span>About Dine</span>
                  <ChevronRight
                    size={18}
                    style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/for-you"
                  className="font-merriweather text-sm hover:opacity-70 transition-opacity flex items-center py-1 gap-0.5 cursor-pointer"
                  style={{ color: COLORS.BLACK }}
                >
                  <span>For you</span>
                  <ChevronRight
                    size={18}
                    style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/for-restaurants"
                  className="font-merriweather text-sm hover:opacity-70 transition-opacity flex items-center py-1 gap-0.5 cursor-pointer"
                  style={{ color: COLORS.BLACK }}
                >
                  <span>For Restaurants</span>
                  <ChevronRight
                    size={18}
                    style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3
              className="font-merriweather text-base font-bold mb-4"
              style={{ color: COLORS.BLACK }}
            >
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="font-merriweather text-sm hover:opacity-70 transition-opacity flex items-center py-1 gap-0.5 cursor-pointer"
                  style={{ color: COLORS.BLACK }}
                >
                  <span>Blog</span>
                  <ChevronRight
                    size={18}
                    style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h3
              className="font-merriweather text-base font-bold mb-4"
              style={{ color: COLORS.BLACK }}
            >
              Get in touch
            </h3>
            <div className="space-y-2 mb-4">
              <p
                className="font-merriweather text-sm"
                style={{ color: COLORS.BLACK }}
              >
                Questions or feedback?
              </p>
              <p
                className="font-merriweather text-sm"
                style={{ color: COLORS.BLACK }}
              >
                We&apos;d love to hear from you
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-4">
              <SocialIcon
                url="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: 44, width: 44 }}
                bgColor={PRIMARY_BLUE}
                aria-label="LinkedIn"
                className="transition-transform hover:scale-110 cursor-pointer"
              />
              <SocialIcon
                url="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: 44, width: 44 }}
                bgColor={PRIMARY_BLUE}
                aria-label="Facebook"
                className="transition-transform hover:scale-110 cursor-pointer"
              />
              <SocialIcon
                url="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: 44, width: 44 }}
                bgColor={PRIMARY_BLUE}
                aria-label="YouTube"
                className="transition-transform hover:scale-110 cursor-pointer"
              />
              <SocialIcon
                url="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: 44, width: 44 }}
                bgColor={PRIMARY_BLUE}
                aria-label="Instagram"
                className="transition-transform hover:scale-110 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
