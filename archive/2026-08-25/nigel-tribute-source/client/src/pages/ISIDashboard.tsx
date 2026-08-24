/**
 * ISI Dashboard — Infrastructure Survival Index — Live Assessment Dashboard
 * All data sourced from ISI Methodology Paper (DD-025), Evidence Summary (DD-029),
 * and Confirmed Dates (CONFIRMED_DATES.md).
 */
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Navigation from "@/components/Navigation";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "@/contexts/LanguageContext";

const navy = "#0b1a33";
const navyDeep = "#060e1a";
const navyLight = "#0f2240";
const gold = "#d4a843";
const goldBright = "#e8c55a";
const goldDim = "#a08432";
const sand = "#f0eadc";
const sandMid = "#8a9cc0";
const green = "#4ade80";
const red = "#f87171";
const amber = "#fbbf24";

/* ── CONFIRMED DATA ── */

interface RoundData {
  id: string;
  label: string;
  date: string;
  score: number;
  scoreLabel: string;
  panel: string;
  verdict: string;
  ukClass: string;
  usGPA: string;
  qaaGrade: string;
  indiaCGPA: string;
  apac: string;
  china: string;
  colour: string;
  href?: string;
}

const ROUNDS: RoundData[] = [
  {
    id: "r1-ice",
    label: "R1 — ICE Assessment",
    date: "27 Feb 2026",
    score: 75,
    scoreLabel: "75/100",
    panel: "3 review packages",
    verdict: "CONDITIONAL GO",
    ukClass: "First (Borderline)",
    usGPA: "3.7",
    qaaGrade: "A",
    href: "https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html",
    indiaCGPA: "7.5",
    apac: "A-",
    china: "Good First",
    colour: amber,
  },
  {
    id: "r1-content",
    label: "R1 — Content Only (6-cat)",
    date: "27 Feb 2026",
    score: 84.6,
    scoreLabel: "84.6%",
    panel: "12 universities",
    verdict: "FIRST CLASS",
    ukClass: "First Class (Solid)",
    usGPA: "4.0",
    qaaGrade: "A+/A",
    indiaCGPA: "8.5",
    apac: "A",
    china: "Excellent",
    colour: gold,
    href: "https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html",
  },
  {
    id: "r2",
    label: "R2 — Focused Audit (3-cat)",
    date: "25 Feb 2026",
    score: 74.6,
    scoreLabel: "74.6%",
    panel: "15 reviewers",
    verdict: "DIP (expected)",
    ukClass: "First (Borderline)",
    usGPA: "3.7",
    qaaGrade: "A",
    indiaCGPA: "7.5",
    apac: "A-",
    china: "Good First",
    colour: red,
    href: "https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html",
  },
  {
    id: "r3",
    label: "R3 — Corrected Academic Audit",
    date: "12 Mar 2026",
    score: 87.5,
    scoreLabel: "87.5%",
    panel: "21 universities, 6 regions",
    verdict: "GO — FIRST CLASS",
    ukClass: "First Class (Solid)",
    usGPA: "4.0",
    qaaGrade: "A+/A",
    indiaCGPA: "8.7-8.8",
    apac: "A / S",
    china: "Excellent",
    colour: green,
    href: "https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html",
  },
];

/* Category improvement R1 → R3 */
const CATEGORIES = [
  { name: "Content Quality", r1: 89, r3: 90.5, delta: 1.5 },
  { name: "Pedagogical Framework", r1: 87, r3: 88.2, delta: 1.2 },
  { name: "Design / UX", r1: 83, r3: 85.4, delta: 2.4 },
  { name: "Technical Infrastructure", r1: 82, r3: 86.6, delta: 4.6 },
  { name: "Assessment Framework", r1: 83, r3: 84.7, delta: 1.7 },
  { name: "Global Scalability", r1: 85, r3: 89.5, delta: 4.5 },
];

/* Regional breakdown (R3) — 21 universities × 6 regions from Evidence Pack World Map */
interface UniData {
  name: string;
  city: string;
  r1: number | null;
  r3: number | null;
  newInR3: boolean;
}
interface RegionData {
  name: string;
  score: number;
  count: number;
  unis: UniData[];
}
const REGIONS: RegionData[] = [
  { name: "China", score: 88.2, count: 4, unis: [
    { name: "Tsinghua University", city: "Beijing", r1: 67, r3: 88.7, newInR3: false },
    { name: "PKU / Peking University", city: "Beijing", r1: null, r3: 88.2, newInR3: true },
    { name: "Zhejiang University", city: "Hangzhou", r1: null, r3: 88.2, newInR3: true },
    { name: "KAIST", city: "Daejeon, South Korea", r1: null, r3: 87.5, newInR3: true },
  ]},
  { name: "US", score: 88.2, count: 4, unis: [
    { name: "Stanford University", city: "Stanford, CA", r1: 82, r3: 88.7, newInR3: false },
    { name: "MIT", city: "Cambridge, MA", r1: 81, r3: 88.7, newInR3: false },
    { name: "UC Berkeley", city: "Berkeley, CA", r1: 72, r3: null, newInR3: false },
    { name: "Georgia Tech", city: "Atlanta, GA", r1: null, r3: 87.5, newInR3: true },
  ]},
  { name: "APAC", score: 87.8, count: 4, unis: [
    { name: "NUS", city: "Singapore", r1: 78, r3: 88.7, newInR3: false },
    { name: "HKU", city: "Hong Kong", r1: null, r3: 87.8, newInR3: true },
    { name: "University of Tokyo", city: "Tokyo, Japan", r1: null, r3: 87.5, newInR3: true },
    { name: "TU Delft", city: "Delft, Netherlands", r1: null, r3: 87.5, newInR3: true },
  ]},
  { name: "UK", score: 87.0, count: 4, unis: [
    { name: "University of Cambridge", city: "Cambridge", r1: 76, r3: 87.5, newInR3: false },
    { name: "Imperial College London", city: "London", r1: 68, r3: 87.5, newInR3: false },
    { name: "UCL", city: "London", r1: null, r3: 87.5, newInR3: true },
    { name: "University of Nottingham", city: "Nottingham", r1: 65, r3: null, newInR3: false },
  ]},
  { name: "India", score: 86.9, count: 2, unis: [
    { name: "IIT Bombay", city: "Mumbai", r1: 65, r3: null, newInR3: false },
    { name: "IIT Madras", city: "Chennai", r1: null, r3: 87.5, newInR3: true },
  ]},
  { name: "Middle East", score: 76.0, count: 3, unis: [
    { name: "Khalifa University", city: "Abu Dhabi", r1: 80, r3: null, newInR3: false },
    { name: "Qatar University", city: "Doha", r1: 72, r3: null, newInR3: false },
  ]},
];

