---
title: "Command cheat sheet"
description: "Every command you need across the Lumen repositories, in one place."
---

## Workspace

```bash
for repo in .github lumen-sdk lumen-core lumen-app lumen-plugins lumen-server lumen-models lumen-website; do
  gh repo clone "lumen-assistive/$repo"
done
git config core.hooksPath .githooks       # once per clone
```

## Dart packages (sdk, core, a plugin package)

```bash
dart pub get
dart format --output=none --set-exit-if-changed .
dart format .                             # apply formatting
dart analyze --fatal-infos
dart test
dart run example/example_plugin.dart      # lumen-sdk example
```

## Flutter app

```bash
flutter pub get
flutter run
flutter analyze --fatal-infos
flutter test
flutter test test/modules/vision_screen_test.dart
flutter test test/screenshots             # regenerate screenshots
```

## Python repositories

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
ruff check .
ruff format --check .
mypy .
pytest --cov
```

## Server

```bash
docker compose up --build
docker compose exec app alembic upgrade head
alembic downgrade base
uvicorn app.main:app --reload
```

## Models

```bash
lumen-models check-licenses
lumen-models render-benchmarks
```

## Website

```bash
npm ci
npm run dev
npm run build
```

## CI inspection

```bash
gh run list --repo lumen-assistive/<repo> --limit 1
gh run view <run-id> --repo lumen-assistive/<repo> --log-failed
```

## Release

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
git ls-remote --tags origin               # confirm the tag exists on the remote
```
