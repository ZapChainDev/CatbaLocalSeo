import { createClient } from "@/lib/supabase/server";
import type { League, LeagueWithSport } from "@/lib/supabase/types";

export async function getAllLeagues(): Promise<League[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leagues")
    .select("*")
    .eq("status", "published")
    .order("name");

  if (error) throw new Error(error.message);
  return data as League[];
}

export async function getLeagueBySlug(
  slug: string,
): Promise<LeagueWithSport | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leagues")
    .select("*, sports(id, name, slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as LeagueWithSport;
}

export async function getLeagueSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leagues")
    .select("slug")
    .eq("status", "published");
  return (data ?? []).map((l: { slug: string }) => l.slug);
}
