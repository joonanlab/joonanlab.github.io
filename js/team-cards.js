/* === Team Cards Renderer === */
(function () {
  'use strict';

  const GROUP_LABELS = {
    0: { en: 'Principal Investigator', ko: '연구 책임자', i18n: 'section.pi' },
    1: { en: 'Graduate Students', ko: '대학원생', i18n: 'section.graduate' },
    2: { en: 'Staff', ko: '연구원', i18n: 'section.staff' },
    3: { en: 'Undergraduate Interns', ko: '학부 인턴', i18n: 'section.undergrad' },
  };

  function parseBadges(info) {
    const badges = [];
    if (!info) return badges;
    if (info.includes('Seoam')) badges.push({ text: 'Seoam', cls: 'badge-gold' });
    if (info.includes('NRF') && !info.includes('CNRF')) badges.push({ text: 'NRF', cls: 'badge-cyan' });
    if (info.includes('CNRF')) badges.push({ text: 'CNRF', cls: 'badge-cyan' });
    return badges;
  }

  function displayName(member) {
    if (!member.name_ko) return member.name;
    return `<span class="en-only">${member.name}</span><span class="ko-only">${member.name_ko}</span>`;
  }

  function renderPICard(member) {
    const badges = parseBadges(member.info);
    const badgeHTML = badges.map(b => `<span class="badge ${b.cls}">${b.text}</span>`).join(' ');
    return `
      <a href="team/${member.url}.html" class="card-pi flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <img src="images/teampic/${member.photo}" alt="${member.name}" class="w-36 h-36 rounded-2xl object-cover border-2 border-dark-hover flex-shrink-0" width="144" height="144" loading="lazy">
        <div>
          <h3 class="text-2xl font-bold mb-1">${displayName(member)}</h3>
          <p class="text-gold-accent font-medium mb-2">${member.info} ${badgeHTML}</p>
          <p class="text-slate-400 text-sm">Click to view full profile</p>
        </div>
      </a>
    `;
  }

  function renderMemberCard(member) {
    const photo = member.photo || 'blank.png';
    const badges = parseBadges(member.info);
    const badgeHTML = badges.map(b => `<span class="badge ${b.cls} ml-1">${b.text}</span>`).join('');
    return `
      <a href="team/${member.url}.html" class="card-team block">
        <img src="images/teampic/${photo}" alt="${member.name}" width="120" height="120" loading="lazy">
        <h4 class="font-semibold text-sm mb-1">${displayName(member)}</h4>
        <p class="text-xs text-slate-400">${member.info}${badgeHTML}</p>
      </a>
    `;
  }

  async function init() {
    const container = document.getElementById('team-container');
    if (!container) return;

    try {
      const resp = await fetch('data/team.json');
      const members = await resp.json();

      // Group members
      const groups = {};
      members.forEach(m => {
        const g = m.group ?? 1;
        if (!groups[g]) groups[g] = [];
        groups[g].push(m);
      });

      let html = '';

      // PI (group 0)
      if (groups[0]) {
        html += `<section class="mb-12 reveal">
          <h2 class="section-header" data-i18n="section.pi">Principal Investigator</h2>
          <div class="mt-6">${groups[0].map(renderPICard).join('')}</div>
        </section>`;
      }

      // Graduate Students (group 1)
      if (groups[1]) {
        html += `<section class="mb-12 reveal">
          <h2 class="section-header" data-i18n="section.graduate">Graduate Students</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 reveal-stagger">${groups[1].map(renderMemberCard).join('')}</div>
        </section>`;
      }

      // Staff (group 2)
      if (groups[2]) {
        html += `<section class="mb-12 reveal">
          <h2 class="section-header" data-i18n="section.staff">Staff</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">${groups[2].map(renderMemberCard).join('')}</div>
        </section>`;
      }

      // Undergrad (group 3)
      if (groups[3]) {
        html += `<section class="mb-12 reveal">
          <h2 class="section-header" data-i18n="section.undergrad">Undergraduate Interns</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">${groups[3].map(renderMemberCard).join('')}</div>
        </section>`;
      }

      container.innerHTML = html;

      // Re-trigger reveal observer for new elements
      if (typeof window.reinitReveal === 'function') window.reinitReveal();

    } catch (e) {
      container.innerHTML = '<p class="text-slate-400">Could not load team data.</p>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
