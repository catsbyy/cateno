import { useMemo } from 'react';
import type { CatenoScenario } from '../types';
import { TYPE_COLORS } from '../types';

function parsePeriod(period: string): [number, number] {
  const nums = period.match(/\d+/g)?.map(Number) ?? [];
  if (nums.length >= 2) return [nums[0], nums[nums.length - 1]];
  return [0, 100];
}

interface TimelineBarProps {
  scenario: CatenoScenario;
  visibleNodeIds: Set<string>;
  focusedNodeId: string | null;
  onNodeClick: (id: string) => void;
}

export function TimelineBar({
  scenario,
  visibleNodeIds,
  focusedNodeId,
  onNodeClick,
}: TimelineBarProps) {
  const [periodStart, periodEnd] = parsePeriod(scenario.period);
  const periodSpan = periodEnd - periodStart || 1;

  const visibleNodes = useMemo(
    () => scenario.nodes.filter((n) => visibleNodeIds.has(n.id)),
    [scenario, visibleNodeIds],
  );

  return (
    <div
      className="shrink-0 flex items-center px-6 gap-4 select-none"
      style={{
        height: 44,
        borderTop: '1px solid #1a1a1a',
        background: '#0A0A0A',
      }}
    >
      {/* Start year */}
      <span className="text-[#E8E3D5]/25 text-[11px] font-sans tabular-nums whitespace-nowrap">
        {periodStart}
        {scenario.period.includes('AD') ? ' AD' : ''}
      </span>

      {/* Track */}
      <div className="flex-1 relative" style={{ height: 2, background: '#1e1e1e', borderRadius: 1 }}>
        {visibleNodes.map((node) => {
          const pct = ((node.year - periodStart) / periodSpan) * 100;
          const isFocused = node.id === focusedNodeId;
          const color = TYPE_COLORS[node.keyword];

          return (
            <button
              key={node.id}
              onClick={() => onNodeClick(node.id)}
              title={`${node.title} (${node.year})`}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 cursor-pointer"
              style={{
                left: `${Math.min(Math.max(pct, 0), 100)}%`,
                width: isFocused ? 8 : 6,
                height: isFocused ? 8 : 6,
                borderRadius: '50%',
                background: isFocused ? color : '#333',
                border: isFocused ? `2px solid ${color}` : '1px solid #444',
                boxShadow: isFocused ? `0 0 6px ${color}88` : 'none',
                transform: `translateX(-50%) translateY(-50%) scale(${isFocused ? 1.3 : 1})`,
                zIndex: isFocused ? 10 : 1,
              }}
            />
          );
        })}
      </div>

      {/* End year */}
      <span className="text-[#E8E3D5]/25 text-[11px] font-sans tabular-nums whitespace-nowrap">
        {periodEnd}
        {scenario.period.includes('AD') ? ' AD' : ''}
      </span>

      {/* Node count */}
      <span className="text-[#E8E3D5]/20 text-[10px] font-sans whitespace-nowrap">
        {visibleNodes.length} / {scenario.nodes.length} events
      </span>
    </div>
  );
}
