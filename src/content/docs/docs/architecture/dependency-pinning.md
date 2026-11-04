---
title: "Dependency pinning"
description: "How repositories depend on each other through tagged git releases, and the resulting dependency graph."
---

No Lumen repository depends on another repository's `main` branch. Every dependency between Dart
packages is a git dependency pinned to a tag.

## The graph

```
lumen_sdk (v0.1.0)
   ^           ^
   |           |
lumen_core   each lumen_plugin_* package (lumen-plugins v0.3.0)
(v0.1.0)        ^
   ^            |
   '-- lumen-app depends on lumen_sdk, lumen_core and all eight plugin packages
```

| Package | Depends on |
|---|---|
| `lumen_sdk` | `meta` |
| `lumen_core` | `lumen_sdk` (tag `v0.1.0`), `pub_semver` |
| each `lumen_plugin_*` | `lumen_sdk` (tag `v0.1.0`), `meta` |
| `lumen_app` | `lumen_sdk`, `lumen_core`, all eight plugin packages (tag `v0.3.0` of `lumen-plugins`), `go_router`, `sqflite_sqlcipher`, `pub_semver`, `meta` |

## What a pin looks like

```yaml
dependencies:
  lumen_sdk:
    git:
      url: https://github.com/lumen-assistive/lumen-sdk.git
      ref: v0.1.0
  lumen_plugin_vision:
    git:
      url: https://github.com/lumen-assistive/lumen-plugins.git
      ref: v0.3.0
      path: packages/vision
```

Because `lumen-plugins` is a monorepo, a plugin dependency also names the package `path`.

## Why tags, not `main`

A breaking change to a contract cannot silently break a consumer: consumers move only when someone
deliberately bumps the `ref`. Tags are never force-moved once published.

## Two layers of version checking

1. **Build time**: the git `ref` in `pubspec.yaml` decides which source a package compiles
   against.
2. **Registration time**: `PluginManifest.sdkConstraint` declares the SDK range a plugin was
   written for, and `PluginManager.register` refuses to register a plugin whose constraint does not
   allow the SDK version the engine was built against, throwing `PluginCompatibilityError`.

The two layers catch different mistakes: the first prevents accidental drift, the second prevents
loading a plugin that was built against a different contract at runtime.

## Bumping a pin

1. Release the dependency with a new tag, following the
   [versioning policy](/docs/sdk/versioning/).
2. Update the `ref` in each consumer in a separate commit.
3. Run the consumer's analyze and test steps, and update any code the new version requires.
4. Update `sdkConstraint` in affected plugin manifests if the SDK range changed.

## Publishing

All packages set `publish_to: none`. They are distributed as git dependencies, not through pub.dev.
