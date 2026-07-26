import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt =
  "Bukky - software para gestionar citas, clientes y operaciones";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public", "bukky_logo_completo.svg"),
    "utf8",
  );
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString(
    "base64",
  )}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          padding: "72px",
          color: "#F6F6F7",
          background:
            "radial-gradient(circle at 20% 20%, rgba(151,89,239,0.42), transparent 34%), radial-gradient(circle at 82% 24%, rgba(255,230,51,0.24), transparent 34%), linear-gradient(135deg, #1E1E1E 0%, #111116 100%)",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 34,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 34,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -88,
            bottom: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,230,51,0.18), rgba(151,89,239,0.08) 46%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="Bukky" width={254} height={60} />
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "10px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,230,51,0.35)",
                color: "#FFE633",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              SaaS para negocios con citas
            </div>
            <h1
              style={{
                margin: 0,
                maxWidth: 760,
                color: "#FFFFFF",
                fontSize: 76,
                lineHeight: 0.98,
                fontWeight: 760,
                letterSpacing: "-0.035em",
              }}
            >
              Agenda, clientes y operaciones en un solo lugar.
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: 720,
                color: "rgba(246,246,247,0.72)",
                fontSize: 27,
                lineHeight: 1.36,
              }}
            >
              Reservas online, recordatorios y control diario para psicologia,
              barberias, clinicas y negocios de servicios.
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
