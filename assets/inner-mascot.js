(() => {
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.createElement('div');
  root.className = 'sunny-fixed';
  root.innerHTML = `<div class="sun-chat-combo"><div class="sun"><button type="button" class="mascot" aria-label="Boop the mascot"><span class="mascot__squash"><span class="mascot__layer mascot__dir"></span><span class="mascot__layer mascot__react"></span></span></button></div><div class="chat-cloud"><span class="chat-cloud__p"></span><svg class="chat-cloud__point" viewBox="0 0 22 13" fill="none" aria-hidden="true"><path d="M9 1C9 7 5 10 2 11.5 7 12 11 10.5 13.5 8.5 15.8 10.4 18.6 11.6 21.7 11.7V1Z" fill="var(--orange)"/><path d="M21.7 11.7C18.6 11.6 15.8 10.4 13.5 8.5 11 10.5 7 12 2 11.5 5 10 9 7 9 1" stroke="#000" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>`;
  document.body.appendChild(root);
  const cloud = root.querySelector('.chat-cloud');
  const text = root.querySelector('.chat-cloud__p');
  const show = (message = "Hi, I'm Dayala.", color = null) => {
    text.textContent = message;
    cloud.style.setProperty('--chat-fill', color ? `color-mix(in srgb, ${color} 35%, var(--light) 65%)` : 'var(--orange)');
    cloud.classList.add('is-visible');
  };
  const hide = () => cloud.classList.remove('is-visible');
  const mascot = root.querySelector('.mascot');
  mascot.addEventListener('pointerenter', () => show());
  mascot.addEventListener('focus', () => show());
  mascot.addEventListener('blur', hide);
  root.querySelector('.sun-chat-combo').addEventListener('pointerleave', hide);
  mascot.addEventListener('click', () => show());
  document.addEventListener('pointerover', e => {
    const card = e.target.closest('[data-law-name]');
    if (card && !card.contains(e.relatedTarget)) show(`${card.dataset.lawName}: ${card.dataset.lawDescription}`, card.dataset.lawColor);
  });
  document.addEventListener('pointerout', e => {
    const card = e.target.closest('[data-law-name]');
    if (card && !card.contains(e.relatedTarget)) hide();
  });
  document.addEventListener('focusin', e => {
    const card = e.target.closest('[data-law-name]');
    if (card) show(`${card.dataset.lawName}: ${card.dataset.lawDescription}`, card.dataset.lawColor);
  });
  document.addEventListener('focusout', e => { if (e.target.closest('[data-law-name]')) hide(); });
  document.addEventListener('touchstart', e => { if (!root.contains(e.target)) hide(); }, { passive: true });
function initSunnyFollowMouse() {
  const DIRS = ['up-left', 'up', 'up-right', 'left', 'center', 'right', 'down-left', 'down', 'down-right'];
  const CLOCKWISE = ['right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up', 'up-right'];
  const SECTOR = Math.PI * 2 / CLOCKWISE.length, HYSTERESIS = 0.12, DEAD_ZONE = 70;
  const REACTIONS = [1, 2, 8]; // heart, sparkle, delighted cells on the reactions sheet
  const SQUASH = [
    { transform: 'scale(1, 1)', easing: 'ease-in' },
    { transform: 'scale(1.10, 0.86)', offset: 0.18, easing: 'ease-out' },
    { transform: 'scale(0.95, 1.08)', offset: 0.45, easing: 'ease-in-out' },
    { transform: 'scale(1.03, 0.97)', offset: 0.72, easing: 'ease-in-out' },
    { transform: 'scale(1, 1)' },
  ];
  const cellPos = i => `${(i % 3) * 50}% ${Math.floor(i / 3) * 50}%`;
  const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
  const mascots = $$('.mascot').map(el => ({ el, dir: el.querySelector('.mascot__dir'), react: el.querySelector('.mascot__react'), sector: -1, timer: 0, count: 0, at: 0 }));

  let pointer = null;
  const aim = () => {
    if (!pointer) return;
    mascots.forEach(m => {
      const r = m.el.getBoundingClientRect();
      if (!r.width) return;
      const dx = pointer.x - (r.left + r.width / 2), dy = pointer.y - (r.top + r.height / 2);
      let d = 'center';
      if (Math.hypot(dx, dy) < DEAD_ZONE) m.sector = -1;
      else {
        const angle = Math.atan2(dy, dx);
        if (!(m.sector !== -1 && Math.abs(wrap(angle - m.sector * SECTOR)) < SECTOR / 2 + HYSTERESIS))
          m.sector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length;
        d = CLOCKWISE[m.sector];
      }
      m.dir.style.backgroundPosition = cellPos(DIRS.indexOf(d));
    });
  };
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    addEventListener('pointermove', e => { pointer = { x: e.clientX, y: e.clientY }; aim(); }, { passive: true });
    addEventListener('scroll', aim, { passive: true });
  }

  mascots.forEach(m => m.el.addEventListener('click', () => {
    clearTimeout(m.timer);
    const now = Date.now();
    m.count = now - m.at < 1600 ? m.count + 1 : 1;
    m.at = now;
    m.react.style.backgroundPosition = cellPos(REACTIONS[(m.count - 1) % REACTIONS.length]);
    m.el.classList.add('is--reacting');
    m.timer = setTimeout(() => m.el.classList.remove('is--reacting'), 560);
    if (!reduceMotion) m.el.querySelector('.mascot__squash').animate(SQUASH, { duration: 420, easing: 'linear' });
  }));
}


  initSunnyFollowMouse();
})();
