import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraphHeader } from "./GraphHeader";
import { Footer } from "./Footer";

function fadeUpProps(delayMs: number) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: delayMs / 1000, ease: "easeOut" as const },
  };
}

export function About() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "radial-gradient(ellipse at center, #1c1005 0%, #0D0D0D 70%)",
        minHeight: "100vh",
      }}
    >
      <GraphHeader title="About" period="" onBack={() => navigate("/")} />

      <div className="w-full flex flex-col items-center px-4 py-12 md:py-16 pb-0">
        <div style={{ width: "100%", maxWidth: 960 }}>
          {/* Title */}
          <motion.h1
            {...fadeUpProps(0)}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 52,
              fontWeight: 400,
              color: "#E8E3D5",
              margin: "0 0 32px",
              lineHeight: 1.15,
              textAlign: "center",
            }}
          >
            About Cateno
          </motion.h1>

          {/* How it works */}
          <Section delay={250}>
            <SectionHeader>How it works</SectionHeader>
            <Body>
              Each scenario is a directed graph of historical events. Every node represents one event: a battle, an
              invention, a decision, a disaster. Nodes are connected by causal links — arrows that say "this led to
              that."
            </Body>
            <Body>
              You start at an anchor event — the pivotal moment the scenario is built around. Six connected events are
              visible from the start. Clicking any node reveals what caused it and what it led to, expanding the graph
              one layer at a time. The <Code>+N</Code> badge shows how many hidden connections each node still holds.
            </Body>
            <Body>
              The graph is organised by causal depth, not strict chronology. The anchor sits at the centre. Causes
              extend to the left, consequences to the right. This sometimes means a later event appears left of an
              earlier one — because causality doesn't always follow the calendar.
            </Body>
          </Section>

          {/* How scenarios are built */}
          <Section delay={400}>
            <SectionHeader>How scenarios are built</SectionHeader>
            <Body>
              Each scenario contains dozens of interconnected nodes. Every node has a title, a year, a one-paragraph
              summary, and a keyword that describes its role in the chain — trigger, catalyst, turning point, collapse,
              and others. Most nodes include a Wikipedia link for further reading and a historical image — though
              Wikipedia's breadth means the linked article sometimes covers more ground than the node itself.
            </Body>
            <Body>
              The main filter when choosing which events to include is causal weight — does removing this event break
              the chain, or is it just context? If it's just context, it usually gets cut.
            </Body>
            <Body>
              Scenarios are researched and structured with AI assistance. History is complex and mistakes happen — if
              you spot an error or a missing connection, every node has a "Suggest a correction" button. All feedback is
              read and very welcomed.
            </Body>
            <Body>Built with React, TypeScript, and React Flow. No backend, no accounts, no ads.</Body>
            <Body>
              Have an idea for a new scenario?{" "}
              <a
                href="https://tally.so/r/QKOxJ8"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgba(232,227,213,0.7)",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(200,160,80,0.45)",
                  textUnderlineOffset: 3,
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(232,227,213,0.95)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,227,213,0.7)")}
              >
                → Suggest one here
              </a>
            </Body>
          </Section>

          {/* The design */}
          <Section delay={550}>
            <SectionHeader>The design</SectionHeader>
            <Body>
              Cateno is designed to feel like a museum exhibition, not a database. Dark backgrounds, serif typography,
              progressive revelation — the goal is to make exploration feel like wandering through rooms, not querying a
              spreadsheet.
            </Body>
            <Body>
              Each scenario has its own colour and pattern. Fall of Rome glows amber. The Polynesian Expansion breathes
              Pacific teal. The Knights Templar burns in desert ochre. The colours aren't decorative — they're meant to
              give each scenario a distinct atmosphere before you read a single word.
            </Body>
            <Body>
              The graph reveals itself gradually by design. Seeing everything at once would turn history into a diagram.
              Discovering it one connection at a time keeps it feeling like a story.
            </Body>
          </Section>

          {/* A personal note — full-width separator + Playfair italic */}
          <Section delay={700}>
            <SectionHeader>A personal note</SectionHeader>
            <Body italic>
              I've been into history for years — podcasts, books, the occasional 2am Wikipedia spiral. Long articles
              cover causes and effects, but I always thought short descriptions with direct visual links would make
              things easier to understand and remember. Cateno is what I wanted to exist. I hope you find something
              surprising in it.
            </Body>
          </Section>

          {/* Footer notes */}
          <Section delay={850}>
            <Body>Thank you for exploring it — and I hope you enjoy it as much as I do.</Body>
          </Section>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// ─── Section wrapper with staggered animation ─────────────────────────────────

function Section({ children, delay }: { children: React.ReactNode; delay: number }) {
  return <motion.div {...fadeUpProps(delay)}>{children}</motion.div>;
}

// ─── Local helpers ────────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: 48, marginBottom: 16 }}>
      <div
        style={{
          width: 2,
          height: 16,
          background: "rgba(232,227,213,0.3)",
          marginRight: 12,
          flexShrink: 0,
        }}
      />
      <p
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "rgba(232,227,213,0.5)",
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}

function Body({ children, italic }: { children: React.ReactNode; italic?: boolean }) {
  return (
    <p
      style={{
        fontFamily: italic ? "'Playfair Display', Georgia, serif" : "DM Sans, sans-serif",
        fontStyle: italic ? "italic" : "normal",
        fontSize: 16,
        color: "rgba(232,227,213,0.55)",
        lineHeight: 1.9,
        marginTop: 0,
        marginBottom: 20,
        textAlign: "justify",
        hyphens: "auto",
      }}
    >
      {children}
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: "monospace",
        fontSize: 13,
        background: "rgba(232,227,213,0.08)",
        padding: "1px 5px",
        borderRadius: 3,
      }}
    >
      {children}
    </code>
  );
}
