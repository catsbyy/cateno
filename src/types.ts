export type NodeType =
  | "trigger"
  | "pressure"
  | "catalyst"
  | "turning-point"
  | "collapse"
  | "consequence"
  | "shift"
  | "spark";

export interface RelatedScenarioLink {
  scenarioId: string;
  nodeId: string;
  label: string; // e.g. "Connects to Scientific Revolution"
  comingSoon?: boolean;
}

export interface CatenoNode {
  id: string;
  title: string;
  year: number;
  keyword: NodeType;
  summary: string;
  causeIds: string[];
  effectIds: string[];
  isAnchor?: boolean;
  isSeed?: boolean;
  wiki?: string; // Wikipedia article name, e.g. "Storming_of_the_Bastille"
  imageUrl?: string; // Direct image URL, ready to use as src
  relatedScenario?: RelatedScenarioLink;
}

export interface CatenoScenario {
  id: string;
  title: string;
  period: string;
  description: string;
  anchorId: string;
  nodes: CatenoNode[];
}

export const TYPE_COLORS: Record<NodeType, string> = {
  trigger: "#E63946",
  pressure: "#E9A84C",
  catalyst: "#F4D35E",
  "turning-point": "#06D6A0",
  collapse: "#8B5CF6",
  consequence: "#3B82F6",
  shift: "#10B981",
  spark: "#F97316",
};
