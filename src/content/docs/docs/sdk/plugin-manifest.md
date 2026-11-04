---
title: "Plugin manifest"
description: "PluginManifest: every field, its rules, and how lumen-core uses it."
---

`PluginManifest` is the static description of a plugin, independent of any running instance.
`lumen-core` reads it before instantiating or initializing a plugin, to decide whether the device and
consent state allow it to run and to render the module's entry in onboarding and settings.

```dart
const PluginManifest(
  id: 'vision',
  nameIt: 'Vision',
  nameEn: 'Vision',
  version: '0.1.0',
  sdkConstraint: '^0.1.0',
  capabilities: [PluginCapability.camera],
);
```

## Fields

| Field | Type | Meaning |
|---|---|---|
| `id` | `String` | Stable, lowercase, hyphenated identifier, for example `vision` or `my-module`. It is also the key for registration and for consent lookups. |
| `nameIt` | `String` | Display name for Italian speaking users |
| `nameEn` | `String` | Display name when the locale falls back to English |
| `version` | `String` | The plugin's own version, following Semantic Versioning |
| `sdkConstraint` | `String` | The `lumen_sdk` version range the plugin was built against, for example `^0.1.0` |
| `capabilities` | `List<PluginCapability>` | Device capabilities the plugin needs mediated before it may start |

`PluginManifest` is `@immutable` and every field is `final`, so a manifest must be a compile time
constant or at least never change at runtime.

## Rules

- **`id` must be unique** across registered plugins. `PluginManager.register` throws a `StateError`
  if the id is already registered.
- **`sdkConstraint` must allow the running SDK version.** `register` parses it with
  `VersionConstraint.parse` and throws `PluginCompatibilityError` if it does not allow the version
  `lumen-core` was built against. An invalid constraint string is a parse error.
- **`capabilities` are checked at `enable` time.** If the `CapabilityGate` reports any as not
  granted, `enable` throws a `StateError` and the plugin is not started.
- **The manifest must not depend on runtime state.**

## The two display names

The contract keeps both `nameIt` and `nameEn`. The shipped app is English only, and every official
plugin sets both fields to the same English name. The Italian field remains because removing it would
be a breaking change for every consumer, see
[Design decisions](/docs/architecture/design-decisions/).

## Official manifests

| `id` | `nameEn` | Capabilities |
|---|---|---|
| `vision` | Vision | camera |
| `hearing` | Hearing | microphone |
| `safety` | Safety | location, smsSend, smsRead, notifications |
| `family` | Family | none |
| `speech` | Speech | none |
| `reading` | Read and Study | none |
| `memory` | Remember | none |
| `mobility` | Mobility | none |

All use `version` `0.1.0` and `sdkConstraint` `^0.1.0`.

## Choosing a good id

Use a short, English, lowercase noun that names the capability (`vision`, `hearing`), not a
brand or a person. The id appears in consent keys, in `AlertEvent.pluginId` and in the app's
module catalog, so renaming it later is disruptive.
