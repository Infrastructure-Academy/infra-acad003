/**
 * DiscoveryHint — UX Discovery Principle (iCard UX-001)
 * "If users can't find it, it doesn't exist."
 *
 * Four patterns for first-time mobile users:
 *   PULSE  → Hamburger menus, tab nav (ANNOUNCE)
 *   SWIPE  → Horizontal carousels (GUIDE)
 *   LABEL  → Floating nav buttons (ORIENT)
 *   GLOW   → Primary CTA buttons (ATTRACT)
 *
 * Rules:
 *   1. One-time only — localStorage flag, never again
 *   2. Auto-dismiss — 5-6s fade
 *   3. Mobile-only — max-width: 768px
 *   4. No recurring CTAs — 3 cycles max, never infinite
 *   5. Subtle, not intrusive — pointer-events: none where applicable
 *   6. Dismiss on interaction — removed on first tap/click/scroll
 *
 * Origin: Observed by Ir. Nigel T. Dearden CEng, Block 415, 26 March 2026
 */
import { useEffect, useState, useRef, useCallback } from "react";

const STORAGE_KEY = "ux_discovery_seen";
const GOLD = "rgba(212, 168, 67, 0.6)";
const GOLD_SOLID = "#d4a843";

/** Check if hints should show: mobile + first visit */
function shouldShowHints(): boolean {
  if (typeof window === "undefined") return false;
  if (window.innerWidth > 768) return false;
  try {
    return localStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return false;
  }
}

/** Mark hints as seen — called 10s after first display */
function markSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // silent
  }
}

// ─── PULSE: Gold ring animation for hamburger/tab nav ───

interface PulseHintProps {
  /** Text label shown below the element, e.g. "MENU", "TABS" */
  label: string;
  /** Position of micro-label relative to element */
  labelPosition?: "below" | "above" | "right";
  /** Additional CSS class for the wrapper */
  className?: string;
  children: React.ReactNode;
}

export function PulseHint({ label, labelPosition = "below", className = "", children }: PulseHintProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldShowHints()) return;
    setActive(true);
    const t = setTimeout(() => markSeen(), 10000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    el.addEventListener("click", dismiss, { once: true });
    el.addEventListener("touchstart", dismiss, { once: true });
    // Auto-dismiss after animation completes (3 × 1.5s = 4.5s + buffer)
    const t = setTimeout(() => setActive(false), 5000);
    return () => {
      el.removeEventListener("click", dismiss);
      el.removeEventListener("touchstart", dismiss);
      clearTimeout(t);
    };
  }, [active, dismiss]);

  const labelPos =
    labelPosition === "above"
      ? { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "4px" }
      : labelPosition === "right"
      ? { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "8px" }
      : { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "4px" };

  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      {children}
      {active && (
        <>
          {/* Gold ring pulse overlay */}
          <div
            className="absolute inset-0 rounded pointer-events-none"
            style={{
              animation: "discovery-ring-pulse 1.5s ease-out 3",
              zIndex: 10,
            }}
          />
          {/* Micro-label */}
          <span
            className="absolute pointer-events-none whitespace-nowrap"
            style={{
              ...labelPos,
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: GOLD_SOLID,
              textTransform: "uppercase",
              animation: "hint-fade 5s forwards",
              zIndex: 11,
              fontFamily: "var(--font-display)",
            }}
          >
            {label}
          </span>
        </>
      )}
    </div>
  );
}

// ─── SWIPE: Arrow overlay for horizontal carousels ───

interface SwipeHintProps {
  /** Ref to the scroll container to watch for first scroll */
  scrollRef: React.RefObject<HTMLElement | null>;
  /** Direction arrow points — default "left" for LTR content */
  direction?: "left" | "right";
}

export function SwipeHint({ scrollRef, direction = "left" }: SwipeHintProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!shouldShowHints()) return;
    setActive(true);
    const t = setTimeout(() => markSeen(), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = scrollRef.current;
    if (!el) return;
    const dismiss = () => setActive(false);
    el.addEventListener("scroll", dismiss, { once: true, passive: true });
    el.addEventListener("touchmove", dismiss, { once: true, passive: true });
    // Auto-dismiss after 3 cycles (3 × 1.2s = 3.6s + buffer)
    const t = setTimeout(() => setActive(false), 5000);
    return () => {
      el.removeEventListener("scroll", dismiss);
      el.removeEventListener("touchmove", dismiss);
      clearTimeout(t);
    };
  }, [active, scrollRef]);

  if (!active) return null;

  return (
    <div
      className="absolute flex items-center gap-1 pointer-events-none"
      style={{
        top: "50%",
        right: direction === "left" ? "12px" : undefined,
        left: direction === "right" ? "12px" : undefined,
        transform: "translateY(-50%)",
        zIndex: 10,
        animation: "swipe-hint-slide 1.2s ease-in-out 3 forwards",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: GOLD_SOLID,
          textTransform: "uppercase",
          fontFamily: "var(--font-display)",
        }}
      >
        SWIPE
      </span>
      <span style={{ color: GOLD_SOLID, fontSize: "16px" }}>
        {direction === "left" ? "←" : "→"}
      </span>
    </div>
  );
}

// ─── LABEL: Temporary text label for floating buttons ───

interface LabelHintProps {
  /** Descriptive text, e.g. "BACK TO TOP", "SECTION NAV" */
  text: string;
  /** Position relative to the button */
  position?: "left" | "right" | "above";
  children: React.ReactNode;
}

export function LabelHint({ text, position = "left", children }: LabelHintProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldShowHints()) return;
    setActive(true);
    const t = setTimeout(() => markSeen(), 10000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    el.addEventListener("click", dismiss, { once: true });
    // Auto-dismiss after 6s
    const t = setTimeout(() => setActive(false), 6000);
    return () => {
      el.removeEventListener("click", dismiss);
      clearTimeout(t);
    };
  }, [active, dismiss]);

  const labelPos =
    position === "right"
      ? { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "8px" }
      : position === "above"
      ? { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "8px" }
      : { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "8px" };

  return (
    <div ref={ref} className="relative inline-flex">
      {children}
      {active && (
        <span
          className="absolute pointer-events-none whitespace-nowrap"
          style={{
            ...labelPos,
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: GOLD_SOLID,
            textTransform: "uppercase",
            padding: "3px 8px",
            background: "rgba(11, 26, 51, 0.85)",
            backdropFilter: "blur(8px)",
            borderRadius: "3px",
            animation: "hint-fade 6s forwards",
            zIndex: 11,
            fontFamily: "var(--font-display)",
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}

// ─── GLOW: Border glow for primary CTAs ───

interface GlowHintProps {
  className?: string;
  children: React.ReactNode;
}

export function GlowHint({ className = "", children }: GlowHintProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldShowHints()) return;
    setActive(true);
    const t = setTimeout(() => markSeen(), 10000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    el.addEventListener("click", dismiss, { once: true });
    el.addEventListener("touchstart", dismiss, { once: true });
    // Auto-dismiss after 3 cycles
    const t = setTimeout(() => setActive(false), 5000);
    return () => {
      el.removeEventListener("click", dismiss);
      el.removeEventListener("touchstart", dismiss);
      clearTimeout(t);
    };
  }, [active, dismiss]);

  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      <div
        style={
          active
            ? {
                animation: "discovery-glow-pulse 1.5s ease-in-out 3",
                borderRadius: "inherit",
              }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
