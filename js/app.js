/* === An Lab - Core App JS === */
(function () {
  'use strict';

  // Mobile menu toggle
  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      const expanded = !menu.classList.contains('hidden');
      btn.setAttribute('aria-expanded', expanded);
    });
    // Close on link click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }

  // Scroll-based navbar opacity
  function initNavScroll() {
    const nav = document.querySelector('.glass-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Active nav link highlighting
  function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPage = href.split('/').pop();
      if (linkPage === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Theme toggle
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
    }
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // Scroll reveal via IntersectionObserver
  function initReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      observer.observe(el);
    });

    // Expose for dynamic content (team-cards, publications, etc.)
    window.reinitReveal = function () {
      document.querySelectorAll('.reveal:not(.visible), .reveal-stagger:not(.visible)').forEach(el => {
        observer.observe(el);
      });
    };
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Back-to-top button
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Dynamic copyright year
  function initCopyrightYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('footer p').forEach(p => {
      p.innerHTML = p.innerHTML.replace(/© \d{4}/, `&copy; ${year}`);
    });
  }

  // Highlight first-author publications and add filter pills
  function initFirstAuthorHighlight() {
    var container = document.getElementById('profile-content');
    if (!container) return;

    function isFirstAuthor(li) {
      var html = li.innerHTML;
      // Case 1: <strong> at the very start — sole first author
      if (/^\s*<strong[\s>]/i.test(html)) return true;
      // Case 2: ✻ inside <strong> — co-first author (e.g. Kim SW✻, <strong>Lee H✻</strong>)
      if (/<strong[^>]*>[^<]*\u273B/i.test(html)) return true;
      return false;
    }

    function applyHighlight(root) {
      root.querySelectorAll('h2, h3').forEach(function (h3) {
        var text = h3.textContent;
        if (!/publications|논문/i.test(text)) return;
        var ul = h3.nextElementSibling;
        if (!ul || ul.tagName !== 'UL') return;
        ul.classList.add('pub-list');
        ul.querySelectorAll('li').forEach(function (li) {
          if (li.classList.contains('first-author') || li.classList.contains('co-author')) return;
          if (isFirstAuthor(li)) {
            li.classList.add('first-author');
          } else {
            li.classList.add('co-author');
          }
        });
        // Add filter pills if not already present
        if (h3.parentNode && !h3.parentNode.querySelector('.pub-filters')) {
          var filters = document.createElement('div');
          filters.className = 'pub-filters';
          filters.innerHTML =
            '<button class="pill active" data-filter="all">' +
              '<span class="en-only">All</span><span class="ko-only">전체</span>' +
            '</button>' +
            '<button class="pill" data-filter="first-author">' +
              '<span class="en-only">First Author</span><span class="ko-only">1저자</span>' +
            '</button>' +
            '<button class="pill" data-filter="co-author">' +
              '<span class="en-only">Co-author</span><span class="ko-only">공저자</span>' +
            '</button>';
          h3.insertAdjacentElement('afterend', filters);
          // Move ul after filters
          filters.insertAdjacentElement('afterend', ul);

          filters.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-filter]');
            if (!btn) return;
            var filter = btn.getAttribute('data-filter');
            filters.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
            btn.classList.add('active');
            ul.querySelectorAll('li').forEach(function (li) {
              if (filter === 'all') {
                li.style.display = '';
              } else if (filter === 'first-author') {
                li.style.display = li.classList.contains('first-author') ? '' : 'none';
              } else {
                li.style.display = li.classList.contains('co-author') ? '' : 'none';
              }
            });
          });
        }
      });
    }

    // Apply to already-loaded content
    applyHighlight(container);

    // Observe for dynamic content injection
    var observer = new MutationObserver(function () {
      applyHighlight(container);
    });
    observer.observe(container, { childList: true, subtree: true });
  }

  // Convert profile section <ul> to timeline format (Education, Experience, Awards, Academic Service)
  function initProfileTimeline() {
    var container = document.getElementById('profile-content');
    if (!container) return;

    var sectionPattern = /education|학력|professional experience|경력|awards|수상|academic service|학술\s*활동/i;
    var adHocPattern = /^ad hoc|^논문\s*심사/i;

    function convertToTimeline(root) {
      root.querySelectorAll('h2, h3').forEach(function (heading) {
        var text = heading.textContent;
        if (!sectionPattern.test(text)) return;
        var ul = heading.nextElementSibling;
        if (!ul || ul.tagName !== 'UL') return;
        if (ul.classList.contains('tl-converted')) return;
        ul.classList.add('tl-converted');

        var timeline = document.createElement('div');
        timeline.className = 'timeline edu-timeline';
        var adHocEl = null;

        ul.querySelectorAll('li').forEach(function (li) {
          var liText = li.textContent;
          if (adHocPattern.test(liText)) {
            adHocEl = document.createElement('p');
            adHocEl.className = 'ad-hoc-reviewer';
            adHocEl.innerHTML = li.innerHTML;
            return;
          }

          var item = document.createElement('div');
          item.className = 'timeline-item';

          var spans = li.querySelectorAll('span.en-only, span.ko-only');
          if (spans.length > 0) {
            spans.forEach(function (span) {
              var newSpan = document.createElement('span');
              newSpan.className = span.className;
              var t = span.textContent;
              var m = t.match(/^(\d{4}(?:[-–]\S+)?),?\s+(.+)/);
              if (m) {
                newSpan.innerHTML = '<span class="edu-year">' + m[1] + '</span> ' + m[2];
              } else {
                newSpan.textContent = t;
              }
              item.appendChild(newSpan);
            });
          } else {
            var t = li.textContent;
            var m = t.match(/^(\d{4}(?:[-–]\S+)?),?\s+(.+)/);
            if (m) {
              item.innerHTML = '<span class="edu-year">' + m[1] + '</span> ' + m[2];
            } else {
              item.innerHTML = li.innerHTML;
            }
          }

          timeline.appendChild(item);
        });

        ul.parentNode.replaceChild(timeline, ul);
        if (adHocEl) {
          timeline.insertAdjacentElement('afterend', adHocEl);
        }
      });
    }

    convertToTimeline(container);

    var observer = new MutationObserver(function () {
      convertToTimeline(container);
    });
    observer.observe(container, { childList: true, subtree: true });
  }

  // Init on DOM ready
  function boot() {
    initMobileMenu();
    initNavScroll();
    initActiveNav();
    initTheme();
    initSmoothScroll();
    initBackToTop();
    initCopyrightYear();
    initFirstAuthorHighlight();
    initProfileTimeline();
    // Delay reveal init slightly so elements rendered by other scripts are caught
    requestAnimationFrame(() => {
      requestAnimationFrame(initReveal);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
