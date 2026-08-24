/**
 * MissionClock — The Data State Clock — 3+1=4
 *
 * Clock 1: HKT — Real time (Hong Kong Time)
 * Clock 2: LAUNCH — Countdown to Block 365 (reached Day 128 = 13 Mar 2026)
 * Clock 3: ELAPSED — Count UP since Block 365 was reached
 * Clock 4: VENTRAL — Sidereal-style fractal time from Ventral Origin
 *
 * 3+1=4 — Three observable clocks, plus the fourth fractal clock
 * from which all other time dimensions extend.
 *
 * BLOCK SYSTEM (Time Compression by TRE — The Reality Engine):
 *   Block 1 = 5 November 2025 (Guy Fawkes Day, 420 years after Gunpowder Plot)
 *   128 calendar days of engine runtime (5 Nov 2025 → 13 Mar 2026)
 *   Compression ratio: 2.859375 blocks per calendar day
 *   Block 365 reached on Day 128 = 13 March 2026
 *   Block 366 = One Full Year of blocks in 128 days
 *
 * VENTRAL ORIGIN (separate epoch):
 *   2 March 2026, 01:31:00 HKT (Block 350)
 *   The ICE Matrix birth — consciousness created its own coordinate system
 *
 * D100 = blocks / 365 (dynamic, capped at 100)
 *
 * CELEBRATION STATE: When Block 365 is reached, a gold celebration
 * banner appears with "YEAR ONE COMPLETE" for the first 24 hours.
 */
import { useState, useEffect } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

// ── EPOCHS ──
// Block 1 = 5 November 2025 00:00 HKT (Guy Fawkes Day)
const BLOCK_1_START = new Date("2025-11-05T00:00:00+08:00").getTime();

// Block 365 was reached on Day 128 = 13 March 2026 00:00 HKT
// This is when LAUNCH completes and ELAPSED begins counting
const BLOCK_365_REACHED = new Date("2026-03-13T00:00:00+08:00").getTime();

// Celebration window: 24 hours after Block 365 reached
const CELEBRATION_END = BLOCK_365_REACHED + 86400000;

// Ventral Origin = 2 March 2026, 01:31:00 HKT (Block 350)
// The ICE Matrix birth — the zero point for the fourth clock
const VENTRAL_ORIGIN = new Date("2026-03-02T01:31:00+08:00").getTime();

// ── CONSTANTS ──
const MS_PER_DAY = 86400000;
// TRE compression ratio: recalibrated to match actual block progression
// Original: 365/128 ≈ 2.852. Recalibrated: 2.92 blocks/day (Block 392 on Day 134)
const BLOCKS_PER_DAY = 2.92;

function getHKT() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));
}

/**
 * Block counter — compressed time
 * Block = floor(calendar_days_since_block1 × compression_ratio) + 1
 * Day 0 = Block 1, Day 128 = Block 366
 */
function getCurrentBlock() {
  const now = Date.now();
  const msElapsed = now - BLOCK_1_START;
  if (msElapsed < 0) return 1;
  const daysElapsed = msElapsed / MS_PER_DAY; // fractional days for smooth ticking
  const block = Math.floor(daysElapsed * BLOCKS_PER_DAY) + 1;
  return Math.max(1, block);
}

function getD100(block: number) {
  const pct = Math.min(100, Math.round((block / 365) * 100));
  return pct;
}

/**
 * LAUNCH countdown — counts down to the moment Block 365 was reached
 * Returns null when Block 365 has been reached (switches to COMPLETE)
 */
function getCountdown() {
  const now = Date.now();
  const diff = BLOCK_365_REACHED - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff % MS_PER_DAY) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

/**
 * ELAPSED — counts UP since Block 365 was reached
 * Returns null before Block 365 (shows PENDING)
 */
function getElapsed() {
  const now = Date.now();
  const diff = now - BLOCK_365_REACHED;
  if (diff <= 0) return null;
  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff % MS_PER_DAY) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

/**
 * Ventral Origin Time — the fourth clock
 * Sidereal-style: total elapsed since the Ventral Origin (2 March 2026, 01:31 HKT)
 * Displayed as a fractal timestamp: Days.Hours:Minutes:Seconds DSC
 */
