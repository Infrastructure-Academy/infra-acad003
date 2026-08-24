/**
 * The 40-Generation Wave — Micro-Rhythm of Civilisation
 * Block 489 — Standalone page expanding the 40-generation wave model.
 * Each relay's ~40 generations follow: Ignition → Expansion → Maturity → Fracture.
 * Dark canvas with gold/amber accents matching site authority palette.
 */
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

/* CDN URLs */
const IAAI_CHIP = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iaai-chip-core_74003507.jpeg";
const SPIRAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCard-V3-GenerationSpiral-v3_742044bb.png";

/* Colour tokens */
const gold = "oklch(0.72_0.12_75)";
const goldDim = "oklch(0.55_0.08_75)";
const sand = "oklch(0.88_0.008_75)";
const sandMid = "oklch(0.65_0.02_75)";
const bg = "oklch(0.10_0.005_240)";
const bgDeep = "oklch(0.07_0.005_240)";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: i * 0.25 },
  }),
};

/* The four phases of the wave */
const phases = [
  {
    phase: "I",
    name: "Ignition",
    generations: "G1–G10",
    character: "Discovery",
    colour: "oklch(0.65_0.15_30)", // warm red-orange
    description: "Experimentation, early adopters, first proofs of concept. The new infrastructure exists but is fragile, localised, and poorly understood. Knowledge is held by a few. The old relay still dominates.",
    examples: [
      { relay: "R1 Fire", detail: "Sporadic controlled burns, fire-hardened tools, first hearths" },
      { relay: "R5 Roads", detail: "Persian Royal Road, early Roman via — single routes, not networks" },
      { relay: "R7 Loom", detail: "Arkwright's water frame, Crompton's mule — factory prototypes in Lancashire" },
      { relay: "R12 Human Nodes", detail: "ARPANET, early web, dial-up — the internet exists but is niche (1990s–2000s)" },
    ],
  },
  {
    phase: "II",
    name: "Expansion",
    generations: "G11–G20",
    character: "Scaling",
    colour: "oklch(0.72_0.12_75)", // gold
    description: "Codification, institutionalisation, geographic diffusion. The infrastructure becomes reliable enough for states and empires to adopt it. Standards emerge. Trade routes multiply. The relay begins to reshape society.",
    examples: [
      { relay: "R1 Fire", detail: "Permanent settlements, cooking as cultural norm, metallurgy begins" },
      { relay: "R5 Roads", detail: "Roman road network spans 400,000 km — the first continental grid" },
      { relay: "R7 Loom", detail: "Factory system spreads across Europe, cotton becomes global commodity" },
      { relay: "R12 Human Nodes", detail: "Smartphones, social media, cloud computing — billions connected (2010s)" },
    ],
  },
  {
    phase: "III",
    name: "Maturity",
    generations: "G21–G30",
    character: "Optimisation",
    colour: "oklch(0.60_0.10_200)", // steel blue
    description: "Mastery, global reach, peak efficiency. The infrastructure is fully integrated into civilisation. It becomes invisible — assumed, not questioned. Optimisation replaces innovation. The relay reaches its carrying capacity.",
    examples: [
      { relay: "R1 Fire", detail: "Smelting, ceramics, glass — fire-based industries dominate for millennia" },
      { relay: "R5 Roads", detail: "Silk Road network, Inca road system — roads as civilisational backbone" },
      { relay: "R7 Loom", detail: "Mass production, global textile trade, synthetic fibres" },
      { relay: "R12 Human Nodes", detail: "AI integration, IoT, digital twins — we are HERE (2020s)" },
    ],
  },
  {
    phase: "IV",
    name: "Fracture",
    generations: "G31–G40",
    character: "Limits",
    colour: "oklch(0.50_0.08_300)", // muted purple
    description: "Contradictions exposed, diminishing returns, seeds of the next relay. The infrastructure that once liberated now constrains. Its limits create the pressure that forces the next relay into existence. The fracture zone is the fractal connector.",
    examples: [
      { relay: "R1 Fire", detail: "Deforestation, resource depletion — fire alone cannot sustain growing populations" },
      { relay: "R5 Roads", detail: "Empire overextension, maintenance collapse — roads cannot hold without governance" },
      { relay: "R7 Loom", detail: "Labour exploitation, pollution, Luddite resistance — the factory demands the engine" },
      { relay: "R12 Human Nodes", detail: "Information overload, AI alignment crisis, cognitive saturation — the Both Era begins" },
    ],
  },
];

