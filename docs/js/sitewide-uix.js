(() => {
  const init = () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.dataset.uixEnhanced === 'true') return;
    lightbox.dataset.uixEnhanced = 'true';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Enlarged image');
    lightbox.tabIndex = -1;

    let close = document.getElementById('lightbox-close');
    if (!close) {
      close = document.createElement('button');
      close.id = 'lightbox-close';
      close.type = 'button';
      close.className = 'uix-lightbox-close';
      close.setAttribute('aria-label', 'Close enlarged image');
      close.textContent = '×';
      lightbox.appendChild(close);
    }

    const closeLightboxSafe = () => {
      if (typeof window.closeLightbox === 'function') window.closeLightbox();
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      close.focus({ preventScroll: true });
    };

    close.addEventListener('click', event => {
      event.stopPropagation();
      closeLightboxSafe();
    });
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) closeLightboxSafe();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && lightbox.classList.contains('active')) closeLightboxSafe();
    });

    const syncState = () => {
      const active = lightbox.classList.contains('active');
      lightbox.setAttribute('aria-hidden', active ? 'false' : 'true');
      document.body.style.overflow = active ? 'hidden' : '';
      if (active) lightbox.focus({ preventScroll: true });
    };
    new MutationObserver(syncState).observe(lightbox, { attributes: true, attributeFilter: ['class'] });
    syncState();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
