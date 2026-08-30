"use server";

import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

export type ActionResult = { success: boolean; error?: string };

async function uniqueSlug(
  table: "venues" | "teams" | "leagues",
  base: string,
): Promise<string> {
  const supabase = await createClient();
  const baseSlug = slugify(base);
  let suffix = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const candidate = suffix === 0 ? baseSlug : `${baseSlug}-${suffix}`;
    const { data } = await supabase
      .from(table)
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data) return candidate;
    suffix++;
  }
}

export async function submitVenue(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return { success: false, error: "Venue name is required." };

  const supabase = await createClient();
  const slug = await uniqueSlug("venues", name);

  const { error } = await supabase.from("venues").insert({
    name,
    slug,
    description: (formData.get("description") as string)?.trim() || null,
    address: (formData.get("address") as string)?.trim() || null,
    city: (formData.get("city") as string)?.trim() || "Catbalogan City",
    state: "Samar",
    phone: (formData.get("phone") as string)?.trim() || null,
    website: (formData.get("website") as string)?.trim() || null,
    sport_id: (formData.get("sport_id") as string) || null,
    status: "draft",
  });

  if (error) return { success: false, error: "Submission failed. Please try again." };
  return { success: true };
}

export async function submitTeam(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return { success: false, error: "Team name is required." };

  const supabase = await createClient();
  const slug = await uniqueSlug("teams", name);

  const { error } = await supabase.from("teams").insert({
    name,
    slug,
    description: (formData.get("description") as string)?.trim() || null,
    city: (formData.get("city") as string)?.trim() || "Catbalogan City",
    state: "Samar",
    sport_id: (formData.get("sport_id") as string) || null,
    league_id: (formData.get("league_id") as string) || null,
    website: (formData.get("website") as string)?.trim() || null,
    contact_email: (formData.get("contact_email") as string)?.trim() || null,
    status: "draft",
  });

  if (error) return { success: false, error: "Submission failed. Please try again." };
  return { success: true };
}

export async function submitLeague(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return { success: false, error: "League name is required." };

  const supabase = await createClient();
  const slug = await uniqueSlug("leagues", name);

  const { error } = await supabase.from("leagues").insert({
    name,
    slug,
    description: (formData.get("description") as string)?.trim() || null,
    city: (formData.get("city") as string)?.trim() || "Catbalogan City",
    state: "Samar",
    sport_id: (formData.get("sport_id") as string) || null,
    website: (formData.get("website") as string)?.trim() || null,
    status: "draft",
  });

  if (error) return { success: false, error: "Submission failed. Please try again." };
  return { success: true };
}