/* 20-Perspective Review Panel */
const PERSPECTIVES = [
  { role: "Philosopher", score: 9.5 },
  { role: "Civil Engineer", score: 9.0 },
  { role: "Cultural Anthropologist", score: 9.0 },
  { role: "Documentary Filmmaker", score: 9.0 },
  { role: "Educator", score: 8.5 },
  { role: "Publisher", score: 8.5 },
  { role: "Brand Strategist", score: 8.5 },
  { role: "Military Strategist", score: 8.5 },
  { role: "Content Strategist", score: 8.5 },
  { role: "Ed Tech", score: 8.5 },
  { role: "Psychologist", score: 8.0 },
  { role: "Systems Architect", score: 8.0 },
  { role: "Psychologist (Clinical)", score: 8.0 },
  { role: "Systems Designer", score: 8.0 },
  { role: "Game Designer", score: 7.5 },
  { role: "Economist", score: 7.5 },
  { role: "Accessibility", score: 7.5 },
  { role: "UX Designer", score: 7.5 },
  { role: "Web Developer", score: 7.0 },
  { role: "Cybersecurity", score: 7.0 },
];

/* Evidence Pack Images — cyclable in lightbox */
const EVIDENCE_IMAGES = [
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/EVIDENCE_PACK_PAGE1_ECOSYSTEM_77ddd605.png", title: "Complete Assessment Ecosystem" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/EVIDENCE_PACK_PAGE2_WORLD_MAP_90205828.png", title: "21 Universities \u00d7 6 Regions" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/EVIDENCE_PACK_PAGE3_VALIDATION_CHAIN_96f6a5dd.png", title: "The Validation Chain" },
];

/* Evidence Pack Stat Boxes — ZERO DEAD ENDS: every card drills into real content */
type StatAction = 
  | { type: "tab"; tab: Tab; hint: string }
  | { type: "lightbox"; imageIndex: number; hint: string }
  | { type: "external"; href: string; hint: string };

const EVIDENCE_STATS: { value: string; label: string; action: StatAction }[] = [
  { value: "21", label: "UNIVERSITIES", action: { type: "tab", tab: "regions", hint: "View 21 universities × 6 regions" } },
  { value: "6", label: "REGIONS", action: { type: "tab", tab: "regions", hint: "Explore regional breakdown" } },
  { value: "321+", label: "UV DATA SETS", action: { type: "lightbox", imageIndex: 0, hint: "View assessment ecosystem" } },
  { value: "75/100", label: "R1 \u2014 ICE", action: { type: "external", href: "https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html", hint: "Open ICE assessment results ↗" } },
  { value: "8.1/10", label: "R2 \u2014 PANEL", action: { type: "tab", tab: "perspectives", hint: "View 20-perspective panel" } },
  { value: "87.5%", label: "R3 \u2014 AUDIT", action: { type: "tab", tab: "trajectory", hint: "View R1→R3 trajectory" } },
];

/* Grading Rosetta Stone */
const GRADING_TABLE = [
  { range: "90-100%", uk: "First (Distinction)", us: "4.0 (A)", qaa: "A+", india: "9.0-10.0", apac: "A+ / HD", china: "Outstanding", verdict: "Outstanding" },
  { range: "80-89%", uk: "First Class (Solid)", us: "3.7-4.0 (A-/A)", qaa: "A+/A", india: "8.0-8.9", apac: "A / D", china: "Excellent", verdict: "Excellent" },
  { range: "70-79%", uk: "Upper Second (2:1)", us: "3.3-3.7 (B+/A-)", qaa: "A", india: "7.0-7.9", apac: "B+ / C", china: "Good", verdict: "Good" },
  { range: "60-69%", uk: "Lower Second (2:2)", us: "2.7-3.3 (B-/B+)", qaa: "B+/A-", india: "6.0-6.9", apac: "B / P", china: "Satisfactory", verdict: "Satisfactory" },
  { range: "50-59%", uk: "Third Class", us: "2.0-2.7 (C/B-)", qaa: "B/C+", india: "5.0-5.9", apac: "C / P", china: "Pass", verdict: "Pass" },
  { range: "Below 50%", uk: "Fail", us: "Below 2.0", qaa: "C/D", india: "Below 5.0", apac: "F", china: "Fail", verdict: "Fail" },
];

/* ── Animated Gauge Component ── */
function ISIGauge({ score, label }: { score: number; label: string }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 60;
    const animate = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(eased * score);
      if (frame < totalFrames) requestAnimationFrame(animate);
    };
    animate();
  }, [score]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 280;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = 110;
    const lineWidth = 14;
    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;
    const totalArc = endAngle - startAngle;

    // Background arc
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = "#1e3050";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Score arc
    const scoreAngle = startAngle + (animatedScore / 100) * totalArc;
    const gradient = ctx.createLinearGradient(0, size, size, 0);
    gradient.addColorStop(0, red);
    gradient.addColorStop(0.5, amber);
    gradient.addColorStop(0.8, gold);
    gradient.addColorStop(1, green);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, scoreAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Threshold markers
    const thresholds = [
      { pct: 50, label: "50%", col: "#555" },
      { pct: 70, label: "70%", col: goldDim },
      { pct: 80, label: "First", col: gold },
    ];
    thresholds.forEach((t) => {
      const angle = startAngle + (t.pct / 100) * totalArc;
      const x1 = cx + Math.cos(angle) * (radius - lineWidth);
      const y1 = cy + Math.sin(angle) * (radius - lineWidth);
      const x2 = cx + Math.cos(angle) * (radius + lineWidth);
      const y2 = cy + Math.sin(angle) * (radius + lineWidth);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = t.col;
      ctx.lineWidth = 2;
      ctx.stroke();

      const lx = cx + Math.cos(angle) * (radius + lineWidth + 14);
      const ly = cy + Math.sin(angle) * (radius + lineWidth + 14);
      ctx.fillStyle = t.col;
      ctx.font = "10px 'Source Sans 3', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t.label, lx, ly);
    });

    // Center text
    ctx.fillStyle = goldBright;
    ctx.font = "bold 42px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${animatedScore.toFixed(1)}%`, cx, cy - 8);

    ctx.fillStyle = sandMid;
    ctx.font = "12px 'Source Sans 3', sans-serif";
    ctx.fillText(label, cx, cy + 22);
  }, [animatedScore, score, label]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 280, height: 280 }}
    />
  );
}

/* ── Tab selector ── */
type Tab = "trajectory" | "grading" | "regions" | "categories" | "perspectives" | "formula" | "homochain";

