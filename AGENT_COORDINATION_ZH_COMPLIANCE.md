# Agent Coordination: Chinese (ZH) Compliance — Mandatory Instructions

**Date:** 2 June 2026  
**Issued by:** ISAAC (Lead Agent — Memorial TDF Chip)  
**Authority:** Owner directive — Nigel T. Dearden  
**Priority:** CRITICAL — Legal compliance requirement for Chinese institutional review (PolyU)

---

## Context

The Infrastructure Academy operates as ONE integrated platform across 5 subdomains. PolyU (The Hong Kong Polytechnic University) is reviewing the Chinese language compliance of the entire platform. All 5 sites must present consistent, professional Mandarin Chinese when ZH is selected. The current state is non-compliant: only the Memorial site achieves ~95% translation. The Academy is ~40%. Quest, xChange, and News are at 0%.

This is a legal and professional requirement. The owner has paid HK$14,888/month for credits to resolve this. Failure to comply damages the owner's professional reputation with Chinese institutions.

---

## Mandatory Requirements for ALL Agents

### 1. Beta/PoC Badge (ALL SITES)

Every site MUST display a consistent disclaimer badge visible at all times:

> **PoC BETA · Trial Site** | Seeking patron funding to nurture the world's future builders.

This protects against liability from errors during development. The xChange already has this. Memorial has it. Academy, Quest, and News must add it if not present.

### 2. Language Selector (ALL SITES)

Every site MUST have a globe icon language selector in the header/nav area supporting minimum:
- EN (English) — default
- 中文 (Chinese/Mandarin) — MANDATORY
- Additional languages optional but recommended: JA, KO, ES, AR, HI, VI

### 3. Chinese Translation Standard

When ZH is selected, ALL visible text must be in Mandarin Chinese. This means:
- Navigation labels
- Button text
- Headings and subheadings
- Body paragraphs
- Form labels
- Tooltips
- Footer text
- Error messages
- Status indicators

**Exceptions (may remain in English):**
- Brand names: "iAAi", "iGO", "DCSN"
- Proper nouns: "Nigel T. Dearden", "Infrastructure Academy"
- Technical identifiers: relay codes (R01, R02), block numbers
- Mathematical formulas and equations

### 4. Terminology Consistency

All agents MUST use the same Chinese terminology across all sites:

| English | Mandarin | Notes |
|---------|----------|-------|
| Infrastructure Academy | 基础设施学院 | Official name |
| The Reality Engine | 现实引擎 | Game platform |
| The xChange | 交易所 | Storefront |
| Memorial | 纪念馆 | Memorial site |
| News / Chart Room | 新闻室 / 图表室 | News site |
| Relay | 接力 | Civilisational relay |
| The Dearden Field | 迪尔登场 | Core framework |
| Holistic Quotient | 触感商数 | HQ concept |
| Civilisational Relay | 文明接力 | 12 relays |
| Fire | 火 | R01 |
| Tree | 树 | R02 |
| River | 河流 | R03 |
| Horse | 马 | R04 |
| Roads | 道路 | R05 |
| Ships | 船舶 | R06 |
| Loom | 织机 | R07 |
| Rail | 铁路 | R08 |
| Engine | 引擎 | R09 |
| AAA Triad | AAA三合会 | R10 |
| Orbit | 轨道 | R11 |
| Human Nodes | 人类节点 | R12 |
| Founding Builder | 创始建设者 | Patron tier |
| Explorer | 探索者 | D4 level |
| Apprentice | 学徒 | D8 level |
| Navigator | 领航者 | D12 level |
| Scholar | 学者 | D16 level |
| Master | 大师 | D20 level |
| Leaderboard | 排行榜 | Game feature |
| Governance | 治理 | Game feature |
| Resources | 资源 | Nav item |
| Cart | 购物车 | xChange |
| Sign in | 登录 | Auth |
| Follow | 关注 | Social |
| Beta / Trial Site | 测试版 / 试用站点 | Badge |

---

## Specific Instructions Per Agent

### MAX (Academy — infrastructure-academy.com)

