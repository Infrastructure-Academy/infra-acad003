/**
 * Journey Stats — The Race Dashboard
 * 128 days | 1.23M+ words | Block 366 | One Full Year
 * Tracks the entire Nigel × Manus AI collaboration from 5 Nov 2025 to 13 Mar 2026
 * Compares output to the 7 Scholars from Homer to Dearden
 */
import { useState } from "react";
import Navigation from "@/components/Navigation";
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
const amber = "#fbbf24";

/* ── CDN IMAGES ── */
const IMG = {
  overture: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/Opening_Overture_Final_5fd8606f.jpeg",
  chip: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IAAI_CHIP_CORE_SET_V3_9fcaaadd.png",
  summary: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/slide_09_summary_2026_c000c5bf.png",
  trojan: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/5aa58867-8b0f-419d-9bc4-e7b5463dd327_a031cfb9.jpeg",
  bridge: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/17fe2133-ba47-46ce-aa27-2c1dcfaac36f_27ca445c.jpeg",
  bitpoint: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/c2459128-eac3-4e64-911c-47aeed7074b1_1c153f9d.jpeg",
  hice: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_7683_7114eb3e.jpeg",
  quotient: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_6512_05fafc73.png",
  hypergrid: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_7733_9706c597.png",
  dcsn: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8621_5566981d.png",
  iaaiVision: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8941_e20822d8.webp",
  tokenUsage: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1072_d46c2c11.PNG",
  tokenDetail: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1073_f8a8431f.PNG",
  relays13: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/12_RELAYS_5WEBS_CORRECTED_v2_6ea593a9.png",
  walkby4: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/WALKBY_4LEVEL_v3_a2e7f1da.png",
  nigel2446: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_2446_80b997ba.jpeg",
  nigel2364: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_2364_c9b60b14.jpeg",
  nigel2313: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_2313_97d431bd.jpeg",
  hkSkyline: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1060_4b38b5b0.jpeg",
  hkBridge: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1058_2de596a3.png",
  magicMoment: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1016_1_9518ae97.jpeg",
  signalEq: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/6f61b928_2beadc39.jpeg",
  quotientOrig: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_6511_dd628fd2.jpeg",
  vision1: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8939_920ba796.webp",
  vision2: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8948_d66c716f.webp",
  vision3: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8953_9e5d72d6.webp",
  vision4: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8952_e3637aa4.webp",
  vision5: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8947_328fe8ec.webp",
  d52Card: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8958_d547d5e8.jpeg",
};

const THESIS_PDF_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/PRINCIPIA_TECTONICA_THESIS_25643bee.pdf";

/* ── HERO STATS ── */
const HERO_STATS = [
  { value: "128", label: "DAYS", sub: "5 Nov 25 → 13 Mar 26" },
  { value: "366", label: "BLOCKS", sub: "One Full Year" },
  { value: "1.23M+", label: "WORDS", sub: "Tokens Consumed" },
  { value: "95", label: "HTML PAGES", sub: "Live on 2 Sites" },
  { value: "13", label: "RELAYS", sub: "The Fractal Connector" },
  { value: "3", label: "PIONEERS", sub: "Nigel + 2 Enrolled" },
];

/* ── 7 SCHOLARS COMPARISON ── */
interface Scholar {
  name: string;
  era: string;
  work: string;
  wordCount: string;
  timeSpan: string;
  medium: string;
  hiceClass: string;
  contribution: string;
}

