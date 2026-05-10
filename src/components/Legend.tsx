// Keyword legend — hover on desktop, tap on mobile.
// Desktop: hidden until hover over the "TYPE ↑" trigger.
// Mobile: hidden until tap on trigger; tap anywhere else dismisses.
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TYPE_COLORS } from "../types";
import type { NodeType } from "../types";
import { useIsMobile } from "../hooks/useIsMobile";

const LEGEND_ENTRIES = Object.entries(TYPE_COLORS) as [NodeType, string][];

interface LegendProps {
  isOpen: boolean; // detail panel open — shift left to avoid overlap
}

export function Legend({ isOpen }: LegendProps) {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);   // desktop
  const [tapped, setTapped] = useState(false);      // mobile

  const legendVisible = isMobile ? tapped : hovered;

  const legendPanel = (
    <motion.div
      animate={{ opacity: legendVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "rgba(10,10,10,0.88)",
        border: "1px solid #222",
        borderRadius: 8,
        padding: "9px 13px",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        marginBottom: 6,
        pointerEvents: legendVisible ? "auto" : "none",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {LEGEND_ENTRIES.map(([type, color]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{
              color: "#E8E3D5",
              opacity: 0.7,
              fontSize: 10,
              fontFamily: "DM Sans, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              lineHeight: 1,
            }}>
              {type}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const triggerLabel = (
    <motion.div
      animate={{ opacity: legendVisible ? 0.8 : 0.5 }}
      transition={{ duration: 0.15 }}
      style={{
        fontSize: 9,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        fontFamily: "DM Sans, sans-serif",
        color: "#E8E3D5",
        padding: "4px 2px",
        cursor: isMobile ? "pointer" : "default",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: 3,
      }}
    >
      <span>Type</span>
      <span style={{ letterSpacing: 0, opacity: 0.7 }}>↑</span>
    </motion.div>
  );

  if (isMobile) {
    if (isOpen) return null;
    return (
      <>
        {/* Dismiss overlay — transparent, full-screen, behind the legend */}
        <AnimatePresence>
          {tapped && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTapped(false)}
              style={{ position: "fixed", inset: 0, zIndex: 198 }}
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={{ right: 16 }}
          className="flex flex-col items-end"
          style={{ position: "fixed", bottom: 64, zIndex: 199 }}
          onClick={() => setTapped((t) => !t)}
        >
          {legendPanel}
          {triggerLabel}
        </motion.div>
      </>
    );
  }

  // Desktop — hover mechanic
  return (
    <motion.div
      animate={{ right: isOpen ? 356 : 16 }}
      transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
      className="hidden md:flex flex-col items-end"
      style={{ position: "fixed", bottom: 64, zIndex: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {legendPanel}
      {triggerLabel}
    </motion.div>
  );
}
