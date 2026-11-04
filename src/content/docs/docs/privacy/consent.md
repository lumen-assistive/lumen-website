---
title: "Consent model"
description: "How consent is requested, stored and enforced in code, and what is not enforced yet."
---

Consent in Lumen is not a checkbox that merely unlocks a settings screen. It is read by the code path
that would otherwise share something, every time, immediately before sharing it.

## The mechanism

Every plugin receives a `PluginContext` with:

```dart
bool hasConsent(String consentKey);
```

A plugin checks this before publishing anything that could reach outside the device. For example
`FamilyPlugin.notifyCaregiverOfStatus` checks `hasConsent('share-status-with-caregiver')` before
publishing an `AlertEvent` about the user's daily status. If consent was not granted, nothing is
published. Both the granted and the denied paths are tested.

## Who owns what

| Layer | Responsibility |
|---|---|
| Plugin | Asks `hasConsent` immediately before acting |
| `ManagedPluginContext` (core) | Scopes the lookup to the calling plugin's id, so one plugin cannot read another's flags |
| `ConsentStore` (core interface) | Answers `hasConsent(pluginId, key)` |
| `AppConsentStore` (app) | Implements it over `ModuleConfigRepository` |
| Settings screen (app) | The switch that grants or revokes consent |

`lumen-core` does not decide what counts as consent or how it is persisted. See
[ConsentStore](/docs/core/consent-store/).

## Revocability

Consent is revocable at any time from the settings screen. Revocation takes effect on the very next
`hasConsent` check, because there is no cache between the store and the plugin.

## Granularity today

The MVP stores one consent flag per module (sharing with a paired caregiver), and every consent key of a
module maps to it. Finer grained consent is a natural extension when a module needs more than one kind.

## Consent for other people

The Memory module keeps a directory of people to remember. Its `PersonProfile` records `consentGiven` and
a `consentTimestamp` that must agree, and the directory refuses to store a profile that violates it. This
is the groundwork for a rule the project holds firmly: face recognition, when it exists, must run on
device only and require the explicit consent of the people recognized, not just the device owner. The
requirement is recorded now so it is designed in rather than retrofitted.

## Consent versus capabilities

Capabilities (camera, microphone, location, SMS) are about device access, mediated by `CapabilityGate`.
Consent is about sharing data with other people or services. A plugin needs both where both apply. See
[Capabilities](/docs/sdk/capabilities/).

## Specific cases

| Case | Gate |
|---|---|
| Caregiver sharing (Family) | `hasConsent`, as above |
| Server sync (`lumen-server`) | Opt in; the server is not contacted unless the user turns it on |
| Model downloads | The SDK contract says a download does nothing without the required network consent |
| Face recognition (Memory) | Not built; will require consent of the people recognized |

## What is not enforced yet

Real operating system permissions are mediated by `CapabilityGate`, but the only implementation is the
app's in-memory `AppCapabilityGate`, which does not call a platform permission API yet, because no plugin
is wired to a live manager. This is listed as a gap, not implied as done. See
[Project status](/docs/introduction/status/).
