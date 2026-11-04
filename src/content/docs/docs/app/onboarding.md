---
title: "Onboarding"
description: "The five first-launch questions, exactly what each one enables, and how the interface mode is chosen."
---

On first launch, five questions decide which modules to enable and how the interface should behave.
Answers are collected with large buttons. Voice input is not implemented: it needs on-device speech
recognition wired through `lumen-core`'s native bridges, which do not exist yet, so every question
is answered by tap rather than by a control that would not work.

## The questions

| Step | Question | A "Yes" enables |
|---|---|---|
| 1 | Do you have difficulty seeing clearly? | Vision module, and voice-first high contrast mode |
| 2 | Do you have difficulty hearing? | Hearing module, and visual with vibration mode |
| 3 | Would you like safety features such as fall detection and emergency SOS? | Safety module |
| 4 | Are you setting this up for a loved one, or do you want a family member kept informed? | Family module |
| 5 | How would you like the app to look? | Chooses between "Simple and essential" and "Complete, with every option" |

Speech, Reading, Memory and Mobility are not enabled by onboarding. They can be turned on later in
[settings](/docs/app/settings/).

## How the interface mode is chosen

`OnboardingController.computeOutcome` turns the answers into a `UiMode` with this priority:

1. A vision difficulty gives `voiceFirstHighContrast`.
2. Otherwise a hearing difficulty gives `visualWithVibration`.
3. Otherwise the final choice decides: "Simple and essential" gives `simple`, anything else gives
   `complete`.

Vision takes priority over hearing because it determines whether the person can reliably perceive
the screen at all. A hearing difficulty alone is better served by the fully visual, vibration led
mode.

| Vision | Hearing | Last answer | Resulting mode |
|---|---|---|---|
| Yes | any | any | Voice-first, high contrast |
| No | Yes | any | Visual, with vibration |
| No | No | Simple | Simple |
| No | No | Complete | Complete |

## What the screen looks like

A progress bar of five segments fills as you advance, with a counter ("1 / 5") beside the title.
Each of the first four questions shows a large glowing badge with the icon and color of the module
it is about (eye, sound bars, shield, family). The last question shows the brand mark. The "Yes"
button is the filled primary action and "No" is a quieter outlined button.

## What happens at the end

The router saves a `UserProfile` with the computed mode, the enabled module ids and a text scale
of `1`. It then records each enabled module as enabled through `ModuleConfigRepository.setEnabled`
and navigates to `/home`. Because the running app uses in-memory storage today, a restart shows
onboarding again.

## Data model involved

`OnboardingAnswers` holds the raw answers (four booleans and a `ComplexityPreference`, defaulting
to `complete`). `OnboardingOutcome` holds the result (`uiMode` and `enabledModuleIds`). The logic
is a pure function, covered by its own unit test.