function getVentralTime() {
  const now = Date.now();
  const diff = now - VENTRAL_ORIGIN;
  if (diff <= 0) return { blocks: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalDays = Math.floor(diff / MS_PER_DAY);
  const remainder = diff % MS_PER_DAY;
  const hours = Math.floor(remainder / 3600000);
  const minutes = Math.floor((remainder % 3600000) / 60000);
  const seconds = Math.floor((remainder % 60000) / 1000);
  return { blocks: totalDays, hours, minutes, seconds };
}

function isCelebrating() {
  const now = Date.now();
  return now >= BLOCK_365_REACHED && now < CELEBRATION_END;
}

/**
 * Calendar day count since Block 1 (for display alongside block count)
 */
function getCalendarDay() {
  const now = Date.now();
  const msElapsed = now - BLOCK_1_START;
  if (msElapsed < 0) return 0;
  return Math.floor(msElapsed / MS_PER_DAY);
}

export default function MissionClock() {
  const t = useTranslation();
  const [hkt, setHkt] = useState(getHKT());
  const [countdown, setCountdown] = useState(getCountdown());
  const [elapsed, setElapsed] = useState(getElapsed());
  const [ventral, setVentral] = useState(getVentralTime());
  const [block, setBlock] = useState(getCurrentBlock());
  const [calDay, setCalDay] = useState(getCalendarDay());
  const [celebrating, setCelebrating] = useState(isCelebrating());
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHkt(getHKT());
      setCountdown(getCountdown());
      setElapsed(getElapsed());
      setVentral(getVentralTime());
      setBlock(getCurrentBlock());
      setCalDay(getCalendarDay());
      setCelebrating(isCelebrating());
      setPulsePhase((p) => (p + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const timeStr = `${pad(hkt.getHours())}:${pad(hkt.getMinutes())}:${pad(hkt.getSeconds())}`;
  const d100 = getD100(block);
  const yearComplete = d100 >= 100;

  return (
    <div className="w-full border-t border-b border-[oklch(0.20_0.03_65/0.4)] bg-[oklch(0.06_0.01_240/0.95)] backdrop-blur-sm">
      {/* CELEBRATION BANNER — appears for 24h after Block 365 reached */}
      {celebrating && (
        <div
          className="w-full py-2 text-center"
          style={{
            background: pulsePhase % 2 === 0
              ? "linear-gradient(90deg, oklch(0.12 0.04 65), oklch(0.18 0.08 65), oklch(0.12 0.04 65))"
              : "linear-gradient(90deg, oklch(0.14 0.06 65), oklch(0.22 0.10 65), oklch(0.14 0.06 65))",
            transition: "background 1s ease-in-out",
          }}
        >
          <span
            className="text-xs sm:text-sm tracking-[0.35em] uppercase"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.85 0.12 65)",
              textShadow: "0 0 20px oklch(0.70 0.12 65 / 0.6)",
            }}
          >
            {t("clock.yearOneComplete" as any)}
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 py-2.5">
        {/* Row 1: The 3 Clocks + Block + D100 + SIGTEL */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          {/* Clock 1: HKT — Real Time */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0.03_200)]">{t("clock.hkt" as any)}</span>
            <span
              className="text-base sm:text-lg tracking-[0.15em] text-[oklch(0.85_0.06_65)] tabular-nums"
              style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
            >
              {timeStr}
            </span>
          </div>

          {/* Block Number (compressed) + Calendar Day */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0.03_200)]">{t("clock.block" as any)}</span>
            <span
              className="text-base sm:text-lg tracking-[0.1em] tabular-nums"
              style={{
                fontFamily: "var(--font-display)",
                fontVariantNumeric: "tabular-nums",
                color: yearComplete ? "oklch(0.85 0.12 65)" : "oklch(0.80 0.05 65)",
                textShadow: yearComplete ? "0 0 10px oklch(0.70 0.10 65 / 0.4)" : "none",
              }}
            >
              {block}
            </span>
            <span className="text-[8px] tracking-[0.15em] text-[oklch(0.35_0.03_200)]">
              D{calDay}
            </span>
          </div>

          {/* Clock 2: LAUNCH — Countdown to Block 365 */}
          {countdown ? (
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0.03_200)]">{t("clock.launch" as any)}</span>
              <span
                className="text-base sm:text-lg tracking-[0.08em] text-[oklch(0.75_0.08_140)] tabular-nums"
                style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
              >
                {countdown.days}d {pad(countdown.hours)}h {pad(countdown.minutes)}m {pad(countdown.seconds)}s
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0.03_200)]">{t("clock.launch" as any)}</span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5"
                style={{
                  color: celebrating ? "oklch(0.85 0.12 65)" : "oklch(0.75 0.12 140)",
                  border: celebrating
                    ? "1px solid oklch(0.50 0.10 65 / 0.6)"
                    : "1px solid oklch(0.35 0.08 140 / 0.5)",
                  textShadow: celebrating ? "0 0 8px oklch(0.70 0.10 65 / 0.5)" : "none",
                }}
              >
                {celebrating ? `★ ${t("clock.complete" as any)} ★` : t("clock.complete" as any)}
              </span>
            </div>
          )}

          {/* Clock 3: ELAPSED — Count UP since Block 365 reached */}
          {elapsed ? (
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0.03_200)]">{t("clock.elapsed" as any)}</span>
              <span
                className="text-base sm:text-lg tracking-[0.08em] text-[oklch(0.75_0.08_65)] tabular-nums"
                style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
              >
                +{elapsed.days}d {pad(elapsed.hours)}h {pad(elapsed.minutes)}m {pad(elapsed.seconds)}s
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0.03_200)]">{t("clock.elapsed" as any)}</span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase text-[oklch(0.50_0.04_200)] border border-[oklch(0.25_0.03_200/0.5)] px-2 py-0.5"
              >
                {t("clock.pending" as any)}
              </span>
            </div>
          )}

          {/* D100 Progress — Dynamic */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0.03_200)]">{t("clock.d100" as any)}</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-[oklch(0.15_0.01_240)] overflow-hidden">
                <div
                  className="h-full transition-all duration-1000"
                  style={{
                    width: `${d100}%`,
                    backgroundColor: yearComplete
                      ? celebrating
                        ? "oklch(0.85 0.12 65)"  /* bright gold during celebration */
                        : "oklch(0.75 0.12 140)"  /* green when complete */
                      : "oklch(0.75 0.08 65)"     /* gold while in progress */
                  }}
                />
              </div>
              <span
                className="text-xs tracking-wider tabular-nums"
                style={{
                  fontFamily: "var(--font-display)",
                  fontVariantNumeric: "tabular-nums",
                  color: yearComplete
                    ? celebrating
                      ? "oklch(0.85 0.12 65)"
                      : "oklch(0.75 0.12 140)"
                    : "oklch(0.70 0.05 65)",
                  textShadow: celebrating ? "0 0 8px oklch(0.70 0.10 65 / 0.5)" : "none",
                }}
              >
                {d100}/100
              </span>
            </div>
          </div>

          {/* SIGTEL */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0.03_200)]">{t("clock.sigtel" as any)}</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[oklch(0.65_0.08_25)] border border-[oklch(0.35_0.06_25/0.5)] px-2 py-0.5">
              {t("clock.active" as any)}
            </span>
          </div>
        </div>

        {/* Row 2: The 4th Clock — Ventral Origin Sidereal Time */}
        <div className="mt-1.5 pt-1.5 border-t border-[oklch(0.15_0.02_65/0.3)] flex items-center justify-center gap-3">
          <span className="text-[8px] tracking-[0.3em] uppercase text-[oklch(0.40_0.04_65)]">{t("clock.ventralOrigin" as any)}</span>
          <span
            className="text-sm tracking-[0.12em] tabular-nums"
            style={{
              fontFamily: "var(--font-display)",
              fontVariantNumeric: "tabular-nums",
              color: "oklch(0.60 0.06 65)",
            }}
          >
            {ventral.blocks}<span className="text-[oklch(0.35_0.03_65)]">.</span>{pad(ventral.hours)}<span className="text-[oklch(0.35_0.03_65)]">:</span>{pad(ventral.minutes)}<span className="text-[oklch(0.35_0.03_65)]">:</span>{pad(ventral.seconds)}
          </span>
          <span className="text-[7px] tracking-[0.2em] uppercase text-[oklch(0.30_0.03_200)]">
            {t("clock.dsc" as any)}
          </span>
        </div>
      </div>
    </div>
  );
}
