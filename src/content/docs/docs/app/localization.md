---
title: "Text and localization"
description: "How user facing text is stored, why the app is English only, and how to add or change a string."
---

All user facing text lives in one place: `lib/src/l10n/app_strings.dart`.

## How it works

`AppStrings` is a plain `LocalizationsDelegate` over a constant map of keys to strings. It is not
the `flutter gen-l10n` pipeline: that keeps the build deterministic and inspectable, without
depending on a code generation step.

```dart
final strings = AppStrings.of(context);
Text(strings('homeTitle'));
```

A missing key returns the key itself, so a missing translation never crashes the app.

## English only

The app ships a single English locale (`supportedLocales` is `[Locale('en')]`). This is a
deliberate decision: the product should not show Italian module names anywhere in the interface.
The delegate reports every locale as supported and returns the same strings.

## Placeholders

Dynamic values use `{name}` placeholders replaced by the calling widget:

```dart
strings('familyPairingResult')
    .replaceAll('{code}', code)
    .replaceAll('{minutes}', '10');
```

Strings with placeholders include `visionExpiryFound`, `visionContrastResult`, `hearingAlertResult`,
`familyPairingResult`, `readingFlashcardResult`, `memoryReminderDue`, `mobilityGaitResult` and
`mobilityBreaksResult`.

## Where output text comes from

Not everything on screen is an app string. Some output comes straight from plugin packages:

- Scam filter reasons (`reasonEn` of each indicator).
- Color names from the color namer, which are Italian words from a fixed palette.
- Sound alert labels, such as `smoke_alarm`, shown as they are.
- The caregiver notification text from `CaregiverNotificationComposer`, which is English.

## Adding a string

1. Add the key and text to the map in `app_strings.dart`.
2. Use `strings('yourKey')` in the widget.
3. Keep the text plain: no emoji, no em dashes, no placeholder or "coming soon" copy.
4. Add or update a widget test if the text is asserted on.

## Why the manifests still have two names

`PluginManifest.nameIt` and `AlertEvent.messageIt` remain in the SDK contract, because removing them
would be a breaking change for every consumer. See
[Design decisions](/docs/architecture/design-decisions/).
