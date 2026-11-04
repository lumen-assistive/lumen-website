---
title: "Project status"
description: "What exists today across every Lumen repository, and what does not yet. Kept in sync with reality."
---

This page is kept in sync with reality, not aspiration. If something below is wrong, it is a bug:
please open an issue.

## Repositories

| Repository | Release | State |
|---|---|---|
| `.github` | n/a | Organization profile, community health files, reusable CI workflows, shared commit hook |
| `lumen-sdk` | `v0.1.0` | Plugin, event bus and model registry contracts, testing fakes, example plugin |
| `lumen-core` | `v0.1.0` | Senses engine as a pure Dart package; no native bridges yet |
| `lumen-app` | `v0.3.0` | Onboarding, adaptive UI, a real screen per module, settings, storage layer |
| `lumen-plugins` | `v0.3.0` | Eight packages: vision, hearing, safety, family, speech, reading, memory, mobility |
| `lumen-server` | `v0.1.0` | Pairing, encrypted blob storage, model metadata endpoint (empty catalog) |
| `lumen-models` | `v0.1.0` | License ledger, catalog schema and gate, benchmark harness; no model converted |
| `lumen-website` | active | This site and the documentation wiki |

## What "business logic done" means

Every module ships real, tested logic that does not need a native sensor or an on-device model:
parsing, state machines, scoring, consent gating, permission tables. What it does not include is
listed in each package's own `README.md` and on each module page of this wiki.

## What does not exist yet

- **Native sensor bridges** (camera, microphone, accelerometer) in `lumen-core`. They need a full
  Flutter plus Android and Xcode toolchain to implement and verify.
- **On-device model inference** (TFLite, whisper.cpp). `lumen-models` has not converted or
  benchmarked any model yet, see [Benchmarks](/docs/reference/benchmarks/).
- **Live wiring of plugins into a `PluginManager`** inside the app. The module screens call each
  package's classes directly, and the developer diagnostics screen honestly shows an empty plugin
  list.
- **Persistent storage in the running app.** `main()` currently runs on `InMemoryAppDatabase`, so
  profile and settings do not survive a restart. `SqlCipherAppDatabase` exists but is not wired in:
  it needs a per-device passphrase source and a documents directory path.
- **Real SMS sending, text-to-speech and pictograms.** The SOS flow uses a fake sender.
- **Syncing the Family module with `lumen-server`.** Both exist, they are not connected.
- **A signed Android release**, and a release workflow. No signing keystore exists.
- **Manual accessibility testing** with TalkBack and VoiceOver. Semantic labels, touch target sizes
  and text scaling are implemented but not manually verified with a screen reader. This is a
  required step before any release.

## Verification that does exist

- Each plugin package, `lumen-sdk`, `lumen-core`, `lumen-app`, `lumen-server` and `lumen-models`
  have test suites that run in CI, along with format, analyze or lint, and type checks.
- A content guard job rejects forbidden references and emoji in tracked files on every push.
- Every module's accent color is checked against WCAG non-text contrast by a test in `lumen-app`.

## Roadmap

See the [Roadmap](/docs/introduction/roadmap/) page for the ordered list of what comes next.
