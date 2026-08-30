import type { Metadata } from "next";
import { defaultMetadata, SITE_NAME, SITE_LOCATION } from "@/lib/metadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catbalogansports.com";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PH">
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description: `The #1 sports directory for ${SITE_LOCATION}.`,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
