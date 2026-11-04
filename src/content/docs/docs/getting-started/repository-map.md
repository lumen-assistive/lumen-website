---
title: "Repository map"
description: "Every Lumen repository, what it contains, and how to clone them."
---

All Lumen repositories live under one GitHub organization,
[lumen-assistive](https://github.com/lumen-assistive), and are developed side by side in one local
parent folder. There is no monorepo for everything. `lumen-plugins` is the one monorepo, for the
plugin packages specifically.

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
| [`.github`](https://github.com/lumen-assistive/.github) | Markdown, GitHub Actions | Organization profile, community health files, reusable CI workflows, shared commit hook |
| [`lumen-sdk`](https://github.com/lumen-assistive/lumen-sdk) | Dart | `LumenPlugin`, `LumenEventBus`, `ModelRegistry` contracts, testing fakes, an example plugin |
| [`lumen-core`](https://github.com/lumen-assistive/lumen-core) | Dart | Event bus, model registry and plugin manager implementations |
| [`lumen-app`](https://github.com/lumen-assistive/lumen-app) | Flutter, Dart | Onboarding, adaptive UI, module screens, settings, storage |
| [`lumen-plugins`](https://github.com/lumen-assistive/lumen-plugins) | Dart | Eight packages: vision, hearing, safety, family, speech, reading, memory, mobility |
| [`lumen-server`](https://github.com/lumen-assistive/lumen-server) | Python, FastAPI | Optional caregiver backend: pairing, encrypted blobs, model metadata |
| [`lumen-models`](https://github.com/lumen-assistive/lumen-models) | Python | License ledger, catalog, conversion pipeline interface, benchmark harness |
| [`lumen-website`](https://github.com/lumen-assistive/lumen-website) | Astro, Starlight | This site |

## Layout of the main repositories

### `lumen-sdk`

```
lib/lumen_sdk.dart              public barrel
lib/lumen_sdk_testing.dart      fakes barrel
lib/src/events/                 SenseEvent, bus contract, vision/audio/alert events
lib/src/models/                 ModelDescriptor, ModelRegistry, ModelTask
lib/src/plugin/                 LumenPlugin, PluginManifest, PluginCapability, PluginContext
lib/src/testing/                FakeEventBus, FakeModelRegistry, FakePluginContext
example/example_plugin.dart     runnable example
```

### `lumen-core`

```
lib/src/events/in_memory_event_bus.dart
lib/src/models/                 LocalModelRegistry, ModelDownloader
lib/src/plugin/                 PluginManager, CapabilityGate, ConsentStore,
                                ManagedPluginContext, PluginState, PluginCompatibilityError
```

### `lumen-plugins`

```
packages/<module>/lib/lumen_plugin_<module>.dart    barrel
packages/<module>/lib/src/                          implementation
packages/<module>/test/                             tests
```

### `lumen-app`

```
lib/main.dart
lib/src/app.dart                root widget and loading state
lib/src/routing/                go_router configuration
lib/src/onboarding/             questions, answers, outcome, module catalog
lib/src/home/                   home screen
lib/src/modules/                one screen per module and shared widgets
lib/src/settings/               settings screen
lib/src/diagnostics/            developer diagnostics
lib/src/storage/                AppDatabase, repositories, SQLCipher implementation
lib/src/consent/                AppCapabilityGate, AppConsentStore
lib/src/theme/                  colors, theme, ui mode, module scope, logo mark, module icons
lib/src/l10n/                   app strings
```

### `lumen-server`

```
app/main.py  app/models.py  app/schemas.py  app/security.py  app/settings.py  app/db.py
app/api/{pairing,blobs,model_catalog}.py
alembic/versions/0001_initial_schema.py
```

### `lumen-models`

```
src/lumen_models/{catalog,license_check,cli}.py
src/lumen_models/convert/base.py   src/lumen_models/benchmark/runner.py
docs/{LICENSES.md,licenses.yaml,benchmarks.md}
```

## Cross-repository dependencies

See [Dependency pinning](/docs/architecture/dependency-pinning/).
