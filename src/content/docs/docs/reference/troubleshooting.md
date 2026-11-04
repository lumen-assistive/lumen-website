---
title: "Troubleshooting"
description: "Common problems when building, testing and running Lumen, with their causes and fixes."
---

## `flutter pub get` cannot resolve a git dependency

Check network access to GitHub and that the tag in `pubspec.yaml` exists. Tags are never force moved, so
the cause is almost always local network or a stale cache. Try `flutter pub cache repair`, then retry.

## `dart format` reports differences in CI but not locally

Formatting can depend on the resolved package configuration. Run `flutter pub get` (or `dart pub get`)
first, then format. Use the same SDK version as CI.

## A Flutter SDK from a zip archive fails to start

The wrapper scripts call `git` on the SDK directory. Initialize a git repository with one empty commit in
the SDK directory so those commands succeed.

## `flutter analyze --fatal-infos` fails on a style info

CI treats infos as errors. Fix the reported item (commonly a missing `const`). Do not suppress it without
a reason.

## A widget test cannot find a button

Module screens are long lists that build lazily. A control below the viewport does not exist in the tree
until it is scrolled into view. Enlarge the test surface, or use `scrollUntilVisible` with the first
`Scrollable`. `ensureVisible` only works on an element that is already built.

```dart
tester.view.physicalSize = const Size(2400, 7200);
addTearDown(tester.view.resetPhysicalSize);
```

## A test finds a widget twice

A `TextField` also contains an editable text widget that matches `find.textContaining`. Make the match
more specific (for example include a prefix that only the result has) or narrow with `findRichText` or a
type.

## Text shows as boxes in a screenshot test

The test harness renders with a placeholder font by default. Load the real fonts with `loadAppFonts()`
before capturing. See [Screenshots](/docs/design/screenshots/).

## A screenshot capture test hangs

`RenderRepaintBoundary.toImage()` must run inside `tester.runAsync`, not in the fake async zone.

## `PluginCompatibilityError` when registering a plugin

The plugin's `sdkConstraint` does not allow the SDK version the engine was built with. Align the
`lumen_sdk` pin and the manifest constraint. See [Errors and states](/docs/core/errors/).

## `enable` throws about a capability

A capability in the plugin's manifest is not granted. Have the app request the permission and grant it in
the `CapabilityGate`, then retry.

## `acquire` throws that a model is not downloaded

Call `ensureDownloaded` first, and make sure a `ModelDownloader` was passed to the registry. No model
exists yet.

## My settings disappear on restart

Since v0.6.0 they should persist. If they do not, the Android keystore may have failed and the app fell back to memory. Also uninstall 0.5.0 before installing 0.6.0. See [Storage](/docs/app/storage/).

## The commit hook is ignored

Git prints that the hook is not executable. Run `chmod +x .githooks/commit-msg`, and make sure
`git config core.hooksPath .githooks` was run in that clone.

## The commit hook rejects my message

The message names or credits an AI tool, or contains an attribution trailer. Rewrite it. The hook is not
to be bypassed.

## The content guard fails in CI

It found a forbidden reference or an emoji in a tracked file. The job log lists the file and line. Remove
it; do not add exclusions.

## `npm ci` fails with a lock file mismatch

The lock file is out of sync with `package.json`, often because it was generated on a different
operating system (optional native dependencies differ). Regenerate it with a clean install on your
platform and verify with `npm ci` before committing.

## `npm run build` fails on a docs page

Check the page's frontmatter (`title` and `description` are required) and that every sidebar slug in
`astro.config.mjs` has a matching file.

## The server cannot reach PostgreSQL in Docker Compose

Wait for the `db` health check to pass, and apply migrations once with
`docker compose exec app alembic upgrade head`.

## A server request returns 401

The bearer token is missing or unknown. Pair a device first to obtain one. See
[Authentication](/docs/server/authentication/).

## Still stuck

Open an issue in the affected repository with what you ran, what you expected and the exact error.
