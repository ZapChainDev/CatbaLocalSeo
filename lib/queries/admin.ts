import { createClient } from "@/lib/supabase/server";
import type { Venue, Team, League } from "@/lib/supabase/types";

export async function getDraftVenues(): Promise<Venue[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("venues")
    .select("*")
    .eq("status", "draft")
    .order("created_at", { ascending: false });
  return (data ?? []) as Venue[];
}

export async function getDraftTeams(): Promise<Team[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("teams")
    .select("*")
    .eq("status", "draft")
    .order("created_at", { ascending: false });
  return (data ?? []) as Team[];
}

export async function getDraftLeagues(): Promise<League[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leagues")
    .select("*")
    .eq("status", "draft")
    .order("created_at", { ascending: false });
  return (data ?? []) as League[];
}
