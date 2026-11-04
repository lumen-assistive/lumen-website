---
title: "Development setup"
description: "Install the toolchains for each kind of Lumen repository and verify your environment."
---

Lumen spans four stacks. You only need the toolchain for the repository you work on.

| You want to work on | You need |
|---|---|
| `lumen-sdk`, `lumen-core`, a plugin package | Dart SDK 3.5 or newer |
| `lumen-app` | Flutter SDK (stable) |
| `lumen-server`, `lumen-models` | Python 3.12 or newer |
| `lumen-website` | Node.js (CI uses 24) |

## Git and the commit hook

Every repository ships a shared `commit-msg` hook. Enable it once per clone:

```bash
git config core.hooksPath .githooks
```

The hook rejects commit messages that reference AI coding tools or carry an attribution trailer for
one. On a system where the hook is not marked executable, git prints a hint and skips it; mark it
executable (`chmod +x .githooks/commit-msg`) so it runs. CI repeats the check server side.

## Dart (SDK, core, plugins)

Install the [Dart SDK](https://dart.dev/get-dart). Then, inside the package directory:

```bash
dart pub get
dart format --output=none --set-exit-if-changed .
dart analyze --fatal-infos
dart test
```

In `lumen-plugins`, run these inside `packages/<name>`: each package is independent.

## Flutter (the app)

Install the [Flutter SDK](https://docs.flutter.dev/get-started/install) on the stable channel. The
app requires Dart `^3.5.0` and Flutter `>=3.24.0`. Then:

```bash
flutter pub get
flutter analyze --fatal-infos
flutter test
```

Run `flutter pub get` at least once before using `dart format` on the app. Without a resolved
package configuration, `dart format` can apply different rules than CI and report spurious
differences.

If your Flutter SDK came from a zip archive instead of a git checkout, its own wrapper scripts call
`git` on the SDK directory and fail without one. Initializing a git repository with a single empty
commit in the SDK directory satisfies them.

## Python (server, models)

```bash
python -m venv .venv
source .venv/bin/activate        # .venv\Scripts\activate on Windows
pip install -e .[dev]
ruff check .
ruff format --check .
mypy .
pytest --cov
```

Both repositories use `ruff` with a line length of 100 and `mypy` with `disallow_untyped_defs`.

## Node (the website)

```bash
npm ci
npm run build
```

The build produces the Starlight documentation search index (Pagefind) as its last step. If
`npm ci` reports that the lock file is out of sync, regenerate it on the platform you build on and
verify with a clean `npm ci` before committing.

## Verifying your environment

| Check | Command | Expected |
|---|---|---|
| Dart works | `dart --version` | A 3.5 or newer version string |
| Flutter works | `flutter --version` | A stable channel version |
| Python works | `python --version` | 3.12 or newer |
| The app compiles | `flutter analyze` in `lumen-app` | `No issues found!` |
| A package passes | `dart test` in `packages/vision` | `All tests passed!` |

## Editor tips

- Use the Dart and Flutter extensions for your editor so analysis errors show inline.
- Set format on save to the Dart formatter. CI fails on unformatted code.
- Treat analyzer infos as errors locally, as CI does (`--fatal-infos`).

If something does not work, see [Troubleshooting](/docs/reference/troubleshooting/).
