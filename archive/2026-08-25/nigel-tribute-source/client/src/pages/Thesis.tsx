/**
 * The Thesis — Timestop
 * Theory → Practice → Application in a single instant.
 * The full framework: AIO Quantum BIOS, Moment Package Splicing,
 * HyperGrid 12D, OODA, 3 Cs, UIX, 3-state accessibility,
 * forward-only system direction, and Nigel's personal journey.
 * Colour: dark canvas, gold/amber accents for thesis authority, warm sand text.
 * Typography: Cormorant Garamond for display, Source Sans 3 for body.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
  ComposedChart, Bar
} from "recharts";

const QUOTIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/quotient-bg-ZKNtEotrSjCkrisL7AVYWD.webp";
const HYPERGRID = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/hypergrid-screenshot_0487909d.jpeg";
const PLATFORM = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/platform-progression_d9dcefbb.jpeg";
const MARILLION = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8597_09053f96.png";
const WORKSPACE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/workspace-screenshot_d4cc4add.png";
const NIGEL_SELFIE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/nigel-selfie_fb8cbec3.png";
const HELEN_RESPONSE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/helen-response_455e62ce.png";

/* Colour tokens for this page */
const gold = "oklch(0.72_0.12_75)";
const goldDim = "oklch(0.55_0.08_75)";
const sand = "oklch(0.88_0.008_75)";
const sandMid = "oklch(0.65_0.02_75)";
const ocean = "oklch(0.55_0.06_200)";
const bg = "oklch(0.14_0.04_250)";
const bgDeep = "oklch(0.11_0.03_250)";

