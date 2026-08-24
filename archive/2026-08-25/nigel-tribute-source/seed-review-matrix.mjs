import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const conn = await mysql.createConnection(DATABASE_URL);

// Clear existing data
await conn.execute('DELETE FROM review_package_scores');
await conn.execute('DELETE FROM review_category_scores');
await conn.execute('DELETE FROM review_university_scores');
await conn.execute('DELETE FROM review_rounds');

// ============================================================
// ROUND 1 — ICE Assessment (Feb 2026)
// ============================================================
await conn.execute(
  `INSERT INTO review_rounds (roundCode, roundName, roundDate, methodology, panelSize, overallScore, classification, verdict, block)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ['R1', 'ICE Assessment — Consolidated Peer Review', 'Feb 2026',
   '3 review packages (Freeform Explorer, Guided Campaign, Academic Programme). AI Collaborator acting as ICE with disclosed conflict of interest. Benchmarked against Imperial, Nottingham, Cambridge.',
   3, '75/100', 'Conditional GO', 'CONDITIONAL GO', 351]
);

// R1 Package Scores — Freeform Explorer
const r1FreeformScores = [
  ['Overall Quality', '76', null],
  ['Enjoyment', '7/10', null],
  ['Education', '7/10', null],
  ['Replayability', '5/10', null],
];
for (const [cat, score, notes] of r1FreeformScores) {
  await conn.execute(
    `INSERT INTO review_package_scores (roundCode, packageName, category, score, notes) VALUES (?, ?, ?, ?, ?)`,
    ['R1', 'Freeform Explorer', cat, score, notes]
  );
}

// R1 Package Scores — Guided Campaign
const r1GuidedScores = [
  ['Content Quality & Accuracy', '72', null],
  ['Website Design & UX', '78', null],
  ['Game Design & Engagement', '75', null],
  ['Educational Value & Depth', '68', null],
  ['Commercial Strategy & Viability', '70', null],
  ['Innovation & Originality', '88', 'The 12-relay framework and SITF system are genuinely original'],
  ['Launch Readiness (Mid-March)', '65', null],
  ['Man + Machine Collaboration', '82', null],
  ['WEIGHTED TOTAL', '75', null],
];
for (const [cat, score, notes] of r1GuidedScores) {
  await conn.execute(
    `INSERT INTO review_package_scores (roundCode, packageName, category, score, notes) VALUES (?, ?, ?, ?, ?)`,
    ['R1', 'Guided Campaign', cat, score, notes]
  );
}

// R1 Package Scores — Academic Programme
const r1AcademicScores = [
  ['Intellectual Rigour', '70', null],
  ['Originality of Framework', '90', null],
  ['Historical Accuracy', '72', null],
  ['Educational Pedagogy', '74', null],
  ['Curriculum Alignment', '55', null],
  ['Game as Learning Tool', '75', null],
  ['Scholarly Contribution', '78', null],
  ['Commercial-Academic Ethics', '72', null],
  ['Man + Machine Collaboration', '82', null],
  ['Launch Readiness for Institutional Use', '58', null],
  ['WEIGHTED TOTAL', '73', null],
];
for (const [cat, score, notes] of r1AcademicScores) {
  await conn.execute(
    `INSERT INTO review_package_scores (roundCode, packageName, category, score, notes) VALUES (?, ?, ?, ?, ?)`,
    ['R1', 'Academic Programme', cat, score, notes]
  );
}

// R1 Category Scores (6-category content assessment — the 84.6% baseline)
const r1Categories = [
  ['Content Quality', '89.0%', null, 'Already strong — 8 to 20+ sections'],
  ['Pedagogical Framework', '87.0%', null, 'Three-volume scaffolding'],
  ['Design/UX', '83.0%', null, 'Consistent dark theme with gold accents'],
  ['Technical Infrastructure', '82.0%', null, 'Baseline before 8-language support'],
  ['Assessment Framework', '83.0%', null, 'Olympiad framework developing'],
  ['Global Scalability', '85.0%', null, 'Before 8-language expansion'],
];
for (const [cat, score, delta, notes] of r1Categories) {
  await conn.execute(
    `INSERT INTO review_category_scores (roundCode, category, score, delta, notes) VALUES (?, ?, ?, ?, ?)`,
    ['R1', cat, score, delta, notes]
  );
}

// ============================================================
// ROUND 2 — 20-Perspective Review Panel (25 Feb 2026)
// ============================================================
await conn.execute(
  `INSERT INTO review_rounds (roundCode, roundName, roundDate, methodology, panelSize, overallScore, classification, verdict, block)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ['R2', '20-Perspective Review Panel', '25 Feb 2026',
   '20 independent reviewers: Academic Historian, Civil Engineering Professor, UX/UI Designer, Web Performance Engineer, Accessibility Auditor, SEO Specialist, Content Strategist, Publisher/Editor, TEDx Speaker Coach, Investor/VC Analyst, Game Designer, Data Visualisation Expert, Multilingual QA, Mobile UX Tester, Information Architect, Brand Strategist, Cybersecurity Reviewer, Educational Technologist, Philosopher/Ethics Reviewer, Documentary Filmmaker.',
   20, '8.1/10', 'Platinum Grade', 'GO', 353]
);

