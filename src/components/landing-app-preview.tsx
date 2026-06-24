import { Box, Check, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

type LandingAppPreviewProps = {
  className?: string;
  large?: boolean;
};

/** CSS mockup of the AirSmith 3-panel builder interface */
export function LandingAppPreview({ className, large }: LandingAppPreviewProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-charcoal-border-light bg-charcoal-panel shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
        large ? "text-[11px]" : "text-[9px] sm:text-[10px]",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-charcoal-border bg-charcoal-raised px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-sage-dim/80" />
          <span className="font-heading text-[10px] font-bold tracking-wider text-foreground uppercase">
            AirSmith
          </span>
          <span className="hidden text-steel sm:inline">— Assembly Mode</span>
        </div>
        <div className="flex gap-1.5">
          <span className="rounded border border-charcoal-border-light px-2 py-0.5 text-steel">
            Export
          </span>
          <span className="rounded border border-sage-dim/40 bg-sage-dim/15 px-2 py-0.5 text-sage-light">
            Share
          </span>
        </div>
      </div>

      <div className={cn("flex", large ? "h-[340px]" : "h-[220px] sm:h-[260px]")}>
        {/* Left — platform + parts */}
        <div className="flex w-[28%] shrink-0 flex-col border-r border-charcoal-border bg-charcoal-black/50">
          <div className="border-b border-charcoal-border p-2.5">
            <p className="mb-1.5 font-heading text-[8px] font-bold tracking-widest text-sage uppercase">
              Platform
            </p>
            <div className="grid grid-cols-2 gap-1">
              <div className="rounded border border-sage-dim/50 bg-sage-dim/15 px-1.5 py-1">
                <p className="font-semibold text-sage-light">AAP-01</p>
              </div>
              <div className="rounded border border-charcoal-border-light px-1.5 py-1 text-steel">
                Hi-Capa
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-1 overflow-hidden p-2">
            <p className="font-heading text-[8px] font-bold tracking-widest text-steel uppercase">
              Parts Library
            </p>
            {["TDC Slide", "Maple Leaf Bucking", "CNC Trigger"].map((name, i) => (
              <div
                key={name}
                className={cn(
                  "flex items-center justify-between rounded border px-1.5 py-1",
                  i === 0
                    ? "border-sage-dim/40 bg-sage-dim/10"
                    : "border-charcoal-border-light bg-charcoal-raised/50"
                )}
              >
                <span className="truncate text-foreground/90">{name}</span>
                {i === 0 ? (
                  <Check className="size-2.5 shrink-0 text-sage-light" />
                ) : (
                  <Plus className="size-2.5 shrink-0 text-steel" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center — 3D viewer */}
        <div className="relative flex min-w-0 flex-1 flex-col bg-[#0e0f0e]">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(122,130,137,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(122,130,137,0.08)_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative flex flex-1 flex-col items-center justify-center p-4">
            <div className="relative">
              <div className="flex size-16 items-center justify-center rounded border border-charcoal-border-light bg-charcoal-panel sm:size-20">
                <Box className="size-8 text-steel/50 sm:size-10" strokeWidth={0.75} />
              </div>
              <span className="absolute -top-1 -left-1 size-3 border-t border-l border-sage-dim/60" />
              <span className="absolute -top-1 -right-1 size-3 border-t border-r border-sage-dim/60" />
              <span className="absolute -bottom-1 -left-1 size-3 border-b border-l border-sage-dim/60" />
              <span className="absolute -right-1 -bottom-1 size-3 border-b border-r border-sage-dim/60" />
            </div>
            <p className="mt-3 font-heading text-[8px] font-bold tracking-widest text-steel uppercase">
              3D Assembly Viewer
            </p>
          </div>
          <div className="border-t border-charcoal-border bg-charcoal-panel/80 px-2 py-1.5">
            <p className="text-[7px] tracking-wider text-steel uppercase">Loaded: TDC Slide</p>
          </div>
        </div>

        {/* Right — build summary */}
        <div className="flex w-[26%] shrink-0 flex-col border-l border-charcoal-border bg-charcoal-black/50">
          <div className="border-b border-charcoal-border p-2.5">
            <p className="font-heading text-[8px] font-bold tracking-widest text-sage uppercase">
              Build Summary
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-sage-light">$247.50</p>
            <p className="text-[7px] text-steel">Est. total cost</p>
          </div>
          <div className="space-y-1.5 p-2">
            {[
              { label: "Compatibility", value: "94%" },
              { label: "Est. FPS", value: "285" },
              { label: "Worth It?", value: "8.2" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded border border-charcoal-border-light bg-charcoal-raised/40 px-1.5 py-1"
              >
                <span className="text-steel">{stat.label}</span>
                <span className="font-mono font-semibold text-accent-blue">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
