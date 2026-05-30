import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { SCENARIO_META } from "../data/scenarios";
import type { ScenarioMeta, ScenarioTheme } from "../data/scenarios";
import { SCENARIO_CENTRE_COLORS } from "../theme";
import { ScenarioPatternSvg } from "./ScenarioPattern";
import { SurpriseButton } from "./SurpriseButton";
import { SearchButton } from "./SearchButton";
import { Footer } from "./Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScenarioProgress {
  visitedCount: number;
  lastVisited: number | null; // Unix ms timestamp
  isFullyExplored: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readAllProgress(): Record<string, ScenarioProgress> {
  const result: Record<string, ScenarioProgress> = {};
  for (const s of SCENARIO_META) {
    try {
      const raw = localStorage.getItem(`cateno_visited_${s.id}`);
      const visitedCount = raw ? (JSON.parse(raw) as string[]).length : 0;
      const tsRaw = localStorage.getItem(`cateno_last_visited_${s.id}`);
      const lastVisited = tsRaw ? parseInt(tsRaw, 10) : null;
      result[s.id] = {
        visitedCount,
        lastVisited,
        isFullyExplored: visitedCount > 0 && visitedCount >= s.nodeCount,
      };
    } catch {
      result[s.id] = { visitedCount: 0, lastVisited: null, isFullyExplored: false };
    }
  }
  return result;
}

// Parse the start year out of a period string like "1500 BC–1976" or "1871–1933"
function parsePeriodStart(period: string): number {
  const bcMatch = period.match(/^(\d+)\s*BC/i);
  if (bcMatch) return -parseInt(bcMatch[1], 10);
  const adMatch = period.match(/^(\d+)/);
  if (adMatch) return parseInt(adMatch[1], 10);
  return 0;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

// ─── Era & theme definitions ──────────────────────────────────────────────────

const ERAS = [
  { id: "antiquity",    name: "Antiquity",    dateRange: "Before 500 AD", min: -Infinity, max: 500  },
  { id: "middle-ages",  name: "Middle Ages",  dateRange: "500–1500",      min: 500,       max: 1500 },
  { id: "early-modern", name: "Early Modern", dateRange: "1500–1800",     min: 1500,      max: 1800 },
  { id: "modern",       name: "Modern",       dateRange: "1800–1950",     min: 1800,      max: 1950 },
  { id: "contemporary", name: "Contemporary", dateRange: "1950–Present",  min: 1950,      max: Infinity },
] as const;

const THEMES: Array<{ ids: ScenarioTheme[]; label: string }> = [
  { ids: ["war"],              label: "War & Conflict"   },
  { ids: ["science"],          label: "Science & Ideas"  },
  { ids: ["nature", "disaster"], label: "Nature & Disaster" },
  { ids: ["culture"],          label: "Culture & Society" },
  { ids: ["finance"],          label: "Finance & Power"  },
  { ids: ["politics"],         label: "Politics"         },
];

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS = [
  { id: "featured", label: "Featured"    },
  { id: "era",      label: "By era"      },
  { id: "theme",    label: "By theme"    },
  { id: "progress", label: "In progress" },
] as const;

type ViewId = (typeof TABS)[number]["id"];
const VIEW_IDS = TABS.map((t) => t.id) as ViewId[];

const CARD_BASIS = "calc((100% - 48px) / 4)";

// ─── ScenarioCard ─────────────────────────────────────────────────────────────

function ScenarioCard({
  scenario,
  localIdx,
  onSelect,
  progress,
}: {
  scenario: ScenarioMeta;
  localIdx: number;
  onSelect: (s: ScenarioMeta) => void;
  progress: ScenarioProgress;
}) {
  const centreColor = SCENARIO_CENTRE_COLORS[scenario.id] ?? "#111111";
  const { visitedCount, isFullyExplored } = progress;
  const totalNodes = scenario.nodeCount;
  const progressPct = totalNodes > 0 ? (visitedCount / totalNodes) * 100 : 0;

  return (
    <motion.button
      onClick={() => onSelect(scenario)}
      className="group w-full text-left rounded-lg border border-[#222222] hover:border-[#383838] p-5 md:p-6 cursor-pointer transition-colors duration-[120ms] ease-out flex flex-col relative overflow-hidden"
      style={{
        flexBasis: CARD_BASIS,
        flexGrow: 0,
        flexShrink: 0,
        backgroundColor: centreColor,
        backgroundImage: `radial-gradient(ellipse at center, ${centreColor} 0%, #111111 100%)`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 + localIdx * 0.04, ease: "easeOut" }}
    >
      <ScenarioPatternSvg scenarioId={scenario.id} opacity={0.06} />

      <div className="flex flex-col flex-1 relative" style={{ zIndex: 1 }}>
        <p className="text-[#E8E3D5]/55 text-[10px] font-sans uppercase tracking-[0.2em] mb-3">
          {scenario.period}
        </p>
        <h2 className="text-[#E8E3D5] text-[22px] font-serif leading-snug mb-3">{scenario.title}</h2>
        <p className="text-[#E8E3D5]/50 text-[13px] font-sans leading-relaxed mb-5">
          {scenario.description}
        </p>
        <div className="pt-4 mb-auto" style={{ borderTop: "1px solid #1e1e1e" }}>
          <p className="text-[#E8E3D5]/45 text-[10px] font-sans uppercase tracking-[0.15em] mb-1">
            Anchor event
          </p>
          <p className="text-[#E8E3D5]/75 text-[12px] font-sans">{scenario.anchorTitle}</p>
        </div>
        <div className="mt-4 min-h-[44px] md:min-h-0 flex items-center">
          <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#E8E3D5]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
            Begin
          </span>
        </div>
      </div>

      {visitedCount > 0 && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2 }}>
          <p
            style={{
              margin: 0,
              padding: "6px 20px 5px",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 10,
              color: "#E8E3D5",
              opacity: 0.3,
              letterSpacing: "0.05em",
            }}
          >
            {isFullyExplored ? "Fully explored" : `${visitedCount} / ${totalNodes} events explored`}
          </p>
          <div style={{ height: 4, background: "#1e1e1e" }}>
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: centreColor,
                filter: isFullyExplored ? "brightness(1.6) saturate(1.2)" : "brightness(1.2)",
              }}
            />
          </div>
        </div>
      )}
    </motion.button>
  );
}

