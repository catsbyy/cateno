// ─── Per-scenario background personality ──────────────────────────────────────
// Each scenario gets a radial gradient colour tint + a subtle SVG pattern layer.
// Both are pointer-events: none so they never interfere with interaction.

// ─── Gradient tints ────────────────────────────────────────────────────────────
// Radial gradient from a warm/cool tint at center → #0D0D0D at ~70%

// Centre colours exposed separately so selector cards can use them as flat base colours.
export const SCENARIO_CENTRE_COLORS: Record<string, string> = {
  "fall-of-rome":           "#2a1a06",
  "french-revolution":      "#0d1f0d",
  "scientific-revolution":  "#060d1f",
  "wwi":                    "#141a0a",
  "year-without-a-summer":  "#12101a",
  "wright-brothers":        "#0f1218",
  "underwater-archaeology": "#071418",
  "templars":               "#18100a",
  "mongols":                "#1a0e06",
  "polynesia":              "#051418",
};

const SCENARIO_GRADIENTS: Record<string, string> = {
  "fall-of-rome":           "radial-gradient(ellipse at center, #2a1a06 0%, #0D0D0D 70%)",
  "french-revolution":      "radial-gradient(ellipse at center, #0d1f0d 0%, #0D0D0D 70%)",
  "scientific-revolution":  "radial-gradient(ellipse at center, #060d1f 0%, #0D0D0D 70%)",
  "wwi":                    "radial-gradient(ellipse at center, #141a0a 0%, #0D0D0D 70%)",
  "year-without-a-summer":  "radial-gradient(ellipse at center, #12101a 0%, #0D0D0D 70%)",
  "wright-brothers":        "radial-gradient(ellipse at center, #0f1218 0%, #0D0D0D 70%)",
  "underwater-archaeology": "radial-gradient(ellipse at center, #071418 0%, #0D0D0D 70%)",
  "templars":               "radial-gradient(ellipse at center, #18100a 0%, #0D0D0D 70%)",
  "mongols":                "radial-gradient(ellipse at center, #1a0e06 0%, #0D0D0D 70%)",
  "polynesia":              "radial-gradient(ellipse at center, #051418 0%, #0D0D0D 70%)",
};

export function getScenarioGradient(scenarioId: string): string {
  return SCENARIO_GRADIENTS[scenarioId] ?? "#0D0D0D";
}

// ─── SVG pattern components ────────────────────────────────────────────────────

// Fall of Rome — Roman arch repeat
function RomePattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <defs>
        <pattern id="bg-rome" x="0" y="0" width="80" height="96" patternUnits="userSpaceOnUse">
          <rect x="12" y="40" width="8" height="48" fill="none" stroke="#E8E3D5" strokeWidth="1.2" />
          <rect x="60" y="40" width="8" height="48" fill="none" stroke="#E8E3D5" strokeWidth="1.2" />
          <path d="M12 40 Q40 8 68 40" fill="none" stroke="#E8E3D5" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-rome)" />
    </svg>
  );
}

// French Revolution — fleur-de-lis repeat
function FrancePattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <defs>
        <pattern id="bg-france" x="0" y="0" width="64" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M32 12 C32 12 28 20 28 28 C28 34 32 36 32 36 C32 36 36 34 36 28 C36 20 32 12 32 12Z"
            fill="none" stroke="#E8E3D5" strokeWidth="1"
          />
          <path
            d="M32 36 C32 36 22 30 18 24 C16 20 20 16 24 20 C26 22 28 28 28 28"
            fill="none" stroke="#E8E3D5" strokeWidth="1"
          />
          <path
            d="M32 36 C32 36 42 30 46 24 C48 20 44 16 40 20 C38 22 36 28 36 28"
            fill="none" stroke="#E8E3D5" strokeWidth="1"
          />
          <path d="M26 36 L38 36" stroke="#E8E3D5" strokeWidth="1" />
          <path d="M28 38 L36 38" stroke="#E8E3D5" strokeWidth="1" />
          <path d="M30 38 L30 44 M34 38 L34 44" stroke="#E8E3D5" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-france)" />
    </svg>
  );
}

