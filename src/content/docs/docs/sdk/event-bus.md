---
title: Event bus
description: The LumenEventBus contract and the SenseEvent catalog.
---

Plugins never open a camera, a microphone, or any other sensor directly. Instead, `lumen-core`
publishes typed events onto a shared bus, and a plugin subscribes to the types it cares about.

```dart
abstract class LumenEventBus {
  Stream<T> on<T extends SenseEvent>();
  void publish(SenseEvent event);
}
```

`on<T>()` returns a broadcast stream of every event of type `T`; cancel the subscription in
`LumenPlugin.stop`. `publish` is also how a plugin raises something back to the rest of the system,
most commonly an `AlertEvent`.

## The event catalog

Every event extends `SenseEvent`, which only carries a `timestamp`.

| Event | Carries | Published by |
|---|---|---|
| `VisionFrameEvent` | Raw camera frame data (width, height, stride, plane bytes) | `lumen-core`, once a native camera bridge exists |
| `OcrResultEvent` | Recognized text and a confidence score | `lumen-core`, once on-device OCR exists |
| `AudioChunkEvent` | Raw PCM audio samples and sample rate | `lumen-core`, once a native microphone bridge exists |
| `TranscriptEvent` | Transcribed text, whether it is final, an optional speaker id | `lumen-core`, once on-device ASR exists |
| `SoundAlertEvent` | A recognized non-speech sound label and confidence | `lumen-core`, once on-device sound classification exists |
| `AlertEvent` | A plugin id, severity, and a bilingual message | Any plugin, to surface something to the user |

As of the current release, `lumen-core` has no native bridges, so `VisionFrameEvent`,
`OcrResultEvent`, `AudioChunkEvent`, `TranscriptEvent`, and `SoundAlertEvent` are never actually
published in a running app yet. Plugin packages that consume them (`VederePlugin` subscribing to
`OcrResultEvent`, `SentirePlugin` subscribing to `TranscriptEvent` and `SoundAlertEvent`) are fully
implemented and tested against a fake bus, ready the moment something publishes for real. See
[Architecture overview](/docs/introduction/architecture/).

## Adding a new event type

`lumen_sdk` is the only place `SenseEvent` subtypes are defined. If a plugin needs sense data that
has no matching event yet (for example, `lumen-plugin-protezione`'s `FallDetector` needs raw
accelerometer samples, and `lumen_sdk` has no such event today), the change goes through
`lumen-sdk` first, as an additive, minor-version-bump change, before any plugin depends on it. See
[Versioning policy](/docs/sdk/versioning/) and
[Building a plugin](/docs/contributing/plugins/).

## Testing against the bus

`lumen_sdk`'s `lumen_sdk_testing` entry point ships `FakeEventBus`, an in-memory implementation
backed by one broadcast `StreamController` per event type, used throughout every plugin's test
suite instead of a real `lumen-core` instance.
