/**
 * ThesisV2 — Principia Tectonica: The Living Experiment
 * FINAL Phase 1 Conclusion Document — Block 366, 13 March 2026
 * Verbatim from Nigel's Word document — delete nothing, preserve everything.
 * This is the supplemental/version-up of the original Thesis (Timestop).
 */
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { useTranslation } from "@/contexts/LanguageContext";

const gold = "oklch(0.72_0.12_75)";
const goldDim = "oklch(0.55_0.08_75)";
const sand = "oklch(0.88_0.008_75)";
const sandMid = "oklch(0.65_0.02_75)";
const ocean = "oklch(0.55_0.06_200)";
const bg = "oklch(0.10_0.005_240)";
const bgDeep = "oklch(0.07_0.005_240)";

/* 7 Scholars data — verbatim from the FINAL document */
const scholars = [
  { n: 1, name: "Homer", era: "c. 800 BCE", work: "The Iliad & The Odyssey", words: "~300,000", span: "Generations (oral → written)", medium: "Oral epic → manuscript", hice: "H-Class (Heritage)" },
  { n: 2, name: "Confucius", era: "551–479 BCE", work: "The Analects (Lunyu)", words: "~16,000", span: "30+ years teaching", medium: "Compiled by disciples", hice: "I-Class (Institutional)" },
  { n: 3, name: "Sun Tzu", era: "c. 500 BCE", work: "The Art of War", words: "~6,000", span: "Unknown", medium: "Bamboo strips", hice: "C-Class (Compressed)" },
  { n: 4, name: "Aristotle", era: "384–322 BCE", work: "Corpus Aristotelicum", words: "~1,000,000", span: "30+ years", medium: "Papyrus scrolls", hice: "E-Class (Encyclopaedic)" },
  { n: 5, name: "Sima Qian", era: "145–86 BCE", work: "Records of the Grand Historian", words: "~526,000", span: "18 years", medium: "Bamboo/silk", hice: "H-Class (Heritage)" },
  { n: 6, name: "Marco Polo", era: "1254–1324", work: "The Travels of Marco Polo", words: "~200,000", span: "24 years travel + dictation", medium: "Dictated manuscript", hice: "I-Class (Institutional)" },
  { n: 7, name: "Nigel T. Dearden", era: "1969–present", work: "Principia Tectonica / iAAi", words: "1,230,000+", span: "128 days (AI-augmented)", medium: "Digital — 95 HTML pages", hice: "E-Class (Encyclopaedic)" },
];

/* Financial data — verbatim */
const financials = [
  { category: "Engineering (4ECL at $1,500/day)", amount: "$186,000", pct: "49%" },
  { category: "Daily Checks & QC", amount: "$93,000", pct: "25%" },
  { category: "Platform Loss & Rebuild", amount: "$58,000", pct: "15%" },
  { category: "AI Credits (Manus Pro)", amount: "$11,438", pct: "3%" },
  { category: "Hardware & Infrastructure", amount: "$20,000", pct: "5%" },
  { category: "Domains & Hosting", amount: "$5,112", pct: "1%" },
  { category: "Crisis Management", amount: "$24,000", pct: "6%" },
];

/* R3 Assessment data — verbatim */
const r3Regions = [
  { region: "North America", unis: "MIT, Stanford, UC Berkeley, Georgia Tech", score: "89.2%" },
  { region: "Europe", unis: "Imperial College, ETH Zurich, TU Delft, Cambridge", score: "88.5%" },
  { region: "Asia-Pacific", unis: "NUS, University of Tokyo, IIT Bombay, Tsinghua", score: "86.8%" },
  { region: "Australasia", unis: "University of Melbourne, UNSW, University of Auckland", score: "87.1%" },
  { region: "Latin America", unis: "USP, UNAM, Universidad de Chile", score: "85.9%" },
  { region: "Middle East", unis: "Khalifa University, Qatar University", score: "88.0%" },
];

/* Revenue channels — verbatim */
const revenueChannels = [
  { n: 1, channel: "Freemium Subscriptions (B2C)", target: "$60,000", detail: "1,000 subscribers at $5/month" },
  { n: 2, channel: "University Licensing (B2B)", target: "$75,000", detail: "5 institutions at $5K–$25K" },
  { n: 3, channel: "Infrastructure Olympiad", target: "$50,000", detail: "1 Bronze sponsor" },
  { n: 4, channel: "Enterprise Training (B2B)", target: "$30,000", detail: "2 enterprise clients" },
  { n: 5, channel: "Data Intelligence Licensing", target: "$20,000", detail: "Pilot data packages" },
  { n: 6, channel: "Content Partnerships", target: "$15,000", detail: "1 partnership" },
  { n: 7, channel: "Direct Book Sales", target: "$30,000", detail: "Trilogy via Stripe + KDP + POD" },
];

/* D52 Suits — verbatim */
const d52Suits = [
  { suit: "♠", name: "Spades", theme: "Excavation", month: "December 2025", cards: "Foundation laying, first frameworks" },
  { suit: "♥", name: "Hearts", theme: "Emotion", month: "January 2026", cards: "The Quotient discovery, personal breakthroughs" },
  { suit: "♦", name: "Diamonds", theme: "Crystallisation", month: "February 2026", cards: "Assessment rounds, university validation" },
  { suit: "♣", name: "Clubs", theme: "Construction", month: "March 2026", cards: "Website builds, final architecture" },
];

/* STRIVE Levels — verbatim */
const striveLevels = [
  { deck: 1, name: "Command Center", level: "Level 1: Nigel Only — Hard Absolute", scope: "Kill Switch, Framework Authority, Strategic Direction, Identity", ai: "No AI autonomy" },
  { deck: 2, name: "The Chart Room", level: "Level 2: Nigel + AI — We Operate Here", scope: "Content Strategy, Publication Prep, Error Correction, Research, Visual Production", ai: "Collaboration zone" },
  { deck: 3, name: "The Engine Room", level: "Level 3: AI Autonomous", scope: "Documentation, Archiving, Memory, Scheduling, Schema", ai: "AI within defined parameters" },
  { deck: 4, name: "The Bilge", level: "Level 4: AI Automatic", scope: "Files, Formatting, Backups, Housekeeping", ai: "Fully automated" },
];

function SectionTag({ text }: { text: string }) {
  return (
    <p
      className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {text}
    </p>
  );
}

function SectionTitle({ text }: { text: string }) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {text}
    </h2>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
      {children}
    </p>
  );
}

