import { ImageResponse } from "next/og";

export const alt = "Ciel — Deploy without surprise bills";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default Open Graph / Twitter card image for the whole site. Individual
// routes inherit this unless they export their own opengraph-image.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0b1120",
          backgroundImage:
            "radial-gradient(1200px 600px at 100% 0%, rgba(56,189,248,0.22), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(99,102,241,0.18), transparent 55%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #38bdf8, #6366f1)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: "30px", fontWeight: 600, letterSpacing: "0.18em" }}>
            CIEL
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: "82px", fontWeight: 800, lineHeight: 1.05, maxWidth: "900px" }}>
            Deploy without surprise bills
          </div>
          <div style={{ fontSize: "36px", color: "#94a3b8", maxWidth: "880px", lineHeight: 1.3 }}>
            Predictable costs, understandable security, and legible deployment states.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "28px", color: "#cbd5e1" }}>ciel.byronwade.com</div>
          <div style={{ display: "flex", gap: "12px" }}>
            {["Cost", "Security", "Deploys"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: "22px",
                  color: "#e2e8f0",
                  border: "1px solid rgba(148,163,184,0.35)",
                  borderRadius: "999px",
                  padding: "8px 20px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
