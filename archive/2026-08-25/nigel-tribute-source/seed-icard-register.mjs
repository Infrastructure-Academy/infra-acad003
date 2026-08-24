import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const cards = [
  {
    cardId: "B380-001",
    blockNumber: 380,
    title: "Truthful Status — Before Fix",
    category: "GOVERNANCE",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-truthful-status.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "Honest assessment of what was wired and what was NOT before Block 380 fixes. Red X items documented.",
  },
  {
    cardId: "B380-002",
    blockNumber: 380,
    title: "Wiring Complete — After Fix",
    category: "GOVERNANCE",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-wiring-complete.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "governance.audit and dcsn.list now read ACAD API as primary source. dataSource field proves provenance.",
  },
  {
    cardId: "B380-003",
    blockNumber: 380,
    title: "Coordinated Action Proof",
    category: "GOVERNANCE",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-coordinated-proof.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "Verification endpoints for ACAD agent to confirm cross-site wiring.",
  },
  {
    cardId: "B380-004",
    blockNumber: 380,
    title: "Cross-Agent Handshake Protocol",
    category: "HANDSHAKE",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-handshake-protocol.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "7-step protocol instructing ACAD agent to check, produce verification card, and return to Nigel.",
  },
  {
    cardId: "B380-005",
    blockNumber: 380,
    title: "Protocol Breach Count — 8 Breaches",
    category: "BREACH",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-breach-count.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "Self-audit: 8 SAP-001 protocol breaches documented. Text walls substituted for cards.",
  },
  {
    cardId: "B380-006",
    blockNumber: 380,
    title: "Database Breach Record — 24 Total",
    category: "BREACH",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-database-breaches.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "Combined breach tally: 16 from Excel audit trail + 8 Block 380 protocol breaches = 24 total.",
  },
  {
    cardId: "B380-007",
    blockNumber: 380,
    title: "ACAD Cross-Verification",
    category: "HANDSHAKE",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-acad-verification-uploaded.png",
    pinnedTo: "governance",
    createdBy: "Max (ACAD Agent)",
    description: "ACAD agent independently verified Memorial reads ACAD API. Architecture promise verified.",
  },
  {
    cardId: "B380-008",
    blockNumber: 380,
    title: "ACAD Handshake Confirmed",
    category: "HANDSHAKE",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-acad-handshake-confirmed-uploaded.png",
    pinnedTo: "governance",
    createdBy: "Max (ACAD Agent)",
    description: "Cross-agent verification complete. Both agents independently verified. Sync confirmed.",
  },
  {
    cardId: "B380-009",
    blockNumber: 380,
    title: "ACAD Breach Acknowledgment",
    category: "BREACH",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-acad-breach-ack-uploaded.png",
    pinnedTo: "governance",
    createdBy: "Max (ACAD Agent)",
    description: "ACAD agent acknowledged CA-007 incident, 24 total breaches, and corrective actions verified.",
  },
  {
    cardId: "B380-010",
    blockNumber: 380,
    title: "Turing Papers Cross-Link Status",
    category: "PLANNING",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-turing-crosslink.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "Status of Turing Papers cross-linking. 4 items missing for real sync identified and wired.",
  },
  {
    cardId: "B380-011",
    blockNumber: 380,
    title: "Wynn Palace Lesson — Completion Certs",
    category: "TEACHING",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-wynn-lesson.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "Civil engineering completion cert methodology applied to AI governance. Wynn Palace Cotai as the standard.",
  },
  {
    cardId: "B380-012",
    blockNumber: 380,
    title: "The Civil Engineer on the Scale",
    category: "TEACHING",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-civil-engineer-scale.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "Why a civil engineer with morally neutral bias has a place in the AI governance debate.",
  },
  {
    cardId: "B380-013",
    blockNumber: 380,
    title: "TRE Relay 12 — Human-AI Interface Language",
    category: "TEACHING",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-tre-relay12.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "TRE Relay 12: 12 human nodes learning AI-man interface language and risk reassurance from autonomous entities.",
  },
  {
    cardId: "B380-014",
    blockNumber: 380,
    title: "iCard Register Plan — Cross-Site Sync",
    category: "PLANNING",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-register-plan.png",
    pinnedTo: "governance",
    createdBy: "David (Memorial Agent)",
    description: "Plan for permanent auditable iCard register with database sync across Memorial and ACAD sites.",
  },
  {
    cardId: "B380-015",
    blockNumber: 380,
    title: "Turing Papers Cross-Link Complete",
    category: "COMPLETION",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block380-turing-complete.png",
    pinnedTo: "turing-papers",
    createdBy: "David (Memorial Agent)",
    description: "turingPapers.list API endpoint live. TP-009 cross-linked. Governance audit trail linked.",
  },
  {
    cardId: "B381-001",
    blockNumber: 381,
    title: "Block 381 Completion — ACAD Zone",
    category: "COMPLETION",
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-block381-completion-uploaded.png",
    pinnedTo: "governance",
    createdBy: "Max (ACAD Agent)",
    description: "ACAD Block 381: WhatsApp OG image fix, investor event recorded, Wynn Palace lesson acknowledged.",
  },
];

async function seed() {
  console.log(`Seeding ${cards.length} iCards into register...`);
  for (const card of cards) {
    try {
      await connection.execute(
        `INSERT INTO icard_register (cardId, blockNumber, title, category, cdnUrl, pinnedTo, createdBy, description, syncedToAcad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0) ON DUPLICATE KEY UPDATE title = VALUES(title)`,
        [card.cardId, card.blockNumber, card.title, card.category, card.cdnUrl, card.pinnedTo, card.createdBy, card.description]
      );
      console.log(`  ✓ ${card.cardId}: ${card.title}`);
    } catch (err) {
      console.error(`  ✗ ${card.cardId}: ${err.message}`);
    }
  }
  console.log("Done.");
  await connection.end();
  process.exit(0);
}

seed();
