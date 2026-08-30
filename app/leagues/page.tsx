import type { Metadata } from "next";
import { getAllLeagues } from "@/lib/queries/leagues";
import ListingCard from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Leagues",
  description: "Find local sports leagues and competitions near you.",
};

export default async function LeaguesPage() {
  const leagues = await getAllLeagues();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Local Leagues</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <ListingCard
            key={league.id}
            name={league.name}
            slug={league.slug}
            section="leagues"
            description={league.description}
            location={[league.city, league.state].filter(Boolean).join(", ")}
          />
        ))}
      </div>
    </div>
  );
}
