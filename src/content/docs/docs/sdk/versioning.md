---
title: Versioning policy
description: How lumen_sdk and lumen_core are versioned, and what counts as a breaking change.
---

`lumen_sdk` and `lumen_core` follow [Semantic Versioning](https://semver.org). Every consumer pins
a specific tagged release through a git dependency; nothing depends on `main`.

## What is a breaking change

A major version bump is required for any change that could break an existing, correctly-written
plugin, including:

- Removing or renaming a public type, method, or field on `LumenPlugin`, `LumenEventBus`,
  `ModelRegistry`, `PluginContext`, or any `SenseEvent` subtype.
- Changing a method's signature in a way existing call sites would not compile against.
- Changing documented behavior that a plugin could reasonably have relied on (for example, making
  `on<T>()` single-subscription when it was previously broadcast).

## What is a minor change

Purely additive changes are a minor version bump:

- A new `SenseEvent` subtype.
- A new optional field on an existing type, with a default.
- A new method on a contract, as long as nothing is required to implement it (interfaces in Dart
  are structural, so adding a method to an `abstract class` that plugins `implement` is actually
  breaking unless it has a default implementation via a mixin or `extension`; in practice, new
  capability is added as a new type rather than a new required method, specifically to keep this a
  minor change).

## What this means for a plugin author

Pin an exact constraint, not a loose one:

```yaml
dependencies:
  lumen_sdk:
    git:
      url: https://github.com/lumen-assistive/lumen-sdk.git
      ref: v0.1.0
```

and declare the same constraint in your `PluginManifest.sdkConstraint` (for example `^0.1.0`), so
`lumen-core`'s `PluginManager` refuses to register your plugin against an incompatible SDK version
rather than fail in some less obvious way later.
