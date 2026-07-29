import type { ReactNode } from "react";

const PATTERN_COLOR = "#E8E3D5";

interface PatternFrameProps {
  opacity: number;
  children: ReactNode;
}

function PatternFrame({ opacity, children }: PatternFrameProps) {
  return (
    <svg
      aria-hidden
      focusable="false"
      color={PATTERN_COLOR}
      style={{
        position: "absolute",
        inset: 0,
        display: "block",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        opacity,
        shapeRendering: "geometricPrecision",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    >
      {children}
    </svg>
  );
}

// SVG background pattern components — one per scenario, rendered behind the graph.
// All patterns are pointer-events: none and never affect interaction.

// Fall of Rome — Roman arch repeat
function RomePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-rome" patternTransform="scale(1.15)" x="0" y="0" width="80" height="96" patternUnits="userSpaceOnUse">
          <rect x="12" y="40" width="8" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <rect x="60" y="40" width="8" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 40 Q40 8 68 40" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-rome)" />
    </PatternFrame>
  );
}

// French Revolution — tricolour cockade with ribbon tails
function FrancePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-france" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <g transform="translate(60, 52)">
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="13" fill="none" stroke="currentColor" strokeWidth="0.65" />
            <circle cx="0" cy="0" r="5" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <path d="M-11,17 L-17,45 L-3,35 L1,49 L6,20" fill="none" stroke="currentColor" strokeWidth="0.7" />
            <path d="M11,17 L17,45 L3,35 L-1,49 L-6,20" fill="none" stroke="currentColor" strokeWidth="0.7" />
            <line x1="-28" y1="0" x2="28" y2="0" stroke="currentColor" strokeWidth="0.35" />
            <line x1="0" y1="-28" x2="0" y2="28" stroke="currentColor" strokeWidth="0.35" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-france)" />
    </PatternFrame>
  );
}


// Scientific Revolution — Copernican orbit diagram
function SciencePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-science" x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
          {/* Sun at tile centre */}
          <circle cx="120" cy="120" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="120" cy="120" r="2" fill="currentColor" />
          {/* Orbits */}
          <circle cx="120" cy="120" r="28" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="120" cy="120" r="52" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="120" cy="120" r="78" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="120" cy="120" r="104" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Planets at fixed positions */}
          <circle cx="148" cy="120" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="120" cy="68" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="76" cy="138" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="155" cy="168" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {/* Outer planet */}
          <circle cx="120" cy="16" r="2" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-science)" />
    </PatternFrame>
  );
}

// WWI — barbed wire + trench cross-section repeat
function WWIPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-wwi" patternTransform="scale(1.2)" x="0" y="0" width="100" height="60" patternUnits="userSpaceOnUse">
          {/*  Main wire strand */}
          <path d="M0,30 Q25,22 50,30 Q75,38 100,30" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/*  Barb clusters at intervals */}
          <line x1="20" y1="25" x2="26" y2="20" stroke="currentColor" strokeWidth="0.8" />
          <line x1="20" y1="25" x2="26" y2="30" stroke="currentColor" strokeWidth="0.8" />
          <line x1="22" y1="33" x2="16" y2="28" stroke="currentColor" strokeWidth="0.8" />
          <line x1="22" y1="33" x2="16" y2="38" stroke="currentColor" strokeWidth="0.8" />
          <line x1="70" y1="35" x2="76" y2="30" stroke="currentColor" strokeWidth="0.8" />
          <line x1="70" y1="35" x2="76" y2="40" stroke="currentColor" strokeWidth="0.8" />
          <line x1="72" y1="27" x2="66" y2="22" stroke="currentColor" strokeWidth="0.8" />
          <line x1="72" y1="27" x2="66" y2="32" stroke="currentColor" strokeWidth="0.8" />
          {/*  Trench cross-section suggestion — horizontal earth line */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.4" />
          <line x1="0" y1="54" x2="100" y2="54" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-wwi)" />
    </PatternFrame>
  );
}

// Year Without a Summer — volcanic plume / eruption cross-section
function SummerPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-summer" x="0" y="0" width="120" height="110" patternUnits="userSpaceOnUse">
          <line x1="52" y1="100" x2="68" y2="100" stroke="currentColor" strokeWidth="1" />
          <path
            d="M52,100 C48,90 44,82 46,74 C48,66 54,62 60,62 C66,62 72,66 74,74 C76,82 72,90 68,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <path
            d="M48,80 C42,70 36,58 40,46 C43,36 52,30 60,30 C68,30 77,36 80,46 C84,58 78,70 72,80"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
          />
          <path
            d="M43,60 C36,48 30,32 36,20 C41,10 52,5 60,5 C68,5 79,10 84,20 C90,32 84,48 77,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line x1="20" y1="72" x2="16" y2="82" stroke="currentColor" strokeWidth="0.5" />
          <line x1="96" y1="68" x2="100" y2="78" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="88" x2="7" y2="98" stroke="currentColor" strokeWidth="0.4" />
          <line x1="108" y1="84" x2="111" y2="94" stroke="currentColor" strokeWidth="0.4" />
          <line x1="0" y1="100" x2="120" y2="100" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-summer)" />
    </PatternFrame>
  );
}

// Templars — cross pattée repeat
function TemplarsPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-templars" patternTransform="scale(1.15)" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Top arm: narrow at base (x=44–56), wide at tip (x=36–64) */}
          <path
            d="M44,44 L36,18 L64,18 L56,44 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinejoin="miter"
          />
          {/* Bottom arm */}
          <path
            d="M44,56 L36,82 L64,82 L56,56 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinejoin="miter"
          />
          {/* Left arm: narrow at right (y=44–56), wide at tip (y=36–64) */}
          <path
            d="M44,44 L18,36 L18,64 L44,56 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinejoin="miter"
          />
          {/* Right arm */}
          <path
            d="M56,44 L82,36 L82,64 L56,56 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinejoin="miter"
          />
          {/* Centre square */}
          <rect x="44" y="44" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-templars)" />
    </PatternFrame>
  );
}

// Underwater Archaeology — sonar ping concentric arcs + depth lines
function UnderwaterPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-underwater" x="0" y="0" width="240" height="200" patternUnits="userSpaceOnUse">
          {/* Sonar source at top centre */}
          <circle cx="120" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {/* Expanding semicircular pings downward */}
          <path d="M80,20 Q120,60 160,20" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <path d="M50,20 Q120,100 190,20" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <path d="M20,20 Q120,140 220,20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,20  Q120,180 240,20" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {/* Depth ruler lines on left */}
          <line x1="15" y1="60" x2="22" y2="60" stroke="currentColor" strokeWidth="0.5" />
          <line x1="15" y1="100" x2="22" y2="100" stroke="currentColor" strokeWidth="0.5" />
          <line x1="15" y1="140" x2="22" y2="140" stroke="currentColor" strokeWidth="0.5" />
          <line x1="15" y1="180" x2="22" y2="180" stroke="currentColor" strokeWidth="0.5" />
          <line x1="18" y1="20" x2="18" y2="190" stroke="currentColor" strokeWidth="0.3" />
          {/* Echo return dot */}
          <circle cx="145" cy="130" r="2" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-underwater)" />
    </PatternFrame>
  );
}

// Wright Brothers — biplane wing cross-section blueprint repeat
function WrightPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-wright" x="0" y="0" width="200" height="120" patternUnits="userSpaceOnUse">
          <path d="M10,30 C40,20 120,18 180,28 C120,32 40,34 10,30 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M10,55 C40,45 120,43 180,53 C120,57 40,59 10,55 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <line x1="60" y1="30" x2="60" y2="55" stroke="currentColor" strokeWidth="0.6" />
          <line x1="120" y1="28" x2="120" y2="53" stroke="currentColor" strokeWidth="0.6" />
          <line x1="180" y1="20" x2="180" y2="62" stroke="currentColor" strokeWidth="0.8" />
          <line x1="174" y1="41" x2="186" y2="41" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-wright)" />
    </PatternFrame>
  );
}

