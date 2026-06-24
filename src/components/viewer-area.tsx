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

      <div className="relative flex flex-1 flex-col overflow-hidden bg-matte-deep">
        <div className="absolute inset-0 hud-grid-fine opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#080907_85%)]" />

        <div className="relative z-10 flex flex-1 items-center justify-center p-6">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="relative flex size-52 items-center justify-center rounded-sm border border-matte-border-light bg-matte-panel shadow-tactical">
                <Box className="size-20 text-tactical-steel/60" strokeWidth={0.75} />
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-matte-border-light/50" />
              </div>

              {(["tl", "tr", "bl", "br"] as const).map((corner) => (
                <span
                  key={corner}
                  className={cn(
                    "absolute size-5 hud-corner",
                    corner === "tl" && "-top-2 -left-2 border-t border-l",
                    corner === "tr" && "-top-2 -right-2 border-t border-r",
                    corner === "bl" && "-bottom-2 -left-2 border-b border-l",
                    corner === "br" && "-right-2 -bottom-2 border-b border-r"
                  )}
                />
              ))}
            </div>

            <div className="text-center">
              <p className={holo.accentHeading}>3D Assembly Viewer</p>
              <p className={cn("mt-1.5 max-w-xs", holo.bodyMutedSmall)}>
                {parts.length === 0
                  ? "Select components from the parts library to begin assembly."
                  : "Components loaded to tray. Render pipeline standing by."}
              </p>
            </div>

            <div className={cn("flex gap-6 uppercase", holo.monoMeta)}>
              <span>Orbit: LMB</span>
              <span className="text-matte-border-light">|</span>
              <span>Pan: MMB</span>
              <span className="text-matte-border-light">|</span>
              <span>Zoom: Scroll</span>
            </div>
          </div>
        </div>

        <div className={cn("relative z-10 border-t px-4 py-3", holo.panel)}>
          <div className="absolute inset-x-0 top-0 panel-divider" />
          <p className={cn("mb-2", holo.sectionLabel)}>
            <span className="text-tactical-gray">{"// "}</span>Loaded Components
          </p>
          {parts.length === 0 ? (
            <p className={cn(holo.monoMeta, "text-muted-foreground/60")}>AWAITING INPUT...</p>
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
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.95,
        x: -16,
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn(
        "group flex items-center gap-2 rounded-sm border border-matte-border py-1.5 pr-1.5 pl-2.5",
        "bg-matte-raised hover:border-matte-border-light"
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary" className={cn("text-[9px] font-normal px-1.5 py-0", holo.badgeMuted)}>
            {CATEGORY_LABELS[part.category]}
          </Badge>
          <span className={cn("truncate", holo.title)}>{part.name}</span>
        </div>
        <span className={holo.accentValue}>
          ${part.estimated_price.toFixed(2)}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label={`Remove ${part.name} from assembly`}
        onClick={onRemove}
        className="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="size-3" />
      </Button>
    </motion.div>
  );
}
