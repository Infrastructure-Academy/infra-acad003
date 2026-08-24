import mysql from "mysql2/promise";

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const anchors = [
  {
    key: "ASSESSMENT_RESULTS_MASTER",
    title: "R1-R2-R3 Assessment Results — Master Table (Single Source of Truth)",
    url: "https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html",
    site: "infra-acad-kuqzaex2.manus.space",
    description: "The COMPLETE assessment record. 12 sections: Grading Rosetta Stone (12 regional systems), R1 (84.6%, 12 unis, 5-cat benchmark + 4-cat curriculum), R2 (74.6%, focused audit, 3 weakest categories), R3 (87.7%, 16 unis, 6-cat panel), Master Consolidated Table (21 unis x 3 rounds with home grades), Regional Grading Translations (UK/US/Swiss/Dutch/China/Singapore/India/Japan/Australia/UAE-KSA-Qatar), ICE Professional Reviews (3 packages, all Conditional GO), Third-Party Verification (3 Rogue Teams + 1 Meta-VR), Golden Observations (12 university quotes including Cambridge), UV Reconciliation (321 total data sets across 8 waves), Top Weaknesses and Fix Priorities. DO NOT DUPLICATE — LINK TO THIS.",
  },
  {
    key: "UNIVERSITY_SCORES_JSON",
    title: "University Scores JSON — R2 Data (12 universities)",
    url: "https://infra-acad-kuqzaex2.manus.space/data/university-scores.json",
    site: "infra-acad-kuqzaex2.manus.space",
    description: "Live JSON file with 12 university scores from R2. Includes Cambridge ranked #5 at 76/100 with golden quote: 'Cambridge's cross-disciplinary philosophy is more aligned with iAAi than any traditional civil-only programme.' Stanford 82, MIT 81, Khalifa 80, NUS 78, Cambridge 76, King Fahd 76, UC Berkeley 72, Qatar 72, Imperial 68, Tsinghua 67, IIT Bombay 65, Nottingham 65.",
  },
  {
    key: "BETA_TEST_UNIS12_JSON",
    title: "Beta Test Unis 12 JSON — R1+R2 Merged Data",
    url: "https://infra-acad-kuqzaex2.manus.space/data/beta-test-unis12.json",
    site: "infra-acad-kuqzaex2.manus.space",
    description: "Live JSON file with merged R1+R2 data. R1 global average 84.6% (First Class Honours / GPA 4.0), R2 three-category average 74.6% (Upper Second 2:1 / GPA 3.7), 225 total UV data sets.",
  },
  {
    key: "REVIEW_WAVES_JSON",
    title: "Review Waves JSON — 6 Waves of UV Data",
    url: "https://infra-acad-kuqzaex2.manus.space/data/review-waves.json",
    site: "infra-acad-kuqzaex2.manus.space",
    description: "Live JSON file with 6 waves of review/UV data collection records.",
  },
  {
    key: "DD_DOCUMENT_ARCHIVE",
    title: "DD Document Archive — 24 Original Source Documents",
    url: "https://nigelmemorial-ucmtq9dn.manus.space/vault",
    site: "nigelmemorial-ucmtq9dn.manus.space",
    description: "24 original .docx files with permanent CDN download links. Categories: Core Panel (R1/R2/R3), University Reviews, DD Reports, R2 Audit, Benchmarks & Curriculum, Strategic & Operational, Accountability Matrices. All uploaded to CDN 12 March 2026.",
  },
  {
    key: "REVIEW_MATRIX_DATABASE",
    title: "Review Matrix — Database-Anchored R1-R3 Combined Panel Data",
    url: "https://nigelmemorial-ucmtq9dn.manus.space/review-matrix",
    site: "nigelmemorial-ucmtq9dn.manus.space",
    description: "Database-backed R1-R3 summary with v2 full grading resolution (UK Banda, US GPA, India CGPA, APAC, China). 28 university scores, 6 category scores with deltas, R1 package detail, trajectory table. CSV export. This is the THESIS-LEVEL SUMMARY — for the full master table, link to ASSESSMENT_RESULTS_MASTER.",
  },
];

for (const a of anchors) {
  await conn.execute(
    `INSERT INTO anchor_links (\`key\`, title, url, site, description, verifiedAt)
     VALUES (?, ?, ?, ?, ?, NOW())
     ON DUPLICATE KEY UPDATE title=VALUES(title), url=VALUES(url), site=VALUES(site), description=VALUES(description), verifiedAt=NOW()`,
    [a.key, a.title, a.url, a.site, a.description]
  );
  console.log(`✓ ${a.key}`);
}

await conn.end();
console.log("\nAll anchor links saved.");
