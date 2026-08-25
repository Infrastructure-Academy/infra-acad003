/**
 * Home — iAAi Infrastructure Academy — The Front Door
 * TABBED HUB LAYOUT: Hero stays at top, content organized into tabs.
 * Users click a tab to find what they need — no endless scrolling.
 */
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";
import { PulseHint, SwipeHint, GlowHint } from "@/components/DiscoveryHint";
import { useAuth } from "@/_core/hooks/useAuth";

const BOOK_COVER = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/book-cover-clean_f227cd82.jpeg";
const GUARDIAN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/guardian-of-stars_1c5c4117.jpeg";
const DEARDEN_COA_ICARD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_DEARDEN_COAT_OF_ARMS_v2-Sd7PnSCDcr8QWGEn5x8nbH.png";
const BRADFORD_ICARD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_UNIVERSITY_OF_BRADFORD_BEARINGS-3q8ggYWM7EJMVRPpQfaW7A.png";
const TOMITA_ICARD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_TOMITA_PLANETS_SUITE_HERITAGE_v2-BBY26zWCDDDLUTa6myT3o4.png";
const THE_SUIT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/biosphere-suit-portrait_9092e6f3.png";
const TRE_PLATFORM = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_0484_6575fe85.jpeg";
const BITPOINT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_HQ_LOOP_BREAKER_DAY129_d8fbad1f.png";
const HAPTIC_HUD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/HAPTIC_HUD_DASHBOARD_FULL%282%29_f623c343.png";
const BIAURA_SKIN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/biaura-skin-mk1-parts-v2_03679277.png";
const EXHIBITION_ENTRANCE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibition-01-entrance-portal_8d15989d.png";

