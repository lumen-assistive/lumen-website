// The plugin asset specification, in one place: used at build time to check
// the icons and colors fetched from lumen-plugins, and in the browser by the
// Icon Studio, so the page and the repository can never disagree about what
// a valid plugin icon is. The same rules are enforced by the validator that
// runs on every pull request to lumen-plugins.

export const INK = '#1A1815';
export const PAPER = '#F3EEE3';
export const CARD = '#FFFCF5';

export const OFFICIAL_COLORS: Record<string, string> = {
  vision: '#5CC8E0',
  hearing: '#B9A2FF',
  safety: '#FF8FA3',
  family: '#FF9FCB',
  speech: '#FFA860',
  reading: '#7ADB98',
  memory: '#9FA9FF',
  mobility: '#F2C94E',
};

export const OFFICIAL_NAMES: Record<string, string> = {
  vision: 'Vision',
  hearing: 'Hearing',
  safety: 'Safety',
  family: 'Family',
  speech: 'Speech',
  reading: 'Read and Study',
  memory: 'Remember',
  mobility: 'Mobility',
};

export const SPEC = {
  viewBox: '0 0 24 24',
  strokeWidth: '1.6',
  minCoord: 1,
  maxCoord: 23,
  maxBytes: 2048,
  minShapes: 1,
  maxShapes: 12,
  minContrast: 7,
  minDeltaE: 10,
  allowedElements: ['svg', 'g', 'path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon'],
  rootAttributes: {
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  } as Record<string, string>,
};

export interface Rule {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
}

// ---------------------------------------------------------------- color math

