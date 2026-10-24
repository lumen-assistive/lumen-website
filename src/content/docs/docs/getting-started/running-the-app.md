---
title: Running the app
description: How to run lumen-app locally.
---

`lumen-app` is a standard Flutter application; it has no unusual setup beyond pinned git
dependencies on `lumen_sdk` and `lumen_core`.

## Prerequisites

- The [Flutter SDK](https://docs.flutter.dev/get-started/install), stable channel.
- A connected device, emulator, or simulator, or a desktop target enabled for Flutter.

## Run it

```bash
git clone https://github.com/lumen-assistive/lumen-app.git
cd lumen-app
flutter pub get
flutter run
```

## What you will see today

The onboarding flow, five questions, enables a combination of the four modules that actually have
code today (Vedere, Sentire, Protezione, Famiglia) and picks one of four UI modes. After
onboarding, the home screen lists whichever modules you enabled, generically: it shows a name and a
status line, not a feature screen, since no plugin ships Flutter UI yet. Settings lets you change
UI mode, text scale, per-module consent, and reach a developer diagnostics screen.

Nothing you do persists across a restart yet: `lumen-app` runs on an in-memory database by default.
A production-ready `SqlCipherAppDatabase` implementation exists in the codebase but is not wired
into `main()` yet, since it needs a per-device passphrase source and a real documents directory
path, neither of which is a dependency of the app yet. See that repository's README for the exact,
current list of what is deferred.

## If `flutter pub get` fails to resolve git dependencies

Make sure you have network access to GitHub and that the tags referenced in `pubspec.yaml`
(`v0.1.0` as of this writing) still exist. Tags are never force-moved once published; if resolution
fails, it is more likely a local network or cache issue than a moved tag.
