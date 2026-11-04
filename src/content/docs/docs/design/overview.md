---
title: "Design system overview"
description: "The visual language of the Lumen app: flat paper and ink, one solid color per module, ink outlines instead of shadows."
---

The app has a single design language, implemented in `lib/src/theme/` and `lib/src/modules/widgets/`.

## The idea

Paper and ink. The page is warm off-white paper, text and structure are near-black ink, and each of the
eight modules owns one solid, flat color. There are no gradients, glows, shadows or translucent tints
anywhere. Edges are drawn with a 2 pixel ink outline and meaning is carried by large blocks of a single
color, which keeps shapes crisp for people with low vision and keeps every text pairing at a high,
easily verified contrast ratio.

## Principles

| Principle | In practice |
|---|---|
| Light, flat | One theme, forced light. No elevation, no shadows, no gradients, no translucency |
| Ink outlines | Cards, tiles, buttons and badges are outlined in ink, 2 pixels wide (`AppTheme.outlineWidth`) |
| One color per module | Each module has a solid fill, used for its home tile, header block, accent square and result blocks |
| Ink on color | Text and icons on a module fill are always ink, at WCAG AAA contrast |
| Poster typography | Large, bold, tightly tracked headlines in Atkinson Hyperlegible |
| Legible first | Scalable text, 48 pixel minimum targets, checked contrast |

## Where it lives

| File | Contents |
|---|---|
| `theme/app_colors.dart` | The palette, see [Colors](/docs/design/colors/) |
| `theme/app_theme.dart` | `AppTheme.resolve(uiMode)`: text, buttons, inputs, chips, switches, slider |
| `theme/module_scope.dart` | Gives a module's screen its color as the scheme's `secondary` |
| `theme/ui_mode.dart` | The four [UI modes](/docs/app/ui-modes/) |
| `theme/logo_mark.dart` | The brand mark as a vector drawing |
| `theme/module_icon.dart` | The eight module line icons as vector drawings |
| `theme/fade_slide_in.dart` | The one entrance animation |
| `modules/widgets/` | [Components](/docs/design/components/) |

## Brand mark

The mark is an open circular arc (a small light): a stroked arc of radius 16 on a 48 unit canvas,
starting at (33.2, 10.9) and ending at (14.8, 10.9), drawn as a vector so it scales cleanly. In the app
it is drawn in ink on paper (the wordmark row on the home screen, the onboarding header, the loading
screen) and in ink on the brand yellow for the last onboarding question.

## Module icons

Each module has an original stroke icon on a 24 by 24 canvas with a stroke width of 1.6 and round caps
and joins, drawn in code rather than as bundled images. Vision is an eye, Hearing is sound bars, Safety
is a shield, Family is two people, Speech is a speech bubble, Reading is an open book, Memory is a clock
and Mobility is two footprints.

## The website

The marketing site keeps its own dark identity. The `/demo/` page reproduces the app's real, light
design inside a phone frame, so what the demo shows is what the app looks like.

## Related

[Colors](/docs/design/colors/), [Typography](/docs/design/typography/),
[Module colors](/docs/design/module-colors/), [Components](/docs/design/components/),
[Layout, shape and motion](/docs/design/layout-and-motion/), [Accessibility targets](/docs/design/accessibility-targets/).