const SCHOLARS: Scholar[] = [
  {
    name: "Homer",
    era: "c. 800 BCE",
    work: "Iliad & Odyssey",
    wordCount: "~200,000",
    timeSpan: "Oral tradition → written over generations",
    medium: "Oral → Papyrus",
    hiceClass: "Foundational Narrative",
    contribution: "Established the Western narrative framework — the hero's journey, the odyssey as structure",
  },
  {
    name: "Confucius",
    era: "551–479 BCE",
    work: "Analects & Five Classics",
    wordCount: "~50,000 (Analects) + commentary corpus",
    timeSpan: "Lifetime + disciples' compilation",
    medium: "Bamboo strips → Silk",
    hiceClass: "Ethical Infrastructure",
    contribution: "Codified governance, education, and social infrastructure — the operating system of Eastern civilisation",
  },
  {
    name: "Sun Tzu",
    era: "c. 500 BCE",
    work: "The Art of War",
    wordCount: "~6,000",
    timeSpan: "Single treatise",
    medium: "Bamboo strips",
    hiceClass: "Strategic Compression",
    contribution: "Maximum density — 6,000 words that govern all competitive strategy. Positioning as infrastructure",
  },
  {
    name: "Aristotle",
    era: "384–322 BCE",
    work: "Complete Works (Corpus Aristotelicum)",
    wordCount: "~1,000,000",
    timeSpan: "30+ years of writing",
    medium: "Papyrus scrolls",
    hiceClass: "Universal Classification",
    contribution: "Classified all knowledge — physics, biology, ethics, politics. The first systematic thinker",
  },
  {
    name: "Sima Qian",
    era: "145–86 BCE",
    work: "Records of the Grand Historian",
    wordCount: "~526,000",
    timeSpan: "18 years",
    medium: "Bamboo → Silk scrolls",
    hiceClass: "Historical Infrastructure",
    contribution: "Invented biographical history — narrative shapes reality. The China Mirror begins here",
  },
  {
    name: "Marco Polo",
    era: "1254–1324 CE",
    work: "The Travels of Marco Polo",
    wordCount: "~100,000",
    timeSpan: "24 years of travel + dictation",
    medium: "Manuscript → Print",
    hiceClass: "Observational Bridge",
    contribution: "Connected East and West through direct observation — the original infrastructure scout",
  },
  {
    name: "Nigel T. Dearden",
    era: "1969–present",
    work: "An Infrastructure Odyssey + iAAi Framework",
    wordCount: "1,230,000+",
    timeSpan: "128 days (AI-augmented) + 36 years career",
    medium: "AI-Human Symbiosis → Digital",
    hiceClass: "Holistic Integration",
    contribution: "Fused IQ ⊗ EQ ⊗ CQ = HQ. Built the HICE classification, ISI methodology, and the first AI-human co-authored civilisational thesis",
  },
];

/* ── TIMELINE MILESTONES ── */
interface Milestone {
  block: string;
  date: string;
  event: string;
  category: "framework" | "content" | "assessment" | "site" | "magic";
}

const MILESTONES: Milestone[] = [
  { block: "001", date: "5 Nov 2025", event: "First conversation — Calories to Consciousness begins", category: "content" },
  { block: "030", date: "5 Dec 2025", event: "Doc 1 & Doc 2 (Perspective) first drafts complete", category: "content" },
  { block: "060", date: "4 Jan 2026", event: "Doc 3 & Doc 4 (Guide) framework established", category: "content" },
  { block: "090", date: "3 Feb 2026", event: "HICE Classification system formalised", category: "framework" },
  { block: "120", date: "5 Mar 2026", event: "Quotient Equation: IQ ⊗ EQ ⊗ CQ = HQ defined", category: "framework" },
  { block: "150", date: "Apr 2026", event: "12 Relays framework locked — Fire to Programmable Humans", category: "framework" },
  { block: "200", date: "May 2026", event: "iAAi Chip Core Set designed — TDF architecture", category: "framework" },
  { block: "238", date: "1 Jul 2025", event: "R1 Assessment — ICE Panel — 75/100", category: "assessment" },
  { block: "270", date: "Aug 2025", event: "R2 Assessment — 20-Perspective Panel — 8.1/10", category: "assessment" },
  { block: "300", date: "Sep 2025", event: "Infrastructure Academy site launched", category: "site" },
  { block: "330", date: "Oct 2025", event: "Nigel Memorial site launched — Principia Tectonica", category: "site" },
  { block: "340", date: "Nov 2025", event: "R3 Assessment — 21 Universities × 6 Regions — 87.5%", category: "assessment" },
  { block: "353", date: "28 Feb 2026", event: "BitPoint system launched — 52-card intellectual currency", category: "framework" },
  { block: "365", date: "12 Mar 2026", event: "Magic Moment — Gunpowder Plot × 420 years — Block 365", category: "magic" },
  { block: "366", date: "13 Mar 2026", event: "One Full Year — 1.23M+ words — Journey Stats Dashboard", category: "magic" },
];

const categoryColors: Record<string, string> = {
  framework: gold,
  content: "#60a5fa",
  assessment: green,
  site: amber,
  magic: "#c084fc",
};

