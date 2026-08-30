"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLeague } from "@/lib/actions/submit";
import type { Sport } from "@/lib/supabase/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
    >
      {pending ? "Submitting…" : "Submit for Review"}
    </button>
  );
}

export default function LeagueForm({ sports }: { sports: Sport[] }) {
  const [state, action] = useActionState(submitLeague, { success: false });

  if (state.success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="mb-2 text-2xl">✅</p>
        <h2 className="mb-2 text-xl font-semibold text-green-800">
          Submitted successfully!
        </h2>
        <p className="text-green-700">
          Your league is under review and will appear on the site once approved.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <Field label="League Name" name="name" required />
      <Field label="Description" name="description" as="textarea" />
      <Field label="City / Municipality" name="city" defaultValue="Catbalogan City" />

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Sport</label>
        <select
          name="sport_id"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">— Select a sport —</option>
          {sports.map((s) => (
            <option key={s.id} value={s.id}>
              {s.icon} {s.name}
            </option>
          ))}
        </select>
      </div>

      <Field label="Website" name="website" type="url" placeholder="https://" />

      <SubmitButton />
    </form>
  );
}

function Field({
  label,
  name,
  required,
  as,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  as?: "textarea";
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  const base =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea name={name} rows={3} placeholder={placeholder} className={base} />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={base}
        />
      )}
    </div>
  );
}
