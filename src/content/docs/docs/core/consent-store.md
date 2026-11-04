---
title: "ConsentStore"
description: "The interface the app implements to answer consent questions, and how a plugin reaches it."
---

```dart
abstract class ConsentStore {
  bool hasConsent(String pluginId, String consentKey);
}
```

`ConsentStore` answers "has the user granted this plugin consent for this key". `lumen-core` does not
decide what counts as consent or how it is persisted. `lumen-app` owns the consent UI and storage and
provides an implementation to `PluginManager`.

## How a plugin reaches it

A plugin never sees the store. It calls `PluginContext.hasConsent(key)`, and the context created by
`PluginManager` forwards to the store with the plugin's own id:

```
plugin.context.hasConsent('share-status-with-caregiver')
   -> ManagedPluginContext.hasConsent(key)
   -> consentStore.hasConsent('family', 'share-status-with-caregiver')
```

Scoping by plugin id means a plugin cannot read another plugin's consent.

## The app's implementation

```dart
class AppConsentStore implements ConsentStore {
  AppConsentStore(this._moduleConfigRepository);
  final ModuleConfigRepository _moduleConfigRepository;

  @override
  bool hasConsent(String pluginId, String consentKey) =>
      _moduleConfigRepository.configFor(pluginId).consentGranted;
}
```

The MVP tracks one consent flag per module (sharing with a paired caregiver), so every `consentKey`
maps to the same stored value. Splitting into per key consent is a natural extension once a module
needs more than one kind of consent.

## Revocation

The settings screen's per module "Consent to share with family" switch writes the flag through the
repository. Because the store reads the repository on every call, revocation takes effect on the very
next check.

## Testing

`test/consent/app_consent_store_test.dart` covers a module that never granted consent, consent once
the module config grants it, and consent being scoped per module.

See the [Consent model](/docs/privacy/consent/).
