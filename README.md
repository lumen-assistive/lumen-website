# lumen-website

[Italiano](README.it.md) | English

The project website for [Lumen](https://github.com/lumen-assistive): pitch,
module status, privacy summary, SDK pointer, and download status. Built with
[Astro](https://astro.build) and deployed to Vercel.

This repository holds the website's code, not Lumen's product
documentation. Technical documentation for the SDK and the senses engine
lives in their own repositories
([lumen-sdk](https://github.com/lumen-assistive/lumen-sdk),
[lumen-core](https://github.com/lumen-assistive/lumen-core)) and is only
linked to from here, never duplicated.

## Content policy

This site never publishes fabricated user tests, metrics, or partnerships.
Sections with no real content yet say so plainly instead of being filled
with placeholder numbers or invented testimonials.

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

- `src/pages/` — Italian pages (default locale) at the site root.
- `src/pages/en/` — English translations under `/en/`.
- `src/data/modules.ts` — single source of truth for the modules list
  shown on the Moduli/Modules page in both languages.
- `src/layouts/Layout.astro` — shared page shell, navigation, and language
  toggle.

## License

Apache License 2.0, see [LICENSE](LICENSE).
