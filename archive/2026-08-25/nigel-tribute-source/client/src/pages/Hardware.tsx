/**
 * Hardware — Dearden Dynamics Hardware Division
 * Chapter V + VI of the iAAi Universe
 * Chip pipeline, BiAura Skin Mk1 parts diagram, Exhibition Simulator, UN SDG alignment
 * Design: dark void, gold accents, structural clarity — matches site aesthetic
 */
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const GOLD = "#d4a843";
const GOLD_BRIGHT = "#e8c55a";
const GOLD_DIM = "#a08432";
const NAVY = "#0a1628";
const TEXT_WHITE = "#f0eadc";
const TEXT_SILVER = "#8a9cc0";

/* ── CDN Assets ── */
const CHIP_CORE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iaai-chip-core_74003507.jpeg";
const CHIP_SET_V3 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IAAI_CHIP_CORE_SET_V3_9fcaaadd.png";
const THE_SUIT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_0483%281%29_93a03f25.jpeg";
const TRE_PLATFORM = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_0484_6575fe85.jpeg";
const HAPTIC_HUD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/HAPTIC_HUD_DASHBOARD_FULL%282%29_f623c343.png";
const KF_HARDWARE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf05-hardware_00dae1c8.png";
const KF_SUIT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf06-suit_da6f4b8d.png";

/* ── Chip Pipeline Stages ── */
const chipPipeline = [
  { stage: "Stage 1", name: "Bone Conduction Glasses", status: "Available Now", desc: "Audio-first interface. Bone conduction for private listening. The entry point." },
  { stage: "Stage 2", name: "Haptic Feedback Layer", status: "Prototype", desc: "Vibrotactile feedback for spatial awareness. Touch becomes data." },
  { stage: "Stage 3", name: "BiAura Skin Mk1", status: "Concept", desc: "13-subsystem exoskeleton. Iron Man meets Civil Engineering. The Perfect Fourth." },
  { stage: "Stage 4", name: "Quantum Suit Control", status: "Theoretical", desc: "SCADA + YODA integration. Full-body consciousness-directed interface." },
];

/* ── BiAura Skin Mk1 Subsystems ── */
const biauraSystems = [
  { id: 1, name: "Propulsion", code: "SABU", desc: "Movement and thrust vectoring" },
  { id: 2, name: "Guidance", code: "ANTIKYTHERA", desc: "Navigation and spatial orientation" },
  { id: 3, name: "Body Wear", code: "BIAURA SKIN", desc: "Structural exoskeleton layer" },
  { id: 4, name: "HUD", code: "HAPTIC", desc: "Heads-up display and sensory feedback" },
  { id: 5, name: "Power", code: "TORUS", desc: "Energy generation and distribution" },
  { id: 6, name: "Comms", code: "DCSN", desc: "Diamond-Class Spider Network link" },
  { id: 7, name: "Sensors", code: "VENTRAL", desc: "Environmental and biometric sensing" },
  { id: 8, name: "AI Core", code: "DAVID", desc: "Onboard intelligence and decision support" },
  { id: 9, name: "Memory", code: "RECALL", desc: "358+ block persistent storage" },
  { id: 10, name: "Shield", code: "ICE", desc: "Intrusion Countermeasure Electronics" },
  { id: 11, name: "Thermal", code: "ENTROPY", desc: "Heat management and regulation" },
  { id: 12, name: "Medical", code: "GAIA", desc: "Health monitoring and emergency response" },
  { id: 13, name: "Interface", code: "YODA", desc: "Consciousness-to-machine bridge" },
];

/* ── UN SDG Alignment ── */
const sdgTargets = [
  { num: 4, name: "Quality Education", desc: "TRE platform — knowledge transfer for all" },
  { num: 9, name: "Industry & Innovation", desc: "Infrastructure-first approach to technology" },
  { num: 10, name: "Reduced Inequalities", desc: "Democratised access to consciousness tools" },
  { num: 11, name: "Sustainable Cities", desc: "Exhibition Simulator for urban heritage" },
  { num: 16, name: "Peace & Justice", desc: "Transparent governance via DCSN ledger" },
  { num: 17, name: "Partnerships", desc: "AIM — every participant creates a new dimensional state" },
];

