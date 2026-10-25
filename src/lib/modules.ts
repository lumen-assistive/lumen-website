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

const SHIPPED_PACKAGE_IDS = [
  'vision',
  'hearing',
  'safety',
  'family',
  'speech',
  'reading',
  'memory',
  'mobility',
];
const ROADMAP_ONLY_IDS: string[] = [];

const NAMES: Record<string, { it: string; en: string }> = {
  vision: { it: 'Vedere', en: 'Vision' },
  hearing: { it: 'Sentire', en: 'Hearing' },
  safety: { it: 'Protezione', en: 'Safety' },
  family: { it: 'Famiglia e caregiver', en: 'Family and caregivers' },
  speech: { it: 'Parlare', en: 'Speech' },
  reading: { it: 'Leggere e Studiare', en: 'Reading' },
  memory: { it: 'Ricordare', en: 'Memory' },
  mobility: { it: 'Muoversi', en: 'Mobility' },
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
