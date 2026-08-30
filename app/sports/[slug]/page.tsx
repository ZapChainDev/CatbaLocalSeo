import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSports, getSportBySlug } from "@/lib/queries/sports";
import { getVenuesBySport } from "@/lib/queries/venues";
import { getTeamsBySport } from "@/lib/queries/teams";
import { buildListingMetadata } from "@/lib/metadata";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ListingCard from "@/components/ListingCard";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const sports = await getAllSports();
  return sports.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sport = await getSportBySlug(slug);
  if (!sport) return {};
  return buildListingMetadata({
    title: sport.name,
    description: sport.description,
    slug: sport.slug,
    section: "sports",
  });
}

export default async function SportPage({ params }: Props) {
  const { slug } = await params;
  const sport = await getSportBySlug(slug);
  if (!sport) notFound();

  const [venues, teams] = await Promise.all([
    getVenuesBySport(sport.id),
    getTeamsBySport(sport.id),
  ]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb
        items={[{ label: "Sports", href: "/sports" }, { label: sport.name }]}
      />

      <div className="mb-8 flex items-center gap-4">
        {sport.icon && <span className="text-5xl">{sport.icon}</span>}
        <h1 className="text-3xl font-bold">{sport.name}</h1>
      </div>

      {sport.description && (
        <p className="mb-10 text-lg text-gray-600">{sport.description}</p>
      )}

      {venues.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">{sport.name} Venues</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => (
              <ListingCard
                key={venue.id}
                name={venue.name}
                slug={venue.slug}
                section="venues"
                description={venue.description}
                location={[venue.city, venue.state].filter(Boolean).join(", ")}
                imageUrl={venue.image_url}
              />
            ))}
          </div>
        </section>
      )}

      {teams.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-semibold">{sport.name} Teams</h2>
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
