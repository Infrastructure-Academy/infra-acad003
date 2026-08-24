/**
 * D52 Gallery — The Dearden Field Card Deck
 * Gallery page for the D52 complete deck system.
 * 4 suits × 13 cards = 52 — fear × fear = the game
 * Design: Dark void, gold accents, Cormorant Garamond display
 */
import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";
import Lightbox from "@/components/Lightbox";

// D52 Card Assets
const D52_9CLUBS_MATRIX = "/manus-storage/ypKPaBaoViqbKwSW_a7c91a1a.PNG";

// COUNTER and HICE for context
const COUNTER_FULL = "/manus-storage/counter_full_page_59090666.png";
const COUNTER_CLEAN = "/manus-storage/counter_framework_cbf48d1b.png";
const HICE_SPECTRUM = "/manus-storage/hice_spectrum_chart_6fbd6b9c.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15 },
  }),
};

// D52 Deck Structure — 4 Suits
const SUITS = [
  {
    symbol: "♠",
    name: "Spades",
    theme: "INFRASTRUCTURE",
    desc: "The physical relays — from Fire to Human Nodes. Each card maps a civilisational building block.",
    color: "oklch(0.55 0.08 250)",
  },
  {
    symbol: "♥",
    name: "Hearts",
    theme: "CONSCIOUSNESS",
    desc: "The inner relays — emotional intelligence, embodied cognition, the HQ equation. Heart is the engine.",
    color: "oklch(0.65 0.15 25)",
  },
  {
    symbol: "♦",
    name: "Diamonds",
    theme: "VALUE",
    desc: "The economic relays — $ignificance, CAPEX vs OPEX, the 4Cs resistance. Diamond cuts through noise.",
    color: "oklch(0.72 0.12 75)",
  },
  {
    symbol: "♣",
    name: "Clubs",
    theme: "KNOWLEDGE",
    desc: "The intellectual relays — ISI equations, HICE spectrum, ICE Matrix. Club is the tool of the mind.",
    color: "oklch(0.60 0.12 145)",
  },
];

// Featured Cards (currently available)
const FEATURED_CARDS = [
  {
    id: "9C",
    suit: "♣",
    number: "9",
    title: "THE MATRIX",
    subtitle: "Innate × Created × Embodied = Holistic",
    image: D52_9CLUBS_MATRIX,
    desc: "The ICE Matrix equation rendered as sacred geometry. Metatron's Cube with I, C, E axes converging to H. The core mathematical relationship of The Dearden Field.",
    page: 54,
  },
];

