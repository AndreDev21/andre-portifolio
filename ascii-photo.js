/**
 * Fundo ASCII/Matrix do boot.
 *
 * A ideia: a chuva que cobre a tela *é* a nuvem. Ao iniciar o build ela para de ser
 * uniforme e passa a obedecer a um mapa de densidade: some onde o desenho é cheio e
 * permanece em volta. A figura aparece como o vazio — não como caracteres acesos.
 * A densidade também decai numa elipse, então a nuvem desmancha nas bordas em vez
 * de terminar num retângulo.
 *
 * A arte vem pronta de ascii-art.js — nenhuma imagem é baixada nem processada em runtime.
 * Abaixo de MOBILE_MAX a figura não entra: fica só a chuva.
 */
(function () {
  'use strict';

  var CHAR_RAMP = ' .:-=+*#%@';
  var MATRIX_GLYPHS = '0123456789<>/\\|+-=*#$%&{}[]()~^!?;:_'.split('');
  var CELL_W = 8;   // px por caractere na chuva (grade grossa, barata)
  var CELL_H = 12;
  var FLICKER_CHANCE = 0.3;
  var FORM_MS = 2800;  // tempo até a figura estar totalmente aberta
  var GLYPH_RGB = '183, 140, 255';
  var RAIN_BANDS = [0.13, 0.19, 0.26];
  var GUTTER = 26;
  var CHAR_RATIO = 0.8;  // largura/altura da célula da arte (0.6em / 0.75 de entrelinha)
  var MOBILE_MAX = 900;

  // vinheta da nuvem, em raio normalizado a partir do centro da figura
  var VIG_START = 0.70;
  var VIG_END = 1.25;
  /* Controla só os meios-tons — ou seja, as bordas dos traços do rosto.
     Fundo (tom 0) e camiseta (tom 1) não mudam com ele. Valor alto = traço mais fino
     e rosto mais definido; valor baixo = nuvem mais cheia e rosto mais lavado. */
  var CLOUD_GAMMA = 1.5;
  var FIGURE_ALPHA = 0.52; // opacidade da nuvem da figura no boot
  var HANDOFF_MS = 1100;   // viagem da figura do boot até o lugar dela no hero
  var HANDOFF_FADE_MS = 420;

  function randomGlyph() {
    return MATRIX_GLYPHS[(Math.random() * MATRIX_GLYPHS.length) | 0];
  }

  function debounce(fn, ms) {
    var t;
    return function () { clearTimeout(t); var a = arguments; t = setTimeout(function () { fn.apply(null, a); }, ms); };
  }

  function prefersReducedMotion() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (e) { return false; }
  }

  /* Ruído entrelaçado (interleaved gradient noise): determinístico e bem distribuído.
     Random puro se agrupa, e é justamente o agrupamento que borra traço fino — linha
     de olho, canto de boca. Com isso o limiar fica estável e o rosto ganha definição,
     sem cair no padrão quadriculado de um dither ordenado. */
  function ign(x, y) {
    var v = 0.06711056 * x + 0.00583715 * y;
    v = 52.9829189 * (v - Math.floor(v));
    return v - Math.floor(v);
  }

  /* Densidade da nuvem: o negativo do desenho, esmaecido pela vinheta.
     tone 0 = vazio do desenho (cabe caractere), 1 = traço cheio (fica buraco). */
  function cloudDensity(tone, nx, ny, gamma) {
    var r = Math.sqrt(nx * nx + ny * ny);
    var vig = r < VIG_START ? 1 : Math.max(0, 1 - (r - VIG_START) / (VIG_END - VIG_START));
    if (vig <= 0) return 0;
    return Math.pow(1 - tone, gamma) * vig;
  }

  function toneAt(art, x, y) {
    var i = CHAR_RAMP.indexOf(art[y].charAt(x));
    return i <= 0 ? 0 : i / (CHAR_RAMP.length - 1);
  }

  /* Versão estática da nuvem, em texto — usada no hero. */
  function cloudText(art) {
    var rows = art.length, cols = art[0].length, out = [];
    for (var y = 0; y < rows; y++) {
      var line = '';
      for (var x = 0; x < cols; x++) {
        var d = cloudDensity(toneAt(art, x, y), (x / cols) * 2 - 1, (y / rows) * 2 - 1, CLOUD_GAMMA);
        line += ign(x, y) < d ? randomGlyph() : ' ';
      }
      out.push(line);
    }
    return out.join('\n');
  }

  function init(containerId) {
    var host = document.getElementById(containerId);
    if (!host) return null;

    var canvas = document.createElement('canvas');
    canvas.className = 'ascii-canvas';
    host.innerHTML = '';
    host.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    // a figura é um canvas próprio: assim ela pode voar até o hero na transição,
    // sem herdar o blur/fade que o loader aplica em si mesmo
    var layer = document.createElement('canvas');
    layer.className = 'ascii-figure';
    var lctx = layer.getContext('2d');
    var handedOff = false;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, cols = 0, rows = 0;
    var bands = [];
    var figure = [];   // células da nuvem da figura, com hora de aparecer
    var drawn = 0;     // quantas já foram para a camada
    var box = null;
    var running = false, rafId = null;
    var forming = false, formStart = 0, progress = 0;
    var still = prefersReducedMotion();
    var art = typeof window.AM_ASCII_ART === 'string' ? window.AM_ASCII_ART.split('\n') : null;
    var onResize = debounce(resize, 200);

    /* A figura ocupa quase toda a altura, encostada à direita. A caixa do terminal
       flutua por cima; como a figura é vazio e a nuvem é discreta, lê como camadas. */
    function measure() {
      if (!art || w < MOBILE_MAX) return null;
      var aCols = art[0].length, aRows = art.length;
      var ch = (h - GUTTER * 2) / aRows;
      var cw = ch * CHAR_RATIO;
      var pw = aCols * cw;
      if (pw > w - GUTTER * 2) { cw = (w - GUTTER * 2) / aCols; ch = cw / CHAR_RATIO; pw = aCols * cw; }
      if (cw < 1.2) return null;
      return { cw: cw, ch: ch, cols: aCols, rows: aRows, x: w - GUTTER - pw, y: (h - aRows * ch) / 2 };
    }

    /* Posiciona e dimensiona o canvas da figura dentro do container. */
    function placeFigure() {
      if (handedOff) return;
      if (!box) { if (layer.parentNode) layer.parentNode.removeChild(layer); return; }
      var pw = box.cols * box.cw, ph = box.rows * box.ch;
      layer.width = Math.floor(pw * dpr);
      layer.height = Math.floor(ph * dpr);
      layer.style.width = pw + 'px';
      layer.style.height = ph + 'px';
      layer.style.left = box.x + 'px';
      layer.style.top = box.y + 'px';
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!layer.parentNode) host.appendChild(layer);
    }

    function buildFigure() {
      figure = []; drawn = 0;
      if (!box) return;
      lctx.clearRect(0, 0, box.cols * box.cw, box.rows * box.ch);
      for (var y = 0; y < box.rows; y++) {
        for (var x = 0; x < box.cols; x++) {
          var d = cloudDensity(toneAt(art, x, y), (x / box.cols) * 2 - 1, (y / box.rows) * 2 - 1, CLOUD_GAMMA);
          if (d <= 0 || ign(x, y) >= d) continue; // a figura é o que sobra vazio
          figure.push({
            gx: x * box.cw,
            gy: y * box.ch,
            glyph: randomGlyph(),
            at: Math.random() * FORM_MS,
          });
        }
      }
      figure.sort(function (a, b) { return a.at - b.at; });
    }

    function resize() {
      w = host.clientWidth || window.innerWidth;
      h = host.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / CELL_W);
      rows = Math.ceil(h / CELL_H);
      box = measure();
      placeFigure();

      bands = [];
      for (var b = 0; b < RAIN_BANDS.length; b++) bands.push([]);
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          bands[(Math.random() * RAIN_BANDS.length) | 0].push({
            glyph: randomGlyph(), px: x * CELL_W, py: y * CELL_H,
          });
        }
      }

      buildFigure();
      if (forming) { formStart = performance.now() - progress * FORM_MS; }
      if (still) { progress = 1; flush(FORM_MS); draw(); }
    }

    /* Passa para a camada tudo que já deveria ter aparecido. */
    function flush(t) {
      if (!box || drawn >= figure.length) return;
      lctx.font = Math.max(3, box.ch * 0.95) + 'px "IBM Plex Mono", monospace';
      lctx.textBaseline = 'top';
      lctx.fillStyle = 'rgba(' + GLYPH_RGB + ', ' + FIGURE_ALPHA + ')';
      while (drawn < figure.length && figure[drawn].at <= t) {
        var c = figure[drawn];
        lctx.fillText(c.glyph, c.gx, c.gy);
        drawn++;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // a chuva da tela some conforme a figura aparece
      var fade = 1 - progress;
      if (fade > 0.01) {
        ctx.font = Math.floor(CELL_H * 0.82) + 'px "IBM Plex Mono", monospace';
        ctx.textBaseline = 'top';
        for (var b = 0; b < bands.length; b++) {
          ctx.fillStyle = 'rgba(' + GLYPH_RGB + ', ' + RAIN_BANDS[b] + ')';
          var list = bands[b];
          for (var i = 0; i < list.length; i++) {
            // rarear de verdade (em vez de só baixar a opacidade) também corta trabalho
            if (fade < 1 && Math.random() >= fade) continue;
            var c = list[i];
            if (Math.random() < FLICKER_CHANCE) c.glyph = randomGlyph();
            ctx.fillText(c.glyph, c.px, c.py);
          }
        }
      }

    }

    function frame(ts) {
      if (!running) return;
      if (forming) {
        var t = ts - formStart;
        progress = Math.min(1, t / FORM_MS);
        flush(t);
      }
      draw();
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || still) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    }

    function formPortrait() {
      if (forming || still || !box) return;
      forming = true;
      formStart = performance.now();
    }

    /* Entrega a figura para o hero: ela sai do loader, voa até o retângulo de
       destino e desaparece por lá enquanto o <pre> estático assume o lugar.
       Devolve quanto tempo a viagem leva, pra quem chamou sincronizar. */
    function handoff(target) {
      if (!box || handedOff || !layer.parentNode || !target || !target.width) return 0;
      handedOff = true;

      var from = layer.getBoundingClientRect();
      document.body.appendChild(layer); // fora do loader: não herda o blur nem o fade
      layer.style.position = 'fixed';
      layer.style.left = from.left + 'px';
      layer.style.top = from.top + 'px';
      layer.style.transformOrigin = 'top left';
      layer.style.zIndex = '1000';
      void layer.offsetWidth; // fixa o estado inicial antes de transicionar

      var dx = target.left - from.left;
      var dy = target.top - from.top;
      var sx = target.width / from.width;
      var sy = target.height / from.height;
      layer.style.transition =
        'transform ' + HANDOFF_MS + 'ms cubic-bezier(.4, 0, .2, 1), ' +
        'opacity ' + HANDOFF_FADE_MS + 'ms ease ' + (HANDOFF_MS - HANDOFF_FADE_MS) + 'ms';
      layer.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + sx + ', ' + sy + ')';
      layer.style.opacity = '0';

      setTimeout(function () {
        if (layer.parentNode) layer.parentNode.removeChild(layer);
        layer.width = layer.height = 0;
      }, HANDOFF_MS + 120);

      return HANDOFF_MS;
    }

    function stop() {
      running = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      window.removeEventListener('resize', onResize);
      bands = []; figure = [];
      if (!handedOff) {
        layer.width = layer.height = 0;
        if (layer.parentNode) layer.parentNode.removeChild(layer);
      }
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }

    window.addEventListener('resize', onResize);
    resize();
    start();

    return { start: start, stop: stop, resize: resize, formPortrait: formPortrait, handoff: handoff };
  }

  window.AsciiPhoto = { init: init, cloudText: cloudText };
})();
