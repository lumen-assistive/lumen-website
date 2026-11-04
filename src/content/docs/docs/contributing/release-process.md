---
title: "Release process"
description: "How tags and versions are cut for each kind of repository, and what is not automated yet."
---

There is no automated release pipeline yet. Releases are manual, deliberate and tag based.

## Dart libraries (`lumen-sdk`, `lumen-core`)

1. Make sure CI is green on `main`.
2. Update `CHANGELOG.md` (Keep a Changelog format) and bump `version` in `pubspec.yaml`, following
   [Semantic Versioning](/docs/sdk/versioning/).
3. Commit, for example `chore: release 0.2.0`.
4. Tag the commit `vX.Y.Z` and push the tag.
5. Never move or delete a published tag.

Consumers pick up the new version by bumping their pinned `ref`.

## The plugins monorepo (`lumen-plugins`)

All packages are released together under one tag (for example `v0.3.0`). Each package keeps its own
`CHANGELOG.md`. Apps depend on the tag and a package `path`.

## The app (`lumen-app`)

The app is tagged for releases of the codebase (the latest is `v0.6.0`). Signed Android APKs are built
by hand and attached to the matching GitHub release together with a `SHA256SUMS.txt` file.

To build one, install the Android SDK and a JDK 17, then run `flutter build apk --release`, optionally
with `--split-per-abi`. Release signing reads `android/key.properties` (`storeFile`, `storePassword`,
`keyAlias`, `keyPassword`), which is ignored by git. Without it the build falls back to the debug key,
which is fine for local testing but cannot update an installed release. The signing key must be kept
backed up: if it is lost, users have to uninstall before installing a build signed with a new key.

There is no automated release workflow yet. If one is added, it needs these repository secrets:

| Secret | Purpose |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | The keystore, base64 encoded |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password |
| `ANDROID_KEY_ALIAS` | Key alias |
| `ANDROID_KEY_PASSWORD` | Key password |

and a workflow that builds, signs and uploads the artifact. Before any release, the manual accessibility
checks in [Manual testing](/docs/accessibility/manual-testing/) must be done.

## The server and models (Python)

`lumen-server` and `lumen-models` carry their version in `pyproject.toml` and a tag. The server is
deployed by whoever operates it; see [Configuration and deployment](/docs/server/deployment/).

## The website (`lumen-website`)

`package.json` and `CHANGELOG.md` carry the version, and a tag marks it. The site is built with
`npm run build`; a `vercel.json` is present but no deployment is configured by the repository.

## Release checklist

- [ ] CI is green on `main`
- [ ] Changelog updated and version bumped
- [ ] Documentation updated for the change
- [ ] Contract changes released before their consumers
- [ ] Tag pushed, and consumers' pins updated in separate commits
- [ ] After pushing, confirm the remote state (the log, the CI run and the tag), not just local success
