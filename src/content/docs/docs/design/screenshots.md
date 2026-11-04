---
title: "Screenshots"
description: "How the real app screenshots on the website and in the organization profile are produced."
---

The screenshots shown on the [Screenshots](/screenshots/) page and in the organization profile are real
renderings of the app's own widget tree, not mockups.

## How they are captured

`test/screenshots/capture_screenshots_test.dart` in `lumen-app` builds each screen inside a
`MaterialApp` with the app theme, runs the tools once (for example tapping "Find the expiry date" and
"Name color"), and saves the rendered frame as a PNG. Module screens are wrapped in their `ModuleScope`,
scrolled back to the top and captured at 1170 by 2532 pixels at a device pixel ratio of 3.

Captured screens: onboarding, home (with all eight modules enabled), settings and the eight module
screens, 11 images in all. The files are written to `docs/screenshots/` using their original file names.
The test uses `AppTheme.resolve` unchanged, so the images show the real button shapes and weights.

## Why special handling is needed

- **Fonts.** `flutter test` renders with a placeholder font by default, so text would show as boxes. The
  test loads the app's real fonts with `loadAppFonts()` from `golden_toolkit` (a discontinued package
  that still works for this narrow, development only purpose).
- **Async rasterization.** `RenderRepaintBoundary.toImage()` must run inside `tester.runAsync`,
  otherwise it hangs in the fake async zone.
- **Random content.** The Family pairing code differs every run, so regenerating screenshots changes
  that image.

## Regenerating

```bash
flutter test test/screenshots
```

The PNGs are then copied into `lumen-website/public/screenshots/` and the organization profile assets.
These files are written unconditionally; they are an artifact to display, not a pixel exact regression
test, which would be fragile across machines.
