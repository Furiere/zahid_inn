export function initRatesCarousel() {
  const track = document.querySelector('.rates-track');
  if (!track) return;

  const prevBtn = document.querySelector('.rates-carousel-btn.prev');
  const nextBtn = document.querySelector('.rates-carousel-btn.next');
  const cards = Array.from(track.querySelectorAll('.rate-card'));
  if (!cards.length) return;

  const step = () => {
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  };

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    prevBtn?.toggleAttribute('disabled', track.scrollLeft <= 0);
    nextBtn?.toggleAttribute('disabled', track.scrollLeft >= maxScroll);
  };

  prevBtn?.addEventListener('click', () =>
    track.scrollBy({ left: -step(), behavior: 'smooth' })
  );
  nextBtn?.addEventListener('click', () =>
    track.scrollBy({ left: step(), behavior: 'smooth' })
  );

  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
