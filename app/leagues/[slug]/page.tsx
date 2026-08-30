import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLeagueBySlug, getLeagueSlugs } from "@/lib/queries/leagues";
import { getTeamsByLeague } from "@/lib/queries/teams";
import { buildListingMetadata } from "@/lib/metadata";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import ListingCard from "@/components/ListingCard";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getLeagueSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const league = await getLeagueBySlug(slug);
  if (!league) return {};
  return buildListingMetadata({
    title: league.name,
    description: league.description,
    slug: league.slug,
    section: "leagues",
  });
}

export default async function LeaguePage({ params }: Props) {
  const { slug } = await params;
  const league = await getLeagueBySlug(slug);
  if (!league) notFound();

  const teams = await getTeamsByLeague(league.id);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SportsOrganization",
          name: league.name,
          description: league.description ?? undefined,
          url: league.website ?? undefined,
          sport: league.sports?.name,
          location: league.city
            ? {
                "@type": "Place",
                name: `${league.city}, ${league.state}`,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: league.city,
                  addressRegion: league.state ?? undefined,
                  addressCountry: "PH",
                },
              }
            : undefined,
        }}
      />
      <Breadcrumb
        items={[{ label: "Leagues", href: "/leagues" }, { label: league.name }]}
      />

      <div className="mb-6 flex flex-wrap items-start gap-3">
        <h1 className="text-3xl font-bold">{league.name}</h1>
        {league.sports && <Badge variant="blue">{league.sports.name}</Badge>}
      </div>

      {league.description && (
        <p className="mb-8 text-lg leading-relaxed text-gray-600">
          {league.description}
        </p>
      )}

      <dl className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {league.city && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-gray-900">
              {[league.city, league.state].filter(Boolean).join(", ")}
            </dd>
          </div>
        )}
        {league.website && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            <dd className="mt-1">
              <a
                href={league.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {league.website}
              </a>
            </dd>
          </div>
        )}
      </dl>

      {teams.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Teams in this League</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <ListingCard
                key={team.id}
                name={team.name}
                slug={team.slug}
                section="teams"
                description={team.description}
                location={[team.city, team.state].filter(Boolean).join(", ")}
                imageUrl={team.image_url}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
