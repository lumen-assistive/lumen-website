---
title: What is Lumen
description: An overview of Lumen, its eight modules, and its core design commitments.
---

Lumen is an open source, offline-first, privacy-by-design assistant. It turns a smartphone into
help for people with a limitation in seeing, hearing, speaking, reading and studying, remembering,
moving, or staying safe. It is built for the GF Marilli Prize by HackersGen.

## The senses engine and eight modules

A single shared multimodal AI layer, the senses engine, powers eight modules delivered as
independent plugins:

| Module | Italian name | What it does |
|---|---|---|
| Vedere | Vedere | See: scene description, OCR, expiry dates, banknotes, medicines |
| Sentire | Sentire | Hear: offline live captions, sound alerts, transcripts |
| Parlare | Parlare | Speak: communication support |
| Leggere e Studiare | Leggere e Studiare | Read and Study support |
| Ricordare | Ricordare | Remember: memory support, on-device-only consented face recognition |
| Protezione | Protezione | Safety: fall detection, offline SOS, scam filter |
| Muoversi | Muoversi | Move: mobility and safe movement support |
| Famiglia e caregiver | Famiglia | Family and caregivers: remote configuration, consented alerts |

See [Project status](/docs/introduction/status/) for which modules have real code today, and
[Modules](/moduli/) on the main site for the same information in plain language.

## Onboarding adapts the interface, not just the features

On first launch, a short "who are you" onboarding — five questions, answered by tap today, by
voice in the future once on-device speech recognition exists — decides two things: which modules
to turn on, and how the interface itself should behave. The same codebase renders differently for
different people:

- **Voice-first, high contrast** for low vision: large buttons, maximum contrast, short labels.
- **Visual with vibration** for deaf users: no reliance on sound, haptic feedback stands in for
  audio cues.
- **Simple** for elderly users: fewer controls, larger touch targets, calmer pacing.
- **Complete** for students and power users: the full control surface.

## Core commitments

These are treated as hard requirements, not aspirations, across every repository:

- **On-device by default.** Every essential feature works with no network connection. No audio or
  image ever leaves the device unless the person explicitly chooses to share it.
- **Explicit, revocable consent** for anything that is not on-device-only, enforced in code through
  `lumen_sdk`'s `PluginContext.hasConsent` — see [Consent model](/docs/privacy/consent/).
- **No fabrication.** No invented user tests, metrics, or partnerships appear anywhere in this
  project's documentation, website, or code. Where something is not real yet, it says so.
- **Medical and safety features assist, they do not replace** a doctor or the 112 emergency number,
  and Lumen is not a certified medical device.
- **Accessibility is the product**, not an add-on: WCAG 2.2 AA minimum, full screen reader support,
  and every action reachable by voice, once voice input is implemented.

## Where to go next

- New to the codebase: [Repository map](/docs/getting-started/repository-map/).
- Want to understand how the pieces fit together: [Architecture overview](/docs/introduction/architecture/).
- Want to build a module: [Building a plugin](/docs/contributing/plugins/).
