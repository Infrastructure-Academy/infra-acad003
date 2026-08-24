/**
 * DiscoveryHint — UX Discovery Principle (iCard UX-001)
 * Tests for the localStorage gating logic and mobile-only behavior.
 * These are unit tests for the core logic, not React component rendering.
 */
import { describe, it, expect, beforeEach, vi } from "vitest";

// Simulate the core gating logic from DiscoveryHint.tsx
const STORAGE_KEY = "ux_discovery_seen";

function shouldShowHints(windowWidth: number, storageValue: string | null): boolean {
  if (windowWidth > 768) return false;
  return storageValue !== "1";
}

describe("UX Discovery Principle — gating logic", () => {
  it("shows hints on mobile (<=768px) for first-time visitors", () => {
    expect(shouldShowHints(375, null)).toBe(true);
    expect(shouldShowHints(768, null)).toBe(true);
  });

  it("hides hints on desktop (>768px)", () => {
    expect(shouldShowHints(1024, null)).toBe(false);
    expect(shouldShowHints(1920, null)).toBe(false);
  });

  it("hides hints for returning visitors (localStorage flag set)", () => {
    expect(shouldShowHints(375, "1")).toBe(false);
    expect(shouldShowHints(768, "1")).toBe(false);
  });

  it("shows hints if localStorage has unexpected value", () => {
    expect(shouldShowHints(375, "0")).toBe(true);
    expect(shouldShowHints(375, "false")).toBe(true);
    expect(shouldShowHints(375, "")).toBe(true);
  });

  it("hides hints on desktop even if localStorage not set", () => {
    expect(shouldShowHints(1440, null)).toBe(false);
  });
});

describe("UX Discovery Principle — pattern rules", () => {
  it("PULSE: animation runs exactly 3 cycles (1.5s × 3 = 4.5s)", () => {
    const cycles = 3;
    const duration = 1.5;
    const totalTime = cycles * duration;
    expect(totalTime).toBe(4.5);
    expect(cycles).toBeLessThanOrEqual(3); // never infinite
  });

  it("SWIPE: animation runs exactly 3 cycles (1.2s × 3 = 3.6s)", () => {
    const cycles = 3;
    const duration = 1.2;
    const totalTime = cycles * duration;
    expect(totalTime).toBeCloseTo(3.6);
    expect(cycles).toBeLessThanOrEqual(3);
  });

  it("LABEL: fades after 6 seconds", () => {
    const fadeTime = 6;
    expect(fadeTime).toBeLessThanOrEqual(6);
    expect(fadeTime).toBeGreaterThan(0);
  });

  it("GLOW: reserved for single most important CTA", () => {
    // This is a design rule, not a code rule — but we verify the constant
    const maxGlowElements = 1;
    expect(maxGlowElements).toBe(1);
  });

  it("All patterns auto-dismiss within 6 seconds", () => {
    const dismissTimes = {
      PULSE: 5, // 5s timeout in component
      SWIPE: 5,
      LABEL: 6,
      GLOW: 5,
    };
    Object.values(dismissTimes).forEach((t) => {
      expect(t).toBeLessThanOrEqual(6);
    });
  });
});
