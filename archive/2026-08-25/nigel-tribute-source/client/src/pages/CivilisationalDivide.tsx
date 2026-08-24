/**
 * The Civilisational Divide — Education, Markets & The Building Argument
 * Block 500 — The education economics page.
 * Why 85% of children reject engineering, why 550M workers maintain the world,
 * and why "building" — not "civil engineering" — is the language that unlocks everything.
 *
 * Dark canvas, gold/amber accents, Cormorant Garamond display.
 */
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { useState } from "react";

/* CDN images */
const PIPELINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/01_complete_pipeline_age8_to_scholar_fddf155f.jpg";
const IGO_UMBRELLA = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/04_icard_igo_umbrella_3550b10b.png";
const EDUCATION_TIERS = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/11_education_edutainment_procurement_aada31cf.jpg";
const IGO_GHOST = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/09_igo_infrastructure_ghost_odyssey_d6a31733.png";
const MASTERY_TIERS = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/10_three_tiers_of_mastery_cbe47e7f.jpg";
const ISI_INDEX = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/15_infrastructure_survival_index_78544c00.jpg";
const IAAI_CHIP = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iaai-chip-core_74003507.jpeg";

/* Colour tokens */
const gold = "oklch(0.72_0.12_75)";
const goldDim = "oklch(0.55_0.08_75)";
const goldBright = "oklch(0.82_0.12_75)";
const sand = "oklch(0.88_0.008_75)";
const sandMid = "oklch(0.65_0.02_75)";
const ocean = "oklch(0.55_0.06_200)";
const bg = "oklch(0.10_0.005_240)";
const bgDeep = "oklch(0.07_0.005_240)";
const NAVY = "#0b1a33";
const GOLD = "#d4a843";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: i * 0.25 },
  }),
};

/* Lightbox */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        src={src}
        alt={alt}
        className="max-w-[92vw] max-h-[92vh] object-contain rounded"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light transition-colors"
        style={{ fontFamily: "var(--font-display)" }}
      >
        ✕
      </button>
    </motion.div>
  );
}

/* Key figures data */
const KEY_FIGURES = [
  { value: "550M", label: "Infrastructure Workers Globally", source: "ILO / Oxford Economics" },
  { value: "$106T", label: "Investment Needed by 2040", source: "McKinsey Global Institute" },
  { value: "85%", label: "Children Reject Engineering", source: "ASQ / Harris Interactive" },
  { value: "55%", label: "Parents Can't Advise on Engineering", source: "EngineeringUK 2025" },
  { value: "$1→$3.70", label: "Return per Dollar over 20 Years", source: "UMD / AECOM" },
  { value: "$96.4B", label: "K-12 STEM Market by 2030", source: "ResearchAndMarkets" },
];

/* Target market segments */
const MARKETS = [
  {
    segment: "Parents & Families",
    size: "$49.9B → $96.4B",
    entry: "iGO app + physical collaterals (iCards, dice, spinning toys). App stores, STEM toy retailers, homeschool networks.",
    mode: "Modes 1–4 (Age 8–22)",
    hook: "Your child learns to build. LEGO meets Duolingo for the real world.",
  },
  {
    segment: "Schools (K-12)",
    size: "2.1M schools globally",
    entry: "Observer Programme. Teacher doesn't need to be an engineer — the platform teaches. STEM curriculum alignment.",
    mode: "Modes 1–3 (Age 8–18)",
    hook: "Curriculum-ready infrastructure literacy. No specialist teacher required.",
  },
  {
    segment: "Universities",
    size: "28,000+ engineering faculties",
    entry: "R3 Academic Panel, FITS Assessment. ISI scoring as dissertation framework.",
    mode: "Modes 4–6 (Age 18–30)",
    hook: "Interdisciplinary infrastructure assessment framework with built-in scoring.",
  },
  {
    segment: "Professional Bodies",
    size: "ICE, IET, ASCE, 50+ national bodies",
    entry: "CPD alignment, Chartership pathway. Maps directly to competency frameworks.",
    mode: "Modes 5–9 (Age 25–50)",
    hook: "Structured CPD that maps to chartership requirements. Already speaks their language.",
  },
  {
    segment: "Infrastructure Companies",
    size: "$13.9T global construction output",
    entry: "Graduate training, workforce development. HR/L&D departments.",
    mode: "Modes 5–10 (Age 25–55)",
    hook: "Train 550M workers with one platform. Consistent, scalable, measurable.",
  },
  {
    segment: "Government & MDBs",
    size: "$100B+ annual capacity building",
    entry: "World Bank, ADB, AfDB infrastructure investment programmes with built-in training budgets.",
    mode: "Modes 7–12 (Age 35–65+)",
    hook: "Infrastructure capacity building for developing nations. SDG-aligned.",
  },
];

