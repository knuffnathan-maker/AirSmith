import { PLATFORMS, getPartsForPlatform } from "@/lib/mock-data";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { mapPart, mapPlatform } from "@/lib/supabase/mappers";
import type { Part, Platform, PlatformId } from "@/lib/types";

export async function fetchPlatforms(): Promise<Platform[]> {
  if (!isSupabaseConfigured()) {
    return PLATFORMS;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("platforms")
      .select("id, name, description")
      .order("id");

    if (error) throw error;
    if (!data?.length) return PLATFORMS;

    return data.map(mapPlatform);
  } catch (err) {
    console.warn("[AirSmith] Supabase platforms fetch failed, using mock data:", err);
    return PLATFORMS;
  }
}

export async function fetchPartsForPlatform(platformId: PlatformId): Promise<Part[]> {
  if (!isSupabaseConfigured()) {
    return getPartsForPlatform(platformId);
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("parts")
      .select("id, name, category, stl_url, estimated_price, durability_note, compatibility")
      .contains("compatibility", [platformId])
      .order("category")
      .order("name");

    if (error) throw error;
    if (!data?.length) return getPartsForPlatform(platformId);

    return data.map(mapPart);
  } catch (err) {
    console.warn("[AirSmith] Supabase parts fetch failed, using mock data:", err);
    return getPartsForPlatform(platformId);
  }
}
