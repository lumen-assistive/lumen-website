---
title: "Hearing package"
description: "lumen_plugin_hearing: transcript sessions, the summarizer, caption formatter, alert presentation mapping and HearingPlugin."
---

```yaml
dependencies:
  lumen_plugin_hearing:
    git:
      url: https://github.com/lumen-assistive/lumen-plugins.git
      ref: v0.3.0
      path: packages/hearing
```

Import with `import 'package:lumen_plugin_hearing/lumen_plugin_hearing.dart';`.

## Public API

| Type | Purpose |
|---|---|
| `TranscriptSession`, `TranscriptSessionSummary` | Aggregates final transcript segments |
| `Summarizer` | Extractive, word frequency based summary |
| `CaptionFormatter` | Wraps text into caption sized lines |
| `AlertPresentationMapper`, `AlertPresentation` | Maps a sound label to vibration, flash and severity |
| `HearingPlugin` | The `LumenPlugin`: transcripts and sound alerts |

## `TranscriptSession`

```dart
final session = TranscriptSession();
session.addSegment(TranscriptEvent(timestamp: t0, text: 'Hello there.', isFinal: true));
session.addSegment(TranscriptEvent(timestamp: t1, text: 'How are you?', isFinal: true));
final summary = session.close(endedAt: t2);
summary.text;       // 'Hello there. How are you?'
summary.wordCount;  // 5
```

- `addSegment` trims the text, ignores empty segments and records the first timestamp as the start.
  Adding to a closed session throws a `StateError`.
- `close` joins the segments with single spaces, counts words and returns a
  `TranscriptSessionSummary` (`startedAt`, `endedAt`, `text`, `wordCount`). Closing twice, or closing
  a session with no segments, throws a `StateError`.

## `Summarizer`

```dart
final summarizer = Summarizer();
final top = summarizer.summarize(text, maxSentences: 3, minSentenceLength: 8);
```

It is an extractive heuristic, not a language model:

1. Split the text into sentences on `.`, `!` and `?` followed by whitespace.
2. If there are no more than `maxSentences` sentences, return them all.
3. Consider only sentences of at least `minSentenceLength` characters (if none qualify, consider all).
4. Score each word by how many times it occurs across all sentences, ignoring a built in list of
   Italian stop words (articles, prepositions, common verb forms).
5. Score a sentence by the sum of its word scores, keep the highest `maxSentences`, and return them
   in their original order.

Because the stop words are Italian, English text works but is not filtered for common English words.
Empty input returns an empty list.

## `CaptionFormatter`

```dart
const formatter = CaptionFormatter();
formatter.wrap('The quick brown fox jumps over the lazy dog', maxCharactersPerLine: 20);
// ['The quick brown fox', 'jumps over the lazy', 'dog']
```

It splits on whitespace and packs words into lines of at most `maxCharactersPerLine` characters
(default `32`) without breaking a word. A word longer than the limit occupies its own line.

## `AlertPresentationMapper`

`presentationFor(label)` returns an `AlertPresentation` with a `vibrationPatternMs` list, a
`useFlash` flag and an `AlertSeverity`:

| Label | Pattern (ms) | Flash | Severity |
|---|---|---|---|
| `doorbell` | 200, 100, 200 | no | info |
| `smoke_alarm` | 500, 200, 500, 200, 500 | yes | critical |
| `siren` | 500, 200, 500, 200, 500 | yes | critical |
| `baby_crying` | 150, 150, 150 | no | warning |
| any other label | 300 | no | info |

The fallback guarantees an unknown sound still produces a perceivable cue.

## `HearingPlugin`

| Field | Value |
|---|---|
| `manifest.id` | `hearing` |
| capabilities | `microphone` |

`start` creates a new `TranscriptSession` and subscribes to two event types:

- `TranscriptEvent`: only events with `isFinal == true` are added to the current session, so
  revisable partial results do not pollute it.
- `SoundAlertEvent`: publishes an `AlertEvent` whose severity comes from the presentation mapper and
  whose messages are specific per label (for example `A smoke alarm was detected.`, and
  `Detected sound: <label>.` for unknown labels).

`stop` cancels both subscriptions and discards the session. `currentSession` exposes the session
while running.

## What is not implemented

Offline speech recognition, sound classification (for example with YAMNet) and speaker diarization.
They need a microphone bridge and models. No component publishes `TranscriptEvent` or
`SoundAlertEvent` from real audio yet.

## Tests

`transcript_session_test.dart`, `summarizer_test.dart`, `caption_formatter_test.dart`,
`alert_presentation_test.dart` and `hearing_plugin_test.dart`. See the
[Hearing screen](/docs/app/modules/hearing/).
