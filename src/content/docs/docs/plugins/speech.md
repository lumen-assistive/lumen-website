---
title: "Speech package"
description: "lumen_plugin_speech: the phrase board, usage ranking, sentence builder and SpeechPlugin."
---

```yaml
dependencies:
  lumen_plugin_speech:
    git:
      url: https://github.com/lumen-assistive/lumen-plugins.git
      ref: v0.3.0
      path: packages/speech
```

Import with `import 'package:lumen_plugin_speech/lumen_plugin_speech.dart';`.

## Public API

| Type | Purpose |
|---|---|
| `Phrase`, `PhraseCategory` | A phrase with Italian and English text and a category |
| `PhraseBoard` | The set of phrases, with the default vocabulary |
| `PhraseUsageTracker` | Records use and ranks suggestions |
| `SentenceBuilder`, `SentenceLocale` | Composes phrases into one sentence |
| `SpeechPlugin` | The `LumenPlugin` |

## `Phrase` and `PhraseBoard`

A `Phrase` has `id`, `textIt`, `textEn`, a `category` (`needs`, `greetings`, `emotions`, `emergency`)
and an optional `pictogramId`.

`PhraseBoard` is created with the default vocabulary or your own list:

```dart
final board = PhraseBoard();
board.byCategory(PhraseCategory.emergency).map((p) => p.textEn);
// Help, Call a doctor, Call my family, I don't feel well
board.add(const Phrase(id: 'needs-blanket', textIt: 'Coperta', textEn: 'Blanket',
    category: PhraseCategory.needs));
```

The default vocabulary has 19 phrases:

| Category | English text |
|---|---|
| needs | Water, Bathroom, I'm hungry, I'm tired, I'm in pain |
| greetings | Hello, Goodbye, Thank you, Please, Yes, No |
| emotions | I'm happy, I'm sad, I'm scared, I'm angry |
| emergency | Help, Call a doctor, Call my family, I don't feel well |

Methods: `all()`, `byCategory`, `byId`, `add` (adding an existing id replaces it).

## `PhraseUsageTracker`

```dart
final tracker = PhraseUsageTracker();
tracker.recordUse('needs-water');
tracker.topSuggestions(limit: 3);   // ranked ids
tracker.mostUsedOverall(limit: 3);  // by raw count
```

`topSuggestions` scores each phrase as `count * 0.5 ^ (age / recencyHalfLife)`, where `age` is the time
since the last use and the half life defaults to 24 hours. A phrase used often and recently outranks
one used often long ago. `mostUsedOverall` ranks by count only, breaking ties by most recent use.

## `SentenceBuilder`

`compose(phrases, locale: SentenceLocale.en)` joins the phrase texts with spaces, capitalizes the
first letter, and appends a full stop unless the text already ends in `.`, `!` or `?`. An empty list
returns an empty string. `SentenceLocale.it` selects the Italian text.

## `SpeechPlugin`

| Field | Value |
|---|---|
| `manifest.id` | `speech` |
| capabilities | none |

It exposes `board` and `usageTracker`, and `selectPhrase(id)` records a use. Lifecycle methods are
empty.

## What is not implemented

Speaking the sentence (text-to-speech) and pictograms. `pictogramId` is a field only: no symbol set
is bundled, and ARASAAC is not license compatible, see the
[license ledger](/docs/models/license-ledger/).

## Tests

`phrase_board_test.dart`, `phrase_usage_tracker_test.dart`, `sentence_builder_test.dart` and
`speech_plugin_test.dart`. See the [Speech screen](/docs/app/modules/speech/).
