---
title: Project status
description: What exists today across every Lumen repository, and what does not yet.
---

This page is kept in sync with reality, not aspiration. If something below is wrong, it is a bug:
please open an issue.

## Repositories

| Repository | Status | Notes |
|---|---|---|
| `.github` | Done | Org profile, community health files, reusable CI workflows |
| `lumen-sdk` | Done, tagged `v0.1.0` | Plugin, event bus, and model registry contracts |
| `lumen-core` | Done this phase | Senses engine as a pure Dart package; no native bridges yet |
| `lumen-app` | Done this phase | Onboarding, adaptive UI, module host, settings, storage interfaces |
| `lumen-plugins` | Done this phase, tagged `v0.1.0` | Vedere, Sentire, Protezione, Famiglia packages |
| `lumen-server` | Done this phase, tagged `v0.1.0` | Device pairing, encrypted blob sync, model metadata endpoint |
| `lumen-models` | Done this phase, tagged `v0.1.0` | License ledger, catalog schema, benchmark harness; no model converted yet |
| `lumen-website` | Active | This site |

Not yet created, per the project's rule against empty placeholder repositories: `lumen-plugin-parlare`,
`lumen-plugin-leggere`, `lumen-plugin-ricordare`, `lumen-plugin-muoversi`. These are added as
packages in `lumen-plugins` once their development phase starts.

## What "done this phase" means

Every module ships the real, tested business logic that does not require a native sensor or
on-device model: parsing, state machines, data models, consent gating, permission tables. What it
does not yet include is explicitly listed in that package's own `README.md`, because the
underlying infrastructure does not exist yet:

- **Native sensor bridges** (camera, microphone, accelerometer) in `lumen-core`. Building these
  needs a full Flutter plus Android/Xcode toolchain to implement and verify correctly.
- **On-device model inference** (TFLite, whisper.cpp). This needs `lumen-models` to have actually
  converted and benchmarked a model, which has not started — see
  [Benchmarks](/docs/reference/benchmarks/).
- **A signed Android release** of `lumen-app`. No signing keystore or release workflow exists yet.
- **Manual accessibility testing** (TalkBack, VoiceOver) against `lumen-app`. Semantics labels,
  touch target sizes, and dynamic text scaling are implemented, but have not been manually verified
  with a screen reader. This is a required step before any release, not optional polish.

## Roadmap

1. `lumen-core` and `lumen-sdk`: senses engine, plugin bus, model registry. **Done.**
2. `lumen-app`: onboarding, adaptive UI, module host, full accessibility. **In progress.**
3. Vedere: scene, OCR, expiry dates, banknotes, medicines. **Business-logic subset done.**
4. Sentire: offline captions, sound alerts, transcripts. **Business-logic subset done.**
5. Protezione: falls, offline SOS, scam filter. **Business-logic subset done.**
6. Basic Famiglia features and `lumen-server`. **Both done this phase, not yet wired together.**
7. `lumen-models` benchmarks, then this website, then the `.github` org profile content.
   **Tooling done; no model benchmarked yet.**
