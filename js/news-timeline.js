/* === News Timeline Renderer === */
(function () {
  'use strict';

  const ITEMS_PER_PAGE = 20;
  let allNews = [];
  let displayedCount = 0;

  function extractYear(dateStr) {
    if (!dateStr) return 'Unknown';
    const match = dateStr.match(/(\d{4})/);
    return match ? match[1] : 'Unknown';
  }

  function getCurrentLang() {
    return localStorage.getItem('lang') || 'en';
  }

  function getHeadline(item) {
    const lang = getCurrentLang();
    if (lang === 'ko' && item.headline_ko) return item.headline_ko;
    return item.headline;
  }

  function renderTimeline() {
    const container = document.getElementById('news-timeline');
    if (!container) return;

    const toShow = allNews.slice(0, displayedCount);

    // Group by year
    const byYear = {};
    toShow.forEach(item => {
      const year = extractYear(item.date);
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(item);
    });

    const years = Object.keys(byYear).sort((a, b) => b - a);

    let html = '<div class="timeline">';
    years.forEach(year => {
      html += `<div class="timeline-year">${year}</div>`;
      byYear[year].forEach(item => {
        html += `
          <div class="timeline-item">
            <div class="text-xs text-slate-500 mb-1">${item.date}</div>
            <div class="text-sm text-slate-300 leading-relaxed">${getHeadline(item)}</div>
          </div>
        `;
      });
    });
    html += '</div>';

    // Load more button
    if (displayedCount < allNews.length) {
      const remaining = allNews.length - displayedCount;
      html += `
        <div class="text-center mt-8">
          <button id="load-more-news" class="pill px-6 py-2" data-i18n="btn.loadMore">
            Load More (${remaining} remaining)
          </button>
        </div>
      `;
    }

    container.innerHTML = html;

    // Bind load more
    const btn = document.getElementById('load-more-news');
    if (btn) {
      btn.addEventListener('click', () => {
        displayedCount = Math.min(displayedCount + ITEMS_PER_PAGE, allNews.length);
        renderTimeline();
      });
    }
  }

  async function init() {
    const container = document.getElementById('news-timeline');
    if (!container) return;

    try {
      const resp = await fetch('data/news.json');
      allNews = await resp.json();
      displayedCount = Math.min(ITEMS_PER_PAGE, allNews.length);
      renderTimeline();
    } catch (e) {
      container.innerHTML = '<p class="text-slate-400">Could not load news.</p>';
    }

    // Re-render on language toggle
    document.querySelectorAll('#lang-toggle, [id^="lang-toggle"]').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(renderTimeline, 50);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
