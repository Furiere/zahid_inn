export function initRoomCarousels() {
  const carousels = document.querySelectorAll('.room-carousel');
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.room-carousel-track');
    if (!track) return;

    const prevBtn = carousel.querySelector('.room-carousel-btn.prev');
    const nextBtn = carousel.querySelector('.room-carousel-btn.next');
    if (track.querySelectorAll('.room-slide').length < 2) {
      prevBtn?.remove();
      nextBtn?.remove();
      return;
    }

    const update = () => {
      const maxScroll = track.scrollWidth - track.clientWidth - 1;
      prevBtn?.toggleAttribute('disabled', track.scrollLeft <= 0);
      nextBtn?.toggleAttribute('disabled', track.scrollLeft >= maxScroll);
    };

    prevBtn?.addEventListener('click', () =>
      track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' })
    );
    nextBtn?.addEventListener('click', () =>
      track.scrollBy({ left: track.clientWidth, behavior: 'smooth' })
    );

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
}
