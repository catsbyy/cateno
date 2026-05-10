import { useMemo } from "react";
import type { CatenoScenario } from "../types";
import { TYPE_COLORS } from "../types";
import { useIsMobile } from "../hooks/useIsMobile";

function parsePeriod(period: string): [number, number] {
  const parts = period.split(/–|-|—/);
  const parse = (s: string): number => {
    const trimmed = s.trim();
    const num = parseInt(trimmed.match(/\d+/)?.[0] ?? "0", 10);
    const isBC = trimmed.toUpperCase().includes("BC");
    return isBC ? -num : num;
  };
  if (parts.length >= 2) return [parse(parts[0]), parse(parts[1])];
  return [0, 100];
}

function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year)} BC` : `${year}`;
}

// Clamp a percentage to [0, 100]
const clampPct = (v: number) => Math.min(Math.max(v, 0), 100);

interface TimelineBarProps {
  scenario: CatenoScenario;
  visibleNodeIds: Set<string>;
  focusedNodeId: string | null;
  onNodeClick: (id: string) => void;
  onRevealAll: () => void;
  onReset: () => void;
}

export function TimelineBar({
  scenario,
  visibleNodeIds,
  focusedNodeId,
  onNodeClick,
  onRevealAll,
  onReset,
}: TimelineBarProps) {
  const isMobile = useIsMobile();
  const [periodStart, periodEnd] = parsePeriod(scenario.period);
  const periodSpan = periodEnd - periodStart || 1;

  const visibleNodes = useMemo(
    () => scenario.nodes.filter((n) => visibleNodeIds.has(n.id)),
    [scenario, visibleNodeIds]
  );

  // Years with 2+ nodes across the FULL scenario (not just visible)
  const pivotalYears = useMemo(() => {
    const counts = new Map<number, number>();
    for (const node of scenario.nodes) {
      counts.set(node.year, (counts.get(node.year) ?? 0) + 1);
    }
    return new Set([...counts.entries()].filter(([, c]) => c >= 2).map(([y]) => y));
  }, [scenario]);

  // Regular interval ticks — scale interval to span, cap at 12 ticks.
  // Skip any tick within 10% of interval distance from start or end (those are shown by outer labels).
  const { intervalTicks, intervalTickSet } = useMemo(() => {
    const interval =
      periodSpan < 150 ? 10 : periodSpan < 500 ? 50 : periodSpan < 2000 ? 100 : periodSpan < 5000 ? 500 : 1000;

    const ticks: number[] = [];
    let y = Math.ceil(periodStart / interval) * interval;
    while (y <= periodEnd) {
      if (Math.abs(y - periodStart) > interval * 0.1 && Math.abs(y - periodEnd) > interval * 0.1) {
        ticks.push(y);
      }
      y += interval;
    }
    const cappedTicks = ticks.slice(0, 12);
    return { intervalTicks: cappedTicks, intervalTickSet: new Set(cappedTicks) };
  }, [periodStart, periodEnd, periodSpan]);

  // Pivotal years that don't fall on an interval tick (shown as tick-only, no label).
  // Deduplicate: skip any pivotal year within 3% of the total span from an interval tick
  // or from another already-accepted pivotal tick — prevents crowding on dense scenarios.
  const pivotalOnly = useMemo(() => {
    const minGap = periodSpan * 0.03;
    const accepted: number[] = [];
    for (const y of [...pivotalYears].sort((a, b) => a - b)) {
      if (intervalTickSet.has(y)) continue;
      const tooClose = [...intervalTickSet, ...accepted].some((t) => Math.abs(t - y) < minGap);
      if (!tooClose) accepted.push(y);
    }
    return accepted;
  }, [pivotalYears, intervalTickSet, periodSpan]);

  // Focused node's year — shown as a label on mobile only
  const focusedNode = focusedNodeId ? scenario.nodes.find((n) => n.id === focusedNodeId) : null;

  const pct = (year: number) => clampPct(((year - periodStart) / periodSpan) * 100);

  // ── Track geometry ─────────────────────────────────────────────────────────
  const LINE_TOP = 8;
  const DOT_CY = LINE_TOP + 1;

  // Dot size: larger on mobile for easier tapping
  const dotResting = isMobile ? 8 : 6;
  const dotFocused = isMobile ? 10 : 8;

  return (
    <div
      className="shrink-0 flex items-center px-4 md:px-6 gap-3 md:gap-4 select-none"
      style={{
        height: 44,
        borderTop: "1px solid #2e2e2e",
        background: "#0A0A0A",
      }}
    >
      {/* Start year */}
      <span className="text-[#E8E3D5]/50 text-[11px] font-sans tabular-nums whitespace-nowrap">
        {formatYear(periodStart)}
      </span>

      {/* ── Track ── */}
      <div className="flex-1 relative" style={{ height: 28 }}>
        {/* Baseline */}
        <div
          style={{
            position: "absolute",
            top: LINE_TOP,
            left: 0,
            right: 0,
            height: 2,
            background: "#333333",
            borderRadius: 1,
          }}
        />

        {/* Interval ticks + year labels — desktop only */}
        {!isMobile &&
          intervalTicks.map((year) => {
            const p = pct(year);
            const isPivotal = pivotalYears.has(year);
            return (
              <div
                key={`itick-${year}`}
                style={{
                  position: "absolute",
                  left: `${p}%`,
                  top: 4,
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    width: isPivotal ? 1.5 : 1,
                    height: isPivotal ? 13 : 8,
                    background: isPivotal ? "#606060" : "#343434",
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    lineHeight: 1,
                    color: "#E8E3D5",
                    opacity: isPivotal ? 0.65 : 0.45,
                    fontFamily: "DM Sans, sans-serif",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.02em",
                  }}
                >
                  {formatYear(year)}
                </span>
              </div>
            );
          })}

        {/* Pivotal-only ticks — desktop only */}
        {!isMobile &&
          pivotalOnly.map((year) => {
            const p = pct(year);
            return (
              <div
                key={`piv-${year}`}
                style={{
                  position: "absolute",
                  left: `${p}%`,
                  top: 4,
                  transform: "translateX(-50%)",
                  width: 1.5,
                  height: 11,
                  background: "#505050",
                  borderRadius: 1,
                  pointerEvents: "none",
                }}
              />
            );
          })}

        {/* Focused node year label — mobile only */}
        {isMobile && focusedNode && (
          <div
            key={`focused-year`}
            style={{
              position: "absolute",
              left: `${pct(focusedNode.year)}%`,
              top: 4,
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              pointerEvents: "none",
            }}
          >
            <div style={{ width: 1.5, height: 10, background: TYPE_COLORS[focusedNode.keyword], borderRadius: 1 }} />
            <span
              style={{
                fontSize: 10,
                lineHeight: 1,
                color: TYPE_COLORS[focusedNode.keyword],
                opacity: 0.85,
                fontFamily: "DM Sans, sans-serif",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              }}
            >
              {formatYear(focusedNode.year)}
            </span>
          </div>
        )}

        {/* Node event dots — all nodes rendered; undiscovered are decorative only */}
        {scenario.nodes.map((node) => {
          const p = pct(node.year);
          const isDiscovered = visibleNodeIds.has(node.id);
          const isFocused = node.id === focusedNodeId;
          const color = TYPE_COLORS[node.keyword];

          if (!isDiscovered) {
            return (
              <div
                key={node.id}
                style={{
                  position: "absolute",
                  left: `${p}%`,
                  top: DOT_CY,
                  transform: "translateX(-50%) translateY(-50%)",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#252525",
                  border: "1px solid #333333",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
            );
          }

          return (
            <button
              key={node.id}
              onClick={() => onNodeClick(node.id)}
              title={`${node.title} (${formatYear(node.year)})`}
              className="absolute cursor-pointer"
              style={{
                left: `${p}%`,
                top: DOT_CY,
                transform: "translateX(-50%) translateY(-50%)",
                width: isFocused ? dotFocused : dotResting,
                height: isFocused ? dotFocused : dotResting,
                borderRadius: "50%",
                background: isFocused ? color : "#3a3a3a",
                border: isFocused ? `2px solid ${color}` : "1px solid #4a4a4a",
                boxShadow: isFocused ? `0 0 6px ${color}88` : "none",
                transition: "all 0.15s ease",
                zIndex: isFocused ? 10 : 2,
              }}
            />
          );
        })}
      </div>

      {/* End year */}
      <span className="text-[#E8E3D5]/50 text-[11px] font-sans tabular-nums whitespace-nowrap">
        {formatYear(periodEnd)}
      </span>

      {/* Reveal all / Reset — mobile icon buttons */}
      {isMobile && (
        <div className="shrink-0 flex items-center">
          {visibleNodeIds.size < scenario.nodes.length ? (
            <button
              onClick={onRevealAll}
              aria-label="Reveal all"
              style={{
                background: "none",
                border: "none",
                padding: "2px 4px",
                color: "#E8E3D5",
                opacity: 0.35,
                fontSize: 18,
                lineHeight: 1,
                cursor: "pointer",
              }}
              onPointerDown={(e) => (e.currentTarget.style.opacity = "0.65")}
              onPointerUp={(e) => (e.currentTarget.style.opacity = "0.35")}
              onPointerLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
            >
              ⊕
            </button>
          ) : (
            <button
              onClick={onReset}
              aria-label="Reset"
              style={{
                background: "none",
                border: "none",
                padding: "2px 4px",
                color: "#E8E3D5",
                opacity: 0.35,
                fontSize: 18,
                lineHeight: 1,
                cursor: "pointer",
              }}
              onPointerDown={(e) => (e.currentTarget.style.opacity = "0.65")}
              onPointerUp={(e) => (e.currentTarget.style.opacity = "0.35")}
              onPointerLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
            >
              ↺
            </button>
          )}
        </div>
      )}

      {/* Node count + Reveal all / Reset — desktop only */}
      {!isMobile && (
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[#E8E3D5]/20 text-[10px] font-sans whitespace-nowrap">
            {visibleNodes.length} / {scenario.nodes.length} events
          </span>
          {visibleNodeIds.size < scenario.nodes.length ? (
            <button
              onClick={onRevealAll}
              className="text-[#E8E3D5]/35 hover:text-[#E8E3D5]/60 transition-colors duration-150 text-[11px] font-sans whitespace-nowrap cursor-pointer"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              Reveal all
            </button>
          ) : (
            <button
              onClick={onReset}
              className="text-[#E8E3D5]/35 hover:text-[#E8E3D5]/60 transition-colors duration-150 text-[11px] font-sans whitespace-nowrap cursor-pointer"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}
