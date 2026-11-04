---
title: "Family screen"
description: "The Family module screen: caregiver pairing code, shared calendar, daily status and caregiver notification."
---

Module id `family`, plugin package `lumen_plugin_family`. The screen's note states that sync to a
caregiver device through `lumen-server` is not wired up yet.

## Tools

### Caregiver pairing code

| | |
|---|---|
| Action | "Generate code" runs `PairingCodeGenerator.generate`. |
| Output | `Code: 481920 (valid for 10 minutes)`. The code is six random digits from a cryptographically secure source and expires after ten minutes. |

### Shared calendar

| | |
|---|---|
| Input | An event title (default `Doctor visit`) and minutes from now (default `60`). |
| Action | "Add event" adds a 30 minute event to an in-memory `CalendarStore`, then lists events from one day ago to thirty days ahead. |
| Output | A list of events with their start times. |

### Today's status

| | |
|---|---|
| Actions | "All ok" and "Needs attention" call `DailyStatusTracker.setToday`. |
| Output | `Today's status: all ok`, `Today's status: needs attention`, or `No status set for today yet.` |

The status resets automatically on a new calendar day: an old value reads as unknown.

### Caregiver notification

| | |
|---|---|
| Action | "Compose notification" runs `CaregiverNotificationComposer.compose` with today's status and the events added above. |
| Output | For example `Status: all ok. 1 upcoming event: Doctor visit.` |

## What is real and what is not

Real: code generation and validation logic, recurrence aware calendar listing, the daily status
with day rollover, the notification text and the role permission table. Not implemented: delivering
anything to a caregiver. `FamilyPlugin.notifyCaregiverOfStatus` publishes an alert only when the
user has granted the `share-status-with-caregiver` consent, but nothing triggers it from this
screen. See the [Family package](/docs/plugins/family/).

## Test

`test/modules/family_screen_test.dart` generates a six digit code, adds an event and lists it, and
sets and shows the daily status.
