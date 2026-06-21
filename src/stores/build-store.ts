import { useMemo } from "react";
import { create } from "zustand";

import type { BuildPart, BuildStats, Part, PlatformId } from "@/lib/types";

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

  return { totalCost, partCount, estimatedFps, compatibility };
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
