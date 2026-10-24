---
title: Repository map
description: Every Lumen repository, what it contains, and how to clone them.
---

All Lumen repositories live under a single GitHub organization,
[lumen-assistive](https://github.com/lumen-assistive), and are developed side by side in one local
parent folder. There is no single "monorepo for everything" — `lumen-plugins` is the one exception,
a monorepo for plugin packages specifically (see [Building a plugin](/docs/contributing/plugins/)
for why).

## Cloning everything

```bash
mkdir lumen-workspace && cd lumen-workspace
for repo in .github lumen-sdk lumen-core lumen-app lumen-plugins lumen-server lumen-models lumen-website; do
  gh repo clone "lumen-assistive/$repo"
done
```

## What each repository contains

| Repository | Stack | Contains |
|---|---|---|
| [`.github`](https://github.com/lumen-assistive/.github) | Markdown, GitHub Actions | Org profile, default community health files, reusable CI workflows used by every other repository |
| [`lumen-sdk`](https://github.com/lumen-assistive/lumen-sdk) | Dart | The `LumenPlugin`, `LumenEventBus`, and `ModelRegistry` contracts; testing fakes; an example plugin |
| [`lumen-core`](https://github.com/lumen-assistive/lumen-core) | Dart | The contracts implemented: event bus, model registry, plugin manager |
| [`lumen-app`](https://github.com/lumen-assistive/lumen-app) | Flutter, Dart | The application: onboarding, adaptive UI, module host, settings, storage |
| [`lumen-plugins`](https://github.com/lumen-assistive/lumen-plugins) | Dart | One package per module: Vedere, Sentire, Protezione, Famiglia today |
| [`lumen-server`](https://github.com/lumen-assistive/lumen-server) | Python, FastAPI | Optional caregiver backend: device pairing, encrypted sync, model metadata |
| [`lumen-models`](https://github.com/lumen-assistive/lumen-models) | Python | Model conversion and benchmark tooling, and the license ledger |
| [`lumen-website`](https://github.com/lumen-assistive/lumen-website) | Astro | This site |

## Cross-repository dependencies

`lumen-core`, `lumen-app`, and every `lumen-plugins` package depend on `lumen_sdk` pinned to a
tagged git release, never to `main`:

```yaml
dependencies:
  lumen_sdk:
    git:
      url: https://github.com/lumen-assistive/lumen-sdk.git
      ref: v0.1.0
```

`lumen-app` additionally depends on `lumen_core` the same way. This means a breaking change to a
contract in `lumen-sdk` cannot silently break a consumer: consumers only move to a new contract
version when someone deliberately bumps the `ref`.
