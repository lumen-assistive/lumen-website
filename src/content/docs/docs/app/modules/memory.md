---
title: "Memory screen"
description: "The Memory module screen: people to remember, reminders and a daily routine checklist."
---

Module id `memory` (labelled "Remember" in the app), plugin package `lumen_plugin_memory`. The note
states that real face recognition needs a camera and a model that are not implemented yet.

## Tools

### People to remember

| | |
|---|---|
| Input | A name (default `Maria`), a relationship (default `daughter`) and a switch "Consent to future recognition" (off by default). |
| Action | "Add person" adds a `PersonProfile` to the in-memory `PersonDirectory`. |
| Output | `Person added.` and a list of people, each showing `consent given` or `consent not given`. |

A profile with consent carries a timestamp. The directory enforces the invariant that consent and its
timestamp always appear together; the screen shows the validator's message if it is violated.

### Reminders

| | |
|---|---|
| Input | A title (default `Take medicine`) and minutes from now (default `0`). |
| Actions | "Add reminder" adds a `Reminder` and immediately checks what is due. "Check due reminders" lists what is due. |
| Output | `Due now: Take medicine` or `No reminders due.` |

### Daily routine

Two checkboxes (`Take morning medication` and `Lock the door`) tracked by a
`RoutineChecklistTracker`. The note says it resets every day at midnight. The result is
`Routine complete for today.` or `Still to do: ...`.

## What is real and what is not

Real: the consent aware directory, reminder scheduling with recurrence and snooze, and the daily
checklist with day rollover. Not implemented: face recognition, and delivery of reminders as
notifications. `MemoryPlugin.checkDueReminders` can publish info alerts for due reminders, but
nothing calls it on a timer. See the [Memory package](/docs/plugins/memory/).

## Test

`test/modules/memory_screen_test.dart` adds a person without consent and adds a reminder that is
due immediately.
