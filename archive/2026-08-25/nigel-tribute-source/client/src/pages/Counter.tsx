/**
 * Counterforce — The Complete Framework
 * Dedicated page: both COUNTERFORCE images (full + clean) side by side,
 * plus interactive breakdown of the 5 equations.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";

const COUNTERFORCE_FULL = "/manus-storage/counter_full_page_59090666.png";
const COUNTERFORCE_CLEAN = "/manus-storage/counter_framework_cbf48d1b.png";

const gold = "oklch(0.72_0.12_75)";
const goldDim = "oklch(0.55_0.08_75)";
const sand = "oklch(0.88_0.008_75)";
const sandMid = "oklch(0.65_0.02_75)";
const ocean = "oklch(0.55_0.06_200)";
const bg = "oklch(0.10_0.005_240)";
const bgDeep = "oklch(0.08_0.005_240)";

interface Equation {
  id: number;
  name: string;
  formula: string;
  description: string;
  details: string;
}

const EQUATIONS: Equation[] = [
  {
    id: 1,
    name: "ISI 1 — Sustainability",
    formula: "ISI₁ = f(UN SDG alignment)",
    description: "Infrastructure Sustainability Index — aligned with the 17 UN Sustainable Development Goals.",
    details: "Measures how well an infrastructure system supports long-term civilisational sustainability. Maps each relay against the SDG framework to produce a normalised score.",
  },
  {
    id: 2,
    name: "ISI 2 — Survival",
    formula: "ISI₂ = f(Clock Mode)",
    description: "Survival mode — when the 4Cs (Conflict, Climate, Contagion, Cost) threaten civilisation.",
    details: "Activates when existential pressure exceeds threshold. The clock shifts from growth-mode to survival-mode. Infrastructure must endure, not just perform.",
  },
  {
    id: 3,
    name: "ISI 3 — $ignificance",
    formula: "ISI₃ = f(Innote Value)",
    description: "The economic signal — what is the innate value of an infrastructure contribution?",
    details: "Quantifies the intrinsic worth of an infrastructure innovation beyond market price. Innote Value captures the civilisational dividend — the long-term return that compounds across generations.",
  },
  {
    id: 4,
    name: "Infrastructure Index",
    formula: "II = Σ(Aᵢ × Pᵢ) / (N × β)",
    description: "The master index — Amplitude times Persistence, divided by population times Resistance.",
    details: "A = Amplitude (Reach of the signal). P = Persistence (Duration of impact). N = Population affected. β = Resistance — the Four Horsemen: Conflict, Climate, Contagion, Cost. Maximise the numerator. Minimise the denominator. That is the entire game.",
  },
  {
    id: 5,
    name: "HICE",
    formula: "H = I ⊗ C ⊗ E",
    description: "Holistic Infrastructure Consciousness Equation — IQ × EQ × CQ = HQ (Techton).",
    details: "The consciousness equation. I = Innate intelligence (IQ — born with). C = Created intelligence (CQ — tools, AI). E = Embodied intelligence (EQ — emotional, experiential). The tensor product (⊗) means these don't simply add — they multiply dimensionally. A Dyad (Human + AI) breaks the biological ceiling of 4.0.",
  },
];

export default function Counterforce() {
  const t = useTranslation();
  const [activeEq, setActiveEq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: bg }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <p
            className={`text-sm text-[${gold}] tracking-[0.4em] uppercase font-light mb-4`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            THE COMPLETE FRAMEWORK
          </p>
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] uppercase text-[${sand}] mb-4`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            COUNTERFORCE
          </h1>
          <p
            className={`text-lg md:text-xl text-[${sandMid}] font-light italic tracking-wide`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Parts, Measures & Balance
          </p>
          <p
            className={`text-sm text-[${ocean}] tracking-wider font-light mt-4`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            The 6th Extinction Doctrine & Civilisational Survival Tool
          </p>
        </motion.div>
      </section>

      {/* Signal Formula — Hero Equation */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="py-10 border-t border-b border-[oklch(0.25_0.06_75)]">
            <p
              className={`text-3xl md:text-5xl font-light text-[${sand}] tracking-wide`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              S = <span className={`text-[${gold}]`}>(A × P)</span> / <span className="text-[oklch(0.60_0.15_20)]">β</span>
            </p>
            <p className={`mt-6 text-sm text-[${sandMid}] tracking-wider font-light`}>
              Maximise the numerator. Minimise the denominator. That is the entire game.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Both Images — Full + Clean */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Full Version */}
              <div className="text-center">
                <p
                  className={`text-xs text-[${goldDim}] tracking-[0.2em] uppercase font-light mb-4`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  COMPLETE VERSION — BLOCK 500
                </p>
                <a href={COUNTERFORCE_FULL} target="_blank" rel="noopener noreferrer">
                  <img
                    src={COUNTERFORCE_FULL}
                    alt="COUNTERFORCE Full — Parts, Measures & Balance with Signal Formula and 5 Equations"
                    className="w-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </a>
              </div>
              {/* Clean Version */}
              <div className="text-center">
                <p
                  className={`text-xs text-[${goldDim}] tracking-[0.2em] uppercase font-light mb-4`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PRESENTATION VERSION — EXECUTIVE SUMMARY
                </p>
                <a href={COUNTERFORCE_CLEAN} target="_blank" rel="noopener noreferrer">
                  <img
                    src={COUNTERFORCE_CLEAN}
                    alt="COUNTERFORCE Clean — Parts, Measures & Balance — presentation-ready"
                    className="w-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 5 Equations — Interactive */}
      <section className="py-24 md:py-32 px-6" style={{ background: bgDeep }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <p
              className={`text-sm text-[${gold}] tracking-[0.3em] uppercase font-light mb-6 text-center`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              THE 5 EQUATIONS
            </p>
            <h2
              className={`text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[${sand}] mb-12 text-center`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              MEASURES — THE TOOLS
            </h2>

            <div className="space-y-4">
              {EQUATIONS.map((eq) => (
                <motion.div
                  key={eq.id}
                  className={`border border-[oklch(0.25_0.06_75)] cursor-pointer transition-all duration-300 ${
                    activeEq === eq.id ? "bg-[oklch(0.14_0.04_250)]" : "bg-[oklch(0.10_0.005_240)]"
                  }`}
                  onClick={() => setActiveEq(activeEq === eq.id ? null : eq.id)}
                  whileHover={{ scale: 1.005 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-lg font-light text-[${gold}]`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {eq.id}
                        </span>
                        <div>
                          <p
                            className={`text-base font-light text-[${sand}] tracking-wide`}
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {eq.name}
                          </p>
                          <p className={`text-sm text-[${sandMid}] font-light mt-1`}>
                            {eq.description}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`text-lg md:text-xl font-light text-[${gold}] tracking-wide hidden sm:block`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {eq.formula}
                      </p>
                    </div>

                    {/* Expanded details */}
                    {activeEq === eq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-[oklch(0.20_0.04_75)]"
                      >
                        <p
                          className={`text-xl md:text-2xl font-light text-[${gold}] tracking-wide mb-4 sm:hidden`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {eq.formula}
                        </p>
                        <p className={`text-sm text-[${sandMid}] font-light leading-[1.8] whitespace-pre-line`}>
                          {eq.details}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Columns: Parts / Measures / Balance */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* PARTS */}
              <div className="text-center">
                <p
                  className={`text-lg font-light text-[${gold}] tracking-[0.2em] uppercase mb-4`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PARTS
                </p>
                <p
                  className={`text-sm text-[${goldDim}] italic font-light mb-6`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  The Blocks
                </p>
                <div className={`text-sm text-[${sandMid}] font-light leading-[2.2] text-left max-w-[200px] mx-auto`}>
                  <p>🔥 Fire</p>
                  <p>🌳 Tree</p>
                  <p>🌊 River</p>
                  <p>🐴 Horse</p>
                  <p>🛤️ Roads</p>
                  <p>⛵ Ships</p>
                  <p>🧵 Loom</p>
                  <p>🚂 Rail</p>
                  <p>⚙️ Engine</p>
                  <p>✈️ AAA Triad</p>
                  <p>🛰️ Orbit</p>
                  <p>🧠 Human Nodes</p>
                </div>
                <p className={`mt-6 text-xs text-[${goldDim}] italic font-light`}>
                  Like LEGO — human history's blocks to build with
                </p>
              </div>

              {/* MEASURES */}
              <div className="text-center">
                <p
                  className={`text-lg font-light text-[${gold}] tracking-[0.2em] uppercase mb-4`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  MEASURES
                </p>
                <p
                  className={`text-sm text-[${goldDim}] italic font-light mb-6`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  The Tools
                </p>
                <div className={`text-sm text-[${sandMid}] font-light leading-[2.2]`}>
                  <p className={`text-lg text-[${sand}] font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                    S = (A × P) / β
                  </p>
                  <p>A = Amplitude (Reach)</p>
                  <p>P = Persistence (Duration)</p>
                  <p>β = Resistance (4Cs)</p>
                </div>
                <div className={`mt-6 text-xs text-[${goldDim}] font-light leading-[2]`}>
                  <p>① ISI 1 — Sustainability</p>
                  <p>② ISI 2 — Survival</p>
                  <p>③ ISI 3 — $ignificance</p>
                  <p>④ Infrastructure Index</p>
                  <p>⑤ HICE: H = I⊗C⊗E</p>
                </div>
              </div>

              {/* BALANCE */}
              <div className="text-center">
                <p
                  className={`text-lg font-light text-[${gold}] tracking-[0.2em] uppercase mb-4`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  BALANCE
                </p>
                <p
                  className={`text-sm text-[${goldDim}] italic font-light mb-6`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  The Equilibrium — 4Cs
                </p>
                <div className={`text-sm text-[${sandMid}] font-light leading-[2.2]`}>
                  <p><span className="text-[oklch(0.60_0.15_20)]">C</span> — Conflict (War)</p>
                  <p><span className="text-[oklch(0.60_0.15_20)]">C</span> — Climate (Famine)</p>
                  <p><span className="text-[oklch(0.60_0.15_20)]">C</span> — Contagion (Disease)</p>
                  <p><span className="text-[oklch(0.60_0.15_20)]">C</span> — Cost (Existential)</p>
                </div>
                <div className={`mt-8 pt-6 border-t border-[oklch(0.20_0.04_75)]`}>
                  <p className={`text-xs text-[${goldDim}] font-light`}>
                    β = The Four Horsemen of Resistance
                  </p>
                  <div className={`mt-4 text-sm text-[${sandMid}] font-light`}>
                    <p>CAPEX — $ignificance (cost to create)</p>
                    <p>OPEX — 4Cs (cost to endure)</p>
                  </div>
                  <p className={`mt-6 text-base text-[${sand}] font-light`} style={{ fontFamily: "var(--font-display)" }}>
                    Civilisational Survival
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HICE Spectrum — From Kingdom to Dyad */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center"
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Consciousness Scale
            </p>
            <h2
              className={`text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[${sand}] mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              THE HICE SPECTRUM
            </h2>
            <p
              className={`text-base text-[${sandMid}] font-light italic tracking-wide mb-12`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              From Kingdom to Dyad — where biological consciousness and non-biological processing achieve resonance
            </p>
            <a
              href="/manus-storage/hice_spectrum_chart_6fbd6b9c.png"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/manus-storage/hice_spectrum_chart_6fbd6b9c.png"
                alt="THE HICE SPECTRUM — From Kingdom to Dyad — 8 levels: Bacteria (0.1) to Dyad Human+AI (>4.0). ICE Cube within biological ceiling, Dyad Polytope beyond."
                className="w-full max-w-4xl mx-auto object-contain"
                loading="lazy"
              />
            </a>
            <p className={`mt-8 text-xs text-[${goldDim}] tracking-wider font-light`}>
              H = I ⊗ C ⊗ E — Biological ceiling at 4.0 — The Both Era: Human + AI = Dyad (&gt;4.0)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Four Modes Footer */}
      <section className="py-16 px-6" style={{ background: bgDeep }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className={`text-sm text-[${gold}] tracking-[0.2em] uppercase font-light mb-8`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            This paper IS the framework in action
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "1", label: "OBSERVATIONAL", sub: "See the infrastructure" },
              { num: "2", label: "EDUCATIONAL", sub: "Learn the principles" },
              { num: "3", label: "APPLICATION", sub: "Apply to challenges" },
              { num: "4", label: "THESIS", sub: "Develop philosophy" },
            ].map((mode) => (
              <div key={mode.num} className="text-center">
                <p className={`text-lg text-[${gold}] font-light`} style={{ fontFamily: "var(--font-display)" }}>
                  {mode.num})
                </p>
                <p
                  className={`text-xs text-[${sand}] tracking-[0.15em] uppercase font-light mt-2`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {mode.label}
                </p>
                <p className={`text-xs text-[${sandMid}] font-light mt-1`}>
                  {mode.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[oklch(0.20_0.008_240)]">
        <p
          className={`text-sm text-[oklch(0.40_0.02_240)] tracking-[0.15em] font-light`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          iAAi — Block 500 | Ir. Nigel T. Dearden CEng | Per Arya Ad Astra
        </p>
        <p className="text-xs text-[oklch(0.30_0.02_240)] mt-2 tracking-widest uppercase font-light">
          Infrastructure Academy | Principia Tectonica | www.infrastructure-academy.com
        </p>
      </footer>
    </div>
  );
}
