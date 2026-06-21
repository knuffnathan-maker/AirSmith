import type { Transition, Variants } from "framer-motion";

export const holoSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
};

export const holoCardVariants: Variants = {
  idle: {
    scale: 1,
    boxShadow:
      "inset 0 0 12px rgba(0, 240, 255, 0.02), 0 0 0px rgba(0, 240, 255, 0)",
  },
  hover: {
    scale: 1.025,
    boxShadow:
      "inset 0 0 20px rgba(0, 240, 255, 0.06), 0 0 18px rgba(0, 240, 255, 0.35), 0 0 36px rgba(0, 191, 255, 0.18)",
  },
  tap: {
    scale: 0.975,
    boxShadow:
      "inset 0 0 14px rgba(0, 240, 255, 0.08), 0 0 12px rgba(0, 240, 255, 0.25)",
  },
  active: {
    scale: 1.02,
    boxShadow:
      "inset 0 0 28px rgba(0, 240, 255, 0.1), 0 0 22px rgba(0, 240, 255, 0.45), 0 0 48px rgba(0, 191, 255, 0.22)",
  },
};

export const holoPanelVariants: Variants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.015,
    boxShadow:
      "inset 0 0 16px rgba(0, 240, 255, 0.05), 0 0 14px rgba(0, 240, 255, 0.28), 0 0 28px rgba(0, 191, 255, 0.12)",
  },
  tap: { scale: 0.99 },
};
