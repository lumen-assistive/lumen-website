---
title: "UI modes"
description: "The four adaptive interface modes, how they differ, and the exact values each one applies."
---

Lumen renders in one of four modes, chosen during onboarding and changeable later in settings. The
mode drives the base text size and the accent color.

## The modes

| Mode | Intended for | Base text scale | Accent |
|---|---|---|---|
| `voiceFirstHighContrast` | People with low vision | 1.3 | High contrast amber |
| `visualWithVibration` | Deaf and hard-of-hearing users, where vibration stands in for audio cues | 1.0 | Brand amber |
| `simple` | Older adults, or anyone who wants fewer choices on screen | 1.15 | High contrast amber |
| `complete` | Students and power users who want every option visible | 1.0 | Brand amber |

Two modes (`voiceFirstHighContrast` and `simple`) prioritize legibility above everything else, so
they switch to the brighter high contrast accent and a larger base text size.

## The two accents

| Name | Hex | Contrast requirement |
|---|---|---|
| Brand amber | `#E3A94A` | Clears WCAG AAA (7:1) against the background |
| High contrast amber | `#F2C878` | Brightened to clear WCAG AAA with margin |

Both values are verified in `test/theme/app_colors_test.dart` with the real contrast checker from
`lumen_plugin_vision`, not asserted by eye.

## How text size combines

The final text size is the mode's base scale (applied to the theme's text styles) multiplied by the
user's text size slider (a `MediaQuery` text scaler set at the root). The slider runs from `1.0` to
`2.0`, so the largest possible effect in `voiceFirstHighContrast` is a base of 1.3 times a slider of
2.0.

## What is shared by all modes

- A single dark theme. The app forces dark mode regardless of the system setting.
- Atkinson Hyperlegible, regular and bold.
- A minimum touch target of 48 logical pixels. Filled and outlined buttons are 54 pixels tall at
  least.
- Pill shaped buttons and rounded cards.

## Where the mode is applied

`LumenApp` builds `AppTheme.resolve(profile.uiMode)` whenever the profile changes, so switching
mode in settings updates the whole app immediately. See [Design system](/docs/design/overview/).

## What the modes do not do yet

The mode names mention voice and vibration, but there is no voice output and no haptic output wired
in the app yet: both need the native bridges described in
[Project status](/docs/introduction/status/). Today a mode changes text size and accent color.
