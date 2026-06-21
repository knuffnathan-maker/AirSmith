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
        space: {
          black: "#020308",
          void: "#030508",
          deep: "#050810",
          panel: "rgba(6, 14, 24, 0.65)",
        },
        neon: {
          DEFAULT: "#00f0ff",
          dim: "#00bfff",
          deep: "#0088ff",
          glow: "rgba(0, 240, 255, 0.5)",
        },
        holo: {
          cyan: "#00f0ff",
          blue: "#00bfff",
          electric: "#0088ff",
          purple: "#8b5cf6",
          "purple-dim": "#6366f1",
          magenta: "#c026d3",
          violet: "#7c3aed",
        },
      },
      backgroundImage: {
        "holo-bg":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,240,255,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139,92,246,0.05) 0%, transparent 50%), #030508",
        "holo-grid":
          "linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)",
        "holo-grid-fine":
          "linear-gradient(rgba(0,240,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.025) 1px, transparent 1px)",
        "holo-shimmer":
          "linear-gradient(135deg, rgba(0,240,255,0) 0%, rgba(0,240,255,0.06) 50%, rgba(139,92,246,0.04) 75%, rgba(0,240,255,0) 100%)",
        "panel-divider":
          "linear-gradient(90deg, transparent, rgba(0,240,255,0.4) 40%, rgba(139,92,246,0.3) 60%, transparent)",
        "neon-gradient": "linear-gradient(135deg, #00f0ff 0%, #0088ff 50%, #8b5cf6 100%)",
      },
      backgroundSize: {
        grid: "32px 32px",
        "grid-fine": "16px 16px",
      },
      backdropBlur: {
        glass: "16px",
        card: "8px",
        holo: "20px",
      },
      boxShadow: {
        "neon-xs": "0 0 6px rgba(0, 240, 255, 0.2)",
        "neon-sm": "0 0 10px rgba(0, 240, 255, 0.25)",
        neon: "0 0 20px rgba(0, 240, 255, 0.35)",
        "neon-lg":
          "0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(0, 191, 255, 0.1)",
        "neon-xl":
          "0 0 60px rgba(0, 240, 255, 0.25), 0 0 120px rgba(0, 136, 255, 0.15)",
        "neon-purple": "0 0 20px rgba(139, 92, 246, 0.35)",
        "neon-purple-lg": "0 0 40px rgba(139, 92, 246, 0.2)",
        "neon-active":
          "inset 0 0 30px rgba(0, 240, 255, 0.08), 0 0 20px rgba(0, 240, 255, 0.25), 0 0 40px rgba(0, 191, 255, 0.1)",
        "neon-inset": "inset 0 0 20px rgba(0, 240, 255, 0.08)",
        "glass-glow":
          "inset 0 0 20px rgba(0, 240, 255, 0.03), 0 0 15px rgba(0, 240, 255, 0.08)",
      },
      dropShadow: {
        neon: "0 0 12px rgba(0, 240, 255, 0.6)",
        "neon-sm": "0 0 8px rgba(0, 240, 255, 0.4)",
      },
      animation: {
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "holo-flicker": "holo-flicker 4s linear infinite",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "holo-flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.85" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.9" },
          "97%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      addUtilities({
        /* ── Glassmorphism ── */
        ".glass-panel": {
          background: "rgba(6, 14, 24, 0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "rgba(0, 240, 255, 0.15)",
        },
        ".glass-card": {
          background: "rgba(0, 240, 255, 0.03)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(0, 240, 255, 0.12)",
        },
        ".glass-holo": {
          background:
            "linear-gradient(135deg, rgba(0,240,255,0.04) 0%, rgba(139,92,246,0.04) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 240, 255, 0.15)",
        },

        /* ── Neon glow ── */
        ".neon-text": {
          color: "#00f0ff",
          textShadow:
            "0 0 10px rgba(0, 240, 255, 0.6), 0 0 20px rgba(0, 240, 255, 0.3)",
        },
        ".neon-text-subtle": {
          textShadow: "0 0 8px rgba(0, 240, 255, 0.3)",
        },
        ".neon-text-purple": {
          color: "#8b5cf6",
          textShadow:
            "0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.3)",
        },
        ".neon-border": {
          borderColor: "rgba(0, 240, 255, 0.3)",
          boxShadow:
            "inset 0 0 20px rgba(0, 240, 255, 0.03), 0 0 15px rgba(0, 240, 255, 0.08)",
        },
        ".neon-border-active": {
          borderColor: "rgba(0, 240, 255, 0.6)",
          boxShadow:
            "inset 0 0 30px rgba(0, 240, 255, 0.08), 0 0 20px rgba(0, 240, 255, 0.25), 0 0 40px rgba(0, 191, 255, 0.1)",
        },
        ".neon-glow-btn": {
          boxShadow:
            "0 0 15px rgba(0, 240, 255, 0.3), inset 0 0 10px rgba(0, 240, 255, 0.1)",
        },
        ".neon-glow-purple": {
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
        },

        /* ── Holographic backgrounds ── */
        ".holo-bg": {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,240,255,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139,92,246,0.05) 0%, transparent 50%), #030508",
        },
        ".holo-grid": {
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        },
        ".holo-grid-fine": {
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.025) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        },
        ".holo-shimmer": {
          background:
            "linear-gradient(135deg, rgba(0,240,255,0) 0%, rgba(0,240,255,0.06) 50%, rgba(139,92,246,0.04) 75%, rgba(0,240,255,0) 100%)",
        },
        ".panel-divider": {
          background:
            "linear-gradient(90deg, transparent, rgba(0,240,255,0.4) 40%, rgba(139,92,246,0.3) 60%, transparent)",
          height: "1px",
        },
      });

      addComponents({
        ".holo-scanlines": {
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: "0",
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 4px)",
            pointerEvents: "none",
            zIndex: "1",
          },
        },
      });
    }),
  ],
};

export default config;
