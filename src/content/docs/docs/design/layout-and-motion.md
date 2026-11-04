---
title: "Layout, shape and motion"
description: "Spacing, corner radii, borders, elevation and the small amount of motion the app uses."
---

## Spacing

Screens use a 16 pixel side gutter on module screens and 20 on the home screen, with 12 to 16 pixel
gaps between cards and 14 to 20 pixels of padding inside them. Content is a single scrolling column.

## Corner radii

| Element | Radius |
|---|---|
| Buttons and chips | Fully round (stadium) |
| Module header panel | 32 |
| Tool card | 28 |
| Home module card, settings cards | 24 |
| Module note, result box | 20 and 18 |
| Text fields | 18 |

Large radii give the app its calm, round character and match the website.

## Borders and elevation

Cards have no elevation or shadow. Definition comes from a one pixel border in `AppColors.border`
(or a tinted module color border) or from a deliberate glow. Gradients are used sparingly as soft tints
from a module color to the surface.

## Glows

A glow is a radial gradient (or a large box shadow behind a circle) of a module color or the brand
`glow` color. Gradients fade to fully transparent inside their bounds so there is no visible hard edge.
Glows appear behind the home header, behind a module screen's top, behind onboarding badges and around
module badges.

## Motion

Motion is minimal and short:

- The onboarding progress segments animate their color over 250 ms.
- Standard Material transitions between routes and ripple feedback on tappable cards.

There is no decorative looping animation. Respect the user's platform setting for reduced motion if
you add any.

## Touch targets

Controls are at least 48 logical pixels. Buttons are 54 pixels tall in the theme, onboarding answers 64,
and the home cards at least 88. See [Accessibility targets](/docs/design/accessibility-targets/).

## Safe areas

Home and onboarding use `SafeArea` so content clears system bars and notches. Module screens use the
standard `AppBar` and `ListView` padding.
