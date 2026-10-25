# Changelog

All notable changes to this project are documented in this file. The
format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]

## [0.8.0] - 2026-10-25

### Changed

- Renamed every module's internal identifiers from Italian to English across
  the site, matching the rename every plugin package in `lumen-plugins` went
  through: `vedere`/`vision`, `sentire`/`hearing`, `protezione`/`safety`,
  `famiglia`/`family`, `parlare`/`speech`, `leggere`/`reading`,
  `ricordare`/`memory`, `muoversi`/`mobility`. `src/lib/modules.ts`, the
  phone mockup, the demo page, `tools/web-demo`, and the screenshots page's
  source links all use the new ids and file paths; the Italian display
  names shown on the Modules page are unchanged, and the `vision`/`hearing`/
  `safety` English labels now read "Vision"/"Hearing"/"Safety" instead of
  their Italian names.
- `tools/web-demo` now depends on all eight plugin packages under their new
  names, pinned to `lumen-plugins`' `v0.3.0` tag.

### Added

- Two new interactive controls in the phone mockup, both wired to new real
  `lumen-plugins` functions: a WCAG contrast checker on the Vision module
  (checks the entered color against a white and a black background) and a
  sentence builder on the Speech module (composes the phrases tapped above
  into one sentence). Every new and existing exported function was
  reverified in Node against the real compiled bundle before being wired
  in.

## [0.7.0] - 2026-10-25

### Added

- A `/screenshots/` page showing nine real screenshots of `lumen-app`'s own widget tree (the
  home screen with all eight modules enabled, and each module's real screen with its tools
  already run once), rendered from the app's own test suite rather than hand-drawn or
  AI-generated images. Linked from the homepage, the main navigation, and the footer.

## [0.6.0] - 2026-10-25

### Changed

- The demo's phone mockup is now fully interactive on all eight modules, not three: Famiglia
  (pairing code generator, daily status), Parlare (tap real phrases, see usage-ranked
  suggestions update), Leggere e Studiare (syllable splitter, a real SM-2 flashcard review loop),
  Ricordare (add a consent-gated person, add and check reminders) and Muoversi (a gait stability
  monitor fed two preset accelerometer walks) all now run their real, compiled `lumen-plugins`
  logic, the same as Vedere, Sentire and Protezione already did. No module shows an empty "no
  demo" note anymore.
- `tools/web-demo` now depends on all eight plugin packages, pinned to `lumen-plugins`' `v0.2.0`
  tag. Every new function was verified against the real behavior of its package (matched against
  known test fixtures, run through the compiled bundle in Node with the browser globals it needs
  shimmed in) before being wired into the page.
- The phone mockup itself looks and feels more like a real device: side volume and power buttons,
  a softened inner highlight and shadow, a smooth slide-in transition when opening or closing a
  module (skipped under reduced-motion preferences), and a small deliberate delay before showing a
  result so interactions read as the app having done the work rather than an instant text swap.

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