// ─── ScenarioGrid ─────────────────────────────────────────────────────────────

function ScenarioGrid({
  scenarios,
  onSelect,
  progress,
  baseIdx = 0,
}: {
  scenarios: ScenarioMeta[];
  onSelect: (s: ScenarioMeta) => void;
  progress: Record<string, ScenarioProgress>;
  baseIdx?: number;
}) {
  const rows = chunkArray(scenarios, 4);
  const empty: ScenarioProgress = { visitedCount: 0, lastVisited: null, isFullyExplored: false };
  return (
    <div className="w-full flex flex-col gap-4">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex flex-col gap-4 md:flex-row md:justify-center md:items-stretch">
          {row.map((scenario, colIdx) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              localIdx={baseIdx + rowIdx * 4 + colIdx}
              onSelect={onSelect}
              progress={progress[scenario.id] ?? empty}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
  size = "large",
}: {
  title: string;
  subtitle?: string;
  size?: "large" | "small";
}) {
  const isLarge = size === "large";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        marginBottom: isLarge ? 24 : 16,
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: isLarge ? 18 : 13,
          color: "#E8E3D5",
          opacity: isLarge ? 0.7 : 0.45,
          whiteSpace: "nowrap",
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>
      {subtitle && (
        <span
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#E8E3D5",
            opacity: 0.3,
            whiteSpace: "nowrap",
          }}
        >
          {subtitle}
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: "#1e1e1e", alignSelf: "center" }} />
    </div>
  );
}

// ─── TabNav ───────────────────────────────────────────────────────────────────

