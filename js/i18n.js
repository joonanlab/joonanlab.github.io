/* === i18n Language Toggle === */
(function () {
  'use strict';

  let translations = null;

  async function loadTranslations() {
    if (translations) return translations;
    try {
      // Determine base path based on whether we're in a subdirectory
      const path = window.location.pathname;
      const prefix = path.includes('/team/') ? '../' : '';
      const resp = await fetch(prefix + 'data/translations.json');
      translations = await resp.json();
    } catch (e) {
      translations = {};
    }
    return translations;
  }

  function applyLanguage(lang) {
    if (!translations) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const entry = translations[key];
      if (entry && entry[lang]) {
        if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
          el.placeholder = entry[lang];
        } else {
          el.textContent = entry[lang];
        }
      }
    });

    if (lang === 'ko') {
      document.body.classList.add('lang-ko');
    } else {
      document.body.classList.remove('lang-ko');
    }
  }

  function getCurrentLang() {
    return localStorage.getItem('lang') || 'en';
  }

  function toggleLang() {
    const current = getCurrentLang();
    const next = current === 'en' ? 'ko' : 'en';
    localStorage.setItem('lang', next);
    applyLanguage(next);
  }

  async function boot() {
    await loadTranslations();
    const lang = getCurrentLang();
    applyLanguage(lang);

    // Bind all lang-toggle buttons (may be multiple on profile pages)
    document.querySelectorAll('#lang-toggle, [id^="lang-toggle"]').forEach(btn => {
      btn.addEventListener('click', toggleLang);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
