# iCARD: GITHUB REPO MAP v2.0
## Deployment Guide for www.infrastructure-academy.com

**Last Updated:** June 2026  
**Critical Issue Fixed:** Content sync between repos — see Section E

---

## A. REPOSITORY STRUCTURE
### Which repo does what

| # | Repo | Status | Function | CNAME |
|---|------|--------|----------|-------|
| 1 | **infra-acad003** | 🟢 LIVE | Serves www.infrastructure-academy.com via GitHub Pages from /docs folder | `infrastructure-academy.com` |
| 2 | infrastructure-academy | Dormant | Old version. Pages enabled but no custom domain. Not serving production. | None |
| 3 | infra-acad001 | Dormant | Earlier iteration. Not live. | None |
| 4 | the-reality-engine | Active | iGO game component — tri-mode learning platform (separate) | None |
| 5 | infra-acad (private) | Archive | Earliest version. Can be deleted. | None |
| 6 | nigeldearden-a11y/infra-acad002 | Staging | Serves .github.io subdomain only. Not production. | None |

**CRITICAL RULE:** Only infra-acad003 feeds the live domain. All others are legacy.

---

## B. DEPLOYMENT STEPS
### How to push updates to www.infrastructure-academy.com

1. Clone: `gh repo clone Infrastructure-Academy/infra-acad003`
2. Edit files in `/docs` folder (this is the GitHub Pages source)
3. **Key files:** `docs/site.html` and `docs/index.html`
4. Commit: `git add -A && git commit -m "description"`
5. Push: `git push origin main`
6. Wait 60-90 seconds for GitHub Pages rebuild
7. Verify: `curl https://infrastructure-academy.com` or visit in browser

---

## C. CRITICAL RULES

### ⚠️ GOLDEN RULES (DO NOT BREAK)
- **NEVER** edit `client/public/` expecting it to go live — Pages serves from `/docs` only
- **CNAME file** in repo root binds the custom domain (`infrastructure-academy.com`)
- **GitHub Pages config:** Branch = main, Path = /docs
- **BOTH** `docs/site.html` AND `docs/index.html` must be updated (index.html is the entry point)
- **CDN cache** may take 60-90 seconds to clear after push

### 🔍 VERIFICATION CHECKLIST
After pushing changes:
1. Check GitHub repo shows new commit on main branch
2. Wait 90 seconds for Pages rebuild
3. Visit `https://infrastructure-academy.com` in fresh browser (hard refresh: Ctrl+Shift+R)
4. Search for specific new content keyword (e.g., "LOSING DOMINION", "CLOCK SEQUENCE")
5. If old content still shows, check browser cache and GitHub Pages build status

---

## D. COMMON MISTAKES (LEARNED THE HARD WAY)

### ❌ Mistake 1: Pushing to wrong repo
- **Wrong:** Pushing to `Infrastructure-Academy/infrastructure-academy` (no custom domain)
- **Wrong:** Pushing to `nigeldearden-a11y/infra-acad002` (staging only)
- **Correct:** Push to `Infrastructure-Academy/infra-acad003` (the LIVE repo)

