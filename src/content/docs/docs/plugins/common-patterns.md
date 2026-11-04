---
title: "Common patterns"
description: "Patterns used across the plugin packages: injected clocks, state holders, validators, getters and testing helpers."
---

Several design patterns repeat across the eight packages. Knowing them makes any package easy to
read, and they are what a new package should follow.

## Injected clocks

Anything that depends on the current time takes a `DateTime Function()` named `now`, defaulting to
`DateTime.now`:

```dart
class CheckInScheduler {
  CheckInScheduler({DateTime Function()? now}) : _now = now ?? DateTime.now;
  final DateTime Function() _now;
}
```

This pattern appears in `CheckInScheduler`, `DailyStatusTracker`, `PhraseUsageTracker`,
`ReminderScheduler` and `RoutineChecklistTracker`. A test supplies a fixed or advancing clock and
asserts exact behavior, including day rollover, without waiting.

Some methods take the time as an argument instead: `PairingCodeGenerator.generate(now:)`,
`FlashcardDeck.due(now)` and `FlashcardDeck.review(reviewedAt:)`.

## Injected randomness

`PairingCodeGenerator` takes an optional `Random`, defaulting to `Random.secure()`, so tests can
produce a known code while production codes come from a cryptographically secure source.

## Logic apart from the plugin class

Each package separates real logic from the `LumenPlugin` implementation. The plugin class holds
instances and exposes them by getter (`SpeechPlugin.board`, `ReadingPlugin.flashcardDeck`,
`MemoryPlugin.personDirectory`, `MobilityPlugin.gaitStabilityMonitor`). A host can use the logic
without the plugin lifecycle, which is how the app screens call them.

## Immutable values and mutable state

Value types are `@immutable` with `final` fields: `PersonProfile`, `CalendarEvent`, `Phrase`,
`ScamIndicator`, `ReviewOutcome`. Types that represent evolving state are explicitly mutable:
`Flashcard` (due date, repetition count, interval, easiness) and `Reminder` (due date, completed).

## Validators return, stores throw

Validation functions return an error object or `null`:

```dart
EmergencyProfileValidationError? validateEmergencyProfile(EmergencyProfile profile);
PersonProfileConsentError? validatePersonProfile(PersonProfile profile);
MobilityProfileValidationError? validateMobilityProfile(MobilityProfile profile);
```

A store that must never hold invalid data enforces the invariant by throwing the returned error:
`PersonDirectory.upsert` throws the `PersonProfileConsentError` from the validator.

## Sets of constants as data

Rules are kept as constant data next to the code that uses them, not scattered through logic: the
scam filter's keyword lists, the hearing alert presentations, the color namer's palette, the rest
break intervals and the default phrase board.

## Consent through the context

A plugin that could publish something sensitive asks `PluginContext.hasConsent` first, immediately
before publishing. `FamilyPlugin.notifyCaregiverOfStatus` is the reference example.

## Testing pattern

Plugin tests construct a `FakePluginContext` from `lumen_sdk_testing`, call `initialize` and
`start`, publish a `SenseEvent` on its bus and assert on the next published `AlertEvent`. Pure
logic is tested directly with table style cases (see the syllable and expiry date tests). The
`safety` package also exports a `lumen_plugin_safety_testing` entry point with `FakeSmsSender`.

## When to follow these

New packages should follow the same structure and patterns. See
[Writing a plugin step by step](/docs/sdk/writing-a-plugin/).
