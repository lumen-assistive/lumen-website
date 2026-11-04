---
title: "Design system overview"
description: "The visual language of the Lumen app: dark and warm, flat and bordered, with one accent and one color per module."
---

The app has a single design language, implemented in `lib/src/theme/` and `lib/src/modules/widgets/`.

## The idea

"Lumen" means light. The product is a warm glow against near-black. One amber brand accent carries
actions and links. Each module additionally has its own signature color, used for its badge, its glow
and the controls on its own screen, so eight modules read as eight distinct places instead of one
repeated accent.

## Principles

| Principle | In practice |
|---|---|
| Dark only | One theme, forced dark. Every color pair is verified once |
| Warm neutrals | Near-black with a brown tint, off-white text rather than pure white, to avoid glare |
| Flat, bordered | No card elevation or generic shadows. Definition comes from a hairline border or a deliberate glow |
| One accent, many module colors | Amber for brand and primary actions, module colors for module identity |
| Large, round, calm | Pill buttons, large radii, generous spacing, short motion |
| Legible first | Atkinson Hyperlegible, scalable text, 48 pixel minimum targets, checked contrast |

## Where it lives

| File | Contents |
|---|---|
| `theme/app_colors.dart` | The palette, see [Colors](/docs/design/colors/) |
| `theme/app_theme.dart` | `AppTheme.resolve(uiMode)`: text, buttons, inputs, chips, switches |
| `theme/module_scope.dart` | Re-themes a module's screen with its color |
| `theme/ui_mode.dart` | The four [UI modes](/docs/app/ui-modes/) |
| `theme/logo_mark.dart` | The brand mark as a vector drawing |
| `theme/module_icon.dart` | The eight module line icons as vector drawings |
| `modules/widgets/` | [Components](/docs/design/components/) |

## Brand mark

The mark is an open circular arc (a small light): a stroked arc of radius 16 on a 48 unit canvas,
starting at (33.2, 10.9) and ending at (14.8, 10.9), drawn as a vector so it recolors and scales under
every theme. The same mark appears on the website, the organization banner and the app's loading
screen.

## Module icons

Each module has an original stroke icon on a 24 by 24 canvas with a stroke width of 1.6 and round caps
and joins, drawn in code rather than as bundled images, so they recolor and scale correctly. Vision is
an eye, Hearing is sound bars, Safety is a shield, Family is two people, Speech is a speech bubble,
Reading is an open book, Memory is a clock and Mobility is two footprints.

## The same language on the website

The website uses the same palette and glow motif, so the product, the site and the organization
banner read as one identity.

## Related

[Colors](/docs/design/colors/), [Typography](/docs/design/typography/),
[Module colors](/docs/design/module-colors/), [Components](/docs/design/components/),
[Layout, shape and motion](/docs/design/layout-and-motion/), [Accessibility targets](/docs/design/accessibility-targets/).
