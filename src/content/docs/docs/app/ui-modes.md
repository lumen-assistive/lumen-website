---
title: "UI modes"
description: "The four adaptive interface modes, how they differ, and the exact values each one applies."
---

Lumen renders in one of four modes, chosen during onboarding and changeable later in settings. The
mode drives the base text size and, on the home screen, the number of columns.

## The modes

| Mode | Intended for | Base text scale | Home layout |
|---|---|---|---|
| `voiceFirstHighContrast` | People with low vision | 1.3 | One wide tile per row |
| `visualWithVibration` | Deaf and hard-of-hearing users, where vibration stands in for audio cues | 1.0 | Two tiles per row |
| `simple` | Older adults, or anyone who wants fewer choices on screen | 1.15 | One wide tile per row |
| `complete` | Students and power users who want every option visible | 1.0 | Two tiles per row |

Two modes (`voiceFirstHighContrast` and `simple`) prioritize legibility above everything else, so
they use a larger base text size and a single column of wide tiles on the home screen.

## The palette is the same in every mode

The paper and ink palette already pairs ink text with its surfaces at WCAG AAA (7:1), so no mode needs a
different accent: the modes only change size and layout. The pairs are verified in
`test/theme/app_colors_test.dart` with the real contrast checker from `lumen_plugin_vision`, not
asserted by eye. See [Colors](/docs/design/colors/).

## How text size combines

The final text size is the mode's base scale (applied to the theme's text styles) multiplied by the
user's text size slider (a `MediaQuery` text scaler set at the root). The slider runs from `1.0` to
`2.0`, so the largest possible effect in `voiceFirstHighContrast` is a base of 1.3 times a slider of
2.0.

## What is shared by all modes

- A single light theme, paper and ink. The app forces light mode regardless of the system setting.
- Atkinson Hyperlegible, regular and bold.
- A minimum touch target of 48 logical pixels. Filled and outlined buttons are 56 pixels tall at
  least.
- Rounded rectangular buttons (radius 14) and cards with ink outlines.

## Where the mode is applied

`LumenApp` builds `AppTheme.resolve(profile.uiMode)` whenever the profile changes, so switching
mode in settings updates the whole app immediately. See [Design system](/docs/design/overview/).

## What the modes do not do yet

The mode names mention voice and vibration, but there is no voice output and no haptic output wired
in the app yet: both need the native bridges described in
[Project status](/docs/introduction/status/). Today a mode changes text size and, on the home screen, the number of columns.
