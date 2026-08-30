import { createClient } from "@/lib/supabase/server";
import type { Team, TeamWithRelations } from "@/lib/supabase/types";

export async function getAllTeams(): Promise<Team[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .order("name");

  if (error) throw new Error(error.message);
  return data as Team[];
}

export async function getTeamBySlug(
  slug: string,
): Promise<TeamWithRelations | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teams")
    .select("*, sports(id, name, slug), leagues(id, name, slug)")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as TeamWithRelations;
}

export async function getTeamsBySport(sportId: string): Promise<Team[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("sport_id", sportId)
    .order("name");

  if (error) throw new Error(error.message);
  return data as Team[];
}

export async function getTeamsByLeague(leagueId: string): Promise<Team[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("league_id", leagueId)
    .order("name");

  if (error) throw new Error(error.message);
  return data as Team[];
}

export async function getTeamSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("teams").select("slug");
  return (data ?? []).map((t: { slug: string }) => t.slug);
}
