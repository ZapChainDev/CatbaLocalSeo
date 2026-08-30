import type { MetadataRoute } from "next";
import { getAllSports } from "@/lib/queries/sports";
import { getVenueSlugs } from "@/lib/queries/venues";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catba-local-seo.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [sports, venueSlugs] = await Promise.all([
    getAllSports(),
    getVenueSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/sports`, priority: 0.9 },
    { url: `${SITE_URL}/venues`, priority: 0.9 },
    { url: `${SITE_URL}/submit`, priority: 0.6 },
  ];

  return [
    ...staticRoutes,
    ...sports.map((s) => ({
      url: `${SITE_URL}/sports/${s.slug}`,
      priority: 0.8 as const,
    })),
    ...venueSlugs.map((slug) => ({
      url: `${SITE_URL}/venues/${slug}`,
      priority: 0.7 as const,
    })),
  ];
}
