import React, { CSSProperties } from "react";
import Image from "next/image";

// Import emoji assets from public/assets/emojis
// Note: Add PNG files to public/assets/emojis/ with hex code filenames (e.g., 1f95c.png)
const emojiAssets: { [key: string]: string } = {
  // Major allergen emojis
  "1f95c": "/assets/emojis/1f95c.png", // 🥜 peanuts
  "1f330": "/assets/emojis/1f330.png", // 🌰 tree nuts
  "1f95b": "/assets/emojis/1f95b.png", // 🥛 dairy (milk)
  "1f95a": "/assets/emojis/1f95a.png", // 🥚 eggs
  "1f41f": "/assets/emojis/1f41f.png", // 🐟 fish
  "1f990": "/assets/emojis/1f990.png", // 🦐 shellfish
  "1f33e": "/assets/emojis/1f33e.png", // 🌾 wheat/gluten
  "1f331": "/assets/emojis/1f331.png", // 🌱 soy (seedling)
  "1f33b": "/assets/emojis/1f33b.png", // 🌻 sesame

  // Essential UI/Utility icons
  "2705": "/assets/emojis/2705.png", // ✅ check mark (green)
  "274c": "/assets/emojis/274c.png", // ❌ cross mark (red)
  "26a0": "/assets/emojis/26a0.png", // ⚠️ warning
  "1f514": "/assets/emojis/1f514.png", // 🔔 bell (notification)
  "1f4c6": "/assets/emojis/1f4c6.png", // 📆 calendar
  "2b50": "/assets/emojis/2b50.png", // ⭐ star
  "1f4a1": "/assets/emojis/1f4a1.png", // 💡 lightbulb (tip)
  "1f389": "/assets/emojis/1f389.png", // 🎉 party/celebration
  "1f512": "/assets/emojis/1f512.png", // 🔒 lock
  "1f440": "/assets/emojis/1f440.png", // 👀 eyes

  // Add more emojis as needed...
  // To add a new emoji:
  // 1. Download the PNG from https://github.com/twitter/twemoji
  // 2. Save to public/assets/emojis/ with hex code filename (e.g., 1f600.png)
  // 3. Add mapping here: "1f600": "/assets/emojis/1f600.png", // 😀 description
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
