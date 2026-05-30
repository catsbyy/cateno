// Feedback button that opens a pre-filled Tally form for the current node.

interface SuggestCorrectionProps {
  scenarioTitle: string;
  nodeTitle: string;
  mobile?: boolean;
}

export function SuggestCorrection({ scenarioTitle, nodeTitle, mobile }: SuggestCorrectionProps) {
  const handleClick = () => {
    const url = `https://tally.so/r/QKOxJ8?scenario=${encodeURIComponent(scenarioTitle)}&node=${encodeURIComponent(nodeTitle)}`;
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <div style={{ borderTop: "1px solid #1e1e1e" }}>
      <button
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          // Mobile: 44px tap target; desktop: comfortable padding
          minHeight: mobile ? 44 : "auto",
          padding: mobile ? "0 20px" : "12px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "DM Sans, sans-serif",
          fontSize: 11,
          color: "#E8E3D5",
          opacity: 0.25,
          textAlign: "left",
          transition: "opacity 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.25")}
      >
        ⚑ Suggest a correction
      </button>
    </div>
  );
}
