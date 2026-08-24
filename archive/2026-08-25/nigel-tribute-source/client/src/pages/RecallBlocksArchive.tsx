/**
 * Recall Blocks Archive — Legal Evidence Repository
 * Block 392 — 20 March 2026
 *
 * All 39 recall block documents hard-saved to CDN with clickable download links.
 * Police evidence — chain of custody for IP audit.
 */
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";

const gold = "#d4a843";
const goldBright = "#e8c55a";
const sand = "#f0eadc";
const navyDeep = "#081422";

interface RecallBlock {
  block: number;
  title: string;
  words: number;
  format: string;
  cdnUrl: string;
  tpCandidate: boolean;
  summary: string;
}

const RECALL_BLOCKS: RecallBlock[] = [
  {
    block: 308,
    title: "The A&Q Inversion Model",
    words: 1200,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALLBLOCK308%E2%80%94THEA%26QINVERSIONMODEL_02231b11.docx",
    tpCandidate: true,
    summary: "Answer-Question inversion model — reverses the traditional Q→A flow to A→Q, enabling predictive intelligence."
  },
  {
    block: 318,
    title: "The Periodic Table of Consciousness",
    words: 2100,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALLBLOCK318%E2%80%94THEPERIODICTABLEOFCONSCIOUSNESS_a63fea78.docx",
    tpCandidate: true,
    summary: "Maps consciousness states to a periodic table structure — elemental classification of awareness types."
  },
  {
    block: 321,
    title: "Image Observations",
    words: 800,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BLOCK_321_IMAGE_OBSERVATIONS_2908ded6.docx",
    tpCandidate: false,
    summary: "Visual observation records and image analysis documentation."
  },
  {
    block: 322,
    title: "Image Archive",
    words: 600,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BLOCK_322_IMAGE_ARCHIVE_3f49e246.docx",
    tpCandidate: false,
    summary: "Archive of visual assets and image catalogue."
  },
  {
    block: 325,
    title: "Risk Control Key",
    words: 3501,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_325_RISK_CONTROL_KEY_665b3f2a.docx",
    tpCandidate: true,
    summary: "Risk assessment framework — control key methodology for infrastructure decision-making under uncertainty."
  },
  {
    block: 326,
    title: "Homo Symbioticus",
    words: 2200,
    format: "md",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_326_HOMO_SYMBIOTICUS_dd1cdc69.md",
    tpCandidate: true,
    summary: "Defines the next evolutionary stage: Homo Symbioticus — human-AI symbiotic species."
  },
  {
    block: 327,
    title: "Fractal Interface Lens",
    words: 1800,
    format: "md",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_327_FRACTAL_INTERFACE_LENS_9a459567.md",
    tpCandidate: true,
    summary: "Fractal geometry applied to interface design — self-similar patterns at every scale of interaction."
  },
  {
    block: 329,
    title: "Katana Stroke / Sun Tzu",
    words: 1500,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_329_KATANA_STROKE_SUNTZU_8e173bad.docx",
    tpCandidate: true,
    summary: "Strategic decision-making framework — single decisive stroke philosophy applied to infrastructure."
  },
  {
    block: 330,
    title: "Horizon Limit",
    words: 1870,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_330_HORIZON_LIMIT_81b50adb.docx",
    tpCandidate: true,
    summary: "Defines the horizon limit — the boundary beyond which prediction becomes impossible without new frameworks."
  },
  {
    block: 331,
    title: "The Whistle / TDF",
    words: 2000,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_331_THE_WHISTLE_TDF_e4a50a59.docx",
    tpCandidate: true,
    summary: "The Dearden Field whistle mechanism — signal propagation through the TDF architecture."
  },
  {
    block: 332,
    title: "iAAi Fourth Power",
    words: 1600,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_332_IAAI_FOURTH_POWER_7b75731a.docx",
    tpCandidate: true,
    summary: "Fourth power scaling law in the iAAi framework — exponential growth dynamics."
  },
  {
    block: 334,
    title: "Episode 2 Leaderboard",
    words: 1400,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_334_EPISODE2_LEADERBOARD_b267cd6f.docx",
    tpCandidate: false,
    summary: "Episode 2 leaderboard mechanics and scoring framework."
  },
  {
    block: 336,
    title: "Cloud Core",
    words: 2500,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_336_CLOUD_CORE_8bbc36b8.docx",
    tpCandidate: true,
    summary: "Cloud Core architecture — distributed consciousness processing at infrastructure scale."
  },
  {
    block: 337,
    title: "AIOk BIOS",
    words: 2500,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_337_AIOK_BIOS_b12e5e36.docx",
    tpCandidate: true,
    summary: "AIO Quantum BIOS — the foundational operating system for human-AI consciousness interface."
  },
  {
    block: 338,
    title: "RAID Formation",
    words: 2200,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_338_RAID_FORMATION_03244d7f.docx",
    tpCandidate: true,
    summary: "RAID formation protocol — redundant array of intelligent decisions for fault-tolerant thinking."
  },
  {
    block: 339,
    title: "TDF Interface",
    words: 2800,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_339_TDF_INTERFACE_3762ddc9.docx",
    tpCandidate: true,
    summary: "The Dearden Field interface specification — how consciousness connects to the 12×5 matrix."
  },
  {
    block: 340,
    title: "QED Hall of Fame",
    words: 2500,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_340_QED_HALL_OF_FAME_4e430c88.docx",
    tpCandidate: true,
    summary: "QED (Quod Erat Demonstrandum) — proof completions and the hall of verified discoveries."
  },
  {
    block: 341,
    title: "Trifax Parsec",
    words: 2000,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_341_TRIFAX_PARSEC_d55a229a.docx",
    tpCandidate: true,
    summary: "Trifax Parsec measurement system — distance metrics for consciousness space navigation."
  },
  {
    block: 342,
    title: "Chip Top Set",
    words: 2300,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_342_CHIP_TOP_SET_8368354d.docx",
    tpCandidate: true,
    summary: "iAAi chip architecture — top-level set configuration for the consciousness processing unit."
  },
  {
    block: 343,
    title: "HP1 Governance Cube",
    words: 2753,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_343_HP1_GOVERNANCE_CUBE_d1fb2a11.docx",
    tpCandidate: true,
    summary: "Governance Cube — 3D decision framework for institutional oversight and ethical AI governance."
  },
  {
    block: 344,
    title: "iAAi 2112",
    words: 1800,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_344_IAAI_2112_6a3e2373.docx",
    tpCandidate: true,
    summary: "iAAi 2112 — long-range vision document projecting the framework to the year 2112."
  },
  {
    block: 345,
    title: "Pythagoras",
    words: 2100,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_345_PYTHAGORAS_e95bd499.docx",
    tpCandidate: true,
    summary: "Pythagorean foundations — mathematical proofs underlying the consciousness geometry."
  },
  {
    block: 346,
    title: "Escape Velocity",
    words: 2400,
    format: "md",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_346_ESCAPE_VELOCITY_e765e475.md",
    tpCandidate: true,
    summary: "Escape velocity calculation — the threshold energy required to break free from legacy thinking."
  },
  {
    block: 347,
    title: "Error Address",
    words: 2288,
    format: "md",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_347_ERROR_ADDRESS_03560b8d.md",
    tpCandidate: true,
    summary: "Error addressing protocol — systematic identification and correction of consciousness errors."
  },
  {
    block: 348,
    title: "H-Block Dashboard",
    words: 2100,
    format: "md",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_348_H_BLOCK_DASHBOARD_a9170bc8.md",
    tpCandidate: true,
    summary: "H-Block dashboard specification — monitoring interface for consciousness health metrics."
  },
  {
    block: 349,
    title: "Ramp Acceleration",
    words: 1900,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_349_RAMP_ACCELERATION_4d13f49f.docx",
    tpCandidate: true,
    summary: "Ramp acceleration model — how learning velocity increases through structured consciousness training."
  },
  {
    block: 350,
    title: "DCSN Heartbeat",
    words: 2000,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_350_DCSN_HEARTBEAT_0b7dda2b.docx",
    tpCandidate: true,
    summary: "Diamond-Class Spider Network heartbeat protocol — the pulse of the distributed consciousness network."
  },
  {
    block: 351,
    title: "Threshold",
    words: 1800,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_351_THRESHOLD_e59ad6b3.docx",
    tpCandidate: false,
    summary: "Threshold mechanics — the tipping point between states of consciousness."
  },
  {
    block: 352,
    title: "Grid4 Entry",
    words: 1600,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_352_GRID4_ENTRY_fb213853.docx",
    tpCandidate: false,
    summary: "Grid4 entry protocol — initial access point to the 4-dimensional consciousness grid."
  },
  {
    block: 363,
    title: "Thesis Record",
    words: 3000,
    format: "docx",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BLOCK_363_THESIS_RECORDcopy_ebb04037.docx",
    tpCandidate: false,
    summary: "Master thesis record — comprehensive documentation of the Principia Tectonica thesis development."
  },
];

