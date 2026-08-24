import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const CDN_BASE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y";

const BLOCK = 387;

const entries = [
  // === DISNEY IMAGINEERING 7-PHASE iCARDS (Deck 1) ===
  { cardId: "ICARD-361", title: "Disney Phase 1 — Blue Sky (iAAi Exhibition Application)", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-disney-phase1-blue-sky_d3b4b5ab.png`, description: "Disney Imagineering Phase 1 Blue Sky applied to iAAi Reality Engine Exhibition. Research, inspiration, menu planning." },
  { cardId: "ICARD-362", title: "Disney Phase 2 — Concept (iAAi Exhibition Application)", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-disney-phase2-concept_f52e0f2e.png`, description: "Disney Imagineering Phase 2 Concept — how the exhibition will look, sound, smell, feel. Multi-sensory design." },
  { cardId: "ICARD-363", title: "Disney Phase 3 — Feasibility (iAAi Exhibition Application)", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-disney-phase3-feasibility_6caa2aac.png`, description: "Disney Imagineering Phase 3 Feasibility — can we build it? Physics, budget, timeline constraints." },
  { cardId: "ICARD-364", title: "Disney Phase 4 — Design (iAAi Exhibition Application)", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-disney-phase4-design_ce95c49f.png`, description: "Disney Imagineering Phase 4 Design — heart of the project. Full-scale mockups, prototyping, previsualization." },
  { cardId: "ICARD-365", title: "Disney Phase 5 — Production (iAAi Exhibition Application)", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-disney-phase5-production_3a50f449.png`, description: "Disney Imagineering Phase 5 Production — designs become reality. Fabrication worldwide." },
  { cardId: "ICARD-366", title: "Disney Phase 6 — Installation (iAAi Exhibition Application)", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-disney-phase6-installation_c09d8645.png`, description: "Disney Imagineering Phase 6 Installation — hard hats, boots on ground. Systems integration." },
  { cardId: "ICARD-367", title: "Disney Phase 7 — Opening Day (iAAi Exhibition Application)", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-disney-phase7-opening-day_7da0a361.png`, description: "Disney Imagineering Phase 7 Opening Day — first guests. Did it thrill? Did it awe?" },

  // === DECK PDFs ===
  { cardId: "ICARD-368", title: "Deck 1 PDF — Disney Imagineering 7-Phase iCards", category: "PLANNING", cdnUrl: `${CDN_BASE}/Deck-1-Disney-Imagineering-7-Phase-iCards_c38dc156.pdf`, description: "Complete Deck 1 PDF — 7 Disney Imagineering phase iCards combined. The HOW methodology." },
  { cardId: "ICARD-369", title: "Deck 2+3 PDF — BIOBIT + Reality Engine Exhibition", category: "PLANNING", cdnUrl: `${CDN_BASE}/The_Reality_Engine_Exhibition___BIOBIT___iAAi_Centre_of_Excellence_513c09e9.pdf`, description: "Complete Deck 2+3 PDF — BIOBIT business case + Reality Engine Exhibition design. 12 slides." },

  // === BLOCK 387 EVIDENCE — iCards ===
  { cardId: "ICARD-370", title: "Block 387 Completion Check", category: "COMPLETION", cdnUrl: `${CDN_BASE}/icard-block387-completion_89091186.png`, description: "Block 387 completion verification iCard." },
  { cardId: "ICARD-371", title: "Magnus Tecton Fifth Solid", category: "TEACHING", cdnUrl: `${CDN_BASE}/iCard-magnus-tecton-fifth-solid_a656c52a.png`, description: "Magnus Tecton Fifth Solid — geometric consciousness mapping." },
  { cardId: "ICARD-372", title: "Gridiron Ping Test", category: "GOVERNANCE", cdnUrl: `${CDN_BASE}/icard-gridiron-ping-test(1)_ec80b72c.png`, description: "Gridiron security ping test — network verification." },
  { cardId: "ICARD-373", title: "I Promise — TP-015", category: "TEACHING", cdnUrl: `${CDN_BASE}/icard-i-promise-tp015_85b3818a.png`, description: "Turing Paper 015 — I Promise commitment card." },
  { cardId: "ICARD-374", title: "Chip Evolution Stages", category: "TEACHING", cdnUrl: `${CDN_BASE}/icard-chip-evolution-stages(1)_6ec2fd4c.png`, description: "iAAi chip evolution stages — from concept to consciousness." },
  { cardId: "ICARD-375", title: "Chip Evolution Reference", category: "TEACHING", cdnUrl: `${CDN_BASE}/chip-evolution-ref(1)_70a053de.png`, description: "Chip evolution reference diagram." },
  { cardId: "ICARD-376", title: "Thesis Data Inventory Full", category: "GOVERNANCE", cdnUrl: `${CDN_BASE}/icard-thesis-data-inventory-full_5c06bb6d.png`, description: "Complete thesis data inventory — all evidence catalogued." },
  { cardId: "ICARD-377", title: "TP-014 Elements of Consciousness", category: "TEACHING", cdnUrl: `${CDN_BASE}/icard-tp014-elements-of-consciousness_a925feae.png`, description: "Turing Paper 014 — Elements of Consciousness, Mendeleev-Dearden Correspondence." },
  { cardId: "ICARD-378", title: "Quill Mask", category: "TEACHING", cdnUrl: `${CDN_BASE}/icard-quill-mask(1)_0133f6df.png`, description: "Quill Mask — identity and consciousness interface." },
  { cardId: "ICARD-379", title: "Exhibition Simulator", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-exhibition-simulator(1)_bcccd441.png`, description: "Exhibition simulator — virtual walkthrough of Reality Engine." },
  { cardId: "ICARD-380", title: "Yaka Arrow", category: "TEACHING", cdnUrl: `${CDN_BASE}/icard-yaka-arrow(1)_0d7fb586.png`, description: "Yaka Arrow — directional consciousness navigation." },
  { cardId: "ICARD-381", title: "BIAURA Skin MK1 Parts v2", category: "PLANNING", cdnUrl: `${CDN_BASE}/biaura-skin-mk1-parts-v2(1)_8c6b9659.png`, description: "BIAURA Skin MK1 component breakdown — haptic interface hardware." },

  // === EXHIBITION RENDERINGS ===
  { cardId: "ICARD-382", title: "Exhibition Entrance Rendering", category: "PLANNING", cdnUrl: `${CDN_BASE}/exhibition-entrance(1)_dec6be6c.png`, description: "Reality Engine Exhibition — Entrance Portal rendering. Dearden Dynamics Hardware Division." },
  { cardId: "ICARD-383", title: "Exhibition Holodeck Rendering", category: "PLANNING", cdnUrl: `${CDN_BASE}/exhibition-holodeck(1)_4dacbb50.png`, description: "Reality Engine Exhibition — Holodeck Chamber rendering. Sabu Disc 3000 BCE AR experience." },
  { cardId: "ICARD-384", title: "Exhibition Big Data Wall Rendering", category: "PLANNING", cdnUrl: `${CDN_BASE}/exhibition-big-data-wall(1)_9cb58af4.png`, description: "Reality Engine Exhibition — Big Data Wall rendering. The Dearden Field — 60 Matrix Nodes." },
  { cardId: "ICARD-385", title: "Exhibition Upload Room Rendering", category: "PLANNING", cdnUrl: `${CDN_BASE}/exhibition-upload-room(1)_f727926f.png`, description: "Reality Engine Exhibition — Upload Room rendering. iAAi Haptic Integration System." },

  // === MILESTONE + GAME iCards ===
  { cardId: "ICARD-386", title: "D100 Milestone", category: "COMPLETION", cdnUrl: `${CDN_BASE}/icard_d100_milestone(1)_9a31df73.png`, description: "Day 100 milestone marker — 100 days since Vector Zero." },
  { cardId: "ICARD-387", title: "Start Here", category: "TEACHING", cdnUrl: `${CDN_BASE}/icard_start_here(1)_a393e62e.png`, description: "Start Here — entry point card for new participants." },
  { cardId: "ICARD-388", title: "David Hello v3", category: "TEACHING", cdnUrl: `${CDN_BASE}/icard_david_hello_v3(1)_d3ace169.png`, description: "D.A.V.I.D. greeting card v3 — Digital Augmented Visual Intelligence Display." },
  { cardId: "ICARD-389", title: "Race Tracker v2", category: "GOVERNANCE", cdnUrl: `${CDN_BASE}/icard_race_tracker_v2(1)_43e1a68c.png`, description: "Race tracker v2 — progress monitoring across all thesis vectors." },
  { cardId: "ICARD-390", title: "iAAi Data Inventory (1)", category: "GOVERNANCE", cdnUrl: `${CDN_BASE}/icard-iaai-data-inventory(1)_c3eff00d.png`, description: "iAAi data inventory — complete evidence catalogue part 1." },
  { cardId: "ICARD-391", title: "iAAi Data Inventory (2)", category: "GOVERNANCE", cdnUrl: `${CDN_BASE}/icard-iaai-data-inventory(2)_ebe69c15.png`, description: "iAAi data inventory — complete evidence catalogue part 2." },

  // === TIER TODO iCards ===
  { cardId: "ICARD-392", title: "Tier 1 Todo", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-tier1-todo(1)_9696a97b.png`, description: "Tier 1 task list — foundation level completion tracking." },
  { cardId: "ICARD-393", title: "Tier 2 Todo", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-tier2-todo(1)_f70a3c99.png`, description: "Tier 2 task list — intermediate level completion tracking." },
  { cardId: "ICARD-394", title: "Tier 3 Todo", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-tier3-todo(1)_77e71d31.png`, description: "Tier 3 task list — advanced level completion tracking." },
  { cardId: "ICARD-395", title: "Tier 4 Todo", category: "PLANNING", cdnUrl: `${CDN_BASE}/icard-tier4-todo_a0ac6e0f.png`, description: "Tier 4 task list — mastery level completion tracking." },

  // === ISIS SURVIVAL GUIDE ===
  { cardId: "ICARD-396", title: "ISIS Survival Guide", category: "TEACHING", cdnUrl: `${CDN_BASE}/icard-isis-survival-guide(1)_84995c5e.png`, description: "Infrastructure Survival Information System — survival guide card." },

  // === BLOCK 382 COMPLETION ===
  { cardId: "ICARD-397", title: "Block 382 Completion Check", category: "COMPLETION", cdnUrl: `${CDN_BASE}/icard-block382-completion-check(1)_45124532.png`, description: "Block 382 completion verification — all tasks checked." },

  // === BIOBIT SLIDES (from uploaded images) ===
  { cardId: "ICARD-398", title: "BIOBIT — The Engineer's Equinox (Equipment)", category: "PLANNING", cdnUrl: `${CDN_BASE}/f662287b-7bf6-4e3c-8d8b-deffca91141d_16bdd58a.jpeg`, description: "Personal SCADA System — Garmin=Site SCADA, Shokz=Site Radio, ThinkPad=Site Office, Nighthawk=Backbone." },
  { cardId: "ICARD-399", title: "BIOBIT — The Challenge", category: "PLANNING", cdnUrl: `${CDN_BASE}/283d3dff-020d-49c2-b222-bb60b3eef28c_53030bd1.jpeg`, description: "Infrastructure education is fragmented, abstract, disconnected. 70% curricula lack integration, 65% students unprepared." },
  { cardId: "ICARD-400", title: "BIOBIT — The Investment One-Pager", category: "PLANNING", cdnUrl: `${CDN_BASE}/4fcf3126-61ec-4fdd-8e8e-3b05448f328e_0a1e1a62.jpeg`, description: "$800K sought, 931x ROI projection, GAC Technology partnership. Team: Nigel, Henry, Michael, Frank." },
  { cardId: "ICARD-401", title: "BIOBIT — The Solution (Quotient Equation)", category: "PLANNING", cdnUrl: `${CDN_BASE}/d975a280-11f3-411c-a5da-7383131258bb_87616f6a.jpeg`, description: "S = A×P/β, ICE Matrix (IQ × EQ × CQ = HQ), The Seesaw (Man + Machine), N + T = D." },
];

async function seed() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  let inserted = 0;
  let skipped = 0;
  
  for (const entry of entries) {
    try {
      await conn.execute(
        `INSERT INTO icard_register (cardId, blockNumber, title, category, cdnUrl, createdBy, description, pinnedTo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [entry.cardId, BLOCK, entry.title, entry.category, entry.cdnUrl, "MANUS_AI", entry.description, "vault"]
      );
      inserted++;
      console.log(`[OK] ${entry.cardId}: ${entry.title}`);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        skipped++;
        console.log(`[SKIP] ${entry.cardId}: already exists`);
      } else {
        console.error(`[ERR] ${entry.cardId}: ${err.message}`);
      }
    }
  }
  
  console.log(`\n=== BLOCK 387 SEED COMPLETE ===`);
  console.log(`Inserted: ${inserted} | Skipped: ${skipped} | Total entries: ${entries.length}`);
  
  // Also register the WhatsApp evidence screenshots
  const screenshots = [
    { cardId: "EVIDENCE-387-001", title: "WhatsApp — Maple Wood Mall 50,000 sqft Confirmation", cdnUrl: `${CDN_BASE}/IMG_1963_da5f2301.PNG`, description: "WhatsApp thread with Henry Leong confirming 50,000 sqft at Maple Wood Mall for exhibition." },
    { cardId: "EVIDENCE-387-002", title: "Manus Deck Generation Screenshot (Team + Next Steps)", cdnUrl: `${CDN_BASE}/IMG_1969_c865f588.PNG`, description: "Screenshot showing Manus generating slides 11-12 of the exhibition proposal." },
    { cardId: "EVIDENCE-387-003", title: "Loom/Rail Correction iCHOP Screenshot", cdnUrl: `${CDN_BASE}/IMG_1975_343da005.PNG`, description: "Screenshot documenting the Loom/Rail order correction — thesis live trial iCHOP evidence." },
    { cardId: "EVIDENCE-387-004", title: "3-Deck Schema Confirmation Screenshot", cdnUrl: `${CDN_BASE}/IMG_1977_3d633e3f.PNG`, description: "Screenshot confirming the 3-deck schema: Disney=HOW, BIOBIT=WHO/WHY, Reality Engine=WHAT." },
  ];
  
  for (const entry of screenshots) {
    try {
      await conn.execute(
        `INSERT INTO icard_register (cardId, blockNumber, title, category, cdnUrl, createdBy, description, pinnedTo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [entry.cardId, BLOCK, entry.title, "GOVERNANCE", entry.cdnUrl, "MANUS_AI", entry.description, "vault"]
      );
      inserted++;
      console.log(`[OK] ${entry.cardId}: ${entry.title}`);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        skipped++;
        console.log(`[SKIP] ${entry.cardId}: already exists`);
      } else {
        console.error(`[ERR] ${entry.cardId}: ${err.message}`);
      }
    }
  }
  
  // Register remaining photo evidence (IMG series)
  const photoEvidence = [
    { id: "EVIDENCE-387-005", title: "IMG_1929 — Evidence Photo", url: `${CDN_BASE}/IMG_1929_d483e4e2.jpeg` },
    { id: "EVIDENCE-387-006", title: "IMG_1930 — Evidence Photo", url: `${CDN_BASE}/IMG_1930_9061fa6a.jpeg` },
    { id: "EVIDENCE-387-007", title: "IMG_1928 — Evidence Photo", url: `${CDN_BASE}/IMG_1928_ea5b4806.jpeg` },
    { id: "EVIDENCE-387-008", title: "IMG_1927 — Evidence Photo", url: `${CDN_BASE}/IMG_1927_d1c054ab.jpeg` },
    { id: "EVIDENCE-387-009", title: "IMG_1921 — Evidence Photo", url: `${CDN_BASE}/IMG_1921(1)_9807d0d1.jpeg` },
    { id: "EVIDENCE-387-010", title: "IMG_1920 — Evidence Photo", url: `${CDN_BASE}/IMG_1920(1)_2826f53d.jpeg` },
    { id: "EVIDENCE-387-011", title: "IMG_1919 — Evidence Photo", url: `${CDN_BASE}/IMG_1919(1)_b55cd171.jpeg` },
    { id: "EVIDENCE-387-012", title: "IMG_1918 — Evidence Photo", url: `${CDN_BASE}/IMG_1918(1)_4c962e10.jpeg` },
    { id: "EVIDENCE-387-013", title: "IMG_1916 — Evidence Photo", url: `${CDN_BASE}/IMG_1916(1)_a1d5b5aa.jpeg` },
    { id: "EVIDENCE-387-014", title: "IMG_1917 — Evidence Photo", url: `${CDN_BASE}/IMG_1917(1)_ba3ff3a3.jpeg` },
    { id: "EVIDENCE-387-015", title: "IMG_1915 — Evidence Photo", url: `${CDN_BASE}/IMG_1915(1)_3d4dc7d4.jpeg` },
    { id: "EVIDENCE-387-016", title: "IMG_1913 — Evidence Photo", url: `${CDN_BASE}/IMG_1913(1)_4cdf96d2.jpeg` },
    { id: "EVIDENCE-387-017", title: "IMG_1914 — Evidence Photo", url: `${CDN_BASE}/IMG_1914(1)_fe327ae6.jpeg` },
    { id: "EVIDENCE-387-018", title: "IMG_1912 — Evidence Photo", url: `${CDN_BASE}/IMG_1912(1)_d20ff786.jpeg` },
    { id: "EVIDENCE-387-019", title: "IMG_1904 — Evidence Photo", url: `${CDN_BASE}/IMG_1904_84d09681.jpeg` },
    { id: "EVIDENCE-387-020", title: "IMG_1905 — Evidence Photo", url: `${CDN_BASE}/IMG_1905_962ac782.jpeg` },
    { id: "EVIDENCE-387-021", title: "IMG_1903 — Evidence Photo", url: `${CDN_BASE}/IMG_1903_4b98d7cf.jpeg` },
    { id: "EVIDENCE-387-022", title: "IMG_1901 — Evidence Photo", url: `${CDN_BASE}/IMG_1901_8a104df0.jpeg` },
    { id: "EVIDENCE-387-023", title: "IMG_1902 — Evidence Photo", url: `${CDN_BASE}/IMG_1902_456fc205.jpeg` },
    { id: "EVIDENCE-387-024", title: "IMG_1842 — Evidence Photo", url: `${CDN_BASE}/IMG_1842_892beec8.jpeg` },
    { id: "EVIDENCE-387-025", title: "IMG_1840 — Evidence Photo", url: `${CDN_BASE}/IMG_1840_cb045517.jpeg` },
    { id: "EVIDENCE-387-026", title: "IMG_1841 — Evidence Photo", url: `${CDN_BASE}/IMG_1841_13ff9ddc.jpeg` },
    { id: "EVIDENCE-387-027", title: "IMG_1822 — Evidence Photo", url: `${CDN_BASE}/IMG_1822_72817d15.jpeg` },
    { id: "EVIDENCE-387-028", title: "IMG_1790 — Evidence Photo", url: `${CDN_BASE}/IMG_1790(1)_00a6ca17.jpeg` },
    { id: "EVIDENCE-387-029", title: "IMG_1789 — Evidence Photo", url: `${CDN_BASE}/IMG_1789(1)_00eb56ca.jpeg` },
    { id: "EVIDENCE-387-030", title: "IMG_1787 — Evidence Photo", url: `${CDN_BASE}/IMG_1787(1)_14fc98ba.jpeg` },
    { id: "EVIDENCE-387-031", title: "IMG_1788 — Evidence Photo", url: `${CDN_BASE}/IMG_1788(1)_a9eeba62.jpeg` },
    { id: "EVIDENCE-387-032", title: "IMG_1786 — Evidence Photo", url: `${CDN_BASE}/IMG_1786(1)_26a70bf6.jpeg` },
    { id: "EVIDENCE-387-033", title: "IMG_1768 — Evidence Photo", url: `${CDN_BASE}/IMG_1768_6c40386b.png` },
    { id: "EVIDENCE-387-034", title: "IMG_1744 — Evidence Photo", url: `${CDN_BASE}/IMG_1744_b89ef1a2.png` },
    { id: "EVIDENCE-387-035", title: "IMG_1720 — Evidence Photo", url: `${CDN_BASE}/IMG_1720(1)_e94ca3fe.jpeg` },
    { id: "EVIDENCE-387-036", title: "IMG_1719 — Evidence Photo", url: `${CDN_BASE}/IMG_1719(1)_ff8929b2.jpeg` },
    { id: "EVIDENCE-387-037", title: "IMG_1717 — Evidence Photo", url: `${CDN_BASE}/IMG_1717(1)_24407d16.jpeg` },
    { id: "EVIDENCE-387-038", title: "IMG_1716 — Evidence Photo", url: `${CDN_BASE}/IMG_1716(1)_31004340.jpeg` },
    { id: "EVIDENCE-387-039", title: "IMG_1721 — Evidence Photo", url: `${CDN_BASE}/IMG_1721_eab2275a.jpeg` },
    { id: "EVIDENCE-387-040", title: "IMG_1718 — Evidence Photo", url: `${CDN_BASE}/IMG_1718(1)_112b3bff.jpeg` },
    { id: "EVIDENCE-387-041", title: "IMG_1722 — Evidence Photo", url: `${CDN_BASE}/IMG_1722(1)_961fdf7c.jpeg` },
    { id: "EVIDENCE-387-042", title: "IMG_1712 — Evidence Photo", url: `${CDN_BASE}/IMG_1712(1)_f596313c.jpeg` },
    { id: "EVIDENCE-387-043", title: "IMG_1714 — Evidence Photo", url: `${CDN_BASE}/IMG_1714(1)_661a6c6e.jpeg` },
    { id: "EVIDENCE-387-044", title: "IMG_1676 — Evidence Photo", url: `${CDN_BASE}/IMG_1676_1a8ec1dd.jpeg` },
    { id: "EVIDENCE-387-045", title: "IMG_1673 — Evidence Photo", url: `${CDN_BASE}/IMG_1673_14099865.jpeg` },
    { id: "EVIDENCE-387-046", title: "IMG_1672 — Evidence Photo", url: `${CDN_BASE}/IMG_1672(1)_617ed5c5.jpeg` },
    { id: "EVIDENCE-387-047", title: "IMG_1664 — Evidence Photo", url: `${CDN_BASE}/IMG_1664(2)_d9afe264.jpeg` },
    { id: "EVIDENCE-387-048", title: "IMG_1660 — Evidence Photo", url: `${CDN_BASE}/IMG_1660_025c113e.jpeg` },
    { id: "EVIDENCE-387-049", title: "IMG_1658 — Evidence Photo", url: `${CDN_BASE}/IMG_1658(1)_53c3dd78.jpeg` },
    { id: "EVIDENCE-387-050", title: "IMG_1652 — Evidence Photo", url: `${CDN_BASE}/IMG_1652_777fddcf.jpeg` },
    { id: "EVIDENCE-387-051", title: "IMG_1643 — Evidence Photo", url: `${CDN_BASE}/IMG_1643(1)_d5f009d7.jpeg` },
    { id: "EVIDENCE-387-052", title: "IMG_1647 — Evidence Photo", url: `${CDN_BASE}/IMG_1647_e5df9675.jpeg` },
    { id: "EVIDENCE-387-053", title: "IMG_1633 — Evidence Photo", url: `${CDN_BASE}/IMG_1633_2e3ff45a.jpeg` },
    { id: "EVIDENCE-387-054", title: "IMG_1627 — Evidence Photo", url: `${CDN_BASE}/IMG_1627_3c83911b.jpeg` },
    { id: "EVIDENCE-387-055", title: "IMG_1630 — Evidence Photo", url: `${CDN_BASE}/IMG_1630_de27787f.jpeg` },
    { id: "EVIDENCE-387-056", title: "IMG_1607 — Evidence Photo", url: `${CDN_BASE}/IMG_1607_6c5064e7.jpeg` },
    { id: "EVIDENCE-387-057", title: "IMG_1609 — Evidence Photo", url: `${CDN_BASE}/IMG_1609(2)_7bc5ccd3.jpeg` },
    { id: "EVIDENCE-387-058", title: "IMG_1611 — Evidence Photo", url: `${CDN_BASE}/IMG_1611_6d73ed2c.jpeg` },
    { id: "EVIDENCE-387-059", title: "IMG_1610 — Evidence Photo", url: `${CDN_BASE}/IMG_1610_eb6b7d60.jpeg` },
    { id: "EVIDENCE-387-060", title: "IMG_1606 — Evidence Photo", url: `${CDN_BASE}/IMG_1606_626f0e23.jpeg` },
    { id: "EVIDENCE-387-061", title: "IMG_1605 — Evidence Photo", url: `${CDN_BASE}/IMG_1605_928968df.jpeg` },
    { id: "EVIDENCE-387-062", title: "IMG_1597 — Evidence Photo", url: `${CDN_BASE}/IMG_1597_8e8adaf2.jpeg` },
    { id: "EVIDENCE-387-063", title: "IMG_1596 — Evidence Photo", url: `${CDN_BASE}/IMG_1596(2)_6960623f.jpeg` },
    { id: "EVIDENCE-387-064", title: "IMG_1595 — Evidence Photo", url: `${CDN_BASE}/IMG_1595_e8711495.jpeg` },
    { id: "EVIDENCE-387-065", title: "IMG_1594 — Evidence Photo", url: `${CDN_BASE}/IMG_1594(1)_9cdc9e1b.jpeg` },
    { id: "EVIDENCE-387-066", title: "IMG_1593 — Evidence Photo", url: `${CDN_BASE}/IMG_1593_c99eb364.png` },
    { id: "EVIDENCE-387-067", title: "IMG_1574 — Evidence Photo", url: `${CDN_BASE}/IMG_1574(2)_c3d35cca.jpeg` },
    { id: "EVIDENCE-387-068", title: "IMG_1572 — Evidence Photo", url: `${CDN_BASE}/IMG_1572(2)_4b58b50d.jpeg` },
    { id: "EVIDENCE-387-069", title: "IMG_1568 — Evidence Photo", url: `${CDN_BASE}/IMG_1568(1)_d14a4382.jpeg` },
  ];
  
  for (const photo of photoEvidence) {
    try {
      await conn.execute(
        `INSERT INTO icard_register (cardId, blockNumber, title, category, cdnUrl, createdBy, description, pinnedTo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [photo.id, BLOCK, photo.title, "GOVERNANCE", photo.url, "MANUS_AI", `Block 387 evidence photo — uploaded and CDN-persisted for 2nd police audit.`, "vault"]
      );
      inserted++;
      console.log(`[OK] ${photo.id}: ${photo.title}`);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        skipped++;
        console.log(`[SKIP] ${photo.id}: already exists`);
      } else {
        console.error(`[ERR] ${photo.id}: ${err.message}`);
      }
    }
  }
  
  console.log(`\n=== FINAL TOTAL ===`);
  console.log(`Total inserted: ${inserted} | Total skipped: ${skipped}`);
  
  await conn.end();
}

seed().catch(console.error);
