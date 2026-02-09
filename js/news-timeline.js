/* === News Timeline Renderer === */
(function () {
  'use strict';

  let allNews = [];
  let activeYear = 'all';

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

  function getYears() {
    const years = [...new Set(allNews.map(n => extractYear(n.date)))];
    years.sort((a, b) => b - a);
    return years;
  }

  function renderYearFilters() {
    const container = document.getElementById('news-year-filters');
    if (!container) return;

    const years = getYears();
    const lang = getCurrentLang();
    const allLabel = lang === 'ko' ? '전체' : 'All';

    let html = `<button class="pill ${activeYear === 'all' ? 'active' : ''}" data-year="all">${allLabel}</button>`;
    years.forEach(y => {
      html += `<button class="pill ${activeYear === y ? 'active' : ''}" data-year="${y}">${y}</button>`;
    });

    container.innerHTML = html;

    container.querySelectorAll('.pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeYear = btn.dataset.year;
        renderYearFilters();
        renderTimeline();
      });
    });
  }

  function renderTimeline() {
    const container = document.getElementById('news-timeline');
    if (!container) return;

    const filtered = activeYear === 'all'
      ? allNews
      : allNews.filter(n => extractYear(n.date) === activeYear);

    if (filtered.length === 0) {
      container.innerHTML = '<p class="text-slate-400 text-center py-8">No news found.</p>';
      return;
    }

    // Group by year
    const byYear = {};
    filtered.forEach(item => {
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

    container.innerHTML = html;
  }

  async function loadData() {
    const resp = await fetch('data/news.json');
    if (!resp.ok) throw new Error(resp.status);
    return resp.json();
  }

  async function init() {
    const container = document.getElementById('news-timeline');
    if (!container) return;

    try {
      allNews = await loadData();
    } catch (e) {
      try {
        await new Promise(r => setTimeout(r, 1000));
        allNews = await loadData();
      } catch (e2) {
        container.innerHTML = '<p class="text-slate-400">Could not load news.</p>';
        return;
      }
    }

    renderYearFilters();
    renderTimeline();

    // Re-render on language toggle
    document.querySelectorAll('#lang-toggle, [id^="lang-toggle"]').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          renderYearFilters();
          renderTimeline();
        }, 50);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
