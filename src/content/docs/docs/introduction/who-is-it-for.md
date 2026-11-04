---
title: "Who Lumen is for"
description: "The people Lumen is designed to serve, and how the first-launch questions adapt the app to each of them."
---

Lumen does not assume a single user. It is designed around people, not diagnoses, and it adapts to
the person rather than asking the person to adapt to it.

## People with low vision

For someone who cannot reliably perceive the screen, the app chooses its **voice-first,
high-contrast** mode: a larger base text size, a brighter accent that clears the highest contrast
tier, and large controls. The Vision module is enabled so that expiry dates, colors and contrast
can be checked. See [UI modes](/docs/app/ui-modes/).

## Deaf and hard-of-hearing people

A hearing difficulty selects the **visual, with vibration** mode, where vibration and flashing
stand in for audio cues. The Hearing module is enabled for transcript summaries, caption-sized
text and sound alert presentation (doorbell, smoke alarm, siren, crying baby).

## Older adults

Someone who wants fewer choices on screen can pick the **simple** mode on the last onboarding
question: a larger text scale and an essential layout. Safety (fall detection, scam checking,
check-in, SOS) and Family (a daily status shared with a caregiver) are the modules most often
enabled for this audience.

## Caregivers and families

The caregiver question on onboarding enables the Family module. A caregiver can be paired with a
device with a short numeric code, see a shared calendar, and receive a daily "all ok" or "needs
attention" status. Everything shared is consent-gated, and the optional
[server](/docs/server/overview/) only ever sees encrypted data.

## Students and people who read with difficulty

The Reading module splits Italian words into syllables, runs a real spaced repetition scheduler
(the SM-2 algorithm) over flashcards, and estimates reading time. It is a good fit for people who
find dense text hard to approach, including people with dyslexia, although dyslexia-specific text
adaptation beyond syllable splitting is not implemented yet.

## People who find speaking or remembering hard

Speech offers a board of quick phrases grouped into needs, greetings, emotions and emergency, with
suggestions that adapt to what a person actually uses. Memory keeps a directory of people to
remember (only with consent), recurring reminders, and a short daily routine checklist.

## People with limited mobility

Mobility holds a mobility profile (aid type and how much guidance the person wants), analyzes gait
rhythm for signs of instability, and plans rest breaks for a walk of a given length.

## Contributors and developers

Lumen is also a platform. A developer can write a new module against the
[plugin SDK](/docs/sdk/plugin-lifecycle/) without touching the engine, using the same interfaces
the eight official modules use.
