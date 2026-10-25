# Changelog

All notable changes to this project are documented in this file. The
format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]

## [0.5.1] - 2026-10-25

### Fixed

- `lumen-plugins` shipped its four remaining roadmap packages (Parlare, Leggere e Studiare,
  Ricordare, Muoversi); `src/lib/modules.ts` listed them as planned, which understated real
  progress. All eight modules now show as available on the Modules page and in the demo's phone
  mockup. The four without a browser-compilable demo (Famiglia and the four new ones) say plainly
  that they have no in-browser demo yet instead of showing an empty screen.

## [0.5.0] - 2026-10-25

### Changed

- The `/demo/` page is now a phone mockup of Lumen's module host, listing all eight modules in a
  simulated home screen with an honest status badge each (four available, four planned). Tapping
  an available module opens its screen inside the phone frame; Vedere, Sentire and Protezione run
  the same real, compiled plugin logic as before, now presented inside the simulated app rather
  than as flat page sections. Famiglia explains why it has no in-browser demo (its features need
  two paired devices); planned modules explain that they are not built yet.
- Extracted module data fetching into `src/lib/modules.ts`, shared by the Modules page and the new
  phone mockup, instead of duplicating the same `pubspec.yaml` fetch logic in two places.
- The site footer is now a full four-column footer (brand and tagline, Product, Developers,
  Project) linking to every real page and repository document (SDK, Docs, Plugins, Privacy,
  Contributing, Code of conduct, Security), instead of a single tagline and one link.

## [0.4.0] - 2026-10-25

### Added

- An interactive `/demo/` page that runs real business logic from `lumen-plugins`, compiled from
  Dart to JavaScript with `dart compile js`, directly in the browser: Vedere's expiry date parser
  and color namer, Protezione's scam message filter, and Sentire's transcript summarizer. The
  compiled bundle is produced by the new `tools/web-demo` build tool and verified against the
  real test suites in `lumen-plugins` before being committed.
- A link to the demo from the homepage and the main navigation.

### Fixed

- `CONTRIBUTING.md` still described the pre-English-only page structure and the deleted
  `src/data/modules.ts` file; corrected to match the current structure.

## [0.3.0] - 2026-10-25

### Changed

- The site is English only now. The Italian pages that used to live at the site root (`/`,
  `/moduli/`, `/privacy/`, `/sdk/`, `/download/`) were replaced by their English equivalents, and
  the separate `/en/*` tree was removed since it is no longer needed.
- `Layout.astro` no longer carries a `lang` prop, a language toggle, or bilingual copy; it renders
  a single English navigation and footer.
- Added static redirects (`/moduli/`, `/en/`, `/en/modules/`, `/en/privacy/`, `/en/sdk/`,
  `/en/download/`) to their new English paths so no existing link breaks.

## [0.2.0] - 2026-10-24

### Added

- A full documentation wiki under `/docs`, built with Astro Starlight:
  architecture overview, complete SDK reference (plugin lifecycle,
  event bus, model registry, versioning policy), a getting-started
  guide, contribution workflow, a step-by-step guide to building and
  submitting a new plugin, the privacy and consent model in technical
  detail, the model licensing process, an FAQ, an honestly-empty
  benchmarks page, and a glossary.
- `@fontsource/atkinson-hyperlegible`, the Braille Institute's
  low-vision-readability typeface, used as the site's single typeface.

### Changed

- Replaced the generic default visual design (system-ui sans, stock
  blue accent, shadowed rounded-card list) with an original identity
  grounded in the product: a warm paper and ink palette with a single
  amber accent used only where it carries meaning, and a plain divided
  list instead of a card grid.
- Module repository links now point at the consolidated
  `lumen-plugins` monorepo instead of the four now-archived separate
  plugin repositories.
- The download page now reflects that `lumen-app` exists (still no
  signed release).

### Fixed

- `package-lock.json` had gone out of sync with `package.json` after
  being regenerated on a different platform than CI's runner, missing
  optional native dependency entries; `npm ci` now succeeds in CI.

## [0.1.0] - 2026-10-23

### Added

- Initial Astro site: home, modules, privacy, SDK, and download pages in
  Italian (default) and English (`/en/`).
- Shared `Layout.astro` with navigation, language toggle, and a
  high-contrast, emoji-free design.
- `src/data/modules.ts` as the single source of truth for module status
  across both locales.
- `vercel.json` for Vercel deployment.
