// SVG background pattern components — one per scenario, rendered behind the graph.
// All patterns are pointer-events: none and never affect interaction.

// Fall of Rome — Roman arch repeat
function RomePattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
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
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-france" x="0" y="0" width="64" height="80" patternUnits="userSpaceOnUse">
          {/* Central petal — teardrop */}
          <path d="M32,14 C28,22 27,30 32,34 C37,30 36,22 32,14Z" fill="none" stroke="#E8E3D5" strokeWidth="1" />
          {/* Left petal */}
          <path
            d="M32,34 C26,30 20,26 18,22 C16,17 20,13 24,16 C27,18 29,26 32,34Z"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="1"
          />
          {/* Right petal */}
          <path
            d="M32,34 C38,30 44,26 46,22 C48,17 44,13 40,16 C37,18 35,26 32,34Z"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="1"
          />
          {/* Horizontal banding bar */}
          <line x1="24" y1="36" x2="40" y2="36" stroke="#E8E3D5" strokeWidth="1" />
          <line x1="26" y1="38" x2="38" y2="38" stroke="#E8E3D5" strokeWidth="0.7" />
          {/* Base drop */}
          <path d="M29,38 C29,42 30,46 32,48 C34,46 35,42 35,38" fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
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
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-science" x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
          {/* Sun at tile centre */}
          <circle cx="120" cy="120" r="5" fill="none" stroke="#E8E3D5" strokeWidth="1" />
          <circle cx="120" cy="120" r="2" fill="#E8E3D5" />
          {/* Orbits */}
          <circle cx="120" cy="120" r="28" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          <circle cx="120" cy="120" r="52" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          <circle cx="120" cy="120" r="78" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <circle cx="120" cy="120" r="104" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          {/* Planets at fixed positions */}
          <circle cx="148" cy="120" r="2.5" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <circle cx="120" cy="68" r="2.5" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <circle cx="76" cy="138" r="2.5" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <circle cx="155" cy="168" r="2.5" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          {/* Outer planet */}
          <circle cx="120" cy="16" r="2" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-science)" />
    </svg>
  );
}

// WWI — barbed wire + trench cross-section repeat
function WWIPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-wwi" x="0" y="0" width="100" height="60" patternUnits="userSpaceOnUse">
          {/*  Main wire strand */}
          <path d="M0,30 Q25,22 50,30 Q75,38 100,30" fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
          {/*  Barb clusters at intervals */}
          <line x1="20" y1="25" x2="26" y2="20" stroke="#E8E3D5" strokeWidth="0.8" />
          <line x1="20" y1="25" x2="26" y2="30" stroke="#E8E3D5" strokeWidth="0.8" />
          <line x1="22" y1="33" x2="16" y2="28" stroke="#E8E3D5" strokeWidth="0.8" />
          <line x1="22" y1="33" x2="16" y2="38" stroke="#E8E3D5" strokeWidth="0.8" />
          <line x1="70" y1="35" x2="76" y2="30" stroke="#E8E3D5" strokeWidth="0.8" />
          <line x1="70" y1="35" x2="76" y2="40" stroke="#E8E3D5" strokeWidth="0.8" />
          <line x1="72" y1="27" x2="66" y2="22" stroke="#E8E3D5" strokeWidth="0.8" />
          <line x1="72" y1="27" x2="66" y2="32" stroke="#E8E3D5" strokeWidth="0.8" />
          {/*  Trench cross-section suggestion — horizontal earth line */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="#E8E3D5" strokeWidth="0.4" />
          <line x1="0" y1="54" x2="100" y2="54" stroke="#E8E3D5" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-wwi)" />
    </svg>
  );
}

