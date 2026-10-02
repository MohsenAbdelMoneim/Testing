/* ================================================================
   Animation Engine — Extended
   Reveal · Stagger · Parallax · Magnetic · Count-Up · Tilt
   Text split · Scroll velocity · Section titles
   ================================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ---------- 1. Stagger index ---------- */
  function initStaggerIndexes() {
    document.querySelectorAll('[data-stagger]').forEach(parent => {
      Array.from(parent.children).forEach((child, i) => {
        child.style.setProperty('--i', i);
      });
    });
  }

  /* ---------- 2. Reveal on scroll ---------- */
  function initReveal() {
    const targets = document.querySelectorAll('[data-reveal], [data-stagger]');
    if (!targets.length) return;

    if (prefersReduced) {
      targets.forEach(el => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => el.classList.add('in-view'), delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(el => io.observe(el));
  }

  /* ---------- 3. Hero parallax ---------- */
  function initParallax() {
    if (prefersReduced || window.innerWidth < 992) return;
    const visual = document.querySelector('.hero-visual');
    const copy = document.querySelector('.hero-copy');
    if (!visual) return;

    let raf = null;
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          visual.style.transform = `translateY(${y * 0.1}px)`;
          if (copy) copy.style.transform = `translateY(${y * 0.05}px)`;
        }
        raf = null;
      });
    }, { passive: true });
  }

  /* ---------- 4. Magnetic buttons ---------- */
  function initMagnetic() {
    if (prefersReduced || isTouch) return;
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      const strength = parseFloat(btn.dataset.magneticStrength || 0.22);
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ---------- 5. Count-up ---------- */
  function initCountUp() {
    document.querySelectorAll('[data-count]').forEach(node => {
      const target = parseFloat(node.dataset.count);
      const decimals = (node.dataset.count.split('.')[1] || '').length;
      let current = 0;
      const steps = 60;
      const step = target / steps;

      const io = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const tick = () => {
          current += step;
          if (current >= target) node.textContent = target.toFixed(decimals);
          else {
            node.textContent = current.toFixed(decimals);
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      }, { threshold: 0.5 });
      io.observe(node);
    });
  }

  /* ---------- 6. Marquee pause on hover ---------- */
  function initMarqueePause() {
    document.querySelectorAll('.marquee').forEach(m => {
      const track = m.querySelector('.marquee-track');
      if (!track) return;
      m.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
      m.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
    });
  }

  /* ---------- 7. Card 3D tilt ---------- */
  function initTilt() {
    if (prefersReduced || isTouch) return;
    document.querySelectorAll('[data-tilt]').forEach(card => {
      const max = parseFloat(card.dataset.tiltMax || 5);
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateY(-6px)`;
        card.style.transition = 'transform 120ms ease-out';

        // Track mouse for the radial glow
        card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = '';
      });
    });
  }

  /* ---------- 8. Split text — words reveal on scroll ---------- */
  function initSplitText() {
    if (prefersReduced) return;

    document.querySelectorAll('[data-split]').forEach(el => {
      const text = el.textContent.trim();
      el.innerHTML = '';
      const words = text.split(/\s+/);
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.style.setProperty('--wi', i);
        span.textContent = word;
        el.appendChild(span);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
    });

    // Reveal on view
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('split-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-split]').forEach(el => io.observe(el));
  }

  /* ---------- 9. Scroll velocity → subtle skew ---------- */
  function initScrollVelocity() {
    if (prefersReduced) return;

    const targets = document.querySelectorAll('.section-title, .contact-title');
    if (!targets.length) return;

    let lastY = window.scrollY;
    let velocity = 0;
    let raf = null;

    const loop = () => {
      velocity *= 0.92;
      const skew = Math.max(-3, Math.min(3, velocity * 0.12));
      targets.forEach(t => {
        t.style.transform = `skewY(${skew}deg)`;
      });
      if (Math.abs(velocity) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        targets.forEach(t => { t.style.transform = ''; });
        raf = null;
      }
    };

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      velocity = y - lastY;
      lastY = y;
      if (!raf && Math.abs(velocity) > 1) raf = requestAnimationFrame(loop);
    }, { passive: true });
  }

  /* ---------- 10. Nav-brand letter wiggle on hover ---------- */
  function initBrandWiggle() {
    const brand = document.querySelector('.brand');
    if (!brand) return;
    brand.addEventListener('mouseenter', () => {
      brand.classList.add('wiggle');
      setTimeout(() => brand.classList.remove('wiggle'), 800);
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    initStaggerIndexes();
    initReveal();
    initParallax();
    initMagnetic();
    initCountUp();
    initMarqueePause();
    initTilt();
    initSplitText();
    initScrollVelocity();
    initBrandWiggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  /* ---------- 11. Role rotator (rotating words in hero) ---------- */
function initRoleRotator() {
  const rotator = document.querySelector('.role-rotator');
  if (!rotator) return;

  const words = Array.from(rotator.querySelectorAll('.role-word'));
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

/* ---------- 12. Count-up inside hero stats ---------- */
function initHeroStats() {
  const stats = document.querySelectorAll('.hero-stats [data-count]');
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
        // Ease-out-expo
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        const value = Math.round(target * eased);
        el.textContent = value;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = String(target);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => io.observe(el));
}

/* ---------- 13. Starfield — random dots ---------- */
function initStarfield() {
  const host = document.getElementById('starfield');
  if (!host) return;
  // Already handled by CSS pseudo elements; nothing to do.
  // But we add slight mouse parallax to the whole stage
  if (window.matchMedia('(hover: none)').matches) return;

  let raf = null;
  let mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      mx = (e.clientX / window.innerWidth - 0.5) * 12;
      my = (e.clientY / window.innerHeight - 0.5) * 12;
      host.style.transform = `translate(${mx}px, ${my}px)`;
      const beams = document.querySelectorAll('.stage-beam');
      beams.forEach((b, i) => {
        b.style.marginTop = `${my * (i ? -1 : 1)}px`;
      });
      raf = null;
    });
  }, { passive: true });
}

/* ---------- 14. Hero scene mouse parallax (subtle) ---------- */
function initHeroParallax() {
  if (prefersReduced || window.innerWidth < 992) return;
  const visual = document.querySelector('.hero-visual');
  if (!visual) return;

  let raf = null;
  visual.addEventListener('mousemove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const r = visual.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const card = visual.querySelector('.code-card');
      const orbits = visual.querySelectorAll('.orbit');
      const chips = visual.querySelectorAll('.chip');

      if (card) {
        card.style.setProperty('--px', px.toFixed(3));
        card.style.setProperty('--py', py.toFixed(3));
      }
      orbits.forEach((o, i) => {
        o.style.marginLeft = `${px * (i + 1) * 10}px`;
        o.style.marginTop  = `${py * (i + 1) * 10}px`;
      });
      chips.forEach((c, i) => {
        c.style.marginLeft = `${px * (i + 1) * 4}px`;
        c.style.marginTop  = `${py * (i + 1) * 4}px`;
      });
      raf = null;
    });
  }, { passive: true });

  visual.addEventListener('mouseleave', () => {
    const orbits = visual.querySelectorAll('.orbit');
    const chips = visual.querySelectorAll('.chip');
    orbits.forEach(o => { o.style.marginLeft = ''; o.style.marginTop = ''; });
    chips.forEach(c => { c.style.marginLeft = ''; c.style.marginTop = ''; });
  });
}

/* ---------- 15. Typing text effect for hero-desc ---------- */
function initHeroTyping() {
  if (prefersReduced) return;
  const el = document.querySelector('.hero-desc');
  if (!el) return;
  // Skip — Arabic/LTR mixing makes typing look odd. Left as placeholder.
}
})();