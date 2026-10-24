---
title: Workflow and conventions
description: Commit style, hooks, and code standards shared across every Lumen repository.
---

These conventions are the same in every repository in the organization.

## Commits

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), in English, as small
atomic units: `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`, and so on. Install the shared hook
once per clone:

```bash
git config core.hooksPath .githooks
```

It rejects any commit message containing an attribution trailer for an AI coding tool, or naming
one directly. This is not a style preference. No commit, pull request, issue, or line of code or
documentation in this organization references an AI coding tool, anywhere, ever (including this
page, which deliberately does not name any, to stay consistent with its own rule). CI runs the
same check server-side on every push and pull request, since git hooks are client-side only and
can be bypassed locally.

## Code standards

- All code, identifiers, comments, commit messages, branch names, and documentation are written in
  English. The app's user interface is localized separately, Italian first, English second.
- Comments explain intent, constraints, and non-obvious decisions, not what the code already says.
  No commented-out code, no `TODO` or `FIXME` markers; open an issue instead.
- Public APIs have complete documentation comments in the language's idiomatic format (Dart `///`,
  Python docstrings).
- No emoji, anywhere: code, commits, documentation, logs, or the application's interface.
- No fabricated APIs, libraries, model names, datasets, statistics, user tests, or partnerships,
  anywhere. If something is not real yet, the documentation says so plainly.

## Accessibility and privacy are not optional

Any user-facing change must keep screen reader labels, sufficient contrast, adequate touch target
size, and voice reachability intact. Any change touching a sensor, a model download, or sharing
data must preserve on-device processing by default and explicit, revocable consent for anything
that is not.

## Before sending a pull request

Run that repository's lint, format, analyze, and test commands locally, see
[Running tests](/docs/getting-started/running-tests/) for the exact commands per language. CI runs
the same commands on every push and pull request.

## Review

Every pull request gets an automatic review request through each repository's `CODEOWNERS` file.
See [Opening a pull request](/docs/contributing/pull-requests/) for what happens after that.

## Reporting a security issue

Do not open a public issue for a security vulnerability. Use GitHub's private vulnerability
reporting on the affected repository (repository page, "Security" tab, "Report a vulnerability").
