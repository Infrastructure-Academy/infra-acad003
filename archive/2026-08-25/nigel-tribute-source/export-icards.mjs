import mysql from 'mysql2/promise';
import fs from 'fs';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await conn.execute(
  `SELECT cardId, blockNumber, title, category, cdnUrl, thumbnailUrl, 
          pinnedTo, createdBy, syncedToAcad, acadCardId, description, createdAt
   FROM icard_register ORDER BY id ASC`
);

const master = {
  source: "MEMORIAL",
  database: "icard_register",
  exportedBy: "ISAAC",
  exportDate: new Date().toISOString().split('T')[0],
  blockNumber: 518,
  totalRecords: rows.length,
  records: rows
};

const outputPath = '/home/ubuntu/MEMORIAL_ICARD_REGISTRY.json';
fs.writeFileSync(outputPath, JSON.stringify(master, null, 2));

console.log(`Exported ${rows.length} records to ${outputPath}`);
console.log(`File size: ${fs.statSync(outputPath).size} bytes`);

await conn.end();
