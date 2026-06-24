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
}: AssemblyCanvasProps) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={cn(
        "relative size-full bg-gradient-to-b from-[#1a1c1e] via-[#121416] to-[#0c0d0f]",
        className
      )}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          setReady(true);
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <AssemblyScene parts={parts} onControlsReady={onControlsReady} />
        </Suspense>
      </Canvas>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.62)_100%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2">
        <span className="font-mono text-[9px] tracking-wider text-steel/80 uppercase">
          Cam: Perspective
        </span>
        <span className="font-mono text-[9px] text-steel/80">FOV 45° · Units: mm</span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-1.5">
        <span className="font-mono text-[9px] text-steel/70">
          {parts.length === 0
            ? "PLACEHOLDER MESH"
            : `${parts.length} MESH${parts.length !== 1 ? "ES" : ""} ACTIVE`}
        </span>
        <span className="font-mono text-[9px] text-sage-light/70">
          {ready ? "RENDER: LIVE" : "RENDER: INIT"}
        </span>
      </div>
    </div>
  );
}
