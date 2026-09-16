/* ==========================================================================
   main.js — rendering + interaction. No content lives here; see content.js.
   No build step, no dependencies, works from file:// and GitHub Pages alike.
   ========================================================================== */
(function () {
  'use strict';

  var C = window.CONTENT || {};
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function set(id, html) { var n = document.getElementById(id); if (n) n.innerHTML = html; }

  /* ══ 1. RENDER ═════════════════════════════════════════════════════════ */

  function renderIdentity() {
    document.title = C.name + ' — Portfolio';
    set('brandName', esc(C.name));
    set('brandRole', esc(C.roleShort || C.role));
    set('heroName', esc(C.name));
    set('heroKicker', esc(C.kicker));
    set('heroBlurb', esc(C.blurb));
    set('footName', esc(C.name));
    var role = $('#heroRole'); if (role) role.textContent = C.role;

    var cv = $('#heroResume');
    if (cv) { if (C.resume) { cv.href = C.resume; } else { cv.remove(); } }

    var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

    var chip = $('#draftChip');
    if (chip && C.draft) chip.hidden = false;

    set('heroStats', (C.stats || []).map(function (s) {
      return '<div><dt>' + esc(s.label) + '</dt><dd data-count="' + esc(s.value) + '">0</dd></div>';
    }).join(''));
  }

  function renderAbout() {
    var a = C.about || {};
    set('aboutText', (a.paragraphs || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''));
    set('aboutTags', (a.tags || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join(''));
    set('aboutFacts', (a.facts || []).map(function (f) {
      return '<div><dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd></div>';
    }).join(''));

    // Only swap in the portrait once it has actually loaded — a missing or
    // broken file leaves the marked placeholder in place rather than a void.
    var pt = $('#aboutPortrait');
    if (pt && a.portrait) {
      var probe = new Image();
      probe.onload = function () {
        pt.classList.add('has-img');
        pt.style.backgroundImage = 'url("' + a.portrait + '")';
        pt.setAttribute('role', 'img');
        pt.setAttribute('aria-label', 'Portrait of ' + C.name);
      };
      probe.src = a.portrait;
    }
  }

  function renderSkills() {
    set('skillsGrid', (C.skills || []).map(function (g) {
      var meters = (g.items || []).map(function (s) {
        var lv = Math.max(0, Math.min(100, Number(s.level) || 0));
        return '<div class="meter">' +
                 '<div class="meter__top"><span class="meter__name">' + esc(s.name) + '</span>' +
                 '<span class="meter__val">' + lv + '%</span></div>' +
                 '<div class="meter__track" role="img" aria-label="' + esc(s.name) + ': ' + lv + ' out of 100">' +
                   '<div class="meter__fill" data-level="' + lv + '"></div>' +
                 '</div>' +
               '</div>';
      }).join('');
      return '<article class="card card--hud skillcard reveal">' + hud() +
               '<h3>' + esc(g.group) + '</h3>' + meters + '</article>';
    }).join(''));
  }

  function renderExperience() {
    set('timeline', (C.experience || []).map(function (e) {
      var pts = (e.points || []).map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('');
      return '<li class="tl reveal">' +
               '<div class="tl__meta"><span class="tl__period">' + esc(e.period) + '</span>' +
               (e.location ? '<span class="tl__place">' + esc(e.location) + '</span>' : '') + '</div>' +
               '<h3 class="tl__role">' + esc(e.role) + '</h3>' +
               '<p class="tl__org">' + esc(e.org) + '</p>' +
               '<ul class="tl__points">' + pts + '</ul>' +
             '</li>';
    }).join(''));
  }

  function renderProjects() {
    var items = C.projects || [];
    var cats = ['All'];
    items.forEach(function (p) { if (p.category && cats.indexOf(p.category) < 0) cats.push(p.category); });

    set('projectFilters', cats.map(function (c, i) {
      return '<button class="chip' + (i === 0 ? ' is-on' : '') + '" data-filter="' + esc(c) +
             '" aria-pressed="' + (i === 0) + '">' + esc(c) + '</button>';
    }).join(''));

    set('projectGrid', items.map(function (p, i) {
      var stack = (p.stack || []).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('');
      var links = (p.links || []).filter(function (l) { return l.url && l.url !== '#'; })
        .map(function (l) {
          return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a>';
        }).join('');
      return '<article class="card card--hud proj reveal" data-cat="' + esc(p.category || '') + '">' + hud() +
               '<p class="proj__idx">' + String(i + 1).padStart(2, '0') + ' / ' + esc(p.category || '—') + '</p>' +
               '<h3 class="proj__title">' + esc(p.title) + '</h3>' +
               '<p class="proj__desc">' + esc(p.description) + '</p>' +
               (stack ? '<div class="proj__stack">' + stack + '</div>' : '') +
               (links ? '<div class="proj__links">' + links + '</div>' : '') +
             '</article>';
    }).join(''));
  }

  function renderEducation() {
    set('eduGrid', (C.education || []).map(function (e) {
      return '<article class="card card--hud reveal">' + hud() +
               '<p class="edu__year">' + esc(e.year) + '</p>' +
               '<h3 class="edu__title">' + esc(e.title) + '</h3>' +
               '<p class="edu__org">' + esc(e.org) + '</p>' +
               (e.note ? '<p class="edu__note">' + esc(e.note) + '</p>' : '') +
             '</article>';
    }).join(''));
  }

  function renderAchievements() {
    set('awardGrid', (C.achievements || []).map(function (a) {
      return '<article class="card card--hud award reveal">' + hud() +
               '<p class="award__fig" data-count="' + esc(a.figure) + '">' + esc(a.figure) + '</p>' +
               '<h3 class="award__title">' + esc(a.title) + '</h3>' +
               '<p class="award__note">' + esc(a.note) + '</p>' +
             '</article>';
    }).join(''));
  }

  var ICON = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1Z"/></svg>',
    pin:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.6"/></svg>'
  };

  function renderContact() {
    var k = C.contact || {};
    set('contactLede', esc(k.lede));

    var acts = [];
    if (k.email)    acts.push('<a class="btn btn--solid magnet" href="mailto:' + esc(k.email) + '">' + esc(k.email) + '</a>');
    if (k.linkedin) acts.push('<a class="btn btn--ghost magnet" href="' + esc(k.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>');
    if (k.github)   acts.push('<a class="btn btn--ghost magnet" href="' + esc(k.github) + '" target="_blank" rel="noopener">GitHub</a>');
    set('contactActions', acts.join(''));

    var meta = [];
    if (k.phone)    meta.push('<li>' + ICON.phone + '<a href="tel:' + esc(k.phone.replace(/\s/g, '')) + '">' + esc(k.phone) + '</a></li>');
    if (k.location) meta.push('<li>' + ICON.pin + '<span>' + esc(k.location) + '</span></li>');
    set('contactMeta', meta.join(''));

    var fl = [];
    if (k.email)    fl.push('<li><a href="mailto:' + esc(k.email) + '">Email</a></li>');
    if (k.linkedin) fl.push('<li><a href="' + esc(k.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a></li>');
    if (k.github)   fl.push('<li><a href="' + esc(k.github) + '" target="_blank" rel="noopener">GitHub</a></li>');
    set('footLinks', fl.join(''));
  }

  var GAL = 'assets/img/gallery/';

  function renderOffDuty() {
    var o = C.offDuty;
    if (!o) return;
    set('offdutyLede', esc(o.lede));

    // Update the witness button label from content
    var btnLabel = document.getElementById('witnessBtnLabel');
    if (btnLabel && o.witnessBtnLabel) btnLabel.textContent = o.witnessBtnLabel;

    set('strands', (o.strands || []).map(function (st) {
      return '<div class="strand"><p class="strand__label mono">' + esc(st.label) + '</p>' +
             '<p>' + esc(st.text) + '</p></div>';
    }).join(''));

    // Render hidden mosaic (used by lightbox)
    set('mosaic', (o.gallery || []).map(function (g, i) {
      return '<button class="shot" data-shot="' + i + '" aria-label="View photo: ' + esc(g.caption) + '">' +
               '<img src="' + GAL + esc(g.src) + '_t.jpg" alt="' + esc(g.alt || g.caption) + '" loading="lazy" decoding="async">' +
               '<span class="shot__cap">' + esc(g.caption) + '</span>' +
             '</button>';
    }).join(''));

    // Render inline gallery (2 per row, scrollable)
    set('inGallery', (o.gallery || []).map(function (g, i) {
      return '<button class="ingal__item" data-shot="' + i + '" aria-label="View: ' + esc(g.caption) + '">' +
               '<img src="' + GAL + esc(g.src) + '_t.jpg" alt="' + esc(g.alt || g.caption) + '" loading="lazy" decoding="async">' +
               '<span class="ingal__cap">' + esc(g.caption) + '</span>' +
             '</button>';
    }).join(''));
  }

  /* Flip card toggle — "Witness them" ↔ "← Back" */
  function witnessFlip() {
    var card  = document.getElementById('offdutyFlip');
    var back  = card && card.querySelector('.flipcard__back');
    var btnW  = document.getElementById('witnessBtn');
    var btnB  = document.getElementById('galleryBackBtn');
    var inGal = document.getElementById('inGallery');
    if (!card || !btnW || !btnB) return;

    btnW.addEventListener('click', function () {
      card.classList.add('is-flipped');
      if (back) back.removeAttribute('aria-hidden');
      btnB.focus();
    });

    btnB.addEventListener('click', function () {
      card.classList.remove('is-flipped');
      if (back) back.setAttribute('aria-hidden', 'true');
      btnW.focus();
    });

    // Inline gallery also opens lightbox
    if (inGal) {
      inGal.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-shot]');
        if (btn) {
          var mosaicBtn = document.querySelector('#mosaic [data-shot="' + btn.dataset.shot + '"]');
          if (mosaicBtn) mosaicBtn.click();
        }
      });
    }
  }

  /* Lightbox — click or keyboard, arrows to move, Escape to leave. */
  function lightbox() {
    var box = $('#lightbox'), img = $('#lbImg'), cap = $('#lbCap');
    var shots = (C.offDuty && C.offDuty.gallery) || [];
    if (!box || !shots.length) return;
    var at = 0, opener = null;

    function show(i) {
      at = (i + shots.length) % shots.length;
      var g = shots[at];
      img.src = GAL + g.src + '.jpg';
      img.alt = g.alt || g.caption;
      cap.textContent = g.caption + '  ·  ' + (at + 1) + ' / ' + shots.length;
    }
    function open(i) {
      opener = document.activeElement;
      show(i);
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      $('#lbClose').focus();
    }
    function close() {
      box.hidden = true;
      document.body.style.overflow = '';
      if (opener && opener.focus) opener.focus();
    }

    var grid = $('#mosaic');
    if (grid) grid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-shot]');
      if (btn) open(Number(btn.dataset.shot));
    });

    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', function () { show(at - 1); });
    $('#lbNext').addEventListener('click', function () { show(at + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape')     { close(); }
      if (e.key === 'ArrowLeft')  { show(at - 1); }
      if (e.key === 'ArrowRight') { show(at + 1); }
    });
  }

  function hud() {
    return '<span class="hud__corner hud__corner--tl"></span><span class="hud__corner hud__corner--tr"></span>' +
           '<span class="hud__corner hud__corner--bl"></span><span class="hud__corner hud__corner--br"></span>';
  }

  /* ══ 2. DECORATIVE SVG TICKS ═══════════════════════════════════════════ */

  function ticks(hostId, cx, cy, rOuter, rInner, count) {
    var host = document.getElementById(hostId);
    if (!host) return;
    var out = '';
    for (var i = 0; i < count; i++) {
      var a = (Math.PI * 2 / count) * i - Math.PI / 2;
      out += '<line x1="' + (cx + Math.cos(a) * rInner).toFixed(2) +
             '" y1="' + (cy + Math.sin(a) * rInner).toFixed(2) +
             '" x2="' + (cx + Math.cos(a) * rOuter).toFixed(2) +
             '" y2="' + (cy + Math.sin(a) * rOuter).toFixed(2) + '"/>';
    }
    host.innerHTML = out;
  }

  /* ══ 3. BOOT SEQUENCE ══════════════════════════════════════════════════ */

  function boot() {
    var box = $('#boot'), bar = $('#bootBar'), label = $('#bootLabel');
    if (!box) return;
    var done = function () {
      box.setAttribute('data-done', '');
      document.body.style.overflow = '';
      window.setTimeout(function () { box.remove(); }, 600);
    };
    if (REDUCED || sessionStorage.getItem('smn-booted')) { done(); return; }

    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('smn-booted', '1');

    var steps = ['INITIALISING', 'LOADING PROFILE', 'RENDERING', 'READY'];
    var pct = 0, i = 0;
    var tick = window.setInterval(function () {
      pct = Math.min(100, pct + 6 + Math.random() * 9);
      if (bar) bar.style.width = pct + '%';
      var next = Math.min(steps.length - 1, Math.floor(pct / 26));
      if (next !== i) { i = next; if (label) label.textContent = steps[i]; }
      if (pct >= 100) { window.clearInterval(tick); window.setTimeout(done, 320); }
    }, 90);
  }

  /* ══ 4. CURSOR RETICLE ═════════════════════════════════════════════════ */

  function reticle() {
    var r = $('#reticle');
    if (!r || REDUCED || window.matchMedia('(pointer: coarse)').matches) return;
    var ring = $('.reticle__ring', r), dot = $('.reticle__dot', r);
    var tx = 0, ty = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      r.classList.add('is-on');
      if (dot) dot.style.transform = 'translate(' + tx + 'px,' + ty + 'px) translate(-50%,-50%)';
    }, { passive: true });

    (function loop() {
      rx += (tx - rx) * 0.16; ry += (ty - ry) * 0.16;
      if (ring) ring.style.transform = 'translate(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var hot = e.target.closest('a, button, .card, .chip, input, textarea');
      r.classList.toggle('is-hot', !!hot);
    });
    document.addEventListener('mouseleave', function () { r.classList.remove('is-on'); });
  }

  /* ══ 5. HERO RADAR CANVAS ══════════════════════════════════════════════ */

  function radar() {
    var cv = $('#radar');
    if (!cv || REDUCED) return;
    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, nodes = [], sweep = 0, visible = true, mx = 0.5, my = 0.5;

    function size() {
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(74, Math.max(26, (w * h) / 22000)));
      nodes = [];
      for (var i = 0; i < n; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }

    function frame() {
      requestAnimationFrame(frame);
      if (!visible || !w) return;
      ctx.clearRect(0, 0, w, h);

      // Radar sweep, anchored to the upper-right quadrant
      var cx = w * (0.72 + (mx - 0.5) * 0.04);
      var cy = h * (0.34 + (my - 0.5) * 0.04);
      var R  = Math.max(w, h) * 0.62;
      sweep += 0.0052;

      var g = ctx.createConicGradient ? ctx.createConicGradient(sweep, cx, cy) : null;
      if (g) {
        g.addColorStop(0.00, 'rgba(255,169,77,0.085)');
        g.addColorStop(0.04, 'rgba(255,169,77,0.045)');
        g.addColorStop(0.16, 'rgba(255,169,77,0.00)');
        g.addColorStop(1.00, 'rgba(255,169,77,0.00)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      }

      // Range rings
      ctx.strokeStyle = 'rgba(61,79,63,0.26)'; ctx.lineWidth = 1;
      for (var k = 1; k <= 4; k++) {
        ctx.beginPath(); ctx.arc(cx, cy, (R / 4) * k, 0, Math.PI * 2); ctx.stroke();
      }

      // Sweep hand
      ctx.strokeStyle = 'rgba(255,169,77,0.22)';
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R); ctx.stroke();

      // Node field + links
      for (var i = 0; i < nodes.length; i++) {
        var p = nodes[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        for (var j = i + 1; j < nodes.length; j++) {
          var q = nodes[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 17000) {
            ctx.strokeStyle = 'rgba(124,143,121,' + (0.16 * (1 - d / 17000)).toFixed(3) + ')';
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        var lit = Math.abs(Math.atan2(p.y - cy, p.x - cx) - (sweep % (Math.PI * 2))) < 0.24;
        ctx.fillStyle = lit ? 'rgba(255,169,77,0.85)' : 'rgba(166,178,169,0.34)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    size();
    frame();
    window.addEventListener('resize', size);
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX / window.innerWidth; my = e.clientY / window.innerHeight;
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(cv);
    }
  }

  /* ══ 6. SCROLL: rail, nav state, active link, to-top ════════════════════ */

  function scrollFx() {
    var fill = $('#railFill'), nav = $('#nav'), top = $('#toTop');
    var links = $$('.nav__links a');
    var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    var ticking = false;

    function update() {
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (fill) fill.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      if (nav) nav.classList.toggle('is-stuck', y > 24);
      if (top) top.classList.toggle('is-in', y > window.innerHeight * 0.7);

      var current = -1;
      for (var i = 0; i < sections.length; i++) {
        var s = sections[i];
        if (s && s.getBoundingClientRect().top <= window.innerHeight * 0.35) current = i;
      }
      links.forEach(function (a, i) { a.classList.toggle('is-active', i === current); });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();

    if (top) top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    });
  }

  /* ══ 7. NAV DRAWER ═════════════════════════════════════════════════════ */

  function drawer() {
    var b = $('#burger'), menu = $('#navLinks');
    if (!b || !menu) return;
    function close() { menu.classList.remove('is-open'); b.setAttribute('aria-expanded', 'false'); }
    b.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      b.setAttribute('aria-expanded', String(open));
      b.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) close(); });
  }

  /* ══ 8. REVEAL · METERS · COUNTERS ═════════════════════════════════════ */

  function reveals() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window) || REDUCED) {
      items.forEach(function (n) { n.classList.add('is-in'); });
      $$('.meter__fill').forEach(function (m) { m.style.width = m.dataset.level + '%'; });
      $$('[data-count]').forEach(function (n) { n.textContent = n.dataset.count; });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var n = en.target;
        var sibs = Array.prototype.indexOf.call(n.parentNode.children, n);
        n.style.transitionDelay = Math.min(sibs, 5) * 70 + 'ms';
        n.classList.add('is-in');
        $$('.meter__fill', n).forEach(function (m, i) {
          window.setTimeout(function () { m.style.width = m.dataset.level + '%'; }, 200 + i * 90);
        });
        $$('[data-count]', n).forEach(count);
        if (n.hasAttribute('data-count')) count(n);
        io.unobserve(n);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (n) { io.observe(n); });

    // Hero stats sit outside .reveal — start them once the page is up.
    window.setTimeout(function () { $$('#heroStats [data-count]').forEach(count); }, 400);
  }

  function count(node) {
    if (node.dataset.done) return;
    node.dataset.done = '1';
    var raw = node.dataset.count || '';
    var m = raw.match(/-?[\d.]+/);
    if (!m || REDUCED) { node.textContent = raw; return; }
    var target = parseFloat(m[0]);
    var pre = raw.slice(0, m.index), post = raw.slice(m.index + m[0].length);
    var dec = (m[0].split('.')[1] || '').length;
    var t0 = performance.now(), dur = 1300;

    (function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      node.textContent = pre + (target * e).toFixed(dec) + post;
      if (p < 1) requestAnimationFrame(step); else node.textContent = raw;
    })(t0);
  }

  /* ══ 9. PROJECT FILTERS ════════════════════════════════════════════════ */

  function filters() {
    var bar = $('#projectFilters');
    if (!bar) return;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      var f = btn.dataset.filter;
      $$('.chip', bar).forEach(function (c) {
        var on = c === btn;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', String(on));
      });
      $$('.proj').forEach(function (p) {
        p.hidden = !(f === 'All' || p.dataset.cat === f);
      });
    });
  }

  /* ══ 10. PARALLAX + MAGNETIC BUTTONS + SCRAMBLE ════════════════════════ */

  function parallax() {
    var items = $$('[data-parallax]');
    if (!items.length || REDUCED) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          items.forEach(function (n) {
            n.style.transform = 'translate3d(0,' + (y * parseFloat(n.dataset.parallax)).toFixed(2) + 'px,0)';
          });
        }
        ticking = false;
      });
    }, { passive: true });
  }

  function magnets() {
    if (REDUCED || window.matchMedia('(pointer: coarse)').matches) return;
    $$('.magnet').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.22;
        var y = (e.clientY - r.top - r.height / 2) * 0.32;
        b.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  function scramble() {
    var node = $('[data-scramble]');
    if (!node || REDUCED) return;
    var target = node.textContent;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·';
    var frame = 0;
    var timer = window.setInterval(function () {
      frame++;
      var reveal = Math.floor(frame / 2);
      node.textContent = target.split('').map(function (ch, i) {
        if (i < reveal || ch === ' ') return ch;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (reveal >= target.length) { window.clearInterval(timer); node.textContent = target; }
    }, 38);
  }

  /* ══ 11. DIAL SCROLL ROTATION ══════════════════════════════════════════ */

  function dial() {
    var svg = $('#chakraDial');
    if (!svg || REDUCED) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        svg.style.transform = 'rotate(' + (window.scrollY * 0.04).toFixed(2) + 'deg)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ══ 12. INIT ══════════════════════════════════════════════════════════ */

  function init() {
    renderIdentity();
    renderAbout();
    renderSkills();
    renderExperience();
    renderProjects();
    renderEducation();
    renderAchievements();
    renderOffDuty();
    renderContact();

    ticks('bootTicks', 60, 60, 52, 46, 24);
    ticks('dialTicks', 120, 120, 118, 106, 24);

    boot();
    reticle();
    radar();
    scrollFx();
    drawer();
    reveals();
    filters();
    parallax();
    magnets();
    dial();
    lightbox();
    witnessFlip();
    window.setTimeout(scramble, REDUCED ? 0 : 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
