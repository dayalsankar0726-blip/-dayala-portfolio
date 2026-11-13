// Reuse the portfolio's Gestalt tiles for the three approach cards.
(() => {
  const A = (on, s) => on ? s : '';
  const LAWS = {
    proximity: [84, (k, a) => {
      const g = (x, y) => `<g transform="translate(${x} ${y})">${[[0,0],[10,0],[0,10],[10,10]].map(([dx,dy]) => `<circle cx="${dx}" cy="${dy}" r="3">${A(a, `<animate attributeName="cx" values="${dx};${dx ? 7 : 3};${dx}" dur="1.6s" repeatCount="indefinite"/><animate attributeName="cy" values="${dy};${dy ? 7 : 3};${dy}" dur="1.6s" repeatCount="indefinite"/>`)}</circle>`).join('')}</g>`;
      return `<g fill="${k}">${g(12, 12)}${g(54, 52)}</g>`; }],
    // Similarity: matching shapes read as rows; on hover the two rows pulse in turn
    similarity: [64, (k, a) => `<g fill="${k}"><g>${A(a, '<animate attributeName="opacity" values="1;.25;1" dur="1.4s" repeatCount="indefinite"/>')}<circle cx="16" cy="16" r="5"/><circle cx="48" cy="16" r="5"/></g><g>${A(a, '<animate attributeName="opacity" values=".25;1;.25" dur="1.4s" repeatCount="indefinite"/>')}<rect x="11" y="43" width="10" height="10" rx="1.5"/><rect x="43" y="43" width="10" height="10" rx="1.5"/></g></g>`],
    region: [96, (k, a) => `<g stroke="${k}" stroke-width="2.2" fill="none"><rect x="8" y="10" width="44" height="26" rx="9">${A(a, '<animate attributeName="width" values="44;56;44" dur="1.6s" repeatCount="indefinite"/>')}</rect></g><g fill="${k}"><circle cx="20" cy="23" r="3.2"/><circle cx="30" cy="23" r="3.2"/><circle cx="40" cy="23" r="3.2"/><circle cx="66" cy="66" r="3.2"/><circle cx="80" cy="74" r="3.2"/></g>`],
  };
  const names = { Proximity: 'proximity', Similarity: 'similarity', 'Common Region': 'region' };
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const image = (key, animated) => {
    const [size, draw] = LAWS[key];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${draw('rgba(35,48,31,.09)', animated)}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  };
  document.querySelectorAll('.principle[data-law-name]').forEach(card => {
    const key = names[card.dataset.lawName];
    if (!key) return;
    const still = image(key, false);
    const moving = image(key, true);
    card.dataset.gestalt = key;
    card.style.backgroundImage = still;
    card.style.backgroundSize = `${LAWS[key][0]}px ${LAWS[key][0]}px`;
    card.style.backgroundRepeat = 'repeat';
    const update = () => {
      const active = card.matches(':hover, :focus-within');
      card.style.backgroundImage = active && !motion.matches ? moving : still;
    };
    ['pointerenter', 'pointerleave', 'focusin', 'focusout'].forEach(event => card.addEventListener(event, update));
    motion.addEventListener('change', update);
  });
})();
