import type { CatenoScenario } from "../types";
import wwiData from "./wwi.json";
import frenchRevolutionData from "./french-revolution.json";
import fallOfRomeData from "./fall-of-rome.json";
import scientificRevolutionData from "./scientific-revolution.json";

export const SCENARIOS: CatenoScenario[] = [
  {
    id: "fall-of-rome",
    title: "Fall of Rome",
    period: "100–600 AD",
    description:
      "How centuries of military overreach, economic decay, and barbarian pressure brought down the greatest empire the ancient world had known.",
    anchorId: "romulus-augustulus-deposed",
    nodes: fallOfRomeData as CatenoScenario["nodes"],
  },
  {
    id: "french-revolution",
    title: "French Revolution",
    period: "1700–1803",
    description:
      "How financial crisis and Enlightenment ideas toppled a monarchy and gave the modern world the language of liberty.",
    anchorId: "storming-of-bastille",
    nodes: frenchRevolutionData as CatenoScenario["nodes"],
  },
  {
    id: "scientific-revolution",
    title: "Scientific Revolution",
    period: "1200–1760",
    description:
      "How empirical observation, mathematical thinking, and a handful of visionary minds dismantled a thousand years of inherited wisdom and built the modern scientific worldview.",
    anchorId: "newton-principia",
    nodes: scientificRevolutionData as CatenoScenario["nodes"],
  },
  {
    id: "wwi",
    title: "World War I",
    period: "1871–1919",
    description:
      "How a single assassination in Sarajevo ignited a global war through alliances, nationalism, and military planning.",
    anchorId: "assassination-franz-ferdinand",
    nodes: wwiData as CatenoScenario["nodes"],
  },
];
