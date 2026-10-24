---
title: Plugin lifecycle
description: The LumenPlugin contract every module implements.
---

Every Lumen module implements `LumenPlugin`, defined in `lumen_sdk`. `lumen-core`'s
`PluginManager` is the only code that calls these methods; a plugin never calls them on itself.

```dart
abstract class LumenPlugin {
  PluginManifest get manifest;

  Future<void> initialize(PluginContext context);
  Future<void> start();
  Future<void> stop();
  Future<void> dispose();
}
```

## Lifecycle order

1. **Construction.** A plugin is constructed by whoever registers it (today, nothing in production
   does this yet, since no plugin is wired into `lumen-app`; `PluginManager`'s own tests construct
   plugins directly).
2. **`initialize(context)`**, called once, before `start`. The `PluginContext` passed in is the only
   way the plugin reaches the event bus, the model registry, or consent state, see
   [Plugin context](#plugin-context) below. Validate that required model handles can be resolved
   here; do not begin consuming sense data yet.
3. **`start()`**, called when the user enables the module. Subscribe to the event bus and begin
   doing work here.
4. **`stop()`**, called when the user disables the module or navigates away. Unsubscribe from the
   event bus and release any model handles acquired in `start`.
5. **`dispose()`**, called when the plugin will not be used again in this process, for example
   during an SDK version migration. Release anything acquired in `initialize`.

`PluginManager` enforces this order and tracks each plugin's current `PluginState`
(`initialized`, `started`, `stopped`); calling `enable` on an already-started plugin, or `disable`
on a stopped one, is a safe no-op rather than an error.

## The manifest

```dart
class PluginManifest {
  final String id;
  final String nameIt;
  final String nameEn;
  final String version;
  final String sdkConstraint;
  final List<PluginCapability> capabilities;
}
```

`sdkConstraint` is checked against the running `lumen_sdk` version before a plugin is registered;
registering a plugin whose constraint is not satisfied throws `PluginCompatibilityError` rather
than risk a silent contract mismatch. `capabilities` lists what `lumen-core` must mediate access to
(camera, microphone, location, notifications, SMS read or send, contacts, storage) before the
plugin is allowed to start; see `CapabilityGate` below.

## Plugin context

```dart
abstract class PluginContext {
  LumenEventBus get eventBus;
  ModelRegistry get modelRegistry;
  bool hasConsent(String consentKey);
}
```

A plugin never reaches for a sensor, a platform channel, or a model file directly: everything it
needs arrives through this context. `hasConsent` is how a plugin checks, for example, whether the
user has agreed to share their status with a caregiver, before publishing anything related to that
(see [Consent model](/docs/privacy/consent/)).

## Gating who can start

`PluginManager.enable` only starts a plugin if an injected `CapabilityGate` reports every
capability in its manifest as currently granted:

```dart
abstract class CapabilityGate {
  bool hasCapabilities(List<PluginCapability> capabilities);
}
```

`lumen-core` does not itself decide how permissions are requested; `lumen-app` owns the actual
permission UI and provides the `CapabilityGate` implementation. `PluginManager` only checks current
state, it never triggers a prompt.
