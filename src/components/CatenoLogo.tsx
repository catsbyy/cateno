// ─── Cateno logo ──────────────────────────────────────────────────────────────
// Mark (SVG) + wordmark (HTML span) in a flex row.
// Using a real <span> for the wordmark avoids SVG text-width measurement issues
// that cause the bounding box to be wider than the visible content, breaking
// centre-alignment.

interface CatenoLogoProps {
  showWordmark?: boolean;
  /** Overall height in px — mark SVG and text scale proportionally. Default: 32 */
  height?: number;
  className?: string;
}

// Mark natural dimensions: 55 wide × 32 tall.
const MARK_NATURAL_W = 55;
const MARK_NATURAL_H = 32;

export function CatenoLogo({ showWordmark = true, height = 32, className }: CatenoLogoProps) {
  const scale   = height / MARK_NATURAL_H;
  const markW   = MARK_NATURAL_W * scale;
  const gap     = Math.round(16 * scale);          // 16px at natural size
  const fontSize = Math.round(22 * scale);         // 22px at natural size

  return (
    <div
      style={{ display: "inline-flex", alignItems: "center", gap }}
      aria-label="Cateno"
      className={className}
    >
      {/* Mark — pure SVG, no text */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${MARK_NATURAL_W} ${MARK_NATURAL_H}`}
        width={markW}
        height={height}
        fill="none"
        aria-hidden
        style={{ flexShrink: 0 }}
      >
        {/* Left node — filled */}
        <circle cx="10" cy="16" r="10" fill="#E8E3D5" />
        {/* Edge */}
        <line x1="20" y1="16" x2="38" y2="16" stroke="#E8E3D5" strokeWidth="1.5" />
        {/* Arrowhead */}
        <path
          d="M34,11 L42,16 L34,21"
          fill="none"
          stroke="#E8E3D5"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Right node — outlined */}
        <circle cx="48" cy="16" r="7" fill="none" stroke="#E8E3D5" strokeWidth="1.5" />
      </svg>

      {/* Wordmark — real HTML text; width matches rendered glyphs exactly */}
      {showWordmark && (
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize,
            color: "#E8E3D5",
            letterSpacing: "0.08em",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          Cateno
        </span>
      )}
    </div>
  );
}
