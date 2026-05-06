// Fixed overlay legend showing node type → colour mappings. Shifts left when the detail panel is open.
import { motion } from "framer-motion";
import { TYPE_COLORS } from "../types";
import type { NodeType } from "../types";

const LEGEND_ENTRIES = Object.entries(TYPE_COLORS) as [NodeType, string][];

interface LegendProps {
  isOpen: boolean;
}

export function Legend({ isOpen }: LegendProps) {
  return (
    <motion.div
      animate={{ right: isOpen ? 356 : 16 }}
      transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
      className="hidden md:block"
      style={{
        position: "fixed",
        bottom: 64,
        background: "rgba(10,10,10,0.88)",
        border: "1px solid #222",
        borderRadius: 8,
        padding: "9px 13px",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 200,
        pointerEvents: "none",
      }}
    >
      <p
        style={{
          color: "#E8E3D5",
          opacity: 0.28,
          fontSize: 9,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          fontFamily: "DM Sans, sans-serif",
          margin: "0 0 7px 0",
        }}
      >
        Type
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {LEGEND_ENTRIES.map(([type, color]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: "#E8E3D5",
                opacity: 0.5,
                fontSize: 10,
                fontFamily: "DM Sans, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                lineHeight: 1,
              }}
            >
              {type}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
