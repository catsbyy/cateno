import { motion } from "framer-motion";
import type { CatenoScenario } from "../types";
import { SCENARIOS } from "../data/scenarios";

interface ScenarioSelectorProps {
  onSelect: (scenario: CatenoScenario) => void;
}

export function ScenarioSelector({ onSelect }: ScenarioSelectorProps) {
  return (
    <div className="w-screen h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Wordmark */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-[#E8E3D5] text-6xl font-serif tracking-tight mb-3">Cateno</h1>
        <p className="text-[#E8E3D5]/35 text-[11px] font-sans uppercase tracking-[0.25em]">
          A cause-and-effect history explorer
        </p>
      </motion.div>

      {/* Cards */}
      <div className="flex gap-5 w-full max-w-3xl">
        {SCENARIOS.map((scenario, i) => {
          const anchor = scenario.nodes.find((n) => n.isAnchor);
          return (
            <motion.button
              key={scenario.id}
              onClick={() => onSelect(scenario)}
              className="flex-1 text-left rounded-lg border p-6 cursor-pointer transition-colors duration-200 group"
              style={{ background: "#111111", borderColor: "#222222" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.08, ease: "easeOut" }}
              whileHover={{ borderColor: "#383838", backgroundColor: "#161616" }}
            >
              {/* Period */}
              <p className="text-[#E8E3D5]/30 text-[10px] font-sans uppercase tracking-[0.2em] mb-4">
                {scenario.period}
              </p>

              {/* Title */}
              <h2 className="text-[#E8E3D5] text-[22px] font-serif leading-snug mb-3">{scenario.title}</h2>

              {/* Description */}
              <p className="text-[#E8E3D5]/50 text-[13px] font-sans leading-relaxed mb-6">{scenario.description}</p>

              {/* Anchor teaser */}
              <div className="pt-4" style={{ borderTop: "1px solid #1e1e1e" }}>
                <p className="text-[#E8E3D5]/25 text-[10px] font-sans uppercase tracking-[0.15em] mb-1">Anchor event</p>
                <p className="text-[#E8E3D5]/55 text-[12px] font-sans">{anchor?.title ?? "—"}</p>
              </div>

              {/* Explore arrow */}
              <div className="mt-4 flex items-center gap-1.5 text-[#E8E3D5]/25 group-hover:text-[#E8E3D5]/50 transition-colors duration-200">
                <span className="text-[11px] font-sans uppercase tracking-[0.15em]">Explore</span>
                <span className="text-[13px]">→</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
