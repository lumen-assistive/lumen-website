---
title: "Code style"
description: "The concrete style rules for Dart, Python and the website, with examples of good and bad comments."
---

## Everywhere

- English only for identifiers, comments, docs, commits and logs.
- No emoji. No em dashes in documentation or comments; use a comma, colon or full stop.
- No commented out code, no `TODO` or `FIXME`.
- Keep files focused: one clear responsibility each.
- Prefer clear names over comments that explain unclear names.

## Comments

A comment earns its place by explaining why, intent, a constraint, an edge case or a non-obvious
decision. It never narrates what the code plainly does.

Good:

```dart
// DateTime silently rolls an out-of-range day into the next month (for example day 31 of a
// 30 day month); reject that rather than returning a date that was never actually printed.
if (date.year != year || date.month != month || date.day != day) return null;
```

Bad:

```dart
// Check the year, month and day.
if (date.year != year || date.month != month || date.day != day) return null;
```

## Dart

- Format with `dart format` and keep `dart analyze --fatal-infos` clean. CI fails otherwise.
- Public classes and members get `///` documentation comments: what it is, parameters and behavior,
  and notable errors.
- Prefer `const` constructors and `final` fields. Mark value types `@immutable`.
- Make time and randomness injectable (`DateTime Function() now`, `Random`) so tests are
  deterministic.
- Return validation errors or throw a specific error type; do not use bare strings.
- Use `StateError` for misuse of an object's state and `ArgumentError` for a bad argument.
- Library files export a barrel; implementation lives under `lib/src/`.

In Flutter code:

- Take colors from the theme or from `AppColors`, not literals.
- Take text from `AppStrings`, not literals.
- Build module screens from `ModuleHeader`, `ModuleNote` and `ToolCard`.
- Give icon only buttons a `Semantics` label.
- Let text wrap and scroll; never assume a fixed height.

## Python

- `ruff` with a line length of 100 and the rules `E`, `F`, `I` and `UP`.
- `mypy` with `disallow_untyped_defs`: every function is annotated.
- Docstrings on modules, classes and public functions that explain behavior and guarantees.
- Use `dataclass(frozen=True, slots=True)` for plain value records.

## Website (Astro and Starlight)

- Docs pages are Markdown under `src/content/docs/docs/` with `title` and `description` frontmatter.
- Add every new page to the sidebar in `astro.config.mjs`.
- Link to other docs pages with absolute paths ending in a slash, for example
  `/docs/sdk/event-bus/`.
- Keep the content honest: state what is not implemented.

## Tests

- Test behavior, not construction. Cover failure paths (invalid input, denied consent) as well as
  success.
- Make tests deterministic: inject clocks and randomness.
- Name tests as sentences describing the behavior.
- Do not write a test that passes only because nothing was asserted.
