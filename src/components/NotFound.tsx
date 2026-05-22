import { useNavigate } from "react-router-dom";

// Cateno logo mark — filled node connected to an empty node via an edge
function LogoMark() {
  return (
    <svg
      width="48"
      height="20"
      viewBox="0 0 48 20"
      fill="none"
      aria-hidden
      style={{ opacity: 0.3 }}
    >
      {/* Edge line */}
      <line x1="10" y1="10" x2="38" y2="10" stroke="#E8E3D5" strokeWidth="1.5" />
      {/* Filled source node */}
      <circle cx="10" cy="10" r="5" fill="#E8E3D5" />
      {/* Empty target node */}
      <circle cx="38" cy="10" r="5" fill="none" stroke="#E8E3D5" strokeWidth="1.5" />
    </svg>
  );
}

// Faint background pattern — disconnected nodes and edges suggesting a broken graph
function BrokenGraphPattern() {
  return (
    <svg
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.02,
      }}
    >
      <defs>
        <pattern id="broken-graph" x="0" y="0" width="320" height="240" patternUnits="userSpaceOnUse">
          {/* Fragment 1 — two connected nodes, top-left */}
          <circle cx="40"  cy="50"  r="5"   fill="none" stroke="#E8E3D5" strokeWidth="1.2" />
          <circle cx="110" cy="50"  r="5"   fill="#E8E3D5" />
          <line x1="45" y1="50" x2="105" y2="50" stroke="#E8E3D5" strokeWidth="1" />

          {/* Fragment 2 — isolated node */}
          <circle cx="220" cy="80"  r="5"   fill="none" stroke="#E8E3D5" strokeWidth="1.2" />

          {/* Fragment 3 — broken edge going nowhere */}
          <circle cx="60"  cy="160" r="5"   fill="#E8E3D5" />
          <line x1="65" y1="160" x2="130" y2="140" stroke="#E8E3D5" strokeWidth="1" strokeDasharray="4 6" />

          {/* Fragment 4 — two nodes, partial connection */}
          <circle cx="200" cy="170" r="5"   fill="none" stroke="#E8E3D5" strokeWidth="1.2" />
          <circle cx="280" cy="150" r="5"   fill="#E8E3D5" />
          <line x1="205" y1="168" x2="275" y2="153" stroke="#E8E3D5" strokeWidth="1" />

          {/* Fragment 5 — isolated node, bottom */}
          <circle cx="150" cy="210" r="5"   fill="none" stroke="#E8E3D5" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#broken-graph)" />
    </svg>
  );
}

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "radial-gradient(ellipse at center, #1a1208 0%, #0D0D0D 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BrokenGraphPattern />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* Logo mark */}
        <LogoMark />

        {/* 404 */}
        <p
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 120,
            fontWeight: 400,
            color: "#E8E3D5",
            opacity: 0.6,
            lineHeight: 1,
            margin: "24px 0 0",
            letterSpacing: "-0.02em",
          }}
        >
          404
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 28,
            fontWeight: 400,
            color: "#E8E3D5",
            margin: "20px 0 0",
            lineHeight: 1.3,
          }}
        >
          This thread doesn't exist.
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 15,
            color: "#E8E3D5",
            opacity: 0.4,
            fontStyle: "italic",
            margin: "16px 0 0",
            lineHeight: 1.6,
            maxWidth: 360,
          }}
        >
          The node you're looking for was never part of the chain —<br />
          or the chain has been rewritten.
        </p>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 40,
            background: "none",
            border: "none",
            fontFamily: "DM Sans, sans-serif",
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#E8E3D5",
            opacity: 0.35,
            cursor: "pointer",
            padding: "4px 0",
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
        >
          ← Back to Cateno
        </button>
      </div>
    </div>
  );
}
