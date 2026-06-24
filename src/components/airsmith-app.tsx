"use client";

import { BuildSummary } from "@/components/build-summary";
import { LeftSidebar } from "@/components/left-sidebar";
import { Navbar } from "@/components/navbar";
import { ViewerArea } from "@/components/viewer-area";

export function AirSmithApp() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-charcoal-void">
      <div className="pointer-events-none absolute inset-0 bg-tactical-bg" />
      <div className="pointer-events-none absolute inset-0 hud-grid opacity-20" />

      <div className="relative z-10 flex h-full flex-col">
        <Navbar />
        <div className="flex min-h-0 flex-1">
          <LeftSidebar />
          <ViewerArea />
          <BuildSummary />
        </div>
      </div>
    </div>
  );
}
