---
title: "Colors"
description: "Every color in AppColors with its hex value, role and contrast guarantee."
---

All colors are constants in `AppColors` (`lib/src/theme/app_colors.dart`).

## Surfaces and text

| Name | Hex | Role |
|---|---|---|
| `background` | `#0D0B08` | The app's one page color: deep warm near-black |
| `surface` | `#17140F` | A slightly raised surface for cards and result boxes |
| `surfaceRaised` | `#221E16` | One step above `surface`, for inputs, chips and secondary buttons. A fill only, never text, so it has no contrast requirement |
| `text` | `#F3EFE2` | Primary text and icons: warm off-white, never pure white |
| `muted` | `#B7AE99` | Secondary text |
| `border` | `#3A3424` | Hairline borders |

## Brand accent

| Name | Hex | Role |
|---|---|---|
| `amber` | `#E3A94A` | Buttons, links, small marks |
| `glow` | `#F5B942` | A brighter, more saturated amber reserved for large soft glows and blurs. At a large size the lower saturation of `amber` reads as muddy, so the two are kept distinct |
| `amberHighContrast` | `#F2C878` | The accent for the high contrast tiers, brightened to clear WCAG AAA |

## State colors

| Name | Hex | Role |
|---|---|---|
| `critical` | `#E5484D` | Urgent states (falls, SOS). Kept distinct from every module color so an urgent state is never mistaken for routine identity |
| `warning` | `#E8A33D` | Cautionary notices, between informational and critical |

## Module colors

See [Module colors](/docs/design/module-colors/).

## Contrast guarantees

These are asserted in `test/theme/app_colors_test.dart` using the real `ContrastChecker` from
`lumen_plugin_vision`:

| Pair | Requirement |
|---|---|
| `amber` on `background` | WCAG AAA (7:1) |
| `amberHighContrast` on `background` | WCAG AAA (7:1) |
| `text` on `background` and on `surface` | WCAG AAA (7:1) |
| Each module color on `background` and on `surface` | At least 3:1 (WCAG non-text contrast) |

The test also checks that an unknown module id falls back to the brand accent.

## Using colors

- Take the accent from the theme (`colorScheme.primary`), not from a constant, so module screens
  recolor automatically.
- Use `muted` for secondary text and never for essential information.
- Do not use `critical` for decoration.
- When adding a color, add a test that checks its contrast against the surfaces it sits on.

## Why no light theme

A single dark theme keeps every verified color pair valid in every place the color appears. The
high contrast tier uses a brighter accent, not a light surface.
