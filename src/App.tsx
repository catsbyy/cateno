import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGraph } from './hooks/useGraph';
import { CatenoGraph } from './components/CatenoGraph';
import { DetailPanel } from './components/DetailPanel';
import { ScenarioSelector } from './components/ScenarioSelector';
import { TimelineBar } from './components/TimelineBar';
import type { CatenoScenario, CatenoNode } from './types';

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
    <div className="w-screen h-screen bg-[#0D0D0D] flex flex-col">
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

      {/* Graph + panel */}
      <div className="flex-1 min-h-0 relative">
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
          className="w-screen h-screen"
        >
          <GraphView scenario={scenario} onBack={() => setScenario(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