// Scientific Revolution — Copernican orbit diagram (centered, non-repeating)
function SciencePattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <circle cx="50%" cy="50%" r="5" fill="#E8E3D5" />
      {[32, 60, 92, 128, 168, 210].map((r, i) => (
        <circle key={i} cx="50%" cy="50%" r={r} fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
      ))}
      {([
        [32,  10],
        [60,  195],
        [92,  330],
        [128, 80],
        [168, 250],
        [210, 155],
      ] as [number, number][]).map(([r, deg], i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={`calc(50% + ${(r * Math.cos(rad)).toFixed(1)}px)`}
            cy={`calc(50% + ${(r * Math.sin(rad)).toFixed(1)}px)`}
            r="3"
            fill="#E8E3D5"
          />
        );
      })}
    </svg>
  );
}

// WWI — topographic contour repeat
function WWIPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <defs>
        <pattern id="bg-wwi" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
          <path d="M0 20 Q30 10 60 20 Q90 30 120 20" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <path d="M0 40 Q30 28 60 40 Q90 52 120 40" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <path d="M0 60 Q30 48 60 60 Q90 72 120 60" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-wwi)" />
    </svg>
  );
}

// Year Without a Summer — ash particle dots repeat
function SummerPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <defs>
        <pattern id="bg-summer" x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="18" r="1.2" fill="#E8E3D5" />
          <circle cx="38" cy="8"  r="0.8" fill="#E8E3D5" />
          <circle cx="58" cy="26" r="1.5" fill="#E8E3D5" />
          <circle cx="22" cy="44" r="0.9" fill="#E8E3D5" />
          <circle cx="50" cy="50" r="1.1" fill="#E8E3D5" />
          <circle cx="6"  cy="62" r="0.7" fill="#E8E3D5" />
          <circle cx="64" cy="66" r="1.3" fill="#E8E3D5" />
          <circle cx="34" cy="62" r="0.6" fill="#E8E3D5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-summer)" />
    </svg>
  );
}

// Templars — cross pattée repeat
function TemplarsPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <defs>
        <pattern id="bg-templars" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          {/* Cross pattée: translate to tile centre, scale from 1083×1083 source to ~40×40px */}
          <g transform="translate(40, 40) scale(0.037)">
            <path
              d="M358.145 1070.42l370.414 0c-71.7183,-110.608 -132.927,-316.36 -132.927,-469.658 153.3,-0.00354223 359.051,61.2061 469.66,132.926l-0.00118074 -370.413c-132.87,76.4341 -341.723,125.971 -473.362,118.969 0,-153.298 61.2085,-359.049 132.927,-469.658l-370.414 0c71.7183,110.608 132.927,316.36 132.926,469.659 -153.298,0 -359.049,-61.2085 -469.658,-132.927l-0.00236148 370.414c132.874,-76.4341 341.726,-125.97 473.364,-118.97 0,153.298 -61.2085,359.049 -132.927,469.658z"
              fill="white"
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-templars)" />
    </svg>
  );
}

// Underwater Archaeology — sonar ping concentric arcs + depth lines
function UnderwaterPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <defs>
        <pattern id="bg-underwater" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
          <path d="M0,300 Q75,225 150,300"  fill="none" stroke="white" strokeWidth="0.7" />
          <path d="M0,300 Q112,188 225,300" fill="none" stroke="white" strokeWidth="0.6" />
          <path d="M0,300 Q150,150 300,300" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="300" y2="100" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" />
          <line x1="0" y1="200" x2="300" y2="200" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-underwater)" />
    </svg>
  );
}

