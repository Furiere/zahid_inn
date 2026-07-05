// TODO(ru): offers are still English-only pending translation, same as the source design.
const OFFERS = [
  { title: 'Get your 10% seasonal discount', body: 'Book any room this month and save 10% on stays of 2 nights or more.' },
  { title: 'Stay 3 nights, get the 4th free', body: 'Our early-autumn offer for direct bookings through our booking page.' }
];

export function initOfferPopup() {
  const popup = document.getElementById('offer-popup');
  const closeBtn = document.getElementById('offer-close');
  const titleEl = document.getElementById('offer-title');
  const bodyEl = document.getElementById('offer-body');
  if (!popup || !closeBtn || !titleEl || !bodyEl) return;

  closeBtn.addEventListener('click', () => popup.classList.add('hidden'));

  setTimeout(() => {
    const offer = OFFERS[Math.random() < 0.5 ? 0 : 1];
    titleEl.textContent = offer.title;
    bodyEl.textContent = offer.body;
    popup.classList.remove('hidden');
  }, 2200);
}
