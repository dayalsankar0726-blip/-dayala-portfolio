/* Resume viewer: every link to the resume PDF opens an in-page preview with
   Download and Open buttons instead of downloading straight away.
   The preview is a high-resolution image of the PDF, because embedded PDF
   viewers are blank on phones and inconsistent across browsers; Download and
   Open give the real PDF. Without JavaScript the links open the PDF directly.
   When the resume changes, regenerate assets/resume-preview.jpg too. */
(function () {
  var PDF = 'assets/Dayala-Sankaran-Resume.pdf?v=3';
  var IMG = 'assets/resume-preview.jpg?v=1';
  var FILE = 'Dayala-Sankaran-Resume.pdf';

  var css = [
    '.rv{position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;font-family:var(--body,"Quicksand",Arial,sans-serif);color:var(--dark,#23301F)}',
    '.rv::backdrop{background:rgba(35,48,31,.6)}',
    '.rv[open]{display:flex;align-items:center;justify-content:center}',
    '.rv__panel{display:flex;flex-direction:column;width:min(56rem,calc(100% - 2rem));height:calc(100% - 2rem);background:var(--light,#FAF6EC);border:.125rem solid var(--dark,#23301F);border-radius:1.25rem;box-shadow:0 .4rem 0 0 rgba(0,0,0,.18);overflow:hidden}',
    '.rv__bar{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;padding:.75rem .75rem .75rem 1.25rem;border-bottom:.125rem solid var(--dark,#23301F)}',
    '.rv__title{margin:0 auto 0 0;font-family:var(--display,"Arial Black",sans-serif);font-weight:400;font-size:1.35rem;line-height:1.2}',
    '.rv__btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;height:2.6rem;padding:0 1.1rem;border:.125rem solid var(--dark,#23301F);border-radius:10em;background:#fff;color:inherit;font:inherit;font-weight:700;font-size:.95rem;text-decoration:none;cursor:pointer;box-shadow:0 .2rem 0 0 rgba(0,0,0,.15);transition:transform .2s ease}',
    '.rv__btn:hover{transform:translateY(-2px)}',
    '.rv__btn:focus-visible{outline:3px solid var(--dark,#23301F);outline-offset:3px}',
    '.rv__btn--primary{background:var(--pink,#A7C7E7)}',
    '.rv__btn--icon{width:2.6rem;padding:0;font-size:1.3rem;line-height:1}',
    '.rv__btn svg{width:1.05em;height:1.05em;flex:none}',
    '.rv__body{flex:1;min-height:0;background:#e9e5da;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}',
    '.rv__img{display:block;width:100%;max-width:52rem;height:auto;margin:1rem auto;background:#fff;box-shadow:0 .2rem .8rem rgba(0,0,0,.15)}',
    '@media (max-width:600px){.rv__panel{width:100%;height:100%;border-radius:0;border:0}.rv__bar{padding:.6rem .6rem .6rem 1rem}.rv__title{font-size:1.1rem}.rv__btn{height:2.4rem;padding:0 .9rem;font-size:.9rem}.rv__btn--icon{width:2.4rem;padding:0}.rv__open-label{display:none}.rv__img{margin:0;box-shadow:none}}',
    '@media (prefers-reduced-motion:reduce){.rv__btn{transition:none}.rv__btn:hover{transform:none}}'
  ].join('');

  var ICON_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>';
  var ICON_OPEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';

  var dialog, body, lastFocus;

  function scroller(on) {
    try { if (typeof lenis !== 'undefined' && lenis) { on ? lenis.start() : lenis.stop(); } } catch (e) {}
  }

  function build() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    dialog = document.createElement('dialog');
    dialog.className = 'rv';
    dialog.setAttribute('aria-labelledby', 'rv-title');
    dialog.innerHTML =
      '<div class="rv__panel">' +
        '<div class="rv__bar">' +
          '<h2 class="rv__title" id="rv-title">Résumé</h2>' +
          '<a class="rv__btn rv__btn--primary" href="' + PDF + '" download="' + FILE + '">' + ICON_DL + 'Download PDF</a>' +
          '<a class="rv__btn" href="' + PDF + '" target="_blank" rel="noopener">' + ICON_OPEN + '<span class="rv__open-label">Open in new tab</span></a>' +
          '<button class="rv__btn rv__btn--icon" type="button" aria-label="Close résumé" data-rv-close>&times;</button>' +
        '</div>' +
        '<div class="rv__body" data-lenis-prevent></div>' +
      '</div>';
    // Give the icon-only "open" button a name on phones.
    dialog.querySelector('a[target]').setAttribute('aria-label', 'Open résumé PDF in a new tab');
    body = dialog.querySelector('.rv__body');
    document.body.appendChild(dialog);

    dialog.querySelector('[data-rv-close]').addEventListener('click', close);
    dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
    dialog.addEventListener('close', function () {
      scroller(true);
      document.documentElement.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    });
  }

  function open(trigger) {
    if (!dialog) build();
    lastFocus = trigger;
    if (!body.firstChild) {
      body.innerHTML = '<img class="rv__img" src="' + IMG + '" width="1313" height="1700" alt="Dayala Sankaran résumé. Use Download PDF for the full text.">';
    }
    scroller(false);
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    dialog.querySelector('.rv__btn--primary').focus();
  }

  function close() { if (dialog && dialog.open) dialog.close(); }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href*="Dayala-Sankaran-Resume.pdf"]');
    if (!a || (dialog && dialog.contains(a))) return;
    if (typeof HTMLDialogElement !== 'function') return; // very old browsers: follow the link
    e.preventDefault();
    open(a);
  });
})();
