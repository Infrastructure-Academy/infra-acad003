# iAAi Stripe Live Payment — Deployment Guide
## For Nigel Dearden — Zero-Code Deploy

---

## YOU HAVE TWO OPTIONS

### OPTION A: Stripe Payment Link (EASIEST — 5 minutes)
**No backend. No code. Stripe handles everything.**

1. Open dashboard.stripe.com on your laptop (already logged in)
2. Switch from "Test" to **"Live"** mode (toggle top right)
3. Left sidebar → **Products** → **Add product**
4. Name: `iAAi Practitioner Course`
5. Price: `HKD 1,950`
6. Click **"Create Payment Link"**
7. Copy the URL (starts with `https://buy.stripe.com/...`)
8. Go to your website's `index.html` on GitHub
9. Add a link/button pointing to that URL
10. Done. Real payments immediately.

---

### OPTION B: Custom Branded Checkout (15 minutes)
**Your branding. Your domain. Cloudflare handles the charge.**

#### STEP 1: Create Cloudflare Worker
1. Open **workers.cloudflare.com**
2. Sign up (free, use your email)
3. Click **"Create a Service"**
4. Name it: `iaai-payment`
5. Click **Deploy**

#### STEP 2: Add Your Secret Key
1. Click the **"Settings"** tab
2. Click **"Variables"**
3. Click **"Add variable"**
4. Name: `STRIPE_SECRET_KEY`
5. Value: [see file `.env.production.local` on your laptop]
6. **CHECK the "Encrypt" box** (🔒)
7. Click **Save**

#### STEP 3: Paste Backend Code
1. Go back to **"Overview"** tab
2. Click **"Edit code"**
3. Delete everything in the editor
4. Open this file from your laptop: `deploy/stripe-worker.js`
5. Copy ALL of it
6. Paste into the Cloudflare editor
7. Click **Deploy**

#### STEP 4: Get Worker URL
- Your worker now has a URL like:
  `https://iaai-payment.nigel.workers.dev`
- Copy this URL

#### STEP 5: Update Frontend
1. Open this file on your laptop: `pages/stripe-live-payment.html`
2. Find the line: `const WORKER_URL = 'https://iaai-payment.YOURNAME.workers.dev';`
3. Replace `iaai-payment.YOURNAME.workers.dev` with your actual URL
4. Save

#### STEP 6: Upload to GitHub
1. Open github.com/Infrastructure-Academy/infra-acad003
2. Click **"Add file" → "Create new file"**
3. Name: `pages/stripe-live-payment.html`
4. Copy ALL the contents of the file from Step 5
5. Scroll down, type: "Add Stripe payment page"
6. Click **"Commit new file"**

#### STEP 7: Test
1. Wait 1 minute for GitHub Pages to update
2. Open: `https://infrastructure-academy.com/pages/stripe-live-payment.html`
3. Fill in name, email, card details
4. Click Pay
5. Check Stripe Dashboard → Payments — you should see HKD $1.00 ✅

---

## FILES INCLUDED IN THIS PACKAGE

| File | Purpose |
|------|---------|
| `deploy/stripe-worker.js` | Cloudflare Worker backend |
| `pages/stripe-live-payment.html` | Branded payment frontend |
| `.env.production.local` | LIVE keys (DELETE AFTER DEPLOYING) |
| `DEPLOY_GUIDE.md` | This guide |

---

## CRITICAL: After Deploying

1. **Rotate your Stripe secret key again** (dashboard → Developers → API keys → "Roll key")
2. **Delete `.env.production.local`** from your laptop (it has the key in plaintext)
3. **Update Cloudflare Worker** with the new key (Step 2 above)
4. The publishable key (`pk_live_...`) is safe to keep — it's designed to be public

This ensures the key in this file package is dead and can never be used, even if the file leaks.

---

## TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "Server misconfigured" | Secret key not added to Cloudflare Worker (Step 2) |
| "No payment token" | Card not filled in or declined |
| "Invalid API Key" | Wrong key pasted in Cloudflare — copy from `.env.production.local` |
| Page not appearing | Wait 2 minutes for GitHub Pages, then hard-refresh (Ctrl+F5) |
| Can't log into GitHub | Use laptop browser — you're already logged in there |

---

## SUPPORT

If stuck, send me:
1. A screenshot of the error
2. Which step you got to
3. What you clicked

I'll get you through it.

---

iAAi COUNTERFORCE v67 — © 2026 — OpenClaw Agent
