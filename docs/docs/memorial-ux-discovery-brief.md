# Memorial Site — UX-001 Discovery Treatment Brief

**Project:** nigelmemorial-ucmtq9dn.manus.space
**Agent:** DAVID (Design Team)
**Standard:** iAAi UX-001 — The Discovery Principle
**Reference:** uxdemo-6hdarodt.manus.space

## Problem Statement

The Memorial site has a horizontal tab bar (NAVIGATE / THE OPUS / HERITAGE / EXHIBITION) that blends into the dark navy background. First-time mobile users cannot discover these tabs exist. This was identified by Ir. Nigel T. Dearden on 27 March 2026 as a critical UX failure.

## Required Treatment

The following UX-001 patterns must be applied to the Memorial site in a separate project task:

### Pattern 1: LABEL (ORIENT) on Tab Bar

The tab bar needs a one-time discovery label that reads "TAP TO SWITCH SECTIONS" positioned directly above or below the tabs. The label should use the gold accent color (#ffd700) with a semi-transparent backdrop blur background. It must auto-dismiss after 5 seconds or on first tab interaction, whichever comes first.

### Pattern 2: PULSE (ANNOUNCE) on Active Tab

The currently active tab should receive a subtle gold ring pulse animation on first visit to draw attention to the tab bar's existence. The animation should use a box-shadow pulse from transparent to gold/30 opacity, cycling at 1.5 second intervals.

### Pattern 3: HOW TO NAVIGATE Overlay

A 3-second full-screen overlay should appear on first mobile visit showing the tab bar location, the hamburger menu (if present), and the scroll direction. The overlay must include a SKIP TOUR button for power users.

## Implementation Rules

All implementations must follow the 6 rules from the UX-001 spec: one-time only (localStorage), auto-dismiss (timeout), mobile-only (max-width: 768px), no recurring CTAs, subtle (pointer-events: none on labels), and dismiss on interaction (once: true event listeners).

## CSS Reference

Copy the discovery hint CSS from the ACAD site's `/css/style.css` (lines 760-850 approximately) and the shared `/js/discovery-hints.js` pattern. Adapt element selectors to match the Memorial site's DOM structure.

## Compliance

This brief is SAP-001 compliant. The treatment must be verified against the UX-001 audit checklist before deployment.

---

Block 415 | 27 March 2026 | Ir. Nigel T. Dearden CEng
Per Arya Ad Astra
