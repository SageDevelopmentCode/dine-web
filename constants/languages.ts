// Language code to display name mapping (ISO 639-1 codes)
export const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ar: "Arabic",
  hi: "Hindi",
  nl: "Dutch",
  pl: "Polish",
  tr: "Turkish",
  sv: "Swedish",
  no: "Norwegian",
  da: "Danish",
  fi: "Finnish",
  el: "Greek",
  he: "Hebrew",
  th: "Thai",
  vi: "Vietnamese",
  id: "Indonesian",
  cs: "Czech",
  hu: "Hungarian",
  ro: "Romanian",
  uk: "Ukrainian",
  bg: "Bulgarian",
  hr: "Croatian",
  sr: "Serbian",
  sk: "Slovak",
  sl: "Slovenian",
};

export const getLanguageName = (code: string): string => {
  return LANGUAGE_NAMES[code] || code.toUpperCase();
};

// Language code to flag emoji hex mapping
// Using the most common country flag for each language
export const LANGUAGE_FLAGS: Record<string, string> = {
  en: "1f1fa-1f1f8", // 🇺🇸 United States
  es: "1f1ea-1f1f8", // 🇪🇸 Spain
  fr: "1f1eb-1f1f7", // 🇫🇷 France
  de: "1f1e9-1f1ea", // 🇩🇪 Germany
  it: "1f1ee-1f1f9", // 🇮🇹 Italy
  pt: "1f1f5-1f1f9", // 🇵🇹 Portugal
  ru: "1f1f7-1f1fa", // 🇷🇺 Russia
  ja: "1f1ef-1f1f5", // 🇯🇵 Japan
  ko: "1f1f0-1f1f7", // 🇰🇷 South Korea
  zh: "1f1e8-1f1f3", // 🇨🇳 China
  ar: "1f1f8-1f1e6", // 🇸🇦 Saudi Arabia
  hi: "1f1ee-1f1f3", // 🇮🇳 India
  nl: "1f1f3-1f1f1", // 🇳🇱 Netherlands
  pl: "1f1f5-1f1f1", // 🇵🇱 Poland
  tr: "1f1f9-1f1f7", // 🇹🇷 Turkey
  sv: "1f1f8-1f1ea", // 🇸🇪 Sweden
  no: "1f1f3-1f1f4", // 🇳🇴 Norway
  da: "1f1e9-1f1ea", // 🇩🇪 Germany (Denmark flag not in assets, using Germany as placeholder)
  fi: "1f1eb-1f1ee", // 🇫🇮 Finland
  el: "1f1ec-1f1f7", // 🇬🇷 Greece
  he: "1f1ee-1f1f1", // 🇮🇱 Israel
  th: "1f1f9-1f1ed", // 🇹🇭 Thailand
  vi: "1f1fb-1f1f3", // 🇻🇳 Vietnam
  id: "1f1ee-1f1e9", // 🇮🇩 Indonesia
  cs: "1f1e8-1f1ff", // 🇨🇿 Czechia
  hu: "1f1ed-1f1fa", // 🇭🇺 Hungary (not in assets, will use default)
  ro: "1f1f7-1f1f4", // 🇷🇴 Romania (not in assets, will use default)
  uk: "1f1fa-1f1e6", // 🇺🇦 Ukraine
  bg: "1f1e7-1f1ec", // 🇧🇬 Bulgaria (not in assets, will use default)
  hr: "1f1ed-1f1f7", // 🇭🇷 Croatia (not in assets, will use default)
  sr: "1f1f7-1f1f8", // 🇷🇸 Serbia (not in assets, will use default)
  sk: "1f1f8-1f1f0", // 🇸🇰 Slovakia (not in assets, will use default)
  sl: "1f1f8-1f1ee", // 🇸🇮 Slovenia (not in assets, will use default)
};

export const getLanguageFlag = (code: string): string | null => {
  return LANGUAGE_FLAGS[code] || null;
};
