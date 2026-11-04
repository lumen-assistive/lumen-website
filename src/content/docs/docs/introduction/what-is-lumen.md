---
title: "What is Lumen"
description: "An open source, offline-first, privacy-by-design assistant for people with a limitation, and the idea behind it."
---

Lumen is an open source assistant that turns a smartphone into practical help for people with a
limitation in seeing, hearing, speaking, reading, remembering, moving, or staying safe. The name
means "light" in Latin, and the product is meant to be exactly that: a little light, when it is
needed, rather than a loud tool that demands attention.

## The core idea

Most assistive technology is built around one condition and one device feature. Lumen takes the
opposite approach: a single shared **senses engine** (vision, audio, text) powers eight independent
**modules**, each delivered as a plugin. A person turns on only the modules they need, and the
interface adapts to how they need to use it.

| Module | What it is for |
|---|---|
| Vision | Reading expiry dates, naming colors, checking contrast, and (once models exist) describing scenes |
| Hearing | Summarizing spoken text, formatting captions, and turning sound alerts into vibration and light |
| Safety | A scam message checker, fall detection, a periodic check-in, and a cancellable emergency SOS |
| Family | Caregiver pairing, a shared calendar, a daily status, and consent-gated notifications |
| Speech | A quick phrase board with usage-ranked suggestions and sentence building |
| Reading | Syllable splitting, spaced repetition flashcards, and reading time estimates |
| Memory | A consent-gated directory of people, recurring reminders, and a daily routine checklist |
| Mobility | Gait stability monitoring, a mobility profile, and rest break planning |

Inside the app a few of these carry shorter labels (Speak, Read and Study, Remember, Move); the
identifiers used in code and in these docs are the ones in the table.

## Three commitments

1. **Offline first.** Every essential feature runs on the phone with no network connection.
2. **Privacy by design.** No audio or image leaves the device unless the person explicitly chooses
   to share it. Anything that is shared is gated by consent that is read at the moment of sharing.
3. **Accessible by construction.** The interface itself is built for low vision, deafness, and
   motor and cognitive limitations: large touch targets, high contrast, scalable text, and a
   typeface designed for legibility.

## What Lumen is not

Lumen helps but does not replace a doctor or the 112 emergency number, and it is not a certified
medical device. The app says so in its settings screen, and these docs repeat it wherever a
feature touches safety.

## Honest scope

Lumen is under active development. Every module ships real, tested business logic today, but the
native bridges that connect that logic to a live camera, microphone, accelerometer or SMS gateway,
and the on-device models that would power scene description or speech recognition, do not exist
yet. Each module page in this wiki states exactly which parts of that module are real and which are
still pending. See [Project status](/docs/introduction/status/) for the complete picture.

## Where to go next

- New to the project: [Who Lumen is for](/docs/introduction/who-is-it-for/) and
  [Design principles](/docs/introduction/principles/).
- Want to understand the structure: [Architecture overview](/docs/introduction/architecture/).
- Want to run it: [Development setup](/docs/getting-started/development-setup/) and
  [Running the app](/docs/getting-started/running-the-app/).
- Want to build a module: [Writing a plugin step by step](/docs/sdk/writing-a-plugin/).
