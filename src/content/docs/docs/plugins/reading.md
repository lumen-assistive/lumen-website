---
title: "Reading package"
description: "lumen_plugin_reading: the Italian syllable splitter, SM-2 spaced repetition, flashcard deck and reading time estimator."
---

```yaml
dependencies:
  lumen_plugin_reading:
    git:
      url: https://github.com/lumen-assistive/lumen-plugins.git
      ref: v0.3.0
      path: packages/reading
```

Import with `import 'package:lumen_plugin_reading/lumen_plugin_reading.dart';`.

## Public API

| Type | Purpose |
|---|---|
| `ItalianSyllableSplitter` | Splits Italian words into syllables |
| `SpacedRepetitionScheduler`, `ReviewOutcome` | The SM-2 algorithm |
| `Flashcard`, `FlashcardDeck` | Cards and a deck driven by the scheduler |
| `ReadingTimeEstimator` | Reading time from a word count |
| `ReadingPlugin` | The `LumenPlugin` |

## `ItalianSyllableSplitter`

```dart
const splitter = ItalianSyllableSplitter();
splitter.split('patria');            // ['pa', 'tria']
splitter.splitText('casa amico');    // 'ca-sa a-mi-co'
```

`split(word)` returns the syllables of one word. `splitText(text)` splits every word, joins syllables
with hyphens and words with single spaces, and drops extra whitespace. Punctuation stays attached
to its word (`'casa, amico.'` becomes `'ca-sa, a-mi-co.'`).

The algorithm finds each run of vowels and decides where the consonant cluster between two runs is
divided:

- One consonant goes with the following vowel (`ca-sa`).
- A cluster starting with `s` stays with the following syllable (`fi-ne-stra`, `pe-sce`).
- Two consonants are split between syllables (`gat-to`, `an-no`, `stel-la`), unless they form a
  digraph (`ch`, `gh`, `gn`, `gl`, `sc`) or a stop plus liquid blend (`b c d f g p t v` followed by
  `l` or `r`), in which case both go with the following syllable (`fi-glio`, `a-gnel-lo`).
- With three or more consonants, the last two go with the following syllable if they form a digraph
  or blend, otherwise only the last one does.

Tested examples: `casa` to `ca-sa`, `amico` to `a-mi-co`, `gatto` to `gat-to`, `finestra` to
`fi-ne-stra`, `pesce` to `pe-sce`, `figlio` to `fi-glio`, `agnello` to `a-gnel-lo`, `acqua` to
`ac-qua`. Words with no vowel (`mm`), a single letter, or an empty string come back unsplit.

This is a rule based approximation of Italian orthographic syllabification, not a full dictionary.

## `SpacedRepetitionScheduler`

An implementation of the SM-2 algorithm. `review` takes a `quality` from 0 to 5 and the previous
repetition count, interval in days and easiness factor, and returns a `ReviewOutcome`.

```dart
const scheduler = SpacedRepetitionScheduler();
final o = scheduler.review(
  quality: 5,
  previousRepetitionCount: 0,
  previousIntervalDays: 0,
  previousEasinessFactor: 2.5,
);
// o.repetitionCount == 1, o.intervalDays == 1, o.easinessFactor == 2.6
```

| Rule | Behavior |
|---|---|
| Quality below 3 | The repetition count resets to 0 and the interval to 1 day |
| First success | Interval 1 day |
| Second success | Interval 6 days |
| Later successes | Previous interval times the previous easiness factor, rounded |
| Easiness update | `EF + (0.1 - d * (0.08 + d * 0.02))` where `d = 5 - quality`, never below 1.3 |

A perfect rating (5) raises the easiness factor by 0.1. A quality outside 0 to 5 trips an assertion.
Tested progression for repeated perfect ratings: intervals of 1, 6 and 16 days (`round(6 * 2.7)`).

## `Flashcard` and `FlashcardDeck`

A `Flashcard` has `id`, `front`, `back`, a `dueAt` date, and mutable `repetitionCount`,
`intervalDays` (initially 0) and `easinessFactor` (initially 2.5).

```dart
final deck = FlashcardDeck();
deck.add(Flashcard(id: 'c1', front: 'Capital of Italy?', back: 'Rome', dueAt: DateTime.now()));
deck.due(DateTime.now());                       // cards due now
deck.review(cardId: 'c1', quality: 4, reviewedAt: DateTime.now());
```

`review` runs the scheduler on the card and sets its next `dueAt` to `reviewedAt` plus the new
interval. Reviewing an unknown id throws an `ArgumentError`. `due(now)` returns cards whose `dueAt` is
not after `now`.

## `ReadingTimeEstimator`

`estimateMinutes(wordCount)` returns `ceil(wordCount / wordsPerMinute)` (zero for zero or negative
counts); `estimateMinutesForText(text)` counts whitespace separated words first. `wordsPerMinute`
defaults to `200` and must be positive.

## `ReadingPlugin`

| Field | Value |
|---|---|
| `manifest.id` | `reading` |
| `nameEn` | `Read and Study` |
| capabilities | none |

It exposes `syllableSplitter` and `flashcardDeck`. Lifecycle methods are empty.

## What is not implemented

Reading scanned text aloud and dyslexia specific text adaptation beyond syllable splitting.

## Tests

`italian_syllable_splitter_test.dart`, `spaced_repetition_scheduler_test.dart`,
`flashcard_deck_test.dart`, `reading_time_estimator_test.dart` and `reading_plugin_test.dart`. See
the [Reading screen](/docs/app/modules/reading/).
