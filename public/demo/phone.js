/*
 * Renders the interactive Lumen demo: a port of the real Flutter app's
 * screens (lumen-app/lib/src/) to the DOM, wired to the real plugin logic
 * compiled to JavaScript in lumen-demo.js (see tools/web-demo).
 *
 * Every tool below calls `window.lumenCall(tool, argsJson)`, the bridge that
 * runs the same Dart classes the app calls. This file only owns the screens,
 * the wording (the app's own strings) and the navigation; it never computes a
 * result itself.
 */
(function () {
  'use strict';

  var screen = document.getElementById('lumen-demo');
  var dataEl = document.getElementById('lumen-demo-data');
  if (!screen || !dataEl) return;

  var data = JSON.parse(dataEl.textContent);
  var S = function (key) {
    return Object.prototype.hasOwnProperty.call(data.strings, key) ? data.strings[key] : key;
  };
  var fmt = function (text, values) {
    return text.replace(/\{(\w+)\}/g, function (_, key) {
      return String(values[key]);
    });
  };

  // ---- Material icon paths used by the app ---------------------------------
  var ICON = {
    back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
    outward: 'M6.4 18L5 16.6 14.6 7H6V5h12v12h-2V8.4z',
    expand: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z',
    info: 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
    chevron: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
    warning: 'M12 5.99L19.53 19H4.47L12 5.99M12 2c-.51 0-1.02.25-1.3.75l-9.5 16.5C.61 20.28 1.37 21.5 2.5 21.5h19c1.13 0 1.89-1.22 1.3-2.25l-9.5-16.5C13.02 2.25 12.51 2 12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z',
    settings:
      'M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'
  };

  var SVG_NS = 'http://www.w3.org/2000/svg';

  // ---- DOM helpers -------------------------------------------------------------
  function h(tag, props) {
    var node = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (key) {
      var value = props[key];
      if (value === undefined || value === null || value === false) return;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key === 'html') node.innerHTML = value;
      else if (key === 'style') node.setAttribute('style', value);
      else if (key.slice(0, 2) === 'on') node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : value);
    });
    for (var i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }

  function append(parent, child) {
    if (child === undefined || child === null || child === false) return;
    if (Array.isArray(child)) child.forEach(function (c) { append(parent, c); });
    else if (typeof child === 'string') parent.appendChild(document.createTextNode(child));
    else parent.appendChild(child);
  }

  function icon(path, cls) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    if (cls) svg.setAttribute('class', cls);
    var p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', path);
    svg.appendChild(p);
    return svg;
  }

  var uid = 0;
  var nextId = function () {
    uid += 1;
    return 'lp-' + uid;
  };

  // lumen-app/lib/src/theme/logo_mark.dart: an open arc, stroke = size / 8.
  function logoMark(size, color) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'lp-mark');
    svg.setAttribute('viewBox', '0 0 48 48');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('stroke', color);
    svg.setAttribute('stroke-width', '6');
    var p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', 'M 33.2 10.9 A 16 16 0 1 1 14.8 10.9');
    svg.appendChild(p);
    return svg;
  }

  function badge(moduleId, diameter, extraClass) {
    return h('span', {
      class: 'lp-badge' + (extraClass ? ' ' + extraClass : ''),
      style: '--d:' + diameter + 'px;--c:' + data.colors[moduleId],
      'aria-hidden': 'true',
      html: '<svg viewBox="0 0 24 24">' + data.icons[moduleId] + '</svg>'
    });
  }

  function moduleOf(id) {
    return data.modules.filter(function (m) { return m.id === id; })[0];
  }

  // ---- Bridge to the real plugin logic -----------------------------------------
  function call(tool, args) {
    if (typeof window.lumenCall !== 'function') {
      return Promise.reject(new Error('The demo engine did not load.'));
    }
    return window.lumenCall(tool, JSON.stringify(args || {})).then(function (json) {
      return JSON.parse(json);
    });
  }

  // ---- Components (the app's widgets) ------------------------------------------
  function toolCard(title) {
    var card = h('section', { class: 'lp-card' }, h('div', { class: 'lp-card-title' }, h('h3', { text: title })));
    for (var i = 1; i < arguments.length; i++) append(card, arguments[i]);
    return card;
  }

  function note(text) {
    return h('div', { class: 'lp-note' }, icon(ICON.info), h('p', { text: text }));
  }

  function moduleHeader(moduleId) {
    var mod = moduleOf(moduleId);
    return h(
      'header',
      { class: 'lp-header', style: '--c:' + data.colors[moduleId] },
      h('span', { 'aria-hidden': 'true', html: '<svg viewBox="0 0 24 24">' + data.icons[moduleId] + '</svg>' }),
      h('h2', { class: 'lp-header-name', text: S(mod.nameKey) }),
      h('p', { class: 'lp-header-desc', text: S(mod.descriptionKey) })
    );
  }

  function field(label, options) {
    options = options || {};
    var id = nextId();
    var lines = options.lines || 1;
    var max = options.maxLines || lines;
    var input = max > 1
      ? h('textarea', { id: id, rows: lines, placeholder: ' ', spellcheck: 'false' })
      : h('input', {
          id: id,
          type: 'text',
          placeholder: ' ',
          spellcheck: 'false',
          inputmode: options.numeric ? 'numeric' : false,
          autocomplete: 'off'
        });
    input.value = options.value || '';
    var wrap = h('div', { class: 'lp-field' }, input, h('label', { for: id, text: label }));
    if (max > 1) {
      var grow = function () {
        input.style.height = 'auto';
        var line = parseFloat(getComputedStyle(input).lineHeight) || 24;
        var limit = line * max + 32;
        input.style.height = Math.min(input.scrollHeight + 2, limit) + 'px';
        input.style.overflowY = input.scrollHeight > limit ? 'auto' : 'hidden';
      };
      input.addEventListener('input', grow);
      wrap.grow = grow;
    }
    return {
      el: wrap,
      get value() { return input.value; },
      int: function () {
        var n = parseInt(input.value, 10);
        return isNaN(n) ? 0 : n;
      }
    };
  }

  function button(label, options) {
    options = options || {};
    var kind = options.kind || 'primary';
    var node = h(
      'button',
      { type: 'button', class: 'lp-btn lp-btn-' + kind, onclick: options.onClick },
      h('span', { text: label })
    );
    return node;
  }

  function output(initial) {
    var p = h('p');
    var box = h('div', { class: 'lp-out', role: 'status' }, p);
    var set = function (text) {
      if (text === null || text === undefined) {
        box.hidden = true;
        return;
      }
      p.textContent = text;
      box.hidden = false;
    };
    box.setText = set;
    set(initial === undefined ? null : initial);
    return box;
  }

  function row() {
    var node = h('div', { class: 'lp-row' });
    for (var i = 0; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }

  function withGap(node, px) {
    node.style.marginTop = px + 'px';
    return node;
  }

  function hint(text) {
    return h('p', { class: 'lp-text', text: text });
  }

  function dropdown(options, value, onChange, label) {
    var select = h('select', { 'aria-label': label || '' });
    options.forEach(function (o) {
      var option = h('option', { value: o[0], text: o[1] });
      if (o[0] === value) option.selected = true;
      select.appendChild(option);
    });
    select.addEventListener('change', function () { onChange(select.value); });
    return h('div', { class: 'lp-select' }, select, icon(ICON.expand));
  }

  function checkTile(label, checked, onChange) {
    var input = h('input', { type: 'checkbox' });
    input.checked = checked;
    input.addEventListener('change', function () { onChange(input.checked); });
    return h('label', { class: 'lp-check' }, h('span', { text: label }), input);
  }

  function chip(label, onClick) {
    return onClick
      ? h('button', { type: 'button', class: 'lp-chip', onclick: onClick, text: label })
      : h('span', { class: 'lp-chip', text: label });
  }

  // Runs a tool and shows an error in the output box if the engine is unavailable.
  function run(outputBox, work) {
    work().catch(function (error) {
      outputBox.setText(String(error && error.message ? error.message : error));
    });
  }

  // ---- Pages -----------------------------------------------------------------
  var state = {
    stack: [],
    enabled: {},
    consent: {},
    mode: 'complete',
    textScale: 1,
    devMode: false,
    step: 0,
    answers: { vision: false, hearing: false, safety: false, family: false, simple: false }
  };

  var pages = {};
  var builders = {};
  var statusbar = buildStatusBar();
  screen.appendChild(statusbar.bar);
  screen.appendChild(statusbar.notch);

  function buildStatusBar() {
    var bar = h(
      'div',
      { class: 'lp-status', 'aria-hidden': 'true' },
      h('span', { text: '9:41' }),
      h('span', {
        class: 'lp-status-icons',
        html:
          '<svg viewBox="0 0 24 24" width="16" height="12"><path d="M2 9 Q12 0 22 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="10" r="1.6" fill="currentColor"/></svg>' +
          '<svg viewBox="0 0 26 12" width="24" height="12"><rect x="1" y="1" width="21" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor"/><rect x="2.6" y="2.6" width="15" height="6.8" rx="1.6" fill="currentColor"/></svg>'
      })
    );
    return { bar: bar, notch: h('div', { class: 'lp-notch', 'aria-hidden': 'true' }) };
  }

  function appBar(title, onBack, backLabel) {
    var children = [];
    if (onBack) {
      children.push(
        h('button', { type: 'button', class: 'lp-iconbtn lp-back', 'aria-label': backLabel || 'Back', onclick: onBack }, icon(ICON.back))
      );
    }
    if (title) children.push(h('h1', { class: 'lp-appbar-title', tabindex: '-1', text: title }));
    return h('div', { class: 'lp-appbar' }, children);
  }

  function page(id, extraClass) {
    var node = h('div', { class: 'lp-page ' + (extraClass || ''), 'data-page': id, hidden: true });
    return node;
  }

  // -- Onboarding (lumen-app/lib/src/onboarding/onboarding_screen.dart) ---------
  var QUESTIONS = [
    { key: 'vision', text: 'onboardingQuestionVisionTitle', module: 'vision' },
    { key: 'hearing', text: 'onboardingQuestionHearingTitle', module: 'hearing' },
    { key: 'safety', text: 'onboardingQuestionSafetyTitle', module: 'safety' },
    { key: 'family', text: 'onboardingQuestionCaregiverTitle', module: 'family' },
    { key: 'complexity', text: 'onboardingQuestionComplexityTitle', module: null }
  ];

  builders.onboarding = function () {
    var root = page('onboarding', 'lp-onboarding');
    var stepLabel = h('span', { class: 'lp-ob-step' });
    var segments = QUESTIONS.map(function () { return h('span'); });
    var body = h('div', { class: 'lp-ob-body' });

    root.appendChild(
      h(
        'div',
        { class: 'lp-ob-head' },
        h('div', { class: 'lp-ob-top' }, logoMark(26, '#1a1815'), h('h1', { class: 'lp-ob-title', tabindex: '-1', text: S('onboardingTitle') }), stepLabel),
        h('div', { class: 'lp-progress', 'aria-hidden': 'true' }, segments)
      )
    );
    root.appendChild(body);

    function renderStep() {
      var q = QUESTIONS[state.step];
      stepLabel.textContent = state.step + 1 + ' / ' + QUESTIONS.length;
      segments.forEach(function (seg, i) { seg.className = i <= state.step ? 'on' : ''; });
      body.textContent = '';
      var mark = q.module
        ? badge(q.module, 96, 'lp-ob-badge')
        : h('span', { class: 'lp-badge lp-ob-badge', style: '--d:96px;--c:#f2b138', 'aria-hidden': 'true' });
      if (!q.module) mark.appendChild(logoMark(44, '#1a1815'));
      append(body, mark);
      append(body, h('p', { class: 'lp-question', text: S(q.text) }));

      var yes;
      var no;
      if (q.key === 'complexity') {
        yes = button(S('answerComplexitySimple'), { kind: 'primary', onClick: function () { answer(true); } });
        no = button(S('answerComplexityComplete'), { kind: 'plain', onClick: function () { answer(false); } });
      } else {
        yes = button(S('answerYes'), { kind: 'primary', onClick: function () { answer(true); } });
        no = button(S('answerNo'), { kind: 'plain', onClick: function () { answer(false); } });
      }
      append(body, h('span', { class: 'lp-ob-spacer', 'aria-hidden': 'true' }));
      append(body, [yes, no]);
      append(body, h('button', { type: 'button', class: 'lp-skip', onclick: skip, text: 'Skip' }));
    }

    function answer(value) {
      var q = QUESTIONS[state.step];
      if (q.key === 'complexity') state.answers.simple = value;
      else state.answers[q.key] = value;
      if (state.step === QUESTIONS.length - 1) finish();
      else {
        state.step += 1;
        renderStep();
      }
    }

    // OnboardingController.computeOutcome, ported as is.
    function finish() {
      var a = state.answers;
      state.mode = a.vision ? 'voice' : a.hearing ? 'visual' : a.simple ? 'simple' : 'complete';
      state.enabled = {};
      ['vision', 'hearing', 'safety', 'family'].forEach(function (id) {
        if (a[id]) state.enabled[id] = true;
      });
      applyTheme();
      replaceStack('home');
    }

    // Demo only: lets a visitor jump straight to the full module list.
    function skip() {
      state.mode = 'complete';
      state.enabled = {};
      data.modules.forEach(function (m) { state.enabled[m.id] = true; });
      applyTheme();
      replaceStack('home');
    }

    root.reset = function () {
      state.step = 0;
      state.answers = { vision: false, hearing: false, safety: false, family: false, simple: false };
      renderStep();
    };
    renderStep();
    return root;
  };

  // -- Home (lib/src/home/home_screen.dart) --------------------------------------
  builders.home = function () {
    var root = page('home', '');
    var count = h('span', { class: 'lp-count' });
    var list = h('div', { class: 'lp-home-list' });
    var body = h(
      'div',
      { class: 'lp-home-body' },
      h('h2', { class: 'lp-headline', text: S('homeHeadline') }),
      h('p', { class: 'lp-subtitle', text: S('homeSubtitle') }),
      h('div', { class: 'lp-section-label' }, h('span', { text: S('homeTitle') }), count),
      list
    );
    var top = h(
      'div',
      { class: 'lp-home-top' },
      logoMark(28, '#1a1815'),
      h('span', { class: 'lp-wordmark', text: S('appTitle') }),
      h('button', { type: 'button', class: 'lp-iconbtn', 'aria-label': S('settingsTitle'), onclick: function () { push('settings'); } }, icon(ICON.settings))
    );
    root.appendChild(h('div', { class: 'lp-scroll' }, top, body));

    root.refresh = function () {
      var enabled = data.modules.filter(function (m) { return state.enabled[m.id]; });
      count.textContent = String(enabled.length);
      list.classList.toggle('lp-single', state.mode === 'voice' || state.mode === 'simple');
      list.textContent = '';
      if (!enabled.length) {
        list.appendChild(h('p', { class: 'lp-empty', text: S('homeNoModules') }));
        return;
      }
      enabled.forEach(function (mod, i) {
        var card = h(
          'button',
          {
            type: 'button',
            class: 'lp-home-card',
            style: '--c:' + data.colors[mod.id] + ';animation-duration:' + (380 + 70 * i) + 'ms',
            'aria-label': S(mod.nameKey),
            onclick: function () { push('module:' + mod.id); }
          },
          h(
            'span',
            { class: 'lp-home-card-top', 'aria-hidden': 'true' },
            h('span', { html: '<svg viewBox="0 0 24 24">' + data.icons[mod.id] + '</svg>' }),
            icon(ICON.outward, 'lp-arrow')
          ),
          h('span', { class: 'lp-home-card-name', text: S(mod.nameKey) }),
          h('span', { class: 'lp-home-card-desc', text: S(mod.descriptionKey) })
        );
        list.appendChild(card);
      });
    };
    root.refresh();
    return root;
  };

  // -- Module screens (lib/src/modules/*_screen.dart) ----------------------------
  function modulePage(moduleId, cards) {
    var root = page('module:' + moduleId, 'lp-module');
    root.style.setProperty('--c', data.colors[moduleId]);
    var list = h('div', { class: 'lp-list' }, moduleHeader(moduleId), note(S(moduleId + 'Note')), cards);
    root.appendChild(appBar('', back, 'Back'));
    root.appendChild(h('div', { class: 'lp-scroll' }, list));
    root.onShow = function () {
      list.querySelectorAll('textarea').forEach(function (t) {
        var wrap = t.parentNode;
        if (wrap.grow) wrap.grow();
      });
    };
    return root;
  }

  var MODULE_PAGES = {};

  MODULE_PAGES.vision = function () {
    var expiry = field(S('visionExpiryHint'), {
      value: 'Da consumarsi preferibilmente entro il 25/12/2026',
      lines: 1,
      maxLines: 2
    });
    var expiryOut = output();
    var red = field(S('visionColorRed'), { value: '225', numeric: true });
    var green = field(S('visionColorGreen'), { value: '25', numeric: true });
    var blue = field(S('visionColorBlue'), { value: '15', numeric: true });
    var colorOut = output();
    var swatch = h('div', { class: 'lp-swatch', hidden: true });
    var contrastOut = output();

    var rgb = function () {
      var clamp = function (n) { return Math.max(0, Math.min(255, n)); };
      return { r: clamp(red.int()), g: clamp(green.int()), b: clamp(blue.int()) };
    };

    return [
      toolCard(
        S('visionExpiryTitle'),
        expiry.el,
        withGap(
          button(S('visionExpiryButton'), {
            onClick: function () {
              run(expiryOut, function () {
                return call('vision.expiry', { text: expiry.value }).then(function (r) {
                  expiryOut.setText(r.found ? fmt(S('visionExpiryFound'), { date: r.date }) : S('visionExpiryNotFound'));
                });
              });
            }
          }),
          12
        ),
        expiryOut
      ),
      toolCard(
        S('visionColorTitle'),
        h('div', { class: 'lp-fields-row' }, red.el, green.el, blue.el),
        withGap(
          button(S('visionColorButton'), {
            onClick: function () {
              var c = rgb();
              run(colorOut, function () {
                return call('vision.color', c).then(function (r) {
                  colorOut.setText(S('visionColorResultPrefix') + ' ' + r.name);
                  swatch.style.background = 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
                  swatch.hidden = false;
                });
              });
            }
          }),
          12
        ),
        colorOut,
        swatch
      ),
      toolCard(
        S('visionContrastTitle'),
        hint(S('visionContrastHint')),
        withGap(
          button(S('visionContrastButton'), {
            onClick: function () {
              run(contrastOut, function () {
                return call('vision.contrast', rgb()).then(function (r) {
                  contrastOut.setText(
                    fmt(S('visionContrastResult'), {
                      whiteRatio: r.whiteRatio,
                      whitePass: r.whitePass ? S('answerYes') : S('answerNo'),
                      blackRatio: r.blackRatio,
                      blackPass: r.blackPass ? S('answerYes') : S('answerNo')
                    })
                  );
                });
              });
            }
          }),
          12
        ),
        contrastOut
      )
    ];
  };

  MODULE_PAGES.hearing = function () {
    var transcript = field(S('hearingSummaryHint'), {
      value:
        'Il gatto dorme sul divano. Il cane corre in giardino con il gatto. Oggi piove molto a Milano. Il gatto e il cane giocano insieme in giardino.',
      lines: 2,
      maxLines: 4
    });
    var summaryOut = output();
    var captionOut = output();
    var alertOut = output();
    var label = 'smoke_alarm';

    return [
      toolCard(
        S('hearingSummaryTitle'),
        transcript.el,
        withGap(
          button(S('hearingSummaryButton'), {
            onClick: function () {
              run(summaryOut, function () {
                return call('hearing.summarize', { text: transcript.value }).then(function (r) {
                  summaryOut.setText(r.sentences.length ? r.sentences.join(' ') : S('hearingSummaryEmpty'));
                });
              });
            }
          }),
          12
        ),
        summaryOut
      ),
      toolCard(
        S('hearingCaptionTitle'),
        hint(S('hearingCaptionHint')),
        withGap(
          button(S('hearingCaptionButton'), {
            onClick: function () {
              run(captionOut, function () {
                return call('hearing.captions', { text: transcript.value }).then(function (r) {
                  captionOut.setText(r.lines.join('\n'));
                });
              });
            }
          }),
          12
        ),
        captionOut
      ),
      toolCard(
        S('hearingAlertTitle'),
        dropdown(
          ['doorbell', 'smoke_alarm', 'siren', 'baby_crying'].map(function (l) { return [l, l]; }),
          label,
          function (value) { label = value; },
          S('hearingAlertTitle')
        ),
        withGap(
          button(S('hearingAlertButton'), {
            onClick: function () {
              run(alertOut, function () {
                return call('hearing.alert', { label: label }).then(function (r) {
                  alertOut.setText(
                    fmt(S('hearingAlertResult'), {
                      pattern: r.pattern.join(', '),
                      flash: r.flash ? S('answerYes') : S('answerNo'),
                      severity: r.severity
                    })
                  );
                });
              });
            }
          }),
          12
        ),
        alertOut
      )
    ];
  };

  MODULE_PAGES.safety = function () {
    var message = field(S('safetyScamHint'), {
      value: 'Il tuo conto e bloccato. Invia subito il codice OTP per sbloccarlo.',
      lines: 1,
      maxLines: 3
    });
    var scamOut = output();
    var fallOut = output();
    var checkInOut = output();
    var sosOut = output(S('safetySosIdle'));
    var start = button(S('safetySosStartButton'), { onClick: startSos });
    var cancel = button(S('safetySosCancelButton'), { kind: 'tonal', onClick: cancelSos });
    cancel.disabled = true;
    var ticker = null;

    var sosLabel = function (stateName) {
      return {
        idle: S('safetySosIdle'),
        countdown: S('safetySosCountdown'),
        sent: S('safetySosSent'),
        cancelled: S('safetySosCancelled')
      }[stateName];
    };

    function setSosRunning(running) {
      start.disabled = running;
      cancel.disabled = !running;
    }

    // Mirrors the app's 200 ms ticker that refreshes the SOS state label while
    // the real SosController counts down its five second cancel window.
    function startSos() {
      setSosRunning(true);
      run(sosOut, function () {
        return call('safety.sosStart').then(function (r) {
          sosOut.setText(sosLabel(r.state));
          clearInterval(ticker);
          ticker = setInterval(function () {
            call('safety.sosState').then(function (s) {
              sosOut.setText(sosLabel(s.state));
              if (s.state !== 'countdown') {
                clearInterval(ticker);
                setSosRunning(false);
              }
            });
          }, 200);
        });
      });
    }

    function cancelSos() {
      run(sosOut, function () {
        return call('safety.sosCancel').then(function (r) {
          sosOut.setText(sosLabel(r.state));
          clearInterval(ticker);
          setSosRunning(false);
        });
      });
    }

    function fall(preset) {
      run(fallOut, function () {
        return call('safety.fall', { preset: preset }).then(function (r) {
          fallOut.setText(r.detected ? S('safetyFallDetected') : S('safetyFallNotDetected'));
        });
      });
    }

    function checkInStatus(tool) {
      run(checkInOut, function () {
        return call(tool).then(function (r) {
          checkInOut.setText(r.overdue ? S('safetyCheckInOverdue') : S('safetyCheckInOk'));
        });
      });
    }

    return [
      toolCard(
        S('safetyScamTitle'),
        message.el,
        withGap(
          button(S('safetyScamButton'), {
            onClick: function () {
              run(scamOut, function () {
                return call('safety.scam', { text: message.value }).then(function (r) {
                  scamOut.setText(r.reason);
                });
              });
            }
          }),
          12
        ),
        scamOut
      ),
      toolCard(
        S('safetyFallTitle'),
        row(
          button(S('safetyFallSteadyButton'), { kind: 'tonal', onClick: function () { fall('steady'); } }),
          button(S('safetyFallSimulateButton'), { kind: 'tonal', onClick: function () { fall('fall'); } })
        ),
        fallOut
      ),
      toolCard(
        S('safetyCheckInTitle'),
        hint(S('safetyCheckInHint')),
        withGap(
          row(
            button(S('safetyCheckInButton'), { onClick: function () { checkInStatus('safety.checkIn'); } }),
            button(S('safetyCheckInStatusButton'), { kind: 'tonal', onClick: function () { checkInStatus('safety.checkInStatus'); } })
          ),
          12
        ),
        checkInOut
      ),
      toolCard(S('safetySosTitle'), sosOut, withGap(row(start, cancel), 12))
    ];
  };

  MODULE_PAGES.family = function () {
    var pairingOut = output();
    var eventTitle = field(S('familyCalendarTitleHint'), { value: 'Doctor visit' });
    var eventMinutes = field(S('familyCalendarMinutesHint'), { value: '60', numeric: true });
    var events = h('div');
    var statusOut = output(S('familyStatusUnknownResult'));
    var notificationOut = output();

    var describe = function (value) {
      return {
        ok: S('familyStatusOkResult'),
        needsAttention: S('familyStatusAttentionResult'),
        unknown: S('familyStatusUnknownResult')
      }[value];
    };
    var setStatus = function (value) {
      run(statusOut, function () {
        return call('family.status', { value: value }).then(function (r) {
          statusOut.setText(describe(r.status));
        });
      });
    };

    return [
      toolCard(
        S('familyPairingTitle'),
        button(S('familyPairingButton'), {
          onClick: function () {
            run(pairingOut, function () {
              return call('family.pairing').then(function (r) {
                pairingOut.setText(fmt(S('familyPairingResult'), { code: r.code, minutes: r.minutes }));
              });
            });
          }
        }),
        pairingOut
      ),
      toolCard(
        S('familyCalendarTitle'),
        eventTitle.el,
        withGap(eventMinutes.el, 8),
        withGap(
          button(S('familyCalendarButton'), {
            onClick: function () {
              run(pairingOut, function () {
                return call('family.addEvent', { title: eventTitle.value, minutes: eventMinutes.int() }).then(function (r) {
                  events.textContent = '';
                  r.events.forEach(function (e) {
                    events.appendChild(h('p', { class: 'lp-text lp-text-row', text: e.title + ': ' + e.start }));
                  });
                });
              });
            }
          }),
          12
        ),
        events
      ),
      toolCard(
        S('familyStatusTitle'),
        statusOut,
        withGap(
          row(
            button(S('familyStatusOkButton'), { onClick: function () { setStatus('ok'); } }),
            button(S('familyStatusAttentionButton'), { kind: 'tonal', onClick: function () { setStatus('attention'); } })
          ),
          12
        )
      ),
      toolCard(
        S('familyNotificationTitle'),
        hint(S('familyNotificationHint')),
        withGap(
          button(S('familyNotificationButton'), {
            onClick: function () {
              run(notificationOut, function () {
                return call('family.notification').then(function (r) {
                  notificationOut.setText(r.text);
                });
              });
            }
          }),
          12
        ),
        notificationOut
      )
    ];
  };

  MODULE_PAGES.speech = function () {
    var cards = h('div', { style: 'display:contents' });
    var banner = h('div', { class: 'lp-phrase', hidden: true });
    var suggestions = h('div', { class: 'lp-wrap' });
    var suggestionsCard = toolCard(S('speechSuggestionsTitle'), suggestions);
    suggestionsCard.hidden = true;
    var sentenceChips = h('div', { class: 'lp-wrap' });
    var sentenceOut = output();
    var chosen = [];
    var build = button(S('speechSentenceBuildButton'), { onClick: buildSentence });
    var clear = button(S('speechSentenceClearButton'), { kind: 'tonal', onClick: clearSentence });
    build.disabled = true;
    clear.disabled = true;

    function syncSentence() {
      sentenceChips.textContent = '';
      chosen.forEach(function (p) { sentenceChips.appendChild(chip(p.text)); });
      build.disabled = clear.disabled = chosen.length === 0;
    }

    function selectPhrase(phrase) {
      banner.textContent = phrase.text;
      banner.hidden = false;
      chosen.push(phrase);
      syncSentence();
      call('speech.use', { id: phrase.id }).then(function (r) {
        suggestions.textContent = '';
        r.suggestions.forEach(function (s) { suggestions.appendChild(chip(s.text)); });
        suggestionsCard.hidden = r.suggestions.length === 0;
      });
    }

    function buildSentence() {
      run(sentenceOut, function () {
        return call('speech.sentence', {
          ids: chosen.map(function (p) { return p.id; })
        }).then(function (r) {
          sentenceOut.setText(r.text);
        });
      });
    }

    function clearSentence() {
      chosen = [];
      sentenceOut.setText(null);
      syncSentence();
    }

    var titles = {
      needs: S('speechCategoryNeeds'),
      greetings: S('speechCategoryGreetings'),
      emotions: S('speechCategoryEmotions'),
      emergency: S('speechCategoryEmergency')
    };

    call('speech.board').then(function (r) {
      ['needs', 'greetings', 'emotions', 'emergency'].forEach(function (category) {
        var wrap = h('div', { class: 'lp-wrap' });
        r.phrases
          .filter(function (p) { return p.category === category; })
          .forEach(function (p) {
            wrap.appendChild(chip(p.text, function () { selectPhrase(p); }));
          });
        cards.appendChild(toolCard(titles[category], wrap));
      });
    });

    return [
      banner,
      cards,
      suggestionsCard,
      toolCard(S('speechSentenceTitle'), hint(S('speechSentenceHint')), withGap(sentenceChips, 12), withGap(row(build, clear), 12), sentenceOut)
    ];
  };

  MODULE_PAGES.reading = function () {
    var word = field(S('readingSyllableHint'), { value: 'patria' });
    var syllableOut = output();
    var flashOut = output();
    var deck = { repetitionCount: 0, intervalDays: 1, easinessFactor: 2.5 };
    var text = field(S('readingTimeHint'), {
      value:
        'The cat sleeps on the sofa. The dog runs in the garden with the cat. It is raining heavily today. The cat and the dog play together in the garden.',
      lines: 2,
      maxLines: 4
    });
    var timeOut = output();

    var qualities = h('div', { class: 'lp-stack' });
    [0, 1, 2, 3, 4, 5].forEach(function (quality) {
      qualities.appendChild(
        button(String(quality), {
          kind: 'tonal',
          onClick: function () {
            run(flashOut, function () {
              return call('reading.review', {
                quality: quality,
                repetitionCount: deck.repetitionCount,
                intervalDays: deck.intervalDays,
                easinessFactor: deck.easinessFactor
              }).then(function (r) {
                deck.repetitionCount = r.repetitionCount;
                deck.intervalDays = r.intervalDays;
                deck.easinessFactor = r.easinessFactor;
                flashOut.setText(
                  fmt(S('readingFlashcardResult'), { days: r.intervalDays, ease: r.easeLabel, streak: r.repetitionCount })
                );
              });
            });
          }
        })
      );
    });

    return [
      toolCard(
        S('readingSyllableTitle'),
        word.el,
        withGap(
          button(S('readingSyllableButton'), {
            onClick: function () {
              run(syllableOut, function () {
                return call('reading.split', { text: word.value }).then(function (r) {
                  syllableOut.setText(r.text);
                });
              });
            }
          }),
          12
        ),
        syllableOut
      ),
      toolCard(
        S('readingFlashcardTitle'),
        h('div', { class: 'lp-flashcard', text: S('readingFlashcardPrompt') }),
        hint(S('readingFlashcardQualityHint')),
        withGap(qualities, 8),
        flashOut
      ),
      toolCard(
        S('readingTimeTitle'),
        text.el,
        withGap(
          button(S('readingTimeButton'), {
            onClick: function () {
              run(timeOut, function () {
                return call('reading.time', { text: text.value }).then(function (r) {
                  timeOut.setText(fmt(S('readingTimeResult'), { minutes: r.minutes }));
                });
              });
            }
          }),
          12
        ),
        timeOut
      )
    ];
  };

  MODULE_PAGES.memory = function () {
    var name = field(S('memoryPersonNameHint'), { value: 'Maria' });
    var relationship = field(S('memoryPersonRelationshipHint'), { value: 'daughter' });
    var consent = false;
    var personOut = output();
    var people = h('div');
    var reminderTitle = field(S('memoryReminderTitleHint'), { value: 'Take medicine' });
    var reminderMinutes = field(S('memoryReminderMinutesHint'), { value: '0', numeric: true });
    var reminderOut = output();
    var steps = [
      ['medication', S('memoryRoutineStepMedication')],
      ['lockDoor', S('memoryRoutineStepLockDoor')]
    ];
    var routineOut = output(fmt(S('memoryRoutineRemaining'), { steps: steps.map(function (s) { return s[1]; }).join(', ') }));

    var renderPeople = function (list) {
      people.textContent = '';
      list.forEach(function (p) {
        people.appendChild(
          h('p', {
            class: 'lp-text lp-text-row',
            text: p.name + ' (' + p.relationship + '): ' + (p.consentGiven ? S('memoryConsentGiven') : S('memoryConsentNotGiven'))
          })
        );
      });
    };

    var showDue = function (due) {
      reminderOut.setText(due.length ? fmt(S('memoryReminderDue'), { titles: due.join(', ') }) : S('memoryReminderNoneDue'));
    };

    var routine = function (step, done) {
      call('memory.routine', { step: step, done: done }).then(function (r) {
        routineOut.setText(
          r.complete
            ? S('memoryRoutineComplete')
            : fmt(S('memoryRoutineRemaining'), {
                steps: steps
                  .filter(function (s) { return r.remaining.indexOf(s[0]) !== -1; })
                  .map(function (s) { return s[1]; })
                  .join(', ')
              })
        );
      });
    };

    return [
      toolCard(
        S('memoryPersonTitle'),
        name.el,
        withGap(relationship.el, 8),
        checkTile(S('memoryPersonConsent'), false, function (checked) { consent = checked; }),
        button(S('memoryPersonButton'), {
          onClick: function () {
            run(personOut, function () {
              return call('memory.addPerson', { name: name.value, relationship: relationship.value, consent: consent }).then(function (r) {
                personOut.setText(r.ok ? S('memoryPersonAdded') : r.message);
                renderPeople(r.people);
              });
            });
          }
        }),
        personOut,
        people
      ),
      toolCard(
        S('memoryReminderTitle'),
        reminderTitle.el,
        withGap(reminderMinutes.el, 8),
        withGap(
          row(
            button(S('memoryReminderAddButton'), {
              onClick: function () {
                run(reminderOut, function () {
                  return call('memory.addReminder', { title: reminderTitle.value, minutes: reminderMinutes.int() }).then(function (r) {
                    showDue(r.due);
                  });
                });
              }
            }),
            button(S('memoryReminderCheckButton'), {
              kind: 'tonal',
              onClick: function () {
                run(reminderOut, function () {
                  return call('memory.dueReminders').then(function (r) { showDue(r.due); });
                });
              }
            })
          ),
          12
        ),
        reminderOut
      ),
      toolCard(
        S('memoryRoutineTitle'),
        hint(S('memoryRoutineHint')),
        steps.map(function (s) {
          return checkTile(s[1], false, function (checked) { routine(s[0], checked); });
        }),
        routineOut
      )
    ];
  };

  MODULE_PAGES.mobility = function () {
    var gaitOut = output();
    var aid = 'none';
    var verbosity = 'standard';
    var notes = field(S('mobilityProfileNotesHint'), { value: '' });
    var profileOut = output();
    var minutes = field(S('mobilityBreaksMinutesHint'), { value: '40', numeric: true });
    var breaksOut = output();

    var gait = function (preset) {
      run(gaitOut, function () {
        return call('mobility.gait', { preset: preset }).then(function (r) {
          gaitOut.setText(
            fmt(S('mobilityGaitResult'), {
              steps: r.steps,
              cadence: r.cadence,
              irregular: r.irregular ? S('mobilityGaitIrregular') : S('mobilityGaitSteady')
            })
          );
        });
      });
    };

    return [
      toolCard(
        S('mobilityGaitTitle'),
        row(
          button(S('mobilityGaitSteadyButton'), { kind: 'tonal', onClick: function () { gait('steady'); } }),
          button(S('mobilityGaitUnsteadyButton'), { kind: 'tonal', onClick: function () { gait('unsteady'); } })
        ),
        gaitOut
      ),
      toolCard(
        S('mobilityProfileTitle'),
        dropdown(
          [
            ['none', S('mobilityAidNone')],
            ['cane', S('mobilityAidCane')],
            ['wheelchair', S('mobilityAidWheelchair')],
            ['walker', S('mobilityAidWalker')],
            ['other', S('mobilityAidOther')]
          ],
          aid,
          function (v) { aid = v; },
          S('mobilityProfileTitle')
        ),
        withGap(
          dropdown(
            [
              ['minimal', S('mobilityVerbosityMinimal')],
              ['standard', S('mobilityVerbosityStandard')],
              ['detailed', S('mobilityVerbosityDetailed')]
            ],
            verbosity,
            function (v) { verbosity = v; },
            S('mobilityBreaksTitle')
          ),
          8
        ),
        withGap(notes.el, 8),
        withGap(
          button(S('mobilityProfileButton'), {
            onClick: function () {
              run(profileOut, function () {
                return call('mobility.profile', { aid: aid, verbosity: verbosity, notes: notes.value }).then(function (r) {
                  profileOut.setText(r.ok ? S('mobilityProfileSaved') : r.message);
                });
              });
            }
          }),
          12
        ),
        profileOut
      ),
      toolCard(
        S('mobilityBreaksTitle'),
        hint(S('mobilityBreaksHint')),
        withGap(minutes.el, 8),
        withGap(
          button(S('mobilityBreaksButton'), {
            onClick: function () {
              run(breaksOut, function () {
                return call('mobility.breaks', { minutes: minutes.int(), verbosity: verbosity }).then(function (r) {
                  breaksOut.setText(
                    r.minutes.length ? fmt(S('mobilityBreaksResult'), { minutes: r.minutes.join(', ') }) : S('mobilityBreaksNone')
                  );
                });
              });
            }
          }),
          12
        ),
        breaksOut
      )
    ];
  };

  // -- Settings (lib/src/settings/settings_screen.dart) ----------------------------
  var MODES = [
    ['voice', S('uiModeVoiceFirstHighContrast')],
    ['visual', S('uiModeVisualWithVibration')],
    ['simple', S('uiModeSimple')],
    ['complete', S('uiModeComplete')]
  ];

  builders.settings = function () {
    var root = page('settings', '');
    var modeLabel = h('p', { class: 'lp-tile-sub' });
    var scaleOut = h('output', { text: '1.00' });
    var dev = h('div');

    var modeTile = h(
      'div',
      { class: 'lp-tile' },
      h('p', { class: 'lp-tile-title', text: S('settingsUiMode') }),
      withGap(
        dropdown(MODES, state.mode, function (value) {
          state.mode = value;
          modeLabel.textContent = labelOfMode();
          applyTheme();
        }, S('settingsUiMode')),
        10
      )
    );
    modeLabel.textContent = labelOfMode();
    root.modeSelect = modeTile.querySelector('select');

    var slider = h('input', {
      type: 'range',
      min: '1',
      max: '2',
      step: '0.25',
      value: '1',
      'aria-label': S('settingsTextScale')
    });
    slider.addEventListener('input', function () {
      state.textScale = parseFloat(slider.value);
      scaleOut.textContent = state.textScale.toFixed(2);
      sliderTrack.style.setProperty('--pct', ((state.textScale - 1) * 100) + '%');
      applyTheme();
    });
    var sliderTrack = h('div', { class: 'lp-slider' }, slider, scaleOut);
    var scaleTile = h(
      'div',
      { class: 'lp-tile' },
      h('p', { class: 'lp-tile-title', text: S('settingsTextScale') }),
      sliderTrack
    );
    root.slider = slider;
    root.sliderTrack = sliderTrack;
    root.scaleOut = scaleOut;

    var modules = h('div');
    data.modules.forEach(function (mod) {
      var color = data.colors[mod.id];
      var enabled = h('input', { type: 'checkbox', class: 'lp-switch', role: 'switch', 'aria-label': S(mod.nameKey) });
      enabled.checked = !!state.enabled[mod.id];
      enabled.addEventListener('change', function () {
        if (enabled.checked) state.enabled[mod.id] = true;
        else delete state.enabled[mod.id];
        if (pages.home && pages.home.refresh) pages.home.refresh();
      });
      enabled.dataset.module = mod.id;
      var consent = h('input', { type: 'checkbox', class: 'lp-switch', role: 'switch', 'aria-label': S('settingsModuleConsent') + ': ' + S(mod.nameKey) });
      consent.checked = !!state.consent[mod.id];
      consent.addEventListener('change', function () { state.consent[mod.id] = consent.checked; });
      modules.appendChild(
        h(
          'div',
          { class: 'lp-set-module', style: '--c:' + color + ';--sw:' + color },
          h(
            'label',
            { class: 'lp-switch-tile' },
            badge(mod.id, 44),
            h('span', { class: 'lp-tile-text' }, h('span', { class: 'lp-tile-title', text: S(mod.nameKey) }), h('p', { class: 'lp-tile-sub', text: S(mod.descriptionKey) })),
            enabled
          ),
          h('label', { class: 'lp-switch-tile' }, h('span', { class: 'lp-tile-text lp-tile-title', text: S('settingsModuleConsent') }), consent)
        )
      );
    });

    var devSwitch = h('input', { type: 'checkbox', class: 'lp-switch', role: 'switch', 'aria-label': S('settingsDeveloperModeToggle') });
    devSwitch.addEventListener('change', function () {
      state.devMode = devSwitch.checked;
      dev.hidden = !state.devMode;
    });
    dev.hidden = true;
    dev.appendChild(
      h('button', { type: 'button', class: 'lp-nav-tile', onclick: function () { push('diagnostics'); } }, h('span', { text: S('diagnosticsTitle') }), icon(ICON.chevron))
    );

    var list = h(
      'div',
      { class: 'lp-list', style: 'gap:0' },
      h('div', { class: 'lp-set-label', text: S('settingsSectionAppearance') }),
      h('div', { class: 'lp-set-card' }, modeTile, scaleTile),
      h('div', { class: 'lp-set-label lp-spaced', text: S('settingsSectionModules') }),
      modules,
      h(
        'div',
        { class: 'lp-disclaimer' },
        icon(ICON.warning),
        h('div', {}, h('h3', { text: S('settingsDisclaimerTitle') }), h('p', { text: S('settingsDisclaimerBody') }))
      ),
      h('div', { class: 'lp-set-label lp-spaced', text: S('settingsDeveloperSection') }),
      h(
        'label',
        { class: 'lp-switch-tile', style: 'padding-left:4px;padding-right:4px' },
        h('span', { class: 'lp-tile-text lp-tile-title', text: S('settingsDeveloperModeToggle') }),
        devSwitch
      ),
      dev
    );

    root.appendChild(appBar(S('settingsTitle'), back, 'Back'));
    root.appendChild(h('div', { class: 'lp-scroll' }, list));
    root.onShow = function () {
      root.querySelectorAll('input[data-module]').forEach(function (input) {
        input.checked = !!state.enabled[input.dataset.module];
      });
      root.modeSelect.value = state.mode;
      modeLabel.textContent = labelOfMode();
    };
    return root;
  };

  function labelOfMode() {
    return MODES.filter(function (m) { return m[0] === state.mode; })[0][1];
  }

  // -- Diagnostics (lib/src/diagnostics/diagnostics_screen.dart) ---------------------
  builders.diagnostics = function () {
    var root = page('diagnostics', '', false);
    root.appendChild(appBar(S('diagnosticsTitle'), back, 'Back'));
    root.appendChild(
      h(
        'div',
        { class: 'lp-scroll' },
        h(
          'div',
          { class: 'lp-list', style: 'gap:0' },
          h('p', { class: 'lp-text', style: 'padding:24px 0;text-align:center;font-size:var(--fs-body-l);letter-spacing:.5px', text: S('diagnosticsNoPlugins') }),
          h('div', { class: 'lp-divider', style: 'margin:8px 0 12px' }),
          h('div', { class: 'lp-diag-row' }, h('span', { text: S('diagnosticsBatteryLabel') }), h('span', { text: S('diagnosticsNotAvailable') })),
          h('div', { class: 'lp-diag-row' }, h('span', { text: S('diagnosticsLatencyLabel') }), h('span', { text: S('diagnosticsNotAvailable') }))
        )
      )
    );
    return root;
  };

  // ---- Theme: UiMode and text scale (lib/src/theme/app_theme.dart) --------------------
  function applyTheme() {
    var base = { voice: 1.3, simple: 1.15, visual: 1, complete: 1 }[state.mode];
    screen.style.setProperty('--ts', String(base * state.textScale));
    var single = state.mode === 'voice' || state.mode === 'simple';
    var homeList = screen.querySelector('.lp-home-list');
    if (homeList) homeList.classList.toggle('lp-single', single);
    fitDevice();
  }

  // ---- Navigation --------------------------------------------------------------------
  function getPage(id) {
    if (!pages[id]) {
      var key = id.indexOf('module:') === 0 ? 'module' : id;
      var node;
      if (key === 'module') {
        var moduleId = id.slice(7);
        node = modulePage(moduleId, MODULE_PAGES[moduleId]());
      } else {
        node = builders[id]();
      }
      pages[id] = node;
      screen.appendChild(node);
    }
    return pages[id];
  }

  function show(id) {
    var node = getPage(id);
    Object.keys(pages).forEach(function (key) {
      pages[key].hidden = key !== id;
    });
    if (node.refresh) node.refresh();
    if (node.onShow) node.onShow();
    node.classList.remove('lp-enter');
    void node.offsetWidth;
    node.classList.add('lp-enter');
    var scroller = node.querySelector('.lp-scroll');
    if (scroller) scroller.scrollTop = 0;
    var focusTarget = node.querySelector('.lp-back') || node.querySelector('[tabindex="-1"]');
    if (focusTarget && document.activeElement !== document.body) focusTarget.focus({ preventScroll: true });
  }

  function push(id) {
    state.stack.push(id);
    show(id);
  }

  function back() {
    if (state.stack.length <= 1) return;
    state.stack.pop();
    show(state.stack[state.stack.length - 1]);
  }

  function replaceStack(id) {
    state.stack = [id];
    show(id);
  }

  screen.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && state.stack.length > 1) {
      event.preventDefault();
      back();
    }
  });

  // ---- Responsive scaling ----------------------------------------------------------------
  var stage = document.getElementById('lumen-demo-stage');
  var device = document.getElementById('lumen-demo-device');
  var DEVICE_WIDTH = 414;
  var DEVICE_HEIGHT = 824;

  function fitDevice() {
    if (!stage || !device) return;
    var available = stage.parentElement.clientWidth || window.innerWidth;
    var compact = available < 440;
    device.classList.toggle('lp-compact', compact);
    var width = compact ? 390 : DEVICE_WIDTH;
    var height = compact ? 800 : DEVICE_HEIGHT;
    var scale = Math.min(1, available / width);
    device.style.transform = scale < 1 ? 'scale(' + scale + ')' : '';
    stage.style.height = Math.round(height * scale) + 'px';
  }

  window.addEventListener('resize', fitDevice);

  // ---- Start -------------------------------------------------------------------------------
  var restart = document.getElementById('lumen-demo-restart');
  if (restart) {
    restart.addEventListener('click', function () {
      state.enabled = {};
      state.mode = 'complete';
      state.textScale = 1;
      state.devMode = false;
      applyTheme();
      if (pages.onboarding && pages.onboarding.reset) pages.onboarding.reset();
      if (pages.settings) {
        pages.settings.slider.value = '1';
        pages.settings.scaleOut.textContent = '1.00';
        pages.settings.sliderTrack.style.setProperty('--pct', '0%');
      }
      replaceStack('onboarding');
    });
  }

  applyTheme();
  replaceStack('onboarding');
  fitDevice();
})();
