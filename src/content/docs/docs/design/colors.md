---
title: "Colors"
description: "Every color in AppColors with its hex value, role and contrast guarantee."
---

All colors are constants in `AppColors` (`lib/src/theme/app_colors.dart`).

## Paper and ink

| Name | Hex | Role |
|---|---|---|
| `background` | `#F3EEE3` | The page: warm off-white paper |
| `surface` | `#FFFCF5` | Cards, inputs, secondary buttons: slightly lighter than the page so they lift off it without a shadow |
| `ink` | `#1A1815` | Primary text, icons and every structural outline: warm near-black |
| `muted` | `#5B554A` | Secondary text. Passes WCAG AA (4.5:1) on the page and on `surface` |
| `hairline` | `#D3CBB8` | Quiet dividers and the note box border, for lines that must not compete with the ink outlines |

## Brand yellow

| Name | Hex | Role |
|---|---|---|
| `amber` | `#F2B138` | The brand yellow: the track of a switched-on switch outside a module, the last onboarding badge and the warning block. Always a fill with `ink` on top, never used as text |

## State color

| Name | Hex | Role |
|---|---|---|
| `critical` | `#C1272D` | Urgent states (falls, SOS). Passes WCAG AA as text on the page. Kept distinct from every module fill |

## Module colors

See [Module colors](/docs/design/module-colors/).

## Contrast guarantees

Asserted in `test/theme/app_colors_test.dart` using the real `ContrastChecker` from
`lumen_plugin_vision`:

| Pair | Requirement |
|---|---|
| `ink` on `background` and on `surface` | WCAG AAA (7:1) |
| `muted` on `background` and on `surface` | WCAG AA (4.5:1) |
| `critical` on `background` | WCAG AA (4.5:1) |
| `ink` on every module fill and on `amber` | WCAG AAA (7:1) |

The test also checks that an unknown module id falls back to the brand yellow.

## Using colors

- Text is `ink`, or `muted` for secondary text, never for essential information.
- A module's screen takes its color from the theme's `secondary` (set by `ModuleScope`), not from a
  constant, so shared widgets recolor automatically.
- Put only `ink` on a module fill.
- Do not use `critical` for decoration.
- When adding a color, add a test that checks its contrast against what it sits on.

## Why one light theme

A single theme keeps every verified color pair valid in every place the color appears. The pairs above
already sit at AAA for text, so the high contrast tiers do not need a different palette; they enlarge
the text instead (see [UI modes](/docs/app/ui-modes/)).
