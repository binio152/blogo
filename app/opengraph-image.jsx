import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Blogo - Share Your Stories";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(135deg, #DBF3FF 0%, #65BBDF 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "16px solid black",
          position: "relative",
        }}
      >
        {/* Logo Icon */}
        <div
          style={{
            width: "200px",
            height: "200px",
            background: "#65BBDF",
            border: "8px solid black",
            borderRadius: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "-16px 16px 0 rgba(0,0,0,0.8)",
            marginBottom: "40px",
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 7h8M8 11h8M8 15h5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Brand Name */}
        <div
          style={{
            fontSize: "128px",
            fontWeight: 900,
            color: "#000",
            letterSpacing: "-0.05em",
            marginBottom: "20px",
          }}
        >
          Blogo
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "40px",
            fontWeight: 600,
            color: "#333",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Share Your Stories with the World
        </div>

        {/* Neo-brutalism decoration */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "100px",
            height: "100px",
            background: "white",
            border: "4px solid black",
            transform: "rotate(15deg)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
