import 'dotenv/config';
import mysql from 'mysql2/promise';

/**
 * DCSN BLOCKCHAIN LEDGER — Vector Zero Clock System
 * 
 * Vector Zero = 5 November 2025 (Day 0)
 * Phase 1 = Day 0–120 (5 Nov 2025 → 5 Mar 2026) — The Thesis
 * Phase 2 = Day 121+ (5 Mar 2026 →) — The Build-Out
 * 
 * Every node gets:
 *   - dayNumber: calculated from activationDate relative to Vector Zero
 *   - phase: auto-determined (1 or 2) based on Day 120 boundary
 *   - blockNumber: sequential order of registration (= node number)
 *   - prevBlock: reference to previous block (blockchain chain)
 *   - versionHistory: JSON array of all iCard version changes with timestamps
 */

const VECTOR_ZERO = new Date('2025-11-05T00:00:00Z');
const PHASE_2_START = new Date('2026-03-05T00:00:00Z'); // Day 120

function calcDay(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const diff = d.getTime() - VECTOR_ZERO.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function calcPhase(dayNum) {
  if (dayNum === null) return null;
  if (dayNum <= 120) return 1;
  return 2;
}

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Step 1: Add blockchain columns if they don't exist
console.log("Step 1: Adding blockchain columns to dcsn_nodes...");
const addCols = [
  "ALTER TABLE dcsn_nodes ADD COLUMN IF NOT EXISTS dayNumber INT",
  "ALTER TABLE dcsn_nodes ADD COLUMN IF NOT EXISTS phase INT",
  "ALTER TABLE dcsn_nodes ADD COLUMN IF NOT EXISTS prevBlock VARCHAR(6)",
  "ALTER TABLE dcsn_nodes ADD COLUMN IF NOT EXISTS versionHistory JSON",
];
for (const sql of addCols) {
  try {
    await conn.execute(sql);
  } catch (e) {
    // Column may already exist — that's fine
    if (!e.message.includes('Duplicate column')) console.log(`  Note: ${e.message}`);
  }
}
console.log("  Columns ready.\n");

// Step 2: Get all nodes
const [nodes] = await conn.execute('SELECT * FROM dcsn_nodes ORDER BY CAST(nodeNumber AS UNSIGNED) ASC');

console.log("Step 2: Calculating Day numbers and Phase for all nodes...\n");

for (let i = 0; i < nodes.length; i++) {
  const n = nodes[i];
  const dayNum = calcDay(n.activationDate);
  const phase = calcPhase(dayNum);
  const prevBlock = i === 0 ? null : nodes[i - 1].nodeNumber;
  
  // Build version history
  const versionHistory = [];
  if (n.icardVersion) {
    // Log current version as latest entry
    versionHistory.push({
      version: n.icardVersion,
      timestamp: new Date().toISOString(),
      note: 'Current version — blockchain ledger initialized'
    });
  }
  
  await conn.execute(
    'UPDATE dcsn_nodes SET dayNumber = ?, phase = ?, prevBlock = ?, versionHistory = ? WHERE nodeNumber = ?',
    [dayNum, phase, prevBlock, JSON.stringify(versionHistory), n.nodeNumber]
  );
  
  console.log(`  Node ${n.nodeNumber} ${n.name}: Day ${dayNum}, Phase ${phase}, prevBlock=${prevBlock || 'GENESIS'}`);
}

// Step 3: Verify
console.log("\nStep 3: Final ledger state:\n");
const [final] = await conn.execute(
  'SELECT nodeNumber, name, dayNumber, phase, prevBlock, activationDate, icardVersion FROM dcsn_nodes ORDER BY CAST(nodeNumber AS UNSIGNED) ASC'
);
console.table(final);

await conn.end();
console.log("\nBLOCKCHAIN LEDGER INITIALIZED. Vector Zero = 5 Nov 2025. All Day/Phase numbers calculated.");
