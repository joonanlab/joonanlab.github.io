/* === Funding Page Renderer === */
(function () {
  'use strict';

  var allFunding = [];
  var activeRole = 'all';

  function getLang() {
    return localStorage.getItem('lang') || 'en';
  }

  function extractStartYear(years) {
    var match = years.match(/(\d{4})/);
    return match ? match[1] : 'Unknown';
  }

  function renderRolePills() {
    var container = document.getElementById('funding-role-pills');
    if (!container) return;

    var piCount = allFunding.filter(function (f) { return f.role === 'PI'; }).length;
    var ciCount = allFunding.filter(function (f) { return f.role === 'CI'; }).length;

    var pills = [
      { key: 'all', label: 'All', count: allFunding.length },
      { key: 'PI', label: 'PI', count: piCount },
      { key: 'CI', label: 'CI', count: ciCount }
    ];

    var html = '';
    pills.forEach(function (p) {
      var isActive = activeRole === p.key ? ' active' : '';
      html += '<button class="pill' + isActive + '" data-role="' + p.key + '">' +
        p.label + ' <span class="opacity-60">(' + p.count + ')</span></button>';
    });

    container.innerHTML = html;

    container.querySelectorAll('.pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeRole = btn.dataset.role;
        renderRolePills();
        renderFunding();
      });
    });
  }

  function renderFunding() {
    var container = document.getElementById('funding-list');
    if (!container) return;

    var lang = getLang();
    var filtered = activeRole === 'all'
      ? allFunding
      : allFunding.filter(function (f) { return f.role === activeRole; });

    if (filtered.length === 0) {
      container.innerHTML = '<p class="text-slate-400 text-center py-8">No funding found.</p>';
      return;
    }

    // Group by start year
    var byYear = {};
    filtered.forEach(function (f) {
      var year = extractStartYear(f.years);
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(f);
    });

    var years = Object.keys(byYear).sort(function (a, b) { return b - a; });

    var html = '<div class="timeline">';
    years.forEach(function (year) {
      html += '<div class="timeline-year">' + year + '</div>';
      byYear[year].forEach(function (f) {
        var title = lang === 'ko' && f.title_ko ? f.title_ko : f.title_en;
        var source = lang === 'ko' && f.source_ko ? f.source_ko : f.source_en;
        var roleCls = f.role === 'PI' ? 'badge-gold' : 'badge-cyan';
        html += '<div class="timeline-item">' +
          '<div class="flex items-center gap-2 mb-1">' +
            '<span class="text-xs text-slate-500">' + f.years + '</span>' +
            '<span class="badge ' + roleCls + '">' + f.role + '</span>' +
          '</div>' +
          '<div class="text-sm font-semibold text-slate-200 mb-0.5">' + title + '</div>' +
          '<div class="text-xs text-slate-400">' + source + '</div>' +
        '</div>';
      });
    });
    html += '</div>';

    container.innerHTML = html;
  }

  async function init() {
    var container = document.getElementById('funding-list');
    if (!container) return;

    try {
      var resp = await fetch('../data/joonan-funding.json');
      if (!resp.ok) throw new Error(resp.status);
      allFunding = await resp.json();
    } catch (e) {
      container.innerHTML = '<p class="text-slate-400">Could not load funding data.</p>';
      return;
    }

    renderRolePills();
    renderFunding();

    // Re-render when language changes
    document.querySelectorAll('#lang-toggle, [id^="lang-toggle"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTimeout(renderFunding, 50);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
