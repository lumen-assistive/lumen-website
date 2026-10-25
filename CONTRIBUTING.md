# Contributing to lumen-website

See the organization-wide
[CONTRIBUTING.md](https://github.com/lumen-assistive/.github/blob/main/CONTRIBUTING.md)
for the general workflow. This file only covers what is specific to this
repository.

## Setup

```
npm install
git config core.hooksPath .githooks
```

## Before sending a pull request

```
npm run build
```

Must succeed; CI runs the same command on every push and pull request.

## Adding or changing a page

- The site is English only; pages live under `src/pages/`.
- The modules list on `/modules/` is fetched directly from
  [lumen-plugins](https://github.com/lumen-assistive/lumen-plugins) at build time by
  `src/components/ModulesList.astro`; it is not hand-maintained, so there is no local
  module data file to edit.
- Do not add a testimonial, metric, partnership claim, or download link
  that is not already real and verifiable; use a clearly labeled
  placeholder notice instead, matching the existing pages' style (see the
  `.notice` style in `Layout.astro`).

## Changing the `/demo/` page

The interactive demo at `/demo/` calls real `lumen-plugins` business logic compiled to
JavaScript, not a reimplementation of it. The compiled bundle at `public/demo/lumen-demo.js`
is generated from `tools/web-demo/lib/demo.dart`; see `tools/web-demo/README.md` for how to
regenerate it after changing that file or after `lumen-plugins` ships a new tag it should
track. Regenerating requires a local Dart SDK; CI does not rebuild this bundle, since it has
no Dart toolchain.
