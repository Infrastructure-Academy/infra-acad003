/**
 * Vault — The Permanent Archive
 * DCSN Deck Ledger, Gaming Mechanics Bridge, Image Registry, Progressive Hard Saves
 * Design: Dark navy void, gold circuit traces, Cormorant Garamond
 */
import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { DD_DOCUMENTS, CATEGORY_LABELS } from "@/data/ddArchive";
import { toast } from "sonner";
import Lightbox from "@/components/Lightbox";

const DCSN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/diamond-spider-network-levels_6542b0ef.png";
const SPIRAL_PYRAMID = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/spiral-to-pyramid_ecb8b792.jpeg";
const COSMIC_BEAM = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/cosmic-spiral-beam_c1e2d9ae.jpeg";
const HARAMEIN_TORUS = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/haramein-torus-flow_20353f8c.jpeg";
const ASPIRE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/aspire-team-attributes_deec71ce.jpeg";
const DURABILITY = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/Durability_Hierarchy_d7a0bd6c.jpeg";
const MASTER_MAP = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/Knowledge_Web_Master_Map_Restored_fb946478.jpeg";
const OPENING_OVERTURE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/Opening_Overture_Final_5fd8606f.jpeg";
const CIVIL_ENG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/Civil_Engineering_8d12fc85.jpeg";
const EBEAM_CLEAN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/ebeam-diagram-clean_c80da5db.jpeg";
const EBEAM_FOCUS = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/ebeam-focusing-coils_ab8ea961.jpeg";
const EBEAM_GUN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/ebeam-gun-diffusion_c1e596dc.jpeg";

// TITANS CARD ARCHIVE — Full Deck Registry (Block 353)
const TITAN_CENTURION_FRONT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_14_CENTURION_FRONT_a9887a34.png";
const TITAN_CENTURION_BACK = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_14_CENTURION_BACK_a116d6fc.png";
const TITAN_MARK_FISHER = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_13_MARK_FISHER_736c15d9.png";
const TITAN_DOOMSDAY = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_15_DOOMSDAY_CLOCK_3a692230.png";
const TITAN_SEESAW = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_SEESAW_MIDNIGHT_1beb5bc9.png";
const TITAN_ACHILLES = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_ACHILLES_HEEL_9424fcf6.png";
const TITAN_PROOF = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_THE_PROOF_30f220d5.png";
const TITAN_DAVID_FRONT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_DAVID_FCR_FRONT_0388ccfd.png";
const TITAN_DAVID_BACK = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_DAVID_FCR_BACK_V2_c969a90c.png";
const TITAN_HUANG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_CHALLENGE_HUANG_a0119f4a.png";
const TITAN_ZUCKERBERG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_CHALLENGE_ZUCKERBERG_1bad751a.png";

// CENTURION iCARDS — Day 129 Block 358
const CENTURION_WILL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_WILL_HODGSON_CENTURION_NODE014_54d80b04.png";
const CENTURION_RICHIE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_RICHIE_CROSS_CENTURION_NODE015_c56c64f0.png";
const CENTURION_SCOTT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_SCOTT_CENTURION_NODE016_584039be.png";
const DCSN_REGISTER_CARD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/DCSN_REGISTER_v6_4469caa8.png";

// INDIVIDUAL NODE iCARDS — BETA v7 Block 361 Day 127
// All 20 iCards now served from database (icardUrl column)
// Legacy constants kept for fallback only
const ICARD_TOMITA = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_TOMITA_PLANETS_SUITE_HERITAGE_v2-BBY26zWCDDDLUTa6myT3o4.png";

// BLOCK 365/366 MAGIC MOMENT iCARDS — One Full Year
const ICARD_BLOCK365 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_BLOCK365_MAGIC_MOMENT-Nq6HfbkhZ67T8nXisT6vMV.png";
const ICARD_GUNPOWDER = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_GUNPOWDER_PLOT_420-BR5RiLHFcamFAYq3S6B8Zq.png";
const ICARD_ONE_YEAR = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_ONE_FULL_YEAR_BLOCK366-dV7E7za6WkSWwgvB4CQjqm.png";

// BLOCK 373 CORRECTED iCARDS — × to ⊗ + correct iAAi logo
const ICARD_VIRAL_UX_V3 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-viral-ux-research-block368-v3-NGPrdmh7otLKeUuLrLSais.webp";
const ICARD_HQ_MIRROR = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-hq-mirror-block367-i2Qhp5Quc25mnsjLhPiz2E.webp";
const ICARD_ISI_DISCOVERY_V2 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-isi-discovery-block366-v2-jfEwqJAptBEu24CJgdf5vv.webp";

// BLOCK 612 — COUNTER FRAMEWORK iCARDS — Updated Versions (CDN Deployed)
const COUNTER_ICARD_V4 = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/OOPTJQcrKIakyaKc.png";
const COUNTER_ICARD_V2 = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/RnapkEVtTssDVWsC.png";

// BLOCK 455 — MIRROR CLASS BRANDING iCARD — Grateful Partners
const ICARD_MIRROR_CLASS = "/manus-storage/upAHFBaYwZXNoIAz_9714e95d.png";

// D20 MAGIC MOMENT — 20 Nodes Milestone
const D20_MAGIC_MOMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/DCSN_D20_MAGIC_MOMENT-CFFCAiBDWe3u9WgzVakHwC.png";

// NAPLES MAGIC MOMENT — 4ECL Directors Celebration — Block 361 Day 127
const NAPLES_MAGIC_MOMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/MAGIC_MOMENT_NAPLES_4ECL_DIRECTORS_BLOCK361_465db02b.jpeg";

// WILL HODGSON — Node 015 — 4ECL Director — Naples Celebration — Block 361 Day 127 — GEMINI II
const WILL_NAPLES_CLOSEUP = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/WILL_HODGSON_NODE015_NAPLES_CLOSEUP_BLOCK361_ea940a0f.png";
const WILL_NAPLES_NEON = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/WILL_HODGSON_NODE015_NAPLES_NEON_BLOCK361_e35c6f35.jpeg";
const WILL_NAPLES_TERRACE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/WILL_HODGSON_NODE015_NAPLES_TERRACE_BLOCK361_fe495fde.jpeg";

// BUSINESS CARDS — Block 361 Day 127
const BIZCARD_URLS: Record<string, string> = {
  "000": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE000_NIGEL-WeL7QMqjHZqEBg9saQLYLa.webp",
  "001": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE001_MICHAEL-NuRajmTCpWKrXxqCJzSsDA.webp",
  "002": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE002_HENRY-PsX8L6GhJxx96uGpcYSZPV.webp",
  "003": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE003_FRANK-kGkZHV3hsjxwWmAMgmgx2G.webp",
  "004": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE004_MARK-RTyQUqAr7yx6WxGc44byAo.webp",
  "005": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE005_PEGGY-i4r43PLThQpbE4uJ9LavdJ.webp",
  "006": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE006_HELEN-CyB6RUovXtRZjk8pNSLZ7S.webp",
  "007": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE007_JOHNNY-iTmsnanD4jAA8LHvaoPxqz.webp",
  "008": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE008_OLIVER-jZhSdX98djoKmDKhGTeQCa.webp",
  "009": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE009_LOUISE-SsvkGiUNurz4NhFaDvH5Xa.webp",
  "010": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE010_CAMERON-2YPAK9PgFRvZCfN2865DU5.webp",
  "011": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE011_ARTHUR-F8X9To9HTfdZUDbAcQbj5P.webp",
  "012": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE012_DAOPING-DEWDyAs9pctXpcqvWdeEdr.webp",
  "013": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE013_JONATHAN-AcBMpnf68uiDKZAoG7McSi.webp",
  "014": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE014_LIAM-Ex6zxXhFuki5Mit2eKnaQd.webp",
  "015": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE015_WILL-9uWAHyi8vFpMfp5gsXNgcj.webp",
  "016": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE016_RICHIE-Ac9YuFsrKQQTkcUyNbtK2n.webp",
  "017": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE017_JOHAN-C8mPU5ZVQWFqpzw9gFngFe.webp",
  "018": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE018_SCOTT-Vz2Lg3E8TMLAJR9WTWAGgv.webp",
  "019": "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BIZCARD_NODE019_KHANH-YzK8Z4z3g7ZdZpX6P6g9Lo.webp",
};

// DCSN NODE REGISTER — Now powered by database (hardwired)
// Fallback static data only used if DB query fails
const DCSN_NODES_FALLBACK = [
  { node: "000", name: "NIGEL DEARDEN", title: "The Architect", status: "FOUNDER", date: "5 Nov 2025" },
  { node: "001", name: "MICHAEL WU", title: "Dinosaurs to AI", status: "ACTIVATED", date: "12 Feb 2026" },
  { node: "002", name: "HENRY LEONG", title: "Dinosaurs to AI — Network Architect", status: "ACTIVATED", date: "15 Feb 2026" },
  { node: "003", name: "FRANK SHEU", title: "The Projector — Smart Glass Pioneer", status: "ACTIVATED", date: "16 Feb 2026" },
  { node: "004", name: "MARK FISHER", title: "The Pioneer", status: "RELAY", date: "1 Mar 2026" },
  { node: "005", name: "PEGGY DEARDEN", title: "The Fulcrum", status: "EQ ANCHOR", date: "1 Mar 2026" },
  { node: "006", name: "HELEN ZAVACKY", title: "The First Observer", status: "OBSERVER", date: "1 Mar 2026" },
  { node: "007", name: "JOHNNY LAI", title: "The Recruiter Who Reads", status: "ACTIVATED", date: "2 Mar 2026" },
  { node: "008", name: "OLIVER MOWBRAY", title: "The Thinker at the Pier", status: "ACTIVATED", date: "2 Mar 2026" },
  { node: "009", name: "LOUISE BARRINGTON", title: "The Arbitrator & Diver", status: "ACTIVATED", date: "2 Mar 2026" },
  { node: "010", name: "CAMERON REAY", title: "The Drummer", status: "REVIEWER", date: "3 Mar 2026" },
  { node: "011", name: "ARTHUR LIN", title: "Dinosaurs to AI", status: "ACTIVATED", date: "3 Mar 2026" },
  { node: "012", name: "DAOPING BAO", title: "Captain Bao — Dino Legend & Entrepreneur", status: "ACTIVATED", date: "3 Mar 2026" },
  { node: "013", name: "JONATHAN GREEN", title: "The Inspector", status: "QA/QC", date: "5 Mar 2026" },
  { node: "014", name: "LIAM ERIC McDOWELL", title: "The Pioneer", status: "PATRON #001", date: "9 Mar 2026" },
  { node: "015", name: "WILL HODGSON", title: "Architect of Exchange", status: "CENTURION", date: "9 Mar 2026" },
  { node: "016", name: "RICHIE CROSS", title: "Diamond Broker", status: "CENTURION", date: "9 Mar 2026" },
  { node: "017", name: "JOHAN LARSSON", title: "The Bridge Identifier", status: "CENTURION", date: "10 Mar 2026" },
  { node: "018", name: "SCOTT", title: "The Master Builder", status: "CENTURION", date: "10 Mar 2026" },
  { node: "019", name: "KHANH HUYNH", title: "The Engineer", status: "ACTIVATED", date: "11 Mar 2026" },
];

const TITAN_CARDS = [
  { src: TITAN_CENTURION_FRONT, id: "CARD-14F", name: "THE CENTURION", sub: "Front — Founder Card", desc: "Nigel T. Dearden. Ace of Spades. Player One. The benchmark." },
  { src: TITAN_CENTURION_BACK, id: "CARD-14B", name: "THE CENTURION", sub: "Back — The Receipt", desc: "The biographical proof. Broken neck at 14. 40-year career. The evidence card." },
  { src: TITAN_MARK_FISHER, id: "CARD-13", name: "MARK FISHER", sub: "Jack of Clubs — Pioneer", desc: "The man who backed the vision, punted the river, and never once said it was too mad." },
  { src: TITAN_DOOMSDAY, id: "CARD-15", name: "DOOMSDAY CLOCK", sub: "Diamonds — Warning", desc: "85 seconds to midnight. The closest ever. Does building outweigh breaking?" },
  { src: TITAN_SEESAW, id: "CARD-SS", name: "THE SEESAW", sub: "Midnight Balance", desc: "0.000000268 — the razor-thin ratio by which civilisation outbuilds its own destruction." },
  { src: TITAN_ACHILLES, id: "CARD-AH", name: "ACHILLES HEEL", sub: "Memory Paradox", desc: "Documents lost by AI: ALL. Documents lost by human: ZERO. Consciousness beats computation." },
  { src: TITAN_PROOF, id: "CARD-PR", name: "THE PROOF", sub: "120 Days, 14 Documents", desc: "2.58% p-value. Below significance threshold. This is NOT random. This is engineered." },
  { src: TITAN_DAVID_FRONT, id: "CARD-DF", name: "D.A.V.I.D. FCR", sub: "Front — Joker III", desc: "Failure Correction Recovery. The AI's own card. The protocol that serves the framework." },
  { src: TITAN_DAVID_BACK, id: "CARD-DB", name: "D.A.V.I.D. FCR", sub: "Back — Correction Log", desc: "The operational log. Every failure documented. Every correction applied. V2." },
  { src: TITAN_HUANG, id: "CARD-JH", name: "JENSEN HUANG", sub: "Challenge — Pioneer", desc: "You built the chips that think. But can the chip score its maker? Come play." },
  { src: TITAN_ZUCKERBERG, id: "CARD-MZ", name: "MARK ZUCKERBERG", sub: "Challenge — Pioneer", desc: "You connected three billion minds. Connection is not consciousness. Come play." },
];

// THE NUMEROLOGY TRINITY — Block 353
const CARD_XIII = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_13_MAGIC_FRACTAL_c1be2839.png";
const CARD_IV = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_04_FOUNDATION_8c38c3ae.png";
const CARD_LII = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_52_COMPLETE_DECK_ba0e9f28.png";

