import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGraph } from './hooks/useGraph';
import { CatenoGraph } from './components/CatenoGraph';
import { DetailPanel } from './components/DetailPanel';
import { ScenarioSelector } from './components/ScenarioSelector';
import { TimelineBar } from './components/TimelineBar';
import type { CatenoScenario, CatenoNode } from './types';
import { TYPE_COLORS } from './types';
import type { NodeType } from './types';

// ─── Keyword legend ───────────────────────────────────────────────────────────

const LEGEND_ENTRIES = Object.entries(TYPE_COLORS) as [NodeType, string][];

function KeywordLegend({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      animate={{ right: isOpen ? 356 : 16 }}
      transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
      className="hidden md:block"
      style={{
        position: 'fixed',
        bottom: 64,
        background: 'rgba(10,10,10,0.88)',
        border: '1px solid #222',
        borderRadius: 8,
        padding: '9px 13px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      <p
        style={{
          color: '#E8E3D5',
          opacity: 0.28,
          fontSize: 9,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontFamily: 'DM Sans, sans-serif',
          margin: '0 0 7px 0',
        }}
      >
        Type
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {LEGEND_ENTRIES.map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: '#E8E3D5',
                opacity: 0.5,
                fontSize: 10,
                fontFamily: 'DM Sans, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                lineHeight: 1,
              }}
            >
              {type}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Graph view (inner) ───────────────────────────────────────────────────────
// Keyed by scenario.id so all state resets when switching scenarios.

function GraphView({
  scenario,
  onBack,
}: {
  scenario: CatenoScenario;
  onBack: () => void;
}) {
  const { visibleNodeIds, focusedNodeId, connectedIds, focusNode, clearFocus } =
    useGraph(scenario);

  const nodeMap = useMemo(
    () => new Map<string, CatenoNode>(scenario.nodes.map((n) => [n.id, n])),
    [scenario],
  );

  const focusedNode = focusedNodeId ? (nodeMap.get(focusedNodeId) ?? null) : null;

  const causeNodes = useMemo(
    () =>
      (focusedNode?.causeIds
        .map((id) => nodeMap.get(id))
        .filter(Boolean) as CatenoNode[]) ?? [],
    [focusedNode, nodeMap],
  );

  const effectNodes = useMemo(
    () =>
      (focusedNode?.effectIds
        .map((id) => nodeMap.get(id))
        .filter(Boolean) as CatenoNode[]) ?? [],
    [focusedNode, nodeMap],
  );

  return (
    <div className="w-full h-screen bg-[#0D0D0D] flex flex-col overflow-hidden">
      {/* Header */}
      <header
        className="shrink-0 flex items-center gap-4 px-6 py-3"
        style={{ borderBottom: '1px solid #181818' }}
      >
        <button
          onClick={onBack}
          className="text-[#E8E3D5]/30 hover:text-[#E8E3D5]/70 transition-colors duration-150 text-[12px] font-sans uppercase tracking-[0.15em] cursor-pointer flex items-center gap-1.5"
        >
          <span>←</span>
          <span>Scenarios</span>
        </button>

        <div
          className="w-px h-4 self-center"
          style={{ background: '#2a2a2a' }}
        />

        <div>
          <h1 className="text-[#E8E3D5] text-[17px] font-serif leading-none">
            {scenario.title}
          </h1>
          <p className="text-[#E8E3D5]/30 text-[11px] font-sans mt-0.5">
            {scenario.period}
          </p>
        </div>
      </header>

      {/* Graph + panel — overflow:hidden prevents the sliding panel from causing page-level scrollbars */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <CatenoGraph
          scenario={scenario}
          visibleNodeIds={visibleNodeIds}
          focusedNodeId={focusedNodeId}
          connectedIds={connectedIds}
          onNodeClick={focusNode}
          onPaneClick={clearFocus}
        />

        <DetailPanel
          node={focusedNode}
          causeNodes={causeNodes}
          effectNodes={effectNodes}
          onNodeClick={focusNode}
          onChipClick={focusNode}
          onClose={clearFocus}
        />
      </div>

      {/* Timeline */}
      <TimelineBar
        scenario={scenario}
        visibleNodeIds={visibleNodeIds}
        focusedNodeId={focusedNodeId}
        onNodeClick={focusNode}
      />

      {/* Keyword legend — fixed overlay, sits above the timeline bar */}
      <KeywordLegend isOpen={focusedNodeId !== null} />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [scenario, setScenario] = useState<CatenoScenario | null>(null);

  return (
    <AnimatePresence mode="wait">
      {scenario === null ? (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ScenarioSelector onSelect={setScenario} />
        </motion.div>
      ) : (
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-screen overflow-hidden"
        >
          <GraphView scenario={scenario} onBack={() => setScenario(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