// Mongol Conquests — cavalry arrow formations + steppe horizon
function MongolsPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-mongols" x="0" y="0" width="160" height="110" patternUnits="userSpaceOnUse">
          <path d="M70,12 C66,16 60,22 58,30" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M58,30 C56,42 56,54 60,55" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M60,55 C64,56 64,68 62,80" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M62,80 C60,88 64,96 70,98" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <line x1="70" y1="12" x2="70" y2="98" stroke="currentColor" strokeWidth="0.5" />
          <line x1="70" y1="55" x2="15" y2="55" stroke="currentColor" strokeWidth="0.7" />
          <path d="M15,55 L22,51 L20,55 L22,59 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <path d="M65,55 L70,50 M65,55 L70,60" stroke="currentColor" strokeWidth="0.5" />
          <line x1="56" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="0.6" />
          <line x1="56" y1="55" x2="60" y2="55" stroke="currentColor" strokeWidth="0.6" />
          <line x1="56" y1="60" x2="60" y2="60" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-mongols)" />
    </PatternFrame>
  );
}

// Polynesian Expansion — star compass rose + ocean waves
function PolynesiaPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-polynesia" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Cardinal points — longer */}
          <line x1="100" y1="100" x2="100" y2="60" stroke="currentColor" strokeWidth="0.8" />
          <line x1="100" y1="100" x2="100" y2="140" stroke="currentColor" strokeWidth="0.8" />
          <line x1="100" y1="100" x2="60" y2="100" stroke="currentColor" strokeWidth="0.8" />
          <line x1="100" y1="100" x2="140" y2="100" stroke="currentColor" strokeWidth="0.8" />
          {/* Intercardinal points — shorter */}
          <line x1="100" y1="100" x2="128" y2="72" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="100" x2="72" y2="72" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="100" x2="128" y2="128" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="100" x2="72" y2="128" stroke="currentColor" strokeWidth="0.5" />
          {/* Centre dot */}
          <circle cx="100" cy="100" r="2" fill="currentColor" />
          {/* Outer ring */}
          <circle cx="100" cy="100" r="38" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {/* Ocean waves */}
          <path
            d="M20,170 Q50,162 80,170 Q110,178 140,170 Q170,162 200,170"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M20,182 Q50,174 80,182 Q110,190 140,182 Q170,174 200,182"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-polynesia)" />
    </PatternFrame>
  );
}

// Zheng He — luopan compass octagon + ocean waves
function ZhengHePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-zheng-he" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
          {/* Outer octagon */}
          <polygon
            points="90,42 122,58 134,90 122,122 90,138 58,122 46,90 58,58"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Second concentric octagon — gives ba gua ring feel */}
          <polygon
            points="90,58 110,66 118,90 110,114 90,122 70,114 62,90 70,66"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {/* Inner circle */}
          <circle cx="90" cy="90" r="16" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Centre dot */}
          <circle cx="90" cy="90" r="2.5" fill="currentColor" />
          {/* Trigram hash marks on each octagon facet */}
          <line x1="96" y1="44" x2="102" y2="47" stroke="currentColor" strokeWidth="0.5" />
          <line x1="96" y1="47" x2="102" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="78" y1="44" x2="84" y2="47" stroke="currentColor" strokeWidth="0.5" />
          <line x1="78" y1="47" x2="84" y2="50" stroke="currentColor" strokeWidth="0.5" />
          {/* Cardinal radials (shorter — inside the octagon only) */}
          <line x1="90" y1="58" x2="90" y2="74" stroke="currentColor" strokeWidth="0.5" />
          <line x1="90" y1="106" x2="90" y2="122" stroke="currentColor" strokeWidth="0.5" />
          <line x1="62" y1="90" x2="74" y2="90" stroke="currentColor" strokeWidth="0.5" />
          <line x1="106" y1="90" x2="118" y2="90" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-zheng-he)" />
    </PatternFrame>
  );
}

// Whaling — whale fluke breaking the surface, repeated
function WhalesPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-whales" x="0" y="0" width="200" height="160" patternUnits="userSpaceOnUse">
          {/* Left fluke */}
          <path
            d="M100,100 C85,90 60,75 40,80 C25,84 20,95 30,100 C45,106 70,95 100,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Right fluke */}
          <path
            d="M100,100 C115,90 140,75 160,80 C175,84 180,95 170,100 C155,106 130,95 100,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Body hint rising from centre */}
          <path d="M100,100 C100,85 98,70 96,55" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Water surface line */}
          <path d="M0,115 Q50,108 100,115 Q150,122 200,115" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-whales)" />
    </PatternFrame>
  );
}

// Louisiana Purchase — Mississippi River delta branching waterways
function LouisianaPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-louisiana-purchase" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Main river channel */}
          <path d="M100,0 C95,40 105,80 100,120 C95,160 105,180 100,200" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Left tributaries */}
          <path d="M100,40 C80,50 60,45 40,55" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <path d="M100,80 C75,85 55,80 30,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M100,120 C80,125 65,120 45,130" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {/* Right tributaries */}
          <path d="M100,50 C120,58 140,52 165,60" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <path d="M100,90 C125,94 145,88 170,96" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M100,130 C118,134 138,128 160,136" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-louisiana-purchase)" />
    </PatternFrame>
  );
}

// Napster — distributed peer-to-peer network topology
function NapsterPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-napster" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Nodes — irregular constellation suggesting distributed network */}
          <circle cx="80" cy="80" r="4" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="30" cy="40" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="130" cy="35" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="25" cy="115" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="135" cy="120" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="80" cy="135" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="55" cy="60" r="1.8" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="108" cy="65" r="1.8" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="50" cy="108" r="1.8" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="112" cy="105" r="1.8" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Edges — many-to-many connections, no hierarchy */}
          <line x1="80" y1="80" x2="30" y2="40" stroke="currentColor" strokeWidth="0.4" />
          <line x1="80" y1="80" x2="130" y2="35" stroke="currentColor" strokeWidth="0.4" />
          <line x1="80" y1="80" x2="25" y2="115" stroke="currentColor" strokeWidth="0.4" />
          <line x1="80" y1="80" x2="135" y2="120" stroke="currentColor" strokeWidth="0.4" />
          <line x1="80" y1="80" x2="80" y2="135" stroke="currentColor" strokeWidth="0.4" />
          <line x1="30" y1="40" x2="55" y2="60" stroke="currentColor" strokeWidth="0.3" />
          <line x1="130" y1="35" x2="108" y2="65" stroke="currentColor" strokeWidth="0.3" />
          <line x1="25" y1="115" x2="50" y2="108" stroke="currentColor" strokeWidth="0.3" />
          <line x1="135" y1="120" x2="112" y2="105" stroke="currentColor" strokeWidth="0.3" />
          <line x1="80" y1="135" x2="50" y2="108" stroke="currentColor" strokeWidth="0.3" />
          <line x1="80" y1="135" x2="112" y2="105" stroke="currentColor" strokeWidth="0.3" />
          <line x1="55" y1="60" x2="108" y2="65" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-napster)" />
    </PatternFrame>
  );
}

// Tulip Mania — tulip silhouette with stem, leaves, and three petals
function TulipManiaPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-tulip-mania" x="0" y="0" width="140" height="180" patternUnits="userSpaceOnUse">
          {/* Stem */}
          <line x1="70" y1="140" x2="70" y2="100" stroke="currentColor" strokeWidth="0.8" />
          {/* Left leaf */}
          <path d="M70,125 C55,115 45,105 50,95" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Right leaf */}
          <path d="M70,120 C85,110 92,100 87,90" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Tulip head: three petals */}
          <path d="M70,100 C62,92 58,80 62,68 C65,58 70,55 70,55" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M70,100 C78,92 82,80 78,68 C75,58 70,55 70,55" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M70,98 C70,88 70,72 70,55" fill="none" stroke="currentColor" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-tulip-mania)" />
    </PatternFrame>
  );
}

// Leaded Gasoline — simplified molecular bond diagram suggesting chemistry and industry
function LeadedGasolinePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-leaded-gasoline" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Central atom */}
          <circle cx="80" cy="80" r="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Four bonds radiating outward — tetrahedral structure */}
          <line x1="80" y1="80" x2="80" y2="44" stroke="currentColor" strokeWidth="0.6" />
          <line x1="80" y1="80" x2="80" y2="116" stroke="currentColor" strokeWidth="0.6" />
          <line x1="80" y1="80" x2="44" y2="80" stroke="currentColor" strokeWidth="0.6" />
          <line x1="80" y1="80" x2="116" y2="80" stroke="currentColor" strokeWidth="0.6" />
          {/* Outer atoms */}
          <circle cx="80" cy="40" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="80" cy="120" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="40" cy="80" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="120" cy="80" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {/* Diagonal bonds for ethyl groups */}
          <line x1="80" y1="80" x2="108" y2="52" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
          <line x1="80" y1="80" x2="52" y2="108" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
          <circle cx="111" cy="49" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
          <circle cx="49" cy="111" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-leaded-gasoline)" />
    </PatternFrame>
  );
}

