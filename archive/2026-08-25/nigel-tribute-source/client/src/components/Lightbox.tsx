/**
 * Lightbox — Full-screen image viewer
 * Block 403H — Download, copy link, open in new tab buttons
 * Block 403K — Keyboard navigation: Escape to close, ← → arrow keys to cycle
 *
 * Usage:
 *   Single image:  <Lightbox src={url} alt={label} onClose={fn} />
 *   Gallery mode:  <Lightbox src={url} alt={label} onClose={fn}
 *                    images={[{src,alt},...]} onNavigate={(newSrc,newAlt)=>...} />
 */
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  /** Optional: full list of images for arrow-key cycling */
  images?: LightboxImage[];
  /** Called when user navigates to a different image via arrow keys */
  onNavigate?: (src: string, alt: string) => void;
}

const GOLD = "#d4a843";
const TEXT_SILVER = "#8a9cc0";

export default function Lightbox({ src, alt, onClose, images, onNavigate }: LightboxProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  /** Navigate to prev/next image in the gallery */
  const navigate = useCallback(
    (direction: -1 | 1) => {
      if (!images || images.length < 2 || !onNavigate) return;
      const currentIdx = images.findIndex((img) => img.src === src);
      if (currentIdx === -1) return;
      const nextIdx = (currentIdx + direction + images.length) % images.length;
      const next = images[nextIdx];
      onNavigate(next.src, next.alt);
    },
    [images, src, onNavigate]
  );

  // Keyboard handler: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigate(1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, navigate]);

  const hasGallery = images && images.length > 1 && onNavigate;

  /** Copy CDN link to clipboard */
  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(src);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = src;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /** Open in new tab */
  const handleOpenNewTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(src, "_blank", "noopener,noreferrer");
  };

  /** Download single image */
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const urlParts = src.split("/");
      const rawName = urlParts[urlParts.length - 1] || "image";
      const filename = rawName.split("?")[0] || `${alt.replace(/[^a-zA-Z0-9_-]/g, "_")}.png`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  /** Gallery position indicator */
  const currentIdx = images ? images.findIndex((img) => img.src === src) : -1;
  const positionLabel = images && currentIdx >= 0 ? `${currentIdx + 1} / ${images.length}` : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      {/* Left arrow */}
      {hasGallery && (
        <button
          onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
          style={{
            background: "rgba(11,26,51,0.6)",
            border: `1px solid ${GOLD}40`,
            fontFamily: "var(--font-display)",
            fontSize: "24px",
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Right arrow */}
      {hasGallery && (
        <button
          onClick={(e) => { e.stopPropagation(); navigate(1); }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
          style={{
            background: "rgba(11,26,51,0.6)",
            border: `1px solid ${GOLD}40`,
            fontFamily: "var(--font-display)",
            fontSize: "24px",
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      <motion.img
        key={src}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        src={src}
        alt={alt}
        className="max-w-[92vw] max-h-[70vh] object-contain rounded"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Caption + position */}
      <div className="mt-3 text-center px-4">
        <p
          className="text-sm text-[oklch(0.72_0.12_75)] tracking-[0.15em] uppercase font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {alt}
        </p>
        {positionLabel && (
          <p
            className="text-xs mt-1 tracking-[0.2em] font-light"
            style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
          >
            {positionLabel}
            <span className="ml-3 opacity-50">← → to navigate</span>
          </p>
        )}
      </div>

      {/* Action buttons row */}
      <div
        className="flex items-center gap-3 mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Download */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="px-4 py-2 text-xs tracking-[0.12em] uppercase font-light transition-all"
          style={{
            background: downloading ? `${GOLD}30` : `${GOLD}20`,
            color: GOLD,
            border: `1px solid ${GOLD}50`,
            fontFamily: "var(--font-display)",
            opacity: downloading ? 0.6 : 1,
          }}
        >
          {downloading ? "SAVING..." : "DOWNLOAD"}
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="px-4 py-2 text-xs tracking-[0.12em] uppercase font-light transition-all"
          style={{
            background: copied ? `${GOLD}40` : `${GOLD}20`,
            color: copied ? "#fff" : TEXT_SILVER,
            border: `1px solid ${GOLD}50`,
            fontFamily: "var(--font-display)",
          }}
        >
          {copied ? "COPIED!" : "COPY LINK"}
        </button>

        {/* Open in new tab */}
        <button
          onClick={handleOpenNewTab}
          className="px-4 py-2 text-xs tracking-[0.12em] uppercase font-light transition-all"
          style={{
            background: `${GOLD}20`,
            color: TEXT_SILVER,
            border: `1px solid ${GOLD}50`,
            fontFamily: "var(--font-display)",
          }}
        >
          FULL SIZE ↗
        </button>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light transition-colors"
        style={{ fontFamily: "var(--font-display)" }}
      >
        ✕
      </button>
    </motion.div>
  );
}
