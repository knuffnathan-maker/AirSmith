"use client";

import { useMemo } from "react";

export function PlaceholderGun() {
  const bodyMat = useMemo(
    () => (
      <meshStandardMaterial color="#3d413c" metalness={0.5} roughness={0.5} />
    ),
    []
  );
  const slideMat = useMemo(
    () => (
      <meshStandardMaterial color="#4a4f48" metalness={0.55} roughness={0.45} />
    ),
    []
  );
  const barrelMat = useMemo(
    () => (
      <meshStandardMaterial color="#525850" metalness={0.65} roughness={0.35} />
    ),
    []
  );

  return (
    <group position={[0, -0.05, 0]}>
      {/* Frame */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.28, 0.2, 0.65]} />
        {bodyMat}
      </mesh>
      {/* Slide */}
      <mesh castShadow receiveShadow position={[0, 0.1, 0.04]}>
        <boxGeometry args={[0.26, 0.12, 0.5]} />
        {slideMat}
      </mesh>
      {/* Barrel */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.08, 0.38]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.42, 16]} />
        {barrelMat}
      </mesh>
      {/* Grip */}
      <mesh
        castShadow
        receiveShadow
        position={[0, -0.16, -0.1]}
        rotation={[-0.4, 0, 0]}
      >
        <boxGeometry args={[0.14, 0.28, 0.12]} />
        {bodyMat}
      </mesh>
      {/* Magazine */}
      <mesh castShadow receiveShadow position={[0, -0.2, 0]}>
        <boxGeometry args={[0.12, 0.22, 0.08]} />
        <meshStandardMaterial color="#353835" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
}
