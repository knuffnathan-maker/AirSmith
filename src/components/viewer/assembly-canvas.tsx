"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { AssemblyScene } from "@/components/viewer/assembly-scene";
import type { BuildPart } from "@/lib/types";
import { cn } from "@/lib/utils";

type AssemblyCanvasProps = {
  parts: BuildPart[];
  className?: string;
  onControlsReady?: (controls: OrbitControlsImpl | null) => void;
  showGrid?: boolean;
};

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="#3d413c" wireframe />
    </mesh>
  );
}

export function AssemblyCanvas({
  parts,
  className,
  onControlsReady,
  showGrid = true,
}: AssemblyCanvasProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className={cn("relative size-full", className)}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        onCreated={() => setReady(true)}
      >
        <Suspense fallback={<LoadingFallback />}>
          <AssemblyScene
            parts={parts}
            showGrid={showGrid}
            onControlsReady={onControlsReady}
          />
        </Suspense>
      </Canvas>

      {/* HUD overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2">
        <span className="font-mono text-[9px] tracking-wider text-steel uppercase">
          Cam: Perspective
        </span>
        <span className="font-mono text-[9px] text-steel">
          FOV 45° · Units: mm
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-charcoal-border/60 bg-charcoal-black/70 px-3 py-1.5">
        <span className="font-mono text-[9px] text-steel">
          {parts.length === 0
            ? "PLACEHOLDER MESH"
            : `${parts.length} MESH${parts.length !== 1 ? "ES" : ""} ACTIVE`}
        </span>
        <span className="font-mono text-[9px] text-sage-light/80">
          {ready ? "RENDER: LIVE" : "RENDER: INIT"}
        </span>
      </div>

      {/* Corner brackets */}
      {(["tl", "tr", "bl", "br"] as const).map((c) => (
        <span
          key={c}
          className={cn(
            "pointer-events-none absolute size-4 hud-corner",
            c === "tl" && "top-2 left-2 border-t border-l",
            c === "tr" && "top-2 right-2 border-t border-r",
            c === "bl" && "bottom-8 left-2 border-b border-l",
            c === "br" && "right-2 bottom-8 border-r border-b"
          )}
        />
      ))}
    </div>
  );
}