// Invention of the Teenager — vinyl record with concentric grooves
function InventionOfTeenagerPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-invention-of-teenager" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
          {/* Outer edge of record */}
          <circle cx="90" cy="90" r="72" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Grooves — concentric circles suggesting vinyl */}
          <circle cx="90" cy="90" r="62" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="90" cy="90" r="52" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="90" cy="90" r="42" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="90" cy="90" r="32" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {/* Label area */}
          <circle cx="90" cy="90" r="22" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {/* Centre hole */}
          <circle cx="90" cy="90" r="3" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-invention-of-teenager)" />
    </PatternFrame>
  );
}

// Black Plague & Renaissance — memento mori skull inside a Renaissance arch
function BlackPlagueRenaissancePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-black-plague-renaissance" x="0" y="0" width="160" height="200" patternUnits="userSpaceOnUse">
          {/* Renaissance arch */}
          <path
            d="M40,180 L40,100 Q40,60 80,60 Q120,60 120,100 L120,180"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Keystone at top of arch */}
          <path d="M70,62 L80,50 L90,62" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Simple skull inside arch */}
          <circle cx="80" cy="118" r="14" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Eye sockets */}
          <ellipse cx="74" cy="116" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="86" cy="116" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Nose */}
          <path d="M78,122 L80,125 L82,122" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {/* Teeth suggestion */}
          <line x1="74" y1="128" x2="86" y2="128" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-black-plague-renaissance)" />
    </PatternFrame>
  );
}

// Age of Exploration — compass rose, symbol of navigation and discovery
function AgeOfExplorationPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-age-of-exploration" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
          {/* Outer circle */}
          <circle cx="90" cy="90" r="62" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="90" cy="90" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Cardinal points — diamond outlines only (no fill) */}
          <polygon points="90,28 93,86 90,90 87,86" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <polygon points="90,152 93,94 90,90 87,94" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <polygon points="28,90 86,87 90,90 86,93" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <polygon points="152,90 94,87 90,90 94,93" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Intercardinal — smaller diamonds */}
          <polygon points="90,90 132,48 135,51 93,93" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="90,90 48,48 51,51 87,87" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="90,90 132,132 129,135 87,93" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="90,90 48,132 51,129 93,87" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="90" cy="90" r="3" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-age-of-exploration)" />
    </PatternFrame>
  );
}

// Hollywood Birth — film strip with sprocket holes
function HollywoodBirthPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-hollywood-birth" patternTransform="scale(1.2)" x="0" y="0" width="80" height="200" patternUnits="userSpaceOnUse">
          {/* Film strip edges */}
          <rect x="8" y="0" width="64" height="200" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Left sprocket holes */}
          <rect x="12" y="10" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="12" y="40" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="12" y="70" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="12" y="100" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="12" y="130" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="12" y="160" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Right sprocket holes */}
          <rect x="58" y="10" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="58" y="40" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="58" y="70" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="58" y="100" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="58" y="130" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="58" y="160" width="10" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Frame lines */}
          <line x1="26" y1="30" x2="54" y2="30" stroke="currentColor" strokeWidth="0.4" />
          <line x1="26" y1="60" x2="54" y2="60" stroke="currentColor" strokeWidth="0.4" />
          <line x1="26" y1="90" x2="54" y2="90" stroke="currentColor" strokeWidth="0.4" />
          <line x1="26" y1="120" x2="54" y2="120" stroke="currentColor" strokeWidth="0.4" />
          <line x1="26" y1="150" x2="54" y2="150" stroke="currentColor" strokeWidth="0.4" />
          <line x1="26" y1="180" x2="54" y2="180" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-hollywood-birth)" />
    </PatternFrame>
  );
}

// Hollywood Code — censored film frames suggesting the Hays Code
function HollywoodCodePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-hollywood-code" patternTransform="scale(1.12)" x="0" y="0" width="120" height="140" patternUnits="userSpaceOnUse">
          {/* Film frame outer */}
          <rect x="20" y="15" width="80" height="55" rx="2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {/* Censorship redaction bars — thick parallel lines across the frame */}
          <line x1="20" y1="31" x2="100" y2="31" stroke="currentColor" strokeWidth="2.5" />
          <line x1="20" y1="47" x2="100" y2="47" stroke="currentColor" strokeWidth="2.5" />
          <line x1="20" y1="59" x2="100" y2="59" stroke="currentColor" strokeWidth="1.5" />
          {/* Second frame — partial, below */}
          <rect x="20" y="85" width="80" height="55" rx="2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {/* Redaction bars */}
          <line x1="20" y1="101" x2="100" y2="101" stroke="currentColor" strokeWidth="2.5" />
          <line x1="20" y1="117" x2="100" y2="117" stroke="currentColor" strokeWidth="2.5" />
          {/* "APPROVED" stamp suggestion — rectangular outline with inner rectangle */}
          <rect x="32" y="92" width="56" height="20" rx="1" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-hollywood-code)" />
    </PatternFrame>
  );
}

// Hollywood Blockbuster — clapperboard, the symbol of filmmaking
function HollywoodBlockbusterPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-hollywood-blockbuster" x="0" y="0" width="180" height="160" patternUnits="userSpaceOnUse">
          {/* Clapperboard body */}
          <rect x="30" y="55" width="120" height="85" rx="3" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Clapper strip */}
          <rect x="30" y="38" width="120" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Diagonal stripes on clapper */}
          <line x1="50" y1="38" x2="40" y2="60" stroke="currentColor" strokeWidth="2.5" />
          <line x1="70" y1="38" x2="60" y2="60" stroke="currentColor" strokeWidth="2.5" />
          <line x1="90" y1="38" x2="80" y2="60" stroke="currentColor" strokeWidth="2.5" />
          <line x1="110" y1="38" x2="100" y2="60" stroke="currentColor" strokeWidth="2.5" />
          <line x1="130" y1="38" x2="120" y2="60" stroke="currentColor" strokeWidth="2.5" />
          {/* Hinge */}
          <circle cx="38" cy="42" r="3" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Text lines on board */}
          <line x1="45" y1="80" x2="135" y2="80" stroke="currentColor" strokeWidth="0.4" />
          <line x1="45" y1="95" x2="135" y2="95" stroke="currentColor" strokeWidth="0.4" />
          <line x1="45" y1="110" x2="100" y2="110" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-hollywood-blockbuster)" />
    </PatternFrame>
  );
}

// F1 Turbo Era — turbocharger cross-section, turbine blades radiating from centre
function F1TurboPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-f1-turbo-era" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Outer housing circle */}
          <circle cx="80" cy="80" r="55" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Inner hub */}
          <circle cx="80" cy="80" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Centre point */}
          <circle cx="80" cy="80" r="3" fill="currentColor" />
          {/* Turbine blades — 6 curved blades */}
          <path d="M80,68 C85,65 90,60 88,52" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M92,74 C97,72 103,70 104,62" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M92,86 C95,91 96,98 90,102" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M80,92 C82,97 80,104 74,106" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M68,86 C63,89 57,90 54,84" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M68,74 C65,69 64,62 70,58" fill="none" stroke="currentColor" strokeWidth="1.2" />
          {/* Speed lines suggesting rotation */}
          <path d="M80,25 Q85,52 80,68" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
          <path d="M120,50 Q100,65 92,74" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-f1-turbo-era)" />
    </PatternFrame>
  );
}

// F1 Bernie — banknote grid suggesting money and backroom deals
function F1BerniePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-f1-bernie" patternTransform="scale(1.12)" x="0" y="0" width="160" height="100" patternUnits="userSpaceOnUse">
          {/* Outer border */}
          <rect x="8" y="8" width="144" height="84" rx="4" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Inner border */}
          <rect x="13" y="13" width="134" height="74" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Guilloche-style curved band across middle */}
          <path d="M13,50 Q40,38 80,50 Q120,62 147,50" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <path d="M13,46 Q40,34 80,46 Q120,58 147,46" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M13,54 Q40,42 80,54 Q120,66 147,54" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Ruling lines (thicker than before) */}
          <line x1="18" y1="28" x2="142" y2="28" stroke="currentColor" strokeWidth="0.6" />
          <line x1="18" y1="72" x2="142" y2="72" stroke="currentColor" strokeWidth="0.6" />
          {/* Corner ornaments */}
          <circle cx="22" cy="22" r="4" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="138" cy="22" r="4" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="22" cy="78" r="4" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="138" cy="78" r="4" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-f1-bernie)" />
    </PatternFrame>
  );
}

