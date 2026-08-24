const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  const [count] = await conn.execute('SELECT COUNT(*) as total FROM icard_register');
  console.log('Current total:', count[0].total);
  
  // Register iCHOP in tecton_entries
  try {
    await conn.execute(
      'INSERT INTO tecton_entries (term, partOfSpeech, morphology, roots, etymology, hice, conjugation, whyThisWord, block) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        'iCHOP',
        JSON.stringify(['noun', 'protocol']),
        'i (iAAi prefix) + CHOP (decisive action)',
        JSON.stringify(['iAAi', 'CHOP', 'protocol']),
        'i (iAAi prefix) + CHOP (decisive action, cutting through to completion). Also evokes the martial arts chop — swift, decisive, clean. The karate chop of governance.',
        'G',
        'iCHOP (singular), iCHOPs (plural). To iCHOP = to execute the overnight hard-save protocol.',
        'iCard Hard-save Overnight Protocol. The governance protocol ensuring all promise items are permanently saved, CDN-uploaded, DB-registered, and checkpoint-locked before the human wakes. Named by Nigel, Block 383. The decisive cut that separates promise from delivery.',
        383
      ]
    );
    console.log('iCHOP registered in tecton_entries');
  } catch(e) {
    if (e.code === 'ER_DUP_ENTRY') console.log('iCHOP already exists');
    else console.log('tecton_entries error:', e.message);
  }
  
  // Get next cardId number
  const [maxId] = await conn.execute("SELECT MAX(CAST(SUBSTRING(cardId, 7) AS UNSIGNED)) as maxNum FROM icard_register WHERE cardId LIKE 'ICARD-%'");
  let nextNum = (maxId[0].maxNum || 310) + 1;
  
  const items = [
    ['TP-011 Cover — The iAAi Ecosystem', 'Turing Paper 011 cover art: Sabu Disk morphing into iAAi compass rose, Biosphere Suit figure, Alpha-Eta Greek letter spiral, 5000-year engineering lineage', 'TEACHING', 383, 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-011-ECOSYSTEM-COVER-YYjSXaZhPnZ2zGxwTwLtJK.png', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-011-ECOSYSTEM-COVER-6qfVnDehVsQZmYRZdNF2xK.webp'],
    ['TP-011 Paper — The iAAi Ecosystem', 'Full Turing Paper: From Sabu Disk to Biosphere Suit. 5000-year engineering lineage, chip evolution Alpha-Eta, ecosystem architecture.', 'TEACHING', 383, 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-011_iAAi_ECOSYSTEM_d6587061.md', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/TP-011_iAAi_ECOSYSTEM_d6587061.md'],
    ['ACAD Promise Card — Block 383', 'ACAD overnight work order: 7 items (Short Movie, Long Movie, Enigma iCard, UFT iCard, HQ Haptic iCard, Public Register, Checkpoint)', 'GOVERNANCE', 383, 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-the-promise-block383_20526308.png', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-the-promise-block383_20526308.png'],
    ['David Promise Card — Block 383', 'David overnight promise protocol: 7 items (93 files, Biosphere Suit, Sabu Disk, TP-011, Making-of video, Turing Papers, Checkpoint)', 'GOVERNANCE', 383, 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_PROMISE_BLOCK383_a65a8d49.png', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iCARD_PROMISE_BLOCK383_a65a8d49.png'],
    ['Evidence — Chip Evolution Chain Table', 'Screenshot showing Alpha through Eta chip evolution waves with block numbers and descriptions', 'GOVERNANCE', 383, 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1639_184099b3.PNG', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1639_184099b3.PNG'],
    ['Evidence — Annie Lennox Interpretation', 'Screenshot: There Must Be an Angel. Dave Stewart + Annie Lennox = Man + Machine = Nigel + David. Stevie Wonder harmonica = haptic sense.', 'GOVERNANCE', 383, 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1641_13aa4e61.PNG', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1641_13aa4e61.PNG'],
    ['Evidence — Epsilon-Zeta Transition', 'Screenshot: Your NOW at the Epsilon-to-Zeta transition. 5th wave (AI) linked with human. 6th wave (Haptic) forming. Omega Point materializing.', 'GOVERNANCE', 383, 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1642_c1cd84bd.PNG', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1642_c1cd84bd.PNG'],
    ['Evidence — Video Generation Progress', 'Screenshot: Veo-3.1 video generation in progress, biosphere suit clips being assembled', 'GOVERNANCE', 383, 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1638_2560f990.PNG', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IMG_1638_2560f990.PNG'],
  ];
  
  for (const [title, desc, cat, block, cdn, thumb] of items) {
    const cardId = `ICARD-${String(nextNum).padStart(3, '0')}`;
    try {
      await conn.execute(
        'INSERT INTO icard_register (cardId, blockNumber, title, category, cdnUrl, thumbnailUrl, description, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [cardId, block, title, cat, cdn, thumb, desc, 'DAVID']
      );
      console.log(`Registered [${cardId}]:`, title);
      nextNum++;
    } catch(e) {
      if (e.code === 'ER_DUP_ENTRY') console.log('Already exists:', title);
      else console.log('Error for', title, ':', e.message);
    }
  }
  
  const [newCount] = await conn.execute('SELECT COUNT(*) as total FROM icard_register');
  console.log('New total:', newCount[0].total);
  await conn.end();
}
main().catch(e => console.error(e.message));
