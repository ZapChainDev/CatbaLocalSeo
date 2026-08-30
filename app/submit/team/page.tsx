import type { Metadata } from "next";
import { getAllSports } from "@/lib/queries/sports";
import { getAllLeagues } from "@/lib/queries/leagues";
import TeamForm from "./TeamForm";

export const metadata: Metadata = {
  title: "Submit a Team",
  description:
    "List your local sports team in the Catbalogan City Sports Directory. Free submission, reviewed within 24 hours.",
};

export default async function SubmitTeamPage() {
  const [sports, leagues] = await Promise.all([
    getAllSports(),
    getAllLeagues(),
  ]);
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Submit a Team</h1>
      <p className="mb-8 text-gray-500">
        Local sports teams in Catbalogan City, Samar.
      </p>
      <TeamForm sports={sports} leagues={leagues} />
    </div>
  );
}