function TabNav({ active, onSelect }: { active: ViewId; onSelect: (v: ViewId) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 44 }}>
      {TABS.map((tab, i) => (
        <span key={tab.id} style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => onSelect(tab.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom:
                active === tab.id
                  ? "1px solid rgba(232, 227, 213, 0.4)"
                  : "1px solid transparent",
              padding: "4px 0 3px",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#E8E3D5",
              opacity: active === tab.id ? 0.8 : 0.35,
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (active !== tab.id) e.currentTarget.style.opacity = "0.55";
            }}
            onMouseLeave={(e) => {
              if (active !== tab.id) e.currentTarget.style.opacity = "0.35";
            }}
          >
            {tab.label}
          </button>
          {i < TABS.length - 1 && (
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 12,
                color: "#E8E3D5",
                opacity: 0.2,
                padding: "0 14px",
                userSelect: "none",
              }}
            >
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

// ─── View 1 — Featured ────────────────────────────────────────────────────────

function FeaturedView({
  progress,
  onSelect,
}: {
  progress: Record<string, ScenarioProgress>;
  onSelect: (s: ScenarioMeta) => void;
}) {
  return (
    <ScenarioGrid scenarios={SCENARIO_META} onSelect={onSelect} progress={progress} />
  );
}

// ─── View 2 — By era ──────────────────────────────────────────────────────────

function EraView({
  progress,
  onSelect,
}: {
  progress: Record<string, ScenarioProgress>;
  onSelect: (s: ScenarioMeta) => void;
}) {
  const groups = useMemo(() => {
    let offset = 0;
    return ERAS.map((era) => {
      const scenarios = SCENARIO_META.filter(
        (s) => s.anchorYear >= era.min && s.anchorYear < era.max
      ).sort((a, b) => parsePeriodStart(a.period) - parsePeriodStart(b.period));
      const baseIdx = offset;
      offset += scenarios.length;
      return { era, scenarios, baseIdx };
    }).filter((g) => g.scenarios.length > 0);
  }, []);

  return (
    <div className="w-full flex flex-col gap-12">
      {groups.map(({ era, scenarios, baseIdx }) => (
        <div key={era.id}>
          <SectionHeader title={era.name} subtitle={era.dateRange} />
          <ScenarioGrid
            scenarios={scenarios}
            onSelect={onSelect}
            progress={progress}
            baseIdx={baseIdx}
          />
        </div>
      ))}
    </div>
  );
}

// ─── View 3 — By theme ────────────────────────────────────────────────────────

function ThemeView({
  progress,
  onSelect,
}: {
  progress: Record<string, ScenarioProgress>;
  onSelect: (s: ScenarioMeta) => void;
}) {
  const groups = useMemo(() => {
    let offset = 0;
    return THEMES.map((theme) => {
      const scenarios = SCENARIO_META.filter((s) =>
        (theme.ids as readonly string[]).includes(s.theme)
      );
      const baseIdx = offset;
      offset += scenarios.length;
      return { theme, scenarios, baseIdx };
    }).filter((g) => g.scenarios.length > 0);
  }, []);

  return (
    <div className="w-full flex flex-col gap-12">
      {groups.map(({ theme, scenarios, baseIdx }) => (
        <div key={theme.label}>
          <SectionHeader title={theme.label} />
          <ScenarioGrid
            scenarios={scenarios}
            onSelect={onSelect}
            progress={progress}
            baseIdx={baseIdx}
          />
        </div>
      ))}
    </div>
  );
}

// ─── View 4 — In progress ─────────────────────────────────────────────────────

function ProgressView({
  progress,
  onSelect,
}: {
  progress: Record<string, ScenarioProgress>;
  onSelect: (s: ScenarioMeta) => void;
}) {
  const { inProgress, fullyExplored, notBegun } = useMemo(() => {
    const byLastVisited = (a: ScenarioMeta, b: ScenarioMeta) =>
      (progress[b.id]?.lastVisited ?? 0) - (progress[a.id]?.lastVisited ?? 0);

    return {
      inProgress: SCENARIO_META.filter(
        (s) => progress[s.id]?.visitedCount > 0 && !progress[s.id]?.isFullyExplored
      ).sort(byLastVisited),
      fullyExplored: SCENARIO_META.filter((s) => progress[s.id]?.isFullyExplored).sort(
        byLastVisited
      ),
      notBegun: SCENARIO_META.filter(
        (s) => !progress[s.id]?.visitedCount || progress[s.id]?.visitedCount === 0
      ),
    };
  }, [progress]);

  const hasAnyProgress = inProgress.length > 0 || fullyExplored.length > 0;

  if (!hasAnyProgress) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "80px 0",
          fontFamily: "DM Sans, sans-serif",
          fontSize: 13,
          color: "#E8E3D5",
          opacity: 0.35,
        }}
      >
        Start exploring to track your progress
      </div>
    );
  }

  let offset = 0;
  const inProgressBase = offset; offset += inProgress.length;
  const fullyBase = offset; offset += fullyExplored.length;
  const notBegunBase = offset;

  return (
    <div className="w-full flex flex-col gap-12">
      {inProgress.length > 0 && (
        <div>
          <SectionHeader title="Continue exploring" />
          <ScenarioGrid
            scenarios={inProgress}
            onSelect={onSelect}
            progress={progress}
            baseIdx={inProgressBase}
          />
        </div>
      )}
      {fullyExplored.length > 0 && (
        <div>
          <SectionHeader title="Fully explored" />
          <ScenarioGrid
            scenarios={fullyExplored}
            onSelect={onSelect}
            progress={progress}
            baseIdx={fullyBase}
          />
        </div>
      )}
      {notBegun.length > 0 && (
        <div>
          <SectionHeader title="Not yet begun" />
          <ScenarioGrid
            scenarios={notBegun}
            onSelect={onSelect}
            progress={progress}
            baseIdx={notBegunBase}
          />
        </div>
      )}
    </div>
  );
}

