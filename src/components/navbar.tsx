import { Download, FileJson, Share2, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { holo } from "@/lib/holo-styles";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header
      className={cn(
        "relative flex h-16 shrink-0 items-center justify-between border-b px-5",
        holo.panel,
        "glass-holo backdrop-blur-holo"
      )}
    >
      <div className="absolute inset-x-0 bottom-0 panel-divider" />

      <div className="flex items-center gap-4">
        <div className="relative flex size-10 items-center justify-center rounded-md border border-neon/40 bg-neon/10 neon-glow-btn animate-neon-pulse">
          <Zap className="size-5 text-neon drop-shadow-neon" strokeWidth={2.5} />
          <span className="absolute -inset-px rounded-md border border-neon/20" />
          <span className="absolute -inset-1 rounded-lg bg-neon/10 blur-md" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className={holo.logo}>AirSmith</h1>
          <p className={holo.logoSub}>Holographic 3D Mod Bench</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className={cn("hidden sm:inline-flex", holo.iconBtn)}>
          <Share2 />
          Share Build
        </Button>
        <div className="hidden h-5 w-px bg-gradient-to-b from-transparent via-neon/30 to-transparent sm:block" />
        <Button variant="outline" size="sm" className={holo.outlineBtn}>
          <FileJson />
          Export JSON
        </Button>
        <Button size="sm" className={holo.primaryBtn}>
          <Download />
          Export PDF
        </Button>
      </div>
    </header>
  );
}
