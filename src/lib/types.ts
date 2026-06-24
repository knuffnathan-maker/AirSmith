export type PlatformId = "aap-01" | "hi-capa";

export interface Platform {
  id: PlatformId;
  name: string;
  description: string;
}

export type PartCategory =
  | "frame"
  | "slide"
  | "barrel"
  | "hop-up"
  | "magazine"
  | "grip"
  | "trigger"
  | "sights";

export interface Part {
  id: string;
  name: string;
  category: PartCategory;
  stl_url: string;
  estimated_price: number;
  durability_note: string;
  compatibility: PlatformId[];
}

export interface BuildPart extends Part {
  slotId: string;
}

export interface BuildState {
  platformId: PlatformId;
  parts: BuildPart[];
}

export interface BuildStats {
  totalCost: number;
  partCount: number;
  estimatedFps: number;
  compatibility: number;
  control: number;
  handling: number;
  accuracy: number;
  range: number;
}
