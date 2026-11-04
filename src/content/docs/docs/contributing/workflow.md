---
title: "Workflow and conventions"
description: "Commit style, hooks and code standards shared across every Lumen repository."
---

These conventions are the same in every repository in the organization.

## Branching

Branch from `main` with a name of the form `type/short-description`, for example
`fix/ocr-crash-on-empty-frame` or `feat/accelerometer-event`. Use the same types as commits.

## Commits

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), in English, as small
atomic units. See [Commit conventions](/docs/contributing/commit-conventions/) for the types and
examples. Install the shared hook once per clone:

```bash
git config core.hooksPath .githooks
```

It rejects any commit message that contains an attribution trailer for an AI coding tool, or names
one directly. This is not a style preference. No commit, pull request, issue, or line of code or
documentation in this organization references an AI coding tool, anywhere. This page deliberately
does not name any, to stay consistent with its own rule. CI runs the same check on every push and pull
request, since git hooks are client side only and can be bypassed locally.

Stage files explicitly (`git add <paths>`) and review `git diff --cached --name-only` before every
commit, so nothing unintended is included.

## Code standards

See [Code style](/docs/contributing/code-style/) for the details. In short:

- All code, identifiers, comments, commit messages, branch names and documentation are in English.
  The app's user interface strings live in one localization file and are English only today.
- Comments explain intent, constraints and non-obvious decisions, not what the code already says. No
  commented out code, no `TODO` or `FIXME` markers: open an issue instead.
- Public APIs have complete documentation comments in the language's idiomatic format.
- No emoji, anywhere: code, commits, documentation, logs or the application's interface.
- No fabricated APIs, libraries, model names, datasets, statistics, user tests or partnerships. If
  something is not real yet, the documentation says so plainly.
- Write complete, working code: no stubs, no placeholders, no "to be implemented".

## Accessibility and privacy are not optional

Any user facing change must keep screen reader labels, sufficient contrast, adequate touch target size
and voice reachability intact. Any change touching a sensor, a model download or sharing data must
preserve on-device processing by default and explicit, revocable consent for anything that is not.

## Dependencies

Do not add a dependency, tool, model or library that is not already referenced in the target
repository's documentation without first discussing it in an issue. Every added model needs a verified
ledger entry first, see the [license ledger](/docs/models/license-ledger/).

## Before sending a pull request

Run that repository's lint, format, analyze and test commands locally. See
[Running tests](/docs/getting-started/running-tests/). CI runs the same on every push and pull
request.

## Review

Every pull request gets an automatic review request through each repository's `CODEOWNERS` file. See
[Opening a pull request](/docs/contributing/pull-requests/).

## Reporting a security issue

Do not open a public issue for a security vulnerability. Use the private reporting process described in
the affected repository's `SECURITY.md`.
