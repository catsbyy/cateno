import { useState, useCallback, useMemo } from "react";
import type { CatenoScenario } from "../types";

export function useGraph(scenario: CatenoScenario) {
  const nodeMap = useMemo(() => new Map(scenario.nodes.map((n) => [n.id, n])), [scenario]);

  const seedIds = useMemo(
    () => new Set(scenario.nodes.filter((n) => n.isAnchor || n.isSeed).map((n) => n.id)),
    [scenario]
  );

  const [visibleNodeIds, setVisibleNodeIds] = useState<Set<string>>(seedIds);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  // Starts empty — only nodes the user has explicitly clicked are "visited".
  const [visitedNodeIds, setVisitedNodeIds] = useState<Set<string>>(new Set());

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

      // Reveal the node itself + all direct causes + effects, keep everything already visible.
      // Adding nodeId here is what allows URL-linked non-seed nodes to appear on load.
      setVisibleNodeIds((prev) => {
        const next = new Set(prev);
        next.add(nodeId);
        [...node.causeIds, ...node.effectIds].forEach((id) => next.add(id));
        return next;
      });

      setVisitedNodeIds((prev) => {
        if (prev.has(nodeId)) return prev;
        const next = new Set(prev);
        next.add(nodeId);
        return next;
      });

      setFocusedNodeId(nodeId);
    },
    [nodeMap]
  );

  const clearFocus = useCallback(() => {
    setFocusedNodeId(null);
  }, []);

  // Reveal every node in the scenario at once.
  const revealAll = useCallback(() => {
    setVisibleNodeIds(new Set(scenario.nodes.map((n) => n.id)));
  }, [scenario]);

  // Reset to the initial seed state — as if the scenario was just opened.
  const reset = useCallback(() => {
    setVisibleNodeIds(new Set(seedIds));
    setFocusedNodeId(null);
    setVisitedNodeIds(new Set());
  }, [seedIds]);

  return { visibleNodeIds, visitedNodeIds, focusedNodeId, connectedIds, focusNode, clearFocus, revealAll, reset };
}
