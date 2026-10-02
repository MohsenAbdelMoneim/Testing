/* ================================================================
   Mohsen.dev — Main script
   Preloader · Theme · Nav · Mobile menu · Cursor · Particles
   Projects filter · Modal · Copy email · Toasts · Footer
   ================================================================ */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  const t = (key) => (window.mohsenI18n ? window.mohsenI18n.t(key) : key);

  /* ---------- 1. Preloader ---------- */
/* ---------- 1. Preloader (fallback — cinema intro runs first) ---------- */
function initPreloader() {
  // Cinema intro handles `body.loaded`. This is a failsafe only.
  setTimeout(() => {
    if (!document.body.classList.contains('loaded')) {
      document.body.classList.add('loaded');
    }
  }, 4500);
}

  /* ---------- 2. Theme toggle ---------- */
  function initTheme() {
    const root = document.documentElement;
    const btn = $('#themeToggle');
    const meta = $('#metaTheme');
    const KEY = 'mohsen-theme';

    const apply = (theme) => {
      root.dataset.theme = theme;
      if (meta) meta.content = theme === 'dark' ? '#060A13' : '#F4F6FB';
      try { localStorage.setItem(KEY, theme); } catch (e) {}
    };

    if (!root.dataset.theme) {
      let saved = 'dark';
      try { saved = localStorage.getItem(KEY) || 'dark'; } catch (e) {}
      apply(saved);
    }

    btn?.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      toast(next === 'dark' ? t('toast.dark') : t('toast.light'), 'bi-circle-half');
    });
  }

  /* ---------- 3. Nav ---------- */
  function initNav() {
    const nav = $('#siteNav');
    const links = $$('.nav-link');
    const indicator = $('.nav-indicator');
    const sections = $$('main section[id]');

    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const moveIndicator = (el) => {
      if (!indicator || !el) return;
      const parent = el.parentElement;
      const pRect = parent.getBoundingClientRect();
      const lRect = el.getBoundingClientRect();
      indicator.style.left = `${lRect.left - pRect.left}px`;
      indicator.style.width = `${lRect.width}px`;
      indicator.classList.add('ready');
    };

    const setActive = (id) => {
      links.forEach(l => {
        const match = l.getAttribute('href') === `#${id}`;
        l.classList.toggle('is-active', match);
        if (match) moveIndicator(l);
      });
    };

    requestAnimationFrame(() => {
      const first = links.find(l => l.classList.contains('is-active')) || links[0];
      moveIndicator(first);
    });

    const spy = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach(s => spy.observe(s));

    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        closeMenu();
      });
    });

    window.addEventListener('resize', () => {
      const active = links.find(l => l.classList.contains('is-active'));
      if (active) moveIndicator(active);
    });
  }

  /* ---------- 4. Mobile menu ---------- */
  function closeMenu() {
    document.body.classList.remove('menu-open');
    const btn = $('#menuToggle');
    const menu = $('#mobileMenu');
    btn?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
  }

  function initMobileMenu() {
    const btn = $('#menuToggle');
    const menu = $('#mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- 5. Custom cursor ---------- */
  function initCursor() {
    if (isTouch || prefersReduced) return;
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    const label = $('.cursor-label');
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let seen = false;

    document.body.classList.add('cursor-on');

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!seen) { seen = true; document.body.classList.add('cursor-seen'); }
    }, { passive: true });

    const raf = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    document.addEventListener('mousedown', () => ring.classList.add('is-down'));
    document.addEventListener('mouseup', () => ring.classList.remove('is-down'));

    const hoverSelector = 'a, button, .project-card, .skill-badge, .filter-pill, .contact-pill, [data-magnetic], .fab';
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(hoverSelector);
      if (!target) return;
      ring.classList.add('is-hover');
      const cursorLabel = target.dataset.cursor;
      if (cursorLabel && label) {
        label.textContent = cursorLabel;
        ring.classList.add('has-label');
      }
    });
    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(hoverSelector);
      if (!target) return;
      ring.classList.remove('is-hover');
      ring.classList.remove('has-label');
    });
  }

  /* ---------- 6. Particles ---------- */
  function initParticles() {
    const canvas = $('#bg-particles');
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    let w, h, dpr, particles = [];
    let running = true;

    const rgb = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--particle').trim();
      return v || '125, 170, 255';
    };
    let color = rgb();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      const count = window.innerWidth < 768 ? 28 : 55;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35 * dpr,
        vy: (Math.random() - 0.5) * 0.35 * dpr,
        r: (Math.random() * 1.6 + 0.5) * dpr
      }));
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, 0.55)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          const max = 130 * dpr;
          if (d2 < max * max) {
            const alpha = (1 - Math.sqrt(d2) / max) * 0.2;
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(step);
    };

    resize();
    step();

    window.addEventListener('resize', () => { color = rgb(); resize(); });
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) step();
    });
    $('#themeToggle')?.addEventListener('click', () => { color = rgb(); });
  }

  /* ---------- 7. Projects ---------- */
  function initProjects() {
    const grid = $('#projectsGrid');
    if (!grid) return;

    const cards = $$('.project-card', grid);
    const pills = $$('.filter-pill');
    const count = $('#projCount');
    const toggleAll = $('#toggleAll');
    const collapse = $$('[data-collapsible]');
    let expanded = false;

    const applyCollapse = () => {
      collapse.forEach(c => c.classList.toggle('is-hidden', !expanded));
      if (toggleAll) {
        toggleAll.setAttribute('aria-expanded', String(expanded));
        const span = toggleAll.querySelector('span');
        if (span) span.textContent = expanded ? t('proj.showLess') : t('proj.showAll');
      }
    };
    applyCollapse();

    toggleAll?.addEventListener('click', () => {
      expanded = !expanded;
      applyCollapse();
      if (!expanded) {
        $('#projects')?.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });

    const setFilter = (filter) => {
      let shown = 0;
      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(/\s+/);
        const matches = filter === 'all' || tags.includes(filter);
        const inCollapse = card.hasAttribute('data-collapsible') && !expanded;
        const visible = matches && !inCollapse;
        card.classList.toggle('is-hidden', !visible);
        if (visible) {
          shown++;
          card.style.setProperty('--fd', `${shown * 40}ms`);
        }
      });
      if (count) count.textContent = `${shown} / 11`;
    };

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => { p.classList.remove('is-active'); p.setAttribute('aria-pressed', 'false'); });
        pill.classList.add('is-active');
        pill.setAttribute('aria-pressed', 'true');
        setFilter(pill.dataset.filter);
      });
    });
  }

  /* ---------- 8. Modal ---------- */
  function initModal() {
    const modalEl = $('#projectModal');
    if (!modalEl || typeof bootstrap === 'undefined') return;
    const modal = new bootstrap.Modal(modalEl);

    const fill = (card) => {
      const cover = card.querySelector('.pc-cover')?.cloneNode(true);
      const idx = card.querySelector('.pc-meta span:first-child')?.textContent || '';
      const cat = card.querySelector('.pc-meta span:last-child')?.textContent || '';
      const title = card.querySelector('.pc-title')?.textContent || '';
      const desc = card.querySelector('.pc-desc')?.textContent || '';
      const tags = Array.from(card.querySelectorAll('.pc-tags span')).map(s => s.textContent);
      const live = card.querySelector('.btn-mini[href]')?.href || '#';
      const repo = card.querySelector('.btn-mini--ghost[href]')?.href || '#';

      const coverHost = $('#pmCover');
      coverHost.innerHTML = '';
      if (cover) coverHost.appendChild(cover);

      $('#pmIdx').textContent = idx;
      $('#pmCat').textContent = cat;
      $('#pmTitle').textContent = title;
      $('#pmDesc').textContent = desc;
      $('#pmLive').href = live;
      $('#pmRepo').href = repo;

      const techHost = $('#pmTech');
      techHost.innerHTML = '';
      tags.forEach(tg => {
        const span = document.createElement('span');
        span.className = 'pm-chip';
        span.textContent = tg;
        techHost.appendChild(span);
      });
    };

    $$('.project-card').forEach(card => {
      const open = () => { fill(card); modal.show(); };
      card.addEventListener('click', (e) => { if (e.target.closest('a')) return; open(); });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }

  /* ---------- 9. Toast ---------- */
  function toast(message, icon = 'bi-check-circle') {
    const stack = $('.toast-stack');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
    stack.appendChild(el);
    setTimeout(() => {
      el.classList.add('toast-hide');
      setTimeout(() => el.remove(), 400);
    }, 2200);
  }
  window.mohsenToast = toast;

  /* ---------- 10. Copy email ---------- */
  function initCopyEmail() {
    const strip = $('#emailStrip');
    if (!strip) return;

    strip.addEventListener('click', async () => {
      const email = strip.querySelector('.email-text')?.textContent?.trim();
      if (!email) return;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const ta = document.createElement('textarea');
          ta.value = email;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        toast(t('toast.copied'), 'bi-clipboard-check');
      } catch (e) {
        toast(t('toast.copyFail'), 'bi-exclamation-triangle');
      }
    });
  }

  /* ---------- 11. Download CV ---------- */
  function initDownloadCV() {
    $('#downloadCV')?.addEventListener('click', () => {
      toast(t('toast.print'), 'bi-printer');
      setTimeout(() => window.print(), 350);
    });
  }

  /* ---------- 12. Footer ---------- */
  function initFooter() {
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    const clock = $('#localClock');
    if (clock) {
      const tick = () => {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        clock.textContent = `${hh}:${mm}`;
      };
      tick();
      setInterval(tick, 30000);
    }
  }

  /* ---------- Boot ---------- */
  function boot() {
    initPreloader();
    initTheme();
    initNav();
    initMobileMenu();
    initCursor();
    initParticles();
    initProjects();
    initModal();
    initCopyEmail();
    initDownloadCV();
    initFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();