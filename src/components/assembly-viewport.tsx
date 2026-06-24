import { Box } from "lucide-react";

import { cn } from "@/lib/utils";

type AssemblyViewportProps = {
  partCount: number;
  className?: string;
};

/** Realistic 3D viewport mock — soft lighting, floor grid, measurement HUD */
export function AssemblyViewport({ partCount, className }: AssemblyViewportProps) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-sm border border-charcoal-border-light shadow-viewport",
        className
      )}
    >
      {/* Viewport background */}
      <div className="absolute inset-0 bg-charcoal-deep" />
      <div className="absolute inset-0 bg-viewport-light" />
      <div className="absolute inset-0 viewport-floor opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0b0a_95%)]" />

      {/* Measurement lines — horizontal */}
      <div className="pointer-events-none absolute top-[18%] right-[12%] left-[12%] flex items-center">
        <div className="h-px flex-1 bg-steel-dim/50" />
        <span className="mx-2 font-mono text-[9px] text-steel">184.2 mm</span>
        <div className="h-px flex-1 bg-steel-dim/50" />
      </div>
      {/* Measurement lines — vertical */}
      <div className="pointer-events-none absolute top-[18%] bottom-[28%] left-[18%] flex flex-col items-center">
        <div className="w-px flex-1 bg-steel-dim/50" />
        <span className="my-1 font-mono text-[9px] text-steel [writing-mode:vertical-rl]">
          62.8 mm
        </span>
        <div className="w-px flex-1 bg-steel-dim/50" />
      </div>

      {/* Center reticle */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="size-32 border border-steel-dim/30" />
        <div className="absolute top-1/2 right-0 left-0 h-px bg-steel-dim/25" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-steel-dim/25" />
      </div>

      {/* 3D object placeholder with soft shading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%]">
        <div className="relative">
          {/* Ground shadow */}
          <div className="absolute -bottom-3 left-1/2 h-3 w-24 -translate-x-1/2 rounded-[100%] bg-black/40 blur-sm" />
          {/* Object body */}
          <div
            className={cn(
              "relative flex size-28 items-center justify-center sm:size-32",
              "rounded-sm border border-charcoal-border-light",
              "bg-gradient-to-b from-[#2a2d2a] via-[#1e211e] to-[#141614]"
            )}
          >
            <Box className="size-14 text-steel/40 sm:size-16" strokeWidth={0.6} />
            {/* Top-edge highlight — soft studio light */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/[0.06] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white/[0.03] to-transparent" />
          </div>
          {/* Corner brackets */}
          {(["tl", "tr", "bl", "br"] as const).map((c) => (
            <span
              key={c}
              className={cn(
                "absolute size-4 hud-corner",
                c === "tl" && "-top-2 -left-2 border-t border-l",
                c === "tr" && "-top-2 -right-2 border-t border-r",
                c === "bl" && "-bottom-2 -left-2 border-b border-l",
                c === "br" && "-right-2 -bottom-2 border-b border-r"
              )}
            />
          ))}
        </div>
      </div>

      {/* Viewport HUD overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2">
        <span className="font-mono text-[9px] tracking-wider text-steel uppercase">
          Cam: Perspective
        </span>
        <span className="font-mono text-[9px] text-steel">
          FOV 45° · Units: mm
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-charcoal-border/60 bg-charcoal-black/60 px-3 py-1.5">
        <span className="font-mono text-[9px] text-steel">
          {partCount === 0 ? "NO MESH LOADED" : `${partCount} MESH${partCount !== 1 ? "ES" : ""} ACTIVE`}
        </span>
        <span className="font-mono text-[9px] text-sage-light/80">
          RENDER: STANDBY
        </span>
      </div>
    </div>
  );
}
