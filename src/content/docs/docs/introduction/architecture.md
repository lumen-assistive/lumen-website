---
title: "Architecture overview"
description: "How the senses engine, plugin SDK, plugin packages and the app fit together, and why they are separate."
---

Lumen separates concerns into layers, each its own repository, so that a plugin author never needs
to touch sensor code and the app never needs to know what a specific plugin does internally.

```
lumen-app            the Flutter application: onboarding, adaptive UI, module screens, settings
     |
     | hosts a screen for each module, built on
     v
lumen-plugins        one package per module: vision, hearing, safety, family,
     |               speech, reading, memory, mobility
     | each implements LumenPlugin and depends only on the contracts in
     v
lumen-sdk            the contracts: LumenPlugin, LumenEventBus, SenseEvent catalog, ModelRegistry
     ^
     | implemented by
     |
lumen-core           the senses engine: event bus, model registry, plugin manager

lumen-server         optional backend: pairing, encrypted blob sync, model metadata
lumen-models         license ledger, model catalog, conversion and benchmark tooling
lumen-website        this site
.github              organization profile, shared CI workflows, shared commit hook
```

## Why this split exists

A plugin that could reach directly into the camera, the microphone or a model file would make two
things impossible to guarantee: that sensor access is always consent-gated, and that a plugin can
be tested without real hardware. Routing everything through the contracts in `lumen_sdk`, and only
ever implementing those contracts in `lumen-core`, makes both guarantees mechanical.

## The senses engine (`lumen-core`)

`lumen-core` implements three things from the SDK's contracts:

- **`InMemoryEventBus`**, a typed publish and subscribe bus built on broadcast stream controllers
  keyed by event type.
- **`LocalModelRegistry`**, on-demand, reference-counted model loading backed by a directory on
  local storage, with a pluggable `ModelDownloader`.
- **`PluginManager`**, which owns plugin lifecycle (`register`, `enable`, `disable`, `unregister`),
  checks a plugin's declared SDK version constraint, and gates starting a plugin on a
  `CapabilityGate`.

It also defines two small interfaces the app implements: `CapabilityGate` and `ConsentStore`.
Details are in the [core reference](/docs/core/overview/).

## The plugin SDK (`lumen-sdk`)

`lumen-sdk` defines, and only defines, the contracts, plus in-memory testing fakes and a runnable
example plugin. It has a single dependency (`meta`) and no Flutter dependency, so anything can
depend on it. See the [SDK reference](/docs/sdk/plugin-lifecycle/).

## Plugin packages (`lumen-plugins`)

Each of the eight modules ships as an independent Dart package under `packages/`, depending on
`lumen_sdk` for contracts. Today every package contains real, tested business logic (parsers,
state machines, data models, consent gating) that is not yet wired to a live sensor. See the
[plugin packages reference](/docs/plugins/overview/).

## The app (`lumen-app`)

The Flutter application: a five-question onboarding flow, four adaptive UI modes, a home screen
listing enabled modules, one real screen per module that runs the package's actual logic on sample
input, settings, and a local storage layer. See the [app guide](/docs/app/overview/).

## The optional backend (`lumen-server`)

A FastAPI service for caregiver pairing, end-to-end encrypted blob storage and model metadata. It
stores ciphertext it cannot decrypt. Nothing in the app depends on it for essential features. See
the [server reference](/docs/server/overview/).

## Tooling and governance (`lumen-models`)

A license ledger, a model catalog (empty today), an automated compliance gate, a conversion
pipeline interface and a benchmark harness. See the [models section](/docs/models/overview/).

## Versioning across repositories

`lumen_sdk` and `lumen_core` use Semantic Versioning. Every consumer depends on a specific tagged
release via a git dependency, never on `main`. See
[Dependency pinning](/docs/architecture/dependency-pinning/).
