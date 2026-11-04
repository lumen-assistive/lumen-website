---
title: "Module colors"
description: "The signature color of each module, where it appears and how it is verified."
---

Each module has a signature color, defined in `AppColors.moduleColors` and looked up with
`AppColors.moduleColorOf(moduleId)`.

| Module | Hex | Hue |
|---|---|---|
| Vision | `#22B8D4` | Cyan |
| Hearing | `#9D7CF5` | Violet |
| Safety | `#F2637B` | Rose |
| Family | `#F070AC` | Pink |
| Speech | `#F3914F` | Orange |
| Reading | `#4FCB7C` | Green |
| Memory | `#8B93F7` | Indigo |
| Mobility | `#D9A93B` | Gold |

An unknown module id falls back to the brand amber.

## Where a module color appears

| Place | Use |
|---|---|
| Home card | A gradient tint, a border at 28 percent opacity, the arrow, and the badge glow |
| `ModuleGlowBadge` | The icon stroke, a border at 45 percent opacity and a soft glow |
| Module screen background | A large radial glow at the top at 28 percent opacity |
| `ModuleHeader` | A gradient panel and border |
| Buttons, inputs, switches, sliders, chips | Through `ModuleScope`, which sets the theme's primary color |
| Tool card | A thin accent bar beside the title and a faint top tint |
| Result box | A tinted fill and an accent edge |
| Settings | Each module's card and switches |
| Onboarding | The badge for the question about that module |

## Verification

Every module color clears WCAG 3:1 non-text contrast against both the background and the surface. This
is asserted in `test/theme/app_colors_test.dart`. Colors are also chosen to stay visually distinct from
the `critical` color, so no module identity is mistaken for a live emergency.

## Adding a module color

1. Pick a hue not already in use and distinct from `critical`.
2. Add it to `moduleColors`.
3. Run the contrast test. It fails if the color is below 3:1 on either surface.
4. Check it next to the neighboring module colors on the home screen.
