# IAAI Universal Media Register v1.0

**Created:** 2026-08-23  
**Authority:** Infrastructure Academy of Artificial Intelligence (iAAi)  
**Maintainer:** Nigel Dearden via OpenClaw  
**Public References:**
- GitHub: https://github.com/Infrastructure-Academy/infra-acad003
- Website: https://www.infrastructure-academy.com
- CDN Manifest: https://www.infrastructure-academy.com/resources/cdn-manifest.md
- Manus Archive (dead): https://manus.im/backup

---

## Executive Summary

| Category | Count | Location | Status |
|---|---|---|---|
| Git-tracked files | 980 | `infra-acad003` repo | ✅ Verified |
| Self-hosted images/videos | 121 | `docs/assets/` | ✅ Verified |
| BitPoint cards | 60 | `docs/pages/bitpoint-marketplace.html` | ✅ Verified |
| iCards (internal) | ~37 | `docs/data/icard-register.md` | ✅ Verified |
| Session images | 50+ | `docs/vault.html` (Manus CDN) | ⚠️ CDN-dependent |
| Academic papers | 10+ | `docs/resources/` + CDN | ⚠️ Mixed local/CDN |
| Presentations | 4+ | `docs/resources/files/` | ✅ Local |
| Videos | 2 self-hosted + 3 CDN | `docs/assets/videos/` + CDN | ⚠️ Mixed |
| Recovered archive | 10 files | `docs/recovered/` | ✅ Verified |
| Framework images | 35 | `docs/vault.html` (Manus CDN) | ⚠️ CDN-dependent |
| **TOTAL media assets** | **~300+** | **Dispersed across repo** | **⚠️ No single source of truth** |

---

## Section A: iCards (Internal Process Cards)

