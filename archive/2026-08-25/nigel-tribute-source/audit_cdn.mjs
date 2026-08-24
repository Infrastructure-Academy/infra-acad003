import mysql from 'mysql2/promise';

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  const [rows] = await conn.execute('SELECT id, cardId, cdnUrl, createdBy FROM icard_register');
  console.log(`Total records: ${rows.length}`);
  
  let ok = 0;
  let broken = [];
  let missing = [];
  
  // Check in batches of 50
  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50);
    const results = await Promise.all(batch.map(async (row) => {
      if (!row.cdnUrl || row.cdnUrl === 'https://placeholder') {
        return { ...row, status: 'MISSING' };
      }
      try {
        const resp = await fetch(row.cdnUrl, { method: 'HEAD', redirect: 'follow' });
        return { ...row, status: resp.ok ? 'OK' : `HTTP_${resp.status}` };
      } catch (e) {
        return { ...row, status: `ERROR` };
      }
    }));
    
    for (const r of results) {
      if (r.status === 'OK') ok++;
      else if (r.status === 'MISSING') missing.push(r);
      else broken.push(r);
    }
    
    if ((i + 50) % 200 === 0) {
      console.log(`  Checked ${Math.min(i + 50, rows.length)}/${rows.length}...`);
    }
  }
  
  console.log(`\n=== AUDIT RESULTS ===`);
  console.log(`Total records: ${rows.length}`);
  console.log(`OK (HTTP 200): ${ok}`);
  console.log(`Missing URL: ${missing.length}`);
  console.log(`Broken (non-200): ${broken.length}`);
  console.log(`Publicly accessible: ${ok}/${rows.length}`);
  
  if (broken.length > 0) {
    console.log(`\n--- BROKEN LINKS (first 20) ---`);
    broken.slice(0, 20).forEach(r => {
      console.log(`  ${r.cardId} | ${r.createdBy} | ${r.status} | ${(r.cdnUrl || '').slice(0, 80)}`);
    });
  }
  
  if (missing.length > 0) {
    console.log(`\n--- MISSING URLs (first 10) ---`);
    missing.slice(0, 10).forEach(r => {
      console.log(`  ${r.cardId} | ${r.createdBy}`);
    });
  }
  
  await conn.end();
}

main().catch(e => { console.error(e); process.exit(1); });
