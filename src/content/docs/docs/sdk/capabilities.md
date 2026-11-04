---
title: "Capabilities"
description: "PluginCapability: the device capabilities a plugin can declare, and how they are mediated."
---

A plugin never requests an operating system permission itself. It declares the capabilities it needs
in its manifest, and `lumen-core` together with the app mediates them: the app requests the
permission and shows the consent prompt, and only then is the plugin allowed to start and receive
the matching sense data.

```dart
enum PluginCapability {
  camera, microphone, location, notifications,
  smsRead, smsSend, contacts, storage,
}
```

## The capabilities

| Value | Meaning | Used by |
|---|---|---|
| `camera` | Camera frames, routed as `VisionFrameEvent` | Vision |
| `microphone` | Microphone audio, routed as `AudioChunkEvent` | Hearing |
| `location` | The device's location, for example Safety's offline SOS flow | Safety |
| `notifications` | Permission to show local notifications | Safety |
| `smsRead` | Reading incoming SMS, used by the scam filter | Safety |
| `smsSend` | Sending SMS, used by the offline SOS flow | Safety |
| `contacts` | The contacts list, used to resolve emergency contacts | none yet |
| `storage` | On-device storage outside the app's private directory | none yet |

## How a capability is checked

```dart
await manager.enable('vision');
```

`PluginManager.enable` asks `CapabilityGate.hasCapabilities(plugin.manifest.capabilities)`. If every
declared capability is granted, it starts the plugin. If not, it throws a `StateError` and the plugin
stays in its previous state.

`PluginManager` never triggers a permission prompt. The app owns that flow and tells the gate what is
currently granted. See [CapabilityGate](/docs/core/capability-gate/).

## Declaring the minimum

Declare only what the plugin actually uses. A capability in the manifest is a promise to the user in
the permission prompt, and an unnecessary one lowers trust and may block the plugin from starting.
Plugins that only run pure logic (Family, Speech, Reading, Memory, Mobility) declare none.

## Adding a capability

A new capability is an additive SDK change (a new enum value) and a minor version bump. Existing
`switch` statements over the enum in other repositories need a new case, so check consumers before
releasing. See [Versioning policy](/docs/sdk/versioning/).

## Capabilities versus consent

Capabilities are about device access. Consent is a separate, per plugin flag the user grants for
sharing data with other people. See the [Consent model](/docs/privacy/consent/).
