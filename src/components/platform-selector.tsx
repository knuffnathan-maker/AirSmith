"use client";

import { motion } from "framer-motion";

import { usePlatforms } from "@/hooks/use-catalog";
import { holoSpring, holoCardVariants } from "@/lib/holo-motion";
import { holo } from "@/lib/holo-styles";
import type { PlatformId } from "@/lib/types";
import { useBuildStore } from "@/stores/build-store";
import { cn } from "@/lib/utils";

export function PlatformSelector() {
  const platformId = useBuildStore((s) => s.platformId);
  const setPlatform = useBuildStore((s) => s.setPlatform);
  const { platforms, loading, error } = usePlatforms();

  function handleSelect(id: PlatformId) {
    if (id !== platformId) setPlatform(id);
  }

  return (
    <div className="p-4">
      <p className={cn("mb-3", holo.sectionLabel)}>
        <span className="text-holo-purple/60">{"// "}</span>Platform Select
      </p>

      {loading && (
        <p className={cn("mb-2", holo.caption)}>Syncing platforms...</p>
      )}
      {error && (
        <p className="mb-2 text-xs text-destructive">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Select platform">
        {platforms.map((platform) => {
          const isActive = platformId === platform.id;

          return (
            <motion.button
              key={platform.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelect(platform.id)}
              variants={holoCardVariants}
              initial="idle"
              animate={isActive ? "active" : "idle"}
              whileHover={isActive ? "active" : "hover"}
              whileTap="tap"
              transition={holoSpring}
              className={cn(
                "relative overflow-hidden rounded-lg border px-3 py-2.5 text-left backdrop-blur-card",
                isActive
                  ? holo.cardActive
                  : cn(holo.card, "border-neon/15 bg-neon/[0.03]")
              )}
            >
              {isActive && (
                <>
                  <div className="pointer-events-none absolute inset-0 holo-shimmer opacity-70" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent" />
                </>
              )}
              {isActive && (
                <span className="absolute top-2 right-2 size-1.5 rounded-full bg-neon shadow-neon-sm animate-neon-pulse" />
              )}
              <span
                className={cn(
                  "relative block font-heading text-sm font-bold tracking-wide",
                  isActive ? "text-neon neon-text-subtle" : "text-foreground"
                )}
              >
                {platform.name}
              </span>
              <span
                className={cn(
                  "relative mt-0.5 block",
                  holo.caption,
                  isActive ? "text-neon/65" : holo.bodyDim
                )}
              >
                {platform.description}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
