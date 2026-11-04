---
title: "Mobility package"
description: "lumen_plugin_mobility: the gait stability monitor, mobility profile, rest break planner and MobilityPlugin."
---

```yaml
dependencies:
  lumen_plugin_mobility:
    git:
      url: https://github.com/lumen-assistive/lumen-plugins.git
      ref: v0.3.0
      path: packages/mobility
```

Import with `import 'package:lumen_plugin_mobility/lumen_plugin_mobility.dart';`.

## Public API

| Type | Purpose |
|---|---|
| `GaitStabilityMonitor`, `GaitWindowResult`, `AccelerometerSample` | Step and rhythm analysis |
| `MobilityProfile`, `MobilityAidType`, `GuidanceVerbosity`, `validateMobilityProfile` | The person's aid and guidance preference |
| `RestBreakPlanner` | Rest break points for a walk |
| `MobilityPlugin` | The `LumenPlugin` |

## `GaitStabilityMonitor`

```dart
const monitor = GaitStabilityMonitor();
final result = monitor.analyze(samples);
result.stepCount;
result.cadenceStepsPerMinute;
result.isIrregular;
result.hasEnoughData;
```

Constructor parameters and defaults:

| Parameter | Default | Meaning |
|---|---|---|
| `stepThreshold` | `11.5` | Magnitude a sample must rise above to count as a step peak |
| `minStepInterval` | 250 ms | Minimum time between two steps (debounce) |
| `irregularityCoefficientThreshold` | `0.35` | Coefficient of variation above which rhythm is irregular |
| `minimumStepsForAssessment` | `4` | Steps needed before an irregularity verdict is given |

The analysis:

1. A step is detected on each upward crossing of `stepThreshold`, ignoring crossings closer than
   `minStepInterval` to the previous step.
2. With fewer than two steps there is no cadence (`0`) and no verdict.
3. Cadence is `steps / (window in minutes)` between the first and last step.
4. Irregularity is the coefficient of variation (standard deviation divided by mean) of the
   intervals between steps. The result is irregular only if `hasEnoughData` is true and the
   coefficient exceeds the threshold.

The minimum step gate prevents a verdict from too little data: with fewer than four steps,
`isIrregular` is always false and `hasEnoughData` is false.

## `MobilityProfile`

Fields: `aidType` (`none`, `cane`, `wheelchair`, `walker`, `other`), `guidanceVerbosity` (`minimal`,
`standard` (default), `detailed`) and `notes`. `validateMobilityProfile` returns a
`MobilityProfileValidationError` when `aidType` is `other` and `notes` is blank, because an
undescribed aid cannot be acted on, otherwise `null`.

## `RestBreakPlanner`

`breakPoints(totalDuration:, verbosity:)` returns the elapsed times at which to suggest a rest:

| Verbosity | Break every |
|---|---|
| `minimal` | 20 minutes |
| `standard` | 12 minutes |
| `detailed` | 7 minutes |

A break is placed at each multiple of the interval strictly before the end of the walk, so a walk
no longer than one interval returns an empty list. For example 40 minutes at `standard` gives breaks
at 12, 24 and 36 minutes.

## `MobilityPlugin`

| Field | Value |
|---|---|
| `manifest.id` | `mobility` |
| capabilities | none |

It exposes `gaitStabilityMonitor`. Lifecycle methods are empty because the SDK has no accelerometer
event type yet.

## What is not implemented

Live sensor wiring and spoken or haptic guidance.

## Tests

`gait_stability_monitor_test.dart`, `mobility_profile_validator_test.dart`,
`rest_break_planner_test.dart` and `mobility_plugin_test.dart`. See the
[Mobility screen](/docs/app/modules/mobility/).
