import Link from "next/link";

const footerLinks = [
  { label: "Sports", href: "/sports" },
  { label: "Listings", href: "/venues" },
  { label: "Submit a Listing", href: "/submit" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Local Sports Directory
        </p>
        <nav className="flex gap-4">
          {footerLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
