"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Grid3x3,
  Maximize2,
  RotateCcw,
  Trash2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/lib/mock-data";
import { holo } from "@/lib/holo-styles";
import type { BuildPart } from "@/lib/types";
import { useBuildStore } from "@/stores/build-store";
import { cn } from "@/lib/utils";

const VIEWER_CONTROLS = [
  { icon: Grid3x3, title: "Toggle grid" },
  { icon: RotateCcw, title: "Reset view" },
  { icon: ZoomIn, title: "Zoom in" },
  { icon: ZoomOut, title: "Zoom out" },
  { icon: Maximize2, title: "Fullscreen" },
] as const;

export function ViewerArea() {
  const platformId = useBuildStore((s) => s.platformId);
  const parts = useBuildStore((s) => s.parts);
  const removePart = useBuildStore((s) => s.removePart);

  const platformLabel = platformId === "aap-01" ? "AAP-01" : "Hi-Capa";

  return (
    <main className="relative flex min-w-0 flex-1 flex-col">
      {/* Toolbar */}
      <div className={cn("relative flex items-center justify-between border-b px-4 py-2", holo.panel)}>
        <div className="absolute inset-x-0 bottom-0 panel-divider" />
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("text-[10px] tracking-wider uppercase", holo.badge)}>
            {platformLabel} Assembly
          </Badge>
          <span className={holo.monoMeta}>
            [{parts.length}] component{parts.length !== 1 ? "s" : ""} loaded
          </span>
        </div>
        <div className="flex items-center gap-1">
          {VIEWER_CONTROLS.map(({ icon: Icon, title }) => (
            <Button key={title} variant="ghost" size="icon-sm" title={title} className={holo.iconBtn}>
              <Icon />
            </Button>
          ))}
        </div>
      </div>

      {/* Viewport */}
      <div className="relative flex flex-1 flex-col overflow-hidden holo-scanlines">
        <div className="absolute inset-0 holo-grid-fine bg-grid-fine opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(139,92,246,0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,#030508_75%)]" />

        <div className="relative z-10 flex flex-1 items-center justify-center p-6">
          <div className="flex flex-col items-center gap-6 animate-holo-flicker">
            <div className="relative">
              {/* Dual glow rings */}
              <div className="absolute -inset-16 rounded-full bg-neon/5 blur-3xl" />
              <div className="absolute -inset-10 rounded-full bg-holo-purple/5 blur-2xl" />
              <div className="absolute -inset-6 animate-neon-pulse rounded-2xl border border-neon/10" />

              <div className="relative flex size-52 items-center justify-center rounded-2xl border border-neon/30 glass-holo shadow-neon-lg backdrop-blur-holo">
                <Box className="size-20 text-neon/50 drop-shadow-neon" strokeWidth={0.75} />
                <div className="pointer-events-none absolute inset-0 holo-shimmer rounded-2xl opacity-50" />
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
              </div>

              {(["tl", "tr", "bl", "br"] as const).map((corner) => (
                <span
                  key={corner}
                  className={cn(
                    "absolute size-6 border-neon shadow-neon-xs",
                    corner === "tl" && "-top-3 -left-3 border-t-2 border-l-2",
                    corner === "tr" && "-top-3 -right-3 border-t-2 border-r-2",
                    corner === "bl" && "-bottom-3 -left-3 border-b-2 border-l-2",
                    corner === "br" && "-right-3 -bottom-3 border-b-2 border-r-2"
                  )}
                />
              ))}
            </div>

            <div className="text-center">
              <p className={cn("text-sm font-medium uppercase", holo.neonHeading)}>
                Holographic Assembly Viewer
              </p>
              <p className={cn("mt-1.5 max-w-xs", holo.bodyMutedSmall)}>
                {parts.length === 0
                  ? "Initialize build — select components from the parts library."
                  : "Components synced to assembly tray. Rendering pipeline ready."}
              </p>
            </div>

            <div className={cn("flex gap-6 uppercase", holo.monoMeta, "text-neon/40")}>
              <span>Orbit: LMB</span>
              <span className="text-holo-purple/40">|</span>
              <span>Pan: MMB</span>
              <span className="text-holo-purple/40">|</span>
              <span>Zoom: Scroll</span>
            </div>
          </div>
        </div>

        {/* Assembly tray */}
        <div className={cn("relative z-10 border-t px-4 py-3", holo.panel, "glass-holo")}>
          <div className="absolute inset-x-0 top-0 panel-divider" />
          <p className={cn("mb-2", holo.sectionLabel)}>
            <span className="text-holo-purple/60">{"// "}</span>Loaded Components
          </p>
          {parts.length === 0 ? (
            <p className={cn(holo.monoMeta, "text-muted-foreground/50")}>AWAITING INPUT...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {parts.map((part) => (
                  <AssemblyPartChip
                    key={part.slotId}
                    part={part}
                    onRemove={() => removePart(part.slotId)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function AssemblyPartChip({
  part,
  onRemove,
}: {
  part: BuildPart;
  onRemove: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.85,
        x: -24,
        transition: { duration: 0.25, ease: "easeInOut" },
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group flex items-center gap-2 rounded-lg border border-neon/25 py-1.5 pr-1.5 pl-2.5",
        "glass-card shadow-neon-xs backdrop-blur-card hover:border-neon/40 hover:shadow-neon-sm"
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary" className={cn("text-[9px] font-normal px-1.5 py-0", holo.badge)}>
            {CATEGORY_LABELS[part.category]}
          </Badge>
          <span className={cn("truncate", holo.title)}>{part.name}</span>
        </div>
        <span className={holo.neonValue}>
          ${part.estimated_price.toFixed(2)}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label={`Remove ${part.name} from assembly`}
        onClick={onRemove}
        className="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:shadow-[0_0_8px_rgba(255,51,102,0.3)]"
      >
        <Trash2 className="size-3" />
      </Button>
    </motion.div>
  );
}
