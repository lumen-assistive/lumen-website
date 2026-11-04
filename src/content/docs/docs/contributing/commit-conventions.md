---
title: "Commit conventions"
description: "Conventional Commits as used in Lumen: types, scopes, message style and examples."
---

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), written in English, as
small atomic units: one logical change per commit.

## Format

```
type: short imperative summary in lower case

Optional body explaining why the change was made and anything
non-obvious about how, wrapped at a readable width.
```

The summary is imperative ("add", "fix", "remove"), has no trailing full stop, and says what the
commit does.

## Types

| Type | Use |
|---|---|
| `feat` | A new capability or visible change |
| `fix` | A bug fix |
| `docs` | Documentation only |
| `style` | Formatting with no behavior change (for example applying `dart format`) |
| `refactor` | A change that neither fixes a bug nor adds a feature |
| `test` | Adding or changing tests only |
| `chore` | Tooling, dependencies, maintenance |
| `ci` | Continuous integration configuration |

## Examples from the project

```
feat: redesign the app with module banners, tinted cards and a branded home
fix: reject out-of-range days instead of rolling them into the next month
docs: expand the documentation into a full reference
style: apply dart format to the previous commit's test file
chore: pin lumen-plugins dependencies to v0.3.0
```

## Rules

- One logical change per commit. A change that touches a contract and a consumer is two commits in two
  repositories.
- Do not mix formatting changes with behavior changes.
- The body explains why. The diff already shows what.
- Never reference an AI coding tool or include an attribution trailer for one. The commit hook rejects
  such messages, and CI repeats the check.
- No emoji.

## Before committing

```bash
git add path/to/file another/file      # stage explicitly
git diff --cached --name-only           # review what is staged
git commit
```

Check the message before confirming. If the hook rejects it, rewrite the message; do not bypass the
hook.

## Version bumps

A release changes `pubspec.yaml` or `package.json`, `CHANGELOG.md` and a tag, usually in a dedicated
`chore` commit. See [Release process](/docs/contributing/release-process/).
