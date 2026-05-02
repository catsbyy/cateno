import { useMemo } from "react";
import type { CatenoScenario } from "../types";
import wwiData from "../data/wwi.json";

const WWI_SCENARIO: CatenoScenario = {
  id: "wwi",
  title: "World War I",
  period: "1871–1919",
  description:
    "How a single assassination in Sarajevo ignited a global war through alliances, nationalism, and military planning.",
  anchorId: "assassination-franz-ferdinand",
  nodes: wwiData as CatenoScenario["nodes"],
};

export function useScenario() {
  return useMemo(() => WWI_SCENARIO, []);
}
