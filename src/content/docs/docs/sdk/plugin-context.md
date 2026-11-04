---
title: "Plugin context"
description: "PluginContext: everything a plugin receives from lumen-core, and why nothing else is available."
---

A plugin receives a single `PluginContext` in `initialize`. It is the only way a plugin reaches
anything outside itself.

```dart
abstract class PluginContext {
  LumenEventBus get eventBus;
  ModelRegistry get modelRegistry;
  bool hasConsent(String consentKey);
}
```

## The three members

| Member | Use |
|---|---|
| `eventBus` | Subscribe to sense data with `on<T>()` and publish alerts with `publish` |
| `modelRegistry` | Request on-demand model handles instead of loading models directly |
| `hasConsent(key)` | Read a consent flag the user granted for this plugin |

## Why the context is the only door

If a plugin could open a camera, read a file or call a platform channel itself, consent and power
management would depend on every plugin author remembering to do the right thing. Routing all access
through the context makes the guarantees structural, and it makes a plugin testable with
`FakePluginContext`.

## The real implementation

`lumen-core` hands every plugin a `ManagedPluginContext`, which is created per plugin by
`PluginManager.register`. It shares the app wide event bus and model registry, and scopes
`hasConsent` to the plugin's own id:

```dart
bool hasConsent(String consentKey) => _consentStore.hasConsent(_pluginId, consentKey);
```

A plugin therefore cannot read another plugin's consent flags.

## Consent keys

Consent keys are plugin defined strings, for example `share-status-with-caregiver` (defined by the
Family package as the constant `shareStatusWithCaregiverConsentKey`). Today the app stores a single
consent flag per module, so every key of a module maps to the same stored value.

## Using the context

```dart
@override
Future<void> initialize(PluginContext context) async {
  _context = context;
}

@override
Future<void> start() async {
  _subscription = _context.eventBus.on<OcrResultEvent>().listen(_onOcr);
}

void notify() {
  if (!_context.hasConsent('share-status-with-caregiver')) return;
  _context.eventBus.publish(/* an AlertEvent */);
}
```

Read consent every time, immediately before acting. Do not cache the answer, because consent can be
revoked at any moment.
