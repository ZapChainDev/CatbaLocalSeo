import { createClient } from "@supabase/supabase-js";
import { size, contentType, buildListingOgImage } from "@/lib/og/listingImage";

export { size, contentType };

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data } = await supabase
    .from("teams")
    .select("name, city, sports(name)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  const sport = (data?.sports as unknown as { name: string } | null)?.name;

  return buildListingOgImage({
    type: "TEAM",
    name: data?.name ?? "Sports Team",
    city: data?.city ?? "Catbalogan City",
    sport,
    badgeColor: "#059669",
  });
}
