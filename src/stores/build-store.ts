import { useMemo } from "react";
import { create } from "zustand";

import type { BuildPart, BuildStats, Part, PartCategory, PlatformId } from "@/lib/types";

interface BuildStore {
  platformId: PlatformId;
  parts: BuildPart[];
  setPlatform: (platformId: PlatformId) => void;
  addPart: (part: Part) => void;
  removePart: (slotId: string) => void;
  resetBuild: () => void;
}

const INITIAL_PLATFORM: PlatformId = "aap-01";

export const useBuildStore = create<BuildStore>((set, get) => ({
  platformId: INITIAL_PLATFORM,
  parts: [],

  setPlatform: (platformId) => set({ platformId, parts: [] }),

  addPart: (part) => {
    const { parts } = get();
    if (parts.some((p) => p.id === part.id)) return;
    set({
      parts: [
        ...parts,
        { ...part, slotId: `${part.id}-${Date.now()}` },
      ],
    });
  },

  removePart: (slotId) =>
    set((state) => ({
      parts: state.parts.filter((p) => p.slotId !== slotId),
    })),

  resetBuild: () => set({ platformId: INITIAL_PLATFORM, parts: [] }),
}));

export function computeTotalCost(parts: BuildPart[]): number {
  return parts.reduce((sum, part) => sum + part.estimated_price, 0);
}

export function computeWeaponStats(parts: BuildPart[]): Pick<
  BuildStats,
  "control" | "handling" | "accuracy" | "range"
> {
  if (parts.length === 0) {
    return { control: 28, handling: 30, accuracy: 25, range: 22 };
  }

  const has = (cat: PartCategory) => parts.some((p) => p.category === cat);
  const n = parts.length;

  return {
    control: Math.min(
      100,
      32 + n * 5 + (has("grip") ? 12 : 0) + (has("trigger") ? 8 : 0)
    ),
    handling: Math.min(100, 30 + n * 6 + (has("grip") ? 10 : 0)),
    accuracy: Math.min(
      100,
      28 +
        n * 4 +
        (has("barrel") ? 15 : 0) +
        (has("sights") ? 12 : 0) +
        (has("hop-up") ? 8 : 0)
    ),
    range: Math.min(
      100,
      25 + n * 3 + (has("barrel") ? 18 : 0) + (has("hop-up") ? 10 : 0)
    ),
  };
}

export function computeBuildStats(
  parts: BuildPart[],
  platformId: PlatformId
): BuildStats {
  const totalCost = computeTotalCost(parts);
  const partCount = parts.length;
  const compatibleCount = parts.filter((p) =>
    p.compatibility.includes(platformId)
  ).length;
  const compatibility =
    partCount > 0 ? Math.round((compatibleCount / partCount) * 100) : 0;
  const estimatedFps = partCount > 0 ? 280 + partCount * 4 : 0;
  const weapon = computeWeaponStats(parts);

  return {
    totalCost,
    partCount,
    estimatedFps,
    compatibility,
    ...weapon,
  };
}

export function useTotalCost(): number {
  const parts = useBuildStore((s) => s.parts);
  return useMemo(() => computeTotalCost(parts), [parts]);
}

export function useBuildStats(): BuildStats {
  const parts = useBuildStore((s) => s.parts);
  const platformId = useBuildStore((s) => s.platformId);
  return useMemo(
    () => computeBuildStats(parts, platformId),
    [parts, platformId]
  );
}
