/**
 * iAAi Stripe Backend — Cloudflare Worker
 * Free tier: 100,000 requests/day
 * 
 * SETUP INSTRUCTIONS (3 steps):
 * 1. Go to workers.cloudflare.com → Create Service → name it "iaai-payment"
 * 2. Settings tab → Variables → Add "STRIPE_SECRET_KEY" ← paste your secret key, CHECK Encrypt
 * 3. Overview tab → Edit code → paste this ENTIRE file → Deploy
 * 
 * Your worker URL will be: https://iaai-payment.YOURNAME.workers.dev
 */

export default {
  async fetch(request, env, ctx) {
    // CORS: allow your website
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://infrastructure-academy.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, corsHeaders);
    }

    try {
      const body = await request.json();
      const { token, email, name, amount_hkd = 1 } = body;

      if (!token || !token.id) {
        return jsonResponse({ error: 'No payment token provided' }, 400, corsHeaders);
      }

      const STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;
      if (!STRIPE_SECRET_KEY) {
        return jsonResponse({ error: 'Server misconfigured: missing Stripe key' }, 500, corsHeaders);
      }

      // 1. Create or find customer
      const customerRes = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email || 'no-email@infrastructure-academy.com',
          name: name || 'iAAi Enrollee',
          description: 'iAAi Infrastructure Academy enrollment',
        }),
      });

      const customer = await customerRes.json();
      if (customer.error) throw new Error(customer.error.message);

      // 2. Create charge / PaymentIntent
      const chargeRes = await fetch('https://api.stripe.com/v1/charges', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          amount: (amount_hkd * 100).toString(),
          currency: 'hkd',
          source: token.id,
          description: `iAAi enrollment - ${name || 'anonymous'}`,
          receipt_email: email || undefined,
          customer: customer.id,
        }),
      });

      const charge = await chargeRes.json();
      if (charge.error) throw new Error(charge.error.message);

      return jsonResponse({
        success: true,
        charge_id: charge.id,
        amount: charge.amount / 100,
        currency: charge.currency.toUpperCase(),
        receipt_url: charge.receipt_url,
        message: 'Payment successful. Welcome to iAAi.',
      }, 200, corsHeaders);

    } catch (err) {
      return jsonResponse({
        success: false,
        error: err.message,
      }, 400, corsHeaders);
    }
  }
};

function jsonResponse(data, status = 200, cors = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...cors,
    },
  });
}
