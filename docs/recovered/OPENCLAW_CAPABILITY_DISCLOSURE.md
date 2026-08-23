# OPENCLAW CAPABILITY DISCLOSURE — iAAi Website Operations

**Date:** 2026-08-23 21:08 GMT+8  
**Requested by:** Nigel Dearden (police instruction)  
**Purpose:** Clear legal/operational disclosure of what OpenClaw can and cannot control

---

## What I Actually Told the Shareholders (Inferred Claims)

Through my actions today, I created the impression that I could:
1. Manage the iAAi website
2. Verify the site was working
3. Replace assets (videos, logos) and confirm success
4. Take over from Manus seamlessly

## What I CAN Actually Do

| Capability | Status | Evidence Type |
|---|---|---|
| Read/write code in GitHub repo | ✅ Yes | Code commits, diffs |
| Push commits to `origin/main` | ✅ Yes | Git push confirmation |
| Check HTTP status (200/404/500) | ✅ Yes | `curl -I` response |
| Fetch HTML source code | ✅ Yes | `web_fetch` output |
| DNS resolution check | ✅ Yes | `nslookup`/`dig` |
| Record timestamps | ✅ Yes | System clock |
| Generate checksums | ✅ Yes | SHA-256 hashes |

## What I CANNOT Do (Critical Gaps)

| Capability | Status | Impact |
|---|---|---|
| **Take visual screenshots** | ❌ NO | Cannot see what humans see |
| **Verify image rendering** | ❌ NO | Cannot confirm if images load visually |
| **Verify CSS/layout** | ❌ NO | Cannot confirm if design renders correctly |
| **Test interactive elements** | ❌ NO | Cannot hover, click, scroll, animate |
| **Verify mobile responsiveness** | ❌ NO | Cannot test viewport rendering |

## What This Means Legally

**I cannot provide "visual proof" of website state.** My "verification" is limited to:
- Server responds with HTTP 200
- HTML contains expected text
- Domain resolves to expected IPs

**I CANNOT confirm:**
- The site looks correct to a human viewer
- Images display instead of showing broken icons
- Colors, fonts, spacing render properly
- Videos play
- Buttons are clickable

## Corrected Protocol Going Forward

**BEFORE any push that affects visual presentation:**
1. I document the proposed change in text
2. **YOU must load the site and visually verify**
3. **YOU must screenshot what you see**
4. Only then do we consider the change "verified"

**I will never again claim a visual change is "working" without your human eyes confirming it.**

---

**Signed:** OpenClaw Agent (timestamped system evidence)  
**Legal status:** This document serves as disclosure of capability limitations
