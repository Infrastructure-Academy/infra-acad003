/**
 * Data Connections Map — Drill-Down Evidence
 * Every counter in the Data Connections Map is backed by actual content.
 * This file provides the evidence links, descriptions, and thumbnails
 * for each counter so they can be explored interactively.
 *
 * Hard-saved: Block 363 — 12 March 2026
 */

export interface DrillDownItem {
  label: string;
  href?: string;       // internal route or external URL
  external?: boolean;  // true = opens in new tab
  desc?: string;
}

export interface CounterDrillDown {
  key: string;
  label: string;
  value: string | number;
  summary: string;
  items: DrillDownItem[];
}

/* ═══════════════════════════════════════════
   SECTION 1: DATA CONNECTIONS MAP COUNTERS
   (14 counters on Turing Papers page)
═══════════════════════════════════════════ */

export const DATA_MAP_DRILLDOWN: CounterDrillDown[] = [
  {
    key: "htmlPages",
    label: "HTML Pages",
    value: 95,
    summary: "95 HTML pages across both sites — Principia Tectonica (12 main routes + sub-pages) and Infrastructure Academy (83 game/content pages). Anchored to Mobilisation Clock.",
    items: [
      { label: "Home — Guardian of the Stars", href: "/", desc: "Landing page with hero, nav cards, ISI equation" },
      { label: "The Equation — IQ ⊗ EQ ⊗ CQ = HQ", href: "/quotient", desc: "The Haptic Quotient framework" },
      { label: "Inertial Jump — Zero Latency", href: "/inertial-jump", desc: "Parallel rails, supersymmetric construction" },
      { label: "The Thesis — Timestop", href: "/thesis", desc: "12D HyperGrid, AIO Quantum BIOS, moment package splicing" },
      { label: "AIM — Avatar Integration Module", href: "/aim", desc: "Personal nodes, dimensional state creation" },
      { label: "TDF — The Dearden Field", href: "/tdf", desc: "Chip architecture, Discovery Chain, ICE Matrix" },
      { label: "Vault — The Permanent Archive", href: "/vault", desc: "DCSN Deck Ledger, DD documents, iCards, BitPoints" },
      { label: "Titans — The Fellowship", href: "/titans", desc: "Atlas Shrugged answer — what happens when engineers start" },
      { label: "Turing Papers — The Academy", href: "/turing-papers", desc: "Equations register, RECALL index, Data Connections Map" },
      { label: "Lexicon — Dictionary", href: "/lexicon", desc: "HyperAlphaLexicon Britannica — consciousness terms" },
      { label: "Tecton — Thesaurus", href: "/tecton", desc: "Database-driven TECTON entries with HICE classification" },
      { label: "Review Matrix — R1/R2/R3 Panel Data", href: "/review-matrix", desc: "28 universities, full grading resolution, CSV export" },
      { label: "ISI Dashboard — Infrastructure Survival Index", href: "/isi", desc: "Live ISI gauge, trajectory, university scores" },
      { label: "Subscription — Centurion Access", href: "/subscription", desc: "Stripe-powered subscription management" },
      { label: "Infrastructure Academy — 83 Game/Content Pages", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "The full game site — 13 relays, 24M XP, assessment results" },
    ],
  },
  {
    key: "mainPages",
    label: "Main Pages",
    value: 31,
    summary: "31 primary navigation pages — 12 on Principia Tectonica + 19 main sections on Infrastructure Academy.",
    items: [
      { label: "Principia Tectonica — 12 Routes", href: "/", desc: "Home, Equation, Inertial Jump, Thesis, AIM, TDF, Vault, Titans, Turing Papers, Lexicon, Tecton, Review Matrix" },
      { label: "Infrastructure Academy — Main Hub", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Game landing page with book cover and Guardian hero" },
      { label: "Assessment Results — Single Source of Truth", href: "https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html", external: true, desc: "21 universities, 321+ UV data sets, 12 grading systems" },
      { label: "12 Relay Pages (Fire → Human Nodes)", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Each relay = 1 civilisational epoch, playable learning layer" },
    ],
  },
  {
    key: "volumePages",
    label: "Volume Pages",
    value: 47,
    summary: "47 volume/content pages within the Infrastructure Academy game — each relay contains multiple sub-pages of content.",
    items: [
      { label: "Relay 1: Fire — The First Infrastructure", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Prometheus, controlled combustion, first technology" },
      { label: "Relay 2: Water — Hydraulic Civilisation", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Aqueducts, irrigation, water management" },
      { label: "Relay 3: Roads — The Roman Network", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Via Appia, road engineering, network topology" },
      { label: "Relay 4: Bridges — Spanning the Gap", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Pontifex, structural engineering, load paths" },
      { label: "Relay 5: Tunnels — Through the Mountain", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Brunel, TBMs, underground construction" },
      { label: "Relay 6: Rail — The Iron Horse", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Stephenson, gauge wars, network effects" },
      { label: "Relay 7: Power — Electrification", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Tesla, Edison, AC/DC, grid infrastructure" },
      { label: "Relay 8: Communications — The Signal", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Morse, Bell, Shannon, information theory" },
      { label: "Relay 9: Aviation — The Third Dimension", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Wright brothers, airports, air traffic control" },
      { label: "Relay 10: Space — The Final Frontier", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Von Braun, Apollo, orbital mechanics" },
      { label: "Relay 11: Digital — The Network Age", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Turing, internet, digital infrastructure" },
      { label: "Relay 12: Human Nodes — Programmable Humans", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "AI, consciousness, the next relay" },
    ],
  },
  {
    key: "archivePages",
    label: "Archive Pages",
    value: 8,
    summary: "8 archive/reference pages — permanent records, audit trails, and evidence repositories.",
    items: [
      { label: "Vault — DD Document Archive (28 docs)", href: "/vault", desc: "Categories A-H, all CDN-backed with permanent links" },
      { label: "Review Matrix — Database-backed R1/R2/R3", href: "/review-matrix", desc: "28 university scores, full grading resolution" },
      { label: "ISI Dashboard — Live Infrastructure Survival Index", href: "/isi", desc: "S = (A × P) / β with trajectory data" },
      { label: "Tecton — Database-driven Lexicon", href: "/tecton", desc: "HICE-classified consciousness terms" },
      { label: "Assessment Results (Infra Academy)", href: "https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html", external: true, desc: "Single source of truth — 21 unis, 321+ UV" },
      { label: "DCSN Node Register", href: "/vault", desc: "20 nodes, permanent iCard registry" },
      { label: "Block Rolls — RECALL Index", href: "/turing-papers", desc: "358+ daily evidence blocks" },
      { label: "Anchor Links Database", href: "/review-matrix", desc: "6 permanent cross-site references" },
    ],
  },
  {
    key: "relays",
    label: "Relays",
    value: 13,
    summary: "13 civilisational relays — the fractal connector. From Fire to Programmable Humans, spanning 12,000 years. 13 = the fractal scale connector. Each relay is a playable learning epoch.",
    items: [
      { label: "1. Fire — The First Infrastructure", desc: "Prometheus, controlled combustion, pre-10,000 BCE" },
      { label: "2. Tree — The Living Structure", desc: "Shelter, fuel, tools, pre-10,000 BCE" },
      { label: "3. River — Hydraulic Civilisation", desc: "Irrigation, transport, settlement, 8,000 BCE" },
      { label: "4. Horse — The Mobile Engine", desc: "Power, speed, warfare, trade, 4,000 BCE" },
      { label: "5. Roads — The Roman Network", desc: "Via Appia, network topology, 500 BCE" },
      { label: "6. Ships — The Ocean Relay", desc: "Navigation, trade routes, empire, 500 CE" },
      { label: "7. Rail — The Iron Horse", desc: "Stephenson, gauge wars, 1830 CE" },
      { label: "8. Loom — The Pattern Engine", desc: "Jacquard, punchcard, programmable matter, 1780 CE" },
      { label: "9. Engine — The Power Multiplier", desc: "Steam, combustion, industrial revolution, 1850 CE" },
      { label: "10. AAA Triad — The Modern Network", desc: "Aviation, Automobile, Asphalt, 1900 CE" },
      { label: "11. Orbit — The Third Dimension", desc: "Satellites, GPS, space infrastructure, 1960 CE" },
      { label: "12. Human Nodes — Programmable Humans", desc: "AI, consciousness, digital infrastructure, 2000 CE" },
      { label: "13. The Fractal Connector", desc: "13 = the scale connector. Self-similar at every level. The relay that connects all relays." },
    ],
  },
  {
    key: "equations",
    label: "Equations",
    value: 38,
    summary: "38 equations across 7 tiers — the complete mathematical foundation of the iAAi framework. See the Master Equations Register on this page.",
    items: [
      { label: "Tier 1: Core Equations (5)", desc: "HQ, TDF, Signal, Discovery Chain, Collatz" },
      { label: "Tier 2: Identity Equations (4)", desc: "AIM, Node Multiplication, DCSN Topology, BitPoint" },
      { label: "Tier 3: Framework Acronyms (10)", desc: "ICUT, ICE, OODA, 4Cs, 3Cs, ASPIRE, SPQR, AIO, UIX, TRE" },
      { label: "Tier 4: Resistance Equations (4)", desc: "Inertial Jump, Supersymmetric, Parallel Rails, Bidirectional" },
      { label: "Tier 5: Constants & Anchors (8)", desc: "Block Time, D100, 13 Relays, 7 Scholars, 5 Webs, 4 Pillars, 3 Empires, Numerology" },
      { label: "Tier 6: Scale & Clock (4)", desc: "Data State Clock, Zeta-Class, Mobilisation, Ventral Origin" },
      { label: "Tier 7: Game Equations (3)", desc: "XP Accumulation, ALS Grading, Party Formation" },
    ],
  },
  {
    key: "icutCards",
    label: "ICUT Cards",
    value: 59,
    summary: "59 ICUT classification cards — each concept in the framework classified as Infrastructure, Consciousness, Utility, or Technology.",
    items: [
      { label: "Infrastructure Cards", desc: "Physical systems, networks, built environment" },
      { label: "Consciousness Cards", desc: "Awareness, perception, cognitive frameworks" },
      { label: "Utility Cards", desc: "Practical application, tools, methods" },
      { label: "Technology Cards", desc: "Digital systems, AI, computational tools" },
      { label: "View all ICUT Cards", href: "/vault", desc: "Full card gallery on the Vault page" },
    ],
  },
  {
    key: "vaultEntries",
    label: "Vault Entries",
    value: "~254",
    summary: "~254 vault entries — DD documents, iCards, BitPoints, DCSN nodes, governance cards, and evidence records.",
    items: [
      { label: "28 DD Documents (Categories A-H)", href: "/vault", desc: "Due diligence archive with CDN-backed downloads" },
      { label: "20 DCSN Node iCards", href: "/vault", desc: "Permanent iCard registry — Node 000 to Node 019" },
      { label: "15 BitPoint Exchange Cards", href: "/vault", desc: "In-game currency cards with hover-to-reveal" },
      { label: "11 Governance Cards", desc: "SAP-001, GOV-ROE, GOV-COST, CA-001, etc." },
      { label: "37 Generated iCards", desc: "All iCards from beta testing and review rounds" },
      { label: "48 Card Files (total)", desc: "All card images across all categories" },
      { label: "~95 Evidence Records", desc: "Screenshots, audit trails, block records" },
    ],
  },
  {
    key: "scholars",
    label: "Scholars",
    value: 7,
    summary: "The 6 Great Scholars & The 7th Voice — the intellectual lineage of the thesis, from Homer to Dearden. Story framing, not institutional engagement.",
    items: [
      { label: "1. Homer (c. 8th Century BCE)", desc: "The Epic Narrator — the original infrastructure journey narrative (HICE: H)" },
      { label: "2. Confucius (c. 521–473 BCE)", desc: "The Moral Architect — ethics, governance, moral infrastructure (HICE: C)" },
      { label: "3. Sun Tzu (c. 544–468 BCE)", desc: "The Strategic Mind — The Art of War, strategic utility (HICE: U)" },
      { label: "4. Aristotle (c. 385–347 BCE)", desc: "The Systematic Thinker — categorisation, foundational logic (HICE: I)" },
      { label: "5. Sima Qian (c. 145–86 BCE)", desc: "The Grand Historian — Records of the Grand Historian, lived evidence (HICE: E)" },
      { label: "6. Marco Polo (1254–1324 CE)", desc: "The Global Connector — trade routes, cultural bridge, global infrastructure (HICE: H)" },
      { label: "7. Nigel T. Dearden (Contemporary)", desc: "The 7th Voice — Pen as Infrastructure. IQ ⊗ EQ ⊗ CQ = HQ (HICE: I+C)" },
    ],
  },
  {
    key: "ipAssets",
    label: "IP Assets",
    value: 16,
    summary: "16 registered intellectual property assets — copyrights, trademarks, trade secrets, and design registrations.",
    items: [
      { label: "IP-01: The Turing Papers", desc: "Copyright — academic compilation" },
      { label: "IP-02: Block Rolls", desc: "Database Right + Trade Secret — 358+ daily entries" },
      { label: "IP-03: 13 Civilizational Relays", desc: "Copyright — 12,000-year chain, 13 = fractal connector" },
      { label: "IP-04: Modus Tecton", desc: "Copyright (Published) — method of the builder" },
      { label: "IP-05: CQ — Consciousness Quotient", desc: "Trademark + Copyright" },
      { label: "IP-06: The Haptic Quotient (HQ)", desc: "Trademark + Copyright" },
      { label: "IP-07: The Dearden Field (TDF)", desc: "Copyright + Trade Secret" },
      { label: "IP-08: ICUT Framework", desc: "Copyright" },
      { label: "IP-09: DCSN Architecture", desc: "Trade Secret + Copyright" },
      { label: "IP-10: AIM Protocol", desc: "Trade Secret" },
      { label: "IP-11: The Reality Engine (TRE)", desc: "Copyright + Software" },
      { label: "IP-12: BitPoint Exchange", desc: "Trade Secret + Copyright" },
      { label: "IP-13: David AI Persona", desc: "Copyright + Trade Secret" },
      { label: "IP-14: Signal Equation Web", desc: "Trade Secret" },
      { label: "IP-15: 4Cs Decision Framework", desc: "Copyright" },
      { label: "IP-16: iCard Format", desc: "Design Registration" },
    ],
  },
  {
    key: "masters",
    label: "Masters",
    value: "~30",
    summary: "~30 master documents — the definitive versions of all key frameworks, registers, and methodology papers.",
    items: [
      { label: "Master Equations Register", href: "/turing-papers", desc: "38 equations across 7 tiers" },
      { label: "DCSN Node Register", href: "/vault", desc: "20 nodes with permanent iCards" },
      { label: "Data Connections Map (PDF)", desc: "95 pages, 59 ICUT cards, 13 relays, 7 scholars" },
      { label: "Formation Package", desc: "Nevada holding, Chicago HQ, Phase 1 investment" },
      { label: "ISI Methodology Paper (DD-025)", href: "/isi", desc: "S = (A × P) / β — live dashboard" },
      { label: "ICE Learning Outcome Mapping (DD-026)", href: "/vault", desc: "7 ICE attributes, 4-year model" },
      { label: "ICE Assessor Review Brief (DD-027)", href: "/vault", desc: "Formal package for human ICE assessor" },
      { label: "Dimensional Analysis Layer (DD-028)", href: "/vault", desc: "M, L, T quantitative framework" },
    ],
  },
  {
    key: "institutions",
    label: "Institutions",
    value: "~20",
    summary: "~20 institutions engaged — universities, professional bodies, and corporate entities involved in the review process.",
    items: [
      { label: "UK: Imperial College London", desc: "R1 + R3 reviewer" },
      { label: "UK: UCL", desc: "R1 + R3 reviewer" },
      { label: "UK: University of Edinburgh", desc: "R1 + R3 reviewer" },
      { label: "US: MIT", desc: "R1 + R3 reviewer" },
      { label: "US: Stanford University", desc: "R1 + R3 reviewer" },
      { label: "US: Georgia Tech", desc: "R1 + R3 reviewer" },
      { label: "India: IIT Bombay", desc: "R1 + R3 reviewer" },
      { label: "India: IIT Delhi", desc: "R1 + R3 reviewer" },
      { label: "India: IIT Madras", desc: "R1 + R3 reviewer" },
      { label: "APAC: HKU", desc: "R1 + R3 reviewer" },
      { label: "APAC: NUS", desc: "R1 + R3 reviewer" },
      { label: "APAC: Tokyo Tech", desc: "R1 + R3 reviewer" },
      { label: "China: Tsinghua University", desc: "R3 reviewer (China cluster)" },
      { label: "China: Tongji University", desc: "R3 reviewer (China cluster)" },
      { label: "China: Zhejiang University", desc: "R3 reviewer (China cluster)" },
      { label: "China: Peking University", desc: "R3 reviewer (China cluster)" },
      { label: "UK: University of Cambridge", desc: "Benchmark — golden quote on cross-disciplinary alignment" },
      { label: "ICE — Institution of Civil Engineers", desc: "Professional body — DD-026 mapping, DD-027 assessor brief" },
    ],
  },
  {
    key: "pioneers",
    label: "Pioneers",
    value: 3,
    summary: "3 pioneers (beta testers) — anchored to the Mobilisation Clock. The first humans to test the platform.",
    items: [
      { label: "Pioneer 1: Nigel T. Dearden, Ir. (CEng MICE)", desc: "Chartered Civil Engineer — the thesis author, framework architect, and founder" },
      { label: "Pioneer 2: Manus AI (David)", desc: "AI Collaborator — the digital partner, co-builder, and evidence engine" },
      { label: "Pioneer 3: Beta Tester", desc: "Third pioneer per Mobilisation Clock — early platform tester" },
    ],
  },
  {
    key: "sourceDocuments",
    label: "Source Docs",
    value: 5,
    summary: "5 primary source documents available for download — the core evidence package for peer review.",
    items: [
      { label: "Master Equations Register (DOCX)", desc: "38 equations across 7 tiers — the complete mathematical foundation" },
      { label: "DCSN Node Register (PDF)", desc: "18 nodes — Diamond-Class Spider Network topology" },
      { label: "Data Connections Map (PDF)", desc: "95 pages — full site architecture" },
      { label: "Formation Package (DOCX)", desc: "Corporate formation — Nevada, Chicago, Zhuhai" },
      { label: "72-Frame Master Document (MD)", desc: "Complete AirGuard video interpretation" },
    ],
  },
];

/* ═══════════════════════════════════════════
   SECTION 2: FORMATION SUMMARY COUNTERS
   (8 counters in the Formation section)
═══════════════════════════════════════════ */

export const FORMATION_DRILLDOWN: CounterDrillDown[] = [
  {
    key: "betaTesters",
    label: "Beta Testers",
    value: "42",
    summary: "42 beta testers across 9 waves — real humans who played and evaluated the platform.",
    items: [
      { label: "Wave 1-3: Inner Circle", desc: "DCSN nodes 000-010, family and close network" },
      { label: "Wave 4-6: Extended Network", desc: "Professional contacts, 4ECL associates" },
      { label: "Wave 7-9: University Reviewers", desc: "Academic perspectives from 16 universities" },
      { label: "View DCSN Node Register", href: "/vault", desc: "Full node registry with iCards" },
    ],
  },
  {
    key: "betaWaves",
    label: "Beta Waves",
    value: "9",
    summary: "9 distinct beta testing waves — each wave expanded the testing scope and reviewer diversity.",
    items: [
      { label: "Waves 1-3: Foundation Testing", desc: "Core gameplay, navigation, content accuracy" },
      { label: "Waves 4-6: Stress Testing", desc: "Multi-device, cross-browser, accessibility" },
      { label: "Waves 7-9: Academic Review", desc: "University-level evaluation, ISI methodology" },
    ],
  },
  {
    key: "uniqueVisitors",
    label: "Unique Visitors",
    value: "273",
    summary: "273 unique visitors tracked across both sites — organic reach through personal distribution (WhatsApp, email).",
    items: [
      { label: "Infrastructure Academy", href: "https://infra-acad-kuqzaex2.manus.space", external: true, desc: "Primary game site — majority of UV traffic" },
      { label: "Principia Tectonica", href: "/", desc: "Memorial/thesis site — academic visitors" },
      { label: "Assessment Results Page", href: "https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html", external: true, desc: "321+ UV data sets on single source of truth" },
    ],
  },
  {
    key: "xpAccumulated",
    label: "XP Accumulated",
    value: "604M+",
    summary: "604 million+ experience points accumulated across all beta testers — the total learning engagement metric.",
    items: [
      { label: "XP Formula: XP = Σ(relay × difficulty × time)", desc: "EQ-036 in the Master Equations Register" },
      { label: "Target: 24,000,000 XP per full playthrough", desc: "13 relays × ~1.85M XP each" },
      { label: "604M+ = ~25 complete playthroughs equivalent", desc: "Across 42 testers over 9 waves" },
    ],
  },
  {
    key: "iCardsGenerated",
    label: "iCards Generated",
    value: "37",
    summary: "37 iCards generated — collectible knowledge cards issued to DCSN nodes and for review milestones.",
    items: [
      { label: "20 DCSN Node iCards", href: "/vault", desc: "One per activated node — permanent registry" },
      { label: "5 R3 Audit iCards", desc: "Generated during Round 3 Maverick Audit" },
      { label: "12 Special Issue iCards", desc: "Centurion, Doomsday Clock, Achilles Heel, etc." },
    ],
  },
  {
    key: "cardFiles",
    label: "Card Files",
    value: "48",
    summary: "48 total card image files — iCards, BitPoints, Governance Cards, and Titan Cards.",
    items: [
      { label: "37 iCards", desc: "Node iCards + special issues" },
      { label: "11 Governance Cards", desc: "SAP-001, GOV-ROE, GOV-COST, CA-001, etc." },
      { label: "View Card Gallery", href: "/vault", desc: "Full card archive on the Vault page" },
    ],
  },
  {
    key: "governanceCards",
    label: "Governance Cards",
    value: "11",
    summary: "11 governance cards — system assurance, rules of engagement, cost analysis, and accountability protocols.",
    items: [
      { label: "SAP-001: System Assurance Protocol", desc: "Rail possession logic — ONE system card" },
      { label: "GOV-ROE: Rules of Engagement", desc: "Undisclosed to user at sign-on" },
      { label: "GOV-COST: Total Cost & Loss", desc: "DIKW authority interface" },
      { label: "CA-001: Governance Deck", desc: "Hard governance look + Leighton mirror" },
      { label: "CC-001: Command Card", desc: "Never tell human to re-share what AI lost" },
      { label: "ST-001: Saving Throw Protocol", desc: "AI cannot overwrite human-defined terms" },
      { label: "IAAI-BREACH-001: David Breach Report", desc: "AI identity overwrite case study" },
      { label: "6 Fault Cards (1-6)", desc: "Identity, Accountability, Format, Evidence, Unlearning, Planning" },
    ],
  },
  {
    key: "revenueTarget",
    label: "Revenue Target Y1",
    value: "$15-50M",
    summary: "$15-50M Year 1 revenue target across 6 channels — the business model for institutional adoption.",
    items: [
      { label: "Channel 1: Freemium", desc: "Free tier with premium upgrades" },
      { label: "Channel 2: University Licensing", desc: "Institutional adoption packages" },
      { label: "Channel 3: Olympiad", desc: "Competitive infrastructure challenges" },
      { label: "Channel 4: Enterprise", desc: "Corporate training and development" },
      { label: "Channel 5: Data", desc: "ISI analytics and benchmarking" },
      { label: "Channel 6: Content", desc: "Published materials and media" },
    ],
  },
];