// Year Without a Summer — volcanic plume / eruption cross-section
function SummerPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-summer" x="0" y="0" width="120" height="110" patternUnits="userSpaceOnUse">
          <line x1="52" y1="100" x2="68" y2="100" stroke="#E8E3D5" strokeWidth="1" />
          <path
            d="M52,100 C48,90 44,82 46,74 C48,66 54,62 60,62 C66,62 72,66 74,74 C76,82 72,90 68,100"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.9"
          />
          <path
            d="M48,80 C42,70 36,58 40,46 C43,36 52,30 60,30 C68,30 77,36 80,46 C84,58 78,70 72,80"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.7"
          />
          <path
            d="M43,60 C36,48 30,32 36,20 C41,10 52,5 60,5 C68,5 79,10 84,20 C90,32 84,48 77,60"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.5"
          />
          <line x1="20" y1="72" x2="16" y2="82" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="96" y1="68" x2="100" y2="78" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="10" y1="88" x2="7" y2="98" stroke="#E8E3D5" strokeWidth="0.4" />
          <line x1="108" y1="84" x2="111" y2="94" stroke="#E8E3D5" strokeWidth="0.4" />
          <line x1="0" y1="100" x2="120" y2="100" stroke="#E8E3D5" strokeWidth="0.5" />
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
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-templars" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Top arm: narrow at base (x=44–56), wide at tip (x=36–64) */}
          <path
            d="M44,44 L36,18 L64,18 L56,44 Z"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.9"
            strokeLinejoin="miter"
          />
          {/* Bottom arm */}
          <path
            d="M44,56 L36,82 L64,82 L56,56 Z"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.9"
            strokeLinejoin="miter"
          />
          {/* Left arm: narrow at right (y=44–56), wide at tip (y=36–64) */}
          <path
            d="M44,44 L18,36 L18,64 L44,56 Z"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.9"
            strokeLinejoin="miter"
          />
          {/* Right arm */}
          <path
            d="M56,44 L82,36 L82,64 L56,56 Z"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.9"
            strokeLinejoin="miter"
          />
          {/* Centre square */}
          <rect x="44" y="44" width="12" height="12" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
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
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-underwater" x="0" y="0" width="240" height="200" patternUnits="userSpaceOnUse">
          {/* Sonar source at top centre */}
          <circle cx="120" cy="20" r="3" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          {/* Expanding semicircular pings downward */}
          <path d="M80,20 Q120,60 160,20" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <path d="M50,20 Q120,100 190,20" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          <path d="M20,20 Q120,140 220,20" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <path d="M0,20  Q120,180 240,20" fill="none" stroke="#E8E3D5" strokeWidth="0.4" />
          {/* Depth ruler lines on left */}
          <line x1="15" y1="60" x2="22" y2="60" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="15" y1="100" x2="22" y2="100" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="15" y1="140" x2="22" y2="140" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="15" y1="180" x2="22" y2="180" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="18" y1="20" x2="18" y2="190" stroke="#E8E3D5" strokeWidth="0.3" />
          {/* Echo return dot */}
          <circle cx="145" cy="130" r="2" fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
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
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-wright" x="0" y="0" width="200" height="120" patternUnits="userSpaceOnUse">
          <path d="M10,30 C40,20 120,18 180,28 C120,32 40,34 10,30 Z" fill="none" stroke="white" strokeWidth="0.8" />
          <path d="M10,55 C40,45 120,43 180,53 C120,57 40,59 10,55 Z" fill="none" stroke="white" strokeWidth="0.8" />
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

// Mongol Conquests — cavalry arrow formations + steppe horizon
function MongolsPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-mongols" x="0" y="0" width="160" height="110" patternUnits="userSpaceOnUse">
          <path d="M70,12 C66,16 60,22 58,30" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <path d="M58,30 C56,42 56,54 60,55" fill="none" stroke="#E8E3D5" strokeWidth="1.1" />
          <path d="M60,55 C64,56 64,68 62,80" fill="none" stroke="#E8E3D5" strokeWidth="1.1" />
          <path d="M62,80 C60,88 64,96 70,98" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <line x1="70" y1="12" x2="70" y2="98" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="70" y1="55" x2="15" y2="55" stroke="#E8E3D5" strokeWidth="0.7" />
          <path d="M15,55 L22,51 L20,55 L22,59 Z" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <path d="M65,55 L70,50 M65,55 L70,60" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="56" y1="50" x2="60" y2="50" stroke="#E8E3D5" strokeWidth="0.6" />
          <line x1="56" y1="55" x2="60" y2="55" stroke="#E8E3D5" strokeWidth="0.6" />
          <line x1="56" y1="60" x2="60" y2="60" stroke="#E8E3D5" strokeWidth="0.6" />
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
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-polynesia" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Cardinal points — longer */}
          <line x1="100" y1="100" x2="100" y2="60" stroke="white" strokeWidth="0.8" />
          <line x1="100" y1="100" x2="100" y2="140" stroke="white" strokeWidth="0.8" />
          <line x1="100" y1="100" x2="60" y2="100" stroke="white" strokeWidth="0.8" />
          <line x1="100" y1="100" x2="140" y2="100" stroke="white" strokeWidth="0.8" />
          {/* Intercardinal points — shorter */}
          <line x1="100" y1="100" x2="128" y2="72" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="100" x2="72" y2="72" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="100" x2="128" y2="128" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="100" x2="72" y2="128" stroke="white" strokeWidth="0.5" />
          {/* Centre dot */}
          <circle cx="100" cy="100" r="2" fill="white" />
          {/* Outer ring */}
          <circle cx="100" cy="100" r="38" fill="none" stroke="white" strokeWidth="0.4" />
          {/* Ocean waves */}
          <path
            d="M20,170 Q50,162 80,170 Q110,178 140,170 Q170,162 200,170"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <path
            d="M20,182 Q50,174 80,182 Q110,190 140,182 Q170,174 200,182"
            fill="none"
            stroke="white"
            strokeWidth="0.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-polynesia)" />
    </svg>
  );
}

