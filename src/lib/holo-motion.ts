import type { Transition, Variants } from "framer-motion";

export const holoSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
};

export const holoCardVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.01 },
  tap: { scale: 0.99 },
  active: { scale: 1 },
};

export const holoPanelVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.005 },
  tap: { scale: 0.995 },
};
