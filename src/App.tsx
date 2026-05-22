import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ScenarioSelector } from "./components/ScenarioSelector";
import { GraphView } from "./components/GraphView";
import { NotFound } from "./components/NotFound";
import { SCENARIOS } from "./data/scenarios";
import type { CatenoScenario } from "./types";

// ─── Route wrappers ───────────────────────────────────────────────────────────

function ScenarioRoute() {
  const { scenarioId, nodeId } = useParams<{ scenarioId: string; nodeId?: string }>();
  const navigate = useNavigate();

  const scenario = SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) return <NotFound />;

  return (
    <motion.div
      key={scenario.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-screen overflow-hidden"
    >
      <GraphView
        scenario={scenario}
        initialNodeId={nodeId ?? null}
        onBack={() => navigate("/")}
        onNodeFocus={(nId) => navigate(`/${scenario.id}/${nId}`)}
        onFocusClear={() => navigate(`/${scenario.id}`, { replace: true })}
      />
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
      <ScenarioSelector onSelect={(s: CatenoScenario) => navigate(`/${s.id}`)} />
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<SelectorRoute />} />
          <Route path="/:scenarioId" element={<ScenarioRoute />} />
          <Route path="/:scenarioId/:nodeId" element={<ScenarioRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
