import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScenarioSelector } from "./components/ScenarioSelector";
import { GraphView } from "./components/GraphView";
import type { CatenoScenario } from "./types";

export default function App() {
  const [scenario, setScenario] = useState<CatenoScenario | null>(null);

  return (
    <AnimatePresence mode="wait">
      {scenario === null ? (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ScenarioSelector onSelect={setScenario} />
        </motion.div>
      ) : (
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-screen overflow-hidden"
        >
          <GraphView scenario={scenario} onBack={() => setScenario(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
