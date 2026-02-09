/* === Outreach & Education Page Renderer === */
(function () {
  'use strict';

  var data = null;
  var activeCategory = 'outreach';
  var activeYear = 'all';

  var categories = [
    { key: 'outreach', label_en: 'Public Engagement', label_ko: '대중 참여' },
    { key: 'workshops', label_en: 'Education Workshops', label_ko: '교육 워크숍' }
  ];

  function getLang() {
    return localStorage.getItem('lang') || 'en';
  }

  function extractYear(dateStr) {
    if (!dateStr) return 'Unknown';
    var match = dateStr.match(/(\d{4})/);
    return match ? match[1] : 'Unknown';
  }

  function getItems() {
    return data ? data[activeCategory] || [] : [];
  }

  function getYears() {
    var items = getItems();
    var yearSet = {};
    items.forEach(function (item) {
      yearSet[extractYear(item.date)] = true;
    });
    return Object.keys(yearSet).sort(function (a, b) { return b - a; });
  }

  function renderCategoryPills() {
    var container = document.getElementById('outreach-category-pills');
    if (!container) return;

    var lang = getLang();
    var html = '';
    categories.forEach(function (cat) {
      var count = data ? (data[cat.key] || []).length : 0;
      var isActive = activeCategory === cat.key ? ' active' : '';
      var label = lang === 'ko' ? cat.label_ko : cat.label_en;
      html += '<button class="pill' + isActive + '" data-category="' + cat.key + '">' +
        label + ' <span class="opacity-60">(' + count + ')</span></button>';
    });

    container.innerHTML = html;

    container.querySelectorAll('.pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCategory = btn.dataset.category;
        activeYear = 'all';
        renderCategoryPills();
        renderYearPills();
        renderTimeline();
      });
    });
  }

  function renderYearPills() {
    var container = document.getElementById('outreach-year-pills');
    if (!container) return;

    var years = getYears();
    var html = '<button class="pill' + (activeYear === 'all' ? ' active' : '') + '" data-year="all">All</button>';
    years.forEach(function (y) {
      html += '<button class="pill' + (activeYear === y ? ' active' : '') + '" data-year="' + y + '">' + y + '</button>';
    });

    container.innerHTML = html;

    container.querySelectorAll('.pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeYear = btn.dataset.year;
        renderYearPills();
        renderTimeline();
      });
    });
  }

  function renderTimeline() {
    var container = document.getElementById('outreach-timeline');
    if (!container) return;

    var items = getItems();
    var filtered = activeYear === 'all'
      ? items
      : items.filter(function (item) { return extractYear(item.date) === activeYear; });

    if (filtered.length === 0) {
      container.innerHTML = '<p class="text-slate-400 text-center py-8">No activities found.</p>';
      return;
    }

    var byYear = {};
    filtered.forEach(function (item) {
      var year = extractYear(item.date);
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(item);
    });

    var years = Object.keys(byYear).sort(function (a, b) { return b - a; });

    var html = '<div class="timeline">';
    years.forEach(function (year) {
      html += '<div class="timeline-year">' + year + '</div>';
      byYear[year].forEach(function (item) {
        var titleHtml = item.title
          ? '<div class="text-sm text-slate-300 leading-relaxed">' + item.title + '</div>'
          : '';
        html += '<div class="timeline-item">' +
          '<div class="text-xs text-slate-500 mb-1">' + item.date + '</div>' +
          '<div class="text-sm font-semibold text-slate-200 mb-0.5">' + item.event + '</div>' +
          titleHtml +
          '</div>';
      });
    });
    html += '</div>';

    container.innerHTML = html;
  }

  async function init() {
    var container = document.getElementById('outreach-timeline');
    if (!container) return;

    try {
      var resp = await fetch('../data/joonan-outreach.json');
      if (!resp.ok) throw new Error(resp.status);
      data = await resp.json();
    } catch (e) {
      container.innerHTML = '<p class="text-slate-400">Could not load data.</p>';
      return;
    }

    renderCategoryPills();
    renderYearPills();
    renderTimeline();

    document.querySelectorAll('#lang-toggle, [id^="lang-toggle"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTimeout(function () {
          renderCategoryPills();
          renderYearPills();
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
