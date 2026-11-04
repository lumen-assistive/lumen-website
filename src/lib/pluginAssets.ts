// Plugin icons and colors for the Plugins page. The source of truth is the
// `plugin.json` and `icon.svg` each package in lumen-plugins ships; they are
// fetched at build time and checked against the same rules the pull request
// validator uses. If a file is missing, unreachable or invalid, the committed
// copy in src/data/plugin-assets/ is used instead, so a build never breaks
// and never publishes an icon that breaks the spec.
import { OFFICIAL_COLORS, validateColor, validatePluginJson, validateSvgText } from './pluginSpec';

export interface PluginAsset {
  id: string;
  name: string;
  color: string;
  iconInner: string;
  source: 'lumen-plugins' | 'committed copy';
}

const files = import.meta.glob('../data/plugin-assets/*/*', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const BASE = 'https://raw.githubusercontent.com/lumen-assistive/lumen-plugins/main/packages';

function inner(svg: string): string {
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
}

function committed(id: string): PluginAsset {
  const meta = JSON.parse(files[`../data/plugin-assets/${id}/plugin.json`]) as { name: string; color: string };
  return {
    id,
    name: meta.name,
    color: meta.color,
    iconInner: inner(files[`../data/plugin-assets/${id}/icon.svg`]),
    source: 'committed copy',
  };
}

async function remote(id: string): Promise<PluginAsset | null> {
  try {
    const [metaRes, iconRes] = await Promise.all([
      fetch(`${BASE}/${id}/plugin.json`),
      fetch(`${BASE}/${id}/icon.svg`),
    ]);
    if (!metaRes.ok || !iconRes.ok) return null;
    const meta = JSON.parse(await metaRes.text()) as { id: string; name: string; color: string; icon: string };
    const svg = await iconRes.text();
    const problems = [
      ...validatePluginJson(meta),
      ...validateSvgText(svg).filter((r) => !r.ok).map((r) => r.label),
      ...validateColor(meta.color, id).filter((r) => !r.ok).map((r) => r.label),
    ];
    if (problems.length || meta.id !== id) {
      console.warn(`[plugins] ${id}: remote assets rejected (${problems.join('; ') || 'id mismatch'}), using the committed copy`);
      return null;
    }
    return { id, name: meta.name, color: meta.color, iconInner: inner(svg), source: 'lumen-plugins' };
  } catch {
    return null;
  }
}

/** Icons and colors of the eight official plugins, in display order. */
export async function getPluginAssets(): Promise<PluginAsset[]> {
  const ids = Object.keys(OFFICIAL_COLORS);
  return Promise.all(ids.map(async (id) => (await remote(id)) ?? committed(id)));
}
