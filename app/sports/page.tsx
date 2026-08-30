import type { Metadata } from "next";
import Link from "next/link";
import { getAllSports } from "@/lib/queries/sports";

export const metadata: Metadata = {
  title: "Sports",
  description: "Browse all sports categories in our local sports directory.",
};

export default async function SportsPage() {
  const sports = await getAllSports();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">All Sports</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {sports.map((sport) => (
          <Link
            key={sport.id}
            href={`/sports/${sport.slug}`}
            className="rounded-xl border border-gray-200 p-6 text-center transition-all hover:border-blue-500 hover:shadow-md"
          >
            {sport.icon && (
              <span className="mb-3 block text-3xl">{sport.icon}</span>
            )}
            <span className="font-medium">{sport.name}</span>
            {sport.description && (
              <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                {sport.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