// Wright Brothers — biplane wing cross-section blueprint repeat
function WrightPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <defs>
        <pattern id="bg-wright" x="0" y="0" width="200" height="120" patternUnits="userSpaceOnUse">
          <path d="M10,30 C40,20 120,18 180,28 C120,32 40,34 10,30 Z"
                fill="none" stroke="white" strokeWidth="0.8" />
          <path d="M10,55 C40,45 120,43 180,53 C120,57 40,59 10,55 Z"
                fill="none" stroke="white" strokeWidth="0.8" />
          <line x1="60" y1="30" x2="60" y2="55" stroke="white" strokeWidth="0.6" />
          <line x1="120" y1="28" x2="120" y2="53" stroke="white" strokeWidth="0.6" />
          <line x1="180" y1="20" x2="180" y2="62" stroke="white" strokeWidth="0.8" />
          <line x1="174" y1="41" x2="186" y2="41" stroke="white" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-wright)" />
    </svg>
  );
}

// Mongol Conquests — diamond chevrons suggesting cavalry arrow formations + steppe horizon
function MongolsPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <defs>
        <pattern id="bg-mongols" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
          <path d="M10,40 L40,15 L55,40 L40,65 Z"
                fill="none" stroke="white" strokeWidth="0.8" />
          <path d="M50,40 L80,15 L95,40 L80,65 Z"
                fill="none" stroke="white" strokeWidth="0.8" />
          <line x1="0" y1="40" x2="120" y2="40" stroke="white" strokeWidth="0.3" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-mongols)" />
    </svg>
  );
}

// Polynesian Expansion — star compass rose + ocean waves
function PolynesiaPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity,
      }}
    >
      <defs>
        <pattern id="bg-polynesia" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Cardinal points — longer */}
          <line x1="100" y1="100" x2="100" y2="60"  stroke="white" strokeWidth="0.8" />
          <line x1="100" y1="100" x2="100" y2="140" stroke="white" strokeWidth="0.8" />
          <line x1="100" y1="100" x2="60"  y2="100" stroke="white" strokeWidth="0.8" />
          <line x1="100" y1="100" x2="140" y2="100" stroke="white" strokeWidth="0.8" />
          {/* Intercardinal points — shorter */}
          <line x1="100" y1="100" x2="128" y2="72"  stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="100" x2="72"  y2="72"  stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="100" x2="128" y2="128" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="100" x2="72"  y2="128" stroke="white" strokeWidth="0.5" />
          {/* Centre dot */}
          <circle cx="100" cy="100" r="2" fill="white" />
          {/* Outer ring */}
          <circle cx="100" cy="100" r="38" fill="none" stroke="white" strokeWidth="0.4" />
          {/* Ocean waves */}
          <path d="M20,170 Q50,162 80,170 Q110,178 140,170 Q170,162 200,170"
                fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M20,182 Q50,174 80,182 Q110,190 140,182 Q170,174 200,182"
                fill="none" stroke="white" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-polynesia)" />
    </svg>
  );
}

// ─── Public export ─────────────────────────────────────────────────────────────

interface ScenarioPatternSvgProps {
  scenarioId: string;
  opacity: number;
}

export function ScenarioPatternSvg({ scenarioId, opacity }: ScenarioPatternSvgProps) {
  switch (scenarioId) {
    case "fall-of-rome":           return <RomePattern opacity={opacity} />;
    case "french-revolution":      return <FrancePattern opacity={opacity} />;
    case "scientific-revolution":  return <SciencePattern opacity={opacity} />;
    case "wwi":                    return <WWIPattern opacity={opacity} />;
    case "year-without-a-summer":  return <SummerPattern opacity={opacity} />;
    case "wright-brothers":        return <WrightPattern opacity={opacity} />;
    case "underwater-archaeology": return <UnderwaterPattern opacity={opacity} />;
    case "templars":               return <TemplarsPattern opacity={opacity} />;
    case "mongols":                return <MongolsPattern opacity={opacity} />;
    case "polynesia":              return <PolynesiaPattern opacity={opacity} />;
    default:                       return null;
  }
}
