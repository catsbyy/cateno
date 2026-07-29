// ─── Per-scenario background personality ──────────────────────────────────────
// All colours use the same dark, low-chroma range so patterns and graph nodes
// remain the visual focus. The gradient is derived from the centre-colour map,
// which prevents the flat card colour and graph background from drifting apart.

export const SCENARIO_BACKGROUND_COLOR = "#0D0D0D";

export const SCENARIO_CENTRE_COLORS: Record<string, string> = {
  "fall-of-rome": "#34240f",
  "french-revolution": "#35151d",
  "scientific-revolution": "#102044",
  wwi: "#232912",
  "year-without-a-summer": "#211b32",
  "wright-brothers": "#14233a",
  "underwater-archaeology": "#0d2a34",
  templars: "#332012",
  mongols: "#351a0d",
  polynesia: "#0c2d36",
  "zheng-he": "#0d2c25",
  "louisiana-purchase": "#1a2d12",
  whales: "#0a2139",
  napster: "#17153d",
  "tulip-mania": "#321b12",
  "leaded-gasoline": "#2a2914",
  "invention-of-teenager": "#32132a",
  "black-plague-renaissance": "#31131a",
  "age-of-exploration": "#183029",
  "hollywood-birth": "#30210f",
  "hollywood-code": "#251632",
  "hollywood-blockbuster": "#321717",
  "f1-turbo-era": "#3a1a08",
  "f1-bernie": "#25251f",
  "f1-senna": "#0c2b24",
  cats: "#2d2819",
  "emu-war": "#253014",
  "library-of-alexandria": "#2d240d",
  "coffee-houses": "#32180c",
  "kanye-west": "#261223",
  kyiv: "#10213b",
  "golden-age-piracy": "#071528",
  "trial-of-socrates": "#27210a",
  homer: "#231509",
  "mediterranean-summer": "#30200c",
  "suez-canal": "#16302e",
  "swimming-leisure": "#0b2335",
  "cholera-map": "#0c2230",
  "opium-empire": "#0e2919",
  "window-tax": "#292217",
  bedlam: "#1d1723",
  "daylight-saving-time": "#0e2232",
  "safety-pin": "#281328",
};

export function getScenarioCentreColor(scenarioId: string): string {
  return SCENARIO_CENTRE_COLORS[scenarioId] ?? SCENARIO_BACKGROUND_COLOR;
}

export function getScenarioGradient(scenarioId: string): string {
  const centreColor = getScenarioCentreColor(scenarioId);

  return `radial-gradient(ellipse at center, ${centreColor} 0%, ${SCENARIO_BACKGROUND_COLOR} 72%)`;
}
