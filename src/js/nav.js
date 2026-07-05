export function initNav() {
  const overlay = document.getElementById('nav-overlay');
  const openBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('nav-close');
  if (!overlay || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => overlay.classList.add('open'));
  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
}
