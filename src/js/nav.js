export function initNav() {
  const overlay = document.getElementById('nav-overlay');
  const openBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('nav-close');
  if (!overlay || !openBtn || !closeBtn) return;

  const isOpen = () => overlay.classList.contains('open');

  const open = () => {
    overlay.classList.add('open');
    openBtn.setAttribute('aria-expanded', 'true');
    // move focus into the panel so keyboard and assistive tech follow the menu
    closeBtn.focus();
  };

  const close = ({ restoreFocus = true } = {}) => {
    if (!isOpen()) return;
    overlay.classList.remove('open');
    openBtn.setAttribute('aria-expanded', 'false');
    if (restoreFocus) openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', () => close());

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // following a link inside the panel navigates away — don't yank focus back
  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => close({ restoreFocus: false }));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
