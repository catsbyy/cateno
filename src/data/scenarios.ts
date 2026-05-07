import type { CatenoScenario } from "../types";
import wwiData from "./wwi.json";
import frenchRevolutionData from "./french-revolution.json";
import fallOfRomeData from "./fall-of-rome.json";
import scientificRevolutionData from "./scientific-revolution.json";
import yearWithoutASummerData from "./year-without-a-summer.json";
import wrightBrothersData from "./wright-brothers.json";
import underwaterData from "./underwater-archaeology.json";
import templarsData from "./templars.json";

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
      "A volcano in Indonesia erupted. Harvests failed across three continents. And somehow, the world got Frankenstein, the bicycle, and the first cholera pandemic — all from the same volcanic eruption.",
    anchorId: "mount-tambora-eruption",
    nodes: yearWithoutASummerData as CatenoScenario["nodes"],
  },
  {
    id: "wwi",
    title: "World War I",
    period: "1871–1919",
    description:
      "One assassination. Thirty-seven days. How a continent armed to the teeth and bound by rigid alliances sleepwalked into the deadliest war in human history.",
    anchorId: "assassination-franz-ferdinand",
    nodes: wwiData as CatenoScenario["nodes"],
  },
  {
    id: "wright-brothers",
    title: "First Flight",
    period: "1485–1961",
    description:
      "Two bicycle mechanics from Ohio solved in four years what governments and universities had failed to achieve in decades. How twelve seconds above a North Carolina beach changed the shape of the world forever.",
    anchorId: "kitty-hawk-flight",
    nodes: wrightBrothersData as CatenoScenario["nodes"],
  },
  {
    id: "underwater-archaeology",
    title: "The Silent Archive",
    period: "1500 BC–2010",
    description:
      "The ocean floor is the largest archaeological site on Earth. How divers, engineers, and stubborn scholars dragged the ancient world back to the surface — and rewrote everything we thought we knew.",
    anchorId: "vasa-raising",
    nodes: underwaterData as CatenoScenario["nodes"],
  },
  {
    id: "templars",
    title: "The Last Templars",
    period: "1096–1500",
    description:
      "A French king owed them money he couldn't repay. One October morning in 1307 he had them all arrested. How the destruction of the most powerful military order in history accidentally invented modern banking — and capitalism.",
    anchorId: "friday-13th-arrests",
    nodes: templarsData as CatenoScenario["nodes"],
  },
];
