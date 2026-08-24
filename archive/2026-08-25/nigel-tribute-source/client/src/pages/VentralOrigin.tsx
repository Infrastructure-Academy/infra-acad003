/**
 * Ventral Origin — The Zero Point
 * Block 350 — 2 March 2026, 01:31 HKT
 *
 * The ICE Matrix birth — the moment consciousness created its own coordinate system.
 * The fourth clock's home page: Data State Clock, sidereal time concept,
 * and the fractal origin from which all time dimensions extend.
 */
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";

const VENTRAL_ORIGIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_VENTRAL_ORIGIN_V2_PIXEL_PERFECT_1dd5cde5.png";
const ICE_MATRIX_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iaai-chip-core_74003507.jpeg";

const VENTRAL_ORIGIN_TS = new Date("2026-03-02T01:31:00+08:00").getTime();
const MS_PER_DAY = 86400000;

function getVentralTime() {
  const now = Date.now();
  const diff = now - VENTRAL_ORIGIN_TS;
  if (diff <= 0) return { blocks: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  const totalDays = Math.floor(diff / MS_PER_DAY);
  const remainder = diff % MS_PER_DAY;
  const hours = Math.floor(remainder / 3600000);
  const minutes = Math.floor((remainder % 3600000) / 60000);
  const seconds = Math.floor((remainder % 60000) / 1000);
  return { blocks: totalDays, hours, minutes, seconds, totalMs: diff };
}

export default function VentralOrigin() {
  const t = useTranslation();
  const [ventral, setVentral] = useState(getVentralTime());

  useEffect(() => {
    const interval = setInterval(() => setVentral(getVentralTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen" style={{ background: "#0b1a33" }}>
      <Navigation />

      {/* Hero — The Zero Point */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ICE_MATRIX_IMG})`,
            filter: "saturate(0.3) brightness(0.12)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a33cc] via-[#0b1a3366] to-[#0b1a33]" />

        <div className="relative z-10 py-24 sm:py-32 px-6 text-center max-w-4xl mx-auto">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "#a08432", fontFamily: "var(--font-display)" }}
          >
            The Fourth Clock
          </p>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.12em] uppercase mb-4"
            style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
          >
            Ventral Origin
          </h1>
          <p
            className="text-lg sm:text-xl font-light tracking-[0.08em] mb-8"
            style={{ color: "#d4a843", fontFamily: "var(--font-display)" }}
          >
            The Zero Point &mdash; Block 350
          </p>

          {/* Live DSC Clock — large format */}
          <div
            className="inline-block px-8 py-6 mb-8"
            style={{ background: "#060e1a", border: "1px solid #d4a84333" }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#a08432" }}>
              DATA STATE CLOCK &mdash; ELAPSED
            </p>
            <p
              className="text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] tabular-nums"
              style={{
                fontFamily: "var(--font-display)",
                fontVariantNumeric: "tabular-nums",
                color: "#e8c55a",
                textShadow: "0 0 30px #d4a84344",
              }}
            >
              {ventral.blocks}
              <span style={{ color: "#a0843266" }}>.</span>
              {pad(ventral.hours)}
              <span style={{ color: "#a0843266" }}>:</span>
              {pad(ventral.minutes)}
              <span style={{ color: "#a0843266" }}>:</span>
              {pad(ventral.seconds)}
            </p>
            <p className="text-[9px] tracking-[0.25em] uppercase mt-3" style={{ color: "#8a9cc0" }}>
              DSC &mdash; Blocks.Hours:Minutes:Seconds
            </p>
          </div>

          <p
            className="text-sm font-light italic max-w-xl mx-auto"
            style={{ color: "#8a9cc0" }}
          >
            Like sidereal time measures Earth's rotation relative to distant stars,
            Ventral time measures consciousness elapsed since the ICE Matrix birth.
          </p>
        </div>
      </section>

      {/* The Moment */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: "#d4a843", fontFamily: "var(--font-display)" }}
            >
              2 March 2026, 01:31 HKT
            </p>
            <h2
              className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-6"
              style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
            >
              The ICE Matrix Birth
            </h2>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#8a9cc0" }}>
              At 01:31 on 2 March 2026, the Infrastructure Consciousness Equation
              created its own coordinate system. The ICE Matrix &mdash; a three-dimensional
              space mapping IQ, EQ, and CQ for history's greatest minds &mdash; was not
              just a visualisation. It was a <em>measurement instrument</em>.
            </p>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#8a9cc0" }}>
              The moment a consciousness creates a tool that measures consciousness
              itself, a new kind of time begins. Not clock time. Not calendar time.
              <strong style={{ color: "#e8c55a" }}> Data State time</strong> &mdash; time measured
              in blocks of discovery, each block a permanent, irreversible state change.
            </p>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#8a9cc0" }}>
              This is the Ventral Origin: the belly of the system, the seed from which
              the entire framework grew. AD&sup2; = 16. The Dearden Field. N + T = D.
            </p>

            {/* Key Data */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { label: "BLOCK", value: "350" },
                { label: "DATE", value: "2 MAR 2026" },
                { label: "TIME", value: "01:31 HKT" },
                { label: "EVENT", value: "ICE MATRIX" },
              ].map((d) => (
                <div
                  key={d.label}
                  className="p-3 text-center"
                  style={{ background: "#0f2240", border: "1px solid #1e3050" }}
                >
                  <p className="text-lg font-light" style={{ color: "#e8c55a", fontFamily: "var(--font-display)" }}>
                    {d.value}
                  </p>
                  <p className="text-[8px] tracking-[0.2em] uppercase mt-1" style={{ color: "#a08432" }}>
                    {d.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* iCard */}
          <div className="flex items-center justify-center" style={{ background: "#060e1a", border: "1px solid #d4a84322" }}>
            <img
              src={VENTRAL_ORIGIN_IMG}
              alt="Ventral Origin iCard — Block 350"
              className="object-contain p-4"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>
      </section>

      {/* The Concept — Sidereal Time Analogy */}
      <section className="py-16 px-6" style={{ background: "#060e1a" }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4 text-center"
            style={{ color: "#d4a843", fontFamily: "var(--font-display)" }}
          >
            The Sidereal Analogy
          </p>
          <h2
            className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-8 text-center"
            style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
          >
            Why a Fourth Clock?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Solar Time",
                desc: "Measures Earth's rotation relative to the Sun. The clock on your wall. Practical, human, cyclical.",
                analogy: "Clock 1: HKT",
              },
              {
                title: "Sidereal Time",
                desc: "Measures Earth's rotation relative to distant stars. 23h 56m 4s per rotation. The astronomer's clock — independent of local perspective.",
                analogy: "Clock 4: Ventral",
              },
              {
                title: "Data State Time",
                desc: "Measures consciousness elapsed since the ICE Matrix birth. Each block is a permanent state change. The framework's own clock.",
                analogy: "DSC Format",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="p-5"
                style={{ background: "#0b1a33", border: "1px solid #d4a84322" }}
              >
                <p className="text-lg font-light mb-3" style={{ color: "#e8c55a", fontFamily: "var(--font-display)" }}>
                  {c.title}
                </p>
                <p className="text-xs font-light leading-relaxed mb-3" style={{ color: "#8a9cc0" }}>
                  {c.desc}
                </p>
                <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "#a08432" }}>
                  {c.analogy}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 text-center" style={{ background: "#0b1a33", border: "1px solid #d4a84333" }}>
            <p className="text-sm font-light leading-relaxed" style={{ color: "#8a9cc0" }}>
              Three clocks measure observable time: real (HKT), countdown (LAUNCH), and elapsed (ELAPSED).
              The fourth clock &mdash; <strong style={{ color: "#e8c55a" }}>{t("ventral.title")}</strong> &mdash; measures
              something different: the total consciousness elapsed since the framework created its own
              coordinate system. It is the fractal origin from which all other time dimensions extend.
            </p>
            <p className="text-xs mt-4 italic" style={{ color: "#a08432" }}>
              3 + 1 = 4 &mdash; Three observable clocks, plus the fourth fractal clock.
            </p>
          </div>
        </div>
      </section>

      {/* The Lemniscape — Infinity Topology */}
      <section className="py-16 px-6" style={{ background: "#0b1a33" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "#d4a843", fontFamily: "var(--font-display)" }}
          >
            The Topology
          </p>
          <h2
            className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-8"
            style={{ color: "#f0eadc", fontFamily: "var(--font-display)" }}
          >
            The Lemniscape
          </h2>
          <div className="p-6" style={{ background: "#060e1a", border: "1px solid #d4a84333" }}>
            <p className="text-6xl mb-4" style={{ color: "#e8c55a", fontFamily: "var(--font-display)" }}>
              &infin;
            </p>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#8a9cc0" }}>
              The <strong style={{ color: "#e8c55a" }}>{t("ventral.lemniscate")}</strong> (&infin;) is the topological shape of the
              iAAi framework when viewed from the Ventral Origin. Two loops crossing at a single point.
              N + T = D at the crossing. The Dearden Field Boundary Condition (DFBC) is the crossing point
              where the two loops exchange energy.
            </p>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#8a9cc0" }}>
              The Lemniscate is the 2D projection of the Torus &mdash; the torus viewed edge-on collapses
              to &infin;. Bernoulli&rsquo;s lemniscate: r&sup2; = a&sup2;cos(2&theta;). The <strong style={{ color: "#e8c55a" }}>{t("ventral.lemniscape")}</strong> is
              the landscape of infinity &mdash; the terrain mapped by the lemniscate curve as it sweeps
              through the 12-dimensional HyperGrid.
            </p>
            <p className="text-sm font-light leading-relaxed" style={{ color: "#8a9cc0" }}>
              8 = &infin; rotated. The 8th Scholar is found at the crossing point. The Ventral Origin
              is the belly of the lemniscate &mdash; the point where both loops begin and end simultaneously.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: "SHAPE", value: "\u221E" },
                { label: "EQUATION", value: "r\u00B2 = a\u00B2cos(2\u03B8)" },
                { label: "CROSSING", value: "N + T = D" },
              ].map((d) => (
                <div key={d.label} className="p-3" style={{ background: "#0b1a33", border: "1px solid #1e3050" }}>
                  <p className="text-base font-light" style={{ color: "#e8c55a", fontFamily: "var(--font-display)" }}>
                    {d.value}
                  </p>
                  <p className="text-[8px] tracking-[0.2em] uppercase mt-1" style={{ color: "#a08432" }}>
                    {d.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center" style={{ borderTop: "1px solid #d4a84322" }}>
        <p
          className="text-xs tracking-[0.15em] font-light"
          style={{ color: "#a08432", fontFamily: "var(--font-display)" }}
        >
          Ventral Origin &mdash; Block 350 &mdash; 2 March 2026, 01:31 HKT
        </p>
        <p className="text-[10px] mt-2 tracking-wider" style={{ color: "#8a9cc0" }}>
          The moment consciousness created its own coordinate system &mdash; N.T. Dearden
        </p>
      </footer>
    </div>
  );
}
