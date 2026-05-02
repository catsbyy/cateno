import { motion, AnimatePresence } from "framer-motion";
import type { CatenoNode } from "../types";
import { TYPE_COLORS } from "../types";

// ─── Chip ────────────────────────────────────────────────────────────────────

function NodeChip({ node, onClick }: { node: CatenoNode; onClick: (id: string) => void }) {
  const color = TYPE_COLORS[node.keyword];
  return (
    <button
      onClick={() => onClick(node.id)}
      className="group text-left rounded px-2.5 py-1 text-[12px] font-sans leading-snug border transition-colors duration-150 hover:bg-white/5 cursor-pointer flex items-center gap-1.5"
      style={{ borderColor: `${color}55`, color: "#E8E3D5CC" }}
    >
      <span className="flex-1">{node.title}</span>
      <span
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
        style={{ color, fontSize: 10 }}
      >
        →
      </span>
    </button>
  );
}

// ─── Panel ───────────────────────────────────────────────────────────────────

interface DetailPanelProps {
  node: CatenoNode | null;
  causeNodes: CatenoNode[];
  effectNodes: CatenoNode[];
  onNodeClick: (id: string) => void;
  onClose: () => void;
  /** Called when a cause/effect chip is clicked — same as clicking the node on the graph */
  onChipClick: (id: string) => void;
}

export function DetailPanel({ node, causeNodes, effectNodes, onClose, onChipClick }: DetailPanelProps) {
  const color = node ? TYPE_COLORS[node.keyword] : "#ffffff";

  return (
    <AnimatePresence>
      {node && (
        <motion.aside
          key={node.id}
          initial={{ x: 340, opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 340, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
          className="absolute top-0 right-0 h-full w-[340px] flex flex-col z-30"
          style={{
            background: "#141414",
            borderLeft: "1px solid #252525",
            boxShadow: "-12px 0 40px rgba(0,0,0,0.55)",
          }}
          // Stop clicks from reaching the ReactFlow pane handler
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header ── */}
          <div className="shrink-0 px-6 pt-6 pb-5" style={{ borderBottom: "1px solid #222" }}>
            {/* Close + year row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#E8E3D5]/35 text-[12px] font-sans tracking-wider">{node.year}</span>
              <button
                onClick={onClose}
                aria-label="Close panel"
                className="text-[#E8E3D5]/30 hover:text-[#E8E3D5]/70 transition-colors duration-150 cursor-pointer leading-none text-lg"
              >
                ✕
              </button>
            </div>

            {/* Title */}
            <h2 className="text-[#E8E3D5] text-[20px] font-serif leading-snug mb-3" style={{ fontWeight: 400 }}>
              {node.title}
            </h2>

            {/* Keyword badge */}
            <span
              className="inline-block text-[10px] font-sans px-2 py-[3px] rounded uppercase tracking-widest font-medium"
              style={{
                color,
                border: `1px solid ${color}`,
                opacity: 0.85,
              }}
            >
              {node.keyword}
            </span>
          </div>

          {/* ── Scrollable body ── */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {/* Summary */}
            <div className="px-6 py-5" style={{ borderBottom: "1px solid #1e1e1e" }}>
              <p className="text-[#E8E3D5]/75 text-[14px] font-sans leading-relaxed">{node.summary}</p>
            </div>

            {/* Caused by */}
            {causeNodes.length > 0 && (
              <div className="px-6 py-5" style={{ borderBottom: "1px solid #1e1e1e" }}>
                <p className="text-[#E8E3D5]/30 text-[11px] font-sans uppercase tracking-widest mb-3">Caused by</p>
                <div className="flex flex-wrap gap-2">
                  {causeNodes.map((n) => (
                    <NodeChip key={n.id} node={n} onClick={onChipClick} />
                  ))}
                </div>
              </div>
            )}

            {/* Led to */}
            {effectNodes.length > 0 && (
              <div className="px-6 py-5">
                <p className="text-[#E8E3D5]/30 text-[11px] font-sans uppercase tracking-widest mb-3">Led to</p>
                <div className="flex flex-wrap gap-2">
                  {effectNodes.map((n) => (
                    <NodeChip key={n.id} node={n} onClick={onChipClick} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