/* 12 Relays with their wave position */
const relays = [
  { n: 1, name: "Fire", start: "pre-10,000 BCE", gens: "~80", wavePos: "Maturity → Fracture" },
  { n: 2, name: "Tree", start: "pre-10,000 BCE", gens: "~80", wavePos: "Maturity → Fracture" },
  { n: 3, name: "River", start: "8,000 BCE", gens: "~160", wavePos: "Maturity → Fracture" },
  { n: 4, name: "Horse", start: "4,000 BCE", gens: "~140", wavePos: "Maturity → Fracture" },
  { n: 5, name: "Roads", start: "500 BCE", gens: "~40", wavePos: "Maturity → Fracture" },
  { n: 6, name: "Ships", start: "500 CE", gens: "~51", wavePos: "Maturity → Fracture" },
  { n: 7, name: "Loom", start: "1780 CE", gens: "~2", wavePos: "Fracture" },
  { n: 8, name: "Rail", start: "1830 CE", gens: "<1", wavePos: "Maturity → Fracture" },
  { n: 9, name: "Engine", start: "1850 CE", gens: "~2", wavePos: "Maturity → Fracture" },
  { n: 10, name: "AAA Triad", start: "1900 CE", gens: "~2.4", wavePos: "Maturity" },
  { n: 11, name: "Orbit", start: "1960 CE", gens: "~1.6", wavePos: "Expansion → Maturity" },
  { n: 12, name: "Human Nodes", start: "2000 CE", gens: "~1", wavePos: "Ignition → Expansion" },
];

