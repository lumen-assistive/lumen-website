---
title: "Vision package"
description: "lumen_plugin_vision: the expiry date parser, color namer, WCAG contrast checker and VisionPlugin."
---

```yaml
dependencies:
  lumen_plugin_vision:
    git:
      url: https://github.com/lumen-assistive/lumen-plugins.git
      ref: v0.3.0
      path: packages/vision
```

Import with `import 'package:lumen_plugin_vision/lumen_plugin_vision.dart';`.

## Public API

| Type | Purpose |
|---|---|
| `ExpiryDateParser` | Extracts an expiry date from OCR text |
| `ExpiryDateResult`, `ExpiryDateFormat` | The result and which format matched |
| `ColorNamer`, `RgbColor` | Names the nearest of eleven fixed colors |
| `ContrastChecker`, `ContrastResult`, `WcagLevel` | Computes WCAG contrast and checks thresholds |
| `VisionPlugin` | The `LumenPlugin`: OCR result to expiry date alert |

## `ExpiryDateParser`

```dart
final parser = ExpiryDateParser();
final result = parser.parse('Da consumarsi preferibilmente entro il 01/03/2027');
result.isFound;  // true
result.date;     // DateTime(2027, 3, 1)
result.format;   // ExpiryDateFormat.entroIlPhrase
```

`parse` tries these formats in order and returns the first valid match:

| Order | Format enum | Example text | Meaning |
|---|---|---|---|
| 1 | `entroIlPhrase` | `entro il 01/03/2027` | The phrase "entro" followed by a day, month and year |
| 2 | `dayMonthYearSlash` | `25/12/2026` | Day, month, year with slashes |
| 3 | `dayMonthYearDash` | `25-12-2026` | With dashes |
| 4 | `dayMonthYearDot` | `25.12.2026` | With dots |
| 5 | `italianMonthName` | `Scad. 12 DIC 2026`, `12 Dicembre 2026` | Day, an Italian month name or abbreviation, a four digit year |
| 6 | `monthYearOnly` | `SCAD 02/2028` | A month and year; the date is the last day of that month |

Rules worth knowing:

- Two digit years are read as `20xx` (`25/12/26` is 2026).
- A date that does not exist is rejected, not rolled over: `31/02/2026` and `25/13/2026` return
  `ExpiryDateResult.notFound()`. `DateTime` itself would silently roll day 31 of a 30 day month into
  the next month, so the parser compares the built date with the printed one.
- `SCAD 02/2028` yields 29 February 2028, using the real length of the month.
- Text with no date, such as `Ingredienti: farina, acqua, sale`, yields `isFound == false`, with a
  `null` date and format.
- A date in the past is still a date: `Scadenza: 01/01/2020` is returned as 1 January 2020. Deciding
  whether a product is expired is the caller's job.

## `ColorNamer`

```dart
final namer = ColorNamer();
namer.nameOf(const RgbColor(225, 25, 15));  // 'rosso'
```

The palette has eleven entries, and `nameOf` returns the one with the smallest squared RGB distance:

| Name | RGB |
|---|---|
| rosso | 220, 20, 20 |
| verde | 20, 140, 20 |
| blu | 20, 20, 200 |
| giallo | 230, 220, 20 |
| bianco | 255, 255, 255 |
| nero | 0, 0, 0 |
| arancione | 240, 130, 20 |
| viola | 130, 20, 160 |
| rosa | 240, 150, 190 |
| marrone | 120, 70, 30 |
| grigio | 130, 130, 130 |

The names are Italian words. Matching is by RGB distance, which is a simple approximation and not a
perceptual color model.

## `ContrastChecker`

```dart
const checker = ContrastChecker();
final result = checker.check(const RgbColor(0, 0, 0), const RgbColor(255, 255, 255));
result.ratio;                    // 21.0
result.passes(WcagLevel.aaa);    // true
```

It implements the WCAG 2.x relative luminance and contrast ratio formulas: each channel is
linearized (`c / 12.92` below `0.03928`, otherwise `((c + 0.055) / 1.055) ^ 2.4`), luminance is
`0.2126 R + 0.7152 G + 0.0722 B`, and the ratio is `(lighter + 0.05) / (darker + 0.05)`.

`ContrastResult.passes(level)` compares the ratio with these thresholds:

| Level | Normal text | Large text (`largeText: true`) |
|---|---|---|
| AA | 4.5 | 3.0 |
| AAA | 7.0 | 4.5 |

The app uses this class in its own tests to verify that its palette meets the claimed thresholds.

## `VisionPlugin`

| Field | Value |
|---|---|
| `manifest.id` | `vision` |
| capabilities | `camera` |
| `sdkConstraint` | `^0.1.0` |

On `start` it subscribes to `OcrResultEvent`. For each event it runs the parser on `event.text` and,
if a date is found, publishes an `AlertEvent`:

| Field | Value |
|---|---|
| `severity` | `info` |
| `messageEn` | `Expiry date detected: 2026-12-25.` (ISO date) |
| `messageIt` | The same date in day, month, year form |
| `pluginId` | `vision` |

`stop` cancels the subscription. `VisionPlugin` accepts a custom `ExpiryDateParser` in its
constructor.

## What is not implemented

Scene description, live OCR beyond date parsing, banknote recognition, medicine box and leaflet
question answering, obstacle detection and a "find" mode. They need vision models and a native camera
bridge. No component publishes `OcrResultEvent` from a real camera yet.

## Tests

`expiry_date_parser_test.dart`, `color_namer_test.dart`, `contrast_checker_test.dart` and
`vision_plugin_test.dart`. See the [Vision screen](/docs/app/modules/vision/) for the same code in
the app.
