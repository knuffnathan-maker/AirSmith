import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          black: "#0a0b0a",
          void: "#0c0d0c",
          deep: "#0e100e",
          panel: "#121413",
          raised: "#181a18",
          border: "#252826",
          "border-light": "#333633",
        },
        sage: {
          DEFAULT: "#6d7564",
          light: "#8a9480",
          dim: "#565e50",
        },
        steel: {
          DEFAULT: "#7a8289",
          dim: "#4a5056",
          light: "#9aa3ab",
        },
        accent: {
          blue: "#5c7a94",
          "blue-dim": "#4a6278",
        },
        /* legacy aliases — builder imports */
        matte: {
          black: "#0a0b0a",
          void: "#0c0d0c",
          deep: "#0e100e",
          panel: "#121413",
          raised: "#181a18",
          border: "#252826",
          "border-light": "#333633",
        },
        olive: {
          DEFAULT: "#6d7564",
          dim: "#565e50",
          deep: "#454c40",
          bright: "#8a9480",
          muted: "#6d7564",
        },
        tactical: {
          gray: "#7a8289",
          "gray-dim": "#4a5056",
          sand: "#9aa3ab",
          steel: "#6e7368",
        },
      },
      backgroundImage: {
        "tactical-bg":
          "linear-gradient(180deg, #0e100e 0%, #0c0d0c 50%, #0a0b0a 100%)",
        "hud-grid":
          "linear-gradient(rgba(122, 130, 137, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 130, 137, 0.06) 1px, transparent 1px)",
        "hud-grid-fine":
          "linear-gradient(rgba(122, 130, 137, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 130, 137, 0.05) 1px, transparent 1px)",
        "panel-divider":
          "linear-gradient(90deg, transparent, rgba(122, 130, 137, 0.25) 50%, transparent)",
        "viewport-light":
          "radial-gradient(ellipse 70% 50% at 50% 15%, rgba(154, 163, 171, 0.08) 0%, transparent 70%)",
      },
      backgroundSize: {
        grid: "32px 32px",
        "grid-fine": "16px 16px",
      },
      boxShadow: {
        "tactical-sm": "0 1px 2px rgba(0, 0, 0, 0.45)",
        tactical: "0 2px 6px rgba(0, 0, 0, 0.5)",
        "tactical-inset": "inset 0 1px 0 rgba(255, 255, 255, 0.02)",
        "tactical-active": "inset 0 0 0 1px rgba(138, 148, 128, 0.35)",
        viewport: "inset 0 0 0 1px rgba(51, 54, 51, 0.8), 0 4px 24px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".tactical-panel": {
          background: "#121413",
          borderColor: "#252826",
        },
        ".tactical-card": {
          background: "#181a18",
          border: "1px solid #252826",
        },
        ".hud-grid": {
          backgroundImage:
            "linear-gradient(rgba(122, 130, 137, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 130, 137, 0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        },
        ".hud-grid-fine": {
          backgroundImage:
            "linear-gradient(rgba(122, 130, 137, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 130, 137, 0.05) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        },
        ".panel-divider": {
          background:
            "linear-gradient(90deg, transparent, rgba(122, 130, 137, 0.25) 50%, transparent)",
          height: "1px",
        },
        ".hud-corner": {
          borderColor: "rgba(138, 148, 128, 0.4)",
        },
      });
    }),
  ],
};

export default config;
