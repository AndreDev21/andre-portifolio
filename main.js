(function () {
  'use strict';
  var D = window.AM;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === 'html') node.innerHTML = attrs[k];
      else if (k === 'text') node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  /* ================= header ================= */
  function renderHeader() {
    var header = document.getElementById('header');
    header.appendChild(
      el('div', { class: 'header-inner' }, [
        el('a', { class: 'brand', href: '#top', html: '&gt;/<span>' + D.meta.name.replace('>/', '') + '</span>' }),
        el('nav', { class: 'nav' }, [
          el('a', { href: '#work' }, [document.createTextNode('projetos')]),
          el('a', { href: '#about' }, [document.createTextNode('sobre')]),
          el('a', { href: '#contact' }, [document.createTextNode('contato')]),
          el('a', { href: 'contacts/', class: 'nav-cta' }, [document.createTextNode('cartão')]),
        ]),
      ])
    );
  }

  /* ================= hero ================= */
  function renderHero() {
    var hero = document.getElementById('hero');
    var chips = el('div', { class: 'hero-stack' });
    D.hero.stack.forEach(function (s) { chips.appendChild(el('span', { class: 'chip', text: s })); });

    var ctas = el('div', { class: 'hero-ctas' });
    D.hero.ctas.forEach(function (c, i) {
      ctas.appendChild(el('a', { href: c.href, class: 'btn ' + (i === 0 ? 'btn-primary' : 'btn-ghost') }, [document.createTextNode(c.label)]));
    });

    var texto = el('div', { class: 'hero-text' });
    texto.appendChild(el('span', { class: 'hero-kicker reveal', text: D.hero.kicker }));
    texto.appendChild(el('h1', { class: 'reveal', text: D.hero.greeting }));
    texto.appendChild(el('p', { class: 'reveal', text: D.hero.pitch }));
    texto.appendChild(el('p', { class: 'current reveal', text: D.hero.current }));
    chips.classList.add('reveal');
    ctas.classList.add('reveal');
    texto.appendChild(chips);
    texto.appendChild(ctas);

    hero.appendChild(el('div', { class: 'hero-grid' }, [texto, heroPortrait()]));

    // cascata: cada bloco do hero entra um pouco depois do anterior
    [].forEach.call(texto.querySelectorAll('.reveal'), function (node, i) {
      node.style.setProperty('--stagger', i * 70 + 'ms');
    });
  }

  /* Retrato em ASCII: <pre> estático, sem canvas nem animação.
     A figura é o vazio — os caracteres formam a nuvem em volta e dentro dela. */
  function heroPortrait() {
    if (!window.AM_ASCII_ART || !window.AsciiPhoto) return null;
    return el('pre', {
      class: 'hero-ascii',
      role: 'img',
      'aria-label': 'Retrato de André, formado pelo vazio numa nuvem de caracteres',
      text: window.AsciiPhoto.cloudText(window.AM_ASCII_ART.split('\n')),
    });
  }

  /* ================= work ================= */
  function renderWork() {
    var work = document.getElementById('work');
    work.appendChild(
      el('div', { class: 'section-head reveal' }, [
        el('span', { class: 'section-kicker', text: '// projetos' }),
        el('h2', { class: 'section-title', text: 'O que eu construí' }),
      ])
    );

    var grid = el('div', { class: 'project-grid' });
    D.projects.forEach(function (p) {
      var card = el('div', { class: 'project-card reveal' + (p.mockup ? ' has-mockup' : '') }, [
        el('div', { class: 'project-card-top' }, [
          el('span', { class: 'project-tag', text: p.tag }),
          el('span', { class: 'project-status' + (p.live ? ' is-live' : ''), text: p.status }),
        ]),
        el('h3', { text: p.title }),
        el('p', { text: p.brief }),
        (function () {
          var stackRow = el('div', { class: 'project-stack' });
          p.stack.forEach(function (s) { stackRow.appendChild(el('span', { text: s })); });
          return stackRow;
        })(),
        el('span', { class: 'project-open', html: 'ver detalhes &rarr;' }),
      ]);
      card.addEventListener('click', function () { openPanel(p); });
      grid.appendChild(card);
    });
    work.appendChild(grid);
  }

  /* ================= project panel ================= */
  var overlay, panel;
  function ensurePanel() {
    if (overlay) return;
    overlay = el('div', { class: 'panel-overlay' });
    panel = el('div', { class: 'panel' });
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closePanel(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });
  }

  function openPanel(p) {
    ensurePanel();
    panel.innerHTML = '';

    // barra de janela, no mesmo espírito da do terminal
    var fechar = el('button', { class: 'panel-close', type: 'button', 'aria-label': 'Fechar', text: '\u00d7' });
    fechar.addEventListener('click', closePanel);
    panel.appendChild(el('div', { class: 'panel-bar' }, [
      el('span', { class: 'panel-path', text: '~/projetos/' + p.id }),
      fechar,
    ]));

    panel.appendChild(el('span', { class: 'panel-tag', text: p.tag + ' · ' + p.status }));
    panel.appendChild(el('h2', { text: p.title }));
    panel.appendChild(el('p', { class: 'panel-overview', text: p.overview }));

    var list = el('ul', { class: 'panel-highlights' });
    p.highlights.forEach(function (h) { list.appendChild(el('li', { text: h })); });
    panel.appendChild(list);

    var stackRow = el('div', { class: 'panel-stack' });
    p.stack.forEach(function (s) { stackRow.appendChild(el('span', { class: 'chip', text: s })); });
    panel.appendChild(stackRow);

    if (p.live) {
      panel.appendChild(
        el('a', {
          class: 'panel-live',
          href: p.live,
          target: '_blank',
          rel: 'noopener noreferrer',
          html: 'ver no ar &nearr;',
        })
      );
    }

    if (p.mockup && window.AM_MOCKUPS && window.AM_MOCKUPS[p.mockup]) {
      panel.appendChild(window.AM_MOCKUPS[p.mockup](p));
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ================= about ================= */
  function renderAbout() {
    var about = document.getElementById('about');
    var grid = el('div', { class: 'about-grid' });
    grid.appendChild(
      el('div', { class: 'reveal' }, [
        el('span', { class: 'section-kicker', text: '// sobre' }),
        el('h2', { text: D.about.headline }),
        el('p', { class: 'about-pull', html: D.about.pull }),
      ])
    );
    var right = el('div', { class: 'reveal' });
    D.about.paragraphs.forEach(function (t) { right.appendChild(el('p', { text: t })); });
    right.appendChild(el('p', { class: 'about-signoff', text: D.about.signoff }));
    grid.appendChild(right);
    about.appendChild(grid);
  }

  /* ================= contact ================= */
  function renderContact() {
    var contact = document.getElementById('contact');
    var inner = el('div', { class: 'contact-inner reveal' });

    inner.appendChild(el('div', { class: 'contact-bar' }, [
      el('span', { class: 'contact-path', text: '~/contato' }),
      el('span', { class: 'contact-status', text: 'aberto' }),
    ]));

    var body = el('div', { class: 'contact-body' });
    var left = el('div', {}, [
      el('span', { class: 'section-kicker', text: '// contato' }),
      el('h2', { text: D.contact.headline }),
      el('p', { text: D.contact.text }),
      el('a', { class: 'card-cta', href: D.contact.cardCta.href, html: D.contact.cardCta.label + ' &rarr;' }),
      el('p', { class: 'contact-location', text: D.contact.location }),
    ]);

    var right = el('div', { class: 'channels' });
    D.contact.channels.forEach(function (c) {
      right.appendChild(
        el('a', { class: 'channel', href: c.href, target: '_blank', rel: 'noopener' }, [
          el('span', { class: 'channel-label', text: c.label + ' — ' + c.value }),
          el('span', { class: 'channel-note', text: c.note }),
        ])
      );
    });

    body.appendChild(left);
    body.appendChild(right);
    inner.appendChild(body);
    contact.appendChild(inner);
  }

  /* ================= footer ================= */
  function renderFooter() {
    document.getElementById('footer').appendChild(el('p', { html: D.footer.text }));
  }

  /* ================= reveal on scroll ================= */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (i) { i.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (i) { io.observe(i); });
  }

  /* ================= boot terminal ================= */
  var BUILD_CMD = 'pnpm run build';
  var BOOT_HINTS = [
    'Enter ↵ —',
    'clica aí, sem build não rola',
    'spoiler: tem projeto real aqui dentro',
    '3… 2… 1… (mentira, precisa apertar Enter)',
  ];
  var bootReady = false;
  var bootRunning = false;
  var hintTimer = null;
  var asciiPhoto = null;

  function isDevMode() {
    try { return localStorage.getItem('am_skip_boot') === '1' || location.search.indexOf('noboot') !== -1; }
    catch (e) { return false; }
  }

  function runLoader() {
    if (isDevMode()) { finishBoot(); return; }

    if (window.AsciiPhoto) asciiPhoto = window.AsciiPhoto.init('boot-ascii');

    document.body.classList.add('loading');
    var cmdEl = document.getElementById('boot-cmd');
    var cursor = document.getElementById('boot-cursor');
    var hint = document.getElementById('boot-hint');

    cycleHints(hint);
    typeCommand(cmdEl, BUILD_CMD, function () {
      bootReady = true;
      hint.textContent = 'Enter ↵ — bora buildar';
    });

    function start() {
      if (!bootReady || bootRunning) return;
      bootRunning = true;
      clearInterval(hintTimer);
      hint.classList.add('hidden');
      cursor.classList.add('off');
      if (asciiPhoto) asciiPhoto.formPortrait();
      runBuildLogs();
    }
    hint.addEventListener('click', start);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && document.body.classList.contains('loading')) { e.preventDefault(); start(); }
    });
  }

  function cycleHints(elm) {
    var i = 0;
    hintTimer = setInterval(function () {
      if (bootRunning) return;
      i = (i + 1) % BOOT_HINTS.length;
      elm.textContent = BOOT_HINTS[i];
    }, 2200);
  }

  function typeCommand(elm, text, onDone) {
    var i = 0;
    function tick() {
      if (i >= text.length) { onDone && onDone(); return; }
      elm.textContent += text[i];
      i += 1;
      setTimeout(tick, 40 + Math.random() * 30);
    }
    setTimeout(tick, 350);
  }

  function appendLog(html) {
    var log = document.getElementById('boot-log');
    var line = document.createElement('div');
    line.innerHTML = html;
    log.appendChild(line);
    line.scrollIntoView({ block: 'nearest' });
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function runBuildLogs() {
    var inputLine = document.querySelector('.boot-input-line');
    appendLog('<span class="log-dim">' + BUILD_CMD + '</span>');
    inputLine.style.display = 'none';

    var n = D.projects.length;
    var steps = [
      ['<span class="log-dim">&gt; andre-portfolio@1.0.0 build</span>', 90],
      ['<span class="log-dim">&gt; vite build</span>', 150],
      ['', 120],
      ['<span class="log-fun">[init] checando se o Arch ainda bootou hoje...</span>', 300],
      ['<span class="log-ok">✓ pacman -Syu não quebrou nada (dessa vez)</span>', 110],
      ['', 80],
      ['<span class="log-info">vite v5.4.11 building for production...</span>', 120],
      ['<span class="log-fun">consultando o Claude antes de commitar isso...</span>', 280],
      ['<span class="log-ok">✓ aprovado sem ressalvas</span>', 100],
      ['transforming modules (' + n + ')...', 220],
      ['<span class="log-joke">  → comprimindo 300+ clientes empresariais num card... </span>', 260],
      ['<span class="log-ok">✓ sem perda de dados</span>', 90],
      ['<span class="log-ok">✓ ' + n + ' modules transformed.</span>', 100],
      ['<span class="log-fun">subindo containers na Oracle Cloud...</span>', 280],
      ['<span class="log-joke">  → 10+ apps no ar, nenhuma derrubou a outra</span>', 220],
      ['computing gzip size...', 160],
      ['<span class="log-fun">gzip: -100% de enrolação</span>', 130],
      ['', 90],
      ['<span class="log-dim">dist/index.html</span>                 12.8 kB │ gzip: 4.1 kB', 55],
      ['<span class="log-dim">dist/assets/mentoria.min.js</span>      1.4 kB │ gzip: 0.3 kB', 50],
      ['<span class="log-dim">dist/assets/projetos.js</span>         71.2 kB │ gzip: 22.6 kB', 50],
      ['', 100],
      ['<span class="log-ok">✓ built in 1.21s</span>', 170],
      ['<span class="log-joke">  (tempo real: bem mais que isso, mas dev sempre mente no changelog)</span>', 320],
      ['', 190],
      ['<span class="log-dim">&gt; npm run preview</span>', 90],
      ['<span class="log-dim">&gt; vite preview --port 5173</span>', 140],
      ['', 100],
      ['<span class="log-ok">  ➜  Local:   http://localhost:5173/</span>', 90],
      ['<span class="log-fun">  ➜  abrindo portfólio... segura aí</span>', 260],
      ['<span class="log-warn">  ➜  WARN: site pode gerar vontade de chamar no WhatsApp</span>', 340],
      ['<span class="log-ok">  ➜  ready. bem-vindo. ✓</span>', 420],
    ];

    var i = 0;
    function step() {
      if (i >= steps.length) {
        document.querySelector('.boot-terminal').classList.add('is-done');
        wait(350).then(finishBoot);
        return;
      }
      var pair = steps[i];
      if (pair[0]) appendLog(pair[0]);
      i += 1;
      setTimeout(step, pair[1]);
    }
    step();
  }

  function finishBoot() {
    var boot = document.getElementById('boot');
    boot.classList.add('done');
    boot.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('loading');
    initReveal();

    var retrato = document.querySelector('.hero-ascii');
    var efeito = asciiPhoto;
    asciiPhoto = null;

    // A figura formada no boot voa até o lugar dela no hero e se dissolve ali,
    // enquanto o <pre> estático assume por baixo. É a mesma imagem o tempo todo.
    var viagem = 0;
    if (efeito && retrato && getComputedStyle(retrato).display !== 'none') {
      viagem = efeito.handoff(retrato.getBoundingClientRect());
    }

    if (retrato) {
      // o <pre> aparece já no fim da viagem, por baixo da figura que está saindo
      var entra = function () { retrato.classList.add('in'); };
      if (viagem) setTimeout(entra, Math.max(0, viagem - 500));
      else requestAnimationFrame(entra);
    }

    // a chuva só é liberada depois do fade, senão some de golpe
    if (efeito) setTimeout(function () { efeito.stop(); }, 900);
  }

  /* ================= init ================= */
  document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderHero();
    renderWork();
    renderAbout();
    renderContact();
    renderFooter();
    runLoader();
  });
})();
