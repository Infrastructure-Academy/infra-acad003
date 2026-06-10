# Infrastructure Academy — Deployment Guide
## www.infrastructure-academy.com

**Repository:** `Infrastructure-Academy/infra-acad003`  
**Status:** 🟢 LIVE  
**Last Updated:** June 2026

---

## 🚀 Quick Start

This repository serves the live website at `https://www.infrastructure-academy.com` via GitHub Pages.

### To make changes:
1. Edit files in the `/docs` folder
2. Commit and push to main branch
3. Wait 60-90 seconds for GitHub Pages rebuild
4. Verify at https://www.infrastructure-academy.com

---

## 📋 Important Files

| File | Purpose | Location |
|------|---------|----------|
| `docs/site.html` | Main content page | `/docs/site.html` |
| `docs/index.html` | Entry point (must match site.html) | `/docs/index.html` |
| `CNAME` | Custom domain binding | `/CNAME` |
| `iCARD_REPO_MAP_v2.0.md` | Deployment reference (READ THIS FIRST) | `/iCARD_REPO_MAP_v2.0.md` |

---

## ⚠️ CRITICAL: Read Before Deploying

**This repository has a history of content sync issues.** Before making any changes:

1. **Read** `/iCARD_REPO_MAP_v2.0.md` (Section E explains the June 2026 incident)
2. **Verify** you're editing the correct repo (`infra-acad003` is LIVE, not `infrastructure-academy`)
3. **Update BOTH** `docs/site.html` AND `docs/index.html`
4. **Test locally** if possible before pushing
5. **Verify live** using the commands in Section F of the iCard

---

## 🔍 Verification Checklist

After pushing changes, verify they're actually live:

```bash
# 1. Check file was updated locally
ls -lh /home/ubuntu/infra-acad003/docs/site.html

# 2. Verify content has your changes
grep "YOUR_NEW_KEYWORD" /home/ubuntu/infra-acad003/docs/site.html

# 3. Wait 90 seconds for rebuild
sleep 90

# 4. Check live site has the content
curl -s https://infrastructure-academy.com | grep "YOUR_NEW_KEYWORD" && echo "✅ SUCCESS" || echo "❌ FAILED"
```

---

## 🐛 Troubleshooting

### Changes not showing?

1. **Hard refresh browser** (Ctrl+Shift+R or Cmd+Shift+R)
2. **Use incognito/private mode** to bypass cache
3. **Check GitHub repo** shows your commit on main branch
4. **Wait another 90 seconds** — Pages rebuild can be slow
5. **Verify file was actually updated** — check file size and content with grep

### Still not working?

See the **Debugging Flowchart** in `/iCARD_REPO_MAP_v2.0.md` Section F

---

## 📚 Repository Map

This is one of 6 related repositories:

| Repo | Status | Purpose |
|------|--------|---------|
| **infra-acad003** | 🟢 LIVE | **This repo — serves www.infrastructure-academy.com** |
| infrastructure-academy | Dormant | Old version (legacy — do not edit) |
| infra-acad001 | Dormant | Earlier iteration (legacy) |
| the-reality-engine | Active | iGO game component (separate project) |
| infra-acad (private) | Archive | Earliest version (can be deleted) |
| nigeldearden-a11y/infra-acad002 | Staging | Test/staging only (not production) |

**IMPORTANT:** Only this repo (infra-acad003) feeds the live domain. Do not push to other repos expecting changes to appear on the live site.

---

## 🔐 GitHub Pages Configuration

- **Branch:** main
- **Path:** /docs
- **Custom Domain:** infrastructure-academy.com (via CNAME file)
- **HTTPS:** Enabled automatically

---

## 📝 Deployment Steps (Detailed)

### 1. Clone the repository
```bash
gh repo clone Infrastructure-Academy/infra-acad003
cd infra-acad003
```

### 2. Make your changes
Edit files in the `/docs` folder:
- `docs/site.html` — Main content
- `docs/index.html` — Entry point

**CRITICAL:** Update BOTH files. index.html is the entry point that GitHub Pages loads first.

### 3. Commit your changes
```bash
git add -A
git commit -m "Update: [describe your changes]"
```

### 4. Push to GitHub
```bash
git push origin main
```

### 5. Wait for rebuild
GitHub Pages takes 60-90 seconds to rebuild. You can check the status:
- Go to repo → Settings → Pages → Build status

### 6. Verify live site
```bash
# Option 1: Search for specific content
curl -s https://infrastructure-academy.com | grep "YOUR_NEW_KEYWORD"

# Option 2: Visit in browser
# Hard refresh (Ctrl+Shift+R) to bypass cache
https://infrastructure-academy.com
```

---

## 🚨 The June 2026 Content Sync Issue

### What Happened
We pushed updates to the wrong repo and spent hours debugging DNS when the real issue was content sync.

### Root Cause
- The correct content was in the `infrastructure-academy` repo (dormant)
- The LIVE repo (`infra-acad003`) had old content in `/docs`
- DNS was correct, but the LIVE repo was serving stale files

### How We Fixed It
1. Identified the correct content in `infrastructure-academy` repo
2. Copied `site.html` to `infra-acad003/docs/`
3. Pushed to infra-acad003
4. Verified live site showed new content

### How to Prevent This
- **Always push to infra-acad003** (the LIVE repo)
- **Never edit infrastructure-academy** (it's legacy)
- **Always verify content is actually live** before declaring success
- **Use grep to check for specific keywords** in both local files and live site

---

## 🤖 Manus AI Memory Note

If you're working with Manus AI on deployment tasks:

1. **Start by reading** `/iCARD_REPO_MAP_v2.0.md`
2. **Explicitly state** which repo you're updating
3. **Ask me to verify** repo status before changes
4. **Use verification commands** to confirm changes are live
5. **Save findings to this README** for future reference

The AI can lose context about which repo is LIVE, so explicit verification is critical.

---

## 📞 Quick Reference

### File Locations
```
/home/ubuntu/infra-acad003/
├── docs/
│   ├── site.html          ← Main content (UPDATE THIS)
│   ├── index.html         ← Entry point (UPDATE THIS TOO)
│   └── ...
├── CNAME                  ← Custom domain binding
├── README_DEPLOYMENT.md   ← This file
└── iCARD_REPO_MAP_v2.0.md ← Detailed reference (READ FIRST)
```

### Critical Commands
```bash
# Verify local file
ls -lh /home/ubuntu/infra-acad003/docs/site.html

# Check content
grep "LOSING DOMINION" /home/ubuntu/infra-acad003/docs/site.html

# Push changes
cd /home/ubuntu/infra-acad003 && git add -A && git commit -m "Update" && git push origin main

# Verify live
curl -s https://infrastructure-academy.com | grep "LOSING DOMINION"
```

---

**iAAi — Principia Tectonica — Nigel T. Dearden**  
**Per Arya Ad Astra**
