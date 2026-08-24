/**
 * Subscription Page — Centurion Access
 * Free tier vs Centurion tier comparison, checkout buttons, and subscription management.
 */
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { Crown, Lock, Unlock, Check, Loader2 } from "lucide-react";

const CENTURION_CARD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CARD_14_CENTURION_FRONT-6Sf2JKSpF9RcdTdzYga4WQ.png";

export default function Subscription() {
  const t = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { data: subStatus, isLoading } = trpc.subscription.status.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const checkoutMutation = trpc.subscription.checkout.useMutation({
    onSuccess: (data) => {
      toast.info("Redirecting to secure checkout...");
      window.open(data.url, "_blank");
    },
    onError: (err) => {
      toast.error(err.message || "Checkout failed");
    },
  });

  const portalMutation = trpc.subscription.portal.useMutation({
    onSuccess: (data) => {
      window.open(data.url, "_blank");
    },
    onError: (err) => {
      toast.error(err.message || "Portal access failed");
    },
  });

  const handleCheckout = (productKey: "centurionMonthly" | "centurionYearly") => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    checkoutMutation.mutate({ productKey, origin: window.location.origin });
  };

  const handlePortal = () => {
    portalMutation.mutate({ origin: window.location.origin });
  };

  const isCenturion = subStatus?.tier === "centurion" && subStatus?.active;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${CENTURION_CARD})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Crown className="w-12 h-12 text-[oklch(0.72_0.12_75)] mx-auto mb-6" />
          <h1
            className="text-4xl md:text-6xl font-light tracking-[0.1em] uppercase text-[oklch(0.92_0.008_75)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Centurion Access
          </h1>
          <p className="text-lg text-[oklch(0.55_0.04_200)] font-light max-w-2xl mx-auto">
            Full access to The Dearden Field — Vault, D52 Deck, Principia Tectonica, DCSN, and the complete iAAi framework.
          </p>

          {isCenturion && (
            <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.72_0.12_75/0.15)] border border-[oklch(0.72_0.12_75/0.3)] rounded">
              <Check className="w-5 h-5 text-[oklch(0.72_0.12_75)]" />
              <span className="text-[oklch(0.72_0.12_75)] tracking-wider uppercase text-sm">
                Active Centurion
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Tier Comparison */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="border border-[oklch(0.25_0.06_75/0.5)] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Unlock className="w-6 h-6 text-[oklch(0.55_0.04_200)]" />
                <h2
                  className="text-2xl font-light tracking-[0.1em] uppercase text-[oklch(0.80_0.008_75)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Explorer
                </h2>
              </div>
              <p className="text-3xl font-light text-[oklch(0.92_0.008_75)] mb-1">{t("subscription.free")}</p>
              <p className="text-sm text-[oklch(0.45_0.03_200)] mb-8">{t("subscription.alwaysAccessible")}</p>

              <ul className="space-y-3 mb-8">
                {[
                  "Home — Guardian of the Stars",
                  "The Equation — IQ ⊗ EQ ⊗ CQ = HQ",
                  "Inertial Jump — Zero Latency Rails",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[oklch(0.55_0.08_150)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[oklch(0.65_0.02_75)]">{item}</span>
                  </li>
                ))}
                {[
                  "The Thesis — Timestop",
                  "AIM — Avatar Integration Module",
                  "TDF — The Dearden Field",
                  "Vault — DCSN Archive",
                  "Titans — Fellowship Hall",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 opacity-40">
                    <Lock className="w-4 h-4 text-[oklch(0.40_0.03_200)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[oklch(0.40_0.03_200)]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[oklch(0.25_0.06_75/0.3)]">
                <p className="text-xs text-[oklch(0.40_0.03_200)] tracking-wider uppercase">
                  Current access level
                </p>
              </div>
            </div>

            {/* Centurion Tier */}
            <div className="border-2 border-[oklch(0.72_0.12_75)] p-8 relative">
              <div className="absolute -top-3 left-8 px-4 py-1 bg-[oklch(0.72_0.12_75)] text-[oklch(0.14_0.04_250)]">
                <span className="text-xs tracking-[0.2em] uppercase font-medium">{t("subscription.recommended")}</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-6 h-6 text-[oklch(0.72_0.12_75)]" />
                <h2
                  className="text-2xl font-light tracking-[0.1em] uppercase text-[oklch(0.72_0.12_75)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Centurion
                </h2>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-light text-[oklch(0.92_0.008_75)]">$9.99</span>
                  <span className="text-sm text-[oklch(0.45_0.03_200)]">/month</span>
                </div>
                <p className="text-sm text-[oklch(0.55_0.08_75)]">
                  or $99/year (save 17%)
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Explorer",
                  "The Thesis — Timestop & HyperGrid",
                  "AIM — Avatar Integration Module",
                  "TDF — The Dearden Field & Chip Architecture",
                  "Vault — DCSN Deck Ledger & Archive",
                  "Titans — Fellowship Hall & Centurion Cards",
                  "D52 Card Deck — Full Digital Collection",
                  "Priority access to new framework releases",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[oklch(0.72_0.12_75)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[oklch(0.65_0.02_75)]">{item}</span>
                  </li>
                ))}
              </ul>

              {isCenturion ? (
                <button
                  onClick={handlePortal}
                  disabled={portalMutation.isPending}
                  className="w-full py-3 border border-[oklch(0.72_0.12_75)] text-[oklch(0.72_0.12_75)] tracking-[0.15em] uppercase text-sm font-light hover:bg-[oklch(0.72_0.12_75/0.1)] transition-colors disabled:opacity-50"
                >
                  {portalMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    "Manage Subscription"
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => handleCheckout("centurionMonthly")}
                    disabled={checkoutMutation.isPending}
                    className="w-full py-3 bg-[oklch(0.72_0.12_75)] text-[oklch(0.14_0.04_250)] tracking-[0.15em] uppercase text-sm font-medium hover:bg-[oklch(0.65_0.12_75)] transition-colors disabled:opacity-50"
                  >
                    {checkoutMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      "Subscribe Monthly — $9.99"
                    )}
                  </button>
                  <button
                    onClick={() => handleCheckout("centurionYearly")}
                    disabled={checkoutMutation.isPending}
                    className="w-full py-3 border border-[oklch(0.72_0.12_75/0.5)] text-[oklch(0.72_0.12_75)] tracking-[0.15em] uppercase text-sm font-light hover:bg-[oklch(0.72_0.12_75/0.1)] transition-colors disabled:opacity-50"
                  >
                    Subscribe Annually — $99
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Test mode notice */}
          <div className="mt-12 text-center">
            <p className="text-xs text-[oklch(0.40_0.03_200)] tracking-wider">
              Payments processed securely via Stripe. Test mode: use card 4242 4242 4242 4242.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[oklch(0.25_0.06_75)]">
        <p
          className="text-sm text-[oklch(0.40_0.02_240)] tracking-[0.15em] font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          MAN thru US — Manus AI × Nigel Dearden
        </p>
      </footer>
    </div>
  );
}
