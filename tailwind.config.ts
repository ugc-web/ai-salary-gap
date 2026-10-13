import type { Config } from "tailwindcss";

/**
 * "Paycheck Pop": neo-brutalist system. Thick ink borders, hard offset shadows (zero blur),
 * chunky display type, saturated money colours. Text on colour is always ink, for contrast.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFBF0",
        card: "#FFFFFF",
        ink: { DEFAULT: "#0B0B0B", soft: "#2E2E2E", mute: "#5C5C5C" },
        rule: "#0B0B0B",
        accent: { DEFAULT: "#00C27A", soft: "#C9F7DF", dark: "#007A4D" },
        lime: "#C6FF3D",
        sun: "#FFD23F",
        pink: "#FF5DA2",
        sky: "#5CC8FF",
        lilac: "#B69CFF",
        orange: "#FF7A1A",
        signal: "#E5342F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brut: "5px 5px 0 0 #0B0B0B",
        "brut-sm": "3px 3px 0 0 #0B0B0B",
        "brut-lg": "8px 8px 0 0 #0B0B0B",
        "brut-xl": "12px 12px 0 0 #0B0B0B",
      },
      borderWidth: { 3: "3px" },
      letterSpacing: { tightest: "-0.04em" },
    },
  },
  plugins: [],
};
export default config;
