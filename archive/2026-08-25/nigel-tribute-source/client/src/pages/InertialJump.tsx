/**
 * Inertial Jump — The Spark of Consciousness
 * Sensory meditation at the beach ignites neural firing — bidirectional rails
 * not confined by c, supersymmetrically constructed and de/reconstructed instantly.
 * Colour: dark canvas, electric accents, warm sand text.
 * Typography: Cormorant Garamond for display, Source Sans 3 for body.
 */
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";

const IMG_8580 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8580_099720bb.jpeg";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/quotient-bg-ZKNtEotrSjCkrisL7AVYWD.webp";

export default function InertialJump() {
  const t = useTranslation();

  const principles = [
    {
      symbol: "⚡",
      title: t("inertial.title"),
      subtitle: t("inertial.subtitle"),
      text: t("inertial.text"),
    },
    {
      symbol: "∥",
      title: t("inertial.parallel"),
      subtitle: t("inertial.parallelSub"),
      text: t("inertial.parallelText"),
    },
    {
      symbol: "⇌",
      title: t("inertial.bidirectional"),
      subtitle: t("inertial.bidirectionalSub"),
      text: t("inertial.bidirectionalText"),
    },
    {
      symbol: "◇",
      title: t("inertial.supersymmetric"),
      subtitle: t("inertial.supersymmetricSub"),
      text: t("inertial.supersymmetricText"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero — Beach Meditation */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            filter: "saturate(0.5) brightness(0.25)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.005_240/0.6)] via-transparent to-[oklch(0.10_0.005_240)]" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-sm text-[oklch(0.55_0.06_200)] tracking-[0.3em] uppercase font-light mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sensory Meditation & Neural Architecture
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.12em] uppercase text-[oklch(0.92_0.008_75)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("inertial.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mt-8 text-xl md:text-2xl font-light italic text-[oklch(0.65_0.02_75)] tracking-wide max-w-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Zero latency. Parallel rails. Supersymmetric.
            Forward and backward — unconfined by c.
          </motion.p>
        </div>
      </section>

      {/* The Photo — Beach Meditation */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            <div className="overflow-hidden shadow-2xl">
              <img
                src={IMG_8580}
                alt="Nigel and his wife meditating at the beach — taking in the sensory effects"
                className="w-full h-auto filter saturate-[0.9] contrast-[1.05]"
              />
            </div>
            <p
              className="mt-6 text-center text-lg italic text-[oklch(0.55_0.04_200)] font-light tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Taking in the sensory effects — the beach as ignition point
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Core Metaphor */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.55_0.06_200)] to-transparent mx-auto mb-10" />
            <p
              className="text-base md:text-lg text-[oklch(0.65_0.02_75)] font-light leading-[2]"
            >
              {t("inertial.text")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Four Principles */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center mb-20"
          >
            <p
              className="text-sm text-[oklch(0.55_0.06_200)] tracking-[0.3em] uppercase font-light"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Four Properties of the System
            </p>
          </motion.div>

          <div className="space-y-24 md:space-y-32">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative"
              >
                {/* Number line */}
                <div className="flex items-start gap-8 md:gap-14">
                  {/* Symbol column */}
                  <div className="flex-shrink-0 w-20 md:w-28 text-center pt-2">
                    <span
                      className="text-5xl md:text-6xl text-[oklch(0.55_0.06_200)] block mb-3"
                    >
                      {p.symbol}
                    </span>
                    <span
                      className="text-xs text-[oklch(0.40_0.03_240)] tracking-[0.2em] uppercase font-light"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content column */}
                  <div className="flex-1">
                    <p
                      className="text-xs text-[oklch(0.55_0.06_200)] tracking-[0.25em] uppercase font-light mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.subtitle}
                    </p>
                    <h3
                      className="text-2xl md:text-3xl font-light tracking-[0.08em] text-[oklch(0.88_0.008_75)] mb-5"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-base text-[oklch(0.60_0.02_75)] font-light leading-[1.9]">
                      {p.text}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                {i < principles.length - 1 && (
                  <div className="mt-16 md:mt-20 w-full h-px bg-gradient-to-r from-transparent via-[oklch(0.20_0.01_240)] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Diagram — Visual Representation */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[oklch(0.14_0.04_250)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          >
            <p
              className="text-sm text-[oklch(0.55_0.06_200)] tracking-[0.3em] uppercase font-light mb-12"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Architecture
            </p>

            {/* ASCII-style diagram */}
            <div className="font-mono text-sm md:text-base text-[oklch(0.55_0.06_200)] leading-[2.2] mb-12 tracking-wider">
              <p className="text-[oklch(0.78_0.04_75)]">{t("inertialjump.sensoryInputBeach")}</p>
              <p>│</p>
              <p>▼</p>
              <p className="text-[oklch(0.78_0.04_75)]">{t("inertialjump.meditationCoilCharge")}</p>
              <p>│</p>
              <p className="text-[oklch(0.40_0.15_20)] text-lg">⚡ INERTIAL JUMP ⚡</p>
              <p>│</p>
              <p>┌──────────┼──────────┐</p>
              <p>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</p>
              <p>
                <span className="text-[oklch(0.78_0.04_75)]">{t("inertialjump.rail")}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-[oklch(0.78_0.04_75)]">{t("inertialjump.rail2")}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-[oklch(0.78_0.04_75)]">{t("inertialjump.rail3")}</span>
              </p>
              <p className="text-[oklch(0.45_0.03_240)]">(bidirectional, not confined by c)</p>
              <p>│</p>
              <p>▼</p>
              <p className="text-[oklch(0.78_0.04_75)]">{t("inertialjump.concurrentArrival")}</p>
              <p className="text-[oklch(0.45_0.03_240)]">(zero latency — all signals at t=0)</p>
              <p>│</p>
              <p>▼</p>
              <p className="text-[oklch(0.40_0.15_20)] text-lg">◇ SUPERSYMMETRIC ◇</p>
              <p className="text-[oklch(0.45_0.03_240)]">(de/reconstructed instantly)</p>
            </div>

            <div className="max-w-xl mx-auto border-t border-b border-[oklch(0.25_0.01_240)] py-10">
              <p
                className="text-lg md:text-xl font-light italic text-[oklch(0.60_0.025_75)] leading-[2] tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The system does not travel through time — it exists across it.
                Construction and deconstruction are not sequential events but
                simultaneous states. The supersymmetric mind does not choose
                between building and unbuilding; it holds both as one.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Connection to HQ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className="text-sm text-[oklch(0.55_0.06_200)] tracking-[0.3em] uppercase font-light mb-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Connection
            </p>

            <p className="text-base md:text-lg text-[oklch(0.65_0.02_75)] font-light leading-[2] mb-10">
              The Inertial Jump is the mechanism by which
              <span className="text-[oklch(0.78_0.04_75)]"> HQ </span>
              activates. IQ, EQ, and CQ are the inputs — the fuel, the spark, and the engine.
              But the Inertial Jump is the ignition event itself: the moment all three
              fire simultaneously on parallel, bidirectional rails, and the Haptic Quotient
              comes alive. Not gradually. Not partially. All at once. Supersymmetrically.
            </p>

            <p
              className="text-3xl md:text-4xl font-light tracking-[0.05em] text-[oklch(0.85_0.008_75)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[oklch(0.55_0.06_200)]">IQ</span>{" "}
              <span className="text-[oklch(0.55_0.06_200)]">⊗</span>{" "}
              <span className="text-[oklch(0.40_0.15_20)]">EQ</span>{" "}
              <span className="text-[oklch(0.55_0.06_200)]">⊗</span>{" "}
              <span className="text-[oklch(0.78_0.04_75)]">CQ</span>{" "}
              <span className="text-[oklch(0.55_0.06_200)]">→</span>{" "}
              <span className="text-[oklch(0.40_0.15_20)]">⚡</span>{" "}
              <span className="text-[oklch(0.55_0.06_200)]">→</span>{" "}
              <span className="text-[oklch(0.78_0.04_75)]">HQ</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[oklch(0.20_0.008_240)]">
        <p
          className="text-sm text-[oklch(0.35_0.02_240)] tracking-[0.15em] font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Zero latency — parallel rails — supersymmetric
        </p>
      </footer>
    </div>
  );
}