// Zheng He — luopan compass octagon + ocean waves
function ZhengHePattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-zheng-he" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
          {/* Outer octagon */}
          <polygon
            points="90,42 122,58 134,90 122,122 90,138 58,122 46,90 58,58"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.8"
          />
          {/* Second concentric octagon — gives ba gua ring feel */}
          <polygon
            points="90,58 110,66 118,90 110,114 90,122 70,114 62,90 70,66"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.5"
          />
          {/* Inner circle */}
          <circle cx="90" cy="90" r="16" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          {/* Centre dot */}
          <circle cx="90" cy="90" r="2.5" fill="#E8E3D5" />
          {/* Trigram hash marks on each octagon facet */}
          <line x1="96" y1="44" x2="102" y2="47" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="96" y1="47" x2="102" y2="50" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="78" y1="44" x2="84" y2="47" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="78" y1="47" x2="84" y2="50" stroke="#E8E3D5" strokeWidth="0.5" />
          {/* Cardinal radials (shorter — inside the octagon only) */}
          <line x1="90" y1="58" x2="90" y2="74" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="90" y1="106" x2="90" y2="122" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="62" y1="90" x2="74" y2="90" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="106" y1="90" x2="118" y2="90" stroke="#E8E3D5" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-zheng-he)" />
    </svg>
  );
}

// Whaling — whale fluke breaking the surface, repeated
function WhalesPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-whales" x="0" y="0" width="200" height="160" patternUnits="userSpaceOnUse">
          {/* Left fluke */}
          <path
            d="M100,100 C85,90 60,75 40,80 C25,84 20,95 30,100 C45,106 70,95 100,100"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
          {/* Right fluke */}
          <path
            d="M100,100 C115,90 140,75 160,80 C175,84 180,95 170,100 C155,106 130,95 100,100"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
          {/* Body hint rising from centre */}
          <path d="M100,100 C100,85 98,70 96,55" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Water surface line */}
          <path d="M0,115 Q50,108 100,115 Q150,122 200,115" fill="none" stroke="white" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-whales)" />
    </svg>
  );
}

// Louisiana Purchase — Mississippi River delta branching waterways
function LouisianaPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-louisiana-purchase" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Main river channel */}
          <path d="M100,0 C95,40 105,80 100,120 C95,160 105,180 100,200" fill="none" stroke="white" strokeWidth="1" />
          {/* Left tributaries */}
          <path d="M100,40 C80,50 60,45 40,55" fill="none" stroke="white" strokeWidth="0.6" />
          <path d="M100,80 C75,85 55,80 30,90" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M100,120 C80,125 65,120 45,130" fill="none" stroke="white" strokeWidth="0.4" />
          {/* Right tributaries */}
          <path d="M100,50 C120,58 140,52 165,60" fill="none" stroke="white" strokeWidth="0.6" />
          <path d="M100,90 C125,94 145,88 170,96" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M100,130 C118,134 138,128 160,136" fill="none" stroke="white" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-louisiana-purchase)" />
    </svg>
  );
}

// Napster — distributed peer-to-peer network topology
function NapsterPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-napster" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Nodes — irregular constellation suggesting distributed network */}
          <circle cx="80" cy="80" r="4" fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
          <circle cx="30" cy="40" r="2.5" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <circle cx="130" cy="35" r="2.5" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <circle cx="25" cy="115" r="2.5" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <circle cx="135" cy="120" r="2.5" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <circle cx="80" cy="135" r="2.5" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <circle cx="55" cy="60" r="1.8" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          <circle cx="108" cy="65" r="1.8" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          <circle cx="50" cy="108" r="1.8" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          <circle cx="112" cy="105" r="1.8" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          {/* Edges — many-to-many connections, no hierarchy */}
          <line x1="80" y1="80" x2="30" y2="40" stroke="#E8E3D5" strokeWidth="0.4" />
          <line x1="80" y1="80" x2="130" y2="35" stroke="#E8E3D5" strokeWidth="0.4" />
          <line x1="80" y1="80" x2="25" y2="115" stroke="#E8E3D5" strokeWidth="0.4" />
          <line x1="80" y1="80" x2="135" y2="120" stroke="#E8E3D5" strokeWidth="0.4" />
          <line x1="80" y1="80" x2="80" y2="135" stroke="#E8E3D5" strokeWidth="0.4" />
          <line x1="30" y1="40" x2="55" y2="60" stroke="#E8E3D5" strokeWidth="0.3" />
          <line x1="130" y1="35" x2="108" y2="65" stroke="#E8E3D5" strokeWidth="0.3" />
          <line x1="25" y1="115" x2="50" y2="108" stroke="#E8E3D5" strokeWidth="0.3" />
          <line x1="135" y1="120" x2="112" y2="105" stroke="#E8E3D5" strokeWidth="0.3" />
          <line x1="80" y1="135" x2="50" y2="108" stroke="#E8E3D5" strokeWidth="0.3" />
          <line x1="80" y1="135" x2="112" y2="105" stroke="#E8E3D5" strokeWidth="0.3" />
          <line x1="55" y1="60" x2="108" y2="65" stroke="#E8E3D5" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-napster)" />
    </svg>
  );
}

