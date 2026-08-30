import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/metadata";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: allItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            item: item.href ? `${SITE_URL}${item.href}` : undefined,
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
