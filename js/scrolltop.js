/* ================================================================
   Scroll To Top + Scroll Progress
   ================================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('scrollTop');
    const ring = btn?.querySelector('.progress-ring__circle');
    const progressBar = document.getElementById('scrollProgress');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!btn) return;

    const circleLen = ring ? 2 * Math.PI * 20 : 0;
    if (ring) {
      ring.style.strokeDasharray = `${circleLen}`;
      ring.style.strokeDashoffset = `${circleLen}`;
    }

    let visible = false;

    const update = () => {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(scrollY / max, 1) : 0;

      // Progress ring
      if (ring) {
        ring.style.strokeDashoffset = String(circleLen * (1 - ratio));
      }

      // Top progress bar
      if (progressBar) {
        progressBar.style.transform = `scaleX(${ratio})`;
      }

      // Show / hide button
      const shouldShow = scrollY > 400;
      if (shouldShow !== visible) {
        visible = shouldShow;
        btn.classList.toggle('is-visible', visible);
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    });
  });
})();