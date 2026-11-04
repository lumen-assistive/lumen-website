---
title: "What leaves the device"
description: "An exhaustive list of every way data can leave the phone, and the current state of each."
---

Lumen's default is that nothing leaves the device. This page lists every exception, so the claim can be
checked.

| Path | Needs | Data sent | Current state |
|---|---|---|---|
| Share status with a caregiver | Consent flag granted, an explicit action | A short alert message and the plugin id | Logic exists in the Family package; not connected to a transport |
| Sync with `lumen-server` | The user turning sync on | Client encrypted blobs, a category name, timestamps and a device token | Server exists; the app does not call it |
| Pair a device | The user starting pairing | A caregiver display name and a device label | Server endpoint exists; the app does not call it |
| Download a model | Network consent | A request for a model pack by id | No model exists; no downloader implementation is bundled |
| Send an SMS (SOS) | The user starting SOS and not cancelling in the window | The SOS message to chosen recipients | Not possible: the app uses a fake sender |

## What never leaves

- Camera frames and audio. They are only ever carried on the in-process event bus.
- Text pasted into tools (labels, transcripts, messages). It is processed locally.
- Accelerometer data used by Safety and Mobility.
- The contents of the person directory and reminders.
- Any analytics or telemetry: there is none.

## How the claim is enforced

- The event bus has no network transport.
- Plugins reach nothing except through their context.
- Consent is read before sharing.
- The server schema holds ciphertext, not plaintext.

## What to check if you audit

- The dependency list in each `pubspec.yaml` (no analytics SDK is present).
- That `lumen-app` makes no HTTP calls (it has no HTTP client dependency today).
- The server's tables in [Server data model](/docs/server/data-model/).