// Tulip Mania — tulip silhouette with stem, leaves, and three petals
function TulipManiaPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-tulip-mania" x="0" y="0" width="140" height="180" patternUnits="userSpaceOnUse">
          {/* Stem */}
          <line x1="70" y1="140" x2="70" y2="100" stroke="white" strokeWidth="0.8" />
          {/* Left leaf */}
          <path d="M70,125 C55,115 45,105 50,95" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Right leaf */}
          <path d="M70,120 C85,110 92,100 87,90" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Tulip head: three petals */}
          <path d="M70,100 C62,92 58,80 62,68 C65,58 70,55 70,55" fill="none" stroke="white" strokeWidth="0.8" />
          <path d="M70,100 C78,92 82,80 78,68 C75,58 70,55 70,55" fill="none" stroke="white" strokeWidth="0.8" />
          <path d="M70,98 C70,88 70,72 70,55" fill="none" stroke="white" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-tulip-mania)" />
    </svg>
  );
}

// Leaded Gasoline — simplified molecular bond diagram suggesting chemistry and industry
function LeadedGasolinePattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-leaded-gasoline" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Central atom */}
          <circle cx="80" cy="80" r="5" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Four bonds radiating outward — tetrahedral structure */}
          <line x1="80" y1="80" x2="80" y2="44" stroke="white" strokeWidth="0.6" />
          <line x1="80" y1="80" x2="80" y2="116" stroke="white" strokeWidth="0.6" />
          <line x1="80" y1="80" x2="44" y2="80" stroke="white" strokeWidth="0.6" />
          <line x1="80" y1="80" x2="116" y2="80" stroke="white" strokeWidth="0.6" />
          {/* Outer atoms */}
          <circle cx="80" cy="40" r="3.5" fill="none" stroke="white" strokeWidth="0.7" />
          <circle cx="80" cy="120" r="3.5" fill="none" stroke="white" strokeWidth="0.7" />
          <circle cx="40" cy="80" r="3.5" fill="none" stroke="white" strokeWidth="0.7" />
          <circle cx="120" cy="80" r="3.5" fill="none" stroke="white" strokeWidth="0.7" />
          {/* Diagonal bonds for ethyl groups */}
          <line x1="80" y1="80" x2="108" y2="52" stroke="white" strokeWidth="0.4" opacity="0.5" />
          <line x1="80" y1="80" x2="52" y2="108" stroke="white" strokeWidth="0.4" opacity="0.5" />
          <circle cx="111" cy="49" r="2.5" fill="none" stroke="white" strokeWidth="0.6" opacity="0.5" />
          <circle cx="49" cy="111" r="2.5" fill="none" stroke="white" strokeWidth="0.6" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-leaded-gasoline)" />
    </svg>
  );
}

// Invention of the Teenager — vinyl record with concentric grooves
function InventionOfTeenagerPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-invention-of-teenager" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
          {/* Outer edge of record */}
          <circle cx="90" cy="90" r="72" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Grooves — concentric circles suggesting vinyl */}
          <circle cx="90" cy="90" r="62" fill="none" stroke="white" strokeWidth="0.4" />
          <circle cx="90" cy="90" r="52" fill="none" stroke="white" strokeWidth="0.4" />
          <circle cx="90" cy="90" r="42" fill="none" stroke="white" strokeWidth="0.4" />
          <circle cx="90" cy="90" r="32" fill="none" stroke="white" strokeWidth="0.4" />
          {/* Label area */}
          <circle cx="90" cy="90" r="22" fill="none" stroke="white" strokeWidth="0.7" />
          {/* Centre hole */}
          <circle cx="90" cy="90" r="3" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-invention-of-teenager)" />
    </svg>
  );
}

// Black Plague & Renaissance — memento mori skull inside a Renaissance arch
function BlackPlagueRenaissancePattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-black-plague-renaissance" x="0" y="0" width="160" height="200" patternUnits="userSpaceOnUse">
          {/* Renaissance arch */}
          <path
            d="M40,180 L40,100 Q40,60 80,60 Q120,60 120,100 L120,180"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
          {/* Keystone at top of arch */}
          <path d="M70,62 L80,50 L90,62" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Simple skull inside arch */}
          <circle cx="80" cy="118" r="14" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Eye sockets */}
          <ellipse cx="74" cy="116" rx="4" ry="3" fill="none" stroke="white" strokeWidth="0.5" />
          <ellipse cx="86" cy="116" rx="4" ry="3" fill="none" stroke="white" strokeWidth="0.5" />
          {/* Nose */}
          <path d="M78,122 L80,125 L82,122" fill="none" stroke="white" strokeWidth="0.4" />
          {/* Teeth suggestion */}
          <line x1="74" y1="128" x2="86" y2="128" stroke="white" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-black-plague-renaissance)" />
    </svg>
  );
}

