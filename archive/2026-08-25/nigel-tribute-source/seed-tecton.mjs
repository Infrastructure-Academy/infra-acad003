/**
 * Seed TECTON entries from tectonData.json into the database.
 * Uses INSERT ... ON DUPLICATE KEY UPDATE to handle existing entries.
 * Also seeds tecton_meta with the coherence pipeline, word classes, etc.
 */
import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import { config } from "dotenv";

config();

const JSON_PATH = "./client/src/data/tectonData.json";

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  const data = JSON.parse(readFileSync(JSON_PATH, "utf-8"));

  console.log(`Loaded ${data.entries.length} entries from JSON`);

  // 1. Clear existing entries and re-seed (clean slate)
  await conn.query("DELETE FROM tecton_entries");
  console.log("Cleared existing tecton_entries");

  // 2. Insert all entries in batches of 20
  const entries = data.entries;
  const batchSize = 20;
  let inserted = 0;

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const values = batch.map((e, idx) => [
      e.term,
      JSON.stringify(e.partOfSpeech),
      e.morphology,
      JSON.stringify(e.roots),
      e.etymology,
      e.hice || 'C', // default to Created if null
      e.conjugation || '',
      e.whyThisWord || '',
      i + idx, // sortOrder
      383, // block
    ]);

    const placeholders = batch.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ");
    const flat = values.flat();

    await conn.query(
      `INSERT INTO tecton_entries (term, partOfSpeech, morphology, roots, etymology, hice, conjugation, whyThisWord, sortOrder, block)
       VALUES ${placeholders}`,
      flat
    );
    inserted += batch.length;
    process.stdout.write(`\r  Inserted ${inserted}/${entries.length}`);
  }
  console.log("\n  All entries inserted.");

  // 3. Seed tecton_meta
  await conn.query("DELETE FROM tecton_meta");
  console.log("Cleared existing tecton_meta");

  const metaEntries = [
    ["version", JSON.stringify(data.version)],
    ["block", JSON.stringify(data.block)],
    ["day", JSON.stringify(data.day)],
    ["date", JSON.stringify(data.date)],
    ["correctionManifest", JSON.stringify(data.correctionManifest)],
    ["coherencePipeline", JSON.stringify(data.coherencePipeline)],
    ["wordClasses", JSON.stringify(data.wordClasses)],
    ["morphologyKey", JSON.stringify(data.morphologyKey)],
    ["hiceClassification", JSON.stringify(data.hiceClassification)],
  ];

  for (const [key, value] of metaEntries) {
    await conn.query(
      `INSERT INTO tecton_meta (\`key\`, value) VALUES (?, ?)`,
      [key, value]
    );
  }
  console.log(`  Inserted ${metaEntries.length} meta entries.`);

  // 4. Verify
  const [countResult] = await conn.query("SELECT COUNT(*) as cnt FROM tecton_entries");
  const [metaCount] = await conn.query("SELECT COUNT(*) as cnt FROM tecton_meta");
  console.log(`\nVerification:`);
  console.log(`  tecton_entries: ${countResult[0].cnt} rows`);
  console.log(`  tecton_meta: ${metaCount[0].cnt} rows`);

  await conn.end();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
