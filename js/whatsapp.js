/* ================================================================
   WhatsApp Floating Button
   - Rotating messages
   - First-visit tooltip bubble
   - Badge counter animation
   ================================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const fab = document.querySelector('.fab--whatsapp');
    if (!fab) return;

    const isRTL = () => document.documentElement.dir === 'rtl';

    const messages = {
      ar: [
        'مرحباً محسن، أريد التواصل معك',
        'السلام عليكم، عندي مشروع',
        'أريد استشارة سريعة'
      ],
      en: [
        'Hi Mohsen, I want to get in touch',
        'Hello, I have a project in mind',
        'Quick question for you'
      ]
    };

    // Rotate the WhatsApp message every 12 seconds
    const getMsg = () => {
      const lang = document.documentElement.dataset.lang || 'ar';
      const list = messages[lang] || messages.ar;
      return list[Math.floor(Math.random() * list.length)];
    };

    const setHref = () => {
      const msg = encodeURIComponent(getMsg());
      fab.setAttribute('href', `https://wa.me/201096295395?text=${msg}`);
    };

    setHref();
    setInterval(setHref, 12000);

    // Pulse ripple on click
    fab.addEventListener('click', () => {
      fab.classList.add('is-clicked');
      setTimeout(() => fab.classList.remove('is-clicked'), 800);
    });

    // First-time attention (after 4s, one time per session)
    try {
      if (!sessionStorage.getItem('wa-attention-shown')) {
        setTimeout(() => {
          fab.classList.add('wa-attention');
          setTimeout(() => fab.classList.remove('wa-attention'), 3000);
          sessionStorage.setItem('wa-attention-shown', '1');
        }, 4000);
      }
    } catch (e) {}
  });
})();