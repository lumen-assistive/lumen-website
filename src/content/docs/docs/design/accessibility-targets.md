---
title: "Accessibility targets"
description: "The concrete accessibility numbers the design system commits to and how each is checked."
---

| Target | Value | How it is enforced |
|---|---|---|
| Minimum touch target | 48 logical pixels (`AppTheme.minTouchTarget`) | Buttons, icon buttons and list rows are built at or above it |
| Button height | 56 pixels in the theme (`AppTheme.buttonHeight`) | `minimumSize` of elevated and outlined buttons |
| Ink on paper and on cards | WCAG AAA 7:1 | `app_colors_test.dart` |
| Muted text on paper and on cards | WCAG AA 4.5:1 | `app_colors_test.dart` |
| Critical color as text on paper | WCAG AA 4.5:1 | `app_colors_test.dart` |
| Ink on every module fill and on the brand yellow | WCAG AAA 7:1 | `app_colors_test.dart` |
| Text scale | Up to 2.0 times, plus a mode factor up to 1.3 | Settings slider and mode |
| Typeface | Atkinson Hyperlegible | Bundled fonts |
| Semantics | Labels on buttons and results | `Semantics` widgets, `ToolOutput` labels |
| Color independence | Result meaning also in text | Result strings state the outcome in words |

## What is not verified

Manual testing with TalkBack and VoiceOver has not been performed. The semantics labels and sizes are
implemented but have not been exercised with a real screen reader, and this is a required step before
any release. See [Manual testing](/docs/accessibility/manual-testing/).

## Practices for contributors

- Give every icon only button a `Semantics` label (see the settings button on the home screen).
- Do not use color as the only indicator of state.
- Check any new color pair with the contrast tests.
- Test a screen at the largest text scale to make sure nothing clips.
- Make long labels wrap rather than truncate.

See [Accessibility overview](/docs/accessibility/overview/).
