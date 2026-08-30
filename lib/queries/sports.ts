import { createClient } from "@/lib/supabase/server";
import type { Sport } from "@/lib/supabase/types";

export async function getAllSports(): Promise<Sport[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sports")
    .select("*")
    .order("name");

  if (error) throw new Error(error.message);
  return data as Sport[];
}

export async function getSportBySlug(slug: string): Promise<Sport | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sports")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Sport;
}
