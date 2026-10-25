<p align="center">
  <img src="https://raw.githubusercontent.com/lumen-assistive/.github/main/profile/assets/logo-wordmark.png" alt="Lumen" width="220">
</p>

# lumen-website

The project website for [Lumen](https://github.com/lumen-assistive): pitch, module status, an
interactive demo, privacy summary, SDK pointer, download status, and the full `/docs`
documentation wiki. Built with [Astro](https://astro.build) and
[Starlight](https://starlight.astro.build), deployed to Vercel.

This repository holds the website's code. The marketing pages (home, modules, privacy, SDK,
download) are intentionally short and link out to the source repositories for anything technical.
The `/docs` section is different: it is this project's real documentation, written here rather
than duplicated from elsewhere.

## Content policy

This site never publishes fabricated user tests, metrics, or partnerships. Sections with no real
content yet say so plainly instead of being filled with placeholder numbers or invented
testimonials. The modules list is fetched directly from
[lumen-plugins](https://github.com/lumen-assistive/lumen-plugins) at build time rather than
hand-maintained, so it cannot drift from what the repository actually contains.

## Development

```
npm install
npm run dev
npm run build
```

Install the shared commit message hook before committing:

```
git config core.hooksPath .githooks
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## Structure

- `src/pages/`: the marketing pages (home, modules, demo, privacy, SDK, download), English only.
- `src/components/ModulesList.astro`: fetches each module's real description from
  `lumen-plugins` at build time.
- `src/pages/demo/index.astro`: runs real `lumen-plugins` business logic in the browser,
  compiled to JavaScript by `tools/web-demo` (see that directory's README).
- `src/content/docs/docs/`: the `/docs` documentation wiki, built with Starlight.
- `src/layouts/Layout.astro`: shared page shell and navigation for the marketing pages.

The site used to ship an Italian default locale under `/` with English translations under `/en/`.
It is English only now; the old `/en/*` paths and the Italian-only `/moduli/` path redirect to
their English equivalents (configured in `astro.config.mjs`) so no existing link breaks.

## License

Apache License 2.0, see [LICENSE](LICENSE).
