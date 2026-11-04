---
title: "Design decisions"
description: "The reasoning behind the structural choices in Lumen, including the trade-offs accepted."
---

Each entry states the decision, the reason, and what it costs.

## Plugins never touch hardware

**Decision.** A plugin receives an event bus, a model registry and a consent lookup through
`PluginContext`, and nothing else.

**Reason.** Sensor access is then centralized, so consent and power management live in one place,
and a plugin can be unit tested with `FakePluginContext` and no device.

**Cost.** A new kind of sensor data needs a new `SenseEvent` type in the SDK (a minor version
bump) before any plugin can use it. This is why Safety and Mobility cannot yet subscribe to
accelerometer data.

## A pure Dart core

**Decision.** `lumen-core` ships as a pure Dart package with no Flutter dependency, and the native
bridges are a later phase.

**Reason.** The platform-independent engine can be tested fast on any machine. Native code needs a
full Flutter plus Android and Xcode toolchain to verify, and shipping unverified native code would
risk silently broken "complete" code.

**Cost.** There is no live camera or microphone yet.

## Interfaces owned by the app for consent and capability

**Decision.** `CapabilityGate` and `ConsentStore` are interfaces in `lumen-core`, implemented in
`lumen-app`.

**Reason.** The engine should not decide how consent is stored or how permission dialogs look.
Keeping those in the app lets the UI and storage evolve without touching the engine.

**Cost.** The app currently implements them with in-memory state (`AppCapabilityGate`) and a
single consent flag per module (`AppConsentStore`).

## A single consent flag per module

**Decision.** The app stores one `consentGranted` flag per module, and every consent key maps to
it.

**Reason.** The MVP needs exactly one kind of consent (sharing with a paired caregiver).
Fine-grained consent keys are a natural extension when a module needs more than one kind.

**Cost.** A module with two distinct consents cannot represent them separately yet.

## Opaque encrypted blobs on the server

**Decision.** The server stores ciphertext keyed by device and category and has no decryption key.

**Reason.** The server should never see calendar entries, daily status or any other personal data.

**Cost.** The server cannot search or merge blobs; clients own all interpretation and key
management.

## Two names on every manifest, English UI

**Decision.** `PluginManifest` keeps both `nameIt` and `nameEn`, and `AlertEvent` keeps both
`messageIt` and `messageEn`, even though the shipped app UI is English only.

**Reason.** Removing the Italian fields would be a breaking contract change for every consumer. The
packages set both name fields to the same English value.

**Cost.** Some plugin output (for example scam filter keywords and the color namer's names) is still
Italian, since those match Italian message text and packaging.

## Pure logic first, bridges later

**Decision.** Each module's package implements the testable logic first (parsers, scorers, state
machines) with injectable clocks and randomness.

**Reason.** The logic can be verified now, and the future native bridge becomes a thin layer that
feeds it events.

**Cost.** Several `start` and `stop` methods are empty today. The docs say so wherever it applies.

## One flat light theme

**Decision.** The app has a single light theme in paper and ink, with solid colors, ink outlines and no
gradients, glows or shadows. It replaced an earlier dark, glowing look.

**Reason.** Flat blocks of one color with ink text are crisp for people with low vision, the contrast
of every pairing is verified once at AAA, and the result is recognizable rather than generic.

**Cost.** There is no dark theme. The high contrast tiers enlarge text and use one column instead of
changing colors.