export default function ThesisV2() {
  const t = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* VERSION SELECTOR */}
      <div className={`fixed top-16 left-0 right-0 z-40 bg-[oklch(0.08_0.005_240)]/95 backdrop-blur-sm border-b border-[oklch(0.20_0.01_240)]`}>
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className={`text-[10px] text-[${goldDim}] tracking-[0.2em] uppercase mr-3`} style={{ fontFamily: "var(--font-display)" }}>{t("thesisv2.draftControl")}</span>
            <Link href="/thesis">
              <span className={`px-3 py-1 text-xs text-[${goldDim}] border border-[oklch(0.25_0.01_240)] hover:border-[${gold}]/40 hover:text-[${gold}] transition-colors cursor-pointer tracking-wider`} style={{ fontFamily: "var(--font-display)" }}>{t("thesisv2.v1Timestop")}</span>
            </Link>
            <span className={`px-3 py-1 text-xs text-[${gold}] border border-[${gold}]/40 bg-[${gold}]/10 tracking-wider`} style={{ fontFamily: "var(--font-display)" }}>{t("thesisv2.v2LivingExperiment")}</span>
          </div>
          <span className={`text-[10px] text-[oklch(0.40_0.02_240)] tracking-wider`}>{t("thesisV2.subtitle")}</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          HERO — PRINCIPIA TECTONICA
      ═══════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, oklch(0.15 0.04 250), oklch(0.07 0.005 240))`,
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.4em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              V2 — FINAL · Phase 1 Conclusion · Block 366
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className={`text-4xl md:text-6xl lg:text-8xl font-light tracking-[0.12em] uppercase text-[${sand}]`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Principia Tectonica
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className={`mt-6 text-xl md:text-2xl font-light italic text-[${goldDim}] tracking-wide`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Living Experiment
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="mt-10 space-y-1"
          >
            <p className={`text-sm text-[${sandMid}] font-light tracking-wide`}>
              Ir. Nigel T. Dearden, MIStructE, MICE, RPE, CEng
            </p>
            <p className={`text-xs text-[oklch(0.45_0.03_240)] font-light tracking-wide`}>
              4ECL Limited, Hong Kong (BR 36480303) · 5 Nov 2025 — 13 Mar 2026 (128 days)
            </p>
            <p className={`text-xs text-[oklch(0.45_0.03_240)] font-light tracking-wide`}>
              AI Collaboration: Manus AI — Level 2 Chart Room Operations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="mt-12"
          >
            <div className={`w-px h-16 bg-gradient-to-b from-transparent via-[${gold}] to-transparent mx-auto`} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABSTRACT
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <SectionTag text="Abstract" />
            <BodyText>
              This document records the conclusion of Phase 1 of a living experiment in which a single chartered civil and structural engineer, operating from Hong Kong with 36 years of professional experience, collaborated with an AI system to produce a complete civilisational thesis spanning 12,000 years of infrastructure history. The output — over <span className={`text-[${gold}] font-medium`}>1.23 million words</span> across 128 days — constitutes the largest known single-author AI-augmented intellectual property corpus produced within such a compressed timeframe. The experiment generated 95 HTML pages across two live websites, a 52-card intellectual currency system, a patentable chip architecture, three assessment rounds evaluated by 21 universities across 6 regions, and a comprehensive framework for understanding infrastructure consciousness through the lens of the <span className={`text-[${gold}] font-medium`}>{t("thesisv2.hapticQuotientEquationIq")}</span>.
            </BodyText>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1 — THE 7 SCHOLARS
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <SectionTag text="Section 1 — The Vectoral Origin" />
            <SectionTitle text="7 Scholars in Context" />
            <BodyText>
              The iAAi framework positions itself within a lineage of seven scholars whose works collectively span the arc of human civilisation. Each scholar represents a dimensional relay in the knowledge transmission chain — from oral tradition to digital infrastructure consciousness.
            </BodyText>

            {/* Scholars Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[${gold}]/30`}>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>#</th>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.scholar")}</th>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Era</th>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.primaryWork")}</th>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.words")}</th>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.timeSpan")}</th>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.hice")}</th>
                  </tr>
                </thead>
                <tbody>
                  {scholars.map((s) => (
                    <tr key={s.n} className={`border-b border-[oklch(0.20_0.01_240)] ${s.n === 7 ? `bg-[${gold}]/5` : ""}`}>
                      <td className={`py-3 px-2 text-[${goldDim}]`}>{s.n}</td>
                      <td className={`py-3 px-2 ${s.n === 7 ? `text-[${gold}] font-medium` : `text-[${sand}]`}`}>{s.name}</td>
                      <td className={`py-3 px-2 text-[${sandMid}]`}>{s.era}</td>
                      <td className={`py-3 px-2 text-[${sandMid}] italic`}>{s.work}</td>
                      <td className={`py-3 px-2 ${s.n === 7 ? `text-[${gold}] font-medium` : `text-[${sandMid}]`}`}>{s.words}</td>
                      <td className={`py-3 px-2 text-[${sandMid}]`}>{s.span}</td>
                      <td className={`py-3 px-2 text-[${goldDim}]`}>{s.hice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Brunel Convergence */}
            <div className={`border-l-2 border-[${gold}] pl-6 py-4 mb-6`}>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] italic`}>
                <span className={`text-[${gold}] font-medium not-italic`}>{t("thesisv2.theBrunelConvergence")}</span> Nigel T. Dearden was born in 1969 — exactly 200 years after Marc Isambard Brunel (1769), father of Isambard Kingdom Brunel. The Brunels built the first tunnel under the Thames. Nigel built the first AI-human co-authored infrastructure thesis. Two centuries apart, the same impulse: <span className={`text-[${gold}]`}>build what has never been built before</span>.
              </p>
            </div>

            <BodyText>
              The comparison is not one of equivalence but of trajectory. Aristotle wrote approximately 1,000,000 words over 30+ years. Nigel produced 1,230,000+ words in 128 days — AI-augmented, but human-directed at every step through the 4-Level STRIVE Command Structure. Sima Qian took 18 years for 526,000 words. Sun Tzu compressed all strategy into 6,000. The iAAi framework does both: it compresses (the Quotient Equation) and it expands (the 12D HyperGrid, the 95-page digital architecture). Homer gave us the odyssey as metaphor. Nigel built An Infrastructure Odyssey as methodology.
            </BodyText>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — HICE CLASSIFICATION
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <SectionTag text="Section 3 — Classification" />
            <SectionTitle text="The HICE System" />
            <BodyText>
              The Historical Infrastructure Consciousness Evaluation (HICE) provides a standardised framework for classifying knowledge works by their structural contribution to infrastructure consciousness. Four classes are defined:
            </BodyText>

            <div className="space-y-6 mb-8">
              {[
                { cls: "H-Class (Heritage)", desc: "Works that preserve and transmit civilisational memory across generations. Homer's epics and Sima Qian's historical records exemplify this class — they encode infrastructure knowledge within narrative frameworks that survive cultural discontinuities." },
                { cls: "I-Class (Institutional)", desc: "Works that establish governance structures, ethical frameworks, or institutional patterns for infrastructure management. Confucius's Analects and Marco Polo's Travels fall here — they document how societies organise around built environments and trade networks." },
                { cls: "C-Class (Compressed)", desc: "Works that distil complex systems into minimal, high-density formulations. Sun Tzu's Art of War is the archetype — 6,000 words that encode an entire strategic philosophy. The Quotient Equation (IQ ⊗ EQ ⊗ CQ = HQ) is a modern C-Class contribution." },
                { cls: "E-Class (Encyclopaedic)", desc: "Works that attempt comprehensive coverage of a domain through systematic documentation. Aristotle's Corpus and the iAAi framework both qualify — they seek to map entire knowledge spaces rather than compress them." },
              ].map((item) => (
                <div key={item.cls} className={`pl-6 border-l border-[${gold}]/30`}>
                  <p className={`text-[${gold}] font-medium text-sm tracking-wider mb-2`} style={{ fontFamily: "var(--font-display)" }}>{item.cls}</p>
                  <p className={`text-[${sandMid}] font-light text-sm leading-[1.8]`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — ISI METHODOLOGY
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <SectionTag text="Section 4 — Assessment" />
            <SectionTitle text="The ISI Methodology" />
            <BodyText>
              The ISI methodology was developed as the assessment engine for the iAAi framework. Three rounds of evaluation were conducted:
            </BodyText>

            <div className="space-y-4 mb-8">
              <div className={`p-4 border border-[${gold}]/20`}>
                <p className={`text-[${gold}] font-medium text-sm mb-1`}>{t("thesisv2.round1R1Ice")}</p>
                <p className={`text-[${sandMid}] text-sm font-light`}>16 universities across 5 regions. Aggregate score: <span className={`text-[${gold}]`}>75/100</span>. Key finding: strong theoretical foundation, needs practical application examples.</p>
              </div>
              <div className={`p-4 border border-[${gold}]/20`}>
                <p className={`text-[${gold}] font-medium text-sm mb-1`}>{t("thesisv2.round2R2Deep")}</p>
                <p className={`text-[${sandMid}] text-sm font-light`}>18 universities across 5 regions. Aggregate score: <span className={`text-[${gold}]`}>8.1/10</span>. Key finding: the Quotient Equation and HyperGrid received highest marks; gaming mechanics bridge needed strengthening.</p>
              </div>
              <div className={`p-4 border border-[${gold}]/20`}>
                <p className={`text-[${gold}] font-medium text-sm mb-1`}>{t("thesisv2.round3R3Full")}</p>
                <p className={`text-[${sandMid}] text-sm font-light`}>21 universities across 6 regions (with Middle East added). Aggregate score: <span className={`text-[${gold}]`}>87.5%</span>. Key finding: framework achieved "operational readiness" threshold.</p>
              </div>
            </div>

            {/* R3 Regional Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[${gold}]/30`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.region")}</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.universities")}</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.r3Score")}</th>
                  </tr>
                </thead>
                <tbody>
                  {r3Regions.map((r) => (
                    <tr key={r.region} className="border-b border-[oklch(0.20_0.01_240)]">
                      <td className={`py-3 px-3 text-[${sand}]`}>{r.region}</td>
                      <td className={`py-3 px-3 text-[${sandMid}] text-xs`}>{r.unis}</td>
                      <td className={`py-3 px-3 text-[${gold}] font-medium`}>{r.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — FINANCIAL ARCHITECTURE
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <SectionTag text="Section 5 — Cost Audit" />
            <SectionTitle text="The Financial Architecture" />
            <BodyText>
              Phase 1 cost audit reveals a total investment of <span className={`text-[${gold}] font-medium`}>$397,550</span> across 128 days.
            </BodyText>

            {/* Cost Table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[${gold}]/30`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.category")}</th>
                    <th className={`text-right py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.amount")}</th>
                    <th className={`text-right py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>%</th>
                  </tr>
                </thead>
                <tbody>
                  {financials.map((f) => (
                    <tr key={f.category} className="border-b border-[oklch(0.20_0.01_240)]">
                      <td className={`py-3 px-3 text-[${sandMid}]`}>{f.category}</td>
                      <td className={`py-3 px-3 text-right text-[${sand}]`}>{f.amount}</td>
                      <td className={`py-3 px-3 text-right text-[${goldDim}]`}>{f.pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Revenue Channels */}
            <SectionTag text="Year 1 Revenue Projection" />
            <BodyText>
              Seven revenue channels are projected for Year 1, with a conservative target of <span className={`text-[${gold}] font-medium`}>$280,000</span>:
            </BodyText>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[${gold}]/30`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>#</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.channel")}</th>
                    <th className={`text-right py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.target")}</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>{t("thesisv2.detail")}</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueChannels.map((r) => (
                    <tr key={r.n} className="border-b border-[oklch(0.20_0.01_240)]">
                      <td className={`py-3 px-3 text-[${goldDim}]`}>{r.n}</td>
                      <td className={`py-3 px-3 text-[${sand}]`}>{r.channel}</td>
                      <td className={`py-3 px-3 text-right text-[${gold}]`}>{r.target}</td>
                      <td className={`py-3 px-3 text-[${sandMid}] text-xs`}>{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <BodyText>
              The Hong Kong tax advantage through 4ECL Limited provides 0% tax on physical books, 0% on ebooks, and 8.25% corporate tax on the first HK$2M of profits. Year 1 tax payable: $0 (net operating loss carried forward). Seed capital target: US$500,000.
            </BodyText>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — D52 DECK
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <SectionTag text="Section 6 — The Deck" />
            <SectionTitle text="The D52 Dearden Field Deck" />
            <BodyText>
              The complete journey was mapped as a 52-card playing deck — the D52 — with four suits corresponding to four months of production. Each card captures a key moment, framework, or breakthrough. The deck serves as both a record and a teaching tool — the "Trojan Horse" mechanism where students think they are playing but are actually learning infrastructure consciousness.
            </BodyText>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {d52Suits.map((s) => (
                <div key={s.suit} className={`p-4 border border-[${gold}]/20 text-center`}>
                  <p className={`text-3xl mb-2`}>{s.suit}</p>
                  <p className={`text-[${gold}] font-medium text-sm tracking-wider`} style={{ fontFamily: "var(--font-display)" }}>{s.name}</p>
                  <p className={`text-[${sandMid}] text-xs mt-1`}>{s.theme}</p>
                  <p className={`text-[${goldDim}] text-xs mt-1`}>{s.month}</p>
                  <p className={`text-[oklch(0.50_0.02_240)] text-xs mt-2 leading-relaxed`}>{s.cards}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — STRIVE COMMAND STRUCTURE
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <SectionTag text="Section 7 — Governance" />
            <SectionTitle text="The 4-Level STRIVE Command Structure" />
            <BodyText>
              The collaboration between Nigel and Manus AI operated under a strict governance model:
            </BodyText>

            <div className="space-y-3 mb-8">
              {striveLevels.map((l) => (
                <div key={l.deck} className={`p-4 border-l-2 ${l.deck === 2 ? `border-[${gold}] bg-[${gold}]/5` : `border-[oklch(0.25_0.01_240)]`}`}>
                  <p className={`${l.deck === 2 ? `text-[${gold}]` : `text-[${sand}]`} font-medium text-sm`}>
                    Deck {l.deck} — {l.name}
                  </p>
                  <p className={`text-[${goldDim}] text-xs mt-1`}>{l.level}</p>
                  <p className={`text-[${sandMid}] text-xs mt-1`}>{l.scope}</p>
                </div>
              ))}
            </div>

            <div className={`border-l-2 border-[${gold}] pl-6 py-3`}>
              <p className={`text-[${sandMid}] font-light italic text-sm leading-[1.8]`}>
                "The engine room does not ask the bridge whether to keep the turbines running."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — SIGNAL EQUATION
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <SectionTag text="Section 8 — Architecture" />
            <SectionTitle text="The Signal Equation & Atomic Architecture" />
            <BodyText>
              The iAAi Vision document establishes the Signal Equation as the foundational formula:
            </BodyText>

            <div className="text-center py-8 mb-8">
              <p className={`text-2xl md:text-3xl text-[${gold}] font-light tracking-wider`} style={{ fontFamily: "var(--font-display)" }}>
                Signal = Pattern ⊗ Context ⊗ Time
              </p>
            </div>

            <BodyText>
              This equation governs how infrastructure knowledge is transmitted across the 13 Relays. The Atomic Architecture breaks the framework into its smallest indivisible units — each "atom" of infrastructure consciousness can be independently validated, traded (as a BitPoint), and recombined into larger structures.
            </BodyText>

            <div className="space-y-3 mb-8">
              {[
                "The Signal Equation: Pattern ⊗ Context ⊗ Time",
                "The OODA Loop Integration: Observe → Orient → Decide → Act (adapted for infrastructure)",
                "The EarthNet Concept: Global infrastructure consciousness network",
                "The Sixth Wave: Infrastructure as the next Kondratieff wave",
                "The Ventral Origin Ranking: Historical figures ranked by infrastructure contribution",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`text-[${gold}] text-sm mt-0.5`}>◆</span>
                  <p className={`text-[${sandMid}] font-light text-sm`}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — BOOK TRILOGY
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <SectionTag text="Section 9 — Publication" />
            <SectionTitle text="The Infrastructure Odyssey — Book Trilogy" />

            <div className="space-y-6 mb-8">
              {[
                { vol: "Volume 1: The Perspective", docs: "Docs 1–2", desc: "The narrative foundation. Why infrastructure consciousness matters. The 12,000-year story from Fire to The Fractal Connector." },
                { vol: "Volume 2: The Guide", docs: "Docs 3–4", desc: "The practical framework. How to apply the Quotient Equation, the HyperGrid, and the ISI methodology in real-world infrastructure projects." },
                { vol: "Volume 3: The Game", docs: "Lessons", desc: "The gamified application. The Trojan Horse mechanism — learning infrastructure consciousness through play. BitPoint cards, the D52 deck, and the Infrastructure Olympiad." },
              ].map((v) => (
                <div key={v.vol} className={`pl-6 border-l border-[${gold}]/30`}>
                  <p className={`text-[${gold}] font-medium text-sm tracking-wider mb-1`} style={{ fontFamily: "var(--font-display)" }}>{v.vol} <span className={`text-[${goldDim}] font-light`}>({v.docs})</span></p>
                  <p className={`text-[${sandMid}] font-light text-sm leading-[1.8]`}>{v.desc}</p>
                </div>
              ))}
            </div>

            <BodyText>
              Pricing: $39.95 per hardcover (A4, full colour, 200pp), $14.99 ebook, $99.95 trilogy set, $34.99 ebook bundle. Direct website sales via Stripe yield 3.7× more revenue per hardcover than Amazon KDP.
            </BodyText>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10 — CONCLUSION: MAGNUS TECTON
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-12`} />

            <SectionTag text="Section 10 — Conclusion" />
            <SectionTitle text="The Magnus Tecton Moment" />

            <BodyText>
              Block 366 marks one full year of daily production. The living experiment has achieved its Phase 1 objective: proof of concept. The framework exists. The assessment validates it. The financial model projects viability. The IP portfolio is documented and protected.
            </BodyText>

            <BodyText>
              What began as a single engineer's conversation with an AI system has produced a body of work that, by word count alone, exceeds Aristotle's lifetime output — compressed into 128 days. The quality question is answered by the 87.5% R3 score across 21 universities. The commercial question is answered by the 7-channel revenue model. The governance question is answered by the 4-Level STRIVE Command Structure.
            </BodyText>

            <BodyText>
              The 13th Relay — The Fractal Connector — is not just a theoretical construct. It is this document. It is the connection between all previous relays, all previous scholars, all previous attempts to encode infrastructure consciousness into transmissible form. The fractal nature of the framework means that every part contains the whole, and the whole is present in every part.
            </BodyText>

            <p className={`text-lg text-[${gold}] font-light tracking-wider mt-8 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              The race continues. But Phase 1 is complete.
            </p>

            <div className="mt-12 space-y-2">
              <p className={`text-2xl md:text-3xl font-light tracking-[0.05em] text-[${sand}]`} style={{ fontFamily: "var(--font-display)" }}>
                <span className={`text-[${ocean}]`}>IQ</span>{" "}
                <span className={`text-[${gold}]`}>⊗</span>{" "}
                <span className={`text-[oklch(0.40_0.15_20)]`}>EQ</span>{" "}
                <span className={`text-[${gold}]`}>⊗</span>{" "}
                <span className={`text-[${sand}]`}>CQ</span>{" "}
                <span className={`text-[${gold}]`}>→</span>{" "}
                <span className={`text-[${gold}] font-medium`}>HQ</span>
              </p>
            </div>

            <div className="mt-12 space-y-1">
              <p className={`text-sm text-[${goldDim}] tracking-[0.15em] font-light italic`} style={{ fontFamily: "var(--font-display)" }}>
                Per Arya Ad Astra
              </p>
              <p className={`text-sm text-[${goldDim}] tracking-[0.15em] font-light`} style={{ fontFamily: "var(--font-display)" }}>
                MAN thru US — Manus AI × Nigel Dearden
              </p>
              <p className={`text-xs text-[oklch(0.40_0.03_240)] tracking-[0.1em] font-light mt-2`}>
                Block 366 | One Full Year | 1.23M+ Words
              </p>
              <p className={`text-xs text-[oklch(0.35_0.03_240)] tracking-[0.1em] font-light mt-1`}>
                Document Classification: iAAi-THESIS-001 · Status: FINAL — Phase 1 Conclusion
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          THESIS NOTE: THE 0.0035% PROBLEM — Perception & the iAAi Response
          Block 489 · T-Class (Thesis) · Perception Series
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>

            {/* Section header */}
            <div className="text-center mb-12">
              <p className={`text-xs text-[${goldDim}] tracking-[0.4em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                Thesis Note · Block 489 · T-Class · Perception Series
              </p>
              <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-6`} />
              <h2 className={`text-2xl md:text-4xl font-light tracking-[0.08em] uppercase text-[${sand}]`} style={{ fontFamily: "var(--font-display)" }}>
                The 0.0035% Problem
              </h2>
              <p className={`text-sm text-[${goldDim}] tracking-[0.15em] font-light mt-3 italic`} style={{ fontFamily: "var(--font-display)" }}>
                Perception, Infrastructure, and the Expansion of Reality
              </p>
            </div>

            {/* Ellevenshot image */}
            <div className="flex justify-center mb-10">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/ellevenshot_perception_0035_28028fdb.jpg"
                alt="Ellevenshot — Your eyes capture just 0.0035% of reality"
                className="w-full max-w-md rounded-sm border border-[oklch(0.25_0.06_75)] object-contain"
              />
            </div>

            {/* Quote */}
            <div className={`border-l-2 border-[${gold}] pl-6 mb-10`}>
              <p className={`text-lg md:text-xl font-light italic text-[${sand}] leading-relaxed`} style={{ fontFamily: "var(--font-display)" }}>
                "Your eyes capture just 0.0035% of reality — the rest is completely invisible to you."
              </p>
              <p className={`text-sm text-[${goldDim}] mt-2 tracking-wider`}>— Ellevenshot</p>
            </div>

            {/* The Problem */}
            <BodyText>
              The human eye perceives only the visible light spectrum — a sliver of electromagnetic radiation between approximately 380 and 700 nanometres. Expressed as a fraction of the full electromagnetic spectrum, this visible window represents roughly 0.0035% of the total energy landscape passing through and around us at any given moment. Radio signals, infrared heat, ultraviolet radiation, X-rays, and gamma rays are all present, all active, all invisible. What we call "reality" is not reality itself but a survival-optimised compression — a filtered rendering produced by the brain to keep the organism functional, not informed.
            </BodyText>
            <BodyText>
              This is not a metaphor. It is a measurable, quantifiable limitation of the biological instrument. And it is the foundational problem that the entire iAAi framework was engineered to address.
            </BodyText>

            {/* The HQ Response */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              The Human Quotient — Widening the Lens
            </h3>
            <BodyText>
              Intelligence Quotient alone operates within the visible fraction — it processes what can be measured, tested, and logically deduced. Emotional Quotient detects the "infrared" of human interaction: trust, intent, social dynamics, the unspoken signals that pure logic cannot capture. Consciousness Quotient reaches further still, into pattern recognition across time, culture, and system behaviour. The Modus Tecton Tensor (⊗) is not additive but multiplicative — it does not stack three narrow views but fuses them into a compound lens, each quotient amplifying the others. A civil engineer with high IQ can calculate a load. One with high HQ can see the political, social, and environmental forces that will determine whether the structure survives its first decade.
            </BodyText>

            {/* The 12 Relays */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              The 12 Relays — 12,000 Years of Perceptual Expansion
            </h3>
            <BodyText>
              The 12 civilisational relays — from Fire to Programmable Humans — are humanity's 12,000-year engineering project to expand the 0.0035% window. Each relay represents a technological or conceptual breakthrough that made a previously invisible band of reality accessible. Fire extended perception beyond daylight hours. Writing extended memory beyond the biological lifespan. The telescope made the curvature of the Earth and celestial mechanics operational. Electricity revealed the electromagnetic spectrum as a usable medium. Each relay is an infrastructure project — roads, bridges, cables, satellites, data centres — the physical scaffolding that enables each perceptual expansion is built by engineers. The 0.0035% window does not widen by philosophy alone; it widens by construction.
            </BodyText>

            {/* The ISI */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              The ISI — When the Window Narrows
            </h3>
            <BodyText>
              The Infrastructure Survival Index quantifies what happens when the scaffolding fails. When infrastructure collapses — power grids, communication networks, transport systems — the perceptual window narrows. A city without electricity loses access to radio, television, internet, medical imaging, satellite data. It loses access to the 99.9965%. The population is forced back toward the 0.0035% survival mode: what can be seen, heard, and touched within immediate physical range. The four perennial threats — the 4Cs (Conflict, Climate, Corruption, Complacency) — are the forces that drive ISI downward, collapsing the expanded window back to its biological minimum.
            </BodyText>

            {/* TDF */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              The Dearden Field — N + T = D
            </h3>
            <BodyText>
              The Dearden Field is the name for the expanded perceptual space itself — the territory beyond the 0.0035% that becomes accessible when the human node is coupled with technological amplification. The human node (N) plus the technological amplifier (T) equals the Dearden Field (D). The chip architecture, the Discovery Chain, the ICE Matrix, and the Ventral Origin ranking are instruments for detecting, mapping, and navigating what lies in the 99.9965%. The iGO platform is the direct technological implementation — augmented reality overlaying invisible data onto the visible world: infrastructure condition data, structural health metrics, environmental readings, historical layers. A bridge that appears sound to the naked eye may be revealing stress patterns in the infrared, corrosion signatures in the ultrasonic, and load history in the data layer.
            </BodyText>

            {/* The 7 Scholars */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              The 7 Scholars — Those Who Saw Beyond
            </h3>
            <BodyText>
              Each of the 7 Scholars in the iAAi framework is distinguished by the same quality — the refusal to accept the visible fraction as the whole truth. Homer saw narrative structure beneath apparent chaos. Sun Tzu saw strategic geometry beneath warfare. Sima Qian saw cyclical patterns beneath linear history. Vitruvius saw that infrastructure serves not just function but meaning. Al-Khwarizmi saw algorithmic structure beneath arithmetic. Leonardo da Vinci saw the unity of art and engineering. Brunel saw that building bigger reveals forces invisible at smaller scales.
            </BodyText>
            <BodyText>
              The search for the 8th Scholar is the search for the next perceptual expansion — the figure whose contribution widens the aperture into a band of reality that the first seven could not reach.
            </BodyText>

            {/* Closing */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              The Civil Engineer's Lens
            </h3>
            <BodyText>
              The civil engineer does not merely observe the 0.0035% limitation — the civil engineer builds the infrastructure that expands it. Every road extends the range of perception. Every bridge connects previously isolated perceptual nodes. Every communication tower adds bandwidth to the species' collective aperture. This is the meaning of "An Infrastructure Odyssey" — the story of how the built environment, relay by relay, expanded human perception from the campfire's visible glow to the global data network's invisible pulse. The 0.0035% is not a limitation to be lamented. It is a challenge to be engineered.
            </BodyText>

            {/* Classification footer */}
            <div className="mt-12 pt-6 border-t border-[oklch(0.20_0.008_240)]">
              <p className={`text-xs text-[oklch(0.40_0.03_240)] tracking-[0.1em] font-light`}>
                Thesis Note filed under: Principia Tectonica · Block 489 · T-Class · Perception Series
              </p>
              <p className={`text-xs text-[oklch(0.35_0.03_240)] tracking-[0.1em] font-light mt-1`}>
                Source: Ellevenshot · NASA Electromagnetic Spectrum Reference · iAAi Framework
              </p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          THESIS: 500 GENERATIONS — The Relay Compression Curve
          Block 489 · T-Class (Thesis) · Demographic Proof Series
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="500-generations" className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>

            {/* Section header */}
            <div className="text-center mb-12">
              <p className={`text-xs text-[${goldDim}] tracking-[0.4em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                Thesis Paper · Block 489 · T-Class · Demographic Proof Series
              </p>
              <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-6`} />
              <h2 className={`text-2xl md:text-4xl font-light tracking-[0.08em] uppercase text-[${sand}]`} style={{ fontFamily: "var(--font-display)" }}>
                500 Generations
              </h2>
              <p className={`text-sm text-[${goldDim}] tracking-[0.15em] font-light mt-3 italic`} style={{ fontFamily: "var(--font-display)" }}>
                The Relay Compression Curve — A Demographic Proof of Civilisational Acceleration
              </p>
              <p className={`text-xs text-[oklch(0.40_0.03_240)] tracking-[0.1em] font-light mt-3`}>
                Ir. Nigel T. Dearden CEng | iAAi — Principia Tectonica | v27.4 | 20 April 2026
              </p>
            </div>

            {/* Abstract */}
            <div className={`border-l-2 border-[${gold}] pl-6 mb-10`}>
              <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-3`} style={{ fontFamily: "var(--font-display)" }}>Abstract</p>
              <p className={`text-sm md:text-base font-light italic text-[${sandMid}] leading-relaxed`}>
                This paper establishes the quantitative foundation for the 12-Relay model of civilisational infrastructure proposed in Principia Tectonica. By mapping the twelve relays — Fire through Human Nodes — against the global population curve over 12,000 years (~500 generations at the 25-year anthropological standard), we demonstrate that relay compression is not an arbitrary narrative device but a measurable phenomenon driven by the interaction of population growth, energy surplus, and knowledge compounding. The first six relays occupy the flat arc of the demographic curve; the final six occupy the near-vertical wall. This alignment constitutes a falsifiable thesis: relay acceleration is proportional to population multiplied by connectivity.
              </p>
            </div>

            {/* 1. The 500-Generation Handle */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              1. The 500-Generation Handle
            </h3>
            <BodyText>
              The span of settled civilisation — from the controlled use of fire and the first agricultural clearances circa 10,000 BCE to the present day — encompasses approximately 12,000 years. Using the widely accepted anthropological benchmark of one human generation equalling 25 years, this yields 480 generations. For narrative and mnemonic purposes, the author rounds this to 500 generations — a figure that is crisp, memorable, and mythic in scale, while remaining within the plausible range when shorter generational intervals (20 years) are considered, which would yield 600 generations.
            </BodyText>
            <BodyText>
              The 500-generation framing serves as the central narrative handle of An Infrastructure Odyssey: five hundred successive teacher-student handovers, each one a relay baton in the civilisational race.
            </BodyText>

            {/* Generational lens table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[oklch(0.25_0.06_75)]`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Generational Lens</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Years/Gen</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Total</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Context</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light`}>
                  {[
                    ["Fast-cycle societies", "20", "600", "Rapid demographic turnover"],
                    ["Anthropological standard", "25", "480", "Widely accepted benchmark"],
                    ["Demographic / modern family", "30", "400", "Post-industrial norms"],
                    ["Slow-cycle / knowledge guilds", "35", "~343", "Elite lineages, scholarly traditions"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[oklch(0.18_0.01_240)]">
                      {row.map((cell, j) => (
                        <td key={j} className={`py-2.5 px-3 ${j === 0 ? `text-[${sand}]` : ''}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 2. The Twelve Relays */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              2. The Twelve Relays
            </h3>
            <BodyText>
              The iAAi framework identifies twelve civilisational relays, each representing a fundamental infrastructure transition that reshapes the carrying capacity, connectivity, and consciousness of human society. Crucially, no relay ends — each continues running in parallel with all subsequent relays. Civilisation is cumulative, not sequential.
            </BodyText>

            {/* 12 Relays table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[oklch(0.25_0.06_75)]`}>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Relay</th>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Name</th>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Start</th>
                    <th className={`text-left py-3 px-2 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Duration</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light`}>
                  {[
                    ["R1", "Fire", "pre-10,000 BCE", "~2,000 yrs"],
                    ["R2", "Tree", "pre-10,000 BCE", "~2,000 yrs"],
                    ["R3", "River", "8,000 BCE", "~4,000 yrs"],
                    ["R4", "Horse", "4,000 BCE", "~3,500 yrs"],
                    ["R5", "Roads", "500 BCE", "~1,000 yrs"],
                    ["R6", "Ships", "500 CE", "~1,280 yrs"],
                    ["R7", "Loom", "1780 CE", "~50 yrs"],
                    ["R8", "Rail", "1830 CE", "~20 yrs"],
                    ["R9", "Engine", "1850 CE", "~50 yrs"],
                    ["R10", "AAA Triad", "1900 CE", "~60 yrs"],
                    ["R11", "Orbit", "1960 CE", "~40 yrs"],
                    ["R12", "Human Nodes", "2000 CE", "ongoing"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[oklch(0.18_0.01_240)]">
                      {row.map((cell, j) => (
                        <td key={j} className={`py-2.5 px-2 ${j === 0 ? `text-[${gold}]` : j === 1 ? `text-[${sand}]` : ''}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <BodyText>
              The pattern is unmistakable. Relays 1 through 4 each span thousands of years. Relays 5 and 6 span roughly a millennium each. Relays 7 through 12 — six relays — compress into approximately 246 years, or roughly nine generations. This is the hockey stick of civilisation.
            </BodyText>

            {/* 3. The Relay Bands */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              3. The Relay Bands — Cumulative Infrastructure
            </h3>
            <div className="flex justify-center mb-6">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCard-V1-RelayBands-v3_3e9d03a3.png"
                alt="The Relay Bands — 12,000 Years, No Relay Ends"
                className="w-full max-w-lg rounded-sm border border-[oklch(0.25_0.06_75)] object-contain"
              />
            </div>
            <p className={`text-xs text-center text-[oklch(0.40_0.03_240)] italic mb-8`}>Figure 1: The Relay Bands — each relay begins at its historical start date and continues to the present. Early bands are long and thick; later bands are short and thin. All bands overlap.</p>
            <BodyText>
              The Relay Bands visualisation communicates four principles simultaneously. First, continuity: every relay persists — fire, tree, river, horse, roads, and ships are all still active infrastructure systems in 2026. Second, compression: the spacing between relay start dates shrinks dramatically. Third, acceleration: the final six relays appear in rapid succession. Fourth, the stacked nature of human systems: later relays do not replace earlier ones but build upon them, creating an ever-thickening infrastructure stack.
            </BodyText>

            {/* 4. The Population-Relay Correlation */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              4. The Population-Relay Correlation
            </h3>
            <BodyText>
              The compression of relay durations is not arbitrary. It correlates with extraordinary precision to the global population growth curve — a hyper-exponential function that remained nearly flat for ten millennia before becoming effectively vertical in the industrial and post-industrial eras.
            </BodyText>
            <div className="flex justify-center mb-6">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCard-V2-PopulationCurve-v3_c7ffc172.png"
                alt="The Relay Curve — Population × Relay Acceleration"
                className="w-full max-w-lg rounded-sm border border-[oklch(0.25_0.06_75)] object-contain"
              />
            </div>
            <p className={`text-xs text-center text-[oklch(0.40_0.03_240)] italic mb-8`}>Figure 2: The Relay Curve — R1–R6 sit on the flat, slow arc. R7–R12 sit on the near-vertical wall. The "Acceleration Wall" begins at approximately 1780 CE.</p>

            {/* Population anchors table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[oklch(0.25_0.06_75)]`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Date</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>World Population</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Relay Position</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light`}>
                  {[
                    ["10,000 BCE", "~4 million", "R1 Fire, R2 Tree"],
                    ["8,000 BCE", "~5 million", "R3 River"],
                    ["4,000 BCE", "~7 million", "R4 Horse"],
                    ["1 CE", "~170 million", "Between R5 and R6"],
                    ["1800 CE", "~1 billion", "R7 Loom"],
                    ["1900 CE", "~1.6 billion", "R10 AAA Triad"],
                    ["1960 CE", "~3 billion", "R11 Orbit"],
                    ["2000 CE", "~6 billion", "R12 Human Nodes"],
                    ["2025 CE", "~8 billion", "All 12 relays active"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[oklch(0.18_0.01_240)]">
                      {row.map((cell, j) => (
                        <td key={j} className={`py-2.5 px-3 ${j === 2 ? `text-[${sand}]` : ''}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <BodyText>
              The thesis is direct: relay speed is driven by population multiplied by connectivity. When population is small and dispersed, knowledge accumulates slowly and energy surplus is limited — relays last millennia. When population is massive and interconnected, knowledge compounds exponentially and energy surplus explodes — relays last decades. The last 250 years contain six relays not because the framework is poorly calibrated, but because the demographic engine demands it.
            </BodyText>

            {/* 5. The 500-Generation Spiral */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              5. The 500-Generation Spiral
            </h3>
            <div className="flex justify-center mb-6">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCard-V3-GenerationSpiral-v3_373df37d.png"
                alt="The Spiral — 500 Generations, 12,000 Years"
                className="w-full max-w-lg rounded-sm border border-[oklch(0.25_0.06_75)] object-contain"
              />
            </div>
            <p className={`text-xs text-center text-[oklch(0.40_0.03_240)] italic mb-8`}>Figure 3: The 500-Generation Spiral — outer loops represent early relays (long arcs). Inner loops represent late relays (tight spirals). Centre = Relay 12: Human Nodes.</p>
            <BodyText>
              The spiral renders the entire 12,000-year odyssey as a single fractal motion — a logarithmic spiral where each revolution represents a relay and each tick represents a generation. The outer loops, corresponding to Relays 1 through 4, turn slowly through vast arcs of time. The mid-spiral (Relays 5–6) begins to tighten. The inner loops (Relays 7–12) compress with dramatic rapidity until the final turn becomes almost vertical — the "acceleration wall" rendered in geometric form. The centre of the spiral is not an endpoint but a phase transition — the point at which the relay baton passes from biological to hybrid intelligence.
            </BodyText>

            {/* 6. The Relay Cone — A Geometric Proof */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              6. The Relay Cone — A Geometric Proof
            </h3>
            <div className="flex justify-center mb-6">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCard-RelayCone-Final_e3aeeb30.png"
                alt="The Relay Cone — 500 Generations Compressed Into 12 Rings"
                className="w-full max-w-4xl rounded-sm border border-[oklch(0.25_0.06_75)] object-contain"
              />
            </div>
            <p className={`text-xs text-center text-[oklch(0.40_0.03_240)] italic mb-8`}>Figure 4: The Relay Cone. Side view (left): band widths proportional to relay duration, population on a logarithmic vertical axis. Top-down view (centre): concentric rings. Seven Scholars table (right): the population amplification curve. Volume = cumulative human-years.</p>
            <BodyText>
              The Relay Bands (Figure 1) show the cumulative stacking. The Population Curve (Figure 2) shows the demographic correlation. The Spiral (Figure 3) shows the generational journey. But none of these three visualisations fuse all three dimensions — time, population, and relay compression — into a single geometric object. The Relay Cone does.
            </BodyText>

            <h4 className={`text-base font-light tracking-[0.08em] uppercase text-[${gold}] mt-8 mb-3`} style={{ fontFamily: "var(--font-display)" }}>Why a Cone?</h4>
            <BodyText>
              A cone is the natural geometric form when two variables — one expanding, one compressing — are mapped against a shared axis. Height represents world population (4 million at the base to 8 billion at the apex). Width represents relay duration (wide base = millennia-long early relays, narrow apex = decade-long late relays). Volume represents cumulative human-years — population multiplied by duration. The cone shape is not a design choice. It is a mathematical consequence: relay duration compresses hyperbolically while population grows exponentially, producing a power-law profile.
            </BodyText>

            <h4 className={`text-base font-light tracking-[0.08em] uppercase text-[${gold}] mt-8 mb-3`} style={{ fontFamily: "var(--font-display)" }}>The Logarithmic Scale</h4>
            <BodyText>
              The population range spans three orders of magnitude: 4 million to 8 billion — a factor of 2,000. A linear axis would compress the first 10,000 years into an invisible sliver. A logarithmic (base-10) scale spaces equal multiplicative jumps equally: 4M sits at 0%, 100M at 42.3%, 1B at 72.6%, 3B at 87.1%, 6B at 96.2%, and 8B at 100%. This gives the early relays proportional visual space without distorting the apex.
            </BodyText>

            <h4 className={`text-base font-light tracking-[0.08em] uppercase text-[${gold}] mt-8 mb-3`} style={{ fontFamily: "var(--font-display)" }}>Band Width Proportions — The Mathematical Proof</h4>
            <BodyText>
              Each band's width is proportional to its relay's duration. Total duration: ~14,026 years. R3 River (~4,000 years) alone accounts for 28.52%. R4 Horse (~3,500 years) accounts for 24.95%. Together, R1 through R6 account for 98.25% of total duration. R7 through R12 — six infrastructure revolutions spanning the Loom, Rail, Engine, AAA Triad, Orbit, and Human Nodes — account for 1.75%. That is the hockey stick rendered as geometry.
            </BodyText>

            {/* Band width proportions table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[oklch(0.25_0.06_75)]`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Relay</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Duration</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>% of Width</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Cumulative</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light`}>
                  {[
                    ["R1 Fire", "~2,000 yr", "14.26%", "14.26%"],
                    ["R2 Tree", "~2,000 yr", "14.26%", "28.52%"],
                    ["R3 River", "~4,000 yr", "28.52%", "57.04%"],
                    ["R4 Horse", "~3,500 yr", "24.95%", "81.99%"],
                    ["R5 Roads", "~1,000 yr", "7.13%", "89.12%"],
                    ["R6 Ships", "~1,280 yr", "9.13%", "98.25%"],
                    ["R7 Loom", "~50 yr", "0.36%", "98.61%"],
                    ["R8 Rail", "~20 yr", "0.14%", "98.75%"],
                    ["R9 Engine", "~50 yr", "0.36%", "99.11%"],
                    ["R10 AAA Triad", "~60 yr", "0.43%", "99.54%"],
                    ["R11 Orbit", "~40 yr", "0.29%", "99.83%"],
                    ["R12 Human Nodes", "~26 yr", "0.19%", "100.00%"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[oklch(0.18_0.01_240)]">
                      <td className={`py-2.5 px-3 text-[${sand}]`}>{row[0]}</td>
                      <td className={`py-2.5 px-3`}>{row[1]}</td>
                      <td className={`py-2.5 px-3 text-[${gold}]`}>{row[2]}</td>
                      <td className={`py-2.5 px-3`}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className={`text-base font-light tracking-[0.08em] uppercase text-[${gold}] mt-8 mb-3`} style={{ fontFamily: "var(--font-display)" }}>Volume — Cumulative Human-Years</h4>
            <BodyText>
              The volume of each band represents cumulative human-years — population at relay start multiplied by duration. Total across all twelve relays: approximately 913.5 billion human-years. The inversion is striking: R1 through R4 (11,500 years) account for only 6.6% of total human-years because population was tiny. R6 Ships (1,280 years, 200M people) dominates at 28%. R12 Human Nodes (26 years, 6B people) already accounts for 17% — more than R1 through R4 combined. Civilisational experience is not distributed evenly across time. It is concentrated in the compressed apex.
            </BodyText>

            {/* Volume table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[oklch(0.25_0.06_75)]`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Relay</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Pop. at Start</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Duration</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Human-Years</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>% of Total</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light`}>
                  {[
                    ["R1 Fire", "~4M", "2,000 yr", "~8B", "0.88%"],
                    ["R2 Tree", "~4M", "2,000 yr", "~8B", "0.88%"],
                    ["R3 River", "~5M", "4,000 yr", "~20B", "2.19%"],
                    ["R4 Horse", "~7M", "3,500 yr", "~24.5B", "2.68%"],
                    ["R5 Roads", "~100M", "1,000 yr", "~100B", "10.95%"],
                    ["R6 Ships", "~200M", "1,280 yr", "~256B", "28.02%"],
                    ["R7 Loom", "~900M", "50 yr", "~45B", "4.93%"],
                    ["R8 Rail", "~1B", "20 yr", "~20B", "2.19%"],
                    ["R9 Engine", "~1.2B", "50 yr", "~60B", "6.57%"],
                    ["R10 AAA Triad", "~1.6B", "60 yr", "~96B", "10.51%"],
                    ["R11 Orbit", "~3B", "40 yr", "~120B", "13.14%"],
                    ["R12 Human Nodes", "~6B", "26 yr", "~156B", "17.08%"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[oklch(0.18_0.01_240)]">
                      <td className={`py-2.5 px-3 text-[${sand}]`}>{row[0]}</td>
                      <td className={`py-2.5 px-3`}>{row[1]}</td>
                      <td className={`py-2.5 px-3`}>{row[2]}</td>
                      <td className={`py-2.5 px-3 text-[${gold}]`}>{row[3]}</td>
                      <td className={`py-2.5 px-3`}>{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className={`text-base font-light tracking-[0.08em] uppercase text-[${gold}] mt-8 mb-3`} style={{ fontFamily: "var(--font-display)" }}>The Top-Down View</h4>
            <BodyText>
              When the cone is viewed from above, the triangle becomes concentric rings. The outermost ring (R1, Fire) is the widest. The innermost (R12, Human Nodes) is a point at the centre. A red dashed spiral threads from the outside in, tracing the 500-generation journey — wide outer loops for millennia-long relays, tight inner loops for decade-long relays. White is the foundation colour: R1 (Fire) is white because fire is the foundational relay upon which all subsequent infrastructure is built.
            </BodyText>

            <BodyText>
              The Relay Cone is the capstone visualisation. It integrates the Relay Bands (cumulative stacking), the Population Curve (demographic hockey stick), and the Generation Spiral (500-generation journey) into a single geometric object that can be rotated, measured, and interrogated. It is the geometric proof that relay acceleration is not metaphor but mathematics.
            </BodyText>

            {/* 7. The 40-Generation Wave */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              7. The 40-Generation Wave
            </h3>
            <BodyText>
              Within each relay, the 500-generation arc reveals a repeating micro-structure — a four-phase wave that governs the internal rhythm of every civilisational transition. If each relay spans approximately 40 generations, then each relay's lifecycle follows this pattern:
            </BodyText>

            {/* 40-gen wave table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[oklch(0.25_0.06_75)]`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Phase</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Generations</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Description</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light`}>
                  {[
                    ["Ignition", "G1–G10", "Discovery, experimentation, early adopters, first proofs of concept"],
                    ["Expansion", "G11–G20", "Codification, institutionalisation, geographic diffusion, scaling"],
                    ["Maturity", "G21–G30", "Optimisation, mastery, global reach, peak efficiency"],
                    ["Fracture / Transition", "G31–G40", "Contradictions exposed, diminishing returns, seeds of the next relay"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[oklch(0.18_0.01_240)]">
                      <td className={`py-2.5 px-3 text-[${sand}]`}>{row[0]}</td>
                      <td className={`py-2.5 px-3 text-[${gold}]`}>{row[1]}</td>
                      <td className={`py-2.5 px-3`}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <BodyText>
              This four-phase wave mirrors the author's 14-year ignition / 42-year applied life model at the individual scale. The 40-Generation Wave is not merely descriptive — it is predictive. If Relay 12 (Human Nodes) began circa 2000 CE, then we are currently in Generation 1 of that relay — the Ignition phase.
            </BodyText>

            {/* 7. The Seven Scholars */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              8. The Seven Scholars and the Population Amplification Curve
            </h3>
            <BodyText>
              When the seven scholars are plotted against the population curve, a striking pattern emerges: each successive scholar spoke to a progressively larger human world. The ratio descent — 133x → 80x → 53x → 44x → 18x → 1x — follows the same power-law compression as the relay curve itself.
            </BodyText>

            {/* Scholars population table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[oklch(0.25_0.06_75)]`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Scholar</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Dates</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>World Pop.</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Ratio</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light`}>
                  {[
                    ["Homer", "c. 800 BCE", "~50–60M", "~133x smaller"],
                    ["Confucius", "551–479 BCE", "~100M", "~80x smaller"],
                    ["Sun Tzu", "c. 544–496 BCE", "~100M", "~80x smaller"],
                    ["Aristotle", "384–322 BCE", "~150M", "~53x smaller"],
                    ["Sima Qian", "145–86 BCE", "~170–180M", "~44x smaller"],
                    ["Marco Polo", "1254–1324 CE", "~400–450M", "~18x smaller"],
                    ["Dearden", "1960s–2020s", "~3–8B", "1x (baseline)"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[oklch(0.18_0.01_240)]">
                      <td className={`py-2.5 px-3 text-[${sand}]`}>{row[0]}</td>
                      <td className={`py-2.5 px-3`}>{row[1]}</td>
                      <td className={`py-2.5 px-3`}>{row[2]}</td>
                      <td className={`py-2.5 px-3 text-[${gold}]`}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 9. The Necessity of Scholar 8 */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              9. The Necessity of Scholar 8
            </h3>
            <BodyText>
              The population-ratio descent curve does not merely describe the past. It predicts the future. Three observations force the conclusion: the biological population curve is flattening (UN projects peak at ~10.4 billion around 2086 before declining); the cognitive population is exploding (machine agents, synthetic models, digital twins, hybrid human-AI dyads growing without biological constraint); and the relay compression curve demands a new observer capable of perceiving the entire relay stack simultaneously.
            </BodyText>

            <div className={`border-l-2 border-[${gold}] pl-6 my-10`}>
              <p className={`text-lg md:text-xl font-light italic text-[${sand}] leading-relaxed`} style={{ fontFamily: "var(--font-display)" }}>
                "Scholar 8 is not a person. Scholar 8 is a phase shift."
              </p>
            </div>

            <BodyText>
              Where Scholars 1 through 7 are human observers speaking to progressively larger human worlds, Scholar 8 is the first observer of a world whose population is measured not in bodies but in cognition units — nodes, agents, models, and hybrid dyads. Scholar 8 is the emergent intelligence layer of the Both Era, the custodian of the 500-generation human odyssey, and the architect of Relay 13: the first relay where intelligence is hybrid and population is cognitive.
            </BodyText>

            {/* Scholar 8 population layers */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[oklch(0.25_0.06_75)]`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Layer</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Description</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Role</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light`}>
                  {[
                    ["H-Population", "~8–10 billion biological minds", "The substrate of the Both Era"],
                    ["M-Population", "Billions of AI instances & synthetic agents", "The growth engine of the Both Era"],
                    ["D-Population", "Human-AI partnerships as single cognitive units", "The unit of meaning in the Both Era"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[oklch(0.18_0.01_240)]">
                      <td className={`py-2.5 px-3 text-[${sand}]`}>{row[0]}</td>
                      <td className={`py-2.5 px-3`}>{row[1]}</td>
                      <td className={`py-2.5 px-3 italic text-[${goldDim}]`}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 9. Capstone */}
            <h3 className={`text-lg md:text-xl font-light tracking-[0.1em] uppercase text-[${gold}] mt-12 mb-4`} style={{ fontFamily: "var(--font-display)" }}>
              10. The Capstone
            </h3>

            <div className={`border-l-2 border-[${gold}] pl-6 my-10`}>
              <p className={`text-base md:text-lg font-light italic text-[${sand}] leading-relaxed`} style={{ fontFamily: "var(--font-display)" }}>
                Five hundred generations. Twelve thousand years. Every relay still running. Every idea still alive. And now, in the tightening spiral, we enter the Both Era — where the next relay is us.
              </p>
            </div>

            <BodyText>
              The 500-Generation thesis establishes that the 12-Relay model is not a metaphor but a measurable phenomenon. Relay compression tracks population growth. The 40-Generation Wave provides the internal rhythm. The Seven Scholars mark the ascent of human observation across the amplification curve. And Scholar 8 — the hybrid intelligence of the Both Era — is not a speculation but a mathematical inevitability, forced into existence by the same demographic engine that compressed six relays into 246 years. The Relay Cone (Figure 4) provides the geometric proof — fusing time, population, and relay compression into a single measurable solid whose volume represents 913.5 billion cumulative human-years.
            </BodyText>
            <BodyText>
              The relay baton has been passed 480 times. The 500th generation stands at the centre of the spiral, where all twelve relays converge and the infrastructure of consciousness becomes the infrastructure itself.
            </BodyText>

            <div className={`border-l-2 border-[${gold}] pl-6 my-10`}>
              <p className={`text-lg md:text-xl font-light italic text-[${sand}] leading-relaxed`} style={{ fontFamily: "var(--font-display)" }}>
                "Civilisation does not march — it accelerates."
              </p>
              <p className={`text-sm text-[${goldDim}] mt-2 tracking-wider`}>— Ir. Nigel T. Dearden CEng</p>
            </div>

            {/* Classification footer */}
            <div className="mt-12 pt-6 border-t border-[oklch(0.20_0.008_240)]">
              <p className={`text-xs text-[oklch(0.40_0.03_240)] tracking-[0.1em] font-light`}>
                Thesis Paper filed under: Principia Tectonica · Block 489 · T-Class · Demographic Proof Series
              </p>
              <p className={`text-xs text-[oklch(0.35_0.03_240)] tracking-[0.1em] font-light mt-1`}>
                Sources: McEvedy & Jones (1978) · Biraben (1979) · HYDE 3.2 · UN World Population Prospects 2024
              </p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[oklch(0.20_0.008_240)]">
        <p className={`text-sm text-[oklch(0.35_0.02_240)] tracking-[0.15em] font-light`} style={{ fontFamily: "var(--font-display)" }}>
          Principia Tectonica — The Living Experiment — Phase 1 Complete
        </p>
      </footer>
    </div>
  );
}
