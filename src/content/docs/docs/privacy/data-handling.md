---
title: Data handling in detail
description: The technical detail behind Lumen's on-device-by-default data model.
---

See [Privacy](/privacy/) for the plain-language summary. This page is the technical detail behind
it, for contributors and anyone evaluating the project's actual data handling rather than its
marketing copy.

## What stays on-device

Every essential feature processes camera and microphone input, and any model inference, entirely
on the device. No audio or image is transmitted anywhere by default. This is enforced
architecturally, not just by policy: `lumen-core`'s `LumenEventBus` is an in-process bus with no
network transport, and no plugin has network access to raw sense data, because no plugin has access
to raw sense data at all except through that bus.

## What the app stores locally

`lumen-app`'s intended local data model (see [Architecture overview](/docs/introduction/architecture/)):

- **`UserProfile`**: onboarding answers, enabled modules, UI mode, theme, text scale.
- **`ModuleConfig`**: per-module settings and consent flags.
- **`CaregiverLink`**: pairing info for the Famiglia module, roles, last "all ok" status, consent
  timestamps.
- **`EmergencyProfile`**: medical card data, emergency contacts, SOS message template. Local-only
  unless the user triggers SOS.

`lumen-app` defines an `AppDatabase` interface with a production-ready `SqlCipherAppDatabase`
implementation (encrypted local storage via `sqflite_sqlcipher`); it is not wired into the running
app yet, pending a per-device passphrase source. See [Project status](/docs/introduction/status/).

## What leaves the device, and when

Only two things ever leave the device, and both require an explicit, separate action from the
user:

1. **Sharing with a caregiver** through the Famiglia module, gated by
   `PluginContext.hasConsent` — see [Consent model](/docs/privacy/consent/).
2. **Syncing with `lumen-server`**, an optional backend. Data sent there is an opaque, encrypted
   blob: `lumen-server`'s own data model
   (`EncryptedBlob`) stores ciphertext only, keyed by device and category, and the server has no
   way to decrypt it. See that repository's README for the exact schema.

## What this project does not do

- It does not run analytics, telemetry, or crash reporting that leaves the device, in any
  repository, today.
- It does not sell, share, or monetize any data, user or otherwise.
- It does not use cloud-based AI inference for any sense data; all model inference is designed to
  run on-device, once `lumen-core`'s native bridges exist.