// F1 safety — Imola-inspired circuit line with medical and barrier markers
function F1SennaPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-f1-senna" x="0" y="0" width="260" height="210" patternUnits="userSpaceOnUse">
          <g transform="translate(18, 8)">
            <path
              d="M48,154
                 C32,140 30,116 40,96
                 C50,76 68,65 88,56
                 C107,47 128,42 145,48
                 C164,54 175,68 172,83
                 C169,97 153,104 148,118
                 C143,132 151,148 168,153
                 C187,159 204,148 209,132
                 C214,116 203,102 190,91
                 C177,80 177,64 187,49
                 C197,34 213,28 224,38
                 C236,49 231,67 220,78
                 C208,90 194,98 194,114
                 C194,132 207,145 205,160
                 C202,177 183,187 161,184
                 C139,181 123,169 106,166
                 C84,162 62,165 48,154 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.05"
            />
            <path d="M205,160 L231,174" fill="none" stroke="currentColor" strokeWidth="0.55" strokeDasharray="3 4" />
            <line x1="212" y1="159" x2="221" y2="176" stroke="currentColor" strokeWidth="0.45" />
            <line x1="217" y1="157" x2="226" y2="174" stroke="currentColor" strokeWidth="0.45" />
            <line x1="222" y1="155" x2="231" y2="172" stroke="currentColor" strokeWidth="0.45" />
            <g transform="translate(42, 50)">
              <circle cx="0" cy="0" r="9" fill="none" stroke="currentColor" strokeWidth="0.55" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="currentColor" strokeWidth="0.8" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="currentColor" strokeWidth="0.8" />
            </g>
            <circle cx="148" cy="118" r="2.2" fill="currentColor" />
            <circle cx="205" cy="160" r="2.2" fill="currentColor" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-f1-senna)" />
    </PatternFrame>
  );
}


// Cats — minimal cat face, instantly recognisable, quietly superior
function CatsPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-cats" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Head */}
          <circle cx="80" cy="88" r="32" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Left ear */}
          <path d="M54,64 L48,38 L72,56" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Right ear */}
          <path d="M106,64 L112,38 L88,56" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Left inner ear */}
          <path d="M56,62 L52,44 L68,57" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {/* Right inner ear */}
          <path d="M104,62 L108,44 L92,57" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {/* Left eye — almond shape */}
          <path d="M62,82 C65,77 75,77 78,82 C75,87 65,87 62,82 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {/* Right eye */}
          <path d="M82,82 C85,77 95,77 98,82 C95,87 85,87 82,82 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {/* Pupils — vertical slits */}
          <line x1="70" y1="78" x2="70" y2="86" stroke="currentColor" strokeWidth="1.5" />
          <line x1="90" y1="78" x2="90" y2="86" stroke="currentColor" strokeWidth="1.5" />
          {/* Nose */}
          <path d="M77,95 L80,92 L83,95 L80,98 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Mouth */}
          <path d="M80,98 C76,102 72,103 70,101" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M80,98 C84,102 88,103 90,101" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Whiskers left */}
          <line x1="46" y1="96" x2="72" y2="97" stroke="currentColor" strokeWidth="0.4" />
          <line x1="44" y1="100" x2="72" y2="99" stroke="currentColor" strokeWidth="0.4" />
          <line x1="46" y1="104" x2="72" y2="101" stroke="currentColor" strokeWidth="0.4" />
          {/* Whiskers right */}
          <line x1="114" y1="96" x2="88" y2="97" stroke="currentColor" strokeWidth="0.4" />
          <line x1="116" y1="100" x2="88" y2="99" stroke="currentColor" strokeWidth="0.4" />
          <line x1="114" y1="104" x2="88" y2="101" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-cats)" />
    </PatternFrame>
  );
}

// Emu War — emu silhouette striding with quiet dignity
function EmuWarPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-emu-war" x="0" y="0" width="200" height="180" patternUnits="userSpaceOnUse">
          {/* Body — large oval */}
          <ellipse cx="95" cy="95" rx="28" ry="22" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Neck */}
          <path d="M95,73 C93,62 90,50 88,38" fill="none" stroke="currentColor" strokeWidth="1.2" />
          {/* Head — small circle */}
          <circle cx="87" cy="34" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Beak */}
          <path d="M80,33 L72,31 L80,36" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Eye */}
          <circle cx="85" cy="32" r="1.5" fill="currentColor" />
          {/* Left leg */}
          <path d="M85,117 L82,138 L78,155" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Left foot */}
          <path d="M78,155 L70,158 M78,155 L76,162 M78,155 L84,160" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Right leg */}
          <path d="M100,117 L103,138 L107,152" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Right foot */}
          <path d="M107,152 L99,156 M107,152 L106,160 M107,152 L113,157" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Wing suggestion */}
          <path d="M68,88 C72,82 80,80 95,82" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Small feather detail */}
          <path d="M68,88 C65,92 66,98 70,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-emu-war)" />
    </PatternFrame>
  );
}

// Coffee Houses — top-down cup, saucer, and rising steam
function CoffeeHousesPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-coffee-houses" x="0" y="0" width="150" height="130" patternUnits="userSpaceOnUse">
          <g transform="translate(75, 70)">
            <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="0.45" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" strokeWidth="0.45" />
            <path d="M18,-8 C35,-10 38,10 20,12" fill="none" stroke="currentColor" strokeWidth="0.85" />
            <path d="M-8,-28 C-12,-38 -5,-43 -8,-52" fill="none" stroke="currentColor" strokeWidth="0.55" />
            <path d="M5,-30 C10,-40 3,-45 7,-55" fill="none" stroke="currentColor" strokeWidth="0.55" />
            <line x1="-38" y1="38" x2="38" y2="38" stroke="currentColor" strokeWidth="0.3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-coffee-houses)" />
    </PatternFrame>
  );
}


// Library of Alexandria — papyrus scroll with rolled ends and text lines
function LibraryOfAlexandriaPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-library-of-alexandria" x="0" y="0" width="180" height="130" patternUnits="userSpaceOnUse">
          <g transform="translate(90, 65)">
            <path d="M-56,-28 C-68,-28 -68,-8 -56,-8 L52,-8 C65,-8 65,-28 52,-28 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M-56,-28 C-45,-28 -45,-8 -56,-8 C-67,-8 -67,-28 -56,-28 Z" fill="none" stroke="currentColor" strokeWidth="0.55" />
            <path d="M52,-28 C41,-28 41,-8 52,-8 C63,-8 63,-28 52,-28 Z" fill="none" stroke="currentColor" strokeWidth="0.55" />
            <line x1="-37" y1="-22" x2="31" y2="-22" stroke="currentColor" strokeWidth="0.4" />
            <line x1="-37" y1="-17" x2="22" y2="-17" stroke="currentColor" strokeWidth="0.35" />
            <path d="M-50,-8 L-50,30 C-50,39 -40,40 -34,34" fill="none" stroke="currentColor" strokeWidth="0.65" />
            <path d="M46,-8 L46,30 C46,39 36,40 30,34" fill="none" stroke="currentColor" strokeWidth="0.65" />
            <line x1="-34" y1="4" x2="28" y2="4" stroke="currentColor" strokeWidth="0.45" />
            <line x1="-34" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="0.4" />
            <line x1="-34" y1="18" x2="25" y2="18" stroke="currentColor" strokeWidth="0.4" />
            <line x1="-34" y1="25" x2="12" y2="25" stroke="currentColor" strokeWidth="0.35" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-library-of-alexandria)" />
    </PatternFrame>
  );
}


// Kanye West — graduation cap over an audio waveform
function KanyeWestPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-kanye-west" x="0" y="0" width="180" height="160" patternUnits="userSpaceOnUse">
          <g transform="translate(90, 68)">
            <polygon points="0,-30 38,-16 0,-2 -38,-16" fill="none" stroke="currentColor" strokeWidth="0.85" />
            <path d="M-23,-10 L-23,8 C-10,18 10,18 23,8 L23,-10" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <line x1="38" y1="-16" x2="38" y2="10" stroke="currentColor" strokeWidth="0.7" />
            <circle cx="38" cy="13" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.65" />
          </g>
          <path d="M18,122 L28,122 L34,108 L42,138 L50,116 L58,128 L66,122 L78,122 L86,102 L96,142 L106,112 L116,132 L124,122 L140,122 L148,114 L156,130 L164,122" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <line x1="18" y1="146" x2="164" y2="146" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-kanye-west)" />
    </PatternFrame>
  );
}


