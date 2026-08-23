# iAAi Stripe Live Deployment — Step by Step
## Zero-code deployment guide for Nigel

---

## WHAT YOU NEED

1. **Stripe live secret key** (starts with `sk_live_`)
   - Get it from: dashboard.stripe.com → Developers → API keys
2. **~10 minutes**
3. **No coding required**

---

## PART 1: Cloudflare Worker (Free Backend)

### Step 1: Create Cloudflare account
- Go to **workers.cloudflare.com**
- Sign up with your email (free tier = 100,000 requests/day)
- You don't need a domain

### Step 2: Create Worker
- Dashboard → **Workers & Pages** → **Create**
- Click **"Create a Service"**
- Name it: `iaai-stripe-worker`
- Click **Deploy**

### Step 3: Add your secret key
- Click **Settings** tab → **Variables**
- Click **Add variable**
- Name: `STRIPE_SECRET_KEY`
- Value: [paste your full `sk_live_...` key here]
- Check **Encrypt** (🔒)
- Click **Save**

### Step 4: Paste backend code
- Go back to **Overview** tab → click **Edit code**
- DELETE everything in the editor
- Copy ALL the code from the file `deploy/stripe-worker.js` (attached)
- PASTE it into the editor
- Click **Deploy**

### Step 5: Get your worker URL
- The worker now has a URL like:
  `https://iaai-stripe-worker.YOURNAME.workers.dev`
- Copy this URL — you'll need it for the frontend

---

## PART 2: Add Payment Page to Your Website (GitHub)

### Step 1: Get the frontend file
- File: `pages/stripe-live-payment.html` (attached)
- Open it in any text editor

### Step 2: Update the worker URL
- Find this line near the bottom:
  ```javascript
  const response = await fetch('https://iaai-stripe-worker.YOUR_SUBDOMAIN.workers.dev/charge', {
  ```
- Replace `iaai-stripe-worker.YOUR_SUBDOMAIN.workers.dev` with your actual worker URL from Part 1
- **Save the file**

### Step 3: Upload to GitHub
- Go to **github.com/Infrastructure-Academy/infra-acad003**
- Click **"Add file" → "Create new file"**
- Name: `pages/stripe-live-payment.html`
- Paste the ENTIRE contents of the edited file
- Scroll down, type commit message: "Add live Stripe payment page"
- Click **Commit new file**

### Step 4: Wait 1 minute
- GitHub Pages will auto-deploy
- Your payment page will be at:
  `https://infrastructure-academy.com/pages/stripe-live-payment.html`

---

## PART 3: Test the $1 Payment

1. Open your payment page in a browser
2. Fill in name, email, card details
3. Click **"Pay HKD $1.00"**
4. Check Stripe Dashboard → Payments
5. You should see a HKD $1.00 charge ✅

---

## IF SOMETHING GOES WRONG

| Problem | Fix |
|---------|-----|
| "No payment token" | Card details weren't entered correctly |
| "Invalid API Key" | Secret key in Cloudflare is wrong or missing |
| "Network error" | Worker URL in frontend is wrong |
| Page not appearing | GitHub Pages takes 1-2 minutes to deploy |

---

## FILES INCLUDED IN THIS PACKAGE

- `deploy/stripe-worker.js` — Cloudflare Worker backend
- `pages/stripe-live-payment.html` — Branded payment frontend
- This guide

---

**Total time: ~10 minutes**
**Total cost: $0**
**Result: Real payments flowing to your Stripe account**

---

iAAi COUNTERFORCE v67 — © 2026
