# IAAI University Roster Tracker

**Last Updated:** 23 March 2026  
**Current Count:** 23 BETA PoC Universities  
**Status:** Active — Growing  
**Anchor Page:** `/mobilisation-clock.html#first-23`

---

## Master Roster (23 Universities × 6 Regions)

### UK (5 Universities)
| # | University | R3 Score | Status | Added |
|---|-----------|----------|--------|-------|
| 1 | Imperial College London | 89.2% | BETA PoC | R1 |
| 2 | UCL (University College London) | 87.5% | BETA PoC | R3 |
| 3 | Cambridge | 87.5% | BETA PoC | R3 |
| 4 | Nottingham | R1 only | BETA PoC | R3 |
| 5 | Edinburgh | 86.0% | SUPPLEMENTAL | R3+ |

### US (4 Universities)
| # | University | R3 Score | Status | Added |
|---|-----------|----------|--------|-------|
| 6 | MIT | 89.5% | BETA PoC | R1 |
| 7 | Stanford | 89.1% | BETA PoC | R1 |
| 8 | UC Berkeley | 87.5% | BETA PoC | R3 |
| 9 | Georgia Tech | 87.5% | BETA PoC | R3 |

### China (5 Universities)
| # | University | R3 Score | Status | Added |
|---|-----------|----------|--------|-------|
| 10 | Tsinghua | 89.0% | BETA PoC | R1 |
| 11 | Peking (PKU) | 88.2% | BETA PoC | R3 |
| 12 | Zhejiang | 88.3% | BETA PoC | R3 |
| 13 | HKU | 87.8% | BETA PoC | R3 |
| 14 | Tongji | 87.5% | SUPPLEMENTAL | R3+ |

### APAC (4 Universities)
| # | University | R3 Score | Status | Added |
|---|-----------|----------|--------|-------|
| 15 | NUS (Singapore) | 88.7% | BETA PoC | R1 |
| 16 | KAIST (S. Korea) | 87.5% | BETA PoC | R3 |
| 17 | U of Tokyo (Japan) | 87.5% | BETA PoC | R3 |
| 18 | TU Delft (Netherlands) | 87.5% | BETA PoC | R3 |

### India (2 Universities)
| # | University | R3 Score | Status | Added |
|---|-----------|----------|--------|-------|
| 19 | IIT Bombay | R1 only | BETA PoC | R1 |
| 20 | IIT Madras | 87.5% | BETA PoC | R3 |

### Middle East (3 Universities)
| # | University | R1 Score | Status | Added |
|---|-----------|----------|--------|-------|
| 21 | Khalifa University (UAE) | R1: 80 | BETA PoC | R1 |
| 22 | Qatar University | R1: 72 | BETA PoC | R1 |
| 23 | King Fahd University / KFUPM (KSA) | R1: 76 | BETA PoC | R1 |

---

## Regional Summary

| Region | Count | Avg Score | Language Block |
|--------|-------|-----------|---------------|
| UK | 5 | ~87.4% | EN |
| US | 4 | ~88.4% | EN |
| China | 5 | ~88.2% | 中文 |
| APAC | 4 | ~87.8% | EN + 한국어 + 日本語 |
| India | 2 | ~86.9% | हिन्दी + EN |
| Middle East | 3 | R1 Only | العربية |
| **TOTAL** | **23** | **87.7%** | **6 blocks** |

---

## Pages That Reference University Count

When the count changes, ALL of these pages must be updated:

| Page | File | What to Update |
|------|------|---------------|
| Mobilisation Clock | `mobilisation-clock.html` | Title, summary bar, anchor ID, world map caption, HICE assessment label, "assessed" counter |
| Institutions | `institutions.html` | SDG 4 count, individual entries |
| Cash Flow Y1 | `cashflow-y1.html` | University Licensing description, pipeline count, Asia-Pacific description |
| Infrastructure Olympiad | `infrastructure-olympiad.html` | Hero stat, flywheel description, pipeline sub, UNIVERSITIES card, "See The First N" link |
| Assessment Results | `pages/assessment-results.html` | Meta tags, hero meta, world map section, master roster description |
| Block Summary | `pages/block-summary.html` | Observer #4 description |
| Milestones | `pages/milestones.html` | Magic moment description, Turing Paper timeline entry |
| Turing Paper | `pages/turing-paper.html` | Meta tags, R3 table row, section heading |

---

## How to Add a New University

1. **Add entry to `institutions.html`** — Create a new card with BETA PoC cyan badge
2. **Add to mobilisation-clock.html** — Insert in the correct regional grid cell
3. **Update the count** — Search-and-replace the old count with new count across ALL pages listed above
4. **Update this tracker** — Add the university to the correct regional table above
5. **Update the DEFINITIVE_UNI_AUDIT.md** — Add the new university with scores
6. **Verify anchor links** — If the anchor ID changes (e.g., `#first-23` → `#first-24`), update all cross-links

### Quick Search Command
```bash
grep -rn 'first-23\|23 universit\|23 already\|23 assessed\|23 beta\|23 in beta' client/public/ --include="*.html"
```

---

## Growth Pipeline

| Phase | Target Count | Timeline |
|-------|-------------|----------|
| Current (Beta PoC) | 23 | Now |
| Wave 2 (Post-Seed) | 50 | M6 |
| Wave 3 (Series A) | 150 | M12 |
| Scale (Series B) | 500+ | Y2 |
| Full TAM | 26,000 | Y5+ |

---

## Status Definitions

- **BETA PoC** — Formally assessed through the PoC validation process (R1–R3)
- **SUPPLEMENTAL** — Added to roster based on curriculum alignment analysis; not yet formally assessed through full R1–R3 cycle
- **TARGET** — Identified for future assessment but not yet engaged
