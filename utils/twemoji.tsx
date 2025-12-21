import React, { CSSProperties } from "react";
import Image from "next/image";

// Import emoji assets from public/assets/emojis
// Note: Add PNG files to public/assets/emojis/ with hex code filenames (e.g., 1f95c.png)
const emojiAssets: { [key: string]: string } = {
  // Major allergen emojis
  "1f4de": "/assets/emojis/1f4de.png", // 📞 telephone
  "2705": "/assets/emojis/2705.png", // ✅ checkmark
};

interface TwemojiProps {
  /** The hex code of the emoji (e.g., "1f642" for 🙂) */
  hex: string;
  /** Size of the emoji image in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Alt text for accessibility */
  alt?: string;
}

/**
 * Twemoji component for rendering emoji images from hex codes in Next.js
 *
 * @param hex - The hex code of the emoji (e.g., "1f642" for 🙂)
 * @param size - The size of the emoji in pixels (defaults to 24)
 * @param className - Additional CSS classes to apply
 * @param style - Additional inline styles
 * @param alt - Alt text for the image (defaults to "emoji")
 *
 * @example
 * ```tsx
 * <Twemoji hex="1f95c" size={32} /> // Renders 🥜 peanuts emoji
 * <Twemoji hex="2705" size={20} className="inline" /> // Renders ✅ checkmark
 * ```
 */
export const Twemoji: React.FC<TwemojiProps> = ({
  hex,
  size = 24,
  className,
  style,
  alt = "emoji",
}) => {
  // Get the emoji asset path, fallback to peanuts emoji if not found
  const src = emojiAssets[hex.toLowerCase()] || emojiAssets["1f95c"];

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        ...style,
      }}
      unoptimized // Set to true if emojis are static assets
    />
  );
};

/**
 * Helper function to convert Unicode emoji to hex code
 *
 * @param emoji - A Unicode emoji character (e.g., "🙂")
 * @returns The hex code of the emoji (e.g., "1f642")
 *
 * @example
 * ```tsx
 * unicodeToHex("🥜") // Returns "1f95c"
 * unicodeToHex("✅") // Returns "2705"
 * ```
 */
export const unicodeToHex = (emoji: string): string => {
  const codePoint = emoji.codePointAt(0);
  return codePoint ? codePoint.toString(16).toLowerCase() : "1f642";
};

/**
 * Helper function to check if an emoji hex code is available in our asset library
 *
 * @param hex - The hex code to check
 * @returns True if the emoji is available, false otherwise
 *
 * @example
 * ```tsx
 * isEmojiAvailable("1f95c") // Returns true (peanuts emoji is available)
 * isEmojiAvailable("1f999") // Returns false (not in our library)
 * ```
 */
export const isEmojiAvailable = (hex: string): boolean => {
  return hex.toLowerCase() in emojiAssets;
};

/**
 * Get all available emoji hex codes
 *
 * @returns Array of all emoji hex codes in the library
 */
export const getAvailableEmojis = (): string[] => {
  return Object.keys(emojiAssets);
};

/**
 * Get the asset path for an emoji hex code
 *
 * @param hex - The hex code of the emoji
 * @returns The asset path, or null if not found
 */
export const getEmojiPath = (hex: string): string | null => {
  return emojiAssets[hex.toLowerCase()] || null;
};

export default Twemoji;
