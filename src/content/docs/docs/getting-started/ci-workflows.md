---
title: "CI workflows"
description: "The shared GitHub Actions workflows every repository uses, and what each one checks."
---

Continuous integration is defined once in the `.github` repository as reusable workflows, and each
repository calls them. This keeps every repository to the same bar.

## Reusable Dart CI

`reusable-dart-ci.yml` takes these inputs:

| Input | Default | Meaning |
|---|---|---|
| `working-directory` | `.` | Directory containing the package |
| `target` | `dart` | `dart` for a pure Dart package, `flutter` for a Flutter package |
| `flutter-version` | empty | Exact Flutter version, or empty for the latest stable |
| `dart-version` | `stable` | Dart SDK for the `dart` target |
| `run-build-runner` | `false` | Run `build_runner` before analysis |

Steps, in order: checkout, set up Flutter or Dart, `pub get`, optional `build_runner`,
`dart format --output=none --set-exit-if-changed .`, analyze with `--fatal-infos`, then
`flutter test --coverage` or `dart test`.

## Reusable Python CI

`reusable-python-ci.yml` takes `working-directory` and `python-version` (default `3.12`). It
installs the project with `pip install -e .[dev]` and runs `ruff check`, `ruff format --check`,
`mypy` and `pytest --cov`.

## Reusable content guard

`reusable-content-guard.yml` runs on every push and pull request as a server side backstop for the
client side commit hook. It greps tracked files and fails the job if it finds:

- a forbidden AI tool reference or an attribution trailer, or
- an emoji.

One tool name is matched case sensitively, because matching it case insensitively collides with the
ordinary English word that appears, for example, in the CSS `cursor` property.

## How repositories call them

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  flutter-ci:
    uses: lumen-assistive/.github/.github/workflows/reusable-dart-ci.yml@main
    with:
      working-directory: "."
      target: "flutter"

  content-guard:
    uses: lumen-assistive/.github/.github/workflows/reusable-content-guard.yml@main
```

| Repository | Jobs |
|---|---|
| `lumen-sdk`, `lumen-core` | Dart CI, content guard |
| `lumen-app` | Flutter CI, content guard |
| `lumen-plugins` | Dart CI as a matrix over `vision`, `hearing`, `safety`, `family`, `speech`, `reading`, `memory`, `mobility`, plus content guard |
| `lumen-server`, `lumen-models` | Python CI, content guard |
| `lumen-website` | Node 24 `npm ci` and `npm run build`, plus content guard |

## Matrix behavior in `lumen-plugins`

The matrix uses `fail-fast: false`, so one failing package does not hide the others. Each package
runs from `packages/<name>`.

## Reproducing CI locally

Run the same commands CI runs. They are listed in
[Running tests](/docs/getting-started/running-tests/). A failure that appears only in CI is most
often formatting, because `dart format` output depends on a resolved package configuration.
