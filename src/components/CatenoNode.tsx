// Individual event card rendered inside React Flow. Expands from centre on focus.
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { TYPE_COLORS } from "../types";
import type { NodeType } from "../types";
import { NODE_W, NODE_H, W_FOCUS, H_FOCUS } from "../constants";

export interface CatenoNodeData {
  title: string;
  year: number;
  keyword: NodeType;
  isAnchor?: boolean;
  isSeed?: boolean;
  isFocused?: boolean;
  isDimmed?: boolean;
  hiddenCount?: number;
}

function CatenoNodeComponent({ data }: NodeProps) {
  const {
    title,
    year,
    keyword,
    isAnchor = false,
    isSeed = false,
    isFocused = false,
    isDimmed = false,
    hiddenCount = 0,
  } = data as unknown as CatenoNodeData;
  const color = TYPE_COLORS[keyword];

  return (
    // Outer shell — fixed NODE_W×NODE_H so React Flow's layout never shifts.
    // zIndex here ensures the expanded card floats above neighbours.
    <div
      style={{
        width: NODE_W,
        height: NODE_H,
        position: "relative",
        zIndex: isFocused ? 50 : 1,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, width: 0, height: 0, minWidth: 0, minHeight: 0 }}
      />

      {/* Hidden-connections badge — top-right corner */}
      <AnimatePresence>
        {hiddenCount > 0 && !isDimmed && (
          <motion.div
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              background: color,
              color: "#0D0D0D",
              fontSize: 9,
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingInline: 4,
              zIndex: 60,
              pointerEvents: "none",
              boxShadow: `0 0 6px ${color}88`,
            }}
          >
            +{hiddenCount}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Anchor pulsing ring — "start here" affordance */}
      {isAnchor && !isDimmed && (
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            borderRadius: 8,
            border: `1.5px solid ${color}`,
            pointerEvents: "none",
          }}
          initial={{ width: NODE_W + 6, height: NODE_H + 6, opacity: 0.4 }}
          animate={{ width: NODE_W + 24, height: NODE_H + 24, opacity: 0 }}
          transition={{
            duration: 7,
            ease: "easeOut",
            repeat: 0,
          }}
        />
      )}

      {/* Visual card — expands from centre, floats above siblings when focused */}
      <motion.div
        style={{
          borderColor: color,
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          zIndex: isFocused ? 50 : 1,
          // Seed nodes get a faint type-colour halo to hint they're explorable
          boxShadow: isSeed && !isFocused && !isDimmed ? `0 0 10px ${color}2e` : "none",
        }}
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: isDimmed ? 0.3 : 1,
          width: isFocused ? W_FOCUS : NODE_W,
          height: isFocused ? H_FOCUS : NODE_H,
        }}
        transition={{
          scale:   { duration: 0.48, ease: "easeOut" },
          opacity: { duration: 0.4,  ease: "easeOut" },
          width:   { duration: 0.38, ease: "easeOut" },
          height:  { duration: 0.38, ease: "easeOut" },
        }}
        className="rounded-md border bg-[#1C1C1C] px-3 py-2.5 flex flex-col justify-center gap-2 overflow-hidden cursor-pointer"
      >
        <p
          className="text-[#E8E3D5] text-[12px] font-medium font-sans m-0 select-none line-clamp-2"
          style={{ lineHeight: "1.4", wordBreak: "break-word" }}
        >
          {title}
        </p>

        <AnimatePresence>
          {isFocused && (
            <motion.div
              key="meta"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.16, delay: 0.08 }}
              className="flex items-center gap-2"
            >
              <span className="text-[#E8E3D5]/45 text-[11px] font-sans select-none">{year}</span>
              <span
                className="text-[10px] font-sans px-1.5 py-[2px] rounded font-medium uppercase tracking-widest select-none"
                style={{
                  color,
                  border: `1px solid ${color}`,
                  opacity: 0.85,
                }}
              >
                {keyword}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, width: 0, height: 0, minWidth: 0, minHeight: 0 }}
      />
    </div>
  );
}

export const CatenoNodeRenderer = memo(CatenoNodeComponent);
