/**
 * Stripe Product & Price Configuration
 * Centurion Access — The Dearden Field subscription tier
 * 
 * Products are created dynamically on first checkout if they don't exist.
 * This keeps the code as the single source of truth.
 */

export const PRODUCTS = {
  centurionMonthly: {
    name: "Centurion Access — Monthly",
    description: "Full access to The Dearden Field: Vault, D52 Deck, Principia Tectonica, DCSN, and all framework content.",
    priceAmount: 999, // $9.99 in cents
    currency: "usd",
    interval: "month" as const,
    metadata: {
      tier: "centurion",
      billing: "monthly",
    },
  },
  centurionYearly: {
    name: "Centurion Access — Annual",
    description: "Full access to The Dearden Field for one year. Save 17% vs monthly.",
    priceAmount: 9900, // $99.00 in cents
    currency: "usd",
    interval: "year" as const,
    metadata: {
      tier: "centurion",
      billing: "yearly",
    },
  },
  principiaPDF: {
    name: "D100 Principia Tectonica — Digital Edition",
    description: "The complete 100-page Principia Tectonica by Nigel T. Dearden. PDF download.",
    priceAmount: 2999, // $29.99 in cents
    currency: "usd",
    interval: null, // one-time purchase
    metadata: {
      tier: "product",
      type: "digital_download",
    },
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;

/**
 * Free tier pages — accessible without subscription
 */
export const FREE_PAGES = ["/", "/quotient", "/inertial-jump"] as const;

/**
 * Centurion tier pages — require active subscription
 */
export const CENTURION_PAGES = ["/thesis", "/aim", "/tdf", "/vault", "/titans"] as const;
