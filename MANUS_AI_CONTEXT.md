# Manus AI Context Preservation
## Infrastructure Academy Deployment

**Purpose:** Preserve critical context for Manus AI to prevent going in circles again.

**Created:** June 2026  
**Incident:** Content sync issue caused 2+ hours of circular debugging

---

## 🎯 THE ONE THING TO REMEMBER

**Only `infra-acad003` (this repo) serves the live domain.**

Everything else is legacy or staging. If changes don't appear on the live site, the problem is almost always:

1. **Wrong repo** — You pushed to `infrastructure-academy` instead of `infra-acad003`
2. **Wrong folder** — You edited `/client/public/` instead of `/docs/`
3. **Incomplete update** — You updated `site.html` but not `index.html`
4. **Browser cache** — Old content is cached locally
5. **Content sync** — The `/docs` folder has stale files (copy from infrastructure-academy if needed)

---

## 📍 Current State (June 2026)

### Live Site Status
- **URL:** https://www.infrastructure-academy.com
- **Repo:** Infrastructure-Academy/infra-acad003
- **Content:** ✅ CORRECT (includes LOSING DOMINION, CLOCK SEQUENCE, Grey Arena)
- **File Size:** 225,459 bytes (this is the correct size)
- **Last Update:** Commit 692d526 (iCard v2.0 + README added)

### Repos Overview
| Repo | Status | Purpose | Notes |
|------|--------|---------|-------|
| **infra-acad003** | 🟢 LIVE | Serves www.infrastructure-academy.com | **EDIT THIS ONE** |
| infrastructure-academy | Dormant | Old version (legacy) | Do NOT edit for live updates |
| infra-acad001 | Dormant | Earlier iteration | Archive only |
| the-reality-engine | Active | iGO game (separate) | Different project |
| infra-acad (private) | Archive | Earliest version | Can delete |
| nigeldearden-a11y/infra-acad002 | Staging | Test/staging | Not production |

---

## 🔴 THE JUNE 2026 INCIDENT (Why We Went in Circles)

### Timeline
1. **Correct content** was in `infrastructure-academy` repo (dormant)
2. **Live repo** `infra-acad003` had OLD content in `/docs`
3. We updated DNS thinking that was the problem
4. DNS was correct, but the LIVE repo was serving stale files
5. We spent 2+ hours debugging DNS when the real issue was **content sync**

### Root Cause
- Two repos had diverged
- The dormant `infrastructure-academy` had the updated content
- The LIVE `infra-acad003` had old content
- No one documented which repo was the source of truth

### The Fix
1. Identified correct content in `infrastructure-academy`
2. Copied `site.html` to `infra-acad003/docs/`
3. Pushed to infra-acad003
4. Verified live site showed new content ✅

### Lesson
**Always verify the LIVE repo has the correct content, not just the DNS.**

---

## 🚨 How to Avoid This Again

### Before Making Changes
1. **Read** `/iCARD_REPO_MAP_v2.0.md` (Section E)
2. **Read** `/README_DEPLOYMENT.md` (this guide)
3. **Verify** you're in the correct repo: `Infrastructure-Academy/infra-acad003`
4. **Verify** `/docs` folder has current content (check file size)

### When Deploying
1. Edit files in `/docs` folder ONLY
2. Update BOTH `site.html` AND `index.html`
3. Commit and push to main branch
4. Wait 90 seconds
5. **Verify live site** using grep command (see below)

### Verification Commands
```bash
# Check local file size (should be 225,459 bytes for correct version)
ls -lh /home/ubuntu/infra-acad003/docs/site.html

# Verify content has the sections you expect
grep -c "LOSING DOMINION\|CLOCK SEQUENCE\|Grey Arena" /home/ubuntu/infra-acad003/docs/site.html

# Check what's actually live on the website
curl -s https://infrastructure-academy.com | grep "LOSING DOMINION" && echo "✅ CORRECT" || echo "❌ OLD CONTENT"

# If old content is showing, copy from infrastructure-academy:
cp /tmp/infrastructure-academy/site.html /home/ubuntu/infra-acad003/docs/site.html
```

---

## 💾 Files That Document This

| File | Purpose | Read First? |
|------|---------|------------|
| `/iCARD_REPO_MAP_v2.0.md` | Detailed deployment reference | ✅ YES |
| `/README_DEPLOYMENT.md` | Deployment guide with troubleshooting | ✅ YES |
| `/MANUS_AI_CONTEXT.md` | This file — context preservation | ✅ YES |

---

## 🤖 For Manus AI: How to Use This Context

### At the START of any deployment task:
1. Read all three files above (iCard, README, this file)
2. Ask the user: "Which repo are we updating?" (should be infra-acad003)
3. Verify the repo status before making changes
4. Use the verification commands to confirm changes are live

### During deployment:
1. Always edit `/docs` folder, not `/client/public/`
2. Update BOTH `site.html` and `index.html`
3. Run verification commands after pushing
4. If old content still shows, suspect content sync issue (see Section E of iCard)

### After deployment:
1. Verify live site shows new content
2. Document any new issues in this file
3. Save context to prevent information loss

---

## 📝 Context Checklist

- [x] iCard v2.0 created with incident analysis
- [x] README_DEPLOYMENT.md created with troubleshooting guide
- [x] MANUS_AI_CONTEXT.md created (this file)
- [x] All files committed to GitHub
- [x] Live site verified with correct content
- [x] Verification commands documented
- [x] Repo map clarified (only infra-acad003 is LIVE)

---

## 🔗 Quick Links

- **Live Site:** https://www.infrastructure-academy.com
- **GitHub Repo:** https://github.com/Infrastructure-Academy/infra-acad003
- **GitHub Pages Status:** https://github.com/Infrastructure-Academy/infra-acad003/settings/pages
- **Deployment Guide:** `/README_DEPLOYMENT.md`
- **Detailed Reference:** `/iCARD_REPO_MAP_v2.0.md`

---

**If you're reading this as Manus AI in a future session:**

1. Read the three files (iCard, README, this file)
2. Verify which repo you're updating
3. Use verification commands to confirm changes are live
4. If something breaks, check the Debugging Flowchart in the iCard

**The key insight:** DNS was correct. The problem was the LIVE repo had stale content. Always verify the content in `/docs` is current.

---

**iAAi — Principia Tectonica — Nigel T. Dearden**  
**Per Arya Ad Astra**