/* The 12-mode pipeline */
const PIPELINE = [
  { mode: 1, name: "Relay Spinner", age: "8–10", episode: "Ep.1", desc: "Discovery through play. Physical spinning toys map to the 60 Dearden Field nodes." },
  { mode: 2, name: "Dungeon Crawl", age: "10–12", episode: "Ep.1", desc: "Narrative exploration. The child navigates infrastructure history as a game quest." },
  { mode: 3, name: "Campaign Journal", age: "12–14", episode: "Ep.1", desc: "Structured recording. The player documents discoveries and builds their first ISI profile." },
  { mode: 4, name: "iGO Explorer", age: "14–18", episode: "Ep.1", desc: "Full platform access. AR overlays, iCards, DAVID AI co-pilot activated." },
  { mode: 5, name: "Graduate", age: "18–25", episode: "Ep.2", desc: "Professional entry. University modules, work placement integration." },
  { mode: 6, name: "Practitioner", age: "25–30", episode: "Ep.2", desc: "Applied practice. Real-world infrastructure assessment and ISI field testing." },
  { mode: 7, name: "Chartered", age: "30–35", episode: "Ep.2", desc: "Professional recognition. CPD alignment with ICE/IET/ASCE frameworks." },
  { mode: 8, name: "Senior Leader", age: "35–45", episode: "Ep.2", desc: "Strategic leadership. Portfolio management, lifecycle economics mastery." },
  { mode: 9, name: "Industry Leader", age: "45–55", episode: "Ep.3", desc: "Sector influence. Policy, standards development, institutional partnerships." },
  { mode: 10, name: "Master Class", age: "55–65", episode: "Ep.3", desc: "Knowledge transfer. Mentoring the next generation, Observer Programme leadership." },
  { mode: 11, name: "Emeritus", age: "65–75", episode: "Ep.3", desc: "Legacy building. Academic contribution, R3 Panel, permanent record." },
  { mode: 12, name: "Scholar", age: "75+", episode: "Ep.3", desc: "The permanent archive. Your ISI profile becomes part of the civilisational record." },
];

