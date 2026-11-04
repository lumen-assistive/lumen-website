---
title: "Design principles"
description: "The non-negotiable principles that shape every decision in every Lumen repository."
---

These principles are applied in code review. A change that conflicts with one of them is rejected
or reworked, not merged with an apology.

## 1. On-device by default

Camera frames, audio and model inference never leave the phone by default. The event bus that
carries sense data (`InMemoryEventBus`) is an in-process multiplexer with no network transport, and
plugins cannot reach a sensor except through that bus. See
[Data flow](/docs/architecture/data-flow/).

## 2. Consent is read, not assumed

Sharing is gated by `PluginContext.hasConsent`, read immediately before anything that could reach
outside the device is published. There is no cache that would delay a revocation. See the
[Consent model](/docs/privacy/consent/).

## 3. Contracts over convenience

A plugin never opens a camera, microphone, file or model itself. It receives everything through a
`PluginContext`. This keeps hardware access and consent mechanical rather than a matter of
discipline, and it keeps every module testable with in-memory fakes. See
[Design decisions](/docs/architecture/design-decisions/).

## 4. Honest scope

Nothing is described as working unless it works and is tested. Fake components are named fake: the
SOS flow in the app uses a `FakeSmsSender` and says so on screen. No metrics, user tests,
partnerships or model results are published until they are real and verifiable. Every plugin
package's README and every module page here states what is not implemented.

## 5. Accessibility is a hard requirement

Touch targets are at least 48 logical pixels. Colors are checked against WCAG contrast thresholds.
Text scales up to twice its size. Controls carry semantic labels. Accessibility is part of the
definition of done, not a follow-up task. See [Accessibility overview](/docs/accessibility/overview/).

## 6. Pinned, versioned dependencies

Every consumer depends on a tagged release of the contracts it uses, never on `main`. A breaking
change cannot silently reach a consumer. See
[Dependency pinning](/docs/architecture/dependency-pinning/) and
[Versioning policy](/docs/sdk/versioning/).

## 7. Open and permissive

All original code is Apache-2.0. Every bundled model or dataset has a recorded license and a
compatibility verdict; anything incompatible is flagged and not bundled. See
[License ledger](/docs/models/license-ledger/).

## 8. Plain, professional engineering

Code, comments, commits and documentation are written in English. Comments explain intent and
non-obvious decisions, not what the code already says. There are no emoji and no placeholder
repositories. Commits follow Conventional Commits and are small and atomic. See
[Workflow and conventions](/docs/contributing/workflow/).
