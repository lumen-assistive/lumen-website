---
title: "Event catalog"
description: "Every SenseEvent subclass in lumen_sdk, with all fields and who publishes it."
---

All events extend `SenseEvent`, an `@immutable` base class with a single field:

| Field | Type | Meaning |
|---|---|---|
| `timestamp` | `DateTime` | When `lumen-core` captured or produced the event, device clock |

Events live in the SDK so `lumen-core` and plugins share one versioned catalog of shapes.

## Vision events

### `VisionFrameEvent`

A single camera frame made available to on-device vision models. The frame stays in the platform's
native plane layout (YUV420 on Android, BGRA on iOS) and is not decoded, so the costly decode
happens once in `lumen-core` for whichever plugin needs a decoded image.

| Field | Type | Meaning |
|---|---|---|
| `width` | `int` | Frame width in pixels |
| `height` | `int` | Frame height in pixels |
| `bytesPerRow` | `int` | Stride of one row in `planeBytes`, in bytes |
| `planeBytes` | `List<int>` | Raw plane data in the native camera format |

Published by `lumen-core` (not implemented yet). Consumed by vision plugins.

### `OcrResultEvent`

The result of on-device OCR over one frame or photo.

| Field | Type | Meaning |
|---|---|---|
| `text` | `String` | The recognized text |
| `confidence` | `double` | From `0.0` (none) to `1.0` (full) |

Consumed today by `VisionPlugin`.

## Audio events

### `AudioChunkEvent`

A chunk of raw PCM audio: 16 bit signed, mono.

| Field | Type | Meaning |
|---|---|---|
| `sampleRate` | `int` | Samples per second, in Hz |
| `samples` | `List<int>` | Signed 16 bit PCM samples |

Published by `lumen-core` (not implemented yet).

### `TranscriptEvent`

A transcribed segment of speech.

| Field | Type | Meaning |
|---|---|---|
| `text` | `String` | The transcribed text |
| `isFinal` | `bool` | Whether the recognizer may still revise it. Live captioning emits non-final segments first |
| `speakerId` | `String?` | Speaker from on-device diarization, when available |

Consumed today by `HearingPlugin`, which keeps only final segments.

### `SoundAlertEvent`

A recognized non-speech sound of interest: doorbell, smoke alarm, siren, baby crying and similar.

| Field | Type | Meaning |
|---|---|---|
| `label` | `String` | Stable identifier of the sound class, for example `smoke_alarm` |
| `confidence` | `double` | From `0.0` to `1.0` |

Consumed today by `HearingPlugin`.

## Alerts

### `AlertEvent`

A user facing alert any plugin can publish.

| Field | Type | Meaning |
|---|---|---|
| `pluginId` | `String` | `PluginManifest.id` of the plugin that raised it |
| `severity` | `AlertSeverity` | `info`, `warning` or `critical` |
| `messageIt` | `String` | Message for Italian speaking users |
| `messageEn` | `String` | Message when the locale falls back to English |

`AlertSeverity`:

| Value | Meaning |
|---|---|
| `info` | Informational, no immediate action needed |
| `warning` | The user should be made aware soon, but it is not an emergency |
| `critical` | Requires immediate attention, for example a detected fall or a smoke alarm |

## What is not in the catalog yet

There is no accelerometer event, no incoming SMS event and no color sensing event. Adding one is a
minor SDK version bump, and it is what unblocks live wiring for Safety and Mobility. See the
[roadmap](/docs/introduction/roadmap/).

## Adding an event type

1. Add a subclass of `SenseEvent` with `final` fields and a `const` constructor.
2. Export it from `lumen_sdk.dart`.
3. Document each field, including units and ranges.
4. Bump the minor version and add a changelog entry.
