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
    period: "1900–2000",
    description:
      "In 1932, Australia sent soldiers and machine guns against migrating emus—and failed. How drought, settlement policy, military overconfidence, and remarkably resilient birds turned a pest-control operation into one of history's strangest defeats.",
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
      "In 1815, Mount Tambora erupted and disrupted the climate across the globe. How one volcano caused failed harvests, famine, migration, disease, and unexpected inventions and works of art from Frankenstein to the bicycle.",
    anchorId: "mount-tambora-eruption",
    anchorTitle: "Mount Tambora Erupts",
    nodeCount: 34,
    anchorYear: 1815,
    theme: "disaster",
  },
  {
    id: "cats",
    title: "They Chose Us",
    period: "10500 BC–2012",
    description:
      "Cats were not domesticated in the same way as most other animals; they moved into human settlements and made themselves useful. How grain stores, ships, religion, persecution, science, and the internet carried them from Near Eastern villages to nearly every corner of the world.",
    anchorId: "cats-self-domesticate",
    anchorTitle: "Cats Choose Us",
    nodeCount: 23,
    anchorYear: -7500,
    theme: "nature",
  },
  {
    id: "tulip-mania",
    title: "The Flower That Invented Finance",
    period: "1500–1954",
    description:
      "In the 1630s, rare tulips became the centre of an elaborate Dutch trading boom. How flowers, futures contracts, social status, and later mythmaking turned a brief market episode into the world's favourite story about financial madness.",
    anchorId: "tulip-futures-market",
    anchorTitle: "The Tavern Futures Market",
    nodeCount: 22,
    anchorYear: 1636,
    theme: "finance",
  },
  {
    id: "library-of-alexandria",
    title: "The Library That Burned Three Times",
    period: "400 BC–2002",
    description:
      "The Library of Alexandria became the ancient world's most ambitious attempt to collect and organise knowledge. How royal patronage, scholarship, war, religious conflict, and centuries of institutional decline created—and gradually erased—its legendary archive.",
    anchorId: "ptolemy-founds-library",
    anchorTitle: "The Library Is Founded",
    nodeCount: 34,
    anchorYear: -295,
    theme: "science",
  },
  {
    id: "napster",
    title: "How Napster Broke Music",
    period: "1877–2015",
    description:
      "In 1999, an eighteen-year-old programmer released a service that made recorded music instantly shareable. How compression, peer-to-peer networks, lawsuits, piracy, and streaming dismantled the music industry's old business model and replaced it with a new one.",
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
      "The teenager is not an timeless category but a modern social invention. How compulsory education, labour law, wartime mobilisation, postwar prosperity, music, film, and marketing created a distinct stage between childhood and adulthood.",
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
      "For centuries, whale products lit homes, lubricated machinery, and supplied a growing industrial economy. How commercial hunting drove whales toward extinction, petroleum helped replace whale oil, and conservation transformed humanity's relationship with the largest animals on Earth.",
    anchorId: "new-bedford-whaling-peak",
    anchorTitle: "New Bedford — The Whaling Capital of the World",
    nodeCount: 39,
    anchorYear: 1850,
    theme: "nature",
  },
  {
    id: "leaded-gasoline",
    title: "The Poison They Chose",
    period: "1900–2023",
    description:
      "In 1921, engineers promoted tetraethyl lead as a profitable solution to engine knock despite its known toxicity. How corporate power, weak regulation, scientific resistance, and decades of exposure spread lead around the world before governments finally removed it from fuel.",
    anchorId: "tetraethyl-lead-invented",
    anchorTitle: "Midgley Discovers Tetraethyl Lead",
    nodeCount: 30,
    anchorYear: 1921,
    theme: "science",
  },
  {
    id: "louisiana-purchase",
    title: "The Sale That Made America",
    period: "1697–1853",
    description:
      "In 1803, France sold the United States a vast territory for a fraction of its strategic value. How imperial war, the Haitian Revolution, diplomacy, exploration, forced removal, and continental expansion transformed a fragile republic into a continental power.",
    anchorId: "louisiana-purchase-signed",
    anchorTitle: "Louisiana Purchase Signed",
    nodeCount: 43,
    anchorYear: 1803,
    theme: "politics",
  },
  {
    id: "wright-brothers",
    title: "First Flight",
    period: "500 BC–1961",
    description:
      "In 1903, two bicycle mechanics achieved the first sustained, controlled powered flight. How centuries of failed ideas, careful experiments, competition, war, and engineering turned twelve seconds at Kitty Hawk into the beginning of the aviation age.",
    anchorId: "kitty-hawk-flight",
    anchorTitle: "First Flight at Kitty Hawk",
    nodeCount: 42,
    anchorYear: 1903,
    theme: "science",
  },
  {
    id: "french-revolution",
    title: "French Revolution",
    period: "1700–1803",
    description:
      "In 1789, financial crisis, hunger, political exclusion, and new ideas pushed France into revolution. How the fall of the Bastille led through reform, republic, terror, war, and reaction before Napoleon converted revolutionary upheaval into a new political order.",
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
      "The Western Roman Empire did not collapse in a single invasion or on a single day. How military pressure, civil war, taxation, demographic change, political fragmentation, and adaptation dismantled imperial rule while Roman institutions survived in new forms.",
    anchorId: "romulus-augustulus-deposed",
    anchorTitle: "Romulus Augustulus Deposed",
    nodeCount: 44,
    anchorYear: 476,
    theme: "war",
  },
  {
    id: "wwi",
    title: "World War I",
    period: "1871–1933",
    description:
      "In 1914, the assassination of Archduke Franz Ferdinand triggered a crisis among heavily armed and tightly allied empires. How thirty-seven days of escalation produced industrial warfare, mass death, revolution, redrawn borders, and the unstable peace that followed.",
    anchorId: "assassination-franz-ferdinand",
    anchorTitle: "Assassination of Franz Ferdinand",
    nodeCount: 59,
    anchorYear: 1914,
    theme: "war",
  },
  {
    id: "scientific-revolution",
    title: "Scientific Revolution",
    period: "1200–1760",
    description:
      "Between the late medieval world and the Enlightenment, European scholars changed how knowledge itself was produced. How observation, mathematics, printing, instruments, experiment, and conflict with inherited authority created the foundations of modern science.",
    anchorId: "newton-principia",
    anchorTitle: "Newton's Principia Mathematica",
    nodeCount: 35,
    anchorYear: 1687,
    theme: "science",
  },
  {
    id: "black-plague-renaissance",
    title: "Death and the Birth of Humanism",
    period: "1100–1500",
    description:
      "The Black Death killed a vast share of Europe's population and shattered established social and religious assumptions. How demographic collapse, inherited wealth, labour scarcity, classical learning, and new forms of patronage helped create the culture later called the Renaissance.",
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
      "European attempts to reach Asian trade routes by sea connected continents that had long developed apart. How navigation, conquest, disease, forced labour, ecological exchange, and commerce created the first truly global system at catastrophic human cost.",
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
      "In the thirteenth century, the Mongols built the largest contiguous land empire in history. How conquest, mobility, administration, trade, technology transfer, and disease made their empire both extraordinarily destructive and unexpectedly connective.",
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
      "In the early fifteenth century, Zheng He led fleets larger and more capable than any others then sailing the oceans. How imperial ambition sent Ming China across the Indian Ocean—and how political priorities later ended the voyages and erased much of their institutional legacy.",
    anchorId: "zheng-he-first-voyage",
    anchorTitle: "Zheng He Sets Sail",
    nodeCount: 33,
    anchorYear: 1405,
    theme: "politics",
  },
  {
    id: "templars",
    title: "The Last Templars",
    period: "1099–1907",
    description:
      "The Knights Templar grew from a crusading order into a wealthy transnational institution. How war, finance, royal debt, political prosecution, and legend led from their rise in Jerusalem to the mass arrests of 1307 and centuries of myth afterward.",
    anchorId: "friday-13th-arrests",
    anchorTitle: "Friday the 13th — Mass Arrest",
    nodeCount: 33,
    anchorYear: 1307,
    theme: "finance",
  },
  {
    id: "polynesia",
    title: "The Polynesian Expansion",
    period: "1500 BC–1976",
    description:
      "Polynesian navigators settled islands across an oceanic region larger than any continent without modern instruments. How stars, swells, ecology, oral knowledge, migration, and isolation produced one of humanity's greatest expansions—and some of its most fragile societies.",
    anchorId: "austronesian-reach-tonga-samoa",
    anchorTitle: "Polynesians Settle Tonga & Samoa",
    nodeCount: 31,
    anchorYear: -900,
    theme: "culture",
  },
  {
    id: "underwater-archaeology",
    title: "The Silent Archive",
    period: "1500 BC–2010",
    description:
      "The seabed preserves ships, cities, cargoes, and landscapes that disappeared from the surface world. How diving technology, excavation methods, conservation, engineering, and landmark discoveries turned underwater exploration into a scientific discipline.",
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
      "Thomas Edison's patent trust tried to control who could make and exhibit films in the United States. How legal pressure, independent producers, cheap land, reliable sunlight, and migration to California helped turn Los Angeles into the centre of global cinema.",
    anchorId: "edison-trust-collapses",
    anchorTitle: "The Trust Is Broken",
    nodeCount: 17,
    anchorYear: 1915,
    theme: "culture",
  },
  {
    id: "hollywood-code",
    title: "The Postmaster Who Ran Hollywood",
    period: "1921–1968",
    description:
      "For more than three decades, the Production Code governed what American films could show or say. How scandal, religious pressure, industry self-censorship, antitrust law, television, and changing audiences built the code—and then made it impossible to enforce.",
    anchorId: "hays-code-adopted",
    anchorTitle: "The Production Code",
    nodeCount: 16,
    anchorYear: 1934,
    theme: "culture",
  },
  {
    id: "hollywood-blockbuster",
    title: "The Two Films That Ended Good Cinema",
    period: "1967–1995",
    description:
      "In the 1970s, Jaws and Star Wars proved that a single heavily marketed film could dominate the box office. How studios moved from director-led experimentation toward franchises, opening weekends, saturation advertising, and the blockbuster economy that still shapes Hollywood.",
    anchorId: "jaws-changes-everything",
    anchorTitle: "Jaws — The First Blockbuster",
    nodeCount: 16,
    anchorYear: 1975,
    theme: "culture",
  },
  {
    id: "f1-turbo-era",
    title: "The Arms Race That Nearly Destroyed F1",
    period: "1966–1990",
    description:
      "Renault's turbocharged engine opened a technical loophole that triggered an unprecedented Formula One arms race. How manufacturers, extreme boost pressure, rising costs, fragile cars, and regulation pushed power toward 1,500 horsepower before turbos were banned.",
    anchorId: "renault-turbo-debuts",
    anchorTitle: "Renault's Yellow Teapot",
    nodeCount: 18,
    anchorYear: 1977,
    theme: "science",
  },
  {
    id: "f1-bernie",
    title: "How a Used Car Dealer Built a $6 Billion Empire",
    period: "1970–2017",
    description:
      "In the 1970s, Formula One was a loose collection of teams with little collective commercial power. How Bernie Ecclestone organised the constructors, centralised television rights, negotiated with circuits, and turned a dangerous racing series into a multibillion-dollar business.",
    anchorId: "ecclestone-takes-foca",
    anchorTitle: "Bernie Ecclestone Takes Control",
    nodeCount: 15,
    anchorYear: 1972,
    theme: "finance",
  },
  {
    id: "f1-senna",
    title: "The Weekend That Changed Everything",
    period: "1950–2022",
    description:
      "The 1994 San Marino Grand Prix forced Formula One to confront risks it had long treated as unavoidable. How the deaths of Roland Ratzenberger and Ayrton Senna accelerated changes in circuits, cars, medicine, regulation, and safety culture across the sport.",
    anchorId: "san-marino-gp-1994",
    anchorTitle: "The Weekend at Imola",
    nodeCount: 22,
    anchorYear: 1994,
    theme: "culture",
  },
  {
    id: "coffee-houses",
    title: "The Drink That Invented Conversation",
    period: "1400–2004",
    description:
      "Coffee houses created a new kind of public space built around sobriety, stimulation, and conversation. How an Ottoman drink travelled into Europe and helped organise news, finance, science, politics, and the institutions that grew from repeated meetings over coffee.",
    anchorId: "first-ottoman-coffeehouse",
    anchorTitle: "Constantinople's Coffee Houses",
    nodeCount: 24,
    anchorYear: 1554,
    theme: "culture",
  },
  {
    id: "kyiv",
    title: "The City That Made the Slavic World",
    period: "482–1991",
    description:
      "Kyiv has repeatedly stood at the centre of competing states, religions, empires, and national projects. How trade, the conversion of Kyivan Rus, invasion, imperial rule, revolution, war, and cultural revival shaped one of Eastern Europe's oldest capitals.",
    anchorId: "volodymyr-baptism-988",
    anchorTitle: "The Baptism of Kyiv",
    anchorYear: 988,
    nodeCount: 32,
    theme: "culture",
  },
  {
    id: "window-tax",
    title: "Daylight Robbery",
    period: "1690–1900",
    description:
      "In 1696, England began taxing buildings partly by the number of their windows. How a seemingly simple property tax encouraged people to block daylight, worsened living conditions, provoked resistance, and survived for more than a century and a half.",
    anchorId: "window-tax-introduced",
    anchorTitle: "Window Tax Introduced",
    nodeCount: 16,
    anchorYear: 1696,
    theme: "politics",
  },
  {
    id: "daylight-saving-time",
    title: "The Policy Nobody Can Kill",
    period: "1700–2026",
    description:
      "Daylight saving time began as an attempt to shift human schedules toward seasonal daylight. How satire, lobbying, wartime fuel policy, inconsistent adoption, health research, and political inertia created a clock-changing system that governments repeatedly promise—but fail—to abolish.",
    anchorId: "germany-introduces-dst",
    anchorTitle: "Germany Introduces DST",
    nodeCount: 19,
    anchorYear: 1916,
    theme: "politics",
  },
  {
    id: "safety-pin",
    title: "Three Hours, $15, and 170 Years",
    period: "1200 BC–2020",
    description:
      "In 1849, Walter Hunt bent a piece of wire into the modern safety pin and sold the patent to pay a small debt. How a modest invention moved through mass manufacturing, domestic life, emergency repair, punk fashion, and political symbolism for more than a century.",
    anchorId: "hunt-invents-safety-pin",
    anchorTitle: "Hunt Invents the Safety Pin",
    nodeCount: 17,
    anchorYear: 1849,
    theme: "culture",
  },
  {
    id: "bedlam",
    title: "The House of Madness",
    period: "1200–2000",
    description:
      "Bethlem Royal Hospital became both the world's oldest surviving psychiatric institution and a byword for chaos. How confinement, public spectacle, medical reform, asylum expansion, deinstitutionalisation, and changing ideas of mental illness repeatedly reshaped the treatment of patients.",
    anchorId: "lunacy-act-1845",
    anchorTitle: "The Lunacy Act",
    nodeCount: 28,
    anchorYear: 1845,
    theme: "science",
  },
  {
    id: "kanye-west",
    title: "The Most Cancelled Man in Music History",
    period: "1990–2026",
    description:
      "Kanye West reshaped hip-hop, pop production, celebrity fashion, and the economics of personal influence. How artistic innovation, provocation, business power, public scandal, commercial collapse, and enduring audience loyalty reveal the unstable machinery of modern fame.",
    anchorId: "college-dropout-released",
    anchorTitle: "The College Dropout",
    nodeCount: 26,
    anchorYear: 2004,
    theme: "culture",
  },
  {
    id: "cholera-map",
    title: "The Map That Saved a Million Lives",
    period: "1800–1997",
    description:
      "In 1854, John Snow mapped cholera deaths around London's Broad Street pump to expose a pattern others could not see. How visual evidence, epidemiology, statistics, smoking research, and the Challenger disaster show that data matters only when institutions are willing to understand it.",
    anchorId: "snow-maps-broad-street",
    anchorTitle: "The Map",
    anchorYear: 1854,
    nodeCount: 23,
    theme: "science",
  },
  {
    id: "opium-empire",
    title: "The Drug That Built an Empire and Destroyed Another",
    period: "1700–1997",
    description:
      "Britain used Indian opium to reverse its trade deficit with China and defended that commerce by force. How monopoly, addiction, war, unequal treaties, rebellion, and the transfer of Hong Kong shaped both the British Empire and modern Chinese historical memory.",
    anchorId: "east-india-company-opium-monopoly",
    anchorTitle: "The Opium Monopoly",
    anchorYear: 1773,
    nodeCount: 25,
    theme: "politics",
  },
  {
    id: "mediterranean-summer",
    title: "How the Rich Learned to Worship the Sun",
    period: "1700–1975",
    description:
      "European elites once avoided the sun because pale skin signalled wealth and leisure. How medicine, railways, fashion, paid holidays, mass tourism, and changing ideas of health transformed the Mediterranean coast—and turned tanning from stigma into aspiration and then risk.",
    anchorId: "chanel-invents-the-tan",
    anchorTitle: "Chanel Steps Off a Yacht",
    nodeCount: 19,
    anchorYear: 1923,
    theme: "culture",
  },
  {
    id: "suez-canal",
    title: "The Ditch That Ran the World",
    period: "600 BC–1967",
    description:
      "The Suez Canal shortened the sea route between Europe and Asia and became one of the world's most strategic waterways. How engineering, imperial finance, occupation, nationalism, war, and decolonisation turned a narrow channel through Egypt into a test of global power.",
    anchorId: "suez-canal-opens",
    anchorTitle: "The Canal Opens",
    nodeCount: 20,
    anchorYear: 1869,
    theme: "politics",
  },
  {
    id: "swimming-leisure",
    title: "The Beach Was Not Always a Holiday",
    period: "1700–1975",
    description:
      "The modern beach holiday emerged from a time when most people neither swam for pleasure nor exposed themselves to the sun. How medical advice, railways, lifesaving, swimwear reform, war, and paid leave transformed the seaside into a mass leisure destination.",
    anchorId: "sea-bathing-declared-medicinal",
    anchorTitle: "The Doctor Says Go in the Sea",
    nodeCount: 16,
    anchorYear: 1750,
    theme: "culture",
  },
  {
    id: "trial-of-socrates",
    title: "The Death That Produced More Philosophy Than Any Life",
    period: "450 BC–1929",
    description:
      "In 399 BC, an Athenian jury condemned Socrates to death for impiety and corrupting the young. How political trauma, philosophical defiance, Plato's dialogues, Aristotle's teaching, and later criticism turned one civic trial into a foundation of Western intellectual history.",
    anchorId: "trial-of-socrates",
    anchorTitle: "The Trial",
    nodeCount: 19,
    anchorYear: -399,
    theme: "science",
  },
  {
    id: "homer",
    title: "The Blind Poet Who Never Existed",
    period: "1200 BC–1960",
    description:
      "The Iliad and Odyssey emerged from an oral tradition long before they became written texts. How travelling singers, formulaic composition, archaeology at Troy, comparative fieldwork, and the unresolved identity of Homer changed what it means to call a work an author’s creation.",
    anchorId: "iliad-odyssey-written-down",
    anchorTitle: "Homer Puts Down the Lyre",
    nodeCount: 19,
    anchorYear: -750,
    theme: "culture",
  },
  {
    id: "golden-age-piracy",
    title: "The Criminals Europe Created",
    period: "1243–2008",
    description:
      "European states spent centuries licensing private violence at sea and then criminalised the same sailors when wars ended. How privateering, unemployment, colonial trade, naval suppression, trials, and popular literature created both the historical pirate and the legend that replaced him.",
    anchorId: "treaty-of-utrecht-1713",
    anchorTitle: "The Peace That Created Pirates",
    nodeCount: 30,
    anchorYear: 1713,
    theme: "war",
  },
];

// ─── Dynamic node loaders ──────────────────────────────────────────────────────
// Each import() becomes a separate Vite chunk — scenario JSON is never included
// in the initial bundle. All files load only when their scenario is opened.

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
  "kanye-west": () => import("./kanye-west.json"),
  kyiv: () => import("./kyiv.json"),
  bedlam: () => import("./bedlam.json"),
  "window-tax": () => import("./window-tax.json"),
  "daylight-saving-time": () => import("./daylight-saving-time.json"),
  "safety-pin": () => import("./safety-pin.json"),
  "golden-age-piracy": () => import("./golden-age-piracy.json"),
  "trial-of-socrates": () => import("./trial-of-socrates.json"),
  homer: () => import("./homer.json"),
  "mediterranean-summer": () => import("./mediterranean-summer.json"),
  "suez-canal": () => import("./suez-canal.json"),
  "swimming-leisure": () => import("./swimming-leisure.json"),
  "cholera-map": () => import("./cholera-map.json"),
  "opium-empire": () => import("./opium-empire.json"),
};

export async function loadScenarioNodes(id: string): Promise<CatenoNode[]> {
  const loader = NODE_LOADERS[id];
  if (!loader) return [];
  const mod = await loader();
  return mod.default as CatenoNode[];
}
