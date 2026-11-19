/**
 * Shared Press Play control.
 * Compact gold mark in the network bar (or a 36px strip when a page has no bar),
 * and a banner under it. The banner's min-height is the Apple 44-point touch
 * target. The type size is separate and smaller. Both doors open the live Quest
 * origin only. The mark file is served unchanged from the Academy origin.
 */
(function () {
  var DOOR = "https://app.infrastructure-academy.com/";
  var MARK = "https://infrastructure-academy.com/press-play-gold-mark.png";
  var WORDING = "Press Play to engage NOW";

  function cssText() {
    return [
      "#iaai-network-bar > a.iaai-press-play-mark {",
      "  flex: 0 0 auto;",
      "  display: inline-flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  width: 24px;",
      "  height: 24px;",
      "  margin: 0;",
      "  padding: 0;",
      "  border-bottom: 3px solid transparent;",
      "  text-decoration: none;",
      "  box-sizing: border-box;",
      "}",
      "a.iaai-press-play-mark img {",
      "  display: block;",
      "  width: 22px;",
      "  height: 20px;",
      "  object-fit: contain;",
      "  pointer-events: none;",
      "}",
      "#iaai-press-play-strip {",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  width: 100%;",
      "  box-sizing: border-box;",
      "  height: calc(36px + env(safe-area-inset-top, 0px));",
      "  padding-top: env(safe-area-inset-top, 0px);",
      "  padding-left: env(safe-area-inset-left, 0px);",
      "  padding-right: env(safe-area-inset-right, 0px);",
      "  background: #0a1628;",
      "  position: sticky;",
      "  top: 0;",
      "  z-index: 200001;",
      "}",
      "#iaai-press-play-banner {",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  box-sizing: border-box;",
      "  width: 100%;",
      "  min-height: 44pt;",
      "  margin: 0;",
      "  padding: 8px 14px;",
      "  padding-left: max(14px, env(safe-area-inset-left, 0px));",
      "  padding-right: max(14px, env(safe-area-inset-right, 0px));",
      "  background: #0a1628;",
      "  color: #f0d78c;",
      "  text-decoration: none;",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;",
      "  font-size: 18px;",
      "  font-weight: 700;",
      "  letter-spacing: 0.01em;",
      "  line-height: 1.25;",
      "  text-align: center;",
      "  text-transform: none;",
      "  border-bottom: 1px solid rgba(212, 168, 67, 0.7);",
      "  position: sticky;",
      "  top: calc(36px + env(safe-area-inset-top, 0px));",
      "  z-index: 200000;",
      "  -webkit-tap-highlight-color: rgba(212, 168, 67, 0.35);",
      "  touch-action: manipulation;",
      "}",
      "#iaai-press-play-banner:focus {",
      "  outline: 2px solid #f0d78c;",
      "  outline-offset: -2px;",
      "}",
      "body.iaai-press-play-rowfix {",
      "  flex-direction: column;",
      "  align-items: center;",
      "  justify-content: flex-start;",
      "  height: 100vh;",
      "  height: 100dvh;",
      "  min-height: 100vh;",
      "  min-height: 100dvh;",
      "}",
      "body.iaai-press-play-rowfix > #iaai-network-bar,",
      "body.iaai-press-play-rowfix > #iaai-press-play-banner {",
      "  flex: 0 0 auto;",
      "  width: 100%;",
      "  align-self: stretch;",
      "}",
      "body.iaai-press-play-rowfix > .redirect-box {",
      "  margin-top: auto;",
      "  margin-bottom: auto;",
      "}"
    ].join("\n");
  }

  function ensureCss() {
    if (document.getElementById("iaai-press-play-style")) return;
    var style = document.createElement("style");
    style.id = "iaai-press-play-style";
    style.textContent = cssText();
    document.head.appendChild(style);
  }

  function markLink() {
    var a = document.createElement("a");
    a.className = "iaai-press-play-mark";
    a.href = DOOR;
    a.setAttribute("aria-label", WORDING);
    a.setAttribute("data-no-lightbox", "");
    var img = document.createElement("img");
    img.src = MARK;
    img.alt = "";
    img.width = 22;
    img.height = 20;
    img.setAttribute("data-lightbox", "false");
    img.setAttribute("data-no-lightbox", "");
    a.appendChild(img);
    return a;
  }

  function banner() {
    var a = document.createElement("a");
    a.id = "iaai-press-play-banner";
    a.href = DOOR;
    a.textContent = WORDING;
    return a;
  }

  function settleFlex(bar) {
    var body = document.body;
    if (!body) return;
    var cs = window.getComputedStyle(body);
    if (cs.display !== "flex") return;
    var bannerEl = document.getElementById("iaai-press-play-banner");
    if (cs.flexDirection.indexOf("column") === 0) {
      if (bar) bar.style.alignSelf = "stretch";
      if (bannerEl) bannerEl.style.alignSelf = "stretch";
      return;
    }
    body.classList.add("iaai-press-play-rowfix");
  }

  function mount() {
    if (document.getElementById("iaai-press-play-banner")) return;
    ensureCss();
    var bar = document.getElementById("iaai-network-bar");
    var band = banner();
    if (bar) {
      if (!bar.querySelector(".iaai-press-play-mark")) bar.appendChild(markLink());
      bar.insertAdjacentElement("afterend", band);
      settleFlex(bar);
      return;
    }
    var strip = document.createElement("div");
    strip.id = "iaai-press-play-strip";
    strip.appendChild(markLink());
    document.body.insertBefore(band, document.body.firstChild);
    document.body.insertBefore(strip, band);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
