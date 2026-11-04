// Shared visual identity for each module: one small original stroke icon
// (24x24, matching the site logo mark's arc style) and one signature accent
// color, used by the Modules page and the phone mockup so both read as the
// same system instead of two separately hand-tuned designs. The amber brand
// color stays the one used for primary actions and links everywhere; these
// per-module colors are additive, used only for module identity.

export const MODULE_ICONS: Record<string, string> = {
  vision: '<ellipse cx="12" cy="12" rx="9" ry="5.5"/><circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none"/>',
  hearing: '<line x1="7" y1="15" x2="7" y2="9"/><line x1="12" y1="17" x2="12" y2="6"/><line x1="17" y1="15" x2="17" y2="10"/>',
  speech: '<rect x="3.5" y="5.5" width="17" height="11" rx="4"/><path d="M8 16.5l-2 3.5v-3.8"/><circle cx="9" cy="11" r="0.9" fill="currentColor" stroke="none"/><circle cx="12" cy="11" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="11" r="0.9" fill="currentColor" stroke="none"/>',
  reading: '<path d="M12 6.8c-2.3-1.6-4.9-2-8.3-1.3v12.3c3.4-0.7 6 -0.3 8.3 1.3 2.3-1.6 4.9-2 8.3-1.3V5.5c-3.4-0.7-6-0.3-8.3 1.3z"/><line x1="12" y1="6.8" x2="12" y2="19.1"/>',
  memory: '<circle cx="12" cy="12" r="8.3"/><line x1="12" y1="12" x2="12" y2="7.4"/><line x1="12" y1="12" x2="15.1" y2="13.9"/>',
  mobility: '<ellipse cx="8.4" cy="9" rx="2.2" ry="3.1" transform="rotate(-18 8.4 9)"/><ellipse cx="15.7" cy="15.3" rx="2.2" ry="3.1" transform="rotate(14 15.7 15.3)"/>',
  safety: '<path d="M12 3.4l6.4 2.3v5.2c0 4.5-2.7 7.6-6.4 8.9-3.7-1.3-6.4-4.4-6.4-8.9V5.7z"/>',
  family: '<circle cx="8.6" cy="8.5" r="2.8"/><path d="M3.9 19.3c0-3.2 2.1-5.5 4.7-5.5s4.7 2.3 4.7 5.5"/><circle cx="16.2" cy="9.4" r="2.2"/><path d="M13.7 19.3c0.2-2.5 1.7-4.5 3.8-4.5"/>',
};

/** Signature accent color per module, shared with lumen-app's redesign so the two read as one product. */
export const MODULE_COLORS: Record<string, string> = {
  vision: '#0891B2',
  hearing: '#7C3AED',
  safety: '#E11D48',
  family: '#DB2777',
  speech: '#EA580C',
  reading: '#16A34A',
  memory: '#4F46E5',
  mobility: '#CA8A04',
};
