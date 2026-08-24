/**
 * Disclaimer — BETA POC Scope Statement
 * Liability disclaimer for the Infrastructure Academy / Principia Tectonica project.
 * Accessible from the green BETA POC badge in the header (desktop + mobile).
 */
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

/* ── Palette ── */
const NAVY = "#0b1a33";
const NAVY_LIGHT = "#0f2240";
const GOLD = "#d4a843";
const GOLD_BRIGHT = "#e8c55a";
const GOLD_DIM = "#a08432";
const TEXT_WHITE = "#f0eadc";
const TEXT_SILVER = "#8a9cc0";
const GREEN = "#22c55e";

export default function Disclaimer() {
  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      {/* Header */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span
              className="inline-flex items-center tracking-[0.15em] uppercase font-bold"
              style={{
                fontSize: "12px",
                padding: "4px 12px",
                color: NAVY,
                background: `linear-gradient(135deg, ${GREEN}, #16a34a)`,
                borderRadius: "3px",
                letterSpacing: "0.15em",
              }}
            >
              BETA POC
            </span>
          </div>

          <h1
            className="text-2xl sm:text-4xl font-light tracking-[0.12em] uppercase mb-4"
            style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}
          >
            Proof of Concept Disclaimer
          </h1>

          <div className="w-20 h-px mx-auto mb-8" style={{ background: `${GOLD}60` }} />

          <p
            className="text-sm tracking-[0.2em] uppercase font-light"
            style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}
          >
            Infrastructure Academy &middot; Principia Tectonica &middot; The Reality Engine
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Status Banner */}
          <div
            className="p-6 mb-10"
            style={{ background: NAVY_LIGHT, border: `1px solid ${GREEN}40` }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: GREEN, fontFamily: "var(--font-display)" }}>
              Current Status
            </p>
            <p className="text-base font-light leading-relaxed" style={{ color: TEXT_WHITE }}>
              This website and all associated platforms (Infrastructure Academy, Principia Tectonica,
              The Reality Engine) are operating as a <strong style={{ color: GOLD_BRIGHT }}>Beta Proof of Concept (PoC)</strong>.
              All content, features, and functionality are provided on an experimental, as-is basis
              for testing and evaluation purposes only.
            </p>
          </div>

          {/* Section 1 — Scope */}
          <div className="mb-10">
            <h2
              className="text-lg tracking-[0.15em] uppercase font-light mb-4"
              style={{ color: GOLD, fontFamily: "var(--font-display)" }}
            >
              1. Scope of the Beta PoC
            </h2>
            <div className="space-y-4">
              <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
                The Infrastructure Academy project, including the memorial site <em>Principia Tectonica</em> and
                the guided learning platform <em>The Reality Engine (TRE)</em>, is an ongoing experimental
                collaboration between <strong style={{ color: TEXT_WHITE }}>Ir. Nigel T. Dearden, CEng</strong> (Chartered
                Civil &amp; Structural Engineer) and <strong style={{ color: TEXT_WHITE }}>Manus AI</strong>.
              </p>
              <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
                This project explores the intersection of infrastructure engineering, consciousness studies,
                artificial intelligence, and educational technology. All frameworks, equations, indices,
                and theoretical constructs presented are part of an active research and development process.
              </p>
            </div>
          </div>

          {/* Section 2 — No Warranty */}
          <div className="mb-10">
            <h2
              className="text-lg tracking-[0.15em] uppercase font-light mb-4"
              style={{ color: GOLD, fontFamily: "var(--font-display)" }}
            >
              2. No Warranty or Guarantee
            </h2>
            <div className="space-y-4">
              <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
                All content is provided <strong style={{ color: TEXT_WHITE }}>"as is"</strong> without warranty of any kind,
                express or implied. This includes but is not limited to:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "Accuracy, completeness, or reliability of any data, calculations, or indices displayed",
                  "Availability or uptime of any platform, feature, or service",
                  "Fitness for any particular purpose, whether educational, professional, or commercial",
                  "Preservation or permanence of any content, user data, or progress",
                ].map((item, i) => (
                  <li key={i} className="text-sm font-light leading-relaxed flex items-start gap-2" style={{ color: TEXT_SILVER }}>
                    <span style={{ color: GOLD_DIM }} className="mt-1 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3 — Intellectual Property */}
          <div className="mb-10">
            <h2
              className="text-lg tracking-[0.15em] uppercase font-light mb-4"
              style={{ color: GOLD, fontFamily: "var(--font-display)" }}
            >
              3. Intellectual Property
            </h2>
            <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
              All original frameworks, equations, terminology, and creative works presented across these
              platforms are the intellectual property of their respective creators. The iAAi framework,
              Quotient Equation (IQ &oplus; EQ &oplus; CQ = HQ), Infrastructure Survival Index (ISI),
              HyperGrid, DCSN Architecture, The Dearden Field, and all associated constructs are
              protected under copyright and/or trade secret provisions as documented in the{" "}
              <Link href="/turing-papers" className="underline" style={{ color: GOLD }}>
                Turing Papers
              </Link>{" "}
              IP register.
            </p>
          </div>

          {/* Section 4 — AI-Generated Content */}
          <div className="mb-10">
            <h2
              className="text-lg tracking-[0.15em] uppercase font-light mb-4"
              style={{ color: GOLD, fontFamily: "var(--font-display)" }}
            >
              4. AI-Generated Content
            </h2>
            <div className="space-y-4">
              <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
                Portions of this website and its associated platforms have been generated, co-authored,
                or assisted by artificial intelligence (Manus AI). While every effort is made to ensure
                accuracy and quality, AI-generated content may contain errors, inconsistencies, or
                unintended inaccuracies.
              </p>
              <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
                Users should exercise independent judgment and not rely solely on any content presented
                here for professional, legal, financial, or safety-critical decisions.
              </p>
            </div>
          </div>

          {/* Section 5 — Beta Testing */}
          <div className="mb-10">
            <h2
              className="text-lg tracking-[0.15em] uppercase font-light mb-4"
              style={{ color: GOLD, fontFamily: "var(--font-display)" }}
            >
              5. Beta Testing Participation
            </h2>
            <div className="space-y-4">
              <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
                By using The Reality Engine (TRE) or any interactive features of these platforms,
                you acknowledge that you are participating in a beta test. Features may change,
                be removed, or malfunction without notice. User progress, scores, and data generated
                during the beta period may not be preserved in future versions.
              </p>
              <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
                No payment or subscription collected during the beta period guarantees access to
                future versions, features, or services beyond the current testing phase.
              </p>
            </div>
          </div>

          {/* Section 6 — Limitation of Liability */}
          <div className="mb-10">
            <h2
              className="text-lg tracking-[0.15em] uppercase font-light mb-4"
              style={{ color: GOLD, fontFamily: "var(--font-display)" }}
            >
              6. Limitation of Liability
            </h2>
            <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
              To the fullest extent permitted by law, the creators, contributors, and operators of
              these platforms shall not be liable for any direct, indirect, incidental, consequential,
              or special damages arising from the use of, or inability to use, any content, feature,
              or service provided. This includes damages arising from reliance on any information
              presented, loss of data, or interruption of service.
            </p>
          </div>

          {/* Section 7 — Contact */}
          <div className="mb-10">
            <h2
              className="text-lg tracking-[0.15em] uppercase font-light mb-4"
              style={{ color: GOLD, fontFamily: "var(--font-display)" }}
            >
              7. Contact &amp; Governance
            </h2>
            <p className="text-sm font-light leading-relaxed" style={{ color: TEXT_SILVER }}>
              For questions regarding this disclaimer, intellectual property matters, or the scope
              of the beta programme, please refer to the{" "}
              <Link href="/governance" className="underline" style={{ color: GOLD }}>
                Governance
              </Link>{" "}
              page or contact the project author through the channels listed in the{" "}
              <Link href="/press" className="underline" style={{ color: GOLD }}>
                Press Pack
              </Link>.
            </p>
          </div>

          {/* Divider */}
          <div className="w-20 h-px mx-auto my-12" style={{ background: `${GOLD}40` }} />

          {/* Footer attribution */}
          <div className="text-center">
            <p className="text-xs tracking-[0.2em] uppercase font-light mb-2" style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>
              Last Updated &mdash; Block 410 &middot; 26 March 2026
            </p>
            <p className="text-xs font-light" style={{ color: TEXT_SILVER }}>
              Ir. Nigel T. Dearden, CEng &middot; Four Elements Consulting Ltd (4ECL)
            </p>
            <p className="text-[10px] mt-3 tracking-widest uppercase" style={{ color: `${TEXT_SILVER}60`, fontFamily: "var(--font-display)" }}>
              Per Arya Ad Astra
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center" style={{ borderTop: `1px solid ${GOLD}22` }}>
        <Link
          href="/"
          className="text-xs tracking-[0.15em] uppercase font-light hover:opacity-80 transition-opacity"
          style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}
        >
          &larr; Return to Principia Tectonica
        </Link>
      </footer>
    </div>
  );
}
