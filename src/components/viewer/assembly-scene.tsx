"use client";

import { Suspense } from "react";
import {
  ContactShadows,
  Grid,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { PartModel } from "@/components/viewer/part-model";
import { PlaceholderGun } from "@/components/viewer/placeholder-gun";
import type { BuildPart } from "@/lib/types";

type AssemblySceneProps = {
  parts: BuildPart[];
  showGrid: boolean;
  onControlsReady?: (controls: OrbitControlsImpl | null) => void;
};

export function AssemblyScene({
  parts,
  showGrid,
  onControlsReady,
}: AssemblySceneProps) {
  return (
    <>
      <color attach="background" args={["#0e100e"]} />
      <fog attach="fog" args={["#0e100e", 8, 18]} />

      <PerspectiveCamera makeDefault position={[1.8, 1.1, 2.2]} fov={45} />

      <ambientLight intensity={0.3} />
      <hemisphereLight args={["#9aa3ab", "#121413", 0.35]} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} />

      <OrbitControls
        makeDefault
        enablePan
        enableDamping
        dampingFactor={0.06}
        minDistance={1.2}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2 + 0.15}
        target={[0, 0, 0]}
        ref={(node) => onControlsReady?.(node)}
      />

      {showGrid && (
        <Grid
          position={[0, -0.35, 0]}
          args={[12, 12]}
          cellSize={0.25}
          cellThickness={0.4}
          cellColor="#3a3f3a"
          sectionSize={1}
          sectionThickness={0.8}
          sectionColor="#4a5048"
          fadeDistance={14}
          fadeStrength={1.2}
          infiniteGrid
        />
      )}

      <ContactShadows
        position={[0, -0.34, 0]}
        opacity={0.45}
        scale={8}
        blur={2.5}
        far={4}
      />

      {parts.length === 0 ? (
        <PlaceholderGun />
      ) : (
        <group>
          {parts.map((part) => (
            <PartModel key={part.slotId} part={part} />
          ))}
        </group>
      )}
    </>
  );
}
