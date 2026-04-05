import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-cormorant)", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        obsidian: "#080808",
        void: "#0a0a0a",
        carbon: "#111111",
        graphite: "#1a1a1a",
        smoke: "#2a2a2a",
        ash: "#3a3a3a",
        mist: "#888888",
        silver: "#c8c8c8",
        pearl: "#f0ede8",
        gold: "#c9a96e",
        "gold-light": "#e8c98a",
        "gold-dark": "#9a7a42",
        ember: "#ff4d1c",
      },
      letterSpacing: {
        "ultra": "0.3em",
        "extreme": "0.5em",
      },
      animation: {
        "grain": "grain 8s steps(10) infinite",
        "fade-up": "fadeUp 1s ease forwards",
        "fade-in": "fadeIn 1.2s ease forwards",
        "line-expand": "lineExpand 1s ease forwards",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 2%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(4%, -1%)" },
          "50%": { transform: "translate(-3%, 3%)" },
          "60%": { transform: "translate(2%, -4%)" },
          "70%": { transform: "translate(-4%, 1%)" },
          "80%": { transform: "translate(1%, -2%)" },
          "90%": { transform: "translate(3%, 4%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        lineExpand: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
