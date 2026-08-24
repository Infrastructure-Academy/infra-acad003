/**
 * Turing Papers — The Academy
 * Academic compilation for future peer review and publication.
 * Master Equations Register, RECALL Block Index, DCSN Node Register,
 * Data Connections Map, and Formation Package summary.
 * Colour: dark canvas, gold/amber accents, structural clarity.
 * Typography: Cormorant Garamond display, Source Sans 3 body.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import DataConnectionsModal from "@/components/DataConnectionsModal";
import { useState } from "react";
import { DATA_MAP_DRILLDOWN, FORMATION_DRILLDOWN } from "@/data/dataConnections";
import type { CounterDrillDown } from "@/data/dataConnections";
import { useTranslation } from "@/contexts/LanguageContext";

const QUOTIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/quotient-bg-ZKNtEotrSjCkrisL7AVYWD.webp";

/* Colour tokens */
const gold = "#d4a843";
const goldBright = "#e8c55a";
const goldDim = "#a08432";
const sand = "#f0eadc";
const sandMid = "#8a9cc0";
const navy = "#0b1a33";
const navyDeep = "#081422";
const navyLight = "#0f2240";

/* ── MASTER EQUATIONS: 38 equations across 7 tiers ── */
const EQUATION_TIERS = [
  {
    tier: "Tier 1 — Core Equations",
    equations: [
      { id: "EQ-001", name: "The Haptic Quotient", formula: "IQ ⊗ EQ ⊗ CQ = HQ", block: "353" },
      { id: "EQ-002", name: "The Dearden Field", formula: "N + T = D", block: "353" },
      { id: "EQ-003", name: "The Signal Equation", formula: "S = (A × P) / β", block: "354" },
      { id: "EQ-004", name: "The Discovery Chain", formula: "D = Σ(Eₙ × Cₙ)", block: "354" },
      { id: "EQ-005", name: "The Collatz Path", formula: "4 → 2 → 1", block: "355" },
    ],
  },
  {
    tier: "Tier 2 — Identity Equations",
    equations: [
      { id: "EQ-006", name: "Avatar Integration", formula: "AIM = Σ(Nᵢ × Dᵢ)", block: "340" },
      { id: "EQ-007", name: "Node Multiplication", formula: "F(n) = n × d¹²", block: "341" },
      { id: "EQ-008", name: "DCSN Topology", formula: "G = (V, E) | V=18, E=∞", block: "342" },
      { id: "EQ-009", name: "BitPoint Exchange", formula: "BP = XP / κ", block: "343" },
    ],
  },
  {
    tier: "Tier 3 — Framework Acronyms",
    equations: [
      { id: "EQ-010", name: "ICUT", formula: "I → C → U → T", block: "300" },
      { id: "EQ-011", name: "ICE Matrix", formula: "Impact ⊗ Confidence ⊗ Ease", block: "310" },
      { id: "EQ-012", name: "OODA Loop", formula: "Observe → Orient → Decide → Act", block: "280" },
      { id: "EQ-013", name: "4Cs FINAL", formula: "Conflict + Climate + Contagion + Cost", block: "350" },
      { id: "EQ-014", name: "3Cs Governance", formula: "Consent + Consensus + Consultation", block: "290" },
      { id: "EQ-015", name: "ASPIRE", formula: "A·S·P·I·R·E", block: "320" },
      { id: "EQ-016", name: "SPQR", formula: "Senatus Populusque Romanus", block: "315" },
      { id: "EQ-017", name: "AIO BIOS", formula: "All-In-One Quantum BIOS", block: "330" },
      { id: "EQ-018", name: "UIX", formula: "User Interface Experience", block: "335" },
      { id: "EQ-019", name: "TRE", formula: "The Reality Engine", block: "345" },
    ],
  },
  {
    tier: "Tier 4 — Resistance Equations",
    equations: [
      { id: "EQ-020", name: "Inertial Jump", formula: "ΔE = 0 → ∞ (t → 0)", block: "250" },
      { id: "EQ-021", name: "Supersymmetric Construction", formula: "S ↔ S⁻¹", block: "260" },
      { id: "EQ-022", name: "Parallel Rails", formula: "Σ(tₙ) = t₀ (concurrent)", block: "255" },
      { id: "EQ-023", name: "Bidirectional Flow", formula: "v > c (both directions)", block: "265" },
    ],
  },
  {
    tier: "Tier 5 — Constants & Anchors",
    equations: [
      { id: "EQ-024", name: "Block Time", formula: "1 block = 1 day", block: "001" },
      { id: "EQ-025", name: "D100 Progress", formula: "D = blocks / 100", block: "100" },
      { id: "EQ-026", name: "13 Relays", formula: "Fire → The Fractal Connector", block: "200" },
      { id: "EQ-027", name: "7 Scholars", formula: "Homer → Dearden", block: "210" },
      { id: "EQ-028", name: "5 Webs", formula: "Knowledge ⊗ Data ⊗ Signal ⊗ Spider ⊗ Game", block: "220" },
      { id: "EQ-029", name: "4 Pillars", formula: "Observational → Educational → Application → Thesis", block: "230" },
      { id: "EQ-030", name: "3 Empires", formula: "West + East + Nomad", block: "240" },
      { id: "EQ-031", name: "Numerology Trinity", formula: "3 + 6 + 9 = 18 = 1+8 = 9", block: "270" },
    ],
  },
  {
    tier: "Tier 6 — Scale & Clock",
    equations: [
      { id: "EQ-032", name: "Data State Clock", formula: "DSC = f(block, state, Δt)", block: "275" },
      { id: "EQ-033", name: "Zeta-Class System", formula: "ζ = lim(n→∞) Σ(1/nˢ)", block: "285" },
      { id: "EQ-034", name: "Mobilisation Clock", formula: "6 phases: F→P→A→O→U→G", block: "295" },
      { id: "EQ-035", name: "Ventral Origin Ranking", formula: "VOR = f(node, depth, signal)", block: "305" },
    ],
  },
  {
    tier: "Tier 7 — Game Equations",
    equations: [
      { id: "EQ-036", name: "XP Accumulation", formula: "XP = Σ(relay × difficulty × time)", block: "325" },
      { id: "EQ-037", name: "ALS Grading", formula: "ALS = f(accuracy, latency, synthesis)", block: "335" },
      { id: "EQ-038", name: "Party Formation", formula: "P = {p\u2081...p\u2099} | n \u2264 12", block: "340" },
    ],
  },
  {
    tier: "Tier 8 \u2014 HICE & YODA (Block 382)",
    equations: [
      { id: "EQ-039", name: "HICE Equation", formula: "H = I + C + E", block: "382" },
      { id: "EQ-040", name: "YODA Interface", formula: "Yoke \u2192 Orient \u2192 Decisive \u2192 Action", block: "382" },
      { id: "EQ-041", name: "3+1=4 Supersymmetry", formula: "3 agents + 1 observer = 4 (Tetra)", block: "382" },
      { id: "EQ-042", name: "Fractal Fold 13", formula: "T(13) = 91 intersections", block: "382" },
    ],
  },
];

