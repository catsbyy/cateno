import type { CatenoNode } from "../types";

// ─── Metadata only — no node data ─────────────────────────────────────────────
// The landing page only needs these fields. Node data is loaded dynamically
// when a user selects a scenario, so scenario JSON never ships in the initial
// bundle.

export type ScenarioTheme = "war" | "science" | "nature" | "culture" | "finance" | "politics" | "disaster";

export interface ScenarioMeta {
  id: string;
  title: string;
  period: string;
  description: string;
  anchorId: string;
  anchorTitle: string; // precomputed so landing page doesn't need nodes
  nodeCount: number; // precomputed so progress bar needs no JSON
  anchorYear: number; // precomputed for era grouping
  theme: ScenarioTheme;
}

export const SCENARIO_META: ScenarioMeta[] = [
  {
    id: "emu-war",
    title: "The Great Emu War",
    period: "1918–1950",
    description:
      "In 1932, Australia deployed the military against emus. The army had Lewis guns. The emus had feathers, speed, and no concept of defeat. Major Meredith filed official dispatches about the birds' guerrilla tactics. The emus won. The government pretended it had never happened.",
    anchorId: "emu-war-begins",
    anchorTitle: "The Australian Army Goes to War With Birds",
    nodeCount: 23,
    anchorYear: 1932,
    theme: "nature",
  },
  {
    id: "year-without-a-summer",
    title: "Year Without a Summer",
    period: "1815–1820",
    description:
      "A volcano in Indonesia erupted. Harvests failed across three continents. And somehow, the world got Frankenstein, the bicycle, and the first cholera pandemic — all from the same volcanic eruption.",
    anchorId: "mount-tambora-eruption",
    anchorTitle: "Mount Tambora Erupts",
    nodeCount: 32,
    anchorYear: 1815,
    theme: "disaster",
  },
  {
    id: "cats",
    title: "They Chose Us",
    period: "10500 BC–2012",
    description:
      "Every domesticated animal was captured and bred by humans. Cats walked in on their own. They protected our grain, became gods in Egypt, got blamed for the Black Death, sailed on every ship, conquered every continent — and then the internet gave them back their temples.",
    anchorId: "cats-self-domesticate",
    anchorTitle: "Cats Choose Us",
    nodeCount: 25,
    anchorYear: -7500,
    theme: "nature",
  },
  {
    id: "tulip-mania",
    title: "The Flower That Invented Finance",
    period: "1500–1900",
    description:
      "In 1637, a single tulip bulb was worth more than an Amsterdam canal house. A week later it was worth almost nothing. The crash was smaller than the legend — but the financial instruments invented to trade flowers became the foundation of every market on Earth.",
    anchorId: "tulip-futures-market",
    anchorTitle: "The Tavern Futures Market",
    nodeCount: 26,
    anchorYear: 1636,
    theme: "finance",
  },
  {
    id: "library-of-alexandria",
    title: "The Library That Burned Three Times",
    period: "400 BC–2002",
    description:
      "It was the largest collection of human knowledge ever assembled. It held the proof that the Earth orbited the Sun — 1,800 years before Copernicus. It was lost not in a single fire, as the legend says, but in three slow centuries of neglect, riot, and ideological purging. We don't know what we lost.",
    anchorId: "ptolemy-founds-library",
    anchorTitle: "The Library Is Founded",
    nodeCount: 34,
    anchorYear: -300,
    theme: "science",
  },
  {
    id: "napster",
    title: "How Napster Broke Music",
    period: "1877–2015",
    description:
      "An 18-year-old built it in a dorm room in about nine months. The music industry spent $100 billion in market value trying to kill it. They won every lawsuit. They lost everything else.",
    anchorId: "napster-launches",
    anchorTitle: "Napster Launches",
    nodeCount: 36,
    anchorYear: 1999,
    theme: "culture",
  },
  {
    id: "invention-of-teenager",
    title: "The Invention of the Teenager",
    period: "1890–1982",
    description:
      "Before 1900, 'teenager' wasn't a concept. You were a child, then an adult. Compulsory schooling, child labour laws, and postwar prosperity created a new human category — and the first people to notice were not educators or parents, but marketers.",
    anchorId: "teenager-word-coined",
    anchorTitle: "The Word 'Teenager' Is Invented",
    nodeCount: 24,
    anchorYear: 1944,
    theme: "culture",
  },
  {
    id: "whales",
    title: "The Oil That Lit the World",
    period: "900–2005",
    description:
      "For centuries, whales powered the Industrial Revolution — their oil lighting factories, lubricating machines, and fuelling the modern world. Their near-extinction forced humans to find an alternative. The alternative was petroleum. The industry that saved the whales from harpoons created a larger threat than the one it replaced.",
    anchorId: "new-bedford-whaling-peak",
    anchorTitle: "New Bedford — The Whaling Capital of the World",
    nodeCount: 39,
    anchorYear: 1850,
    theme: "nature",
  },
  {
    id: "leaded-gasoline",
    title: "The Poison They Chose",
    period: "1900–2010",
    description:
      "In 1921, a chemist discovered that adding lead to gasoline eliminated engine knock. He knew it was toxic. A safe alternative existed. They sold it anyway for more than sixty years — and may have measurably lowered the intelligence and raised the violence of an entire generation.",
    anchorId: "tetraethyl-lead-invented",
    anchorTitle: "Midgley Discovers Tetraethyl Lead",
    nodeCount: 26,
    anchorYear: 1921,
    theme: "science",
  },
  {
    id: "louisiana-purchase",
    title: "The Sale That Made America",
    period: "1697–1853",
    description:
      "Napoleon needed money for his European wars. Enslaved people in the Caribbean destroyed the army he sent to stop them. So he sold half a continent to the United States for three cents an acre — and accidentally built a superpower.",
    anchorId: "louisiana-purchase-signed",
    anchorTitle: "Louisiana Purchase Signed",
    nodeCount: 43,
    anchorYear: 1803,
    theme: "politics",
  },
  {
    id: "wright-brothers",
    title: "First Flight",
    period: "1485–1961",
    description:
      "Two bicycle mechanics from Ohio solved in four years what governments and universities had failed to achieve in decades. How twelve seconds above a North Carolina beach changed the shape of the world forever.",
    anchorId: "kitty-hawk-flight",
    anchorTitle: "First Flight at Kitty Hawk",
    nodeCount: 37,
    anchorYear: 1903,
    theme: "science",
  },
  {
    id: "french-revolution",
    title: "French Revolution",
    period: "1700–1803",
    description:
      "A kingdom bankrupted by war, a harvest destroyed by weather, and ideas that could no longer be contained. How France tore itself apart and gave the modern world the language of liberty.",
    anchorId: "storming-of-bastille",
    anchorTitle: "Storming of Bastille",
    nodeCount: 38,
    anchorYear: 1789,
    theme: "politics",
  },
  {
    id: "fall-of-rome",
    title: "Fall of Rome",
    period: "100–600",
    description:
      "Five centuries of slow collapse. How military overstretch, economic rot, and barbarian pressure dismantled the most powerful state the ancient world had ever built.",
    anchorId: "romulus-augustulus-deposed",
    anchorTitle: "Romulus Augustulus Deposed",
    nodeCount: 43,
    anchorYear: 476,
    theme: "war",
  },
  {
    id: "wwi",
    title: "World War I",
    period: "1871–1933",
    description:
      "One assassination. Thirty-seven days. How a continent armed to the teeth and bound by rigid alliances sleepwalked into the deadliest war the world had yet seen.",
    anchorId: "assassination-franz-ferdinand",
    anchorTitle: "Assassination of Franz Ferdinand",
    nodeCount: 58,
    anchorYear: 1914,
    theme: "war",
  },
  {
    id: "scientific-revolution",
    title: "Scientific Revolution",
    period: "1200–1760",
    description:
      "How a handful of stubborn minds — armed with telescopes, dissection tables, and mathematics — dismantled a thousand years of inherited wisdom and replaced it with something truer.",
    anchorId: "newton-principia",
    anchorTitle: "Newton's Principia Mathematica",
    nodeCount: 35,
    anchorYear: 1687,
    theme: "science",
  },
  {
    id: "black-plague-renaissance",
    title: "Death and the Birth of Humanism",
    period: "1100–1520",
    description:
      "The Black Death killed half of Florence. The survivors inherited concentrated wealth, shattered Church authority, and a desperate need to make sense of a world where death was arbitrary and life was short. What they built with it was the Renaissance.",
    anchorId: "humanist-philosophy-emerges",
    anchorTitle: "Humanism — Man as the Measure",
    nodeCount: 31,
    anchorYear: 1360,
    theme: "culture",
  },
  {
    id: "age-of-exploration",
    title: "The Voyage That Connected the World",
    period: "1300–1602",
    description:
      "Europe needed pepper. The spice routes were blocked. So they sailed around the world to find them — and accidentally connected two biospheres that had been separated for 10,000 years, killed up to 90% of the people they found, and built the global economy we still live in.",
    anchorId: "columbus-reaches-americas",
    anchorTitle: "Columbus Reaches the Americas",
    nodeCount: 31,
    anchorYear: 1492,
    theme: "politics",
  },
  {
    id: "mongols",
    title: "Mongol Conquests",
    period: "750–1492",
    description:
      "They built the largest land empire in history in a single generation — and in doing so accidentally delivered the Black Death to Europe, transmitted gunpowder from China to the West, and sent Marco Polo on the journey that inspired Columbus. History's most destructive conquerors were also its greatest unifiers.",
    anchorId: "genghis-unifies-mongols",
    anchorTitle: "Genghis Khan Proclaimed",
    nodeCount: 45,
    anchorYear: 1206,
    theme: "war",
  },
  {
    id: "zheng-he",
    title: "The Voyages That Stopped",
    period: "960–1500",
    description:
      "China had the largest ships, the best navigators, and the resources to dominate every ocean on Earth. Then it chose to stop — burned its records, banned its sailors, and forgot what it knew. Sixty years later, Portugal arrived in China's ports with four ships and a cannon.",
    anchorId: "zheng-he-first-voyage",
    anchorTitle: "Zheng He Sets Sail",
    nodeCount: 31,
    anchorYear: 1405,
    theme: "politics",
  },
  {
    id: "templars",
    title: "The Last Templars",
    period: "1096–1717",
    description:
      "A French king owed them money he couldn't repay. One October morning in 1307 he had them all arrested. How the destruction of the most powerful military order in history accidentally invented modern banking — and capitalism.",
    anchorId: "friday-13th-arrests",
    anchorTitle: "Friday the 13th — Mass Arrest",
    nodeCount: 32,
    anchorYear: 1307,
    theme: "finance",
  },
  {
    id: "polynesia",
    title: "The Polynesian Expansion",
    period: "1500 BC–1976",
    description:
      "Without compasses, charts, or metal tools, they settled every island in a triangle of ocean larger than all of Earth's landmasses combined. The greatest feat of navigation in human history — and one island got it catastrophically wrong.",
    anchorId: "austronesian-reach-tonga-samoa",
    anchorTitle: "Polynesians Settle Tonga & Samoa",
    nodeCount: 30,
    anchorYear: -900,
    theme: "culture",
  },
  {
    id: "underwater-archaeology",
    title: "The Silent Archive",
    period: "1500 BC–2010",
    description:
      "The ocean floor is the largest archaeological site on Earth. How divers, engineers, and stubborn scholars dragged the ancient world back to the surface — and rewrote everything we thought we knew.",
    anchorId: "vasa-raising",
    anchorTitle: "Raising of the Vasa",
    nodeCount: 31,
    anchorYear: 1961,
    theme: "science",
  },
  {
    id: "hollywood-birth",
    title: "How a Patent Lawsuit Built Hollywood",
    period: "1891–1930",
    description:
      "Thomas Edison tried to monopolise the entire film industry with a patent cartel. The filmmakers he couldn't control fled to California to escape his lawyers — and accidentally built the most powerful entertainment industry in history.",
    anchorId: "edison-trust-collapses",
    anchorTitle: "The Trust Is Broken",
    nodeCount: 16,
    anchorYear: 1915,
    theme: "culture",
  },
  {
    id: "hollywood-code",
    title: "The Postmaster Who Ran Hollywood",
    period: "1921–1968",
    description:
      "For 34 years, everything Hollywood made was filtered through a list of prohibitions written by a Catholic priest and enforced by a former postmaster from Indiana. Then television, antitrust law, and Psycho's toilet destroyed it in a decade.",
    anchorId: "hays-code-adopted",
    anchorTitle: "The Production Code",
    nodeCount: 15,
    anchorYear: 1934,
    theme: "culture",
  },
  {
    id: "hollywood-blockbuster",
    title: "The Two Films That Ended Good Cinema",
    period: "1967–1995",
    description:
      "The 1970s were the best decade in Hollywood history. Then Jaws and Star Wars accidentally proved that one film could make more money than a studio's entire annual slate — and everything changed. Pulp Fiction thought it won. It didn't.",
    anchorId: "jaws-changes-everything",
    anchorTitle: "Jaws — The First Blockbuster",
    nodeCount: 15,
    anchorYear: 1975,
    theme: "culture",
  },
  {
    id: "f1-turbo-era",
    title: "The Arms Race That Nearly Destroyed F1",
    period: "1966–1990",
    description:
      "Renault found a loophole in the regulations and built an engine producing 1,500 horsepower. Every major manufacturer in the world scrambled to match it. Costs exploded, small teams died, and the cars became too fast to control. The FIA banned turbos — but the arms race had permanently changed what F1 was.",
    anchorId: "renault-turbo-debuts",
    anchorTitle: "Renault's Yellow Teapot",
    nodeCount: 17,
    anchorYear: 1977,
    theme: "science",
  },
  {
    id: "f1-bernie",
    title: "How a Used Car Dealer Built a $6 Billion Empire",
    period: "1970–2017",
    description:
      "Formula One in 1970 was a collection of racing teams with no commercial strategy, no centralised television rights, and no collective bargaining power. Bernie Ecclestone noticed. Thirty years later he owned the commercial rights to the sport for the next hundred years.",
    anchorId: "ecclestone-takes-foca",
    anchorTitle: "Bernie Ecclestone Takes Control",
    nodeCount: 14,
    anchorYear: 1972,
    theme: "finance",
  },
  {
    id: "f1-senna",
    title: "The Weekend That Changed Everything",
    period: "1950–2022",
    description:
      "Between 1950 and 1994, Formula One killed more than 25 drivers at championship race weekends. Then one weekend at Imola killed the most beloved driver in the world — and the sport could no longer accept what it had always accepted. In the thirty years since, there has been one racing death. Before 1994, there were years with three.",
    anchorId: "san-marino-gp-1994",
    anchorTitle: "The Weekend at Imola",
    nodeCount: 20,
    anchorYear: 1994,
    theme: "culture",
  },
  {
    id: "coffee-houses",
    title: "The Drink That Invented Conversation",
    period: "1450–2004",
    description:
      "Before coffee, Europe drank beer all day — even at breakfast. Then a sober, stimulating drink arrived. People started gathering in public rooms to read, argue, and exchange information. Lloyd's of London began as a coffee house. So did the London Stock Exchange. So did the French Revolution.",
    anchorId: "first-ottoman-coffeehouse",
    anchorTitle: "Constantinople's Coffee Houses",
    nodeCount: 24,
    anchorYear: 1554,
    theme: "culture",
  },
];