### ❌ Mistake 2: Editing only site.html, not index.html
- GitHub Pages uses `index.html` as the entry point
- If you update `site.html` but not `index.html`, changes won't appear
- **Always update BOTH files in /docs/**

### ❌ Mistake 3: Thinking DNS is the problem when it's content sync
- **The real issue we discovered:** The LIVE repo (infra-acad003) had OLD content in /docs
- The correct updated content was in the dormant `infrastructure-academy` repo
- DNS was correctly pointing to infra-acad003, but it was serving stale content
- **Solution:** Copy the correct site.html from infrastructure-academy to infra-acad003/docs/

### ❌ Mistake 4: Not clearing browser cache
- GitHub Pages rebuilds quickly, but browsers cache aggressively
- Always do a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
- Or open in incognito/private mode to bypass cache

### ❌ Mistake 5: Forgetting to trigger rebuild
- After pushing, GitHub Pages doesn't always rebuild immediately
- If changes don't appear after 90 seconds, manually trigger rebuild via API:
  ```bash
  curl -X POST -H "Authorization: token YOUR_PAT" \
    https://api.github.com/repos/Infrastructure-Academy/infra-acad003/pages/builds \
    -H "Accept: application/vnd.github.v3+json"
  ```

---

## E. THE CONTENT SYNC ISSUE (JUNE 2026 INCIDENT)

### What Happened
1. We updated the `infrastructure-academy` repo with new content (LOSING DOMINION, CLOCK SEQUENCE, Grey Arena)
2. We thought we fixed the live site by updating DNS
3. **But the live site (infra-acad003) still showed OLD content**
4. We went in circles for hours thinking DNS was wrong

### Root Cause
- The correct updated content was in `infrastructure-academy` repo (dormant)
- The LIVE repo `infra-acad003` had the OLD content in its `/docs` folder
- DNS was correctly pointing to infra-acad003, but it was serving stale files
- **The two repos had diverged — they were out of sync**

### The Fix
1. Cloned the `infrastructure-academy` repo (which had correct content)
2. Copied `site.html` from infrastructure-academy to infra-acad003/docs/
3. Committed and pushed to infra-acad003
4. Triggered GitHub Pages rebuild
5. Live site now shows correct content ✅

### How to Prevent This
- **Keep only ONE repo as the source of truth** — infra-acad003 is LIVE
- **Never edit the dormant infrastructure-academy repo** — it's legacy
- **If you need to copy content from infrastructure-academy, always verify the file size and content keywords** before pushing
- **Always verify live site shows new content** before declaring victory

### Verification Commands
```bash
# Check file size (should be 225459 bytes for the correct version)
ls -lh /home/ubuntu/infra-acad003/docs/site.html

# Verify content has the new sections
grep -c "LOSING DOMINION\|CLOCK SEQUENCE\|Grey Arena" /home/ubuntu/infra-acad003/docs/site.html

# Check what's actually live
curl -s https://infrastructure-academy.com | grep "LOSING DOMINION" && echo "✅ CORRECT CONTENT LIVE" || echo "❌ OLD CONTENT STILL SHOWING"
```

---

## F. DEBUGGING FLOWCHART

```
Changes not showing on live site?
│
├─ Step 1: Did you push to infra-acad003 (not infrastructure-academy)?
│  └─ If NO → Push to correct repo
│
├─ Step 2: Did you update BOTH docs/site.html AND docs/index.html?
│  └─ If NO → Update both files
│
├─ Step 3: Did you wait 90 seconds for GitHub Pages rebuild?
│  └─ If NO → Wait and check again
│
├─ Step 4: Did you hard refresh browser cache (Ctrl+Shift+R)?
│  └─ If NO → Hard refresh or use incognito mode
│
├─ Step 5: Does GitHub show your commit on main branch?
│  └─ If NO → Check git push succeeded
│
├─ Step 6: Search live site for specific new content keyword
│  └─ If NOT FOUND → Content sync issue (see Section E)
│     └─ Copy correct site.html from infrastructure-academy to infra-acad003/docs/
│     └─ Commit, push, rebuild, verify
│
└─ Step 7: Still broken? Check GitHub Pages build status in repo settings
```

---

## G. MANUS AI MEMORY ISSUE

### The Problem
- Manus AI (this agent) has context limitations and can lose track of which repo is the source of truth
- When working with multiple repos (infra-acad003, infrastructure-academy, infra-acad001, etc.), I can get confused about which one is LIVE
- This led to the June 2026 incident where we went in circles for hours

### How to Work Around This
1. **Always reference this iCard v2.0** at the start of any deployment task
2. **Explicitly state:** "We are updating infra-acad003 (the LIVE repo)"
3. **Ask me to verify:** "Which repo should we push to?" before I start
4. **Save context to files:** Any critical findings should be written to README or this iCard
5. **Use verification commands** (see Section F) to prove changes are live before declaring success

### What I Should Do
- Read this iCard at the START of every deployment task
- Verify repo status before making changes
- Run verification commands to confirm changes are actually live
- Document any new issues discovered in this iCard for future reference

---

## H. QUICK REFERENCE

### File Locations
- **Live source:** `/home/ubuntu/infra-acad003/docs/site.html` and `docs/index.html`
- **Repo:** `Infrastructure-Academy/infra-acad003` (main branch)
- **Custom domain:** `infrastructure-academy.com`
- **GitHub Pages URL:** `infrastructure-academy.github.io/infra-acad003/`

### Critical Commands
```bash
# Clone the LIVE repo
gh repo clone Infrastructure-Academy/infra-acad003

# Check file size
ls -lh /home/ubuntu/infra-acad003/docs/site.html

# Verify content
grep "LOSING DOMINION" /home/ubuntu/infra-acad003/docs/site.html

# Commit and push
cd /home/ubuntu/infra-acad003
git add -A
git commit -m "Update: [description]"
git push origin main

# Trigger rebuild (if needed)
curl -X POST -H "Authorization: token YOUR_PAT" \
  https://api.github.com/repos/Infrastructure-Academy/infra-acad003/pages/builds \
  -H "Accept: application/vnd.github.v3+json"

# Verify live
curl -s https://infrastructure-academy.com | grep "LOSING DOMINION"
```

---

**iAAi — Principia Tectonica — Nigel T. Dearden**  
**Per Arya Ad Astra**
