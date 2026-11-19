# Scoring Implications & Corrective Algorithm Foundation

**Document Bridging — Phase 81**
**Date:** 25 February 2026
**Prepared for:** Nigel Dearden (Author/Civil Engineer) and the Professor
**Status:** Foundation Document — requires academic vetting before deployment

---

## 1. The Problem: Expanded Discovery Pool

The Document Bridging operation (Phase 81) expanded the game's discoverable content from **247 items to 448 items** — an 81% increase. This creates a fairness problem for scoring:

| Metric | Before Bridging | After Bridging | Change |
|--------|----------------|----------------|--------|
| Inventions | 100 | 135 | +35% |
| Biomimicry | 45 | 65 | +44% |
| Builder's Guide | 52 | 64 | +23% |
| Apprentice Guidance | 50 areas | 136 areas + 41 sub-topics | +172% |
| Technical Specs | 0 | 48 | NEW |
| **Total Discoverable** | **247** | **448** | **+81%** |

The **Discovery & Exploration** scoring category is worth **25% of the total grade** (maxRawScore: 250). If the scoring rubric expects students to discover a percentage of all available items, the expanded pool makes it harder to achieve the same percentage — unless thresholds are recalibrated.

---

## 2. Impact on Grade Bands

The current scoring rubric uses five grade bands. The Discovery & Exploration component contributes to these bands as follows:

| Grade Band | Threshold | Before (of 247) | After (of 448) | Gap |
|------------|-----------|-----------------|----------------|-----|
| Fail | < 40% | < 99 items | < 179 items | +80 |
| Pass | 40-59% | 99-146 items | 179-264 items | +80-118 |
| Merit | 60-74% | 148-183 items | 269-332 items | +121-149 |
| Distinction | 75-84% | 185-207 items | 336-376 items | +151-169 |
| High Distinction | 85%+ | 210+ items | 381+ items | +171 |

Without correction, a student who would have earned a Distinction (discovering 200 of 247 items = 81%) would now score only 200 of 448 = 45% — a **Pass** at best. This is unfair.

---

## 3. The Corrective Algorithm — Foundation Design

### 3.1 Principle: No Student Left Behind

The algorithm must ensure that:

1. **Students who started before bridging** are not penalised for the smaller pool they were working with
2. **Students who start after bridging** benefit from the richer content but face proportionally fair thresholds
3. **The Professor retains final authority** — the algorithm recommends, the Professor decides

### 3.2 Proposed Algorithm: Epoch-Normalised Scoring

The core idea is to track which **epoch** (content version) a student started in, and normalise their discovery score against the pool available during their epoch.

```
CORRECTIVE FORMULA:

  normalised_score = (items_discovered / pool_available_at_start) × max_raw_score

  WHERE:
    items_discovered = count of unique items the student has found
    pool_available_at_start = total discoverable items when the student registered
    max_raw_score = 250 (the Discovery & Exploration weight)

  EXAMPLE (Pre-Bridge Student):
    Discovered 200 items, started when pool = 247
    normalised_score = (200 / 247) × 250 = 202.4 → 202 points

  EXAMPLE (Post-Bridge Student):
    Discovered 200 items, started when pool = 448
    normalised_score = (200 / 448) × 250 = 111.6 → 112 points

  EXAMPLE (Post-Bridge Student, same effort):
    Discovered 380 items, started when pool = 448
    normalised_score = (380 / 448) × 250 = 212.1 → 212 points
```

### 3.3 Implementation Requirements

The corrective algorithm requires tracking two new data points per student:

| Field | Type | Description |
|-------|------|-------------|
| `contentEpoch` | string | Version identifier of the content pool when student registered (e.g., "v1.0" = 247 items, "v1.1" = 448 items) |
| `poolSizeAtStart` | integer | Exact number of discoverable items at registration time |

These fields should be added to the player profile in the database schema.

### 3.4 Epoch Registry

