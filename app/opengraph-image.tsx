import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f2044",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#93c5fd",
            marginBottom: 24,
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          LAWSUITSCLAIM.COM
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            maxWidth: 800,
          }}
        >
          Legal Claims Explained Clearly
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            marginTop: 28,
          }}
        >
          Plain-English guides to lawsuits, settlements, and legal claims
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
