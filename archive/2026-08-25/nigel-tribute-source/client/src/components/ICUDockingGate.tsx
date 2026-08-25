import { useState } from "react";

const GOLD = "#d4a843";
const GOLD_BRIGHT = "#f1d36a";
const NAVY = "#0b1a33";
const TEXT_WHITE = "#f0eadc";
const TEXT_SILVER = "#a9b8d3";

export default function ICUDockingGate() {
  const [docked, setDocked] = useState(false);

  return (
    <section
      aria-labelledby="icu-docking-title"
      className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16"
      style={{ borderBottom: `1px solid ${GOLD}44` }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em]" style={{ color: GOLD }}>
          Human–Machine Boundary
        </p>
        <h2
          id="icu-docking-title"
          className="mb-4 text-3xl font-light uppercase tracking-[0.12em] sm:text-4xl"
          style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}
        >
          iCU 0/1 Docking Gate
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: TEXT_SILVER }}>
          Toggle the gate to see the difference between machine infrastructure without a governed human loop and a live human–machine dock.
        </p>
      </div>

      <div className="mt-10 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        <div
          className="border p-6 text-center"
          style={{ borderColor: `${GOLD}66`, background: `${GOLD}08` }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            Human operator
          </p>
          <p className="text-xl" style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}>
            IQ ⊗ EQ ⊗ CQ
          </p>
          <p className="mt-2 text-sm" style={{ color: TEXT_SILVER }}>
            Integrated capacity, agency, purpose, and accountability
          </p>
        </div>

        <div className="flex flex-col items-center gap-3" aria-live="polite">
          <button
            type="button"
            aria-pressed={docked}
            aria-label={docked ? "Disconnect the iCU docking gate" : "Connect the iCU docking gate"}
            onClick={() => setDocked((current) => !current)}
            className="flex h-24 w-24 flex-col items-center justify-center border-2 text-center"
            style={{
              borderColor: docked ? GOLD_BRIGHT : `${GOLD}88`,
              background: docked ? `${GOLD}22` : `${NAVY}`,
              color: docked ? GOLD_BRIGHT : TEXT_SILVER,
              boxShadow: docked ? `0 0 28px ${GOLD}44` : "none",
            }}
          >
            <span className="text-3xl font-light">{docked ? "1" : "0"}</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.25em]">iCU</span>
          </button>
          <span className="text-center text-xs uppercase tracking-[0.18em]" style={{ color: docked ? GOLD_BRIGHT : TEXT_SILVER }}>
            {docked ? "Dock active" : "Dock absent"}
          </span>
        </div>

        <div
          className="border p-6 text-center"
          style={{ borderColor: `${GOLD}66`, background: `${GOLD}08` }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            Machine infrastructure
          </p>
          <p className="text-xl" style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}>
            Compute ⊗ Relay
          </p>
          <p className="mt-2 text-sm" style={{ color: TEXT_SILVER }}>
            {docked ? "Amplifies a governed human signal into relay continuity" : "Processes signals without recognised human dominion"}
          </p>
        </div>
      </div>

      <div className="mt-8 border-t pt-6 text-center" style={{ borderColor: `${GOLD}44` }}>
        <p className="text-sm leading-relaxed sm:text-base" style={{ color: TEXT_SILVER }}>
          <span style={{ color: docked ? GOLD_BRIGHT : TEXT_WHITE }}>
            iCU(T, M; Who, When) ∈ &#123;{docked ? "1" : "0"}&#125;
          </span>
          {docked
            ? " — the human operator is present, attributable, and remains the source of agency and accountable control."
            : " — the machine may process signals, but the framework does not recognise a governed human–machine loop."}
        </p>
      </div>
    </section>
  );
}
