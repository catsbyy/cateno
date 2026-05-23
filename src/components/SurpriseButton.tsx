// Navigates to a random node in a random scenario.
// Loads the scenario's node list on demand (lazy) then picks at random.
import { Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SCENARIO_META, loadScenarioNodes } from "../data/scenarios";
import { IconButton } from "./IconButton";

export function SurpriseButton() {
  const navigate = useNavigate();

  const handleSurpriseMe = async () => {
    const meta = SCENARIO_META[Math.floor(Math.random() * SCENARIO_META.length)];
    try {
      const nodes = await loadScenarioNodes(meta.id);
      if (nodes.length === 0) {
        navigate(`/${meta.id}`);
        return;
      }
      const node = nodes[Math.floor(Math.random() * nodes.length)];
      navigate(`/${meta.id}/${node.id}`);
    } catch {
      navigate(`/${meta.id}`);
    }
  };

  return (
    <IconButton
      icon={<Shuffle size={18} strokeWidth={2} aria-hidden />}
      onClick={handleSurpriseMe}
      tooltip="Surprise me"
    />
  );
}
