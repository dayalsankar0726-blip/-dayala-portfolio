// One shared pattern library with site-wide unique visual assignments.
(() => {
  const A = (on, s) => on ? s : '';
  const LAWS = {
    // Proximity: dots read as groups because they sit close; on hover each group squeezes tighter
    proximity: [84, (k, a) => {
      const g = (x, y) => `<g transform="translate(${x} ${y})">${[[0,0],[10,0],[0,10],[10,10]].map(([dx,dy]) => `<circle cx="${dx}" cy="${dy}" r="3">${A(a, `<animate attributeName="cx" values="${dx};${dx ? 7 : 3};${dx}" dur="1.6s" repeatCount="indefinite"/><animate attributeName="cy" values="${dy};${dy ? 7 : 3};${dy}" dur="1.6s" repeatCount="indefinite"/>`)}</circle>`).join('')}</g>`;
      return `<g fill="${k}">${g(12, 12)}${g(54, 52)}</g>`; }],
    // Similarity: matching shapes read as rows; on hover the two rows pulse in turn
    similarity: [64, (k, a) => `<g fill="${k}"><g>${A(a, '<animate attributeName="opacity" values="1;.25;1" dur="1.4s" repeatCount="indefinite"/>')}<circle cx="16" cy="16" r="5"/><circle cx="48" cy="16" r="5"/></g><g>${A(a, '<animate attributeName="opacity" values=".25;1;.25" dur="1.4s" repeatCount="indefinite"/>')}<rect x="11" y="43" width="10" height="10" rx="1.5"/><rect x="43" y="43" width="10" height="10" rx="1.5"/></g></g>`],
    // Closure: broken circles the eye completes; on hover the gaps close
    closure: [92, (k, a) => { const gap = A(a, '<animate attributeName="stroke-dasharray" values="62 26;88 0;88 0;62 26" keyTimes="0;.45;.6;1" dur="1.6s" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" values="0;-22;-22;0" keyTimes="0;.45;.6;1" dur="1.6s" repeatCount="indefinite"/>');
      return `<g fill="none" stroke="${k}" stroke-width="3" stroke-linecap="round"><circle cx="24" cy="24" r="14" stroke-dasharray="62 26">${gap}</circle><circle cx="70" cy="70" r="14" stroke-dasharray="62 26">${gap}</circle><path d="M58 20h18v18M20 76H6V58"/></g>`; }],
    // Continuity: the eye follows smooth lines; on hover the lines flow along
    continuity: [120, (k, a) => `<g fill="none" stroke="${k}" stroke-width="2.5" stroke-linecap="round">${A(a, '<animateTransform attributeName="transform" type="translate" values="0 0;-60 0" dur="1.6s" repeatCount="indefinite"/>')}<path d="M-60 34Q-30 4 0 34T60 34T120 34T180 34"/><path d="M-60 92Q-30 62 0 92T60 92T120 92T180 92" stroke-dasharray="2 7"/></g>`],
    // Connectedness: joined dots read as pairs; on hover the links draw themselves
    connectedness: [88, (k, a) => { const draw = A(a, '<animate attributeName="stroke-dashoffset" values="30;0;0;30" keyTimes="0;.45;.75;1" dur="1.8s" repeatCount="indefinite"/>');
      return `<g stroke="${k}" stroke-width="2.5" fill="${k}"><line x1="14" y1="16" x2="38" y2="30" stroke-dasharray="30" >${draw}</line><circle cx="14" cy="16" r="4"/><circle cx="38" cy="30" r="4"/><line x1="54" y1="62" x2="76" y2="72" stroke-dasharray="30">${draw}</line><circle cx="54" cy="62" r="4"/><circle cx="76" cy="72" r="4"/></g>`; }],
    // Common region: dots inside a frame read as one group; on hover the frame stretches to take in more
    region: [96, (k, a) => `<g stroke="${k}" stroke-width="2.2" fill="none"><rect x="8" y="10" width="44" height="26" rx="9">${A(a, '<animate attributeName="width" values="44;56;44" dur="1.6s" repeatCount="indefinite"/>')}</rect></g><g fill="${k}"><circle cx="20" cy="23" r="3.2"/><circle cx="30" cy="23" r="3.2"/><circle cx="40" cy="23" r="3.2"/><circle cx="66" cy="66" r="3.2"/><circle cx="80" cy="74" r="3.2"/></g>`],
    // Symmetry: mirrored brackets read as pairs; on hover each pair opens and closes as mirror images
    symmetry: [84, (k, a) => { const m = d => A(a, `<animateTransform attributeName="transform" type="translate" values="0 0;${d} 0;0 0" dur="1.4s" repeatCount="indefinite"/>`);
      return `<g fill="none" stroke="${k}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h-8v24h8">${m(-4)}</path><path d="M30 8h8v24h-8">${m(4)}</path><path d="M54 50q-8 12 0 24">${m(-4)}</path><path d="M70 50q8 12 0 24">${m(4)}</path></g>`; }],
    // Common fate: things moving the same way read as one group; on hover the arrows travel together
    fate: [64, (k, a) => `<g fill="none" stroke="${k}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${A(a, '<animateTransform attributeName="transform" type="translate" values="0 0;8 -8;0 0" dur="1.2s" repeatCount="indefinite"/>')}<path d="M8 26l14-14m-7 0h7v7"/><path d="M40 58l14-14m-7 0h7v7"/></g>`],
    // Figure-ground: filled and hollow shapes swap; on hover they trade places
    figure: [64, (k, a) => { const sw = (from, to) => A(a, `<animate attributeName="fill-opacity" values="${from};${to};${from}" dur="1.6s" repeatCount="indefinite"/>`);
      return `<g stroke="${k}" stroke-width="2.2" fill="${k}"><circle cx="16" cy="16" r="7" fill-opacity="1">${sw(1, 0)}</circle><circle cx="48" cy="16" r="7" fill-opacity="0">${sw(0, 1)}</circle><circle cx="16" cy="48" r="7" fill-opacity="0">${sw(0, 1)}</circle><circle cx="48" cy="48" r="7" fill-opacity="1">${sw(1, 0)}</circle></g>`; }],
    // Prägnanz: overlapping shapes still read as the simplest forms; on hover they slide apart and back
    pragnanz: [104, (k, a) => `<g fill="none" stroke="${k}" stroke-width="2.3" stroke-linejoin="round"><circle cx="26" cy="28" r="13">${A(a, '<animate attributeName="cx" values="26;20;26" dur="1.6s" repeatCount="indefinite"/>')}</circle><rect x="30" y="22" width="22" height="22" rx="2">${A(a, '<animate attributeName="x" values="30;36;30" dur="1.6s" repeatCount="indefinite"/>')}</rect><path d="M72 58l14 24H58z">${A(a, '<animateTransform attributeName="transform" type="rotate" values="0 72 74;120 72 74;0 72 74" dur="1.6s" repeatCount="indefinite"/>')}</path></g>`],
    // Focal point: the one element that stands out gets seen first; on hover the accent dot pulses
    focal: [96, (k, a) => `<g fill="${k}">${[12, 36, 60, 84].map(x => [12, 36, 60, 84].map(y => (x === 60 && y === 60) ? '' : `<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')).join('')}<circle cx="60" cy="60" r="6">${A(a, '<animate attributeName="r" values="6;10;6" dur="1.2s" repeatCount="indefinite"/>')}</circle></g>`],
    // Parallelism: lines running parallel read as one set; on hover the set tilts together
    parallel: [80, (k, a) => `<g fill="none" stroke="${k}" stroke-width="2.5" stroke-linecap="round"><g>${A(a, '<animateTransform attributeName="transform" type="rotate" values="0 24 24;14 24 24;0 24 24" dur="1.6s" repeatCount="indefinite"/>')}<path d="M10 34l12-20M18 34l12-20M26 34l12-20"/></g><path d="M50 72l12-20M58 72l12-20" opacity=".7"/></g>`],
    // Synchrony: things that change together read as related; on hover one set of dots blinks in unison
    synchrony: [80, (k, a) => { const b = A(a, '<animate attributeName="opacity" values="1;.1;1" dur="1s" repeatCount="indefinite"/>');
      return `<g fill="${k}"><g>${b}<circle cx="14" cy="14" r="3.5"/><circle cx="54" cy="30" r="3.5"/><circle cx="30" cy="62" r="3.5"/></g><circle cx="38" cy="16" r="3.5"/><circle cx="66" cy="60" r="3.5"/><circle cx="12" cy="42" r="3.5"/></g>`; }],
    // Past experience: familiar marks are read as icons we know; on hover the tick draws itself in
    familiar: [88, (k, a) => `<g fill="none" stroke="${k}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 24l7 7 13-15" stroke-dasharray="30">${A(a, '<animate attributeName="stroke-dashoffset" values="30;0;0;30" keyTimes="0;.4;.8;1" dur="1.6s" repeatCount="indefinite"/>')}</path><path d="M58 14v14M51 21h14"/><path d="M14 58l12 12M26 58L14 70"/><circle cx="64" cy="64" r="8"/></g>`],
    // Convexity: convex shapes read as objects before concave ones; on hover the convex shapes lift
    convexity: [96, (k, a) => `<g stroke="${k}" stroke-width="2.2"><ellipse cx="26" cy="26" rx="14" ry="11" fill="${k}" fill-opacity=".55">${A(a, '<animate attributeName="rx" values="14;17;14" dur="1.4s" repeatCount="indefinite"/><animate attributeName="ry" values="11;14;11" dur="1.4s" repeatCount="indefinite"/>')}</ellipse><path d="M56 56q12 8 24 0q-8 12 0 24q-12-8-24 0q8-12 0-24z" fill="none"/></g>`],
    // Emergence: the whole is seen before its parts; on hover scattered dots gather into a ring
    emergence: [104, (k, a) => { const ring = [...Array(8)].map((_, i) => [52 + 20 * Math.cos(i * Math.PI / 4), 52 + 20 * Math.sin(i * Math.PI / 4)]);
      const loose = [[14, 18], [80, 12], [92, 58], [70, 90], [26, 84], [8, 52], [44, 30], [60, 70]];
      return `<g fill="${k}">${ring.map(([x, y], i) => { const [lx, ly] = loose[i]; return `<circle cx="${lx}" cy="${ly}" r="3">${A(a, `<animate attributeName="cx" values="${lx};${x.toFixed(1)};${lx}" dur="2s" repeatCount="indefinite"/><animate attributeName="cy" values="${ly};${y.toFixed(1)};${ly}" dur="2s" repeatCount="indefinite"/>`)}</circle>`; }).join('')}</g>`; }],
    // Reification: the mind sees a shape that isn't drawn; on hover the implied triangle appears
    reification: [104, (k, a) => { const P = [[52, 18], [20, 76], [84, 76]], C = [52, 56.7], r = 9;
      const pac = ([x, y]) => { const t = Math.atan2(C[1] - y, C[0] - x), w = Math.PI / 6;
        const p = ang => [(x + r * Math.cos(ang)).toFixed(1), (y + r * Math.sin(ang)).toFixed(1)];
        const [ax, ay] = p(t + w), [bx, by] = p(t - w);
        return `<path d="M${x} ${y}L${ax} ${ay}A${r} ${r} 0 1 1 ${bx} ${by}Z"/>`; };
      return `<g fill="${k}">${P.map(pac).join('')}</g><path d="M52 18L20 76H84Z" fill="none" stroke="${k}" stroke-width="1.6" stroke-dasharray="3 4" opacity="0">${A(a, '<animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/>')}</path>`; }],
    // Multistability: one drawing flips between two readings; on hover the cube's front face swaps
    multistability: [88, (k, a) => `<g fill="none" stroke="${k}" stroke-width="2.2" stroke-linejoin="round"><rect x="16" y="26" width="34" height="34"/><rect x="30" y="12" width="34" height="34"/><path d="M16 26l14-14M50 26l14-14M16 60l14-14M50 60l14-14"/><rect x="16" y="26" width="34" height="34" fill="${k}" fill-opacity=".35">${A(a, '<animate attributeName="x" values="16;30;16" calcMode="discrete" dur="1.4s" repeatCount="indefinite"/><animate attributeName="y" values="26;12;26" calcMode="discrete" dur="1.4s" repeatCount="indefinite"/>')}</rect></g>`],
    // Invariance: a shape is still recognised when turned or resized; on hover the copies turn
    invariance: [104, (k, a) => { const tri = (x, y, s, rot) => `<path d="M0 -10L9 6H-9Z" transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${A(a, `<animateTransform attributeName="transform" type="rotate" additive="sum" values="0;120;0" dur="1.8s" repeatCount="indefinite"/>`)}</path>`;
      return `<g fill="none" stroke="${k}" stroke-width="2" stroke-linejoin="round">${tri(24, 26, 1, 0)}${tri(76, 30, 1.5, 40)}${tri(34, 78, .8, 170)}${tri(80, 82, 1.2, 260)}</g>`; }],
  };
  // short hover notes: the law, and what its pattern does on hover
  const NOTES = {
    proximity: ['Proximity', 'dot groups squeeze tighter'],
    similarity: ['Similarity', 'alike rows pulse in turn'],
    closure: ['Closure', 'gaps close up'],
    continuity: ['Continuity', 'waves flow along'],
    connectedness: ['Connectedness', 'links draw in'],
    region: ['Common region', 'the frame stretches'],
    symmetry: ['Symmetry', 'mirror pairs open and close'],
    fate: ['Common fate', 'arrows travel together'],
    figure: ['Figure-ground', 'filled and hollow swap'],
    pragnanz: ['Prägnanz', 'simple shapes slide and turn'],
    focal: ['Focal point', 'the accent dot pulses'],
    parallel: ['Parallelism', 'parallel lines tilt together'],
    synchrony: ['Synchrony', 'dots blink in unison'],
    familiar: ['Past experience', 'a familiar tick draws in'],
    convexity: ['Convexity', 'convex shapes lift forward'],
    emergence: ['Emergence', 'dots gather into a ring'],
    reification: ['Reification', 'the hidden triangle appears'],
    multistability: ['Multistability', 'the cube flips its face'],
    invariance: ['Invariance', 'shapes turn but stay the same'],
  };

  // Additional visual treatments use established laws, without inventing new laws.
  Object.assign(LAWS, {
    ribbons: [120, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.4" stroke-linecap="round">${A(a,'<animate attributeName="stroke-dashoffset" values="0;-60" dur="2s" repeatCount="indefinite"/>')}<path d="M10 105C10 70 105 70 105 10M22 115C22 80 115 80 115 22" stroke-dasharray="14 6"/></g>`],
    chains: [104, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.5">${A(a,'<animate attributeName="stroke-opacity" values=".5;1;.5" dur="1.8s" repeatCount="indefinite"/>')}<rect x="14" y="22" width="30" height="16" rx="8" transform="rotate(-35 29 30)"/><rect x="32" y="10" width="30" height="16" rx="8" transform="rotate(-35 47 18)"/><rect x="56" y="75" width="30" height="16" rx="8" transform="rotate(35 71 83)"/><rect x="72" y="87" width="24" height="14" rx="7" transform="rotate(35 84 94)"/></g>`],
    enclosures: [112, (k,a) => `<g stroke="${k}" stroke-width="2" fill="none"><path d="M12 20 30 10 48 20V42L30 52 12 42Z"/><path d="M68 72 86 62 104 72V94L86 104 68 94Z"/></g><g fill="${k}">${A(a,'<animate attributeName="opacity" values=".4;1;.4" dur="1.6s" repeatCount="indefinite"/>')}<rect x="23" y="25" width="5" height="10" rx="1"/><rect x="33" y="25" width="5" height="10" rx="1"/><rect x="79" y="77" width="5" height="10" rx="1"/><rect x="89" y="77" width="5" height="10" rx="1"/></g>`],
    mirrors: [104, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.2" stroke-linecap="round"><path d="M28 12C8 22 8 42 28 52M32 12C52 22 52 42 32 52M74 62C54 72 54 92 74 102M78 62C98 72 98 92 78 102">${A(a,'<animate attributeName="stroke-width" values="2.2;4;2.2" dur="1.8s" repeatCount="indefinite"/>')}</path></g>`],
    clusters: [108, (k,a) => { const group=(x,y)=>`<g transform="translate(${x} ${y})">${A(a,'<animateTransform attributeName="transform" type="scale" additive="sum" values="1;.85;1" dur="1.8s" repeatCount="indefinite"/>')}<path d="M0 0 6 10H-6ZM14 0 20 10H8ZM7 14 13 24H1Z"/></g>`;return `<g fill="${k}">${group(18,16)}${group(72,68)}</g>`;}],
    matching: [96, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.2"><g>${A(a,'<animate attributeName="opacity" values="1;.35;1" dur="1.6s" repeatCount="indefinite"/>')}<path d="M12 18 20 10 28 18 20 26ZM52 18 60 10 68 18 60 26Z"/></g><g>${A(a,'<animate attributeName="opacity" values=".35;1;.35" dur="1.6s" repeatCount="indefinite"/>')}<path d="M20 58h16M28 50v16M60 58h16M68 50v16" stroke-linecap="round"/></g></g>`],
    territories: [120, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.2" stroke-linecap="round"><ellipse cx="32" cy="32" rx="24" ry="16" transform="rotate(-25 32 32)">${A(a,'<animate attributeName="ry" values="16;20;16" dur="1.8s" repeatCount="indefinite"/>')}</ellipse><ellipse cx="90" cy="90" rx="24" ry="16" transform="rotate(25 90 90)">${A(a,'<animate attributeName="ry" values="16;20;16" dur="1.8s" repeatCount="indefinite"/>')}</ellipse><path d="m22 35 5-6m7 6 5-6m41 64 5-6m7 6 5-6"/></g>`]
  });
  const variants = {ribbons:'continuity',chains:'connectedness',enclosures:'region',mirrors:'symmetry',clusters:'proximity',matching:'similarity',territories:'region'};
  const descriptions = {
    proximity:'Elements placed close together feel related.', similarity:'Elements that look alike are perceived as a group.', closure:'Our minds fill in gaps to see a complete shape.', continuity:'Our eyes follow smooth, connected paths.', connectedness:'Visually linked elements feel like one group.', region:'Elements inside the same boundary feel related.', symmetry:'Balanced, mirrored shapes feel like a unified whole.', fate:'Elements moving together feel related.', figure:'Contrast separates an object from its background.', pragnanz:'We tend to perceive the simplest coherent form.', focal:'A distinctive element attracts attention first.', parallel:'Parallel elements are perceived as related.', synchrony:'Elements changing together feel connected.', familiar:'Familiar symbols draw on our past experience.', convexity:'Convex shapes tend to be perceived as objects.', emergence:'A whole form becomes apparent from its parts.', reification:'Our minds complete shapes that are only implied.', multistability:'An ambiguous image can have more than one interpretation.', invariance:'We recognise shapes despite changes in size or rotation.'
  };
  // Every visual key is allocated once across the complete site.
  const PLANS = {
    'index.html': ['proximity','similarity','closure','continuity','connectedness','region','symmetry'],
    'about.html': ['clusters','matching','territories'],
    'case-tractor-connect.html': ['ribbons','chains','enclosures','mirrors','fate',null,'figure'],
    'case-staff-dashboard.html': ['pragnanz','focal','parallel','synchrony',null,null,'familiar'],
    'case-billora-ai.html': ['convexity','emergence','reification','multistability',null,null,'invariance']
  };
  const page = location.pathname.split('/').pop() || 'index.html';
  const plan = PLANS[page];
  if (!plan) return;
  const about = page === 'about.html';
  const home = page === 'index.html';
  const selector = about ? '.principle' : home ? '.cover, .tweet-card, .accordion-css__card' : '.cs-hero__stage, .cs-meta, .goal, .card, .next__card';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const luminance = color => {
    const values = color.match(/[\d.]+/g)?.map(Number);
    if (!values || (values.length > 3 && values[3] < .5)) return 1;
    const [r,g,b] = values.map(v => {v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4;});
    return .2126*r+.7152*g+.0722*b;
  };
  const tile = (key, ink, animated) => {
    const [size, draw] = LAWS[key];
    return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${draw(ink,animated)}</svg>`)}")`;
  };
  const apply = () => {
    let index = 0;
    document.querySelectorAll(selector).forEach(card => {
      const lightness = luminance(getComputedStyle(card).backgroundColor);
      if (!about && lightness>.82 && !card.classList.contains('colleague-quote')) return;
      const key = plan[index++];
      if (!key || card.dataset.patternKey) return;
      const law = variants[key] || key;
      const ink = about ? 'rgba(35,48,31,.09)' : card.classList.contains('colleague-quote') ? 'rgba(35,48,31,.07)' : lightness>.42 ? 'rgba(35,48,31,.16)' : 'rgba(255,254,251,.24)';
      const normal = tile(key,ink,false), animated = tile(key,ink,true);
      card.dataset.patternKey = key;
      card.dataset.gestalt = law;
      card.style.backgroundImage = normal;
      card.style.backgroundSize = `${LAWS[key][0]}px ${LAWS[key][0]}px`;
      card.style.backgroundRepeat = 'repeat';
      const host = card.closest('.speaker-card') || card;
      host.dataset.lawName = NOTES[law][0];
      host.dataset.lawDescription = descriptions[law];
      host.dataset.lawColor = getComputedStyle(card).backgroundColor;
      const update = () => {card.style.backgroundImage = !motion.matches && host.matches(':hover, :focus-within') ? animated : normal;};
      ['pointerenter','pointerleave','focusin','focusout'].forEach(event=>host.addEventListener(event,update));
      motion.addEventListener('change',update);
    });
  };
  apply(); requestAnimationFrame(apply); addEventListener('load',apply);
})();
