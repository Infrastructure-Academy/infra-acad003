/**
 * Stripe Webhook Handler
 * Processes payment events from Stripe and updates user subscription status.
 */
import type { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "./stripe";
import * as db from "../db";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).json({ error: "Missing stripe-signature header" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`[Webhook] Signature verification failed: ${err.message}`);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const customerId = session.customer as string;

        if (userId && customerId) {
          await db.updateUserStripeCustomerId(parseInt(userId), customerId);

          if (session.mode === "subscription" && session.subscription) {
            await db.updateUserSubscription(
              parseInt(userId),
              session.subscription as string,
            );
            console.log(`[Webhook] Subscription activated for user ${userId}`);
          }

          if (session.mode === "payment") {
            // One-time purchase — record the payment intent
            console.log(`[Webhook] One-time payment completed for user ${userId}`);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const user = await db.getUserByStripeCustomerId(customerId);

        if (user) {
          if (subscription.status === "active") {
            await db.updateUserSubscription(user.id, subscription.id);
          } else if (["canceled", "unpaid", "past_due"].includes(subscription.status)) {
            await db.clearUserSubscription(user.id);
          }
          console.log(`[Webhook] Subscription ${subscription.status} for user ${user.id}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const user = await db.getUserByStripeCustomerId(customerId);

        if (user) {
          await db.clearUserSubscription(user.id);
          console.log(`[Webhook] Subscription deleted for user ${user.id}`);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        console.log(`[Webhook] Payment failed for customer ${customerId}`);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }
  } catch (err: any) {
    console.error(`[Webhook] Error processing event ${event.type}: ${err.message}`);
    return res.status(500).json({ error: "Webhook processing error" });
  }

  return res.json({ received: true });
}
