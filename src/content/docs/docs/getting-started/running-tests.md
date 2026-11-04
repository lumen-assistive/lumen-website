---
title: "Running tests"
description: "How to run the test suite in each kind of Lumen repository, and what each suite covers."
---

Every repository runs the same checks locally and in CI. CI is the authoritative signal, since not
every contributor's machine has every toolchain.

## Dart packages (`lumen-sdk`, `lumen-core`, each package in `lumen-plugins`)

```bash
dart pub get
dart format --output=none --set-exit-if-changed .
dart analyze --fatal-infos
dart test
```

In `lumen-plugins`, run these from inside the package directory you changed (`packages/<name>`).

## The Flutter app (`lumen-app`)

```bash
flutter pub get
flutter analyze --fatal-infos
flutter test
```

CI runs `flutter test --coverage`.

## Python repositories (`lumen-server`, `lumen-models`)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
ruff check .
ruff format --check .
mypy .
pytest --cov
```

## The website (this repository)

```bash
npm ci
npm run build
```

## What the suites cover

| Suite | Covers |
|---|---|
| `lumen-sdk` | Contract behavior, fakes, the runnable example plugin |
| `lumen-core` | `InMemoryEventBus`, `LocalModelRegistry` (download, reference counting, failure cleanup), `PluginManager` (registration, compatibility, capability gating, lifecycle) |
| each plugin package | Pure logic: parsers, schedulers, state machines, validators, consent gating |
| `lumen-app` | One widget test per module screen, onboarding, home navigation, settings, storage repositories, consent store and capability gate, and WCAG contrast checks of the accent, text and module colors |
| `lumen-server` | Health, pairing, blobs (including auth and base64 validation), model catalog |
| `lumen-models` | Catalog, license gate, conversion pipeline, benchmark runner, CLI |

## How widget tests are written

Module screen tests pump the screen in a `MaterialApp` with the app theme and localizations, tap a
real button, and assert on the real output. Because module screens are long scrolling lists that
build lazily, tests enlarge the test surface and scroll to a control before tapping it:

```dart
tester.view.physicalSize = const Size(2400, 7200);
addTearDown(tester.view.resetPhysicalSize);
await tester.pumpWidget(_wrap(const VisionScreen()));
await tester.pumpAndSettle();
await tester.ensureVisible(find.text('Find the expiry date'));
await tester.tap(find.text('Find the expiry date'));
```

`ensureVisible` only works on an element that is already built; for a control far below the fold,
use `scrollUntilVisible` with the first `Scrollable`, since every `TextField` also owns an internal
scrollable.

## What is not tested

`SqlCipherAppDatabase` is not exercised by the test suite: `flutter test` runs on a host with no
platform channel, and the encrypted database needs a real device, emulator or desktop runtime.
It is verified through `InMemoryAppDatabase` in tests instead, and end to end verification on a
device has not been done. Manual TalkBack and VoiceOver testing has not been done either.

## Before committing

Run the repository's checks, and make sure the commit hook is enabled (see
[Development setup](/docs/getting-started/development-setup/)).
