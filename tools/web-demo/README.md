# web-demo

A build tool, not part of the website itself and not part of the Lumen app. It compiles real
business logic from [lumen-plugins](https://github.com/lumen-assistive/lumen-plugins) to
JavaScript so the `/demo/` page can run it directly in the browser, instead of reimplementing
that logic in JavaScript.

`lib/demo.dart` imports the real classes behind every one of Lumen's eight modules (for example
`ExpiryDateParser` and `ColorNamer` from Vedere, `ScamFilter` from Protezione, `PhraseBoard` from
Parlare, `ItalianSyllableSplitter` and `SpacedRepetitionScheduler` from Leggere, `PersonDirectory`
and `ReminderScheduler` from Ricordare, `GaitStabilityMonitor` from Muoversi, `PairingCodeGenerator`
and `DailyStatusTracker` from Famiglia), pinned to the `v0.2.0` tag of `lumen-plugins` (the same tag
every other consumer of those packages uses). It exposes a small number of plain functions to the
browser's global scope through `dart:js_interop`. Stateful tools (phrase usage, people, reminders,
daily status) keep one instance alive for the page's lifetime, so using them feels like a real app
session rather than resetting on every call.

`lumen_plugin_muoversi` and `lumen_plugin_protezione` each define their own `AccelerometerSample`
class (neither depends on the other, and `lumen_sdk` has no shared accelerometer event type yet;
see both packages' READMEs), so the Protezione import hides that name to avoid an ambiguity error.

## Regenerating the compiled bundle

The compiled output is committed at `public/demo/lumen-demo.js` rather than built in CI, since
lumen-website's continuous integration has no Dart toolchain and adding one would be a large,
unplanned change to that pipeline for a single static asset that only needs to change when this
tool's source changes. Regenerate it with a local Dart SDK whenever `lib/demo.dart` changes or
`lumen-plugins` ships a new tag this should track:

```
cd tools/web-demo
dart pub get
dart compile js -O2 -o ../../public/demo/lumen-demo.js lib/demo.dart
```

Then rebuild the site (`npm run build`) and verify the demo page still produces correct results.
The compiled bundle can be exercised directly in Node (with `global.self = global; global.window =
global;` shimmed in first, since the browser globals `Random.secure()` and the DOM otherwise expect
are not present in Node) and compared against the real test suites in `lumen-plugins`, for example
`packages/leggere/test/italian_syllable_splitter_test.dart` or
`packages/muoversi/test/gait_stability_monitor_test.dart`, before committing the regenerated file.