// Age of Exploration — compass rose, symbol of navigation and discovery
function AgeOfExplorationPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-age-of-exploration" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
          {/* Outer circle */}
          <circle cx="90" cy="90" r="62" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <circle cx="90" cy="90" r="14" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          {/* Cardinal points — diamond outlines only (no fill) */}
          <polygon points="90,28 93,86 90,90 87,86" fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
          <polygon points="90,152 93,94 90,90 87,94" fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
          <polygon points="28,90 86,87 90,90 86,93" fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
          <polygon points="152,90 94,87 90,90 94,93" fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
          {/* Intercardinal — smaller diamonds */}
          <polygon points="90,90 132,48 135,51 93,93" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <polygon points="90,90 48,48 51,51 87,87" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <polygon points="90,90 132,132 129,135 87,93" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <polygon points="90,90 48,132 51,129 93,87" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <circle cx="90" cy="90" r="3" fill="#E8E3D5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-age-of-exploration)" />
    </svg>
  );
}

// Hollywood Birth — film strip with sprocket holes
function HollywoodBirthPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-hollywood-birth" x="0" y="0" width="80" height="200" patternUnits="userSpaceOnUse">
          {/* Film strip edges */}
          <rect x="8" y="0" width="64" height="200" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Left sprocket holes */}
          <rect x="12" y="10" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="12" y="40" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="12" y="70" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="12" y="100" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="12" y="130" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="12" y="160" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          {/* Right sprocket holes */}
          <rect x="58" y="10" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="58" y="40" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="58" y="70" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="58" y="100" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="58" y="130" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="58" y="160" width="10" height="14" rx="2" fill="none" stroke="white" strokeWidth="0.5" />
          {/* Frame lines */}
          <line x1="26" y1="30" x2="54" y2="30" stroke="white" strokeWidth="0.4" />
          <line x1="26" y1="60" x2="54" y2="60" stroke="white" strokeWidth="0.4" />
          <line x1="26" y1="90" x2="54" y2="90" stroke="white" strokeWidth="0.4" />
          <line x1="26" y1="120" x2="54" y2="120" stroke="white" strokeWidth="0.4" />
          <line x1="26" y1="150" x2="54" y2="150" stroke="white" strokeWidth="0.4" />
          <line x1="26" y1="180" x2="54" y2="180" stroke="white" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-hollywood-birth)" />
    </svg>
  );
}

// Hollywood Code — censored film frames suggesting the Hays Code
function HollywoodCodePattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-hollywood-code" x="0" y="0" width="120" height="140" patternUnits="userSpaceOnUse">
          {/* Film frame outer */}
          <rect x="20" y="15" width="80" height="55" rx="2" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          {/* Censorship redaction bars — thick parallel lines across the frame */}
          <line x1="20" y1="31" x2="100" y2="31" stroke="#E8E3D5" strokeWidth="2.5" />
          <line x1="20" y1="47" x2="100" y2="47" stroke="#E8E3D5" strokeWidth="2.5" />
          <line x1="20" y1="59" x2="100" y2="59" stroke="#E8E3D5" strokeWidth="1.5" />
          {/* Second frame — partial, below */}
          <rect x="20" y="85" width="80" height="55" rx="2" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          {/* Redaction bars */}
          <line x1="20" y1="101" x2="100" y2="101" stroke="#E8E3D5" strokeWidth="2.5" />
          <line x1="20" y1="117" x2="100" y2="117" stroke="#E8E3D5" strokeWidth="2.5" />
          {/* "APPROVED" stamp suggestion — rectangular outline with inner rectangle */}
          <rect x="32" y="92" width="56" height="20" rx="1" fill="none" stroke="#E8E3D5" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-hollywood-code)" />
    </svg>
  );
}

// Hollywood Blockbuster — clapperboard, the symbol of filmmaking
function HollywoodBlockbusterPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-hollywood-blockbuster" x="0" y="0" width="180" height="160" patternUnits="userSpaceOnUse">
          {/* Clapperboard body */}
          <rect x="30" y="55" width="120" height="85" rx="3" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Clapper strip */}
          <rect x="30" y="38" width="120" height="22" rx="3" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Diagonal stripes on clapper */}
          <line x1="50" y1="38" x2="40" y2="60" stroke="white" strokeWidth="2.5" />
          <line x1="70" y1="38" x2="60" y2="60" stroke="white" strokeWidth="2.5" />
          <line x1="90" y1="38" x2="80" y2="60" stroke="white" strokeWidth="2.5" />
          <line x1="110" y1="38" x2="100" y2="60" stroke="white" strokeWidth="2.5" />
          <line x1="130" y1="38" x2="120" y2="60" stroke="white" strokeWidth="2.5" />
          {/* Hinge */}
          <circle cx="38" cy="42" r="3" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Text lines on board */}
          <line x1="45" y1="80" x2="135" y2="80" stroke="white" strokeWidth="0.4" />
          <line x1="45" y1="95" x2="135" y2="95" stroke="white" strokeWidth="0.4" />
          <line x1="45" y1="110" x2="100" y2="110" stroke="white" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-hollywood-blockbuster)" />
    </svg>
  );
}