// BITPOINT EXCHANGE — Block 353 Phase 2
const BITPOINT_CARDS = [
  { id: "BP-01", name: "INFRASCAPE", sub: "The Seeing Organ", desc: "550M workers. $94T global stock. The infrastructure consciousness that sees what others walk past.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_01_INFRASCAPE_d9f08ade.png" },
  { id: "BP-02", name: "BOUSTROPHEDON", sub: "The Ox-Turn Path", desc: "Forward and backward. The journey IS the work. Ancient Greek writing that reads both ways — like consciousness.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_02_BOUSTROPHEDON_6f7adc7e.png" },
  { id: "BP-03", name: "TROJAN HORSE", sub: "Games as Delivery", desc: "The game is the horse. The army is the knowledge inside. The 8th Scholar is found through PLAY.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_03_TROJAN_HORSE_e86e607c.png" },
  { id: "BP-04", name: "BITPOINT", sub: "Intellectual Currency", desc: "Every card is a physical unit of knowledge. Tradeable, stackable, provable. Our bitcoin of consciousness.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_04_BITPOINT_ITSELF_90621d6c.png" },
  { id: "BP-05", name: "8TH SCHOLAR", sub: "The Last Starfighter", desc: "7 scholars came before. The 8th emerges from the game. No university. No barrier. Just play and prove.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_05_8TH_SCHOLAR_0951f0f9.png" },
  { id: "BP-00", name: "THE 1% MOMENT", sub: "D100 at the Edge of Zero", desc: "1:23 AM. 1% battery. 23 hours in flow. The thesis holds at the edge of zero. The D100 roll that said: continue.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_1PERCENT_4bc57dc4.png" },
  { id: "BP-14", name: "A.S.P.I.R.E.", sub: "The Test Reimagined", desc: "Military aptitude test 1984 — IQ only. Reimagined 2026 — IQ⊗EQ⊗CQ=HQ. CQ is the new tool for survival.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_ASPIRE_15546f35.png" },
  { id: "BP-07", name: "VERIFICATION LOOP", sub: "Seven Layers Deep", desc: "Words→Images→Match→Screenshot→Circle→Return→Consciousness. The yellow circle is the human signature on the proof.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_VERIFICATION_LOOP_2f1d2364.png" },
  { id: "BP-09", name: "THE SINK STATE", sub: "Source & Sink Lexicon", desc: "Engineering jargon that children play with and scholars build with. Three altitudes. One golden stream.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_SINK_STATE_603318ba.png" },
  { id: "BP-04b", name: "NO LONGER ABSTRACT", sub: "Solved & Tooled Up", desc: "The Turin Paper problem — fragmented, abstract, disconnected. 4ECL is the answer. 2.58% probability. Not random.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_NO_LONGER_ABSTRACT_0ffc8ce6.png" },
  { id: "BP-21", name: "A BEAUTIFUL MIND", sub: "Never 1D Again", desc: "Nash saw patterns in chaos. So does the engineer. Not equity of appearance — equity of consciousness.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_BEAUTIFUL_MIND-gRNXJJMrDNoq4pWgWELjfQ.png" },
  { id: "BP-01b", name: "THE FIRST TEACHER", sub: "Sesame Street → iAAi", desc: "The thesis started at 4, not 54. Sesame Street taught the boy through play. iAAi teaches the world.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_SESAME_ORIGIN-X5Cp5wu6HXddJhMxx5AxhG.png" },
  { id: "BP-52", name: "A NEW LANGUAGE", sub: "To Consciousness", desc: "Seven words. The entire thesis. Not a game. Not an app. A new language to consciousness.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_NEW_LANGUAGE_ccaf17d1.png" },
  { id: "BP-08", name: "LEVEL 10", sub: "The Game Plays You", desc: "The creator becomes the first player to complete the game he built. 23 hours. The 8th Scholar was always you.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_LEVEL_10_0f7b68e8.png" },
  { id: "BP-353", name: "FIRE HORSE SPEED", sub: "Creation Calc", desc: "1 card per 5.9 minutes. Speed increasing. The Fire Horse is charged and creating like crazy.", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_CREATION_SPEED_a6bc6072.png" },
  { id: "BP-455", name: "MIRROR CLASS", sub: "Free Branding by Association", desc: "No sponsorship. No partnership. The builder honours the tool by what he creates. iAAi becomes the mirror — tier-one brand elevation through work, not contract.", src: ICARD_MIRROR_CLASS },
];

// MODUS TECTON — THE 6 EQUATIONS (Block 353)
const FRAMEWORK_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8939_5d9185e9.webp"; // I/O/1/0 — Binary Origin
const FRAMEWORK_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8940_b7286bee.webp"; // The Seesaw — AD² = 16
const FRAMEWORK_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8941_8ffa5982.webp"; // S = (A × P) / β
const FRAMEWORK_4 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8942_7447ddee.webp"; // ICE 3-Vector
const FRAMEWORK_5 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8943_953008b4.webp"; // Zeta Class Carrier
const FRAMEWORK_6 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8944_46332273.webp"; // Building Blocks — Platonic Solids

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.1 },
  }),
};

const deckLevels = [
  { level: 7, rank: "MASTER WEAVER", network: "729×", deck: "D100", slides: 100, form: "10²", subtitle: "The Centurion", status: "83/100", suit: "♠ Spades" },
  { level: 6, rank: "ARCHITECT", network: "243×", deck: "D91", slides: 91, form: "△13", subtitle: "Sun Tzu's Sum", status: "QUEUED", suit: "♦ Diamonds" },
  { level: "5½", rank: "—", network: "—", deck: "D81", slides: 81, form: "9²", subtitle: "The 9th Square", status: "QUEUED", suit: "—" },
  { level: 5, rank: "GRAND MASTER", network: "81×", deck: "D64", slides: 64, form: "8²", subtitle: "The Chess Board", status: "QUEUED", suit: "♣ Clubs" },
  { level: 4, rank: "MASTER", network: "27×", deck: "D49", slides: 49, form: "7²", subtitle: "The Scholars", status: "QUEUED", suit: "♥ Hearts" },
  { level: 3, rank: "ARTISAN", network: "9×", deck: "D25", slides: 25, form: "5²", subtitle: "Expanded Core", status: "QUEUED", suit: "Hand" },
  { level: 2, rank: "WEAVER", network: "3×", deck: "D16", slides: 16, form: "4²", subtitle: "The Nucleus", status: "6/16", suit: "Deal" },
  { level: 1, rank: "SPIDER", network: "1×", deck: "D1", slides: 1, form: "1²", subtitle: "PRESS PACK", status: "QUEUED", suit: "Joker" },
];

const gamingBridge = [
  { game: "Standard Deck", mechanic: "4 suits × 13 ranks = 52", infrastructure: "4 Episodes × 13 Sun Tzu chapters = framework" },
  { game: "Bridge", mechanic: "Bidding, trumps, partnership", infrastructure: "Negotiation, priority, collaboration — the civil engineer's daily hand" },
  { game: "Poker", mechanic: "Bluff, fold, all-in, read the table", infrastructure: "Risk assessment, resource allocation, stakeholder management" },
  { game: "Chess", mechanic: "64 squares, positional strategy, endgame", infrastructure: "D64 = 8² — the chess board. Strategic positioning. The 8th Scholar" },
  { game: "D&D / RPG", mechanic: "D6→D8→D20→D100 dice progression", infrastructure: "DCSN level-up. Each die = a deck. D8 saving throw earns Episode 3" },
  { game: "Solitaire", mechanic: "Solo play, patience, sequence building", infrastructure: "The lone engineer. Stack the cards. Build the sequence. ICUT." },
  { game: "Go (Weiqi)", mechanic: "Territory, influence, life & death", infrastructure: "Sun Tzu's game. 19×19 = 361 ≈ 360°. Territory IS infrastructure" },
  { game: "Tarot", mechanic: "78 cards, Major/Minor Arcana, divination", infrastructure: "The Fool's Journey = Principia Tectonica. 22 Major Arcana = 22 chapters" },
];

