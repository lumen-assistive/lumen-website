---
title: "Speech screen"
description: "The Speech module screen: the phrase board, usage-ranked suggestions and sentence building."
---

Module id `speech` (labelled "Speak" in the app), plugin package `lumen_plugin_speech`. The note
states that text-to-speech output and pictogram images are not implemented yet.

## Tools

### Phrase board

Phrases are grouped by category chips: Needs, Greetings, Emotions and Emergency. Tapping a phrase
chip:

1. records the use in the `PhraseUsageTracker`,
2. adds the phrase to the sentence being built, and
3. refreshes the suggestions.

The default board has 19 phrases, for example Water, Bathroom, Hello, Thank you, Help, Call a
doctor and I don't feel well. See the [Speech package](/docs/plugins/speech/).

### Top suggestions

After a phrase is tapped, the three highest scoring phrases appear. The score is a recency weighted
usage count with a 24 hour half life, so a phrase used often and recently ranks first.

### Build a sentence

| | |
|---|---|
| Input | The phrases tapped so far. |
| Actions | "Build sentence" runs `SentenceBuilder.compose` in English. "Clear" empties the sentence. |
| Output | The phrases joined with spaces, capitalized, and ended with a full stop if no `.`, `!` or `?` ends it, for example tapping Water and then Please gives `Water Please.` |

## What is real and what is not

Real: the board, usage ranking and sentence composition. Not implemented: speaking the sentence
aloud and showing pictograms. `Phrase` has an optional `pictogramId`, but no symbol set is bundled,
and the one considered (ARASAAC) is not license compatible, see the
[license ledger](/docs/models/license-ledger/).

## Test

`test/modules/speech_screen_test.dart` taps a phrase and checks that it appears and that the
suggestions section is reachable.
