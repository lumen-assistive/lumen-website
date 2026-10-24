---
title: Running tests
description: How to run the test suite in each kind of Lumen repository.
---

Every repository runs the same checks locally and in CI; CI is the authoritative signal, since not
every contributor's machine has every toolchain installed.

## Dart packages (`lumen-sdk`, `lumen-core`, each package in `lumen-plugins`)

```bash
dart pub get
dart format --output=none --set-exit-if-changed .
dart analyze --fatal-infos
dart test
```

In `lumen-plugins`, run these from inside the specific package directory you changed
(`packages/<name>`), since each package is independent.

## The Flutter app (`lumen-app`)

```bash
flutter pub get
flutter analyze --fatal-infos
flutter test
```

## Python repositories (`lumen-server`, `lumen-models`)

```bash
python -m venv .venv
source .venv/bin/activate   # .venv\Scripts\activate on Windows
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

## Before committing, in any repository

Install the shared commit message hook once per clone:

```bash
git config core.hooksPath .githooks
```

It rejects any commit message mentioning an AI coding tool or containing an attribution trailer for
one. CI additionally runs a content guard on every push and pull request, grepping
tracked files for the same patterns plus emoji, as a server-side backstop since git hooks are
client-side only.
