---
title: Consent model
description: How consent is requested, stored, and enforced in code.
---

Consent in Lumen is not a checkbox that merely unlocks a settings screen; it is read by the code
path that would otherwise share something, every time, immediately before sharing it.

## The mechanism

Every plugin receives a `PluginContext` with:

```dart
bool hasConsent(String consentKey);
```

A plugin checks this before publishing anything that could reach outside the device. For example,
`lumen-plugin-famiglia`'s `FamigliaPlugin` checks `hasConsent(shareStatusWithCaregiverConsentKey)`
before ever publishing an `AlertEvent` about the user's daily status: if consent was not granted,
nothing is published, full stop. This is tested directly in that package's test suite, both the
consent-granted and consent-denied paths.

`lumen-core` does not decide what counts as consent or how it is persisted: `lumen-app` owns the
actual consent UI and storage, and provides the `ConsentStore` implementation that backs
`hasConsent`. `lumen-core`'s `ManagedPluginContext` only scopes lookups to the calling plugin's id,
so one plugin cannot read another's consent flags.

## Revocability

Consent is revocable at any time, from the settings screen (`lumen-app`'s `SettingsScreen` includes
a per-module consent toggle). Revoking it takes effect on the very next `hasConsent` check; there
is no caching layer that would delay it.

## Specific cases

- **Caregiver sharing** (Famiglia module): gated per the mechanism above.
- **Face recognition** (Ricordare module, not yet built): will require explicit consent from the
  people recognized, not just the device owner, and will run on-device only. This requirement is
  recorded here ahead of that module's implementation so it is designed in from the start, not
  retrofitted.
- **Server sync** (`lumen-server`): opt-in; the server is not contacted unless the user turns
  syncing on.

## What is not yet enforced in code

Operating system permissions (camera, microphone, location, SMS) are mediated by
`lumen-core`'s `CapabilityGate` contract, but no concrete implementation exists yet beyond
`lumen-app`'s in-memory `AppCapabilityGate`, which does not call any real platform permission API
yet, since no plugin needs a real one yet either. This is listed honestly as a gap, not implied as
done. See [Project status](/docs/introduction/status/).