// ─── Dynamic node loaders ──────────────────────────────────────────────────────
// Each import() becomes a separate Vite chunk — scenario JSON is never included
// in the initial bundle. All 29 files load only when their scenario is opened.

const NODE_LOADERS: Record<string, () => Promise<{ default: unknown }>> = {
  "emu-war": () => import("./emu-war.json"),
  "year-without-a-summer": () => import("./year-without-a-summer.json"),
  "tulip-mania": () => import("./tulip-mania.json"),
  napster: () => import("./napster.json"),
  "invention-of-teenager": () => import("./invention-of-teenager.json"),
  whales: () => import("./whales.json"),
  "leaded-gasoline": () => import("./leaded-gasoline.json"),
  "louisiana-purchase": () => import("./louisiana-purchase.json"),
  "wright-brothers": () => import("./wright-brothers.json"),
  "french-revolution": () => import("./french-revolution.json"),
  "fall-of-rome": () => import("./fall-of-rome.json"),
  wwi: () => import("./wwi.json"),
  "scientific-revolution": () => import("./scientific-revolution.json"),
  "black-plague-renaissance": () => import("./black-plague-renaissance.json"),
  "age-of-exploration": () => import("./age-of-exploration.json"),
  mongols: () => import("./mongols.json"),
  "zheng-he": () => import("./zheng-he.json"),
  templars: () => import("./templars.json"),
  polynesia: () => import("./polynesia.json"),
  "underwater-archaeology": () => import("./underwater-archaeology.json"),
  "hollywood-birth": () => import("./hollywood-birth.json"),
  "hollywood-code": () => import("./hollywood-code.json"),
  "hollywood-blockbuster": () => import("./hollywood-blockbuster.json"),
  "f1-turbo-era": () => import("./f1-turbo-era.json"),
  "f1-bernie": () => import("./f1-bernie.json"),
  "f1-senna": () => import("./f1-senna.json"),
  cats: () => import("./cats.json"),
  "library-of-alexandria": () => import("./library-of-alexandria.json"),
  "coffee-houses": () => import("./coffee-houses.json"),
};

export async function loadScenarioNodes(id: string): Promise<CatenoNode[]> {
  const loader = NODE_LOADERS[id];
  if (!loader) return [];
  const mod = await loader();
  return mod.default as CatenoNode[];
}
