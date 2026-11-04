# web-demo

A build tool, not part of the website itself and not part of the Lumen app. It compiles real
business logic from [lumen-plugins](https://github.com/lumen-assistive/lumen-plugins) to
JavaScript so the `/demo/` page can run it directly in the browser, instead of reimplementing
that logic in JavaScript.

## What it exposes

`lib/demo.dart` imports the real classes behind every one of Lumen's eight modules and exposes a
single function to the browser's global scope through `dart:js_interop`:

```js
const result = JSON.parse(await window.lumenCall('vision.expiry', JSON.stringify({ text: '...' })));
```

`lumenCall(tool, argsJson)` returns a promise of a JSON string. The tools mirror, one for one, what
the real Flutter app's module screens call (see `lumen-app/lib/src/modules/`):

| Module | Tools | Real classes |
|---|---|---|
| Vision | `vision.expiry`, `vision.color`, `vision.contrast` | `ExpiryDateParser`, `ColorNamer`, `ContrastChecker` |
| Hearing | `hearing.summarize`, `hearing.captions`, `hearing.alert` | `Summarizer`, `CaptionFormatter`, `AlertPresentationMapper` |
| Safety | `safety.scam`, `safety.fall`, `safety.checkIn`, `safety.checkInStatus`, `safety.sosStart`, `safety.sosCancel`, `safety.sosState` | `ScamFilter`, `FallDetector`, `CheckInScheduler`, `SosController` with `FakeSmsSender` |
| Family | `family.pairing`, `family.addEvent`, `family.status`, `family.notification` | `PairingCodeGenerator`, `InMemoryCalendarStore`, `DailyStatusTracker`, `CaregiverNotificationComposer` |
| Speech | `speech.board`, `speech.use`, `speech.sentence` | `PhraseBoard`, `PhraseUsageTracker`, `SentenceBuilder` |
| Reading | `reading.split`, `reading.review`, `reading.time` | `ItalianSyllableSplitter`, `SpacedRepetitionScheduler`, `ReadingTimeEstimator` |
| Memory | `memory.addPerson`, `memory.addReminder`, `memory.dueReminders`, `memory.routine` | `PersonDirectory`, `ReminderScheduler`, `RoutineChecklistTracker` |
| Mobility | `mobility.gait`, `mobility.profile`, `mobility.breaks` | `GaitStabilityMonitor`, `MobilityProfile`, `RestBreakPlanner` |

The packages are pinned to the `v0.3.0` tag of `lumen-plugins` (the same tag `lumen-app` uses).
Stateful tools (calendar, daily status, phrase usage, people, reminders, the routine checklist, the
check-in clock and the SOS countdown) keep one instance alive for the page's lifetime, so using them
feels like a real app session rather than resetting on every call. Fall and gait tools run on the
same simulated accelerometer windows the app uses, and SOS is wired to the package's `FakeSmsSender`,
so it can never send a real message.

`lumen_plugin_mobility` and `lumen_plugin_safety` each define their own `AccelerometerSample`
class (neither depends on the other, and `lumen_sdk` has no shared accelerometer event type yet;
see both packages' READMEs), so `demo.dart` imports the Safety one under a prefix.

## The screens

The phone on the page is plain HTML, CSS and JavaScript in `src/components/PhoneDemo.astro` and
`public/demo/phone.js`. It mirrors the app's widgets and never computes a result itself. The app's
wording comes from `src/lib/appStrings.json`, extracted from
`lumen-app/lib/src/l10n/app_strings.dart`. Regenerate it whenever the app's strings change, from the
repository root:

```
python3 tools/web-demo/extract_strings.py ../lumen-app/lib/src/l10n/app_strings.dart
```

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
`packages/reading/test/italian_syllable_splitter_test.dart` or
`packages/mobility/test/gait_stability_monitor_test.dart`, before committing the regenerated file.
