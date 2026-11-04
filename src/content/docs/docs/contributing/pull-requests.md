---
title: "Opening a pull request"
description: "What happens from opening a pull request to it being merged, and how CI is wired."
---

## Opening one

1. Fork the repository (or branch directly if you have write access) and create a branch named
   `type/short-description`.
2. Make your change, including tests, following [Workflow and conventions](/docs/contributing/workflow/).
3. Push and open a pull request against `main`, using the repository's template. Describe what changed
   and why, and link the issue it closes if there is one.

## Pull request checklist

- [ ] The change is focused and described
- [ ] Tests cover the behavior, including failure paths
- [ ] Format, analyze or lint, and tests pass locally
- [ ] No emoji, no AI tool references, English only
- [ ] Documentation and the changelog are updated where relevant
- [ ] Accessibility and privacy rules are respected
- [ ] For a new plugin: `plugin.json` and `icon.svg` are included, and the preview image from the
  [Icon Studio](/plugins/icon-studio/) is pasted in the description

## What runs automatically

Every repository's CI triggers on `push` to `main` and on every `pull_request`. Two things always run:

- The language appropriate lint, format, analyze and test commands, through the reusable workflows
  described in [CI workflows](/docs/getting-started/ci-workflows/).
- A content guard that greps tracked files for AI tool references, attribution trailers and emoji, and
  fails the build if it finds any.

`lumen-plugins` additionally runs its Dart checks as a matrix, once per package, so a change to one
package cannot hide a failure in another.

## Automatic review assignment

Every repository has a `CODEOWNERS` file requesting review automatically when a pull request is opened.
You do not need to request a reviewer manually.

## Getting merged

A pull request is merged once CI is green and the reviewer approves. A new plugin has additional
requirements, covered in [Building a plugin](/docs/contributing/plugins/): scope, honesty about what is
deferred, and depending only on `lumen_sdk` contracts are checked in review, not just by CI.

## If CI fails

Read the actual failure log before guessing:

```bash
gh run list --repo lumen-assistive/<repo> --limit 1
gh run view <run-id> --repo lumen-assistive/<repo> --log-failed
```

The most common first time failure is `dart format` disagreeing with how a file was written. Run
`dart format .` (after `flutter pub get` in a Flutter project, since formatting can depend on resolved
package information) and commit the result.

## Changes that span repositories

Contract changes land in the dependency first, are tagged, and are then consumed in a second pull
request that bumps the pinned `ref`. Never point a consumer at an unmerged branch.
