---
title: "CapabilityGate"
description: "The interface the app implements to tell the engine which device capabilities are currently granted."
---

```dart
abstract class CapabilityGate {
  bool hasCapabilities(List<PluginCapability> capabilities);
}
```

`CapabilityGate` reports whether every capability in a list is currently granted. `PluginManager`
calls it in `enable` with the plugin's declared capabilities, and starts the plugin only when it
returns true.

## Who owns what

`lumen-core` does not prompt the user for permissions. `lumen-app` owns the actual permission request
flow (for example through the operating system's dialogs) and provides the gate. `PluginManager` only
checks the current state before starting a plugin; it never triggers a prompt.

## The app's implementation

```dart
class AppCapabilityGate implements CapabilityGate {
  final Set<PluginCapability> _granted = {};
  void grantCapability(PluginCapability capability) => _granted.add(capability);
  void revokeCapability(PluginCapability capability) => _granted.remove(capability);
  @override
  bool hasCapabilities(List<PluginCapability> capabilities) =>
      capabilities.every(_granted.contains);
}
```

A plugin with an empty capability list is always allowed to start, because `every` over an empty
list is true.

## What it does not do yet

`AppCapabilityGate` is an in-memory set and does not call real platform permission APIs. No plugin is
registered with a live `PluginManager` in the app yet, so there is nothing to gate in production. The
class exists so the integration point is real and tested, ready for a phase that wires actual
permission requests (camera, microphone, SMS, location) into `grantCapability` and
`revokeCapability`.

## Testing

`test/consent/app_capability_gate_test.dart` covers nothing granted by default, requiring every
capability, revoking, and the empty list case. In `lumen-core`'s own tests, stub gates that always
grant or never grant exercise the manager.

See also [Capabilities](/docs/sdk/capabilities/).
