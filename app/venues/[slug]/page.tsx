import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getVenueBySlug, getVenueSlugs } from "@/lib/queries/venues";
import { buildListingMetadata } from "@/lib/metadata";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getVenueSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return {};
  return buildListingMetadata({
    title: venue.name,
    description: venue.description,
    slug: venue.slug,
    section: "venues",
    image: venue.image_url,
  });
}

export default async function VenuePage({ params }: Props) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) notFound();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "SportsActivityLocation"],
          name: venue.name,
          description: venue.description ?? undefined,
          url: venue.website ?? undefined,
          telephone: venue.phone ?? undefined,
          image: venue.image_url ?? undefined,
          ...(venue.facebook_url || venue.website
            ? {
                sameAs: [
                  venue.facebook_url,
                  venue.website,
                ].filter(Boolean),
              }
            : {}),
          address: {
            "@type": "PostalAddress",
            streetAddress: venue.address ?? undefined,
            addressLocality: venue.city,
            addressRegion: venue.state,
            postalCode: venue.zip ?? undefined,
            addressCountry: "PH",
          },
          ...(venue.lat && venue.lng
            ? {
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: venue.lat,
                  longitude: venue.lng,
                },
              }
            : {}),
        }}
      />
      <Breadcrumb
        items={[{ label: "Venues", href: "/venues" }, { label: venue.name }]}
      />

      {venue.image_url && (
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl">
          <Image
            src={venue.image_url}
            alt={`${venue.name} in ${venue.city}`}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-start gap-3">
        <h1 className="text-3xl font-bold">{venue.name}</h1>
        {venue.sports && <Badge variant="blue">{venue.sports.name}</Badge>}
      </div>

      {venue.description && (
        <p className="mb-8 text-lg leading-relaxed text-gray-600">
          {venue.description}
        </p>
      )}

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {venue.address && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-gray-900">{venue.address}</dd>
          </div>
        )}
        <div>
          <dt className="text-sm font-medium text-gray-500">Location</dt>
          <dd className="mt-1 text-gray-900">
            {[venue.city, venue.state, venue.zip].filter(Boolean).join(", ")}
          </dd>
        </div>
        {venue.phone && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1">
              <a
                href={`tel:${venue.phone}`}
                className="text-blue-600 hover:underline"
              >
                {venue.phone}
              </a>
            </dd>
          </div>
        )}
        {venue.website && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            <dd className="mt-1">
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {venue.website}
              </a>
            </dd>
          </div>
        )}
        {venue.facebook_url && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Facebook</dt>
            <dd className="mt-1">
              <a
                href={venue.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {venue.facebook_url}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
