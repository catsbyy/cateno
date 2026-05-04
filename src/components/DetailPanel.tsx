import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CatenoNode } from "../types";
import { TYPE_COLORS } from "../types";
import { useIsMobile } from "../hooks/useIsMobile";

// ─── Wikipedia image fetch ────────────────────────────────────────────────────

const STOP_WORDS = new Set(["of", "the", "a", "an", "in", "at", "on", "and", "to", "for"]);

function toWikiTitle(text: string) {
  return text.replace(/\s+/g, "_");
}

async function fetchWikiThumbnail(title: string, signal: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { signal }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data.thumbnail?.source as string) ?? null;
  } catch {
    return null;
  }
}

function useWikiImage(node: CatenoNode | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!node) {
      setImageUrl(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      setLoading(true);
      setImageUrl(null);

      // Attempt 1: full title
      let url = await fetchWikiThumbnail(toWikiTitle(node.title), signal);

      // Attempt 2: title without stop words
      if (!url && !signal.aborted) {
        const filtered = node.title
          .split(" ")
          .filter((w) => !STOP_WORDS.has(w.toLowerCase()))
          .join("_");
        if (filtered !== toWikiTitle(node.title)) {
          url = await fetchWikiThumbnail(filtered, signal);
        }
      }

      // Attempt 3: first meaningful word only
      if (!url && !signal.aborted) {
        const firstWord = node.title.split(" ").find((w) => !STOP_WORDS.has(w.toLowerCase())) ?? node.title.split(" ")[0];
        url = await fetchWikiThumbnail(firstWord, signal);
      }

      if (!signal.aborted) {
        setImageUrl(url);
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [node?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return { imageUrl, loading };
}

// ─── Image header ─────────────────────────────────────────────────────────────

function WikiImageHeader({ imageUrl, loading, height, panelBg }: {
  imageUrl: string | null;
  loading: boolean;
  height: number;
  panelBg: string;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset loaded state when url changes; if already cached, mark loaded immediately
  useEffect(() => {
    setImgLoaded(false);
    // If the browser served from cache, onLoad already fired before React attached it
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [imageUrl]);

  // Show placeholder while loading; collapse if no image after load
  if (!loading && !imageUrl) return null;

  return (
    <div
      className="shrink-0 relative overflow-hidden"
      style={{ height, background: "#1a1a1a" }}
    >
      {imageUrl && (
        <img
          ref={imgRef}
          src={imageUrl}
          alt=""
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      )}
      {/* Gradient: transparent → panel background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 20%, ${panelBg} 100%)`,
        }}
      />
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
  onNodeClick: (id: string) => void;
  onClose: () => void;
  onChipClick: (id: string) => void;
}

const PANEL_BG = "#141414";

export function DetailPanel({ node, causeNodes, effectNodes, onClose, onChipClick }: DetailPanelProps) {
  const isMobile = useIsMobile();
  const color = node ? TYPE_COLORS[node.keyword] : "#ffffff";
  const { imageUrl, loading: imageLoading } = useWikiImage(node);

  if (isMobile) {
    return (
      <AnimatePresence>
        {node && (
          <>
            {/* Backdrop — tap to dismiss */}
            <motion.div
              key="backdrop"
              className="absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
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
              transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="shrink-0 flex justify-center pt-3 pb-1">
                <div className="w-9 h-1 rounded-full bg-[#444]" />
              </div>

              {/* Wikipedia image */}
              <WikiImageHeader imageUrl={imageUrl} loading={imageLoading} height={120} panelBg={PANEL_BG} />

              {/* Header */}
              <div className="shrink-0 px-5 pt-3 pb-4" style={{ borderBottom: "1px solid #222" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#E8E3D5]/35 text-[12px] font-sans tracking-wider">{node.year}</span>
                  <button
                    onClick={onClose}
                    aria-label="Close panel"
                    className="text-[#E8E3D5]/30 cursor-pointer leading-none text-lg w-10 h-10 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
                <h2 className="text-[#E8E3D5] text-[20px] font-serif leading-snug mb-2 font-bold">
                  {node.title}
                </h2>
                <span
                  className="inline-block text-[10px] font-sans px-2 py-[3px] rounded uppercase tracking-widest font-medium"
                  style={{ color, border: `1px solid ${color}`, opacity: 0.85 }}
                >
                  {node.keyword}
                </span>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto">
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
                  <div className="px-5 py-4">
                    <p className="text-[#E8E3D5]/30 text-[11px] font-sans uppercase tracking-widest mb-3">Led to</p>
                    <div className="flex flex-col gap-2">
                      {effectNodes.map((n) => (
                        <NodeChip key={n.id} node={n} onClick={onChipClick} />
                      ))}
                    </div>
                  </div>
                )}
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
          initial={{ x: 340, opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 340, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
          className="absolute top-0 right-0 h-full w-[340px] flex flex-col z-30"
          style={{
            background: PANEL_BG,
            borderLeft: "1px solid #252525",
            boxShadow: "-12px 0 40px rgba(0,0,0,0.55)",
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Wikipedia image */}
          <WikiImageHeader imageUrl={imageUrl} loading={imageLoading} height={160} panelBg={PANEL_BG} />

          {/* ── Header ── */}
          <div className="shrink-0 px-6 pt-5 pb-5" style={{ borderBottom: "1px solid #222" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#E8E3D5]/35 text-[12px] font-sans tracking-wider">{node.year}</span>
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

          {/* ── Scrollable body ── */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
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
              <div className="px-6 py-5">
                <p className="text-[#E8E3D5]/30 text-[11px] font-sans uppercase tracking-widest mb-3">Led to</p>
                <div className="flex flex-wrap gap-2">
                  {effectNodes.map((n) => (
                    <NodeChip key={n.id} node={n} onClick={onChipClick} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
