"use client";

import { COLORS } from "@/constants/colors";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

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
            <ul className="space-y-2">
              <li>
                <Link
                  href="/team"
                  className="font-merriweather text-sm hover:opacity-70 transition-opacity"
                  style={{ color: COLORS.BLACK }}
                >
                  About Dine
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="font-merriweather text-sm hover:opacity-70 transition-opacity"
                  style={{ color: COLORS.BLACK }}
                >
                  Features
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
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="font-merriweather text-sm hover:opacity-70 transition-opacity"
                  style={{ color: COLORS.BLACK }}
                >
                  Blog
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
                style={{ height: 32, width: 32 }}
                bgColor={PRIMARY_BLUE}
                aria-label="LinkedIn"
              />
              <SocialIcon
                url="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: 32, width: 32 }}
                bgColor={PRIMARY_BLUE}
                aria-label="Facebook"
              />
              <SocialIcon
                url="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: 32, width: 32 }}
                bgColor={PRIMARY_BLUE}
                aria-label="YouTube"
              />
              <SocialIcon
                url="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: 32, width: 32 }}
                bgColor={PRIMARY_BLUE}
                aria-label="Instagram"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
