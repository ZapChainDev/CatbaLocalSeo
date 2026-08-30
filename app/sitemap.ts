import type { MetadataRoute } from "next";
import { getAllSports } from "@/lib/queries/sports";
import { getVenueSlugs } from "@/lib/queries/venues";
import { getTeamSlugs } from "@/lib/queries/teams";
import { getLeagueSlugs } from "@/lib/queries/leagues";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://localsportsdirectory.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [sports, venueSlugs, teamSlugs, leagueSlugs] = await Promise.all([
    getAllSports(),
    getVenueSlugs(),
    getTeamSlugs(),
    getLeagueSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/sports`, priority: 0.9 },
    { url: `${SITE_URL}/venues`, priority: 0.9 },
    { url: `${SITE_URL}/teams`, priority: 0.9 },
    { url: `${SITE_URL}/leagues`, priority: 0.9 },
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
    ...teamSlugs.map((slug) => ({
      url: `${SITE_URL}/teams/${slug}`,
      priority: 0.7 as const,
    })),
    ...leagueSlugs.map((slug) => ({
      url: `${SITE_URL}/leagues/${slug}`,
      priority: 0.7 as const,
    })),
  ];
}
