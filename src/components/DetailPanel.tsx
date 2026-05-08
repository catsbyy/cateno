// Slide-in panel showing full event details. Desktop: right sidebar. Mobile: bottom sheet.
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CatenoNode } from "../types";
import { TYPE_COLORS } from "../types";
import { useIsMobile } from "../hooks/useIsMobile";
import { PANEL_BG, PANEL_WIDTH } from "../constants";

const formatYear = (year: number) => (year < 0 ? `${Math.abs(year)} BC` : `${year}`);

// ─── Wikimedia thumbnail rewriter ─────────────────────────────────────────────
// Raw Wikimedia Commons URLs point to full-resolution files that can be 10 MB+
// (e.g. the Prise de la Bastille painting is 11.2 MB and causes a UI freeze).
// Rewrite them to use a pre-generated 500px thumbnail (≈ 70–150 KB).
//
// Wikimedia pre-generates thumbnails at specific widths (330px, 500px, etc.).
// We use 500px — it works for all tested images and looks sharp in a 340px panel.
// If the 500px thumbnail doesn't exist for an image, onError collapses the header.
//
// Pattern:  https://upload.wikimedia.org/wikipedia/commons/{a}/{ab}/{filename}
// Becomes:  https://upload.wikimedia.org/wikipedia/commons/thumb/{a}/{ab}/{filename}/500px-{filename}
const WIKI_COMMONS_RE = /^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/)([0-9a-f]\/[0-9a-f]{2}\/)(.+)$/i;

function toThumbnailUrl(url: string): string {
  if (!url || url.includes("/thumb/")) return url; // already a thumbnail
  const m = url.match(WIKI_COMMONS_RE);
  if (!m) return url; // not a Wikimedia Commons URL — use as-is
  const [, base, hash, filename] = m;
  return `${base}thumb/${hash}${filename}/500px-${filename}`;
}

// ─── Image header ─────────────────────────────────────────────────────────────

