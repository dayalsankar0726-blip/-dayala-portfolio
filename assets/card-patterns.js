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
    // Pragnanz: overlapping shapes still read as the simplest forms; on hover they slide apart and back
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
    pragnanz: ['Pragnanz', 'simple shapes slide and turn'],
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

  // Further UX principles: each name and pattern is assigned once site-wide.
  // Definitions: https://lawsofux.com/laws/
  Object.assign(LAWS, {
    jakob: [112, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2"><rect x="10" y="12" width="38" height="30" rx="4"/><path d="M10 21h38M16 17h2m4 0h2"/><rect x="19" y="28" width="20" height="7" rx="3.5"/><rect x="65" y="68" width="38" height="30" rx="4"/><path d="M65 77h38M71 73h2m4 0h2"/><rect x="74" y="84" width="20" height="7" rx="3.5">${A(a,'<animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/>')}</rect></g>`],
    hick: [108, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.2" stroke-linecap="round"><path d="M16 52h28m0 0 18-28m-18 28h18m-18 0 18 28"/><circle cx="16" cy="52" r="5"/><rect x="68" y="17" width="24" height="14" rx="7"/><rect x="68" y="45" width="24" height="14" rx="7" fill="${k}" fill-opacity=".35">${A(a,'<animate attributeName="fill-opacity" values=".2;.8;.2" dur="1.6s" repeatCount="indefinite"/>')}</rect><rect x="68" y="73" width="24" height="14" rx="7"/></g>`],
    fitts: [120, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.2" stroke-linecap="round"><circle cx="22" cy="26" r="5"/><circle cx="88" cy="82" r="18"/><path d="m32 34 36 30m-10 0h10V54"/><circle cx="88" cy="82" r="11">${A(a,'<animate attributeName="r" values="7;15;7" dur="1.8s" repeatCount="indefinite"/>')}</circle></g>`],
    serial: [120, (k,a) => `<g fill="${k}"><circle cx="16" cy="30" r="7">${A(a,'<animate attributeName="opacity" values="1;.4;1" dur="1.8s" repeatCount="indefinite"/>')}</circle><circle cx="38" cy="30" r="3"/><circle cx="60" cy="30" r="3"/><circle cx="82" cy="30" r="3"/><circle cx="104" cy="30" r="7">${A(a,'<animate attributeName="opacity" values=".4;1;.4" dur="1.8s" repeatCount="indefinite"/>')}</circle></g><path d="M16 82h88" stroke="${k}" stroke-width="2" stroke-dasharray="3 8"/>`],
    tesler: [112, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linecap="round"><path d="M10 20 28 30 16 42 36 52M12 80 30 70 18 58 36 52M8 52h28"/><rect x="40" y="36" width="24" height="32" rx="5"/><path d="M68 52h30m-7-7 7 7-7 7" stroke-dasharray="8 3">${A(a,'<animate attributeName="stroke-dashoffset" values="22;0" dur="1.6s" repeatCount="indefinite"/>')}</path></g>`],
    chunking: [112, (k,a) => `<g stroke="${k}" stroke-width="2.2" fill="none" stroke-linecap="round"><path d="M12 16H8v24h4M48 16h4v24h-4M68 72h-4v24h4M104 72h4v24h-4"/><path d="M18 22h22M18 28h22M18 34h22M74 78h22M74 84h22M74 90h22">${A(a,'<animate attributeName="stroke-opacity" values=".4;1;.4" dur="1.8s" repeatCount="indefinite"/>')}</path></g>`],
    gradient: [112, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.2" stroke-linecap="round"><path d="M12 88h20V70h20V52h20V34h20V16M92 16l13 5-13 6"/><circle cx="22" cy="80" r="3"/><circle cx="42" cy="62" r="4"/><circle cx="62" cy="44" r="5"/><circle cx="82" cy="26" r="6" fill="${k}" fill-opacity=".35">${A(a,'<animate attributeName="fill-opacity" values=".2;.8;.2" dur="1.4s" repeatCount="indefinite"/>')}</circle></g>`]
  });
  LAWS.peakend = [144, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 100 34 84 58 32 82 88 108 76 132 56"/><path d="M12 112h120" stroke-dasharray="2 8"/><circle cx="58" cy="32" r="7"/><circle cx="132" cy="56" r="7" fill="${k}" fill-opacity=".3">${A(a,'<animate attributeName="r" values="5;9;5" dur="1.8s" repeatCount="indefinite"/><animate attributeName="fill-opacity" values=".2;.6;.2" dur="1.8s" repeatCount="indefinite"/>')}</circle></g>`];
  // The rest of the Laws of UX (https://lawsofux.com/), one visual each
  Object.assign(LAWS, {
    // Miller's Law: about seven items fit in short-term memory
    miller: [116, (k,a) => `<g fill="${k}">${[14,28,42,56,70,84,98].map((x,i) => `<circle cx="${x}" cy="28" r="4">${A(a,`<animate attributeName="opacity" values="1;.25;1" begin="${i*.15}s" dur="1.6s" repeatCount="indefinite"/>`)}</circle>`).join('')}</g><path d="M10 40v6h92v-6" fill="none" stroke="${k}" stroke-width="2" stroke-linecap="round"/>`],
    // Von Restorff: the one item that differs is remembered
    vonrestorff: [100, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2">${[[12,12],[40,12],[12,40],[68,40],[40,68],[68,68]].map(([x,y]) => `<rect x="${x}" y="${y}" width="16" height="16" rx="2"/>`).join('')}</g><circle cx="48" cy="48" r="9" fill="${k}">${A(a,'<animate attributeName="r" values="7;11;7" dur="1.3s" repeatCount="indefinite"/>')}</circle>`],
    // Doherty Threshold: respond within 400 ms
    doherty: [104, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2.2" stroke-linecap="round"><circle cx="36" cy="40" r="20"/><path d="M32 16h8M36 16v4"/><path d="M36 40V26">${A(a,'<animateTransform attributeName="transform" type="rotate" values="0 36 40;360 36 40" dur="1.2s" repeatCount="indefinite"/>')}</path><path d="M66 80h26M74 72l-8 8 8 8"/></g>`],
    // Aesthetic-Usability Effect: pleasing design is perceived as easier
    aesthetic: [112, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linejoin="round"><rect x="12" y="18" width="40" height="30" rx="8"/><path d="M20 38h24"/><path d="M80 62l4 10 10 4-10 4-4 10-4-10-10-4 10-4z">${A(a,'<animateTransform attributeName="transform" type="rotate" values="0 80 76;90 80 76" dur="1.4s" repeatCount="indefinite"/>')}</path></g>`],
    // Postel's Law: accept varied input, return consistent output
    postel: [112, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linecap="round"><path d="M8 18l30 22M8 40h30M8 62l30-22"/><path d="M38 28h14l10 12-10 12H38z"/><path d="M62 40h36m-7-6 7 6-7 6">${A(a,'<animateTransform attributeName="transform" type="translate" values="0 0;8 0;0 0" dur="1.4s" repeatCount="indefinite"/>')}</path></g>`],
    // Occam's Razor: prefer the simplest option
    occam: [120, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linecap="round"><path d="M10 30c10-22 20 22 30 0s10 22 20 0 12 18 18-2" opacity=".55"/><path d="M10 84h96" stroke-dasharray="96">${A(a,'<animate attributeName="stroke-dashoffset" values="96;0;0;96" keyTimes="0;.45;.8;1" dur="1.8s" repeatCount="indefinite"/>')}</path><circle cx="10" cy="84" r="3" fill="${k}"/><circle cx="106" cy="84" r="3" fill="${k}"/></g>`],
    // Mental Model: the user's picture matches the system
    mentalmodel: [112, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linejoin="round"><path d="M12 14h40a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H30l-10 9v-9h-8a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z"/><rect x="24" y="24" width="16" height="14" rx="2"/><rect x="68" y="66" width="32" height="28" rx="3">${A(a,'<animate attributeName="stroke-dasharray" values="0 200;120 0" dur="1.6s" repeatCount="indefinite"/>')}</rect></g>`],
    // Cognitive Load: mental effort fills up
    cognitiveload: [104, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2"><rect x="14" y="16" width="56" height="22" rx="4"/><path d="M70 23v8"/></g><rect x="18" y="20" width="16" height="14" rx="2" fill="${k}">${A(a,'<animate attributeName="width" values="12;48;12" dur="1.8s" repeatCount="indefinite"/>')}</rect><g fill="${k}" opacity=".7"><rect x="60" y="72" width="6" height="16"/><rect x="70" y="66" width="6" height="22"/><rect x="80" y="60" width="6" height="28"/></g>`],
    // Zeigarnik Effect: unfinished tasks stay on our mind
    zeigarnik: [112, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="12" width="12" height="12" rx="2"/><path d="M15 18l3 3 5-6M32 18h26"/><rect x="12" y="32" width="12" height="12" rx="2"/><path d="M15 38l3 3 5-6M32 38h26"/><rect x="12" y="52" width="12" height="12" rx="2">${A(a,'<animate attributeName="stroke-opacity" values="1;.15;1" dur="1s" repeatCount="indefinite"/>')}</rect><path d="M32 58h16" stroke-dasharray="3 4"/></g>`],
    // Pareto Principle: 80% of effects come from 20% of causes
    pareto: [104, (k,a) => `<g stroke="${k}" stroke-width="2"><circle cx="36" cy="36" r="20" fill="none"/><path d="M36 36V16a20 20 0 0 1 19 13.8z" fill="${k}" fill-opacity=".45">${A(a,'<animateTransform attributeName="transform" type="translate" values="0 0;3 -3;0 0" dur="1.4s" repeatCount="indefinite"/>')}</path></g>`],
    // Parkinson's Law: work expands to fill the time available
    parkinson: [100, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linejoin="round"><path d="M18 12h28M18 60h28M22 12c0 14 20 16 20 24s-20 10-20 24M42 12c0 14-20 16-20 24s20 10 20 24"/></g><path d="M26 54h12l-6-8z" fill="${k}">${A(a,'<animate attributeName="opacity" values=".2;1;.2" dur="1.6s" repeatCount="indefinite"/>')}</path>`],
    // Selective Attention: we focus on what matters to the goal
    selective: [112, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2"><path d="M8 34c14-18 46-18 60 0-14 18-46 18-60 0z"/><circle cx="38" cy="34" r="8" fill="${k}" fill-opacity=".5">${A(a,'<animate attributeName="cx" values="32;44;32" dur="1.6s" repeatCount="indefinite"/>')}</circle></g><g fill="${k}" opacity=".5"><circle cx="78" cy="78" r="2"/><circle cx="92" cy="86" r="2"/><circle cx="86" cy="96" r="2"/></g>`],
    // Working Memory: a few slots hold what we need right now
    workingmemory: [112, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2">${[10,32,54,76].map(x => `<rect x="${x}" y="20" width="18" height="24" rx="3"/>`).join('')}</g><rect x="14" y="26" width="10" height="12" rx="1.5" fill="${k}">${A(a,'<animate attributeName="x" values="14;36;58;80;14" dur="2.4s" repeatCount="indefinite"/>')}</rect>`],
    // Choice Overload: too many options make choosing hard
    choiceoverload: [108, (k,a) => `<g fill="${k}">${[[14,14,3],[26,10,2],[22,24,4],[36,18,2.5],[12,30,2],[32,32,3],[44,26,2],[42,40,3.5],[24,40,2.5],[50,14,2.5]].map(([x,y,r],i) => `<circle cx="${x}" cy="${y}" r="${r}">${A(a,`<animate attributeName="opacity" values="1;.2;1" begin="${(i%4)*.2}s" dur="1s" repeatCount="indefinite"/>`)}</circle>`).join('')}</g><path d="M72 68q0-8 8-8t8 8-8 8v6M80 90v2" fill="none" stroke="${k}" stroke-width="2.2" stroke-linecap="round"/>`],
    // Flow: challenge and skill in balance
    flow: [120, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linecap="round"><path d="M12 108V12M12 108h96"/><path d="M20 84 84 20M36 100l64-64" stroke-dasharray="3 5"/></g><circle cx="40" cy="80" r="5" fill="${k}">${A(a,'<animateTransform attributeName="transform" type="translate" values="0 0;40 -40;0 0" dur="2.2s" repeatCount="indefinite"/>')}</circle>`],
    // Cognitive Bias: judgement leans one way
    cognitivebias: [116, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linecap="round"><path d="M40 20v40M28 62h24"/><g>${A(a,'<animateTransform attributeName="transform" type="rotate" values="-8 40 20;8 40 20;-8 40 20" dur="1.8s" repeatCount="indefinite"/>')}<path d="M14 20h52M14 20l-6 14h12zM66 20l-6 14h12z"/></g></g>`],
    // Paradox of the Active User: people skip the manual and start using
    paradox: [116, (k,a) => `<g fill="none" stroke="${k}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 30h20a6 6 0 0 1 6 6v26a6 6 0 0 0-6-6H14zM66 30H46a6 6 0 0 0-6 6v26a6 6 0 0 1 6-6h20z"/><path d="M10 20c20-14 60-14 84 6m-8-8 8 8-10 2">${A(a,'<animateTransform attributeName="transform" type="translate" values="0 0;6 -2;0 0" dur="1.2s" repeatCount="indefinite"/>')}</path></g>`]
  });
  Object.assign(NOTES, {
    miller:["Miller’s Law",'seven items held at once'],vonrestorff:['Von Restorff Effect','the one item that stands out'],doherty:['Doherty Threshold','a response in under 400 ms'],aesthetic:['Aesthetic-Usability Effect','a pleasing, polished surface'],postel:["Postel’s Law",'flexible input, consistent output'],occam:["Occam’s Razor",'the simplest path wins'],mentalmodel:['Mental Model','the picture users already hold'],cognitiveload:['Cognitive Load','mental effort filling up'],zeigarnik:['Zeigarnik Effect','the unfinished task stays in mind'],pareto:['Pareto Principle','the vital 20 percent'],parkinson:["Parkinson’s Law",'time that work expands to fill'],selective:['Selective Attention','focus on what matters'],workingmemory:['Working Memory','a few slots in use'],choiceoverload:['Choice Overload','too many options'],flow:['Flow','challenge matched to skill'],cognitivebias:['Cognitive Bias','judgement that leans'],paradox:['Paradox of the Active User','skipping the manual']
  });
  Object.assign(NOTES, {
    jakob:["Jakob’s Law",'familiar interface controls'],hick:["Hick’s Law",'a clear choice among options'],fitts:["Fitts’s Law",'a larger reachable target'],serial:['Serial Position Effect','emphasis at the beginning and end'],tesler:["Tesler’s Law",'complexity handled behind a simple action'],chunking:['Chunking','information organised into small units'],gradient:['Goal-Gradient Effect','visible progress toward completion'],peakend:['Peak-End Rule','a memorable peak and ending']
  });
  const descriptions = {
    proximity:'Elements placed close together feel related.', similarity:'Elements that look alike are perceived as a group.', closure:'Our minds fill in gaps to see a complete shape.', continuity:'Our eyes follow smooth, connected paths.', connectedness:'Visually linked elements feel like one group.', region:'Elements inside the same boundary feel related.', symmetry:'Balanced, mirrored shapes feel like a unified whole.', fate:'Elements moving together feel related.', figure:'Contrast separates an object from its background.', pragnanz:'We tend to perceive the simplest coherent form.', focal:'A distinctive element attracts attention first.', parallel:'Parallel elements are perceived as related.', synchrony:'Elements changing together feel connected.', familiar:'Familiar symbols draw on our past experience.', convexity:'Convex shapes tend to be perceived as objects.', emergence:'A whole form becomes apparent from its parts.', reification:'Our minds complete shapes that are only implied.', multistability:'An ambiguous image can have more than one interpretation.', invariance:'We recognise shapes despite changes in size or rotation.', jakob:'Familiar interface conventions help people use prior experience.', hick:'Reducing the number and complexity of choices can make decisions easier.', fitts:'Larger, closer targets are generally easier to reach.', serial:'People tend to remember the first and last items in a sequence.', tesler:'Handle unavoidable complexity in the system to reduce user effort.', chunking:'Break information into meaningful units to make it easier to process.', gradient:'Visible progress can encourage people to continue toward a goal.', peakend:'People often judge experiences by their strongest moments and how they end.',
    miller:'People can hold about seven items in working memory at once.', vonrestorff:'When several similar items are present, the one that differs is most likely to be remembered.', doherty:'Productivity soars when a system responds in under 400 milliseconds.', aesthetic:'People perceive aesthetically pleasing design as more usable.', postel:'Be liberal in what you accept and conservative in what you send.', occam:'Among competing options, the one with the fewest assumptions is usually best.', mentalmodel:'People bring a model of how a system works and expect the design to match it.', cognitiveload:'Interfaces should keep the mental effort needed to use them low.', zeigarnik:'People remember uncompleted or interrupted tasks better than completed ones.', pareto:'Roughly 80% of the effects come from 20% of the causes.', parkinson:'Any task will inflate until all of the available time is spent.', selective:'People focus attention on the stimuli related to their goals.', workingmemory:'A small, temporary store holds the information needed to complete a task.', choiceoverload:'Too many options can overwhelm people and make decisions harder.', flow:'Deep focus happens when a task’s challenge matches a person’s skill.', cognitivebias:'Systematic errors in thinking shape how people perceive and decide.', paradox:'Users never read manuals; they start using the software immediately.'
  };
  // Every visual key is allocated once across the complete site.
  const PLANS = {
    // Laws of UX first (Home, then About, then the case studies); Gestalt laws only on the last cards
    'index.html': ['jakob','fitts','hick','miller','vonrestorff','doherty','aesthetic'],
    'about.html': ['tesler','postel','occam','peakend'],
    'case-tractor-connect.html': ['serial','chunking','gradient','mentalmodel','cognitiveload',null,'zeigarnik'],
    'case-staff-dashboard.html': ['pareto','parkinson','selective','workingmemory',null,null,'choiceoverload'],
    'case-billora-ai.html': ['flow','cognitivebias','paradox','proximity',null,null,'similarity']
  };
  const page = location.pathname.split('/').pop() || 'index.html';
  const plan = PLANS[page];
  if (!plan) return;
  const about = page === 'about.html';
  const home = page === 'index.html';
  const selector = about ? '.principle, .contact' : home ? '.cover, .tweet-card, .accordion-css__card' : '.cs-hero__stage, .cs-meta, .goal, .card, .next__card';
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
      const law = key;
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
