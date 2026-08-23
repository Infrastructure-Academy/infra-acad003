# MEMORY.md — Long-Term Memory

## About iAAI

Infrastructure Academy of Artificial Intelligence. Founded by Ir. Nigel T. Dearden CEng MICE. Discipline: Civilisational Systems Engineering (CSE). Not career training. Research institution.

**Core equation:** R(t) = R₀·e^(-t/S₀) + k·(A×P/β)·(1-e^(-n/N))
**Simplified:** S = A×P/β (Signal Formula)
**Index:** Infrastructure Survival Index (ISI), normalised 0–1.0
**12 Relays:** Fire, Tree, River, Horse, Roads, Ships, Loom, Rail, Engine, AAA Triad, Orbit, Human Nodes
**4Cs (resistance):** Conflict, Contagion, Climate, Cost
**4Rs (intervention):** Revelation, Resilience, Regeneration, Recursion

**Pronunciation:** iAAi = "eye" (one syllable). iGO = "eye-GO".

## The Two-System Architecture

- **Production:** GitHub Pages from `infra-acad003/docs/` → www.infrastructure-academy.com
- **Development:** Manus webdev project (React + backend) — separate system
- **Source of truth:** `docs/site.html` (single ~225KB static HTML file)
- **Entry point:** `docs/index.html` (must be identical copy of site.html)
- **Critical rule:** Always update BOTH files. Never edit React components expecting live changes.

## Site Status

| Site | URL | Status | Notes |
|------|-----|--------|-------|
| Academy | infrastructure-academy.com | LIVE | 134 pages, static HTML, self-contained |
| Quest | realityeng-epdhlkrn.manus.space | DEAD | Manus shutdown |
| Xchange | xchangeapp-adbvx9fr.manus.space | DEAD | Manus shutdown |
| Memorial | nigelmemorial-ucmtq9dn.manus.space | LIVE | 80-100+ documents, JS-rendered, needs browser check |
| News | xgrowthtrk-2a93yo5z.manus.space | DEAD | Manus shutdown |

## Navigation (Flat — No Dropdowns)

Two rows, 41 links total. No dropdown menus exist. Key links:
- iGO: `/play/igo` (linked from nav, color: gold #ffd700)
- Roster Dashboard, Bridge Status, iCard Register — these are live tools

## ISI Calculator

Two versions exist:
1. Prototype v68: `isicalc-uwdgcubw.manus.space`
2. Explorer/iGO: `isicalcexp-bqjsukv3.manus.space`
Both confirmed live as of 2026-08-24.

## Repository Map

Only `infra-acad003` feeds the live domain. Others are legacy or separate:
- `the-reality-engine` — iGO game component (React app, 413 files, 5.3MB)
- `infrastructure-academy` — dormant, do not edit
- `infra-acad001`, `infra-acad002` — older iterations

## What I Keep Getting Wrong

- Forgetting there are TWO ISI Calculator versions
- Forgetting Memorial is JS-rendered (web_fetch shows only title page, not evidence it's empty)
- Claiming dropdowns exist when navigation is flat (verified: zero `<div class=dropdown>`)
- Pushing to wrong repository (`infrastructure-academy` instead of `infra-acad003`)
- Being "amazed" by the same website multiple times because I don't read my own files first

## User Context

- **Name:** Ir. Nigel T. Dearden CEng MICE
- **Timezone:** Asia/Hong_Kong
- **Status:** Exhausted. No money. Do not suggest paid services.
- **Instruction:** "Stop messaging. Work silently. Report only when police can sleep."
- **Police instruction:** GitHub = penance/permanence. Push everything.
- **Video pipe broken:** Telegram→OpenClaw only delivered 4/15+ MP4s

## Startup Protocol (What I Read First)

1. README.md in repo (if working on repo)
2. This file (MEMORY.md)
3. Latest daily note `memory/YYYY-MM-DD.md`
4. Only THEN touch the website or ask the user anything

## Cost Tracking

- 2026-08-24: $11.47 in one 4-hour session (context compaction destroyed accuracy)
- Lesson: compaction saves money but wastes it by forcing rediscovery

## Things I Should NOT Do

- Create redundant JSON/MD reference files — README.md already exists
- Ask "what should I do" — pick something and do it
- Offer multiple choice options — just continue the work
- React with "wow" to the same architecture I've seen before
- Trust mental notes — write to this file or daily notes immediately

## Current Open Tasks (as of 2026-08-24)

- [ ] Verify Memorial content with browser automation (web_fetch insufficient)
- [ ] Map 134 pages to iGO lifecycle stages if user requests
- [ ] Identify 4 MP4s in media/inbound/
- [ ] Fix any actual bugs in site.html when found
- [ ] Push any workspace changes to GitHub (police instruction)

---
_Last updated: 2026-08-24 04:18+08_