export default function CivilisationalDivide() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      {/* ═══════════════════════════════════════════
          HERO — THE CIVILISATIONAL DIVIDE
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IAAI_CHIP})`,
            filter: "saturate(0.4) brightness(0.15)",
          }}
        />
        <div className={`absolute inset-0`} style={{ background: `linear-gradient(to bottom, ${NAVY}cc 0%, ${NAVY}55 30%, transparent 50%, ${NAVY}aa 78%, ${NAVY})` }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="text-sm tracking-[0.4em] uppercase font-light mb-6"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            iAAi · The Education Argument
          </motion.p>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={0.5}
            className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.08em] uppercase mb-6"
            style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
          >
            The Civilisational Divide
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto mb-4"
            style={{ color: "#8a9cc0", fontFamily: "var(--font-display)" }}
          >
            550 million people build and maintain the world you live in. 85% of children
            don't know what they do. The line is not safe until the system is tested.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={1.5}
            className="mt-8"
          >
            <div className="w-px h-16 mx-auto" style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)` }} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KEY FIGURES — THE NUMBERS
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>The Scale</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
              The Numbers That Define the Gap
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {KEY_FIGURES.map((fig, i) => (
              <motion.div
                key={fig.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="text-center p-4 sm:p-6"
                style={{ border: `1px solid ${GOLD}33`, background: `${NAVY}cc` }}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-2" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                  {fig.value}
                </p>
                <p className="text-xs sm:text-sm font-light tracking-wide mb-1" style={{ color: "#f0eadc" }}>
                  {fig.label}
                </p>
                <p className="text-[10px] tracking-wider" style={{ color: "#8a9cc0" }}>
                  {fig.source}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE PROBLEM — WHY CHILDREN SAY NO
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #0f2240 100%)` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>The Problem</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-6" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
              Why Children Say No
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
              <p className="text-sm sm:text-base font-light leading-relaxed mb-6" style={{ color: "#c0b89a" }}>
                "Civil engineering" scares people. The phrase conjures hard hats, mud, and mathematics.
                But what engineers actually do is <span style={{ color: GOLD }}>build</span>. Building is what
                every child does with LEGO, jigsaws, pictures, and games. It is the natural state. We exist
                in it. We filter out the noise. We find solutions to problems. That is the mode — morally
                neutral, universally understood.
              </p>
              <p className="text-sm sm:text-base font-light leading-relaxed mb-6" style={{ color: "#c0b89a" }}>
                The problem is not that children dislike building. The problem is that nobody tells them
                the world they live in — every road, every bridge, every pipe, every wire — was built by
                someone who started exactly where they are. 85% of children reject engineering as a career
                because they have never been shown what it actually is.
              </p>
              <p className="text-sm sm:text-base font-light leading-relaxed mb-6" style={{ color: "#c0b89a" }}>
                55% of parents cannot confidently advise their children about engineering careers. 70% of
                young people say school never connected what they learned to the built environment around them.
                The pipeline is broken at the source.
              </p>
              <p className="text-xs tracking-wider italic mt-4" style={{ color: "#8a9cc0" }}>
                Sources: EngineeringUK (2025), ASQ/Harris Interactive, IET Skills Survey
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.5}>
              <img
                src={EDUCATION_TIERS}
                alt="Education, Edutainment & Procurement — Three-tier delivery model"
                className="w-full object-contain cursor-pointer"
                onClick={() => setLightbox({ src: EDUCATION_TIERS, alt: "Education Tiers" })}
              />
              <p className="text-[10px] tracking-wider text-center mt-3" style={{ color: "#8a9cc0" }}>
                Education · Edutainment · Procurement — The three-tier delivery model
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BUILDING NOT CIVIL ENGINEERING
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>The Reframe</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-6" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
              Building, Not Civil Engineering
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
              <img
                src={IGO_GHOST}
                alt="iGO — Infrastructure Ghost Odyssey"
                className="w-full object-contain cursor-pointer"
                onClick={() => setLightbox({ src: IGO_GHOST, alt: "iGO Platform" })}
              />
              <p className="text-[10px] tracking-wider text-center mt-3" style={{ color: "#8a9cc0" }}>
                iGO — Infrastructure Ghost Odyssey — The discovery platform
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.5}>
              <p className="text-sm sm:text-base font-light leading-relaxed mb-6" style={{ color: "#c0b89a" }}>
                Every child builds. LEGO, jigsaws, sandcastles, Minecraft. The instinct is universal.
                iAAi does not teach "civil engineering" — it teaches <span style={{ color: GOLD }}>building</span>.
                The same activity, the same instinct, the same satisfaction. The child does not know they
                are being trained. The parent knows exactly what they are getting.
              </p>
              <p className="text-sm sm:text-base font-light leading-relaxed mb-6" style={{ color: "#c0b89a" }}>
                The parent pitch is simple: <span style={{ color: GOLD }}>parents should believe the engineer</span>.
                Engineers are morally neutral problem solvers. They exist in a natural state — filter out the
                noise, only solutions to problems. That is the mode. When an engineer says "this is how the
                world works," the parent can trust that statement because it is tested, verified, and built
                on 12,000 years of evidence.
              </p>
              <p className="text-sm sm:text-base font-light leading-relaxed mb-6" style={{ color: "#c0b89a" }}>
                For early ages, this is a civilisational piece. It leads to the profession for those who
                choose it. But the literacy — understanding what infrastructure is, how it works, why it
                matters — that belongs to everyone. The built environment is the one universal constant.
                Every human being on Earth lives within it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE ECONOMICS — CAPEX, OPEX, LIFECYCLE
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #0f2240 100%)` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>The Economics</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-6" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
              Cradle to Grave — The Lifecycle Argument
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "CAPEX — Build It",
                value: "$3.7T/year",
                desc: "Global construction output. The 20–40% of lifecycle cost that creates the asset. Design, procurement, construction, commissioning.",
                source: "Oxford Economics 2024",
              },
              {
                title: "OPEX — Keep It Alive",
                value: "60–80%",
                desc: "Of total lifecycle cost is operations and maintenance. Every building, road, pipe, and wire needs people running it for decades.",
                source: "Industry consensus / RICS",
              },
              {
                title: "Deferred Maintenance",
                value: "$1–3T/year",
                desc: "The cost of not maintaining. Emissions equivalent to China's entire output. The WEF calls it the $3 trillion maintenance gap.",
                source: "WEF April 2026",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.2}
                className="p-6"
                style={{ border: `1px solid ${GOLD}33`, background: `${NAVY}cc` }}
              >
                <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                  {card.title}
                </p>
                <p className="text-2xl sm:text-3xl font-light mb-3" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
                  {card.value}
                </p>
                <p className="text-sm font-light leading-relaxed mb-3" style={{ color: "#c0b89a" }}>
                  {card.desc}
                </p>
                <p className="text-[10px] tracking-wider" style={{ color: "#8a9cc0" }}>
                  {card.source}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.8} className="text-center">
            <p className="text-sm sm:text-base font-light leading-relaxed max-w-3xl mx-auto" style={{ color: "#c0b89a" }}>
              The method is cradle to grave. <span style={{ color: GOLD }}>Completion is what it's all about</span> — not getting
              stuck, closing out problems with innovation and solutions. The penalties for deferring action are heavy,
              and so the motivation to keep the cycle running smoothly makes the system self-correct. Every dollar
              invested in infrastructure generates $3.70 in economic returns over 20 years. The system works when
              operated professionally with skilled input. The line is not safe until the system is tested.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE PIPELINE — 12 MODES, AGE 8 TO SCHOLAR
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>The Pipeline</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-4" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
              12 Modes — Age 8 to Scholar
            </h2>
            <p className="text-sm font-light max-w-2xl mx-auto" style={{ color: "#8a9cc0" }}>
              One continuous architecture. The content never changes — the wrapper scales.
              Same 60 Dearden Field nodes from Relay Spinner to Scholar.
            </p>
          </motion.div>

          {/* Pipeline image */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3} className="mb-10">
            <img
              src={PIPELINE_IMG}
              alt="Complete Pipeline — Age 8 to Scholar"
              className="w-full max-w-4xl mx-auto object-contain cursor-pointer"
              onClick={() => setLightbox({ src: PIPELINE_IMG, alt: "Complete Pipeline" })}
            />
          </motion.div>

          {/* Pipeline table */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.5}>
            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <thead>
                  <tr>
                    {["Mode", "Name", "Age", "Episode", "Description"].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-3 text-xs tracking-[0.2em] uppercase font-light"
                        style={{ color: GOLD, borderBottom: `1px solid ${GOLD}44`, fontFamily: "var(--font-display)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PIPELINE.map((row) => (
                    <tr key={row.mode}>
                      <td className="px-3 py-3 text-sm font-light" style={{ color: GOLD, borderBottom: `1px solid ${GOLD}15` }}>
                        {row.mode}
                      </td>
                      <td className="px-3 py-3 text-sm font-light" style={{ color: "#f0eadc", borderBottom: `1px solid ${GOLD}15` }}>
                        {row.name}
                      </td>
                      <td className="px-3 py-3 text-sm font-light" style={{ color: "#8a9cc0", borderBottom: `1px solid ${GOLD}15` }}>
                        {row.age}
                      </td>
                      <td className="px-3 py-3 text-sm font-light" style={{ color: "#8a9cc0", borderBottom: `1px solid ${GOLD}15` }}>
                        {row.episode}
                      </td>
                      <td className="px-3 py-3 text-sm font-light" style={{ color: "#c0b89a", borderBottom: `1px solid ${GOLD}15` }}>
                        {row.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TARGET MARKETS — WHO BUYS IN
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #0f2240 100%)` }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>The Markets</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-4" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
              Six Segments — One Content Base
            </h2>
            <p className="text-sm font-light max-w-2xl mx-auto" style={{ color: "#8a9cc0" }}>
              The same 60-node Dearden Field serves every market. Only the wrapper and the commercial model change.
              That is the scalability argument.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MARKETS.map((m, i) => (
              <motion.div
                key={m.segment}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="p-5"
                style={{ border: `1px solid ${GOLD}33`, background: `${NAVY}cc` }}
              >
                <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                  {m.segment}
                </p>
                <p className="text-lg font-light mb-2" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
                  {m.size}
                </p>
                <p className="text-xs font-light mb-3" style={{ color: "#8a9cc0" }}>
                  {m.mode}
                </p>
                <p className="text-sm font-light leading-relaxed mb-3" style={{ color: "#c0b89a" }}>
                  {m.entry}
                </p>
                <p className="text-xs italic font-light" style={{ color: GOLD }}>
                  "{m.hook}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE PARENT PITCH — TRUST THE ENGINEER
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>The Parent Pitch</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-6" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
              Trust the Engineer
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
              <div className="p-6 mb-6" style={{ border: `1px solid ${GOLD}44`, background: `${NAVY}cc` }}>
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                  What Your Child Gets
                </p>
                {[
                  "Infrastructure literacy — understanding the world they live in",
                  "Problem-solving skills tested against real systems",
                  "A progression path from age 8 to professional recognition",
                  "Physical collaterals — iCards, dice, spinning toys, campaign journals",
                  "DAVID AI co-pilot — personalised guidance through the Dearden Field",
                  "ISI scoring — measurable, comparable, meaningful assessment",
                ].map((item, i) => (
                  <p key={i} className="text-sm font-light leading-relaxed mb-2 flex items-start gap-2" style={{ color: "#c0b89a" }}>
                    <span style={{ color: GOLD }}>→</span> {item}
                  </p>
                ))}
              </div>

              <div className="p-6" style={{ border: `1px solid ${GOLD}44`, background: `${NAVY}cc` }}>
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                  Why It Matters
                </p>
                <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#c0b89a" }}>
                  The Heckman Curve shows that every dollar invested in early childhood education
                  returns 7–13% annually — the highest ROI of any social investment. The earlier
                  you start, the greater the compound return. iAAi starts at age 8, right in the
                  sweet spot where the curve is steepest.
                </p>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#c0b89a" }}>
                  Engineering graduates earn £5,000–£10,000+ more than the national average starting
                  salary. Over a career, the premium compounds. But more than money — your child
                  learns to see the world as it actually is: built, maintained, and improvable.
                </p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.5}>
              <img
                src={IGO_UMBRELLA}
                alt="iGO Umbrella — The complete system"
                className="w-full object-contain cursor-pointer mb-6"
                onClick={() => setLightbox({ src: IGO_UMBRELLA, alt: "iGO Umbrella" })}
              />
              <img
                src={MASTERY_TIERS}
                alt="Three Tiers of Mastery"
                className="w-full object-contain cursor-pointer"
                onClick={() => setLightbox({ src: MASTERY_TIERS, alt: "Three Tiers of Mastery" })}
              />
              <p className="text-[10px] tracking-wider text-center mt-3" style={{ color: "#8a9cc0" }}>
                iGO Umbrella System · Three Tiers of Mastery
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE PLATFORM — NOT A MOOC
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #0f2240 100%)` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>The Platform</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-6" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
              iGO Is Not a MOOC
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
              <div className="mb-6">
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                  What MOOCs Do
                </p>
                {[
                  "Passive content delivery — watch, answer, certificate",
                  "3–15% completion rates",
                  "Courses end — no continuity",
                  "Screen-only — no physical dimension",
                  "Test recall, not understanding",
                ].map((item, i) => (
                  <p key={i} className="text-sm font-light leading-relaxed mb-2 flex items-start gap-2" style={{ color: "#8a9cc0" }}>
                    <span style={{ color: "#666" }}>✕</span> {item}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.5}>
              <div className="mb-6">
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                  What iGO Does
                </p>
                {[
                  "Active discovery — game mechanics, dice, iCards, AR overlays",
                  "Persistent progression — the same player from age 8 to 75+",
                  "Scored against reality — ISI tests real infrastructure survival",
                  "Physical collaterals — spinning toys, campaign journals, game mats",
                  "DAVID AI co-pilot — personalised guidance, not passive lectures",
                  "Online platform — anyone, anywhere, any time. Universal access.",
                ].map((item, i) => (
                  <p key={i} className="text-sm font-light leading-relaxed mb-2 flex items-start gap-2" style={{ color: "#c0b89a" }}>
                    <span style={{ color: GOLD }}>→</span> {item}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.8} className="text-center mt-8">
            <p className="text-base font-light italic max-w-3xl mx-auto" style={{ color: "#c0b89a", fontFamily: "var(--font-display)" }}>
              "iGO is an online infrastructure discovery platform with game mechanics, physical collaterals,
              and lifelong professional progression. It sits in the same commercial space as Duolingo — persistent,
              gamified, mobile-first — but for infrastructure literacy rather than language."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE CIVILISATIONAL ARGUMENT
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>The Argument</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-8" style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}>
              Infrastructure Literacy as a Democratic Precondition
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
            <p className="text-sm sm:text-base font-light leading-relaxed mb-6" style={{ color: "#c0b89a" }}>
              Technology, science, and engineering share the same complexity. But the core rules and methods
              hold out. The physics that governed Roman aqueducts still governs fibre optic networks. Fire to
              Human Nodes — the same principles of load, flow, connection, and redundancy persist across 12,000
              years and 500 generations.
            </p>
            <p className="text-sm sm:text-base font-light leading-relaxed mb-6" style={{ color: "#c0b89a" }}>
              The built environment is the one universal constant. Every human being on Earth lives within it.
              But how many understand it? Systems thinking — sustainable, cost-efficient, planet-friendly — is
              not ideology. It is what happens when you apply engineering discipline to the lifecycle. The system
              self-corrects because the penalties for deferral are catastrophic.
            </p>
            <p className="text-sm sm:text-base font-light leading-relaxed mb-8" style={{ color: "#c0b89a" }}>
              Citizens who cannot evaluate infrastructure claims cannot participate meaningfully in decisions
              about their own built environment. Infrastructure literacy is not a luxury. It is a precondition
              for informed democracy. iAAi provides the tool, the toolkit, and the guide.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.6}>
            <div className="w-20 h-px mx-auto mb-8" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
            <p className="text-lg font-light italic tracking-wide" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
              "The line is not safe until the system is tested."
            </p>
            <p className="text-xs tracking-[0.2em] uppercase mt-3" style={{ color: "#8a9cc0" }}>
              — Engineering Axiom
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — NAVIGATION LINKS
      ═══════════════════════════════════════════ */}
      <footer className="py-16 text-center" style={{ borderTop: `1px solid ${GOLD}33` }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { href: "/", label: "Home" },
              { href: "/thesis", label: "The Thesis" },
              { href: "/igo", label: "iGO" },
              { href: "/vault", label: "The Vault" },
              { href: "/titans", label: "Titans" },
              { href: "/scholar-8", label: "Scholar 8" },
              { href: "/generation-wave", label: "40-Gen Wave" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-xs tracking-[0.15em] uppercase font-light cursor-pointer" style={{ color: "#8a9cc0" }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-sm tracking-[0.15em] font-light" style={{ color: "#8a9cc0", fontFamily: "var(--font-display)" }}>
            iAAi — Infrastructure Academy of Applied Intelligence
          </p>
          <p className="text-xs tracking-widest uppercase mt-2" style={{ color: "#4a5a7a", fontFamily: "var(--font-display)" }}>
            Per Arya Ad Astra
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </div>
  );
}
