---
title: "Reading screen"
description: "The Reading module screen: syllable splitter, flashcard review and reading time estimate."
---

Module id `reading` (labelled "Read and Study" in the app), plugin package `lumen_plugin_reading`.
The note states that reading scanned text aloud and dyslexia-specific text adaptation are not
implemented yet.

## Tools

### Syllable splitter

| | |
|---|---|
| Input | A text field pre-filled with `patria`. |
| Action | "Split into syllables" runs `ItalianSyllableSplitter.split` on every word. |
| Output | Words with hyphens between syllables, for example `pa-tria`. |

The splitter follows standard Italian syllabification rules. See the
[Reading package](/docs/plugins/reading/).

### Flashcard review

A single card asks `What is the capital of Italy?`. The person rates recall from 0 (poor) to 5
(perfect) with six buttons.

| | |
|---|---|
| Action | Each button runs `SpacedRepetitionScheduler.review` (the SM-2 algorithm) with the card's current state. |
| Output | `Next review in 1 day(s), easiness 2.60, 1 successful review(s) in a row.` for a first rating of 5. |

The state (repetition count, interval, easiness factor) is carried between taps, so repeated good
ratings stretch the interval: 1 day, then 6 days, then the previous interval times the easiness
factor. A rating below 3 resets the streak and returns the interval to one day.

### Estimated reading time

| | |
|---|---|
| Input | A multi-line text field with a short sample. |
| Action | "Estimate reading time" runs `ReadingTimeEstimator.estimateMinutesForText`. |
| Output | `Estimated reading time: 1 minute(s).` The default is 200 words per minute, rounded up. |

## What is real and what is not

Real: syllable splitting, the SM-2 scheduler, the deck and the time estimate. Not implemented:
scanning text with a camera, text-to-speech, and adapting layout for dyslexia beyond splitting. The
flashcard state is not persisted.

## Test

`test/modules/reading_screen_test.dart` splits `patria` into `pa-tria` and checks the SM-2 result
of a perfect rating.
