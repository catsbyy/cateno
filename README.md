# Cateno

A cause-and-effect history explorer. Pick a scenario, start at the anchor event, and follow the chain — forward into consequences, backward into causes.

Built with React, TypeScript, React Flow, and Tailwind CSS.

→ [cateno.app](https://cateno.app)

---

## Scenarios

Twenty-two curated scenarios, each with a number of interconnected events:

- **Fall of Rome** (100-600)
- **French Revolution** (1700-1803)
- **Scientific Revolution** (1200-1760)
- **Year Without a Summer** (1815-1820)
- **World War I** (1871-1933)
- **First Flight** (1485-1960)
- **The Silent Archive** — Age of Underwater Archaeology (1500 BC-2010)
- **The Last Templars** (1096-1500)
- **Mongol Conquests** (1100-1492)
- **The Polynesian Expansion** (1500 BC-1976)
- **The Voyages That Stopped** (960-500)
- **The Sale That Made America** (1697-1853)
- **The Oil That Lit the World** (900-2005)
- **How Napster Broke Music** (1877-2015)
- **The Flower That Invented Finance** (1500-1900)
- **The Poison They Chose** (1900-2010)
- **The Invention of the Teenager** (1890-1982)
- **Death and the Birth of Humanism** (1100-1520)
- **The Voyage That Connected the World** (1300-1602)
- **How a Patent Lawsuit Built Hollywood** (1891-1930)
- **The Postmaster Who Ran Hollywood** (1921-1968)
- **The Two Films That Ended Good Cinema** (1967-1995)

---

## Screenshots

![Cateno landing page — eight curated historical scenarios](screenshots/landing.png)

![The Silent Archive — full graph view showing all revealed nodes](screenshots/graph-full.png)

![Exploring the Titanic discovery — detail panel with Wikipedia image](screenshots/graph-panel.png)

<img src="screenshots/panel.png" width="360" alt="Detail panel — Vasa Sinks on Maiden Voyage">

---

## How it works

Each scenario is a directed graph of historical events stored as a JSON file. Every node has:

- A title, year, and one-paragraph summary
- A keyword type (`trigger`, `pressure`, `catalyst`, `turning-point`, `collapse`, `consequence`, `shift`, `spark`)
- Arrays of cause IDs and effect IDs linking it to other nodes
- Optional Wikipedia article name and image URL

The graph loads with 6 seed nodes visible. Clicking any node reveals its connected events and opens a detail panel. The `+N` badge on each node shows how many hidden connections remain.

---

## Tech stack

| Layer      | Choice                    |
| ---------- | ------------------------- |
| Framework  | React + Vite + TypeScript |
| Graph      | React Flow                |
| Animations | Framer Motion             |
| Styling    | Tailwind CSS              |
| Data       | Static JSON — no backend  |
| Analytics  | Vercel Analytics          |
| Hosting    | Vercel                    |

---

## Project structure

```
src/
  components/
    CatenoGraph.tsx      # React Flow canvas — node layout, edges, pan/zoom
    CatenoNode.tsx       # Individual node card with badge and keyword colour
    CatenoLogo.tsx       # Mark + wordmark SVG component
    DetailPanel.tsx      # Right-side / bottom-sheet event detail panel
    GraphView.tsx        # Graph + panel + timeline assembled
    Legend.tsx           # Keyword colour legend overlay
    ScenarioSelector.tsx # Landing page card grid
    TimelineBar.tsx      # Horizontal year timeline at the bottom
  hooks/
    useGraph.ts          # Visibility, focus, and connection state
    useIsMobile.ts       # Responsive breakpoint hook
  data/
    scenarios.ts         # SCENARIOS array — imports all JSON files
    fall-of-rome.json
    french-revolution.json
    scientific-revolution.json
    ...
  App.tsx                # Root — scenario selection vs graph view
  main.tsx               # Entry point + Analytics + SpeedInsights
  types.ts               # CatenoNode, CatenoScenario interfaces
  theme.tsx              # TYPE_COLORS, scenario gradients, SVG patterns
  constants.ts           # Layout constants, animation values
  index.css              # Global styles, font imports, React Flow overrides
```

---

## Adding a scenario

1. Create a JSON file in `src/data/` following the `CatenoNode` schema
2. Add it to the `SCENARIOS` array in `src/data/scenarios.ts`
3. Add a background colour and SVG pattern in `src/theme.tsx`

Each node must have:

- A unique `id` (kebab-case)
- `causeIds` and `effectIds` that reference other IDs in the same file
- Exactly one node with `isAnchor: true`
- Six nodes with `isSeed: true` (the anchor + 2–3 causes + 2–3 effects)

---

## Running locally

```bash
npm install
npm run dev
```

---

## License

MIT
