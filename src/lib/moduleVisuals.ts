// Shared visual identity for each module: one stroke icon (24x24) and one
// solid color, read from the committed copies of the official plugin assets
// in src/data/plugin-assets/. Those copies are byte-for-byte what each
// package in lumen-plugins ships as `icon.svg` and `plugin.json`, and they
// match the icons and fills the Flutter app draws, so the site, the app and
// the plugin repository all show one identity.

const rawFiles = import.meta.glob('../data/plugin-assets/*/*', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function innerMarkup(svg: string): string {
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
}

const icons: Record<string, string> = {};
const colors: Record<string, string> = {};
const names: Record<string, string> = {};

for (const [path, content] of Object.entries(rawFiles)) {
  const match = /plugin-assets\/([^/]+)\/(icon\.svg|plugin\.json)$/.exec(path);
  if (!match) continue;
  const [, id, file] = match;
  if (file === 'icon.svg') icons[id] = innerMarkup(content);
  else {
    const parsed = JSON.parse(content) as { color: string; name: string };
    colors[id] = parsed.color;
    names[id] = parsed.name;
  }
}

/** Inner SVG markup of each official module icon, keyed by module id. */
export const MODULE_ICONS: Record<string, string> = icons;

/** The solid fill of each official module, keyed by module id. */
export const MODULE_COLORS: Record<string, string> = colors;

/** The short name of each official module, keyed by module id. */
export const MODULE_NAMES: Record<string, string> = names;
