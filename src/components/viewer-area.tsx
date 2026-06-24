"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  Grid3x3,
  Maximize2,
  RotateCcw,
  Trash2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/lib/mock-data";
import { holo } from "@/lib/holo-styles";
import type { BuildPart } from "@/lib/types";
import { useBuildStore } from "@/stores/build-store";
import { cn } from "@/lib/utils";

const AssemblyCanvas = dynamic(
  () =>
    import("@/components/viewer/assembly-canvas").then((m) => ({
      default: m.AssemblyCanvas,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full items-center justify-center bg-charcoal-deep">
        <p className={holo.monoMeta}>INITIALIZING VIEWPORT...</p>
      </div>
    ),
  }
);

export function ViewerArea() {
  const platformId = useBuildStore((s) => s.platformId);
  const parts = useBuildStore((s) => s.parts);
  const removePart = useBuildStore((s) => s.removePart);

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [showGrid, setShowGrid] = useState(true);

  const platformLabel = platformId === "aap-01" ? "AAP-01" : "Hi-Capa";

  const handleControlsReady = useCallback((controls: OrbitControlsImpl | null) => {
    controlsRef.current = controls;
  }, []);

  const handleReset = () => {
    controlsRef.current?.reset();
  };

  const handleZoom = (direction: "in" | "out") => {
    const controls = controlsRef.current;
    if (!controls) return;
    const factor = direction === "in" ? 0.82 : 1.22;
    controls.object.position.multiplyScalar(factor);
    controls.update();
  };

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
          <Button
            variant="ghost"
            size="icon-sm"
            title="Toggle grid"
            className={cn(holo.iconBtn, showGrid && "text-sage-light")}
            onClick={() => setShowGrid((v) => !v)}
          >
            <Grid3x3 />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            title="Reset view"
            className={holo.iconBtn}
            onClick={handleReset}
          >
            <RotateCcw />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            title="Zoom in"
            className={holo.iconBtn}
            onClick={() => handleZoom("in")}
          >
            <ZoomIn />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            title="Zoom out"
            className={holo.iconBtn}
            onClick={() => handleZoom("out")}
          >
            <ZoomOut />
          </Button>
          <Button variant="ghost" size="icon-sm" title="Fullscreen" className={holo.iconBtn}>
            <Maximize2 />
          </Button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden bg-charcoal-deep">
        <AssemblyCanvas
          parts={parts}
          showGrid={showGrid}
          onControlsReady={handleControlsReady}
          className="absolute inset-0"
        />
      </div>

      <div className={cn("relative shrink-0 border-t px-4 py-3", holo.panel)}>
        <div className="absolute inset-x-0 top-0 panel-divider" />
        <p className={cn("mb-2", holo.sectionLabel)}>
          <span className="text-steel">{"// "}</span>Loaded Components
        </p>
        {parts.length === 0 ? (
          <p className={cn(holo.monoMeta, "text-steel/60")}>
            AWAITING INPUT — add parts to load meshes into the viewport
          </p>
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
