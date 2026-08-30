import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const navLinks = [
  { label: "Sports", href: "/sports" },
  { label: "Venues", href: "/venues" },
  { label: "Teams", href: "/teams" },
  { label: "Leagues", href: "/leagues" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0 text-xl font-bold text-blue-600">
          Catbalogan Sports
        </Link>
        <div className="hidden w-64 sm:block">
          <SearchBar placeholder="Search sports, venues..." />
        </div>
        <nav className="flex gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
