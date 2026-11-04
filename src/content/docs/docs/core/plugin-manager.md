---
title: "PluginManager"
description: "Registration, compatibility checking, enabling and disabling plugins: every method and error."
---

`PluginManager` owns plugin lifecycle. A single instance is shared by the whole app, and it is the
only place that calls into `LumenPlugin` methods, so lifecycle stays centralized and consistent.

## Construction

```dart
PluginManager({
  required LumenEventBus eventBus,
  required ModelRegistry modelRegistry,
  required CapabilityGate capabilityGate,
  required ConsentStore consentStore,
  required Version sdkVersion,
})
```

`sdkVersion` is the `lumen_sdk` version the engine was built against, a `Version` from `pub_semver`.

## Methods

| Method | Behavior |
|---|---|
| `register(plugin)` | Checks the id is unused and the SDK constraint is satisfied, builds a `ManagedPluginContext`, calls `initialize`, and records state `initialized` |
| `enable(id)` | Starts a registered plugin if its capabilities are granted. Does nothing if already started |
| `disable(id)` | Stops a running plugin. Does nothing if it is not running |
| `unregister(id)` | Stops the plugin if running, disposes it and removes it. Does nothing if not registered |
| `stateOf(id)` | The current `PluginState`, or `null` if never registered |
| `registeredPluginIds` | An unmodifiable list of registered ids |

## Errors

| Situation | Error |
|---|---|
| `register` with an id already registered | `StateError` |
| `register` where `manifest.sdkConstraint` does not allow the SDK version | `PluginCompatibilityError` |
| `enable` on an id that is not registered | `StateError` (`Plugin "<id>" is not registered.`) |
| `enable` where a required capability is not granted | `StateError` |

## `register` in detail

1. Read `plugin.manifest`.
2. If the id is already registered, throw a `StateError`.
3. Parse `sdkConstraint` with `VersionConstraint.parse`. If it does not allow `sdkVersion`, throw
   `PluginCompatibilityError(pluginId, requiredConstraint, actualVersion)`.
4. Create a `ManagedPluginContext` scoped to the plugin id.
5. `await plugin.initialize(context)`.
6. Record the plugin and set its state to `initialized`.

Nothing is recorded if any earlier step throws, so a rejected plugin leaves no trace.

## `enable` in detail

1. If the state is already `started`, return.
2. Find the plugin or throw a `StateError`.
3. Ask `capabilityGate.hasCapabilities(manifest.capabilities)`. If false, throw a `StateError`.
4. `await plugin.start()` and set the state to `started`.

## States

| `PluginState` | Meaning |
|---|---|
| `initialized` | Registered and initialized, not started |
| `started` | Started and receiving events |
| `stopped` | Previously started, now stopped |

## Example

```dart
await manager.register(HearingPlugin());
gate.grantCapability(PluginCapability.microphone);
await manager.enable('hearing');
manager.stateOf('hearing');     // PluginState.started
await manager.disable('hearing');
await manager.unregister('hearing');
```

## What it does not do

It never prompts for permissions (that is the app's job), never reads consent itself (a plugin
reads it through its context), and does not publish sense data. See
[Data flow](/docs/architecture/data-flow/).

## Tests

Registering initializes exactly once, rejects an incompatible constraint, rejects a duplicate id;
enabling starts the plugin when capabilities are granted and throws when not; disabling stops a
running plugin and is idempotent; unregistering stops, disposes and forgets the plugin.
