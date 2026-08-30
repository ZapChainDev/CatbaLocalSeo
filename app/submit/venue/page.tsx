import type { Metadata } from "next";
import { getAllSports } from "@/lib/queries/sports";
import VenueForm from "./VenueForm";

export const metadata: Metadata = {
  title: "Submit a Venue",
  description:
    "List your sports venue, court, gym, or field in the Catbalogan City Sports Directory. Free submission, reviewed within 24 hours.",
};

export default async function SubmitVenuePage() {
  const sports = await getAllSports();
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Submit a Venue</h1>
      <p className="mb-8 text-gray-500">
        Courts, gyms, fields, and sports facilities in Catbalogan City, Samar.
      </p>
      <VenueForm sports={sports} />
    </div>
  );
}
