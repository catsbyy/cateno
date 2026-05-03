import { useMemo, useEffect, useCallback } from "react";
import { ReactFlow, Controls, useReactFlow, type Node, type Edge, MarkerType, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { CatenoScenario } from "../types";
import { TYPE_COLORS } from "../types";
import { CatenoNodeRenderer } from "./CatenoNode";
import type { CatenoNodeData } from "./CatenoNode";

const NODE_W = 200;
const NODE_H = 72;
const Y_STEP = 120; // vertical gap between same-year node centres

const nodeTypes = { cateno: CatenoNodeRenderer };

// ─── Y slot pattern: slot 0 → 0, slot 1 → +Y_STEP, slot 2 → -Y_STEP, … ──────
// Slots alternate above and below the centre line so the stack stays balanced.
function yForSlot(slot: number): number {
  if (slot === 0) return 0;
  const level = Math.ceil(slot / 2);
  return slot % 2 === 1 ? level * Y_STEP : -(level * Y_STEP);
}

// ─── Pure time-based layout (no dagre) ───────────────────────────────────────
// X  = linear mapping of year onto CANVAS_WIDTH, plus a small per-node jitter
//      so nodes that share the same year don't sit on the exact same vertical
//      line (they get a diagonal staircase spread instead).
// Y  = greedy lane assignment with MIN_H_SPACING minimum between same-lane nodes.
//
// The anchor is always processed first so it always lands on slot 0 (Y = 0).

const COLUMN_WIDTH = 280; // world-px between causal depth columns

function buildLayout(scenario: CatenoScenario): {
  positions: Map<string, { x: number; y: number }>;
  depth: Map<string, number>;
} {
  const nodeMap = new Map(scenario.nodes.map((n) => [n.id, n]));

  // ── Step 1: BFS from anchor to assign causal depth ────────────────────────
  // Forward edges (effectIds) → depth + 1
  // Backward edges (causeIds) → depth − 1
  // First-found wins (BFS guarantees shortest hop count).
  const depth = new Map<string, number>();
  depth.set(scenario.anchorId, 0);
  const queue: string[] = [scenario.anchorId];

  while (queue.length > 0) {
    const id = queue.shift()!;
    const node = nodeMap.get(id);
    if (!node) continue;
    const d = depth.get(id)!;

    for (const effectId of node.effectIds) {
      if (!depth.has(effectId)) {
        depth.set(effectId, d + 1);
        queue.push(effectId);
      }
    }
    for (const causeId of node.causeIds) {
      if (!depth.has(causeId)) {
        depth.set(causeId, d - 1);
        queue.push(causeId);
      }
    }
  }

  // Fallback: any node unreachable from anchor lands in column 0.
  for (const node of scenario.nodes) {
    if (!depth.has(node.id)) depth.set(node.id, 0);
  }

  // ── Step 2: group by depth column, anchor gets slot 0 ────────────────────
  const columns = new Map<number, string[]>();
  for (const node of scenario.nodes) {
    const d = depth.get(node.id)!;
    if (!columns.has(d)) columns.set(d, []);
    columns.get(d)!.push(node.id);
  }

  // ── Step 3: assign positions ──────────────────────────────────────────────
  const positions = new Map<string, { x: number; y: number }>();

  for (const [d, ids] of columns) {
    // Put anchor first so it always lands in slot 0 (Y = 0).
    const sorted = [...ids].sort((a, b) => {
      if (nodeMap.get(a)?.isAnchor) return -1;
      if (nodeMap.get(b)?.isAnchor) return 1;
      return 0;
    });

    sorted.forEach((id, slot) => {
      positions.set(id, {
        x: d * COLUMN_WIDTH,
        y: yForSlot(slot) - NODE_H / 2,
      });
    });
  }

  return { positions, depth };
}

// ─── Pan controller (must live inside <ReactFlow> provider) ──────────────────

interface PanControllerProps {
  focusedNodeId: string | null;
  positions: Map<string, { x: number; y: number }>;
}

function PanController({ focusedNodeId, positions }: PanControllerProps) {
  const { setCenter, getZoom } = useReactFlow();

  // Pan so the clicked node lands at ~35% from the left edge of the viewport.
  // setCenter(cx, cy) centres that world point at 50% screen width.
  // Adding 15% of viewport-width-in-world-units shifts the node left to 35%.
  const panTo = useCallback(
    (nodeId: string, duration: number) => {
      const pos = positions.get(nodeId);
      if (!pos) return;
      const cx = pos.x + NODE_W / 2;
      const cy = pos.y + NODE_H / 2;
      const zoom = Math.max(getZoom(), 0.72);
      const viewportW = (document.querySelector(".react-flow") as HTMLElement | null)?.clientWidth ?? window.innerWidth;
      const offsetX = (0.15 * viewportW) / zoom;
      setCenter(cx + offsetX, cy, { zoom, duration });
    },
    [positions, getZoom, setCenter]
  );

  useEffect(() => {
    if (!focusedNodeId) return;
    const id = setTimeout(() => panTo(focusedNodeId, 600), 60);
    return () => clearTimeout(id);
  }, [focusedNodeId, panTo]);

  return null;
}

// ─── Main graph component ────────────────────────────────────────────────────

interface CatenoGraphProps {
  scenario: CatenoScenario;
  visibleNodeIds: Set<string>;
  focusedNodeId: string | null;
  connectedIds: Set<string>;
  onNodeClick: (nodeId: string) => void;
  onPaneClick: () => void;
}

export function CatenoGraph({
  scenario,
  visibleNodeIds,
  focusedNodeId,
  connectedIds,
  onNodeClick,
  onPaneClick,
}: CatenoGraphProps) {
  // Layout is computed once per scenario — never recalculated as nodes are revealed.
  const { positions } = useMemo(() => buildLayout(scenario), [scenario]);

  const nodeMap = useMemo(() => new Map(scenario.nodes.map((n) => [n.id, n])), [scenario]);

  // Open with the anchor at 35% from the left, vertically centred in the canvas
  // (canvas = full window minus header ~60px and timeline bar ~44px).
  const defaultViewport = useMemo(() => {
    const anchor = positions.get(scenario.anchorId);
    if (!anchor) return { x: 0, y: 0, zoom: 0.8 };
    const zoom = 0.8;
    const anchorCX = anchor.x + NODE_W / 2;
    const anchorCY = anchor.y + NODE_H / 2;
    const HEADER_H = 60;
    const TIMELINE_H = 44;
    const canvasW = window.innerWidth;
    const canvasH = window.innerHeight - HEADER_H - TIMELINE_H;
    return {
      x: 0.35 * canvasW - anchorCX * zoom,
      y: 0.5 * canvasH - anchorCY * zoom,
      zoom,
    };
  }, [positions, scenario.anchorId]);

  const { nodes, edges } = useMemo(() => {
    const hasFocus = focusedNodeId !== null;

    const nodes: Node[] = [];
    for (const id of visibleNodeIds) {
      const n = nodeMap.get(id);
      const pos = positions.get(id);
      if (!n || !pos) continue;

      const isFocused = id === focusedNodeId;
      const isDimmed = hasFocus && !connectedIds.has(id);

      const hiddenCount = [...n.causeIds, ...n.effectIds].filter((cid) => !visibleNodeIds.has(cid)).length;

      nodes.push({
        id,
        type: "cateno",
        position: pos,
        data: {
          title: n.title,
          year: n.year,
          keyword: n.keyword,
          isAnchor: n.isAnchor,
          isSeed: n.isSeed,
          isFocused,
          isDimmed,
          hiddenCount,
        } satisfies CatenoNodeData,
        zIndex: isFocused ? 50 : 1,
        width: NODE_W,
        height: NODE_H,
      });
    }

    const edges: Edge[] = [];
    const seen = new Set<string>();
    for (const n of scenario.nodes) {
      if (!visibleNodeIds.has(n.id)) continue;
      for (const effectId of n.effectIds) {
        if (!visibleNodeIds.has(effectId)) continue;
        const key = `${n.id}→${effectId}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const isActive = hasFocus && (n.id === focusedNodeId || effectId === focusedNodeId);
        const isDimmedEdge = hasFocus && !isActive;
        const typeColor = TYPE_COLORS[n.keyword];

        edges.push({
          id: key,
          source: n.id,
          target: effectId,
          type: "smoothstep",
          style: {
            stroke: isActive ? typeColor : "#484848",
            strokeWidth: isActive ? 2.5 : 2,
            opacity: isDimmedEdge ? 0.2 : 1,
            filter: isActive ? `drop-shadow(0 0 4px ${typeColor}88)` : "none",
            transition: "stroke 0.25s, opacity 0.25s, filter 0.25s",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isActive ? typeColor : "#484848",
            width: isActive ? 14 : 11,
            height: isActive ? 14 : 11,
          },
        });
      }
    }

    return { nodes, edges };
  }, [visibleNodeIds, focusedNodeId, connectedIds, nodeMap, positions, scenario]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onNodeClick(node.id)}
        onPaneClick={onPaneClick}
        defaultViewport={defaultViewport}
        minZoom={0.05}
        maxZoom={2}
        colorMode="dark"
        elevateEdgesOnSelect={false}
      >
        <PanController focusedNodeId={focusedNodeId} positions={positions} />
        <Background color="#181818" gap={28} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
