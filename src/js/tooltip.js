export function initTooltips() {
  const tips = Array.from(document.querySelectorAll('.tip'));
  if (!tips.length) return;

  const setOpen = (tip, open) => {
    tip.classList.toggle('open', open);
    tip.querySelector('.tip-btn').setAttribute('aria-expanded', String(open));
    tip.querySelector('.tip-bubble').hidden = !open;
  };
  const closeAll = (except) => {
    tips.forEach((tip) => {
      if (tip !== except) setOpen(tip, false);
    });
  };

  tips.forEach((tip) => {
    const btn = tip.querySelector('.tip-btn');
    const bubble = tip.querySelector('.tip-bubble');
    if (!btn || !bubble) return;
    setOpen(tip, false);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !tip.classList.contains('open');
      closeAll(tip);
      setOpen(tip, open);
    });
    bubble.addEventListener('click', (e) => e.stopPropagation());
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}
