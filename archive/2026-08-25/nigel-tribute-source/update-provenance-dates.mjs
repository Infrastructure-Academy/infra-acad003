import 'dotenv/config';
import mysql from 'mysql2/promise';

/**
 * Update provenance dates from WhatsApp screenshot evidence
 * Source: IMG_0688-0691.PNG — captured 11 Mar 2026
 */

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const updates = [
  // Michael Wu — created Infra:infostructure-academy on 15 Feb 2026
  { nodeNumber: '001', activationDate: '2026-02-15', cell: 'Infra:infostructure-academy', recruitedBy: '000' },
  // Henry Leong — in Infra group 15 Feb, created Projections 16 Feb
  { nodeNumber: '002', activationDate: '2026-02-15', cell: 'Dinosaurs To AI Future', recruitedBy: '000' },
  // Frank Sheu — in Projections group from 16 Feb 2026
  { nodeNumber: '019', activationDate: '2026-02-16', cell: 'Projections Into the Future', recruitedBy: '000' },
  // Arthur Lin — in Dinosaurs group
  { nodeNumber: '011', cell: 'Dinosaurs To AI Future', recruitedBy: '002' },
  // Daoping Bao — in Dinosaurs group
  { nodeNumber: '012', cell: 'Dinosaurs To AI Future', recruitedBy: '002' },
  // Khanh Huynh — in Dinosaurs group (Henry's nephew)
  { nodeNumber: '018', cell: 'Dinosaurs To AI Future', recruitedBy: '002' },
];

console.log("Updating provenance dates from WhatsApp evidence...\n");

for (const u of updates) {
  if (u.activationDate) {
    await conn.execute(
      'UPDATE dcsn_nodes SET activationDate = ?, cell = ?, recruitedBy = ? WHERE nodeNumber = ?',
      [u.activationDate, u.cell, u.recruitedBy, u.nodeNumber]
    );
    console.log(`  Node ${u.nodeNumber}: date=${u.activationDate}, cell=${u.cell}, recruitedBy=${u.recruitedBy}`);
  } else {
    await conn.execute(
      'UPDATE dcsn_nodes SET cell = ?, recruitedBy = ? WHERE nodeNumber = ?',
      [u.cell, u.recruitedBy, u.nodeNumber]
    );
    console.log(`  Node ${u.nodeNumber}: cell=${u.cell}, recruitedBy=${u.recruitedBy}`);
  }
}

console.log("\nVerifying updated records...");
const [rows] = await conn.execute(
  "SELECT nodeNumber, name, cell, recruitedBy, activationDate FROM dcsn_nodes WHERE nodeNumber IN ('001','002','011','012','018','019') ORDER BY nodeNumber"
);
console.table(rows);

await conn.end();
console.log("\nDONE. Provenance dates updated from WhatsApp evidence.");
