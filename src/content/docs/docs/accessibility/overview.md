---
title: "Accessibility overview"
description: "Accessibility as a hard requirement: the commitments, what is implemented, and what still needs verification."
---

Lumen's purpose is accessibility. It is treated as a hard requirement of every change, not a follow-up
task.

## Commitments

- WCAG 2.2 AA as the minimum, with AAA contrast where feasible.
- Minimum 48 by 48 logical pixel touch targets and a generous spacing scale.
- A single, highly legible typeface (Atkinson Hyperlegible).
- Text scaling up to 200 percent.
- Screen reader labels on controls.
- Calm, short motion without decorative animation.
- Every action reachable by voice, in the long term.

## What is implemented

| Area | Implemented |
|---|---|
| Contrast | The palette is verified against WCAG AAA for text and accent and against 3:1 for module colors, by tests |
| Touch targets | Theme minimum sizes of 48 and buttons of 54 pixels |
| Text | Atkinson Hyperlegible, a mode factor and a user slider up to 2.0 |
| Adaptive modes | Four interface modes, including a high contrast, larger text mode |
| Semantics | `Semantics` labels on icon buttons and answer buttons; results carry semantic labels |
| Reduced clutter | A simple mode and quiet notes |

## What is not done

| Area | State |
|---|---|
| Manual TalkBack and VoiceOver testing | Not performed. Required before release |
| Voice input and voice output | Not implemented; they need speech models and native bridges |
| Haptic and flash alerts | The mapping exists (Hearing), the output does not |
| A light theme | Not provided; the high contrast tier is dark |

## For contributors

- Treat a missing label, low contrast or small target as a bug.
- Test at the largest text scale.
- Do not convey meaning by color alone.
- Do not trap focus or rely on hover.

See [Accessibility targets](/docs/design/accessibility-targets/), [WCAG approach](/docs/accessibility/wcag-approach/)
and [Manual testing](/docs/accessibility/manual-testing/).
