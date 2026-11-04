---
title: "Versioning policy"
description: "How lumen_sdk and lumen_core are versioned, and what counts as a breaking change."
---

`lumen_sdk` and `lumen_core` follow [Semantic Versioning](https://semver.org). Every consumer pins
a specific tagged release through a git dependency; nothing depends on `main`.

## Current versions

| Package | Version |
|---|---|
| `lumen_sdk` | `0.1.0` |
| `lumen_core` | `0.1.0` |
| `lumen-plugins` (monorepo tag) | `v0.3.0` |
| `lumen-app` (tag) | `v0.3.0` |

While the major version is `0`, the contract is still settling. The rules below describe how changes
are classified and are applied from the start.

## What is a breaking change

A major version bump is required for any change that could break an existing, correctly written
plugin, including:

- Removing or renaming a public type, method or field on `LumenPlugin`, `LumenEventBus`,
  `ModelRegistry`, `PluginContext` or any `SenseEvent` subtype.
- Changing a method signature in a way existing call sites would not compile against.
- Changing documented behavior a plugin could reasonably rely on (for example making `on<T>()`
  single subscription when it was broadcast).

## What is a minor change

Purely additive changes are a minor bump:

- A new `SenseEvent` subtype, for example an accelerometer event.
- A new `PluginCapability` or `ModelTask` value.
- A new optional field on an existing type, with a default.
- A new method on a contract, as long as nothing is required to implement it. In Dart, adding an
  abstract method to a class that plugins `implement` is actually breaking unless it has a default
  implementation, so new capability is added as a new type rather than a new required method.

A new enum value can still break an exhaustive `switch` in a consumer. Treat it as minor, and check
consumers before releasing.

## Patch changes

Bug fixes, documentation and internal refactors that do not change behavior a plugin relies on.

## For a plugin author

Pin an exact tag, not a loose reference:

```yaml
dependencies:
  lumen_sdk:
    git:
      url: https://github.com/lumen-assistive/lumen-sdk.git
      ref: v0.1.0
```

and declare the matching range in `PluginManifest.sdkConstraint` (for example `^0.1.0`) so
`PluginManager` refuses to register your plugin against an incompatible SDK version instead of
failing later in a less obvious way.

## For a maintainer releasing a new version

1. Update `CHANGELOG.md` following Keep a Changelog.
2. Bump `version` in `pubspec.yaml`.
3. Tag the commit `vX.Y.Z` and push the tag. Never move a published tag.
4. Bump the `ref` in each consumer in a separate commit, and run that consumer's checks.
5. Update `sdkConstraint` in plugin manifests if the range changed.

## Compatibility at runtime

`PluginManager.register` compares a plugin's `sdkConstraint` with the SDK version it was built with
and throws `PluginCompatibilityError` if the constraint does not allow it. See
[Dependency pinning](/docs/architecture/dependency-pinning/).