/* ── Relay Exhibition Halls 1-13 ── */
const EXHIBIT_HALLS = [
  { relay: 1, name: "Fire", subtitle: "10,000 BCE — The First Spark", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r01_2d02847e.jpg" },
  { relay: 2, name: "Tree", subtitle: "8,000 BCE — Agriculture & Settlement", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r02_37325f2c.jpg" },
  { relay: 3, name: "River", subtitle: "8,000 BCE — Irrigation & Civilisation", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r03_30306a3d.jpg" },
  { relay: 4, name: "Horse", subtitle: "4,000 BCE — Mobility & Power", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r04_9ad353e1.jpg" },
  { relay: 5, name: "Roads", subtitle: "500 BCE — Networks & Empire", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r05_7fc8824a.jpg" },
  { relay: 6, name: "Ships", subtitle: "500 CE — Exploration & Trade", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r06_691f37f0.jpg" },
  { relay: 7, name: "Loom", subtitle: "1780 CE — Mechanisation", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r07_28443f59.jpg" },
  { relay: 8, name: "Rail", subtitle: "1830 CE — Mass Transit", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r08_6ceb5cd1.jpg" },
  { relay: 9, name: "Engine", subtitle: "1850 CE — Energy Revolution", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r09_619a1cdd.jpg" },
  { relay: 10, name: "AAA Triad", subtitle: "1900 CE — Aviation, Auto, Analogue", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r10_4ebf55b4.jpg" },
  { relay: 11, name: "Orbit", subtitle: "1960 CE — Space & Satellites", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r11_81e5cc6c.jpg" },
  { relay: 12, name: "Human Nodes", subtitle: "2000 CE — Digital Networks", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r12_195111da.jpg" },
  { relay: 13, name: "Fractal Connector", subtitle: "2025 CE — The Pattern That Connects All Patterns", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibit-r13_d9f9c93b.jpg" },
];
const EXHIBITION_HOLODECK = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibition-03-holodeck-chamber_adf17b66.png";
const EXHIBITION_BIGDATA = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/exhibition-04-big-data-wall_1849f915.png";
const CONSCIOUSNESS_COMPASS = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/consciousness-compass_f702a4c8.webp";
const CONSCIOUSNESS_THEATRE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/consciousness-theatre_2d98970a.webp";
const SCADA_DIAGRAM = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/biosphere-suit-scada-diagram_9cb2af6d.png";
const CAPSTONE_HOLODECK = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf04-holodeck_7bb9b271.png";
const ISI_DISCOVERY = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard_ISI_discovery_v7_realQR_58fbf89d.png";
const HOMO_CHAIN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/homo-chain-progression_e578d65f.png";
const HICE_CARD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCard_BLOCK363_HICE_v2-oJN3b7u36oB9c3ZqmgCyZ5.png";
const SYNTHESIS_ROSETTA = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block382-synthesis-interpretation_611c7a08.png";
const PL_LP_FORESIGHT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-PL-LP-ledger-record_48f1458f.png";
const YODA_CONTROL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-yoda-scada-control_6e020190.png";
const FLIGHT_DECK = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/dearden-cockpit-flight-deck_93eba934.jpg";
const VID_FRAME_GLOBAL_SCALE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/principia-frame_0060_0ad14f67.jpg";
const VID_FRAME_ARCHITECTURE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/principia-frame_0080_1b94f8bf.jpg";
const VID_FRAME_SILK_ROAD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/principia-frame_0100_845bbf5c.jpg";
const VID_FRAME_FORGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/principia-frame_0030_b03b2a68.jpg";
const VIDEO_DEARDEN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/MASTER-VIDEO-DEARDEN-DYNAMICS_dc247184.mp4";
const VIDEO_PRINCIPIA = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/PRINCIPIA-TECTONICA-V5-MEGA-MOVIE_5d17f1dc.mp4";
const PLAY_ARC_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/play_arc_1_curricular_502014f0.png";
const PLAY_ARC_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/play_arc_2_progression_a9292852.png";
const PLAY_ARC_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/play_arc_3_master_weaver_2208cf98.png";
const PLAY_ARC_4 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/play_arc_4_weaving_0a7307b5.png";
const HICE_CUBE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_HICE_CUBE_4afc441d.png";
const VISION_BOARD_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1905-relay-vision_08141a83.jpeg";
const VISION_BOARD_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1916-relay-vision_be642334.jpeg";
const VISION_BOARD_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1920-relay-vision_74f95d58.jpeg";
const VISION_BOARD_4 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1921-relay-vision_a013d19c.jpeg";

/* ── Principia Consequence Thumbnails ── */
const PRINCIPIA_COVERS = [
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8958_692ff28e.jpeg", alt: "Modus Tecton — Original Cover", href: "/vault" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8957_a7b7650f.jpeg", alt: "Modus Tecton — Entity Framework", href: "/vault" },
];
const PRINCIPIA_TRE = [
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8949_582addd6.webp", alt: "The Consciousness Compass", href: "/thesis" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8951_992176e1.webp", alt: "An Odyssey — Man and Machine", href: "/thesis" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8950_e040ac78.webp", alt: "Four Episodes — 3+1=4", href: "/tdf" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8952_a940006d.webp", alt: "The Proof — PoC LIVE", href: "/vault" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8953_98d7ad92.webp", alt: "Press Play to Begin", href: "/tdf" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8948_64e2ea20.webp", alt: "Consciousness Theatre", href: "/thesis" },
];

/* ── Academy Palette ── */
const NAVY = "#0b1a33";
const NAVY_LIGHT = "#0f2240";
const GOLD = "#d4a843";
const GOLD_BRIGHT = "#e8c55a";
const GOLD_DIM = "#a08432";
const TEXT_WHITE = "#f0eadc";
const TEXT_SILVER = "#8a9cc0";

/* ── Tab definitions ── */
const TAB_IDS = ["navigate", "opus", "heritage", "exhibition", "media"] as const;
const TAB_KEYS: Record<string, string> = {
  navigate: "home.tabNavigate",
  opus: "home.tabOpus",
  heritage: "home.tabHeritage",
  exhibition: "home.tabExhibition",
  media: "home.tabMedia",
};

type TabId = typeof TAB_IDS[number];

/* ── Odyssey Countdown — Live timer to 17 July 2026 ── */
const ODYSSEY_DATE = new Date("2026-07-17T00:00:00-04:00").getTime(); // US theatrical release
const MS_DAY = 86400000;

function OdysseyCountdown() {
  const t = useTranslation();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = ODYSSEY_DATE - now;
  const isPast = diff <= 0;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / MS_DAY);
  const hours = Math.floor((abs % MS_DAY) / 3600000);
  const minutes = Math.floor((abs % 3600000) / 60000);
  const seconds = Math.floor((abs % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="my-6 p-4 sm:p-6" style={{ border: `1px solid ${GOLD}44`, background: "rgba(11,26,51,0.8)" }}>
      <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>
        {isPast ? t("home.sinceRelease" as any) : t("home.countdownToRelease" as any)}
      </p>
      <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: TEXT_SILVER }}>
        {t("home.odysseyTitle" as any)}
      </p>
      <div className="flex justify-center items-baseline gap-1 sm:gap-3 flex-wrap">
        <div className="text-center">
          <span className="text-2xl sm:text-4xl tabular-nums tracking-[0.05em]" style={{ fontFamily: "var(--font-display)", color: GOLD_BRIGHT, fontVariantNumeric: "tabular-nums" }}>{isPast ? "+" : ""}{days}</span>
          <span className="text-[8px] tracking-[0.3em] uppercase block mt-1" style={{ color: GOLD_DIM }}>DAYS</span>
        </div>
        <span className="text-xl sm:text-2xl" style={{ color: GOLD_DIM }}>:</span>
        <div className="text-center">
          <span className="text-2xl sm:text-4xl tabular-nums tracking-[0.05em]" style={{ fontFamily: "var(--font-display)", color: GOLD_BRIGHT, fontVariantNumeric: "tabular-nums" }}>{pad(hours)}</span>
          <span className="text-[8px] tracking-[0.3em] uppercase block mt-1" style={{ color: GOLD_DIM }}>HRS</span>
        </div>
        <span className="text-xl sm:text-2xl" style={{ color: GOLD_DIM }}>:</span>
        <div className="text-center">
          <span className="text-2xl sm:text-4xl tabular-nums tracking-[0.05em]" style={{ fontFamily: "var(--font-display)", color: GOLD_BRIGHT, fontVariantNumeric: "tabular-nums" }}>{pad(minutes)}</span>
          <span className="text-[8px] tracking-[0.3em] uppercase block mt-1" style={{ color: GOLD_DIM }}>MIN</span>
        </div>
        <span className="text-xl sm:text-2xl" style={{ color: GOLD_DIM }}>:</span>
        <div className="text-center">
          <span className="text-2xl sm:text-4xl tabular-nums tracking-[0.05em]" style={{ fontFamily: "var(--font-display)", color: GOLD_BRIGHT, fontVariantNumeric: "tabular-nums" }}>{pad(seconds)}</span>
          <span className="text-[8px] tracking-[0.3em] uppercase block mt-1" style={{ color: GOLD_DIM }}>SEC</span>
        </div>
      </div>
      <p className="text-[9px] tracking-[0.2em] uppercase mt-4" style={{ color: GOLD_DIM }}>
        17 JULY 2026 · DAY 254 · BLOCK 742 · APOLLO 11 MID-FLIGHT ANNIVERSARY
      </p>
    </div>
  );
}

export default function Home() {
  const t = useTranslation();
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("navigate");
  const [exhibitionExpanded, setExhibitionExpanded] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);

  // Force scroll to top to show first sentence
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navCards = [
    { href: "/counterforce", titleKey: "COUNTERFORCE", tagKey: "home.tagCounter" },
    { href: "/quotient", titleKey: "nav.equation", tagKey: "home.tagMind" },
    { href: "/inertial-jump", titleKey: "nav.inertialJump", tagKey: "home.tagSpark" },
    { href: "/thesis", titleKey: "nav.thesis", tagKey: "home.tagProof" },
    { href: "/aim", titleKey: "nav.aim", tagKey: "home.tagNetwork" },
    { href: "/tdf", titleKey: "nav.tdf", tagKey: "home.tagField" },
    { href: "/vault", titleKey: "nav.vault", tagKey: "home.tagArchive" },
    { href: "/titans", titleKey: "nav.titans", tagKey: "home.tagFellowship" },
    { href: "/turing-papers", titleKey: "nav.turingPapers", tagKey: "home.tagAcademy" },
    { href: "/jigsaw", titleKey: "Jigsaw", tagKey: "home.tagJigsaw" },
    { href: "/lexicon", titleKey: "nav.lexicon", tagKey: "home.tagDictionary" },
    { href: "/tecton", titleKey: "nav.tecton", tagKey: "home.tagThesaurus" },
    { href: "/isi", titleKey: "ISI Dashboard", tagKey: "home.tagMeasure" },
    { href: "/journey", titleKey: "Journey", tagKey: "home.tagJourney" },
    { href: "/ventral-origin", titleKey: "Origin", tagKey: "home.tagOrigin" },
    { href: "/press", titleKey: "Press", tagKey: "home.tagPress" },
    { href: "/manus-storage/uADfqhuasNJUHnAo_0311fb87.pdf", titleKey: "ELE Paper", tagKey: "home.tagELE", external: true },
    { href: "/cse", titleKey: "CIVILIZATIONAL SYSTEMS ENGINEERING", tagKey: "home.tagCSE" },
  ];

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      {/* ══════════════════════════════════════════════════════════
          CSE & iAAi BANNER — Below Navigation, clean section
          ══════════════════════════════════════════════════════════ */}
      <div style={{ background: NAVY, borderTop: `2px solid ${GOLD_BRIGHT}`, borderBottom: `2px solid ${GOLD_BRIGHT}` }} className="mt-0 pt-32 pb-12 sm:pt-40 sm:pb-16 md:pt-16 lg:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center">
            {/* Main message */}
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl leading-tight font-light" style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>
              Infrastructure survives when remembrance exceeds resistance. Civilisational Systems Engineering (CSE) quantifies this through the ISI equation. The Infrastructure Academy of Artificial Intelligence (iAAi) engineers the solution — 42 equations, 12 Relays, 12,000 generations of human progress, open to all.
            </p>

            {/* Divider */}
            <div className="flex justify-center">
              <div style={{ width: "80px", height: "2px", background: GOLD_BRIGHT }} />
            </div>

            {/* Doctrine statement */}
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl leading-tight font-light" style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>
              The line isn't safe until the line is tested.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          REMOVED: Banner moved above Navigation
          ══════════════════════════════════════════════════════════ */}


      {/* ══════════════════════════════════════════════════════════
          HERO: Guardian of the Planet — always visible below banner
          ══════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative overflow-hidden -mt-1 min-h-screen">
        <img
          src={GUARDIAN}
          alt="Guardian of the Planet"
          className="w-full h-full object-cover absolute inset-0"
          style={{ filter: "brightness(0.65)" }}
        />
        <div
          className="absolute inset-0 hero-gradient-overlay"
          style={{ background: `linear-gradient(to bottom, ${NAVY}cc 0%, ${NAVY}55 12%, transparent 30%, transparent 50%, ${NAVY}aa 78%, ${NAVY})` }}
        />
        <div className="relative z-10 flex flex-col items-center text-center px-6 pb-6 sm:pb-16 hero-content-pad">
          <p
            className="text-sm sm:text-base tracking-[0.5em] uppercase mb-3 sm:mb-6"
            style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)" }}
          >
            {t("home.4ecl")}
          </p>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-light uppercase mb-4"
            style={{
              color: TEXT_WHITE,
              fontFamily: "var(--font-display)",
              letterSpacing: "0.1em",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {t("home.guardian")}
          </h2>
          {/* ── THE TWO MEGA EQUATIONS ── */}
          <div className="mt-4 sm:mt-8 mb-4 flex flex-col items-center gap-3 sm:gap-4">
            <div className="w-40 h-px mx-auto" style={{ background: `linear-gradient(to right, transparent, ${GOLD_BRIGHT}, transparent)` }} />
            <div
              className="equation-container-glow px-8 py-5 sm:px-12 sm:py-6"
              style={{
                border: `1px solid rgba(232,197,90,0.4)`,
                background: `radial-gradient(ellipse at center, rgba(232,197,90,0.08) 0%, rgba(11,26,51,0.95) 70%)`,
              }}
            >
              <p
                className="equation-glow text-xl sm:text-3xl md:text-4xl font-normal tracking-wide"
                style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
              >
                {t("home.equation")}
              </p>
              <p className="text-[10px] sm:text-xs mt-2 tracking-wide text-center" style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>
                {t("home.heroEquationLegend")}
              </p>
            </div>
            <div
              className="equation-container-glow px-6 py-4 sm:px-10 sm:py-5"
              style={{
                border: `1px solid rgba(232,197,90,0.35)`,
                background: `radial-gradient(ellipse at center, rgba(232,197,90,0.06) 0%, rgba(11,26,51,0.95) 70%)`,
              }}
            >
              <p
                className="equation-glow text-lg sm:text-2xl md:text-3xl font-normal tracking-wide text-center"
                style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}
              >
                {t("home.isiEquation")}
              </p>
              <p className="text-[10px] sm:text-xs mt-2 tracking-wide text-center leading-relaxed" style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>
                {t("home.isiEquationLegend")}
              </p>
            </div>
            <div
              className="equation-container-glow px-6 py-4 sm:px-10 sm:py-5"
              style={{
                border: `1px solid rgba(232,197,90,0.35)`,
                background: `radial-gradient(ellipse at center, rgba(232,197,90,0.06) 0%, rgba(11,26,51,0.95) 70%)`,
              }}
            >
              <p
                className="equation-glow text-lg sm:text-2xl md:text-3xl font-normal tracking-wide text-center"
                style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}
              >
                {t("home.isisTripleIndex")}
              </p>
              <p className="text-[10px] sm:text-xs mt-2 tracking-wide text-center" style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>
                {t("home.isisLegend")}
              </p>
            </div>
            <div className="w-40 h-px mx-auto" style={{ background: `linear-gradient(to right, transparent, ${GOLD_BRIGHT}, transparent)` }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TAB BAR — sticky below nav, scrollable on mobile
          ══════════════════════════════════════════════════════════ */}
      <div
        ref={tabBarRef}
        className="sticky z-40 overflow-x-auto relative"
        style={{
          top: "var(--header-h, 0px)",
          background: NAVY_LIGHT,
          borderBottom: `1px solid ${GOLD}33`,
          borderTop: `1px solid ${GOLD}33`,
        }}
      >
        <SwipeHint scrollRef={tabBarRef} />
        <div className="flex justify-center gap-0 min-w-max mx-auto">
          {TAB_IDS.map((tabId) => (
            <button
              key={tabId}
              onClick={() => {
                setActiveTab(tabId);
                // Scroll so the tab bar sits right below the fixed header
                if (tabBarRef.current) {
                  const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '0');
                  const tabBarTop = tabBarRef.current.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top: tabBarTop - headerH, behavior: 'smooth' });
                }
              }}
              className="px-4 sm:px-6 py-3 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-light transition-all duration-300 whitespace-nowrap cursor-pointer"
              style={{
                fontFamily: "var(--font-display)",
                color: activeTab === tabId ? GOLD_BRIGHT : TEXT_SILVER,
                borderBottom: activeTab === tabId ? `2px solid ${GOLD_BRIGHT}` : "2px solid transparent",
                background: activeTab === tabId ? "rgba(212,168,67,0.08)" : "transparent",
              }}
            >
              {t(TAB_KEYS[tabId] as any)}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          TAB CONTENT — only active tab renders
          ══════════════════════════════════════════════════════════ */}

      {/* ── TAB: NAVIGATE ── */}
      {activeTab === "navigate" && (
        <section className="py-12 sm:py-20 px-4 sm:px-6" style={{ background: NAVY }}>
          <div className="max-w-5xl mx-auto text-center">
            {/* Enter Principia Tectonica */}
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>
              {t("home.opus")}
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light uppercase mb-4"
              style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
            >
              {t("home.principia")}
            </h2>
            <p className="text-base font-light mb-10" style={{ color: TEXT_SILVER }}>
              {t("home.sevenVectors")}
            </p>

            <GlowHint>
            <Link href="/quotient">
              <div
                className="group inline-block cursor-pointer px-16 sm:px-20 py-6 transition-all duration-500 mb-12"
                style={{ border: `2px solid ${GOLD}`, background: "rgba(212,168,67,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,67,0.15)"; e.currentTarget.style.boxShadow = `0 0 40px rgba(212,168,67,0.2)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,168,67,0.06)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span className="text-2xl sm:text-3xl tracking-[0.3em] uppercase font-light" style={{ fontFamily: "var(--font-display)", color: GOLD_BRIGHT }}>
                  {t("home.enter")}
                </span>
                <p className="text-xs tracking-[0.2em] uppercase mt-2" style={{ color: TEXT_SILVER }}>
                  {t("home.beginJourney")}
                </p>
              </div>
            </Link>
            </GlowHint>

            {/* Nav Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {navCards.map((card) => {
                const inner = (
                  <div
                    className="cursor-pointer p-4 text-center transition-all duration-500 h-full"
                    style={{
                      border: `1px solid ${GOLD}33`,
                      background: `linear-gradient(135deg, rgba(15,34,64,0.7), rgba(212,168,67,0.03))`,
                      boxShadow: `0 0 6px rgba(212,168,67,0.08)`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${GOLD}88`; e.currentTarget.style.boxShadow = `0 0 18px rgba(212,168,67,0.25)`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${GOLD}33`; e.currentTarget.style.boxShadow = `0 0 6px rgba(212,168,67,0.08)`; }}
                  >
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)" }}>
                      {t(card.tagKey)}
                    </p>
                    <p className="text-sm font-light tracking-wider uppercase" style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}>
                      {t(card.titleKey)}
                    </p>
                  </div>
                );
                return (card as any).external ? (
                  <a key={card.href} href={card.href} target="_blank" rel="noopener noreferrer">{inner}</a>
                ) : (
                  <Link key={card.href} href={card.href}>{inner}</Link>
                );
              })}
            </div>


            {/* Boffin BIN */}
            <div className="mt-6">
              <Link href="/boffin-bin">
                <div
                  className="cursor-pointer p-5 text-center transition-all duration-500"
                  style={{ border: `2px solid ${GOLD}55`, background: `linear-gradient(135deg, rgba(15,34,64,0.8), rgba(212,168,67,0.05))` }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${GOLD}aa`; e.currentTarget.style.boxShadow = `0 0 24px rgba(212,168,67,0.25)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${GOLD}55`; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <p className="text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)" }}>{t("home.binSubtitle")}</p>
                  <p className="text-lg font-light tracking-[0.2em] uppercase mb-2" style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}>{t("home.boffinBin")}</p>
                  <p className="text-xs" style={{ color: TEXT_SILVER }}>{t("home.binDesc")}</p>
                  <p className="text-[10px] mt-2" style={{ color: `${GOLD}88` }}>{t("home.enterBin")}</p>
                </div>
              </Link>
            </div>

            {/* Operational Bridges */}
            <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${GOLD}22` }}>
              <p className="text-xs tracking-[0.3em] uppercase font-light mb-6" style={{ fontFamily: "var(--font-display)", color: GOLD_DIM }}>{t("home.opBridges")}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                <a
                  href="https://infra-acad-kuqzaex2.manus.space/site.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 border transition-all duration-500 hover:bg-[#d4a84315]"
                  style={{ borderColor: `${GOLD}40`, fontFamily: "var(--font-display)" }}
                >
                  <span className="text-xs tracking-[0.2em] uppercase" style={{ color: TEXT_SILVER }}>{t("home.acadSiteLabel")}</span>
                  <span className="text-[10px] tracking-wider" style={{ color: GOLD_DIM }}>{t("home.infraAcademyLabel")}</span>
                  <span style={{ color: GOLD }}>→</span>
                </a>
                <a
                  href="/game"
                  className="group flex items-center gap-3 px-6 py-3 border transition-all duration-500 hover:bg-[#d4a84315]"
                  style={{ borderColor: `${GOLD}40`, fontFamily: "var(--font-display)" }}
                >
                  <span className="text-xs tracking-[0.2em] uppercase" style={{ color: TEXT_SILVER }}>TRE</span>
                  <span className="text-[10px] tracking-wider" style={{ color: GOLD_DIM }}>{t("home.realityEngine")}</span>
                  <span style={{ color: GOLD }}>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: THE OPUS ── */}
      {activeTab === "opus" && (
        <section className="py-12 sm:py-20 px-4 sm:px-6" style={{ background: NAVY }}>
          <div className="max-w-6xl mx-auto">
            {/* Rosetta Stone — Master Index */}
            <p className="text-xs tracking-[0.4em] uppercase text-center mb-3" style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)" }}>
              {t("home.rosettaStone")}
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-center mb-10" style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>
              {t("home.rosettaSub2")}
            </p>

            {/* 2x2 Symmetry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* P — Synthesis */}
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest" style={{ color: GOLD_BRIGHT }}>P</span>
                  <span className="text-[9px] tracking-wider uppercase" style={{ color: GOLD_DIM }}>{t("home.theIndex")}</span>
                </div>
                <div className="p-3 flex items-center justify-center" style={{ border: `1px solid ${GOLD}44`, background: "rgba(212,168,67,0.04)" }}>
                  <img src={SYNTHESIS_ROSETTA} alt="Block 382 Synthesis — The Principia Tectonica — 6-Card Argument — Rosetta Stone" className="w-full object-contain cursor-pointer" style={{ maxHeight: "380px" }} onClick={() => setLightbox({ src: SYNTHESIS_ROSETTA, alt: "Block 382 Synthesis — The Principia Tectonica" })} />
                </div>
                <p className="text-[9px] tracking-wider mt-2 text-center" style={{ color: GOLD_DIM }}>{t("home.synthCaption")}</p>
              </div>
              {/* L — HICE */}
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest" style={{ color: GOLD_BRIGHT }}>L</span>
                  <span className="text-[9px] tracking-wider uppercase" style={{ color: GOLD_DIM }}>{t("home.theHQ2")}</span>
                </div>
                <div className="p-3 flex items-center justify-center" style={{ border: `1px solid ${GOLD}44`, background: "rgba(212,168,67,0.04)" }}>
                  <img src={HICE_CARD} alt="HICE Classification — H=Human I=Innate C=Created E=Embodied" className="w-full object-contain cursor-pointer" style={{ maxHeight: "380px" }} onClick={() => setLightbox({ src: HICE_CARD, alt: "HICE Classification — Block 363" })} />
                </div>
                <p className="text-[9px] tracking-wider mt-2 text-center" style={{ color: GOLD_DIM }}>{t("home.hiceCaption")}</p>
              </div>
              {/* L — ISI */}
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest" style={{ color: GOLD_BRIGHT }}>L</span>
                  <span className="text-[9px] tracking-wider uppercase" style={{ color: GOLD_DIM }}>{t("home.theIsis2")}</span>
                </div>
                <div className="p-3 flex items-center justify-center" style={{ border: `1px solid ${GOLD}44`, background: "rgba(212,168,67,0.04)" }}>
                  <img src={ISI_DISCOVERY} alt="ISI Discovery — The Triple Index — Survival ⊗ Sustainability ⊗ $ignificance" className="w-full object-contain cursor-pointer" style={{ maxHeight: "380px" }} onClick={() => setLightbox({ src: ISI_DISCOVERY, alt: "ISI Discovery — The Triple Index" })} />
                </div>
                <p className="text-[9px] tracking-wider mt-2 text-center" style={{ color: GOLD_DIM }}>{t("home.isiCaption")}</p>
              </div>
              {/* P — Homo Chain */}
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest" style={{ color: GOLD_BRIGHT }}>P</span>
                  <span className="text-[9px] tracking-wider uppercase" style={{ color: GOLD_DIM }}>{t("home.the10Men2")}</span>
                </div>
                <div className="p-3 flex items-center justify-center" style={{ border: `1px solid ${GOLD}44`, background: "rgba(212,168,67,0.04)" }}>
                  <img src={HOMO_CHAIN} alt="The Homo Chain — 10 Species — From Handyman to Builder" className="w-full object-contain cursor-pointer" style={{ maxHeight: "380px" }} onClick={() => setLightbox({ src: HOMO_CHAIN, alt: "The Homo Chain — 10 Species" })} />
                </div>
                <p className="text-[9px] tracking-wider mt-2 text-center" style={{ color: GOLD_DIM }}>{t("home.homoCaption")}</p>
              </div>
            </div>

            {/* P&L / L&P Foresight */}
            <div className="mt-10">
              <div className="p-3 flex items-center justify-center" style={{ border: `1px solid ${GOLD}44`, background: "rgba(212,168,67,0.04)" }}>
                <img src={PL_LP_FORESIGHT} alt="The Civil Engineer's Foresight — P&L Ledger meets L&P Record" className="w-full object-contain cursor-pointer" style={{ maxHeight: "340px" }} onClick={() => setLightbox({ src: PL_LP_FORESIGHT, alt: "P&L / L&P — The Civil Engineer's Foresight" })} />
              </div>
              <p className="text-[9px] tracking-wider mt-2 text-center italic" style={{ color: GOLD_DIM }}>{t("home.foresightQuote")}</p>
            </div>

            {/* Gold Divider */}
            <div className="w-full h-0.5 my-12" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

            {/* Book Cover */}
            <div className="max-w-3xl mx-auto">
              <div className="p-3 sm:p-4 mx-auto" style={{ border: `2px solid ${GOLD}`, maxWidth: "800px", background: "rgba(212,168,67,0.03)" }}>
                <img src={BOOK_COVER} alt="From Calories to Consciousness: An Infrastructure Odyssey — The Civilizational Relay" className="w-full object-contain" style={{ maxHeight: "500px" }} />
              </div>
              <p className="text-center mt-8 text-sm sm:text-base font-light tracking-wide" style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}>
                {t("home.bookTitle")}
              </p>
            </div>

            {/* ── The Odyssey — Homer to Nolan ── */}
            <div className="w-full h-0.5 my-12" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>The First Scholar — The Last Relay</p>
              <h3 className="text-lg sm:text-xl font-light tracking-[0.08em] uppercase mb-6" style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)" }}>The Odyssey — From Homer to Infrastructure</h3>
              <p className="text-xs sm:text-sm font-light leading-[2] mb-6" style={{ color: TEXT_SILVER }}>
                Homer — the 1st of the 7 Scholars in the Vectoral Origin — gave civilisation its founding odyssey: a journey home through gods, monsters, and the sea. Three thousand years later, a civil engineer built <em>An Infrastructure Odyssey</em>: a journey through 12,000 years of roads, aqueducts, and fibre-optic cables — from Calories to Consciousness. The word is the same. The lens is infrastructure. The method is the iAAi framework.
              </p>
              <div className="p-4 mb-6" style={{ border: `1px solid ${GOLD}33`, background: "rgba(212,168,67,0.04)" }}>
                <p className="text-xs font-light leading-[2] mb-3" style={{ color: TEXT_SILVER }}>
                  On <strong style={{ color: GOLD_BRIGHT }}>17 July 2026</strong>, Christopher Nolan releases <em>The Odyssey</em> — Homer's epic reimagined for IMAX, shot on the largest film format ever used for a narrative feature. The tagline: <em>"It was never a myth. It's a legacy."</em>
                </p>
                <p className="text-xs font-light leading-[2]" style={{ color: TEXT_SILVER }}>
                  Two odysseys in the same year. One tells the story of a warrior finding his way home across the wine-dark sea. The other tells the story of infrastructure finding its way to consciousness across 12 civilisational relays. Homer would have understood both.
                </p>
              </div>

              {/* ── Apollo 11 Mid-Journey Parallel ── */}
              <p className="text-xs font-light leading-[2] mb-6" style={{ color: TEXT_SILVER }}>
                July 17 is no ordinary date. On <strong style={{ color: GOLD_BRIGHT }}>17 July 1969</strong>, Apollo 11 was mid-flight — Day 2 of the mission — between Earth and Moon, broadcasting back to a watching planet. Three journeys, same date, different destinations: Odysseus between Troy and Ithaca, Armstrong between Earth and the Sea of Tranquility, and infrastructure between Calories and Consciousness.
              </p>

              {/* ── Live Odyssey Countdown ── */}
              <OdysseyCountdown />

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] tracking-wider mt-6" style={{ color: GOLD_DIM }}>
                <span>Homer · c. 800 BCE · H-Class (Heritage)</span>
                <span>·</span>
                <span>Apollo 11 · 17 July 1969 · Mid-Flight</span>
                <span>·</span>
                <span>Nolan · 17 July 2026 · IMAX</span>
                <span>·</span>
                <span>Dearden · Day 254 · Block 742 · Infrastructure</span>
              </div>
            </div>

            {/* Consequence Thumbnails */}
            <div className="mt-10" style={{ maxWidth: "calc(12rem + 12rem + 3rem)", margin: "2.5rem auto 0" }}>
              <div className="flex justify-center items-center gap-4 mb-3">
                {PRINCIPIA_COVERS.map((thumb, i) => (
                  <Link key={`cover-${i}`} href={thumb.href}>
                    <div className="cursor-pointer transition-all duration-500" style={{ border: `1.5px solid ${GOLD}88`, padding: "3px", background: `linear-gradient(135deg, rgba(212,168,67,0.12), rgba(212,168,67,0.03))`, boxShadow: `0 0 12px rgba(212,168,67,0.2)` }}>
                      <img src={thumb.src} alt={thumb.alt} title={thumb.alt} loading="lazy" className="object-cover cursor-pointer" style={{ width: "120px", height: "160px", filter: "saturate(0.85)" }} />
                    </div>
                  </Link>
                ))}
              </div>
              <p className="text-center text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>{t("home.theConsequences")}</p>
              <div className="grid grid-cols-3 gap-2.5 mb-2.5">
                {PRINCIPIA_TRE.slice(0, 3).map((thumb, i) => (
                  <Link key={`tre-a-${i}`} href={thumb.href}>
                    <div className="cursor-pointer transition-all duration-500" style={{ border: `1px solid ${GOLD}55`, padding: "2px", background: `linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02))` }}>
                      <img src={thumb.src} alt={thumb.alt} title={thumb.alt} loading="lazy" className="w-full object-cover" style={{ height: "70px", filter: "saturate(0.85)" }} />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {PRINCIPIA_TRE.slice(3, 6).map((thumb, i) => (
                  <Link key={`tre-b-${i}`} href={thumb.href}>
                    <div className="cursor-pointer transition-all duration-500" style={{ border: `1px solid ${GOLD}55`, padding: "2px", background: `linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02))` }}>
                      <img src={thumb.src} alt={thumb.alt} title={thumb.alt} loading="lazy" className="w-full object-cover" style={{ height: "70px", filter: "saturate(0.85)" }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: HERITAGE ── */}
      {activeTab === "heritage" && (
        <section className="py-12 sm:py-20 px-6" style={{ background: "#081422" }}>
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-display)", color: GOLD_DIM }}>
              {t("home.heritageHonorific")}
            </p>

            {/* Heritage Triptych — text labels ABOVE images so each title sits directly above its own card on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 items-start">
              {/* Dearden Coat of Arms */}
              <div className="text-center border-b sm:border-b-0 border-[rgba(212,168,67,0.15)] pb-8 sm:pb-0">
                <p className="text-sm tracking-[0.1em] uppercase mb-1" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.deardenFamilyArms")}</p>
                <p className="text-[11px] mb-1" style={{ color: TEXT_SILVER }}>{t("home.lancashire")}</p>
                <p className="text-xs italic mb-3" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.dumSpiroSpero")}</p>
                <div className="block cursor-pointer" onClick={() => setLightbox({ src: DEARDEN_COA_ICARD, alt: "Dearden Coat of Arms iCard — Lancashire" })}>
                  <img src={DEARDEN_COA_ICARD} alt="Dearden Coat of Arms iCard — Lancashire" className="w-52 mx-auto mb-2 object-contain rounded" style={{ filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                </div>
                <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.whileIBreathe")}</p>
              </div>
              {/* University of Bradford */}
              <div className="text-center border-b sm:border-b-0 border-[rgba(212,168,67,0.15)] pb-8 sm:pb-0">
                <a href="https://www.bradford.ac.uk" target="_blank" rel="noopener noreferrer" className="inline-block transition-all duration-300" style={{ textDecoration: "none" }}>
                  <p className="text-sm tracking-[0.1em] uppercase mb-1" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.universityBradford")}</p>
                </a>
                <p className="text-[11px] mb-1" style={{ color: TEXT_SILVER }}>{t("home.collegeOfArms")}</p>
                <p className="text-xs italic mb-3" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.giveInventionLight")}</p>
                <div className="block cursor-pointer" onClick={() => setLightbox({ src: BRADFORD_ICARD, alt: "University of Bradford — iCard" })}>
                  <img src={BRADFORD_ICARD} alt="University of Bradford — iCard" className="w-52 mx-auto mb-2 object-contain rounded" style={{ filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                </div>
                <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.shakespeareSonnet")}</p>
                <p className="text-[9px] mt-1 italic" style={{ color: `${GOLD}88` }}>{t("home.thankYouStart")}</p>
              </div>
              {/* Tomita Planets Suite */}
              <div className="text-center">
                <p className="text-sm tracking-[0.1em] uppercase mb-1" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.planetsSuite")}</p>
                <p className="text-[11px] mb-1" style={{ color: TEXT_SILVER }}>{t("home.tomitaHolst")}</p>
                <p className="text-xs italic mb-3" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.organSynthAI")}</p>
                <div className="block cursor-pointer" onClick={() => setLightbox({ src: TOMITA_ICARD, alt: "Tomita Planets Suite — Heritage Audio Lineage" })}>
                  <img src={TOMITA_ICARD} alt="Tomita Planets Suite — Heritage Audio Lineage" className="w-52 mx-auto mb-2 object-contain rounded" style={{ filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                </div>
                <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.inMemoryAlan")}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: EXHIBITION ── */}
      {activeTab === "exhibition" && (
        <section className="py-12 sm:py-20 px-6" style={{ background: "#081422" }}>
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm tracking-[0.4em] uppercase mb-2" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.theExhibition" as any)}</p>
            <p className="text-xs tracking-[0.15em] mb-6" style={{ fontFamily: "var(--font-display)", color: TEXT_SILVER }}>{t("home.whatWeAreBuilding")}</p>

            {/* Preview: 6 representative images */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
              {[
                { src: THE_SUIT, label: t("home.catHaptic"), alt: "Haptic Equipment — Biosphere Suit" },
                { src: EXHIBITION_ENTRANCE, label: t("home.catExhibition"), alt: "Exhibition Spaces — Entrance Portal" },
                { src: TRE_PLATFORM, label: t("home.catGame"), alt: "The Game — TRE Platform" },
                { src: ISI_DISCOVERY, label: t("home.catTheory"), alt: "The Theory — ISI Discovery" },
                { src: VISION_BOARD_1, label: t("home.catVisionBoard"), alt: "Relay Vision Board" },
                { src: VID_FRAME_GLOBAL_SCALE, label: t("home.catScale"), alt: "The Scale — Global Infrastructure" },
              ].map((item, i) => (
                <div key={i} className="text-center cursor-pointer" onClick={() => setLightbox({ src: item.src, alt: item.alt })}>
                  <img src={item.src} alt={item.alt} className="w-full aspect-square object-cover rounded mb-2" style={{ filter: "drop-shadow(0 4px 12px rgba(212,168,67,0.2))" }} />
                  <p className="text-[9px] tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD_DIM }}>{item.label}</p>
                </div>
              ))}
            </div>

            {/* Expand/Collapse */}
            <button
              onClick={() => setExhibitionExpanded(!exhibitionExpanded)}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-light transition-all duration-500 cursor-pointer"
              style={{ fontFamily: "var(--font-display)", color: GOLD, border: `1px solid ${GOLD}44`, background: exhibitionExpanded ? "rgba(212,168,67,0.1)" : "rgba(212,168,67,0.04)" }}
            >
              {exhibitionExpanded ? "Collapse Exhibition ▲" : "View Full Exhibition ▼"}
            </button>

            {exhibitionExpanded && (
            <div className="mt-10">
              {/* RELAY EXHIBITION HALLS — 13 Halls */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
                  <p className="text-xs tracking-[0.35em] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.relayHalls" as any)}</p>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
                </div>
                <p className="text-xs tracking-[0.12em] mb-6" style={{ color: TEXT_SILVER }}>{t("home.relayDescription" as any)}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
                  {EXHIBIT_HALLS.map((hall) => (
                    <div key={hall.relay} className="text-center">
                      <div className="cursor-pointer" onClick={() => setLightbox({ src: hall.src, alt: `Hall ${hall.relay} — Relay ${hall.relay}: ${hall.name}` })}>
                        <img src={hall.src} alt={`Relay ${hall.relay} — ${hall.name}`} className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "240px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                      </div>
                      <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>Hall {hall.relay} — {hall.name}</p>
                      <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{hall.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CATEGORY 1: HAPTIC EQUIPMENT */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
                  <p className="text-xs tracking-[0.35em] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.catHaptic")}</p>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: THE_SUIT, alt: "The Biosphere Suit — Consciousness Exoskeleton" })}>
                      <img src={THE_SUIT} alt="Biosphere Suit" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(0,120,200,0.4))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.theSuit")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.biosphereExo")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.suitSubsystems")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: BIAURA_SKIN, alt: "BiAura Skin Mk1 — 15 Subsystems Blueprint" })}>
                      <img src={BIAURA_SKIN} alt="BiAura Skin Mk1" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.biauraSkin")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.cockpitConsciousness")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.quillMask")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: SCADA_DIAGRAM, alt: "Biosphere Suit SCADA Control Diagram" })}>
                      <img src={SCADA_DIAGRAM} alt="SCADA Diagram" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.scada")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.controlArch")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.realTimeMonitoring")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: HAPTIC_HUD, alt: "Haptic HUD Dashboard — Full Integration" })}>
                      <img src={HAPTIC_HUD} alt="Haptic HUD" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.hapticHUD")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.fullIntegration")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.yodaControl")}</p>
                  </div>
                </div>
              </div>

              {/* CATEGORY 2: EXHIBITION SPACES */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
                  <p className="text-xs tracking-[0.35em] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.catExhibition")}</p>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: EXHIBITION_ENTRANCE, alt: "Exhibition Entrance Portal" })}>
                      <img src={EXHIBITION_ENTRANCE} alt="Entrance Portal" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.entrancePortal")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.immersiveEntry")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: EXHIBITION_HOLODECK, alt: "Holodeck Chamber" })}>
                      <img src={EXHIBITION_HOLODECK} alt="Holodeck Chamber" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.holodeckChamber")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.fullImmersion")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: EXHIBITION_BIGDATA, alt: "Big Data Wall" })}>
                      <img src={EXHIBITION_BIGDATA} alt="Big Data Wall" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.bigDataWall")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.dataVisualization")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: CAPSTONE_HOLODECK, alt: "Capstone KF04 Holodeck" })}>
                      <img src={CAPSTONE_HOLODECK} alt="Capstone Holodeck" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.capstoneKF04")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.keystoneFrame")}</p>
                  </div>
                </div>
              </div>

              {/* CATEGORY 3: THE GAME — Learning Pathways */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
                  <p className="text-xs tracking-[0.35em] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.catGame")}</p>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: PLAY_ARC_1, alt: "Play Arc 1 — Curricular" })}>
                      <img src={PLAY_ARC_1} alt="Arc 1 — Curricular: Relay Structure, Chapter Navigation, Knowledge Mapping" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "240px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.arc1Curricular")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.relayStructure")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: PLAY_ARC_2, alt: "Play Arc 2 — Progression" })}>
                      <img src={PLAY_ARC_2} alt="Arc 2 — Progression: XP Tracking, Level Advancement, Achievement System" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "240px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.arc2Progression")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.masteryLevels")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: PLAY_ARC_3, alt: "Play Arc 3 — Application" })}>
                      <img src={PLAY_ARC_3} alt="Arc 3 — Application: Master Weaver Dashboard, Relay Progress, Thesis Development" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "240px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.arc3Application")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.applicationPractice")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: PLAY_ARC_4, alt: "Play Arc 4 — Weaving" })}>
                      <img src={PLAY_ARC_4} alt="Arc 4 — Weaving: Integration, Synthesis, Mastery" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "240px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.arc4Weaving")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.integrationSynthesis")}</p>
                  </div>
                </div>
              </div>

              {/* CATEGORY 4: THE THEORY */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
                  <p className="text-xs tracking-[0.35em] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.catTheory")}</p>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: ISI_DISCOVERY, alt: "ISI Discovery — The Triple Index" })}>
                      <img src={ISI_DISCOVERY} alt="ISI Discovery" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.isi")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.tripleIndex")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.isi123")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: HICE_CUBE, alt: "HICE Cube — 3D Consciousness Architecture" })}>
                      <img src={HICE_CUBE} alt="HICE Cube" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.hiceCube")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.hiceElements")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.3dConsciousness")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: HOMO_CHAIN, alt: "Homo Infrastructus — The Evolution Chain" })}>
                      <img src={HOMO_CHAIN} alt="Homo Chain" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "240px", maxHeight: "320px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.homoChain")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.homoInfrastructus")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.evolutionBuilder")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: SYNTHESIS_ROSETTA, alt: "Block 382 Synthesis — The Rosetta Stone" })}>
                      <img src={SYNTHESIS_ROSETTA} alt="Synthesis" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.synthesis")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.rosettaStone2")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.block382Cards")}</p>
                  </div>
                </div>
              </div>

              {/* CATEGORY 5: RELAY VISION BOARD */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
                  <p className="text-xs tracking-[0.35em] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.catVisionBoard")}</p>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: VISION_BOARD_1, alt: "Relay Vision Board — Section 9" })}>
                      <img src={VISION_BOARD_1} alt="Vision Board 1" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.relayBoard")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.section9Vision")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: VISION_BOARD_2, alt: "Relay Vision Board — Network Topology" })}>
                      <img src={VISION_BOARD_2} alt="Vision Board 2" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.tagNetwork")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.topologyNode")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: VISION_BOARD_3, alt: "Relay Vision Board — System Integration" })}>
                      <img src={VISION_BOARD_3} alt="Vision Board 3" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.integration")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.systemConvergence")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: VISION_BOARD_4, alt: "Relay Vision Board — Field Operations" })}>
                      <img src={VISION_BOARD_4} alt="Vision Board 4" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.fieldOps")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.opsDeployment")}</p>
                  </div>
                </div>
              </div>

              {/* CATEGORY 6: THE SCALE */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
                  <p className="text-xs tracking-[0.35em] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.catScale")}</p>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: VID_FRAME_GLOBAL_SCALE, alt: "4.5 Billion People — $15 Trillion Infrastructure Gap" })}>
                      <img src={VID_FRAME_GLOBAL_SCALE} alt="Global Scale" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.globalScale")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.45billion")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.15trillion")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: VID_FRAME_FORGE, alt: "The Forge — 3+1=4" })}>
                      <img src={VID_FRAME_FORGE} alt="The Forge" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.theForge")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.3plus1")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.blacksmithCE")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: VID_FRAME_ARCHITECTURE, alt: "The Architecture — Thesis, Method, Philosophy, Evidence" })}>
                      <img src={VID_FRAME_ARCHITECTURE} alt="Architecture" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.architecture")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.symbiosisNot")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.60matrixNodes")}</p>
                  </div>
                  <div className="text-center">
                    <div className="cursor-pointer" onClick={() => setLightbox({ src: VID_FRAME_SILK_ROAD, alt: "The Silk Road — West Expansion, Nomad Networks, East Traditions" })}>
                      <img src={VID_FRAME_SILK_ROAD} alt="Silk Road" className="w-full mx-auto mb-3 object-contain rounded" style={{ maxWidth: "200px", filter: "drop-shadow(0 4px 16px rgba(212,168,67,0.3))" }} />
                    </div>
                    <p className="text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.silkRoad")}</p>
                    <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.westNomadEast")}</p>
                    <p className="text-[10px]" style={{ color: TEXT_SILVER }}>{t("home.sevenSteppe")}</p>
                  </div>
                </div>
              </div>
            </div>
            )}

            <div className="mt-10">
              <p className="text-xs" style={{ color: `${GOLD}66` }}>{t("home.perAryaNote")}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: MEDIA ── */}
      {activeTab === "media" && (
        <section className="py-12 sm:py-20 px-6" style={{ background: "#060e1a" }}>
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm tracking-[0.4em] uppercase mb-2" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.videoTheatre")}</p>
            <p className="text-xs tracking-[0.15em] mb-10" style={{ fontFamily: "var(--font-display)", color: TEXT_SILVER }}>{t("home.theFilms")}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="relative rounded overflow-hidden" style={{ border: `1px solid ${GOLD}33` }}>
                  <video controls preload="metadata" poster={FLIGHT_DECK} className="w-full" style={{ maxHeight: "300px", objectFit: "cover" }}>
                    <source src={VIDEO_DEARDEN} type="video/mp4" />
                  </video>
                </div>
                <p className="text-xs tracking-[0.15em] uppercase mt-3" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.deardenDynamics")}</p>
                <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.deardenDynSub")}</p>
              </div>
              <div>
                <div className="relative rounded overflow-hidden" style={{ border: `1px solid ${GOLD}33` }}>
                  <video controls preload="metadata" poster={VID_FRAME_GLOBAL_SCALE} className="w-full" style={{ maxHeight: "300px", objectFit: "cover" }}>
                    <source src={VIDEO_PRINCIPIA} type="video/mp4" />
                  </video>
                </div>
                <p className="text-xs tracking-[0.15em] uppercase mt-3" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.principiaV5")}</p>
                <p className="text-[10px] mt-1" style={{ color: TEXT_SILVER }}>{t("home.principiaV5Sub")}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          GRATEFUL PARTNERS — always visible above footer
          Free branding by association — mirror class — sentinel mode
          Categorised typographic grid with clickable outbound links
          ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-6" style={{ background: "#060e1a", borderTop: `1px solid ${GOLD}22` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.5em] uppercase mb-2" style={{ fontFamily: "var(--font-display)", color: GOLD }}>{t("home.gratefulTitle")}</p>
            <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "var(--font-display)", color: TEXT_SILVER }}>{t("home.gratefulSubtitle")}</p>
            <div className="w-20 h-px mx-auto mb-8" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
            <p className="text-sm leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "var(--font-display)", color: TEXT_WHITE, lineHeight: "1.8" }}>{t("home.gratefulIntro")}</p>
          </div>

          {/* ── CATEGORISED PARTNER GRID ── */}
          {([
            { catKey: "home.gratefulCatForge", partners: [
              { name: "Shokz", url: "https://www.shokz.com", key: "home.gratefulShokz" },
              { name: "HP", url: "https://www.hp.com", key: "home.gratefulHP" },
              { name: "Garmin", url: "https://www.garmin.com", key: "home.gratefulGarmin" },
              { name: "Apple", url: "https://www.apple.com", key: "home.gratefulApple" },
              { name: "Lenovo", url: "https://www.lenovo.com", key: "home.gratefulLenovo" },
              { name: "Intel", url: "https://www.intel.com", key: "home.gratefulIntel" },
              { name: "Omega", url: "https://www.omegawatches.com", key: "home.gratefulOmega" },
              { name: "Seiko", url: "https://www.seikowatches.com", key: "home.gratefulSeiko" },
              { name: "Dyson", url: "https://www.dyson.com", key: "home.gratefulDyson" },
              { name: "Sony", url: "https://www.sony.com", key: "home.gratefulSony" },
              { name: "Samsung", url: "https://www.samsung.com", key: "home.gratefulSamsung" },
            ]},
            { catKey: "home.gratefulCatDigital", partners: [
              { name: "Manus AI", url: "https://manus.im", key: "home.gratefulManus" },
              { name: "Google", url: "https://www.google.com", key: "home.gratefulGoogle" },
              { name: "Microsoft", url: "https://www.microsoft.com", key: "home.gratefulMicrosoft" },
              { name: "Meta", url: "https://about.meta.com", key: "home.gratefulMeta" },
              { name: "Adobe", url: "https://www.adobe.com", key: "home.gratefulAdobe" },
              { name: "Amazon", url: "https://www.amazon.com", key: "home.gratefulAmazon" },
              { name: "Autodesk", url: "https://www.autodesk.com", key: "home.gratefulAutodesk" },
              { name: "Cisco", url: "https://www.cisco.com", key: "home.gratefulCisco" },
              { name: "Starlink", url: "https://www.starlink.com", key: "home.gratefulStarlink" },
            ]},
            { catKey: "home.gratefulCatStory", partners: [
              { name: "Disney", url: "https://www.disney.com", key: "home.gratefulDisney" },
              { name: "Marvel", url: "https://www.marvel.com", key: "home.gratefulMarvel" },
              { name: "DreamWorks", url: "https://www.dreamworks.com", key: "home.gratefulDreamWorks" },
              { name: "MGM", url: "https://www.mgm.com", key: "home.gratefulMGM" },
              { name: "HBO", url: "https://www.hbo.com", key: "home.gratefulHBO" },
              { name: "Netflix", url: "https://www.netflix.com", key: "home.gratefulNetflix" },
              { name: "BBC", url: "https://www.bbc.com", key: "home.gratefulBBC" },
              { name: "ESPN", url: "https://www.espn.com", key: "home.gratefulESPN" },
            ]},
            { catKey: "home.gratefulCatRecord", partners: [
              { name: "Reuters", url: "https://www.reuters.com", key: "home.gratefulReuters" },
              { name: "AP", url: "https://www.ap.org", key: "home.gratefulAP" },
              { name: "Bloomberg", url: "https://www.bloomberg.com", key: "home.gratefulBloomberg" },
              { name: "Al Jazeera", url: "https://www.aljazeera.com", key: "home.gratefulAlJazeera" },
              { name: "The Times", url: "https://www.thetimes.co.uk", key: "home.gratefulTheTimes" },
              { name: "Wall Street Journal", url: "https://www.wsj.com", key: "home.gratefulWSJ" },
              { name: "Washington Post", url: "https://www.washingtonpost.com", key: "home.gratefulWashPost" },
              { name: "TIME", url: "https://time.com", key: "home.gratefulTIME" },
              { name: "National Geographic", url: "https://www.nationalgeographic.com", key: "home.gratefulNatGeo" },
            ]},
            { catKey: "home.gratefulCatJournals", partners: [
              { name: "Nature", url: "https://www.nature.com", key: "home.gratefulNature" },
              { name: "Science", url: "https://www.science.org", key: "home.gratefulScience" },
              { name: "The Lancet", url: "https://www.thelancet.com", key: "home.gratefulLancet" },
              { name: "IEEE", url: "https://www.ieee.org", key: "home.gratefulIEEE" },
              { name: "ASCE", url: "https://www.asce.org", key: "home.gratefulASCE" },
            ]},
            { catKey: "home.gratefulCatMuseums", partners: [
              { name: "Smithsonian", url: "https://www.si.edu", key: "home.gratefulSmithsonian" },
              { name: "British Museum", url: "https://www.britishmuseum.org", key: "home.gratefulBritishMuseum" },
              { name: "The Louvre", url: "https://www.louvre.fr", key: "home.gratefulLouvre" },
              { name: "The Met", url: "https://www.metmuseum.org", key: "home.gratefulMet" },
              { name: "Hermitage", url: "https://www.hermitagemuseum.org", key: "home.gratefulHermitage" },
              { name: "Guggenheim", url: "https://www.guggenheim.org", key: "home.gratefulGuggenheim" },
              { name: "M+ Museum HK", url: "https://www.mplus.org.hk", key: "home.gratefulMPlus" },
            ]},
            { catKey: "home.gratefulCatLibraries", partners: [
              { name: "British Library", url: "https://www.bl.uk", key: "home.gratefulBritishLibrary" },
              { name: "Library of Congress", url: "https://www.loc.gov", key: "home.gratefulLOC" },
              { name: "BnF (France)", url: "https://www.bnf.fr", key: "home.gratefulBNF" },
              { name: "NDL (Japan)", url: "https://www.ndl.go.jp", key: "home.gratefulNDL" },
              { name: "NLC (China)", url: "https://www.nlc.cn", key: "home.gratefulNLC" },
              { name: "Royal Society", url: "https://royalsociety.org", key: "home.gratefulRoyalSociety" },
            ]},
            { catKey: "home.gratefulCatScience", partners: [
              { name: "NASA", url: "https://www.nasa.gov", key: "home.gratefulNASA" },
              { name: "CERN", url: "https://home.cern", key: "home.gratefulCERN" },
              { name: "SETI", url: "https://www.seti.org", key: "home.gratefulSETI" },
              { name: "Red Cross", url: "https://www.icrc.org", key: "home.gratefulRedCross" },
            ]},
            { catKey: "home.gratefulCatGlobal", partners: [
              { name: "United Nations", url: "https://www.un.org", key: "home.gratefulUN" },
              { name: "UN SDGs", url: "https://sdgs.un.org", key: "home.gratefulUNSDG" },
              { name: "WHO", url: "https://www.who.int", key: "home.gratefulWHO" },
              { name: "WWF", url: "https://www.worldwildlife.org", key: "home.gratefulWWF" },
              { name: "World Bank", url: "https://www.worldbank.org", key: "home.gratefulWorldBank" },
              { name: "Nobel Prize", url: "https://www.nobelprize.org", key: "home.gratefulNobel" },
              { name: "Olympics", url: "https://www.olympics.com", key: "home.gratefulOlympics" },
              { name: "FIFA", url: "https://www.fifa.com", key: "home.gratefulFIFA" },
            ]},
            { catKey: "home.gratefulCatFinance", partners: [
              { name: "JPMorgan Chase", url: "https://www.chase.com", key: "home.gratefulChase" },
              { name: "HSBC", url: "https://www.hsbc.com", key: "home.gratefulHSBC" },
              { name: "Wells Fargo", url: "https://www.wellsfargo.com", key: "home.gratefulWellsFargo" },
            ]},
            { catKey: "home.gratefulCatEngineer", partners: [
              { name: "Rolls-Royce", url: "https://www.rolls-royce.com", key: "home.gratefulRollsRoyce" },
              { name: "Aston Martin", url: "https://www.astonmartin.com", key: "home.gratefulAstonMartin" },
              { name: "Lotus", url: "https://www.lotuscars.com", key: "home.gratefulLotus" },
              { name: "Bentley", url: "https://www.bentleymotors.com", key: "home.gratefulBentley" },
              { name: "Maserati", url: "https://www.maserati.com", key: "home.gratefulMaserati" },
              { name: "Porsche", url: "https://www.porsche.com", key: "home.gratefulPorsche" },
              { name: "BMW", url: "https://www.bmw.com", key: "home.gratefulBMW" },
              { name: "Mercedes-Benz", url: "https://www.mercedes-benz.com", key: "home.gratefulMercedes" },
              { name: "Tesla", url: "https://www.tesla.com", key: "home.gratefulTesla" },
              { name: "GE", url: "https://www.ge.com", key: "home.gratefulGE" },
            ]},
            { catKey: "home.gratefulCatLifestyle", partners: [
              { name: "Tiffany & Co.", url: "https://www.tiffany.com", key: "home.gratefulTiffany" },
              { name: "Virgin", url: "https://www.virgin.com", key: "home.gratefulVirgin" },
              { name: "Alibaba", url: "https://www.alibaba.com", key: "home.gratefulAlibaba" },
              { name: "WeWork", url: "https://www.wework.com", key: "home.gratefulWeWork" },
            ]},
          ] as { catKey: string; partners: { name: string; url: string; key: string }[] }[]).map((category) => (
            <div key={category.catKey} className="mb-10">
              <div className="flex items-center gap-2 sm:gap-4 mb-5">
                <div className="h-px flex-1 shrink-0 min-w-4" style={{ background: `${GOLD}33` }} />
                <h3 className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] uppercase text-center leading-relaxed" style={{ fontFamily: "var(--font-display)", color: GOLD }}>
                  {t(category.catKey)}
                </h3>
                <div className="h-px flex-1" style={{ background: `${GOLD}33` }} />
              </div>
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-3">
                {category.partners.map((p, i) => (
                  <span key={p.name} className="inline-flex items-center">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t(p.key)}
                      className="inline-flex items-center gap-1.5 text-sm sm:text-base tracking-[0.08em] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-display)", color: TEXT_WHITE }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = GOLD_BRIGHT)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_WHITE)}
                    >
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${new URL(p.url).hostname}&sz=32`}
                        alt={`${p.name} logo`}
                        width={20}
                        height={20}
                        className="rounded-sm object-contain"
                        style={{ filter: "brightness(1.1)" }}
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                      {p.name}
                    </a>
                    {i < category.partners.length - 1 && (
                      <span className="mx-2 text-xs" style={{ color: `${GOLD}55` }}>&middot;</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-8">
            <div className="w-20 h-px mx-auto mb-4" style={{ background: `linear-gradient(to right, transparent, ${GOLD}44, transparent)` }} />
            <p className="text-xs tracking-[0.15em] italic" style={{ fontFamily: "var(--font-display)", color: `${GOLD}88` }}>{t("home.gratefulMore")}</p>
            <p className="text-xs tracking-[0.2em] mt-3 uppercase" style={{ fontFamily: "var(--font-display)", color: `${GOLD}44` }}>{t("home.partnerStats" as any)}</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER — always visible below tabs
          ══════════════════════════════════════════════════════════ */}
      <footer className="py-10 text-center" style={{ borderTop: `1px solid ${GOLD}33`, background: "#081422" }}>
        <p className="text-sm tracking-[0.12em] font-light" style={{ fontFamily: "var(--font-display)", color: GOLD_DIM }}>
          {t("home.footer1")}
        </p>
        <p className="text-xs mt-2 tracking-widest uppercase" style={{ fontFamily: "var(--font-display)", color: "#3a4a68" }}>
          {t("home.footer2")}
        </p>
        <a
          href="https://infrastructure-academy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xs tracking-[0.15em] uppercase transition-colors duration-300"
          style={{ fontFamily: "var(--font-display)", color: "#3a4a68" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#3a4a68")}
        >
          {t("home.infraAcademyOdyssey")}
        </a>
      </footer>

      {/* ── LIGHTBOX OVERLAY ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] object-contain rounded"
              style={{ filter: "drop-shadow(0 8px 32px rgba(212,168,67,0.4))" }}
            />
            <p className="text-center mt-3 text-sm tracking-[0.1em]" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>
              {lightbox.alt}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-lg"
              style={{ background: NAVY, color: GOLD, border: `1px solid ${GOLD}44` }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
