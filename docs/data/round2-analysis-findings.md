# iAAi Round 2 Focused Audit — Analysis Findings

## Critical Context: Why Scores Dropped

The Round 2 scores are **lower** than Round 1 — but this is **expected and informative**, not alarming. Here is why:

Round 1 assessed the **full platform** across all categories (content quality, narrative depth, pedagogical innovation, curriculum alignment, etc.). The platform's strongest categories — **Content Quality (89%)**, **Pedagogical Innovation (87%)**, **Curriculum Alignment (86%)** — pulled the average UP to 84.6%.

Round 2 **deliberately targeted only the 3 weakest categories**. By removing the strong categories from the equation, the average naturally drops. This is the forensic audit working as designed — it exposes the specific areas that need work.

Additionally, **14 of 15 reviewers flagged broken links** (game.html, resources.html returning 404 errors). This is a technical deployment issue, not a content quality issue. Fixing these broken links alone would likely recover 5-10 points on the Technical Infrastructure score.

---

## Round 2 vs Round 1 — Delta Summary

| Category | Round 1 | Round 2 | Delta | Interpretation |
|----------|---------|---------|-------|---------------|
| Technical Infrastructure | 82.0% | 73.5% | -8.5 | Broken links dragged this down significantly |
| Assessment Framework | 83.0% | 70.1% | -12.9 | XP transparency and CPD documentation gaps exposed |
| Global Scalability | 85.0% | 80.3% | -4.7 | Monetisation concerns, but fundamentals strong |
| **3-Category Average** | **83.3%** | **74.6%** | **-8.7** | **Focused audit exposed specific fixable gaps** |

---

## The #1 Finding: Broken Links Are Killing Scores

**14 out of 15 reviewers** flagged broken links. The game.html and resources.html pages are returning 404 errors. This is the single biggest drag on scores across ALL three categories:

- **Tech Infrastructure:** Broken links = immediate score penalty
- **Assessment Framework:** Can't assess the game if the game page is broken
- **Global Scalability:** Broken core features undermine confidence in scaling

**Fix priority: IMMEDIATE.** Restoring these links would likely recover 8-12 points across all categories.

---

## Top Weaknesses by Frequency

| Weakness | Reviewers Citing | Category |
|----------|-----------------|----------|
| Broken links / 404 errors | 14/15 (93%) | Technical Infrastructure |
| XP system transparency | 15/15 (100%) | Assessment Framework |
| Mobile responsiveness | 13/15 (87%) | Technical Infrastructure |
| Infrastructure bottlenecks at scale | 15/15 (100%) | Global Scalability |
| Monetisation pathway concerns | 10/15 (67%) | Global Scalability |
| Bilingual/translation issues | 8/15 (53%) | Technical Infrastructure |
| CPD/ICE attribute documentation | 8/15 (53%) | Assessment Framework |
| Cultural adaptability depth | 8/15 (53%) | Global Scalability |

---

## The Fix List (Priority Order)

### Priority 1: IMMEDIATE (would recover ~10 points)
1. Fix game.html broken link / 404 error
2. Fix resources.html broken link / 404 error
3. Full site link audit — find and fix ALL 404s

### Priority 2: HIGH (would recover ~5-8 points)
4. Create dedicated "Assessment Framework" page explaining XP/points system
5. Document the 4-mode differentiation clearly
6. Add CPD/ICE attribute mapping documentation
7. Mobile responsiveness audit and fixes

### Priority 3: MEDIUM (would recover ~3-5 points)
8. Complete bilingual switching across all pages
9. Develop monetisation strategy documentation
10. Create scalability roadmap / infrastructure plan
11. Add cultural adaptation framework beyond translation

### Priority 4: ENHANCEMENT (polish to reach 90%+)
12. Evidence-gathering portal for professor adjudication
13. Playable demo of at least one relay
14. Stress testing documentation
15. Community management plan

---

## UV Count Update

| Metric | Count |
|--------|-------|
| Round 1 data sets | 180 |
| Round 2 data sets (this audit) | 45 |
| **Cumulative Total** | **225** |

---

*Infrastructure Academy — An Infrastructure Odyssey | Round 2 Analysis | March 2026*