// Kyiv — tryzub (Ukrainian trident) repeat
function KyivPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-kyiv" patternTransform="scale(1.12)" x="0" y="0" width="100" height="130" patternUnits="userSpaceOnUse">
          <g transform="translate(50, 65)">
            {/* Centre prong */}
            <path
              d="M-4,18 L-4,-8 L0,-26 L4,-8 L4,18 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.85"
              strokeLinejoin="round"
            />
            {/* Left prong */}
            <path
              d="M-4,10 C-12,8 -22,4 -26,-4 C-29,-12 -26,-22 -20,-24
                     C-15,-26 -12,-20 -14,-14 C-15,-10 -18,-8 -16,-4
                     C-14,0 -8,4 -4,6"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.85"
              strokeLinecap="round"
            />
            {/* Right prong */}
            <path
              d="M4,10 C12,8 22,4 26,-4 C29,-12 26,-22 20,-24
                     C15,-26 12,-20 14,-14 C15,-10 18,-8 16,-4
                     C14,0 8,4 4,6"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.85"
              strokeLinecap="round"
            />
            {/* Crossbar */}
            <line x1="-28" y1="18" x2="28" y2="18" stroke="currentColor" strokeWidth="0.85" />
            {/* Foot */}
            <line x1="0" y1="18" x2="0" y2="28" stroke="currentColor" strokeWidth="0.85" />
            {/* Foot serif */}
            <line x1="-8" y1="28" x2="8" y2="28" stroke="currentColor" strokeWidth="0.85" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-kyiv)" />
    </PatternFrame>
  );
}

// Bedlam — neoclassical façade of Bethlem Royal Hospital
function BedlamPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-bedlam" x="0" y="0" width="240" height="180" patternUnits="userSpaceOnUse">
          <g transform="translate(120,90)">
            {/* Dome */}
            <path d="M-32,6 A32,38 0 0,1 32,6" fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Drum */}
            <line x1="-32" y1="6" x2="-32" y2="20" stroke="currentColor" strokeWidth="0.8" />
            <line x1="32" y1="6" x2="32" y2="20" stroke="currentColor" strokeWidth="0.8" />
            <line x1="-36" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="0.7" />
            {/* Lantern */}
            <line x1="0" y1="-38" x2="0" y2="-46" stroke="currentColor" strokeWidth="0.7" />
            <line x1="-5" y1="-38" x2="5" y2="-38" stroke="currentColor" strokeWidth="0.6" />
            <line x1="-4" y1="-46" x2="4" y2="-46" stroke="currentColor" strokeWidth="0.6" />
            <line x1="-4" y1="-38" x2="-4" y2="-46" stroke="currentColor" strokeWidth="0.5" />
            <line x1="4" y1="-38" x2="4" y2="-46" stroke="currentColor" strokeWidth="0.5" />
            {/* Pediment */}
            <path d="M-52,20 L0,6 L52,20" fill="none" stroke="currentColor" strokeWidth="0.8" />
            {/* Entablature */}
            <line x1="-58" y1="20" x2="58" y2="20" stroke="currentColor" strokeWidth="1.1" />
            <line x1="-58" y1="26" x2="58" y2="26" stroke="currentColor" strokeWidth="0.4" />
            {/* Columns — 8 */}
            <line x1="-48" y1="26" x2="-48" y2="76" stroke="currentColor" strokeWidth="1" />
            <line x1="-34" y1="26" x2="-34" y2="76" stroke="currentColor" strokeWidth="1" />
            <line x1="-21" y1="26" x2="-21" y2="76" stroke="currentColor" strokeWidth="1" />
            <line x1="-7" y1="26" x2="-7" y2="76" stroke="currentColor" strokeWidth="1" />
            <line x1="7" y1="26" x2="7" y2="76" stroke="currentColor" strokeWidth="1" />
            <line x1="21" y1="26" x2="21" y2="76" stroke="currentColor" strokeWidth="1" />
            <line x1="34" y1="26" x2="34" y2="76" stroke="currentColor" strokeWidth="1" />
            <line x1="48" y1="26" x2="48" y2="76" stroke="currentColor" strokeWidth="1" />
            {/* Stylobate */}
            <line x1="-52" y1="76" x2="52" y2="76" stroke="currentColor" strokeWidth="0.7" />
            {/* Steps */}
            <line x1="-56" y1="80" x2="56" y2="80" stroke="currentColor" strokeWidth="0.5" />
            <line x1="-60" y1="84" x2="60" y2="84" stroke="currentColor" strokeWidth="0.5" />
            {/* Ground line */}
            <line x1="-110" y1="88" x2="110" y2="88" stroke="currentColor" strokeWidth="0.6" />
            {/* Left wing */}
            <rect x="-110" y="60" width="52" height="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="-104" y="65" width="9" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <rect x="-92" y="65" width="9" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <rect x="-80" y="65" width="9" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="0.4" />
            {/* Right wing */}
            <rect x="58" y="60" width="52" height="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="64" y="65" width="9" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <rect x="78" y="65" width="9" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <rect x="92" y="65" width="9" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="0.4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-bedlam)" />
    </PatternFrame>
  );
}

// Golden Age of Piracy — compass ring, crossed cutlasses, and sea lines
function GoldenAgePiracyPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-golden-age-piracy" x="0" y="0" width="220" height="200" patternUnits="userSpaceOnUse">
          <g transform="translate(110, 88)">
            <circle cx="0" cy="0" r="42" fill="none" stroke="currentColor" strokeWidth="0.45" />
            <circle cx="0" cy="0" r="31" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <line x1="0" y1="-48" x2="0" y2="-36" stroke="currentColor" strokeWidth="0.6" />
            <line x1="0" y1="36" x2="0" y2="48" stroke="currentColor" strokeWidth="0.6" />
            <line x1="-48" y1="0" x2="-36" y2="0" stroke="currentColor" strokeWidth="0.6" />
            <line x1="36" y1="0" x2="48" y2="0" stroke="currentColor" strokeWidth="0.6" />
            <path d="M-36,26 C-20,10 2,-11 34,-29" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M36,26 C20,10 -2,-11 -34,-29" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M-41,31 L-31,21 M-37,35 L-27,25" fill="none" stroke="currentColor" strokeWidth="0.65" />
            <path d="M41,31 L31,21 M37,35 L27,25" fill="none" stroke="currentColor" strokeWidth="0.65" />
            <path d="M-37,-32 L-30,-35 L-33,-28 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <path d="M37,-32 L30,-35 L33,-28 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="2" fill="currentColor" />
          </g>
          <path d="M0,160 Q28,152 56,160 Q84,168 112,160 Q140,152 168,160 Q196,168 220,160" fill="none" stroke="currentColor" strokeWidth="0.45" />
          <path d="M0,174 Q28,166 56,174 Q84,182 112,174 Q140,166 168,174 Q196,182 220,174" fill="none" stroke="currentColor" strokeWidth="0.35" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-golden-age-piracy)" />
    </PatternFrame>
  );
}


// Trial of Socrates — hemlock kylix (Greek drinking cup)
function TrialOfSocratesPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-trial-of-socrates" patternTransform="scale(1.12)" x="0" y="0" width="120" height="100" patternUnits="userSpaceOnUse">
          {/* Kylix A (30,38) */}
          <g transform="translate(30,38)">
            <path d="M-28,0 Q-28,12 0,14 Q28,12 28,0" fill="none" stroke="currentColor" strokeWidth="0.85" />
            <line x1="-28" y1="0" x2="28" y2="0" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="14" x2="0" y2="22" stroke="currentColor" strokeWidth="0.8" />
            <path d="M-12,22 Q-10,26 0,27 Q10,26 12,22" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <line x1="-12" y1="22" x2="12" y2="22" stroke="currentColor" strokeWidth="0.6" />
            <path d="M-28,0 C-34,-2 -36,6 -30,8 C-28,8 -28,4 -28,2" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <path d="M28,0 C34,-2 36,6 30,8 C28,8 28,4 28,2" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </g>
          {/* Kylix B (90,72) */}
          <g transform="translate(90,72)">
            <path d="M-28,0 Q-28,12 0,14 Q28,12 28,0" fill="none" stroke="currentColor" strokeWidth="0.85" />
            <line x1="-28" y1="0" x2="28" y2="0" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="14" x2="0" y2="22" stroke="currentColor" strokeWidth="0.8" />
            <path d="M-12,22 Q-10,26 0,27 Q10,26 12,22" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <line x1="-12" y1="22" x2="12" y2="22" stroke="currentColor" strokeWidth="0.6" />
            <path d="M-28,0 C-34,-2 -36,6 -30,8 C-28,8 -28,4 -28,2" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <path d="M28,0 C34,-2 36,6 30,8 C28,8 28,4 28,2" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-trial-of-socrates)" />
    </PatternFrame>
  );
}

