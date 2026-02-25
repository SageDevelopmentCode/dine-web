import React, { CSSProperties } from "react";
import Image from "next/image";

// Import emoji assets from public/assets/emojis
// Note: Add PNG files to public/assets/emojis/ with hex code filenames (e.g., 1f95c.png)
const emojiAssets: { [key: string]: string } = {
  // Flag emojis
  "1f1e7-1f1e9": "/assets/emojis/1f1e7-1f1e9.png", // 🇧🇩 Bangladesh
  "1f1e7-1f1f7": "/assets/emojis/1f1e7-1f1f7.png", // 🇧🇷 Brazil
  "1f1e8-1f1f3": "/assets/emojis/1f1e8-1f1f3.png", // 🇨🇳 China
  "1f1e8-1f1ff": "/assets/emojis/1f1e8-1f1ff.png", // 🇨🇿 Czechia
  "1f1e9-1f1ea": "/assets/emojis/1f1e9-1f1ea.png", // 🇩🇪 Germany
  "1f1ea-1f1f8": "/assets/emojis/1f1ea-1f1f8.png", // 🇪🇸 Spain
  "1f1eb-1f1ee": "/assets/emojis/1f1eb-1f1ee.png", // 🇫🇮 Finland
  "1f1eb-1f1f7": "/assets/emojis/1f1eb-1f1f7.png", // 🇫🇷 France
  "1f1ec-1f1e7": "/assets/emojis/1f1ec-1f1e7.png", // 🇬🇧 United Kingdom
  "1f1ec-1f1f7": "/assets/emojis/1f1ec-1f1f7.png", // 🇬🇷 Greece
  "1f1ed-1f1f0": "/assets/emojis/1f1ed-1f1f0.png", // 🇭🇰 Hong Kong
  "1f1ee-1f1e9": "/assets/emojis/1f1ee-1f1e9.png", // 🇮🇩 Indonesia
  "1f1ee-1f1f1": "/assets/emojis/1f1ee-1f1f1.png", // 🇮🇱 Israel
  "1f1ee-1f1f3": "/assets/emojis/1f1ee-1f1f3.png", // 🇮🇳 India
  "1f1ee-1f1f7": "/assets/emojis/1f1ee-1f1f7.png", // 🇮🇷 Iran
  "1f1ee-1f1f9": "/assets/emojis/1f1ee-1f1f9.png", // 🇮🇹 Italy
  "1f1ef-1f1f5": "/assets/emojis/1f1ef-1f1f5.png", // 🇯🇵 Japan
  "1f1f0-1f1f7": "/assets/emojis/1f1f0-1f1f7.png", // 🇰🇷 South Korea
  "1f1f2-1f1fd": "/assets/emojis/1f1f2-1f1fd.png", // 🇲🇽 Mexico
  "1f1f3-1f1f1": "/assets/emojis/1f1f3-1f1f1.png", // 🇳🇱 Netherlands
  "1f1f3-1f1f4": "/assets/emojis/1f1f3-1f1f4.png", // 🇳🇴 Norway
  "1f1f5-1f1ed": "/assets/emojis/1f1f5-1f1ed.png", // 🇵🇭 Philippines
  "1f1f5-1f1f0": "/assets/emojis/1f1f5-1f1f0.png", // 🇵🇰 Pakistan
  "1f1f5-1f1f1": "/assets/emojis/1f1f5-1f1f1.png", // 🇵🇱 Poland
  "1f1f5-1f1f9": "/assets/emojis/1f1f5-1f1f9.png", // 🇵🇹 Portugal
  "1f1f7-1f1fa": "/assets/emojis/1f1f7-1f1fa.png", // 🇷🇺 Russia
  "1f1f8-1f1e6": "/assets/emojis/1f1f8-1f1e6.png", // 🇸🇦 Saudi Arabia
  "1f1f8-1f1ea": "/assets/emojis/1f1f8-1f1ea.png", // 🇸🇪 Sweden
  "1f1f9-1f1ed": "/assets/emojis/1f1f9-1f1ed.png", // 🇹🇭 Thailand
  "1f1f9-1f1f7": "/assets/emojis/1f1f9-1f1f7.png", // 🇹🇷 Turkey
  "1f1f9-1f1fc": "/assets/emojis/1f1f9-1f1fc.png", // 🇹🇼 Taiwan
  "1f1fa-1f1e6": "/assets/emojis/1f1fa-1f1e6.png", // 🇺🇦 Ukraine
  "1f1fa-1f1f8": "/assets/emojis/1f1fa-1f1f8.png", // 🇺🇸 United States
  "1f1fb-1f1f3": "/assets/emojis/1f1fb-1f1f3.png", // 🇻🇳 Vietnam

  // Nature & Food emojis
  "1f310": "/assets/emojis/1f310.png", // 🌐 globe
  "1f32d": "/assets/emojis/1f32d.png", // 🌭 hot dog
  "1f330": "/assets/emojis/1f330.png", // 🌰 chestnut
  "1f331": "/assets/emojis/1f331.png", // 🌱 seedling
  "1f33b": "/assets/emojis/1f33b.png", // 🌻 sunflower
  "1f33d": "/assets/emojis/1f33d.png", // 🌽 corn
  "1f33e": "/assets/emojis/1f33e.png", // 🌾 sheaf of rice
  "1f345": "/assets/emojis/1f345.png", // 🍅 tomato
  "1f347": "/assets/emojis/1f347.png", // 🍇 grapes
  "1f349": "/assets/emojis/1f349.png", // 🍉 watermelon
  "1f34a": "/assets/emojis/1f34a.png", // 🍊 tangerine
  "1f34c": "/assets/emojis/1f34c.png", // 🍌 banana
  "1f34d": "/assets/emojis/1f34d.png", // 🍍 pineapple
  "1f34e": "/assets/emojis/1f34e.png", // 🍎 apple
  "1f353": "/assets/emojis/1f353.png", // 🍓 strawberry
  "1f356": "/assets/emojis/1f356.png", // 🍖 meat on bone
  "1f357": "/assets/emojis/1f357.png", // 🍗 poultry leg
  "1f35a": "/assets/emojis/1f35a.png", // 🍚 cooked rice
  "1f35c": "/assets/emojis/1f35c.png", // 🍜 steaming bowl
  "1f35d": "/assets/emojis/1f35d.png", // 🍝 spaghetti
  "1f35e": "/assets/emojis/1f35e.png", // 🍞 bread
  "1f36b": "/assets/emojis/1f36b.png", // 🍫 chocolate bar
  "1f36c": "/assets/emojis/1f36c.png", // 🍬 candy
  "1f36e": "/assets/emojis/1f36e.png", // 🍮 custard
  "1f36f": "/assets/emojis/1f36f.png", // 🍯 honey pot
  "1f371": "/assets/emojis/1f371.png", // 🍱 bento box
  "1f376": "/assets/emojis/1f376.png", // 🍶 sake
  "1f377": "/assets/emojis/1f377.png", // 🍷 wine glass
  "1f37a": "/assets/emojis/1f37a.png", // 🍺 beer mug

  // Objects & Symbols
  "1f389": "/assets/emojis/1f389.png", // 🎉 party popper
  "1f392": "/assets/emojis/1f392.png", // 🎒 backpack
  "1f3a8": "/assets/emojis/1f3a8.png", // 🎨 artist palette
  "1f3e0": "/assets/emojis/1f3e0.png", // 🏠 house
  "1f41f": "/assets/emojis/1f41f.png", // 🐟 fish
  "1f440": "/assets/emojis/1f440.png", // 👀 eyes
  "1f45c": "/assets/emojis/1f45c.png", // 👜 handbag
  "1f48a": "/assets/emojis/1f48a.png", // 💊 pill
  "1f4a1": "/assets/emojis/1f4a1.png", // 💡 light bulb
  "1f4bc": "/assets/emojis/1f4bc.png", // 💼 briefcase
  "1f4c4": "/assets/emojis/1f4c4.png", // 📄 page facing up
  "1f4c6": "/assets/emojis/1f4c6.png", // 📆 calendar
  "1f4de": "/assets/emojis/1f4de.png", // 📞 telephone
  "1f510": "/assets/emojis/1f510.png", // 🔐 locked with key
  "1f512": "/assets/emojis/1f512.png", // 🔒 locked
  "1f514": "/assets/emojis/1f514.png", // 🔔 bell
  "1f517": "/assets/emojis/1f517.png", // 🔗 link
  "1f5bc": "/assets/emojis/1f5bc.png", // 🖼 framed picture
  "1f5d3": "/assets/emojis/1f5d3.png", // 🗓 spiral calendar
  "1f64c": "/assets/emojis/1f64c.png", // 🙌 raising hands
  "1f697": "/assets/emojis/1f697.png", // 🚗 car
  "1f6a8": "/assets/emojis/1f6a8.png", // 🚨 police car light
  "1f6e2": "/assets/emojis/1f6e2.png", // 🛢 oil drum

  // Faces & Activities
  "1f927": "/assets/emojis/1f927.png", // 🤧 sneezing face
  "1f951": "/assets/emojis/1f951.png", // 🥑 avocado
  "1f954": "/assets/emojis/1f954.png", // 🥔 potato
  "1f95a": "/assets/emojis/1f95a.png", // 🥚 egg
  "1f95b": "/assets/emojis/1f95b.png", // 🥛 glass of milk
  "1f95c": "/assets/emojis/1f95c.png", // 🥜 peanuts
  "1f95d": "/assets/emojis/1f95d.png", // 🥝 kiwi fruit
  "1f963": "/assets/emojis/1f963.png", // 🥣 bowl with spoon
  "1f965": "/assets/emojis/1f965.png", // 🥥 coconut
  "1f966": "/assets/emojis/1f966.png", // 🥦 broccoli
  "1f969": "/assets/emojis/1f969.png", // 🥩 cut of meat
  "1f96d": "/assets/emojis/1f96d.png", // 🥭 mango
  "1f973": "/assets/emojis/1f973.png", // 🥳 partying face
  "1f990": "/assets/emojis/1f990.png", // 🦐 shrimp
  "1f99e": "/assets/emojis/1f99e.png", // 🦞 lobster
  "1f9c2": "/assets/emojis/1f9c2.png", // 🧂 salt
  "1f9c4": "/assets/emojis/1f9c4.png", // 🧄 garlic
  "1f9c5": "/assets/emojis/1f9c5.png", // 🧅 onion
  "1f9e4": "/assets/emojis/1f9e4.png", // 🧤 gloves
  "1f9ea": "/assets/emojis/1f9ea.png", // 🧪 test tube
  "1f9f4": "/assets/emojis/1f9f4.png", // 🧴 lotion bottle
  "1fa84": "/assets/emojis/1fa84.png", // 🪄 magic wand
  "1fad8": "/assets/emojis/1fad8.png", // 🫘 beans

  // Misc symbols
  "23f0": "/assets/emojis/23f0.png", // ⏰ alarm clock
  "2615": "/assets/emojis/2615.png", // ☕ hot beverage
  "26a0": "/assets/emojis/26a0.png", // ⚠ warning
  "2705": "/assets/emojis/2705.png", // ✅ checkmark
  "270d": "/assets/emojis/270d.png", // ✍ writing hand
  "274c": "/assets/emojis/274c.png", // ❌ cross mark
  "2b50": "/assets/emojis/2b50.png", // ⭐ star
  "1f4cd": "/assets/emojis/1f4cd.png", // 📍 pin
  "1f44b": "/assets/emojis/1f44b.png", // 👋 waving hand
  "1f4ac": "/assets/emojis/1f4ac.png", // 💬 speech bubble
  "1f37d": "/assets/emojis/1f37d.png", // 🍽 fork and knife
  "1f4aa": "/assets/emojis/1f4aa.png", // 💪 flexed biceps
  "2708": "/assets/emojis/2708.png", // ✈ airplane
  "1f691": "/assets/emojis/1f691.png", // 🚑 ambulance
  "1f374": "/assets/emojis/1f374.png", // 🍴 fork and knife
  "1f68c": "/assets/emojis/1f68c.png", // 🚌 bus
  "1f3eb": "/assets/emojis/1f3eb.png", // � airplane departure
  "1f4f1": "/assets/emojis/1f4f1.png", // � mobile phone
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
