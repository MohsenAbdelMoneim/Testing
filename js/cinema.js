/* ================================================================
   🎬 Cinema Engine
   - Cinema intro sequence
   - Meteors canvas (falling streaks)
   - Chapter dots (scroll spy)
   - Cursor trail
   - Hero stage mouse parallax
   ================================================================ */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ============================================================
     1. Cinema Intro Sequence
     ============================================================ */
  function initCinemaIntro() {
    const intro = $('#cinemaIntro');
    if (!intro) return;

    if (prefersReduced) {
      intro.classList.add('is-done');
      document.body.classList.add('loaded');
      return;
    }

    // Prevent scroll during intro
    document.body.style.overflow = 'hidden';

    // Sequence timing
    const OPEN_DELAY = 2400;   // bars start opening
    const DONE_DELAY = 3400;   // intro removed

    setTimeout(() => {
      intro.classList.add('is-open');
    }, OPEN_DELAY);

    setTimeout(() => {
      intro.classList.add('is-done');
      document.body.style.overflow = '';
      document.body.classList.add('loaded');
    }, DONE_DELAY);

    // Skip on click/tap
    const skip = () => {
      intro.classList.add('is-open');
      setTimeout(() => {
        intro.classList.add('is-done');
        document.body.style.overflow = '';
        document.body.classList.add('loaded');
      }, 400);
      intro.removeEventListener('click', skip);
      window.removeEventListener('keydown', skip);
    };
    intro.addEventListener('click', skip);
    window.addEventListener('keydown', skip, { once: true });
  }

  /* ============================================================
     2. Meteors (falling streaks on canvas)
     ============================================================ */
  function initMeteors() {
    const canvas = $('#bg-meteors');
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    let w, h, dpr, meteors = [];
    let running = true;

    const color = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--particle').trim();
      return v || '125, 170, 255';
    };
    let rgb = color();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    const spawn = () => {
      const angle = (Math.random() * 20 + 55) * Math.PI / 180;
      const speed = (Math.random() * 4 + 6) * dpr;
      meteors.push({
        x: Math.random() * w,
        y: -50 * dpr,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: (Math.random() * 80 + 60) * dpr,
        life: 1,
        decay: Math.random() * 0.004 + 0.003
      });
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      if (meteors.length < 6 && Math.random() < 0.02) spawn();

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;

        if (m.life <= 0 || m.y > h + 100 || m.x < -100 || m.x > w + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * m.len / 10, m.y - m.vy * m.len / 10);
        grad.addColorStop(0, `rgba(${rgb}, ${0.8 * m.life})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * m.len / 10, m.y - m.vy * m.len / 10);
        ctx.stroke();
      }

      requestAnimationFrame(step);
    };

    resize();
    step();

    window.addEventListener('resize', () => { rgb = color(); resize(); });
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) step();
    });
    $('#themeToggle')?.addEventListener('click', () => { rgb = color(); });
  }

  /* ============================================================
     3. Chapter Dots (scroll spy)
     ============================================================ */
  function initChapterDots() {
    const dots = $$('.ch-dot');
    if (!dots.length) return;

    const sections = $$('main section[id]');

    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      dots.forEach(d => {
        d.classList.toggle('is-active', d.dataset.ch === visible.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach(s => io.observe(s));

    dots.forEach(d => {
      d.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(d.dataset.ch);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ============================================================
     4. Cursor Trail
     ============================================================ */
  function initCursorTrail() {
    if (isTouch || prefersReduced) return;
    const trail = $('#cursorTrail');
    if (!trail) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let tx = mx, ty = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });

    const loop = () => {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      trail.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ============================================================
     5. Hero Stage Parallax (mouse)
     ============================================================ */
  function initHeroStageParallax() {
    if (prefersReduced || isTouch) return;
    const hero = $('.hero--cinema');
    if (!hero) return;

    const stage = hero.querySelector('.hero-stage');
    const beams = hero.querySelectorAll('.stage-beam');
    const rings = hero.querySelectorAll('.stage-ring');
    const floatCode = hero.querySelector('.float-code');

    let raf = null;

    hero.addEventListener('mousemove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;

        if (stage) {
          stage.style.transform = `translate(${px * 20}px, ${py * 20}px)`;
        }
        beams.forEach((b, i) => {
          const f = (i + 1) * 8;
          b.style.marginLeft = `${px * f}px`;
          b.style.marginTop = `${py * f}px`;
        });
        rings.forEach((rg, i) => {
          const f = (i + 1) * 6;
          rg.style.marginLeft = `${px * f}px`;
          rg.style.marginTop = `${py * f}px`;
        });
        if (floatCode) {
          floatCode.style.transform = `translate(${px * -30}px, ${py * -30}px)`;
        }
        raf = null;
      });
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      if (stage) stage.style.transform = '';
      if (floatCode) floatCode.style.transform = '';
      beams.forEach(b => { b.style.marginLeft = ''; b.style.marginTop = ''; });
      rings.forEach(rg => { rg.style.marginLeft = ''; rg.style.marginTop = ''; });
    });
  }

  /* ============================================================
     6. Role Rotator (in hero)
     ============================================================ */
  function initRoleRotator() {
    const rotator = $('.role-rotator');
    if (!rotator) return;
    const words = $$('.role-word', rotator);
    if (words.length < 2) return;

    let idx = 0;
    setInterval(() => {
      const current = words[idx];
      idx = (idx + 1) % words.length;
      const next = words[idx];
      current.classList.remove('is-active');
      current.classList.add('is-leaving');
      setTimeout(() => current.classList.remove('is-leaving'), 700);
      next.classList.add('is-active');
    }, 2600);
  }

  /* ============================================================
     7. Hero Stats Count-Up
     ============================================================ */
  function initHeroStats() {
    const stats = $$('.hero-stats [data-count]');
    if (!stats.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const duration = 1600;
        const start = performance.now();

        const tick = (now) => {
          const elapsed = now - start;
          const p = Math.min(elapsed / duration, 1);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = String(target);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    stats.forEach(el => io.observe(el));
  }

  /* ============================================================
     Boot
     ============================================================ */
  function boot() {
    initCinemaIntro();
    initMeteors();
    initChapterDots();
    initCursorTrail();
    initHeroStageParallax();
    initRoleRotator();
    initHeroStats();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();