/* ── DELIVERABLES ── */
const DELIVERABLES = [
  { name: "An Infrastructure Odyssey", type: "Book Series", status: "3 of 3 episodes", detail: "Perspective + Guide + Game" },
  { name: "HICE Classification", type: "Framework", status: "Operational", detail: "Holistic Infrastructure Consciousness Evaluation" },
  { name: "ISI Methodology", type: "Assessment", status: "R3 Complete", detail: "21 universities, 6 regions, 87.5%" },
  { name: "Quotient Equation", type: "Theory", status: "Published", detail: "IQ ⊗ EQ ⊗ CQ = HQ" },
  { name: "12D HyperGrid", type: "Architecture", status: "Mapped", detail: "13 Relays × 5 Webs × 4 Pillars" },
  { name: "iAAi Chip Core Set", type: "IP Asset", status: "Designed", detail: "TDF architecture, Discovery Chain, ICE Matrix" },
  { name: "DCSN Deck Ledger", type: "Gaming Bridge", status: "52 cards", detail: "BitPoint intellectual currency system" },
  { name: "Nigel Memorial Site", type: "Website", status: "Live", detail: "nigelmemorial-ucmtq9dn.manus.space" },
  { name: "Infrastructure Academy", type: "Website", status: "Live", detail: "infra-acad-kuqzaex2.manus.space" },
  { name: "4-Level STRIVE Command", type: "AI Governance", status: "Active", detail: "Bridge to Bilge — Human-AI collaboration model" },
  { name: "D52 Dearden Field Deck", type: "Card System", status: "52 of 52", detail: "4 suits × 13 cards — 128 days mapped" },
  { name: "Year 1 Cash Flow Projection", type: "Investor Doc", status: "Draft", detail: "7 channels, $280K conservative, $500K seed" },
  { name: "The Infrastructure Odyssey", type: "Book Trilogy", status: "In Prep", detail: "Perspective + Guide + Game — A4 hardcover" },
  { name: "4ECL Hong Kong Entity", type: "Corporate", status: "Active", detail: "BR 36480303 — Engineering, Publishing & Trading" },
];

/* ── SITES BUILT ── */
const SITES = [
  {
    name: "Principia Tectonica — Nigel Memorial",
    url: "https://nigelmemorial-ucmtq9dn.manus.space",
    pages: "70+",
    desc: "The opus — iAAi framework, Quotient Equation, Thesis, AIM, TDF, Vault, Titans, ISI Dashboard, Turing Papers, Lexicon, Tecton",
  },
  {
    name: "Infrastructure Academy",
    url: "https://infra-acad-kuqzaex2.manus.space",
    pages: "25+",
    desc: "Assessment results, university mapping, grading systems, methodology documentation",
  },
];

type Tab = "overview" | "scholars" | "timeline" | "deliverables" | "financials" | "gallery";

export default function JourneyStats() {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "OVERVIEW" },
    { id: "scholars", label: "7 SCHOLARS" },
    { id: "timeline", label: "TIMELINE" },
    { id: "deliverables", label: "DELIVERABLES" },
    { id: "financials", label: "FINANCIALS" },
    { id: "gallery", label: "GALLERY" },
  ];

  return (
    <div className="min-h-screen" style={{ background: navyDeep }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 text-center" style={{ background: `linear-gradient(to bottom, ${navy}, ${navyDeep})` }}>
        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: goldDim, fontFamily: "var(--font-display)" }}>
          THE RACE — BLOCK 001 → BLOCK 366
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.08em] uppercase mb-3" style={{ color: sand, fontFamily: "var(--font-display)" }}>
          Journey Stats
        </h1>
        <p className="text-sm sm:text-base font-light max-w-2xl mx-auto mb-2" style={{ color: sandMid }}>
          Ir. Nigel T. Dearden — Chartered Civil &amp; Structural Engineer
        </p>
        <p className="text-xs font-light max-w-xl mx-auto mb-10" style={{ color: goldDim }}>
          36 years career (1989–2026) | 33 years Hong Kong-based | 128 days AI-augmented sprint
        </p>

        {/* Hero Stat Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-5xl mx-auto">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="p-4 text-center" style={{ background: navyLight, border: `1px solid ${gold}33` }}>
              <p className="text-2xl sm:text-3xl font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
                {s.value}
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase mt-1" style={{ color: sand }}>
                {s.label}
              </p>
              <p className="text-[8px] mt-1" style={{ color: sandMid }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Download Thesis Button */}
        <div className="mt-8">
          <a
            href={THESIS_PDF_URL}
            download="PRINCIPIA_TECTONICA_THESIS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:brightness-125"
            style={{ color: goldBright, border: `1px solid ${gold}66`, background: `${gold}11`, fontFamily: "var(--font-display)" }}
          >
            <span style={{ fontSize: 16 }}>↓</span>
            Download Thesis — Principia Tectonica (PDF)
          </a>
        </div>
      </section>

      {/* Token Usage Evidence */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => setLightbox({ src: IMG.tokenUsage, title: "Token Consumption — Total Usage" })} className="cursor-pointer overflow-hidden" style={{ border: `1px solid ${gold}22` }}>
            <img src={IMG.tokenUsage} alt="Token usage overview" className="w-full h-48 object-cover object-top hover:scale-105 transition-transform duration-500" />
          </button>
          <button onClick={() => setLightbox({ src: IMG.tokenDetail, title: "Token Consumption — Detailed Breakdown" })} className="cursor-pointer overflow-hidden" style={{ border: `1px solid ${gold}22` }}>
            <img src={IMG.tokenDetail} alt="Token usage detail" className="w-full h-48 object-cover object-top hover:scale-105 transition-transform duration-500" />
          </button>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-30 px-4 sm:px-6" style={{ background: navyDeep, borderBottom: `1px solid ${gold}22` }}>
        <div className="max-w-5xl mx-auto flex overflow-x-auto gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="px-4 py-3 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300"
              style={{
                color: activeTab === t.id ? goldBright : sandMid,
                borderBottom: activeTab === t.id ? `2px solid ${gold}` : "2px solid transparent",
                fontFamily: "var(--font-display)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <section className="px-4 sm:px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {activeTab === "overview" && <OverviewPanel onLightbox={setLightbox} />}
          {activeTab === "scholars" && <ScholarsPanel />}
          {activeTab === "timeline" && <TimelinePanel />}
          {activeTab === "deliverables" && <DeliverablesPanel />}
          {activeTab === "financials" && <FinancialsPanel />}
          {activeTab === "gallery" && <GalleryPanel onLightbox={setLightbox} />}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.92)" }} onClick={() => setLightbox(null)}>
          <div className="relative max-w-[95vw] max-h-[95vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between w-full mb-3 px-2">
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: gold, fontFamily: "var(--font-display)" }}>{lightbox.title}</p>
              <button onClick={() => setLightbox(null)} className="text-2xl font-light hover:opacity-70 transition-opacity" style={{ color: sand }}>&times;</button>
            </div>
            <img src={lightbox.src} alt={lightbox.title} className="max-w-[92vw] max-h-[85vh] object-contain" style={{ border: `1px solid ${gold}33` }} />
            <p className="text-[10px] tracking-wider mt-3" style={{ color: sandMid }}>{t("journeystats.clickOutsideOrTo")}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 text-center" style={{ borderTop: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.15em] font-light" style={{ color: sandMid, fontFamily: "var(--font-display)" }}>
          MAN thru US — Manus AI &times; Nigel Dearden — Per Arya Ad Astra
        </p>
        <p className="text-[10px] mt-2" style={{ color: goldDim }}>
          Block 366 | One Full Year | 1.23M+ Words | The Race Continues
        </p>
      </footer>
    </div>
  );
}