// Homer — ancient lyre (lyra)
function HomerPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-homer" patternTransform="scale(1.1)" x="0" y="0" width="100" height="140" patternUnits="userSpaceOnUse">
          <g transform="translate(50, 70)">
            {/* Body */}
            <ellipse cx="0" cy="36" rx="18" ry="14" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <ellipse cx="0" cy="36" rx="8" ry="5" fill="none" stroke="currentColor" strokeWidth="0.4" />
            {/* Left arm */}
            <path
              d="M-16,28 C-22,16 -26,-4 -20,-28 C-16,-40 -8,-46 0,-46"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            {/* Right arm */}
            <path
              d="M16,28 C22,16 26,-4 20,-28 C16,-40 8,-46 0,-46"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            {/* Crossbar */}
            <line x1="-20" y1="-46" x2="20" y2="-46" stroke="currentColor" strokeWidth="0.9" />
            <circle cx="-20" cy="-46" r="2" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="20" cy="-46" r="2" fill="none" stroke="currentColor" strokeWidth="0.6" />
            {/* Strings — 7 */}
            <line x1="-14" y1="-46" x2="-12" y2="22" stroke="currentColor" strokeWidth="0.4" />
            <line x1="-9" y1="-46" x2="-8" y2="24" stroke="currentColor" strokeWidth="0.4" />
            <line x1="-4" y1="-46" x2="-4" y2="26" stroke="currentColor" strokeWidth="0.4" />
            <line x1="0" y1="-46" x2="0" y2="27" stroke="currentColor" strokeWidth="0.4" />
            <line x1="4" y1="-46" x2="4" y2="26" stroke="currentColor" strokeWidth="0.4" />
            <line x1="9" y1="-46" x2="8" y2="24" stroke="currentColor" strokeWidth="0.4" />
            <line x1="14" y1="-46" x2="12" y2="22" stroke="currentColor" strokeWidth="0.4" />
            {/* Tailpiece */}
            <line x1="-12" y1="22" x2="12" y2="22" stroke="currentColor" strokeWidth="0.6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-homer)" />
    </PatternFrame>
  );
}

// Mediterranean Summer — parasol seen from above
function MediterraneanSummerPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-mediterranean-summer" patternTransform="scale(1.12)" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          {/* Parasol A (30,30) */}
          <g transform="translate(30,30)">
            <line x1="0" y1="0" x2="0" y2="-22" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="15.6" y2="-15.6" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="22" y2="0" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="15.6" y2="15.6" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="0" y2="22" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="-15.6" y2="15.6" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="-22" y2="0" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="-15.6" y2="-15.6" stroke="currentColor" strokeWidth="0.7" />
            <path
              d="M0,-22 A6,6 0 0,1 15.6,-15.6 A6,6 0 0,1 22,0 A6,6 0 0,1 15.6,15.6 A6,6 0 0,1 0,22 A6,6 0 0,1 -15.6,15.6 A6,6 0 0,1 -22,0 A6,6 0 0,1 -15.6,-15.6 A6,6 0 0,1 0,-22 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.85"
            />
            <circle cx="0" cy="0" r="2" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.6" />
            <line x1="-2" y1="8" x2="2" y2="8" stroke="currentColor" strokeWidth="0.5" />
          </g>
          {/* Parasol B (90,90) */}
          <g transform="translate(90,90)">
            <line x1="0" y1="0" x2="0" y2="-22" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="15.6" y2="-15.6" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="22" y2="0" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="15.6" y2="15.6" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="0" y2="22" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="-15.6" y2="15.6" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="-22" y2="0" stroke="currentColor" strokeWidth="0.7" />
            <line x1="0" y1="0" x2="-15.6" y2="-15.6" stroke="currentColor" strokeWidth="0.7" />
            <path
              d="M0,-22 A6,6 0 0,1 15.6,-15.6 A6,6 0 0,1 22,0 A6,6 0 0,1 15.6,15.6 A6,6 0 0,1 0,22 A6,6 0 0,1 -15.6,15.6 A6,6 0 0,1 -22,0 A6,6 0 0,1 -15.6,-15.6 A6,6 0 0,1 0,-22 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.85"
            />
            <circle cx="0" cy="0" r="2" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.6" />
            <line x1="-2" y1="8" x2="2" y2="8" stroke="currentColor" strokeWidth="0.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-mediterranean-summer)" />
    </PatternFrame>
  );
}

// Suez Canal — cross-section engineering drawing
function SuezCanalPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-suez-canal" x="0" y="0" width="160" height="140" patternUnits="userSpaceOnUse">
          {/* Desert surface */}
          <line x1="0" y1="48" x2="32" y2="48" stroke="currentColor" strokeWidth="0.8" />
          <line x1="128" y1="48" x2="160" y2="48" stroke="currentColor" strokeWidth="0.8" />
          {/* Canal walls */}
          <line x1="32" y1="48" x2="52" y2="96" stroke="currentColor" strokeWidth="0.8" />
          <line x1="128" y1="48" x2="108" y2="96" stroke="currentColor" strokeWidth="0.8" />
          <line x1="52" y1="96" x2="108" y2="96" stroke="currentColor" strokeWidth="0.8" />
          {/* Water surface */}
          <line x1="32" y1="48" x2="128" y2="48" stroke="currentColor" strokeWidth="0.5" />
          <line x1="44" y1="54" x2="116" y2="54" stroke="currentColor" strokeWidth="0.25" />
          <line x1="48" y1="60" x2="112" y2="60" stroke="currentColor" strokeWidth="0.25" />
          {/* Ship hull */}
          <line x1="58" y1="48" x2="58" y2="80" stroke="currentColor" strokeWidth="0.85" />
          <line x1="102" y1="48" x2="102" y2="80" stroke="currentColor" strokeWidth="0.85" />
          <path d="M58,80 Q58,86 64,88 L96,88 Q102,86 102,80" fill="none" stroke="currentColor" strokeWidth="0.85" />
          <line x1="54" y1="48" x2="106" y2="48" stroke="currentColor" strokeWidth="0.7" />
          {/* Superstructure */}
          <rect x="68" y="28" width="24" height="20" rx="1" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <line x1="72" y1="34" x2="88" y2="34" stroke="currentColor" strokeWidth="0.35" />
          <line x1="72" y1="38" x2="88" y2="38" stroke="currentColor" strokeWidth="0.35" />
          <rect x="78" y="18" width="8" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <path d="M80,18 C79,14 81,11 80,8" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <path d="M84,18 C85,14 83,11 84,8" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {/* Depth markers */}
          <line x1="30" y1="64" x2="36" y2="66" stroke="currentColor" strokeWidth="0.4" />
          <line x1="28" y1="78" x2="34" y2="80" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-suez-canal)" />
    </PatternFrame>
  );
}