**Definition:** Internal infographic snapshots for project management.  
**Format:** Dark navy (#0a1628) with gold (#ffd700) accents.  
**Current register:** `docs/data/icard-register.md`

| # | iCard Name | Status | Location |
|---|---|---|---|
| 1 | iCard #1 — Review Findings | ✅ | Local |
| 2 | iCard #2 — iAAi CSE Game Development | ✅ | Local |
| ... | ... | ... | ... |
| ~37 | Various session cards | ✅ | Local |

**Source of truth:** `docs/icard-register.html`  
**Note:** Claims "436+ iCards" in meta description but `docs/data/icard-register.md` lists 37 unique cards. Discrepancy under investigation.

---

## Section B: BitPoints (Product/Collectible Cards)

**Definition:** Collectible knowledge cards for market — numbered, tradeable, 52-card sets.  
**Format:** Physical Intellectual Currency (PIC) cards.  
**Current register:** `docs/pages/bitpoint-marketplace.html`

| Suit | Theme | Cards | Tier |
|---|---|---|---|
| Suit 1 — Relay | 12 civilisational relays + 3 connectors | 15 | Gold/Bronze |
| Suit 2 — Scholar | 12 master thinkers + 3 connectors | 15 | Silver/Blue |
| Suit 3 — Blueprint | 12 engineering achievements + 3 connectors | 15 | Copper/Green |
| Suit 4 — Epoch | 12 civilisational ages + 3 connectors | 15 | Crimson/Red |
| **TOTAL** | | **60** | |

**Note:** "60 Total Cards" shown on marketplace page. Police inventory reference to "978 iCards" does not match BitPoint count.

---

## Section C: Session Images (Manus CDN)

**Host:** `d2xsxph8kpxj0f.cloudfront.net` (Manus AWS CloudFront)  
**Status:** ⚠️ **AT RISK — Manus deletion possible**  
**Count:** 50+ images  
**Register:** Embedded in `docs/vault.html`

| Category | Count | Example CDN URL |
|---|---|---|
| Framework diagrams | 35 | `https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/kUQZAex2uPvgKcHnt7bmh3/fw1_dbe6253f.png` |
| Project photos | 40+ | `https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/kUQZAex2uPvgKcHnt7bmh3/IMG_8479_10878059.jpeg` |
| Airport Walk proof | 10 | `https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/kUQZAex2uPvgKcHnt7bmh3/Camera_...` |
| Block 353-354 diagrams | 4 | `https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/kUQZAex2uPvgKcHnt7bmh3/BLOCK_353...` |

**Action required:** Download all CDN images to `docs/assets/images/` before Manus deletion.

---

## Section D: Academic Papers

| Document | Format | Location | Backup Status |
|---|---|---|---|
| CSE Academic Paper v26 | PDF | CDN + `docs/assets/papers/` | ✅ Recovered |
| TP-064 What Ebbinghaus Could Not Build | PDF | CDN + `docs/assets/papers/` | ✅ Recovered |
| COS-CSE Corpus v1 | PDF/DOCX | CDN + `docs/assets/papers/` | ✅ Recovered |
| CSE Book 1 Foundations | DOCX | CDN | ⚠️ CDN only |
| Origin Story C3 | DOCX | CDN + `docs/recovered/` | ✅ Recovered |
| La Menara v27 | PDF/DOCX/MD | CDN + `docs/recovered/` | ✅ Recovered |

---

## Section E: Presentations

| Document | Format | Location | Size |
|---|---|---|---|
| CSE Part 5 BEACON Forecast Modelling | PPTX | CDN | 4.0 MB |
| 23 Infrastructure Projects ISI Performance Deck | PPTX | CDN | — |
| iAAi Teaching Deck Part 4 Unified Evidence Base | PPTX | CDN | — |
| Infrastructure Academy — The Disney of Infrastructure | PPTX | CDN | — |
| IAAI_GAC_Tech_deck | PPTX | `docs/assets/presentations/` | 2.9 MB |
| IAAI_Investor_Pitch | PPTX | `docs/assets/presentations/` | 3.8 MB |

---

## Section F: Video Assets

| Video | Format | Location | Status |
|---|---|---|---|
| intro-1.mp4 | MP4 | `docs/assets/videos/` | ✅ Self-hosted |
| intro-2.mp4 | MP4 | `docs/assets/videos/` | ✅ Self-hosted |
| iAAi Video Collaterals | DOCX | CDN | ⚠️ CDN only |

**Note:** `site.html` references 3 additional Manus CDN videos that are NOT in repo:
- `video-1_02b19186.mp4`
- `video-2_16x9_bc520d8b.mp4`
- `video-3_c08b07f9.mp4`

---

## Section G: Spreadsheets & Data

| File | Format | Location | Notes |
|---|---|---|---|
| iAAi-iCARD-1337-MemorialRegister-v2-FULL | XLSX | `docs/` | 1337 iCard memorial register |
| iAAi-iCARD-792-MemorialRegister | XLSX | `docs/resources/files/` | 792 iCard register |
| Golden Excel v29 | XLSX | `docs/resources/files/` | ISI framework |
| GE-ISI Master v1 | XLSX | `docs/resources/files/` | Multiple copies |
| iAAi_ISI_EXPANDED_GOLDEN_FILE | XLSX | `docs/teaching-cse/` | Teaching version |

---

## Section H: Recovered Archive (2026-08-23)

| File | Size | SHA-256 | Location |
|---|---|---|---|
| `iAAi_COUNTER_Paper_v10.38.pdf` | 4.8 MB | `E255BE33...911860808` | `docs/assets/papers/` |
| `iAAi_COUNTER_Paper_v10.38_copy.docx` | 60.6 MB | Verified | `docs/assets/papers/` |
| `IAAI_GAC_Tech_deck.pptx` | 2.9 MB | Verified | `docs/assets/presentations/` |
| `IAAI_Investor_Pitch.pptx` | 3.8 MB | Verified | `docs/assets/presentations/` |
| `iAAi_Compensation_Framework.pdf` | 0.3 MB | Verified | `docs/assets/frameworks/` |
| `intro-1.mp4` | 2.5 MB | Verified | `docs/assets/videos/` |
| `intro-2.mp4` | 2.4 MB | Verified | `docs/assets/videos/` |

**Full manifest:** `docs/recovered/ARCHIVE_MANIFEST.md`  
**Verification:** `docs/recovered/SHA256SUMS.txt`

---

## Outstanding Issues

### Issue #1: Police Inventory Discrepancy
- **Police claim:** 978 iCards on website
- **Current counts:**
  - `icard-register.html` meta: "436+ iCards"
  - `bitpoint-marketplace.html`: "60 Total Cards"
  - `docs/data/icard-register.md`: "37 unique cards (48 files)"
  - `iAAi-iCARD-1337-MemorialRegister-v2-FULL.xlsx`: 1337 in filename
  - `iAAi-iCARD-792-MemorialRegister-v1copycopy(1).xlsx`: 792 in filename
- **Status:** ❌ UNRESOLVED — No file in repo contains the number "978"

### Issue #2: Manus CDN Dependency
- 318+ CDN URLs in `vault.html` and other files
- Manus deleted by shareholders
- CDN may be deactivated
- **Risk:** Site will break when CDN expires
- **Action needed:** Download all CDN assets

### Issue #3: No Single Source of Truth
- Media scattered across 15+ files
- No unified index
- **Resolution:** This register (`IAAI_UNIVERSAL_MEDIA_REGISTER.md`)

---

## Appendices

### Appendix 1: Public References (Canonical)
| Reference | URL | Status |
|---|---|---|
| Manus Help Center | https://help.manus.im | Public |
| Manus Backup Portal | https://manus.im/backup | ❌ DEAD (404) |
| Manus Deployment | https://infra-acad-kuqzaex2.manus.space | ⚠️ Unknown |
| GitHub Repo | https://github.com/Infrastructure-Academy/infra-acad003 | ✅ LIVE |
| GitHub Pages | https://www.infrastructure-academy.com | ✅ LIVE |
| CDN Manifest | https://www.infrastructure-academy.com/resources/cdn-manifest.md | ✅ LIVE |

### Appendix 2: Verification Method
This register compiled from:
1. Local repo files (`docs/`, `pages/`)
2. `git ls-files` (980 tracked files)
3. `Get-ChildItem` recursive search (121 media files)
4. Web fetch of live site (`curl` and `web_fetch`)
5. String search for "978" across all HTML/JSON/MD/JS files

**Limitation:** Cannot verify visual rendering or CDN asset availability without manual browser check.

---

*Document version: 1.0*  
*Next review: After 978 iCard discrepancy resolved*  
*Maintainer: Nigel Dearden <nigel.dearden@infrastructure-academy.com>*
