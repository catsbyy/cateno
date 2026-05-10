import { AnimatePresence, motion } from "framer-motion";

const HINTS = [
  "Click any node to explore its connections",
  "+N shows how many new events will be revealed",
  "Browser ← goes back to the previous node",
  "Faint background tint means you haven't explored that node yet",
  "TYPE ↑ in the corner shows event categories",
  "Reveal all or Reset in the timeline bar",
];

function LampIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden style={{ flexShrink: 0, marginTop: 2 }}>
      <path
        d="M7 1.5C4.79 1.5 3 3.29 3 5.5c0 1.37.69 2.58 1.75 3.3V10a.5.5 0 0 0 .5.5h3.5a.5.5 0 0 0 .5-.5V8.8C10.31 8.08 11 6.87 11 5.5c0-2.21-1.79-4-4-4Z"
        stroke="#E8E3D5"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M5.5 12h3" stroke="#E8E3D5" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
      <path d="M6 10.5v-2M8 10.5v-2" stroke="#E8E3D5" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

interface OnboardingHintProps {
  open: boolean;
  onClose: () => void;
}

export function OnboardingHint({ open, onClose }: OnboardingHintProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            maxWidth: 420,
            width: "calc(100% - 80px)", // leave room for the ? button on the left
            background: "#1a1a1a",
            border: "1px solid #2e2e2e",
            borderRadius: 12,
            padding: "12px 16px",
            cursor: "pointer",
          }}
        >
          {/* Dismiss button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Dismiss hint"
            style={{
              position: "absolute",
              top: 8,
              right: 10,
              background: "none",
              border: "none",
              color: "#E8E3D5",
              opacity: 0.4,
              fontSize: 14,
              lineHeight: 1,
              cursor: "pointer",
              padding: 2,
            }}
          >
            ×
          </button>

          {/* Icon + hint lines */}
          <div style={{ display: "flex", gap: 10, paddingRight: 20 }}>
            <LampIcon />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {HINTS.map((line) => (
                <div key={line} style={{ display: "flex", gap: 7, alignItems: "baseline" }}>
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 13,
                      color: "#E8E3D5",
                      opacity: 0.35,
                      lineHeight: 1.5,
                      flexShrink: 0,
                    }}
                  >
                    ·
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 13,
                      color: "#E8E3D5",
                      opacity: 0.7,
                      lineHeight: 1.5,
                    }}
                  >
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
