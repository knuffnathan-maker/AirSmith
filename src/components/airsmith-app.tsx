"use client";

import { BuildSummary } from "@/components/build-summary";
import { LeftSidebar } from "@/components/left-sidebar";
import { Navbar } from "@/components/navbar";
import { ViewerArea } from "@/components/viewer-area";

export function AirSmithApp() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-space-void">
      {/* Ambient holographic layers */}
      <div className="pointer-events-none absolute inset-0 bg-holo-bg" />
      <div className="pointer-events-none absolute inset-0 holo-grid bg-grid opacity-50" />
      <div className="pointer-events-none absolute -top-32 left-1/4 size-96 rounded-full bg-neon/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 -bottom-32 size-80 rounded-full bg-holo-purple/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#030508_80%)]" />

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
