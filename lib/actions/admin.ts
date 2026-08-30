"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionResult = { success: boolean; error?: string };

export async function adminLogin(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const secret = (formData.get("secret") as string)?.trim();
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return { success: false, error: "Invalid password." };
  }
  const cookieStore = await cookies();
  cookieStore.set("admin_session", process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  redirect("/admin");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

export async function approveSubmission(
  table: "venues" | "teams" | "leagues",
  id: string,
) {
  const supabase = await createClient();
  await supabase.from(table).update({ status: "published" }).eq("id", id);
  revalidatePath("/admin");
}

export async function rejectSubmission(
  table: "venues" | "teams" | "leagues",
  id: string,
) {
  const supabase = await createClient();
  await supabase.from(table).update({ status: "rejected" }).eq("id", id);
  revalidatePath("/admin");
}
