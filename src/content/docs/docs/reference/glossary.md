---
title: Glossary
description: Project-specific terms used throughout this documentation.
---

**Senses engine**
: The shared multimodal layer (vision, audio, text) implemented by `lumen-core` that every module
  is built on, instead of each module handling sensors or models on its own.

**Module**
: A feature area of Lumen (Vedere, Sentire, Parlare, Leggere e Studiare, Ricordare, Protezione,
  Muoversi, Famiglia e caregiver). Delivered as a plugin package.

**Plugin**
: The code implementing a module, as a Dart package implementing the `LumenPlugin` contract from
  `lumen_sdk`. See [Plugin lifecycle](/docs/sdk/plugin-lifecycle/).

**`LumenPlugin`**
: The lifecycle contract every module implements: `initialize`, `start`, `stop`, `dispose`.

**`LumenEventBus`**
: The typed publish/subscribe contract plugins use to receive sense data and publish alerts,
  instead of touching sensors directly.

**`SenseEvent`**
: The base type for everything carried on the event bus: `VisionFrameEvent`, `OcrResultEvent`,
  `AudioChunkEvent`, `TranscriptEvent`, `SoundAlertEvent`, `AlertEvent`.

**`ModelRegistry`**
: The contract plugins use to request on-demand model handles instead of loading a model file
  themselves.

**`PluginManager`**
: `lumen-core`'s implementation that owns plugin lifecycle, registration, and SDK version
  compatibility checks. The only code that calls a plugin's lifecycle methods.

**`CapabilityGate`**
: The contract `lumen-app` implements to tell `lumen-core` whether a plugin's required device
  capabilities (camera, microphone, location, and so on) are currently granted.

**`ConsentStore`**
: The contract `lumen-app` implements to tell a plugin, through `PluginContext.hasConsent`, whether
  the user has granted a specific, named consent.

**UI mode**
: One of four adaptive interface behaviors `lumen-app` chooses during onboarding: voice-first high
  contrast, visual with vibration, simple, or complete.

**Onboarding**
: The five-question flow on first launch that decides UI mode and which modules to enable.

**Senses engine native bridge**
: The not-yet-built native (Kotlin/Swift) code in `lumen-core` that will turn real camera,
  microphone, and sensor input into `SenseEvent`s. See
  [Project status](/docs/introduction/status/).

**MVP**
: Minimum viable product. Lumen's stated target is three modules that work flawlessly rather than
  eight that are half-done.
