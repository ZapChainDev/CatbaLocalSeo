import { createClient } from "@/lib/supabase/server";
import type { Venue } from "@/lib/supabase/types";

export async function getDraftVenues(): Promise<Venue[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("venues")
    .select("*")
    .eq("status", "draft")
    .order("created_at", { ascending: false });
  return (data ?? []) as Venue[];
}
