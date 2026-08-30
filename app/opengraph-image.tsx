import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #1a5276 60%, #0e6655 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#34d399",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 24,
          }}
        >
          🏆 Catbalogan City, Samar · Philippines
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          Catbalogan Sports Directory
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#93c5fd",
            marginTop: 28,
            textAlign: "center",
          }}
        >
          Venues · Teams · Leagues · Sports
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#6b9fcf",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          catba-local-seo.vercel.app
        </div>
      </div>
    ),
    size,
  );
}
