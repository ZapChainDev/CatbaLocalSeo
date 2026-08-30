import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

interface ListingCardProps {
  name: string;
  slug: string;
  section: string;
  description?: string | null;
  location?: string | null;
  sport?: string | null;
  imageUrl?: string | null;
}

export default function ListingCard({
  name,
  slug,
  section,
  description,
  location,
  sport,
  imageUrl,
}: ListingCardProps) {
  return (
    <Link
      href={`/${section}/${slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 transition-all hover:border-blue-300 hover:shadow-md"
    >
      {imageUrl && (
        <div className="relative h-40 overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={`${name}${location ? ` in ${location}` : ""}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-blue-600">
          {name}
        </h3>
        {sport && <Badge>{sport}</Badge>}
        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {description}
          </p>
        )}
        {location && <p className="mt-2 text-xs text-gray-400">{location}</p>}
      </div>
    </Link>
  );
}
