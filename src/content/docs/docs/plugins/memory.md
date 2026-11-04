---
title: "Memory package"
description: "lumen_plugin_memory: the consent-aware person directory, reminders, daily routine checklist and MemoryPlugin."
---

```yaml
dependencies:
  lumen_plugin_memory:
    git:
      url: https://github.com/lumen-assistive/lumen-plugins.git
      ref: v0.3.0
      path: packages/memory
```

Import with `import 'package:lumen_plugin_memory/lumen_plugin_memory.dart';`.

## Public API

| Type | Purpose |
|---|---|
| `PersonProfile`, `PersonDirectory`, `validatePersonProfile`, `PersonProfileConsentError` | People to remember, with enforced consent |
| `Reminder`, `ReminderRecurrence`, `ReminderScheduler` | One off and recurring reminders |
| `RoutineChecklistTracker` | A daily checklist that resets each day |
| `MemoryPlugin` | The `LumenPlugin` |

## `PersonProfile` and the consent invariant

`PersonProfile` has `id`, `name`, `relationship`, `notes`, `consentGiven` (default false) and a
nullable `consentTimestamp`. The validator enforces that the two consent fields always agree:

| State | Result |
|---|---|
| `consentGiven` true, no timestamp | `PersonProfileConsentError`: a profile with `consentGiven` set to true must have a `consentTimestamp` |
| `consentGiven` false, timestamp set | `PersonProfileConsentError`: a profile with a `consentTimestamp` must have `consentGiven` set to true |
| otherwise | valid |

This protects people who are remembered: consent to future recognition is recorded together with when
it was given, and a profile cannot silently claim consent it does not have.

`copyWith` copies a profile (the `id` is fixed).

## `PersonDirectory`

| Method | Behavior |
|---|---|
| `upsert(profile)` | Validates, then adds or replaces by id. An invalid profile throws the validator's error and nothing is stored. |
| `remove(id)` | Removes a profile if present |
| `byId(id)` | The profile or `null` |
| `all()` | Every profile |
| `withConsent()` | Only profiles with `consentGiven` true |

## Reminders

A `Reminder` has `id`, `title`, a mutable `dueAt`, a `recurrence` (`none`, `daily`, `weekly`) and a
mutable `completed` flag.

```dart
final scheduler = ReminderScheduler();
scheduler.add(Reminder(id: 'r1', title: 'Take medicine', dueAt: DateTime.now()));
scheduler.dueReminders();      // reminders due and not completed
scheduler.markHandled('r1');   // completed, or rescheduled if recurring
scheduler.snooze('r1', const Duration(minutes: 10));
```

- `dueReminders()` returns reminders that are not completed and whose `dueAt` is not after now.
- `markHandled(id)` completes a one off reminder, and moves a daily reminder forward by one day or a
  weekly one by seven days.
- `snooze(id, by)` pushes `dueAt` forward by the given duration.
- Unknown ids are ignored. The clock is injectable.

## `RoutineChecklistTracker`

A daily checklist for a fixed list of `steps`:

```dart
final tracker = RoutineChecklistTracker(steps: ['medication', 'lockDoor']);
tracker.markDone('medication');
tracker.remainingToday();          // ['lockDoor']
tracker.isFullyCompleteToday();    // false
```

Completion is tracked for the current calendar day, and the first call on a new day clears it, so the
checklist resets at midnight without a timer. `markDone` ignores a step that is not in the list.

## `MemoryPlugin`

| Field | Value |
|---|---|
| `manifest.id` | `memory` |
| `nameEn` | `Remember` |
| capabilities | none |

`checkDueReminders()` publishes an info `AlertEvent` (`Reminder: <title>`) for each due reminder and
then marks it handled. The host must call it; nothing schedules it yet. The lifecycle methods are
otherwise empty.

## What is not implemented

Face recognition. The consent invariant exists in anticipation of it, and recognition would run on
device only and require the consent of the people recognized, not just the device owner.

## Tests

`person_directory_test.dart`, `reminder_scheduler_test.dart`,
`routine_checklist_tracker_test.dart` and `memory_plugin_test.dart`. See the
[Memory screen](/docs/app/modules/memory/).
