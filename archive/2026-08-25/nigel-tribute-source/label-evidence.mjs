import fs from 'fs';
import mysql from 'mysql2/promise';

// Load evidence photos list
const photos = JSON.parse(fs.readFileSync('/home/ubuntu/evidence-photos-list.json', 'utf8'));

// Use the built-in LLM to identify each photo
const FORGE_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_KEY = process.env.BUILT_IN_FORGE_API_KEY;

async function identifyImage(cdnUrl) {
  const resp = await fetch(`${FORGE_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${FORGE_KEY}`
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: 'You are a document cataloguer for a police audit. Given an image, provide a concise 1-line description (max 120 chars) identifying what the image shows. Focus on: title text visible, diagram type, key labels, subject matter. No preamble, just the description.'
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Identify this image for an evidence register:' },
            { type: 'image_url', image_url: { url: cdnUrl, detail: 'low' } }
          ]
        }
      ]
    })
  });
  const data = await resp.json();
  return data.choices?.[0]?.message?.content?.trim() || 'Unidentified evidence material';
}

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  let updated = 0;
  let failed = 0;

  // Process in batches of 5 to avoid rate limits
  for (let i = 0; i < photos.length; i += 5) {
    const batch = photos.slice(i, i + 5);
    const results = await Promise.allSettled(
      batch.map(async (p) => {
        try {
          const desc = await identifyImage(p.cdnUrl);
          const title = `Evidence: ${desc.substring(0, 200)}`;
          await conn.execute(
            'UPDATE icard_register SET title = ?, description = ? WHERE id = ?',
            [title, desc, p.id]
          );
          console.log(`✓ ${p.cardId}: ${desc.substring(0, 80)}`);
          return true;
        } catch (err) {
          console.error(`✗ ${p.cardId}: ${err.message}`);
          return false;
        }
      })
    );
    
    results.forEach(r => {
      if (r.status === 'fulfilled' && r.value) updated++;
      else failed++;
    });
    
    // Small delay between batches
    if (i + 5 < photos.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  console.log(`\nDone: ${updated} updated, ${failed} failed out of ${photos.length} total`);
  await conn.end();
}

main().catch(console.error);