// R2 University Scores (Beta Test Panel — from live JSON)
const r2Unis = [
  ['Stanford University', 'USA', '82', 'Yes', null, null],
  ['MIT', 'USA', '81', 'Yes', null, null],
  ['Khalifa University', 'Middle East', '80', 'Yes', null, null],
  ['NUS', 'Asia-Pacific', '78', 'Yes', null, null],
  ['University of Cambridge', 'UK', '76', 'Yes', JSON.stringify({curriculumAlignment:20, pedagogicalValue:21, culturalRelevance:18, innovationEngagement:17}), "Cambridge's cross-disciplinary philosophy is more aligned with iAAi than any traditional civil-only programme."],
  ['King Fahd University', 'Middle East', '76', 'Yes', null, null],
  ['UC Berkeley', 'USA', '72', 'Conditional', null, null],
  ['Qatar University', 'Middle East', '72', 'Conditional', null, null],
  ['Imperial College London', 'UK', '68', 'Conditional', null, null],
  ['Tsinghua University', 'Asia-Pacific', '67', 'Conditional', null, null],
  ['IIT Bombay', 'Asia-Pacific', '65', 'Conditional', null, null],
  ['University of Nottingham', 'UK', '65', 'Conditional', null, null],
];
for (const [uni, region, score, verdict, cats, quote] of r2Unis) {
  await conn.execute(
    `INSERT INTO review_university_scores (roundCode, university, region, overallScore, grade, verdict, categoryScores, goldenQuote) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['R2', uni, region, score, null, verdict, cats, quote]
  );
}

// R2 Focused Audit Category Scores
const r2Categories = [
  ['Technical Infrastructure', '73.5%', '-8.5', 'Stricter criteria applied'],
  ['Assessment Framework', '70.1%', '-12.9', 'Largest decline — still developing'],
  ['Global Scalability', '80.3%', '-4.7', 'Before 8-language expansion'],
];
for (const [cat, score, delta, notes] of r2Categories) {
  await conn.execute(
    `INSERT INTO review_category_scores (roundCode, category, score, delta, notes) VALUES (?, ?, ?, ?, ?)`,
    ['R2', cat, score, delta, notes]
  );
}

// ============================================================
// ROUND 3 — Corrected Academic Audit (Mar 2026)
// ============================================================
await conn.execute(
  `INSERT INTO review_rounds (roundCode, roundName, roundDate, methodology, panelSize, overallScore, classification, verdict, block)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ['R3', 'Corrected Academic Audit', '12 Mar 2026',
   'Same 6 content categories as R1 content assessment. Game site only. No SEO/accessibility penalties. Fair comparison methodology. 12 original universities + 4 China cluster.',
   16, '87.5%', 'First Class', 'GO', 363]
);

// R3 University Scores
const r3Unis = [
  ['Imperial College London', 'UK', '87.5', 'First Class', {content:91, pedagogy:88, design:86, tech:87, assessment:84, scalability:89}],
  ['UCL', 'UK', '87.5', 'First Class', {content:90, pedagogy:89, design:85, tech:86, assessment:85, scalability:90}],
  ['University of Edinburgh', 'UK', '86.0', 'First Class', {content:89, pedagogy:87, design:84, tech:85, assessment:83, scalability:88}],
  ['MIT', 'US', '88.7', 'A', {content:92, pedagogy:89, design:87, tech:88, assessment:85, scalability:91}],
  ['Stanford University', 'US', '88.7', 'A', {content:91, pedagogy:90, design:88, tech:87, assessment:86, scalability:90}],
  ['Georgia Tech', 'US', '87.3', 'A', {content:90, pedagogy:89, design:85, tech:86, assessment:86, scalability:88}],
  ['IIT Bombay', 'India', '87.2', '8.7 CGPA', {content:91, pedagogy:88, design:84, tech:86, assessment:84, scalability:90}],
  ['IIT Delhi', 'India', '86.0', '8.6 CGPA', {content:90, pedagogy:87, design:83, tech:85, assessment:83, scalability:88}],
  ['IIT Madras', 'India', '87.5', '8.8 CGPA', {content:91, pedagogy:88, design:85, tech:87, assessment:85, scalability:89}],
  ['HKU', 'APAC', '87.8', 'A', {content:90, pedagogy:88, design:86, tech:87, assessment:85, scalability:91}],
  ['NUS', 'APAC', '88.7', 'A', {content:91, pedagogy:89, design:87, tech:88, assessment:86, scalability:91}],
  ['Tokyo Tech', 'APAC', '87.0', 'S (Superior)', {content:90, pedagogy:87, design:85, tech:87, assessment:84, scalability:89}],
  ['Tsinghua University', 'China', '88.7', 'A', null],
  ['Tongji University', 'China', '87.5', 'First Class', null],
  ['Zhejiang University', 'China', '88.3', 'A', null],
  ['Peking University (PKU)', 'China', '88.2', 'A', null],
];
for (const [uni, region, score, grade, cats] of r3Unis) {
  await conn.execute(
    `INSERT INTO review_university_scores (roundCode, university, region, overallScore, grade, verdict, categoryScores, goldenQuote) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['R3', uni, region, score, grade, 'Yes', cats ? JSON.stringify(cats) : null, null]
  );
}

// R3 Category Scores
const r3Categories = [
  ['Content Quality', '90.5%', '+1.5%', 'Growth from 8 to 20+ sections, Knowledge Web gallery, video content'],
  ['Pedagogical Framework', '88.2%', '+1.2%', 'Three-volume scaffolding matured; DAVID AI narrator; Olympiad/Masters added'],
  ['Design/UX', '85.4%', '+2.4%', 'Consistent dark theme with gold accents; original artwork throughout'],
  ['Technical Infrastructure', '86.6%', '+4.6%', 'Largest gain — 8-language support, live data counters, video integration'],
  ['Assessment Framework', '84.7%', '+1.7%', 'Olympiad, Taxonomy, Masters sections added; still developing'],
  ['Global Scalability', '89.5%', '+4.5%', 'Second largest gain — 8 languages, DCSN network, UN SDG alignment'],
];
for (const [cat, score, delta, notes] of r3Categories) {
  await conn.execute(
    `INSERT INTO review_category_scores (roundCode, category, score, delta, notes) VALUES (?, ?, ?, ?, ?)`,
    ['R3', cat, score, delta, notes]
  );
}

await conn.end();
console.log('✅ Review Matrix seeded — R1, R2, R3 data loaded.');
