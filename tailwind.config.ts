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
        matte: {
          black: "#080907",
          void: "#0a0b09",
          deep: "#0d0f0c",
          panel: "#111310",
          raised: "#161814",
          border: "#2a2e26",
          "border-light": "#3a3f36",
        },
        olive: {
          DEFAULT: "#5c6b3a",
          dim: "#4a5d32",
          deep: "#3d4a2c",
          bright: "#7a8f5a",
          muted: "#6b7555",
        },
        charcoal: {
          black: "#0a0b0a",
          void: "#0c0d0c",
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
        tactical: {
          gray: "#8a8f85",
          "gray-dim": "#5c5f58",
          sand: "#9a9485",
          steel: "#6e7368",
        },
      },
      backgroundImage: {
        "tactical-bg":
          "linear-gradient(180deg, #0d0f0c 0%, #0a0b09 50%, #080907 100%)",
        "hud-grid":
          "linear-gradient(rgba(90, 100, 75, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(90, 100, 75, 0.06) 1px, transparent 1px)",
        "hud-grid-fine":
          "linear-gradient(rgba(90, 100, 75, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90, 100, 75, 0.04) 1px, transparent 1px)",
        "panel-divider":
          "linear-gradient(90deg, transparent, rgba(90, 100, 75, 0.35) 50%, transparent)",
      },
      backgroundSize: {
        grid: "32px 32px",
        "grid-fine": "16px 16px",
      },
      boxShadow: {
        "tactical-sm": "0 1px 2px rgba(0, 0, 0, 0.4)",
        tactical: "0 2px 8px rgba(0, 0, 0, 0.5)",
        "tactical-inset": "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
        "tactical-active": "inset 0 0 0 1px rgba(122, 143, 90, 0.4)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".tactical-panel": {
          background: "#111310",
          borderColor: "#2a2e26",
        },
        ".tactical-card": {
          background: "#161814",
          border: "1px solid #2a2e26",
        },
        ".tactical-card-raised": {
          background: "#1a1c18",
          border: "1px solid #3a3f36",
        },
        ".hud-grid": {
          backgroundImage:
            "linear-gradient(rgba(90, 100, 75, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(90, 100, 75, 0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        },
        ".hud-grid-fine": {
          backgroundImage:
            "linear-gradient(rgba(90, 100, 75, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90, 100, 75, 0.04) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        },
        ".panel-divider": {
          background:
            "linear-gradient(90deg, transparent, rgba(90, 100, 75, 0.35) 50%, transparent)",
          height: "1px",
        },
        ".hud-corner": {
          borderColor: "rgba(122, 143, 90, 0.45)",
        },
      });
    }),
  ],
};

export default config;