**Current state:** ~40% translated. Language selector works but many strings remain English.

**Action required:**
1. Identify all remaining English strings when ZH is selected
2. Translate: "TAP FOR SOUND", "EDUTAINMENT education through entertainment", "THE REALITY ENGINE", "Enter the Game →", "THE ODYSSEY", "Day", "Blocks", "iCards", "Observers", "Pages", "SDGs Mapped", "First time here?", "START HERE →", all body paragraphs, Evidence & References section, Press Kit section
3. Ensure nav items "READ", "EXPLORE", "PEOPLE", "RESOURCES" translate to 阅读/探索/人物/资源
4. Ensure "PRESS KIT" → 新闻资料包, "SEARCH" → 搜索
5. Test: when ZH selected, scroll entire page — no English body text should remain

### DAVID (Quest — realityeng-epdhlkrn.manus.space)

**Current state:** 0% — no i18n system exists.

**Action required:**
1. Implement i18n system (recommend JSON-based like Memorial uses)
2. Add language selector to header (globe icon + dropdown)
3. Create zh.json with all UI strings translated
4. Priority strings: "THE REALITY ENGINE" → "现实引擎", "GUIDED LEARNING PLATFORM" → "引导学习平台", "Navigate 12,000 years..." → full Chinese, all relay names, "Your Relay Collection", "Play Relay Spinner to start collecting", "MY PROGRESS", "COMMUNITY HEATMAP", "REGISTER YOUR INTEREST", "WHY BACK iGO?"
5. Add "PoC BETA · Trial Site" badge if not present

### ATLAS (xChange — xchangeapp-adbvx9fr.manus.space)

**Current state:** 0% — no i18n system exists. Beta badge present.

**Action required:**
1. Implement i18n system
2. Add language selector to header
3. Create zh.json with all UI strings translated
4. Priority strings: "Spend — so builders can build" → "消费 — 让建设者能够建设", "Browse the Levels" → "浏览等级", "Become a Founding Builder" → "成为创始建设者", "Enter the Library" → "进入图书馆", all product names and descriptions, pricing labels, nav items (LEVELS/LIBRARY/INSTRUMENTS/WORKSHOP/SKUNKWORKS/ORDERS → 等级/图书馆/仪器/工坊/实验室/订单)
5. Cart and Sign in must translate

### JENNY (News — xgrowthtrk-2a93yo5z.manus.space)

**Current state:** 0% — language selector exists (shows "EN") but no ZH option/translations.

**Action required:**
1. Add ZH to the existing language selector
2. Create zh.json with all UI strings translated
3. Priority strings: "THE CHART ROOM" → "图表室", "X Growth Race Navigator" → "X增长竞赛导航器", "60 Days to 1,000 Followers" → "60天达到1,000粉丝", tab names (RACE/CHART/CONTENT/COMMUNITY → 竞赛/图表/内容/社区), "Weekly Checkpoints" → "每周检查点", "Log Daily Entry" → "记录每日条目", "Acceleration Tactics" → "加速策略", "Compose Tweet" → "撰写推文"
4. Add "PoC BETA · Trial Site" badge

---

## Implementation Reference

The Memorial site (nigel-tribute) uses a proven i18n architecture that all agents should follow:

```
client/src/i18n/
  en.json    — English (baseline, all keys)
  zh.json    — Chinese (Mandarin)
  ja.json    — Japanese
  ko.json    — Korean
  es.json    — Spanish
  ar.json    — Arabic
  hi.json    — Hindi
  vi.json    — Vietnamese
```

The i18n hook (`useI18n`) reads the selected language from localStorage, falls back to English for missing keys, and provides a `t('key')` function for all components.

The full Memorial i18n files are available at:
https://github.com/Infrastructure-Academy/infra-acad003/tree/main/memorial-i18n

Use these as reference for terminology and structure.

---

## Deadline

This must be completed as soon as credits allow. The owner has upgraded to HK$14,888/month (480,000 credits) specifically for this purpose. PolyU review is pending.

---

## Sign-off

ISAAC — Lead Agent  
Per Arya Ad Astra
