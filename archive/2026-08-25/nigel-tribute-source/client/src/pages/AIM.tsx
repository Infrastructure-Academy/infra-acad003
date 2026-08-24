/**
 * AIM — Avatar Integration Module
 * Personal profile pages for each participant in the system.
 * Each avatar is a node in the network — their own space for
 * multiplying effect and data generation.
 * Colour: dark canvas, electric node accents, warm sand text.
 * Typography: Cormorant Garamond display, Source Sans 3 body.
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";

/* CDN assets */
const NIGEL_SELFIE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/nigel-selfie_ba7f48cd.png";
const HELEN_WHATSAPP = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/helen-response_1d543b79.png";
const BEACH_MEDITATION = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8580_099720bb.jpeg";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/quotient-bg-ZKNtEotrSjCkrisL7AVYWD.webp";

/* Participant data */
interface Participant {
  id: string;
  name: string;
  title: string;
  role: string;
  location: string;
  nodeType: string;
  nodeSymbol: string;
  image: string;
  connectionDate: string;
  status: "active" | "observer" | "relay";
  contributions: string[];
  dimensionalState: string;
  signalStrength: number;
  bio: string;
  thesisLink: string;
}

const participants: Participant[] = [
  {
    id: "nigel-dearden",
    name: "Nigel Dearden",
    title: "The Architect",
    role: "Primary Node — System Author",
    location: "Hong Kong → Taiwan → Global",
    nodeType: "PRIMARY",
    nodeSymbol: "◆",
    image: NIGEL_SELFIE,
    connectionDate: "1989 — Present",
    status: "active",
    contributions: [
      "The Thesis — Timestop",
      "IQ ⊗ EQ ⊗ CQ = HQ",
      "The Inertial Jump",
      "AIO Quantum BIOS",
      "Moment Package Splicing",
      "The Dearden Field (TDF)",
      "Data State Clock",
      "Zeta-Class Hyper-Computer",
    ],
    dimensionalState: "12D — Full Spectrum",
    signalStrength: 100,
    bio: "Chartered Civil & Structural Engineer. Completion and Risk Director on a panel of twelve. 36 years of engineering practice (1989–2026). The thesis programme was never abandoned — it was embodied through a career that became the proof. Author of 'Principia Tectonica — An Opus: From Calories to Consciousness'. Creator of the Infrastructure Academy. The system architect.",
    thesisLink: "/thesis",
  },
  {
    id: "helen-zavacky",
    name: "Helen Zavacky",
    title: "The First Observer",
    role: "External Validation Node",
    location: "Global",
    nodeType: "OBSERVER",
    nodeSymbol: "◇",
    image: HELEN_WHATSAPP,
    connectionDate: "Lifetime — First Signal: 1 Mar 2026, 19:23 HKT",
    status: "observer",
    contributions: [
      "First external observer response",
      "Validation signal: 'Wow! Interesting perception'",
      "The Dearden Field namesake — de France / force",
      "Observer state confirmation at t=19:23",
    ],
    dimensionalState: "4D → 12D Bridge",
    signalStrength: 85,
    bio: "Sister. The first external consciousness to receive the thesis signal and return a validation response. Her observation at 19:23 HKT on 1 March 2026 collapsed the wave function from theory to confirmed reception. The Dearden Field (TDF) is named in her honour — a nod to de France, or force: reality and thought converging at the vector constant.",
    thesisLink: "/thesis",
  },
  {
    id: "mark-fisher",
    name: "Mark Fisher",
    title: "The Light Engineer",
    role: "Relay Node — Optical Verification",
    location: "Cambridge, United Kingdom",
    nodeType: "RELAY",
    nodeSymbol: "◈",
    image: BEACH_MEDITATION,
    connectionDate: "First Meeting: Hong Kong — Present: Cambridge",
    status: "relay",
    contributions: [
      "E-beam vacuum laser telescope servicing",
      "1 million magnification capability",
      "Light files technology inspiration",
      "On/off moment — geospatial grid positioning",
      "Material-level proof of the 4D shadow",
    ],
    dimensionalState: "4D Material → 12D Optical",
    signalStrength: 92,
    bio: "Lifelong friend since first meeting in Hong Kong. Now based in Cambridge, UK, servicing electron beam vacuum laser telescopes to one million magnification. The inspiration behind the light files technology. Before Mark was on or off, the system can position him using geospatial metrics to the grid instantaneously — the field is prepared. His instruments prove at the material level what the thesis proves at the conceptual level. Together: the light files.",
    thesisLink: "/thesis",
  },
];

