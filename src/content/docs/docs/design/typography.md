---
title: "Typography"
description: "The typeface, weights, sizes and text scaling rules of the app."
---

## The typeface

The app uses one typeface everywhere: **Atkinson Hyperlegible**, designed by the Braille Institute for
legibility by people with low vision. Two weights are bundled in `assets/fonts/`: Regular and Bold,
under the SIL Open Font License (`OFL.txt` is shipped with them).

Because only Regular and Bold are bundled, avoid requesting intermediate weights such as 500 or 600:
they have no glyph data of their own, and the platform may synthesize them or substitute a weight. Use
Regular for body and Bold for emphasis.

## The text theme

`AppTheme` builds the text theme from the Material 2021 white typography with the app font applied,
body and display colors set to the warm off-white, and a size factor from the UI mode:

| UI mode | Size factor |
|---|---|
| `voiceFirstHighContrast` | 1.3 |
| `simple` | 1.15 |
| `visualWithVibration` | 1.0 |
| `complete` | 1.0 |

## Scaling

The final size is the mode factor times the user's text size setting (1.0 to 2.0 in steps of 0.25),
applied as a `MediaQuery` text scaler at the app root. Layouts must therefore tolerate text up to
twice the size: use flexible widgets (`Expanded`, wrapping) rather than fixed heights, and allow
multi-line labels. A button such as "Simulate steady readings" wraps rather than truncating.

## Usage by role

| Role | Style |
|---|---|
| Screen title in the app bar | 26 px, bold, tight letter spacing (`-0.4`) |
| Home headline | `displaySmall`, bold, line height `1.05`, letter spacing `-1` |
| Module name in a header | `headlineMedium`, bold |
| Card title | `titleMedium`, bold |
| Body | `bodyLarge` or `bodyMedium` |
| Notes and captions | `bodySmall` in the muted color |
| Section labels | `labelLarge`, uppercase, letter spacing `1.4`, muted |
| Buttons | 16 px bold in module screens, 19 px bold in onboarding |

## Rules

- Never convey meaning by size or color alone.
- Do not set fixed text sizes in pixels without a good reason; prefer theme styles so scaling works.
- Keep line lengths comfortable: content is a single column with 16 to 20 pixel side padding.
