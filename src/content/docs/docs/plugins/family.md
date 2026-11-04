---
title: "Family package"
description: "lumen_plugin_family: pairing codes, the calendar, daily status, caregiver roles, notification text and FamilyPlugin."
---

```yaml
dependencies:
  lumen_plugin_family:
    git:
      url: https://github.com/lumen-assistive/lumen-plugins.git
      ref: v0.3.0
      path: packages/family
```

Import with `import 'package:lumen_plugin_family/lumen_plugin_family.dart';`.

## Public API

| Type | Purpose |
|---|---|
| `PairingCodeGenerator`, `PairingCode` | Six digit pairing codes with an expiry |
| `CalendarEvent`, `CalendarRecurrence`, `CalendarStore`, `InMemoryCalendarStore` | A recurrence aware calendar |
| `DailyStatus`, `DailyStatusValue`, `DailyStatusTracker` | A once a day status that rolls over |
| `CaregiverLink`, `CaregiverRole`, `CaregiverAction`, `caregiverRoleAllows` | Roles and permissions |
| `CaregiverNotificationComposer` | Builds notification text |
| `FamilyPlugin`, `shareStatusWithCaregiverConsentKey` | The `LumenPlugin` and its consent gate |

## `PairingCodeGenerator`

```dart
final generator = PairingCodeGenerator();
final issued = generator.generate(now: DateTime.now());
issued.code;       // six digits, for example '048213'
issued.expiresAt;  // now + 10 minutes
generator.validate(issued: issued, submittedCode: '048213', now: DateTime.now());
```

- The code is `Random.secure().nextInt(1000000)` padded to six digits, so leading zeros are kept.
- `validity` defaults to ten minutes and can be changed in the constructor.
- `validate` returns true only if the submitted code equals the issued code and `now` is before
  `expiresAt`.

## Calendar

`CalendarEvent` has `id`, `title`, `start`, `end`, optional `notes` and a `recurrence` of `none`,
`daily` or `weekly`. `CalendarStore` is an interface (`add`, `remove`, `listBetween`);
`InMemoryCalendarStore` implements it.

`listBetween(from, to)` returns events sorted by start. A one off event is included when its start is
inside the range. A recurring event is expanded into one occurrence per day or week whose start is
inside the range, each produced with `CalendarEvent.occurrenceAt` so the duration is preserved.

## Daily status

`DailyStatusValue` is `ok`, `needsAttention` or `unknown`. `DailyStatusTracker.setToday(value)` stamps
the value with today's date, and `statusForToday()` returns it only if that date is still today;
otherwise it returns `unknown`. The status therefore resets itself at midnight without a timer.

## Roles and permissions

| Role | viewCalendar | receiveAlerts | modifyConfig |
|---|---|---|---|
| `viewer` | yes | yes | no |
| `manager` | yes | yes | yes |

`caregiverRoleAllows(role, action)` answers a permission question. `CaregiverLink` records
`caregiverId`, `pairedDeviceId`, `role` and `pairedAt`.

## `CaregiverNotificationComposer`

`compose(status:, upcomingEvents:)` returns one English sentence set:

| Status | Prefix |
|---|---|
| `ok` | `Status: all ok.` |
| `needsAttention` | `Status: needs attention.` |
| `unknown` | `Status: not set yet today.` |

followed by `No upcoming events.` or `N upcoming event(s): title1, title2.` with the right singular or
plural word.

## `FamilyPlugin`

| Field | Value |
|---|---|
| `manifest.id` | `family` |
| capabilities | none |

`notifyCaregiverOfStatus(value)` is the reference example of a consent gate: it first checks
`context.hasConsent('share-status-with-caregiver')` and publishes nothing at all if consent was not
granted. When consent exists it publishes an `AlertEvent` with severity `warning` for
`needsAttention` and `info` otherwise. Both the granted and denied paths are tested.

The lifecycle methods are otherwise empty.

## What is not implemented

Delivering anything to a caregiver: push notifications, device to device sync and the connection to
`lumen-server`. This package is the local half only.

## Tests

`pairing_code_generator_test.dart`, `calendar_store_test.dart`, `daily_status_tracker_test.dart`,
`caregiver_notification_composer_test.dart` and `family_plugin_test.dart`. See the [Family screen](/docs/app/modules/family/).
