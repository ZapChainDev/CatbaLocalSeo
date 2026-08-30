import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamBySlug, getTeamSlugs } from "@/lib/queries/teams";
import { buildListingMetadata } from "@/lib/metadata";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getTeamSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) return {};
  return buildListingMetadata({
    title: team.name,
    description: team.description,
    slug: team.slug,
    section: "teams",
    image: team.image_url,
  });
}

export default async function TeamPage({ params }: Props) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) notFound();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SportsTeam",
          name: team.name,
          description: team.description ?? undefined,
          url: team.website ?? undefined,
          sport: team.sports?.name,
          location: {
            "@type": "Place",
            name: `${team.city}, ${team.state}`,
            address: {
              "@type": "PostalAddress",
              addressLocality: team.city,
              addressRegion: team.state,
              addressCountry: "PH",
            },
          },
          email: team.contact_email ?? undefined,
          memberOf: team.leagues
            ? { "@type": "SportsOrganization", name: team.leagues.name }
            : undefined,
        }}
      />
      <Breadcrumb
        items={[{ label: "Teams", href: "/teams" }, { label: team.name }]}
      />

      {team.image_url && (
        <img
          src={team.image_url}
          alt={team.name}
          className="mb-8 h-64 w-full rounded-xl object-cover"
        />
      )}

      <div className="mb-6 flex flex-wrap items-start gap-3">
        <h1 className="text-3xl font-bold">{team.name}</h1>
        {team.sports && <Badge variant="blue">{team.sports.name}</Badge>}
        {team.leagues && <Badge variant="green">{team.leagues.name}</Badge>}
      </div>

      {team.description && (
        <p className="mb-8 text-lg leading-relaxed text-gray-600">
          {team.description}
        </p>
      )}

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-gray-500">Location</dt>
          <dd className="mt-1 text-gray-900">
            {[team.city, team.state].filter(Boolean).join(", ")}
          </dd>
        </div>
        {team.leagues && (
          <div>
            <dt className="text-sm font-medium text-gray-500">League</dt>
            <dd className="mt-1">
              <Link
                href={`/leagues/${team.leagues.slug}`}
                className="text-blue-600 hover:underline"
              >
                {team.leagues.name}
              </Link>
            </dd>
          </div>
        )}
        {team.website && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            <dd className="mt-1">
              <a
                href={team.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {team.website}
              </a>
            </dd>
          </div>
        )}
        {team.contact_email && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Contact</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${team.contact_email}`}
                className="text-blue-600 hover:underline"
              >
                {team.contact_email}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