export default function D52Gallery() {
  const t = useTranslation();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.04_250)] via-[oklch(0.12_0.03_250)] to-[oklch(0.14_0.04_250)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, oklch(0.72 0.12 75) 0px, transparent 1px, transparent 60px),
                           repeating-linear-gradient(90deg, oklch(0.72 0.12 75) 0px, transparent 1px, transparent 60px)`,
        }} />

        <div className="relative z-10 text-center px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0}>
            <p
              className="text-sm text-[oklch(0.72_0.12_75)] tracking-[0.4em] uppercase font-light mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Dearden Field
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0.5}>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.12em] uppercase text-[oklch(0.92_0.008_75)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              D52
            </h1>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={1}>
            <p
              className="text-lg text-[oklch(0.55_0.08_75)] tracking-[0.1em] font-light max-w-lg mx-auto"
              style={{ fontFamily: "var(--font-display)" }}
            >
              4 × 13 = 52 — fear × fear = the game
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={1.5}>
            <p className="text-sm text-[oklch(0.45_0.03_200)] mt-6 max-w-2xl mx-auto leading-relaxed">
              The D52 Complete Deck maps the entire iAAi framework onto a standard 52-card playing deck.
              Each suit represents a domain of civilisational intelligence. Each card encodes a specific
              concept, equation, or relay from the Principia Tectonica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Four Suits Overview */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2
              className="text-2xl font-light text-[oklch(0.72_0.12_75)] tracking-[0.15em] uppercase text-center mb-12"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Four Suits — Four Domains
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUITS.map((suit, i) => (
              <motion.div
                key={suit.symbol}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i * 0.2}
                className="border border-[oklch(0.25_0.04_250)] p-6 text-center"
              >
                <p className="text-4xl mb-3" style={{ color: suit.color }}>{suit.symbol}</p>
                <p
                  className="text-sm tracking-[0.3em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-display)", color: suit.color }}
                >
                  {suit.name}
                </p>
                <p
                  className="text-xs text-[oklch(0.72_0.12_75)] tracking-[0.2em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {suit.theme}
                </p>
                <p className="text-xs text-[oklch(0.50_0.03_200)] leading-relaxed">
                  {suit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Card: 9♣ The Matrix */}
      <section className="py-16 px-6 border-t border-[oklch(0.20_0.04_250)]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2
              className="text-2xl font-light text-[oklch(0.72_0.12_75)] tracking-[0.15em] uppercase text-center mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured Card
            </h2>
            <p className="text-center text-xs text-[oklch(0.45_0.03_200)] tracking-[0.2em] uppercase mb-12" style={{ fontFamily: "var(--font-display)" }}>
              From the D52 Complete Deck — March 2026
            </p>
          </motion.div>

          {FEATURED_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0.3}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Card Image */}
              <div className="md:w-1/2">
                <div
                  className="cursor-pointer border border-[oklch(0.25_0.06_65/0.4)] hover:border-[oklch(0.55_0.12_65/0.6)] transition-colors duration-500"
                  onClick={() => setLightboxSrc(card.image)}
                >
                  <img
                    src={card.image}
                    alt={`${card.number}${card.suit} ${card.title}`}
                    className="w-full object-contain"
                  />
                </div>
              </div>

              {/* Card Details */}
              <div className="md:w-1/2">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-5xl text-[oklch(0.60_0.12_145)]" style={{ fontFamily: "var(--font-display)" }}>
                    {card.number}{card.suit}
                  </span>
                  <h3
                    className="text-2xl font-light text-[oklch(0.90_0.008_75)] tracking-[0.1em] uppercase"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {card.title}
                  </h3>
                </div>

                <p
                  className="text-sm text-[oklch(0.72_0.12_75)] italic tracking-wide mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {card.subtitle}
                </p>

                <p className="text-sm text-[oklch(0.55_0.03_200)] leading-relaxed mb-6">
                  {card.desc}
                </p>

                <div className="border-t border-[oklch(0.20_0.04_250)] pt-4">
                  <p className="text-xs text-[oklch(0.40_0.03_200)] tracking-[0.15em]">
                    D52 Complete Deck · Page {card.page} · The Dearden Field · March 2026
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ICE Matrix Equation Context */}
      <section className="py-16 px-6 border-t border-[oklch(0.20_0.04_250)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2
              className="text-2xl font-light text-[oklch(0.72_0.12_75)] tracking-[0.15em] uppercase mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The ICE Matrix
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.3}>
            <div className="inline-block border border-[oklch(0.30_0.06_65/0.4)] px-12 py-8 mb-8">
              <p
                className="text-3xl sm:text-4xl font-light text-[oklch(0.92_0.008_75)] tracking-[0.08em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                H = I ⊗ C ⊗ E
              </p>
              <p className="text-xs text-[oklch(0.55_0.06_75)] mt-3 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                Holistic = Innate × Created × Embodied
              </p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="border border-[oklch(0.25_0.04_250)] p-5">
                <p className="text-lg text-[oklch(0.72_0.12_75)] mb-2" style={{ fontFamily: "var(--font-display)" }}>I</p>
                <p className="text-sm text-[oklch(0.90_0.008_75)] font-light tracking-wide uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>Innate</p>
                <p className="text-xs text-[oklch(0.50_0.03_200)] leading-relaxed">
                  The intelligence you are born with. IQ — cognitive capacity, pattern recognition, raw processing power.
                </p>
              </div>
              <div className="border border-[oklch(0.25_0.04_250)] p-5">
                <p className="text-lg text-[oklch(0.72_0.12_75)] mb-2" style={{ fontFamily: "var(--font-display)" }}>C</p>
                <p className="text-sm text-[oklch(0.90_0.008_75)] font-light tracking-wide uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>Created</p>
                <p className="text-xs text-[oklch(0.50_0.03_200)] leading-relaxed">
                  The intelligence you build. EQ — emotional intelligence, social navigation, empathetic resonance.
                </p>
              </div>
              <div className="border border-[oklch(0.25_0.04_250)] p-5">
                <p className="text-lg text-[oklch(0.72_0.12_75)] mb-2" style={{ fontFamily: "var(--font-display)" }}>E</p>
                <p className="text-sm text-[oklch(0.90_0.008_75)] font-light tracking-wide uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>Embodied</p>
                <p className="text-xs text-[oklch(0.50_0.03_200)] leading-relaxed">
                  The intelligence you extend. CQ — computational/tool quotient, AI augmentation, the Techton multiplier.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Framework Images */}
      <section className="py-16 px-6 border-t border-[oklch(0.20_0.04_250)]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2
              className="text-2xl font-light text-[oklch(0.72_0.12_75)] tracking-[0.15em] uppercase text-center mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Framework Context
            </h2>
            <p className="text-center text-xs text-[oklch(0.45_0.03_200)] tracking-[0.2em] uppercase mb-12" style={{ fontFamily: "var(--font-display)" }}>
              COUNTERFORCE · HICE Spectrum · The Complete System
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: COUNTER_FULL, alt: "COUNTERFORCE — Parts, Measures & Balance", label: "COUNTERFORCE Full Page" },
              { src: COUNTER_CLEAN, alt: "COUNTERFORCE Framework Summary", label: "COUNTERFORCE Clean" },
              { src: HICE_SPECTRUM, alt: "HICE Spectrum — Kingdom to Dyad", label: "HICE Spectrum" },
            ].map((img, i) => (
              <motion.div
                key={img.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i * 0.2}
                className="cursor-pointer"
                onClick={() => setLightboxSrc(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-contain border border-[oklch(0.25_0.06_65/0.4)] hover:border-[oklch(0.55_0.12_65/0.6)] transition-colors duration-500"
                />
                <p className="text-center text-xs text-[oklch(0.50_0.06_65)] mt-2 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                  {img.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[oklch(0.25_0.06_75)]">
        <p
          className="text-sm text-[oklch(0.40_0.02_240)] tracking-[0.15em] font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Dearden Field · D52 Complete Deck · March 2026
        </p>
        <p
          className="text-xs text-[oklch(0.30_0.02_240)] mt-2 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Per Arya Ad Astra
        </p>
      </footer>

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt="D52 Gallery Image" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
