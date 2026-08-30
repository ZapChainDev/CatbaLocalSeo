import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ListingCard from "@/components/ListingCard";
import type { Venue, Team, League, Sport } from "@/lib/supabase/types";

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}"` : "Search",
    description: `Search sports venues, teams, leagues, and sports in Catbalogan City, Samar.`,
    robots: { index: false }, // search results pages should not be indexed
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="mb-4 text-3xl font-bold">Search</h1>
        <p className="text-gray-500">
          Enter a search term to find sports, venues, teams, and leagues.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const like = `%${query}%`;

  const [
    { data: venues },
    { data: teams },
    { data: leagues },
    { data: sports },
  ] = await Promise.all([
    supabase.from("venues").select("*").ilike("name", like).limit(6),
    supabase.from("teams").select("*").ilike("name", like).limit(6),
    supabase.from("leagues").select("*").ilike("name", like).limit(6),
    supabase.from("sports").select("*").ilike("name", like).limit(6),
  ]);

  const total =
    (venues?.length ?? 0) +
    (teams?.length ?? 0) +
    (leagues?.length ?? 0) +
    (sports?.length ?? 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">
        Search results for &ldquo;{query}&rdquo;
      </h1>
      <p className="mb-10 text-gray-500">
        {total} result{total !== 1 ? "s" : ""} found in Catbalogan City, Samar
      </p>

      {total === 0 && (
        <p className="text-gray-500">
          No results found. Try a different keyword like
          &ldquo;basketball&rdquo; or &ldquo;gymnasium&rdquo;.
        </p>
      )}

      {(sports?.length ?? 0) > 0 && (
        <Section title="Sports">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {(sports as Sport[]).map((sport) => (
              <a
                key={sport.id}
                href={`/sports/${sport.slug}`}
                className="rounded-xl border border-gray-200 p-4 text-center transition-all hover:border-blue-500 hover:shadow-md"
              >
                {sport.icon && (
                  <span className="mb-2 block text-2xl">{sport.icon}</span>
                )}
                <span className="font-medium">{sport.name}</span>
              </a>
            ))}
          </div>
        </Section>
      )}

      {(venues?.length ?? 0) > 0 && (
        <Section title="Venues">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(venues as Venue[]).map((venue) => (
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
        </Section>
      )}

      {(teams?.length ?? 0) > 0 && (
        <Section title="Teams">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(teams as Team[]).map((team) => (
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
        </Section>
      )}

      {(leagues?.length ?? 0) > 0 && (
        <Section title="Leagues">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(leagues as League[]).map((league) => (
              <ListingCard
                key={league.id}
                name={league.name}
                slug={league.slug}
                section="leagues"
                description={league.description}
                location={[league.city, league.state]
                  .filter(Boolean)
                  .join(", ")}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