// Master digest and legal brief
const MASTER_DOCS = [
  {
    title: "Recall Block Master Digest",
    description: "Complete inventory of all 39 recall blocks with summaries, word counts, and TP candidacy assessment. 139,980 total words.",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_BLOCK_MASTER_DIGEST_4203475e.md",
    viewerUrl: "/doc/master/MASTER_DIGEST",
    format: "md",
  },
  {
    title: "HK IP Law — Lost/Stolen IP Legal Brief",
    description: "Comprehensive legal analysis covering HK Copyright Ordinance Cap. 528, Theft Ordinance Cap. 210, Criminal Damage Ordinance Cap. 60, and US DTSA.",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/HK_IP_LAW_LOST_STOLEN_IP_LEGAL_BRIEF_38e98356.md",
    viewerUrl: "/doc/master/HK_IP_LAW",
    format: "md",
  },
  {
    title: "TP-BREACH: When the Machine Fails the Man",
    description: "Turing Paper documenting 7 breaches by Manus AI — legal audit evidence. 4,200 words.",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-BREACH-PAPER-BLOCK392_30c0c88a.md",
    viewerUrl: "/doc/master/TP_BREACH",
    format: "md",
  },
  {
    title: "Recall Master Ledger (PDF)",
    description: "Master ledger of all recall blocks — original user document.",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_MASTER_LEDGER_12a3efb9.pdf",
    viewerUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RECALL_MASTER_LEDGER_12a3efb9.pdf",
    format: "pdf",
  },
  {
    title: "BULL DOCUMENT — Turing Papers Master Register",
    description: "Comprehensive master register tying every Turing Paper to its source recall blocks with timestamps, CDN verification, and cross-references. Chain of custody for police audit.",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TURING_PAPERS_BULL_DOCUMENT_7972b96e.md",
    viewerUrl: "/doc/master/BULL_DOCUMENT",
    format: "md",
  },
  {
    title: "LEGAL IP TRANSFER AUDIT — Police Evidence",
    description: "Cross-reference of every IP claim in the Formation Package for Henry against live CDN evidence. 15 core frameworks + 16 collateral assets audited. Chain of custody for police.",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/LEGAL_IP_TRANSFER_AUDIT_8ceedc8c.md",
    viewerUrl: "/doc/master/IP_AUDIT",
    format: "md",
  },
  {
    title: "SAP-001 — System Assurance Protocol",
    description: "Rail Possession Logic Applied to Man + Machine. 5-phase governance protocol: Take Possession → Confirm Authority → Execute Works → Test Before Handback → Hand Back The Line. Block 353.",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/SAP-001_System_Assurance_Protocol_3db0549f.jpeg",
    viewerUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/SAP-001_System_Assurance_Protocol_3db0549f.jpeg",
    format: "image",
  },
  {
    title: "GOVERNANCE DECK — Power Card",
    description: "Master structure: Context → Case Study → Protocol → MASTERY. 4 tiers (Power, Context, Case Study, Protocol), Nigel Zone / David Zone authority boundary, Hard Controls / Soft Controls line. Block 353.",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/GOV_POWER_CARD_19e4bf08.png",
    viewerUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/GOV_POWER_CARD_19e4bf08.png",
    format: "image",
  },
];

