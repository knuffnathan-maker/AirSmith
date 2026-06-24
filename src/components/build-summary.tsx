"use client";

import { motion } from "framer-motion";
import { DollarSign, Gauge, Package, Shield, Trash2, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CATEGORY_LABELS } from "@/lib/mock-data";
import { holoSpring, holoCardVariants, holoPanelVariants } from "@/lib/holo-motion";
import { holo } from "@/lib/holo-styles";
import { useBuildStats, useBuildStore } from "@/stores/build-store";
import { cn } from "@/lib/utils";

function StatRow({
  icon: Icon,
  label,
  value,
  unit,
  accent = "olive",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit?: string;
  accent?: "olive" | "gray";
}) {
  return (
    <motion.div
      variants={holoPanelVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      transition={holoSpring}
      className={holo.statRow}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon
          className={cn(
            "size-3.5",
            accent === "gray" ? "text-tactical-gray" : "text-olive-muted"
          )}
        />
        <span className={holo.bodySmall}>{label}</span>
      </div>
      <span className={cn("text-xs font-medium", holo.accentValue)}>
        {value}
        {unit && <span className="ml-0.5 text-muted-foreground">{unit}</span>}
      </span>
    </motion.div>
  );
}

export function BuildSummary() {
  const parts = useBuildStore((s) => s.parts);
  const removePart = useBuildStore((s) => s.removePart);
  const stats = useBuildStats();

  return (
    <aside className={cn("relative flex w-80 shrink-0 flex-col border-l", holo.panel)}>
      <div className={holo.panelEdgeLeft} />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={holoSpring}
        className="relative border-b border-matte-border px-4 py-3 bg-matte-raised"
      >
        <div className="absolute inset-x-0 bottom-0 panel-divider" />
        <div className="flex items-center justify-between">
          <h2 className={holo.sectionLabel}>
            <span className="text-tactical-gray">{"// "}</span>Build Summary
          </h2>
          <Badge variant="outline" className={holo.badge}>
            {stats.compatibility}% match
          </Badge>
        </div>
        <motion.p
          key={stats.totalCost}
          initial={{ scale: 1.02, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={holoSpring}
          className={cn("mt-2", holo.accentValueLg)}
        >
          ${stats.totalCost.toFixed(2)}
        </motion.p>
        <p className={holo.caption}>Estimated total cost</p>
      </motion.div>

      <div className="space-y-2 p-4">
        <StatRow icon={Package} label="Parts" value={stats.partCount} />
        <StatRow icon={Shield} label="STL Models" value={stats.partCount} accent="gray" />
        <StatRow icon={Zap} label="Est. FPS" value={stats.estimatedFps} unit="fps" />
        <StatRow icon={Gauge} label="Compatibility" value={`${stats.compatibility}%`} accent="gray" />
      </div>

      <div className="mx-4 panel-divider" />

      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <p className={holo.sectionLabel}>
          <span className="text-tactical-gray">{"// "}</span>Installed Parts
        </p>
        <DollarSign className="size-3 text-tactical-gray" />
      </div>

      <ScrollArea className="flex-1 px-2 pb-4">
        {parts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("mx-2 px-4 py-8 text-center", holo.emptyState)}
          >
            <Package className="mx-auto mb-2 size-5 text-tactical-gray/40" />
            <p className={cn("text-xs", holo.bodyMuted)}>No parts added yet</p>
            <p className={cn("mt-1", holo.monoMeta)}>CLICK COMPONENT TO INSTALL</p>
          </motion.div>
        ) : (
          <div className="space-y-1.5 px-2">
            {parts.map((part) => (
              <motion.div
                key={part.slotId}
                layout
                variants={holoCardVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                transition={holoSpring}
                className={cn(
                  "group flex items-start gap-2 rounded-sm border border-matte-border px-3 py-2.5",
                  "bg-matte-raised"
                )}
              >
                <div className="min-w-0 flex-1">
                  <Badge variant="secondary" className={cn("text-[9px] font-normal px-1.5 py-0", holo.badgeMuted)}>
                    {CATEGORY_LABELS[part.category]}
                  </Badge>
                  <p className={cn("mt-1 truncate", holo.title)}>{part.name}</p>
                  <p className={cn("line-clamp-2", holo.bodyMutedSmall)}>
                    {part.durability_note}
                  </p>
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

      {parts.length > 0 && (
        <motion.div
          layout
          className="relative border-t border-matte-border p-4 bg-matte-raised"
        >
          <div className="absolute inset-x-0 top-0 panel-divider" />
          <div className="flex items-center justify-between text-xs">
            <span className={holo.bodyMuted}>Subtotal</span>
            <span className={cn("font-semibold", holo.accentValue)}>
              ${stats.totalCost.toFixed(2)}
            </span>
          </div>
        </motion.div>
      )}
    </aside>
  );
}
