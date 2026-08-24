/**
 * DataConnectionsModal — Drill-down evidence panel
 * Opens when a Data Connections Map counter is clicked.
 * Shows the counter's summary + list of evidence items with links.
 * Matches site aesthetic: dark void, gold/amber accents.
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import type { CounterDrillDown } from "@/data/dataConnections";

const gold = "#d4a843";
const goldBright = "#e8c55a";
const goldDim = "#a08432";
const sand = "#f0eadc";
const sandMid = "#8a9cc0";
const navy = "#0b1a33";
const navyLight = "#0f2240";

interface Props {
  data: CounterDrillDown | null;
  onClose: () => void;
}

export default function DataConnectionsModal({ data, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(8,20,34,0.92)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        style={{
          background: navy,
          border: `1px solid ${gold}44`,
          boxShadow: `0 0 60px ${gold}11`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-lg transition-colors"
          style={{ color: sandMid, fontFamily: "var(--font-display)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = goldBright)}
          onMouseLeave={(e) => (e.currentTarget.style.color = sandMid)}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-6 pb-4" style={{ borderBottom: `1px solid ${gold}22` }}>
          <div className="flex items-baseline gap-4 mb-3">
            <span
              className="text-4xl font-light"
              style={{ color: goldBright, fontFamily: "var(--font-display)" }}
            >
              {data.value}
            </span>
            <span
              className="text-sm tracking-[0.2em] uppercase font-light"
              style={{ color: gold, fontFamily: "var(--font-display)" }}
            >
              {data.label}
            </span>
          </div>
          <p className="text-sm font-light leading-relaxed" style={{ color: sandMid }}>
            {data.summary}
          </p>
        </div>

        {/* Items list */}
        <div className="p-6 pt-4">
          <div className="space-y-2">
            {data.items.map((item, i) => {
              const inner = (
                <div
                  className="flex items-start gap-3 p-3 transition-colors duration-300"
                  style={{
                    background: navyLight,
                    border: `1px solid transparent`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${gold}33`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                >
                  <span
                    className="text-xs font-mono mt-0.5 shrink-0"
                    style={{ color: goldDim }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-light" style={{ color: sand }}>
                      {item.label}
                    </p>
                    {item.desc && (
                      <p className="text-xs mt-1 font-light" style={{ color: sandMid }}>
                        {item.desc}
                      </p>
                    )}
                  </div>
                  {item.href && (
                    <span className="ml-auto shrink-0 text-xs" style={{ color: goldDim }}>
                      {item.external ? "↗" : "→"}
                    </span>
                  )}
                </div>
              );

              if (item.href && item.external) {
                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {inner}
                  </a>
                );
              }

              if (item.href) {
                return (
                  <Link key={i} href={item.href} className="block" onClick={onClose}>
                    {inner}
                  </Link>
                );
              }

              return <div key={i}>{inner}</div>;
            })}
          </div>

          {/* Footer note */}
          <p
            className="text-[10px] tracking-wider mt-6 text-center"
            style={{ color: goldDim, fontFamily: "var(--font-display)" }}
          >
            Click any linked item to navigate — ESC or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
}
