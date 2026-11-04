---
title: "Safety package"
description: "lumen_plugin_safety: the scam filter, fall detector, check-in scheduler, SOS controller, emergency profile and SafetyPlugin."
---

```yaml
dependencies:
  lumen_plugin_safety:
    git:
      url: https://github.com/lumen-assistive/lumen-plugins.git
      ref: v0.3.0
      path: packages/safety
```

Import with `import 'package:lumen_plugin_safety/lumen_plugin_safety.dart';`. A second entry point,
`lumen_plugin_safety_testing.dart`, exports `FakeSmsSender`.

## Public API

| Type | Purpose |
|---|---|
| `ScamFilter`, `ScamAssessment`, `ScamIndicator`, `ScamIndicatorType`, `ScamRiskLevel` | Rule based scam message assessment |
| `FallDetector`, `AccelerometerSample` | Fall detection over a series of samples |
| `CheckInScheduler` | A rolling check-in interval |
| `SosController`, `SosState`, `SmsSender` | A cancellable SOS countdown |
| `EmergencyProfile`, `validateEmergencyProfile` | Medical card data and validation |
| `SafetyPlugin` | The `LumenPlugin` (lifecycle methods are empty today) |
| `FakeSmsSender` (testing entry point) | Records messages instead of sending them |

## `ScamFilter`

```dart
const filter = ScamFilter();
final assessment = filter.assess('Il tuo conto e bloccato. Invia subito il codice OTP.');
assessment.riskLevel;          // ScamRiskLevel.low or high
assessment.matchedIndicators;  // the indicators that matched
assessment.reasonEn;           // joined English reasons
```

The filter lowercases the text and checks six independent indicators:

| Indicator type | Triggered by (examples) |
|---|---|
| `urgency` | `conto bloccato`, `clicca subito`, `vincita`, `ultimo avviso`, `sospensione immediata`, `azione richiesta` |
| `codeRequest` | `codice`, `otp`, `pin`, `password` |
| `shortUrl` | A link on `bit.ly`, `tinyurl.com`, `t.co` or `goo.gl` |
| `bankImpersonation` | `la tua banca`, `servizio clienti banca`, `sicurezza bancaria`, `verifica del tuo conto` |
| `courierFee` | `pacco in giacenza`, `tassa doganale`, `spese di consegna`, `corriere espresso` |
| `prizeNotification` | `hai vinto`, `congratulazioni ti sei aggiudicato`, `premio in palio`, `sei stato selezionato` |

The risk level follows the number of matched indicator types: none gives `ScamRiskLevel.none`, one
gives `low`, two or more give `high`. Each indicator carries `reasonIt` and `reasonEn`, and the
assessment's `reasonIt` and `reasonEn` getters join them, or return a "no suspicious element"
sentence when nothing matched.

This is a transparent, rule based placeholder for a future trained classifier. Its keywords are
Italian, and a message in another language will not match.

## `FallDetector`

A fall is a free fall, then an impact shortly after, then stillness. All thresholds are
constructor parameters with these defaults:

| Parameter | Default | Meaning |
|---|---|---|
| `freeFallThreshold` | `2.0` | Acceleration magnitude below this counts as free fall |
| `minFreeFallDuration` | 300 ms | How long free fall must last |
| `impactThreshold` | `25.0` | Magnitude above this counts as an impact |
| `maxImpactDelay` | 500 ms | The impact must follow free fall within this window |
| `minStillnessDuration` | 1500 ms | How long the readings must stay near gravity afterwards |
| `stillnessBand` | `3.0` | Allowed deviation from 9.8 during stillness |

`detect(samples)` returns the timestamp of the impact if all three phases are found, otherwise
`null`. It returns `null` for fewer than two samples. A hard impact without a free fall, or a
free fall without stillness, is not reported, which reduces false positives. `AccelerometerSample`
has `x`, `y`, `z` and `timestamp`, with a `magnitude` getter.

## `CheckInScheduler`

```dart
final scheduler = CheckInScheduler();
scheduler.isOverdue(const Duration(hours: 12));   // true: never checked in
scheduler.checkIn();
scheduler.timeUntilDue(const Duration(hours: 12)); // about 12 hours
```

`isOverdue(interval)` is true if there has never been a check-in or if more than `interval` has
passed. `timeUntilDue(interval)` returns a `Duration` (negative once overdue) or `null` if there has
never been a check-in. The clock is injectable.

## `SosController`

A small state machine over `SosState`: `idle`, `countdown`, `sent`, `cancelled`.

```dart
final sms = FakeSmsSender();
final sos = SosController(smsSender: sms, cancelWindow: const Duration(seconds: 10));
final done = sos.trigger(message: 'Help', recipients: ['+390000000000']);
sos.cancel();     // within the window
await done;       // sos.state == SosState.cancelled and nothing was sent
```

- `trigger` enters `countdown` and waits for either `cancel` or the window to elapse (default 10
  seconds). On cancel the state becomes `cancelled` and nothing is sent. Otherwise it calls
  `SmsSender.send` and the state becomes `sent`.
- Triggering during a countdown throws a `StateError`; `reset` during a countdown does too.
- `cancel` outside a countdown does nothing.

The package defines the `SmsSender` interface but ships no real implementation, only
`FakeSmsSender`. By construction this package cannot send a real message, which satisfies the rule
that tests and demos never send real messages.

## `EmergencyProfile`

Fields: `fullName`, `emergencyContacts`, optional `medicalConditions`, `medications` and
`bloodType`. `validateEmergencyProfile` returns an `EmergencyProfileValidationError` listing the
missing fields (`fullName` blank, `emergencyContacts` empty) or `null`.

## `SafetyPlugin`

| Field | Value |
|---|---|
| `manifest.id` | `safety` |
| capabilities | `location`, `smsSend`, `smsRead`, `notifications` |

Its lifecycle methods are empty: the SDK has no accelerometer or incoming SMS event types yet, so
there is nothing to subscribe to. The classes above are complete and tested in isolation.

## Medical and emergency disclaimer

This package helps but does not replace a doctor or the 112 emergency number, and is not a certified
medical device.

## Tests

`scam_filter_test.dart`, `fall_detector_test.dart`, `check_in_scheduler_test.dart`,
`sos_controller_test.dart`, `emergency_profile_test.dart` and `safety_plugin_test.dart`. See the
[Safety screen](/docs/app/modules/safety/).
