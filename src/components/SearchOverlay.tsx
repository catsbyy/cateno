import { useEffect, useRef, useState, useMemo, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SCENARIO_META, loadScenarioNodes } from "../data/scenarios";
import type { ScenarioMeta } from "../data/scenarios";
import type { CatenoNode } from "../types";
import { useSearch } from "../contexts/SearchContext";

// ─── Module-level data cache ──────────────────────────────────────────────────

type ScenarioData = { scenario: ScenarioMeta; nodes: CatenoNode[] };
let cachedAllData: ScenarioData[] | null = null;
let loadingPromise: Promise<void> | null = null;

async function ensureAllData(): Promise<ScenarioData[]> {
  if (cachedAllData) return cachedAllData;
  if (!loadingPromise) {
    loadingPromise = Promise.all(
      SCENARIO_META.map(async (meta) => {
        const nodes = await loadScenarioNodes(meta.id);
        return { scenario: meta, nodes };
      })
    ).then((data) => {
      cachedAllData = data;
    });
  }
  await loadingPromise;
  return cachedAllData!;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface SearchResult {
  scenario: ScenarioMeta;
  node: CatenoNode;
  matchType: "title" | "summary";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function highlightMatch(text: string, query: string): ReactNode {
  if (!query) return text;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark
        style={{
          background: "#E8E3D530",
          color: "inherit",
          borderRadius: 2,
          padding: "0 1px",
        }}
      >
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function getRandomSuggestions(allData: ScenarioData[], count = 5): SearchResult[] {
  const shuffled = [...allData].sort(() => Math.random() - 0.5);
  const results: SearchResult[] = [];
  for (const { scenario, nodes } of shuffled) {
    if (!nodes.length) continue;
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    results.push({ scenario, node, matchType: "title" });
    if (results.length >= count) break;
  }
  return results;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SearchOverlay() {
  const { isOpen, open, close } = useSearch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [allData, setAllData] = useState<ScenarioData[] | null>(null);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Global Cmd+K / Ctrl+K — always active
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) close();
        else open();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, open, close]);

  // Load all scenario data the first time the overlay opens
  useEffect(() => {
    if (!isOpen) return;
    ensureAllData().then((data) => {
      setAllData(data);
      setSuggestions(getRandomSuggestions(data));
    });
  }, [isOpen]);

  // Reset query + focus input every time overlay opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIdx(0);
      // Slight delay so AnimatePresence finishes mounting
      const id = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  // Search results (sorted: title matches first, then summary)
  const results = useMemo<SearchResult[]>(() => {
    if (!allData || query.length < 1) return [];
    const q = query.toLowerCase();
    const titleHits: SearchResult[] = [];
    const summaryHits: SearchResult[] = [];
    for (const { scenario, nodes } of allData) {
      for (const node of nodes) {
        if (node.title.toLowerCase().includes(q)) {
          titleHits.push({ scenario, node, matchType: "title" });
        } else if (node.summary.toLowerCase().includes(q)) {
          summaryHits.push({ scenario, node, matchType: "summary" });
        }
      }
    }
    return [...titleHits, ...summaryHits].slice(0, 8);
  }, [allData, query]);

  // Reset selection when results list changes
  useEffect(() => setSelectedIdx(0), [results]);

  const displayItems = query.length >= 1 ? results : suggestions;

  const handleSelect = useCallback((result: SearchResult) => {
    close();
    navigate(`/${result.scenario.id}/${result.node.id}`);
  }, [close, navigate]);

  // Arrow / Enter / Escape navigation (only while overlay is open)
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, displayItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = displayItems[selectedIdx];
        if (item) handleSelect(item);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, displayItems, selectedIdx, handleSelect]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(13, 13, 13, 0.95)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 80,
          }}
          // Click on backdrop (not on panel) → close
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Panel */}
          <div
            style={{ width: "100%", maxWidth: 600, padding: "0 16px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input + close button */}
            <div style={{ position: "relative", display: "flex", alignItems: "flex-start" }}>
              <input
                ref={inputRef}
                className="cateno-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, scenarios..."
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  // 16px minimum prevents iOS auto-zoom; scales up on wider screens
                  fontSize: "clamp(16px, 3.5vw, 20px)",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#E8E3D5",
                  padding: "0 40px 16px 0",
                  caretColor: "#E8E3D5",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={close}
                aria-label="Close search"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 2,
                  background: "none",
                  border: "none",
                  color: "#E8E3D5",
                  opacity: 0.35,
                  cursor: "pointer",
                  fontSize: 22,
                  lineHeight: 1,
                  padding: "0 4px",
                  transition: "opacity 0.12s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
              >
                ×
              </button>
            </div>

            {/* Separator */}
            <div style={{ height: 1, background: "#2e2e2e", marginBottom: 4 }} />

            {/* "Try exploring →" label */}
            {query.length === 0 && suggestions.length > 0 && (
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#E8E3D5",
                  opacity: 0.3,
                  margin: "14px 12px 4px",
                }}
              >
                Try exploring →
              </p>
            )}

            {/* Empty state */}
            {query.length >= 3 && results.length === 0 && (
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 14,
                  color: "#E8E3D5",
                  opacity: 0.35,
                  textAlign: "center",
                  marginTop: 36,
                  padding: "0 12px",
                }}
              >
                No events found for &lsquo;{query}&rsquo;
              </p>
            )}

            {/* Result / suggestion rows */}
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {displayItems.map((result, idx) => (
                <button
                  key={`${result.scenario.id}-${result.node.id}`}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: idx === selectedIdx ? "#ffffff12" : "transparent",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    padding: "10px 12px",
                    transition: "background 0.08s ease",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "#E8E3D5",
                      opacity: 0.4,
                      margin: "0 0 3px",
                    }}
                  >
                    {result.scenario.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 16,
                      color: "#E8E3D5",
                      opacity: 0.9,
                      margin: 0,
                    }}
                  >
                    {query ? highlightMatch(result.node.title, query) : result.node.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