// ─── ScenarioSelector ─────────────────────────────────────────────────────────

interface ScenarioSelectorProps {
  onSelect: (scenario: ScenarioMeta) => void;
}

export function ScenarioSelector({ onSelect }: ScenarioSelectorProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawView = searchParams.get("view");
  const activeView: ViewId = VIEW_IDS.includes(rawView as ViewId)
    ? (rawView as ViewId)
    : "featured";

  const progress = useMemo(() => readAllProgress(), []);

  function setView(v: ViewId) {
    if (v === "featured") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ view: v }, { replace: true });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="w-full min-h-screen bg-[#0D0D0D] flex flex-col items-center px-4 py-12 md:py-16 pb-0">
      {/* Wordmark */}
      <motion.div
        className="text-center shrink-0"
        style={{ marginBottom: 36 }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-[#E8E3D5] text-5xl md:text-6xl font-serif tracking-tight mb-3">Cateno</h1>
        <p className="text-[#E8E3D5]/45 text-[11px] font-sans uppercase tracking-[0.25em]">
          A cause-and-effect history explorer
        </p>
      </motion.div>

      {/* Tab navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
      >
        <TabNav active={activeView} onSelect={setView} />
      </motion.div>

      {/* View content */}
      <div className="w-full" style={{ maxWidth: 1200 }}>
        {activeView === "featured" && (
          <FeaturedView progress={progress} onSelect={onSelect} />
        )}
        {activeView === "era" && (
          <EraView progress={progress} onSelect={onSelect} />
        )}
        {activeView === "theme" && (
          <ThemeView progress={progress} onSelect={onSelect} />
        )}
        {activeView === "progress" && (
          <ProgressView progress={progress} onSelect={onSelect} />
        )}
      </div>

      <Footer />

      {/* Surprise Me + Search — fixed top-right */}
      <div
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <SurpriseButton />
        <SearchButton />
      </div>
    </div>
  );
}
