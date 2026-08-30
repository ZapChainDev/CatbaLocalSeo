import type { Metadata } from "next";

export const SITE_NAME = "Catbalogan Sports Listings";
export const SITE_LOCATION = "Catbalogan City, Samar";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catba-local-seo.vercel.app";
const SITE_DESCRIPTION =
  "Find sports businesses in Catbalogan City, Samar — courts, gyms, boxing clubs, pickleball courts, swimming pools, and more. Browse by sport or location.";

export const defaultMetadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "sports business Catbalogan City",
    "Catbalogan sports listings",
    "basketball court Catbalogan",
    "gym Catbalogan City",
    "boxing gym Catbalogan",
    "pickleball court Catbalogan",
    "sports venue Catbalogan Samar",
    "volleyball court Catbalogan",
    "swimming pool Catbalogan",
    "sports facility Catbalogan",
    "Samar sports",
    "Eastern Visayas sports",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export function buildListingMetadata({
  title,
  description,
  slug,
  section,
  image,
}: {
  title: string;
  description: string | null;
  slug: string;
  section: string;
  image?: string | null;
}): Metadata {
  const desc = description ?? `${title} in ${SITE_LOCATION} — ${SITE_NAME}`;
  return {
    title,
    description: desc,
    alternates: { canonical: `/${section}/${slug}` },
    openGraph: {
      title,
      description: desc,
      url: `/${section}/${slug}`,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}
