// Full-screen graph view for a single scenario: header, graph canvas, detail panel, timeline, and legend.
import { useMemo, useEffect, useRef, useState } from "react";
import { useGraph } from "../hooks/useGraph";
import { CatenoGraph } from "./CatenoGraph";
import { DetailPanel } from "./DetailPanel";
import { TimelineBar } from "./TimelineBar";
import { Legend } from "./Legend";
import { OnboardingHint } from "./OnboardingHint";
import { getScenarioGradient } from "../theme";
import { SurpriseButton } from "./SurpriseButton";
import { SearchButton } from "./SearchButton";
import type { CatenoScenario, CatenoNode } from "../types";

interface GraphViewProps {
  scenario: CatenoScenario;
  initialNodeId: string | null;   // from URL /:scenarioId/:nodeId
  onBack: () => void;
  onNodeFocus: (nodeId: string) => void;   // updates URL on click
  onFocusClear: () => void;                // removes nodeId from URL
}

// Keyed by scenario.id in App.tsx so all state resets when the scenario changes.
export function GraphView({ scenario, initialNodeId, onBack, onNodeFocus, onFocusClear }: GraphViewProps) {
  const { visibleNodeIds, visitedNodeIds, focusedNodeId, connectedIds, focusNode, clearFocus, revealAll, reset } =
    useGraph(scenario);

  // Hint overlay — auto-shows once on first visit, always triggerable via ? button.
  const HINT_KEY = "cateno_hint_seen";
  const [hintOpen, setHintOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(HINT_KEY)) return;
    const id = setTimeout(() => setHintOpen(true), 1500);
    return () => clearTimeout(id);
  }, []);
  function closeHint() {
    setHintOpen(false);
    localStorage.setItem(HINT_KEY, "1");
  }

  // When the user clicks a node we update both graph state and the URL ourselves,
  // so we don't want the effect below to re-fire. This ref lets us skip it.
  const isLocalNav = useRef(false);

  // React to URL changes driven by the browser (back/forward).
  // Skipped when the change originated from a click inside this component.
  useEffect(() => {
    if (isLocalNav.current) {
      isLocalNav.current = false;
      return;
    }
    if (initialNodeId) {
      focusNode(initialNodeId);
    } else {
      clearFocus();
    }
  // focusNode/clearFocus are stable callbacks — only re-run when the URL nodeId changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNodeId]);

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

  // Click handler: mark as local so the effect skips it, then update state + push URL.
  function handleNodeClick(nodeId: string) {
    isLocalNav.current = true;
    focusNode(nodeId);
    onNodeFocus(nodeId);
  }

  // Clear handler: mark as local, update state + replace URL (clearing isn't a back-able step).
  function handleClear() {
    isLocalNav.current = true;
    clearFocus();
    onFocusClear();
  }

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

        {/* Right side — surprise + search */}
        <div className="ml-auto flex items-center gap-2 pr-1">
          <SurpriseButton />
          <SearchButton />
        </div>
      </header>

      {/* Graph + panel — overflow:hidden prevents the sliding panel from causing page-level scrollbars */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <CatenoGraph
          scenario={scenario}
          visibleNodeIds={visibleNodeIds}
          visitedNodeIds={visitedNodeIds}
          focusedNodeId={focusedNodeId}
          connectedIds={connectedIds}
          onNodeClick={handleNodeClick}
          onPaneClick={handleClear}
        />

        <OnboardingHint open={hintOpen} onClose={closeHint} />

        {/* ? button — bottom-left, always visible */}
        <button
          onClick={() => setHintOpen(true)}
          aria-label="Show hints"
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            zIndex: 101,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#1a1a1a",
            border: "1px solid #2e2e2e",
            color: "#E8E3D5",
            fontSize: 12,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.4,
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
        >
          ?
        </button>

        <DetailPanel
          node={focusedNode}
          causeNodes={causeNodes}
          effectNodes={effectNodes}
          scenarioTitle={scenario.title}
          onChipClick={handleNodeClick}
          onClose={handleClear}
        />
      </div>

      {/* Timeline */}
      <TimelineBar
        scenario={scenario}
        visibleNodeIds={visibleNodeIds}
        focusedNodeId={focusedNodeId}
        onNodeClick={handleNodeClick}
        onRevealAll={revealAll}
        onReset={() => { reset(); onFocusClear(); }}
      />

      {/* Keyword legend — fixed overlay, sits above the timeline bar */}
      <Legend isOpen={focusedNodeId !== null} />
    </div>
  );
}