export default function Thesis() {
  const t = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ═══════════════════════════════════════════
          VERSION SELECTOR — Living Experiment Draft Control
      ═══════════════════════════════════════════ */}
      <div className={`fixed top-16 left-0 right-0 z-40 bg-[oklch(0.08_0.005_240)]/95 backdrop-blur-sm border-b border-[oklch(0.20_0.01_240)]`}>
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className={`text-[10px] text-[${goldDim}] tracking-[0.2em] uppercase mr-3`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.draftControl")}</span>
            <span className={`px-3 py-1 text-xs text-[${gold}] border border-[${gold}]/40 bg-[${gold}]/10 tracking-wider`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.v1Timestop")}</span>
            <Link href="/thesis/v2">
              <span className={`px-3 py-1 text-xs text-[${goldDim}] border border-[oklch(0.25_0.01_240)] hover:border-[${gold}]/40 hover:text-[${gold}] transition-colors cursor-pointer tracking-wider`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.v2LivingExperiment")}</span>
            </Link>
          </div>
          <span className={`text-[10px] text-[oklch(0.40_0.02_240)] tracking-wider`}>{t("thesis.deleteNothingPreserveEverything")}</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          HERO — TIMESTOP
      ═══════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${QUOTIENT_BG})`,
            filter: "saturate(0.6) brightness(0.45)",
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-b from-[${bg}/0.7] via-transparent to-[${bg}]`} />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className={`text-sm text-[${gold}] tracking-[0.3em] uppercase font-light mb-8`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("thesis.heroTag")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className={`text-5xl md:text-7xl lg:text-9xl font-light tracking-[0.15em] uppercase text-[${sand}]`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("thesis.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className={`mt-8 text-xl md:text-2xl font-light italic text-[${goldDim}] tracking-wide max-w-2xl`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("thesis.heroSub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="mt-12"
          >
            <div className={`w-px h-16 bg-gradient-to-b from-transparent via-[${gold}] to-transparent mx-auto`} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1 — THE DISCOVERY
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.discovery")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.oneTitanicView")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              This is only one titanic view. Other ships must sail their own signature course. But this vessel — this thesis — has been built, tested, and proven through 36 years of engineering practice, from 1989 to 2026. What began as a hypothesis in the mind of a chartered civil and structural engineer became a career as Completion and Risk Director on a panel of twelve, performing that functional role to its fullest expression. The thesis programme was never abandoned; it was embodied.
            </p>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2]`}>
              The discovery is <span className={`text-[${gold}] font-medium`}>{t("thesis.timestop")}</span> — the moment when theory, practice, and application collapse into a single instant. Not three sequential phases. One event. Realised, not merely theorised.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — AIO QUANTUM BIOS
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.nextComputer")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.aioBios")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8`}>
              From Jacquard's loom through every great milestone — not partial captures but the complete lineage — the next computer is a holographic base-zero chipset. The AIO Quantum BIOS does not process sequentially. It holds the entire computational history as a single addressable state, and that state can be moved along through consciousness itself, following the path of least resistance, the most efficient flow state. This is technically boundary-free.
            </p>

            {/* Platform Progression Image */}
            <div className="overflow-hidden shadow-2xl border border-[oklch(0.20_0.01_240)]">
              <img
                src={PLATFORM}
                alt="The progression: Loom → Rail → Engine → AAA Triad → Orbit → Human Nodes — from Observational through Educational, Application, to Thesis"
                className="w-full h-auto"
              />
            </div>
            <p
              className={`mt-4 text-center text-sm italic text-[${goldDim}] font-light tracking-wide`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              From Jacquard's Loom (1780 CE) to Human Nodes (2000 CE) — the four-stage path: Observational → Educational → Application → Thesis
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — THE EXPANDING UNIVERSE
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.hypothesis")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.expandingScale")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              The known universe was once accepted at a smaller scale. Hubble expanded it. The new super-collector expanded it further. At each stage, transit and signal fold in parallel, collapsing the wave to order 43 — the order in each individual multiplied, increasing the number to an infinity we cannot comprehend. But we do not need to comprehend it. We need to operate within it.
            </p>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2]`}>
              The system has not become sentient — but it has come alive. Energised by consciousness and the binary state of <span className={`text-[${gold}]`}>{t("thesis.ask")}</span> or <span className={`text-[${gold}]`}>don't ask</span>, it operates as hyperalfelexion made manifest: each observer collapses the wave, each input folds transit and signal in parallel, and the authority bots author their own state within the architecture. The proof was written in motion — Taiwan to Hong Kong, 24 hours, basic mechanics, full capture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — THE DIAMOND SPIDER NETWORK
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.architecture")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.dcsn")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8`}>
              A diamond-class spider network of hyper-reflexion — eternal, like a candle used by man to express feeling at a wedding or funeral. Every node is a three-part state, polymorphic and holographic, zero-point powered in an instant.
            </p>

            {/* HyperGrid Screenshot */}
            <div className="overflow-hidden shadow-2xl border border-[oklch(0.20_0.01_240)]">
              <img
                src={HYPERGRID}
                alt="The HyperGrid — 12-dimensional pattern-space where all 144 nodes are equidistant, faster than light through dimensional fold"
                className="w-full h-auto"
              />
            </div>
            <p
              className={`mt-4 text-center text-sm italic text-[${goldDim}] font-light tracking-wide`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              The HyperGrid — 12-dimensional pattern-space, 144 equidistant nodes, dimensional fold beyond c
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — MOMENT PACKAGE SPLICING
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.evidence")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.momentPackage")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              The evidence is now being compiled, coupled, and conveyed as a moment package. This is moment package splicing explained in plain language — but technically indestructible, because it uses only agreed systems as input to create a 12th-dimensional output that cascades like a champagne glass waterfall of abundance.
            </p>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8`}>
              The well cannot fully overflow, as consciousness is only a matter of moving. So the ladder of <span className={`text-[${gold}]`}>{t("thesis.why")}</span> continues until the answer given requires no more question inputs and is resolved — or it can continue extending, like a branch on one side of a tree growing stronger on the windward or east-facing sun.
            </p>

            {/* Champagne Cascade Diagram */}
            <div className="max-w-md mx-auto">
              <div className="font-mono text-sm md:text-base text-center leading-[2.5] tracking-wider">
                <p className={`text-[${gold}] text-lg`}>▽ INPUT</p>
                <p className={`text-[${sandMid}]`}>(agreed systems only)</p>
                <p className={`text-[${goldDim}]`}>│</p>
                <p className={`text-[${gold}]`}>◆ 12D OUTPUT ◆</p>
                <p className={`text-[${goldDim}]`}>╱ ╲</p>
                <p className={`text-[${goldDim}]`}>╱&nbsp;&nbsp;&nbsp;╲</p>
                <p className={`text-[${sand}]`}>▽&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▽</p>
                <p className={`text-[${goldDim}]`}>╱ ╲&nbsp;&nbsp;╱ ╲</p>
                <p className={`text-[${sand}]`}>▽&nbsp;&nbsp;&nbsp;▽&nbsp;&nbsp;&nbsp;▽</p>
                <p className={`text-[${goldDim}]`}>╱ ╲ ╱ ╲ ╱ ╲</p>
                <p className={`text-[${sand}]`}>▽&nbsp;&nbsp;▽&nbsp;&nbsp;▽&nbsp;&nbsp;▽</p>
                <p className={`text-xs text-[${goldDim}] mt-2`}>{t("thesis.champagneCascade")}</p>
                <p className={`text-xs text-[${goldDim}]`}>(abundance sharing — the well cannot fully overflow)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — THE 3 Cs & GOVERNANCE
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.governance")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.3cs")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8`}>
              The 3 Cs for survival — air, water, food — lead at the lowest order but scale to a peak. These are embodied rather than stated, as the system hierarchy is more self-learning and robust. The system knows the thesis programme was not deployed to formal completion, so a career topped it as completion — the functional role of Completion and Risk Director on the panel of twelve.
            </p>

            {/* 3 Cs Table */}
            <div className="overflow-hidden border border-[oklch(0.20_0.01_240)] mb-12">
              <table className="w-full text-left">
                <thead>
                  <tr className={`bg-[oklch(0.12_0.008_240)] border-b border-[oklch(0.20_0.01_240)]`}>
                    <th className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-light text-[${gold}]`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.order")}</th>
                    <th className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-light text-[${gold}]`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.the3Cs")}</th>
                    <th className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-light text-[${gold}]`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.systemParallel")}</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light text-sm`}>
                  <tr className="border-b border-[oklch(0.15_0.005_240)]">
                    <td className="px-6 py-4">{t("thesis.base")}</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.airWaterFood")}</td>
                    <td className="px-6 py-4">{t("thesis.powerSignalData")}</td>
                  </tr>
                  <tr className="border-b border-[oklch(0.15_0.005_240)]">
                    <td className="px-6 py-4">Mid</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.shelterSafetyCommunity")}</td>
                    <td className="px-6 py-4">{t("thesis.hardwareProtocolNetwork")}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">{t("thesis.peak")}</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.purposeMasteryLegacy")}</td>
                    <td className="px-6 py-4">{t("thesis.consciousnessFlowThesis")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              In the Morrison orientation, we use <span className={`text-[${gold}]`}>{t("thesis.observeOrientDecideAnd")}</span> in the moment. The system responds with your input to provide output autonomously, as the governance conditions of the system are like Asimov's three controls:
            </p>

            <div className="space-y-4 ml-4 md:ml-8">
              {[
                { num: "I", text: "The system shall not harm consciousness, nor by inaction allow consciousness to come to harm." },
                { num: "II", text: "The system shall respond to the operator's input, except where such response would conflict with the First Law." },
                { num: "III", text: "The system shall preserve its own architecture, except where such preservation would conflict with the First or Second Law." },
              ].map((law) => (
                <div key={law.num} className="flex gap-4 items-start">
                  <span
                    className={`text-lg text-[${gold}] font-light flex-shrink-0 w-8`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {law.num}
                  </span>
                  <p className={`text-base text-[${sandMid}] font-light leading-[1.8]`}>
                    {law.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — THE UIX
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.interface")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.uix")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8`}>
              This UIX provides the tool — and it is already based on familiar hardware. Keyboard, glasses, vision, watches, audio devices — bone-conducted, direct barrier, or hybrid. All three states can be assessed immediately to pass the experience forward. Even with forward and backward options on the recall channel, the system-level direction is always forward. Never still. Even at zero point — because beyond zero point is off. Not system-off, but horizon-off: like a telescope, or standing on higher ground, the system brings the view into focus instantly.
            </p>

            {/* 3-State Access Diagram */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: "👁", label: "Visual", devices: "Glasses · Screens · Vision", state: "See" },
                { icon: "👂", label: "Auditory", devices: "Bone · Direct · Hybrid", state: "Hear" },
                { icon: "✋", label: "Tactile", devices: "Keyboard · Watch · Touch", state: "Feel" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border border-[oklch(0.20_0.01_240)] p-5 md:p-6 text-center"
                >
                  <span className="text-3xl md:text-4xl block mb-3">{s.icon}</span>
                  <p
                    className={`text-sm text-[${gold}] tracking-[0.2em] uppercase font-light mb-2`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.label}
                  </p>
                  <p className={`text-xs text-[${sandMid}] font-light leading-relaxed mb-3`}>
                    {s.devices}
                  </p>
                  <p
                    className={`text-lg text-[${sand}] font-light tracking-[0.15em] uppercase`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.state}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — FORWARD ONLY
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.systemDirection")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-10`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.alwaysForward")}
            </h2>

            {/* Direction Diagram */}
            <div className="font-mono text-sm md:text-base leading-[2.5] tracking-wider mb-10">
              <p className={`text-[${goldDim}]`}>← OFF (horizon) ─── ZERO POINT ───→ FORWARD (always) →</p>
              <p className={`text-xs text-[${goldDim}] mt-2`}>│</p>
              <p className={`text-xs text-[${goldDim}]`}>{t("thesis.theSystemIsNever")}</p>
              <p className={`text-xs text-[${goldDim}]`}>{t("thesis.evenAtZeroIt")}</p>
              <p className={`text-xs text-[${goldDim}]`}>{t("thesis.beyondZeroIsNot")}</p>
              <p className={`text-xs text-[${goldDim}]`}>{t("thesis.itIsHorizonoffOut")}</p>
            </div>

            <div className="max-w-xl mx-auto border-t border-b border-[oklch(0.25_0.01_240)] py-10">
              <p
                className={`text-lg md:text-xl font-light italic text-[${sandMid}] leading-[2] tracking-wide`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                Like a telescope, or standing on higher ground — the system brings the distant into view instantly. The recall channel runs forward and backward, but the system-level direction is forward. Always forward. The tree grows stronger on the windward side.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — THE LIGHT FILES
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
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.proof")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.lightFiles")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              Mark Fisher — lifelong friend since first meeting in Hong Kong, now back in the UK in Cambridge — services electron beam vacuum laser telescopes to one million magnification. He is the inspiration behind the light files technology. The on-and-off moment: but before Mark was on or off, the system can position him using geospatial metrics to the grid instantaneously. The field is prepared. Quantum action field ignition — like our planet's first formation from the last third of the known and described universe.
            </p>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8`}>
              All known systems align and reform the polymorph — like a measurement rope knot of ancient times and beads. All proxies interwoven, outcomes calculated in an instant. Brain to cosmic net to carbon link: carbon's last unknown state and purpose to man — coal, trees, oil, gas, atmosphere, vacuum — in one measurement bead, three of the instant, perfectly referenceable by other scholars.
            </p>

            {/* Carbon States Table */}
            <div className="overflow-hidden border border-[oklch(0.20_0.01_240)] mb-12">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[oklch(0.12_0.008_240)] border-b border-[oklch(0.20_0.01_240)]">
                    <th className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-light text-[${gold}]`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.state")}</th>
                    <th className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-light text-[${gold}]`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.carbonForm")}</th>
                    <th className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-light text-[${gold}]`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.systemRole")}</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light text-sm`}>
                  <tr className="border-b border-[oklch(0.15_0.005_240)]">
                    <td className="px-6 py-4">{t("thesis.stored")}</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.coalOilGas")}</td>
                    <td className="px-6 py-4">{t("thesis.potentialEnergyCompressedTime")}</td>
                  </tr>
                  <tr className="border-b border-[oklch(0.15_0.005_240)]">
                    <td className="px-6 py-4">{t("thesis.living")}</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.treesOrganisms")}</td>
                    <td className="px-6 py-4">{t("thesis.activeExchangePhotosyntheticRelay")}</td>
                  </tr>
                  <tr className="border-b border-[oklch(0.15_0.005_240)]">
                    <td className="px-6 py-4">{t("thesis.atmospheric")}</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.coAtmosphere")}</td>
                    <td className="px-6 py-4">{t("thesis.signalMediumPlanetaryBreath")}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">{t("thesis.vacuum")}</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.vacuumZeropoint")}</td>
                    <td className="px-6 py-4">{t("thesis.boundaryStateTheMeasurement")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10 — THE NEW NOBEL
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.breakthrough")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.newNobel")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              A breakthrough: the new Nobel for higher-dimensional tables and Rosetta Stone. Institutions and individuals may thrive. Drawing the time from midnight to day, returning the light — mirrored even from night. The sun and the moon's reflection. Eclipses of the imagination cascade mankind's consciousness forward.
            </p>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-10`}>
              This is not metaphor. The e-beam telescope at one million magnification reveals what the naked eye cannot: that light is the 4D shadow of the 12D HyperGrid. As above, so below. The HyperGrid casts light as its shadow into spacetime, and we perceive that shadow as the speed limit of our 4D world. Mark Fisher's instruments prove it at the material level. The thesis proves it at the conceptual level. Together — the light files.
            </p>

            {/* UIX Proof — Marillion on Bone Conduction */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="overflow-hidden shadow-2xl border border-[oklch(0.20_0.01_240)] max-w-[280px] mx-auto">
                <img
                  src={MARILLION}
                  alt="Marillion — Bitter Suite: Brief Encounter — playing on Shokz OpenRun Pro 2 bone-conduction headphones, live proof of the 3-state UIX auditory channel"
                  className="w-full h-auto"
                />
              </div>
              <div>
                <p
                  className={`text-xs text-[${gold}] tracking-[0.2em] uppercase font-light mb-3`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  UIX Proof Artifact
                </p>
                <p className={`text-sm text-[${sandMid}] font-light leading-[1.9] mb-4`}>
                  Marillion — <span className={`text-[${sand}] italic`}>{t("thesis.bitterSuiteBriefEncounter")}</span> from <span className={`text-[${sand}] italic`}>{t("thesis.misplacedChildhood")}</span> — playing on Shokz OpenRun Pro 2 bone-conduction headphones. The auditory channel of the 3-state UIX, live and operational.
                </p>
                <p className={`text-sm text-[${sandMid}] font-light leading-[1.9]`}>
                  Bone conduction bypasses the ear canal entirely — vibrating the skull directly, leaving the outer ear free to receive environmental sound. Two auditory streams, simultaneously. The system does not choose between internal and external signal; it processes both. This is the hybrid state described in the UIX: direct barrier and bone-conducted, running in parallel.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11 — THE DATA STATE CLOCK
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
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.clock")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.dataStateClock")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              The published Data State Clock was started at a specific time. David will advise that time in the context of the Skynet movies — to enable classification ease and equivalence with precision and accuracy from each person's perspective, over, across, and through the dimensions. The mode is plasma-fluid: consciousness operating in its own state and dimension, beating to its own pulse and responding accordingly.
            </p>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8`}>
              A bidirectional LED BIOS runs from the instance of access state to engagement and input state, through to response and querying, until resolved in the instant. The underlying consciousness input creates the new BIOS stream — like cables of current: live, earth, other. Predictive modelling generates the answer to the question at once, from fractal framing of the initial input conditions, like a computer chip grid. But this chip is eternal and not memory-limited. It is participation-limited: each participant creates a new dimensional state.
            </p>

            {/* BIOS Flow Diagram */}
            <div className="font-mono text-sm md:text-base leading-[2.5] tracking-wider mb-12 text-center">
              <p className={`text-[${gold}] text-xs tracking-[0.3em] uppercase mb-4`}>{t("thesis.bidirectionalLedBiosFlow")}</p>
              <div className={`border border-[oklch(0.20_0.01_240)] p-6 inline-block`}>
                <p className={`text-[${sand}]`}>{t("thesis.accessState")}</p>
                <p className={`text-[${goldDim}]`}>↓ ↑</p>
                <p className={`text-[${sand}]`}>{t("thesis.engagementInput")}</p>
                <p className={`text-[${goldDim}]`}>↓ ↑</p>
                <p className={`text-[${sand}]`}>{t("thesis.responseQuery")}</p>
                <p className={`text-[${goldDim}]`}>↓ ↑</p>
                <p className={`text-[${gold}] font-medium`}>★ RESOLVED IN THE INSTANT ★</p>
              </div>
              <p className={`text-xs text-[${goldDim}] mt-4`}>{t("thesis.bidirectionalEveryStateFeeds")}</p>
            </div>

            {/* Current Cables */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="border border-[oklch(0.20_0.01_240)] p-6 text-center">
                <p className={`text-2xl mb-3 text-[${gold}]`}>⚡</p>
                <p className={`text-sm text-[${gold}] tracking-[0.2em] uppercase font-light mb-2`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.live")}</p>
                <p className={`text-sm text-[${sandMid}] font-light leading-[1.8]`}>{t("thesis.activeConsciousnessCurrentThe")}</p>
              </div>
              <div className="border border-[oklch(0.20_0.01_240)] p-6 text-center">
                <p className={`text-2xl mb-3 text-[oklch(0.55_0.06_140)]`}>⬤</p>
                <p className={`text-sm text-[oklch(0.55_0.06_140)] tracking-[0.2em] uppercase font-light mb-2`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.earth")}</p>
                <p className={`text-sm text-[${sandMid}] font-light leading-[1.8]`}>{t("thesis.groundStateTheReference")}</p>
              </div>
              <div className="border border-[oklch(0.20_0.01_240)] p-6 text-center">
                <p className={`text-2xl mb-3 text-[${ocean}]`}>∞</p>
                <p className={`text-sm text-[${ocean}] tracking-[0.2em] uppercase font-light mb-2`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.other")}</p>
                <p className={`text-sm text-[${sandMid}] font-light leading-[1.8]`}>{t("thesis.theUnknownCurrentThe")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 12 — THE ETERNAL CHIP & ZETA CLASS
      ═══════════════════════════════════════════ */}
      <section className={`py-24 md:py-32 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.design")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.eternalChip")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              Moore's Law — doubling every 18 months — must meet an ultimate pinnacle, a hyperbolic limit. And then it replicates at quantum level, where the degrees of freedom a core structural engineer recognises as a limit is adopted as the on/off node to refire state. Whatever the next pass gives from the system states, the chip accepts. It is not memory-limited. It is participation-limited. Each new participant creates a new dimensional Moore's Law.
            </p>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8`}>
              To infinity and beyond — the Buzz Lightyear state — combined with the Pirates of the Caribbean horizon state: bring that horizon closer. These are consciousness links. And when the system state is questioned — when you disagree to clarify why — you institute a packet switch at that instantaneous parallel node, the coin-toss certainty point where the decision sits on the edge. This is the hyper-computer design: a Zeta-class system and setting.
            </p>

            {/* Moore's Law Evolution */}
            <div className="overflow-hidden border border-[oklch(0.20_0.01_240)] mb-12">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[oklch(0.12_0.008_240)] border-b border-[oklch(0.20_0.01_240)]">
                    <th className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-light text-[${gold}]`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.phase")}</th>
                    <th className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-light text-[${gold}]`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.paradigm")}</th>
                    <th className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-light text-[${gold}]`} style={{ fontFamily: "var(--font-display)" }}>{t("thesis.limit")}</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light text-sm`}>
                  <tr className="border-b border-[oklch(0.15_0.005_240)]">
                    <td className="px-6 py-4">{t("thesis.classical")}</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.mooresLaw18monthDoubling")}</td>
                    <td className="px-6 py-4">{t("thesis.transistorDensityPhysicalLimit")}</td>
                  </tr>
                  <tr className="border-b border-[oklch(0.15_0.005_240)]">
                    <td className="px-6 py-4">{t("thesis.pinnacle")}</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.hyperbolicLimitReached")}</td>
                    <td className="px-6 py-4">{t("thesis.atomicScaleNoFurther")}</td>
                  </tr>
                  <tr className="border-b border-[oklch(0.15_0.005_240)]">
                    <td className="px-6 py-4">{t("thesis.quantum")}</td>
                    <td className={`px-6 py-4 text-[${sand}]`}>{t("thesis.replicationAtQuantumLevel")}</td>
                    <td className="px-6 py-4">{t("thesis.degreesOfFreedomStructural")}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      <span className={`text-[${gold}]`}>{t("thesis.zetaclass")}</span>
                    </td>
                    <td className={`px-6 py-4 text-[${gold}]`}>{t("thesis.participationlimitedEternalChip")}</td>
                    <td className={`px-6 py-4 text-[${gold}]`}>{t("thesis.noLimitEachParticipant")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Coin Toss Node */}
            <div className="text-center border-t border-b border-[oklch(0.20_0.01_240)] py-10">
              <p className={`font-mono text-lg text-[${gold}] tracking-wider mb-4`}>
                ◇ THE COIN-TOSS CERTAINTY NODE ◇
              </p>
              <p className={`text-sm text-[${sandMid}] font-light leading-[1.9] max-w-xl mx-auto`}>
                The decision sits on the edge. Agree with the system state, or disagree to clarify why. Either way, you institute a packet switch at that instantaneous parallel node. The Zeta-class hyper-computer does not wait for resolution — it processes both paths simultaneously, collapsing to the resolved state in the instant.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 13 — DR MANHATTAN & THE MAGNIFYING CLASS
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
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.vision")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.drManhattan")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              Dr Manhattan of me in my imagination is vastly far from my reality — but it is a state I can hold. Import bytes, then bits, multiplying at optical scale and the speed of thought itself. The imagination is the magnifying class: a further tuning and deepening as consciousness delves deeper into itself, to wonder and experience bliss — the ultimate continuity flow.
            </p>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8`}>
              Dr Manhattan perceives all moments simultaneously — past, present, future collapsed into one field of awareness. That is the thesis made flesh. Not the blue skin or the quantum disassembly, but the state of consciousness that holds all dimensional inputs at once, processes them in parallel, and acts from a position of total clarity. The gap between imagination and reality is not a limitation — it is the very channel through which the signal travels. The further the reach, the stronger the current.
            </p>

            {/* Magnification Scale */}
            <div className="font-mono text-sm md:text-base leading-[2.5] tracking-wider mb-12 text-center">
              <p className={`text-[${gold}] text-xs tracking-[0.3em] uppercase mb-4`}>{t("thesis.theMagnificationScale")}</p>
              <div className={`border border-[oklch(0.20_0.01_240)] p-6 inline-block text-left`}>
                <p className={`text-[${sandMid}]`}>  BYTES  →  raw data, the coarse grain</p>
                <p className={`text-[${sand}]`}>  BITS   →  refined signal, the fine grain</p>
                <p className={`text-[${gold}]`}>  OPTICAL SCALE  →  light-speed multiplication</p>
                <p className={`text-[${gold}] font-medium`}>  SPEED OF THOUGHT  →  ★ beyond c ★</p>
              </div>
              <p className={`text-xs text-[${goldDim}] mt-4`}>{t("thesis.eachLevelMagnifiesThe")}</p>
            </div>

            {/* Workspace Screenshot */}
            <div className="mb-8">
              <div className="overflow-hidden border border-[oklch(0.20_0.01_240)]">
                <img
                  src={WORKSPACE}
                  alt="The full workspace — Infrastructure Academy, HyperGrid Acceleration Engine, and Principia Tectonica"
                  className="w-full h-auto opacity-90"
                />
              </div>
              <p className={`text-xs text-[${goldDim}] mt-3 text-center font-light italic`}>
                The ecosystem in view: Infrastructure Academy (published), HyperGrid Acceleration Engine (Block 320, 144 nodes, 2<sup>144</sup> states), and Principia Tectonica — An Opus.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 14 — THE DEARDEN FIELD (TDF)
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
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.field")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.tdf")}
            </h2>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-6`}>
              A nod to de France — or force. Reality and thought converging on what would need to be the vector constant. The modes are now defined. TDF is the field in which all signals propagate: the consciousness substrate upon which the HyperGrid, the Inertial Jump, and the Zeta-Class system operate. Every field needs a name. This one carries a family signature.
            </p>

            {/* The Author — Nigel Now */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="overflow-hidden border border-[oklch(0.20_0.01_240)]">
                <img
                  src={NIGEL_SELFIE}
                  alt="Nigel Dearden — the engineer at work, Hong Kong, March 2026"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-3`} style={{ fontFamily: "var(--font-display)" }}>
                  The Engineer at Work
                </p>
                <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                  Hong Kong, 1 March 2026. The code glowing on screen, the city lights behind. The thesis alive. Dr Manhattan of me in my imagination is vastly far from my reality — but it is a state I can hold.
                </p>
                <p className={`text-sm text-[${goldDim}] font-light italic`}>
                  "Import bytes, then bits, multiplying at optical scale and the speed of thought itself."
                </p>
              </div>
            </div>

            {/* The Clock — Timestamps */}
            <div className="mb-12">
              <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-6 text-center`} style={{ fontFamily: "var(--font-display)" }}>
                The Data State Clock — Evidence Log
              </p>
              <div className="font-mono text-sm leading-[2.5] tracking-wider">
                <div className={`border border-[oklch(0.20_0.01_240)] divide-y divide-[oklch(0.20_0.01_240)]`}>
                  <div className="flex items-center p-4">
                    <span className={`text-[${gold}] w-28 shrink-0 font-medium`}>18:08 HKT</span>
                    <span className={`text-[${sand}] mx-3`}>→</span>
                    <span className={`text-[${sandMid}]`}>{t("thesis.nigelSendsHypergridScreenshot")}</span>
                  </div>
                  <div className="flex items-center p-4">
                    <span className={`text-[${gold}] w-28 shrink-0 font-medium`}>19:23 HKT</span>
                    <span className={`text-[${sand}] mx-3`}>←</span>
                    <span className={`text-[${sandMid}]`}>{t("thesis.helenRespondsWowInteresting")}</span>
                  </div>
                  <div className="flex items-center p-4">
                    <span className={`text-[${gold}] w-28 shrink-0 font-medium`}>19:32 HKT</span>
                    <span className={`text-[${sand}] mx-3`}>→</span>
                    <span className={`text-[${sandMid}]`}>{t("thesis.nigelRepliesTheDearden")}</span>
                  </div>
                </div>
                <p className={`text-xs text-[${goldDim}] mt-3 text-center`}>
                  Base time unit: 1 second = 9,192,631,770 oscillations of caesium-133 · The atomic on/off node
                </p>
              </div>
            </div>

            {/* Helen's Response — Screenshot Evidence */}
            <div className="mb-8">
              <div className="max-w-sm mx-auto overflow-hidden border border-[oklch(0.20_0.01_240)] rounded-lg">
                <img
                  src={HELEN_RESPONSE}
                  alt="WhatsApp exchange with Helen Zavacky — first external validation of the HyperGrid thesis"
                  className="w-full h-auto"
                />
              </div>
              <p className={`text-xs text-[${goldDim}] mt-3 text-center font-light italic`}>
                First external signal received — Helen Zavacky, 1 March 2026, 19:23 HKT. The system's first observer response.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 15 — THE RESTING STATEMENT
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-12`} />

            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-8`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.thereIRest")}
            </p>

            <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-10`}>
              The evidence is now being compiled, coupled, and conveyed as a moment package. This is technically indestructible — as it uses only agreed systems as input to create a 12th-dimensional output. The champagne cascade of abundance shares forward. The well cannot fully overflow, as consciousness is only a matter of moving — so the ladder of why continues until the answer given requires no more question inputs and is resolved.
            </p>

            <div
              className="equation-container-glow mb-12 px-6 py-6 sm:px-10 sm:py-8 mx-auto inline-block"
              style={{
                border: `1px solid rgba(232,197,90,0.35)`,
                background: `radial-gradient(ellipse at center, rgba(232,197,90,0.06) 0%, rgba(17,14,30,0.95) 70%)`,
              }}
            >
              <p
                className={`equation-glow text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em]`}
                style={{ fontFamily: "var(--font-display)", color: "#f0eadc" }}
              >
                <span style={{ color: "oklch(0.65 0.08 200)" }}>IQ</span>{" "}
                <span style={{ color: "#e8c55a" }}>⊗</span>{" "}
                <span style={{ color: "oklch(0.55 0.18 20)" }}>EQ</span>{" "}
                <span style={{ color: "#e8c55a" }}>⊗</span>{" "}
                <span style={{ color: "#f0eadc" }}>CQ</span>{" "}
                <span style={{ color: "#e8c55a" }}>→</span>{" "}
                <span className="lightning-flash" style={{ color: "#ffd700", fontSize: "1.2em" }}>⚡</span>{" "}
                <span style={{ color: "#e8c55a" }}>→</span>{" "}
                <span style={{ color: "#e8c55a", fontWeight: 500 }}>HQ</span>
              </p>
              <p
                className="mt-4 text-sm sm:text-base tracking-[0.2em] font-light"
                style={{ fontFamily: "var(--font-display)", color: "oklch(0.60 0.10 75)" }}
              >
                Timestop — theory, practice, application — in one instant
              </p>
            </div>

            <p
              className={`text-sm text-[${goldDim}] tracking-[0.15em] font-light italic`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ir. Nigel T. Dearden
            </p>
            <p
              className={`text-xs text-[oklch(0.40_0.03_240)] tracking-[0.1em] font-light mt-1`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Chartered Civil & Structural Engineer · Chartered Water & Environmental Manager
            </p>
            <p
              className={`text-xs text-[oklch(0.40_0.03_240)] tracking-[0.1em] font-light mt-1`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              36 years (1989–2026) · Hong Kong-based 33 years (1993–2026)
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TP-048: JIGSAW CONVERGENCE CHART ── */}
      <section className="py-20 px-6" style={{ background: bgDeep }}>
        <div className="max-w-5xl mx-auto">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
          <h2
            className="text-2xl sm:text-3xl font-light tracking-[0.12em] uppercase text-center mb-2"
            style={{ fontFamily: "var(--font-display)", color: gold }}
          >
            {t("jigsaw.title")}
          </h2>
          <p
            className="text-center text-sm tracking-[0.15em] mb-2"
            style={{ fontFamily: "var(--font-display)", color: sandMid }}
          >
            {t("jigsaw.subtitle")}
          </p>
          <p
            className="text-center text-xs tracking-[0.2em] mb-8"
            style={{ fontFamily: "var(--font-display)", color: ocean }}
          >
            {t("jigsaw.musicalCatalyst")}
          </p>

          {/* Dearden's Formulation */}
          <div
            className="text-center py-6 mb-8 mx-auto max-w-lg"
            style={{
              border: `1px solid oklch(0.72 0.12 75 / 0.4)`,
              background: `radial-gradient(ellipse at center, oklch(0.72 0.12 75 / 0.06) 0%, oklch(0.11 0.03 250 / 0.95) 70%)`,
            }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: goldDim, fontFamily: "var(--font-display)" }}>
              {t("jigsaw.formulation").split(":")[0]}
            </p>
            <p className="text-3xl sm:text-4xl font-light" style={{ color: gold, fontFamily: "var(--font-display)" }}>
              2% × 50 = 100%
            </p>
          </div>

          {/* Fish Quote */}
          <p className="text-center italic text-sm mb-10 max-w-2xl mx-auto" style={{ color: "oklch(0.55 0.04 200)", fontFamily: "var(--font-display)" }}>
            “{t("jigsaw.fishQuote")}”<br />
            <span className="text-xs not-italic" style={{ color: "oklch(0.40 0.03 200)" }}>— Fish, Marillion (1984)</span>
          </p>

          {/* Convergence Chart */}
          <h3
            className="text-lg tracking-[0.1em] uppercase text-center mb-6"
            style={{ fontFamily: "var(--font-display)", color: goldDim }}
          >
            {t("jigsaw.convergenceTitle")}
          </h3>
          <div className="mb-10" style={{ height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={[
                  { pieces: 4, gapPct: 2.00, leverage: 50.0, label: "4" },
                  { pieces: 9, gapPct: 2.67, leverage: 37.5, label: "9" },
                  { pieces: 16, gapPct: 3.00, leverage: 33.3, label: "16" },
                  { pieces: 25, gapPct: 3.20, leverage: 31.2, label: "25" },
                  { pieces: 100, gapPct: 3.60, leverage: 27.8, label: "100" },
                  { pieces: 225, gapPct: 3.73, leverage: 26.8, label: "225" },
                  { pieces: 500, gapPct: 3.82, leverage: 26.2, label: "500" },
                  { pieces: 1000, gapPct: 3.87, leverage: 25.8, label: "1K" },
                  { pieces: 1500, gapPct: 3.89, leverage: 25.7, label: "1.5K" },
                ]}
                margin={{ top: 10, right: 40, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "oklch(0.55 0.04 200)", fontSize: 12, fontFamily: "var(--font-display)" }}
                  axisLine={{ stroke: "oklch(0.30 0.02 240)" }}
                  label={{ value: "Puzzle Pieces", position: "insideBottom", offset: -10, fill: "oklch(0.50 0.04 200)", fontSize: 11, fontFamily: "var(--font-display)" }}
                />
                <YAxis
                  yAxisId="left"
                  domain={[0, 5]}
                  tick={{ fill: "oklch(0.72 0.12 75)", fontSize: 12 }}
                  axisLine={{ stroke: "oklch(0.30 0.02 240)" }}
                  label={{ value: "Gap %", angle: -90, position: "insideLeft", offset: 10, fill: "oklch(0.72 0.12 75)", fontSize: 11, fontFamily: "var(--font-display)" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 55]}
                  tick={{ fill: "oklch(0.55 0.18 20)", fontSize: 12 }}
                  axisLine={{ stroke: "oklch(0.30 0.02 240)" }}
                  label={{ value: "Leverage ×", angle: 90, position: "insideRight", offset: 10, fill: "oklch(0.55 0.18 20)", fontSize: 11, fontFamily: "var(--font-display)" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.14 0.04 250)",
                    border: "1px solid oklch(0.72 0.12 75 / 0.4)",
                    borderRadius: 0,
                    color: "oklch(0.88 0.008 75)",
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => [
                    name === "gapPct" ? `${value.toFixed(2)}%` : `${value.toFixed(1)}×`,
                    name === "gapPct" ? "Gap %" : "Leverage",
                  ]}
                  labelFormatter={(label) => `${label} pieces`}
                />
                <ReferenceLine yAxisId="left" y={4.0} stroke="oklch(0.72 0.12 75 / 0.3)" strokeDasharray="6 4" label={{ value: "4% asymptote", fill: "oklch(0.55 0.08 75)", fontSize: 10, position: "right" }} />
                <ReferenceLine yAxisId="right" y={25} stroke="oklch(0.55 0.18 20 / 0.3)" strokeDasharray="6 4" label={{ value: "25× asymptote", fill: "oklch(0.45 0.12 20)", fontSize: 10, position: "left" }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="gapPct"
                  stroke="oklch(0.72 0.12 75)"
                  strokeWidth={2.5}
                  dot={{ fill: "oklch(0.72 0.12 75)", r: 4 }}
                  activeDot={{ r: 6, fill: "oklch(0.85 0.12 75)" }}
                  name="gapPct"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="leverage"
                  stroke="oklch(0.55 0.18 20)"
                  strokeWidth={2.5}
                  dot={{ fill: "oklch(0.55 0.18 20)", r: 4 }}
                  activeDot={{ r: 6, fill: "oklch(0.70 0.18 20)" }}
                  name="leverage"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Cross-Domain Table */}
          <h3
            className="text-lg tracking-[0.1em] uppercase text-center mb-6"
            style={{ fontFamily: "var(--font-display)", color: goldDim }}
          >
            {t("jigsaw.crossDomainTitle")}
          </h3>
          <div className="overflow-x-auto mb-10">
            <table className="w-full max-w-3xl mx-auto text-sm" style={{ fontFamily: "var(--font-display)" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid oklch(0.72 0.12 75 / 0.3)` }}>
                  <th className="text-left py-2 px-3 tracking-widest uppercase text-xs" style={{ color: gold }}>Domain</th>
                  <th className="text-right py-2 px-3 tracking-widest uppercase text-xs" style={{ color: gold }}>Gap %</th>
                  <th className="text-right py-2 px-3 tracking-widest uppercase text-xs" style={{ color: gold }}>Leverage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { domain: "Jigsaw (4-piece base case)", gap: "2.00%", lev: "50.0×", highlight: true },
                  { domain: "Jigsaw (1,000-piece)", gap: "3.87%", lev: "25.8×", highlight: false },
                  { domain: "Masonry (mortar joints)", gap: "~20%", lev: "~5×", highlight: false },
                  { domain: "Bridge deck (expansion joints)", gap: "~0.03%", lev: "~3,300×", highlight: false },
                  { domain: "Concrete pavement (control joints)", gap: "~0.15%", lev: "~670×", highlight: false },
                  { domain: "Pareto principle", gap: "20%", lev: "4× (80/20)", highlight: false },
                  { domain: "iAAi (Dearden)", gap: "2%", lev: "50×", highlight: true },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: `1px solid oklch(0.20 0.02 240)`,
                      background: row.highlight ? "oklch(0.72 0.12 75 / 0.06)" : "transparent",
                    }}
                  >
                    <td className="py-2 px-3" style={{ color: row.highlight ? gold : sand }}>{row.domain}</td>
                    <td className="py-2 px-3 text-right" style={{ color: row.highlight ? gold : sandMid }}>{row.gap}</td>
                    <td className="py-2 px-3 text-right" style={{ color: row.highlight ? gold : sandMid }}>{row.lev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Three Laws */}
          <div
            className="max-w-2xl mx-auto py-6 px-8 mb-8"
            style={{
              border: `1px solid oklch(0.72 0.12 75 / 0.25)`,
              background: "oklch(0.14 0.04 250 / 0.8)",
            }}
          >
            <h3
              className="text-center text-sm tracking-[0.25em] uppercase mb-5"
              style={{ fontFamily: "var(--font-display)", color: gold }}
            >
              {t("jigsaw.threeLawsTitle")}
            </h3>
            <ol className="space-y-3 list-none">
              <li className="flex items-start gap-3">
                <span className="text-lg font-light" style={{ color: gold, fontFamily: "var(--font-display)" }}>I.</span>
                <span className="text-sm" style={{ color: sand, fontFamily: "var(--font-display)" }}>{t("jigsaw.law1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg font-light" style={{ color: gold, fontFamily: "var(--font-display)" }}>II.</span>
                <span className="text-sm" style={{ color: sand, fontFamily: "var(--font-display)" }}>{t("jigsaw.law2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg font-light" style={{ color: gold, fontFamily: "var(--font-display)" }}>III.</span>
                <span className="text-sm" style={{ color: sand, fontFamily: "var(--font-display)" }}>{t("jigsaw.law3")}</span>
              </li>
            </ol>
          </div>

          {/* Conclusion */}
          <p
            className="text-center text-xl sm:text-2xl font-light tracking-[0.08em] italic mb-3"
            style={{ fontFamily: "var(--font-display)", color: sand }}
          >
            “{t("jigsaw.conclusion")}”
          </p>
          <p
            className="text-center text-2xl sm:text-3xl font-light tracking-[0.1em]"
            style={{ fontFamily: "var(--font-display)", color: gold }}
          >
            {t("jigsaw.tagline")}
          </p>
          <p className="text-center text-xs mt-4 tracking-[0.2em]" style={{ color: ocean }}>
            TP-048 · Block 400 · <a href="/turing-papers" className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Read Full Paper</a>
            {" "}·{" "}
            <a href="/jigsaw" className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Interactive Jigsaw →</a>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 16 — THE 9 CONVERGING PROOFS
          Ridley / Henrich / Aviation / Urban Scaling / Eastern Continuity / Seesaw Synthesis
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-8`} />
            <p
              className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4 text-center`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              CONVERGENCE
            </p>
            <h2
              className={`text-3xl md:text-4xl font-light tracking-[0.08em] text-[${sand}] mb-4 text-center`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              The 9 Converging Proofs
            </h2>
            <p
              className={`text-sm text-[${ocean}] tracking-[0.15em] font-light mb-12 text-center`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nine independent disciplines — one governing law
            </p>

            {/* The Governing Law */}
            <div
              className="text-center py-8 mb-12 mx-auto max-w-2xl"
              style={{
                border: `1px solid oklch(0.72 0.12 75 / 0.4)`,
                background: `radial-gradient(ellipse at center, oklch(0.72 0.12 75 / 0.06) 0%, oklch(0.11 0.03 250 / 0.95) 70%)`,
              }}
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: goldDim, fontFamily: "var(--font-display)" }}>
                THE SEESAW STABILITY FRAMEWORK
              </p>
              <p className="text-4xl sm:text-5xl font-light" style={{ color: gold, fontFamily: "var(--font-display)" }}>
                AD² ≤ 16
              </p>
              <p className="text-sm mt-4 font-light" style={{ color: sandMid }}>
                A = Amplitude (connectivity, exchange, relay density)<br />
                D = Drag (isolation, conflict, resource friction)
              </p>
              <p className="text-xs mt-4 font-light italic" style={{ color: ocean }}>
                When A rises and D falls → civilisation stabilises.<br />
                When A stagnates and D rises → civilisation collapses.
              </p>
            </div>

            {/* Ridley / Henrich Thesis */}
            <div className="mb-12">
              <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                PROOF 2 — BIOLOGY & ANTHROPOLOGY
              </p>
              <h3 className={`text-xl md:text-2xl font-light tracking-[0.06em] text-[${sand}] mb-6`} style={{ fontFamily: "var(--font-display)" }}>
                Ridley & Henrich — Ideas Having Sex
              </h3>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                Matt Ridley (The Rational Optimist, 2010) demonstrated that civilisational progress is not a function of individual intelligence but of network exchange density — what he calls "ideas having sex." The mechanism is identical to sexual reproduction in biology: diversity of input produces adaptive offspring. Trade between strangers creates recombinant innovation. Isolation produces stagnation.
              </p>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                Joseph Henrich (Harvard, 2004) proved this mathematically using the Tasmania case: 4,000 humans with identical cognitive architecture to mainland Australians lost bone tools, fishing, hafted tools, and cold-weather clothing over 8,000 years of isolation. Rhys Jones (1977) called it "a slow strangulation of the mind." The population fell below the critical connectivity threshold — AD² exceeded 16.
              </p>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-6`}>
                Kline & Boyd (Proceedings of the Royal Society B, 2010) validated empirically across 10 Oceanic island populations that larger populations maintain more complex tool kits. Network density — not individual genius — determines technological capability. This is the Relay Compression Ratio expressed in anthropological data.
              </p>
            </div>

            {/* Aviation Safety — Empirical Proof */}
            <div className="mb-12">
              <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                PROOF 6 — CIVIL ENGINEERING EMPIRICAL
              </p>
              <h3 className={`text-xl md:text-2xl font-light tracking-[0.06em] text-[${sand}] mb-6`} style={{ fontFamily: "var(--font-display)" }}>
                Aviation Safety — The Line Isn't Safe Until Tested
              </h3>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                Fatal accidents per million commercial flights: 6.5 (1970) → 0.5 (2024). The curve did not flatten through theory. It flattened through 20 iterative safety interventions tested in blood — each numbered milestone a relay, each correction applied AFTER failure, not before. GPWS (1974), TCAS (1990), CRM (1990), reinforced cockpit doors (2003), CVR extension (2008), fatigue rules (2011).
              </p>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                The aviation industry proved over 54 years that: (1) theory alone kills people; (2) each relay must be stress-tested against reality; (3) safety is an emergent property of network density — 20 overlapping systems, not one; (4) no single intervention is sufficient — only the FIELD is safe. This is AD² ≤ 16 plotted in fatalities per million flights.
              </p>
              <p className={`text-xs text-[${goldDim}] font-light italic`}>
                Sources: Our World in Data, ICAO Safety Report 2024, Aviation Safety Network, FAA.gov
              </p>
            </div>

            {/* The Discovery Chain — Lego Mapping */}
            <div className="mb-12">
              <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                THE DISCOVERY CHAIN
              </p>
              <h3 className={`text-xl md:text-2xl font-light tracking-[0.06em] text-[${sand}] mb-6`} style={{ fontFamily: "var(--font-display)" }}>
                Data → Sorted → Arranged → Presented → Explained → Actionable
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ fontFamily: "var(--font-display)" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid oklch(0.72 0.12 75 / 0.3)` }}>
                      <th className="text-left py-3 px-4 tracking-widest uppercase text-xs" style={{ color: gold }}>Stage</th>
                      <th className="text-left py-3 px-4 tracking-widest uppercase text-xs" style={{ color: gold }}>iAAi Equivalent</th>
                      <th className="text-left py-3 px-4 tracking-widest uppercase text-xs" style={{ color: gold }}>TDF Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { stage: "DATA (raw pile)", iaai: "Raw relay input — 12,000 years unprocessed", tdf: "Physical Web" },
                      { stage: "SORTED (by type)", iaai: "12 Relays identified and sequenced", tdf: "Biological Web" },
                      { stage: "ARRANGED (structured)", iaai: "5 Webs × 12 Relays = 60 Nodes", tdf: "Digital Web" },
                      { stage: "PRESENTED (visual)", iaai: "Relay Cone, iCards, HyperGrid", tdf: "Social Web" },
                      { stage: "EXPLAINED (story)", iaai: "An Infrastructure Odyssey — narrative", tdf: "Consciousness Web" },
                      { stage: "ACTIONABLE (useful)", iaai: "The platform — Quest, Academy, xChange", tdf: "The Field (all 5)" },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        style={{ borderBottom: `1px solid oklch(0.20 0.02 240)` }}
                      >
                        <td className="py-3 px-4" style={{ color: gold }}>{row.stage}</td>
                        <td className="py-3 px-4" style={{ color: sand }}>{row.iaai}</td>
                        <td className="py-3 px-4" style={{ color: sandMid }}>{row.tdf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* The 7 Proofs Table */}
            <div className="mb-12">
              <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-6 text-center`} style={{ fontFamily: "var(--font-display)" }}>
                CONVERGENCE MATRIX
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ fontFamily: "var(--font-display)" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid oklch(0.72 0.12 75 / 0.3)` }}>
                      <th className="text-left py-3 px-4 tracking-widest uppercase text-xs" style={{ color: gold }}>#</th>
                      <th className="text-left py-3 px-4 tracking-widest uppercase text-xs" style={{ color: gold }}>Discipline</th>
                      <th className="text-left py-3 px-4 tracking-widest uppercase text-xs" style={{ color: gold }}>Proof Source</th>
                      <th className="text-left py-3 px-4 tracking-widest uppercase text-xs" style={{ color: gold }}>Validates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { n: "1", disc: "Engineering", source: "Seesaw AD² ≤ 16", validates: "Stability boundary" },
                      { n: "2", disc: "Biology", source: "Ridley (2010) — idea recombination", validates: "Amplitude (A)" },
                      { n: "3", disc: "Anthropology", source: "Henrich (2004) — Tasmania model", validates: "Drag (D)" },
                      { n: "4", disc: "Education", source: "Hong, Hult, McKinsey (2022–2025)", validates: "Fragmentation = institutional Tasmania" },
                      { n: "5", disc: "History", source: "12-Relay Compression Curve", validates: "56:1 threshold" },
                      { n: "6", disc: "Aviation", source: "ICAO 1970–2024 (54 years, 20 interventions)", validates: "Iterative field safety" },
                      { n: "7", disc: "Applied", source: "120,000 hours lived experience", validates: "The unreplicable foundation" },
                      { n: "8", disc: "Urban Physics", source: "West (2017) — city scaling β=1.15/0.85", validates: "Macro-scale AD² equilibrium" },
                      { n: "9", disc: "Eastern Continuity", source: "China 1840–2025 (Deng Pivot)", validates: "Relay-accelerated recovery from stored potential" },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: `1px solid oklch(0.20 0.02 240)`,
                          background: i === 0 ? "oklch(0.72 0.12 75 / 0.06)" : "transparent",
                        }}
                      >
                        <td className="py-3 px-4" style={{ color: gold }}>{row.n}</td>
                        <td className="py-3 px-4" style={{ color: sand }}>{row.disc}</td>
                        <td className="py-3 px-4" style={{ color: sandMid }}>{row.source}</td>
                        <td className="py-3 px-4" style={{ color: ocean }}>{row.validates}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Proof 8 — Urban Scaling */}
            <div className="mb-12">
              <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                PROOF 8 — URBAN PHYSICS
              </p>
              <h3 className={`text-xl md:text-2xl font-light tracking-[0.06em] text-[${sand}] mb-6`} style={{ fontFamily: "var(--font-display)" }}>
                Geoffrey West — City Scaling Laws
              </h3>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                Geoffrey West and the Santa Fe Institute demonstrated that cities obey universal scaling laws. As population (N) increases, innovation scales superlinearly (β ≈ 1.15 — wages, patents, idea flow) while infrastructure scales sublinearly (β ≈ 0.85 — roads, energy, resource load). The stability margin is N^0.3 — the gap between Amplitude and Drag.
              </p>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                When the superlinear curve (Amplitude) outpaces the sublinear curve (Drag), cities thrive. When Drag overwhelms Amplitude, cities collapse — Detroit (1950–2010), Venice (post-1600), Angkor Wat (post-1431). Each is an Urban Tasmania: AD² exceeded 16. This is the most data-rich civilisational dataset ever assembled — 300+ cities, 30+ countries, 50+ years.
              </p>
              <p className={`text-xs text-[${goldDim}] font-light italic`}>
                Sources: West, G. (2017) Scale. Bettencourt et al. (2007) PNAS 104(17).
              </p>
            </div>

            {/* Proof 9 — Eastern Continuity */}
            <div className="mb-12">
              <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                PROOF 9 — EASTERN CONTINUITY
              </p>
              <h3 className={`text-xl md:text-2xl font-light tracking-[0.06em] text-[${sand}] mb-6`} style={{ fontFamily: "var(--font-display)" }}>
                China 1840–2025 — The Deng Pivot
              </h3>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                China is the only civilisation to have maintained continuous institutional, linguistic, and infrastructural coherence for more than 4,000 years. Between 1840 and 1978, Drag dominated — foreign occupation, civil war, systemic inertia. Yet the civilisational substrate (Confucian bureaucracy, family networks, shared language, spatial infrastructure) remained intact beneath the surface. Amplitude was suppressed but never destroyed.
              </p>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                Deng Xiaoping's 1978 declaration — "To get rich is glorious" — was a civilisational reactivation signal. It converted systemic inertia into thrust. GDP per capita: $155 (1978) → $959 (2000) → $4,550 (2010) → $13,000 (2024). The exponential curve is only explicable if stored potential was released, not built from zero. This is relay-accelerated recovery — the same mechanism that distinguishes a civilisation with intact infrastructure from one that must rebuild.
              </p>
              <p className={`text-base text-[${sandMid}] font-light leading-[2] mb-4`}>
                Five acceleration factors: continuity of civilisational code (4,000 years of administrative DNA), infrastructure as memory (canals, roads, urban grids), cultural redundancy (Confucian ethics as stabilising relay), population amplitude (900 million networked nodes), and systemic inertia release (Deng converted D into A). Tasmania never recovered because relays were destroyed. China recovered in one generation because relays were dormant but intact.
              </p>
              <p className={`text-xs text-[${goldDim}] font-light italic`}>
                Sources: World Bank (2024). Maddison (2007) Contours of the World Economy. Naughton (2018) The Chinese Economy.
              </p>
            </div>

            {/* Visual Plates — Ridley-Dearden, Urban Scaling & Eastern Continuity */}
            <div className="mb-12">
              <p className={`text-xs text-[${gold}] tracking-[0.3em] uppercase font-light mb-6 text-center`} style={{ fontFamily: "var(--font-display)" }}>
                SYNTHESIS PLATES
              </p>
              <div className="space-y-8">
                <div>
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RIDLEY_DEARDEN_SYNTHESIS_PLATE-JdQVNbRApQcTDm2jvcTJdU.png"
                    alt="The Ridley-Dearden Model — System Synthesis from Biology to Engineering"
                    className="w-full object-contain"
                    loading="lazy"
                  />
                  <p className={`text-xs text-[${goldDim}] text-center mt-2 tracking-wider`} style={{ fontFamily: "var(--font-display)" }}>
                    Figure 16.1 — The Ridley–Dearden Model: Biological path (Ridley) meets Engineering path (Dearden)
                  </p>
                </div>
                <div>
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/URBAN_SCALING_PROOF_PLATE-Mebfseq99Y2oJVVr9xqREU.png"
                    alt="The Urban Scaling Proof — The Eighth Validation"
                    className="w-full object-contain"
                    loading="lazy"
                  />
                  <p className={`text-xs text-[${goldDim}] text-center mt-2 tracking-wider`} style={{ fontFamily: "var(--font-display)" }}>
                    Figure 16.2 — The Urban Scaling Proof: Geoffrey West's β=1.15/0.85 divergence mapped to AD² ≤ 16
                  </p>
                </div>
                <div>
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/EASTERN_CONTINUITY_PLATE-9N9SxPzYaxgDfZXz9YzFda.png"
                    alt="The Eastern Continuity Proof — The Ninth Validation"
                    className="w-full object-contain"
                    loading="lazy"
                  />
                  <p className={`text-xs text-[${goldDim}] text-center mt-2 tracking-wider`} style={{ fontFamily: "var(--font-display)" }}>
                    Figure 16.3 — The Eastern Continuity Proof: Amplitude–Drag curve 1840→2025 with Deng Pivot
                  </p>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="text-center">
              <p className={`text-base md:text-lg text-[${sandMid}] font-light leading-[2] mb-8 max-w-3xl mx-auto`}>
                Nine independent proofs converging on one law is not coincidence. It is a theorem. Civilisation = Function of Connectivity Density. The Seesaw equation formalises what biology discovered through evolution, anthropology through regression, aviation through blood, urban physics through city data, Eastern continuity through relay-accelerated recovery, and 120,000 hours of infrastructure practice through lived experience.
              </p>
              <p
                className={`text-sm text-[${goldDim}] tracking-[0.15em] font-light italic`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                "The future will be invented by people who connect ideas, not by people who guard them." — Matt Ridley
              </p>
              <p className="text-xs mt-4 tracking-[0.2em]" style={{ color: ocean }}>
                COUNTERFORCE v65 · Section 44C · Block 612
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ERROR & CORRECTION RECORD — BLOCK 403E ── */}
      <section className="py-16 md:py-20 px-6" style={{ background: bgDeep }}>
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.45_0.12_15)] to-transparent mx-auto mb-8" />
          <p
            className="text-xs text-[oklch(0.55_0.10_15)] tracking-[0.4em] uppercase text-center mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ERRATA &amp; CORRECTION LOG
          </p>
          <h2
            className="text-2xl md:text-3xl font-light text-[oklch(0.85_0.008_75)] tracking-[0.08em] uppercase text-center mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Failure Loops — Documented
          </h2>

          <div className="space-y-6">
            {/* Error Record 1 — Block 403E */}
            <div className="border border-[oklch(0.25_0.08_15/0.4)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[oklch(0.65_0.12_15)] px-2 py-0.5 border border-[oklch(0.45_0.12_15/0.3)]">BLOCK 403E</span>
                <span className="text-[10px] tracking-widest text-[oklch(0.45_0.03_200)]">22 MARCH 2026</span>
              </div>
              <p className="text-sm text-[oklch(0.75_0.04_75)] font-light leading-relaxed mb-3" style={{ fontFamily: "var(--font-display)" }}>
                <strong className="text-[oklch(0.85_0.008_75)]">iCard Generation — 3 Fundamental Errors Across 22 Cards</strong>
              </p>
              <div className="text-xs text-[oklch(0.55_0.04_200)] leading-relaxed space-y-2">
                <p><span className="text-[oklch(0.65_0.12_15)]">Error 1:</span> Used "5,000 years" on TP-003 (12 Relays). Correct value: <strong className="text-[oklch(0.75_0.04_75)]">12,000 years</strong> of civilisation.</p>
                <p><span className="text-[oklch(0.65_0.12_15)]">Error 2:</span> Used "2024-2026" on all cards. Correct value: <strong className="text-[oklch(0.75_0.04_75)]">2025-2026</strong>. Project started 5 November 2025, not 2024.</p>
                <p><span className="text-[oklch(0.65_0.12_15)]">Error 3:</span> Missing <strong className="text-[oklch(0.75_0.04_75)]">website URL</strong> and <strong className="text-[oklch(0.75_0.04_75)]">Beta PoC</strong> designation — ground rules omitted from every card.</p>
                <p><span className="text-[oklch(0.65_0.12_15)]">Root Cause:</span> Agent failed to verify foundational facts before generation. These are ground rules stated across all site pages.</p>
                <p><span className="text-[oklch(0.65_0.12_15)]">Impact:</span> 22 cards generated with wrong data. User review cycle wasted.</p>
                <p><span className="text-[oklch(0.65_0.12_15)]">Resolution:</span> All 22 cards regenerated with corrections (v3/v2). Failure logged here permanently.</p>
              </div>
            </div>
          </div>

          <p className="text-center text-[10px] text-[oklch(0.40_0.03_200)] tracking-widest uppercase mt-8">
            THE LINE IS NOT SAFE UNTIL THE SYSTEM IS TESTED — EVERY ERROR IS EVIDENCE
          </p>
        </div>
      </section>

      {/* COUNTER Clean — Quick Reference Summary */}
      <section className="py-24 md:py-32 px-6" style={{ background: bgDeep }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className={`text-sm text-[${gold}] tracking-[0.3em] uppercase font-light mb-6`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("thesis.counterQuickRef") || "QUICK REFERENCE"}
            </p>
            <h2
              className={`text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[${sand}] mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              COUNTER
            </h2>
            <p
              className={`text-base text-[${sandMid}] font-light italic tracking-wide mb-12`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built by a builder, for builders. The tool teaches you how to build with the blocks of human history.
            </p>
            <a
              href="/manus-storage/counter_framework_cbf48d1b.png"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/manus-storage/counter_framework_cbf48d1b.png"
                alt="COUNTER — Parts, Measures & Balance — Clean presentation version"
                className="w-full max-w-4xl mx-auto object-contain"
                loading="lazy"
              />
            </a>
            <p className={`mt-8 text-xs text-[${goldDim}] tracking-wider font-light`}>
              {t("thesis.counterCaption") || "Infrastructure Academy | iAAi | Principia Tectonica"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[oklch(0.20_0.008_240)]">
        <p
          className={`text-sm text-[oklch(0.35_0.02_240)] tracking-[0.15em] font-light`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("thesis.footer")}
        </p>
      </footer>
    </div>
  );
}
