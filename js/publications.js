/* === Publications Filter & Renderer === */
(function () {
  'use strict';

  let allPubs = [];
  let activeYear = 'all';
  let activeType = 'all';
  let showHighlighted = false;
  let searchQuery = '';

  function generateBibtex(pub) {
    const firstAuthor = (pub.authors || 'Unknown').split(',')[0].trim().replace(/\s+/g, '');
    const key = `${firstAuthor}${pub.year || ''}`;
    const doi = pub.doi ? `  doi = {${pub.doi}},\n` : '';
    const vol = pub.vol ? `  volume = {${pub.vol}},\n` : '';
    const issue = pub.issue ? `  number = {${pub.issue}},\n` : '';
    const pages = pub.page && pub.page !== '1-1' ? `  pages = {${pub.page}},\n` : '';
    return `@article{${key},
  title = {${pub.title}},
  author = {${pub.authors_full || pub.authors || ''}},
  journal = {${pub.journal || ''}},
  year = {${pub.year || ''}},
${vol}${issue}${pages}${doi}}`;
  }

  function renderPubCard(pub) {
    const isHighlighted = pub.highlight === 1;
    const hlClass = isHighlighted ? 'highlighted' : '';
    const image = pub.image ? `<img src="images/pubpic/${pub.image}" alt="" class="w-24 h-24 rounded-lg object-cover flex-shrink-0 hidden sm:block" width="96" height="96" loading="lazy">` : '';
    const doi = pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener" class="text-cyan-accent text-xs hover:underline">DOI</a>` : '';
    const link = pub.link && pub.link.url ? `<a href="${pub.link.url}" target="_blank" rel="noopener" class="text-cyan-accent text-xs hover:underline">Paper</a>` : '';

    // Truncate authors
    const authors = pub.authors || '';
    const shortAuthors = authors.length > 120 ? authors.substring(0, 120) + '...' : authors;

    const pubId = `bib-${(pub.doi || pub.title || '').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}`;

    return `
      <div class="card-pub ${hlClass} flex gap-4 items-start">
        ${image}
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-sm leading-snug mb-1">${pub.title}</h3>
          <p class="text-xs text-slate-400 mb-1">${shortAuthors}</p>
          <p class="text-xs text-gold-accent mb-2">${pub.journal || ''} ${pub.year ? '(' + pub.year + ')' : ''}</p>
          <div class="flex flex-wrap gap-3 items-center">
            ${doi} ${link}
            <button class="text-xs text-slate-400 hover:text-cyan-accent transition-colors cursor-pointer bibtex-btn" data-pub-id="${pubId}" aria-label="Copy BibTeX">BibTeX</button>
          </div>
          <pre id="${pubId}" class="hidden mt-2 text-xs text-slate-400 bg-dark-bg p-3 rounded-lg overflow-x-auto border border-slate-700" style="font-size: 0.7rem;">${generateBibtex(pub)}</pre>
        </div>
      </div>
    `;
  }

  function getYears() {
    const years = [...new Set(allPubs.map(p => p.year).filter(Boolean))];
    years.sort((a, b) => b - a);
    return years;
  }

  function getTypes() {
    const types = [...new Set(allPubs.map(p => p.type).filter(Boolean))];
    types.sort();
    return types;
  }

  function renderFilters() {
    const container = document.getElementById('pub-filters');
    if (!container) return;

    const years = getYears();
    const types = getTypes();
    let typeHtml = '';
    if (types.length > 0) {
      typeHtml = `
      <div class="flex flex-wrap gap-2 mb-4">
        <button class="pill type-pill ${activeType === 'all' ? 'active' : ''}" data-type="all" aria-pressed="${activeType === 'all'}">All Types</button>
        ${types.map(t => `<button class="pill type-pill ${activeType === t ? 'active' : ''}" data-type="${t}" aria-pressed="${activeType === t}">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join('')}
      </div>`;
    }

    let html = `
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <div class="relative flex-1 max-w-sm">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" id="pub-search" class="search-input" placeholder="Search publications..." data-i18n="pub.search">
        </div>
        <button id="pub-highlight-toggle" class="pill ${showHighlighted ? 'active' : ''}" aria-pressed="${showHighlighted}" data-i18n="pub.highlighted">Highlighted</button>
      </div>
      ${typeHtml}
      <div class="flex flex-wrap gap-2 mb-6">
        <button class="pill year-pill ${activeYear === 'all' ? 'active' : ''}" data-year="all" aria-pressed="${activeYear === 'all'}" data-i18n="pub.allYears">All Years</button>
        ${years.map(y => `<button class="pill year-pill ${activeYear === String(y) ? 'active' : ''}" data-year="${y}" aria-pressed="${activeYear === String(y)}">${y}</button>`).join('')}
      </div>
    `;
    container.innerHTML = html;

    // Bind events
    document.getElementById('pub-search').addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase();
      renderPubs();
    });

    document.getElementById('pub-highlight-toggle').addEventListener('click', () => {
      showHighlighted = !showHighlighted;
      renderFilters();
      renderPubs();
    });

    container.querySelectorAll('.year-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeYear = btn.dataset.year;
        renderFilters();
        renderPubs();
      });
    });

    container.querySelectorAll('.type-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeType = btn.dataset.type;
        renderFilters();
        renderPubs();
      });
    });
  }

  function renderPubs() {
    const container = document.getElementById('pub-list');
    if (!container) return;

    let filtered = allPubs;

    if (activeYear !== 'all') {
      filtered = filtered.filter(p => String(p.year) === activeYear);
    }

    if (activeType !== 'all') {
      filtered = filtered.filter(p => p.type === activeType);
    }

    if (showHighlighted) {
      filtered = filtered.filter(p => p.highlight === 1);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => {
        const text = `${p.title} ${p.authors} ${p.authors_full || ''} ${p.journal}`.toLowerCase();
        return text.includes(searchQuery);
      });
    }

    if (filtered.length === 0) {
      container.innerHTML = '<p class="text-slate-400 text-center py-8">No publications found.</p>';
      return;
    }

    container.innerHTML = `<div class="space-y-4">${filtered.map(renderPubCard).join('')}</div>`;

    // Bind BibTeX buttons
    container.querySelectorAll('.bibtex-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const preEl = document.getElementById(btn.dataset.pubId);
        if (!preEl) return;
        const isHidden = preEl.classList.contains('hidden');
        // Hide all others
        container.querySelectorAll('pre').forEach(p => p.classList.add('hidden'));
        if (isHidden) {
          preEl.classList.remove('hidden');
          navigator.clipboard.writeText(preEl.textContent).then(() => {
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = orig; }, 1500);
          }).catch(() => {});
        }
      });
    });
  }

  async function loadData() {
    const resp = await fetch('data/publications.json');
    if (!resp.ok) throw new Error(resp.status);
    return resp.json();
  }

  async function init() {
    const container = document.getElementById('pub-list');
    if (!container) return;

    try {
      allPubs = await loadData();
      renderFilters();
      renderPubs();
    } catch (e) {
      setTimeout(async () => {
        try {
          allPubs = await loadData();
          renderFilters();
          renderPubs();
        } catch (e2) {
          container.innerHTML = '<p class="text-slate-400">Could not load publications.</p>';
        }
      }, 1000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
