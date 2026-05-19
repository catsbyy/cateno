import type { CatenoScenario } from "../types";
import wwiData from "./wwi.json";
import frenchRevolutionData from "./french-revolution.json";
import fallOfRomeData from "./fall-of-rome.json";
import scientificRevolutionData from "./scientific-revolution.json";
import yearWithoutASummerData from "./year-without-a-summer.json";
import wrightBrothersData from "./wright-brothers.json";
import underwaterData from "./underwater-archaeology.json";
import templarsData from "./templars.json";
import mongolsData from "./mongols.json";
import polynesiaData from "./polynesia.json";
import zhengHeData from "./zheng-he.json";
import louisianaPurchaseData from "./louisiana-purchase.json";
import napsterData from "./napster.json";
import whalesData from "./whales.json";
import tulipManiaData from "./tulip-mania.json";
import leadedGasolineData from "./leaded-gasoline.json";
import inventionOfTeenagerData from "./invention-of-teenager.json";

export const SCENARIOS: CatenoScenario[] = [
  {
    id: "fall-of-rome",
    title: "Fall of Rome",
    period: "100–600",
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
    period: "1871–1933",
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
    period: "1096–1717",
    description:
      "A French king owed them money he couldn't repay. One October morning in 1307 he had them all arrested. How the destruction of the most powerful military order in history accidentally invented modern banking — and capitalism.",
    anchorId: "friday-13th-arrests",
    nodes: templarsData as CatenoScenario["nodes"],
  },
  {
    id: "mongols",
    title: "Mongol Conquests",
    period: "750–1492",
    description:
      "They built the largest land empire in history in a single generation — and in doing so accidentally delivered the Black Death to Europe, transmitted gunpowder from China to the West, and sent Marco Polo on the journey that inspired Columbus. History's most destructive conquerors were also its greatest unifiers.",
    anchorId: "genghis-unifies-mongols",
    nodes: mongolsData as CatenoScenario["nodes"],
  },
  {
    id: "polynesia",
    title: "The Polynesian Expansion",
    period: "1500 BC–1976",
    description:
      "Without compasses, charts, or metal tools, they settled every island in a triangle of ocean larger than all of Earth's landmasses combined. The greatest feat of navigation in human history — and one island got it catastrophically wrong.",
    anchorId: "austronesian-reach-tonga-samoa",
    nodes: polynesiaData as CatenoScenario["nodes"],
  },
  {
    id: "zheng-he",
    title: "The Voyages That Stopped",
    period: "960–1500",
    description:
      "China had the largest ships, the best navigators, and the resources to dominate every ocean on Earth. Then it chose to stop — burned its records, banned its sailors, and forgot what it knew. Sixty years later, Portugal arrived in China's ports with four ships and a cannon.",
    anchorId: "zheng-he-first-voyage",
    nodes: zhengHeData as CatenoScenario["nodes"],
  },
  {
    id: "louisiana-purchase",
    title: "The Sale That Made America",
    period: "1697–1853",
    description:
      "Napoleon needed money for his European wars. Enslaved people in the Caribbean destroyed the army he sent to stop them. So he sold half a continent to the United States for three cents an acre — and accidentally built a superpower.",
    anchorId: "louisiana-purchase-signed",
    nodes: louisianaPurchaseData as CatenoScenario["nodes"],
  },
  {
    id: "whales",
    title: "The Oil That Lit the World",
    period: "900–2005",
    description:
      "For centuries, whales powered the Industrial Revolution — their oil lighting factories, lubricating machines, and fuelling the modern world. Their near-extinction forced humans to find an alternative. The alternative was petroleum. The industry that saved the whales from harpoons created a larger threat than the one it replaced.",
    anchorId: "new-bedford-whaling-peak",
    nodes: whalesData as CatenoScenario["nodes"],
  },
  {
    id: "napster",
    title: "How Napster Broke Music",
    period: "1877–2015",
    description:
      "An 18-year-old built it in a dorm room in six months. The music industry spent $100 billion in market value trying to kill it. They won every lawsuit. They lost everything else.",
    anchorId: "napster-launches",
    nodes: napsterData as CatenoScenario["nodes"],
  },
  {
    id: "tulip-mania",
    title: "The Flower That Invented Finance",
    period: "1500–1900",
    description:
      "In 1637, a single tulip bulb was worth more than an Amsterdam canal house. A week later it was worth almost nothing. The crash was smaller than the legend — but the financial instruments invented to trade flowers became the foundation of every market on Earth.",
    anchorId: "tulip-futures-market",
    nodes: tulipManiaData as CatenoScenario["nodes"],
  },
  {
    id: "leaded-gasoline",
    title: "The Poison They Chose",
    period: "1900–2010",
    description:
      "In 1921, a chemist discovered that adding lead to gasoline eliminated engine knock. He knew it was toxic. A safe alternative existed. They sold it anyway for sixty years — and may have measurably lowered the intelligence and raised the violence of an entire generation.",
    anchorId: "tetraethyl-lead-invented",
    nodes: leadedGasolineData as CatenoScenario["nodes"],
  },
  {
    id: "invention-of-teenager",
    title: "The Invention of the Teenager",
    period: "1890–1982",
    description:
      "Before 1900, 'teenager' wasn't a concept. You were a child, then an adult. Compulsory schooling, child labour laws, and postwar prosperity created a new human category — and the first people to notice were not educators or parents, but marketers.",
    anchorId: "teenager-word-coined",
    nodes: inventionOfTeenagerData as CatenoScenario["nodes"],
  },
];
