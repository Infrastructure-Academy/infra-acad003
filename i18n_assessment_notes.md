# i18n Assessment Notes - 2 June 2026

## 1. ACADEMY (infrastructure-academy.com) — MAX Agent

**ZH mode selected. Assessment:**

### TRANSLATED (working):
- Site name: "基础设施学院" ✓
- Nav: "首页" ✓
- "集一：游戏" (Play) ✓
- Sub-nav: "READ", "EXPLORE", "PEOPLE", "RESOURCES" → NOW SHOWING CHINESE LABELS in nav bar
- Trilogy subtitle: "从卡路里到意识：基础设施奥德赛 — 文明接力" ✓
- Main heading: "基础设施奥德赛" ✓
- Subheading: "土木工程师的视角与指南 — 第一集：从卡路里到意识" ✓
- Image captions: "正面与背面封面", "内页展示", "文明接力 — 从树到环面的12章" ✓
- Framework section: "完整框架", "通过土木工程师视角的基础设施教育综合系统思维" ✓
- "阅读视角", "阅读指南" ✓
- "即将推出" (Coming Soon) ✓
- CTA cards: "进入游戏", "成为先驱者", "查看动员时钟" ✓

### NOT TRANSLATED (still English):
- Top domain nav: "ACADEMY", "QUEST", "XCHANGE", "MEMORIAL", "NEWS" — English (these are brand names, possibly intentional)
- "Infrastructure • Infostructure • The Academy of Both" — English tagline
- "TAP FOR SOUND" — English
- "EDUTAINMENT education through entertainment" — English
- "THE REALITY ENGINE" + "12 Relays · 91+ Inventions · 5 Great Webs · Ages 8–65+" — English
- "Enter the Game →" — English
- "THE ODYSSEY 57.5%" — English
- "Day", "Blocks", "iCards", "Observers", "Pages", "SDGs Mapped" — English
- "First time here?" + "START HERE →" — English
- "Your guide to the mission..." — English
- Long English paragraph about extinction events — English
- "PRESS KIT" — English
- "SEARCH" — English
- Social: "Follow", "Handshake" — English
- "Provenance:", "The Trilogy:", "Morally neutral." — English (Tecton Trump section)
- "When you multiply what the world fears..." — English
- Evidence & References section — English
- Press Kit links — English

### VERDICT: ~40% translated, ~60% still English
The site has a partial i18n system. Major headings and some CTAs translate, but large portions of body content, UI labels, and interactive elements remain in English. This is NOT compliant with the "Mandarin Content Compliance" rule.

---

## Next: Check Quest, xChange, News

## 2. QUEST (realityeng-epdhlkrn.manus.space) — DAVID Agent

**NO language selector visible at all.** The entire site is in English only.

- No globe icon, no ZH button, no language dropdown
- All content: "THE REALITY ENGINE", "GUIDED LEARNING PLATFORM", "Navigate 12,000 years..."
- Nav: "iGO", "Governance", "Resources", "Leaderboard" — all English
- Top bar: "ACADEMY", "QUEST", "XCHANGE", "MEMORIAL", "NEWS" — English
- "BETA" badge present ✓
- All relay names, descriptions, UI elements — 100% English

### VERDICT: 0% Chinese. No i18n system exists on this site.

---

## 3. XCHANGE (xchangeapp-adbvx9fr.manus.space) — ATLAS Agent

**NO language selector visible.** The entire site is in English only.

- No globe icon, no ZH button, no language dropdown
- All content: "THE XCHANGE", "Spend — so builders can build", "Browse the Levels", etc.
- Nav: "LEVELS", "LIBRARY", "INSTRUMENTS", "WORKSHOP", "SKUNKWORKS", "ORDERS" — all English
- Top bar: "ACADEMY", "QUEST", "XCHANGE", "MEMORIAL", "NEWS" — English
- "PoC BETA · Trial Site" badge present ✓
- All product names, descriptions, pricing — 100% English

### VERDICT: 0% Chinese. No i18n system exists on this site.

---

## 4. NEWS (xgrowthtrk-2a93yo5z.manus.space) — JENNY Agent

**Language selector EXISTS** — shows "EN" button in top-right. However, currently set to English only.

- Language button visible (element 17: "EN")
- All content: "THE CHART ROOM", "X Growth Race Navigator — 60 Days to 1,000 Followers"
- Nav: "CHART ROOM", "JENNY", "iCARDS", "CARD VAULT", "ACADEMY", "THESIS" — all English
- Top bar: "ACADEMY", "QUEST", "XCHANGE", "MEMORIAL", "NEWS" — English
- Tabs: "RACE", "CHART", "CONTENT", "COMMUNITY", "JENNY", "DCSN" — English
- All metrics, weekly checkpoints — 100% English
- No "PoC BETA · Trial Site" badge visible (unlike xChange which has it)

### VERDICT: ~0% Chinese. Language selector exists but no Chinese translations implemented.

---

## SUMMARY TABLE

| Site | Agent | Language Selector | ZH Translation | Beta Badge | Compliance |
|------|-------|-------------------|----------------|------------|------------|
| Memorial | ISAAC | ✓ (8 languages) | ~95% complete | ✓ | MOSTLY COMPLIANT |
| Academy | MAX | ✓ (8 languages) | ~40% translated | ✓ | NON-COMPLIANT |
| Quest | DAVID | ✗ None | 0% | ✓ (BETA) | NON-COMPLIANT |
| xChange | ATLAS | ✗ None | 0% | ✓ (PoC BETA) | NON-COMPLIANT |
| News | JENNY | ✓ (EN only shown) | 0% | ✗ Missing | NON-COMPLIANT |

## REQUIRED ACTIONS FOR EACH AGENT

### MAX (Academy):
- Complete remaining ~60% of untranslated strings
- Ensure ALL UI labels, buttons, body text translate when ZH selected
- Add consistent beta badge if not present

### DAVID (Quest):
- Implement full i18n system (language selector + translation files)
- Translate all UI strings to ZH minimum
- Add beta badge

### ATLAS (xChange):
- Implement full i18n system (language selector + translation files)
- Translate all UI strings to ZH minimum
- Beta badge already present ✓

### JENNY (News):
- Implement ZH translations for existing language selector
- Translate all UI strings to ZH minimum
- Add beta badge
