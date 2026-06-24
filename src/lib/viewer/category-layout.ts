import type { PartCategory } from "@/lib/types";

export type LayoutTransform = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
};

/** Assembly offsets per part category — pistol frame along Z axis */
export const CATEGORY_LAYOUT: Record<PartCategory, LayoutTransform> = {
  frame: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
    color: "#3d413c",
  },
  slide: {
    position: [0, 0.12, 0.05],
    rotation: [0, 0, 0],
    scale: 0.95,
    color: "#454a44",
  },
  barrel: {
    position: [0, 0.08, 0.42],
    rotation: [1.57, 0, 0],
    scale: 0.85,
    color: "#525850",
  },
  "hop-up": {
    position: [0, 0.06, 0.18],
    rotation: [0, 0, 0],
    scale: 0.5,
    color: "#4a5048",
  },
  magazine: {
    position: [0, -0.22, -0.02],
    rotation: [0.08, 0, 0],
    scale: 0.75,
    color: "#353835",
  },
  grip: {
    position: [0, -0.14, -0.12],
    rotation: [-0.35, 0, 0],
    scale: 0.8,
    color: "#3a3e38",
  },
  trigger: {
    position: [0, -0.04, -0.08],
    rotation: [0.2, 0, 0],
    scale: 0.35,
    color: "#565c54",
  },
  sights: {
    position: [0, 0.18, -0.15],
    rotation: [0, 0, 0],
    scale: 0.4,
    color: "#5a6058",
  },
};

export function getModelUrl(stlUrl: string): string {
  if (stlUrl.startsWith("http")) return stlUrl;
  return stlUrl.startsWith("/") ? stlUrl : `/${stlUrl}`;
}

export function isGltfUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return lower.endsWith(".glb") || lower.endsWith(".gltf");
}