export function parseHex(hex: string): [number, number, number] | null {
  const m = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/.exec(hex.trim());
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function channel(v: number): number {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function luminance(rgb: [number, number, number]): number {
  return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
}

export function contrastRatio(a: [number, number, number], b: [number, number, number]): number {
  const la = luminance(a);
  const lb = luminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

export function toLab(rgb: [number, number, number]): [number, number, number] {
  const r = channel(rgb[0]);
  const g = channel(rgb[1]);
  const b = channel(rgb[2]);
  const x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047;
  const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  const z = (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / 1.08883;
  const f = (t: number) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

/** CIE76 color difference. */
export function deltaE76(a: [number, number, number], b: [number, number, number]): number {
  const la = toLab(a);
  const lb = toLab(b);
  return Math.hypot(la[0] - lb[0], la[1] - lb[1], la[2] - lb[2]);
}

/**
 * Checks a plugin color against the spec. `selfId` is the id of the plugin
 * the color is for: an official module may of course keep its own color, so
 * that one entry is skipped in the distinctness check.
 */
export function validateColor(hex: string, selfId = ''): Rule[] {
  const rules: Rule[] = [];
  const formatOk = /^#[0-9A-F]{6}$/.test(hex);
  rules.push({
    id: 'color-format',
    label: 'Color is written as uppercase #RRGGBB',
    ok: formatOk,
    detail: formatOk ? hex : `"${hex}" is not uppercase #RRGGBB`,
  });
  const rgb = parseHex(hex);
  if (!rgb) {
    rules.push({ id: 'color-contrast', label: 'Ink on the color has contrast of at least 7:1', ok: false, detail: 'Needs a valid color first.' });
    rules.push({ id: 'color-distinct', label: 'Color is distinct from the other module colors and the paper', ok: false, detail: 'Needs a valid color first.' });
    return rules;
  }
  const ink = parseHex(INK)!;
  const ratio = contrastRatio(ink, rgb);
  rules.push({
    id: 'color-contrast',
    label: 'Ink on the color has contrast of at least 7:1',
    ok: ratio >= SPEC.minContrast,
    detail: `${ratio.toFixed(2)}:1`,
  });
  let nearestName = 'paper';
  let nearest = deltaE76(rgb, parseHex(PAPER)!);
  for (const [id, other] of Object.entries(OFFICIAL_COLORS)) {
    if (id === selfId) continue;
    const d = deltaE76(rgb, parseHex(other)!);
    if (d < nearest) {
      nearest = d;
      nearestName = OFFICIAL_NAMES[id];
    }
  }
  rules.push({
    id: 'color-distinct',
    label: 'Color is distinct from the other module colors and the paper (delta E of at least 10)',
    ok: nearest >= SPEC.minDeltaE,
    detail: `Closest is ${nearestName}, delta E ${nearest.toFixed(1)}`,
  });
  return rules;
}

// ------------------------------------------------------------------ svg text

interface Tag {
  name: string;
  attrs: Record<string, string>;
  selfClosing: boolean;
  closing: boolean;
}

function parseTags(svg: string): Tag[] {
  const tags: Tag[] = [];
  const re = /<\s*(\/?)\s*([A-Za-z][\w:-]*)([^>]*?)(\/?)\s*>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(svg))) {
    const attrs: Record<string, string> = {};
    const attrRe = /([A-Za-z_:][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let a: RegExpExecArray | null;
    while ((a = attrRe.exec(m[3]))) attrs[a[1]] = a[2] ?? a[3] ?? '';
    tags.push({ name: m[2].toLowerCase(), attrs, selfClosing: m[4] === '/', closing: m[1] === '/' });
  }
  return tags;
}

function num(v: string | undefined, fallback = 0): number {
  if (v === undefined) return fallback;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
}

interface Bounds {
  min: number;
  max: number;
}

function pathNumbers(d: string): Bounds | null {
  // Walks the path commands tracking the current point so relative commands
  // are checked in absolute terms. Arcs are approximated by their end points
  // and curves by their control points, which is conservative for curves.
  const tokens = d.match(/[AaCcHhLlMmQqSsTtVvZz]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g);
  if (!tokens) return null;
  let min = Infinity;
  let max = -Infinity;
  const push = (v: number) => {
    min = Math.min(min, v);
    max = Math.max(max, v);
  };
  let i = 0;
  let cmd = '';
  let cx = 0;
  let cy = 0;
  let sx = 0;
  let sy = 0;
  const take = (): number => parseFloat(tokens[i++]);
  const counts: Record<string, number> = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7, z: 0 };
  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) cmd = tokens[i++];
    const lower = cmd.toLowerCase();
    const rel = cmd === lower;
    if (!(lower in counts)) return null;
    if (lower === 'z') {
      cx = sx;
      cy = sy;
      continue;
    }
    if (i + counts[lower] > tokens.length) return null;
    const args: number[] = [];
    for (let k = 0; k < counts[lower]; k++) args.push(take());
    if (args.some((v) => Number.isNaN(v))) return null;
    const ox = rel ? cx : 0;
    const oy = rel ? cy : 0;
    switch (lower) {
      case 'm':
      case 'l':
      case 't':
        cx = ox + args[0];
        cy = oy + args[1];
        push(cx);
        push(cy);
        if (lower === 'm') {
          sx = cx;
          sy = cy;
          cmd = rel ? 'l' : 'L';
        }
        break;
      case 'h':
        cx = ox + args[0];
        push(cx);
        break;
      case 'v':
        cy = oy + args[0];
        push(cy);
        break;
      case 'c':
        push(ox + args[0]); push(oy + args[1]); push(ox + args[2]); push(oy + args[3]);
        cx = ox + args[4]; cy = oy + args[5]; push(cx); push(cy);
        break;
      case 's':
      case 'q':
        push(ox + args[0]); push(oy + args[1]);
        cx = ox + args[2]; cy = oy + args[3]; push(cx); push(cy);
        break;
      case 'a':
        cx = ox + args[5]; cy = oy + args[6]; push(cx); push(cy);
        break;
    }
  }
  return min === Infinity ? null : { min, max };
}

function shapeBounds(tag: Tag): Bounds | null | 'invalid' {
  const a = tag.attrs;
  const vals: number[] = [];
  switch (tag.name) {
    case 'line':
      vals.push(num(a.x1), num(a.y1), num(a.x2), num(a.y2));
      break;
    case 'circle': {
      const cx = num(a.cx);
      const cy = num(a.cy);
      const r = num(a.r);
      vals.push(cx - r, cx + r, cy - r, cy + r);
      break;
    }
    case 'ellipse': {
      const cx = num(a.cx);
      const cy = num(a.cy);
      const rx = num(a.rx);
      const ry = num(a.ry);
      vals.push(cx - rx, cx + rx, cy - ry, cy + ry);
      break;
    }
    case 'rect': {
      const x = num(a.x);
      const y = num(a.y);
      vals.push(x, y, x + num(a.width), y + num(a.height));
      break;
    }
    case 'polyline':
    case 'polygon': {
      const nums = (a.points ?? '').trim().split(/[\s,]+/).filter(Boolean).map(parseFloat);
      if (nums.length < 4 || nums.length % 2 !== 0) return 'invalid';
      vals.push(...nums);
      break;
    }
    case 'path': {
      const b = pathNumbers(a.d ?? '');
      return b ?? 'invalid';
    }
    default:
      return null;
  }
  if (vals.some((v) => Number.isNaN(v))) return 'invalid';
  return { min: Math.min(...vals), max: Math.max(...vals) };
}

const SHAPE_NAMES = ['path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon'];
const FORBIDDEN_ATTRS = /^(id|transform|style|href|xlink:href|class|filter|mask|clip-path|opacity|fill|stroke|stroke-width|stroke-linecap|stroke-linejoin|fill-opacity|stroke-opacity)$/;

/** Checks an icon.svg text against every icon rule of the spec. */
export function validateSvgText(svg: string): Rule[] {
  const rules: Rule[] = [];
  const tags = parseTags(svg).filter((t) => !t.closing);
  const root = tags.find((t) => t.name === 'svg');
  const bytes = new TextEncoder().encode(svg).length;

  rules.push({
    id: 'viewbox',
    label: 'The root is an svg with viewBox="0 0 24 24"',
    ok: !!root && (root.attrs.viewBox ?? '').trim().replace(/\s+/g, ' ') === SPEC.viewBox,
    detail: root ? `viewBox="${root.attrs.viewBox ?? ''}"` : 'No svg element found',
  });

  const badElements = [...new Set(tags.map((t) => t.name).filter((n) => !SPEC.allowedElements.includes(n)))];
  const hasScriptish = /<\s*(script|style|image|use|foreignObject)\b/i.test(svg) || /<\s*!/.test(svg);
  rules.push({
    id: 'elements',
    label: 'Only svg, g, path, circle, ellipse, rect, line, polyline and polygon elements',
    ok: badElements.length === 0 && !hasScriptish,
    detail: badElements.length ? `Not allowed: ${badElements.join(', ')}` : 'All elements allowed',
  });

  const rootProblems: string[] = [];
  if (root) {
    for (const [k, v] of Object.entries(SPEC.rootAttributes)) {
      if (root.attrs[k] !== v) rootProblems.push(`${k}="${v}" is required`);
    }
  }
  rules.push({
    id: 'root-style',
    label: 'fill="none", stroke="currentColor", stroke-width="1.6", round caps and joins on the root',
    ok: !!root && rootProblems.length === 0,
    detail: rootProblems.length ? rootProblems.join('; ') : 'Present',
  });

  const forbidden: string[] = [];
  for (const t of tags) {
    for (const k of Object.keys(t.attrs)) {
      if (/^on/i.test(k)) forbidden.push(`${t.name}@${k}`);
      else if (t.name !== 'svg' && FORBIDDEN_ATTRS.test(k)) forbidden.push(`${t.name}@${k}`);
      else if (t.name === 'svg' && /^(id|transform|style|href|xlink:href)$/.test(k)) forbidden.push(`${t.name}@${k}`);
    }
    for (const [k, v] of Object.entries(t.attrs)) {
      if (k === 'xmlns' || k.startsWith('xmlns:')) continue;
      if (/^\s*(https?:|data:|javascript:)/i.test(v)) forbidden.push(`${t.name} external reference`);
    }
  }
  rules.push({
    id: 'attributes',
    label: 'No ids, transforms, styles, links, event attributes, or per-shape fill and stroke overrides',
    ok: forbidden.length === 0,
    detail: forbidden.length ? `Found: ${[...new Set(forbidden)].slice(0, 5).join(', ')}` : 'None found',
  });

  const shapes = tags.filter((t) => SHAPE_NAMES.includes(t.name));
  let boundsOk = true;
  let lo = Infinity;
  let hi = -Infinity;
  for (const s of shapes) {
    const b = shapeBounds(s);
    if (b === 'invalid') {
      boundsOk = false;
      continue;
    }
    if (b) {
      lo = Math.min(lo, b.min);
      hi = Math.max(hi, b.max);
    }
  }
  if (lo < SPEC.minCoord || hi > SPEC.maxCoord) boundsOk = false;
  rules.push({
    id: 'bounds',
    label: 'Every coordinate stays inside 1 to 23',
    ok: boundsOk,
    detail: shapes.length === 0 ? 'No shapes' : Number.isFinite(lo) ? `Range ${+lo.toFixed(2)} to ${+hi.toFixed(2)}` : 'Could not read the coordinates',
  });

  rules.push({
    id: 'size',
    label: 'File is at most 2048 bytes',
    ok: bytes <= SPEC.maxBytes,
    detail: `${bytes} bytes`,
  });

  rules.push({
    id: 'count',
    label: 'Between 1 and 12 shapes',
    ok: shapes.length >= SPEC.minShapes && shapes.length <= SPEC.maxShapes,
    detail: `${shapes.length} shape${shapes.length === 1 ? '' : 's'}`,
  });

  return rules;
}

/** The compact fields of a plugin.json, checked for shape only. */
export function validatePluginJson(value: unknown): string[] {
  const problems: string[] = [];
  const v = value as Record<string, unknown> | null;
  if (!v || typeof v !== 'object') return ['plugin.json must be an object'];
  if (typeof v.id !== 'string' || !/^[a-z][a-z0-9-]{1,31}$/.test(v.id)) problems.push('id must be lowercase letters, digits and hyphens');
  if (typeof v.name !== 'string' || !v.name.trim()) problems.push('name is required');
  if (typeof v.color !== 'string') problems.push('color is required');
  if (v.icon !== 'icon.svg') problems.push('icon must be "icon.svg"');
  return problems;
}
