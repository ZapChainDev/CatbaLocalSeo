import type { Metadata } from "next";
import { getAllTeams } from "@/lib/queries/teams";
import ListingCard from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Teams",
  description: "Find local sports teams near you.",
};

export default async function TeamsPage() {
  const teams = await getAllTeams();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Local Teams</h1>
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
    </div>
  );
}
