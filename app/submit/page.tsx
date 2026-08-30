import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submit a Listing",
  description:
    "Add your sports venue, team, or league to the Catbalogan City Sports Directory.",
};

const types = [
  {
    label: "Venue",
    href: "/submit/venue",
    icon: "🏟️",
    desc: "Courts, gyms, fields, pools, and sports facilities",
  },
  {
    label: "Team",
    href: "/submit/team",
    icon: "👥",
    desc: "Local sports teams looking for players or recognition",
  },
  {
    label: "League",
    href: "/submit/league",
    icon: "🏆",
    desc: "Competitive and recreational leagues and tournaments",
  },
];

export default function SubmitPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-3 text-3xl font-bold">Submit a Listing</h1>
      <p className="mb-10 text-gray-600">
        Help grow the Catbalogan City sports community. Submissions are reviewed
        before going live.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {types.map(({ label, href, icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center rounded-xl border border-gray-200 p-6 text-center transition-all hover:border-blue-400 hover:shadow-md"
          >
            <span className="mb-3 text-4xl">{icon}</span>
            <h2 className="mb-1 text-lg font-semibold">{label}</h2>
            <p className="text-sm text-gray-500">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
