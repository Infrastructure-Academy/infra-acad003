import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL not set');

const conn = await mysql.createConnection(DATABASE_URL);

const nodes = [
  { nodeNumber: "000", name: "NIGEL DEARDEN", designation: "The Architect", cell: "Founder", recruitedBy: null, relation: null, status: "ACTIVATED", icardUrl: null, icardVersion: null, activationBlock: 300, activationDay: 0, activationDate: "2025-11-01", metadata: JSON.stringify({ title: "Founder & Architect", enterprise: "4ECL — Four Elements Consulting Ltd" }) },
  { nodeNumber: "001", name: "PEGGY DEARDEN", designation: "The Fulcrum", cell: "EQ Anchor", recruitedBy: "000", relation: "Wife", status: "ACTIVATED", icardUrl: null, icardVersion: null, activationBlock: 353, activationDay: 119, activationDate: "2026-03-01", metadata: JSON.stringify({ title: "EQ Anchor" }) },
  { nodeNumber: "002", name: "HELEN ZAVACKY", designation: "The First Observer", cell: "Observer", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_HELEN_ZAVACKY_OBSERVER_NODE002_614ad1c4.png", icardVersion: "v1", activationBlock: 353, activationDay: 119, activationDate: "2026-03-01", metadata: null },
  { nodeNumber: "003", name: "MARK FISHER", designation: "The Pioneer", cell: "Relay", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: null, icardVersion: null, activationBlock: 352, activationDay: 118, activationDate: "2026-02-28", metadata: null },
  { nodeNumber: "004", name: "JOHNNY LAI", designation: "The Recruiter Who Reads", cell: "Activated", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: null, icardVersion: null, activationBlock: 353, activationDay: 120, activationDate: "2026-03-02", metadata: null },
  { nodeNumber: "005", name: "OLIVER MOWBRAY", designation: "The Thinker at the Pier", cell: "Activated", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: null, icardVersion: null, activationBlock: 353, activationDay: 120, activationDate: "2026-03-02", metadata: null },
  { nodeNumber: "006", name: "LOUISE BARRINGTON", designation: "The Arbitrator & Diver", cell: "Activated", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: null, icardVersion: null, activationBlock: 353, activationDay: 120, activationDate: "2026-03-02", metadata: null },
  { nodeNumber: "007", name: "CAMERON REAY", designation: "The Drummer", cell: "Reviewer", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: null, icardVersion: null, activationBlock: 354, activationDay: 121, activationDate: "2026-03-03", metadata: null },
  { nodeNumber: "008", name: "JONATHAN GREEN", designation: "The Inspector", cell: "QA/QC", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: null, icardVersion: null, activationBlock: 355, activationDay: 123, activationDate: "2026-03-05", metadata: null },
  { nodeNumber: "009", name: "HENRY LEONG", designation: "Dinosaurs to AI — Network Architect", cell: "Dinosaurs To AI Future", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_HENRY_LEONG_DINOSAURS_NODE009_c56a0998.png", icardVersion: "v1", activationBlock: 355, activationDay: 121, activationDate: "2026-03-03", metadata: JSON.stringify({ groups: "Dinosaurs To AI Future, Projections Into the Future, Infra:infostructure-academy", role: "Network Architect — First H-Tetra" }) },
  { nodeNumber: "010", name: "ARTHUR LIN", designation: "Dinosaurs to AI", cell: "Dinosaurs To AI Future", recruitedBy: "009", relation: "Colleague", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_ARTHUR_LIN_DINOSAURS_NODE010_e25fbdd4.png", icardVersion: "v1", activationBlock: 355, activationDay: 121, activationDate: "2026-03-03", metadata: null },
  { nodeNumber: "011", name: "DAOPING BAO", designation: "Captain Bao — Dino Legend & Entrepreneur", cell: "Dinosaurs To AI Future", recruitedBy: "009", relation: "Colleague", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_DAOPING_BAO_DINOSAURS_NODE011_9ad596f5.png", icardVersion: "v1", activationBlock: 355, activationDay: 121, activationDate: "2026-03-03", metadata: JSON.stringify({ title: "Chairman, NASDAQ-Listed Company", enterprise: "Gengu Dinosaurs Technology Co., Ltd", domain: "Global Exhibition Empire — Taipei, Dubai, Australia, US", memoir: "Behind the Success — The Memoir of Daoping Bao", cctvTitle: "Super-Dinosaur Enthusiast", nickname: "Captain Bao — 5th Captain of the Titanic" }) },
  { nodeNumber: "012", name: "MICHAEL WU", designation: "Dinosaurs to AI", cell: "Dinosaurs To AI Future", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_MICHAEL_WU_DINOSAURS_NODE012_f8a46d40.png", icardVersion: "v1", activationBlock: 355, activationDay: 121, activationDate: "2026-03-03", metadata: JSON.stringify({ groups: "Dinosaurs To AI Future, Projections Into the Future, Infra:infostructure-academy" }) },
  { nodeNumber: "013", name: "LIAM ERIC McDOWELL", designation: "The Pioneer", cell: "PATRON #001", recruitedBy: "000", relation: "Friend", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_LIAM_MCDOWELL_PATRON_NODE013-nn3xmAjPWwKsR8ScA6Kzkc.png", icardVersion: "v1", activationBlock: 358, activationDay: 129, activationDate: "2026-03-09", metadata: null },
  { nodeNumber: "014", name: "WILL HODGSON", designation: "Architect of Exchange", cell: "CENTURION", recruitedBy: "013", relation: "Friend", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_WILL_HODGSON_CENTURION_NODE014_54d80b04.png", icardVersion: "v1", activationBlock: 358, activationDay: 129, activationDate: "2026-03-09", metadata: null },
  { nodeNumber: "015", name: "RICHIE CROSS", designation: "Diamond Broker", cell: "CENTURION", recruitedBy: "013", relation: "Friend", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_RICHIE_CROSS_CENTURION_NODE015_c56c64f0.png", icardVersion: "v1", activationBlock: 358, activationDay: 129, activationDate: "2026-03-09", metadata: null },
  { nodeNumber: "016", name: "SCOTT", designation: "The Master Builder", cell: "CENTURION", recruitedBy: "013", relation: "Friend", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_SCOTT_CENTURION_NODE016_584039be.png", icardVersion: "v1", activationBlock: 359, activationDay: 130, activationDate: "2026-03-10", metadata: null },
  { nodeNumber: "017", name: "JOHAN LARSSON", designation: "The Bridge Identifier", cell: "CENTURION", recruitedBy: "013", relation: "Friend", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_JOHAN_LARSSON_CENTURION_NODE017-EaRLLumurSLbtFSsC4bU2r.png", icardVersion: "v1", activationBlock: 359, activationDay: 130, activationDate: "2026-03-10", metadata: null },
  { nodeNumber: "018", name: "KHANH HUYNH", designation: "The First Blood Node", cell: "Dinosaurs To AI Future", recruitedBy: "009", relation: "Nephew", status: "ACTIVATED", icardUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_KHANH_HUYNH_DINOSAURS_NODE018-259SWLim7PAwjRiUgyGpkP.png", icardVersion: "v1", activationBlock: 360, activationDay: 131, activationDate: "2026-03-11", metadata: JSON.stringify({ recruitedByName: "Henry Leong", relation: "Nephew — The First Blood Node" }) },
  { nodeNumber: "019", name: "FRANK SHEU", designation: "The Projector — Smart Glass Pioneer", cell: "Projections Into the Future", recruitedBy: "009", relation: "Introduced by Henry", status: "ACTIVATED", icardUrl: null, icardVersion: null, activationBlock: 360, activationDay: 131, activationDate: "2026-03-11", metadata: JSON.stringify({ title: "Founder", enterprise: "GAC TECHNOLOGY — HP Projectors", domain: "Taipei, Dubai, Australia, US", products: "Smart Glasses, I Beamer", website: "https://www.hp-projector.com/?lang=en", group: "Projections Into the Future" }) },
];

const sql = `INSERT INTO dcsn_nodes (nodeNumber, name, designation, cell, recruitedBy, \`relation\`, status, icardUrl, icardVersion, activationBlock, activationDay, activationDate, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

for (const n of nodes) {
  try {
    await conn.execute(sql, [
      n.nodeNumber, n.name, n.designation, n.cell, n.recruitedBy, n.relation,
      n.status, n.icardUrl, n.icardVersion, n.activationBlock, n.activationDay,
      n.activationDate, n.metadata
    ]);
    console.log(`✓ Seeded ${n.nodeNumber}: ${n.name}`);
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      console.log(`⊘ Already exists: ${n.nodeNumber}: ${n.name}`);
    } else {
      console.error(`✗ Failed ${n.nodeNumber}: ${n.name}`, e.message);
    }
  }
}

await conn.end();
console.log('\n✓ DCSN Node Register seeded. 20 nodes. Database is now the source of truth.');