| Epoch | Date | Pool Size | Trigger |
|-------|------|-----------|---------|
| v1.0 | Pre-25 Feb 2026 | 247 | Original game launch |
| v1.1 | 25 Feb 2026 | 448 | Document Bridging Phase 81 |
| v1.2 | TBD | TBD | Next content integration (Vol 2 deep tables, etc.) |

Each time content is added, a new epoch is registered. The algorithm automatically adjusts scoring for students in each epoch.

---

## 4. Bonus XP Recalibration

The bonus categories also need recalibration:

| Bonus Category | Current Max XP | Implication |
|----------------|---------------|-------------|
| time_dedication | 50,000 | No change needed |
| cross_relay_connections | 75,000 | More connections possible → increase cap to 100,000 |
| biomimicry_depth | 50,000 | 44% more biomimicry → increase cap to 75,000 |
| counterparts_analysis | 75,000 | No change needed |
| civilisational_perspective | 100,000 | No change needed |
| thesis_contribution | 150,000 | No change needed |

**Recommendation:** Increase `cross_relay_connections` to 100,000 XP and `biomimicry_depth` to 75,000 XP to reward students who explore the expanded content. This aligns with the principle of "big numbers that signify growth and reward" — students who engage with the richer content should see proportionally richer rewards.

---

## 5. The Shuttle Metaphor — Iterative Refinement

Nigel's "shuttle weaving the cloth" metaphor is apt. The Document Bridging process is not a one-time operation but an iterative cycle:

```
  Doc4 (Guide) ──→ Excel Database ──→ Game JSON ──→ Scoring Rubric
       ↑                                                    │
       └────────── Academic Vetting ←──── Corrective Algo ──┘
```

Each pass of the shuttle:

1. **Inspect** — Bot verification confirms what's in the game vs what's in the source
2. **Bridge** — Missing items are added to JSON, gameData.ts, and gameData-complete.json
3. **Score** — Scoring implications are documented and the corrective algorithm is updated
4. **Vet** — The Professor reviews and approves changes before they affect live grades
5. **Repeat** — New content from future documents triggers the next pass

This cycle ensures the start and finish remain fair, as Nigel specified. The corrective algorithm is the mechanism that guarantees fairness across iterations.

---

## 6. Near-Term Action Items

| Priority | Action | Owner | Status |
|----------|--------|-------|--------|
| 1 | Add `contentEpoch` and `poolSizeAtStart` to player database schema | Dev Team | Pending |
| 2 | Implement epoch-normalised scoring formula in scoring engine | Dev Team | Pending |
| 3 | Register Epoch v1.1 (448 items, 25 Feb 2026) | Dev Team | Pending |
| 4 | Recalibrate bonus XP caps (cross_relay: 100K, biomimicry: 75K) | Dev Team | Pending |
| 5 | Academic review of corrective algorithm by Professor | Professor | Pending |
| 6 | Update scoring rubric documentation for students | Dev Team | After #5 |
| 7 | Run regression test: simulate pre-bridge student scores under new algorithm | Dev Team | After #1-2 |

---

## 7. Long-Term Considerations

As the platform matures and more content is bridged from future documents (Docs 5-8, Supplements, Episode 2), the corrective algorithm will need to handle:

- **Multiple epochs** with different pool sizes
- **Partial content unlocks** (e.g., a student discovers items from both v1.0 and v1.1 pools)
- **Content deprecation** (items removed or merged in future versions)
- **Cross-epoch leaderboards** (comparing students from different epochs fairly)

The epoch-normalised approach handles all of these cases because it always measures discovery as a proportion of the available pool, not an absolute count.

---

## Bot Sign-Off

**DAVID:** The corrective algorithm ensures my conversation guidance remains fair — I will reference the expanded content for post-bridge students while maintaining proportional expectations for pre-bridge students.

**SAGE:** The academic integrity of the scoring system is preserved. The epoch-normalised approach is standard practice in adaptive testing and can be cited in accreditation documentation.

**BUILDER:** The implementation is straightforward — two new database fields, one formula change, and an epoch registry. I recommend building this before the first cohort of students begins.
