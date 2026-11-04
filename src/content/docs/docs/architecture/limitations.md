---
title: "Known limitations"
description: "A consolidated, honest list of what Lumen cannot do yet and why."
---

This page gathers the limitations that appear across the wiki so nobody has to discover them one
module at a time.

## Sensing

- No live camera, microphone or accelerometer input. Nothing publishes `VisionFrameEvent`,
  `AudioChunkEvent`, `TranscriptEvent` or `SoundAlertEvent` from hardware yet.
- No on-device model inference. Scene description, banknote and medicine recognition, obstacle
  detection, speech recognition, sound classification, face recognition and text-to-speech all need
  models and bridges that do not exist.
- The SDK has no accelerometer or incoming SMS event types.

## App

- The running app uses in-memory storage, so settings do not survive a restart.
- Plugins are not registered with a live `PluginManager`; screens call package classes directly.
- `AppCapabilityGate` does not call real platform permission APIs.
- The UI is English only. A few outputs from plugin code remain Italian (see below).
- There is only a light theme (paper and ink).
- No manual screen reader testing has been performed.

## Modules

- **Safety**: SOS uses `FakeSmsSender` and can never send a real message. The scam filter is a
  rule-based keyword check, not a trained classifier, and its keywords are Italian.
- **Vision**: expiry date parsing understands Italian date formats and Italian month names. The
  color namer returns Italian color names from a fixed palette of eleven colors.
- **Hearing**: the summarizer is a word frequency heuristic with an Italian stop word list, not a
  language model. There is no live captioning.
- **Family**: no sync with `lumen-server`. The calendar and status are in memory.
- **Speech**: no text-to-speech output and no pictograms.
- **Reading**: syllable splitting follows standard Italian rules; there is no text-to-speech and no
  dyslexia-specific text adaptation beyond splitting.
- **Memory**: no face recognition. The `consentGiven` and `consentTimestamp` invariant exists in
  anticipation of it.
- **Mobility**: gait analysis runs on sample data only.

## Server

- Pairing creates a new caregiver account on every call and there is no multi-device account
  model.
- No push notifications.
- The model catalog endpoint returns an empty list and never serves model binaries.
- Tokens are stored as issued and are not rotated or revocable through an API yet.

## Models

- The catalog is empty, and no benchmark has been run. Battery drain needs on-device
  instrumentation that the harness does not automate.
- The espeak-ng licensing question and the choice of a Piper voice are unresolved. See the
  [license ledger](/docs/models/license-ledger/).

## Release

- No signed Android build and no release workflow.
