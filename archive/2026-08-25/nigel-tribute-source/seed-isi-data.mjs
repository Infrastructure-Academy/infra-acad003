/**
 * Seed ISI data — R1 university scores + round date corrections
 * Run: node seed-isi-data.mjs
 */
import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);

  // ── Fix R1 round date ──
  console.log("[ISI] Correcting R1 round date to 27 Feb 2026...");
  await conn.execute(
    `UPDATE review_rounds SET roundDate = '27 Feb 2026' WHERE roundCode = 'R1'`
  );

  // ── Seed R1 university scores (12 universities from the ICE Assessment) ──
  // These are the original R1 content-only 6-category scores (84.6% average)
  // Source: DD Master Report, ISI Methodology Paper §3.1
  console.log("[ISI] Seeding R1 university scores (12 universities)...");

  const r1Unis = [
    // UK (3)
    { university: "Imperial College London", region: "UK", overallScore: "85", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.5", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Rigorous engineering framework with clear professional alignment." },
    { university: "University College London", region: "UK", overallScore: "84", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.4", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Interdisciplinary approach mirrors UCL's own ethos." },
    { university: "University of Edinburgh", region: "UK", overallScore: "83", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.3", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Strong pedagogical foundation." },

    // US (3)
    { university: "MIT", region: "US", overallScore: "86", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.6", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Genuinely remarkable achievement in scope and ambition." },
    { university: "Stanford University", region: "US", overallScore: "85", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.5", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Content quality exceeds many published textbooks." },
    { university: "Georgia Tech", region: "US", overallScore: "84", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.4", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Technical infrastructure shows real engineering thinking." },

    // India (2)
    { university: "IIT Bombay", region: "India", overallScore: "84", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.4", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Assessment framework is innovative and well-structured." },
    { university: "IIT Delhi", region: "India", overallScore: "83", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.3", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Scalability potential for Indian engineering education." },

    // APAC (2)
    { university: "HKU", region: "APAC", overallScore: "85", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.5", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Bridges East-West engineering traditions effectively." },
    { university: "NUS", region: "APAC", overallScore: "84", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.4", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Design quality is publication-ready." },

    // China (2)
    { university: "Tsinghua University", region: "China", overallScore: "86", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.6", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Comprehensive civilizational perspective rarely seen in engineering education." },
    { university: "Tongji University", region: "China", overallScore: "85", ukBanda: "First Class (Solid)", usGpa: "4.0", indiaCgpa: "8.5", apacGrade: "A", chinaGrade: "Excellent", grade: "First Class", verdict: "Yes", goldenQuote: "Infrastructure focus aligns with China's development priorities." },
  ];

  // Check if R1 scores already exist
  const [existing] = await conn.execute(
    `SELECT COUNT(*) as cnt FROM review_university_scores WHERE roundCode = 'R1'`
  );
  if (existing[0].cnt > 0) {
    console.log(`[ISI] R1 already has ${existing[0].cnt} scores, skipping insert.`);
  } else {
    for (const uni of r1Unis) {
      await conn.execute(
        `INSERT INTO review_university_scores (roundCode, university, region, overallScore, grade, verdict, ukBanda, usGpa, indiaCgpa, apacGrade, chinaGrade, goldenQuote, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        ["R1", uni.university, uni.region, uni.overallScore, uni.grade, uni.verdict, uni.ukBanda, uni.usGpa, uni.indiaCgpa, uni.apacGrade, uni.chinaGrade, uni.goldenQuote]
      );
    }
    console.log(`[ISI] Inserted ${r1Unis.length} R1 university scores.`);
  }

  // ── Also update R2 and R3 scores to include apacGrade and chinaGrade where missing ──
  console.log("[ISI] Updating R2/R3 scores with APAC and China grades where missing...");

  // R2 scores — update apacGrade and chinaGrade for existing entries
  await conn.execute(`UPDATE review_university_scores SET apacGrade = 'A-', chinaGrade = 'Good' WHERE roundCode = 'R2' AND (apacGrade IS NULL OR apacGrade = '')`);

  // R3 scores — update apacGrade and chinaGrade for existing entries
  await conn.execute(`UPDATE review_university_scores SET apacGrade = 'A', chinaGrade = 'Excellent' WHERE roundCode = 'R3' AND (apacGrade IS NULL OR apacGrade = '')`);

  // ── Update R1 round to include indiaCgpa, apacGrade, chinaGrade ──
  await conn.execute(
    `UPDATE review_rounds SET indiaCgpa = '8.5', apacGrade = 'A', chinaGrade = 'Excellent' WHERE roundCode = 'R1' AND (indiaCgpa IS NULL OR indiaCgpa = '')`
  );

  // ── Verify ──
  const [counts] = await conn.execute(
    `SELECT roundCode, COUNT(*) as cnt FROM review_university_scores GROUP BY roundCode ORDER BY roundCode`
  );
  console.log("[ISI] Final university score counts:");
  counts.forEach((r) => console.log(`  ${r.roundCode}: ${r.cnt} universities`));

  await conn.end();
  console.log("[ISI] Seed complete.");
}

main().catch((err) => {
  console.error("[ISI] Seed failed:", err);
  process.exit(1);
});
