"use client";

import { motion } from "framer-motion";
import { Package, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CATEGORY_LABELS } from "@/lib/mock-data";
import { holoSpring, holoCardVariants } from "@/lib/holo-motion";
import { holo } from "@/lib/holo-styles";
import { useBuildStats, useBuildStore } from "@/stores/build-store";
import { cn } from "@/lib/utils";

const STAT_BARS = [
  { key: "control" as const, label: "Control" },
  { key: "handling" as const, label: "Handling" },
  { key: "accuracy" as const, label: "Accuracy" },
  { key: "range" as const, label: "Range" },
];

function StatProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-heading text-[11px] font-semibold tracking-wide text-steel-light uppercase">
          {label}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-sage-light">
          {value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-sm bg-steel-dim/50">
        <motion.div
          className="h-full rounded-sm bg-sage-light"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function BuildSummary() {
  const platformId = useBuildStore((s) => s.platformId);
  const parts = useBuildStore((s) => s.parts);
  const removePart = useBuildStore((s) => s.removePart);
  const stats = useBuildStats();

  const platformLabel = platformId === "aap-01" ? "AAP-01" : "Hi-Capa";
  const designation =
    parts.length === 0
      ? `${platformLabel} — EMPTY CHASSIS`
      : `${platformLabel} — FIELD LOADOUT`;

  return (
    <aside
      className={cn(
        "relative flex w-80 shrink-0 flex-col border-l",
        holo.glassSidebar
      )}
    >
      {/* Floating weapon designation */}
      <div className="pointer-events-none absolute -top-1 right-4 left-4 z-20 -translate-y-full">
        <div className="rounded-sm border border-charcoal-border-light/30 bg-[rgba(22,24,28,0.72)] px-4 py-3 shadow-tactical backdrop-blur-md">
          <p className="font-mono text-[9px] tracking-[0.22em] text-steel uppercase">
            Weapon Designation
          </p>
          <p className="mt-1 font-heading text-base font-bold tracking-wide text-foreground">
            {designation}
          </p>
          <p className="mt-0.5 font-mono text-[10px] text-sage-light/80">
            ${stats.totalCost.toFixed(2)} est. · {stats.partCount} components
          </p>
        </div>
      </div>

      {/* Stat bars */}
      <div className="space-y-4 px-5 pt-6 pb-4">
        <p className={holo.sectionLabel}>
          <span className="text-steel">{"// "}</span>Performance
        </p>
        {STAT_BARS.map(({ key, label }) => (
          <StatProgressBar key={key} label={label} value={stats[key]} />
        ))}
      </div>

      <div className="mx-5 panel-divider" />

      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <p className={holo.sectionLabel}>
          <span className="text-steel">{"// "}</span>Installed Parts
        </p>
        <span className={holo.monoMeta}>{stats.compatibility}% fit</span>
      </div>

      <ScrollArea className="flex-1 px-3 pb-4">
        {parts.length === 0 ? (
          <div className="px-3 py-10 text-center">
            <Package className="mx-auto mb-2 size-5 text-steel/30" />
            <p className={cn("text-xs", holo.bodyMuted)}>No parts installed</p>
            <p className={cn("mt-1", holo.monoMeta)}>SELECT FROM LIBRARY</p>
          </div>
        ) : (
          <div className="space-y-1 px-2">
            {parts.map((part) => (
              <motion.div
                key={part.slotId}
                layout
                variants={holoCardVariants}
                initial="idle"
                whileHover="hover"
                className="group flex items-start gap-2 rounded-sm px-2 py-2.5 hover:bg-white/[0.04]"
              >
                <div className="min-w-0 flex-1">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "border-0 bg-white/[0.06] text-[9px] font-normal px-1.5 py-0",
                      holo.badgeMuted
                    )}
                  >
                    {CATEGORY_LABELS[part.category]}
                  </Badge>
                  <p className={cn("mt-1 truncate", holo.title)}>{part.name}</p>
                  <p className={cn("mt-0.5", holo.accentValue)}>
                    ${part.estimated_price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removePart(part.slotId)}
                  className="shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}
