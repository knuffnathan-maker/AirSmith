"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";

import { PlatformSelector } from "@/components/platform-selector";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePartsCatalog } from "@/hooks/use-catalog";
import { holoSpring, holoCardVariants } from "@/lib/holo-motion";
import { holo } from "@/lib/holo-styles";
import { CATEGORY_LABELS } from "@/lib/mock-data";
import type { Part } from "@/lib/types";
import { useBuildStore } from "@/stores/build-store";
import { cn } from "@/lib/utils";

export function LeftSidebar() {
  const platformId = useBuildStore((s) => s.platformId);
  const buildParts = useBuildStore((s) => s.parts);
  const addPart = useBuildStore((s) => s.addPart);

  const { parts: catalogParts, loading, error } = usePartsCatalog(platformId);

  const buildPartIds = useMemo(
    () => new Set(buildParts.map((p) => p.id)),
    [buildParts]
  );

  const categories = [...new Set(catalogParts.map((p) => p.category))];

  return (
    <aside className={cn("relative flex w-72 shrink-0 flex-col border-r", holo.panel)}>
      <div className={holo.panelEdgeRight} />
      <PlatformSelector />
      <div className="mx-4 panel-divider" />

      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <p className={holo.sectionLabel}>
          <span className="text-holo-purple/60">{"// "}</span>Parts Library
        </p>
        <Badge variant="secondary" className={cn("text-[10px] font-normal", holo.badge)}>
          {loading ? "..." : `${catalogParts.length} parts`}
        </Badge>
      </div>

      <ScrollArea className="flex-1 px-2 pb-4">
        {loading ? (
          <p className={cn("px-4 py-6 text-center", holo.caption)}>Loading catalog...</p>
        ) : error ? (
          <p className="px-4 py-6 text-center text-xs text-destructive">{error}</p>
        ) : (
          <div className="space-y-4 px-2">
            {categories.map((category) => (
              <div key={category}>
                <p className={cn("mb-2 px-1", holo.categoryLabel)}>
                  {CATEGORY_LABELS[category]}
                </p>
                <div className="space-y-1.5">
                  {catalogParts
                    .filter((p) => p.category === category)
                    .map((part) => (
                      <PartCard
                        key={part.id}
                        part={part}
                        inBuild={buildPartIds.has(part.id)}
                        onAdd={addPart}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}

function PartCard({
  part,
  inBuild,
  onAdd,
}: {
  part: Part;
  inBuild: boolean;
  onAdd: (part: Part) => void;
}) {
  return (
    <motion.button
      type="button"
      disabled={inBuild}
      aria-pressed={inBuild}
      aria-label={inBuild ? `${part.name} already in build` : `Add ${part.name} to build`}
      onClick={() => !inBuild && onAdd(part)}
      variants={holoCardVariants}
      initial="idle"
      animate={inBuild ? "active" : "idle"}
      whileHover={inBuild ? "active" : "hover"}
      whileTap={inBuild ? undefined : "tap"}
      transition={holoSpring}
      className={cn(
        "group relative flex w-full items-start gap-2 overflow-hidden rounded-lg border px-3 py-2.5 text-left backdrop-blur-card",
        inBuild
          ? "cursor-default border-neon/40 bg-neon/10"
          : cn(holo.card, "cursor-pointer border-neon/15")
      )}
    >
      {!inBuild && (
        <span className="absolute inset-y-0 left-0 w-0.5 scale-y-0 bg-gradient-to-b from-neon via-holo-electric to-holo-purple transition-transform duration-200 group-hover:scale-y-100" />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-xs font-semibold tracking-wide text-foreground">
          {part.name}
        </p>
        <p className={cn("line-clamp-2", holo.bodyMutedSmall)}>{part.durability_note}</p>
        <p className={cn("mt-1", holo.neonValue)}>${part.estimated_price.toFixed(2)}</p>
      </div>
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-200",
          inBuild
            ? "border-neon/40 bg-neon/12 text-neon shadow-neon-sm"
            : "border-neon/15 bg-neon/5 text-muted-foreground group-hover:border-neon/40 group-hover:text-neon"
        )}
      >
        {inBuild ? <Check className="size-3" /> : <Plus className="size-3" />}
      </span>
    </motion.button>
  );
}
