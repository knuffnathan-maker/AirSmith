import { Crosshair, Download, FileJson, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { holo } from "@/lib/holo-styles";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header
      className={cn(
        "relative flex h-14 shrink-0 items-center justify-between border-b px-5 shadow-tactical-sm",
        holo.panel
      )}
    >
      <div className="absolute inset-x-0 bottom-0 panel-divider" />

      <div className="flex items-center gap-4">
        <div className="flex size-9 items-center justify-center rounded-sm border border-charcoal-border-light bg-charcoal-raised">
          <Crosshair className="size-4 text-sage-light" strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-0.5">
          <h1 className={holo.logo}>AirSmith</h1>
          <p className={holo.logoSub}>Tactical Mod Bench · v0.1</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className={cn("hidden sm:inline-flex", holo.iconBtn)}>
          <Share2 />
          Share Build
        </Button>
        <div className="hidden h-5 w-px bg-charcoal-border sm:block" />
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
