import type { Metadata } from "next";
import { getAllSports } from "@/lib/queries/sports";
import LeagueForm from "./LeagueForm";

export const metadata: Metadata = {
  title: "Submit a League",
  description:
    "List your sports league or tournament in the Catbalogan City Sports Directory. Free submission, reviewed within 24 hours.",
};

export default async function SubmitLeaguePage() {
  const sports = await getAllSports();
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Submit a League</h1>
      <p className="mb-8 text-gray-500">
        Competitive and recreational leagues in Catbalogan City, Samar.
      </p>
      <LeagueForm sports={sports} />
    </div>
  );
}
