/**
 * Game — TRE Gateway Page
 * The Reality Engine — Guided Learning Platform
 * Routes visitors from the Memorial site to the TRE Game on the Acad site.
 * Block 376 — Per Arya Ad Astra
 */
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";

const TRE_URL = "https://realityeng-epdhlkrn.manus.space/";
const ACAD_URL = "https://realityeng-epdhlkrn.manus.space";

const TETRAHEDRAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/tetrahedral-observer-3sites_7fe85193.jpeg";
const ARCH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/governance-architecture_87b94661.jpeg";
const IAAI_CHIP = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iaai-chip-core_74003507.jpeg";

const GAME_FEATURES = [
  {
    icon: "🎴",
    title: "D52 Card System",
    desc: "52 challenge cards across 12 civilizational relays — Fire to Programmable Humans.",
  },
  {
    icon: "🧬",
    title: "60 Matrix Nodes",
    desc: "Navigate the HyperGrid — 12 relays × 5 dimensions of infrastructure consciousness.",
  },
  {
    icon: "🎯",
    title: "6 Ability Scores",
    desc: "Senser, Intuitive, Thinker, Feeler, Strategist, Builder — discover your civilizational temperament.",
  },
  {
    icon: "🎮",
    title: "3 Play Modes",
    desc: "Freeform exploration, Semi-Supervised with AI DM 'David', or Supervised professional assessment.",
  },
];