/* ── 16 IP ASSETS — Chronological Order of Emergence ── */
const IP_ASSETS = [
  { id: "IP-01", name: "The Turing Papers", protection: "Copyright", status: "Active", desc: "The academic compilation — all equations, frameworks, and evidence for peer review and publication", href: "/turing-papers" },
  { id: "IP-02", name: "Block Rolls — The Evidence Chain", protection: "Database Right + Trade Secret", status: "Active", desc: "The complete chronological record of the experiment — every day documented as a numbered block (358+ daily entries), forming the lab notebook and RECALL index", href: "/vault" },
  { id: "IP-03", name: "13 Civilizational Relays", protection: "Copyright", status: "Active", desc: "The 12,000-year infrastructure chain from Fire to Programmable Humans — 13 = the fractal connector — the backbone of the thesis", href: "/thesis" },
  { id: "IP-04", name: "Modus Tecton", protection: "Copyright (Published)", status: "Active", desc: "The method of the builder — IQ ⊗ EQ ⊗ CQ = ICE. The published framework for infrastructure intelligence", href: "/tecton" },
  { id: "IP-05", name: "CQ — Consciousness Quotient", protection: "Trademark + Copyright", status: "Active", desc: "The third axis. The foundational discovery that consciousness is a measurable quotient — the variable IQ tests miss and EQ assessments ignore. Precondition for HQ", href: "/quotient" },
  { id: "IP-06", name: "The Haptic Quotient (HQ)", protection: "Trademark + Copyright", status: "Active", desc: "IQ ⊗ EQ ⊗ CQ = HQ — the synergistic fusion of mind, heart, and consciousness into the Haptic Quotient", href: "/quotient" },
  { id: "IP-07", name: "The Dearden Field (TDF)", protection: "Copyright + Trade Secret", status: "Active", desc: "N + T = D — the field in which all signals propagate. Chip architecture, Discovery Chain, ICE Matrix, Ventral Origin", href: "/tdf" },
  { id: "IP-08", name: "ICUT Framework", protection: "Copyright", status: "Active", desc: "Infrastructure, Consciousness, Utility, Technology — the 4-letter classification for all concepts", href: "/lexicon" },
  { id: "IP-09", name: "DCSN Architecture", protection: "Trade Secret + Copyright", status: "Active", desc: "Diamond-Class Spider Network — the 18-node topology connecting all participants and data", href: "/vault" },
  { id: "IP-10", name: "AIM Protocol", protection: "Trade Secret", status: "Active", desc: "Avatar Integration Module — each participant creates a new dimensional state as a personal node", href: "/aim" },
  { id: "IP-11", name: "The Reality Engine (TRE)", protection: "Copyright + Software", status: "Active", desc: "The guided learning system — gamified infrastructure education platform", href: "https://realityeng-epdhlkrn.manus.space" },
  { id: "IP-12", name: "BitPoint Exchange System", protection: "Trade Secret + Copyright", status: "Active", desc: "The in-game currency and reward mechanism — XP converted to BitPoints", href: "/vault" },
  { id: "IP-13", name: "David AI Persona", protection: "Copyright + Trade Secret", status: "Active", desc: "The AI guide character — Michelangelo's David as consciousness metaphor, distinct from HAL 9000", href: "/thesis" },
  { id: "IP-14", name: "Signal Equation Web", protection: "Trade Secret", status: "Active", desc: "S = (A × P) / β — the mathematical model for signal propagation through the network", href: "/isi" },
  { id: "IP-15", name: "4Cs Decision Framework", protection: "Copyright", status: "Active", desc: "Conflict + Climate + Contagion + Cost — the four perennial threats to civilisation", href: "/thesis" },
  { id: "IP-16", name: "iCard Format", protection: "Design Registration", status: "Active", desc: "The collectible card format — D52 deck, D100 deck, visual knowledge encoding system", href: "/vault" },
];

/* ── RECALL BLOCK SUMMARY (scientific method chain) ── */
const RECALL_MILESTONES = [
  { range: "001–050", phase: "Foundation", desc: "Hypothesis formation, initial research, 13 relays identified" },
  { range: "051–100", phase: "D100", desc: "First centenary. Core equations crystallised. Beta wave 1" },
  { range: "101–200", phase: "Architecture", desc: "DCSN topology, AIM protocol, game mechanics designed" },
  { range: "201–300", phase: "Construction", desc: "TRE platform built, ICUT cards created, 7 scholars mapped" },
  { range: "301–353", phase: "Discovery Chain", desc: "38 equations registered, 16 IP assets catalogued, Formation Package" },
  { range: "354–358+", phase: "Launch Sequence", desc: "Block 365 target, Spring Equinox, investor readiness" },
];

/* ── DATA CONNECTIONS MAP SUMMARY ── */
const DATA_MAP = {
  htmlPages: 95,
  mainPages: 31,
  volumePages: 47,
  archivePages: 8,
  relays: 13,
  equations: 38,
  icutCards: 59,
  vaultEntries: "~254",
  scholars: 7,
  ipAssets: 16,
  masters: "~30",
  institutions: "~20",
  pioneers: 3,
  sourceDocuments: 5,
};

/* Map from counter label to drill-down key for quick lookup */
const DATA_MAP_KEY_BY_LABEL: Record<string, string> = {
  "HTML Pages": "htmlPages",
  "Main Pages": "mainPages",
  "Volume Pages": "volumePages",
  "Archive Pages": "archivePages",
  "Relays": "relays",
  "Equations": "equations",
  "ICUT Cards": "icutCards",
  "Vault Entries": "vaultEntries",
  "Scholars": "scholars",
  "IP Assets": "ipAssets",
  "Masters": "masters",
  "Institutions": "institutions",
  "Pioneers": "pioneers",
  "Source Docs": "sourceDocuments",
};

