import type { Metadata } from "next";
import { getAllSports } from "@/lib/queries/sports";
import { SITE_LOCATION } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Sports Business Listings — ${"Catbalogan City, Samar"}`,
  description:
    "Find sports businesses in Catbalogan City, Samar — basketball courts, gyms, pickleball courts, boxing clubs, and more. Browse by sport, read reviews, get contact info.",
};

export default async function HomePage() {
  const sports = await getAllSports();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Sports Business Listings — {SITE_LOCATION}
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Find basketball courts, gyms, boxing clubs, pickleball courts, and
          every sports business in Catbalogan City, Samar.
        </p>
      </section>

      {sports.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">Browse by Sport</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {sports.map((sport) => (
              <a
                key={sport.id}
                href={`/sports/${sport.slug}`}
                className="rounded-lg border border-gray-200 p-4 text-center transition-all hover:border-blue-500 hover:shadow-md"
              >
                {sport.icon && (
                  <span className="mb-2 block text-2xl">{sport.icon}</span>
                )}
                <span className="font-medium">{sport.name}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="text-center">
        <a
          href="/venues"
          className="inline-block rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Browse All Listings →
        </a>
      </section>
    </div>
  );
}