// F1 Turbo Era — turbocharger cross-section, turbine blades radiating from centre
function F1TurboPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-f1-turbo-era" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Outer housing circle */}
          <circle cx="80" cy="80" r="55" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Inner hub */}
          <circle cx="80" cy="80" r="12" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Centre point */}
          <circle cx="80" cy="80" r="3" fill="white" />
          {/* Turbine blades — 6 curved blades */}
          <path d="M80,68 C85,65 90,60 88,52" fill="none" stroke="white" strokeWidth="1.2" />
          <path d="M92,74 C97,72 103,70 104,62" fill="none" stroke="white" strokeWidth="1.2" />
          <path d="M92,86 C95,91 96,98 90,102" fill="none" stroke="white" strokeWidth="1.2" />
          <path d="M80,92 C82,97 80,104 74,106" fill="none" stroke="white" strokeWidth="1.2" />
          <path d="M68,86 C63,89 57,90 54,84" fill="none" stroke="white" strokeWidth="1.2" />
          <path d="M68,74 C65,69 64,62 70,58" fill="none" stroke="white" strokeWidth="1.2" />
          {/* Speed lines suggesting rotation */}
          <path d="M80,25 Q85,52 80,68" fill="none" stroke="white" strokeWidth="0.3" opacity="0.4" />
          <path d="M120,50 Q100,65 92,74" fill="none" stroke="white" strokeWidth="0.3" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-f1-turbo-era)" />
    </svg>
  );
}

// F1 Bernie — banknote grid suggesting money and backroom deals
function F1BerniePattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-f1-bernie" x="0" y="0" width="160" height="100" patternUnits="userSpaceOnUse">
          {/* Outer border */}
          <rect x="8" y="8" width="144" height="84" rx="4" fill="none" stroke="#E8E3D5" strokeWidth="0.8" />
          {/* Inner border */}
          <rect x="13" y="13" width="134" height="74" rx="3" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          {/* Guilloche-style curved band across middle */}
          <path d="M13,50 Q40,38 80,50 Q120,62 147,50" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <path d="M13,46 Q40,34 80,46 Q120,58 147,46" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <path d="M13,54 Q40,42 80,54 Q120,66 147,54" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          {/* Ruling lines (thicker than before) */}
          <line x1="18" y1="28" x2="142" y2="28" stroke="#E8E3D5" strokeWidth="0.6" />
          <line x1="18" y1="72" x2="142" y2="72" stroke="#E8E3D5" strokeWidth="0.6" />
          {/* Corner ornaments */}
          <circle cx="22" cy="22" r="4" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          <circle cx="138" cy="22" r="4" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          <circle cx="22" cy="78" r="4" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
          <circle cx="138" cy="78" r="4" fill="none" stroke="#E8E3D5" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-f1-bernie)" />
    </svg>
  );
}

// F1 Senna — Interlagos circuit layout
function F1SennaPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-f1-senna" x="0" y="0" width="240" height="200" patternUnits="userSpaceOnUse">
          {/* Interlagos outer boundary */}
          <path
            d="M40,160
           C40,130 45,105 60,88
           C72,74  88,68  100,70
           C114,72 122,84 118,100
           C114,114 102,120 90,116
           C78,112 72,100 78,88
           C84,76  98,72  108,78
           C120,86 124,102 118,118
           C112,134 98,148 82,158
           C66,168 50,170 40,160
           Z"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Inner boundary (track width) */}
          <path
            d="M48,158
           C48,132 52,110 65,95
           C76,82  90,76  100,78
           C112,80 118,90 114,104
           C110,116 100,122 90,118
           C80,114 76,104 82,94
           C88,84  100,80  108,86
           C118,94 120,110 114,124
           C108,138 96,150 82,158
           C68,166 54,168 48,158
           Z"
            fill="none"
            stroke="#E8E3D5"
            strokeWidth="0.4"
          />
          {/* Start/finish line */}
          <line x1="36" y1="158" x2="52" y2="158" stroke="#E8E3D5" strokeWidth="1.2" />
          <line x1="36" y1="154" x2="52" y2="154" stroke="#E8E3D5" strokeWidth="0.4" />
          {/* Senna S chicane */}
          <path d="M90,70 C84,64 80,58 86,52" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
          <path d="M86,52 C92,46 98,50 96,58" fill="none" stroke="#E8E3D5" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-f1-senna)" />
    </svg>
  );
}

