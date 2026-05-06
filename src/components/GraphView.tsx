// Full-screen graph view for a single scenario: header, graph canvas, detail panel, timeline, and legend.
import { useMemo } from "react";
import { useGraph } from "../hooks/useGraph";
import { CatenoGraph } from "./CatenoGraph";
import { DetailPanel } from "./DetailPanel";
import { TimelineBar } from "./TimelineBar";
import { Legend } from "./Legend";
import { getScenarioGradient } from "../theme";
import type { CatenoScenario, CatenoNode } from "../types";

interface GraphViewProps {
  scenario: CatenoScenario;
  onBack: () => void;
}

// Keyed by scenario.id in App.tsx so all state resets when the scenario changes.
export function GraphView({ scenario, onBack }: GraphViewProps) {
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
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{ background: getScenarioGradient(scenario.id) }}
    >
      {/* Header */}
      <header
        className="shrink-0 flex items-center gap-4 px-6 py-3"
        style={{ borderBottom: "1px solid #181818" }}
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
          style={{ background: "#2a2a2a" }}
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
      <Legend isOpen={focusedNodeId !== null} />
    </div>
  );
}
