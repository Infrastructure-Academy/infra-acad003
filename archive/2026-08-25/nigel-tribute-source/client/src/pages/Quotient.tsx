/**
 * Quotient — Structural Clarity
 * The Equation page — IQ + EQ + CQ = HQ.
 * Colour: dark canvas, accent blue, warm sand text.
 * Typography: Cormorant Garamond for display, Source Sans 3 for body.
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";

const QUOTIENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/quotient-bg-ZKNtEotrSjCkrisL7AVYWD.webp";

export default function Quotient() {
  const t = useTranslation();
  const [, navigate] = useLocation();

  const quotients = [
    {
      symbol: "IQ",
      name: t("quotient.iq"),
      role: t("quotient.iqRole"),
      description: t("quotient.iqDesc"),
      color: "oklch(0.55 0.06 200)",
    },
    {
      symbol: "EQ",
      name: t("quotient.eq"),
      role: t("quotient.eqRole"),
      description: t("quotient.eqDesc"),
      color: "oklch(0.40 0.15 20)",
    },
    {
      symbol: "CQ",
      name: t("quotient.cq"),
      role: t("quotient.cqRole"),
      description: t("quotient.cqDesc"),
      color: "oklch(0.78 0.04 75)",
    },
  ];

  const tableRows = [
    { el: "IQ", role: t("quotient.input"), dim: t("quotient.theMind"), color: "oklch(0.55 0.06 200)", href: "/thesis" },
    { el: "EQ", role: t("quotient.input"), dim: t("quotient.theHeart"), color: "oklch(0.40 0.15 20)", href: "/inertial-jump" },
    { el: "CQ", role: t("quotient.input"), dim: t("quotient.theCreative"), color: "oklch(0.78 0.04 75)", href: "/tdf" },
    { el: "HQ", role: t("quotient.output"), dim: t("quotient.theWhole"), color: "oklch(0.78 0.04 75)", href: "/aim" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${QUOTIENT_BG})`,
            filter: "saturate(0.5) brightness(0.3)",
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
            {t("quotient.framework")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.08em] text-[oklch(0.92_0.008_75)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            IQ{" "}
            <span className="text-[oklch(0.55_0.06_200)]">⊗</span>{" "}
            EQ{" "}
            <span className="text-[oklch(0.55_0.06_200)]">⊗</span>{" "}
            CQ{" "}
            <span className="text-[oklch(0.55_0.06_200)]">=</span>{" "}
            <span className="text-[oklch(0.78_0.04_75)]">HQ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mt-8 text-xl md:text-2xl font-light italic text-[oklch(0.65_0.02_75)] tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("quotient.holisticQuotient")}
          </motion.p>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center"
          >
            <h2
              className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.008_75)] mb-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("quotient.question")}
            </h2>
            <p className="text-base md:text-lg text-[oklch(0.65_0.02_75)] font-light leading-[1.9]">
              {t("quotient.questionText")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-4">
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.55_0.06_200)] to-transparent" />
      </div>

      {/* Three Inputs */}
      <section className="py-24 md:py-32 px-6">
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
              {t("quotient.threeInputs")}
            </p>
          </motion.div>

          <div className="space-y-20 md:space-y-28">
            {quotients.map((q, i) => (
              <motion.div
                key={q.symbol}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16`}
              >
                {/* Symbol */}
                <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center border border-[oklch(0.25_0.01_240)] relative">
                  <span
                    className="text-6xl md:text-7xl font-light tracking-[0.05em]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: q.color,
                    }}
                  >
                    {q.symbol}
                  </span>
                  <span
                    className="absolute -top-3 left-4 bg-background px-3 text-xs tracking-[0.2em] uppercase font-light"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: q.color,
                    }}
                  >
                    {q.role}
                  </span>
                </div>

                {/* Description */}
                <div className="flex-1 text-center md:text-left">
                  <h3
                    className="text-2xl md:text-3xl font-light tracking-[0.08em] text-[oklch(0.85_0.008_75)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {q.name}
                  </h3>
                  <p className="text-base text-[oklch(0.60_0.02_75)] font-light leading-[1.9]">
                    {q.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Operator */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[oklch(0.14_0.04_250)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <p
              className="text-sm text-[oklch(0.55_0.06_200)] tracking-[0.3em] uppercase font-light mb-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("quotient.newOperator")}
            </p>

            <div className="mb-10">
              <span
                className="text-8xl md:text-9xl text-[oklch(0.55_0.06_200)] font-light"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ⊗
              </span>
            </div>

            <h3
              className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.008_75)] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("quotient.synergisticFusion")}
            </h3>

            <p className="text-base md:text-lg text-[oklch(0.60_0.02_75)] font-light leading-[1.9] max-w-xl mx-auto">
              {t("quotient.operatorText")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Output — HQ */}
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
              {t("quotient.newOutput")}
            </p>

            <h2
              className="text-5xl md:text-7xl font-light tracking-[0.1em] text-[oklch(0.78_0.04_75)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              HQ
            </h2>

            <h3
              className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.008_75)] mb-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("quotient.holisticQuotient")}
            </h3>

            <p className="text-base md:text-lg text-[oklch(0.60_0.02_75)] font-light leading-[1.9] mb-12">
              {t("quotient.hqDesc")}
            </p>

            <div className="inline-flex flex-col items-center gap-2 py-6 px-10 border border-[oklch(0.25_0.01_240)]">
              <p
                className="text-xs text-[oklch(0.50_0.03_240)] tracking-[0.2em] uppercase font-light"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("quotient.elegance")}
              </p>
              <p className="text-sm text-[oklch(0.65_0.02_75)] font-light leading-[1.8]">
                {t("quotient.hForHolistic")}
              </p>
              <p className="text-sm text-[oklch(0.65_0.02_75)] font-light leading-[1.8]">
                {t("quotient.hqHeadquarters")}
              </p>
              <p className="text-sm text-[oklch(0.65_0.02_75)] font-light leading-[1.8]">
                {t("quotient.hqOutput")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Complete Equation */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[oklch(0.14_0.04_250)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
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
              {t("quotient.completeEquation")}
            </p>

            <div className="mb-16">
              <p
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.05em] text-[oklch(0.92_0.008_75)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[oklch(0.55_0.06_200)]">IQ</span>{" "}
                <span className="text-[oklch(0.55_0.06_200)]">⊗</span>{" "}
                <span className="text-[oklch(0.40_0.15_20)]">EQ</span>{" "}
                <span className="text-[oklch(0.55_0.06_200)]">⊗</span>{" "}
                <span className="text-[oklch(0.78_0.04_75)]">CQ</span>{" "}
                <span className="text-[oklch(0.55_0.06_200)]">=</span>{" "}
                <span className="text-[oklch(0.78_0.04_75)]">HQ</span>
              </p>
            </div>

            {/* Four Elements Table */}
            <div className="max-w-lg mx-auto mb-16">
              <div className="grid grid-cols-3 gap-px bg-[oklch(0.20_0.008_240)]">
                {/* Header */}
                <div className="bg-[oklch(0.12_0.005_240)] py-3 px-4">
                  <p
                    className="text-xs text-[oklch(0.50_0.03_240)] tracking-[0.15em] uppercase font-light"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t("quotient.element")}
                  </p>
                </div>
                <div className="bg-[oklch(0.12_0.005_240)] py-3 px-4">
                  <p
                    className="text-xs text-[oklch(0.50_0.03_240)] tracking-[0.15em] uppercase font-light"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t("quotient.role")}
                  </p>
                </div>
                <div className="bg-[oklch(0.12_0.005_240)] py-3 px-4">
                  <p
                    className="text-xs text-[oklch(0.50_0.03_240)] tracking-[0.15em] uppercase font-light"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t("quotient.dimension")}
                  </p>
                </div>

                {/* Rows — each row is a clickable link to its dimension page */}
                {tableRows.map((row) => (
                  <div
                    key={row.el}
                    className="contents cursor-pointer group/row"
                    onClick={() => navigate(row.href)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") navigate(row.href); }}
                  >
                    <div className="bg-[oklch(0.10_0.005_240)] py-3 px-4 transition-all duration-300 hover:bg-[oklch(0.16_0.02_75/0.25)] active:bg-[oklch(0.20_0.04_75/0.35)] hover:shadow-[inset_0_0_12px_oklch(0.72_0.12_75/0.15)]">
                      <p
                        className="text-lg font-light"
                        style={{ fontFamily: "var(--font-display)", color: row.color }}
                      >
                        {row.el}
                      </p>
                    </div>
                    <div className="bg-[oklch(0.10_0.005_240)] py-3 px-4 transition-all duration-300 hover:bg-[oklch(0.16_0.02_75/0.25)] active:bg-[oklch(0.20_0.04_75/0.35)] hover:shadow-[inset_0_0_12px_oklch(0.72_0.12_75/0.15)]">
                      <p className="text-sm text-[oklch(0.65_0.02_75)] font-light">
                        {row.role}
                      </p>
                    </div>
                    <div className="bg-[oklch(0.10_0.005_240)] py-3 px-4 transition-all duration-300 hover:bg-[oklch(0.16_0.02_75/0.25)] active:bg-[oklch(0.20_0.04_75/0.35)] hover:shadow-[inset_0_0_12px_oklch(0.72_0.12_75/0.15)] flex items-center justify-between">
                      <p className="text-sm text-[oklch(0.65_0.02_75)] font-light italic">
                        {row.dim}
                      </p>
                      <span className="text-[oklch(0.72_0.12_75)] opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 text-xs ml-2">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Analogy */}
            <div className="max-w-xl mx-auto border-t border-b border-[oklch(0.25_0.01_240)] py-10">
              <p
                className="text-lg md:text-xl font-light italic text-[oklch(0.60_0.025_75)] leading-[2] tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("quotient.engineerTruth")}
              </p>
              <p className="mt-6 text-sm text-[oklch(0.45_0.03_240)] tracking-[0.1em] font-light">
                {t("quotient.engineerAttrib")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COUNTERFORCE — The Complete Framework Visual */}
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
              className="text-sm text-[oklch(0.72_0.12_75)] tracking-[0.3em] uppercase font-light mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("quotient.counterFramework") || "THE COMPLETE FRAMEWORK"}
            </p>
            <h2
              className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.008_75)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              COUNTERFORCE
            </h2>
            <p
              className="text-base text-[oklch(0.55_0.04_200)] font-light italic tracking-wide mb-12"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Parts, Measures & Balance
            </p>
            <a
              href="/manus-storage/counter_full_page_59090666.png"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/manus-storage/counter_full_page_59090666.png"
                alt="COUNTERFORCE — Parts, Measures & Balance — The 6th Extinction Doctrine & Civilisational Survival Tool"
                className="w-full max-w-4xl mx-auto object-contain"
                loading="lazy"
              />
            </a>
            <p className="mt-8 text-xs text-[oklch(0.45_0.03_200)] tracking-wider font-light">
              {t("quotient.counterCaption") || "The 6th Extinction Doctrine & Civilisational Survival Tool — Block 500"}
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
          IQ ⊗ EQ ⊗ CQ = HQ
        </p>
      </footer>
    </div>
  );
}
