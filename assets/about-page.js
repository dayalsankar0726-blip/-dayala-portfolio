// Match the homepage: the corner mascot appears after the hero.
(() => {
  const hero = document.querySelector('.about-hero');
  if (!hero || !('IntersectionObserver' in window)) {
    document.body.classList.remove('about-hero-in-view');
    return;
  }
  const nav = document.querySelector('.nav-bar');
  let observer;
  const observe = () => {
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(entries => {
      document.body.classList.toggle('about-hero-in-view', entries[0].isIntersecting);
    }, { rootMargin: `-${Math.round(nav.getBoundingClientRect().height)}px 0px 0px` });
    observer.observe(hero);
  };
  observe();
  addEventListener('resize', observe);
})();
