/**
 * Subscription Success — Post-checkout confirmation
 */
import Navigation from "@/components/Navigation";
import { Crown, Check } from "lucide-react";
import { Link } from "wouter";

export default function SubscriptionSuccess() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="py-32 px-6 text-center">
        <div className="max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[oklch(0.72_0.12_75/0.15)] flex items-center justify-center">
            <Crown className="w-10 h-10 text-[oklch(0.72_0.12_75)]" />
          </div>
          <h1
            className="text-3xl md:text-4xl font-light tracking-[0.1em] uppercase text-[oklch(0.92_0.008_75)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome, Centurion
          </h1>
          <p className="text-[oklch(0.55_0.04_200)] font-light mb-8">
            Your access to The Dearden Field is now active. The full framework — Vault, D52, Principia, DCSN — awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vault">
              <span className="inline-block px-8 py-3 bg-[oklch(0.72_0.12_75)] text-[oklch(0.14_0.04_250)] tracking-[0.15em] uppercase text-sm font-medium cursor-pointer">
                Enter the Vault
              </span>
            </Link>
            <Link href="/">
              <span className="inline-block px-8 py-3 border border-[oklch(0.72_0.12_75/0.5)] text-[oklch(0.72_0.12_75)] tracking-[0.15em] uppercase text-sm font-light cursor-pointer">
                Return Home
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
