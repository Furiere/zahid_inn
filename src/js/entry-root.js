import '../styles/root.css';

// Root language redirect. Kept in an external module (not inline) so the
// Content-Security-Policy can forbid inline scripts outright.
const target =
  navigator.language && navigator.language.toLowerCase().indexOf('ru') === 0
    ? '/ru/'
    : '/en/';
location.replace(target);