// Cats — minimal cat face, instantly recognisable, quietly superior
function CatsPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-cats" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Head */}
          <circle cx="80" cy="88" r="32" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Left ear */}
          <path d="M54,64 L48,38 L72,56" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Right ear */}
          <path d="M106,64 L112,38 L88,56" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Left inner ear */}
          <path d="M56,62 L52,44 L68,57" fill="none" stroke="white" strokeWidth="0.4" />
          {/* Right inner ear */}
          <path d="M104,62 L108,44 L92,57" fill="none" stroke="white" strokeWidth="0.4" />
          {/* Left eye — almond shape */}
          <path d="M62,82 C65,77 75,77 78,82 C75,87 65,87 62,82 Z" fill="none" stroke="white" strokeWidth="0.7" />
          {/* Right eye */}
          <path d="M82,82 C85,77 95,77 98,82 C95,87 85,87 82,82 Z" fill="none" stroke="white" strokeWidth="0.7" />
          {/* Pupils — vertical slits */}
          <line x1="70" y1="78" x2="70" y2="86" stroke="white" strokeWidth="1.5" />
          <line x1="90" y1="78" x2="90" y2="86" stroke="white" strokeWidth="1.5" />
          {/* Nose */}
          <path d="M77,95 L80,92 L83,95 L80,98 Z" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Mouth */}
          <path d="M80,98 C76,102 72,103 70,101" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M80,98 C84,102 88,103 90,101" fill="none" stroke="white" strokeWidth="0.5" />
          {/* Whiskers left */}
          <line x1="46" y1="96" x2="72" y2="97" stroke="white" strokeWidth="0.4" />
          <line x1="44" y1="100" x2="72" y2="99" stroke="white" strokeWidth="0.4" />
          <line x1="46" y1="104" x2="72" y2="101" stroke="white" strokeWidth="0.4" />
          {/* Whiskers right */}
          <line x1="114" y1="96" x2="88" y2="97" stroke="white" strokeWidth="0.4" />
          <line x1="116" y1="100" x2="88" y2="99" stroke="white" strokeWidth="0.4" />
          <line x1="114" y1="104" x2="88" y2="101" stroke="white" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-cats)" />
    </svg>
  );
}

// Emu War — emu silhouette striding with quiet dignity
function EmuWarPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-emu-war" x="0" y="0" width="200" height="180" patternUnits="userSpaceOnUse">
          {/* Body — large oval */}
          <ellipse cx="95" cy="95" rx="28" ry="22" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Neck */}
          <path d="M95,73 C93,62 90,50 88,38" fill="none" stroke="white" strokeWidth="1.2" />
          {/* Head — small circle */}
          <circle cx="87" cy="34" r="7" fill="none" stroke="white" strokeWidth="0.8" />
          {/* Beak */}
          <path d="M80,33 L72,31 L80,36" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Eye */}
          <circle cx="85" cy="32" r="1.5" fill="white" />
          {/* Left leg */}
          <path d="M85,117 L82,138 L78,155" fill="none" stroke="white" strokeWidth="1" />
          {/* Left foot */}
          <path d="M78,155 L70,158 M78,155 L76,162 M78,155 L84,160" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Right leg */}
          <path d="M100,117 L103,138 L107,152" fill="none" stroke="white" strokeWidth="1" />
          {/* Right foot */}
          <path d="M107,152 L99,156 M107,152 L106,160 M107,152 L113,157" fill="none" stroke="white" strokeWidth="0.6" />
          {/* Wing suggestion */}
          <path d="M68,88 C72,82 80,80 95,82" fill="none" stroke="white" strokeWidth="0.5" />
          {/* Small feather detail */}
          <path d="M68,88 C65,92 66,98 70,100" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-emu-war)" />
    </svg>
  );
}

// Coffee Houses — top-down coffee cup with concentric rings + steam wisps + handle
function CoffeeHousesPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-coffee-houses" x="0" y="0" width="90" height="80" patternUnits="userSpaceOnUse">
          {/* Cup A (24,28) */}
          <circle cx="24" cy="28" r="16" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <circle cx="24" cy="28" r="10" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <circle cx="24" cy="28" r="7" fill="none" stroke="#E8E3D5" strokeWidth="0.4" />
          <path d="M34,24 C40,24 40,32 34,32" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <path d="M20,12 C19,8 21,5 20,1" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <path d="M26,11 C27,7 25,4 26,0" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          {/* Cup B (69,28) */}
          <circle cx="69" cy="28" r="16" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <circle cx="69" cy="28" r="10" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <circle cx="69" cy="28" r="7" fill="none" stroke="#E8E3D5" strokeWidth="0.4" />
          <path d="M79,24 C85,24 85,32 79,32" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <path d="M65,12 C64,8 66,5 65,1" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <path d="M71,11 C72,7 70,4 71,0" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          {/* Cup C — offset row (46,68) */}
          <circle cx="46" cy="68" r="16" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <circle cx="46" cy="68" r="10" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <circle cx="46" cy="68" r="7" fill="none" stroke="#E8E3D5" strokeWidth="0.4" />
          <path d="M56,64 C62,64 62,72 56,72" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <path d="M42,52 C41,48 43,45 42,41" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <path d="M48,51 C49,47 47,44 48,40" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-coffee-houses)" />
    </svg>
  );
}