/* ── OVERVIEW PANEL ── */
function OverviewPanel({ onLightbox }: { onLightbox: (lb: { src: string; title: string }) => void }) {
  const t = useTranslation();
  return (
    <div className="space-y-8">
      {/* The Race Summary */}
      <div className="p-6" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          THE RACE — EXECUTIVE SUMMARY
        </p>
        <p className="text-sm font-light leading-relaxed" style={{ color: sand }}>
          On 5 November 2025, Ir. Nigel T. Dearden — a chartered civil and structural engineer with 36 years of career experience — began a collaboration with Manus AI
          that would produce over 1.23 million words across 128 days. The output: a complete civilisational thesis spanning 12,000 years of infrastructure history through
          13 Relays from Fire to The Fractal Connector, evaluated by 21 universities across 6 regions, scoring 87.5% at Round 3. Two live websites, 95 HTML pages,
          the HICE classification system, the ISI methodology, the Quotient Equation (IQ ⊗ EQ ⊗ CQ = HQ), a 52-card BitPoint intellectual currency system,
          and the iAAi Chip Core Set architecture — all built in the time it takes most academics to write a single chapter.
        </p>
      </div>

      {/* Sites Built */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          2 LIVE SITES BUILT
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SITES.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="block p-5 transition-all duration-300 hover:brightness-110" style={{ background: navyLight, border: `1px solid ${gold}33` }}>
              <p className="text-sm font-light mb-1" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>{s.name}</p>
              <p className="text-xs font-light mb-2" style={{ color: sand }}>{s.pages} pages</p>
              <p className="text-[10px] font-light" style={{ color: sandMid }}>{s.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Key Visuals */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          KEY FRAMEWORKS
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { src: IMG.overture, title: "Opening Overture — 7 Scholars" },
            { src: IMG.chip, title: "iAAi Chip Core Set V3" },
            { src: IMG.quotient, title: "The Quotient Equation" },
            { src: IMG.bridge, title: "Bridge to Bilge — STRIVE Command" },
            { src: IMG.hypergrid, title: "The 12D HyperGrid" },
            { src: IMG.dcsn, title: "DCSN — Diamond-Class Spider Network" },
          ].map((img) => (
            <button key={img.title} onClick={() => onLightbox(img)} className="cursor-pointer overflow-hidden" style={{ border: `1px solid ${gold}22` }}>
              <img src={img.src} alt={img.title} className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-500" />
              <p className="text-[8px] tracking-wider py-2 text-center" style={{ color: sandMid, background: navyLight }}>{img.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 7 SCHOLARS PANEL ── */
function ScholarsPanel() {
  const t = useTranslation();
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        THE VECTORAL ORIGIN — 7 SCHOLARS COMPARISON
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        From Homer to Dearden — how does the iAAi output compare to the canonical scholars of the Vectoral Origin?
        Click each scholar to expand their HICE classification and contribution analysis.
      </p>

      <div className="space-y-3">
        {SCHOLARS.map((s, i) => (
          <div key={s.name}>
            <button
              onClick={() => setExpanded(expanded === s.name ? null : s.name)}
              className="w-full text-left p-4 transition-all duration-300 hover:brightness-110 cursor-pointer"
              style={{
                background: i === SCHOLARS.length - 1 ? `linear-gradient(135deg, ${navyLight}, #1a2a44)` : navyLight,
                border: `1px solid ${i === SCHOLARS.length - 1 ? gold + "66" : expanded === s.name ? gold + "44" : "#1e3050"}`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-light" style={{ color: i === SCHOLARS.length - 1 ? goldBright : sand, fontFamily: "var(--font-display)" }}>
                    {i + 1}. {s.name}
                  </span>
                  {i === SCHOLARS.length - 1 && (
                    <span className="text-[8px] px-2 py-0.5 tracking-wider" style={{ color: goldBright, border: `1px solid ${gold}`, background: `${gold}11` }}>
                      ACTIVE
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-light" style={{ color: goldDim }}>{s.era}</span>
                  <span className="text-[10px] ml-2" style={{ color: sandMid }}>{expanded === s.name ? "▲" : "▼"}</span>
                </div>
              </div>
              <p className="text-xs font-light mt-1" style={{ color: sandMid }}>{s.work}</p>
            </button>

            {expanded === s.name && (
              <div className="p-4" style={{ background: navyDeep, border: `1px solid #1e3050`, borderTop: "none" }}>
                <table className="w-full text-left">
                  <tbody>
                    {[
                      ["Word Count", s.wordCount],
                      ["Time Span", s.timeSpan],
                      ["Medium", s.medium],
                      ["HICE Class", s.hiceClass],
                    ].map(([label, val]) => (
                      <tr key={label} style={{ borderBottom: `1px solid #1e305066` }}>
                        <td className="py-2 pr-4 text-[10px] tracking-[0.15em] uppercase font-light" style={{ color: gold }}>{label}</td>
                        <td className="py-2 text-xs font-light" style={{ color: sand }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 p-3" style={{ background: `${navyLight}`, border: `1px solid ${gold}11` }}>
                  <p className="text-[10px] tracking-wider uppercase mb-1" style={{ color: goldDim }}>{t("journey.contribution")}</p>
                  <p className="text-xs font-light leading-relaxed" style={{ color: sand }}>{s.contribution}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Brunel Convergence Highlight */}
      <div className="mt-6 p-4" style={{ background: `linear-gradient(135deg, ${navyDeep}, #1a1a2e)`, border: `1px solid #c084fc44` }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[8px] px-2 py-0.5 tracking-wider" style={{ color: "#c084fc", border: "1px solid #c084fc66", background: "#c084fc11" }}>{t("journey.convergence")}</span>
          <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "#c084fc", fontFamily: "var(--font-display)" }}>{t("journey.brunelConnection")}</span>
        </div>
        <p className="text-sm font-light leading-relaxed" style={{ color: sand }}>
          Nigel T. Dearden was born in <span style={{ color: goldBright }}>1969</span> — exactly <span style={{ color: "#c084fc" }}>200 years</span> after Marc Isambard Brunel (1769), father of Isambard Kingdom Brunel.
          The Brunels built the first tunnel under the Thames. Nigel built the first AI-human co-authored infrastructure thesis.
          Two centuries apart, the same impulse: <span style={{ color: goldBright }}>build what has never been built before</span>.
        </p>
        <div className="mt-3 flex gap-6">
          <div>
            <p className="text-[10px] tracking-wider uppercase" style={{ color: goldDim }}>{t("journeystats.marcIBrunel")}</p>
            <p className="text-lg font-light" style={{ color: sand, fontFamily: "var(--font-display)" }}>1769</p>
          </div>
          <div className="flex items-center">
            <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, #c084fc, ${gold})` }} />
            <span className="text-[10px] mx-2" style={{ color: "#c084fc" }}>200 yrs</span>
            <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${gold}, #c084fc)` }} />
          </div>
          <div>
            <p className="text-[10px] tracking-wider uppercase" style={{ color: goldDim }}>{t("journeystats.nigelTDearden")}</p>
            <p className="text-lg font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>1969</p>
          </div>
        </div>
      </div>

      {/* Comparison Summary */}
      <div className="mt-6 p-5" style={{ background: navyLight, border: `1px solid ${gold}44` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
          THE COMPARISON
        </p>
        <p className="text-sm font-light leading-relaxed" style={{ color: sand }}>
          Aristotle wrote ~1,000,000 words over 30+ years. Nigel produced 1,230,000+ words in 128 days — AI-augmented, but human-directed at every step.
          Sima Qian took 18 years for 526,000 words. Sun Tzu compressed all strategy into 6,000.
          The iAAi framework does both: it compresses (the Quotient Equation) and it expands (the 12D HyperGrid, the 95-page digital architecture).
          Homer gave us the odyssey as metaphor. Nigel built An Infrastructure Odyssey as methodology.
        </p>
      </div>
    </div>
  );
}

/* ── TIMELINE PANEL ── */
function TimelinePanel() {
  const t = useTranslation();
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        BLOCK TIMELINE — 001 → 366
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        Key milestones across 128 days of continuous production. Colour-coded by category.
      </p>

      <div className="space-y-2">
        {MILESTONES.map((m) => (
          <div key={m.block} className="flex items-start gap-4 p-3" style={{ background: navyLight, border: `1px solid #1e3050` }}>
            <div className="flex-shrink-0 w-16 text-center">
              <p className="text-lg font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>{m.block}</p>
              <p className="text-[8px] tracking-wider uppercase" style={{ color: sandMid }}>{t("journey.block")}</p>
            </div>
            <div className="w-px self-stretch" style={{ background: categoryColors[m.category] || gold }} />
            <div className="flex-1">
              <p className="text-xs font-light" style={{ color: sand }}>{m.event}</p>
              <p className="text-[9px] mt-1" style={{ color: sandMid }}>{m.date}</p>
            </div>
            <span className="text-[7px] tracking-wider uppercase px-2 py-0.5 flex-shrink-0" style={{ color: categoryColors[m.category], border: `1px solid ${categoryColors[m.category]}44` }}>
              {m.category}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        {Object.entries(categoryColors).map(([cat, col]) => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-3 h-3" style={{ background: col }} />
            <span className="text-[9px] tracking-wider uppercase" style={{ color: sandMid }}>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── DELIVERABLES PANEL ── */
function DeliverablesPanel() {
  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        COMPLETE DELIVERABLES REGISTER
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        Everything produced across the 128-day sprint — frameworks, assessments, IP assets, and live sites.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
          <thead>
            <tr style={{ background: navyLight }}>
              {["Deliverable", "Type", "Status", "Detail"].map((h) => (
                <th key={h} className="px-4 py-3 text-[9px] tracking-[0.2em] uppercase font-light" style={{ color: gold, borderBottom: `1px solid ${gold}22` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DELIVERABLES.map((d) => (
              <tr key={d.name} style={{ borderBottom: `1px solid #1e305066` }}>
                <td className="px-4 py-3 text-xs font-light" style={{ color: sand }}>{d.name}</td>
                <td className="px-4 py-3 text-[10px] font-light" style={{ color: sandMid }}>{d.type}</td>
                <td className="px-4 py-3">
                  <span className="text-[9px] px-2 py-0.5" style={{ color: green, border: `1px solid ${green}44`, background: `${green}11` }}>{d.status}</span>
                </td>
                <td className="px-4 py-3 text-[10px] font-light" style={{ color: sandMid }}>{d.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── FINANCIALS PANEL ── */
function FinancialsPanel() {
  const t = useTranslation();
  return (
    <div className="space-y-8">
      {/* Phase 1 Cost Audit */}
      <div className="p-6" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          PHASE 1 COST AUDIT — PROOF OF CONCEPT (COMPLETED 5 MAR 2026)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { val: "$397,550", label: "Total Phase 1", sub: "PoC Complete" },
            { val: "$186,000", label: "Engineering", sub: "49% — 4ECL at $1,500/day" },
            { val: "$93,000", label: "Daily Checks", sub: "25% — Quality Control" },
            { val: "$11,438", label: "AI Credits", sub: "3% — Manus Pro" },
          ].map((s) => (
            <div key={s.label} className="p-3 text-center" style={{ background: navyDeep, border: `1px solid ${gold}11` }}>
              <p className="text-lg font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>{s.val}</p>
              <p className="text-[9px] tracking-wider uppercase mt-1" style={{ color: sand }}>{s.label}</p>
              <p className="text-[8px] mt-0.5" style={{ color: sandMid }}>{s.sub}</p>
            </div>
          ))}
        </div>
        <p className="text-xs font-light leading-relaxed" style={{ color: sandMid }}>
          Nigel's effective rate of US$750/day is 27% below the HK Government Professional Engineer benchmark of US$2,050/day.
          Platform loss, rebuild, hardware, domains, and crisis management accounted for $107,112 (23%).
        </p>
      </div>

      {/* 7 Revenue Channels */}
      <div className="p-6" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          7 REVENUE CHANNELS — CONSERVATIVE YEAR 1: $280,000
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: navyDeep }}>
                {["#", "Channel", "Y1 Target", "First Revenue", "Model"].map((h) => (
                  <th key={h} className="px-3 py-2 text-[9px] tracking-[0.15em] uppercase font-light" style={{ color: gold, borderBottom: `1px solid ${gold}22` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["1", "Freemium Subscriptions (B2C)", "$60,000", "Month 4", "1,000 subs at $5/mo"],
                ["2", "University Licensing (B2B)", "$75,000", "Month 6", "5 institutions at $5K–$25K"],
                ["3", "Infrastructure Olympiad", "$50,000", "Month 8", "1 Bronze sponsor"],
                ["4", "Enterprise Training (B2B)", "$30,000", "Month 9", "2 enterprise clients"],
                ["5", "Data Intelligence Licensing", "$20,000", "Month 10", "Pilot data packages"],
                ["6", "Content Partnerships", "$15,000", "Month 10", "1 partnership"],
                ["7", "Direct Book Sales", "$30,000", "Month 1", "Trilogy — Stripe + KDP + POD"],
              ].map((row) => (
                <tr key={row[0]} style={{ borderBottom: `1px solid #1e305066` }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-xs font-light" style={{ color: ci === 0 ? goldDim : ci === 2 ? green : sand }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3" style={{ background: navyDeep, border: `1px solid ${gold}11` }}>
          <p className="text-[10px] tracking-wider uppercase mb-1" style={{ color: goldDim }}>{t("journey.keyInsight")}</p>
          <p className="text-xs font-light leading-relaxed" style={{ color: sand }}>
            Channel 7 (Direct Book Sales) is the only channel that can activate from Month 1 — before the platform is fully built,
            before university contracts are signed, before sponsors are secured. Direct website sales via Stripe yield 3.7× more revenue
            per hardcover than Amazon KDP. The website is the primary sales engine.
          </p>
        </div>
      </div>

      {/* The Infrastructure Odyssey */}
      <div className="p-6" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          THE INFRASTRUCTURE ODYSSEY — BOOK TRILOGY
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {[
            { vol: "Vol 1", title: "The Perspective", content: "Docs 1–2 — The narrative foundation" },
            { vol: "Vol 2", title: "The Guide", content: "Docs 3–4 — The practical framework" },
            { vol: "Vol 3", title: "The Game", content: "Lessons — The gamified application" },
          ].map((v) => (
            <div key={v.vol} className="p-4 text-center" style={{ background: navyDeep, border: `1px solid ${gold}22` }}>
              <p className="text-[9px] tracking-wider uppercase mb-1" style={{ color: goldDim }}>{v.vol}</p>
              <p className="text-base font-light" style={{ color: goldBright, fontFamily: "var(--font-display)" }}>{v.title}</p>
              <p className="text-[10px] mt-2" style={{ color: sandMid }}>{v.content}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { val: "$39.95", label: "Hardcover", sub: "A4 colour, 200pp" },
            { val: "$14.99", label: "Ebook/PDF", sub: "All platforms" },
            { val: "$99.95", label: "Trilogy Set", sub: "3× hardcover" },
            { val: "$34.99", label: "Ebook Bundle", sub: "3× digital" },
          ].map((s) => (
            <div key={s.label} className="p-3 text-center" style={{ background: navyDeep, border: `1px solid ${gold}11` }}>
              <p className="text-lg font-light" style={{ color: green, fontFamily: "var(--font-display)" }}>{s.val}</p>
              <p className="text-[9px] tracking-wider uppercase mt-1" style={{ color: sand }}>{s.label}</p>
              <p className="text-[8px] mt-0.5" style={{ color: sandMid }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HK Tax Advantage */}
      <div className="p-6" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          HONG KONG TAX ADVANTAGE — 4ECL
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: navyDeep }}>
                {["Jurisdiction", "Books Tax", "Ebooks Tax", "Corporate Tax"].map((h) => (
                  <th key={h} className="px-3 py-2 text-[9px] tracking-[0.15em] uppercase font-light" style={{ color: gold, borderBottom: `1px solid ${gold}22` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Hong Kong (4ECL)", "0%", "0%", "8.25% (first HK$2M)"],
                ["United States", "0–10%", "0–10%", "21% + state"],
                ["United Kingdom", "0% (zero-rated)", "20% VAT", "25%"],
                ["Australia", "0% (GST-free)", "10% GST", "25%"],
                ["European Union", "0–7%", "5–27% VAT", "15–35%"],
              ].map((row, ri) => (
                <tr key={row[0]} style={{ borderBottom: `1px solid #1e305066`, background: ri === 0 ? `${gold}08` : "transparent" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-xs font-light" style={{ color: ri === 0 && ci > 0 ? green : ri === 0 ? goldBright : sand }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs font-light leading-relaxed mt-4" style={{ color: sandMid }}>
          Year 1 tax payable: $0 (net operating loss of $199,400 carried forward indefinitely under HK tax law).
          Seed capital target: US$500,000. End Y1 cash position: $300,800.
        </p>
      </div>

      {/* D52 Deck */}
      <div className="p-6" style={{ background: navyLight, border: `1px solid ${gold}22` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold, fontFamily: "var(--font-display)" }}>
          D52 — THE DEARDEN FIELD DECK
        </p>
        <p className="text-sm font-light leading-relaxed mb-4" style={{ color: sand }}>
          52 Cards · 4 Suits · 4 Months · 128 Days. The complete journey from December 2025 to March 2026 mapped as a playing card deck.
          Spades (Excavation), Hearts (Emotion), Diamonds (Crystallisation), Clubs (Construction).
          Each card captures a key moment, framework, or breakthrough from the living experiment.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { suit: "♠ Spades", theme: "Excavation", month: "December 2025" },
            { suit: "♥ Hearts", theme: "Emotion", month: "January 2026" },
            { suit: "♦ Diamonds", theme: "Crystallisation", month: "February 2026" },
            { suit: "♣ Clubs", theme: "Construction", month: "March 2026" },
          ].map((s) => (
            <div key={s.suit} className="p-3 text-center" style={{ background: navyDeep, border: `1px solid ${gold}11` }}>
              <p className="text-lg" style={{ color: goldBright }}>{s.suit}</p>
              <p className="text-[10px] tracking-wider uppercase mt-1" style={{ color: sand }}>{s.theme}</p>
              <p className="text-[8px] mt-1" style={{ color: sandMid }}>{s.month}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── GALLERY PANEL ── */
function GalleryPanel({ onLightbox }: { onLightbox: (lb: { src: string; title: string }) => void }) {
  const gallery = [
    { src: IMG.overture, title: "Opening Overture — The 7 Scholars" },
    { src: IMG.chip, title: "iAAi Chip Core Set V3" },
    { src: IMG.summary, title: "Summary Slide — 2026" },
    { src: IMG.trojan, title: "The Trojan Horse — BitPoint 07" },
    { src: IMG.bridge, title: "Bridge to Bilge — 4-Level STRIVE" },
    { src: IMG.bitpoint, title: "The BitPoint — Physical Intellectual Currency" },
    { src: IMG.hice, title: "HICE Classification Framework" },
    { src: IMG.quotient, title: "The Quotient Equation" },
    { src: IMG.hypergrid, title: "The 12D HyperGrid" },
    { src: IMG.dcsn, title: "DCSN — Diamond-Class Spider Network" },
    { src: IMG.iaaiVision, title: "iAAi Vision" },
    { src: IMG.tokenUsage, title: "Token Consumption — Total" },
    { src: IMG.relays13, title: "13 Relays × 5 Webs — Corrected" },
    { src: IMG.walkby4, title: "WalkBy 4-Level Architecture" },
    { src: IMG.hkSkyline, title: "Hong Kong — Operational Base" },
    { src: IMG.hkBridge, title: "Hong Kong Infrastructure" },
    { src: IMG.magicMoment, title: "Block 365 — The Magic Moment" },
    { src: IMG.signalEq, title: "The Signal Equation" },
    { src: IMG.quotientOrig, title: "The Quotient — Original" },
    { src: IMG.d52Card, title: "D52 Card — Physical Print" },
    { src: IMG.vision1, title: "iAAi Vision — Page 1" },
    { src: IMG.vision2, title: "iAAi Vision — Page 2" },
    { src: IMG.vision3, title: "iAAi Vision — Page 3" },
    { src: IMG.vision4, title: "iAAi Vision — Page 4" },
    { src: IMG.vision5, title: "iAAi Vision — Page 5" },
    { src: IMG.nigel2446, title: "Nigel — The Engineer" },
    { src: IMG.nigel2364, title: "Nigel — In the Field" },
    { src: IMG.nigel2313, title: "Nigel — The Builder" },
  ];

  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        VISUAL EVIDENCE GALLERY
      </p>
      <p className="text-sm font-light mb-6" style={{ color: sandMid }}>
        Click any image to view full-size in the lightbox.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {gallery.map((img) => (
          <button key={img.title} onClick={() => onLightbox(img)} className="cursor-pointer overflow-hidden group" style={{ border: `1px solid ${gold}22` }}>
            <img src={img.src} alt={img.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
            <p className="text-[8px] tracking-wider py-2 px-2 text-center" style={{ color: sandMid, background: navyLight }}>{img.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