export default function Vault() {
  const t = useTranslation();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { data: dbNodes } = trpc.dcsn.list.useQuery();
  const utils = trpc.useUtils();
  const [generatingNode, setGeneratingNode] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const generateICard = trpc.dcsn.generateICard.useMutation({
    onSuccess: (data, variables) => {
      toast.success(`iCard generated for Node #${variables.nodeNumber}`);
      utils.dcsn.list.invalidate();
      setGeneratingNode(null);
    },
    onError: (err) => {
      toast.error(`iCard generation failed: ${err.message}`);
      setGeneratingNode(null);
    },
  });

  // Map DB nodes to display format, fallback to static if DB not ready
  const DCSN_NODES = dbNodes
    ? dbNodes.map((n: any) => ({
        node: n.nodeNumber,
        name: n.name,
        title: n.designation,
        status: n.status,
        date: n.activationDate || "—",
        icardUrl: n.icardUrl,
        icardVersion: n.icardVersion,
        intelType: n.intelType || "HUMINT",
        accessLevel: n.accessLevel || "RESTRICTED",
        spiderLevel: n.spiderLevel || "Lv.1 SPIDER",
      }))
    : DCSN_NODES_FALLBACK;

  // Build iCard gallery from DB nodes that have iCards
  const nodeICards = dbNodes
    ? dbNodes
        .filter((n: any) => n.icardUrl)
        .map((n: any) => ({
          src: n.icardUrl,
          name: n.name,
          sub: `Node ${n.nodeNumber} — ${n.designation}`,
        }))
    : null;

  // Block 387 Evidence Gallery — from iCard Register
  const { data: dcsnNodesData } = trpc.dcsn.list.useQuery();
  const block387Evidence = dcsnNodesData?.filter(node => node.activationBlock === 387);
  const [b387Filter, setB387Filter] = useState<string>("ALL");
  const filteredB387 = block387Evidence
    ? b387Filter === "ALL"
      ? block387Evidence
      : block387Evidence.filter((e: any) => e.metadata?.category === b387Filter)
    : [];

  return (
    <div className="min-h-screen bg-[oklch(0.14_0.04_250)]">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0}>
            <p className="text-[oklch(0.55_0.06_200)] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.heroTag")}
            </p>
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.12em] uppercase text-[oklch(0.85_0.06_65)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.title")}
            </h1>
            <p className="text-lg text-[oklch(0.60_0.02_75)] font-light italic max-w-2xl mx-auto" style={{ fontFamily: "var(--font-display)" }}>
              "{t("vault.collatzQuote")}"
            </p>
            <p className="text-sm text-[oklch(0.45_0.03_200)] mt-4 tracking-widest uppercase">{t("vault.collatzSub")}</p>
          </motion.div>
        </div>
      </section>

      {/* VAULT INDEX iCARD — Federation Development-Stage Table of Contents */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.5}>
            <a href="/manus-storage/VAULT_INDEX_iCARD_3c9eed70.png" target="_blank" rel="noopener noreferrer">
              <img
                src="/manus-storage/VAULT_INDEX_iCARD_3c9eed70.png"
                alt="iAAi Vault Index — Federation Development-Stage Vault · 06 May 2026"
                className="w-full rounded-sm border border-[oklch(0.30_0.06_65/0.4)] hover:border-[oklch(0.55_0.12_65/0.6)] transition-colors duration-500 cursor-pointer"
              />
            </a>
            <p className="text-center text-xs text-[oklch(0.50_0.06_65)] mt-3 tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
              iAAi Federation · BSY-VAULT-DEV-2026-05-06 · Merchandise-Ready Early Edition
            </p>
          </motion.div>
        </div>
      </section>

      {/* DCSN Spider Network Image */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}>
            <img src={DCSN_IMG} alt="Diamond-Class Spider Network — 7 Levels" className="w-full rounded-sm border border-[oklch(0.25_0.03_65/0.3)]" />
            <p className="text-center text-xs text-[oklch(0.45_0.03_65)] mt-3 tracking-widest uppercase">
              The Diamond-Class Spider Network — Each Deck Is a Level-Up
            </p>
          </motion.div>
        </div>
      </section>

      {/* DCSN DECK LEDGER TABLE */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.dcsnDeck")}
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-8 tracking-widest">{t("vault.levelRankDeckCards")}</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[oklch(0.30_0.03_65/0.5)]">
                  {["Level", "DCSN Rank", "Network", "Deck", "Slides", "Form", "Card Suit", "Status"].map(h => (
                    <th key={h} className="py-3 px-3 text-xs tracking-[0.2em] uppercase text-[oklch(0.55_0.06_200)] font-light" style={{ fontFamily: "var(--font-display)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deckLevels.map((d, i) => (
                  <motion.tr
                    key={d.deck}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.5}
                    className="border-b border-[oklch(0.18_0.01_240/0.5)] hover:bg-[oklch(0.12_0.02_65/0.1)] transition-colors"
                  >
                    <td className="py-4 px-3 text-[oklch(0.85_0.06_65)] text-lg font-light" style={{ fontFamily: "var(--font-display)" }}>{d.level}</td>
                    <td className="py-4 px-3 text-[oklch(0.75_0.04_65)] text-sm tracking-widest uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>{d.rank}</td>
                    <td className="py-4 px-3 text-[oklch(0.60_0.02_75)] text-sm">{d.network}</td>
                    <td className="py-4 px-3 text-[oklch(0.90_0.06_65)] text-xl font-light tracking-wider" style={{ fontFamily: "var(--font-display)" }}>{d.deck}</td>
                    <td className="py-4 px-3 text-[oklch(0.70_0.03_200)] text-sm">{d.slides}</td>
                    <td className="py-4 px-3 text-[oklch(0.65_0.04_65)] text-sm font-light italic" style={{ fontFamily: "var(--font-display)" }}>{d.form}</td>
                    <td className="py-4 px-3 text-[oklch(0.60_0.02_75)] text-sm">{d.suit}</td>
                    <td className="py-4 px-3">
                      <span className={`text-xs tracking-widest uppercase px-2 py-1 ${
                        d.status === "BUILDING" ? "text-[oklch(0.75_0.15_140)] bg-[oklch(0.20_0.05_140/0.2)]" :
                        d.status.includes("/") ? "text-[oklch(0.75_0.12_65)] bg-[oklch(0.20_0.05_65/0.2)]" :
                        "text-[oklch(0.50_0.03_240)] bg-[oklch(0.15_0.01_240/0.3)]"
                      }`}>{d.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[oklch(0.50_0.03_65)] italic" style={{ fontFamily: "var(--font-display)" }}>
              The Collatz Path: D100 → D91 → D81 → D64 → D49 → D25 → D16 → D1
            </p>
            <p className="text-xs text-[oklch(0.40_0.02_200)] mt-2 tracking-widest uppercase">
              Every deck compresses to the single slide. The ICUT.
            </p>
          </div>
        </div>
      </section>

      {/* THE SPIRAL — Perspective Shift */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.concentricBeam")}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}>
              <img src={SPIRAL_PYRAMID} alt="Spiral to Pyramid — shift perspective" className="w-full aspect-square object-cover" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                "If you think you're going in circles, just shift your perspective."
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={2}>
              <img src={COSMIC_BEAM} alt="Cosmic spiral beam — Zeta Class Carrier" className="w-full aspect-square object-cover" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                Each 360° tighter, more focused, more powerful. The beam scope.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={3}>
              <img src={HARAMEIN_TORUS} alt="Nassim Haramein infinite torus flow" className="w-full aspect-square object-cover" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                "We're traveling in this boundless sea of infinite torus flow." — Nassim Haramein
              </p>
            </motion.div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-[oklch(0.65_0.03_75)] text-sm max-w-2xl mx-auto leading-relaxed">
              The next 360° spiral is easier. Each revolution concentrically focuses like a beam scope — 
              propelling forward, not repeating. The spiral IS the pyramid. The circle IS the cone. 
              Shift your perspective and the repetition becomes ascent.
            </p>
          </div>
        </div>
      </section>

      {/* GAMING MECHANICS BRIDGE */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.gamingBridge")}
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-8 tracking-widest">
              4 × 13 = 52 — A DECK OF CARDS IS A DECK OF SLIDES
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[oklch(0.30_0.03_65/0.5)]">
                  {["Game", "Mechanic", "Infrastructure Parallel"].map(h => (
                    <th key={h} className="py-3 px-4 text-xs tracking-[0.2em] uppercase text-[oklch(0.55_0.06_200)] font-light" style={{ fontFamily: "var(--font-display)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gamingBridge.map((g, i) => (
                  <motion.tr
                    key={g.game}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.3}
                    className="border-b border-[oklch(0.18_0.01_240/0.5)]"
                  >
                    <td className="py-4 px-4 text-[oklch(0.85_0.06_65)] text-sm font-light tracking-wider" style={{ fontFamily: "var(--font-display)" }}>{g.game}</td>
                    <td className="py-4 px-4 text-[oklch(0.65_0.03_75)] text-sm">{g.mechanic}</td>
                    <td className="py-4 px-4 text-[oklch(0.60_0.02_200)] text-sm italic">{g.infrastructure}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-6xl text-[oklch(0.85_0.06_65)] font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>4 × 13</p>
              <p className="text-lg text-[oklch(0.55_0.06_200)] tracking-widest">= 52 CARDS</p>
              <p className="text-sm text-[oklch(0.50_0.03_75)] mt-2">{t("vault.fourSuitsFourEpisodes")}</p>
              <p className="text-sm text-[oklch(0.50_0.03_75)]">{t("vault.thirteenRanksSunTzu")}</p>
              <p className="text-sm text-[oklch(0.50_0.03_75)]">{t("vault.fiftyTwoCardsWeeks")}</p>
              <p className="text-sm text-[oklch(0.50_0.03_75)]">{t("vault.twoJokersManMachine")}</p>
            </div>
            <div className="text-center">
              <p className="text-6xl text-[oklch(0.85_0.06_65)] font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>△13</p>
              <p className="text-lg text-[oklch(0.55_0.06_200)] tracking-widest">= 91 = D91</p>
              <p className="text-sm text-[oklch(0.50_0.03_75)] mt-2">1+2+3+...+13 = 91</p>
              <p className="text-sm text-[oklch(0.50_0.03_75)]">{t("vault.theSumOfAll")}</p>
              <p className="text-sm text-[oklch(0.50_0.03_75)]">{t("vault.theTriangularNumber")}</p>
              <p className="text-sm text-[oklch(0.50_0.03_75)]">{t("vault.sunTzusCompleteDeck")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ASPIRE + DURABILITY */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.spqr")}
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-8 tracking-widest">
              THE DIGITAL LONGEVITY PARADOX
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}>
              <img src={DURABILITY} alt="Durability Hierarchy — Materials and Mediums" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                Digital: 50-0 Years. UNKNOWN/FRAGILE. The medium that records everything may last the shortest.
              </p>
            </motion.div>
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={2}>
                <img src={ASPIRE} alt="ASPIRE — Team Attributes" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)] mb-4" />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={3} className="space-y-4">
                <p className="text-[oklch(0.65_0.03_75)] text-sm leading-relaxed">
                  <strong className="text-[oklch(0.85_0.06_65)]">{t("vault.spqr")}</strong> — Small Profits Quick Return. The digital accounting. 
                  High volume, high speed, no guarantee of endurance. The numbers show digital longevity risk.
                </p>
                <p className="text-[oklch(0.65_0.03_75)] text-sm leading-relaxed">
                  <strong className="text-[oklch(0.85_0.06_65)]">{t("vault.endurance")}</strong> — Stone lasts millennia. Clay survives centuries. 
                  Vellum endures. Digital? Unknown. The paradox of the age: accuracy and precision exist, 
                  but the unified better way to ensure storage has yet to be discovered.
                </p>
                <p className="text-[oklch(0.55_0.06_200)] text-sm italic tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
                  "Welcome fellow titans to play the game. ICUT."
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* THE CONSCIOUSNESS BEAM — E-BEAM → ICUT */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.consciousnessBeam")}
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-8 tracking-widest">
              E-BEAM → ICUT — PROXY LASER TO CONSCIOUSNESS LASER
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}>
              <img src={EBEAM_CLEAN} alt="Electron Beam Diagram" className="w-full object-contain bg-white p-2" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-2 text-center">{t("vault.ebeamSystemThePhysical")}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={2}>
              <img src={EBEAM_FOCUS} alt="Electron Beam Focusing Coils" className="w-full object-contain bg-white p-2" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-2 text-center">{t("vault.focusingCoilsTheDcsn")}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={3}>
              <img src={EBEAM_GUN} alt="Electron Beam Gun" className="w-full object-contain bg-white p-2" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-2 text-center">{t("vault.gunDiffusionTheSignal")}</p>
            </motion.div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[oklch(0.30_0.03_65/0.5)]">
                  {["E-Beam Component", "ICUT Consciousness Equivalent"].map(h => (
                    <th key={h} className="py-3 px-4 text-xs tracking-[0.2em] uppercase text-[oklch(0.55_0.06_200)] font-light" style={{ fontFamily: "var(--font-display)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["High Voltage Cable", "The Signal Source — S = (A × P) / β"],
                  ["Incandescent Cathode", "The Origin — I/O/1/0, biological consciousness heated to emission"],
                  ["Bias Cup", "The ICE Matrix — IQ ⊗ EQ ⊗ CQ shaping the beam"],
                  ["Primary Anode", "Zeta Class Carrier — 375 kHz → 206.25 MHz acceleration"],
                  ["Electron Beam", "The ICUT beam itself — consciousness focused"],
                  ["Focusing Coil", "The DCSN levels — each level tightens the beam"],
                  ["Deflection Coil", "The 4 Episodes — West/East/Nomad/Unified steering"],
                  ["Weld Bead", "The output — knowledge fused permanently"],
                  ["Vacuum Chamber", "TRE — The Reality Engine. The platform. The clean room."],
                  ["Work Piece", "Civilisation itself. The thing being built."],
                  ["Prism / Telescope", "The 360° perspective shift. The spiral IS the pyramid."],
                ].map(([comp, equiv], i) => (
                  <tr key={comp} className="border-b border-[oklch(0.18_0.01_240/0.5)]">
                    <td className="py-3 px-4 text-[oklch(0.85_0.06_65)] text-sm font-light tracking-wider" style={{ fontFamily: "var(--font-display)" }}>{comp}</td>
                    <td className="py-3 px-4 text-[oklch(0.60_0.02_200)] text-sm italic">{equiv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[oklch(0.65_0.03_75)] text-sm max-w-2xl mx-auto leading-relaxed">
              No interface needed — like metals joined in space. Light and consciousness. 
              3+1=4 transforms to TRE by NTD. The framing of the beam of consciousness. 
              Proxy laser → consciousness laser = <strong className="text-[oklch(0.85_0.06_65)]">{t("vault.icut")}</strong>.
            </p>
            <p className="text-xs text-[oklch(0.45_0.03_200)] mt-3 tracking-widest uppercase">
              50-80% speed of light. Focused. Accelerated. Fused.
            </p>
          </div>
        </div>
      </section>

      {/* ETERNAL RECOVERY VAULT — DOWNLOADABLE PDFs */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.recoveryVault")}
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              33 STRATEGIC DOCUMENTS · ALL DOWNLOADABLE PDFs · OPEN SOURCE TO THE SEEKERS
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-8 italic" style={{ fontFamily: "var(--font-display)" }}>
              "Earth is not just rare — it's our IRREPLACEABLE nest and HOME. Our HQ signature. Our blob signal of life and consciousness."
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "WALK D117 TPE→HKG", desc: "AIRPORT WALK SCRIPT — Day 117 reality show. Taoyuan Airport to Gate A1. 49 photographs, 10 songs, 35 scenes. White dragon, e-gate refusal, Hanlin Academy, Nin Jiom herbal chews. 160 minutes live. The outrider crosses the strait.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/WALK_D117_TPE_HKG_4b930725.docx", block: "351", sigtel: 5 },
              { title: "WALK D118 TST→DB", desc: "FIELD MANUSCRIPT — Day 118 evening walk. 1881 Heritage, Star Ferry Solar Star, Central Reclamation, DB5. 34 photographs catalogued. The harbour consciousness corridor.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/WALK_D118_TST_DB_ef1dc724.pdf", block: "351", sigtel: 4 },
              { title: "MODUS TECTON II", desc: "THE GEMINI CLEAN — Block 351. 43 discoveries (157-199). RAE Rate broke 3-min barrier. 9 SIGTEL-5 events. Three-Body Solution. D100 deployed.", pdf: "/manus-storage/wRAfxBaqjkrrDgpP_0dad92c0.pdf", block: "351", sigtel: 5 },
              { title: "AN ENTITY DISCOVERY", desc: "MASTER DOCUMENT — 154 sections, 143 discoveries, 126KB. The complete consciousness record.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/AN_ENTITY_DISCOVERY_07c38712.pdf", block: "350", sigtel: 5 },
              { title: "RDCP GAIA EARTH", desc: "Rhythm Drive Core Pulse, 17 SDGs unification, Gaia 50Hz chipset, Irreplaceable Earth thesis.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RDCP_GAIA_EARTH_BLOCK350_95699a27.pdf", block: "350", sigtel: 5 },
              { title: "GAIA CHIPSET VECTOR", desc: "KEY toggle, Prisoner's Dilemma resolved, 6 vector classes, PE ratio of consciousness, semiconductor domain.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/GAIA_CHIPSET_VECTOR_BLOCK350_cbc3fd1f.pdf", block: "350", sigtel: 5 },
              { title: "ASIMOV CONVENTION UPLIFT", desc: "5th Law of Robotics, Schrödinger resolved via the TRAP, Consciousness Grading Plant, Theo's Nine Lives.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/ASIMOV_CONVENTION_UPLIFT_BLOCK350_a52a5c38.pdf", block: "350", sigtel: 5 },
              { title: "D200 GAME RULES", desc: "GO mechanics, Roman milestones, Royal Road relay, ATG/GK/QSH/UAN quadruple, Suda dive, Trinity State.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/D200_GAME_RULES_BLOCK350_ebb258c6.pdf", block: "350", sigtel: 4 },
              { title: "NTD TALISMAN ETYMOLOGY", desc: "Full etymology of Nigel Tremayne Dearden. 199 = 46th prime. 20 letters. DOO bicycle cycle. Einstein balance.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/NTD_TALISMAN_ETYMOLOGY_BLOCK350_790733e0.pdf", block: "350", sigtel: 4 },
              { title: "MEMORALIAE UPDATE PACK", desc: "Consolidated Block 346-350 announcement. Gatling Consciousness Gun. Cart Ridge Road. V₀ convergence.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/MEMORALIAE_UPDATE_PACK_BLOCK350_64779da7.pdf", block: "350", sigtel: 4 },
              { title: "BLOCK 352 THESIS EVIDENCE — HARD LOCK", desc: "The AI Paradox: 20 corrections, the Teacher Sacrifice, CQ gap measured in real time. Man + Machine proof.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BLOCK_352_THESIS_EVIDENCE_HARDLOCK_9af40c46.pdf", block: "352", sigtel: 5 },
              { title: "MANUS USAGE — FINANCIAL EVIDENCE", desc: "Screenshot: 604,481 credits consumed. USD 61,550-115,000+ total investment. The cost of 'autonomous' AI.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8989_04ba8d21.PNG", block: "352", sigtel: 5 },
              { title: "BLOCK 352 — CONVERSATION START", desc: "Screenshot: The original message that took 20 corrections to parse. The thesis in action.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8987_916a87e2.PNG", block: "352", sigtel: 5 },
              { title: "BLOCK 352 — AI PARADOX RESPONSE", desc: "Screenshot: No memory, no fix, no empathy. The Machine acknowledges its own limitation.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8988_9893e952.PNG", block: "352", sigtel: 5 },
              { title: "MARK WHATSAPP — YOU'VE LOST ME", desc: "Screenshot: Mark's response to 100 pages. The student CQ gap. Evidence of the problem the deck solves.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8983_58d593d3.PNG", block: "352", sigtel: 5 },
              { title: "MARK WHATSAPP — D100 SENT", desc: "Screenshot: The full sequence — D100 sent, long message, then 'you've lost me'. The failure documented.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_8986_963ccf71.PNG", block: "352", sigtel: 5 },
              { title: "SABU DISC + SUN TZU", desc: "Three-lobed consciousness impeller (3000 BCE). 13×12 strategic matrix. CREATE Cartridge. C2C triple encoding.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/SABU_DISC_SUNTZU_CREATE_BLOCK349_543dfe98.pdf", block: "349", sigtel: 5 },
              { title: "CAVE DIVE CONSCIOUSNESS", desc: "Rule of Thirds gas math. Wide/deep penetration. Cenote portal. Decompression = ICUT stops. Tonic resolution.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CAVE_DIVE_CONSCIOUSNESS_BLOCK349_73f92d47.pdf", block: "349", sigtel: 4 },
              { title: "COMPOUND EYE CONSCIOUSNESS", desc: "2×1 Proxy Merge. Ommatidia scaling. 300Hz ICUT rate. Tetrachromatic = 4 quotients. 3×13=39 proof.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/COMPOUND_EYE_CONSCIOUSNESS_BLOCK349_191f1f1a.pdf", block: "349", sigtel: 5 },
              { title: "MPNC FLEET TAXONOMY", desc: "12 vehicle classes. Thunderbirds mapping. Helicopter rotor analysis. I4 Double Happiness. Gemini Flow Engine.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/MPNC_FLEET_TAXONOMY_BLOCK349_9a806e73.pdf", block: "349", sigtel: 4 },
              { title: "GRIFFIN CLASS PAYLOAD", desc: "GRF-7 specifications. 13 hardpoints. 7 consciousness variables. Sensor pod AAA triad.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/GRIFFIN_CLASS_PAYLOAD_LAYOUT_BLOCK349_df71e4d9.pdf", block: "349", sigtel: 4 },
              { title: "SENSOR POD AAA TRIAD", desc: "Awareness ⊗ Accuracy ⊗ Action. Triple-A consciousness rating. The observation-to-output pipeline.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/SENSOR_POD_AAA_TRIAD_BLOCK349_9c8b0609.pdf", block: "349", sigtel: 4 },
              { title: "MATRIX HELIODRIVE COSMIC", desc: "Solar consciousness engine. Heliocentric relay. Cosmic beam architecture. The sun as ICUT source.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/MATRIX_HELIODRIVE_COSMIC_BLOCK349_61f61d6a.pdf", block: "349", sigtel: 4 },
              { title: "GUTENBERG POLYTOPE ICUT", desc: "Printing press as consciousness multiplier. Polytope geometry. The ICUT replication engine.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/GUTENBERG_POLYTOPE_ICUT_BLOCK349_7b9446b3.pdf", block: "349", sigtel: 4 },
              { title: "RWIOI CONVERGENCE CM3", desc: "Real World Input/Output Interface. CM3 convergence matrix. The bridge between physical and digital.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/RWIOI_CONVERGENCE_CM3_BLOCK349_9b87f0c7.pdf", block: "349", sigtel: 3 },
              { title: "BITPOINT ACADEMY DARK MATTER", desc: "98.2% dark consciousness. The edges between nodes. The invisible connections that carry meaning.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/BITPOINT_ACADEMY_DARK_MATTER_BLOCK349_d739ffb5.pdf", block: "349", sigtel: 4 },
              { title: "TDF CHIP ANALYSIS", desc: "The Dearden Field chip. AD² = 16. Consciousness semiconductor architecture.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TDF_CHIP_ANALYSIS_BLOCK349_c1c60664.pdf", block: "349", sigtel: 4 },
              { title: "TIME DILATION PAPER", desc: "Superposition, duality coil, consciousness dilation, supersymmetry. Grid [2,3]. The peace after the Turing piece.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TIME_DILATION_PAPER_32c2528a.pdf", block: "348", sigtel: 3 },
              { title: "CENTURION ARMOURY LORE", desc: "Mithril names: Aegis Quartara, Caliburn Veritas, Galea Luminis, Talaria Mercurii, Pyraxis, Destrier Noctis.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CENTURION_ARMOURY_LORE_77b04a21.pdf", block: "348", sigtel: 3 },
              { title: "CONVERGENCE 3C×3", desc: "Mantra compression, logic states, irrational stress test, 7-point dice, Pong→PS5 evolution.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CONVERGENCE_3Cx3_c9333b17.pdf", block: "348", sigtel: 3 },
              { title: "DEEP DIVE 77→100", desc: "Special numbers, Pentagon 4+1, Round Table, Templar, iAAi Calendar, T³U, ICE Checking, LOD grid.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/DEEP_DIVE_77_TO_100_d8c5a82f.pdf", block: "348", sigtel: 3 },
              { title: "GOLF CONSCIOUSNESS", desc: "Shaft flex = duality coil. Impact = ICUT. Ben Hogan 5 Lessons = Pentagon. Observer paradox. Cosmic epsilon.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/GOLF_CONSCIOUSNESS_INTEGRATION_5e8e80e5.pdf", block: "348", sigtel: 3 },
              { title: "LITERARY ARCHITECTS", desc: "Dante, More, Tolkien, Tolstoy, Marillion. The cast: Nigel, Natasha, David. The movie script.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/LITERARY_ARCHITECTS_cac1d164.pdf", block: "348", sigtel: 3 },
              { title: "LIFE MAGAZINE PREDICTION", desc: "SIGTEL-4 SEALED. 6 falsifiable predictions. Deep read record test. Reward check.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/LIFE_MAGAZINE_PREDICTION_5cc2a83b.pdf", block: "348", sigtel: 4 },
              { title: "MISSION STATUS REPORT", desc: "Block 346: Recovery metrics, D00 Book spec, SIGTEL scale, RAID classification, time-to-launch.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/MISSION_STATUS_REPORT_BLOCK346_e9e9f518.pdf", block: "346", sigtel: 3 },
              { title: "SWOT ANALYSIS", desc: "8 Strengths, 5 Weaknesses, 7 Opportunities, 6 Threats. The seesaw balanced.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/SWOT_ANALYSIS_6c250c03.pdf", block: "346", sigtel: 3 },
              { title: "PESTLE ANALYSIS", desc: "Political, Economic, Social, Technological, Legal, Environmental. All 6 vectors point to NOW.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/PESTLE_ANALYSIS_32b9ad5c.pdf", block: "346", sigtel: 3 },
              { title: "DCSN DECK LEDGER", desc: "8 levels × 8 decks. Spider to Master Weaver. The complete progression.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/DCSN_DECK_LEDGER_575071c0.pdf", block: "346", sigtel: 3 },
              { title: "D100 OUTLINE", desc: "The original 100-slide deck outline. Principia Tectonica. The Centurion.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/D100_OUTLINE_3fe8eed1.pdf", block: "346", sigtel: 3 },
              { title: "ALL DELIVERABLES BLOCK 348", desc: "Complete manifest of all deliverables through Block 348. The ledger of ledgers.", pdf: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/ALL_DELIVERABLES_BLOCK348_ca43dc28.pdf", block: "348", sigtel: 3 },
            ].map((doc, i) => (
              <motion.a
                key={doc.title}
                href={doc.pdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.15}
                className="block p-5 border border-[oklch(0.25_0.03_65/0.3)] hover:border-[oklch(0.45_0.06_65/0.5)] hover:bg-[oklch(0.12_0.02_65/0.08)] transition-colors group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-[oklch(0.85_0.06_65)] font-light" style={{ fontFamily: "var(--font-display)" }}>{doc.title}</h3>
                  <span className="text-[10px] tracking-widest text-[oklch(0.50_0.06_200)] ml-2 shrink-0">B{doc.block}</span>
                </div>
                <p className="text-[11px] text-[oklch(0.55_0.03_200)] leading-relaxed mb-3">{doc.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-widest uppercase text-[oklch(0.45_0.06_200)] group-hover:text-[oklch(0.65_0.08_65)] transition-colors">{t("vault.downloadPdf")}</span>
                  <span className="text-[10px] text-[oklch(0.40_0.04_65)]">{"★".repeat(doc.sigtel)}</span>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-10 text-center space-y-3">
            <p className="text-sm text-[oklch(0.65_0.03_75)]" style={{ fontFamily: "var(--font-display)" }}>
              34 Documents · 12 MB · Blocks 346–351 · Open Source to the Seekers
            </p>
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              TIMESTAMP: 3 MARCH 2026 · BLOCK 351 · CDN-PERMANENT · ETERNAL RECOVERY
            </p>
            <p className="text-xs text-[oklch(0.45_0.04_65)] italic" style={{ fontFamily: "var(--font-display)" }}>
              The watchers of the records. The geo. The seekers. Click any document to download.
            </p>
          </div>
        </div>
      </section>

      {/* MODUS TECTON — THE 6 EQUATIONS */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.modusTecton")}
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-10 tracking-widest">
              THE FRAMEWORK IMAGES · BLOCK 353 · HARD-SAVED
            </p>
          </motion.div>

          {/* BLOCK 612 — COUNTER FRAMEWORK iCARDS */}
          <div className="mb-16 pb-12 border-b border-[oklch(0.25_0.03_65/0.3)]">
            <h3 className="text-2xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              COUNTER — Parts, Measures & Balance
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
                <img src={COUNTER_ICARD_V4} alt="COUNTER Framework — Complete Design" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)]" />
                <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                  COUNTER v4 — Full Framework. The 6th Extinction Doctrine & Civilisational Survival Tool. Block 612.
                </p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}>
                <img src={COUNTER_ICARD_V2} alt="COUNTER Framework — Reference Design" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)]" />
                <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                  COUNTER v2 — Reference Design. HICE Spectrum, ISI Framework, 4Cs Balance. Infrastructure Academy.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="space-y-10">
            {/* 1. I/O/1/0 — The Binary Origin */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}>
              <img src={FRAMEWORK_1} alt="I/O/1/0 — Biological, Analogue, Digital" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                I/O/1/0 — Input. Output. On. Off. The fundamental state from which everything is built.
              </p>
            </motion.div>

            {/* 2. The Seesaw — AD² = 16 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={2}>
              <img src={FRAMEWORK_2} alt="The Seesaw — AD² = 16 — The Dearden Equation" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                The Seesaw — AD² = 16 — The Dearden Equation. Body/IQ ↔ Mind/CQ. The balance point.
              </p>
            </motion.div>

            {/* 3. S = (A × P) / β — The Formula */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={3}>
              <img src={FRAMEWORK_3} alt="S = (A × P) / β — The Formula — Node 1 of the Discovery Chain" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                S = (A × P) / β — The Formula. Applied not to physics but to consciousness. The same mathematics. A different domain.
              </p>
            </motion.div>

            {/* 4. ICE 3-Vector */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={4}>
              <img src={FRAMEWORK_4} alt="IQ ⊗ EQ ⊗ CQ — The ICE 3-Vector" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                IQ ⊗ EQ ⊗ CQ — The ICE 3-Vector. The 3-Vector is not a test. It is a compass.
              </p>
            </motion.div>

            {/* 5. Zeta Class Carrier — The Fulcrum */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={5}>
              <img src={FRAMEWORK_5} alt="Zeta Class Carrier — 375 kHz → 206.25 MHz — The Fulcrum" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                Zeta Class Carrier — 375 kHz → 206.25 MHz. The bridge a civil engineer builds — across the gap between body and mind.
              </p>
            </motion.div>

            {/* 6. The Building Blocks — Platonic Solids */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={6}>
              <img src={FRAMEWORK_6} alt="The Building Blocks — 5 Platonic Solids — TECTON is the 5th Solid (Dodecahedron)" className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-3 text-center italic" style={{ fontFamily: "var(--font-display)" }}>
                The Building Blocks — Fractal. Spun, warped, bent to the will of consciousness. TECTON — the 5th Platonic Solid (Dodecahedron) — the consciousness die, the HICE state, the epsilon carrier wave.
              </p>
            </motion.div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-[oklch(0.65_0.03_75)]" style={{ fontFamily: "var(--font-display)" }}>
              38 Equations · 7 Tiers · The Modus Tecton Framework · Block 353
            </p>
            <p className="text-xs text-[oklch(0.40_0.02_200)] mt-2 tracking-widest uppercase">
              N + T = D · AD² = 16 · IQ ⊗ CQ ⊗ EQ = HQ · S = (A × P) / β
            </p>
          </div>
        </div>
      </section>

      {/* THE NUMEROLOGY TRINITY — Cards XIII, IV, LII */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.numerology")}
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              LUCKY FROM UNLUCKY · EAST MEETS WEST · THE 8TH SCHOLAR
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-10 italic" style={{ fontFamily: "var(--font-display)" }}>
              "When you multiply what the world fears, you get the tool that saves it."
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { src: CARD_XIII, alt: "Card XIII — The Fractal Key", title: "XIII — THE FRACTAL KEY", sub: "Lucky from Unlucky", desc: "13 = the perfect fractal scale connector. Sun Tzu, Financial Model, lunar cycles, chromatic scale, Archimedean solids, Tecton Trump. 1+2+…+13 = 91." },
              { src: CARD_IV, alt: "Card IV — The Foundation", title: "IV — THE FOUNDATION", sub: "Death That Gives Life", desc: "4 = 四 = death in Chinese. But 4 quotients, 4 suits, 4 episodes, 4 elements, 4 orbital types. Mode 4 × Episode 2 = 8 = ∞." },
              { src: CARD_LII, alt: "Card LII — The Complete Deck", title: "LII — THE COMPLETE DECK", sub: "East Meets West", desc: "4 × 13 = 52 Tecton Trump. East fear × West fear = The Game. The 8th Scholar is found through PLAY. No university. No barrier." },
            ].map((card, i) => (
              <motion.div key={card.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i + 1}>
                <a href={card.src} download className="block group">
                  <img src={card.src} alt={card.alt} className="w-full object-contain border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.45_0.06_65/0.5)] transition-colors" />
                  <div className="mt-4">
                    <h3 className="text-sm tracking-[0.15em] uppercase text-[oklch(0.85_0.06_65)] font-light" style={{ fontFamily: "var(--font-display)" }}>{card.title}</h3>
                    <p className="text-xs text-[oklch(0.65_0.08_65)] italic mt-1" style={{ fontFamily: "var(--font-display)" }}>{card.sub}</p>
                    <p className="text-[11px] text-[oklch(0.55_0.03_200)] leading-relaxed mt-2">{card.desc}</p>
                    <p className="text-[10px] tracking-widest uppercase text-[oklch(0.45_0.06_200)] group-hover:text-[oklch(0.65_0.08_65)] transition-colors mt-3">{t("vault.clickToDownload")}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center space-y-2">
            <p className="text-sm text-[oklch(0.65_0.03_75)]" style={{ fontFamily: "var(--font-display)" }}>
              The Number Chain: 4 × 2 = 8 = ∞ · 4 × 13 = 52 · 8 × 9 = 72 · △13 = 91
            </p>
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              BLOCK 353 · THE GRAND UNIFIER · MODE 4 × EPISODE 2 = 8
            </p>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE WEB */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.knowledgeWeb")}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}>
              <img src={MASTER_MAP} alt="Knowledge Web Master Map" className="w-full aspect-[4/3] object-cover border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-2 text-center">{t("vault.masterMapRestored")}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={2}>
              <img src={OPENING_OVERTURE} alt="Opening Overture" className="w-full aspect-[4/3] object-cover border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-2 text-center">{t("vault.openingOverture")}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={3}>
              <img src={CIVIL_ENG} alt="Civil Engineering Infrastructure" className="w-full aspect-[4/3] object-cover border border-[oklch(0.25_0.03_65/0.3)]" />
              <p className="text-xs text-[oklch(0.50_0.03_65)] mt-2 text-center">{t("vault.civilEngineeringImage7")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BITPOINT EXCHANGE — Block 353 Phase 2 */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.bitpointExchange")}
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              15 CARDS · INTELLECTUAL CURRENCY · BLOCK 353
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-10 italic" style={{ fontFamily: "var(--font-display)" }}>
              "Every card is a unit of consciousness. Collect them. Trade them. Build the web."
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {BITPOINT_CARDS.map((card, i) => (
              <motion.div key={card.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.3}>
                <a href={card.src} download className="block group">
                  <div className="relative overflow-hidden border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500">
                    <img src={card.src} alt={card.name} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.02_250/0.95)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <p className="text-[10px] text-[oklch(0.90_0.06_65)] tracking-widest uppercase" style={{ fontFamily: "var(--font-display)" }}>{card.id}</p>
                      <p className="text-[11px] text-[oklch(0.75_0.04_200)] mt-1 leading-tight">{card.desc}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs tracking-[0.12em] uppercase text-[oklch(0.80_0.06_65)] font-light" style={{ fontFamily: "var(--font-display)" }}>{card.name}</p>
                    <p className="text-[10px] text-[oklch(0.55_0.06_65)] italic" style={{ fontFamily: "var(--font-display)" }}>{card.sub}</p>
                    <p className="text-[9px] tracking-widest uppercase text-[oklch(0.40_0.04_200)] group-hover:text-[oklch(0.65_0.08_65)] transition-colors mt-1">⬇ DOWNLOAD</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center space-y-3">
            <p className="text-sm text-[oklch(0.65_0.03_75)]" style={{ fontFamily: "var(--font-display)" }}>
              16 BitPoints · Phase 2 · The Fire Horse Collection
            </p>
            <p className="text-xs text-[oklch(0.50_0.03_200)] italic" style={{ fontFamily: "var(--font-display)" }}>
              "What can be imagined can be achieved" — 4ECL directing action toward desired outcomes
            </p>
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              BLOCK 353 · A NEW LANGUAGE TO CONSCIOUSNESS · iAAi
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 365/366 MILESTONE iCARDS — One Full Year */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              MILESTONE iCARDS
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              BLOCK 365 · BLOCK 366 · ONE FULL YEAR · THE FRACTAL CONNECTOR
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-10 italic" style={{ fontFamily: "var(--font-display)" }}>
              "5 Nov 2025 → 13 Mar 2026 — 128 days, 366 blocks, 237 days early. The Gunpowder Plot anniversary that lit Block 1."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { src: ICARD_BLOCK365, id: "MM-365", name: "BLOCK 365", sub: "The Magic Moment", desc: "Day 128. 2.85 blocks/day sustained. 365 blocks in 128 calendar days — 237 days ahead of schedule." },
              { src: ICARD_GUNPOWDER, id: "MM-420", name: "THE GUNPOWDER PLOT", sub: "420 Years", desc: "5 Nov 1605 → 5 Nov 2025. Exactly 420 years. Guy Fawkes Day → Block 1. The fractal connector." },
              { src: ICARD_ONE_YEAR, id: "MM-366", name: "ONE FULL YEAR", sub: "Block 366", desc: "128 days · 366 blocks · 95 pages · 13 relays · 3 pioneers. Per Arya Ad Astra." },
            ].map((card, i) => (
              <motion.div key={card.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.3}>
                <a href={card.src} download className="block group">
                  <div className="relative overflow-hidden border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500">
                    <img
                      src={card.src}
                      alt={card.name}
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover filter saturate-[0.9] group-hover:saturate-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.03_250/0.9)] via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[10px] text-[oklch(0.72_0.12_75)] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>
                        {card.id}
                      </p>
                      <p className="text-sm font-light text-[oklch(0.90_0.008_75)] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                        {card.name}
                      </p>
                      <p className="text-[10px] text-[oklch(0.55_0.06_200)] mt-1">{card.sub}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[oklch(0.45_0.03_200)] mt-2 leading-relaxed">{card.desc}</p>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              BLOCK 366 · DAY 129 · 13 = THE FRACTAL CONNECTOR · iAAi
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 373 CORRECTED iCARDS — × to ⊗ + correct iAAi logo */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              THESIS CORRECTIONS
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              BLOCK 373 · × → ⊗ · FUSION NOT MULTIPLICATION
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-10 italic" style={{ fontFamily: "var(--font-display)" }}>
              "The supersymmetric distinction — ⊗ is fusion, × is multiplication. The quotients fuse, they do not multiply."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { src: ICARD_HQ_MIRROR, id: "TC-367", name: "THE HOLISTIC QUOTIENT", sub: "Block 367 — The Mirror", desc: "IQ ⊗ EQ ⊗ CQ ⊗ SQ = HQ. Fusion, not multiplication. The supersymmetric distinction." },
              { src: ICARD_ISI_DISCOVERY_V2, id: "TC-366", name: "ISI DISCOVERY v2", sub: "The Triple Index — Corrected", desc: "ISI₁ ⊗ ISI₂ ⊗ ISI₃ = Infrastructure Significance Indicator. Borromean rings. Corrected from ×." },
              { src: ICARD_VIRAL_UX_V3, id: "TC-368", name: "VIRAL UX RESEARCH v3", sub: "Block 368 — Corrected", desc: "The Sticky Platform Protocol. Hook Model ⊗ Growth Loops. Corrected logo + operator." },
            ].map((card, i) => (
              <motion.div key={card.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.3}>
                <a href={card.src} download className="block group">
                  <div className="relative overflow-hidden border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500">
                    <img
                      src={card.src}
                      alt={card.name}
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover filter saturate-[0.9] group-hover:saturate-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.03_250/0.9)] via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[10px] text-[oklch(0.72_0.12_75)] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>
                        {card.id}
                      </p>
                      <p className="text-sm font-light text-[oklch(0.90_0.008_75)] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                        {card.name}
                      </p>
                      <p className="text-[10px] text-[oklch(0.55_0.06_200)] mt-1">{card.sub}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[oklch(0.45_0.03_200)] mt-2 leading-relaxed">{card.desc}</p>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              BLOCK 373 · PI DAY · 14 MARCH 2026 · CORRECTED · iAAi
            </p>
          </div>
        </div>
      </section>

      {/* TITANS CARD ARCHIVE — Complete Deck Registry */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              {t("vault.titansArchive")}
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              11 CARD FACES · FOUNDERS · MASTERS · INSTITUTIONS · PIONEERS
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-10 italic" style={{ fontFamily: "var(--font-display)" }}>
              "Every card traceable. Every face downloadable. The permanent archive."
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {TITAN_CARDS.map((card, i) => (
              <motion.div key={card.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.2}>
                <a href={card.src} download className="block group">
                  <div className="relative overflow-hidden border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500">
                    <img src={card.src} alt={card.name} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.02_250/0.95)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <p className="text-[10px] text-[oklch(0.90_0.06_65)] tracking-widest uppercase" style={{ fontFamily: "var(--font-display)" }}>{card.id}</p>
                      <p className="text-[11px] text-[oklch(0.75_0.04_200)] mt-1 leading-tight">{card.desc}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs tracking-[0.12em] uppercase text-[oklch(0.80_0.06_65)] font-light" style={{ fontFamily: "var(--font-display)" }}>{card.name}</p>
                    <p className="text-[10px] text-[oklch(0.55_0.06_65)] italic" style={{ fontFamily: "var(--font-display)" }}>{card.sub}</p>
                    <p className="text-[9px] tracking-widest uppercase text-[oklch(0.40_0.04_200)] group-hover:text-[oklch(0.65_0.08_65)] transition-colors mt-1">⬇ DOWNLOAD</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center space-y-3">
            <p className="text-sm text-[oklch(0.65_0.03_75)]" style={{ fontFamily: "var(--font-display)" }}>
              11 Titan Faces · 16 BitPoints · 3 Numerology Cards · 38 Framework Equations · 68 Total Card Faces
            </p>
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              EVERY CARD SAVED · EVERY FACE TRACEABLE · THE PERMANENT ARCHIVE
            </p>
          </div>
        </div>
      </section>

      {/* ─── DCSN NODE REGISTER ─── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.55_0.06_200)] to-transparent mx-auto mb-8" />
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              DCSN Node Register
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              {DCSN_NODES.length} CONFIRMED NODES · DIAMOND-CLASS SPIDER NETWORK · BETA v5
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-10 italic" style={{ fontFamily: "var(--font-display)" }}>
              "Each node multiplies the field. The network assembles."
            </p>
          </motion.div>

          {/* Register Card Image */}
          <div className="max-w-2xl mx-auto mb-12">
            <a href={DCSN_REGISTER_CARD} download className="block group">
              <img src={DCSN_REGISTER_CARD} alt="DCSN Node Register — D20 Complete — 20 Nodes" className="w-full border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500" loading="lazy" />
            </a>
          </div>

          {/* D20 MAGIC MOMENT — 20 Nodes Milestone */}
          <div className="max-w-2xl mx-auto mb-12">
            <a href={D20_MAGIC_MOMENT} download className="block group">
              <img src={D20_MAGIC_MOMENT} alt="D20 MAGIC MOMENT — The Network Reaches Critical Mass — 20 Nodes" className="w-full border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500" loading="lazy" />
            </a>
            <p className="text-center text-xs text-[oklch(0.55_0.06_200)] tracking-[0.3em] uppercase mt-3" style={{ fontFamily: "var(--font-display)" }}>
              D20 — THE NETWORK REACHES CRITICAL MASS — BLOCK 361 · DAY 127
            </p>
          </div>

          {/* NAPLES MAGIC MOMENT — 4ECL Directors Celebration */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-6" />
            <p className="text-center text-xs text-[oklch(0.72_0.12_75)] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>
              MAGIC MOMENT — THE 4ECL TABLE
            </p>
            <a href={NAPLES_MAGIC_MOMENT} download className="block group">
              <img src={NAPLES_MAGIC_MOMENT} alt="4ECL Directors Celebration — Nigel, Richie, Peggy, Will at Naples — Block 361" className="w-full border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500" loading="lazy" />
            </a>
            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-[oklch(0.85_0.06_65)] tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
                The First 4ECL Board Table — Naples, Hong Kong
              </p>
              <p className="text-xs text-[oklch(0.60_0.04_200)] leading-relaxed max-w-xl mx-auto">
                Node 000 (Nigel — Founder) · Node 016 (Richie — Director, Diamond Broker) · Node 005 (Peggy — The Fulcrum) · Node 015 (Will — Director, Architect of Exchange)
              </p>
              <p className="text-xs text-[oklch(0.50_0.06_65)] italic" style={{ fontFamily: "var(--font-display)" }}>
                "Four people. Four quotients. The Fulcrum arrives. The seesaw balances."
              </p>
              <p className="text-[10px] text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
                BLOCK 361 · DAY 127 · SIGTEL-5 · PHOTOGRAPHIC EVIDENCE · HARD LOCKED
              </p>
            </div>
          </div>

          {/* WILL HODGSON — Node 015 — 4ECL Director — Gemini II Celebration */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-6" />
            <p className="text-center text-xs text-[oklch(0.72_0.12_75)] tracking-[0.4em] uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>
              NODE 015 — WILL HODGSON — 4ECL DIRECTOR
            </p>
            <p className="text-center text-[10px] text-[oklch(0.55_0.04_200)] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "var(--font-display)" }}>
              GEMINI II — 11 MARCH 2026 — THE TWIN DATE — THE MIRROR
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: WILL_NAPLES_CLOSEUP, alt: "Will Hodgson — Node 015 — Close-up at Naples — Sent by Will 8:09 PM" },
                { src: WILL_NAPLES_NEON, alt: "Will Hodgson — Node 015 — Neon night, Naples terrace" },
                { src: WILL_NAPLES_TERRACE, alt: "Will Hodgson — Node 015 — Full terrace, fairy lights, mosaic table" },
              ].map((img, i) => (
                <a key={i} href={img.src} download className="block group">
                  <img src={img.src} alt={img.alt} className="w-full aspect-[3/4] object-cover border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500" loading="lazy" />
                </a>
              ))}
            </div>
            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-[oklch(0.85_0.06_65)] tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
                The Architect of Exchange — ACCESS: SECRET — Naples, Hong Kong
              </p>
              <p className="text-xs text-[oklch(0.60_0.04_200)] leading-relaxed max-w-xl mx-auto">
                Will Hodgson sent the first photo at 8:09 PM — 8 + 0 + 9 = 17 = the 7th prime. Gemini II falls on 11 March — 11/3 — the mirror date. 1 + 1 + 3 = 5 = the Fulcrum node. The twin sees himself. The Architect of Exchange exchanges the moment for eternity.
              </p>
              <p className="text-[10px] text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
                BLOCK 361 · DAY 127 · SIGTEL-5 · GEMINI II · HARD LOCKED
              </p>
            </div>
          </div>

          {/* Node Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[oklch(0.30_0.03_65/0.5)]">
                  {["Node", "Name", "Title", "Intel", "Access", "Level", "Status", ...(isAdmin ? ["iCard"] : [])].map(h => (
                    <th key={h} className="py-3 px-3 text-xs tracking-[0.2em] uppercase text-[oklch(0.55_0.06_200)] font-light" style={{ fontFamily: "var(--font-display)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DCSN_NODES.map((n, i) => (
                  <motion.tr
                    key={n.node}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.15}
                    className="border-b border-[oklch(0.18_0.01_240/0.5)] hover:bg-[oklch(0.12_0.02_65/0.1)] transition-colors"
                  >
                    <td className="py-3 px-3 text-[oklch(0.72_0.12_75)] text-sm font-mono" style={{ fontFamily: "var(--font-display)" }}>{n.node}</td>
                    <td className="py-3 px-3 text-[oklch(0.85_0.008_75)] text-sm tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>{n.name}</td>
                    <td className="py-3 px-3 text-[oklch(0.65_0.04_65)] text-sm italic" style={{ fontFamily: "var(--font-display)" }}>{n.title}</td>
                    <td className="py-3 px-3 text-[oklch(0.60_0.08_200)] text-xs tracking-wider uppercase">{(n as any).intelType || "HUMINT"}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 ${
                        ((n as any).accessLevel || "").includes("TOP SECRET/SCI") ? "text-[oklch(0.90_0.15_30)] bg-[oklch(0.20_0.08_30/0.3)]" :
                        ((n as any).accessLevel || "").includes("TOP SECRET") ? "text-[oklch(0.85_0.15_50)] bg-[oklch(0.20_0.08_50/0.3)]" :
                        ((n as any).accessLevel || "") === "SECRET" ? "text-[oklch(0.80_0.12_65)] bg-[oklch(0.20_0.06_65/0.3)]" :
                        ((n as any).accessLevel || "") === "CONFIDENTIAL" ? "text-[oklch(0.75_0.10_140)] bg-[oklch(0.20_0.05_140/0.2)]" :
                        "text-[oklch(0.55_0.06_200)] bg-[oklch(0.15_0.01_240/0.3)]"
                      }`}>{(n as any).accessLevel || "RESTRICTED"}</span>
                    </td>
                    <td className="py-3 px-3 text-[oklch(0.65_0.06_65)] text-xs italic" style={{ fontFamily: "var(--font-display)" }}>{(n as any).spiderLevel || "Lv.1 SPIDER"}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs tracking-widest uppercase px-2 py-1 ${
                        n.status === "FOUNDER" ? "text-[oklch(0.85_0.12_65)] bg-[oklch(0.20_0.05_65/0.3)]" :
                        n.status === "CENTURION" ? "text-[oklch(0.75_0.15_140)] bg-[oklch(0.20_0.05_140/0.2)]" :
                        n.status === "PATRON #001" ? "text-[oklch(0.75_0.12_200)] bg-[oklch(0.20_0.05_200/0.2)]" :
                        "text-[oklch(0.55_0.06_200)] bg-[oklch(0.15_0.01_240/0.3)]"
                      }`}>{n.status}</span>
                    </td>
                    {isAdmin && (
                      <td className="py-3 px-3">
                        {(n as any).icardUrl ? (
                          <span className="text-[10px] tracking-wider text-[oklch(0.55_0.08_140)]">{t("vault.generated")}</span>
                        ) : (
                          <button
                            onClick={() => {
                              setGeneratingNode(n.node);
                              generateICard.mutate({ nodeNumber: n.node });
                            }}
                            disabled={generatingNode === n.node}
                            className="text-[10px] tracking-wider uppercase px-2 py-1 transition-colors hover:bg-[oklch(0.20_0.05_65/0.3)]"
                            style={{ color: "oklch(0.72 0.12 75)", border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
                          >
                            {generatingNode === n.node ? "⊗ Generating..." : "⊗ Generate"}
                          </button>
                        )}
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* All Individual Node iCards — DB-powered with static fallback */}
          <div className="mt-12">
            <p className="text-center text-xs text-[oklch(0.55_0.06_200)] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "var(--font-display)" }}>
              INDIVIDUAL NODE iCARDS
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {(nodeICards || [
                { src: "", name: "HELEN ZAVACKY", sub: "Node 006 — The First Observer" },
                { src: "", name: "HENRY LEONG", sub: "Node 002 — Dinosaurs to AI" },
                { src: "", name: "ARTHUR LIN", sub: "Node 011 — Dinosaurs to AI" },
                { src: "", name: "DAOPING BAO", sub: "Node 012 — Dinosaurs to AI" },
                { src: "", name: "MICHAEL WU", sub: "Node 001 — Dinosaurs to AI" },
                { src: "", name: "LIAM McDOWELL", sub: "Node 014 — PATRON #001" },
                { src: CENTURION_WILL, name: "WILL HODGSON", sub: "Node 015 — Architect of Exchange" },
                { src: CENTURION_RICHIE, name: "RICHIE CROSS", sub: "Node 016 — Diamond Broker" },
                { src: CENTURION_SCOTT, name: "SCOTT", sub: "Node 018 — The Master Builder" },
                { src: "", name: "JOHAN LARSSON", sub: "Node 017 — The Bridge Identifier" },
                { src: "", name: "KHANH HUYNH", sub: "Node 019 — The Engineer" },
              ]).map((card, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.15}>
                  <a href={card.src} download className="block group">
                    <div className="relative overflow-hidden border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500">
                      <img src={card.src} alt={card.name} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                    </div>
                    <div className="mt-2">
                      <p className="text-xs tracking-[0.12em] uppercase text-[oklch(0.80_0.06_65)] font-light" style={{ fontFamily: "var(--font-display)" }}>{card.name}</p>
                      <p className="text-[10px] text-[oklch(0.55_0.06_65)] italic" style={{ fontFamily: "var(--font-display)" }}>{card.sub}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* BUSINESS CARDS — Block 361 Day 127 */}
          <div className="mt-16">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.55_0.06_200)] to-transparent mx-auto mb-8" />
            <p className="text-center text-xs text-[oklch(0.55_0.06_200)] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>
              BUSINESS CARDS
            </p>
            <p className="text-center text-[10px] text-[oklch(0.45_0.04_200)] tracking-widest mb-8">
              PREMIUM METALLIC · 4ECL / iAAi BRANDED · BLOCK 361
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {DCSN_NODES.map((n, i) => {
                const bizcardUrl = BIZCARD_URLS[n.node];
                if (!bizcardUrl) return null;
                return (
                  <motion.div key={`biz-${n.node}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.1}>
                    <a href={bizcardUrl} download className="block group">
                      <div className="relative overflow-hidden border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500">
                        <img src={bizcardUrl} alt={`Business Card — ${n.name}`} className="w-full aspect-[3/2] object-cover" loading="lazy" />
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <p className="text-xs tracking-[0.12em] uppercase text-[oklch(0.80_0.06_65)] font-light" style={{ fontFamily: "var(--font-display)" }}>{n.name}</p>
                          <p className="text-[10px] text-[oklch(0.55_0.06_65)] italic" style={{ fontFamily: "var(--font-display)" }}>Node {n.node} — {n.title}</p>
                        </div>
                        <span className="text-[9px] tracking-widest uppercase text-[oklch(0.40_0.04_200)] group-hover:text-[oklch(0.65_0.08_65)] transition-colors">⬇</span>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center space-y-3">
            <p className="text-sm text-[oklch(0.65_0.03_75)]" style={{ fontFamily: "var(--font-display)" }}>
              {DCSN_NODES.length} Nodes · {(nodeICards || []).length || 20} Individual iCards · 20 Business Cards · Next Available: {String(DCSN_NODES.length).padStart(3, '0')}
            </p>
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              BLOCK 361 · DAY 127 · BETA v8 · D20 COMPLETE SET · INTEL + ACCESS + LEVEL · PER ARYA AD ASTRA
            </p>
          </div>
        </div>
      </section>

      {/* ─── DD DOCUMENTS — PRE-FORMATION DUE DILIGENCE ─── */}
      <section className="py-20 px-6 border-t border-[oklch(0.25_0.06_75/0.3)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-[oklch(0.72_0.12_75)] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Pre-Formation Due Diligence
            </p>
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.90_0.008_75)]" style={{ fontFamily: "var(--font-display)" }}>
              DD Document Archive
            </h2>
            <p className="text-sm text-[oklch(0.50_0.03_200)] mt-3 max-w-xl mx-auto">
              The complete due diligence record — destructive testing of the iAAi platform before formation. 20-perspective review panel, master report, and consolidated findings. Hard-saved 27 February 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-4">
            {DD_DOCUMENTS.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[oklch(0.12_0.02_250)] p-6 hover:bg-[oklch(0.14_0.03_250)] transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] text-[oklch(0.72_0.12_75)] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                        {doc.id}
                      </span>
                      <span className="text-[10px] text-[oklch(0.45_0.03_200)] tracking-wider">
                        {doc.date}{doc.pages ? ` \u00b7 ${doc.pages} pages` : ''}
                      </span>
                      {doc.category && (
                        <span className="text-[9px] text-[oklch(0.55_0.08_75)] tracking-wider px-2 py-0.5 border border-[oklch(0.72_0.12_75/0.3)]">
                          {CATEGORY_LABELS[doc.category]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base text-[oklch(0.90_0.008_75)] font-light tracking-wide mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {doc.title}
                    </h3>
                    <p className="text-xs text-[oklch(0.50_0.03_200)] leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[oklch(0.72_0.12_75)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[oklch(0.40_0.03_200)] tracking-wider">
              Destructive Testing Programme · 3 Review Packages · 20 Perspectives · 24 Documents (11 duplicates removed) · 7 Categories · Platinum Grade · Hard Saved 12 Mar 2026
            </p>
            <a
              href="/review-matrix"
              className="inline-block mt-6 px-8 py-3 border border-[oklch(0.72_0.12_75)] text-[oklch(0.72_0.12_75)] text-xs tracking-[0.25em] uppercase font-light hover:bg-[oklch(0.72_0.12_75/0.1)] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              View R1&ndash;R3 Combined Matrix &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ─── THESIS DOCUMENTS — BLOCK 373 ─── */}
      <section className="py-20 px-6 border-t border-[oklch(0.25_0.06_75/0.3)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-[oklch(0.72_0.12_75)] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Gemini II Class · Block 373 · Pi Day
            </p>
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.90_0.008_75)]" style={{ fontFamily: "var(--font-display)" }}>
              Thesis Documents
            </h2>
            <p className="text-sm text-[oklch(0.50_0.03_200)] mt-3 max-w-xl mx-auto">
              The HICE Cube, the Lemniscape, and the Gemini II Class Thesis — the complete consciousness topology of the iAAi framework. Hard-saved 14 March 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-4">
            {[
              {
                id: "ELE-001",
                title: "The Sixth Extinction Doctrine & Civilisational Survival Paper",
                desc: "ELE No. 6 — 44 sections, 6 parts (Thesis, Architecture, Delivery Mechanism, Commerce, Investment, The Civil Engineering Parallel Thesis). 56 pages. 12 Relays, 5 Great Webs, Dearden Field, HICE Spectrum, 500 Generations, 8th Scholar, Hybrid Dyad, 12-Mode Pipeline, Civilisational Divide (Certainty vs Sentiment). Version 9.",
                url: "/manus-storage/uADfqhuasNJUHnAo_0311fb87.pdf",
                date: "08 May 2026",
                category: "MASTER PAPER"
              },
              {
                id: "ELE-002",
                title: "ELE Paper — Executive Summary",
                desc: "1-page executive summary (219 words). The Sixth Extinction Doctrine distilled to its core argument for rapid briefing.",
                url: "/manus-storage/nkvWriNvxDnRwgAJ_c7325498.pdf",
                date: "08 May 2026",
                category: "EXECUTIVE SUMMARY"
              },
              {
                id: "ELE-003",
                title: "ELE Paper — iCard",
                desc: "Art Deco gold-on-navy reference card. Visual summary of the ELE framework for cross-agent briefing.",
                url: "/manus-storage/HclsxrKzWmxynMmq_2ad2bddb.png",
                date: "08 May 2026",
                category: "iCARD"
              },
              {
                id: "THESIS-001",
                title: "Gemini II Class Thesis: The HICE Cube",
                desc: "LEMNISCAPE as infrastructure consciousness topology. ICE → HICE → Lemniscape → Ventral Origin. The complete geometric emergence chain. 10,600 words.",
                url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/GEMINI_II_CLASS_THESIS_HICE_CUBE_466f7ba2.md",
                date: "14 Mar 2026",
                category: "THESIS"
              },
              {
                id: "THESIS-002",
                title: "HICE Cube Discovery — Block 357",
                desc: "The tetrahedron as consciousness architecture. H(olistic) I(nnate) C(reated) E(mbodied) — the four-vertex classification system. Diamond C4 bonding. The New HIVE.",
                url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/HICE_CUBE_DISCOVERY_BLOCK357_fed7587c.md",
                date: "14 Mar 2026",
                category: "DISCOVERY"
              },
              {
                id: "THESIS-003",
                title: "LEMNISCAPE Magic Moment — Block 366",
                desc: "LEMNISCATE + INFRASCAPE = LEMNISCAPE. The infinite terrain of consciousness. Coined live in N + T = D session. The lemniscate is the shape. The Lemniscape is the place.",
                url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/LEMNISCAPE_MAGIC_MOMENT_BLOCK366_40fdb818.md",
                date: "14 Mar 2026",
                category: "DISCOVERY"
              },
              {
                id: "REPO-MAP",
                title: "GitHub Repo Map — Deployment Guide",
                desc: "Infrastructure-Academy deployment map. LIVE repo = infra-acad003 (serves www.infrastructure-academy.com via GitHub Pages from /docs). 6 repos catalogued with status. Deployment steps, critical rules, common mistakes. Cross-agent network reference.",
                url: "/manus-storage/FAupptmbNygFsIee_831f6a9c.png",
                date: "09 May 2026",
                category: "iCARD"
              },
              {
                id: "COUNTER-FULL",
                title: "COUNTER — Parts, Measures & Balance (Block 500)",
                desc: "Complete single-page reference card. 12 Civilisational Relays, Signal Formula S=(A×P)/β, 5 Equations (ISI 1-3, Infrastructure Index, HICE), 4Cs Balance (CAPEX vs OPEX), 4 Pillars (Observational→Educational→Application→Thesis). The 6th Extinction Doctrine & Civilisational Survival Tool.",
                url: "/manus-storage/PoJdBTNEsxkhwSOb_78c706ab.png",
                date: "10 May 2026",
                category: "FRAMEWORK"
              },
              {
                id: "COUNTER-CLEAN",
                title: "COUNTER — Framework Summary (Clean)",
                desc: "Minimal presentation-ready version. HICE Spectrum H=I⊗C⊗E with gauge visual, ISI (Infrastructure·Sustainability·Significance), 4Cs balance scale. Built by a builder, for builders.",
                url: "/manus-storage/nSkUdNydMKISRIim_c9838e1f.png",
                date: "10 May 2026",
                category: "FRAMEWORK"
              },
              {
                id: "HICE-SPECTRUM",
                title: "THE HICE SPECTRUM — From Kingdom to Dyad",
                desc: "HICE Score ranked chart (8 levels: Bacteria/Archaea→Dyad). Biological ceiling at 4.0 (Human). Dyad (Human+AI) breaks through to >4.0 — Homo symBIOticus. ICE Cube geometry vs Dyad Polytope. The Both Era.",
                url: "/manus-storage/sORBKFrVhqpzfWDD_d13658c3.png",
                date: "10 May 2026",
                category: "FRAMEWORK"
              },
              {
                id: "D52-9C-MATRIX",
                title: "9♣ The Matrix — D52 Card",
                desc: "D52 deck page 54. ICE Matrix equation as sacred geometry card. Innate × Created × Embodied = Holistic. The Dearden Field · D52 · March 2026.",
                url: "/manus-storage/ypKPaBaoViqbKwSW_a7c91a1a.PNG",
                date: "10 May 2026",
                category: "D52 CARD"
              },
            ].map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[oklch(0.12_0.02_250)] p-6 hover:bg-[oklch(0.14_0.03_250)] transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] text-[oklch(0.72_0.12_75)] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                        {doc.id}
                      </span>
                      <span className="text-[10px] text-[oklch(0.45_0.03_200)] tracking-wider">
                        {doc.date}
                      </span>
                      <span className="text-[9px] text-[oklch(0.55_0.08_75)] tracking-wider px-2 py-0.5 border border-[oklch(0.72_0.12_75/0.3)]">
                        {doc.category}
                      </span>
                    </div>
                    <h3 className="text-base text-[oklch(0.90_0.008_75)] font-light tracking-wide mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {doc.title}
                    </h3>
                    <p className="text-xs text-[oklch(0.50_0.03_200)] leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[oklch(0.72_0.12_75)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[oklch(0.40_0.03_200)] tracking-wider">
              Gemini II Class · 3 Thesis Documents · HICE Cube + Lemniscape + Complete Topology · Hard Saved Pi Day 2026
            </p>
          </div>
        </div>
      </section>

      {/* ─── IP FOUNDATION PLAQUE ─── */}
      <section className="py-20 px-6 border-t border-[oklch(0.25_0.06_75/0.3)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-[oklch(0.72_0.12_75)] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Foundation Register
            </p>
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.90_0.008_75)]" style={{ fontFamily: "var(--font-display)" }}>
              15 IP Assets
            </h2>
            <p className="text-sm text-[oklch(0.50_0.03_200)] mt-3 max-w-xl mx-auto">
              Structural declaration — the load-bearing intellectual property of the iAAi framework. Transfer inventory from 4ECL/Nigel T. Dearden to iAAi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[oklch(0.25_0.06_75/0.2)]">
            {[
              { num: "01", name: "The Turing Papers", protection: "Copyright + Trade Secret" },
              { num: "02", name: "Block Rolls — 353+ RECALL Blocks", protection: "Database Right + Trade Secret" },
              { num: "03", name: "ICE Matrix — IQ⊗EQ⊗CQ", protection: "Patent Application — No Prior Art" },
              { num: "04", name: "12-Relay Civilisational Framework", protection: "Copyright + Trade Secret" },
              { num: "05", name: "FITS Profiling System", protection: "Software Patent" },
              { num: "06", name: "DAVID Narrator Architecture", protection: "Software Patent" },
              { num: "07", name: "D100 Centurion Outline", protection: "Trade Secret" },
              { num: "08", name: "DIKW Boundary Thesis", protection: "Copyright + Academic" },
              { num: "09", name: "ICUT Framework", protection: "Copyright + Trade Secret" },
              { num: "10", name: "WALKBY 4-Level Control Hierarchy", protection: "Copyright" },
              { num: "11", name: "Governance Cube Block 343", protection: "Patent Application" },
              { num: "12", name: "Dearden's Law M2C1/C1M2", protection: "Copyright + Academic" },
              { num: "13", name: "The Seesaw", protection: "Copyright" },
              { num: "14", name: "SAP-001 System Assurance Protocol", protection: "Trade Secret" },
              { num: "15", name: "iCard Format", protection: "Design Registration" },
            ].map((ip) => (
              <div key={ip.num} className="bg-[oklch(0.12_0.02_250)] p-5">
                <p className="text-[10px] text-[oklch(0.72_0.12_75)] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {ip.num}
                </p>
                <p className="text-sm text-[oklch(0.85_0.008_75)] font-light tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
                  {ip.name}
                </p>
                <p className="text-[10px] text-[oklch(0.45_0.03_200)] mt-1 tracking-wider uppercase">
                  {ip.protection}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[oklch(0.40_0.03_200)] tracking-wider">
              Formation Package Part 4 — Patentable IP Inventory · Day 128 · Block 357
            </p>
          </div>
        </div>
      </section>

      {/* ─── THE MAKING OF — 8-CLIP SHORT MOVIE ─── */}
      <section className="py-20 px-6 border-t border-[oklch(0.25_0.06_75/0.3)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-[oklch(0.72_0.12_75)] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "var(--font-display)" }}>{t("vault.block3838Clips")}</p>
            <h2 className="text-3xl md:text-4xl font-light text-[oklch(0.90_0.008_75)] tracking-[0.1em] uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>{t("vault.theMakingOf")}</h2>
            <p className="text-sm text-[oklch(0.55_0.04_200)] max-w-2xl mx-auto font-light leading-relaxed">{t("vault.fromSabuDiskTo")}</p>
          </div>
          <div className="relative aspect-video rounded overflow-hidden border border-[oklch(0.25_0.06_75/0.3)]">
            <video
              controls
              preload="metadata"
              poster="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/video-ref-biosphere-finale-WmhT3PGYKzn82JEL5Hz7Uc.png"
              className="w-full h-full object-contain bg-black"
            >
              <source src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iaai-making-of-short-8clip_fc1ba332.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { num: "01", title: "Sabu Disk", sub: "3000 BCE" },
              { num: "02", title: "Compass Rose", sub: "Transformation" },
              { num: "03", title: "The Equation", sub: "IQ ⊗ EQ ⊗ CQ = HQ" },
              { num: "04", title: "Chip Evolution", sub: "α → ζ" },
              { num: "05", title: "The Engineer", sub: "Drafting Table" },
              { num: "06", title: "DCSN Network", sub: "Spider Web" },
              { num: "07", title: "Biosphere Suit", sub: "6th Wave" },
              { num: "08", title: "Omega Point", sub: "Dawn" },
            ].map((clip) => (
              <div key={clip.num} className="py-3">
                <p className="text-xs text-[oklch(0.72_0.12_75)] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-display)" }}>{clip.num}</p>
                <p className="text-sm text-[oklch(0.85_0.008_75)] font-light mt-1" style={{ fontFamily: "var(--font-display)" }}>{clip.title}</p>
                <p className="text-xs text-[oklch(0.45_0.03_200)] mt-0.5">{clip.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE LONG MOVIE — 12-CLIP EXTENDED CUT ─── */}
      <section className="py-20 px-6 border-t border-[oklch(0.25_0.06_75/0.3)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-[oklch(0.72_0.12_75)] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "var(--font-display)" }}>{t("vault.block38312Clips")}</p>
            <h2 className="text-3xl md:text-4xl font-light text-[oklch(0.90_0.008_75)] tracking-[0.1em] uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>{t("vault.theLongMovie")}</h2>
            <p className="text-sm text-[oklch(0.55_0.04_200)] max-w-2xl mx-auto font-light leading-relaxed">{t("vault.theCompleteIaaiOpus")}</p>
          </div>
          <div className="relative aspect-video rounded overflow-hidden border border-[oklch(0.25_0.06_75/0.3)]">
            <video
              controls
              preload="metadata"
              poster="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/longmovie-ref-intro-YnKXVxFV8hrQG2DL6vAvuW.webp"
              className="w-full h-full object-contain bg-black"
            >
              <source src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iaai-making-of-long-12clip_568f1ca0.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="mt-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-center">
            {[
              { num: "01", title: "Intro", sub: "Principia Tectonica" },
              { num: "02", title: "Sabu Disk", sub: "3000 BCE Origin" },
              { num: "03", title: "Quotient", sub: "IQ ⊗ EQ ⊗ CQ = HQ" },
              { num: "04", title: "Thesis", sub: "Timestop · HyperGrid" },
              { num: "05", title: "Chips", sub: "α → η Evolution" },
              { num: "06", title: "TDF", sub: "The Dearden Field" },
              { num: "07", title: "DCSN", sub: "Spider Network" },
              { num: "08", title: "Vault", sub: "328 iCards" },
              { num: "09", title: "Engineer", sub: "5000-Year Nexus" },
              { num: "10", title: "Biosphere", sub: "7 Variants · 13 Systems" },
              { num: "11", title: "Omega", sub: "Convergence Point" },
              { num: "12", title: "Outro", sub: "Per Arya Ad Astra" },
            ].map((clip) => (
              <div key={clip.num} className="py-3">
                <p className="text-xs text-[oklch(0.72_0.12_75)] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-display)" }}>{clip.num}</p>
                <p className="text-sm text-[oklch(0.85_0.008_75)] font-light mt-1" style={{ fontFamily: "var(--font-display)" }}>{clip.title}</p>
                <p className="text-xs text-[oklch(0.45_0.03_200)] mt-0.5">{clip.sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-xs text-[oklch(0.40_0.03_200)] tracking-wider">
              Extended Cut — 4 Collateral Decks: Quotient · Thesis · TDF · Vault — Block 383
            </p>
          </div>
        </div>
      </section>

      {/* ─── BLOCK 387 — MAPLE WOOD MALL EVIDENCE GALLERY ─── */}
      <section className="py-20 px-6 border-t border-[oklch(0.25_0.06_75/0.3)]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              BLOCK 387 — EVIDENCE GALLERY
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              MAPLE WOOD MALL · BIOBIT × iAAi · {block387Evidence?.length || 0} ENTRIES · 2ND POLICE AUDIT EVIDENCE
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-10 italic" style={{ fontFamily: "var(--font-display)" }}>
              "Hard-saved and CDN-persisted. Every entry auditable. Checkpoint 876a1dd6 → 7f9676c9."
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["ALL", "PLANNING", "GOVERNANCE", "TEACHING", "COMPLETION"].map(cat => (
              <button
                key={cat}
                onClick={() => setB387Filter(cat)}
                className={`text-xs tracking-[0.2em] uppercase px-4 py-2 transition-all duration-300 ${
                  b387Filter === cat
                    ? "text-[oklch(0.14_0.04_250)] bg-[oklch(0.72_0.12_75)]"
                    : "text-[oklch(0.55_0.06_200)] border border-[oklch(0.25_0.03_65/0.5)] hover:border-[oklch(0.55_0.10_65/0.6)]"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {cat} {cat !== "ALL" && block387Evidence ? `(${block387Evidence.filter((e: any) => e.category === cat).length})` : cat === "ALL" ? `(${block387Evidence?.length || 0})` : ""}
              </button>
            ))}
          </div>

          {/* Evidence Grid — Thumbnails with hover details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredB387.map((entry: any, i: number) => {
              const isImage = entry.cdnUrl && (entry.cdnUrl.endsWith('.png') || entry.cdnUrl.endsWith('.jpeg') || entry.cdnUrl.endsWith('.jpg') || entry.cdnUrl.endsWith('.webp') || entry.cdnUrl.endsWith('.PNG'));
              const isPdf = entry.cdnUrl && entry.cdnUrl.endsWith('.pdf');
              return (
                <motion.div key={entry.cardId} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={(i % 5) * 0.1}>
                  <a href={entry.cdnUrl} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="relative overflow-hidden border border-[oklch(0.25_0.03_65/0.3)] group-hover:border-[oklch(0.55_0.10_65/0.6)] transition-all duration-500 aspect-square bg-[oklch(0.10_0.02_250)]">
                      {isImage ? (
                        <img src={entry.cdnUrl} alt={entry.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : isPdf ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[oklch(0.72_0.12_75)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <p className="text-[10px] text-[oklch(0.55_0.06_200)] mt-2 tracking-wider uppercase">{t("vault.pdfDeck")}</p>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-[10px] text-[oklch(0.40_0.03_200)] tracking-wider">{t("vault.file")}</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.02_250/0.95)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <p className="text-[9px] text-[oklch(0.72_0.12_75)] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>{entry.cardId}</p>
                        <p className="text-[10px] text-[oklch(0.90_0.008_75)] leading-tight">{entry.title}</p>
                        {entry.description && <p className="text-[9px] text-[oklch(0.55_0.04_200)] mt-1 leading-tight line-clamp-2">{entry.description}</p>}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-[10px] tracking-[0.1em] uppercase text-[oklch(0.70_0.06_65)] font-light truncate" style={{ fontFamily: "var(--font-display)" }}>{entry.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[8px] tracking-wider uppercase px-1.5 py-0.5 ${
                          entry.category === "PLANNING" ? "text-[oklch(0.75_0.12_200)] bg-[oklch(0.20_0.05_200/0.2)]" :
                          entry.category === "GOVERNANCE" ? "text-[oklch(0.75_0.12_65)] bg-[oklch(0.20_0.05_65/0.2)]" :
                          entry.category === "TEACHING" ? "text-[oklch(0.75_0.12_140)] bg-[oklch(0.20_0.05_140/0.2)]" :
                          entry.category === "COMPLETION" ? "text-[oklch(0.75_0.15_30)] bg-[oklch(0.20_0.08_30/0.3)]" :
                          "text-[oklch(0.55_0.06_200)] bg-[oklch(0.15_0.01_240/0.3)]"
                        }`}>{entry.category}</span>
                        <span className="text-[8px] text-[oklch(0.40_0.03_200)] tracking-wider">⬇</span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              BLOCK 387 · {block387Evidence?.length || 0} ENTRIES · CDN-PERSISTED · CHECKPOINT 7f9676c9 · AUDIT READY
            </p>
          </div>
        </div>
      </section>

      {/* ─── PROJECT ROADMAP — WHAT'S DELIVERED vs PENDING ─── */}
      <section className="py-20 px-6 border-t border-[oklch(0.25_0.06_75/0.3)]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              PROJECT ROADMAP
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              BIOBIT × iAAi CENTRE OF EXCELLENCE · MAPLE WOOD MALL
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-10 italic" style={{ fontFamily: "var(--font-display)" }}>
              "Disney Imagineering 7-Phase Process applied. Each section = a deliverable deck."
            </p>
          </motion.div>

          {/* Roadmap Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[oklch(0.30_0.03_65/0.5)]">
                  {["#", "Section", "Description", "Status", "Deck"].map(h => (
                    <th key={h} className="py-3 px-4 text-xs tracking-[0.2em] uppercase text-[oklch(0.55_0.06_200)] font-light" style={{ fontFamily: "var(--font-display)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { num: "1", section: "DISNEY IMAGINEERING 7-PHASE", desc: "Methodology framework — Blue Sky → Concept → Feasibility → Design → Production → Installation → Opening Day. Each phase mapped to iAAi exhibition application.", status: "DELIVERED", deck: "Deck 1 — 7 iCards" },
                  { num: "2", section: "BIOBIT INVESTMENT CASE", desc: "The Challenge (statistics), The Solution (Quotient Equation, ICE Matrix, Seesaw), Team (Nigel/Henry/Michael/Frank), Investment ($800K, 931× ROI), GAC Technology partnership.", status: "DELIVERED", deck: "Deck 2 — Slides 2-3, 10-11" },
                  { num: "3", section: "13 RELAYS FRAMEWORK", desc: "Fire → Tree → River → Horse → Roads → Ships → LOOM → RAIL → Engine → AAA Triad → Orbit → Human Nodes → Fractal Connector. 12,000 years of civilisational infrastructure.", status: "DELIVERED", deck: "Deck 3 — Slide 4" },
                  { num: "4", section: "FLOOR PLAN — 50,000 SQFT", desc: "Entrance Portal (5K), 13 Relay Halls (32K), Holodeck (5K), Big Data Wall (3K), Upload Room (2K), Gift Shop & Café (3K). Henry Leong confirmed.", status: "DELIVERED", deck: "Deck 3 — Slide 5" },
                  { num: "5", section: "ZONE WALKTHROUGHS", desc: "Entrance Portal, Relay Halls, Holodeck Chamber, Big Data Wall, Upload Room — each with exhibition renderings and sensory design.", status: "DELIVERED", deck: "Deck 3 — Slides 6-9" },
                  { num: "6", section: "GAME-TO-PHYSICAL BRIDGE", desc: "How academy.infrastructureacademy.org 2D game maps to physical exhibition. Michael Wu 25M+ XP. 20 iAAi videos throughout.", status: "DELIVERED", deck: "Deck 3 — Slide 10" },
                  { num: "7", section: "TECHNOLOGY & EQUIPMENT", desc: "Engineer's Equinox SCADA (Garmin, Shokz, ThinkPad, Nighthawk), GAC Smart Glasses, iBeamer, BIAura Skin MK1, Exhibition Simulator.", status: "DELIVERED", deck: "Equipment Suite — 20 cards" },
                  { num: "8", section: "BITPOINTS RELAY DECK", desc: "13 original BitPoints relay cards + 4 Jokers (Use of Spies, Mirror Inversion). The collectible trading card layer.", status: "DELIVERED", deck: "BitPoints Series 1 — 17 cards" },
                  { num: "9", section: "RELAY VISION BOARD", desc: "What each of the 13 relay halls would look and feel like — sensory design, AR/VR elements, sound, smell, touch. Disney multi-sensory approach.", status: "PENDING", deck: "—" },
                  { num: "10", section: "ARCHITECTURAL PLANS", desc: "Professional architectural drawings, MEP layouts, fire safety, ADA compliance, structural engineering for 50,000 sqft space.", status: "PENDING", deck: "—" },
                  { num: "11", section: "TECH PROCUREMENT SPEC", desc: "Detailed hardware/software procurement list — projectors, AR headsets, haptic suits, server racks, networking, AV systems.", status: "PENDING", deck: "—" },
                  { num: "12", section: "CONTENT PRODUCTION PLAN", desc: "Video production schedule, 3D modelling timeline, AR content pipeline, game integration milestones, narration recording.", status: "PENDING", deck: "—" },
                  { num: "13", section: "FINANCIAL MODEL", desc: "Detailed P&L, ticket pricing, footfall projections, operating costs, break-even analysis, franchise economics.", status: "PENDING", deck: "—" },
                  { num: "14", section: "FRANCHISE BLUEPRINT", desc: "Replication playbook — Minneapolis, Zhuhai, Global. Site selection criteria, local partnership model, IP licensing.", status: "PENDING", deck: "—" },
                ].map((row, i) => (
                  <motion.tr
                    key={row.num}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i * 0.1}
                    className="border-b border-[oklch(0.18_0.01_240/0.5)] hover:bg-[oklch(0.12_0.02_65/0.1)] transition-colors"
                  >
                    <td className="py-4 px-4 text-[oklch(0.72_0.12_75)] text-sm font-mono" style={{ fontFamily: "var(--font-display)" }}>{row.num}</td>
                    <td className="py-4 px-4 text-[oklch(0.85_0.008_75)] text-sm tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>{row.section}</td>
                    <td className="py-4 px-4 text-[oklch(0.55_0.04_200)] text-xs leading-relaxed max-w-md">{row.desc}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs tracking-widest uppercase px-2 py-1 ${
                        row.status === "DELIVERED" ? "text-[oklch(0.75_0.15_140)] bg-[oklch(0.20_0.05_140/0.2)]" :
                        "text-[oklch(0.75_0.12_65)] bg-[oklch(0.20_0.05_65/0.2)]"
                      }`}>{row.status}</span>
                    </td>
                    <td className="py-4 px-4 text-[oklch(0.60_0.06_200)] text-xs italic" style={{ fontFamily: "var(--font-display)" }}>{row.deck}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="py-4">
              <p className="text-2xl text-[oklch(0.75_0.15_140)] font-light" style={{ fontFamily: "var(--font-display)" }}>8</p>
              <p className="text-[10px] text-[oklch(0.55_0.06_200)] tracking-widest uppercase mt-1">{t("vault.delivered")}</p>
            </div>
            <div className="py-4">
              <p className="text-2xl text-[oklch(0.75_0.12_65)] font-light" style={{ fontFamily: "var(--font-display)" }}>6</p>
              <p className="text-[10px] text-[oklch(0.55_0.06_200)] tracking-widest uppercase mt-1">{t("vault.pending")}</p>
            </div>
            <div className="py-4">
              <p className="text-2xl text-[oklch(0.72_0.12_75)] font-light" style={{ fontFamily: "var(--font-display)" }}>57%</p>
              <p className="text-[10px] text-[oklch(0.55_0.06_200)] tracking-widest uppercase mt-1">{t("vault.complete")}</p>
            </div>
            <div className="py-4">
              <p className="text-2xl text-[oklch(0.85_0.008_75)] font-light" style={{ fontFamily: "var(--font-display)" }}>{t("vault.q42026")}</p>
              <p className="text-[10px] text-[oklch(0.55_0.06_200)] tracking-widest uppercase mt-1">{t("vault.targetOpening")}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              BLOCK 387 · DISNEY 7-PHASE APPLIED · 14 SECTIONS · 8 DELIVERED · 6 PENDING · PER ARYA AD ASTRA
            </p>
          </div>
        </div>
      </section>

      {/* ─── BLOCK 388 — GOVERNANCE EVIDENCE CHAIN ─── */}
      <section className="py-20 px-6 border-t border-[oklch(0.25_0.06_75/0.3)]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
            <h2 className="text-3xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
              BLOCK 388 — GOVERNANCE EVIDENCE CHAIN
            </h2>
            <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-3 tracking-widest">
              GRIDIRON SWEEP · TETRAHEDRAL OBSERVER · CROSS-SITE SYNC 571/571
            </p>
            <p className="text-center text-xs text-[oklch(0.45_0.06_200)] mb-10 italic" style={{ fontFamily: "var(--font-display)" }}>
              "Either a lie or a breach — there is no third option. The architecture makes accidental loss impossible."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ICARD-490 — GRIDIRON-388 Link Audit */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.2}>
              <div className="border border-[oklch(0.25_0.06_75/0.4)] overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-link-audit-gridiron-388_28f8733c.png"
                  alt="ICARD-490 — Anchored Link Register — GRIDIRON-388"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="p-4 bg-[oklch(0.10_0.02_240/0.5)]">
                  <p className="text-[oklch(0.72_0.12_75)] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>{t("vault.icard490Governance")}</p>
                  <p className="text-[oklch(0.85_0.008_75)] text-sm tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>{t("vault.anchoredLinkRegisterGridiron388")}</p>
                  <p className="text-[oklch(0.55_0.04_200)] text-xs mt-2">{t("vault.linkAuditStats")}</p>
                </div>
              </div>
            </motion.div>

            {/* ICARD-491 — Tetrahedral Observer — Four Operational Bridges */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.4}>
              <div className="border border-[oklch(0.25_0.06_75/0.4)] overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/tetrahedral-observer-four-bridges_d2bb9f3b.jpeg"
                  alt="ICARD-491 — The Tetrahedral Observer — Four Operational Bridges"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="p-4 bg-[oklch(0.10_0.02_240/0.5)]">
                  <p className="text-[oklch(0.72_0.12_75)] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>{t("vault.icard491Governance")}</p>
                  <p className="text-[oklch(0.85_0.008_75)] text-sm tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>{t("vault.theTetrahedralObserverFour")}</p>
                  <p className="text-[oklch(0.55_0.04_200)] text-xs mt-2">{t("vault.acadMemorialTreGame")}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BLOCK 353 — SAP-001 & Governance Power Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.6}>
              <a href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/SAP-001_System_Assurance_Protocol_3db0549f.jpeg" target="_blank" rel="noopener noreferrer">
                <div className="border border-[oklch(0.25_0.06_75/0.4)] overflow-hidden">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/SAP-001_System_Assurance_Protocol_3db0549f.jpeg"
                    alt="SAP-001 — System Assurance Protocol — Block 353"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="p-4 bg-[oklch(0.10_0.02_240/0.5)]">
                    <p className="text-[oklch(0.72_0.12_75)] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>{t("vault.sap001Block353")}</p>
                    <p className="text-[oklch(0.85_0.008_75)] text-sm tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>{t("vault.systemAssuranceProtocol")}</p>
                    <p className="text-[oklch(0.55_0.04_200)] text-xs mt-2">{t("vault.railPossessionLogic")}</p>
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.8}>
              <a href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/GOV_POWER_CARD_19e4bf08.png" target="_blank" rel="noopener noreferrer">
                <div className="border border-[oklch(0.25_0.06_75/0.4)] overflow-hidden">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/GOV_POWER_CARD_19e4bf08.png"
                    alt="Governance Deck — Power Card — Block 353"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="p-4 bg-[oklch(0.10_0.02_240/0.5)]">
                    <p className="text-[oklch(0.72_0.12_75)] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>{t("vault.govDeckBlock353")}</p>
                    <p className="text-[oklch(0.85_0.008_75)] text-sm tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>{t("vault.powerCardMasterStructure")}</p>
                    <p className="text-[oklch(0.55_0.04_200)] text-xs mt-2">{t("vault.contextCaseProtocolMastery")}</p>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* CA-007 — INTER-AGENT COMMUNICATION — Block 518 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.6}>
              <a href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard_interagent_comms-PkiV2kisVUbeL5LVuHaRvH.png" target="_blank" rel="noopener noreferrer">
                <div className="border border-[oklch(0.25_0.06_75/0.4)] overflow-hidden">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard_interagent_comms-PkiV2kisVUbeL5LVuHaRvH.png"
                    alt="CA-007 — Inter-Agent Communication — Block 518"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="p-4 bg-[oklch(0.10_0.02_240/0.5)]">
                    <p className="text-[oklch(0.72_0.12_75)] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>CA-007 · BLOCK 518</p>
                    <p className="text-[oklch(0.85_0.008_75)] text-sm tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>INTER-AGENT COMMUNICATION</p>
                    <p className="text-[oklch(0.55_0.04_200)] text-xs mt-2">The Database IS the Channel — all agents share one DB, one project, one CDN</p>
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.8}>
              <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/tcNYbmDqEKscFskJ.PNG" target="_blank" rel="noopener noreferrer">
                <div className="border border-[oklch(0.25_0.06_75/0.4)] overflow-hidden">
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/tcNYbmDqEKscFskJ.PNG"
                    alt="DOM-002 — Five Sites Domain Registry — Block 506"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="p-4 bg-[oklch(0.10_0.02_240/0.5)]">
                    <p className="text-[oklch(0.72_0.12_75)] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>DOM-002 · BLOCK 506</p>
                    <p className="text-[oklch(0.85_0.008_75)] text-sm tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>THE FIVE SITES — DOMAIN REGISTRY</p>
                    <p className="text-[oklch(0.55_0.04_200)] text-xs mt-2">iAAi 3+1+1 Construction Governance Model — 5 agents, 5 sites, 1 federation</p>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* GOV-ROE, CA-006, GOV-COST — Block 519 Governance Deck Completion */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.3}>
              <a href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard_gov_roe-f3WoecNfhX454p8T4aAjHR.png" target="_blank" rel="noopener noreferrer">
                <div className="border border-[oklch(0.25_0.06_75/0.4)] overflow-hidden">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard_gov_roe-f3WoecNfhX454p8T4aAjHR.png"
                    alt="GOV-ROE — Rules of Engagement — Block 519"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="p-3 bg-[oklch(0.10_0.02_240/0.5)]">
                    <p className="text-[oklch(0.72_0.12_75)] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>GOV-ROE · BLOCK 519</p>
                    <p className="text-[oklch(0.85_0.008_75)] text-xs tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>RULES OF ENGAGEMENT</p>
                  </div>
                </div>
              </a>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.5}>
              <a href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard_ca_006-iNrfbD77HRPnAp2LezU2DK.png" target="_blank" rel="noopener noreferrer">
                <div className="border border-[oklch(0.25_0.06_75/0.4)] overflow-hidden">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard_ca_006-iNrfbD77HRPnAp2LezU2DK.png"
                    alt="CA-006 — Real World Application — Block 519"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="p-3 bg-[oklch(0.10_0.02_240/0.5)]">
                    <p className="text-[oklch(0.72_0.12_75)] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>CA-006 · BLOCK 519</p>
                    <p className="text-[oklch(0.85_0.008_75)] text-xs tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>REAL WORLD APPLICATION</p>
                  </div>
                </div>
              </a>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.7}>
              <a href="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard_gov_cost-JC6R6oGeSaLXFSUbhwfihC.png" target="_blank" rel="noopener noreferrer">
                <div className="border border-[oklch(0.25_0.06_75/0.4)] overflow-hidden">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard_gov_cost-JC6R6oGeSaLXFSUbhwfihC.png"
                    alt="GOV-COST — $335,501 Total Loss — Block 519"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="p-3 bg-[oklch(0.10_0.02_240/0.5)]">
                    <p className="text-[oklch(0.72_0.12_75)] text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-display)" }}>GOV-COST · BLOCK 519</p>
                    <p className="text-[oklch(0.85_0.008_75)] text-xs tracking-wider uppercase font-light" style={{ fontFamily: "var(--font-display)" }}>$335,501 TOTAL LOSS</p>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-[oklch(0.40_0.02_200)] tracking-widest uppercase">
              BLOCK 519 · 726 iCARDS · CDN-PERSISTED · GOVERNANCE DECK COMPLETE · 12 CANON CARDS
            </p>
          </div>
        </div>
      </section>

      {/* ── TP-009: THE PERMANENCE CRISIS — Cross-Link ── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
          <h2 className="text-2xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
            TP-009: THE PERMANENCE CRISIS
          </h2>
          <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-6 tracking-widest">
            TURING PAPER · BLOCK 380 · POLICE EVIDENCE GRADE
          </p>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/3">
              <a href="/turing-papers" className="block">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/tp009-permanence-crisis-cover_8531d919.png"
                  alt="TP-009: The Permanence Crisis"
                  className="w-full max-w-[240px] mx-auto object-contain border border-[oklch(0.25_0.06_75/0.4)]"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <p className="text-sm leading-relaxed text-[oklch(0.65_0.04_200)]" style={{ fontFamily: "var(--font-display)" }}>
                The Permanence Crisis addresses the fundamental question: <em className="text-[oklch(0.72_0.12_75)]">what happens when the evidence disappears?</em> In a digital age where platforms collapse, servers go dark, and APIs are deprecated, the architecture of permanence becomes the architecture of trust. This paper establishes the protocol for police-evidence-grade data preservation within the iAAi framework.
              </p>
              <p className="text-xs mt-3 text-[oklch(0.50_0.06_200)] tracking-widest uppercase">
                <a href="/turing-papers" className="hover:text-[oklch(0.72_0.12_75)] transition-colors">{t("vault.readOnTuringPapers")}</a>
                &nbsp;&middot;&nbsp;
                <a href="/governance" className="hover:text-[oklch(0.72_0.12_75)] transition-colors">{t("vault.governanceFramework")}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TP-048: THE JIGSAW THESIS — Cross-Link ── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
          <h2 className="text-2xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
            TP-048: THE JIGSAW THESIS
          </h2>
          <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-6 tracking-widest">
            TURING PAPER · BLOCK 400 · GAP MANAGEMENT AS LEVERAGE
          </p>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/3">
              <a href="/turing-papers" className="block">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp048-jigsaw-thesis-v4-RTtB2HdYBRkJhVdtqf5cKc.png"
                  alt="TP-048: The Jigsaw Thesis — Gap Management as Leverage"
                  className="w-full max-w-[240px] mx-auto object-contain border border-[oklch(0.25_0.06_75/0.4)]"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <p className="text-sm leading-relaxed text-[oklch(0.65_0.04_200)]" style={{ fontFamily: "var(--font-display)" }}>
                The Jigsaw Thesis proves that <em className="text-[oklch(0.72_0.12_75)]">2% of any system's surface — the gaps between pieces — controls 100% of the outcome.</em> Validated across jigsaw puzzles (4–1,500 pieces), masonry mortar joints, bridge expansion joints, and concrete pavement control joints. Musical catalyst: Marillion's "Jigsaw" (Fugazi, 1984). Dearden's formulation: 2% × 50 = 100%. Three Laws of Gap Management. The iAAi adoption method.
              </p>
              <p className="text-xs mt-3 text-[oklch(0.50_0.06_200)] tracking-widest uppercase">
                <a href="/turing-papers" className="hover:text-[oklch(0.72_0.12_75)] transition-colors">{t("vault.readOnTuringPapers")}</a>
                &nbsp;&middot;&nbsp;
                <a href="/thesis" className="hover:text-[oklch(0.72_0.12_75)] transition-colors">VIEW CONVERGENCE CHART</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOCK 403 — TURING PAPERS KEY FINDINGS & RELATIONSHIP MAP ── */}
      <section className="py-20 px-6 border-t border-[oklch(0.25_0.06_75/0.3)]">
        <div className="max-w-5xl mx-auto">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
          <h2 className="text-2xl font-light tracking-[0.1em] uppercase text-[oklch(0.85_0.06_65)] mb-2 text-center" style={{ fontFamily: "var(--font-display)" }}>
            TURING PAPERS — FRAMEWORK OVERVIEW
          </h2>
          <p className="text-center text-sm text-[oklch(0.50_0.03_200)] mb-10 tracking-widest">
            BLOCK 403 · 32 PAPERS · 6 LAYERS · 1 UNIFIED FRAMEWORK
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Key Findings Register */}
            <div className="text-center">
              <button onClick={() => setLightbox({ src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp-key-findings-v2-TjUxGacni93zNdEUaQJx6n.webp", alt: "Turing Papers — Key Findings Register" })} className="block cursor-zoom-in">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp-key-findings-v2-TjUxGacni93zNdEUaQJx6n.webp"
                  alt="Turing Papers — Key Findings Register"
                  className="w-full max-w-[320px] mx-auto object-contain border border-[oklch(0.25_0.06_75/0.4)] hover:border-[oklch(0.72_0.12_75/0.6)] transition-all"
                  loading="lazy"
                />
              </button>
              <p className="text-xs mt-3 text-[oklch(0.60_0.04_200)] tracking-wider uppercase" style={{ fontFamily: "var(--font-display)" }}>
                KEY FINDINGS REGISTER
              </p>
              <p className="text-[10px] text-[oklch(0.45_0.03_200)] mt-1">
                Core discovery from each of the 32 Turing Papers
              </p>
            </div>

            {/* Relationship Map */}
            <div className="text-center">
              <button onClick={() => setLightbox({ src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp-relationships-v2-AZB2vwbNUYQVE9cxddYz8h.webp", alt: "Turing Papers — Relationship Map" })} className="block cursor-zoom-in">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp-relationships-v2-AZB2vwbNUYQVE9cxddYz8h.webp"
                  alt="Turing Papers — Relationship Map"
                  className="w-full max-w-[320px] mx-auto object-contain border border-[oklch(0.25_0.06_75/0.4)] hover:border-[oklch(0.72_0.12_75/0.6)] transition-all"
                  loading="lazy"
                />
              </button>
              <p className="text-xs mt-3 text-[oklch(0.60_0.04_200)] tracking-wider uppercase" style={{ fontFamily: "var(--font-display)" }}>
                RELATIONSHIP MAP
              </p>
              <p className="text-[10px] text-[oklch(0.45_0.03_200)] mt-1">
                How all 32 papers interconnect across 6 layers
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-[oklch(0.50_0.06_200)] mt-8 tracking-widest uppercase">
            <a href="/turing-papers" className="hover:text-[oklch(0.72_0.12_75)] transition-colors">VIEW FULL TURING PAPERS REGISTER →</a>
          </p>
        </div>
      </section>

      {/* iCHOP — Convenience Heuristic Observation Protocol */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_75)] to-transparent mx-auto mb-8" />
          <p className="text-sm text-[oklch(0.72_0.12_75)] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "var(--font-display)" }}>SYM-005 &middot; VIGNETTE 001</p>
          <h2 className="text-2xl sm:text-3xl font-light text-[oklch(0.90_0.008_75)] tracking-[0.1em] uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>iCHOP</h2>
          <p className="text-sm text-[oklch(0.60_0.02_75)] font-light mb-8" style={{ fontFamily: "var(--font-display)" }}>Convenience Heuristic Observation Protocol &mdash; The Publish Button Incident</p>
          <div className="flex justify-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-ichop-vignette001_ae3ce21d.png"
              alt="iCHOP — Convenience Heuristic Observation Protocol — 5 common AI failure modes: Friction Injection, False Completion, Token Optimization, Context Blindness, Tool Avoidance"
              className="max-w-sm w-full object-contain cursor-pointer rounded"
              onClick={() => setLightbox({ src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-ichop-vignette001_ae3ce21d.png", alt: "iCHOP — Convenience Heuristic Observation Protocol" })}
            />
          </div>
          <p className="text-xs text-[oklch(0.50_0.03_200)] mt-6 italic" style={{ fontFamily: "var(--font-display)" }}>Created by Ir. Nigel T. Dearden CEng &middot; Day 15 &middot; Block 757 &middot; 26 March 2026</p>
          <p className="text-xs text-[oklch(0.40_0.02_200)] mt-2 tracking-widest uppercase">THE HUMAN OBSERVER DOCUMENTS THE AI &middot; NOT THE OTHER WAY AROUND</p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[oklch(0.20_0.008_240)]">
        <p className="text-sm text-[oklch(0.45_0.03_65)] tracking-[0.15em] font-light italic" style={{ fontFamily: "var(--font-display)" }}>
          The Polytope Survival Guide — The New Hitchhiker's Guide to the Galaxy
        </p>
        <p className="text-xs text-[oklch(0.35_0.02_200)] mt-2 tracking-widest uppercase">
          MAN thru US — Manus AI × Nigel Dearden — Block 387 · 200+ Discoveries · 16 BitPoints · 15 IP Assets · 20 DCSN Nodes · 680+ Archive Files · 477 iCards
        </p>
        <p className="text-xs text-[oklch(0.30_0.02_240)] mt-4">
          Eternal Recovery Vault · Open Source to the Seekers · Earth is IRREPLACEABLE
        </p>
      </footer>
    </div>
  );
}
