// Shared module data, fetched directly from each package's pubspec.yaml in
// lumen-plugins at build time, so both the modules page and the phone demo
// read the same real source instead of two separately hand-maintained copies.
import { parse } from 'yaml';

export interface ModuleEntry {
  id: string;
  nameIt: string;
  nameEn: string;
  description: string;
  repoUrl: string | null;
}

const SHIPPED_PACKAGE_IDS = ['vedere', 'sentire', 'protezione', 'famiglia'];
const ROADMAP_ONLY_IDS = ['parlare', 'leggere', 'ricordare', 'muoversi'];

const NAMES: Record<string, { it: string; en: string }> = {
  vedere: { it: 'Vedere', en: 'See' },
  sentire: { it: 'Sentire', en: 'Hear' },
  protezione: { it: 'Protezione', en: 'Safety' },
  famiglia: { it: 'Famiglia e caregiver', en: 'Family and caregivers' },
  parlare: { it: 'Parlare', en: 'Speak' },
  leggere: { it: 'Leggere e Studiare', en: 'Read and Study' },
  ricordare: { it: 'Ricordare', en: 'Remember' },
  muoversi: { it: 'Muoversi', en: 'Move' },
};

async function fetchPackageInfo(id: string): Promise<ModuleEntry> {
  const url = `https://raw.githubusercontent.com/lumen-assistive/lumen-plugins/main/packages/${id}/pubspec.yaml`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch pubspec.yaml for package "${id}": HTTP ${response.status}`);
  }
  const yamlText = await response.text();
  const parsed = parse(yamlText) as { description?: string };
  return {
    id,
    nameIt: NAMES[id].it,
    nameEn: NAMES[id].en,
    description: (parsed.description ?? '').trim(),
    repoUrl: `https://github.com/lumen-assistive/lumen-plugins/tree/main/packages/${id}`,
  };
}

/** Every one of Lumen's eight modules, shipped or roadmap-only, in a fixed display order. */
export async function getModules(): Promise<ModuleEntry[]> {
  const shipped = await Promise.all(SHIPPED_PACKAGE_IDS.map(fetchPackageInfo));
  const roadmap: ModuleEntry[] = ROADMAP_ONLY_IDS.map((id) => ({
    id,
    nameIt: NAMES[id].it,
    nameEn: NAMES[id].en,
    description: '',
    repoUrl: null,
  }));
  return [...shipped, ...roadmap];
}
