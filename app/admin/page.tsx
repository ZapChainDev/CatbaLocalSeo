import { getDraftVenues } from "@/lib/queries/admin";
import { approveSubmission, rejectSubmission } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const venues = await getDraftVenues();
  const total = venues.length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Pending Submissions
        </h1>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
          {total} awaiting review
        </span>
      </div>

      {total === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-gray-500">
          No pending submissions — all clear! ✅
        </div>
      )}

      <Section title="Listings" count={venues.length}>
        {venues.map((v) => (
          <SubmissionCard
            key={v.id}
            title={v.name}
            meta={[v.address, v.city, v.state].filter(Boolean).join(", ")}
            description={v.description}
            phone={v.phone}
            website={v.website}
            facebook={v.facebook_url}
            createdAt={v.created_at}
            approveAction={approveSubmission.bind(null, "venues", v.id)}
            rejectAction={rejectSubmission.bind(null, "venues", v.id)}
          />
        ))}
      </Section>
    </div>
  );
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  if (count === 0) return null;
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">
        {title}{" "}
        <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-sm font-normal text-gray-500">
          {count}
        </span>
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function SubmissionCard({
  title,
  meta,
  description,
  phone,
  website,
  facebook,
  createdAt,
  approveAction,
  rejectAction,
}: {
  title: string;
  meta: string;
  description: string | null;
  phone?: string | null;
  website?: string | null;
  facebook?: string | null;
  createdAt: string;
  approveAction: () => Promise<void>;
  rejectAction: () => Promise<void>;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{meta}</p>
        {description && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        )}
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
          {phone && <span>📞 {phone}</span>}
          {website && <span>🔗 {website}</span>}
          {facebook && <span>👤 {facebook}</span>}
          <span>
            Submitted {new Date(createdAt).toLocaleDateString("en-PH")}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <form action={approveAction}>
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Approve
          </button>
        </form>
        <form action={rejectAction}>
          <button
            type="submit"
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            Reject
          </button>
        </form>
      </div>
    </div>
  );
}