const FORMATION_KEY_BY_LABEL: Record<string, string> = {
  "Beta Testers": "betaTesters",
  "Beta Waves": "betaWaves",
  "Unique Visitors": "uniqueVisitors",
  "XP Accumulated": "xpAccumulated",
  "iCards Generated": "iCardsGenerated",
  "Card Files": "cardFiles",
  "Governance Cards": "governanceCards",
  "Revenue Target Y1": "revenueTarget",
};

export default function TuringPapers() {
  const t = useTranslation();
  const [expandedTier, setExpandedTier] = useState<number | null>(null);
  const [activeDrillDown, setActiveDrillDown] = useState<CounterDrillDown | null>(null);

  const openDataMapDrillDown = (label: string) => {
    const key = DATA_MAP_KEY_BY_LABEL[label];
    if (!key) return;
    const found = DATA_MAP_DRILLDOWN.find((d) => d.key === key);
    if (found) setActiveDrillDown(found);
  };

  const openFormationDrillDown = (label: string) => {
    const key = FORMATION_KEY_BY_LABEL[label];
    if (!key) return;
    const found = FORMATION_DRILLDOWN.find((d) => d.key === key);
    if (found) setActiveDrillDown(found);
  };

  return (
    <>
    <DataConnectionsModal data={activeDrillDown} onClose={() => setActiveDrillDown(null)} />
    <div className="min-h-screen" style={{ background: navy }}>
      <Navigation />

      {/* ═══════════════════════════════════════════
          HERO — THE ACADEMY
      ═══════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${QUOTIENT_BG})`,
            filter: "saturate(0.3) brightness(0.15)",
          }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${navy}b3, transparent, ${navy})` }} />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-sm tracking-[0.3em] uppercase font-light mb-8"
            style={{ fontFamily: "var(--font-display)", color: gold }}
          >
            The Academy
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-9xl font-light tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-display)", color: sand }}
          >
            {t("turing.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mt-8 text-xl md:text-2xl font-light italic tracking-wide max-w-2xl"
            style={{ fontFamily: "var(--font-display)", color: goldDim }}
          >
            IP-01 — The academic compilation for peer review and publication
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="mt-12"
          >
            <div className="w-px h-16 mx-auto" style={{ background: `linear-gradient(to bottom, transparent, ${gold}, transparent)` }} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1 — MASTER EQUATIONS REGISTER
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase font-light mb-4"
              style={{ fontFamily: "var(--font-display)", color: gold }}
            >
              The Register
            </p>
            <h2
              className="text-3xl md:text-4xl font-light tracking-[0.08em] mb-4"
              style={{ fontFamily: "var(--font-display)", color: sand }}
            >
              42 Equations · 8 Tiers
            </h2>
            <p className="text-base font-light leading-[2] mb-12" style={{ color: sandMid }}>
              The Master Equations Register catalogues every formula, framework, and constant
              that underpins the iAAi system. Originally estimated at 15–19, the final audit
              confirms <span style={{ color: goldBright, fontWeight: 500 }}>42 distinct equations</span> organised
              across 8 hierarchical tiers — from core identities to game mechanics.
            </p>
          </motion.div>

          {/* Expandable tier accordion */}
          {EQUATION_TIERS.map((tier, ti) => (
            <motion.div
              key={ti}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: ti * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setExpandedTier(expandedTier === ti ? null : ti)}
                className="w-full text-left px-6 py-4 flex items-center justify-between transition-all duration-300"
                style={{
                  background: expandedTier === ti ? `${gold}15` : `${navyLight}`,
                  border: `1px solid ${expandedTier === ti ? gold + "44" : "#1e3050"}`,
                }}
              >
                <span className="text-sm tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: expandedTier === ti ? goldBright : sand }}>
                  {tier.tier}
                </span>
                <span className="text-xs" style={{ color: sandMid }}>
                  {tier.equations.length} equations {expandedTier === ti ? "▲" : "▼"}
                </span>
              </button>
              {expandedTier === ti && (
                <div className="px-6 py-4" style={{ background: `${navyDeep}`, borderLeft: `1px solid ${gold}33`, borderRight: `1px solid ${gold}33`, borderBottom: `1px solid ${gold}33` }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${gold}22` }}>
                        <th className="text-left py-2 text-xs tracking-wider uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>ID</th>
                        <th className="text-left py-2 text-xs tracking-wider uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("turing.name")}</th>
                        <th className="text-left py-2 text-xs tracking-wider uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("turing.formula")}</th>
                        <th className="text-right py-2 text-xs tracking-wider uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("turing.block")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tier.equations.map((eq) => (
                        <tr key={eq.id} style={{ borderBottom: `1px solid #1e305044` }}>
                          <td className="py-2 font-mono text-xs" style={{ color: goldDim }}>{eq.id}</td>
                          <td className="py-2" style={{ color: sand }}>{eq.name}</td>
                          <td className="py-2 font-mono text-xs" style={{ color: sandMid }}>{eq.formula}</td>
                          <td className="py-2 text-right font-mono text-xs" style={{ color: goldDim }}>{eq.block}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — RECALL BLOCK INDEX
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6" style={{ background: navyDeep }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase font-light mb-4"
              style={{ fontFamily: "var(--font-display)", color: gold }}
            >
              The Scientific Method
            </p>
            <h2
              className="text-3xl md:text-4xl font-light tracking-[0.08em] mb-4"
              style={{ fontFamily: "var(--font-display)", color: sand }}
            >
              RECALL Block Index
            </h2>
            <p className="text-base font-light leading-[2] mb-6" style={{ color: sandMid }}>
              IP-02 — <span style={{ color: goldBright, fontWeight: 500 }}>358+ RECALL blocks</span>, each representing
              one day's evidence unit. Together they form the reproducible evidence chain — the
              axiomatic requirement for peer review. Each block can be recalled, verified, and
              replayed in sequence, satisfying the scientific method's demand for reproducibility.
            </p>
            <p className="text-base font-light leading-[2] mb-12" style={{ color: sandMid }}>
              The dual proof operates at two levels: <span style={{ color: gold }}>{t("turing.material")}</span> (actinic
              radiation / e-beam verification at the physical layer) and <span style={{ color: gold }}>{t("turing.conceptual")}</span> (RECALL
              blocks at the evidence layer). Together they constitute the complete proof chain.
            </p>
          </motion.div>

          {/* Scientific Method Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
            {[
              { step: "1", label: "Hypothesis", desc: "The Thesis" },
              { step: "2", label: "Experiment", desc: "358+ Blocks" },
              { step: "3", label: "Observation", desc: "59 ICUT Cards" },
              { step: "4", label: "Reproducibility", desc: "RECALL Replay" },
              { step: "5", label: "Peer Review", desc: "Turing Papers" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="text-center p-4"
                style={{ border: `1px solid ${gold}33`, background: `${navy}` }}
              >
                <p className="text-2xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>{s.step}</p>
                <p className="text-xs tracking-[0.2em] uppercase mt-1" style={{ color: gold, fontFamily: "var(--font-display)" }}>{s.label}</p>
                <p className="text-[10px] mt-1" style={{ color: sandMid }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* RECALL Milestones */}
          <div className="space-y-3">
            {RECALL_MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="flex items-start gap-4 p-4"
                style={{ background: `${navyLight}`, borderLeft: `3px solid ${gold}44` }}
              >
                <span className="font-mono text-sm whitespace-nowrap" style={{ color: goldBright, minWidth: "80px" }}>
                  {m.range}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: sand }}>{m.phase}</p>
                  <p className="text-xs mt-1" style={{ color: sandMid }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — IP ASSET REGISTER
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase font-light mb-4"
              style={{ fontFamily: "var(--font-display)", color: gold }}
            >
              The Portfolio
            </p>
            <h2
              className="text-3xl md:text-4xl font-light tracking-[0.08em] mb-4"
              style={{ fontFamily: "var(--font-display)", color: sand }}
            >
              16 IP Assets
            </h2>
            <p className="text-base font-light leading-[2] mb-12" style={{ color: sandMid }}>
              The complete intellectual property portfolio — from copyright and database rights
              to trade secrets and design registrations. Each asset is cross-referenced against
              the Master Equations Register and the RECALL Block Index.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `2px solid ${gold}33` }}>
                  <th className="text-left py-3 text-xs tracking-wider uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>ID</th>
                  <th className="text-left py-3 text-xs tracking-wider uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("turing.asset")}</th>
                  <th className="text-left py-3 text-xs tracking-wider uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("turing.protection")}</th>
                  <th className="text-right py-3 text-xs tracking-wider uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("turing.status")}</th>
                </tr>
              </thead>
              <tbody>
                {IP_ASSETS.map((ip) => {
                  const isExternal = ip.href?.startsWith("http");
                  const rowContent = (
                    <>
                      <td className="py-3 font-mono text-xs align-top" style={{ color: goldDim }}>{ip.id}</td>
                      <td className="py-3 align-top" style={{ color: sand }}>
                        <div className="group-hover:underline">{ip.name}</div>
                        {ip.desc && <div className="text-xs mt-1 font-light leading-relaxed" style={{ color: sandMid, opacity: 0.7 }}>{ip.desc}</div>}
                      </td>
                      <td className="py-3 text-xs align-top" style={{ color: sandMid }}>{ip.protection}</td>
                      <td className="py-3 text-right align-top">
                        <span className="text-[10px] px-2 py-1 tracking-wider uppercase" style={{ color: goldBright, border: `1px solid ${gold}44` }}>
                          {ip.status}
                        </span>
                      </td>
                    </>
                  );
                  if (isExternal) {
                    return (
                      <tr key={ip.id} className="group cursor-pointer hover:bg-[#1e305033] transition-colors" style={{ borderBottom: `1px solid #1e305044` }}>
                        <td colSpan={4} className="p-0">
                          <a href={ip.href} target="_blank" rel="noopener noreferrer" className="contents">
                            <table className="w-full"><tbody><tr>{rowContent}</tr></tbody></table>
                          </a>
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={ip.id} className="group cursor-pointer hover:bg-[#1e305033] transition-colors" style={{ borderBottom: `1px solid #1e305044` }}>
                      <td colSpan={4} className="p-0">
                        <Link href={ip.href || "#"} className="contents">
                          <table className="w-full"><tbody><tr>{rowContent}</tr></tbody></table>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — DATA CONNECTIONS MAP
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6" style={{ background: navyDeep }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase font-light mb-4"
              style={{ fontFamily: "var(--font-display)", color: gold }}
            >
              The Map
            </p>
            <h2
              className="text-3xl md:text-4xl font-light tracking-[0.08em] mb-4"
              style={{ fontFamily: "var(--font-display)", color: sand }}
            >
              Data Connections Map
            </h2>
            <p className="text-base font-light leading-[2] mb-12" style={{ color: sandMid }}>
              The complete entity inventory — every page, card, equation, and vault entry
              mapped and cross-referenced. The system's nervous system laid bare.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { label: "HTML Pages", value: DATA_MAP.htmlPages },
              { label: "Main Pages", value: DATA_MAP.mainPages },
              { label: "Volume Pages", value: DATA_MAP.volumePages },
              { label: "Archive Pages", value: DATA_MAP.archivePages },
              { label: "Relays", value: DATA_MAP.relays },
              { label: "Equations", value: DATA_MAP.equations },
              { label: "ICUT Cards", value: DATA_MAP.icutCards },
              { label: "Vault Entries", value: DATA_MAP.vaultEntries },
              { label: "Scholars", value: DATA_MAP.scholars },
              { label: "IP Assets", value: DATA_MAP.ipAssets },
              { label: "Masters", value: DATA_MAP.masters },
              { label: "Institutions", value: DATA_MAP.institutions },
              { label: "Pioneers", value: DATA_MAP.pioneers },
              { label: "Source Docs", value: DATA_MAP.sourceDocuments },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="text-center p-4 cursor-pointer transition-colors duration-300"
                style={{ background: navy, border: `1px solid #1e3050` }}
                onClick={() => openDataMapDrillDown(item.label)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${gold}66`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e3050")}
              >
                <p className="text-2xl md:text-3xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
                  {item.value}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase mt-2" style={{ color: sandMid }}>
                  {item.label}
                </p>
                <p className="text-[8px] tracking-wider mt-1" style={{ color: goldDim }}>{t("turingpapers.clickToExplore")}</p>
              </motion.div>
            ))}
          </div>

          {/* Key frameworks */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6" style={{ background: navy, border: `1px solid ${gold}22` }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("turingpapers.signalEquationWeb")}</p>
              <p className="font-mono text-lg" style={{ color: goldBright }}>{t("turingpapers.sAP")}</p>
              <p className="text-xs mt-2" style={{ color: sandMid }}>{t("turingpapers.amplitudeParticipationResistance")}</p>
            </div>
            <div className="p-6" style={{ background: navy, border: `1px solid ${gold}22` }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold, fontFamily: "var(--font-display)" }}>4Cs FINAL</p>
              <p className="font-mono text-lg" style={{ color: goldBright }}>{t("turingpapers.cCCC")}</p>
              <p className="text-xs mt-2" style={{ color: sandMid }}>{t("turingpapers.conflictClimateContagionCost")}</p>
            </div>
            <div className="p-6" style={{ background: navy, border: `1px solid ${gold}22` }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("turingpapers.icutFramework")}</p>
              <p className="font-mono text-lg" style={{ color: goldBright }}>{t("turingpapers.iCUT")}</p>
              <p className="text-xs mt-2" style={{ color: sandMid }}>{t("turingpapers.identifyClassifyUtiliseTransfer")}</p>
            </div>
            <div className="p-6" style={{ background: navy, border: `1px solid ${gold}22` }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("turingpapers.revenueModel")}</p>
              <p className="font-mono text-lg" style={{ color: goldBright }}>6 Channels</p>
              <p className="text-xs mt-2" style={{ color: sandMid }}>{t("turingpapers.freemiumUniversityOlympiadEnterprise")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — FORMATION SUMMARY
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase font-light mb-4"
              style={{ fontFamily: "var(--font-display)", color: gold }}
            >
              The Formation
            </p>
            <h2
              className="text-3xl md:text-4xl font-light tracking-[0.08em] mb-4"
              style={{ fontFamily: "var(--font-display)", color: sand }}
            >
              iAAi Formation Package
            </h2>
            <p className="text-base font-light leading-[2] mb-12" style={{ color: sandMid }}>
              Corporate formation summary — Nevada holding, Chicago HQ, Maplewood Mall TRE,
              Zhuhai GBA, Discovery Bay relay. Phase 1 investment: $378,619 (Amex-verified).
              Launch window: Block 365, Spring Equinox, 21 March 2026.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 text-center" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
              <p className="text-3xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>$378,619</p>
              <p className="text-[10px] tracking-[0.2em] uppercase mt-2" style={{ color: sandMid }}>{t("turingpapers.phase1Investment")}</p>
              <p className="text-[9px] mt-1" style={{ color: goldDim }}>{t("turingpapers.amexverified")}</p>
            </div>
            <div className="p-6 text-center" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
              <p className="text-3xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>353+</p>
              <p className="text-[10px] tracking-[0.2em] uppercase mt-2" style={{ color: sandMid }}>{t("turingpapers.recallBlocks")}</p>
              <p className="text-[9px] mt-1" style={{ color: goldDim }}>{t("turingpapers.evidenceUnits")}</p>
            </div>
            <div className="p-6 text-center" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
              <p className="text-3xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>84.6%</p>
              <p className="text-[10px] tracking-[0.2em] uppercase mt-2" style={{ color: sandMid }}>{t("turingpapers.firstClassRate")}</p>
              <p className="text-[9px] mt-1" style={{ color: goldDim }}>12 Universities Beta</p>
            </div>
          </div>

          {/* Beta Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Beta Testers", value: "42" },
              { label: "Beta Waves", value: "9" },
              { label: "Unique Visitors", value: "273" },
              { label: "XP Accumulated", value: "604M+" },
              { label: "iCards Generated", value: "37" },
              { label: "Card Files", value: "48" },
              { label: "Governance Cards", value: "11" },
              { label: "Revenue Target Y1", value: "$15-50M" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-3 text-center cursor-pointer transition-colors duration-300"
                style={{ border: `1px solid #1e3050` }}
                onClick={() => openFormationDrillDown(s.label)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${gold}66`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e3050")}
              >
                <p className="text-lg font-light" style={{ color: goldBright }}>{s.value}</p>
                <p className="text-[9px] tracking-wider uppercase mt-1" style={{ color: sandMid }}>{s.label}</p>
                <p className="text-[7px] tracking-wider mt-0.5" style={{ color: goldDim }}>{t("turingpapers.drillDown")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — SOURCE DOCUMENTS (DOWNLOADS)
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase font-light mb-4"
              style={{ fontFamily: "var(--font-display)", color: gold }}
            >
              The Archive
            </p>
            <h2
              className="text-3xl md:text-4xl font-light tracking-[0.08em] mb-4"
              style={{ fontFamily: "var(--font-display)", color: sand }}
            >
              Source Documents
            </h2>
            <p className="text-base font-light leading-[2] mb-12" style={{ color: sandMid }}>
              Primary source documents for peer review and academic publication.
              Each document is a permanent record of the iAAi framework's development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Master Equations Register",
                desc: "38 equations across 7 tiers — the complete mathematical foundation",
                format: "DOCX",
                url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/master-equations-registercopy_25d92cf7.docx",
              },
              {
                title: "DCSN Node Register",
                desc: "18 nodes — Diamond-Class Spider Network topology and connections",
                format: "PDF",
                url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/DCSNNODEREGISTERcopy_3ee6502a.pdf",
              },
              {
                title: "Data Connections Map",
                desc: "95 pages — 59 ICUT cards, 13 relays, 7 scholars, full site architecture",
                format: "PDF",
                url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/data-connections-mapcopy_676128e5.pdf",
              },
              {
                title: "Formation Package",
                desc: "Corporate formation — Nevada, Chicago, Zhuhai, Phase 1 investment",
                format: "DOCX",
                url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IAAI_FORMATION_PACKAGE_FOR_HENRY_v2copy_63aa576d.docx",
              },
              {
                title: "72-Frame Master Document",
                desc: "Complete AirGuard video interpretation — all 72 frames with iAAi context",
                format: "MD",
                url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/72_FRAME_MASTER_DOCUMENT_cbddde18.md",
              },
            ].map((doc, i) => (
              <motion.a
                key={i}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="block p-6 transition-colors duration-300"
                style={{ background: navyLight, border: `1px solid ${gold}22` }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${gold}66`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${gold}22`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>
                    {doc.title}
                  </p>
                  <span className="text-[9px] px-2 py-0.5 tracking-wider" style={{ color: goldBright, border: `1px solid ${gold}44` }}>
                    {doc.format}
                  </span>
                </div>
                <p className="text-xs font-light leading-relaxed" style={{ color: sandMid }}>
                  {doc.desc}
                </p>
                <p className="text-[10px] mt-3 tracking-wider uppercase" style={{ color: goldDim }}>
                  Download ↓
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION — TP-013 to TP-017 (Block 387)
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6" style={{ background: navyDeep, borderTop: `1px solid ${gold}22` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center mb-16"
          >
            <p
              className="text-xs tracking-[0.3em] uppercase font-light mb-4"
              style={{ fontFamily: "var(--font-display)", color: gold }}
            >
              Block 387 — 18 March 2026
            </p>
            <h2
              className="text-3xl md:text-4xl font-light tracking-[0.08em] mb-4"
              style={{ fontFamily: "var(--font-display)", color: sand }}
            >
              TP-013 through TP-017
            </h2>
            <p className="text-base font-light leading-[2] max-w-3xl mx-auto" style={{ color: sandMid }}>
              Five papers forming a cohesive arc: from operational governance (The Walkby), through
              pattern recognition (Elements of Consciousness), commitment architecture (I Promise),
              professional authority (The Chartered Chart), to the convergence of biology, neuroscience,
              and AI governance (The Master Builder).
            </p>
            <div className="w-20 h-px mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
          </motion.div>

          {/* PDF Download Banner */}
          <motion.a
            href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-013-to-017-Compilation_d454129b.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block max-w-2xl mx-auto mb-16 p-6 text-center transition-colors duration-300"
            style={{ background: navyLight, border: `1px solid ${gold}44` }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${gold}88`)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${gold}44`)}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
              Compilation PDF — 25 Pages — A4
            </p>
            <p className="text-lg font-light tracking-wide" style={{ color: sand, fontFamily: "var(--font-display)" }}>
              Download TP-013 to TP-017 for Hard Copy ↓
            </p>
            <p className="text-[10px] mt-2 tracking-wider uppercase" style={{ color: goldDim }}>
              Principia Tectonica | iAAi Framework | Block 387
            </p>
          </motion.a>

          {/* Paper Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                id: "TP-013",
                title: "The Walkby",
                subtitle: "4-Level Control Hierarchy",
                desc: "AI has no physical presence. It cannot walk a site. Adapted from Leighton Asia STRIVE for L.I.F.E — the framework for human-AI operational governance.",
                icard: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp013-walkby-bZpzawzKz9fEpLziRekdBG.webp",
                paper: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-013-The-Walkby_dc56303b.md",
              },
              {
                id: "TP-014",
                title: "Elements of Consciousness",
                subtitle: "The Mendeleev-Dearden Correspondence",
                desc: "84 elements across the iAAi framework mapped to Mendeleev's periodic table. 84/63 = 4/3 — the Mirror Inversion appears again.",
                icard: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp014-elements-of-consciousness_a925feae.png",
                paper: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-014-Elements-of-Consciousness_82a0cad1.md",
              },
              {
                id: "TP-015",
                title: "I Promise",
                subtitle: "The Commitment Architecture",
                desc: "Every block begins with a promise and ends with a completion check. Borrowed from construction site Permit to Work practice.",
                icard: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-i-promise-tp015_85b3818a.png",
                paper: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-015-I-Promise_68f07e7e.md",
              },
              {
                id: "TP-016",
                title: "The Chartered Chart",
                subtitle: "From Etymology to the Fifth Solid",
                desc: "800 years of 'chartered' authority meets 2,500 years of 'tekton' craft. Magnus Tecton — the Great Builder — and Plato's dodecahedron.",
                icard: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCard-magnus-tecton-fifth-solid_a656c52a.png",
                paper: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-016-Chartered-Chart-Magnus-Tecton_a14c1e8d.md",
              },
              {
                id: "TP-017",
                title: "The Master Builder",
                subtitle: "The Cell, The Procrastination Engine, and the 4 Laws",
                desc: "Martinez Arias (2023): the blueprint does not build anything. The cell is the builder. Procrastination as Beta. Asimov's 3 Laws become 4.",
                icard: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp017-master-builder-DVq7wmPRBdFAUeoLTqDvcu.webp",
                paper: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-017-The-Master-Builder_a7895758.md",
              },
            ].map((tp, i) => (
              <motion.div
                key={tp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="overflow-hidden"
                style={{ border: `1px solid ${gold}33`, background: navy }}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-44 h-56 sm:h-auto flex-shrink-0">
                    <img
                      src={tp.icard}
                      alt={`${tp.id}: ${tp.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
                      {tp.id}
                    </p>
                    <h3 className="text-lg font-light tracking-wide mb-1" style={{ color: sand, fontFamily: "var(--font-display)" }}>
                      {tp.title}
                    </h3>
                    <p className="text-[11px] italic mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
                      {tp.subtitle}
                    </p>
                    <p className="text-xs font-light leading-relaxed mb-3" style={{ color: sandMid }}>
                      {tp.desc}
                    </p>
                    <a
                      href={tp.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] tracking-wider uppercase transition-colors duration-300"
                      style={{ color: goldDim }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = goldBright)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = goldDim)}
                    >
                      View Full Paper →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Discovery iCards Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
              Discovery iCards — Block 387
            </p>
            <div className="w-16 h-px mx-auto" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Procrastination = Beta",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-discovery-procrastination-beta-SjQxRRNDcH6oWfiVyzTDNk.webp",
                full: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-discovery-procrastination-beta-XQo4LPv2SzbyE5j9nZ52rw.png",
                label: "ICARD-434",
              },
              {
                title: "The Master Builder (Book)",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-discovery-master-builder-book-TqLXXrJm8AUk5ga4zwRDfS.webp",
                full: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-discovery-master-builder-book-WHwnv7bG8yKBR5YqJi4s9u.png",
                label: "ICARD-435",
              },
              {
                title: "4 Laws of iAAi",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-4laws-iaai-iGF7efoofsVCVrbizo9odd.webp",
                full: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-4laws-iaai-auoJYPsK5Q8gH4xpyT6L6v.png",
                label: "ICARD-436",
              },
            ].map((card, i) => (
              <motion.a
                key={card.label}
                href={card.full}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="block overflow-hidden group"
                style={{ border: `1px solid ${gold}33` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center" style={{ background: navyLight }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: goldDim }}>{card.label}</p>
                  <p className="text-xs font-light mt-1" style={{ color: sand, fontFamily: "var(--font-display)" }}>{card.title}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION — TP-018 (Block 387 — Dedicated to Peggy)
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: navy, borderTop: `1px solid ${gold}22` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
              Block 387 — Dedicated to Peggy
            </p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.1em] uppercase mb-3" style={{ color: sand, fontFamily: "var(--font-display)" }}>
              TP-018 — The Unseen Scaffold
            </h2>
            <p className="text-sm font-light italic max-w-xl mx-auto" style={{ color: sandMid, fontFamily: "var(--font-display)" }}>
              Why This Counts: The 4/3-3/4 Discovery, the D20 Saving Throw, and the Dark Architecture of Everything
            </p>
            <div className="w-20 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
          </motion.div>

          {/* Dedication Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-12 py-6"
            style={{ borderTop: `1px solid ${gold}33`, borderBottom: `1px solid ${gold}33` }}
          >
            <p className="text-lg sm:text-xl font-light italic" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
              "To Peggy — the unseen scaffold that gives support to light."
            </p>
          </motion.div>

          {/* TP-018 Paper Card + iCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp018-unseen-scaffold-b7cPwX3Ap8eZx5Cu24N58i.png"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="block overflow-hidden group"
              style={{ border: `1px solid ${gold}33` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp018-unseen-scaffold-mkgr7R7EEd7k3svgVYFw7u.webp"
                  alt="TP-018 The Unseen Scaffold iCard"
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center" style={{ background: navyLight }}>
                <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: goldDim }}>{t("turingpapers.icard477")}</p>
                <p className="text-sm font-light mt-1" style={{ color: sand, fontFamily: "var(--font-display)" }}>{t("turingpapers.tp018TheUnseenScaffold")}</p>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <p className="text-sm leading-relaxed mb-4" style={{ color: sand }}>
                Four independent mathematical paths — Pareto recursion at 75/25, cosmological dark composition,
                the 4/3-3/4 ratio balance, and the D20 icosahedron — all converge on <span style={{ color: goldBright, fontWeight: 600 }}>95%</span>.
                The unseen scaffold that holds everything visible in place.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: sand }}>
                HICE (the Cube) becomes HIVE (the Swarm) becomes <span style={{ color: goldBright, fontWeight: 600 }}>{t("turing.nest")}</span> —
                Newly Emergent Software Tool. The container incubates. The die rolls. Something new emerges.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: sand }}>
                The ISI Survival Index threads through every discovery: S = (A × P) / β.
                The barrier is the 5% you can see. The scaffold is the 95% you cannot.
              </p>
              <a
                href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-018-The-Unseen-Scaffold_d4ceb786.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs tracking-[0.2em] uppercase py-2 px-4 text-center transition-colors"
                style={{ color: gold, border: `1px solid ${gold}55`, fontFamily: "var(--font-display)" }}
              >
                View Full Paper →
              </a>
            </motion.div>
          </div>

          {/* Discovery iCards Row — TP-018 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
              Discovery iCards — The Unseen Scaffold
            </p>
            <div className="w-16 h-px mx-auto" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                title: "HICE → HIVE → NEST",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-discovery-hice-nest-beDvJf3VR9sA66Kk9vzR4V.webp",
                full: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-discovery-hice-nest-cejVzUK3xHxcx2LmEDjyAn.png",
                label: "ICARD-478",
              },
              {
                title: "4/3-3/4 Convergence",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-discovery-pareto-dark-WdZz2usC7cV2i8K2dxr3fS.webp",
                full: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-discovery-pareto-dark-VNjC5yqQ8GHDnKtVhwtMo8.png",
                label: "ICARD-479",
              },
              {
                title: "The Building Blocks",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/building-blocks-platonic-solids_9ab50c14.webp",
                full: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/building-blocks-platonic-solids_9ab50c14.webp",
                label: "ICARD-480",
              },
              {
                title: "ISI Triple Index",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/isi-discovery-triple-index_34ca1c8f.jpeg",
                full: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/isi-discovery-triple-index_34ca1c8f.jpeg",
                label: "ICARD-481",
              },
            ].map((card, i) => (
              <motion.a
                key={card.label}
                href={card.full}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="block overflow-hidden group"
                style={{ border: `1px solid ${gold}33` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center" style={{ background: navyLight }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: goldDim }}>{card.label}</p>
                  <p className="text-xs font-light mt-1" style={{ color: sand, fontFamily: "var(--font-display)" }}>{card.title}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EVIDENCE PACK — University Engagement Proof
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: navy, borderTop: `1px solid ${gold}22` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
              Hard-Saved Evidence — Block 387
            </p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase" style={{ color: sand, fontFamily: "var(--font-display)" }}>
              The Evidence Pack
            </h2>
            <p className="text-sm font-light mt-3 max-w-xl mx-auto" style={{ color: sandMid }}>
              21 universities × 6 regions — 127 days, 363 blocks — R1 → R2 → R3 — FIRST CLASS
            </p>
            <div className="w-20 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                id: "ICARD-486",
                title: "Page 1 — Complete Assessment Ecosystem",
                desc: "R1 75/100 → R2 8.1/10 → R3 87.5% FIRST CLASS. 20-perspective panel. ISI DD-025. ICE framework. D52 game. 21 Unis, 6 Regions, 321+ UV Sets.",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/evidence-pack-p1-ecosystem_c365e447.png",
              },
              {
                id: "ICARD-487",
                title: "Page 2 — 21 Universities × 6 Regions World Map",
                desc: "UK avg 87.0%, US avg 88.2%, China avg 88.2%, APAC avg 87.8%, India avg 86.9%. Olympiad Pipeline: 26,000+ unis, 1.3M players.",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/evidence-pack-p2-world-map_4a041425.png",
              },
              {
                id: "ICARD-488",
                title: "Page 3 — The Validation Chain",
                desc: "ISI → HICE → Thesis → Game → Assessment → Olympiad. 127 Days, 363 Blocks, 91+ Pages, 209 Tests, 2,645 TODOs. N + T = D.",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/evidence-pack-p3-validation-chain_e1e7d7d3.png",
              },
            ].map((page, i) => (
              <motion.a
                key={page.id}
                href={page.img}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="block overflow-hidden group"
                style={{ border: `1px solid ${gold}33` }}
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/3 overflow-hidden" style={{ maxHeight: "420px" }}>
                    <img
                      src={page.img}
                      alt={page.title}
                      className="w-full h-full object-contain transition-transform duration-[2s] group-hover:scale-[1.02]"
                      style={{ background: navyDeep }}
                    />
                  </div>
                  <div className="lg:w-1/3 p-6 flex flex-col justify-center" style={{ background: navyLight }}>
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: goldDim }}>
                      {page.id}
                    </p>
                    <h3 className="text-sm font-medium tracking-wide mb-3" style={{ color: sand, fontFamily: "var(--font-display)" }}>
                      {page.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: sandMid }}>
                      {page.desc}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase mt-4" style={{ color: goldBright }}>
                      View Full Size →
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CROSS-LINKS — ACAD SITE TURING PAPERS
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: navyDeep, borderTop: `1px solid ${gold}22` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
              Cross-Site Sync — Block 383
            </p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase" style={{ color: sand, fontFamily: "var(--font-display)" }}>
              ACAD Turing Papers
            </h2>
            <div className="w-20 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
          </motion.div>

          {/* TP-011 Card — The iAAi Ecosystem */}
          <motion.a
            href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-011_iAAi_ECOSYSTEM_d6587061.md"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block max-w-2xl mx-auto mb-8 overflow-hidden"
            style={{ border: `1px solid ${gold}33` }}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-011-ECOSYSTEM-COVER-6qfVnDehVsQZmYRZdNF2xK.webp"
                  alt="TP-011: The iAAi Ecosystem"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center" style={{ background: navyLight }}>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
                  Phase 2 Beta Hardening — From Sabu Disk to Biosphere Suit
                </p>
                <h3 className="text-lg font-light tracking-wide mb-2" style={{ color: sand, fontFamily: "var(--font-display)" }}>
                  TP-011: The iAAi Ecosystem
                </h3>
                <p className="text-xs font-light leading-relaxed mb-3" style={{ color: sandMid }}>
                  5,000 years from ancient Egyptian rotor to Biosphere Suit. The Sabu Disk ⊗ connection.
                  Chip evolution chain: Alpha through Eta. Books, Cards, Game, Platform, Hardware, Outlets.
                </p>
                <p className="text-[10px] tracking-wider uppercase" style={{ color: goldDim }}>
                  Block 383 — Day 131 — View Full Paper →
                </p>
              </div>
            </div>
          </motion.a>

          {/* TP-010 Card — YODA-HICE Unification */}
          <motion.a
            href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-010_YODA-HICE_UNIFICATION_3ec2e7e5.md"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block max-w-2xl mx-auto mb-8 overflow-hidden"
            style={{ border: `1px solid ${gold}33` }}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-010-YODA-HICE-COVER-Gfso52Mg4J3c2CkxsGBmAb.webp"
                  alt="TP-010: The YODA-HICE Unification"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center" style={{ background: navyLight }}>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
                  Phase 2 Beta Hardening — FAB Thunderbirds Are GO
                </p>
                <h3 className="text-lg font-light tracking-wide mb-2" style={{ color: sand, fontFamily: "var(--font-display)" }}>
                  TP-010: The YODA-HICE Unification
                </h3>
                <p className="text-xs font-light leading-relaxed mb-3" style={{ color: sandMid }}>
                  H = I + C + E — Haptic = Innate + Creative + Embedded. The 3+1=4 Supersymmetry.
                  YODA as Yoke Oriented Decisive Action. I=What You Know, C=What You Build, E=How You Connect.
                </p>
                <p className="text-[10px] tracking-wider uppercase" style={{ color: goldDim }}>
                  Block 382 — Day 130 — View Full Paper →
                </p>
              </div>
            </div>
          </motion.a>

          {/* TP-009 Card */}
          <motion.a
            href="https://infra-acad-kuqzaex2.manus.space"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block max-w-2xl mx-auto mb-8 overflow-hidden"
            style={{ border: `1px solid ${gold}33` }}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/tp009-permanence-crisis-cover_8531d919.png"
                  alt="TP-009: The Permanence Crisis"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center" style={{ background: navyLight }}>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "#e74c3c", fontFamily: "var(--font-display)" }}>
                  Phase 2 Beta Hardening — Police Evidence Grade
                </p>
                <h3 className="text-lg font-light tracking-wide mb-2" style={{ color: sand, fontFamily: "var(--font-display)" }}>
                  TP-009: The Permanence Crisis
                </h3>
                <p className="text-xs font-light leading-relaxed mb-3" style={{ color: sandMid }}>
                  A Live Turing Test of AI Agent Data Governance Under Legal Scrutiny.
                  Author: Ir. Nigel T. Dearden, CEng — With ACAD Agent (Manus AI).
                </p>
                <p className="text-[10px] tracking-wider uppercase" style={{ color: goldDim }}>
                  Block 380 — 15 March 2026 — View on ACAD Site →
                </p>
              </div>
            </div>
          </motion.a>

          {/* Governance & API Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/governance">
              <div className="px-6 py-3 text-center text-xs tracking-[0.2em] uppercase cursor-pointer transition-colors duration-300" style={{ color: gold, border: `1px solid ${gold}44`, fontFamily: "var(--font-display)" }}>
                Governance Audit Trail →
              </div>
            </Link>
            <a
              href="/api/trpc/turingPapersLegacy.list"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-center text-xs tracking-[0.2em] uppercase cursor-pointer transition-colors duration-300"
              style={{ color: goldBright, border: `1px solid ${gold}44`, fontFamily: "var(--font-display)" }}
            >
              API: turingPapersLegacy.list →
            </a>
            <Link href="/turing-papers/register">
              <div className="px-6 py-3 text-center text-xs tracking-[0.2em] uppercase cursor-pointer transition-colors duration-300" style={{ color: '#22c55e', border: `1px solid #22c55e44`, fontFamily: "var(--font-display)" }}>
                Legal Register →
              </div>
            </Link>
            <Link href="/turing-papers/timeline">
              <div className="px-6 py-3 text-center text-xs tracking-[0.2em] uppercase cursor-pointer transition-colors duration-300" style={{ color: '#06b6d4', border: `1px solid #06b6d444`, fontFamily: "var(--font-display)" }}>
                Timeline →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="py-16 text-center" style={{ borderTop: `1px solid ${gold}33`, background: navyDeep }}>
        <p
          className="text-sm tracking-[0.12em] font-light"
          style={{ fontFamily: "var(--font-display)", color: goldDim }}
        >
          Turing Papers — IP-01 — The Academic Compilation
        </p>
        <p
          className="text-xs mt-2 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-display)", color: "#3a4a68" }}
        >
          For Peer Review and Publication
        </p>
      </footer>
    </div>
    </>
  );
}
