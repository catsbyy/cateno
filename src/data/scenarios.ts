import type { CatenoScenario } from "../types";
import wwiData from "./wwi.json";
import frenchRevolutionData from "./french-revolution.json";
import fallOfRomeData from "./fall-of-rome.json";
import scientificRevolutionData from "./scientific-revolution.json";
import yearWithoutASummerData from "./year-without-a-summer.json";

export const SCENARIOS: CatenoScenario[] = [
  {
    id: "fall-of-rome",
    title: "Fall of Rome",
    period: "100–600 AD",
    description:
      "Five centuries of slow collapse. How military overstretch, economic rot, and barbarian pressure dismantled the most powerful state the ancient world had ever built.",
    anchorId: "romulus-augustulus-deposed",
    nodes: fallOfRomeData as CatenoScenario["nodes"],
  },
  {
    id: "french-revolution",
    title: "French Revolution",
    period: "1700–1803",
    description:
      "A kingdom bankrupted by war, a harvest destroyed by weather, and ideas that could no longer be contained. How France tore itself apart and gave the modern world the language of liberty.",
    anchorId: "storming-of-bastille",
    nodes: frenchRevolutionData as CatenoScenario["nodes"],
  },
  {
    id: "scientific-revolution",
    title: "Scientific Revolution",
    period: "1200–1760",
    description:
      "How a handful of stubborn minds — armed with telescopes, dissection tables, and mathematics — dismantled a thousand years of inherited wisdom and replaced it with something truer.",
    anchorId: "newton-principia",
    nodes: scientificRevolutionData as CatenoScenario["nodes"],
  },
  {
    id: "year-without-a-summer",
    title: "Year Without a Summer",
    period: "1815–1820",
    description:
      "A volcano in Indonesia erupted. Harvests failed across three continents. And somehow, the world got Frankenstein, the bicycle, and the first cholera pandemic — all from the same cloud of ash.",
    anchorId: "mount-tambora-eruption",
    nodes: yearWithoutASummerData as CatenoScenario["nodes"],
  },
  {
    id: "wwi",
    title: "World War I",
    period: "1871–1919",
    description:
      "One assassination. Thirty-seven days. How a continent armed to the teeth and bound by secret alliances sleepwalked into the deadliest war in human history.",
    anchorId: "assassination-franz-ferdinand",
    nodes: wwiData as CatenoScenario["nodes"],
  },
];