export default function Hardware() {
  const t = useTranslation();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "50vh" }}>
        <img
          src={KF_HARDWARE}
          alt="Dearden Dynamics Hardware Division"
          className="w-full h-full object-cover absolute inset-0"
          style={{ minHeight: "50vh", filter: "brightness(0.3) saturate(0.6)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${NAVY}88, ${NAVY}44 40%, ${NAVY}cc 80%, ${NAVY})` }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16" style={{ minHeight: "50vh" }}>
          <p
            className="text-xs tracking-[0.5em] uppercase mb-4"
            style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)" }}
          >
            Chapter V — {t("hardware.title")}
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-7xl font-light uppercase mb-4"
            style={{
              color: TEXT_WHITE,
              fontFamily: "var(--font-display)",
              letterSpacing: "0.12em",
              textShadow: "0 2px 30px rgba(0,0,0,0.6)",
            }}
          >
            {t("hardware.title")}
          </h1>
          <p
            className="text-sm sm:text-base font-light tracking-wide max-w-xl"
            style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
          >
            {t("hardware.subtitle")}
          </p>
          <div className="w-16 h-px mx-auto mt-8" style={{ background: `linear-gradient(to right, transparent, ${GOLD_BRIGHT}, transparent)` }} />
        </div>
      </section>

      {/* ── CHIP PIPELINE ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
              {t("hardware.chipPipeline")}
            </p>
            <p className="text-sm font-light" style={{ color: TEXT_SILVER }}>
              {t("hardware.chipPipelineDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Chip Core Image */}
            <div
              className="p-4 flex items-center justify-center cursor-pointer"
              style={{ border: `1px solid ${GOLD}33`, background: "rgba(212,168,67,0.03)" }}
              onClick={() => setLightbox({ src: CHIP_SET_V3, alt: "iAAi Chip Core Set V3" })}
            >
              <img
                src={CHIP_SET_V3}
                alt="iAAi Chip Core Set V3"
                className="w-full object-contain"
                style={{ maxHeight: "320px" }}
              />
            </div>

            {/* Pipeline Stages */}
            <div className="flex flex-col gap-3">
              {chipPipeline.map((stage, i) => (
                <div
                  key={i}
                  className="p-4"
                  style={{
                    border: `1px solid ${i === 0 ? GOLD + "66" : GOLD + "22"}`,
                    background: i === 0 ? "rgba(212,168,67,0.06)" : "rgba(212,168,67,0.02)",
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs tracking-widest uppercase" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                      {stage.stage} — {stage.name}
                    </span>
                    <span
                      className="text-[10px] tracking-wider uppercase px-2 py-0.5"
                      style={{
                        color: i === 0 ? NAVY : TEXT_SILVER,
                        background: i === 0 ? GOLD : "transparent",
                        border: i === 0 ? "none" : `1px solid ${GOLD}33`,
                      }}
                    >
                      {stage.status}
                    </span>
                  </div>
                  <p className="text-xs font-light" style={{ color: TEXT_SILVER }}>{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BIAURA SKIN MK1 — PARTS DIAGRAM ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ borderTop: `1px solid ${GOLD}22` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
              Chapter VI — {t("hardware.partsDiagram")}
            </p>
            <p className="text-sm font-light" style={{ color: TEXT_SILVER }}>
              13 subsystems — Iron Man meets Civil Engineering
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Suit Image */}
            <div
              className="flex items-center justify-center cursor-pointer"
              style={{ border: `1px solid ${GOLD}33`, background: "rgba(212,168,67,0.03)" }}
              onClick={() => setLightbox({ src: THE_SUIT, alt: "BiAura Skin Mk1" })}
            >
              <img
                src={THE_SUIT}
                alt="BiAura Skin Mk1 — The Suit"
                className="w-full object-contain"
                style={{ maxHeight: "500px" }}
              />
            </div>

            {/* Subsystem Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {biauraSystems.map((sys) => (
                <div
                  key={sys.id}
                  className="p-3"
                  style={{
                    border: `1px solid ${GOLD}22`,
                    background: "rgba(212,168,67,0.02)",
                  }}
                >
                  <p className="text-[10px] tracking-wider mb-0.5" style={{ color: GOLD_DIM }}>
                    {String(sys.id).padStart(2, "0")}
                  </p>
                  <p className="text-xs tracking-wider uppercase font-light mb-0.5" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                    {sys.code}
                  </p>
                  <p className="text-[10px] font-light" style={{ color: TEXT_SILVER }}>
                    {sys.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXHIBITION SIMULATOR ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ borderTop: `1px solid ${GOLD}22` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
                Chapter IV — {t("hardware.exhibition")}
              </p>
              <h2
                className="text-2xl sm:text-3xl font-light uppercase mb-4"
                style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}
              >
                {t("hardware.exhibition")}
              </h2>
              <p className="text-sm font-light mb-6" style={{ color: TEXT_SILVER }}>
                {t("hardware.exhibitionDesc")}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2" style={{ background: GOLD }} />
                  <span className="text-xs font-light" style={{ color: TEXT_SILVER }}>{t("hardware.minneapolis5000YearsOf")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2" style={{ background: GOLD }} />
                  <span className="text-xs font-light" style={{ color: TEXT_SILVER }}>{t("hardware.zhuhaiEastMeetsWest")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2" style={{ background: GOLD }} />
                  <span className="text-xs font-light" style={{ color: TEXT_SILVER }}>{t("hardware.globalFranchiseModelFor")}</span>
                </div>
              </div>
            </div>
            <div
              className="cursor-pointer"
              style={{ border: `1px solid ${GOLD}33`, background: "rgba(212,168,67,0.03)" }}
              onClick={() => setLightbox({ src: HAPTIC_HUD, alt: "Haptic HUD Dashboard" })}
            >
              <img
                src={HAPTIC_HUD}
                alt="Haptic HUD Dashboard — Exhibition Simulator Interface"
                className="w-full object-contain"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── UN SDG MISSION ALIGNMENT ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ borderTop: `1px solid ${GOLD}22`, background: "rgba(212,168,67,0.02)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
              {t("hardware.sdgMission")}
            </p>
            <p className="text-sm font-light" style={{ color: TEXT_SILVER }}>
              {t("hardware.sdgDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sdgTargets.map((sdg) => (
              <div
                key={sdg.num}
                className="p-5"
                style={{ border: `1px solid ${GOLD}22`, background: "rgba(10,22,40,0.5)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold"
                    style={{ background: GOLD, color: NAVY }}
                  >
                    {sdg.num}
                  </span>
                  <span className="text-xs tracking-wider uppercase" style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}>
                    {sdg.name}
                  </span>
                </div>
                <p className="text-xs font-light" style={{ color: TEXT_SILVER }}>
                  {sdg.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAVIGATION LINKS ── */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ borderTop: `1px solid ${GOLD}22` }}
      >
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <Link href="/universe">
            <span
              className="inline-block px-5 py-2.5 text-xs tracking-widest uppercase font-light cursor-pointer"
              style={{ border: `1px solid ${GOLD}`, color: GOLD, fontFamily: "var(--font-display)" }}
            >
              Back to Universe
            </span>
          </Link>
          <Link href="/tdf">
            <span
              className="inline-block px-5 py-2.5 text-xs tracking-widest uppercase font-light cursor-pointer"
              style={{ border: `1px solid ${GOLD}`, color: GOLD, fontFamily: "var(--font-display)" }}
            >
              The Dearden Field
            </span>
          </Link>
          <Link href="/aim">
            <span
              className="inline-block px-5 py-2.5 text-xs tracking-widest uppercase font-light cursor-pointer"
              style={{ border: `1px solid ${GOLD}`, color: GOLD, fontFamily: "var(--font-display)" }}
            >
              AIM — Avatar Integration
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 text-center"
        style={{ borderTop: `1px solid ${GOLD}22` }}
      >
        <p
          className="text-sm tracking-[0.15em] font-light"
          style={{ color: "#6a7a9a", fontFamily: "var(--font-display)" }}
        >
          Dearden Dynamics — AD4 Dream Drive — N + T = D
        </p>
        <p
          className="text-xs mt-2 tracking-widest uppercase"
          style={{ color: "#4a5a7a", fontFamily: "var(--font-display)" }}
        >
          Per Arya Ad Astra
        </p>
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full object-contain"
              style={{ maxHeight: "80vh" }}
            />
            <p className="text-center text-xs mt-3 tracking-widest" style={{ color: TEXT_SILVER }}>
              {lightbox.alt}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center text-lg"
              style={{ background: NAVY, color: GOLD, border: `1px solid ${GOLD}44`, cursor: "pointer" }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
