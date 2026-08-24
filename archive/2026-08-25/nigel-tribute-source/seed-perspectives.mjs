/**
 * Seed 20-Perspective Review Panel scores into perspective_scores table.
 * Source: R2 — 20-Perspective Review Panel document, 25 Feb 2026.
 */
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error("DATABASE_URL not set"); process.exit(1); }

const PERSPECTIVES = [
  { roundCode: "R2", role: "Philosopher", score: "9.5" },
  { roundCode: "R2", role: "Civil Engineer", score: "9.0" },
  { roundCode: "R2", role: "Cultural Anthropologist", score: "9.0" },
  { roundCode: "R2", role: "Documentary Filmmaker", score: "9.0" },
  { roundCode: "R2", role: "Educator", score: "8.5" },
  { roundCode: "R2", role: "Publisher", score: "8.5" },
  { roundCode: "R2", role: "Brand Strategist", score: "8.5" },
  { roundCode: "R2", role: "Military Strategist", score: "8.5" },
  { roundCode: "R2", role: "Content Strategist", score: "8.5" },
  { roundCode: "R2", role: "Ed Tech", score: "8.5" },
  { roundCode: "R2", role: "Psychologist", score: "8.0" },
  { roundCode: "R2", role: "Systems Architect", score: "8.0" },
  { roundCode: "R2", role: "Psychologist (Clinical)", score: "8.0" },
  { roundCode: "R2", role: "Systems Designer", score: "8.0" },
  { roundCode: "R2", role: "Game Designer", score: "7.5" },
  { roundCode: "R2", role: "Economist", score: "7.5" },
  { roundCode: "R2", role: "Accessibility", score: "7.5" },
  { roundCode: "R2", role: "UX Designer", score: "7.5" },
  { roundCode: "R2", role: "Web Developer", score: "7.0" },
  { roundCode: "R2", role: "Cybersecurity", score: "7.0" },
];

async function main() {
  const conn = await mysql.createConnection(DATABASE_URL);
  
  // Check if data already exists
  const [existing] = await conn.query("SELECT COUNT(*) as cnt FROM perspective_scores WHERE roundCode = 'R2'");
  if (existing[0].cnt > 0) {
    console.log(`[Seed] ${existing[0].cnt} R2 perspective scores already exist — skipping.`);
    await conn.end();
    return;
  }

  // Insert all 20 perspectives
  for (const p of PERSPECTIVES) {
    await conn.query(
      "INSERT INTO perspective_scores (roundCode, role, score) VALUES (?, ?, ?)",
      [p.roundCode, p.role, p.score]
    );
  }

  console.log(`[Seed] Inserted ${PERSPECTIVES.length} R2 perspective scores.`);
  
  // Verify
  const [rows] = await conn.query("SELECT COUNT(*) as cnt FROM perspective_scores");
  console.log(`[Seed] Total perspective_scores: ${rows[0].cnt}`);
  
  await conn.end();
}

main().catch(e => { console.error(e); process.exit(1); });