export default function Game() {
  const t = useTranslation();
  return (
    <div className="min-h-screen bg-[#0b1a33]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-screen overflow-hidden pt-28 sm:pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IAAI_CHIP})`,
            filter: "saturate(0.3) brightness(0.15)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a33cc] via-[#0b1a3355] to-[#0b1a33]" />

        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center min-h-[55vh] sm:min-h-[70vh]">
          <p
            className="text-sm tracking-[0.4em] uppercase font-light mb-4"
            style={{ color: "#d4a843", fontFamily: "var(--font-display)" }}
          >
            The Reality Engine
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.08em] uppercase mb-4"
            style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
          >
            TRE Game
          </h1>

          <p
            className="text-lg md:text-xl font-light tracking-[0.08em] mb-2 max-w-2xl"
            style={{ color: "#8a9cc0", fontFamily: "var(--font-display)" }}
          >
            Guided Learning Platform — Begin Your Odyssey
          </p>

          <p
            className="text-sm font-light tracking-[0.12em] mb-8 max-w-xl"
            style={{ color: "#6b7fa0" }}
          >
            12 relays. 91+ challenges. D52 card system. 6 ability scores.
            <br />
            Free to play. Built on real infrastructure data.
          </p>

          {/* PLAY NOW — Primary CTA */}
          <a
            href={TRE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg tracking-[0.2em] uppercase font-bold transition-all duration-500 hover:scale-105"
            style={{
              fontFamily: "var(--font-display)",
              color: "#0b1a33",
              background: "linear-gradient(135deg, #d4a843 0%, #f0d68a 50%, #d4a843 100%)",
              boxShadow: "0 0 30px rgba(212,168,67,0.4), 0 0 60px rgba(212,168,67,0.15)",
              border: "2px solid #d4a843",
            }}
          >
            <span className="text-2xl">▶</span>
            Play If You Dare
            <span className="text-xs font-normal tracking-wider opacity-70">{t("game.betaPoc")}</span>
          </a>

          <p className="mt-4 text-xs tracking-[0.15em] uppercase" style={{ color: "#5a6d8a" }}>
            Opens on The Reality Engine — realityeng-epdhlkrn.manus.space
          </p>

          {/* Scroll indicator */}
          <div className="mt-16">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#d4a843] to-transparent mx-auto" />
          </div>
        </div>
      </section>

      {/* Game Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#d4a843] to-transparent mx-auto mb-6" />
            <h2
              className="text-2xl sm:text-3xl font-light tracking-[0.1em] uppercase mb-4"
              style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
            >
              What Awaits
            </h2>
            <p className="text-sm font-light" style={{ color: "#6b7fa0" }}>
              Infrastructure consciousness — gamified, measured, proven
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {GAME_FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-6 border transition-colors duration-500 hover:border-[#d4a843]"
                style={{ borderColor: "#1a2d4d", background: "#0d1f38" }}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3
                  className="text-base font-bold tracking-[0.1em] uppercase mb-2"
                  style={{ color: "#d4a843", fontFamily: "var(--font-display)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#8a9cc0" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture — The Tetrahedral Observer */}
      <section className="py-20 px-6" style={{ background: "#091428" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-light tracking-[0.1em] uppercase mb-4"
              style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
            >
              The Tetrahedral Observer
            </h2>
            <p className="text-sm font-light" style={{ color: "#6b7fa0" }}>
              Three operational bridges — one common database — single source of truth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <img
                src={TETRAHEDRAL_IMG}
                alt="The Tetrahedral Observer — Three Operational Bridges"
                className="w-full object-contain border border-[#1a2d4d]"
                style={{ maxHeight: "500px" }}
              />
            </div>
            <div>
              <img
                src={ARCH_IMG}
                alt="Governance Architecture — Data Coordination Protocol"
                className="w-full object-contain border border-[#1a2d4d]"
                style={{ maxHeight: "500px" }}
              />
            </div>
          </div>

          {/* Three Sites */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <a
              href={ACAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 border border-[#1a2d4d] text-center hover:border-[#4ecdc4] transition-colors"
              style={{ background: "#0d1f38" }}
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#4ecdc4" }}>
                Master Controller
              </p>
              <h3
                className="text-lg font-bold tracking-[0.1em] uppercase mb-1"
                style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
              >
                Acad Site
              </h3>
              <p className="text-xs" style={{ color: "#6b7fa0" }}>
                infra-acad-kuqzaex2.manus.space
              </p>
              <p className="text-xs mt-2" style={{ color: "#8a9cc0" }}>
                40 tables · 1,565 rows · 200+ UV
              </p>
            </a>

            <div
              className="p-5 border border-[#d4a843] text-center"
              style={{ background: "#0d1f38" }}
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#d4a843" }}>
                You Are Here
              </p>
              <h3
                className="text-lg font-bold tracking-[0.1em] uppercase mb-1"
                style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
              >
                Memorial Site
              </h3>
              <p className="text-xs" style={{ color: "#6b7fa0" }}>
                nigelmemorial-ucmtq9dn.manus.space
              </p>
              <p className="text-xs mt-2" style={{ color: "#8a9cc0" }}>
                Thesis · Vault · Evidence · Governance
              </p>
            </div>

            <a
              href={TRE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 border border-[#1a2d4d] text-center hover:border-[#ff6b6b] transition-colors"
              style={{ background: "#0d1f38" }}
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#ff6b6b" }}>
                Game Engine
              </p>
              <h3
                className="text-lg font-bold tracking-[0.1em] uppercase mb-1"
                style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
              >
                TRE Game
              </h3>
              <p className="text-xs" style={{ color: "#6b7fa0" }}>
                realityeng-epdhlkrn.manus.space
              </p>
              <p className="text-xs mt-2" style={{ color: "#8a9cc0" }}>
                D52 · 60 nodes · 6 scores · 3 modes
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl sm:text-3xl font-light tracking-[0.1em] uppercase mb-8"
            style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
          >
            How to Play
          </h2>

          <div className="space-y-6 text-left">
            {[
              { step: "1", title: "Click Play", desc: "Opens the TRE Game on Infrastructure Academy. No account needed for Freeform mode." },
              { step: "2", title: "Choose Your Mode", desc: "Freeform (explore freely), Semi-Supervised (AI DM 'David' guides you), or Supervised (professional assessment)." },
              { step: "3", title: "Roll Your Abilities", desc: "D20 roll determines your starting ability scores. 3 re-rolls maximum — choose wisely." },
              { step: "4", title: "Navigate the Relays", desc: "12 civilizational relays from Fire to Programmable Humans. Each relay has challenge cards to complete." },
              { step: "5", title: "Earn & Level Up", desc: "Complete challenges, earn points, unlock new relays. Your progress saves automatically." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start">
                <div
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-lg font-bold"
                  style={{
                    color: "#0b1a33",
                    background: "#d4a843",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {s.step}
                </div>
                <div>
                  <h3
                    className="text-base font-bold tracking-[0.08em] uppercase mb-1"
                    style={{ color: "#d4a843", fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm font-light" style={{ color: "#8a9cc0" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second CTA */}
          <div className="mt-12">
            <a
              href={TRE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-base tracking-[0.15em] uppercase font-bold transition-all duration-500 hover:scale-105"
              style={{
                fontFamily: "var(--font-display)",
                color: "#0b1a33",
                background: "linear-gradient(135deg, #d4a843 0%, #f0d68a 50%, #d4a843 100%)",
                boxShadow: "0 0 20px rgba(212,168,67,0.3)",
                border: "2px solid #d4a843",
              }}
            >
              <span className="text-xl">▶</span>
              Begin Your Odyssey
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[#1a2d4d]">
        <p
          className="text-sm tracking-[0.15em] font-light"
          style={{ color: "#3d5070", fontFamily: "var(--font-display)" }}
        >
          iAAi — The Tesla Block | N + T = D — The Dearden Equation
        </p>
        <p
          className="text-xs mt-2 tracking-widest uppercase"
          style={{ color: "#2a3d5a", fontFamily: "var(--font-display)" }}
        >
          Per Arya Ad Astra
        </p>
      </footer>
    </div>
  );
}