function NodeImageHeader({ node, height, panelBg }: { node: CatenoNode; height: number; panelBg: string }) {
  const src = node.imageUrl ? toThumbnailUrl(node.imageUrl) : null;

  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset all state whenever the source changes (node switched).
  useEffect(() => {
    setVisible(false);
    setFailed(false);
    setExpanded(false);
    // Handle already-cached images — onLoad won't fire again.
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setVisible(true);
    }
  }, [src]);

  if (!src || failed) return null;

  return (
    <motion.div
      className="shrink-0 relative overflow-hidden"
      animate={{ height: expanded ? height * 2 : height }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => setExpanded((e) => !e)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: expanded ? "zoom-out" : "zoom-in" }}
    >
      <img
        ref={imgRef}
        src={src}
        alt=""
        onLoad={() => setVisible(true)}
        onError={() => setFailed(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Fade into panel background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, ${panelBg} 100%)`,
          pointerEvents: "none",
        }}
      />
      {/* Expand / collapse affordance */}
      <span
        style={{
          position: "absolute",
          bottom: 8,
          right: 10,
          fontSize: 12,
          color: "#ffffff",
          opacity: hovered ? 0.9 : 0.5,
          transition: "opacity 0.15s ease",
          pointerEvents: "none",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {expanded ? "⤡" : "⤢"}
      </span>
    </motion.div>
  );
}

// ─── Wikipedia attribution link ───────────────────────────────────────────────

function WikiLink({ wiki, mobile }: { wiki: string; mobile?: boolean }) {
  const pad = mobile ? "px-5 py-4" : "px-6 py-4";
  return (
    <div className={pad} style={{ borderTop: "1px solid #1e1e1e" }}>
      <a
        href={`https://en.wikipedia.org/wiki/${wiki}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans hover:underline"
        style={{
          fontSize: 11,
          color: "#E8E3D5",
          opacity: 0.35,
          textDecoration: "none",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
      >
        ↗ Read more on Wikipedia
      </a>
    </div>
  );
}

// ─── Chip ────────────────────────────────────────────────────────────────────

function NodeChip({ node, onClick }: { node: CatenoNode; onClick: (id: string) => void }) {
  const color = TYPE_COLORS[node.keyword];
  return (
    <button
      onClick={() => onClick(node.id)}
      className="group text-left rounded px-2.5 py-1 text-[12px] font-sans leading-snug border transition-colors duration-150 hover:bg-white/5 cursor-pointer flex items-center gap-1.5 w-full md:w-auto min-h-[40px] md:min-h-0"
      style={{ borderColor: `${color}55`, color: "#E8E3D5CC" }}
    >
      <span className="flex-1">{node.title}</span>
      <span
        className="opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-150 shrink-0"
        style={{ color, fontSize: 10 }}
      >
        →
      </span>
    </button>
  );
}

// ─── Panel ───────────────────────────────────────────────────────────────────

interface DetailPanelProps {
  node: CatenoNode | null;
  causeNodes: CatenoNode[];
  effectNodes: CatenoNode[];
  onChipClick: (id: string) => void;
  onClose: () => void;
}

export function DetailPanel({ node, causeNodes, effectNodes, onClose, onChipClick }: DetailPanelProps) {
  const isMobile = useIsMobile();
  const color = node ? TYPE_COLORS[node.keyword] : "#ffffff";

  if (isMobile) {
    return (
      <AnimatePresence>
        {node && (
          <>
            {/* Backdrop — pointer-events: none so graph remains pannable above the sheet.
                Dismissal is handled by the ✕ button and the drag-handle tap below. */}
            <motion.div
              key="backdrop"
              className="absolute inset-0 z-20"
              style={{ pointerEvents: "none" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Bottom sheet */}
            <motion.aside
              key={node.id}
              className="absolute bottom-0 left-0 right-0 z-30 flex flex-col rounded-t-2xl overflow-hidden"
              style={{
                height: "55vh",
                background: PANEL_BG,
                borderTop: "1px solid #2a2a2a",
                boxShadow: "0 -12px 40px rgba(0,0,0,0.6)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Drag handle — tap to dismiss */}
              <div className="shrink-0 flex justify-center pt-3 pb-1 cursor-pointer" onClick={onClose}>
                <div className="w-9 h-1 rounded-full bg-[#444]" />
              </div>

              {/* Scrollable body — image + header + content all scroll together */}
              <div className="flex-1 overflow-y-auto" style={{ touchAction: "pan-y" }}>
                <NodeImageHeader node={node} height={120} panelBg={PANEL_BG} />

                <div className="px-5 pt-3 pb-4" style={{ borderBottom: "1px solid #222" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#E8E3D5]/35 text-[12px] font-sans tracking-wider">
                      {formatYear(node.year)}
                    </span>
                    <button
                      onClick={onClose}
                      aria-label="Close panel"
                      className="text-[#E8E3D5]/30 cursor-pointer leading-none text-lg w-10 h-10 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                  <h2 className="text-[#E8E3D5] text-[20px] font-serif leading-snug mb-2 font-bold">{node.title}</h2>
                  <span
                    className="inline-block text-[10px] font-sans px-2 py-[3px] rounded uppercase tracking-widest font-medium"
                    style={{ color, border: `1px solid ${color}`, opacity: 0.85 }}
                  >
                    {node.keyword}
                  </span>
                </div>
                <div className="px-5 py-4" style={{ borderBottom: "1px solid #1e1e1e" }}>
                  <p className="text-[#E8E3D5]/75 text-[15px] font-sans leading-[1.6]">{node.summary}</p>
                </div>

                {causeNodes.length > 0 && (
                  <div className="px-5 py-4" style={{ borderBottom: "1px solid #1e1e1e" }}>
                    <p className="text-[#E8E3D5]/30 text-[11px] font-sans uppercase tracking-widest mb-3">Caused by</p>
                    <div className="flex flex-col gap-2">
                      {causeNodes.map((n) => (
                        <NodeChip key={n.id} node={n} onClick={onChipClick} />
                      ))}
                    </div>
                  </div>
                )}

                {effectNodes.length > 0 && (
                  <div className="px-5 py-4" style={{ borderBottom: node.wiki ? "1px solid #1e1e1e" : "none" }}>
                    <p className="text-[#E8E3D5]/30 text-[11px] font-sans uppercase tracking-widest mb-3">Led to</p>
                    <div className="flex flex-col gap-2">
                      {effectNodes.map((n) => (
                        <NodeChip key={n.id} node={n} onClick={onChipClick} />
                      ))}
                    </div>
                  </div>
                )}

                {node.wiki && <WikiLink wiki={node.wiki} mobile />}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // ── Desktop: right-side panel ─────────────────────────────────────────────
  return (
    <AnimatePresence>
      {node && (
        <motion.aside
          key={node.id}
          initial={{ x: PANEL_WIDTH, opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: PANEL_WIDTH, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
          className={`absolute top-0 right-0 h-full w-[${PANEL_WIDTH}px] flex flex-col z-30`}
          style={{
            width: PANEL_WIDTH,
            background: PANEL_BG,
            borderLeft: "1px solid #252525",
            boxShadow: "-12px 0 40px rgba(0,0,0,0.55)",
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scrollable body — image + header + content all scroll together */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <NodeImageHeader node={node} height={160} panelBg={PANEL_BG} />

            <div className="px-6 pt-5 pb-5" style={{ borderBottom: "1px solid #222" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#E8E3D5]/35 text-[12px] font-sans tracking-wider">{formatYear(node.year)}</span>
                <button
                  onClick={onClose}
                  aria-label="Close panel"
                  className="text-[#E8E3D5]/30 hover:text-[#E8E3D5]/70 transition-colors duration-150 cursor-pointer leading-none text-lg"
                >
                  ✕
                </button>
              </div>
              <h2 className="text-[#E8E3D5] text-[20px] font-serif leading-snug mb-3" style={{ fontWeight: 400 }}>
                {node.title}
              </h2>
              <span
                className="inline-block text-[10px] font-sans px-2 py-[3px] rounded uppercase tracking-widest font-medium"
                style={{ color, border: `1px solid ${color}`, opacity: 0.85 }}
              >
                {node.keyword}
              </span>
            </div>

            <div className="px-6 py-5" style={{ borderBottom: "1px solid #1e1e1e" }}>
              <p className="text-[#E8E3D5]/75 text-[14px] font-sans leading-relaxed">{node.summary}</p>
            </div>

            {causeNodes.length > 0 && (
              <div className="px-6 py-5" style={{ borderBottom: "1px solid #1e1e1e" }}>
                <p className="text-[#E8E3D5]/30 text-[11px] font-sans uppercase tracking-widest mb-3">Caused by</p>
                <div className="flex flex-wrap gap-2">
                  {causeNodes.map((n) => (
                    <NodeChip key={n.id} node={n} onClick={onChipClick} />
                  ))}
                </div>
              </div>
            )}

            {effectNodes.length > 0 && (
              <div className="px-6 py-5" style={{ borderBottom: node.wiki ? "1px solid #1e1e1e" : "none" }}>
                <p className="text-[#E8E3D5]/30 text-[11px] font-sans uppercase tracking-widest mb-3">Led to</p>
                <div className="flex flex-wrap gap-2">
                  {effectNodes.map((n) => (
                    <NodeChip key={n.id} node={n} onClick={onChipClick} />
                  ))}
                </div>
              </div>
            )}

            {node.wiki && <WikiLink wiki={node.wiki} />}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
