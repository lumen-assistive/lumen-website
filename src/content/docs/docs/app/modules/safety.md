---
title: "Safety screen"
description: "The Safety module screen: scam checker, fall detection, periodic check-in and emergency SOS."
---

Module id `safety`, plugin package `lumen_plugin_safety`. The screen's note states that SOS uses a
fake message sender and can never send a real message, and that fall detection uses simulated
accelerometer data, not a live sensor.

## Tools

### Scam message checker

| | |
|---|---|
| Input | A text field pre-filled with `Il tuo conto e bloccato. Invia subito il codice OTP per sbloccarlo.` |
| Action | "Check message" runs `ScamFilter.assess`. |
| Output | The combined English reasons of every matched indicator, or `No suspicious element recognized in this message.` |

For the default message the result is `It asks for a code, PIN, or password: no real bank or service
ever asks for these by message.` The filter's keywords are Italian. See the
[Safety package](/docs/plugins/safety/).

### Fall detection

| | |
|---|---|
| Input | Two preset series of accelerometer samples. |
| Actions | "Simulate steady readings" feeds readings around 9.8 m/s squared. "Simulate a fall" feeds free fall, an impact of 30, and then stillness. |
| Output | `No fall detected.` or `Fall detected.` from `FallDetector.detect`. |

The fall series reads 0.8 to 1.0 between 100 and 450 ms (free fall), then 30.0 at 500 ms (impact),
then about 9.5 to 10.1 for the next 1.7 seconds (stillness).

### Periodic check-in

| | |
|---|---|
| Interval | 12 hours (a constant in the screen). |
| Actions | "Check in now" records a check-in. "Check status" reports whether the check-in is overdue. |
| Output | `All good, no overdue check-in.` or `Check-in overdue: no recent confirmation.` |

Before the first check-in the status is overdue, because no check-in exists.

### Emergency SOS

| | |
|---|---|
| Message | `Lumen SOS: help needed.` to a placeholder recipient. |
| Cancel window | 5 seconds (the controller default is 10; the screen passes 5). |
| Actions | "Start SOS" begins the countdown. "Cancel" cancels it. |
| States shown | `No SOS in progress.`, `Counting down, you can still cancel.`, `Message ready to send (fake sender, no real SMS sent).`, `SOS cancelled.` |

The controller is wired to `FakeSmsSender`, which only records what it was asked to send. Nothing is
sent.

## What is real and what is not

Real: the scam filter, the fall detector over supplied samples, the check-in scheduler and the SOS
state machine. Not implemented: a live accelerometer, a real SMS sender, location, and reading
incoming messages. `SafetyPlugin` declares four capabilities (location, SMS send, SMS read and
notifications) but its lifecycle methods are empty.

## Test

`test/modules/safety_screen_test.dart` covers the scam default, normal and fall readings, and the
SOS start and cancel flow.
