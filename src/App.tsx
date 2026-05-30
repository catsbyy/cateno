import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ScenarioSelector } from "./components/ScenarioSelector";
import { NotFound } from "./components/NotFound";
import { About } from "./components/About";
import { SearchOverlay } from "./components/SearchOverlay";
import { SearchProvider } from "./contexts/SearchContext";
import { SCENARIO_META } from "./data/scenarios";
import { loadScenarioNodes } from "./data/scenarios";
import { getScenarioGradient } from "./theme";
import type { CatenoScenario } from "./types";
import type { ScenarioMeta } from "./data/scenarios";

// GraphView (and everything it imports — React Flow, etc.) is code-split into
// its own chunk and never loaded on the landing page.
const GraphView = lazy(() =>
  import("./components/GraphView").then((m) => ({ default: m.GraphView }))
);

// ─── Route wrappers ───────────────────────────────────────────────────────────

function ScenarioRoute() {
  const { scenarioId, nodeId } = useParams<{ scenarioId: string; nodeId?: string }>();
  const navigate = useNavigate();

  // Always call hooks unconditionally.
  const [scenario, setScenario] = useState<CatenoScenario | null>(null);

  const meta: ScenarioMeta | undefined = SCENARIO_META.find((s) => s.id === scenarioId);

  useEffect(() => {
    if (!meta) return;
    setScenario(null); // clear previous scenario immediately on ID change
    loadScenarioNodes(meta.id).then((nodes) => {
      setScenario({ ...meta, nodes });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioId]);

  // Unknown scenario ID → 404.
  if (!meta) return <NotFound />;

  // Nodes still loading — show the scenario gradient immediately so the
  // transition feels instant. This typically resolves in < 200 ms.
  if (!scenario) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: getScenarioGradient(meta.id),
        }}
      />
    );
  }

  return (
    <motion.div
      key={scenario.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-screen overflow-hidden"
    >
      {/* Suspense fallback shows the same gradient while GraphView JS chunk loads.
          Both the JSON and the chunk download in parallel, so the wait is minimal. */}
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              background: getScenarioGradient(scenario.id),
            }}
          />
        }
      >
        <GraphView
          scenario={scenario}
          initialNodeId={nodeId ?? null}
          onBack={() => navigate("/")}
          onNodeFocus={(nId: string) => navigate(`/${scenario.id}/${nId}`)}
          onFocusClear={() => navigate(`/${scenario.id}`, { replace: true })}
        />
      </Suspense>
    </motion.div>
  );
}

function SelectorRoute() {
  const navigate = useNavigate();
  return (
    <motion.div
      key="selector"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <ScenarioSelector onSelect={(s: ScenarioMeta) => navigate(`/${s.id}`)} />
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <SearchProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<SelectorRoute />} />
          <Route path="/about" element={<About />} />
          <Route path="/:scenarioId" element={<ScenarioRoute />} />
          <Route path="/:scenarioId/:nodeId" element={<ScenarioRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <SearchOverlay />
      <Analytics />
      <SpeedInsights />
    </SearchProvider>
  );
}
