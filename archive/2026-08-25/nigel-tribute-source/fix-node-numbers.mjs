import 'dotenv/config';
import mysql from 'mysql2/promise';

/**
 * BETA v3 — Fix DCSN node numbers to correct chronological order
 * 
 * AGREED ORDER (confirmed by Nigel 15+ times):
 * 000: Nigel Dearden (Founder)
 * 001: Michael Wu (First Node — Day 1)
 * 002: Henry Leong (First Node — Day 1)
 * 003: Peggy Dearden
 * 004: Mark Fisher
 * 005: Helen Zavacky
 * 006: Johnny Lai
 * 007: Oliver Mowbray
 * 008: Louise Barrington
 * 009: Cameron Reay
 * 010: Jonathan Green
 * 011: Arthur Lin
 * 012: Daoping Bao
 * 013: Liam Eric McDowell
 * 014: Will Hodgson
 * 015: Richie Cross
 * 016: Scott
 * 017: Johan Larsson
 * 018: Khanh Huynh
 * 019: Frank Sheu
 */

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Strategy: use temporary numbers (prefixed with T) to avoid unique constraint conflicts,
// then rename to final numbers

const corrections = [
  // Current -> Temp -> Final
  // Michael Wu: 012 -> T001 -> 001
  // Henry Leong: 009 -> T002 -> 002
  // Peggy: 001 -> T003 -> 003
  // Mark Fisher: 003 -> T004 -> 004 (was 003, needs to be 004)
  // Helen: 002 -> T005 -> 005
  // Johnny: 004 -> T006 -> 006
  // Oliver: 005 -> T007 -> 007
  // Louise: 006 -> T008 -> 008
  // Cameron: 007 -> T009 -> 009
  // Jonathan: 008 -> T010 -> 010
  // Arthur: 010 -> T011 -> 011
  // Daoping: 011 -> T012 -> 012 (stays same number but different person was there)
  // Nigel 000 stays, Liam 013+ stays
];

console.log("Step 1: Move all affected nodes to temporary numbers...");

// Move everyone from 001-012 to temp numbers to avoid conflicts
const tempMoves = [
  { from: '001', to: 'T001' }, // Peggy
  { from: '002', to: 'T002' }, // Helen
  { from: '003', to: 'T003' }, // Mark Fisher
  { from: '004', to: 'T004' }, // Johnny
  { from: '005', to: 'T005' }, // Oliver
  { from: '006', to: 'T006' }, // Louise
  { from: '007', to: 'T007' }, // Cameron
  { from: '008', to: 'T008' }, // Jonathan
  { from: '009', to: 'T009' }, // Henry
  { from: '010', to: 'T010' }, // Arthur
  { from: '011', to: 'T011' }, // Daoping
  { from: '012', to: 'T012' }, // Michael
];

for (const m of tempMoves) {
  await conn.execute('UPDATE dcsn_nodes SET nodeNumber = ? WHERE nodeNumber = ?', [m.to, m.from]);
  console.log(`  ${m.from} -> ${m.to}`);
}

console.log("\nStep 2: Assign correct chronological numbers...");

// Now assign final correct numbers
const finalMoves = [
  { from: 'T012', to: '001' }, // Michael Wu -> 001 (was 012)
  { from: 'T009', to: '002' }, // Henry Leong -> 002 (was 009)
  { from: 'T001', to: '003' }, // Peggy -> 003 (was 001)
  { from: 'T003', to: '004' }, // Mark Fisher -> 004 (was 003)
  { from: 'T002', to: '005' }, // Helen -> 005 (was 002)
  { from: 'T004', to: '006' }, // Johnny -> 006 (was 004)
  { from: 'T005', to: '007' }, // Oliver -> 007 (was 005)
  { from: 'T006', to: '008' }, // Louise -> 008 (was 006)
  { from: 'T007', to: '009' }, // Cameron -> 009 (was 007)
  { from: 'T008', to: '010' }, // Jonathan -> 010 (was 008)
  { from: 'T010', to: '011' }, // Arthur -> 011 (was 010)
  { from: 'T011', to: '012' }, // Daoping -> 012 (was 011)
];

for (const m of finalMoves) {
  await conn.execute('UPDATE dcsn_nodes SET nodeNumber = ? WHERE nodeNumber = ?', [m.to, m.from]);
  console.log(`  ${m.from} -> ${m.to}`);
}

// Also update recruitedBy references
console.log("\nStep 3: Fix recruitedBy references...");
// Khanh was recruited by Henry (was 009, now 002)
await conn.execute("UPDATE dcsn_nodes SET recruitedBy = '002' WHERE nodeNumber = '018' AND recruitedBy = '009'");
console.log("  Khanh: recruitedBy 009 -> 002");

// Update iCard versions to v3 for all nodes that had cards
await conn.execute("UPDATE dcsn_nodes SET icardVersion = 'BETA v3' WHERE icardVersion IS NOT NULL AND icardVersion != ''");
console.log("\nStep 4: All existing iCard versions marked as BETA v3 (pending regeneration)");

console.log("\nStep 5: Verify final state...");
const [rows] = await conn.execute('SELECT nodeNumber, name, designation, icardVersion FROM dcsn_nodes ORDER BY nodeNumber ASC');
console.table(rows);

await conn.end();
console.log("\nDONE. Database corrected to chronological order.");
