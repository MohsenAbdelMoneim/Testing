/* ================================================================
   🖱️ Custom Cursor Engine
   - Smooth multi-layer follow
   - Context detection (link / button / text / code / grab / view)
   - Label support (data-cursor="...")
   - Magnetic pull to interactive elements
   - Click ripple
   - Toggle on/off + persistence
   - Keyboard + touch aware
   ================================================================ */
(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const isTouch = window.matchMedia('(hover: none)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STORAGE_KEY = 'mohsen-cursor';

  /* ============================================================
     Context selectors — priority order matters
     ============================================================ */
  const CONTEXTS = [
    // Highest priority first
    { sel: '[data-cursor]',           state: 'has-label' },
    { sel: '.project-card',           state: 'view' },
    { sel: '[data-cursor="grab"], .marquee, .hero-ticker', state: 'grab' },
    { sel: 'input, textarea, [contenteditable="true"]', state: 'text' },
    { sel: 'select, [disabled]',      state: 'disabled' },
    { sel: 'pre, code, .code-body, .mono',  state: 'code' },
    { sel: 'a, .link-arrow, .contact-pill', state: 'link' },
    { sel: 'button, .btn, .btn-mini, .filter-pill, .icon-btn, .fab', state: 'btn' },
    { sel: '[data-magnetic]',         state: 'magnetic' }
  ];

  const STATE_CLASSES = [
    'cursor-link', 'cursor-btn', 'cursor-text', 'cursor-code',
    'cursor-grab', 'cursor-grabbing', 'cursor-view',
    'cursor-disabled', 'cursor-magnetic', 'cursor-has-label'
  ];

  /* ============================================================
     State
     ============================================================ */
  let enabled = true;
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let dx = mx, dy = my;      // dot position
  let rx = mx, ry = my;      // ring position
  let tx = mx, ty = my;      // trail position
  let hasSeenMouse = false;
  let currentState = '';

  /* ============================================================
     Detect initial preference
     ============================================================ */
  function initPreference() {
    if (isTouch || prefersReduced) return false;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'off') return false;
    } catch (e) {}
    return true;
  }

  /* ============================================================
     Apply body class
     ============================================================ */
  function setEnabled(on) {
    enabled = on;
    document.body.classList.toggle('custom-cursor-on', on);
    try { localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off'); } catch (e) {}

    // Fire event
    window.dispatchEvent(new CustomEvent('mohsen:cursortoggle', {
      detail: { enabled: on }
    }));
  }

  /* ============================================================
     Update CSS vars for position (used by ripple / view / hand)
     ============================================================ */
  function updateVars() {
    const root = document.documentElement;
    root.style.setProperty('--mx', `${mx}px`);
    root.style.setProperty('--my', `${my}px`);
  }

  /* ============================================================
     Assign state — clears all first, then adds the winning one
     ============================================================ */
  function setState(newState) {
    if (newState === currentState) return;
    STATE_CLASSES.forEach(c => document.body.classList.remove(c));
    if (newState) {
      document.body.classList.add('cursor-' + newState);
    }
    currentState = newState;
  }

  /* ============================================================
     Detect context from element under pointer
     ============================================================ */
  function detectContext(target) {
    if (!target || !(target instanceof Element)) return '';

    for (const { sel, state } of CONTEXTS) {
      if (target.closest(sel)) return state;
    }
    return '';
  }

  /* ============================================================
     Update label from data-cursor
     ============================================================ */
  function updateLabel(target) {
    const labelEl = $('#curLabel');
    if (!labelEl) return;

    const withCursor = target?.closest?.('[data-cursor]');
    if (withCursor) {
      labelEl.textContent = withCursor.dataset.cursor || '';
    } else {
      labelEl.textContent = '';
    }
  }

  /* ============================================================
     Mouse move handler
     ============================================================ */
  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;

    if (!hasSeenMouse) {
      hasSeenMouse = true;
      document.body.classList.add('cursor-seen');
      // Instant teleport on first move
      dx = rx = tx = mx;
      dy = ry = ty = my;
    }

    updateVars();

    const target = e.target;
    const ctx = detectContext(target);
    setState(ctx);
    updateLabel(target);
  }

  /* ============================================================
     Mouse down / up
     ============================================================ */
  function onDown() {
    document.body.classList.add('cursor-click');
    // Grab state
    if (document.body.classList.contains('cursor-grab')) {
      document.body.classList.add('cursor-grabbing');
    }
    // Ripple position
    const ripple = $('#curRipple');
    if (ripple) {
      ripple.style.setProperty('--cx', `${mx}px`);
      ripple.style.setProperty('--cy', `${my}px`);
    }
  }
  function onUp() {
    document.body.classList.remove('cursor-click');
    document.body.classList.remove('cursor-grabbing');
  }

  /* ============================================================
     Animation loop — smooth follow with different speeds
     ============================================================ */
  function loop() {
    if (enabled) {
      // Different easing for each layer
      dx += (mx - dx) * 0.55;   // dot — fastest
      dy += (my - dy) * 0.55;
      rx += (mx - rx) * 0.18;   // ring — medium
      ry += (my - ry) * 0.18;
      tx += (mx - tx) * 0.08;   // trail — slow

      const dot = $('#curDot');
      const ring = $('#curRing');
      const trail = $('#curTrail');
      const arrow = $('#curArrow');
      const hand = $('#curHand');
      const cross = $('#curCross');
      const view = $('#curView');

      if (dot)   dot.style.transform   = `translate3d(${dx}px, ${dy}px, 0)`;
      if (ring)  ring.style.transform  = `translate3d(${rx}px, ${ry}px, 0)`;
      if (trail) trail.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (arrow) arrow.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${currentState === 'link' ? 1 : 0.5}) rotate(${currentState === 'link' ? 0 : -45}deg)`;
      if (hand)  hand.style.transform  = `translate3d(${dx}px, ${dy}px, 0) scale(${document.body.classList.contains('cursor-grabbing') ? 0.85 : 1})`;
      if (cross) cross.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      if (view)  view.style.transform  = `translate3d(${rx}px, ${ry}px, 0) scale(1)`;
    }

    requestAnimationFrame(loop);
  }

  /* ============================================================
     Keyboard / accessibility — show native cursor when tabbing
     ============================================================ */
  function initKeyboardA11y() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('no-custom-cursor');
      }
    });
    document.addEventListener('mousemove', () => {
      document.body.classList.remove('no-custom-cursor');
    }, { passive: true, once: false });
  }

  /* ============================================================
     Hide cursor when leaving window
     ============================================================ */
  function initWindowLeave() {
    document.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-seen');
    });
    document.addEventListener('mouseenter', () => {
      if (hasSeenMouse) document.body.classList.add('cursor-seen');
    });
  }

  /* ============================================================
     Watch for dynamic elements (project cards, etc.)
     Uses event delegation instead of per-element binding
     ============================================================ */
  // We use event delegation with mouseover/mouseout on document.
  // Since we read e.target on mousemove, no need for MutationObserver.

  /* ============================================================
     Toggle button
     ============================================================ */
  function initToggleButton() {
    const btn = $('#cursorToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      setEnabled(!enabled);
      if (!enabled) {
        STATE_CLASSES.forEach(c => document.body.classList.remove(c));
        document.body.classList.remove('cursor-seen');
      } else {
        document.body.classList.add('cursor-seen');
      }
    });
  }

  /* ============================================================
     Boot
     ============================================================ */
  function boot() {
    // Skip entirely on touch / reduced motion
    if (isTouch || prefersReduced) {
      document.body.classList.remove('custom-cursor-on');
      return;
    }

    const system = $('#cursorSystem');
    if (!system) return;

    // Enable per preference
    setEnabled(initPreference());

    // Event listeners
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    initKeyboardA11y();
    initWindowLeave();
    initToggleButton();

    // Animation loop
    requestAnimationFrame(loop);

    // Re-detect context when language changes (dir may change)
    window.addEventListener('mohsen:langchange', () => {
      setState('');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();