import { useMemo } from "react";
import { motion } from "framer-motion";
import { SCENARIO_META } from "../data/scenarios";
import type { ScenarioMeta } from "../data/scenarios";
import { ScenarioPatternSvg, SCENARIO_CENTRE_COLORS } from "../theme";
import { SurpriseButton } from "./SurpriseButton";
import { SearchButton } from "./SearchButton";
import { Footer } from "./Footer";

// Read visited-node counts from localStorage for all scenarios.
// This runs once on mount; the component remounts when the user navigates back,
// so the values are always fresh.
function readVisitedCounts(): Record<string, number> {
  const result: Record<string, number> = {};
  for (const s of SCENARIO_META) {
    try {
      const raw = localStorage.getItem(`cateno_visited_${s.id}`);
      result[s.id] = raw ? (JSON.parse(raw) as string[]).length : 0;
    } catch {
      result[s.id] = 0;
    }
  }
  return result;
}

interface ScenarioSelectorProps {
  onSelect: (scenario: ScenarioMeta) => void;
}

// Split an array into consecutive chunks of `size`.
// The final chunk may be smaller — it will be centred by the flex row.
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const CARD_BASIS = "calc((100% - 48px) / 4)"; // width of one card in a full 4-column row

export function ScenarioSelector({ onSelect }: ScenarioSelectorProps) {
  const rows = chunkArray(SCENARIO_META, 4);
  const visitedCounts = useMemo(() => readVisitedCounts(), []);

  return (
    <div className="w-full min-h-screen bg-[#0D0D0D] flex flex-col items-center px-4 py-12 md:py-16 pb-0">
      {/* Wordmark */}
      <motion.div
        className="text-center shrink-0"
        style={{ marginBottom: 48 }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-[#E8E3D5] text-5xl md:text-6xl font-serif tracking-tight mb-3">Cateno</h1>
        <p className="text-[#E8E3D5]/45 text-[11px] font-sans uppercase tracking-[0.25em]">
          A cause-and-effect history explorer
        </p>
      </motion.div>

      {/* Card grid — max 1200px, centered */}
      <div className="w-full flex flex-col gap-4" style={{ maxWidth: 1200 }}>
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-col gap-4 md:flex-row md:justify-center md:items-stretch">
            {row.map((scenario, colIdx) => {
              const globalIdx = rowIdx * 4 + colIdx;
              const centreColor = SCENARIO_CENTRE_COLORS[scenario.id] ?? "#111111";

              const visitedCount = visitedCounts[scenario.id] ?? 0;
              const totalNodes = scenario.nodeCount;
              const isFullyExplored = visitedCount >= totalNodes;
              const progressPct = totalNodes > 0 ? (visitedCount / totalNodes) * 100 : 0;

              return (
                <motion.button
                  key={scenario.id}
                  onClick={() => onSelect(scenario)}
                  className="group w-full text-left rounded-lg border border-[#222222] hover:border-[#383838] p-5 md:p-6 cursor-pointer transition-colors duration-[120ms] ease-out flex flex-col relative overflow-hidden"
                  style={{
                    flexBasis: CARD_BASIS,
                    flexGrow: 0,
                    flexShrink: 0,
                    backgroundColor: centreColor,
                    backgroundImage: `radial-gradient(ellipse at center, ${centreColor} 0%, #111111 100%)`,
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 + globalIdx * 0.08, ease: "easeOut" }}
                >
                  {/* Per-scenario background pattern */}
                  <ScenarioPatternSvg scenarioId={scenario.id} opacity={0.06} />

                  {/* Card content lifted above pattern */}
                  <div className="flex flex-col flex-1 relative" style={{ zIndex: 1 }}>
                    <p className="text-[#E8E3D5]/55 text-[10px] font-sans uppercase tracking-[0.2em] mb-3">
                      {scenario.period}
                    </p>
                    <h2 className="text-[#E8E3D5] text-[22px] font-serif leading-snug mb-3">{scenario.title}</h2>
                    <p className="text-[#E8E3D5]/50 text-[13px] font-sans leading-relaxed mb-5">
                      {scenario.description}
                    </p>
                    <div className="pt-4 mb-auto" style={{ borderTop: "1px solid #1e1e1e" }}>
                      <p className="text-[#E8E3D5]/45 text-[10px] font-sans uppercase tracking-[0.15em] mb-1">
                        Anchor event
                      </p>
                      <p className="text-[#E8E3D5]/75 text-[12px] font-sans">{scenario.anchorTitle}</p>
                    </div>
                    <div className="mt-4 min-h-[44px] md:min-h-0 flex items-center">
                      <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#E8E3D5]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
                        Begin
                      </span>
                    </div>
                  </div>

                  {/* Progress — only shown when at least one node has been visited */}
                  {visitedCount > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                      }}
                    >
                      {/* Label */}
                      <p
                        style={{
                          margin: 0,
                          padding: "6px 20px 5px",
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: 10,
                          color: "#E8E3D5",
                          opacity: 0.3,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {isFullyExplored ? "Fully explored" : `${visitedCount} / ${totalNodes} events explored`}
                      </p>
                      {/* Bar */}
                      <div style={{ height: 4, background: "#1e1e1e" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${progressPct}%`,
                            background: centreColor,
                            filter: isFullyExplored ? "brightness(1.6) saturate(1.2)" : "brightness(1.2)",
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      <Footer />

      {/* Surprise Me + Search — fixed top-right */}
      <div style={{ position: "fixed", top: 12, right: 12, zIndex: 10, display: "flex", alignItems: "center", gap: 4 }}>
        <SurpriseButton />
        <SearchButton />
      </div>
    </div>
  );
}
