import type { Metadata } from "next";
import { getAllVenues } from "@/lib/queries/venues";
import ListingCard from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Venues",
  description: "Find sports venues, courts, fields, and arenas near you.",
};

export default async function VenuesPage() {
  const venues = await getAllVenues();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Sports Venues</h1>
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
    </div>
  );
}
