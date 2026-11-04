---
title: "Layout, shape and motion"
description: "Spacing, corner radii, outlines and the small amount of motion the app uses."
---

## Spacing

Module screens use a 16 pixel side gutter, the home screen 20 and onboarding 24. Gaps between cards and
tiles are 12 to 16 pixels, and cards have 20 pixels of padding inside. Content is a single scrolling
column, except the home screen's module grid.

## Home grid

The home screen shows the enabled modules as solid tiles, two per row with a 12 pixel gap. In the
`simple` and `voiceFirstHighContrast` UI modes it shows one wide tile per row, since their larger text
needs the room. Rows are built from `IntrinsicHeight` rows so tiles in a row share a height.

## Corner radii

| Element | Radius |
|---|---|
| Module header block, speech banner | 28 |
| Home tile | 24 |
| Tool card, settings groups, warning block | 20 |
| Buttons, text fields, dropdowns, result block, note box, settings button | 14 |
| Chips | 12 |
| Onboarding badge | 28 |
| `ModuleBadge` | 30 percent of its size |

## Outlines and elevation

Nothing has elevation or a shadow. Every card, tile, button and badge is defined by an ink outline,
2 pixels wide (`AppTheme.outlineWidth`); text fields and dropdowns use 1.5 pixels, and a focused text
field 3. Quiet secondary elements use the `hairline` color instead. There are no gradients, glows or
translucent fills.

## Motion

Motion is minimal and short:

- `FadeSlideIn` fades cards in while sliding them up 18 pixels (about 420 ms). Home tiles use a slightly
  longer duration per row, so they cascade.
- Standard Material transitions between routes and ripple feedback on tappable tiles.

There is no looping animation. `FadeSlideIn` is skipped when the platform asks to reduce motion.

## Touch targets

Controls are at least 48 logical pixels. Buttons are 56 pixels tall in the theme, onboarding answers 68,
and home tiles are much larger. See [Accessibility targets](/docs/design/accessibility-targets/).

## Safe areas

Home and onboarding use `SafeArea` so content clears system bars and notches. Module screens use the
standard `AppBar` and `ListView` padding.
