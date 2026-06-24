"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Grid3x3,
  Maximize2,
  RotateCcw,
  Trash2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { AssemblyViewport } from "@/components/assembly-viewport";
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
        <div className="flex items-center gap-0.5">
          {VIEWER_CONTROLS.map(({ icon: Icon, title }) => (
            <Button key={title} variant="ghost" size="icon-sm" title={title} className={holo.iconBtn}>
              <Icon />
            </Button>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col overflow-hidden bg-charcoal-deep">
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 p-6">
          <AssemblyViewport partCount={parts.length} />

          <div className="text-center">
            <p className={holo.accentHeading}>3D Assembly Viewer</p>
            <p className={cn("mt-1.5 max-w-sm", holo.bodyMutedSmall)}>
              {parts.length === 0
                ? "Select components from the parts library to begin assembly."
                : "Meshes loaded. Inspect dimensions and fitment in the viewport."}
            </p>
          </div>

          <div className={cn("flex gap-5 uppercase", holo.monoMeta)}>
            <span>Orbit: LMB</span>
            <span className="text-charcoal-border-light">|</span>
            <span>Pan: MMB</span>
            <span className="text-charcoal-border-light">|</span>
            <span>Zoom: Scroll</span>
          </div>
        </div>

        <div className={cn("relative z-10 border-t px-4 py-3", holo.panel)}>
          <div className="absolute inset-x-0 top-0 panel-divider" />
          <p className={cn("mb-2", holo.sectionLabel)}>
            <span className="text-steel">{"// "}</span>Loaded Components
          </p>
          {parts.length === 0 ? (
            <p className={cn(holo.monoMeta, "text-steel/60")}>AWAITING INPUT...</p>
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
      initial={{ opacity: 0, scale: 0.98, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, x: -12, transition: { duration: 0.18 } }}
      transition={{ duration: 0.14, ease: "easeOut" }}
      className={cn(
        "group flex items-center gap-2 rounded-sm border border-charcoal-border py-1.5 pr-1.5 pl-2.5",
        "bg-charcoal-raised hover:border-charcoal-border-light"
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary" className={cn("text-[9px] font-normal px-1.5 py-0", holo.badgeMuted)}>
            {CATEGORY_LABELS[part.category]}
          </Badge>
          <span className={cn("truncate", holo.title)}>{part.name}</span>
        </div>
        <span className={holo.accentValue}>${part.estimated_price.toFixed(2)}</span>
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
