import type { Part, PartCategory, Platform, PlatformId } from "@/lib/types";

export interface PlatformRow {
  id: string;
  name: string;
  description: string;
}

export interface PartRow {
  id: string;
  name: string;
  category: string;
  stl_url: string;
  estimated_price: number | string;
  durability_note: string;
  compatibility: string[];
}

export function mapPlatform(row: PlatformRow): Platform {
  return {
    id: row.id as PlatformId,
    name: row.name,
    description: row.description,
  };
}

export function mapPart(row: PartRow): Part {
  return {
    id: row.id,
    name: row.name,
    category: row.category as PartCategory,
    stl_url: row.stl_url,
    estimated_price: Number(row.estimated_price),
    durability_note: row.durability_note,
    compatibility: row.compatibility as PlatformId[],
  };
}
