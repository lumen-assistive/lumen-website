// Icon Studio: draw a Lumen plugin icon on the 24 by 24 grid, check it against
// the plugin asset spec, preview it exactly as the app shows it, and export it.
// Plain DOM code with no framework; the rules come from src/lib/pluginSpec.ts,
// the same module the build uses to check the icons fetched from lumen-plugins.
import {
  INK,
  PAPER,
  OFFICIAL_COLORS,
  SPEC,
  deltaE76,
  parseHex,
  validateColor,
  validateSvgText,
  type Rule,
} from '../lib/pluginSpec';

type Pt = [number, number];
type Shape =
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { type: 'polyline' | 'polygon'; points: Pt[] }
  | { type: 'circle'; cx: number; cy: number; r: number }
  | { type: 'ellipse'; cx: number; cy: number; rx: number; ry: number }
  | { type: 'rect'; x: number; y: number; w: number; h: number; rx: number }
  | { type: 'path'; d: string };

interface Official {
  name: string;
  color: string;
  inner: string;
}

interface Saved {
  shapes: Shape[];
  name: string;
  id: string;
  idTouched: boolean;
  desc: string;
  color: string;
  snap: number;
}

const STORAGE_KEY = 'lumen-icon-studio-v1';
const SVG_NS = 'http://www.w3.org/2000/svg';
const ROOT_ATTRS = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => document.getElementById(id) as T;