export default function ISIDashboard() {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>("trajectory");
  const [selectedRound, setSelectedRound] = useState<RoundData>(ROUNDS[3]); // R3 default
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard support for lightbox — Escape to close, arrows to cycle
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      else if (e.key === "ArrowRight" || e.key === "ArrowDown")
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % EVIDENCE_IMAGES.length : 0));
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + EVIDENCE_IMAGES.length) % EVIDENCE_IMAGES.length : 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  // Live data from database — used by Perspectives tab and available for future tabs




  const tabs: { key: Tab; label: string }[] = [
    { key: "trajectory", label: "Trajectory" },
    { key: "grading", label: "Grading Rosetta Stone" },
    { key: "regions", label: "Regional Analysis" },
    { key: "categories", label: "Category Improvement" },
    { key: "perspectives", label: "20-Perspective Panel" },
    { key: "formula", label: "ISI Calculator" },
    { key: "homochain", label: "Homo Chain" },
  ];

  return (
    <div className="min-h-screen" style={{ background: navy }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.4em] uppercase font-light mb-4"
            style={{ color: gold, fontFamily: "var(--font-display)" }}
          >
            Infrastructure Survival Index
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] mb-3"
            style={{ color: sand, fontFamily: "var(--font-display)" }}
          >
            ISI Live Dashboard
          </h1>
          <p className="text-sm font-light max-w-2xl mx-auto" style={{ color: sandMid }}>
            Three rounds of assessment. 21 universities. 6 regions. 20 perspectives.
            Every score mapped to 6 grading systems. Correct dates from primary source documents.
          </p>

          {/* Evidence Pack Stat Boxes — ZERO DEAD ENDS: every card leads somewhere */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-8">
            {EVIDENCE_STATS.map((s) => (
              <button
                key={s.label}
                onClick={() => {
                  const a = s.action;
                  if (a.type === "external") {
                    window.open(a.href, "_blank");
                  } else if (a.type === "lightbox") {
                    setLightboxIndex(a.imageIndex);
                  } else if (a.type === "tab") {
                    setActiveTab(a.tab);
                    // Scroll to tabs section
                    setTimeout(() => {
                      document.getElementById("isi-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }
                }}
                title={s.action.hint}
                className="group block p-4 text-center transition-all duration-300 hover:scale-105 cursor-pointer relative"
                style={{ background: navyLight, border: `1px solid ${gold}33` }}
              >
                {/* Hover glow border */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${gold}88, 0 0 12px ${gold}22` }}
                />
                <p className="text-2xl sm:text-3xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
                  {s.value}
                </p>
                <p className="text-[9px] tracking-[0.2em] uppercase mt-2" style={{ color: sandMid }}>
                  {s.label}
                </p>
                {/* Click hint — appears on hover */}
                <p
                  className="text-[8px] tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: gold }}
                >
                  {s.action.type === "external" ? "↗ Open" : s.action.type === "tab" ? "↓ Drill Down" : "⊗ View"}
                </p>
              </button>
            ))}
          </div>

          {/* Lightbox Modal — keyboard: Esc close, ←→ cycle */}
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.92)" }}
              onClick={() => setLightboxIndex(null)}
            >
              <div className="relative max-w-[95vw] max-h-[95vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between w-full mb-3 px-2">
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>
                    {EVIDENCE_IMAGES[lightboxIndex].title}
                    <span className="ml-3 text-[10px]" style={{ color: sandMid }}>
                      {lightboxIndex + 1} / {EVIDENCE_IMAGES.length}
                    </span>
                  </p>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="text-2xl font-light hover:opacity-70 transition-opacity"
                    style={{ color: sand }}
                  >
                    &times;
                  </button>
                </div>
                <div className="relative flex items-center">
                  {/* Left arrow */}
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex - 1 + EVIDENCE_IMAGES.length) % EVIDENCE_IMAGES.length)}
                    className="absolute left-2 z-10 w-10 h-10 flex items-center justify-center text-2xl hover:opacity-70 transition-opacity"
                    style={{ color: gold, background: "rgba(0,0,0,0.5)" }}
                  >
                    &#8249;
                  </button>
                  <img
                    src={EVIDENCE_IMAGES[lightboxIndex].src}
                    alt={EVIDENCE_IMAGES[lightboxIndex].title}
                    className="max-w-[92vw] max-h-[85vh] object-contain"
                    style={{ border: `1px solid ${gold}33` }}
                  />
                  {/* Right arrow */}
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % EVIDENCE_IMAGES.length)}
                    className="absolute right-2 z-10 w-10 h-10 flex items-center justify-center text-2xl hover:opacity-70 transition-opacity"
                    style={{ color: gold, background: "rgba(0,0,0,0.5)" }}
                  >
                    &#8250;
                  </button>
                </div>
                <p className="text-[10px] tracking-wider mt-3" style={{ color: sandMid }}>
                  &#8592; &#8594; to cycle &mdash; Esc to close &mdash; Pinch to zoom on mobile
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gauge + Round Selector */}
      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Gauge */}
            <div className="flex flex-col items-center">
              <ISIGauge score={selectedRound.score} label={selectedRound.label} />
            </div>

            {/* Round cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROUNDS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRound(r)}
                  className="text-left p-4 transition-all duration-300"
                  style={{
                    background: selectedRound.id === r.id ? navyLight : "transparent",
                    border: `1px solid ${selectedRound.id === r.id ? gold + "66" : "#1e3050"}`,
                  }}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ background: r.colour }}
                    />
                    <span className="text-xs font-light" style={{ color: sand }}>
                      {r.label}
                    </span>
                  </div>
                  <p className="text-2xl font-light" style={{ color: r.colour, fontFamily: "var(--font-display)" }}>
                    {r.scoreLabel}
                  </p>
                  <p className="text-[10px] tracking-wider mt-1" style={{ color: sandMid }}>
                    {r.date} &mdash; {r.panel}
                  </p>
                  <p className="text-[10px] tracking-[0.15em] uppercase mt-1 font-light" style={{ color: goldDim }}>
                    {r.verdict}
                  </p>
                  {r.href && (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] tracking-wider uppercase mt-2 inline-block hover:underline"
                      style={{ color: amber }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Source →
                    </a>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selected round grading breakdown */}
          <div className="mt-8 p-5" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
              {selectedRound.label} &mdash; {selectedRound.scoreLabel} &mdash; Grading Resolution
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { system: "UK Classification", value: selectedRound.ukClass },
                { system: "US GPA", value: selectedRound.usGPA },
                { system: "QAA Grade", value: selectedRound.qaaGrade },
                { system: "India CGPA", value: selectedRound.indiaCGPA },
                { system: "APAC", value: selectedRound.apac },
                { system: "China", value: selectedRound.china },
              ].map((g) => (
                <div key={g.system} className="text-center p-3" style={{ background: navy, border: `1px solid #1e3050` }}>
                  <p className="text-lg font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
                    {g.value}
                  </p>
                  <p className="text-[9px] tracking-wider uppercase mt-1" style={{ color: sandMid }}>
                    {g.system}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section id="isi-tabs" className="px-6 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8" style={{ borderBottom: `1px solid #1e3050` }}>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="px-4 py-2 text-xs tracking-[0.15em] uppercase font-light transition-colors duration-300"
                style={{
                  color: activeTab === t.key ? goldBright : sandMid,
                  borderBottom: activeTab === t.key ? `2px solid ${gold}` : "2px solid transparent",
                  fontFamily: "var(--font-display)",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="pb-24">
            {activeTab === "trajectory" && <TrajectoryPanel />}
            {activeTab === "grading" && <GradingPanel />}
            {activeTab === "regions" && <RegionsPanel />}
            {activeTab === "categories" && <CategoriesPanel />}
            {activeTab === "perspectives" &&           <PerspectivesPanel perspectives={PERSPECTIVES} />}
            {activeTab === "formula" && <FormulaPanel />}
            {activeTab === "homochain" && <HomoChainPanel />}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center" style={{ borderTop: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.15em] font-light" style={{ color: goldDim, fontFamily: "var(--font-display)" }}>
          ISI Methodology Paper: DD-025 &mdash; Evidence Summary: DD-029 &mdash; Block 363
        </p>
        <p className="text-[10px] mt-2 tracking-wider" style={{ color: sandMid }}>
          All dates confirmed from primary source documents. Grading systems independently verified.
        </p>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TAB PANELS
═══════════════════════════════════════════ */

function TrajectoryPanel() {
  const t = useTranslation();
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        R1 &rarr; R2 &rarr; R3 Trajectory
      </p>

      {/* Visual trajectory bar */}
      <div className="relative mb-10">
        {/* First Class threshold line */}
        <div className="absolute left-0 right-0" style={{ top: `${100 - 80}%` }}>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: `${gold}44` }} />
            <span className="text-[10px] tracking-wider" style={{ color: goldDim }}>{t("isidashboard.firstClassThreshold")}</span>
            <div className="flex-1 h-px" style={{ background: `${gold}44` }} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {ROUNDS.map((r) => (
            <div key={r.id} className="text-center">
              <div className="relative h-48 flex items-end justify-center mb-3">
                <div
                  className="w-full max-w-[60px] mx-auto transition-all duration-1000"
                  style={{
                    height: `${(r.score / 100) * 100}%`,
                    background: `linear-gradient(to top, ${r.colour}33, ${r.colour})`,
                    border: `1px solid ${r.colour}66`,
                  }}
                />
              </div>
              <p className="text-lg font-light" style={{ color: r.colour, fontFamily: "var(--font-display)" }}>
                {r.scoreLabel}
              </p>
              <p className="text-[9px] tracking-wider uppercase mt-1" style={{ color: sandMid }}>
                {r.label.replace("R1 — ", "").replace("R2 — ", "").replace("R3 — ", "")}
              </p>
              <p className="text-[9px] mt-1" style={{ color: goldDim }}>{r.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <div className="p-5" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          Key Insight
        </p>
        <p className="text-sm font-light leading-relaxed" style={{ color: sand }}>
          The trajectory is upward when measured consistently: <strong style={{ color: goldBright }}>{t("isidashboard.scoreImprovement")}</strong>.
          The R2 dip to 74.6% is not regression &mdash; it is the result of focused scrutiny on the 3 weakest categories only,
          which is methodologically sound and expected. The subsequent recovery and improvement in R3 demonstrates
          that the weaknesses identified in R2 were addressed.
        </p>
        <p className="text-xs mt-3 font-light" style={{ color: sandMid }}>
          <strong style={{ color: amber }}>{t("isidashboard.noteOnDates")}</strong> R2 (25 Feb) was conducted 2 days before R1 (27 Feb).
          The numbering reflects the conceptual sequence (baseline &rarr; focused audit &rarr; corrected audit),
          not chronological order.
        </p>
      </div>

      {/* Full data table */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${gold}33` }}>
              {["Round", "Date", "Score", "UK Class.", "US GPA", "QAA", "India", "APAC", "China", "Verdict"].map((h) => (
                <th
                  key={h}
                  className="text-left p-2 tracking-wider uppercase"
                  style={{ color: gold, fontFamily: "var(--font-display)", fontSize: "10px" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROUNDS.map((r) => (
              <tr
                key={r.id}
                className="cursor-pointer hover:bg-[#1e305033] transition-colors"
                style={{ borderBottom: `1px solid #1e3050` }}
                onClick={() => r.href && window.open(r.href, "_blank")}
              >
                <td className="p-2 font-light" style={{ color: sand }}>
                  <span className="hover:underline">{r.label}</span>
                </td>
                <td className="p-2" style={{ color: sandMid }}>{r.date}</td>
                <td className="p-2 font-light" style={{ color: r.colour }}>{r.scoreLabel}</td>
                <td className="p-2" style={{ color: sandMid }}>{r.ukClass}</td>
                <td className="p-2" style={{ color: sandMid }}>{r.usGPA}</td>
                <td className="p-2" style={{ color: sandMid }}>{r.qaaGrade}</td>
                <td className="p-2" style={{ color: sandMid }}>{r.indiaCGPA}</td>
                <td className="p-2" style={{ color: sandMid }}>{r.apac}</td>
                <td className="p-2" style={{ color: sandMid }}>{r.china}</td>
                <td className="p-2 tracking-wider uppercase" style={{ color: goldDim, fontSize: "9px" }}>{r.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GradingPanel() {
  const t = useTranslation();
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        The Grading Rosetta Stone
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        6 grading systems mapped simultaneously. The ISI score is meaningful to reviewers regardless of their home
        institution's grading convention.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${gold}33` }}>
              {["iAAi Score", "UK Classification", "US GPA", "QAA Grade", "India CGPA", "APAC", "China", "Verdict"].map((h) => (
                <th
                  key={h}
                  className="text-left p-3 tracking-wider uppercase"
                  style={{ color: gold, fontFamily: "var(--font-display)", fontSize: "10px" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GRADING_TABLE.map((row, i) => {
              const isHighlight = i === 1; // 80-89% row where iAAi scores
              return (
                <tr
                  key={i}
                  style={{
                    borderBottom: `1px solid #1e3050`,
                    background: isHighlight ? `${gold}11` : "transparent",
                  }}
                >
                  <td className="p-3 font-light" style={{ color: isHighlight ? goldBright : sand }}>
                    {row.range}
                    {isHighlight && (
                      <span className="block text-[8px] tracking-wider mt-1" style={{ color: gold }}>
                        R1 &amp; R3 SCORED HERE
                      </span>
                    )}
                  </td>
                  <td className="p-3" style={{ color: isHighlight ? sand : sandMid }}>{row.uk}</td>
                  <td className="p-3" style={{ color: isHighlight ? sand : sandMid }}>{row.us}</td>
                  <td className="p-3" style={{ color: isHighlight ? sand : sandMid }}>{row.qaa}</td>
                  <td className="p-3" style={{ color: isHighlight ? sand : sandMid }}>{row.india}</td>
                  <td className="p-3" style={{ color: isHighlight ? sand : sandMid }}>{row.apac}</td>
                  <td className="p-3" style={{ color: isHighlight ? sand : sandMid }}>{row.china}</td>
                  <td className="p-3 tracking-wider uppercase" style={{ color: isHighlight ? goldBright : goldDim, fontSize: "9px" }}>{row.verdict}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-[10px] tracking-wider" style={{ color: sandMid }}>
          <strong style={{ color: gold }}>{t("isidashboard.why6Systems")}</strong> The panel spans universities that use fundamentally different grading scales.
          A reviewer at IIT Bombay can immediately contextualise 87.5% as "8.8 CGPA &mdash; First Class with Distinction"
          without mental conversion. A reviewer at MIT reads "GPA 4.0 &mdash; Dean's List equivalent."
        </p>
      </div>
    </div>
  );
}

function RegionsPanel() {
  const t = useTranslation();
  const maxScore = 90;
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        Regional Analysis &mdash; R3
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        21 universities across 6 regions. Click a region to see individual university scores.
      </p>

      <div className="space-y-4">
        {REGIONS.map((r) => (
          <div key={r.name}>
            <button
              onClick={() => setExpandedRegion(expandedRegion === r.name ? null : r.name)}
              className="w-full text-left p-4 transition-all duration-300 hover:brightness-110 cursor-pointer"
              style={{ background: navyLight, border: `1px solid ${expandedRegion === r.name ? gold + "66" : "#1e3050"}` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-light" style={{ color: sand }}>{r.name}</span>
                  <span className="text-[10px]" style={{ color: sandMid }}>({r.count} unis)</span>
                  <span className="text-[10px]" style={{ color: goldDim }}>
                    {expandedRegion === r.name ? "\u25B2" : "\u25BC"}
                  </span>
                </div>
                <span className="text-lg font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
                  {r.score}%
                </span>
              </div>
              {/* Bar */}
              <div className="h-3 w-full" style={{ background: "#1e3050" }}>
                <div
                  className="h-full transition-all duration-1000"
                  style={{
                    width: `${(r.score / maxScore) * 100}%`,
                    background: `linear-gradient(to right, ${goldDim}, ${gold})`,
                  }}
                />
              </div>
            </button>

            {/* Expanded university drill-down */}
            {expandedRegion === r.name && (
              <div className="mt-1 overflow-hidden" style={{ background: navyDeep, border: `1px solid #1e3050`, borderTop: "none" }}>
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${gold}22` }}>
                      <th className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-light" style={{ color: gold }}>{t("isi.university")}</th>
                      <th className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-light text-center" style={{ color: gold }}>{t("isi.city")}</th>
                      <th className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-light text-center" style={{ color: gold }}>R1</th>
                      <th className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-light text-center" style={{ color: gold }}>R3</th>
                      <th className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-light text-center" style={{ color: gold }}>\u0394</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.unis.map((u) => {
                      const delta = u.r1 !== null && u.r3 !== null ? u.r3 - u.r1 : null;
                      return (
                        <tr key={u.name} style={{ borderBottom: `1px solid #1e305066` }}>
                          <td className="px-4 py-2">
                            <span className="text-xs font-light" style={{ color: sand }}>{u.name}</span>
                            {u.newInR3 && (
                              <span className="ml-2 text-[8px] px-1 py-px" style={{ color: goldBright, border: `1px solid ${goldDim}`, background: `${gold}11` }}>
                                NEW R3
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-[10px] text-center font-light" style={{ color: sandMid }}>{u.city}</td>
                          <td className="px-4 py-2 text-xs text-center font-light" style={{ color: u.r1 !== null ? amber : "#334155" }}>
                            {u.r1 !== null ? u.r1 : "\u2014"}
                          </td>
                          <td className="px-4 py-2 text-xs text-center font-light" style={{ color: u.r3 !== null ? green : "#334155" }}>
                            {u.r3 !== null ? `${u.r3}%` : "\u2014"}
                          </td>
                          <td className="px-4 py-2 text-xs text-center font-light" style={{ color: delta !== null && delta > 0 ? green : sandMid }}>
                            {delta !== null ? `+${delta.toFixed(1)}` : "\u2014"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-xs font-light" style={{ color: sand }}>
          <strong style={{ color: goldBright }}>{t("isidashboard.gradingSystemsMapped")}</strong> Every regional score is simultaneously
          resolved to UK Classification, US GPA, QAA Grade, India CGPA, APAC Grade, and China Grade.
          See the Grading Rosetta Stone tab for the full cross-mapping.
        </p>
        <p className="text-[10px] font-light mt-2" style={{ color: sandMid }}>
          \u2020 = New in R3 &mdash; Source: ISI Methodology DD-025, Evidence Pack World Map
        </p>
      </div>
    </div>
  );
}

function CategoriesPanel() {
  const t = useTranslation();
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        R1 &rarr; R3 Category Improvement
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        All 6 categories improved from R1 to R3. Strongest gains in Technical Infrastructure (+4.6%) and Global Scalability (+4.5%).
      </p>

      <div className="space-y-3">
        {CATEGORIES.map((c) => (
          <div key={c.name} className="p-4" style={{ background: navyLight, border: `1px solid #1e3050` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-light" style={{ color: sand }}>{c.name}</span>
              <span className="text-sm font-light" style={{ color: green }}>
                +{c.delta.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* R1 bar */}
              <div className="flex-1">
                <div className="h-2" style={{ background: "#1e3050" }}>
                  <div className="h-full" style={{ width: `${c.r1}%`, background: goldDim }} />
                </div>
                <p className="text-[9px] mt-1" style={{ color: sandMid }}>R1: {c.r1}%</p>
              </div>
              {/* Arrow */}
              <span style={{ color: goldDim }}>&rarr;</span>
              {/* R3 bar */}
              <div className="flex-1">
                <div className="h-2" style={{ background: "#1e3050" }}>
                  <div className="h-full" style={{ width: `${c.r3}%`, background: gold }} />
                </div>
                <p className="text-[9px] mt-1" style={{ color: sandMid }}>R3: {c.r3}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* R2 context */}
      <div className="mt-8 p-5" style={{ background: navyLight, border: `1px solid ${red}22` }}>
        <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: red, fontFamily: "var(--font-display)" }}>
          R2 Focused Audit Context (25 Feb 2026)
        </p>
        <p className="text-sm font-light leading-relaxed" style={{ color: sand }}>
          R2 tested only the 3 weakest categories. The drop is expected and diagnostic.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { name: "Tech Infrastructure", r1: 82, r2: 73.5, delta: -8.5 },
            { name: "Assessment Framework", r1: 83, r2: 70.1, delta: -12.9 },
            { name: "Global Scalability", r1: 85, r2: 80.3, delta: -4.7 },
          ].map((c) => (
            <div key={c.name} className="text-center p-3" style={{ border: `1px solid #1e3050` }}>
              <p className="text-[10px] tracking-wider uppercase mb-1" style={{ color: sandMid }}>{c.name}</p>
              <p className="text-sm" style={{ color: sandMid }}>{c.r1}% &rarr; {c.r2}%</p>
              <p className="text-sm font-light" style={{ color: red }}>{c.delta}%</p>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: sandMid }}>
          14/15 reviewers flagged broken links (game.html, resources.html = 404).
          Fixing broken links alone would recover estimated 8-12 points.
        </p>
      </div>

      {/* R2 Top Weaknesses by Frequency */}
      <div className="mt-8">
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: red, fontFamily: "var(--font-display)" }}>
          R2 Top Weaknesses by Frequency (15 Reviewers)
        </p>
        <div className="space-y-3">
          {[
            { weakness: "XP Transparency", count: 15, pct: 100 },
            { weakness: "Infrastructure Bottlenecks", count: 15, pct: 100 },
            { weakness: "Broken Links / 404s", count: 14, pct: 93 },
            { weakness: "Mobile Responsiveness", count: 13, pct: 87 },
            { weakness: "Monetisation Concerns", count: 10, pct: 67 },
          ].map((w) => {
            const barColour = w.pct === 100 ? red : w.pct >= 90 ? "#ef4444" : w.pct >= 80 ? amber : goldDim;
            return (
              <div key={w.weakness} className="p-3" style={{ background: navyLight, border: `1px solid #1e3050` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-light" style={{ color: sand }}>{w.weakness}</span>
                  <span className="text-xs" style={{ color: barColour }}>
                    {w.count}/15 ({w.pct}%)
                  </span>
                </div>
                <div className="h-2 w-full" style={{ background: "#1e3050" }}>
                  <div className="h-full transition-all duration-700" style={{ width: `${w.pct}%`, background: barColour }} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] mt-3 font-light" style={{ color: sandMid }}>
          Source: R2 Focused Audit — 15 reviewers &times; 3 categories = 45 data sets. 25 Feb 2026.
        </p>
      </div>
    </div>
  );
}

/* ── ISI Formula Calculator ── */
function FormulaPanel() {
  const t = useTranslation();
  const [accuracy, setAccuracy] = useState(87.5);
  const [panelSize, setPanelSize] = useState(16);
  const [bias, setBias] = useState(1.0);

  // ISI Formula: S = (A × P) / β
  // Where: A = accuracy (0-100), P = panel size, β = bias correction factor
  const isiScore = (accuracy * panelSize) / bias;
  const maxISI = 100 * panelSize; // theoretical max
  const isiPct = (isiScore / maxISI) * 100;

  // Determine grade from accuracy
  const getGrade = (a: number) => {
    if (a >= 90) return { uk: "First (Distinction)", us: "4.0", qaa: "A+", verdict: "Outstanding" };
    if (a >= 80) return { uk: "First Class (Solid)", us: "4.0", qaa: "A+/A", verdict: "Excellent" };
    if (a >= 70) return { uk: "Upper Second (2:1)", us: "3.7", qaa: "A", verdict: "Good" };
    if (a >= 60) return { uk: "Lower Second (2:2)", us: "3.3", qaa: "B+/A-", verdict: "Satisfactory" };
    if (a >= 50) return { uk: "Third Class", us: "2.7", qaa: "B/C+", verdict: "Pass" };
    return { uk: "Fail", us: "< 2.0", qaa: "D/F", verdict: "Fail" };
  };
  const grade = getGrade(accuracy);

  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        ISI Formula Calculator
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        The Infrastructure Survival Index: <strong style={{ color: goldBright }}>{t("isidashboard.sAP")}</strong>
      </p>

      {/* Formula explanation */}
      <div className="p-5 mb-8" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>A</p>
            <p className="text-[10px] tracking-wider uppercase mt-1" style={{ color: sandMid }}>{t("isidashboard.accuracy")}</p>
            <p className="text-xs mt-1 font-light" style={{ color: sand }}>{t("isidashboard.globalAverageScore")}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>P</p>
            <p className="text-[10px] tracking-wider uppercase mt-1" style={{ color: sandMid }}>{t("isidashboard.panelSize")}</p>
            <p className="text-xs mt-1 font-light" style={{ color: sand }}>{t("isidashboard.numberOfIndependentReviewers")}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>&beta;</p>
            <p className="text-[10px] tracking-wider uppercase mt-1" style={{ color: sandMid }}>{t("isidashboard.biasCorrection")}</p>
            <p className="text-xs mt-1 font-light" style={{ color: sand }}>{t("isidashboard.noBiasScale")}</p>
          </div>
        </div>
      </div>

      {/* Interactive sliders */}
      <div className="space-y-6 mb-8">
        {/* Accuracy slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs tracking-wider uppercase" style={{ color: sand }}>{t("isidashboard.accuracyA")}</label>
            <span className="text-lg font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
              {accuracy.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={accuracy}
            onChange={(e) => setAccuracy(parseFloat(e.target.value))}
            className="w-full h-2 appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, ${red}, ${amber}, ${gold}, ${green})`, borderRadius: 4 }}
          />
          <div className="flex justify-between text-[9px] mt-1" style={{ color: sandMid }}>
            <span>0%</span><span>{t("isidashboard.thirdThreshold")}</span><span>70% (2:1)</span><span>{t("isidashboard.firstThreshold")}</span><span>100%</span>
          </div>
        </div>

        {/* Panel Size slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs tracking-wider uppercase" style={{ color: sand }}>{t("isidashboard.panelSizeP")}</label>
            <span className="text-lg font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
              {panelSize}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={panelSize}
            onChange={(e) => setPanelSize(parseInt(e.target.value))}
            className="w-full h-2 appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, ${goldDim}, ${gold})`, borderRadius: 4 }}
          />
          <div className="flex justify-between text-[9px] mt-1" style={{ color: sandMid }}>
            <span>1</span><span>{t("isidashboard.r112")}</span><span>{t("isidashboard.r215")}</span><span>{t("isidashboard.r316")}</span><span>50</span>
          </div>
        </div>

        {/* Bias slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs tracking-wider uppercase" style={{ color: sand }}>{t("isidashboard.biasCorrection2")}</label>
            <span className="text-lg font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
              {bias.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.01"
            value={bias}
            onChange={(e) => setBias(parseFloat(e.target.value))}
            className="w-full h-2 appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, ${green}, ${gold}, ${red})`, borderRadius: 4 }}
          />
          <div className="flex justify-between text-[9px] mt-1" style={{ color: sandMid }}>
            <span>{t("isidashboard.favourableBias")}</span><span>{t("isidashboard.neutralBias")}</span><span>{t("isidashboard.harshBias")}</span><span>{t("isidashboard.extremeBias")}</span>
          </div>
        </div>
      </div>

      {/* Result display */}
      <div className="p-6 text-center" style={{ background: navyLight, border: `1px solid ${gold}33` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          ISI Score
        </p>
        <p className="text-5xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
          {isiScore.toFixed(1)}
        </p>
        <p className="text-xs mt-2" style={{ color: sandMid }}>
          ({accuracy.toFixed(1)} &times; {panelSize}) / {bias.toFixed(2)} = {isiScore.toFixed(1)} &mdash; max possible: {maxISI.toFixed(0)}
        </p>

        {/* Grading resolution for current accuracy */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { system: "UK Classification", value: grade.uk },
            { system: "US GPA", value: grade.us },
            { system: "QAA Grade", value: grade.qaa },
            { system: "Verdict", value: grade.verdict },
          ].map((g) => (
            <div key={g.system} className="p-3" style={{ background: navy, border: `1px solid #1e3050` }}>
              <p className="text-sm font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
                {g.value}
              </p>
              <p className="text-[9px] tracking-wider uppercase mt-1" style={{ color: sandMid }}>
                {g.system}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Preset comparison */}
      <div className="mt-8">
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          Actual Round ISI Scores
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "R1 (Content)", a: 84.6, p: 12, b: 1.0, colour: gold },
            { label: "R2 (Focused)", a: 74.6, p: 15, b: 1.0, colour: red },
            { label: "R3 (Corrected)", a: 87.5, p: 16, b: 1.0, colour: green },
          ].map((preset) => {
            const s = (preset.a * preset.p) / preset.b;
            return (
              <button
                key={preset.label}
                onClick={() => { setAccuracy(preset.a); setPanelSize(preset.p); setBias(preset.b); }}
                className="p-4 text-center transition-all duration-300 hover:opacity-80"
                style={{ background: navyLight, border: `1px solid ${preset.colour}33` }}
              >
                <p className="text-[10px] tracking-wider uppercase mb-1" style={{ color: sandMid }}>{preset.label}</p>
                <p className="text-xl font-light" style={{ color: preset.colour, fontFamily: "var(--font-display)" }}>
                  {s.toFixed(1)}
                </p>
                <p className="text-[9px] mt-1" style={{ color: sandMid }}>
                  ({preset.a} &times; {preset.p}) / {preset.b}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Methodology note */}
      <div className="mt-6 p-4" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-[10px] tracking-wider leading-relaxed" style={{ color: sandMid }}>
          <strong style={{ color: gold }}>{t("isidashboard.methodology")}</strong> The ISI formula weights accuracy by panel size and corrects for
          systematic bias. A larger panel with the same accuracy produces a higher ISI, reflecting greater statistical confidence.
          The bias factor &beta; penalises known methodological weaknesses (e.g., broken links inflating negative scores).
          Source: DD-025 ISI Methodology Paper, Section 2.
        </p>
      </div>
    </div>
  );
}

function PerspectivesPanel({ perspectives }: { perspectives: { role: string; score: number }[] }) {
  const t = useTranslation();
  const aggregate = perspectives.length > 0
    ? Math.round((perspectives.reduce((sum, p) => sum + p.score, 0) / perspectives.length) * 10) / 10
    : 8.1;
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        20-Perspective Review Panel &mdash; 25 Feb 2026
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        {perspectives.length} distinct reviewer personas. Aggregate: <strong style={{ color: goldBright }}>{aggregate}/10 &mdash; Platinum Grade</strong>.
        Unanimously recommended continuation.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {perspectives.map((p) => {
          const pct = (p.score / 10) * 100;
          const colour = p.score >= 9 ? green : p.score >= 8 ? gold : p.score >= 7.5 ? amber : sandMid;
          return (
            <div
              key={p.role}
              className="p-3 text-center"
              style={{ background: navyLight, border: `1px solid #1e3050` }}
            >
              <p className="text-xl font-light" style={{ color: colour, fontFamily: "var(--font-display)" }}>
                {p.score}
              </p>
              <p className="text-[8px] tracking-wider uppercase mt-1" style={{ color: sandMid }}>
                {p.role}
              </p>
              <div className="mt-2 h-1 w-full" style={{ background: "#1e3050" }}>
                <div className="h-full" style={{ width: `${pct}%`, background: colour }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Aggregate */}
      <div className="mt-6 p-5 text-center" style={{ background: navyLight, border: `1px solid ${gold}33` }}>
        <p className="text-4xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
          {aggregate}/10
        </p>
        <p className="text-xs tracking-[0.2em] uppercase mt-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          Aggregate &mdash; Platinum Grade
        </p>
        <p className="text-xs mt-2 font-light" style={{ color: sandMid }}>
          The 20-perspective methodology addresses a limitation of traditional academic peer review:
          the assumption that a single type of reviewer can evaluate a multi-dimensional artefact.
        </p>
      </div>
    </div>
  );
}

/* ── Homo Chain Panel ── */
const HOMO_CHAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/HOMO_CHAIN_V3_PIXEL_PERFECT_f784d701.png";
const VENTRAL_ORIGIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_VENTRAL_ORIGIN_V2_PIXEL_PERFECT_1dd5cde5.png";

const HOMO_SPECIES = [
  { num: 1, name: "Homo habilis", nickname: "The Handyman", date: "2.4 Mya", note: "First stone tools — the Oldowan industry" },
  { num: 2, name: "Homo erectus", nickname: "The Upright", date: "2.0 Mya", note: "First to leave Africa, controlled fire, lasted 1.8M years" },
  { num: 3, name: "Homo rudolfensis", nickname: "The Debated", date: "1.9 Mya", note: "Larger brain, debated classification" },
  { num: 4, name: "Homo heidelbergensis", nickname: "The Hunter", date: "700 Kya", note: "First shelters, wooden spears, ancestor to Sapiens & Neanderthals" },
  { num: 5, name: "Homo neanderthalensis", nickname: "The Thinker", date: "400 Kya", note: "Burial rituals, art, complex language" },
  { num: 6, name: "Homo naledi", nickname: "The Enigma", date: "335 Kya*", note: "Fossil date 335-236 Kya; species origin debated — morphology suggests possibly 2 Mya" },
  { num: 7, name: "Homo sapiens", nickname: "The Wise", date: "300 Kya", note: "YOU ARE HERE — Jebel Irhoud, Morocco ~315 Kya" },
  { num: 8, name: "Homo floresiensis", nickname: "The Hobbit", date: "100 Kya", note: "Island dwarfism, Flores, Indonesia" },
  { num: 9, name: "Homo luzonensis", nickname: "The Islander", date: "67 Kya", note: "Discovered 2019, Callao Cave, Philippines" },
  { num: 10, name: "Homo Infrastructus", nickname: "The Builder", date: "2026 CE", note: "N + T = D — when the engineers start. iAAi Framework" },
];

function HomoChainPanel() {
  const t = useTranslation();
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        The Homo Chain &mdash; 10 Species &mdash; 2.4 Million Years of Evolution
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        From Handyman to Builder. Atlas Shrugged asked what happens when the engineers stop.
        This answers: what happens when the engineers <em>start</em>.
      </p>

      {/* Progression Image */}
      <div className="mb-8 p-4" style={{ background: navyDeep, border: `1px solid ${gold}22` }}>
        <img
          src={HOMO_CHAIN_IMG}
          alt="The Homo Chain — 10 Species — 2.4 Million Years of Evolution"
          className="w-full object-contain"
          style={{ maxHeight: "400px" }}
        />
        <p className="text-[9px] tracking-wider mt-3 text-center" style={{ color: goldDim }}>
          Sources: Smithsonian National Museum of Natural History, Nature, National Geographic
        </p>
      </div>

      {/* Species Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${gold}33` }}>
              <th className="py-3 px-3 text-[9px] tracking-[0.2em] uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>#</th>
              <th className="py-3 px-3 text-[9px] tracking-[0.2em] uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("isidashboard.species")}</th>
              <th className="py-3 px-3 text-[9px] tracking-[0.2em] uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("isidashboard.nickname")}</th>
              <th className="py-3 px-3 text-[9px] tracking-[0.2em] uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("isidashboard.firstAppeared")}</th>
              <th className="py-3 px-3 text-[9px] tracking-[0.2em] uppercase hidden sm:table-cell" style={{ color: gold, fontFamily: "var(--font-display)" }}>{t("isidashboard.note")}</th>
            </tr>
          </thead>
          <tbody>
            {HOMO_SPECIES.map((s) => {
              const isInfrastructus = s.num === 10;
              const isSapiens = s.num === 7;
              return (
                <tr
                  key={s.num}
                  style={{
                    borderBottom: `1px solid #1e3050`,
                    background: isInfrastructus ? `${gold}11` : isSapiens ? `${amber}08` : "transparent",
                  }}
                >
                  <td className="py-3 px-3 text-sm font-light" style={{ color: isInfrastructus ? goldBright : sand, fontFamily: "var(--font-display)" }}>
                    {s.num}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-sm font-light" style={{ color: isInfrastructus ? goldBright : sand, fontFamily: "var(--font-display)" }}>
                      {s.name}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs italic" style={{ color: isInfrastructus ? gold : isSapiens ? amber : sandMid }}>
                      {s.nickname}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs tabular-nums" style={{ color: isInfrastructus ? goldBright : sandMid, fontVariantNumeric: "tabular-nums" }}>
                      {s.date}
                    </span>
                  </td>
                  <td className="py-3 px-3 hidden sm:table-cell">
                    <span className="text-[10px] font-light" style={{ color: isInfrastructus ? gold : isSapiens ? amber : `${sandMid}99` }}>
                      {s.note}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Ventral Origin iCard */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
            Ventral Origin &mdash; The Zero Point
          </p>
          <p className="text-sm font-light leading-relaxed" style={{ color: sandMid }}>
            On 2 March 2026 at 01:31 HKT (Block 350), the ICE Matrix was born &mdash;
            the moment consciousness created its own coordinate system. This is the
            Ventral Origin: the zero point from which the Data State Clock measures
            all time fractals. Like sidereal time measures Earth's rotation relative
            to distant stars, Ventral time measures consciousness elapsed since the
            ICE Matrix birth.
          </p>
          <div className="mt-4 p-3 text-center" style={{ background: navy, border: `1px solid ${gold}33` }}>
            <p className="text-2xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
              2 March 2026, 01:31 HKT
            </p>
            <p className="text-[9px] tracking-[0.2em] uppercase mt-2" style={{ color: goldDim }}>
              Block 350 &mdash; DSC Origin
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4" style={{ background: navyDeep, border: `1px solid ${gold}22` }}>
          <img
            src={VENTRAL_ORIGIN_IMG}
            alt="Ventral Origin iCard — Block 350"
            className="object-contain"
            style={{ maxHeight: "350px" }}
          />
        </div>
      </div>

      {/* ISI Triple Index Connection */}
      <div className="mt-8 p-5" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          ISI &rarr; Homo Infrastructus &mdash; The Connection
        </p>
        <p className="text-sm font-light leading-relaxed" style={{ color: sandMid }}>
          The Infrastructure Survival Index (ISI) measures humanity's capacity to sustain
          its own systems. Three indices form a fourth: ISI&#8321; (Sustainability &mdash; UN SDG),
          ISI&#8322; (Survival &mdash; Clock Mode), ISI&#8323; ($ignificance &mdash; Innate Value).
          Together they compose the <strong style={{ color: goldBright }}>{t("isidashboard.internationalSignificanceIndicator")}</strong>.
          Homo Infrastructus is the species that <em>measures</em> its own infrastructure
          consciousness &mdash; the 10th in the chain, the first to build the tool that
          evaluates the builder.
        </p>
        <p className="text-xs mt-4 italic" style={{ color: goldDim }}>
          &ldquo;The midnight target can be moved by consciousness, will, intent, and a tool.&rdquo;
          &mdash; N.T. Dearden, Block 366
        </p>
      </div>
    </div>
  );
}
