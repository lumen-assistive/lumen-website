---
title: "Vision screen"
description: "The Vision module screen: the expiry date reader, color namer and WCAG contrast check."
---

Module id `vision`, plugin package `lumen_plugin_vision`. The screen's note states that scene
description, banknote, medicine and obstacle recognition need a camera and vision models that are
not implemented yet.

## Tools

### Expiry date reader

| | |
|---|---|
| Input | A text field, pre-filled with `Da consumarsi preferibilmente entro il 25/12/2026`. Paste text as if read from a label. |
| Action | "Find the expiry date" runs `ExpiryDateParser.parse`. |
| Output | `Expiry date found: 2026-12-25` (ISO format) or `No expiry date recognized.` |

The parser understands six formats, see the [Vision package](/docs/plugins/vision/).

### Color namer

| | |
|---|---|
| Input | Three number fields, Red, Green and Blue (0 to 255), pre-filled with `225`, `25`, `15`. Empty or invalid values count as `0`. |
| Action | "Name color" runs `ColorNamer.nameOf`. |
| Output | `Nearest match: rosso` and a colored swatch of the entered color. |

The nearest match is the closest of eleven fixed colors by squared RGB distance. The names are
Italian words (rosso, verde, blu, giallo, bianco, nero, arancione, viola, rosa, marrone, grigio).

### WCAG contrast check

| | |
|---|---|
| Input | The same RGB values as the color namer. |
| Action | "Check contrast" runs `ContrastChecker.check` against white and against black. |
| Output | `On white: 4.83:1 (AA: Yes). On black: 4.35:1 (AA: No).` for the default color. The ratios are the real values for the entered color, shown to two decimals. |

The AA verdict uses the normal text threshold of 4.5:1.

## What is real and what is not

Real: the parser, the namer and the checker, all tested. Not implemented: anything that needs a
camera frame or a model. `VisionPlugin` can turn an `OcrResultEvent` into an info `AlertEvent`, but
no OCR model publishes those events yet.

## Test

`test/modules/vision_screen_test.dart` runs the date reader and the color namer on their default
inputs.
