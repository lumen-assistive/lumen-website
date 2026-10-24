---
title: Architecture overview
description: How the senses engine, plugin SDK, app, and plugins fit together.
---

Lumen separates concerns into four layers, each its own repository, so that a plugin author never
needs to touch sensor code and the app never needs to know what a specific plugin does internally.

```
lumen-app            the Flutter application: onboarding, adaptive UI, module host, settings
     |
     | registers and runs
     v
lumen-plugins        one module package per Lumen feature (Vedere, Sentire, Protezione, Famiglia, ...)
     |
     | implements LumenPlugin, depends only on contracts from
     v
lumen-sdk            the contracts: LumenPlugin, LumenEventBus, SenseEvent catalog, ModelRegistry
     ^
     | implemented by
     |
lumen-core           the senses engine: event bus, model registry, plugin manager
```

## Why this split exists

A plugin that could reach directly into the camera, the microphone, or a model file would make two
things impossible to guarantee: that sensor access is always consent-gated, and that a plugin
cannot be tested without real hardware. Routing everything through `lumen_sdk`'s contracts, and
only ever implementing those contracts in `lumen-core`, keeps both guarantees mechanical rather
than a matter of discipline.

## The senses engine (`lumen-core`)

`lumen-core` implements three things:

- **`InMemoryEventBus`**, the production `LumenEventBus`: a typed, topic-based publish/subscribe
  bus. Plugins subscribe to the `SenseEvent` subtypes they care about and never open a sensor
  themselves.
- **`LocalModelRegistry`**, the production `ModelRegistry`: on-demand, reference-counted model
  loading backed by local storage, with a pluggable `ModelDownloader` so the registry itself does
  not need to know where model bytes come from.
- **`PluginManager`**: owns plugin lifecycle (`register`, `enable`, `disable`, `unregister`),
  checks a plugin's declared `lumen_sdk` version constraint against the running version before
  registering it, and gates starting a plugin on an injected `CapabilityGate` reporting whether its
  declared capabilities are currently granted.

As of the current release, `lumen-core` has no native sensor bridges (camera, microphone,
accelerometer) or on-device model inference bindings. It ships the platform-independent engine as
a pure Dart package; native bridges are the next phase, once a full Flutter and Android/Xcode
toolchain is available to build and verify them properly. See that repository's own README for the
up-to-date state.

## The plugin SDK (`lumen-sdk`)

`lumen-sdk` defines, and only defines, the contracts above, plus in-memory testing fakes
(`lumen_sdk_testing`) and a runnable example plugin. It has no implementation and no Flutter
dependency, so it can be depended on by anything, including a future non-Dart tool, without
pulling in the Flutter SDK. See [SDK reference](/docs/sdk/plugin-lifecycle/) for the contracts
themselves.

## Plugin packages (`lumen-plugins`)

Every module ships as an independent Dart package under `lumen-plugins/packages/`, depending only
on `lumen_sdk` (pinned to a tagged release) for contracts. A plugin is pure business logic until it
has a native bridge to attach to; several packages today implement real, tested logic (expiry date
parsing, fall detection, a pairing code generator, and so on) that is simply not wired to a live
sensor yet, because the event types or native bridges it needs do not exist yet. Each package's own
README states plainly what is implemented and what is deferred. See
[Building a plugin](/docs/contributing/plugins/) to add a new one.

## The app (`lumen-app`)

`lumen-app` is the Flutter application: the onboarding flow, the four adaptive UI modes, a module
host that lists whichever modules the user enabled, settings, and local storage (an
`AppDatabase` interface with an in-memory implementation used throughout tests, and a
production-ready `sqflite_sqlcipher`-backed implementation not yet wired into the running app). It
depends on `lumen_sdk` and `lumen_core`, pinned to tagged releases. It does not yet depend on any
individual plugin package, since plugins ship no Flutter UI of their own yet. The module host is
intentionally generic today rather than presenting fabricated feature screens.

## Versioning across repositories

`lumen_sdk` and `lumen_core` use Semantic Versioning. Every consumer (`lumen-app`, every plugin
package) depends on a specific tagged release via a git dependency, never on `main`, so a breaking
change to a contract cannot silently break a consumer. See
[Versioning policy](/docs/sdk/versioning/) for what counts as breaking.
