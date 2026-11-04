---
title: "Errors and states"
description: "PluginCompatibilityError, PluginState and the other failures a host should expect from lumen-core."
---

## `PluginCompatibilityError`

Thrown by `PluginManager.register` when a plugin's declared `lumen_sdk` constraint does not allow the
version the engine was built against. It extends `Error`, because it signals a programming or
packaging mistake rather than a recoverable condition.

| Field | Meaning |
|---|---|
| `pluginId` | `PluginManifest.id` of the incompatible plugin |
| `requiredConstraint` | The constraint the plugin declared, for example `^0.1.0` |
| `actualVersion` | The SDK version the engine was built against |

```
PluginCompatibilityError: plugin "demo" requires lumen_sdk ^2.0.0 but lumen-core provides 0.1.0.
```

The engine refuses to register an incompatible plugin rather than risk a silent contract mismatch.

## `PluginState`

`initialized`, `started`, `stopped`. See [PluginManager](/docs/core/plugin-manager/).

## `StateError` cases

| Where | Cause |
|---|---|
| `PluginManager.register` | A plugin with the same id is already registered |
| `PluginManager.enable` | The plugin id is not registered, or a required capability is not granted |
| `LocalModelRegistry.isDownloaded`, `ensureDownloaded`, `acquire` | Unknown model id |
| `LocalModelRegistry.ensureDownloaded` | Model not present and no downloader configured |
| `LocalModelRegistry.acquire` | Model not downloaded |

## Plugin package errors

Not part of `lumen-core`, but common in practice:

| Error | Raised by |
|---|---|
| `StateError` | `TranscriptSession` misuse, `SosController` re-trigger or reset during countdown |
| `ArgumentError` | `FlashcardDeck.review` for an unknown card id |
| `PersonProfileConsentError` | `PersonDirectory.upsert` with an inconsistent consent state |

## Handling guidance

- Treat `PluginCompatibilityError` as a build problem: fix the pin or the constraint.
- Treat a capability `StateError` from `enable` as "ask for the permission first", then retry.
- Do not catch a `StateError` from `acquire` to hide a missing download; call `ensureDownloaded`.
