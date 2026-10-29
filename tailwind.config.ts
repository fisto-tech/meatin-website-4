import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        meatin: {
          green: {
            DEFAULT: "#1F5A3C",
            hover: "#184830",
            light: "#E8F5E9",
            verylight: "#F1F8F5",
          },
          gold: {
            DEFAULT: "#D4A437",
            hover: "#B88C2B",
          },
          red: {
            DEFAULT: "#C62828",
            hover: "#B71C1C",
            light: "#FFEBEE",
          },
          yellow: {
            DEFAULT: "#F9A825",
            hover: "#F57F17",
            light: "#FFF8E1",
          },
          bg: {
            light: "#F8F9FA",
            green: "#F1F8F5",
          },
          dark: "#121212",
        },
      },
      fontFamily: {
        bree: ["var(--font-bree-serif)", "serif"],
        anek: ["var(--font-anek-malayalam)", "sans-serif"],
        chau: ["var(--font-anek-malayalam)", "sans-serif"],
        manrope: ["var(--font-anek-malayalam)", "sans-serif"],
        inter: ["var(--font-anek-malayalam)", "sans-serif"],
        poppins: ["var(--font-anek-malayalam)", "sans-serif"],
        lexend: ["var(--font-anek-malayalam)", "sans-serif"],
        barlow: ["var(--font-anek-malayalam)", "sans-serif"],
        "barlow-condensed": ["var(--font-anek-malayalam)", "sans-serif"],
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(31, 90, 60, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'premium-lg': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        'red-glow': '0 8px 25px -4px rgba(198, 40, 40, 0.35)',
        'green-glow': '0 8px 25px -4px rgba(31, 90, 60, 0.35)',
      },
    },
  },
  plugins: [],
};
export default config;
