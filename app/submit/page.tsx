import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submit a Listing",
  description:
    "Add your sports business to the Catbalogan City Sports Listings directory.",
};

const types = [
  {
    label: "Sports Business / Venue",
    href: "/submit/venue",
    icon: "🏟️",
    desc: "Courts, gyms, boxing clubs, pools, pickleball courts, and any sports business",
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
