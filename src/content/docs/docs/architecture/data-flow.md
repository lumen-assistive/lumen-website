---
title: "Data flow"
description: "How sense data, alerts, consent and model handles move through the system."
---

This page follows each kind of data from where it originates to where it is consumed. Where a step
is not implemented yet, it says so.

## Sense data: sensors to plugins

```
  [camera / microphone]          native platform bridge (not implemented yet)
            |
            v
   typed SenseEvent  ----------> InMemoryEventBus.publish(event)
 (VisionFrameEvent,                       |
  AudioChunkEvent, ...)                   | broadcast stream per event type
                                          v
                          plugin subscribes with bus.on<T>()
```

A native bridge captures a camera frame or an audio chunk and wraps it in the matching
`SenseEvent` subclass. It calls `publish`, and the bus delivers it to every current subscriber of
that exact runtime type. Plugins call `on<T>()` in `start` and cancel the subscription in `stop`.
Because the bus is a plain in-process multiplexer, there is no network transport anywhere on this
path.

Today the first step does not exist: no native bridge publishes real frames or audio. Tests and the
in-app sample tools publish or construct events directly.

## Derived events: plugin to plugin and plugin to app

Plugins can also publish. A typical chain looks like this:

```
OcrResultEvent  --(VisionPlugin)-->  AlertEvent (info: "Expiry date detected")
SoundAlertEvent --(HearingPlugin)--> AlertEvent (severity from the sound label)
FamilyPlugin.notifyCaregiverOfStatus --(only if consent)--> AlertEvent
MemoryPlugin.checkDueReminders --> AlertEvent (info: "Reminder: ...")
```

`AlertEvent` is the shared, user-facing alert type. The app is meant to subscribe to it to drive
visual, haptic and audible notification consistently whichever module raised it. See
[Events](/docs/sdk/events/).

## Consent on the path out

```
plugin wants to publish something that could leave the device
        |
        v
context.hasConsent(key)  ->  ManagedPluginContext  ->  ConsentStore.hasConsent(pluginId, key)
        |                                                       |
   false: publish nothing                              AppConsentStore reads ModuleConfig
   true:  publish
```

The check happens every time, immediately before publishing. `ManagedPluginContext` scopes the
lookup to the calling plugin's id. See the [Consent model](/docs/privacy/consent/).

## Capabilities on the path in

```
PluginManager.enable(pluginId)
        |
        v
capabilityGate.hasCapabilities(manifest.capabilities)
        |
   false: StateError, plugin not started
   true:  plugin.start()
```

`PluginManager` never prompts for permissions. The app owns the permission flow and tells the gate
what is currently granted. Today the app's `AppCapabilityGate` is an in-memory set and does not
call a real platform permission API.

## Model handles

```
plugin -> modelRegistry.ensureDownloaded(id) -> ModelDownloader.download(descriptor, dir)
       -> modelRegistry.acquire(id)          -> ModelHandle (reference counted)
       -> handle.dispose()                   -> refcount drops, unloaded at zero
```

`LocalModelRegistry` treats the existence of the model directory as proof the model is ready, so a
downloader must throw rather than leave partial files. No model exists in the catalog yet. See the
[model registry](/docs/core/model-registry/).

## Local persistence

```
UserProfileRepository / ModuleConfigRepository  ->  AppDatabase
                                                      |-- InMemoryAppDatabase (used by main() today)
                                                      '-- SqlCipherAppDatabase (encrypted, not wired in yet)
```

See [Storage](/docs/app/storage/).

## Data that can leave the device

Only two paths exist, and both need an explicit user action: sharing with a caregiver through the
Family module, and syncing encrypted blobs with `lumen-server`. See
[What leaves the device](/docs/privacy/what-leaves-the-device/).
