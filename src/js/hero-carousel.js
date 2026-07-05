export function initHeroCarousel() {
  const track = document.querySelector('.hero-carousel-track');
  if (!track) return;

  const prevBtn = document.querySelector('.hero-carousel-btn.prev');
  const nextBtn = document.querySelector('.hero-carousel-btn.next');

  const realSlides = Array.from(track.querySelectorAll('.hero-slide'));
  if (realSlides.length < 2) return;

  const firstClone = realSlides[0].cloneNode(true);
  const lastClone = realSlides[realSlides.length - 1].cloneNode(true);
  firstClone.setAttribute('aria-hidden', 'true');
  lastClone.setAttribute('aria-hidden', 'true');
  track.appendChild(firstClone);
  track.insertBefore(lastClone, realSlides[0]);

  const total = realSlides.length + 2;
  let index = 1; // real slide 0 sits at position 1, after the prepended last-clone
  let isAnimating = false;

  const jumpTo = (i, smooth) => {
    track.scrollTo({ left: i * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  };

  jumpTo(index, false);

  const settleAtEdge = () => {
    if (index === 0) {
      index = realSlides.length;
      jumpTo(index, false);
    } else if (index === total - 1) {
      index = 1;
      jumpTo(index, false);
    }
    isAnimating = false;
  };

  if ('onscrollend' in window) {
    track.addEventListener('scrollend', settleAtEdge);
  } else {
    let settleTimer;
    track.addEventListener('scroll', () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settleAtEdge, 350);
    });
  }

  const goTo = (dir) => {
    if (isAnimating) return;
    isAnimating = true;
    index += dir;
    jumpTo(index, true);
  };

  prevBtn?.addEventListener('click', () => goTo(-1));
  nextBtn?.addEventListener('click', () => goTo(1));

  window.addEventListener('resize', () => jumpTo(index, false));
}