// Swimming Leisure — bathing machine side profile
function SwimmingLeisurePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-swimming-leisure" x="0" y="0" width="200" height="160" patternUnits="userSpaceOnUse">
          <g transform="translate(100, 80)">
            {/* Waterline */}
            <line x1="-100" y1="22" x2="100" y2="22" stroke="currentColor" strokeWidth="0.6" />
            <line x1="-100" y1="28" x2="100" y2="28" stroke="currentColor" strokeWidth="0.25" />
            <line x1="-100" y1="34" x2="100" y2="34" stroke="currentColor" strokeWidth="0.2" />
            {/* Left wheel */}
            <circle cx="-46" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <line x1="-46" y1="4" x2="-46" y2="40" stroke="currentColor" strokeWidth="0.4" />
            <line x1="-28" y1="22" x2="-64" y2="22" stroke="currentColor" strokeWidth="0.4" />
            <line x1="-33" y1="9" x2="-59" y2="35" stroke="currentColor" strokeWidth="0.4" />
            <line x1="-33" y1="35" x2="-59" y2="9" stroke="currentColor" strokeWidth="0.4" />
            <circle cx="-46" cy="22" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {/* Right wheel */}
            <circle cx="46" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <line x1="46" y1="4" x2="46" y2="40" stroke="currentColor" strokeWidth="0.4" />
            <line x1="28" y1="22" x2="64" y2="22" stroke="currentColor" strokeWidth="0.4" />
            <line x1="33" y1="9" x2="59" y2="35" stroke="currentColor" strokeWidth="0.4" />
            <line x1="33" y1="35" x2="59" y2="9" stroke="currentColor" strokeWidth="0.4" />
            <circle cx="46" cy="22" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {/* Axle */}
            <line x1="-46" y1="22" x2="46" y2="22" stroke="currentColor" strokeWidth="0.5" />
            {/* Body */}
            <rect x="-48" y="-52" width="96" height="56" rx="1" fill="none" stroke="currentColor" strokeWidth="0.85" />
            <line x1="-48" y1="-38" x2="48" y2="-38" stroke="currentColor" strokeWidth="0.3" />
            <line x1="-48" y1="-24" x2="48" y2="-24" stroke="currentColor" strokeWidth="0.3" />
            <line x1="-48" y1="-10" x2="48" y2="-10" stroke="currentColor" strokeWidth="0.3" />
            {/* Roof */}
            <path d="M-52,-52 L0,-68 L52,-52" fill="none" stroke="currentColor" strokeWidth="0.85" />
            <line x1="-8" y1="-67" x2="8" y2="-67" stroke="currentColor" strokeWidth="0.6" />
            {/* Window */}
            <rect x="-38" y="-46" width="14" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <line x1="-31" y1="-46" x2="-31" y2="-34" stroke="currentColor" strokeWidth="0.3" />
            <line x1="-38" y1="-40" x2="-24" y2="-40" stroke="currentColor" strokeWidth="0.3" />
            {/* Door */}
            <rect x="26" y="-48" width="18" height="44" rx="1" fill="none" stroke="currentColor" strokeWidth="0.65" />
            <circle cx="28" cy="-26" r="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {/* Steps */}
            <line x1="44" y1="4" x2="58" y2="4" stroke="currentColor" strokeWidth="0.7" />
            <line x1="44" y1="10" x2="62" y2="10" stroke="currentColor" strokeWidth="0.7" />
            <line x1="44" y1="16" x2="66" y2="16" stroke="currentColor" strokeWidth="0.7" />
            <line x1="58" y1="4" x2="62" y2="10" stroke="currentColor" strokeWidth="0.5" />
            <line x1="62" y1="10" x2="66" y2="16" stroke="currentColor" strokeWidth="0.5" />
            {/* Modesty hood */}
            <path d="M44,-48 C52,-40 64,-20 70,22" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <path d="M44,4 C52,6 62,12 70,22" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <path d="M44,-28 C54,-20 64,-4 68,14" fill="none" stroke="currentColor" strokeWidth="0.3" />
            {/* Horse tow bar */}
            <line x1="-48" y1="10" x2="-72" y2="16" stroke="currentColor" strokeWidth="0.6" />
            <line x1="-72" y1="12" x2="-72" y2="20" stroke="currentColor" strokeWidth="0.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-swimming-leisure)" />
    </PatternFrame>
  );
}

// Cholera Map — John Snow's dot cluster, pump at centre
function CholeraMapPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-cholera-map" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Pump marker */}
          <line x1="77" y1="80" x2="83" y2="80" stroke="currentColor" strokeWidth="0.9" />
          <line x1="80" y1="77" x2="80" y2="83" stroke="currentColor" strokeWidth="0.9" />
          <circle cx="80" cy="80" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Ring 1 — dense */}
          <circle cx="80" cy="68" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="87" cy="70" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="91" cy="76" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="90" cy="84" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="86" cy="91" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="79" cy="94" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="72" cy="91" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="68" cy="84" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="69" cy="76" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="73" cy="69" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="84" cy="66" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="76" cy="65" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="93" cy="80" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="66" cy="80" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {/* Ring 2 — medium */}
          <circle cx="80" cy="56" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="89" cy="58" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="97" cy="63" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="102" cy="72" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="103" cy="82" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="100" cy="92" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="94" cy="100" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="84" cy="105" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="74" cy="104" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="65" cy="99" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="59" cy="91" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="57" cy="81" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="59" cy="71" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="65" cy="62" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="73" cy="57" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="94" cy="67" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="96" cy="88" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="63" cy="88" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="62" cy="68" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.65" />
          {/* Ring 3 — sparse */}
          <circle cx="80" cy="42" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="95" cy="46" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="108" cy="56" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="116" cy="70" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="117" cy="86" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="111" cy="100" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="100" cy="112" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="84" cy="118" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="68" cy="116" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="54" cy="107" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="45" cy="94" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="44" cy="78" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="49" cy="62" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="60" cy="50" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="72" cy="43" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="110" cy="62" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="113" cy="78" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="50" cy="72" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="47" cy="88" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="92" cy="114" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle cx="72" cy="118" r="1.2" fill="none" stroke="currentColor" strokeWidth="0.55" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-cholera-map)" />
    </PatternFrame>
  );
}

// Opium Empire — botanical poppy illustration
function OpiumEmpirePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-opium-empire" x="0" y="0" width="120" height="200" patternUnits="userSpaceOnUse">
          {/* Poppy A — full plant */}
          <path
            d="M30,190 C28,160 32,130 30,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M30,150 C22,144 16,136 20,128 C24,122 30,128 30,138"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <path
            d="M30,142 C38,136 44,128 40,120 C36,114 30,120 30,130"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <line x1="30" y1="100" x2="30" y2="90" stroke="currentColor" strokeWidth="0.7" />
          <ellipse cx="30" cy="78" rx="11" ry="13" fill="none" stroke="currentColor" strokeWidth="0.85" />
          <ellipse cx="30" cy="65" rx="7" ry="2.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="30" y1="65" x2="30" y2="62" stroke="currentColor" strokeWidth="0.6" />
          <line x1="24" y1="67" x2="22" y2="65" stroke="currentColor" strokeWidth="0.6" />
          <line x1="36" y1="67" x2="38" y2="65" stroke="currentColor" strokeWidth="0.6" />
          <line x1="21" y1="72" x2="18" y2="71" stroke="currentColor" strokeWidth="0.6" />
          <line x1="39" y1="72" x2="42" y2="71" stroke="currentColor" strokeWidth="0.6" />
          <path
            d="M23,66 C14,56 12,44 20,40 C26,37 30,44 28,54"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <path
            d="M37,66 C46,56 48,44 40,40 C34,37 30,44 32,54"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <path
            d="M20,72 C10,68 6,58 12,52 C16,48 22,54 24,62"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <path
            d="M40,72 C50,68 54,58 48,52 C44,48 38,54 36,62"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          {/* Poppy B — drooping bud */}
          <path
            d="M90,200 C88,175 92,150 90,125 C89,115 84,108 82,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M90,160 C98,154 104,144 100,136 C96,130 90,136 90,146"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <ellipse
            cx="82"
            cy="94"
            rx="7"
            ry="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            transform="rotate(-20 82 94)"
          />
          <path d="M76,88 C78,84 82,83 86,86" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M78,90 C79,85 83,82 87,84" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-opium-empire)" />
    </PatternFrame>
  );
}

// Window Tax — arched window with bricked-up interior
function WindowTaxPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-window-tax" patternTransform="scale(1.12)" x="0" y="0" width="120" height="140" patternUnits="userSpaceOnUse">
          <g transform="translate(60, 70)">
            <line x1="-22" y1="44" x2="-22" y2="-14" stroke="currentColor" strokeWidth="0.9" />
            <line x1="22" y1="44" x2="22" y2="-14" stroke="currentColor" strokeWidth="0.9" />
            <line x1="-26" y1="44" x2="26" y2="44" stroke="currentColor" strokeWidth="0.9" />
            <path d="M-22,-14 A22,22 0 0,1 22,-14" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <rect x="-18" y="-10" width="16" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="2" y="-10" width="16" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="-20" y="-2" width="12" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="-6" y="-2" width="12" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="8" y="-2" width="12" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="-18" y="6" width="16" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="2" y="6" width="16" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="-20" y="14" width="12" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="-6" y="14" width="12" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="8" y="14" width="12" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="-18" y="22" width="16" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="2" y="22" width="16" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="-20" y="30" width="12" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="-6" y="30" width="12" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="8" y="30" width="12" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-window-tax)" />
    </PatternFrame>
  );
}