export default function GenerationWave() {
  return (
    <div className={`min-h-screen bg-[${bg}]`}>
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════
          HERO — The 40-Generation Wave
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IAAI_CHIP})`,
            filter: "saturate(0.3) brightness(0.10)",
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-b from-[${bgDeep}/0.6] via-[${bgDeep}/0.3] to-[${bgDeep}]`} />

        <div className="relative z-10 h-screen flex flex-col items-center justify-center px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <p
              className={`text-xs text-[${goldDim}] tracking-[0.5em] uppercase font-light mb-6`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              iAAi · Principia Tectonica · Micro-Rhythm
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.5}>
            <h1
              className={`text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.08em] uppercase text-[${sand}] mb-4`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              The 40-Generation Wave
            </h1>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            <p
              className={`text-lg md:text-xl font-light text-[${goldDim}] tracking-[0.15em] italic mb-2`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ignition → Expansion → Maturity → Fracture
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1.5}>
            <p
              className={`text-sm text-[oklch(0.45_0.03_200)] tracking-[0.12em] font-light max-w-2xl mt-6`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Within each relay, the 500-generation arc reveals a repeating micro-structure — a four-phase wave
              that governs the internal rhythm of every civilisational transition.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mt-12">
            <div className={`w-px h-16 bg-gradient-to-b from-transparent via-[${gold}] to-transparent mx-auto`} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE MODEL — 480 / 12 = 40 generations per relay
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>

            <div className="text-center mb-12">
              <p className={`text-xs text-[${goldDim}] tracking-[0.4em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                The Model
              </p>
              <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-6`} />
              <h2 className={`text-2xl md:text-3xl font-light tracking-[0.08em] uppercase text-[${sand}]`} style={{ fontFamily: "var(--font-display)" }}>
                480 ÷ 12 = 40
              </h2>
            </div>

            <div className="space-y-6">
              <p className={`text-sm md:text-base font-light text-[${sandMid}] leading-relaxed`}>
                If 12,000 years of settled civilisation encompass approximately 480 generations (at the 25-year anthropological standard), and the iAAi framework identifies twelve civilisational relays, then each relay spans approximately <span className={`text-[${gold}]`}>40 generations</span> on average. This is not merely arithmetic — it reveals a repeating lifecycle within every relay.
              </p>

              <p className={`text-sm md:text-base font-light text-[${sandMid}] leading-relaxed`}>
                The 40-generation wave mirrors the author's 14-year ignition / 42-year applied life model at the individual scale. The Ignition phase (14 years of a human life) maps to Generations 1–10 of a relay; the Applied Life phase (42 years) maps to Generations 11–40. The fracture zone at the end of each relay is the <span className={`text-[${gold}]`}>fractal connector</span> — the moment when the limits of one infrastructure paradigm create the conditions for the next.
              </p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE FOUR PHASES — Visual cards
         ═══════════════════════════════════════════════════════════ */}
      <section className={`py-16 md:py-24 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>

            <div className="text-center mb-14">
              <p className={`text-xs text-[${goldDim}] tracking-[0.4em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                The Four Phases
              </p>
              <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-6`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {phases.map((p) => (
                <div key={p.phase} className={`border-t-2 border-[${p.colour}]/60 pt-6`}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className={`text-2xl font-light text-[${p.colour}]`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.phase}
                    </span>
                    <h3
                      className={`text-xl font-light text-[${sand}] tracking-wide`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.name}
                    </h3>
                    <span className={`text-xs text-[${sandMid}] tracking-wider`}>
                      {p.generations}
                    </span>
                  </div>

                  <p className={`text-xs text-[${p.colour}] tracking-[0.2em] uppercase font-light mb-3`}>
                    {p.character}
                  </p>

                  <p className={`text-sm font-light text-[${sandMid}] leading-relaxed mb-5`}>
                    {p.description}
                  </p>

                  <div className="space-y-2">
                    {p.examples.map((ex, i) => (
                      <div key={i} className="flex gap-3">
                        <span className={`text-xs font-light text-[${gold}] whitespace-nowrap min-w-[80px]`}>
                          {ex.relay}
                        </span>
                        <span className={`text-xs font-light text-[oklch(0.50_0.02_240)]`}>
                          {ex.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE WAVE DIAGRAM — Visual representation
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>

            <div className="text-center mb-12">
              <p className={`text-xs text-[${goldDim}] tracking-[0.4em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                The Waveform
              </p>
              <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-6`} />
              <h2 className={`text-2xl md:text-3xl font-light tracking-[0.08em] uppercase text-[${sand}]`} style={{ fontFamily: "var(--font-display)" }}>
                One Relay, Four Movements
              </h2>
            </div>

            {/* SVG Wave Diagram */}
            <div className="flex justify-center mb-8">
              <svg viewBox="0 0 800 200" className="w-full max-w-3xl" xmlns="http://www.w3.org/2000/svg">
                {/* Background grid lines */}
                {[0, 200, 400, 600, 800].map((x) => (
                  <line key={`vg-${x}`} x1={x} y1="30" x2={x} y2="180" stroke="oklch(0.20 0.01 240)" strokeWidth="0.5" />
                ))}
                {[30, 80, 130, 180].map((y) => (
                  <line key={`hg-${y}`} x1="0" y1={y} x2="800" y2={y} stroke="oklch(0.20 0.01 240)" strokeWidth="0.5" />
                ))}

                {/* The wave curve */}
                <path
                  d="M 0,160 C 50,160 80,140 120,100 C 160,60 180,45 200,40 C 240,30 320,30 400,40 C 480,50 520,60 560,80 C 600,100 640,130 700,150 C 740,160 770,165 800,170"
                  fill="none"
                  stroke="oklch(0.72 0.12 75)"
                  strokeWidth="2.5"
                />

                {/* Phase zones */}
                <rect x="0" y="20" width="200" height="8" rx="2" fill="oklch(0.65 0.15 30)" opacity="0.7" />
                <rect x="200" y="20" width="200" height="8" rx="2" fill="oklch(0.72 0.12 75)" opacity="0.7" />
                <rect x="400" y="20" width="200" height="8" rx="2" fill="oklch(0.60 0.10 200)" opacity="0.7" />
                <rect x="600" y="20" width="200" height="8" rx="2" fill="oklch(0.50 0.08 300)" opacity="0.7" />

                {/* Phase labels */}
                <text x="100" y="15" textAnchor="middle" fill="oklch(0.65 0.15 30)" fontSize="11" fontFamily="var(--font-display)" letterSpacing="0.1em">IGNITION</text>
                <text x="300" y="15" textAnchor="middle" fill="oklch(0.72 0.12 75)" fontSize="11" fontFamily="var(--font-display)" letterSpacing="0.1em">EXPANSION</text>
                <text x="500" y="15" textAnchor="middle" fill="oklch(0.60 0.10 200)" fontSize="11" fontFamily="var(--font-display)" letterSpacing="0.1em">MATURITY</text>
                <text x="700" y="15" textAnchor="middle" fill="oklch(0.50 0.08 300)" fontSize="11" fontFamily="var(--font-display)" letterSpacing="0.1em">FRACTURE</text>

                {/* Generation markers */}
                <text x="100" y="195" textAnchor="middle" fill="oklch(0.40 0.02 240)" fontSize="10" fontFamily="var(--font-display)">G1–G10</text>
                <text x="300" y="195" textAnchor="middle" fill="oklch(0.40 0.02 240)" fontSize="10" fontFamily="var(--font-display)">G11–G20</text>
                <text x="500" y="195" textAnchor="middle" fill="oklch(0.40 0.02 240)" fontSize="10" fontFamily="var(--font-display)">G21–G30</text>
                <text x="700" y="195" textAnchor="middle" fill="oklch(0.40 0.02 240)" fontSize="10" fontFamily="var(--font-display)">G31–G40</text>

                {/* Peak marker */}
                <circle cx="300" cy="35" r="4" fill="oklch(0.72 0.12 75)" />
                <line x1="300" y1="39" x2="300" y2="180" stroke="oklch(0.72 0.12 75)" strokeWidth="0.5" strokeDasharray="4,4" />
              </svg>
            </div>

            <p className={`text-xs text-center text-[oklch(0.40_0.03_240)] italic mb-8`}>
              The waveform of a single relay: rising through Ignition, peaking in Expansion, sustaining through Maturity, and descending into Fracture — where the seeds of the next relay germinate.
            </p>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          RELAY STATUS TABLE — Where each relay sits in its wave
         ═══════════════════════════════════════════════════════════ */}
      <section className={`py-16 md:py-24 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>

            <div className="text-center mb-12">
              <p className={`text-xs text-[${goldDim}] tracking-[0.4em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                Current Wave Position
              </p>
              <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-6`} />
              <h2 className={`text-2xl md:text-3xl font-light tracking-[0.08em] uppercase text-[${sand}]`} style={{ fontFamily: "var(--font-display)" }}>
                Twelve Relays, All Running
              </h2>
              <p className={`text-sm font-light text-[${sandMid}] mt-4 max-w-2xl mx-auto`}>
                Every relay is still active. The wave position tells us where each relay sits in its lifecycle — from the ancient relays deep in Fracture to Relay 12 still in its Ignition phase.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b border-[oklch(0.25_0.06_75)]`}>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Relay</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Name</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Start</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Gens</th>
                    <th className={`text-left py-3 px-3 text-[${gold}] font-light tracking-wider text-xs uppercase`}>Wave Position (2025)</th>
                  </tr>
                </thead>
                <tbody className={`text-[${sandMid}] font-light`}>
                  {relays.map((r) => (
                    <tr key={r.n} className={`border-b border-[oklch(0.18_0.01_240)] ${r.n === 12 ? `text-[${gold}]` : ''}`}>
                      <td className="py-2.5 px-3">R{r.n}</td>
                      <td className={`py-2.5 px-3 ${r.n === 12 ? '' : `text-[${sand}]`}`}>{r.name}</td>
                      <td className="py-2.5 px-3">{r.start}</td>
                      <td className="py-2.5 px-3">{r.gens}</td>
                      <td className="py-2.5 px-3">{r.wavePos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={`text-xs text-center text-[oklch(0.40_0.03_240)] italic mt-6`}>
              Relay 12 (Human Nodes) began circa 2000 CE — we are in Generation 1 of that relay. The Ignition phase.
            </p>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE FRACTAL CONNECTOR — Fracture creates Ignition
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>

            <div className="text-center mb-12">
              <p className={`text-xs text-[${goldDim}] tracking-[0.4em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                The Fractal Connector
              </p>
              <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-6`} />
              <h2 className={`text-2xl md:text-3xl font-light tracking-[0.08em] uppercase text-[${sand}]`} style={{ fontFamily: "var(--font-display)" }}>
                Fracture Creates Ignition
              </h2>
            </div>

            <div className="space-y-6">
              <p className={`text-sm md:text-base font-light text-[${sandMid}] leading-relaxed`}>
                The most important insight of the 40-Generation Wave is that <span className={`text-[${gold}]`}>Phase IV (Fracture) of one relay is Phase I (Ignition) of the next</span>. The fracture zone is not failure — it is the fractal connector, the moment when the limits of one infrastructure paradigm create the exact conditions that force the next relay into existence.
              </p>

              <p className={`text-sm md:text-base font-light text-[${sandMid}] leading-relaxed`}>
                Deforestation (R1 Fracture) demanded agriculture (R2 Ignition). River-valley limits (R3 Fracture) demanded the horse (R4 Ignition). Road-empire overextension (R5 Fracture) demanded maritime exploration (R6 Ignition). Factory-system exploitation (R7 Fracture) demanded the railway (R8 Ignition). And now, information overload and cognitive saturation (R12 early Fracture signals) are creating the conditions for Relay 13 — the Both Era.
              </p>

              <p className={`text-sm md:text-base font-light text-[${sandMid}] leading-relaxed`}>
                The wave is not merely descriptive. It is <span className={`text-[${gold}]`}>predictive</span>. If Relay 12 (Human Nodes) began circa 2000 CE, then we are currently in Generation 1 of that relay — the Ignition phase. The scaling, maturity, and eventual fracture of the Human Nodes relay lie ahead, compressed into a timeline that the population-relay correlation suggests will be measured in decades, not centuries.
              </p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE INDIVIDUAL MIRROR — 14/42 life model
         ═══════════════════════════════════════════════════════════ */}
      <section className={`py-16 md:py-24 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>

            <div className="text-center mb-12">
              <p className={`text-xs text-[${goldDim}] tracking-[0.4em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                The Individual Mirror
              </p>
              <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-6`} />
              <h2 className={`text-2xl md:text-3xl font-light tracking-[0.08em] uppercase text-[${sand}]`} style={{ fontFamily: "var(--font-display)" }}>
                14 Years / 42 Years
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`border-t border-[${gold}]/30 pt-6`}>
                <h3 className={`text-lg font-light text-[${sand}] tracking-wide mb-3`} style={{ fontFamily: "var(--font-display)" }}>
                  The Ignition Years
                </h3>
                <p className={`text-3xl font-light text-[${gold}] mb-3`} style={{ fontFamily: "var(--font-display)" }}>14</p>
                <p className={`text-sm font-light text-[${sandMid}] leading-relaxed`}>
                  The first 14 years of a human life — learning, absorbing, experimenting, failing. The individual's Ignition phase. Maps to Generations 1–10 of a relay: the period of discovery, early adoption, and fragile first proofs.
                </p>
              </div>

              <div className={`border-t border-[${gold}]/30 pt-6`}>
                <h3 className={`text-lg font-light text-[${sand}] tracking-wide mb-3`} style={{ fontFamily: "var(--font-display)" }}>
                  The Applied Life
                </h3>
                <p className={`text-3xl font-light text-[${gold}] mb-3`} style={{ fontFamily: "var(--font-display)" }}>42</p>
                <p className={`text-sm font-light text-[${sandMid}] leading-relaxed`}>
                  The remaining 42 years of productive life — building, scaling, mastering, and eventually confronting limits. Maps to Generations 11–40: Expansion, Maturity, and Fracture. The individual lifecycle is a fractal echo of the relay lifecycle.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <p className={`text-sm font-light text-[${sandMid}] italic`}>
                14 + 42 = 56 years — one human life. 10 + 30 = 40 generations — one relay. The ratio is the same.
              </p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SPIRAL REFERENCE — The spiral shows the wave compressed
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}>

            <div className="text-center mb-12">
              <p className={`text-xs text-[${goldDim}] tracking-[0.4em] uppercase font-light mb-4`} style={{ fontFamily: "var(--font-display)" }}>
                The Spiral View
              </p>
              <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-6`} />
            </div>

            <div className="flex justify-center mb-6">
              <img
                src={SPIRAL_IMG}
                alt="The 500-Generation Spiral — each revolution contains 40 generations"
                className="w-full max-w-md rounded-sm border border-[oklch(0.25_0.06_75)] object-contain"
              />
            </div>

            <p className={`text-xs text-center text-[oklch(0.40_0.03_240)] italic mb-8`}>
              The 500-Generation Spiral. Each revolution of the spiral represents one relay — and within each revolution, the 40-generation wave plays out: Ignition on the outer edge, Fracture at the inner turn where the spiral tightens into the next relay.
            </p>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CAPSTONE
         ═══════════════════════════════════════════════════════════ */}
      <section className={`py-16 md:py-24 px-6 bg-[${bgDeep}]`}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.5 } } }}>

            <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mb-8`} />

            <blockquote className="mb-8">
              <p className={`text-lg md:text-xl font-light italic text-[${sand}] leading-relaxed`} style={{ fontFamily: "var(--font-display)" }}>
                Every relay ignites in the fracture of the one before it. Every generation inherits the wave.
                And every wave — from the first controlled fire to the last human node — follows the same four movements:
                discover, scale, master, break through.
              </p>
            </blockquote>

            <p className={`text-sm text-[${goldDim}] tracking-[0.15em] font-light italic`} style={{ fontFamily: "var(--font-display)" }}>
              — Ir. Nigel T. Dearden CEng
            </p>

            <div className={`w-20 h-px bg-gradient-to-r from-transparent via-[${gold}] to-transparent mx-auto mt-12 mb-8`} />

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/scholar-8">
                <span
                  className={`inline-block px-6 py-3 text-xs tracking-[0.2em] uppercase font-light border border-[${gold}]/40 text-[${gold}] hover:bg-[${gold}]/10 transition-colors cursor-pointer`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Scholar 8 — The Both Era
                </span>
              </Link>
              <Link href="/thesis/v2#500-generations">
                <span
                  className={`inline-block px-6 py-3 text-xs tracking-[0.2em] uppercase font-light border border-[oklch(0.30_0.02_240)] text-[${sandMid}] hover:border-[${gold}]/40 hover:text-[${gold}] transition-colors cursor-pointer`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  500 Generations Thesis
                </span>
              </Link>
              <Link href="/thesis/v2">
                <span
                  className={`inline-block px-6 py-3 text-xs tracking-[0.2em] uppercase font-light border border-[oklch(0.30_0.02_240)] text-[${sandMid}] hover:border-[${gold}]/40 hover:text-[${gold}] transition-colors cursor-pointer`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Principia Tectonica
                </span>
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 text-center border-t border-[oklch(0.25_0.06_75)]`}>
        <p
          className={`text-sm text-[oklch(0.40_0.02_240)] tracking-[0.15em] font-light`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          iAAi · Principia Tectonica · Block 489
        </p>
        <p
          className={`text-xs text-[oklch(0.30_0.02_240)] mt-2 tracking-widest uppercase`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          Per Arya Ad Astra
        </p>
      </footer>
    </div>
  );
}
