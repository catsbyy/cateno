import { motion } from "framer-motion";
import type { CatenoScenario } from "../types";
import { SCENARIOS } from "../data/scenarios";
import { ScenarioPatternSvg, SCENARIO_CENTRE_COLORS } from "../utils/scenarioBackground";

interface ScenarioSelectorProps {
  onSelect: (scenario: CatenoScenario) => void;
}

const row1 = SCENARIOS.slice(0, 3);
const row2 = SCENARIOS.slice(3);

export function ScenarioSelector({ onSelect }: ScenarioSelectorProps) {
  return (
    <div className="w-full min-h-screen bg-[#0D0D0D] flex flex-col items-center px-4 py-12 md:py-16">
      {/* Wordmark */}
      <motion.div
        className="text-center shrink-0"
        style={{ marginBottom: 48 }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-[#E8E3D5] text-5xl md:text-6xl font-serif tracking-tight mb-3">Cateno</h1>
        <p className="text-[#E8E3D5]/35 text-[11px] font-sans uppercase tracking-[0.25em]">
          A cause-and-effect history explorer
        </p>
      </motion.div>

      {/* Card grid — max 960px, centered */}
      <div className="w-full" style={{ maxWidth: 960, marginLeft: "auto", marginRight: "auto" }}>

        {/* Row 1: 3 cards */}
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          {row1.map((scenario, i) => {
            const anchor = scenario.nodes.find((n) => n.isAnchor);
            return (
              <motion.button
                key={scenario.id}
                onClick={() => onSelect(scenario)}
                className="w-full md:flex-1 text-left rounded-lg border border-[#222222] hover:border-[#383838] p-5 md:p-6 cursor-pointer transition-colors duration-[120ms] ease-out flex flex-col relative overflow-hidden"
                style={{
                  backgroundColor: SCENARIO_CENTRE_COLORS[scenario.id] ?? "#111111",
                  backgroundImage: `radial-gradient(ellipse at center, ${SCENARIO_CENTRE_COLORS[scenario.id] ?? "#111111"} 0%, #111111 100%)`,
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.08, ease: "easeOut" }}
              >
                {/* Per-scenario background pattern */}
                <ScenarioPatternSvg scenarioId={scenario.id} opacity={0.04} />
                {/* Card content lifted above pattern */}
                <div className="flex flex-col flex-1 relative" style={{ zIndex: 1 }}>
                  <p className="text-[#E8E3D5]/30 text-[10px] font-sans uppercase tracking-[0.2em] mb-3">
                    {scenario.period}
                  </p>
                  <h2 className="text-[#E8E3D5] text-[22px] font-serif leading-snug mb-3">{scenario.title}</h2>
                  <p className="text-[#E8E3D5]/50 text-[13px] font-sans leading-relaxed mb-5">{scenario.description}</p>
                  <div className="pt-4 mb-auto" style={{ borderTop: "1px solid #1e1e1e" }}>
                    <p className="text-[#E8E3D5]/25 text-[10px] font-sans uppercase tracking-[0.15em] mb-1">Anchor event</p>
                    <p className="text-[#E8E3D5]/55 text-[12px] font-sans">{anchor?.title ?? "—"}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[#E8E3D5]/25 min-h-[44px] md:min-h-0 transition-colors duration-[120ms]">
                    <span className="text-[11px] font-sans uppercase tracking-[0.15em]">Explore</span>
                    <span className="text-[13px]">→</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Row 2: 2 centered cards (same width as row-1 cards) */}
        <div className="flex flex-col gap-4 mt-4 md:flex-row md:justify-center md:items-stretch">
          {row2.map((scenario, i) => {
            const anchor = scenario.nodes.find((n) => n.isAnchor);
            return (
              <motion.button
                key={scenario.id}
                onClick={() => onSelect(scenario)}
                className="w-full text-left rounded-lg border border-[#222222] hover:border-[#383838] p-5 md:p-6 cursor-pointer transition-colors duration-[120ms] ease-out flex flex-col relative overflow-hidden"
                style={{
                  flexBasis: "calc((100% - 32px) / 3)",
                  flexGrow: 0,
                  flexShrink: 0,
                  backgroundColor: SCENARIO_CENTRE_COLORS[scenario.id] ?? "#111111",
                  backgroundImage: `radial-gradient(ellipse at center, ${SCENARIO_CENTRE_COLORS[scenario.id] ?? "#111111"} 0%, #111111 100%)`,
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 + (3 + i) * 0.08, ease: "easeOut" }}
              >
                {/* Per-scenario background pattern */}
                <ScenarioPatternSvg scenarioId={scenario.id} opacity={0.04} />
                {/* Card content lifted above pattern */}
                <div className="flex flex-col flex-1 relative" style={{ zIndex: 1 }}>
                  <p className="text-[#E8E3D5]/30 text-[10px] font-sans uppercase tracking-[0.2em] mb-3">
                    {scenario.period}
                  </p>
                  <h2 className="text-[#E8E3D5] text-[22px] font-serif leading-snug mb-3">{scenario.title}</h2>
                  <p className="text-[#E8E3D5]/50 text-[13px] font-sans leading-relaxed mb-5">{scenario.description}</p>
                  <div className="pt-4 mb-auto" style={{ borderTop: "1px solid #1e1e1e" }}>
                    <p className="text-[#E8E3D5]/25 text-[10px] font-sans uppercase tracking-[0.15em] mb-1">Anchor event</p>
                    <p className="text-[#E8E3D5]/55 text-[12px] font-sans">{anchor?.title ?? "—"}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[#E8E3D5]/25 min-h-[44px] md:min-h-0 transition-colors duration-[120ms]">
                    <span className="text-[11px] font-sans uppercase tracking-[0.15em]">Explore</span>
                    <span className="text-[13px]">→</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
