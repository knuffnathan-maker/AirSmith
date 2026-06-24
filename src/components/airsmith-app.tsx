"use client";

import { BuildSummary } from "@/components/build-summary";
import { LeftSidebar } from "@/components/left-sidebar";
import { Navbar } from "@/components/navbar";
import { ViewerArea } from "@/components/viewer-area";

export function AirSmithApp() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#0c0d0f]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#141618] via-[#0c0d0f] to-[#0a0b0a]" />

      <div className="relative z-10 flex h-full flex-col">
        <Navbar />
        <div className="flex min-h-0 flex-1 overflow-visible pt-14">
          <LeftSidebar />
          <ViewerArea />
          <BuildSummary />
        </div>
      </div>
    </div>
  );
}
