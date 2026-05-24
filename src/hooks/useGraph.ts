import { useState, useCallback, useMemo } from "react";
import type { CatenoScenario } from "../types";

// ─── Storage keys ─────────────────────────────────────────────────────────────

const VISITED_KEY  = (id: string) => `cateno_visited_${id}`;
const VISIBLE_KEY  = (id: string) => `cateno_visible_${id}`;
const TIMESTAMP_KEY = (id: string) => `cateno_last_visited_${id}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadSet(key: string): Set<string> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return null;
  }
}

function saveSet(key: string, set: Set<string>): void {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    // Silently swallow — localStorage may be unavailable (private browsing quota, etc.)
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGraph(scenario: CatenoScenario) {
  const nodeMap = useMemo(() => new Map(scenario.nodes.map((n) => [n.id, n])), [scenario]);

  const seedIds = useMemo(
    () => new Set(scenario.nodes.filter((n) => n.isAnchor || n.isSeed).map((n) => n.id)),
    [scenario]
  );

  // Restore graph visibility from localStorage; fall back to seeds on first visit.
  const [visibleNodeIds, setVisibleNodeIds] = useState<Set<string>>(() => {
    return loadSet(VISIBLE_KEY(scenario.id)) ?? new Set(seedIds);
  });

  // Restore visited set from localStorage; empty on first visit.
  const [visitedNodeIds, setVisitedNodeIds] = useState<Set<string>>(() => {
    return loadSet(VISITED_KEY(scenario.id)) ?? new Set<string>();
  });

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

      // Reveal the clicked node + all its direct neighbours, persist immediately.
      // Side effects inside setState updaters are safe here — localStorage writes
      // are idempotent and this avoids needing a separate useEffect.
      setVisibleNodeIds((prev) => {
        const next = new Set(prev);
        next.add(nodeId);
        [...node.causeIds, ...node.effectIds].forEach((id) => next.add(id));
        saveSet(VISIBLE_KEY(scenario.id), next);
        return next;
      });

      setVisitedNodeIds((prev) => {
        if (prev.has(nodeId)) return prev;
        const next = new Set(prev);
        next.add(nodeId);
        saveSet(VISITED_KEY(scenario.id), next);
        // Record timestamp so the landing page can sort by "most recently visited"
        try { localStorage.setItem(TIMESTAMP_KEY(scenario.id), Date.now().toString()); } catch { /* quota */ }
        return next;
      });

      setFocusedNodeId(nodeId);
    },
    [nodeMap, scenario.id]
  );

  const clearFocus = useCallback(() => {
    setFocusedNodeId(null);
  }, []);

  // Reveal every node in the scenario at once and persist.
  const revealAll = useCallback(() => {
    const next = new Set(scenario.nodes.map((n) => n.id));
    saveSet(VISIBLE_KEY(scenario.id), next);
    setVisibleNodeIds(next);
  }, [scenario]);

  // Reset to seeds and wipe localStorage — the user's clean-slate escape hatch.
  const reset = useCallback(() => {
    localStorage.removeItem(VISITED_KEY(scenario.id));
    localStorage.removeItem(VISIBLE_KEY(scenario.id));
    localStorage.removeItem(TIMESTAMP_KEY(scenario.id));
    setVisibleNodeIds(new Set(seedIds));
    setFocusedNodeId(null);
    setVisitedNodeIds(new Set());
  }, [seedIds, scenario.id]);

  return { visibleNodeIds, visitedNodeIds, focusedNodeId, connectedIds, focusNode, clearFocus, revealAll, reset };
}
