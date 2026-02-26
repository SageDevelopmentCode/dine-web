"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/constants/colors";

export default function PartnershipFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    restaurantName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form doesn't submit yet - placeholder for future functionality
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="partnership-form"
      ref={ref}
      className="w-full px-8 py-24"
      style={{ backgroundColor: COLORS.LANDING_PAGE_BACKGROUND }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Heading */}
          <div className="text-center space-y-4">
            <h2
              className="font-merriweather text-3xl lg:text-5xl font-regular leading-tight"
              style={{ color: COLORS.BLACK }}
            >
              Ready to{" "}
              <span style={{ color: COLORS.DOWNLOAD_SECTION_BLUE }}>
                partner
              </span>{" "}
              with us?
            </h2>

            <p
              className="font-merriweather text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              Join the growing network of allergy-safe restaurants. Fill out the
              form below and we&apos;ll be in touch soon.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-8 lg:p-10 rounded-2xl space-y-6"
            style={{ backgroundColor: COLORS.WHITE }}
          >
            {/* Restaurant Name */}
            <div>
              <label
                htmlFor="restaurantName"
                className="font-merriweather text-sm font-bold mb-2 block"
                style={{ color: COLORS.BLACK }}
              >
                Restaurant Name *
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl font-merriweather text-base border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                style={{
                  borderColor: COLORS.SECONDARY_TEXT_GRAY,
                  color: COLORS.BLACK,
                }}
                placeholder="Your restaurant name"
              />
            </div>

            {/* Contact Name */}
            <div>
              <label
                htmlFor="contactName"
                className="font-merriweather text-sm font-bold mb-2 block"
                style={{ color: COLORS.BLACK }}
              >
                Contact Name *
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl font-merriweather text-base border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                style={{
                  borderColor: COLORS.SECONDARY_TEXT_GRAY,
                  color: COLORS.BLACK,
                }}
                placeholder="Your full name"
              />
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="font-merriweather text-sm font-bold mb-2 block"
                  style={{ color: COLORS.BLACK }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl font-merriweather text-base border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    borderColor: COLORS.SECONDARY_TEXT_GRAY,
                    color: COLORS.BLACK,
                  }}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="font-merriweather text-sm font-bold mb-2 block"
                  style={{ color: COLORS.BLACK }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl font-merriweather text-base border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    borderColor: COLORS.SECONDARY_TEXT_GRAY,
                    color: COLORS.BLACK,
                  }}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="font-merriweather text-sm font-bold mb-2 block"
                style={{ color: COLORS.BLACK }}
              >
                Restaurant Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl font-merriweather text-base border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                style={{
                  borderColor: COLORS.SECONDARY_TEXT_GRAY,
                  color: COLORS.BLACK,
                }}
                placeholder="City, State"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="font-merriweather text-sm font-bold mb-2 block"
                style={{ color: COLORS.BLACK }}
              >
                Tell us about your restaurant
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-xl font-merriweather text-base border-2 focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                style={{
                  borderColor: COLORS.SECONDARY_TEXT_GRAY,
                  color: COLORS.BLACK,
                }}
                placeholder="Tell us about your current allergy safety practices, what you hope to achieve by partnering with Dine, or any questions you have..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full font-merriweather text-base lg:text-lg px-6 py-4 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              style={{
                backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
                color: COLORS.WHITE,
              }}
            >
              Submit Partnership Request
            </button>

            {/* Disclaimer */}
            <p
              className="text-xs text-center font-merriweather"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              By submitting this form, you agree to be contacted by Dine
              regarding partnership opportunities.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