// Library of Alexandria — concentric scroll circles (papyrus rolls viewed end-on)
function LibraryOfAlexandriaPattern({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <pattern id="bg-library-of-alexandria" x="0" y="0" width="80" height="60" patternUnits="userSpaceOnUse">
          {/* Scroll A */}
          <circle cx="20" cy="20" r="11" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <circle cx="20" cy="20" r="7.5" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="4.5" fill="none" stroke="#E8E3D5" strokeWidth="0.4" />
          <circle cx="20" cy="20" r="2" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="13" y1="20" x2="27" y2="20" stroke="#E8E3D5" strokeWidth="0.6" />
          <line x1="9" y1="9" x2="31" y2="9" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="9" y1="31" x2="31" y2="31" stroke="#E8E3D5" strokeWidth="0.5" />
          {/* Scroll B */}
          <circle cx="60" cy="20" r="11" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <circle cx="60" cy="20" r="7.5" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <circle cx="60" cy="20" r="4.5" fill="none" stroke="#E8E3D5" strokeWidth="0.4" />
          <circle cx="60" cy="20" r="2" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="53" y1="20" x2="67" y2="20" stroke="#E8E3D5" strokeWidth="0.6" />
          <line x1="49" y1="9" x2="71" y2="9" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="49" y1="31" x2="71" y2="31" stroke="#E8E3D5" strokeWidth="0.5" />
          {/* Scroll C — offset row */}
          <circle cx="40" cy="50" r="11" fill="none" stroke="#E8E3D5" strokeWidth="0.9" />
          <circle cx="40" cy="50" r="7.5" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <circle cx="40" cy="50" r="4.5" fill="none" stroke="#E8E3D5" strokeWidth="0.4" />
          <circle cx="40" cy="50" r="2" fill="none" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="33" y1="50" x2="47" y2="50" stroke="#E8E3D5" strokeWidth="0.6" />
          <line x1="29" y1="39" x2="51" y2="39" stroke="#E8E3D5" strokeWidth="0.5" />
          <line x1="29" y1="61" x2="51" y2="61" stroke="#E8E3D5" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-library-of-alexandria)" />
    </svg>
  );
}

// ─── Public switcher ───────────────────────────────────────────────────────────

interface ScenarioPatternSvgProps {
  scenarioId: string;
  opacity: number;
}

export function ScenarioPatternSvg({ scenarioId, opacity }: ScenarioPatternSvgProps) {
  switch (scenarioId) {
    case "fall-of-rome":
      return <RomePattern opacity={opacity} />;
    case "french-revolution":
      return <FrancePattern opacity={opacity} />;
    case "scientific-revolution":
      return <SciencePattern opacity={opacity} />;
    case "wwi":
      return <WWIPattern opacity={opacity} />;
    case "year-without-a-summer":
      return <SummerPattern opacity={opacity} />;
    case "wright-brothers":
      return <WrightPattern opacity={opacity} />;
    case "underwater-archaeology":
      return <UnderwaterPattern opacity={opacity} />;
    case "templars":
      return <TemplarsPattern opacity={opacity} />;
    case "mongols":
      return <MongolsPattern opacity={opacity} />;
    case "polynesia":
      return <PolynesiaPattern opacity={opacity} />;
    case "zheng-he":
      return <ZhengHePattern opacity={opacity} />;
    case "louisiana-purchase":
      return <LouisianaPattern opacity={opacity} />;
    case "whales":
      return <WhalesPattern opacity={opacity} />;
    case "napster":
      return <NapsterPattern opacity={opacity} />;
    case "tulip-mania":
      return <TulipManiaPattern opacity={opacity} />;
    case "leaded-gasoline":
      return <LeadedGasolinePattern opacity={opacity} />;
    case "invention-of-teenager":
      return <InventionOfTeenagerPattern opacity={opacity} />;
    case "black-plague-renaissance":
      return <BlackPlagueRenaissancePattern opacity={opacity} />;
    case "age-of-exploration":
      return <AgeOfExplorationPattern opacity={opacity} />;
    case "hollywood-birth":
      return <HollywoodBirthPattern opacity={opacity} />;
    case "hollywood-code":
      return <HollywoodCodePattern opacity={opacity} />;
    case "hollywood-blockbuster":
      return <HollywoodBlockbusterPattern opacity={opacity} />;
    case "f1-turbo-era":
      return <F1TurboPattern opacity={opacity} />;
    case "f1-bernie":
      return <F1BerniePattern opacity={opacity} />;
    case "f1-senna":
      return <F1SennaPattern opacity={opacity} />;
    case "cats":
      return <CatsPattern opacity={opacity} />;
    case "emu-war":
      return <EmuWarPattern opacity={opacity} />;
    case "library-of-alexandria":
      return <LibraryOfAlexandriaPattern opacity={opacity} />;
    case "coffee-houses":
      return <CoffeeHousesPattern opacity={opacity} />;
    default:
      return null;
  }
}
