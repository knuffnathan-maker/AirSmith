"use client";

import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";

import { CATEGORY_LAYOUT } from "@/lib/viewer/category-layout";
import type { PartCategory } from "@/lib/types";

type ProceduralPartProps = ThreeElements["group"] & {
  category: PartCategory;
};

const SHAPES: Record<
  PartCategory,
  { type: "box" | "cylinder"; args: number[] }
> = {
  frame: { type: "box", args: [0.32, 0.22, 0.72] },
  slide: { type: "box", args: [0.3, 0.14, 0.55] },
  barrel: { type: "cylinder", args: [0.035, 0.035, 0.5, 16] },
  "hop-up": { type: "box", args: [0.18, 0.1, 0.12] },
  magazine: { type: "box", args: [0.14, 0.28, 0.1] },
  grip: { type: "box", args: [0.16, 0.3, 0.14] },
  trigger: { type: "box", args: [0.04, 0.1, 0.06] },
  sights: { type: "box", args: [0.08, 0.06, 0.14] },
};

export function ProceduralPart({ category, ...props }: ProceduralPartProps) {
  const layout = CATEGORY_LAYOUT[category];
  const shape = SHAPES[category];

  const material = useMemo(
    () => (
      <meshStandardMaterial
        color={layout.color}
        metalness={0.45}
        roughness={0.55}
      />
    ),
    [layout.color]
  );

  return (
    <group
      position={layout.position}
      rotation={layout.rotation}
      scale={layout.scale}
      {...props}
    >
      {shape.type === "box" ? (
        <mesh castShadow receiveShadow>
          <boxGeometry args={shape.args as [number, number, number]} />
          {material}
        </mesh>
      ) : (
        <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry
            args={shape.args as [number, number, number, number]}
          />
          {material}
        </mesh>
      )}
    </group>
  );
}
