---
title: "Glossary"
description: "Project specific terms used throughout this documentation."
---

**Alert**
: A user facing notification published as an `AlertEvent` with a severity of `info`, `warning` or
  `critical`. See [Events](/docs/sdk/events/).

**AppDatabase**
: The app's persistence contract with an in-memory implementation and an encrypted SQLCipher
  implementation. See [Storage](/docs/app/storage/).

**Capability**
: A device permission a plugin declares it needs, such as `camera` or `microphone`. See
  [Capabilities](/docs/sdk/capabilities/).

**CapabilityGate**
: The interface the app implements to tell `lumen-core` whether capabilities are currently granted.

**Catalog**
: The list of model packs in `lumen-models`, mirrored by `ModelDescriptor`. Empty today.

**Consent**
: A flag the user grants for sharing data, read by a plugin through `hasConsent` immediately before
  acting. See the [Consent model](/docs/privacy/consent/).

**ConsentStore**
: The interface the app implements to answer consent questions.

**Content guard**
: A CI job that rejects forbidden references and emoji in tracked files.

**Event bus**
: The typed publish and subscribe channel plugins use instead of reading sensors. See
  [Event bus](/docs/sdk/event-bus/).

**Ink**
: The warm near-black used for text, icons and every outline in the app, on warm off-white paper. See
  [Colors](/docs/design/colors/).

**LumenPlugin**
: The lifecycle contract every module implements: `initialize`, `start`, `stop`, `dispose`.

**Module**
: A feature area of Lumen delivered as a plugin: Vision, Hearing, Safety, Family, Speech, Reading,
  Memory and Mobility.

**ModuleScope**
: The widget that themes a module's screen with the module's color. See
  [Components](/docs/design/components/).

**ModelHandle**
: A reference counted, disposable handle to a loaded model.

**ModelRegistry**
: The contract plugins use to obtain model handles. See [Model registry](/docs/sdk/model-registry/).

**Onboarding**
: The five question flow on first launch. See [Onboarding](/docs/app/onboarding/).

**Pairing code**
: A six digit, ten minute code used to pair a caregiver. See the
  [Family package](/docs/plugins/family/).

**Plugin**
: The Dart package implementing a module through `LumenPlugin`.

**PluginContext**
: The only object through which a plugin reaches the event bus, the model registry and consent.

**PluginManager**
: The `lumen-core` class that owns plugin lifecycle. See [PluginManager](/docs/core/plugin-manager/).

**Senses engine**
: The shared multimodal layer (vision, audio, text) implemented by `lumen-core` that every module builds
  on.

**SenseEvent**
: The base type of everything carried on the bus.

**SM-2**
: The spaced repetition algorithm implemented by the Reading package's scheduler.

**SQLCipher**
: An encrypted build of SQLite used by the app's production database implementation.

**UI mode**
: One of four adaptive interface behaviors: voice-first high contrast, visual with vibration, simple or
  complete. See [UI modes](/docs/app/ui-modes/).

**WCAG**
: The Web Content Accessibility Guidelines, whose contrast thresholds the design system is verified
  against. See [WCAG approach](/docs/accessibility/wcag-approach/).
