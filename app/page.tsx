import Link from "next/link";
import type { Metadata } from "next";
import { getAllSports } from "@/lib/queries/sports";
import { SITE_LOCATION } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Sports Directory — ${"Catbalogan City, Samar"}`,
  description:
    "Find basketball courts, volleyball teams, boxing gyms, leagues, and sports events in Catbalogan City, Samar, Philippines.",
};

export default async function HomePage() {
  const sports = await getAllSports();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Sports Directory — {SITE_LOCATION}
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Find local basketball courts, volleyball teams, boxing gyms, leagues,
          and sports events in Catbalogan City, Samar.
        </p>
      </section>

      {sports.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">Browse by Sport</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {sports.map((sport) => (
              <Link
                key={sport.id}
                href={`/sports/${sport.slug}`}
                className="rounded-lg border border-gray-200 p-4 text-center transition-all hover:border-blue-500 hover:shadow-md"
              >
                {sport.icon && (
                  <span className="mb-2 block text-2xl">{sport.icon}</span>
                )}
                <span className="font-medium">{sport.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          {
            label: "Venues",
            href: "/venues",
            desc: "Find courts, fields, and arenas near you",
          },
          {
            label: "Teams",
            href: "/teams",
            desc: "Local teams looking for players and fans",
          },
          {
            label: "Leagues",
            href: "/leagues",
            desc: "Join a competitive or recreational league",
          },
        ].map(({ label, href, desc }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl bg-blue-50 p-6 transition-colors hover:bg-blue-100"
          >
            <h3 className="mb-2 text-xl font-semibold">{label}</h3>
            <p className="text-gray-600">{desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
