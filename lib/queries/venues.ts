import { createClient } from "@/lib/supabase/server";
import type { Venue, VenueWithSport } from "@/lib/supabase/types";

export async function getAllVenues(): Promise<Venue[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .order("name");

  if (error) throw new Error(error.message);
  return data as Venue[];
}

export async function getVenueBySlug(
  slug: string,
): Promise<VenueWithSport | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("venues")
    .select("*, sports(id, name, slug)")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as VenueWithSport;
}

export async function getVenuesBySport(sportId: string): Promise<Venue[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("sport_id", sportId)
    .order("name");

  if (error) throw new Error(error.message);
  return data as Venue[];
}

export async function getVenueSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("venues").select("slug");
  return (data ?? []).map((v: { slug: string }) => v.slug);
}
