---
title: "Plugin packages overview"
description: "The eight module packages in lumen-plugins: what they share, how they are structured, and where to read about each."
---

`lumen-plugins` is a monorepo. Each module is an independent Dart package under `packages/`, named
`lumen_plugin_<id>`, depending on `lumen_sdk` for contracts and `meta` for annotations.

| Package | Module | Plugin class | Capabilities declared |
|---|---|---|---|
| [`lumen_plugin_vision`](/docs/plugins/vision/) | Vision | `VisionPlugin` | camera |
| [`lumen_plugin_hearing`](/docs/plugins/hearing/) | Hearing | `HearingPlugin` | microphone |
| [`lumen_plugin_safety`](/docs/plugins/safety/) | Safety | `SafetyPlugin` | location, smsSend, smsRead, notifications |
| [`lumen_plugin_family`](/docs/plugins/family/) | Family | `FamilyPlugin` | none |
| [`lumen_plugin_speech`](/docs/plugins/speech/) | Speech | `SpeechPlugin` | none |
| [`lumen_plugin_reading`](/docs/plugins/reading/) | Reading | `ReadingPlugin` | none |
| [`lumen_plugin_memory`](/docs/plugins/memory/) | Memory | `MemoryPlugin` | none |
| [`lumen_plugin_mobility`](/docs/plugins/mobility/) | Mobility | `MobilityPlugin` | none |

Every package is released together under one tag of the monorepo. Applications pin the tag and name
the package `path`. See [Dependency pinning](/docs/architecture/dependency-pinning/).

## Conventions shared by every package

- A barrel file `lib/lumen_plugin_<id>.dart` exports the public API; implementation lives in
  `lib/src/`.
- A plugin class implementing `LumenPlugin` with `id` equal to the module id, `sdkConstraint` of
  `^0.1.0`, and the capabilities listed above.
- Real logic is separated from the plugin class, so it can be used and tested on its own.
- Time and randomness are injectable (`DateTime Function() now`, `Random`), so tests are
  deterministic.
- Immutable value types use `@immutable`. Mutable state holders are explicit (`Flashcard`,
  `Reminder`).
- Validators return an error object or `null`; they do not throw by themselves, except where a
  store enforces an invariant (for example `PersonDirectory.upsert`).

See [Common patterns](/docs/plugins/common-patterns/) for the details.

## What each package ships today

Pure, tested logic. What none of them ship yet: a native sensor bridge, an on-device model, or
Flutter UI. The Flutter screens that exercise them live in `lumen-app`, see the
[app guide](/docs/app/overview/).

## Plugin classes and live events

Only three plugin classes do real work in `start`:

| Plugin | Subscribes to | Publishes |
|---|---|---|
| `VisionPlugin` | `OcrResultEvent` | An info `AlertEvent` when an expiry date is found |
| `HearingPlugin` | `TranscriptEvent`, `SoundAlertEvent` | A severity mapped `AlertEvent` per sound; collects final transcript segments into a `TranscriptSession` |
| `FamilyPlugin` | none | An `AlertEvent` from `notifyCaregiverOfStatus`, only with consent |

`MemoryPlugin.checkDueReminders` also publishes alerts but must be called by the host. The other
plugin classes have empty lifecycle methods and expose their logic through getters.

## Manifest values

Every manifest sets `nameIt` and `nameEn` to the same English name (`Vision`, `Hearing`, `Safety`,
`Family`, `Speech`, `Read and Study`, `Remember`, `Mobility`), and `version` `0.1.0`.

## Tests

Each package has its own `test/` directory and runs in CI as one cell of a matrix. See
[Running tests](/docs/getting-started/running-tests/).
