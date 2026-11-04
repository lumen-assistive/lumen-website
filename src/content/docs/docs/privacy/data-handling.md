---
title: "Data handling in detail"
description: "The technical detail behind Lumen on-device-by-default data model."
---

See [Privacy](/privacy/) for the plain language summary. This page is the technical detail, for
contributors and for anyone evaluating the project's actual data handling rather than its marketing.

## What stays on the device

Every essential feature processes camera and microphone input, and any model inference, on the device.
No audio or image is transmitted anywhere by default. This is architectural, not just policy: the
`InMemoryEventBus` that carries sense data is an in-process bus with no network transport, and a plugin
has no access to raw sense data except through that bus.

Today no component captures real camera or microphone data at all, so no such data exists to leave the
device.

## What the app stores locally

| Record | Contents | Where |
|---|---|---|
| `UserProfile` | Interface mode, enabled module ids, text scale | `AppDatabase` |
| `ModuleConfig` | Per module enabled and consent flags | `AppDatabase` |
| Module working state | Phrase usage, flashcards, people, reminders, calendar, status | Memory only, not persisted |

The production database implementation is encrypted at rest with SQLCipher, and since v0.6.0 the running app uses it, with the passphrase held in the Android keystore. See [Storage](/docs/app/storage/) and
[Encryption at rest](/docs/privacy/encryption-at-rest/).

## What leaves the device, and when

Only two paths exist, each needing an explicit, separate user action. See
[What leaves the device](/docs/privacy/what-leaves-the-device/).

1. Sharing with a caregiver through the Family module, gated by `hasConsent`.
2. Syncing with `lumen-server`, an optional backend that stores opaque encrypted blobs.

Neither is connected in the current app.

## What this project does not do

- It does not run analytics, telemetry or crash reporting that leaves the device, in any repository.
- It does not sell, share or monetize any data.
- It does not use cloud based AI inference for sense data; model inference is designed to run on
  device.
- It does not contact any server unless the user turns syncing on.

## Data minimization in the code

- Plugins receive only the events of the types they subscribe to.
- Consent is read per plugin, scoped by plugin id.
- The server schema has no fields for plaintext personal data.
- Alerts carry a short message and a plugin id, not the underlying sense data.

## Retention and deletion

Because nothing is persisted by the running app, there is nothing to delete today. When persistent
storage is wired in, deleting local data means removing the encrypted database file; server side,
removing the device's rows removes its blobs. A deletion endpoint is not implemented yet.