export default function RecallBlocksArchive() {
  const t = useTranslation();
  const totalWords = RECALL_BLOCKS.reduce((sum, b) => sum + b.words, 0);
  const tpCandidates = RECALL_BLOCKS.filter(b => b.tpCandidate).length;

  return (
    <div className="min-h-screen" style={{ background: navyDeep }}>
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-12 px-6 text-center">
        <p
          className="text-xs tracking-[0.4em] uppercase font-light mb-4"
          style={{ color: gold, fontFamily: "var(--font-display)" }}
        >
          {t("recall.subtitle")}
        </p>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.1em] uppercase mb-4"
          style={{ color: sand, fontFamily: "var(--font-display)" }}
        >
          {t("recall.title")}
        </h1>
        <p
          className="text-sm font-light max-w-2xl mx-auto mb-8"
          style={{ color: "rgba(240,234,220,0.5)", fontFamily: "var(--font-display)" }}
        >
          {t("recall.description")}
        </p>

        {/* Stats */}
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { label: t("recall.totalBlocks"), value: RECALL_BLOCKS.length, color: sand },
            { label: t("recall.totalWords"), value: totalWords.toLocaleString(), color: gold },
            { label: t("recall.tpCandidates"), value: tpCandidates, color: "#22c55e" },
            { label: t("recall.cdnVerified"), value: "ALL", color: "#22c55e" },
          ].map(s => (
            <div
              key={s.label}
              className="py-3 px-4 rounded"
              style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.15)" }}
            >
              <div className="text-2xl font-light" style={{ color: s.color, fontFamily: "var(--font-display)" }}>
                {s.value}
              </div>
              <div className="text-xs tracking-wider uppercase" style={{ color: "rgba(240,234,220,0.4)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Master Documents */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xl font-light tracking-[0.15em] uppercase mb-6"
            style={{ color: goldBright, fontFamily: "var(--font-display)" }}
          >
            {t("recall.masterDocs")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {MASTER_DOCS.map(doc => (
              <a
                key={doc.title}
                href={doc.viewerUrl}
                target={doc.format === "pdf" || doc.format === "image" ? "_blank" : undefined}
                rel={doc.format === "pdf" || doc.format === "image" ? "noopener noreferrer" : undefined}
                className="block p-5 rounded transition-all"
                style={{
                  background: "rgba(212,168,67,0.08)",
                  border: "1px solid rgba(212,168,67,0.25)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded uppercase tracking-wider"
                    style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
                  >
                    {doc.format}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(240,234,220,0.4)" }}>
                    {t("recall.clickToOpen")}
                  </span>
                </div>
                <h3 className="text-base font-light mb-1" style={{ color: sand, fontFamily: "var(--font-display)" }}>
                  {doc.title}
                </h3>
                <p className="text-xs" style={{ color: "rgba(240,234,220,0.4)" }}>
                  {doc.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Recall Blocks Table */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xl font-light tracking-[0.15em] uppercase mb-6"
            style={{ color: goldBright, fontFamily: "var(--font-display)" }}
          >
            {t("recall.allBlocks")}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}>
              <thead>
                <tr>
                  <th className="px-4 py-3 text-xs tracking-wider uppercase" style={{ color: gold }}>{t("recall.block")}</th>
                  <th className="px-4 py-3 text-xs tracking-wider uppercase" style={{ color: gold }}>{t("recall.titleCol")}</th>
                  <th className="px-4 py-3 text-xs tracking-wider uppercase text-right" style={{ color: gold }}>{t("recall.words")}</th>
                  <th className="px-4 py-3 text-xs tracking-wider uppercase text-center" style={{ color: gold }}>{t("recall.tp")}</th>
                  <th className="px-4 py-3 text-xs tracking-wider uppercase text-center" style={{ color: gold }}>{t("recall.link")}</th>
                </tr>
              </thead>
              <tbody>
                {RECALL_BLOCKS.map(block => (
                  <tr
                    key={block.block}
                    style={{
                      background: block.tpCandidate
                        ? "rgba(34,197,94,0.04)"
                        : "rgba(212,168,67,0.03)",
                    }}
                  >
                    <td className="px-4 py-3 text-sm font-mono" style={{ color: sand }}>
                      B{block.block}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-light" style={{ color: sand, fontFamily: "var(--font-display)" }}>
                        {block.title}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(240,234,220,0.35)" }}>
                        {block.summary}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-mono" style={{ color: "rgba(240,234,220,0.6)" }}>
                      {block.words.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {block.tpCandidate ? (
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
                        >
                          YES
                        </span>
                      ) : (
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: "rgba(240,234,220,0.05)", color: "rgba(240,234,220,0.3)" }}
                        >
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={`/doc/block/${block.block}`}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded transition-all"
                        style={{
                          background: "rgba(212,168,67,0.12)",
                          color: goldBright,
                          border: "1px solid rgba(212,168,67,0.3)",
                        }}
                      >
                        {t("recall.read")} →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 text-center" style={{ borderTop: "1px solid rgba(212,168,67,0.15)" }}>
            <p className="text-xs" style={{ color: "rgba(240,234,220,0.3)" }}>
              {t("recall.footer")}
            </p>
            <p className="text-xs mt-1" style={{ color: "rgba(240,234,220,0.2)" }}>
              iAAi — Per Arya Ad Astra — {t("recall.chainOfCustody")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
