(() => {
  let lightbox;
  let close;
  let lbImage;
  let lastFocus;

  const ensureLightbox = () => {
    lightbox = document.getElementById('lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.className = 'lightbox';
      lightbox.innerHTML = '<img id="lightbox-img" alt="Enlarged image">';
      document.body.appendChild(lightbox);
    }
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Enlarged image');
    lightbox.setAttribute('aria-hidden', lightbox.classList.contains('active') ? 'false' : 'true');
    lightbox.tabIndex = -1;
    lbImage = lightbox.querySelector('#lightbox-img') || lightbox.querySelector('img');

    close = document.getElementById('lightbox-close');
    if (!close) {
      close = document.createElement('button');
      close.id = 'lightbox-close';
      close.type = 'button';
      close.className = 'uix-lightbox-close';
      close.setAttribute('aria-label', 'Close enlarged image');
      close.textContent = '×';
      lightbox.appendChild(close);
    }
    if (lightbox.dataset.uixEnhanced === 'true') return;
    lightbox.dataset.uixEnhanced = 'true';

    const closeLightboxSafe = () => {
      if (typeof window.closeLightbox === 'function') window.closeLightbox();
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
    };
    window.uixOpenLightbox = (src, alt='Enlarged image', trigger=null) => {
      ensureLightbox();
      lastFocus = trigger || document.activeElement;
      lbImage.src = src;
      lbImage.alt = alt || 'Enlarged image';
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      close.focus({ preventScroll: true });
    };
    window.uixCloseLightbox = closeLightboxSafe;
    close.addEventListener('click', event => { event.stopPropagation(); closeLightboxSafe(); });
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightboxSafe(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && lightbox.classList.contains('active')) closeLightboxSafe(); });
    document.addEventListener('click', event => {
      const img = event.target.closest && event.target.closest('img');
      if (!img || img === lbImage || img.getAttribute('data-lightbox') === 'false') return;
      const interactive = img.closest('a,button,[role="button"],[data-no-lightbox]');
      if (interactive?.matches('[data-no-lightbox],button,[role="button"]')) return;
      if (interactive?.tagName === 'A') {
        const href = interactive.href || '';
        const src = img.currentSrc || img.src || '';
        const isDirectAssetLink = href === src || href.split('?')[0].endsWith(src.split('?')[0].split('/').pop());
        if (!isDirectAssetLink) return;
      }
      event.preventDefault();
      event.stopPropagation();
      img.classList.add('uix-image-target');
      window.uixOpenLightbox(img.currentSrc || img.src, img.alt, img);
    }, true);
    new MutationObserver(() => {
      const active = lightbox.classList.contains('active');
      lightbox.setAttribute('aria-hidden', active ? 'false' : 'true');
      document.body.style.overflow = active ? 'hidden' : '';
    }).observe(lightbox, { attributes: true, attributeFilter: ['class'] });
  };

  const init = () => ensureLightbox();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
