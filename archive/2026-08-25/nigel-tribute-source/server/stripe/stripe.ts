/**
 * Stripe Service — Server-side Stripe operations
 * Handles checkout sessions, subscription management, and webhook processing.
 */
import Stripe from "stripe";
import { PRODUCTS, type ProductKey } from "./products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia" as any,
});

export { stripe };

/**
 * Create or retrieve a Stripe customer for a user
 */
export async function getOrCreateCustomer(userId: number, email: string, name: string | null): Promise<string> {
  // Search for existing customer by metadata
  const existing = await stripe.customers.list({
    limit: 1,
    email: email,
  });

  if (existing.data.length > 0) {
    return existing.data[0].id;
  }

  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: {
      userId: userId.toString(),
    },
  });

  return customer.id;
}

/**
 * Create a Stripe Checkout Session for a subscription
 */
export async function createSubscriptionCheckout(
  productKey: ProductKey,
  userId: number,
  email: string,
  name: string | null,
  origin: string,
): Promise<string> {
  const product = PRODUCTS[productKey];
  if (!product) throw new Error(`Unknown product: ${productKey}`);

  const customerId = await getOrCreateCustomer(userId, email, name);

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    customer: customerId,
    client_reference_id: userId.toString(),
    allow_promotion_codes: true,
    metadata: {
      user_id: userId.toString(),
      customer_email: email,
      customer_name: name || "",
      product_key: productKey,
    },
    success_url: `${origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/subscription/cancel`,
  };

  if (product.interval) {
    // Subscription product
    sessionParams.mode = "subscription";
    sessionParams.line_items = [
      {
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceAmount,
          recurring: {
            interval: product.interval,
          },
        },
        quantity: 1,
      },
    ];
  } else {
    // One-time purchase
    sessionParams.mode = "payment";
    sessionParams.line_items = [
      {
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceAmount,
        },
        quantity: 1,
      },
    ];
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  return session.url!;
}

/**
 * Check if a customer has an active subscription
 */
export async function hasActiveSubscription(customerId: string): Promise<boolean> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
    limit: 1,
  });
  return subscriptions.data.length > 0;
}

/**
 * Get subscription details for a customer
 */
export async function getSubscriptionDetails(customerId: string): Promise<Stripe.Subscription | null> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
    limit: 1,
  });
  return subscriptions.data[0] || null;
}

/**
 * Create a customer portal session for managing subscriptions
 */
export async function createPortalSession(customerId: string, origin: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/subscription`,
  });
  return session.url;
}
