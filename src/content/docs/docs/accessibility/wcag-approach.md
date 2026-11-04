---
title: "WCAG approach"
description: "How Lumen applies the Web Content Accessibility Guidelines to a mobile app, and how the checks are automated."
---

WCAG is written for the web, but its measurable criteria apply directly to a mobile interface. Lumen
applies the ones that can be checked mechanically and tests them.

## Contrast ratio

The contrast of two colors is `(L1 + 0.05) / (L2 + 0.05)` where `L1` is the relative luminance of the
lighter color and `L2` of the darker, with luminance `0.2126 R + 0.7152 G + 0.0722 B` over linearized
channels. The Vision package implements exactly this in `ContrastChecker`, and the app's own tests use it
on the app's own colors, so the design system is verified by the same code users can run.

| Content | AA | AAA |
|---|---|---|
| Normal text | 4.5:1 | 7:1 |
| Large text | 3:1 | 4.5:1 |
| UI components and graphics (non-text) | 3:1 | n/a |

## What the palette meets

- The brand accent, the high contrast accent and body text meet AAA (7:1).
- Each module color meets 3:1 against both surfaces, as required for non-text graphics.

## Using it in your own work

The Vision screen exposes the same checker to the person: it reports the ratio of a chosen color on white
and on black and whether it meets AA. For a developer:

```dart
const checker = ContrastChecker();
final result = checker.check(const RgbColor(243, 239, 226), const RgbColor(13, 11, 8));
result.passes(WcagLevel.aaa);   // true
```

## Other criteria applied

| Criterion | How |
|---|---|
| Resize text | Scale up to 2.0 times |
| Target size | 48 pixel minimum |
| Name, role, value | Semantics labels on controls |
| Use of color | Results are stated in words |
| Consistent navigation | One route structure and the same screen anatomy for every module |
| Focus and order | Single column content in reading order |

## Limits of automation

Automated checks cannot judge whether a label makes sense, whether the reading order feels natural, or
how a screen reader announces a result. Those need human testing. See
[Manual testing](/docs/accessibility/manual-testing/).
