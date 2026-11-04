---
title: "Running the app"
description: "How to run lumen-app locally, what you will see, and what is intentionally not there yet."
---

`lumen-app` is a standard Flutter application. It has no unusual setup beyond pinned git
dependencies.

## Prerequisites

- The [Flutter SDK](https://docs.flutter.dev/get-started/install), stable channel.
- A connected device, an emulator or simulator, or a Flutter desktop target.

## Run it

```bash
git clone https://github.com/lumen-assistive/lumen-app.git
cd lumen-app
flutter pub get
flutter run
```

## What you will see

1. **A short loading moment** with the brand mark in ink while the saved profile loads.
2. **Onboarding**: five questions with a progress bar. The first four are yes or no, the last
   chooses between a simple and a complete interface. See [Onboarding](/docs/app/onboarding/).
3. **The home screen**: a headline, then one solid colored tile per enabled module, two per row.
4. **A module screen**: tap a tile to open that module's tools. Each runs the package's real code on
   sample input. See the [module screens](/docs/app/overview/).
5. **Settings**: interface mode, text size, per-module enable and consent switches, an important
   notice, and a developer mode switch.

## Things that are deliberately not there

- **Persistence.** The app starts on `InMemoryAppDatabase`, so nothing you set survives a restart.
  The encrypted `SqlCipherAppDatabase` exists but needs a per-device passphrase source and a
  documents directory path before it can be wired in. See [Storage](/docs/app/storage/).
- **Live sensors.** Tools take pasted text or preset sample data, not camera, microphone or
  accelerometer input.
- **Real SMS.** The SOS tool counts down for five seconds and then reports a message ready to send
  through a fake sender. No message is ever sent.

## Running a single screen in tests

The widget tests build each screen inside a `MaterialApp` with the app's theme, the app strings
delegate and the Material localizations. See [Testing](/docs/getting-started/running-tests/) and the
screenshot capture test described in [Screenshots](/docs/design/screenshots/).

## If `flutter pub get` fails to resolve git dependencies

Make sure you have network access to GitHub and that the tags in `pubspec.yaml` still exist.
Tags are never force-moved once published, so a resolution failure is more likely a local network
or cache issue than a moved tag.
