---
title: "Roadmap"
description: "The ordered work that remains, and what each step unlocks. No dates are promised."
---

The roadmap is an ordered list, not a schedule. Dates are not promised, because every item below
depends on toolchains and model work that are not finished.

## Phases

| Phase | Goal | State |
|---|---|---|
| 1 | `lumen-sdk` and `lumen-core`: contracts, event bus, model registry, plugin manager | Done |
| 2 | `lumen-app`: onboarding, adaptive UI, module screens, settings, accessibility | In progress |
| 3 | Vision: scene description, OCR, expiry dates, banknotes, medicines | Business-logic subset done |
| 4 | Hearing: offline captions, sound alerts, transcripts | Business-logic subset done |
| 5 | Safety: falls, offline SOS, scam filter | Business-logic subset done |
| 6 | Family and `lumen-server` | Both exist, not wired together |
| 7 | `lumen-models` benchmarks, website, organization profile | Tooling done, no model benchmarked |

Speech, Reading, Memory and Mobility joined the "business-logic subset done" stage after the first
four modules.

## Next concrete steps

1. **Native bridges in `lumen-core`**: camera and microphone capture publishing `VisionFrameEvent`
   and `AudioChunkEvent`, and accelerometer data once the SDK has an event type for it.
2. **A first converted and benchmarked model** in `lumen-models`, which unlocks the catalog, the
   `/api/v1/models` endpoint and `ModelDownloader` implementations.
3. **Persistent, encrypted storage in the app**: wire `SqlCipherAppDatabase` with a per-device
   passphrase from secure storage and a real documents directory.
4. **Live plugin hosting**: register each plugin with a `PluginManager` in the app and drive it from
   real events instead of sample input.
5. **Real permission flow**: back `CapabilityGate` with actual operating system permission
   requests.
6. **Family sync**: connect the Family module to `lumen-server` using client-side encryption.
7. **Release engineering**: a signing keystore, a release workflow, and manual TalkBack and
   VoiceOver testing.

## SDK additions that unblock modules

`lumen_sdk` has no accelerometer or incoming SMS event types yet. Until they exist, Safety and
Mobility cannot subscribe to live data, which is why their `start` and `stop` methods do nothing
today. Adding those types is an additive (minor) SDK change, see
[Versioning policy](/docs/sdk/versioning/).
