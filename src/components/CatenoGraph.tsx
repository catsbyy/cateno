import { useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
  type Node,
  type Edge,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from '@dagrejs/dagre';
import type { CatenoScenario } from '../types';
import { TYPE_COLORS } from '../types';
import { CatenoNodeRenderer } from './CatenoNode';
import type { CatenoNodeData } from './CatenoNode';

const NODE_W = 160;
const NODE_H = 60;
const nodeTypes = { cateno: CatenoNodeRenderer };

// ─── Dynamic layout: re-run dagre on the current visible set only ────────────
// Positions are tight and readable at every expansion step.
// Existing nodes will shift when new ones are added — acceptable for Phase 2.

function buildVisibleLayout(
  scenario: CatenoScenario,
  visibleNodeIds: Set<string>,
): Map<string, { x: number; y: number }> {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'LR', ranksep: 110, nodesep: 44, marginx: 80, marginy: 80 });

  for (const node of scenario.nodes) {
    if (!visibleNodeIds.has(node.id)) continue;
    g.setNode(node.id, { width: NODE_W, height: NODE_H });
  }

  const seen = new Set<string>();
  for (const node of scenario.nodes) {
    if (!visibleNodeIds.has(node.id)) continue;
    for (const effectId of node.effectIds) {
      if (!visibleNodeIds.has(effectId)) continue;
      const key = `${node.id}→${effectId}`;
      if (!seen.has(key)) {
        seen.add(key);
        g.setEdge(node.id, effectId);
      }
    }
  }

  dagre.layout(g);

  const positions = new Map<string, { x: number; y: number }>();
  for (const node of scenario.nodes) {
    if (!visibleNodeIds.has(node.id)) continue;
    const pos = g.node(node.id);
    positions.set(node.id, { x: pos.x - NODE_W / 2, y: pos.y - NODE_H / 2 });
  }
  return positions;
}

// ─── Pan controller (must live inside <ReactFlow> provider) ──────────────────

interface PanControllerProps {
  focusedNodeId: string | null;
  visibleNodeIds: Set<string>;
}

function PanController({ focusedNodeId, visibleNodeIds }: PanControllerProps) {
  const { setCenter, getNode, getZoom, fitView } = useReactFlow();

  // Re-fit whenever visible set changes OR focus is cleared — but not while focused
  useEffect(() => {
    if (focusedNodeId !== null) return;
    const id = setTimeout(() => fitView({ padding: 0.22, duration: 400 }), 60);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedNodeId, visibleNodeIds, fitView]);

  // Pan to focused node when focus changes
  useEffect(() => {
    if (!focusedNodeId) return;
    const id = setTimeout(() => {
      const node = getNode(focusedNodeId);
      if (!node) return;
      const cx = (node.position.x ?? 0) + NODE_W / 2;
      const cy = (node.position.y ?? 0) + NODE_H / 2;
      const zoom = Math.max(getZoom(), 0.72);
      setCenter(cx, cy, { zoom, duration: 550 });
    }, 80);
    return () => clearTimeout(id);
  }, [focusedNodeId, setCenter, getNode, getZoom]);

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
  const positions = useMemo(
    () => buildVisibleLayout(scenario, visibleNodeIds),
    [scenario, visibleNodeIds],
  );

  const nodeMap = useMemo(
    () => new Map(scenario.nodes.map((n) => [n.id, n])),
    [scenario],
  );

  const { nodes, edges } = useMemo(() => {
    const hasFocus = focusedNodeId !== null;

    const nodes: Node[] = [];
    for (const id of visibleNodeIds) {
      const n = nodeMap.get(id);
      const pos = positions.get(id);
      if (!n || !pos) continue;

      const isFocused = id === focusedNodeId;
      const isDimmed = hasFocus && !connectedIds.has(id);

      nodes.push({
        id,
        type: 'cateno',
        position: pos,
        data: {
          title: n.title,
          year: n.year,
          keyword: n.keyword,
          isAnchor: n.isAnchor,
          isFocused,
          isDimmed,
        } satisfies CatenoNodeData,
        zIndex: isFocused ? 20 : 1,
        // Tell React Flow not to re-measure; our outer shell is always NODE_W × NODE_H
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

        const isActive =
          hasFocus && (n.id === focusedNodeId || effectId === focusedNodeId);
        const isDimmedEdge = hasFocus && !isActive;
        const typeColor = TYPE_COLORS[n.keyword];

        edges.push({
          id: key,
          source: n.id,
          target: effectId,
          type: 'default',
          style: {
            stroke: isActive ? typeColor : '#2A2A2A',
            strokeWidth: isActive ? 2.5 : 1.5,
            opacity: isDimmedEdge ? 0.15 : 1,
            filter: isActive ? `drop-shadow(0 0 4px ${typeColor}88)` : 'none',
            transition: 'stroke 0.25s, opacity 0.25s, filter 0.25s',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isActive ? typeColor : '#2A2A2A',
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
        fitView
        fitViewOptions={{ padding: 0.22 }}
        minZoom={0.08}
        maxZoom={2}
        colorMode="dark"
        // Keep edges below nodes
        elevateEdgesOnSelect={false}
      >
        <PanController focusedNodeId={focusedNodeId} visibleNodeIds={visibleNodeIds} />
        <Background color="#181818" gap={28} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
