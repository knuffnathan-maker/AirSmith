"use client";

import { Suspense } from "react";
import { ContactShadows, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { PartModel } from "@/components/viewer/part-model";
import { PlaceholderGun } from "@/components/viewer/placeholder-gun";
import type { BuildPart } from "@/lib/types";

type AssemblySceneProps = {
  parts: BuildPart[];
  onControlsReady?: (controls: OrbitControlsImpl | null) => void;
};

export function AssemblyScene({ parts, onControlsReady }: AssemblySceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[1.8, 1.1, 2.2]} fov={45} />

      <ambientLight intensity={0.28} />
      <hemisphereLight args={["#8a9098", "#121416", 0.3]} />
      <directionalLight position={[4, 6, 3]} intensity={0.95} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.28} />

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

      <ContactShadows
        position={[0, -0.34, 0]}
        opacity={0.35}
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
