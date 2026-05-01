import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { TYPE_COLORS } from '../types';
import type { NodeType } from '../types';

export interface CatenoNodeData {
  title: string;
  year: number;
  keyword: NodeType;
  isAnchor?: boolean;
  isFocused?: boolean;
  isDimmed?: boolean;
}

// Resting: 160×60   Focused: 190×90
const W_REST = 160;
const H_REST = 60;
const W_FOCUS = 190;
const H_FOCUS = 90;

function CatenoNodeComponent({ data }: NodeProps) {
  const { title, year, keyword, isFocused = false, isDimmed = false } =
    data as CatenoNodeData;
  const color = TYPE_COLORS[keyword];

  return (
    // Outer shell — fixed size so React Flow's layout never shifts
    <div style={{ width: W_REST, height: H_REST, position: 'relative' }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, width: 0, height: 0, minWidth: 0, minHeight: 0 }}
      />

      {/* Visual card — expands from centre, floats above siblings when focused */}
      <motion.div
        style={{
          borderColor: color,
          position: 'absolute',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          zIndex: isFocused ? 20 : 1,
        }}
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: isDimmed ? 0.3 : 1,
          width: isFocused ? W_FOCUS : W_REST,
          height: isFocused ? H_FOCUS : H_REST,
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="rounded-md border bg-[#1C1C1C] px-3 py-2 flex flex-col justify-center gap-1.5 overflow-hidden cursor-pointer"
      >
        <p className="text-[#E8E3D5] text-[13px] font-medium leading-snug font-sans m-0 select-none">
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
              <span className="text-[#E8E3D5]/45 text-[11px] font-sans select-none">
                {year}
              </span>
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
