// Cookie disclaimer. Copy lives in the per-locale markup (see the locale trees),
// this module only handles showing it once and remembering the acceptance.
const STORAGE_KEY = 'zahid-inn:cookie-consent';

export function initCookieNotice() {
  const notice = document.getElementById('cookie-notice');
  const acceptBtn = document.getElementById('cookie-accept');
  if (!notice || !acceptBtn) return;

  let accepted = false;
  try {
    accepted = localStorage.getItem(STORAGE_KEY) === 'accepted';
  } catch (e) {
    // storage blocked (private mode) — show the notice, just don't remember it
  }
  if (accepted) {
    notice.remove();
    return;
  }

  acceptBtn.addEventListener('click', () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch (e) {
      /* ignore */
    }
    notice.classList.add('hidden');
    document.body.classList.remove('cookie-visible');
  });

  requestAnimationFrame(() => {
    notice.classList.remove('hidden');
    // lets the home page's offer popup sit above the bar instead of behind it
    document.body.classList.add('cookie-visible');
  });
}
