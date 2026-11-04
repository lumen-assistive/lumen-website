---
title: "Module colors"
description: "The solid fill of each module, where it appears and how it is verified."
---

Each module has one flat color, defined in `AppColors.moduleColors` and looked up with
`AppColors.moduleColorOf(moduleId)`.

| Module | Hex | Hue |
|---|---|---|
| Vision | `#5CC8E0` | Cyan |
| Hearing | `#B9A2FF` | Violet |
| Safety | `#FF8FA3` | Rose |
| Family | `#FF9FCB` | Pink |
| Speech | `#FFA860` | Orange |
| Reading | `#7ADB98` | Green |
| Memory | `#9FA9FF` | Indigo |
| Mobility | `#F2C94E` | Gold |

An unknown module id falls back to the brand yellow (`#F2B138`).

## Where a module color appears

Always as a solid fill, never as a tint, gradient or glow, and always with ink on top:

| Place | Use |
|---|---|
| Home tile | The whole tile is the module fill, outlined in ink |
| `ModuleHeader` | The whole header block |
| `ModuleBadge` | The rounded square behind the icon, in settings and onboarding |
| Tool card | The 16 pixel square before the card title |
| `ToolOutput` | The result block |
| Speech phrase banner | The selected phrase block |
| Switches | The track of a switched-on switch inside the module screen and in settings |
| Onboarding | The badge for the question about that module |

## Verification

Ink on every module fill clears WCAG AAA (7:1). This is asserted in `test/theme/app_colors_test.dart`.
The fills are light and saturated on purpose, so that ink text stays at the highest contrast level on
all eight. Colors also stay visually distinct from `critical`, so no module identity is mistaken for a
live emergency.

## Adding a module color

1. Pick a hue not already in use and distinct from `critical`.
2. Add it to `moduleColors`.
3. Run the contrast test. It fails if ink on the new fill is below 7:1.
4. Check it next to the neighboring tiles on the home screen.
