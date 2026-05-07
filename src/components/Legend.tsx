// Keyword legend — hidden by default, revealed on hover over the "TYPE" label.
// Desktop only: hidden on mobile via className.
import { useState } from "react";
import { motion } from "framer-motion";
import { TYPE_COLORS } from "../types";
import type { NodeType } from "../types";

const LEGEND_ENTRIES = Object.entries(TYPE_COLORS) as [NodeType, string][];

interface LegendProps {
  isOpen: boolean; // detail panel open — shift left to avoid overlap
}

export function Legend({ isOpen }: LegendProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      animate={{ right: isOpen ? 356 : 16 }}
      transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
      className="hidden md:flex flex-col items-end"
      style={{
        position: "fixed",
        bottom: 64,
        zIndex: 200,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Full legend — fades in on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: "rgba(10,10,10,0.88)",
          border: "1px solid #222",
          borderRadius: 8,
          padding: "9px 13px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          marginBottom: 6,
          pointerEvents: hovered ? "auto" : "none",
        }}
      >
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

      {/* "TYPE" trigger label — always visible, invites hover */}
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          fontFamily: "DM Sans, sans-serif",
          color: "#E8E3D5",
          opacity: 0.28,
          padding: "4px 2px",
          cursor: "default",
          userSelect: "none",
        }}
      >
        Type
      </div>
    </motion.div>
  );
}
