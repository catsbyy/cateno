import { useState, useCallback, useMemo } from 'react';
import type { CatenoScenario } from '../types';

export function useGraph(scenario: CatenoScenario) {
  const nodeMap = useMemo(
    () => new Map(scenario.nodes.map((n) => [n.id, n])),
    [scenario],
  );

  const seedIds = useMemo(
    () => new Set(scenario.nodes.filter((n) => n.isAnchor || n.isSeed).map((n) => n.id)),
    [scenario],
  );

  const [visibleNodeIds, setVisibleNodeIds] = useState<Set<string>>(seedIds);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  // IDs of the focused node + its direct causes + direct effects
  const connectedIds = useMemo((): Set<string> => {
    if (!focusedNodeId) return new Set();
    const node = nodeMap.get(focusedNodeId);
    if (!node) return new Set();
    return new Set([focusedNodeId, ...node.causeIds, ...node.effectIds]);
  }, [focusedNodeId, nodeMap]);

  const focusNode = useCallback(
    (nodeId: string) => {
      const node = nodeMap.get(nodeId);
      if (!node) return;

      // Reveal all direct causes + effects, keep everything already visible
      setVisibleNodeIds((prev) => {
        const next = new Set(prev);
        [...node.causeIds, ...node.effectIds].forEach((id) => next.add(id));
        return next;
      });

      setFocusedNodeId(nodeId);
    },
    [nodeMap],
  );

  const clearFocus = useCallback(() => {
    setFocusedNodeId(null);
  }, []);

  return { visibleNodeIds, focusedNodeId, connectedIds, focusNode, clearFocus };
}
