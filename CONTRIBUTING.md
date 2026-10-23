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

- Italian pages live under `src/pages/` at the site root; English pages
  live under `src/pages/en/` mirroring the same path structure.
- Module status is defined once in `src/data/modules.ts` and rendered by
  both locale's modules pages; update it there rather than hardcoding
  module data in a page.
- Do not add a testimonial, metric, partnership claim, or download link
  that is not already real and verifiable; use a clearly labeled
  placeholder notice instead, matching the existing pages' style (see the
  `.notice` style in `Layout.astro`).
