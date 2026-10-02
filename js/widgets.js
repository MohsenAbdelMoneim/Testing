/* ================================================================
   🕐 Widgets Engine
   Live clock · Hijri date · Theme palette · Load badge ·
   Keyboard shortcuts · Multi-cursor contexts
   ================================================================ */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isTouch = window.matchMedia('(hover: none)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STORAGE = {
    palette: 'mohsen-palette',
    mode: 'mohsen-mode',
    timezone: 'mohsen-tz'
  };

  const getLang = () => document.documentElement.dataset.lang || 'ar';
  const isRTL = () => document.documentElement.dir === 'rtl';

  /* ============================================================
     1. LIVE CLOCK & DATE WIDGET
     ============================================================ */
  function initClock() {
    const widget = $('#clockWidget');
    if (!widget) return;

    const trigger = $('#clockTrigger');
    const panel = $('#clockPanel');
    const closeBtn = $('#clockClose');

    const els = {
      mini: $('#clockMini'),
      hour: $('#clockHour'),
      min: $('#clockMinute'),
      sec: $('#clockSecond'),
      ampm: $('#clockAmpm'),
      progress: $('#clockProgress'),
      day: $('#clockDay'),
      date: $('#clockDate'),
      hijri: $('#clockHijri'),
      zone: $('#clockZone'),
      greeting: $('#clockGreeting'),
      emoji: $('#clockEmoji')
    };

    // Timezone state
    let activeTZ = 'Africa/Cairo';
    try {
      const saved = localStorage.getItem(STORAGE.timezone);
      if (saved) activeTZ = saved;
    } catch (e) {}

    // Update zone pills
    const zonePills = $$('.clock-zone-pill', panel);
    zonePills.forEach(p => {
      if (p.dataset.tz === activeTZ) p.classList.add('is-active');
      else p.classList.remove('is-active');

      p.addEventListener('click', () => {
        activeTZ = p.dataset.tz;
        try { localStorage.setItem(STORAGE.timezone, activeTZ); } catch (e) {}
        zonePills.forEach(x => x.classList.toggle('is-active', x === p));
        if (els.zone) els.zone.textContent = activeTZ.replace('_', ' ');
        updateAll();
      });
    });

    // Toggle panel
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('is-open');
    });
    closeBtn?.addEventListener('click', () => panel.classList.remove('is-open'));
    document.addEventListener('click', (e) => {
      if (!widget.contains(e.target)) panel.classList.remove('is-open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') panel.classList.remove('is-open');
    });

    /* ----- Time formatter ----- */
    const getTimeInTZ = (date, tz) => {
      return new Date(date.toLocaleString('en-US', { timeZone: tz }));
    };

    /* ----- Greeting by hour ----- */
    const getGreeting = (hour) => {
      const lang = getLang();
      const greetings = {
        ar: {
          morning: 'صباح الخير',
          afternoon: 'مساء الخير',
          evening: 'مساء الخير',
          night: 'ليلة سعيدة'
        },
        en: {
          morning: 'Good morning',
          afternoon: 'Good afternoon',
          evening: 'Good evening',
          night: 'Good night'
        }
      };
      const g = greetings[lang] || greetings.en;
      if (hour >= 5 && hour < 12) return { text: g.morning, emoji: '🌅' };
      if (hour >= 12 && hour < 17) return { text: g.afternoon, emoji: '☀️' };
      if (hour >= 17 && hour < 21) return { text: g.evening, emoji: '🌆' };
      return { text: g.night, emoji: '🌙' };
    };

    /* ----- Date formatter ----- */
    const formatDate = (date, tz) => {
      const lang = getLang();
      const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
      return date.toLocaleDateString(locale, {
        timeZone: tz,
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatDay = (date, tz) => {
      const lang = getLang();
      const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
      return date.toLocaleDateString(locale, {
        timeZone: tz,
        weekday: 'long'
      });
    };

    const formatHijri = (date, tz) => {
      try {
        const lang = getLang();
        const locale = lang === 'ar' ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic';
        return date.toLocaleDateString(locale, {
          timeZone: tz,
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (e) {
        return '—';
      }
    };

    /* ----- Update all pieces ----- */
    const updateAll = () => {
      const now = new Date();
      const tz = activeTZ;
      const local = getTimeInTZ(now, tz);

      const h24 = local.getHours();
      const h12 = h24 % 12 || 12;
      const m = String(local.getMinutes()).padStart(2, '0');
      const s = String(local.getSeconds()).padStart(2, '0');
      const ampm = h24 >= 12
        ? (getLang() === 'ar' ? 'م' : 'PM')
        : (getLang() === 'ar' ? 'ص' : 'AM');

      // Digital
      if (els.hour) els.hour.textContent = String(h12).padStart(2, '0');
      if (els.min)  els.min.textContent = m;
      if (els.sec)  els.sec.textContent = s;
      if (els.ampm) els.ampm.textContent = ampm;

      // Mini
      if (els.mini) {
        els.mini.textContent = `${String(h12).padStart(2, '0')}:${m}`;
      }

      // Progress (seconds within minute)
      if (els.progress) {
        const pct = (local.getSeconds() / 60) * 100;
        els.progress.style.width = `${pct}%`;
      }

      // Dates
      if (els.day)   els.day.textContent = formatDay(now, tz);
      if (els.date)  els.date.textContent = formatDate(now, tz);
      if (els.hijri) els.hijri.textContent = formatHijri(now, tz);
      if (els.zone)  els.zone.textContent = tz.replace('_', ' ');

      // Greeting
      const greet = getGreeting(h24);
      if (els.greeting) els.greeting.textContent = greet.text;
      if (els.emoji) els.emoji.textContent = greet.emoji;

      // Update zone pills mini-times
      zonePills.forEach(p => {
        const t = p.querySelector('.zone-time');
        if (!t) return;
        const z = getTimeInTZ(now, p.dataset.tz);
        const zh = z.getHours() % 12 || 12;
        const zm = String(z.getMinutes()).padStart(2, '0');
        t.textContent = `${String(zh).padStart(2, '0')}:${zm}`;
      });
    };

    updateAll();
    setInterval(updateAll, 1000);

    // Re-render on language change
    window.addEventListener('mohsen:langchange', updateAll);
  }

  /* ============================================================
     2. THEME PALETTE + MODE
     ============================================================ */
  function initPalette() {
    const picker = $('#palettePicker');
    if (!picker) return;

    const trigger = $('#paletteTrigger');
    const panel = $('#palettePanel');
    const swatches = $$('.palette-swatch', panel);
    const modePills = $$('.mode-pill', panel);

    // Load saved
    let palette = 'blue';
    let mode = 'dark';
    try {
      palette = localStorage.getItem(STORAGE.palette) || 'blue';
      mode = localStorage.getItem(STORAGE.mode) || 'dark';
    } catch (e) {}

    const applyPalette = (p) => {
      document.documentElement.dataset.palette = p;
      swatches.forEach(s => s.classList.toggle('is-active', s.dataset.palette === p));
      try { localStorage.setItem(STORAGE.palette, p); } catch (e) {}
    };

    const applyMode = (m) => {
      let realMode = m;
      if (m === 'auto') {
        const hour = new Date().getHours();
        realMode = (hour >= 6 && hour < 18) ? 'light' : 'dark';
      }
      document.documentElement.dataset.theme = realMode;
      try { localStorage.setItem(STORAGE.mode, m); } catch (e) {}
      // Sync with legacy theme key
      try { localStorage.setItem('mohsen-theme', realMode); } catch (e) {}

      // Update theme meta
      const meta = $('#metaTheme');
      if (meta) meta.content = realMode === 'dark' ? '#060A13' : '#F4F6FB';

      modePills.forEach(p => p.classList.toggle('is-active', p.dataset.mode === m));
    };

    // Apply saved state
    applyPalette(palette);
    applyMode(mode);

    // Auto-mode: update at sunrise/sunset
    if (mode === 'auto') {
      setInterval(() => {
        if (localStorage.getItem(STORAGE.mode) === 'auto') applyMode('auto');
      }, 60 * 60 * 1000); // every hour
    }

    // Toggle panel
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('is-open');
    });
    document.addEventListener('click', (e) => {
      if (!picker.contains(e.target)) panel.classList.remove('is-open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') panel.classList.remove('is-open');
    });

    // Swatch clicks
    swatches.forEach(s => {
      s.addEventListener('click', () => applyPalette(s.dataset.palette));
    });

    // Mode pill clicks
    modePills.forEach(p => {
      p.addEventListener('click', () => applyMode(p.dataset.mode));
    });

    // Expose
    window.mohsenPalette = { applyPalette, applyMode };
  }

  /* ============================================================
     3. LOADING BADGE (page load + reveal)
     ============================================================ */
  function initLoadBadge() {
    const badge = $('#loadBadge');
    const ringFill = $('#loadRingFill');
    const numEl = $('#loadNum');
    if (!badge || !ringFill || !numEl) return;

    const CIRC = 2 * Math.PI * 26;

    // Simulate load progress
    let progress = 0;
    const target = 100;

    const interval = setInterval(() => {
      // Jump to higher values faster at beginning
      const step = progress < 60 ? 8 : progress < 85 ? 4 : 1.2;
      progress = Math.min(progress + step, target);

      numEl.textContent = Math.round(progress);
      ringFill.style.strokeDashoffset = String(CIRC * (1 - progress / 100));

      if (progress >= target) {
        clearInterval(interval);
        badge.classList.remove('is-visible');
        setTimeout(() => badge.classList.add('is-done'), 100);
      }
    }, 90);

    // Show after intro
    setTimeout(() => badge.classList.add('is-visible'), 3400);

    // Failsafe
    setTimeout(() => {
      clearInterval(interval);
      progress = 100;
      numEl.textContent = '100';
      ringFill.style.strokeDashoffset = '0';
      badge.classList.remove('is-visible');
      badge.classList.add('is-done');
    }, 5000);
  }

  /* ============================================================
     4. KEYBOARD SHORTCUTS
     ============================================================ */
  function initKeyboard() {
    const hint = $('#kbdHint');
    const modal = $('#kbdModal');
    const closeBtn = $('#kbdClose');
    const backdrop = $('.kbd-modal-backdrop', modal);

    const openModal = () => {
      modal?.classList.add('is-open');
      modal?.setAttribute('aria-hidden', 'false');
    };
    const closeModal = () => {
      modal?.classList.remove('is-open');
      modal?.setAttribute('aria-hidden', 'true');
    };

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    // Show hint after intro
    setTimeout(() => hint?.classList.add('is-visible'), 4000);
    // Hide hint after 8s of showing
    setTimeout(() => hint?.classList.remove('is-visible'), 12000);

    // Also show hint once more when user reaches bottom
    let hintShownAgain = false;
    window.addEventListener('scroll', () => {
      if (hintShownAgain) return;
      const scrolled = window.scrollY + window.innerHeight;
      const height = document.documentElement.scrollHeight;
      if (scrolled / height > 0.85) {
        hintShownAgain = true;
        hint?.classList.add('is-visible');
        setTimeout(() => hint?.classList.remove('is-visible'), 6000);
      }
    }, { passive: true });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      const ctrl = e.ctrlKey || e.metaKey;

      // "?" opens modal
      if (key === '?' && !ctrl) {
        e.preventDefault();
        openModal();
        return;
      }

      if (key === 'Escape') {
        closeModal();
        return;
      }

      if (ctrl) {
        const k = key.toLowerCase();
        if (k === 'l') { e.preventDefault(); window.mohsenI18n?.toggle?.(); }
        if (k === 'd') {
          e.preventDefault();
          const cur = document.documentElement.dataset.theme;
          window.mohsenPalette?.applyMode?.(cur === 'dark' ? 'light' : 'dark');
        }
        if (k === 'p') {
          e.preventDefault();
          $('#palettePanel')?.classList.toggle('is-open');
        }
        if (k === 't') {
          e.preventDefault();
          $('#clockPanel')?.classList.toggle('is-open');
        }
        if (k === 'g') {
          e.preventDefault();
          document.querySelector('.fab--whatsapp')?.click();
        }
      }

      // Home / Top
      if (key === 'Home' && !ctrl) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  }

  /* ============================================================
     5. MULTI-CURSOR CONTEXTS
     Adds semantic cursors for different zones
     ============================================================ */
  function initCursorContexts() {
    if (isTouch || prefersReduced) return;

    // Cursor states applied via CSS classes on body
    const zones = [
      { sel: 'a[href]',       state: 'cursor-link' },
      { sel: 'button',        state: 'cursor-btn'  },
      { sel: 'input, textarea', state: 'cursor-text' },
      { sel: 'code, pre',     state: 'cursor-code' }
    ];

    zones.forEach(({ sel, state }) => {
      document.querySelectorAll(sel).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add(state));
        el.addEventListener('mouseleave', () => document.body.classList.remove(state));
      });
    });

    // Auto-update for dynamic elements (project cards created later)
    const mo = new MutationObserver(() => {
      zones.forEach(({ sel, state }) => {
        document.querySelectorAll(sel).forEach(el => {
          if (el.dataset.cursorBound) return;
          el.dataset.cursorBound = '1';
          el.addEventListener('mouseenter', () => document.body.classList.add(state));
          el.addEventListener('mouseleave', () => document.body.classList.remove(state));
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ============================================================
     6. DAILY RANDOM QUOTE (sub-feature of clock)
     ============================================================ */
  function initDailyQuote() {
    const quotes = {
      ar: [
        'الكود الجيد كالنكتة الجيدة — لا يحتاج شرحاً.',
        'ابنِ، أطلق، تعلّم، كرّر.',
        'كل خبير كان مبتدئاً يوماً ما.',
        'التفاصيل الصغيرة تصنع الفرق الكبير.',
        'أنت اليوم أفضل مما كنت بالأمس.'
      ],
      en: [
        'Good code is like a good joke — it needs no explanation.',
        'Build, ship, learn, repeat.',
        'Every expert was once a beginner.',
        'Small details make the big difference.',
        "You're better today than yesterday."
      ]
    };

    // Add a rotating quote to the clock greeting
    const greeting = $('#clockGreeting');
    if (!greeting) return;

    const rotate = () => {
      const lang = getLang();
      const list = quotes[lang] || quotes.en;
      const idx = new Date().getDate() % list.length;
      const base = greeting.dataset.base || greeting.textContent;
      greeting.dataset.base = base;
    };
    rotate();
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    initClock();
    initPalette();
    initLoadBadge();
    initKeyboard();
    initCursorContexts();
    initDailyQuote();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();