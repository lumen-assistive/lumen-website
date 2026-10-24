---
title: Opening a pull request
description: What happens from opening a pull request to it being merged, and how CI is wired.
---

## Opening one

1. Fork the repository (or branch directly if you have write access) and create a branch named
   `type/short-description`, for example `fix/ocr-crash-on-empty-frame`.
2. Make your change, including tests, following
   [Workflow and conventions](/docs/contributing/workflow/).
3. Push and open a pull request against `main`, using the repository's pull request template.
   Describe what changed and why, and link the issue it closes if there is one.

## What runs automatically

Every repository's CI triggers on both `push` to `main` and on every `pull_request`. Two things
always run:

- The language-appropriate lint, format, analyze, and test commands (see
  [Running tests](/docs/getting-started/running-tests/)), via reusable workflows defined once in
  the [`.github`](https://github.com/lumen-assistive/.github) repository and called from every
  other repository, so CI configuration is maintained in one place.
- A content guard, grepping every tracked file for AI tool references, AI-attribution commit
  trailers, and emoji, failing the build if it finds any.

`lumen-plugins` additionally runs its Dart checks as a matrix, once per package
(`packages/vedere`, `packages/sentire`, `packages/protezione`, `packages/famiglia`, and any new
one you add), so a change to one package cannot accidentally break CI for another by sharing a
job.

## Automatic review assignment

Every repository has a `CODEOWNERS` file requesting review automatically when a pull request is
opened, regardless of branch protection settings. You do not need to manually request a reviewer.

## Getting merged

A pull request is merged once CI is green and the reviewer approves. For a new plugin specifically,
see the additional requirements in [Building a plugin](/docs/contributing/plugins/) — scope,
honesty about what is deferred, and depending only on `lumen_sdk` contracts are checked in review,
not just by CI.

## If CI fails

Read the actual failure log before guessing:

```bash
gh run list --repo lumen-assistive/<repo> --limit 1
gh run view <run-id> --repo lumen-assistive/<repo> --log-failed
```

The most common first-time failure is `dart format` disagreeing with how a file was hand-written;
run `dart format .` (or `flutter pub get` first for a Flutter project, since formatting can depend
on resolved package information) and commit the result.
