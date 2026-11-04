---
title: "Settings"
description: "Every control on the settings screen, what it changes, and what it persists."
---

The settings screen (`/settings`) lets a person change how the app looks and which modules are on.

## Appearance

| Control | What it does |
|---|---|
| Interface mode | A dropdown of the four [UI modes](/docs/app/ui-modes/), shown under its title. Saving updates the whole app immediately. |
| Text size | A slider from `1.0` to `2.0` in steps of `0.25` (four divisions), shown as a label. Applied as a text scaler at the app root. |

Both are saved into the `UserProfile` through `UserProfileRepository.save`.

## Modules

Every one of the eight modules has an ink outlined card with its badge (a rounded square in the module color) and two switches:

| Switch | Effect |
|---|---|
| Enabled | Adds or removes the module on the home screen (`ModuleConfigRepository.setEnabled`) |
| Consent to share with family | Records consent (`setConsentGranted`) that `AppConsentStore` reads for caregiver sharing |

## Important notice

A block in the brand yellow states that Lumen helps but does not replace a doctor or the 112 emergency
number, and is not a certified medical device.

## Developer

A "Developer mode" switch reveals a Diagnostics entry. The switch is local screen state and is not
persisted. See [Diagnostics](/docs/app/diagnostics/).

## Persistence

Settings are written through the repositories to the `AppDatabase`. Because the running app uses the
in-memory implementation, they do not survive a restart yet. See [Storage](/docs/app/storage/).

## Consent semantics

Revoking consent takes effect on the very next consent check; there is no cache. See the
[Consent model](/docs/privacy/consent/).

## Tests

`test/settings/settings_screen_test.dart` covers toggling a module and checking that it persists
through the repository, the developer mode toggle revealing diagnostics, and the text size slider
persisting a new value.
