---
title: "Mobility screen"
description: "The Mobility module screen: gait stability monitor, mobility profile and rest break planner."
---

Module id `mobility` (labelled "Move" in the app), plugin package `lumen_plugin_mobility`. The note
explains that gait stability is monitored over sample walks, or over the live accelerometer when the
switch is on (Android app v0.6.0 and later). The browser demo has no accelerometer.

## Tools

### Gait stability monitor

| | |
|---|---|
| Actions | "Simulate steady walk" feeds eight steps spaced 600 ms apart. "Simulate unsteady walk" feeds eight steps at irregular intervals (300, 900, 300, 1200, 300, 1500, 300 ms). |
| Output | `Steady rhythm. 8 steps detected, 114 steps per minute.` for the steady walk, or `Irregular rhythm: possible stumble risk. 8 steps detected, 100 steps per minute.` for the unsteady one. |

The monitor detects steps as upward crossings of a magnitude threshold of 11.5 and flags irregular
rhythm when the coefficient of variation of step intervals exceeds 0.35, but only after at least
four steps. See the [Mobility package](/docs/plugins/mobility/).

### Mobility profile

| | |
|---|---|
| Input | An aid type (No aid, Cane, Wheelchair, Walker, Other), a guidance verbosity (Minimal, Standard, Detailed) and notes. |
| Action | "Save profile" validates the profile with `validateMobilityProfile`. |
| Output | `Profile saved.` or the validation message. Choosing "Other" requires notes describing the aid. |

### Plan rest breaks

| | |
|---|---|
| Input | The walk duration in minutes (default `40`), plus the verbosity chosen above. |
| Action | "Plan breaks" runs `RestBreakPlanner.breakPoints`. |
| Output | `Suggested breaks at minute: 12, 24, 36` for a 40 minute walk at standard verbosity, or `No break needed for such a short walk.` |

The break interval is 20 minutes for minimal, 12 for standard and 7 for detailed guidance.

## What is real and what is not

Real: gait analysis over supplied samples, profile validation and break planning. Not implemented:
a live accelerometer feed (the SDK has no accelerometer event type yet) and any guidance output.
`MobilityPlugin` exposes its monitor but its lifecycle methods are empty.

## Test

`test/modules/mobility_screen_test.dart` runs both preset walks and saves a profile.