function init(): void {
  const root = document.getElementById('studio-root');
  if (!root) return;

  const official = JSON.parse($('studio-official').textContent || '{}') as Record<string, Official>;
  const canvas = document.getElementById('st-canvas') as unknown as SVGSVGElement;

  const state = {
    shapes: [] as Shape[],
    selected: -1,
    tool: 'line',
    snap: 1,
    name: '',
    id: '',
    idTouched: false,
    desc: '',
    color: '',
    draft: null as null | { tool: string; pts: Pt[]; cur: Pt; dragging: boolean },
    cursor: [12, 12] as Pt,
    ignoreUp: false,
    undo: [] as string[],
    redo: [] as string[],
  };

  // ------------------------------------------------------------ persistence
  function load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<Saved>;
      if (Array.isArray(saved.shapes)) state.shapes = saved.shapes;
      if (typeof saved.name === 'string') state.name = saved.name;
      if (typeof saved.id === 'string') state.id = saved.id;
      state.idTouched = !!saved.idTouched;
      if (typeof saved.desc === 'string') state.desc = saved.desc;
      if (typeof saved.color === 'string') state.color = saved.color;
      if (typeof saved.snap === 'number') state.snap = saved.snap;
    } catch {
      /* storage unavailable or corrupt: start empty */
    }
  }
  let saveTimer = 0;
  function save(): void {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      try {
        const data: Saved = {
          shapes: state.shapes,
          name: state.name,
          id: state.id,
          idTouched: state.idTouched,
          desc: state.desc,
          color: state.color,
          snap: state.snap,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        /* ignore */
      }
    }, 150);
  }

  // ------------------------------------------------------------ geometry utils
  const round2 = (n: number): number => Math.round(n * 100) / 100;
  const fmt = (n: number): string => String(round2(n));
  const clamp = (n: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, n));
  const snapTo = (n: number): number => Math.round(n / state.snap) * state.snap;

  function shapeToMarkup(s: Shape): string {
    switch (s.type) {
      case 'line':
        return `<line x1="${fmt(s.x1)}" y1="${fmt(s.y1)}" x2="${fmt(s.x2)}" y2="${fmt(s.y2)}"/>`;
      case 'polyline':
      case 'polygon':
        return `<${s.type} points="${s.points.map((p) => `${fmt(p[0])},${fmt(p[1])}`).join(' ')}"/>`;
      case 'circle':
        return `<circle cx="${fmt(s.cx)}" cy="${fmt(s.cy)}" r="${fmt(s.r)}"/>`;
      case 'ellipse':
        return `<ellipse cx="${fmt(s.cx)}" cy="${fmt(s.cy)}" rx="${fmt(s.rx)}" ry="${fmt(s.ry)}"/>`;
      case 'rect':
        return `<rect x="${fmt(s.x)}" y="${fmt(s.y)}" width="${fmt(s.w)}" height="${fmt(s.h)}"${s.rx > 0 ? ` rx="${fmt(s.rx)}"` : ''}/>`;
      case 'path':
        return `<path d="${s.d}"/>`;
    }
  }

  const innerMarkup = (): string => state.shapes.map(shapeToMarkup).join('');
  const svgText = (): string => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${ROOT_ATTRS}>${innerMarkup()}</svg>\n`;
  const shapeLabel = (s: Shape): string =>
    ({ line: 'Line', polyline: 'Polyline', polygon: 'Polygon', circle: 'Circle', ellipse: 'Ellipse', rect: 'Rectangle', path: 'Path' })[s.type];

  function moveShape(s: Shape, dx: number, dy: number): void {
    switch (s.type) {
      case 'line': s.x1 += dx; s.x2 += dx; s.y1 += dy; s.y2 += dy; break;
      case 'polyline':
      case 'polygon': s.points = s.points.map((p) => [p[0] + dx, p[1] + dy] as Pt); break;
      case 'circle':
      case 'ellipse': s.cx += dx; s.cy += dy; break;
      case 'rect': s.x += dx; s.y += dy; break;
      case 'path': s.d = s.d.replace(/^(\s*[Mm])\s*([-\d.eE+]+)[\s,]+([-\d.eE+]+)/, (_m, c, x, y) => `${c}${fmt(parseFloat(x) + dx)} ${fmt(parseFloat(y) + dy)}`); break;
    }
  }

  // ------------------------------------------------------------ history
  function snapshot(): string { return JSON.stringify(state.shapes); }
  function pushHistory(): void {
    state.undo.push(snapshot());
    if (state.undo.length > 100) state.undo.shift();
    state.redo = [];
  }
  function undo(): void {
    const prev = state.undo.pop();
    if (prev === undefined) return;
    state.redo.push(snapshot());
    state.shapes = JSON.parse(prev);
    state.selected = Math.min(state.selected, state.shapes.length - 1);
    cancelDraft();
    renderAll();
  }
  function redo(): void {
    const next = state.redo.pop();
    if (next === undefined) return;
    state.undo.push(snapshot());
    state.shapes = JSON.parse(next);
    state.selected = Math.min(state.selected, state.shapes.length - 1);
    renderAll();
  }
  function mutate(fn: () => void): void {
    pushHistory();
    fn();
    renderAll();
  }

  // ------------------------------------------------------------ canvas rendering
  const el = (name: string, attrs: Record<string, string | number> = {}): SVGElement => {
    const node = document.createElementNS(SVG_NS, name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
    return node as SVGElement;
  };

  function renderCanvas(): void {
    canvas.replaceChildren();
    // grid
    const grid = el('g', { 'aria-hidden': 'true' });
    for (let i = 0; i <= 24; i++) {
      const major = i % 4 === 0;
      grid.append(
        el('line', { x1: i, y1: 0, x2: i, y2: 24, stroke: major ? '#cfc6b0' : '#e6dfcd', 'stroke-width': major ? 0.07 : 0.04 }),
        el('line', { x1: 0, y1: i, x2: 24, y2: i, stroke: major ? '#cfc6b0' : '#e6dfcd', 'stroke-width': major ? 0.07 : 0.04 }),
      );
    }
    grid.append(el('rect', { x: 0, y: 0, width: 24, height: 24, fill: 'none', stroke: '#1a1815', 'stroke-width': 0.08 }));
    grid.append(el('rect', { x: 1, y: 1, width: 22, height: 22, fill: 'none', stroke: '#c98a1c', 'stroke-width': 0.08, 'stroke-dasharray': '0.4 0.3' }));
    canvas.append(grid);

    // drawing
    const art = el('g', { fill: 'none', stroke: INK, 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    state.shapes.forEach((s) => {
      const holder = document.createElementNS(SVG_NS, 'g');
      holder.innerHTML = shapeToMarkup(s);
      art.append(...Array.from(holder.childNodes));
    });
    canvas.append(art);

    // hit areas and selection
    state.shapes.forEach((s, i) => {
      const holder = document.createElementNS(SVG_NS, 'g');
      holder.setAttribute('data-shape-index', String(i));
      holder.setAttribute('fill', i === state.selected ? 'rgba(242,177,56,0.18)' : 'none');
      holder.setAttribute('stroke', i === state.selected ? '#c98a1c' : 'transparent');
      holder.setAttribute('stroke-width', i === state.selected ? '2.4' : '3');
      holder.setAttribute('stroke-linecap', 'round');
      holder.setAttribute('stroke-linejoin', 'round');
      holder.setAttribute('stroke-opacity', i === state.selected ? '0.45' : '1');
      holder.setAttribute('pointer-events', state.tool === 'select' ? 'all' : 'none');
      holder.innerHTML = shapeToMarkup(s);
      canvas.append(holder);
    });

    // draft
    if (state.draft) renderDraft();

    // cursor
    const c = state.draft ? state.draft.cur : state.cursor;
    canvas.append(
      el('line', { x1: c[0] - 0.7, y1: c[1], x2: c[0] + 0.7, y2: c[1], stroke: '#c98a1c', 'stroke-width': 0.12, 'aria-hidden': 'true' }),
      el('line', { x1: c[0], y1: c[1] - 0.7, x2: c[0], y2: c[1] + 0.7, stroke: '#c98a1c', 'stroke-width': 0.12, 'aria-hidden': 'true' }),
    );
    $('st-coords').textContent = `x ${fmt(c[0])} y ${fmt(c[1])}`;
    // The grid, the cursor cross and the draft are decoration: they must never
    // swallow the clicks meant for the shapes underneath.
    canvas.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.setAttribute('pointer-events', 'none'));
    canvas.querySelectorAll('circle:not([data-shape-index] circle)').forEach((n) => { if (!n.closest('[data-shape-index]')) n.setAttribute('pointer-events', 'none'); });
  }

  function draftShape(): Shape | null {
    const d = state.draft;
    if (!d) return null;
    const a = d.pts[0];
    const b = d.cur;
    switch (d.tool) {
      case 'line': return { type: 'line', x1: a[0], y1: a[1], x2: b[0], y2: b[1] };
      case 'circle': return { type: 'circle', cx: a[0], cy: a[1], r: Math.hypot(b[0] - a[0], b[1] - a[1]) };
      case 'ellipse': return { type: 'ellipse', cx: a[0], cy: a[1], rx: Math.abs(b[0] - a[0]), ry: Math.abs(b[1] - a[1]) };
      case 'rect': return { type: 'rect', x: Math.min(a[0], b[0]), y: Math.min(a[1], b[1]), w: Math.abs(b[0] - a[0]), h: Math.abs(b[1] - a[1]), rx: 0 };
      default: return null;
    }
  }

  function renderDraft(): void {
    const d = state.draft!;
    const g = el('g', { fill: 'none', stroke: '#c98a1c', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '0.1 2.2', 'aria-hidden': 'true' });
    if (d.tool === 'polyline' || d.tool === 'polygon') {
      const pts = [...d.pts, d.cur];
      g.innerHTML = `<polyline points="${pts.map((p) => `${fmt(p[0])},${fmt(p[1])}`).join(' ')}"/>`;
      canvas.append(g);
      d.pts.forEach((p, i) => canvas.append(el('circle', { cx: p[0], cy: p[1], r: i === 0 ? 0.55 : 0.35, fill: i === 0 ? '#c98a1c' : '#1a1815' })));
      return;
    }
    const s = draftShape();
    if (s) {
      g.innerHTML = shapeToMarkup(s);
      canvas.append(g);
    }
    canvas.append(el('circle', { cx: d.pts[0][0], cy: d.pts[0][1], r: 0.4, fill: '#c98a1c' }));
  }

  // ------------------------------------------------------------ drawing logic
  function say(msg: string): void { $('st-hint').textContent = msg; }

  const TOOL_HINTS: Record<string, string> = {
    select: 'Select tool: click a shape to select it, then use the arrow keys to move it.',
    line: 'Line: click the start, then click or release at the end.',
    polyline: 'Polyline: click each point. Press F or choose Finish shape when done.',
    polygon: 'Polygon: click each point. Click the first point again, press F, or choose Finish shape to close it.',
    circle: 'Circle: click the center, then a point on the edge.',
    ellipse: 'Ellipse: click the center, then a corner of its bounding box.',
    rect: 'Rectangle: click one corner, then the opposite corner.',
  };

  function setTool(tool: string): void {
    cancelDraft();
    state.tool = tool;
    document.querySelectorAll<HTMLButtonElement>('[data-tool]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tool === tool)));
    say(TOOL_HINTS[tool]);
    renderCanvas();
  }

  function cancelDraft(): void {
    state.draft = null;
    ($('st-drawbar') as HTMLElement).hidden = true;
  }

  function commitShape(s: Shape): void {
    pushHistory();
    state.shapes.push(s);
    state.selected = state.shapes.length - 1;
    cancelDraft();
    renderAll();
    say(`${shapeLabel(s)} added.`);
  }

  function finishPoly(): void {
    const d = state.draft;
    if (!d || (d.tool !== 'polyline' && d.tool !== 'polygon')) return;
    const pts = d.pts.filter((p, i) => i === 0 || p[0] !== d.pts[i - 1][0] || p[1] !== d.pts[i - 1][1]);
    const min = d.tool === 'polygon' ? 3 : 2;
    if (pts.length < min) {
      say(`A ${d.tool} needs at least ${min} points.`);
      return;
    }
    commitShape({ type: d.tool as 'polyline' | 'polygon', points: pts });
  }

  function place(p: Pt): void {
    const tool = state.tool;
    if (tool === 'select') return;
    if (tool === 'polyline' || tool === 'polygon') {
      if (!state.draft) state.draft = { tool, pts: [], cur: p, dragging: false };
      const d = state.draft;
      if (tool === 'polygon' && d.pts.length >= 3 && Math.hypot(p[0] - d.pts[0][0], p[1] - d.pts[0][1]) < 0.6) {
        finishPoly();
        return;
      }
      const last = d.pts[d.pts.length - 1];
      if (!last || last[0] !== p[0] || last[1] !== p[1]) d.pts.push(p);
      d.cur = p;
      ($('st-drawbar') as HTMLElement).hidden = false;
      say(`${d.pts.length} point${d.pts.length === 1 ? '' : 's'} placed.`);
      renderCanvas();
      return;
    }
    if (!state.draft) {
      state.draft = { tool, pts: [p], cur: p, dragging: true };
      ($('st-drawbar') as HTMLElement).hidden = false;
      say('Now place the second point.');
      renderCanvas();
      return;
    }
    state.draft.cur = p;
    const s = draftShape();
    if (!s) return;
    const ok =
      (s.type === 'line' && Math.hypot(s.x2 - s.x1, s.y2 - s.y1) >= 0.5) ||
      (s.type === 'circle' && s.r >= 0.5) ||
      (s.type === 'ellipse' && s.rx >= 0.25 && s.ry >= 0.25 && (s.rx >= 0.5 || s.ry >= 0.5)) ||
      (s.type === 'rect' && s.w >= 0.5 && s.h >= 0.5);
    if (!ok) {
      say('That shape is too small. Place the second point further away.');
      return;
    }
    commitShape(s);
  }

  function eventPoint(e: PointerEvent): Pt {
    const ctm = canvas.getScreenCTM();
    if (!ctm) return state.cursor;
    const pt = canvas.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(ctm.inverse());
    return [clamp(snapTo(p.x), 1, 23), clamp(snapTo(p.y), 1, 23)];
  }

  canvas.addEventListener('pointerdown', (e) => {
    canvas.focus({ preventScroll: true });
    if (state.tool === 'select') {
      const hit = (e.target as Element).closest('[data-shape-index]');
      state.selected = hit ? Number(hit.getAttribute('data-shape-index')) : -1;
      renderAll();
      return;
    }
    e.preventDefault();
    const p = eventPoint(e);
    state.cursor = p;
    const hadDraft = !!state.draft;
    place(p);
    state.ignoreUp = hadDraft;
    if (!hadDraft && state.draft && state.draft.tool !== 'polyline' && state.draft.tool !== 'polygon') {
      try { canvas.setPointerCapture(e.pointerId); } catch { /* not supported */ }
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = eventPoint(e);
    state.cursor = p;
    if (state.draft) state.draft.cur = p;
    renderCanvas();
  });
  canvas.addEventListener('pointerup', (e) => {
    const d = state.draft;
    if (state.ignoreUp) { state.ignoreUp = false; return; }
    if (!d || !d.dragging || d.tool === 'polyline' || d.tool === 'polygon') return;
    const p = eventPoint(e);
    const moved = Math.hypot(p[0] - d.pts[0][0], p[1] - d.pts[0][1]);
    d.dragging = false;
    if (moved >= 0.5) place(p);
  });
  canvas.addEventListener('dblclick', () => {
    if (state.draft && (state.draft.tool === 'polyline' || state.draft.tool === 'polygon')) finishPoly();
  });

  canvas.addEventListener('keydown', (e) => {
    const step = state.snap;
    const arrows: Record<string, Pt> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (arrows[e.key]) {
      e.preventDefault();
      const [dx, dy] = arrows[e.key];
      if (state.tool === 'select' && state.selected >= 0) {
        pushHistory();
        moveShape(state.shapes[state.selected], dx, dy);
        renderAll();
        return;
      }
      state.cursor = [clamp(round2(state.cursor[0] + dx), 1, 23), clamp(round2(state.cursor[1] + dy), 1, 23)];
      if (state.draft) state.draft.cur = state.cursor;
      renderCanvas();
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (state.tool === 'select') return;
      place([state.cursor[0], state.cursor[1]]);
      return;
    }
    if (e.key === 'Escape') { cancelDraft(); renderCanvas(); say('Cancelled.'); return; }
    if (e.key === 'Backspace') { e.preventDefault(); removeLastPoint(); return; }
    if (e.key === 'Delete') { e.preventDefault(); deleteSelected(); return; }
  });

  document.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement;
    const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT');
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !typing) {
      e.preventDefault();
      if (e.shiftKey) redo(); else undo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y' && !typing) { e.preventDefault(); redo(); return; }
    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
    if (t !== canvas && t.tagName === 'BUTTON' && e.key !== 'f') return;
    const keyTools: Record<string, string> = { v: 'select', l: 'line', p: 'polyline', g: 'polygon', c: 'circle', e: 'ellipse', r: 'rect' };
    const k = e.key.toLowerCase();
    if (keyTools[k]) { setTool(keyTools[k]); return; }
    if (k === 'f') finishPoly();
  });

  function removeLastPoint(): void {
    const d = state.draft;
    if (!d) return;
    if (d.tool === 'polyline' || d.tool === 'polygon') {
      d.pts.pop();
      if (!d.pts.length) { cancelDraft(); say('No points left.'); }
      renderCanvas();
    } else {
      cancelDraft();
      renderCanvas();
    }
  }

  function deleteSelected(): void {
    if (state.selected < 0 || state.selected >= state.shapes.length) return;
    const i = state.selected;
    mutate(() => {
      state.shapes.splice(i, 1);
      state.selected = Math.min(i, state.shapes.length - 1);
    });
    say('Shape removed.');
  }

  // ------------------------------------------------------------ shape list
  function renderShapes(): void {
    const list = $('st-shapes');
    list.replaceChildren();
    $('st-shapes-empty').hidden = state.shapes.length > 0;
    state.shapes.forEach((s, i) => {
      const li = document.createElement('li');
      const pick = document.createElement('button');
      pick.type = 'button';
      pick.className = 'st-shape-btn';
      pick.textContent = `${i + 1}. ${shapeLabel(s)}`;
      pick.setAttribute('aria-current', String(i === state.selected));
      pick.addEventListener('click', () => { state.selected = i; renderAll(); });
      const icons: Record<string, string> = {
        up: 'M12 19V5M6 11l6-6 6 6',
        down: 'M12 5v14M6 13l6 6 6-6',
        del: 'M6 6l12 12M18 6L6 18',
      };
      const mk = (label: string, icon: string, disabled: boolean, fn: () => void): HTMLButtonElement => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'st-mini';
        b.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[icon]}"/></svg>`;
        b.setAttribute('aria-label', `${label} shape ${i + 1}`);
        b.title = label;
        b.disabled = disabled;
        b.addEventListener('click', fn);
        return b;
      };
      li.append(
        pick,
        mk('Move up', 'up', i === 0, () => mutate(() => { [state.shapes[i - 1], state.shapes[i]] = [state.shapes[i], state.shapes[i - 1]]; state.selected = i - 1; })),
        mk('Move down', 'down', i === state.shapes.length - 1, () => mutate(() => { [state.shapes[i + 1], state.shapes[i]] = [state.shapes[i], state.shapes[i + 1]]; state.selected = i + 1; })),
        mk('Delete', 'del', false, () => { state.selected = i; deleteSelected(); }),
      );
      list.append(li);
    });
    const rectEdit = $('st-rect-edit') as HTMLElement;
    const sel = state.shapes[state.selected];
    rectEdit.hidden = !(sel && sel.type === 'rect');
    if (sel && sel.type === 'rect') ($('st-rect-rx') as HTMLInputElement).value = String(sel.rx);
    ($('st-undo') as HTMLButtonElement).disabled = state.undo.length === 0;
    ($('st-redo') as HTMLButtonElement).disabled = state.redo.length === 0;
    ($('st-clear') as HTMLButtonElement).disabled = state.shapes.length === 0;
  }

  $('st-rect-rx').addEventListener('change', (e) => {
    const sel = state.shapes[state.selected];
    if (!sel || sel.type !== 'rect') return;
    const v = clamp(parseFloat((e.target as HTMLInputElement).value) || 0, 0, Math.min(sel.w, sel.h) / 2);
    mutate(() => { sel.rx = v; });
  });

  // ------------------------------------------------------------ plugin fields, colors
  const slug = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32);

  function renderSwatches(): void {
    const box = $('st-swatches');
    box.replaceChildren();
    for (const [id, hex] of Object.entries(OFFICIAL_COLORS)) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'st-swatch';
      b.style.background = hex;
      const own = state.id === id;
      b.textContent = official[id]?.name ?? id;
      b.dataset.taken = String(!own);
      b.setAttribute('aria-pressed', String(state.color.toUpperCase() === hex));
      b.title = own ? `${b.textContent} (this plugin's official color)` : `${b.textContent} ${hex}: already used by an official plugin`;
      b.addEventListener('click', () => { state.color = hex; renderAll(); save(); });
      box.append(b);
    }
  }

  function suggestColor(): string {
    const taken = [PAPER, ...Object.entries(OFFICIAL_COLORS).filter(([id]) => id !== state.id).map(([, c]) => c)];
    const ink = parseHex(INK)!;
    const hsl = (h: number, s: number, l: number): string => {
      const a = s * Math.min(l, 1 - l);
      const f = (n: number): number => {
        const k = (n + h / 30) % 12;
        return l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
      };
      return '#' + [f(0), f(8), f(4)].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
    };
    let best = '';
    let bestScore = -1;
    for (let h = 0; h < 360; h += 4) {
      for (const l of [0.72, 0.78, 0.66]) {
        const hex = hsl(h, 0.85, l);
        const rgb = parseHex(hex)!;
        const contrast = (luminanceOf(rgb) + 0.05) / (luminanceOf(ink) + 0.05);
        if (contrast < SPEC.minContrast + 0.3) continue;
        const nearest = Math.min(...taken.map((t) => deltaE76(rgb, parseHex(t)!)));
        if (nearest >= SPEC.minDeltaE + 4 && nearest > bestScore) { bestScore = nearest; best = hex; }
      }
    }
    return best || '#8EE0D0';
  }
  const luminanceOf = (rgb: [number, number, number]): number => {
    const ch = (v: number): number => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
    return 0.2126 * ch(rgb[0]) + 0.7152 * ch(rgb[1]) + 0.0722 * ch(rgb[2]);
  };

  function bindField(id: string, onInput: (v: string) => void): void {
    $<HTMLInputElement>(id).addEventListener('input', (e) => { onInput((e.target as HTMLInputElement).value); renderAll(false); save(); });
  }
  bindField('st-name', (v) => {
    state.name = v;
    if (!state.idTouched) { state.id = slug(v); ($('st-id') as HTMLInputElement).value = state.id; }
  });
  bindField('st-id', (v) => { state.id = v; state.idTouched = v !== ''; });
  bindField('st-desc', (v) => { state.desc = v; });
  bindField('st-hex', (v) => {
    state.color = v.startsWith('#') ? v.toUpperCase() : `#${v.toUpperCase()}`;
  });
  $('st-picker').addEventListener('input', (e) => { state.color = (e.target as HTMLInputElement).value.toUpperCase(); renderAll(); save(); });
  $('st-suggest').addEventListener('click', () => { state.color = suggestColor(); renderAll(); save(); say(`Suggested ${state.color}.`); });
  $<HTMLSelectElement>('st-snap').addEventListener('change', (e) => { state.snap = parseFloat((e.target as HTMLSelectElement).value); save(); });

  // ------------------------------------------------------------ validation
  function allRules(): Rule[] {
    const rules: Rule[] = [];
    const idOk = /^[a-z][a-z0-9-]{1,31}$/.test(state.id);
    rules.push({ id: 'name', label: 'The plugin has a name', ok: state.name.trim().length > 0, detail: state.name.trim() || 'Type a name' });
    rules.push({ id: 'id', label: 'The id is lowercase letters, digits and hyphens, starting with a letter', ok: idOk, detail: state.id || 'Type an id' });
    rules.push(...validateSvgText(svgText()));
    rules.push(...validateColor(state.color, state.id));
    return rules;
  }

  function renderRules(rules: Rule[]): void {
    const ul = $('st-rules');
    ul.replaceChildren();
    for (const r of rules) {
      const li = document.createElement('li');
      li.className = r.ok ? 'ok' : 'fail';
      const mark = document.createElement('span');
      mark.className = 'st-mark';
      mark.textContent = r.ok ? 'OK' : 'Fix';
      const text = document.createElement('span');
      text.innerHTML = `<span class="sr-only">${r.ok ? 'Pass: ' : 'Fail: '}</span>`;
      text.append(document.createTextNode(r.label));
      const detail = document.createElement('span');
      detail.className = 'st-detail';
      detail.textContent = r.detail;
      text.append(detail);
      li.append(mark, text);
      ul.append(li);
    }
    const failing = rules.filter((r) => !r.ok).length;
    $('st-rule-count').textContent = failing === 0 ? 'All rules pass' : `${failing} to fix`;
  }

  // ------------------------------------------------------------ previews
  function iconHtml(size: number): string {
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${innerMarkup()}</svg>`;
  }
  function renderPreview(): void {
    const color = /^#[0-9A-Fa-f]{6}$/.test(state.color) ? state.color : '#CCCCCC';
    const badge = (px: number): string =>
      `<div><span class="pv-badge" style="width:${px}px;height:${px}px;border-radius:${px * 0.3}px;background:${color}">${iconHtml(Math.round(px * 0.5))}</span><div class="pv-cap">${px}px</div></div>`;
    const name = state.name.trim() || 'Your plugin';
    const desc = state.desc.trim() || 'Describe what your plugin does.';
    const ghost = (id: string): string => {
      const o = official[id];
      return `<div class="pv-tile is-ghost" style="background:${o.color}"><div class="pv-tile-top"><svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">${o.inner}</svg></div><p class="pv-tile-name">${o.name}</p></div>`;
    };
    const arrow = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>';
    const esc = (s: string): string => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
    $('st-preview').innerHTML = `
      <div class="pv-row">${badge(24)}${badge(48)}${badge(96)}</div>
      <div class="pv-phone"><div class="pv-grid">
        <div class="pv-tile" style="background:${color}"><div class="pv-tile-top">${iconHtml(36)}${arrow}</div><p class="pv-tile-name">${esc(name)}</p><p class="pv-tile-desc">${esc(desc)}</p></div>
        ${ghost('vision')}${ghost('hearing')}${ghost('safety')}
      </div></div>`;
  }

  // ------------------------------------------------------------ export
  let rulesOk = false;
  function setExportEnabled(ok: boolean): void {
    rulesOk = ok;
    ['st-copy', 'st-dl-png', 'st-dl-svg', 'st-dl-json'].forEach((id) => $(id).setAttribute('aria-disabled', String(!ok)));
    $('st-export-note').textContent = ok
      ? 'Every rule passes. Download the files, then copy the preview image for your pull request.'
      : 'Export is locked until every check passes. Fix the items marked with an exclamation mark.';
  }

  function download(name: string, blob: Blob): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const pluginJson = (): string => JSON.stringify({ id: state.id, name: state.name.trim(), color: state.color.toUpperCase(), icon: 'icon.svg' }, null, 2) + '\n';

  function svgImage(size: number): Promise<HTMLImageElement> {
    const markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${innerMarkup()}</svg>`;
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('icon render failed'));
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markup);
    });
  }

  function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  async function renderPng(): Promise<Blob> {
    try { await document.fonts.load('700 40px "Atkinson Hyperlegible"'); await document.fonts.load('400 24px "Atkinson Hyperlegible"'); } catch { /* fall back to system font */ }
    const W = 1200;
    const H = 640;
    const canvasEl = document.createElement('canvas');
    canvasEl.width = W;
    canvasEl.height = H;
    const ctx = canvasEl.getContext('2d')!;
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, W, H);
    const font = '"Atkinson Hyperlegible", system-ui, sans-serif';

    // tile
    const tx = 60, ty = 60, tw = 420, th = 460;
    ctx.fillStyle = state.color;
    rr(ctx, tx, ty, tw, th, 56);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = INK;
    ctx.stroke();
    ctx.drawImage(await svgImage(112), tx + 44, ty + 44, 112, 112);
    // arrow top right
    ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(tx + tw - 90, ty + 100); ctx.lineTo(tx + tw - 44, ty + 54);
    ctx.moveTo(tx + tw - 90, ty + 54); ctx.lineTo(tx + tw - 44, ty + 54); ctx.lineTo(tx + tw - 44, ty + 100);
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.textBaseline = 'alphabetic';
    ctx.font = `700 54px ${font}`;
    const name = state.name.trim() || 'Your plugin';
    let line = name;
    while (ctx.measureText(line).width > tw - 88 && line.length > 3) line = line.slice(0, -2);
    if (line !== name) line = line.trimEnd() + '…';
    ctx.fillText(line, tx + 44, ty + 280);
    ctx.font = `400 28px ${font}`;
    const words = (state.desc.trim() || 'Describe what your plugin does.').split(/\s+/);
    let row = '';
    let y = ty + 330;
    for (const w of words) {
      const test = row ? `${row} ${w}` : w;
      if (ctx.measureText(test).width > tw - 88 && row) { ctx.fillText(row, tx + 44, y); y += 36; row = w; if (y > ty + th - 30) break; } else row = test;
    }
    if (y <= ty + th - 30) ctx.fillText(row, tx + 44, y);

    // badges
    let bx = 560;
    const by = 80;
    for (const px of [48, 96, 160]) {
      ctx.fillStyle = state.color;
      rr(ctx, bx, by + (160 - px), px, px, px * 0.3);
      ctx.fill();
      ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke();
      const icon = await svgImage(Math.round(px * 0.5));
      ctx.drawImage(icon, bx + px * 0.25, by + (160 - px) + px * 0.25, px * 0.5, px * 0.5);
      ctx.fillStyle = '#5B554A';
      ctx.font = `400 22px ${font}`;
      ctx.fillText(`${px}px`, bx, by + 160 + 34);
      bx += px + 56;
    }
    // facts
    ctx.fillStyle = INK;
    ctx.font = `700 30px ${font}`;
    ctx.fillText(`${name}`, 560, 380);
    ctx.font = `400 26px ${font}`;
    ctx.fillStyle = '#5B554A';
    ctx.fillText(`id: ${state.id}`, 560, 424);
    ctx.fillText(`color: ${state.color.toUpperCase()}`, 560, 462);
    const rgb = parseHex(state.color);
    if (rgb) {
      const l1 = luminanceOf(parseHex(INK)!);
      const l2 = luminanceOf(rgb);
      ctx.fillText(`ink on color contrast: ${((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2)}:1`, 560, 500);
    }
    ctx.fillText('Drawn in the Lumen Icon Studio', 560, 560);
    return new Promise((resolve, reject) => canvasEl.toBlob((b) => (b ? resolve(b) : reject(new Error('png failed'))), 'image/png'));
  }

  function statusMsg(msg: string): void { $('st-status').textContent = msg; }

  function guard(): boolean {
    if (rulesOk) return true;
    statusMsg('Fix the failing checks first. Export is locked until every rule passes.');
    return false;
  }

  $('st-dl-svg').addEventListener('click', () => { if (guard()) { download('icon.svg', new Blob([svgText()], { type: 'image/svg+xml' })); statusMsg('Downloaded icon.svg.'); } });
  $('st-dl-json').addEventListener('click', () => { if (guard()) { download('plugin.json', new Blob([pluginJson()], { type: 'application/json' })); statusMsg('Downloaded plugin.json.'); } });
  $('st-dl-png').addEventListener('click', async () => {
    if (!guard()) return;
    try { download('preview.png', await renderPng()); statusMsg('Downloaded preview.png.'); } catch { statusMsg('Could not render the preview image.'); }
  });
  $('st-copy').addEventListener('click', async () => {
    if (!guard()) return;
    let blob: Blob;
    try { blob = await renderPng(); } catch { statusMsg('Could not render the preview image.'); return; }
    const fallback = $('st-fallback') as HTMLElement;
    try {
      if (!navigator.clipboard || typeof ClipboardItem === 'undefined') throw new Error('unsupported');
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      fallback.hidden = true;
      statusMsg('Preview image copied. Paste it into the pull request description.');
    } catch {
      ($('st-fallback-img') as HTMLImageElement).src = URL.createObjectURL(blob);
      fallback.hidden = false;
      statusMsg('Copying is not available here. Copy the picture below by hand, or use Download preview.png.');
    }
  });
  $('st-copy-code').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(svgText()); statusMsg('SVG code copied.'); } catch { statusMsg('Select the code and copy it by hand.'); }
  });

  // ------------------------------------------------------------ import
  const num = (v: string | null, fallback = 0): number => { const n = parseFloat(v ?? ''); return Number.isFinite(n) ? n : fallback; };

  function importSvg(text: string): void {
    const report = $('st-import-report') as HTMLElement;
    const problems: string[] = [];
    const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    const svg = doc.documentElement;
    if (!svg || svg.nodeName.toLowerCase() !== 'svg' || doc.querySelector('parsererror')) {
      report.hidden = false;
      report.innerHTML = '<strong>That is not valid SVG.</strong> Nothing was imported.';
      return;
    }
    for (const r of validateSvgText(text)) if (!r.ok) problems.push(`${r.label}: ${r.detail}`);
    const shapes: Shape[] = [];
    const skipped = new Set<string>();
    const walk = (node: Element): void => {
      for (const child of Array.from(node.children)) {
        const n = child.localName.toLowerCase();
        const a = (k: string): string | null => child.getAttribute(k);
        if (child.hasAttribute('transform')) problems.push(`A transform on <${n}> was dropped, so its position may differ`);
        switch (n) {
          case 'g': walk(child); break;
          case 'line': shapes.push({ type: 'line', x1: num(a('x1')), y1: num(a('y1')), x2: num(a('x2')), y2: num(a('y2')) }); break;
          case 'polyline':
          case 'polygon': {
            const nums = (a('points') ?? '').trim().split(/[\s,]+/).map(parseFloat).filter((v) => Number.isFinite(v));
            const pts: Pt[] = [];
            for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
            if (pts.length >= 2) shapes.push({ type: n, points: pts }); else skipped.add(n);
            break;
          }
          case 'circle': shapes.push({ type: 'circle', cx: num(a('cx')), cy: num(a('cy')), r: num(a('r')) }); break;
          case 'ellipse': shapes.push({ type: 'ellipse', cx: num(a('cx')), cy: num(a('cy')), rx: num(a('rx')), ry: num(a('ry')) }); break;
          case 'rect': shapes.push({ type: 'rect', x: num(a('x')), y: num(a('y')), w: num(a('width')), h: num(a('height')), rx: num(a('rx')) }); break;
          case 'path': shapes.push({ type: 'path', d: (a('d') ?? '').replace(/"/g, '') }); break;
          default: skipped.add(n);
        }
      }
    };
    walk(svg);
    if (skipped.size) problems.push(`Ignored elements: ${[...skipped].map((s) => `<${s}>`).join(', ')}`);
    pushHistory();
    state.shapes = shapes.slice(0, 40);
    state.selected = -1;
    cancelDraft();
    renderAll();
    save();
    report.hidden = false;
    report.innerHTML = `<strong>Imported ${shapes.length} shape${shapes.length === 1 ? '' : 's'}.</strong> The studio rewrites the file to the spec.` +
      (problems.length ? '<ul>' + [...new Set(problems)].map((p) => `<li>${p.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]!)}</li>`).join('') + '</ul>' : '<p>The file already followed every icon rule.</p>');
  }

  $<HTMLSelectElement>('st-example').addEventListener('change', (e) => {
    const id = (e.target as HTMLSelectElement).value;
    if (!id) return;
    importSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${ROOT_ATTRS}>${official[id].inner}</svg>`);
    (e.target as HTMLSelectElement).value = '';
  });
  $('st-import-btn').addEventListener('click', () => importSvg(($('st-import-text') as HTMLTextAreaElement).value));
  $('st-import-file').addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    importSvg(await file.text());
  });

  // ------------------------------------------------------------ toolbar wiring
  document.querySelectorAll<HTMLButtonElement>('[data-tool]').forEach((b) => b.addEventListener('click', () => setTool(b.dataset.tool!)));
  $('st-undo').addEventListener('click', undo);
  $('st-redo').addEventListener('click', redo);
  $('st-clear').addEventListener('click', () => { if (state.shapes.length) mutate(() => { state.shapes = []; state.selected = -1; }); say('All shapes removed.'); });
  $('st-finish').addEventListener('click', finishPoly);
  $('st-back').addEventListener('click', removeLastPoint);
  $('st-cancel').addEventListener('click', () => { cancelDraft(); renderCanvas(); say('Cancelled.'); });

  // ------------------------------------------------------------ main render
  function renderAll(fullFields = true): void {
    renderCanvas();
    renderShapes();
    const rules = allRules();
    renderRules(rules);
    renderPreview();
    setExportEnabled(rules.every((r) => r.ok));
    $('st-code').textContent = svgText();
    if (fullFields) {
      const set = (id: string, v: string): void => { const i = $<HTMLInputElement>(id); if (document.activeElement !== i) i.value = v; };
      set('st-name', state.name);
      set('st-id', state.id);
      set('st-desc', state.desc);
      set('st-hex', state.color);
      const hex = /^#[0-9A-Fa-f]{6}$/.test(state.color) ? state.color.toLowerCase() : '#000000';
      ($('st-picker') as HTMLInputElement).value = hex;
    }
    renderSwatches();
    save();
  }

  load();
  if (!/^#[0-9A-Fa-f]{6}$/.test(state.color)) state.color = suggestColor();
  $<HTMLSelectElement>('st-snap').value = String(state.snap);
  renderAll();
  setTool('line');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