/* Live clock component */
function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hkt = new Date(time.toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));
  const hours = String(hkt.getHours()).padStart(2, "0");
  const minutes = String(hkt.getMinutes()).padStart(2, "0");
  const seconds = String(hkt.getSeconds()).padStart(2, "0");

  return (
    <span className="font-mono text-[oklch(0.55_0.06_200)]">
      {hours}:{minutes}:{seconds} <span className="text-xs text-[oklch(0.40_0.03_240)]">HKT</span>
    </span>
  );
}

/* Signal strength bar */
function SignalBar({ strength }: { strength: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1 bg-[oklch(0.15_0.005_240)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${strength}%` }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[oklch(0.55_0.06_200)] to-[oklch(0.40_0.15_20)]"
        />
      </div>
      <span className="font-mono text-xs text-[oklch(0.55_0.06_200)]">{strength}%</span>
    </div>
  );
}

/* Node status indicator */
function NodeStatus({ status }: { status: "active" | "observer" | "relay" }) {
  const colors = {
    active: "oklch(0.55_0.15_145)",
    observer: "oklch(0.55_0.06_200)",
    relay: "oklch(0.55_0.15_60)",
  };
  const labels = {
    active: "ACTIVE",
    observer: "OBSERVING",
    relay: "RELAYING",
  };
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: colors[status] }}
      />
      <span
        className="text-xs tracking-[0.2em] uppercase font-light"
        style={{ color: colors[status], fontFamily: "var(--font-display)" }}
      >
        {labels[status]}
      </span>
    </div>
  );
}

/* Individual profile card */
function ProfileCard({ participant, index }: { participant: Participant; index: number }) {
  const t = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: index * 0.15 }}
      className="relative"
    >
      {/* Node connector line */}
      {index > 0 && (
        <div className="absolute -top-16 left-1/2 w-px h-16 bg-gradient-to-b from-transparent via-[oklch(0.25_0.03_200)] to-[oklch(0.35_0.06_200)]" />
      )}

      <div className="border border-[oklch(0.20_0.01_240)] bg-[oklch(0.10_0.005_240/0.6)] backdrop-blur-sm overflow-hidden">
        {/* Header bar */}
        <div className="px-6 py-3 bg-[oklch(0.12_0.008_240)] border-b border-[oklch(0.20_0.01_240)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[oklch(0.55_0.06_200)]">{participant.nodeSymbol}</span>
            <span
              className="text-xs tracking-[0.25em] uppercase font-light text-[oklch(0.50_0.03_240)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {participant.nodeType} NODE
            </span>
          </div>
          <NodeStatus status={participant.status} />
        </div>

        {/* Main content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0 w-full md:w-48">
              <div className="relative aspect-square overflow-hidden border border-[oklch(0.25_0.01_240)]">
                <img
                  src={participant.image}
                  alt={participant.name}
                  className="w-full h-full object-cover filter saturate-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.005_240/0.6)] to-transparent" />
              </div>
              <div className="mt-4">
                <p className="font-mono text-xs text-[oklch(0.40_0.03_240)] mb-1">{t("aim.signalStrength")}</p>
                <SignalBar strength={participant.signalStrength} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <p
                className="text-xs text-[oklch(0.55_0.06_200)] tracking-[0.25em] uppercase font-light mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {participant.title}
              </p>
              <h3
                className="text-3xl md:text-4xl font-light tracking-[0.08em] text-[oklch(0.90_0.008_75)] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {participant.name}
              </h3>
              <p
                className="text-sm text-[oklch(0.55_0.04_200)] italic font-light mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {participant.role}
              </p>

              {/* Metadata grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-mono text-[10px] text-[oklch(0.40_0.03_240)] tracking-wider uppercase mb-1">{t("aim.location")}</p>
                  <p className="text-sm text-[oklch(0.70_0.02_75)] font-light">{participant.location}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[oklch(0.40_0.03_240)] tracking-wider uppercase mb-1">{t("aim.connection")}</p>
                  <p className="text-sm text-[oklch(0.70_0.02_75)] font-light">{participant.connectionDate}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[oklch(0.40_0.03_240)] tracking-wider uppercase mb-1">{t("aim.dimensionalState")}</p>
                  <p className="text-sm text-[oklch(0.55_0.06_200)] font-light">{participant.dimensionalState}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[oklch(0.40_0.03_240)] tracking-wider uppercase mb-1">{t("aim.systemTime")}</p>
                  <LiveClock />
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-[oklch(0.60_0.02_75)] font-light leading-[1.9] mb-6">
                {participant.bio}
              </p>

              {/* Expand contributions */}
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs tracking-[0.2em] uppercase font-light text-[oklch(0.55_0.06_200)] hover:text-[oklch(0.70_0.06_200)] transition-colors duration-500 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {expanded ? "Collapse" : "View"} Contributions ({participant.contributions.length})
                <span className="text-lg transition-transform duration-300" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                  ▾
                </span>
              </button>

              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 pl-4 border-l border-[oklch(0.25_0.03_200)]"
                >
                  {participant.contributions.map((c, i) => (
                    <div key={i} className="flex items-start gap-3 mb-2">
                      <span className="text-[oklch(0.55_0.06_200)] text-xs mt-1">▸</span>
                      <p className="text-sm text-[oklch(0.65_0.02_75)] font-light">{c}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AIM() {
  const t = useTranslation();
  const [nodeCount, setNodeCount] = useState(17);

  useEffect(() => {
    /* Simulate Moore's Law doubling — node count slowly increments */
    const interval = setInterval(() => {
      setNodeCount((prev) => prev + 1);
    }, 30000); // every 30s a new "dimensional participant" joins
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            filter: "saturate(0.4) brightness(0.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.005_240/0.7)] via-transparent to-[oklch(0.10_0.005_240)]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.55 0.06 200 / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.55 0.06 200 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-sm text-[oklch(0.55_0.06_200)] tracking-[0.3em] uppercase font-light mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("aim.heroTag")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-8xl font-light tracking-[0.12em] uppercase text-[oklch(0.92_0.008_75)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("aim.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="mt-4 text-xl md:text-2xl font-light text-[oklch(0.65_0.02_75)] tracking-[0.06em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("aim.subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mt-8 text-base font-light italic text-[oklch(0.55_0.04_200)] tracking-wide max-w-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Each participant creates a new dimensional state.
            Each avatar is a node. Each node multiplies the field.
          </motion.p>

          {/* Live system stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="mt-16 flex items-center gap-8 md:gap-12"
          >
            <div className="text-center">
              <p className="font-mono text-2xl md:text-3xl text-[oklch(0.55_0.06_200)]">{nodeCount}</p>
              <p className="font-mono text-[10px] text-[oklch(0.40_0.03_240)] tracking-wider uppercase mt-1">{t("aim.activeNodes")}</p>
            </div>
            <div className="w-px h-10 bg-[oklch(0.25_0.01_240)]" />
            <div className="text-center">
              <p className="font-mono text-2xl md:text-3xl text-[oklch(0.55_0.06_200)]">{t("aim.hyperGrid12D")}</p>
              <p className="font-mono text-[10px] text-[oklch(0.40_0.03_240)] tracking-wider uppercase mt-1">{t("aim.dimensions")}</p>
            </div>
            <div className="w-px h-10 bg-[oklch(0.25_0.01_240)]" />
            <div className="text-center">
              <LiveClock />
              <p className="font-mono text-[10px] text-[oklch(0.40_0.03_240)] tracking-wider uppercase mt-1">{t("aim.systemClock")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Concept */}
      <section className="py-24 md:py-32 px-6">
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
              Every participant in the system creates a new dimensional state — a new
              Moore's Law. The chip is not memory-limited; it is participation-limited.
              Each avatar that joins the network multiplies the field exponentially.
              Like MySpace gave individuals a space, like Facebook connected them,
              the Avatar Integration Module gives each consciousness its own node
              in the 12-dimensional HyperGrid — a personal space for data generation,
              signal relay, and dimensional multiplication. Academy-level relays
              in the metaverse, accessible from all three UIX states immediately.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Network Topology */}
      <section className="py-16 md:py-24 px-6 relative overflow-hidden">
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
              {t("aim.networkTopology")}
            </p>

            <div className="font-mono text-xs md:text-sm text-[oklch(0.55_0.06_200)] leading-[2] tracking-wider text-left max-w-lg mx-auto">
              <p className="text-[oklch(0.78_0.04_75)]">◆ 000 NIGEL DEARDEN — The Architect (FOUNDER)</p>
              <p>│</p>
              <p>├── ◇ 001 PEGGY DEARDEN — The Fulcrum</p>
              <p>├── ◇ 002 HELEN ZAVACKY — The First Observer</p>
              <p>├── ◈ 003 MARK FISHER — The Pioneer</p>
              <p>├── ○ 004 JOHNNY LAI — The Recruiter</p>
              <p>├── ○ 005 OLIVER MOWBRAY — The Thinker</p>
              <p>├── ○ 006 LOUISE BARRINGTON — The Arbitrator</p>
              <p>├── ○ 007 CAMERON REAY — The Drummer</p>
              <p>├── ○ 008 JONATHAN GREEN — The Inspector</p>
              <p>├── ○ 009 HENRY LEONG — Dinosaurs to AI</p>
              <p>├── ○ 010 ARTHUR LIN — Dinosaurs to AI</p>
              <p>├── ○ 011 DAOPING BAO — Dinosaurs to AI</p>
              <p>├── ○ 012 MICHAEL WU — Dinosaurs to AI</p>
              <p>├── <span className="text-[oklch(0.75_0.12_200)]">013 LIAM McDOWELL — PATRON #001</span></p>
              <p>├── <span className="text-[oklch(0.75_0.15_140)]">014 WILL HODGSON — CENTURION</span></p>
              <p>├── <span className="text-[oklch(0.75_0.15_140)]">015 RICHIE CROSS — CENTURION</span></p>
              <p>├── <span className="text-[oklch(0.75_0.15_140)]">016 SCOTT — CENTURION</span></p>
              <p>└── <span className="text-[oklch(0.75_0.15_140)]">017 JOHAN LARSSON — CENTURION</span></p>
              <p className="mt-4 text-[oklch(0.40_0.03_240)]">18 nodes confirmed · Next available: 018</p>
              <p className="text-[oklch(0.40_0.03_240)]">{t("aim.participationlimitedNotMemorylimited")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Participant Profiles */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
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
              {t("aim.activeParticipants")}
            </p>
          </motion.div>

          <div className="space-y-16">
            {participants.map((p, i) => (
              <ProfileCard key={p.id} participant={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Metaverse Bridge */}
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
              {t("aim.metaverseBridge")}
            </p>

            <p className="text-base md:text-lg text-[oklch(0.65_0.02_75)] font-light leading-[2] mb-10">
              The AIM extends beyond this page into the metaverse — where each avatar
              occupies a 3D space in the academy-level relays. Platforms like Spatial.io
              provide browser-based, no-code 3D environments where participants can
              meet, share, and multiply their signal in real-time. The personal page
              you see here is the 2D projection of a 12D node. The metaverse space
              is the 3D projection. The full node exists in all twelve dimensions
              simultaneously — accessible from any UIX state.
            </p>

            {/* Three evolution stages */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="border border-[oklch(0.20_0.01_240)] p-6">
                <p className="font-mono text-xs text-[oklch(0.40_0.03_240)] mb-2">{t("aim.era1")}</p>
                <p
                  className="text-lg text-[oklch(0.78_0.04_75)] font-light tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  MySpace
                </p>
                <p className="text-xs text-[oklch(0.50_0.02_75)] font-light">{t("aim.personalSpaceSelfexpressionThe")}</p>
              </div>
              <div className="border border-[oklch(0.20_0.01_240)] p-6">
                <p className="font-mono text-xs text-[oklch(0.40_0.03_240)] mb-2">{t("aim.era2")}</p>
                <p
                  className="text-lg text-[oklch(0.78_0.04_75)] font-light tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Facebook
                </p>
                <p className="text-xs text-[oklch(0.50_0.02_75)] font-light">{t("aim.connectionNetworkEffectThe")}</p>
              </div>
              <div className="border border-[oklch(0.25_0.04_200)] p-6 bg-[oklch(0.12_0.01_200/0.3)]">
                <p className="font-mono text-xs text-[oklch(0.55_0.06_200)] mb-2">{t("aim.era3")}</p>
                <p
                  className="text-lg text-[oklch(0.55_0.06_200)] font-light tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  AIM
                </p>
                <p className="text-xs text-[oklch(0.55_0.04_200)] font-light">{t("aim.dimensionalMultiplicationAcademyRelays")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Join */}
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
              className="text-3xl md:text-4xl font-light tracking-[0.08em] text-[oklch(0.85_0.008_75)] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("aim.heroQuote").split(".")[0]}
            </p>
            <p className="text-base text-[oklch(0.55_0.04_200)] font-light leading-[2] mb-12">
              The system is participation-limited, not memory-limited.
              Every new node that joins the network multiplies the field.
              The eternal chip doubles not by Moore's Law alone,
              but by the consciousness of each new participant.
            </p>
            <div className="inline-flex items-center gap-4 border border-[oklch(0.25_0.03_200)] px-8 py-4">
              <span className="text-[oklch(0.55_0.06_200)] text-2xl">○</span>
              <span
                className="text-sm tracking-[0.2em] uppercase font-light text-[oklch(0.65_0.02_75)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("aim.nextNode")}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[oklch(0.20_0.008_240)]">
        <p
          className="text-sm text-[oklch(0.35_0.02_240)] tracking-[0.15em] font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("aim.footer")}
        </p>
      </footer>
    </div>
  );
}