// Daylight Saving Time — clock face at 1:58 with spring-forward arrow
function DaylightSavingTimePattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-daylight-saving-time" patternTransform="scale(1.18)" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <g transform="translate(50, 50)">
            <circle cx="0" cy="0" r="36" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <circle cx="0" cy="0" r="32" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <line x1="0" y1="-32" x2="0" y2="-26" stroke="currentColor" strokeWidth="0.8" />
            <line x1="16" y1="-27.7" x2="13.9" y2="-24" stroke="currentColor" strokeWidth="0.5" />
            <line x1="27.7" y1="-16" x2="24" y2="-13.9" stroke="currentColor" strokeWidth="0.5" />
            <line x1="32" y1="0" x2="26" y2="0" stroke="currentColor" strokeWidth="0.8" />
            <line x1="27.7" y1="16" x2="24" y2="13.9" stroke="currentColor" strokeWidth="0.5" />
            <line x1="16" y1="27.7" x2="13.9" y2="24" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="32" x2="0" y2="26" stroke="currentColor" strokeWidth="0.8" />
            <line x1="-16" y1="27.7" x2="-13.9" y2="24" stroke="currentColor" strokeWidth="0.5" />
            <line x1="-27.7" y1="16" x2="-24" y2="13.9" stroke="currentColor" strokeWidth="0.5" />
            <line x1="-32" y1="0" x2="-26" y2="0" stroke="currentColor" strokeWidth="0.8" />
            <line x1="-27.7" y1="-16" x2="-24" y2="-13.9" stroke="currentColor" strokeWidth="0.5" />
            <line x1="-16" y1="-27.7" x2="-13.9" y2="-24" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="13" y2="-18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="0" y1="0" x2="-4" y2="-26" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="0" cy="0" r="2" fill="none" stroke="currentColor" strokeWidth="0.7" />
            <path d="M30,-20 A14,14 0 0,1 36,-6" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <path d="M36,-6 L32,-4 L38,-2" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-daylight-saving-time)" />
    </PatternFrame>
  );
}

// Safety Pin — side profile with coil, shaft, and clasp
function SafetyPinPattern({ opacity }: { opacity: number }) {
  return (
    <PatternFrame opacity={opacity}>
      <defs>
        <pattern id="bg-safety-pin" patternTransform="scale(1.12)" x="0" y="0" width="140" height="80" patternUnits="userSpaceOnUse">
          <g transform="translate(70, 40)">
            <path
              d="M-44,-4 C-40,-8 -36,-8 -36,-4 C-36,0 -40,0 -40,4 C-40,8 -36,8 -36,4"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.85"
              strokeLinecap="round"
            />
            <line x1="-36" y1="-4" x2="38" y2="-4" stroke="currentColor" strokeWidth="0.85" />
            <path d="M38,-4 L44,0" fill="none" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
            <rect x="36" y="-1" width="10" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M36,7 C20,10 -10,10 -36,4" fill="none" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-safety-pin)" />
    </PatternFrame>
  );
}

// ─── Public switcher ───────────────────────────────────────────────────────────

const PATTERN_OPACITY_MULTIPLIERS: Record<string, number> = {
  "fall-of-rome": 0.92,
  "french-revolution": 0.95,
  wwi: 0.92,
  "library-of-alexandria": 0.72,
  "coffee-houses": 0.78,
  "hollywood-birth": 0.86,
  "daylight-saving-time": 0.88,
  "louisiana-purchase": 1.12,
  whales: 1.08,
  "underwater-archaeology": 1.06,
  "f1-senna": 1.08,
  "emu-war": 1.1,
  "safety-pin": 1.12,
};

function getPatternOpacity(scenarioId: string, opacity: number): number {
  const multiplier = PATTERN_OPACITY_MULTIPLIERS[scenarioId] ?? 1;
  return Math.min(1, Math.max(0, opacity * multiplier));
}

interface ScenarioPatternSvgProps {
  scenarioId: string;
  opacity: number;
}

export function ScenarioPatternSvg({ scenarioId, opacity }: ScenarioPatternSvgProps) {
  const patternOpacity = getPatternOpacity(scenarioId, opacity);

  switch (scenarioId) {
    case "fall-of-rome":
      return <RomePattern opacity={patternOpacity} />;
    case "french-revolution":
      return <FrancePattern opacity={patternOpacity} />;
    case "scientific-revolution":
      return <SciencePattern opacity={patternOpacity} />;
    case "wwi":
      return <WWIPattern opacity={patternOpacity} />;
    case "year-without-a-summer":
      return <SummerPattern opacity={patternOpacity} />;
    case "wright-brothers":
      return <WrightPattern opacity={patternOpacity} />;
    case "underwater-archaeology":
      return <UnderwaterPattern opacity={patternOpacity} />;
    case "templars":
      return <TemplarsPattern opacity={patternOpacity} />;
    case "mongols":
      return <MongolsPattern opacity={patternOpacity} />;
    case "polynesia":
      return <PolynesiaPattern opacity={patternOpacity} />;
    case "zheng-he":
      return <ZhengHePattern opacity={patternOpacity} />;
    case "louisiana-purchase":
      return <LouisianaPattern opacity={patternOpacity} />;
    case "whales":
      return <WhalesPattern opacity={patternOpacity} />;
    case "napster":
      return <NapsterPattern opacity={patternOpacity} />;
    case "tulip-mania":
      return <TulipManiaPattern opacity={patternOpacity} />;
    case "leaded-gasoline":
      return <LeadedGasolinePattern opacity={patternOpacity} />;
    case "invention-of-teenager":
      return <InventionOfTeenagerPattern opacity={patternOpacity} />;
    case "black-plague-renaissance":
      return <BlackPlagueRenaissancePattern opacity={patternOpacity} />;
    case "age-of-exploration":
      return <AgeOfExplorationPattern opacity={patternOpacity} />;
    case "hollywood-birth":
      return <HollywoodBirthPattern opacity={patternOpacity} />;
    case "hollywood-code":
      return <HollywoodCodePattern opacity={patternOpacity} />;
    case "hollywood-blockbuster":
      return <HollywoodBlockbusterPattern opacity={patternOpacity} />;
    case "f1-turbo-era":
      return <F1TurboPattern opacity={patternOpacity} />;
    case "f1-bernie":
      return <F1BerniePattern opacity={patternOpacity} />;
    case "f1-senna":
      return <F1SennaPattern opacity={patternOpacity} />;
    case "cats":
      return <CatsPattern opacity={patternOpacity} />;
    case "emu-war":
      return <EmuWarPattern opacity={patternOpacity} />;
    case "library-of-alexandria":
      return <LibraryOfAlexandriaPattern opacity={patternOpacity} />;
    case "coffee-houses":
      return <CoffeeHousesPattern opacity={patternOpacity} />;
    case "kanye-west":
      return <KanyeWestPattern opacity={patternOpacity} />;
    case "kyiv":
      return <KyivPattern opacity={patternOpacity} />;
    case "golden-age-piracy":
      return <GoldenAgePiracyPattern opacity={patternOpacity} />;
    case "trial-of-socrates":
      return <TrialOfSocratesPattern opacity={patternOpacity} />;
    case "homer":
      return <HomerPattern opacity={patternOpacity} />;
    case "mediterranean-summer":
      return <MediterraneanSummerPattern opacity={patternOpacity} />;
    case "suez-canal":
      return <SuezCanalPattern opacity={patternOpacity} />;
    case "swimming-leisure":
      return <SwimmingLeisurePattern opacity={patternOpacity} />;
    case "cholera-map":
      return <CholeraMapPattern opacity={patternOpacity} />;
    case "opium-empire":
      return <OpiumEmpirePattern opacity={patternOpacity} />;
    case "window-tax":
      return <WindowTaxPattern opacity={patternOpacity} />;
    case "daylight-saving-time":
      return <DaylightSavingTimePattern opacity={patternOpacity} />;
    case "safety-pin":
      return <SafetyPinPattern opacity={patternOpacity} />;
    case "bedlam":
      return <BedlamPattern opacity={patternOpacity} />;
    default:
      return null;
  }
}
