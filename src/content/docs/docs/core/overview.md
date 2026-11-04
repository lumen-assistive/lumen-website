---
title: "Core overview"
description: "lumen-core: what the senses engine implements, what it deliberately leaves to the app, and what is not there yet."
---

`lumen-core` implements the contracts defined in `lumen_sdk`. It is a pure Dart package (no Flutter
dependency) so its logic can be tested fast on any machine.

```dart
import 'package:lumen_core/lumen_core.dart';
```

## What it exports

| Class | Role |
|---|---|
| [`InMemoryEventBus`](/docs/core/event-bus/) | The production `LumenEventBus` |
| [`LocalModelRegistry`](/docs/core/model-registry/), `ModelDownloader` | The production `ModelRegistry` and the download seam |
| [`PluginManager`](/docs/core/plugin-manager/) | Plugin registration, compatibility checking and lifecycle |
| [`CapabilityGate`](/docs/core/capability-gate/) | Interface for "are these capabilities granted" |
| [`ConsentStore`](/docs/core/consent-store/) | Interface for "has the user granted this consent" |
| `ManagedPluginContext` | The `PluginContext` handed to each plugin |
| [`PluginState`, `PluginCompatibilityError`](/docs/core/errors/) | Lifecycle state and the version mismatch error |

## What the app provides

`lumen-core` does not decide how permission prompts look or where consent is stored. It defines two
small interfaces that `lumen-app` implements and passes to `PluginManager`:

| Core interface | App implementation |
|---|---|
| `CapabilityGate` | `AppCapabilityGate`, an in-memory set of granted capabilities |
| `ConsentStore` | `AppConsentStore`, backed by `ModuleConfigRepository` |

## Wiring it together

```dart
final manager = PluginManager(
  eventBus: InMemoryEventBus(),
  modelRegistry: LocalModelRegistry(
    catalog: const [],
    modelsDirectory: Directory('/path/to/models'),
  ),
  capabilityGate: AppCapabilityGate(),
  consentStore: AppConsentStore(moduleConfigRepository),
  sdkVersion: Version.parse('0.1.0'),
);

await manager.register(VisionPlugin());
await manager.enable('vision');
```

## Dependencies

`lumen_sdk` (git tag `v0.1.0`) and `pub_semver` for version constraint checks.

## What is not there yet

Native sensor bridges (camera, microphone, accelerometer capture) and on-device inference bindings
(TFLite, whisper.cpp). They need a working Flutter plus Android and Xcode toolchain to build and
verify. Without them, nothing publishes real sense data on the bus. See
[Known limitations](/docs/architecture/limitations/).

## Tests

`in_memory_event_bus_test.dart`, `local_model_registry_test.dart` and `plugin_manager_test.dart`.
