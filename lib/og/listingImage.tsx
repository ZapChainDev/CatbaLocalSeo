import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ListingOgProps {
  type: "VENUE" | "TEAM" | "LEAGUE";
  name: string;
  city: string;
  sport?: string | null;
  badgeColor: string;
}

export function buildListingOgImage({
  type,
  name,
  city,
  sport,
  badgeColor,
}: ListingOgProps) {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #1a5276 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        fontFamily: "system-ui, sans-serif",
        padding: "60px",
      }}
    >
      {/* Type badge */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          background: badgeColor,
          padding: "6px 18px",
          borderRadius: "999px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 20,
        }}
      >
        {type}
      </div>

      {/* Listing name */}
      <div
        style={{
          fontSize: name.length > 40 ? 52 : 64,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.15,
          marginBottom: 20,
        }}
      >
        {name}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Location */}
        <div
          style={{
            fontSize: 26,
            color: "#93c5fd",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          📍 {city}, Samar
        </div>

        {/* Sport pill */}
        {sport && (
          <div
            style={{
              fontSize: 22,
              color: "#a3e635",
              background: "rgba(255,255,255,0.12)",
              padding: "4px 16px",
              borderRadius: "999px",
            }}
          >
            {sport}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          top: "44px",
          right: "60px",
          fontSize: 18,
          color: "#6b9fcf",
        }}
      >
        Catbalogan Sports Directory
      </div>
    </div>,
    size,
  );
}
