---
title: "Hearing screen"
description: "The Hearing module screen: transcript summarizer, caption formatting and sound alert presentation."
---

Module id `hearing`, plugin package `lumen_plugin_hearing`. The screen's note states that live
captioning and real sound classification need a microphone and models that are not implemented yet.

## Tools

### Transcript summarizer

| | |
|---|---|
| Input | A multi-line text field with a short sample (`Il gatto dorme sul divano. Il cane corre in giardino con il gatto. Oggi piove molto a Milano. Il gatto e il cane giocano insieme in giardino.`). |
| Action | "Summarize" runs `Summarizer.summarize` with `maxSentences: 3`. |
| Output | The chosen sentences joined with spaces, in their original order, or `No sentences recognized in this text.` |

The summarizer scores each sentence by the summed frequency of its non-stop words and keeps the top
three. See the [Hearing package](/docs/plugins/hearing/).

### Caption formatting

| | |
|---|---|
| Input | The same transcript text. |
| Action | "Format as captions" runs `CaptionFormatter.wrap` with `maxCharactersPerLine: 32`. |
| Output | The text broken into lines of at most 32 characters at word boundaries, one per line. A single word longer than 32 characters stays on its own line. |

### Sound alert presentation

| | |
|---|---|
| Input | A dropdown of sample sound labels: `doorbell`, `smoke_alarm`, `siren`, `baby_crying`. Defaults to `smoke_alarm`. |
| Action | "Show presentation" runs `AlertPresentationMapper.presentationFor`. |
| Output | `Vibration: 500, 200, 500, 200, 500 ms. Flash: Yes. Severity: critical.` for the smoke alarm. |

| Label | Vibration pattern (ms) | Flash | Severity |
|---|---|---|---|
| `doorbell` | 200, 100, 200 | No | info |
| `smoke_alarm` | 500, 200, 500, 200, 500 | Yes | critical |
| `siren` | 500, 200, 500, 200, 500 | Yes | critical |
| `baby_crying` | 150, 150, 150 | No | warning |
| anything else | 300 | No | info |

## What is real and what is not

Real: summarizing, caption wrapping and the alert mapping, all tested. Not implemented: audio
capture, speech recognition, sound classification and speaker diarization. The vibration pattern is
shown as text; the app does not vibrate or flash yet.

## Test

`test/modules/hearing_screen_test.dart` summarizes the default transcript and maps a sound label
to a vibration presentation.
