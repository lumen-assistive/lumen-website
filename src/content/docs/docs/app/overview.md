---
title: "App overview"
description: "A tour of lumen-app: its screens, its structure, and how a module screen relates to a plugin package."
---

`lumen-app` is the Flutter application. It is the part of Lumen a person actually touches.

## Screens

| Screen | Route | Purpose |
|---|---|---|
| Loading | n/a | The brand mark in ink on paper while the saved profile loads |
| [Onboarding](/docs/app/onboarding/) | `/onboarding` | Five questions that choose modules and an interface mode |
| Home | `/home` | The wordmark, a headline and one solid colored tile per enabled module, two per row |
| Module screen | `/home/:moduleId` | The tools of one module; see below |
| [Settings](/docs/app/settings/) | `/settings` | Interface mode, text size, per-module switches, notice, developer mode |
| [Diagnostics](/docs/app/diagnostics/) | pushed from settings | Developer only: plugin states, battery and latency placeholders |

## Module screens

| Module | Screen guide |
|---|---|
| Vision | [Vision screen](/docs/app/modules/vision/) |
| Hearing | [Hearing screen](/docs/app/modules/hearing/) |
| Safety | [Safety screen](/docs/app/modules/safety/) |
| Family | [Family screen](/docs/app/modules/family/) |
| Speech | [Speech screen](/docs/app/modules/speech/) |
| Reading | [Reading screen](/docs/app/modules/reading/) |
| Memory | [Memory screen](/docs/app/modules/memory/) |
| Mobility | [Mobility screen](/docs/app/modules/mobility/) |

Every module screen has the same anatomy:

1. A **module header**: one solid block in the module's color with a large ink icon, the module name
   and a one line description.
2. A **module note**: a quiet, honest disclosure of what the screen demonstrates and what is not
   implemented yet.
3. One or more **tool cards**: a titled card with controls and a result box. Each tool runs a real
   class from the module's plugin package on the input shown.

## What "real" means here

The tools call the package's actual classes (`ExpiryDateParser`, `FallDetector`, `ScamFilter`,
`SpacedRepetitionScheduler`, and so on) and display their output. The input is pasted or typed
text, or a preset sample (a list of accelerometer readings, a set of step times). The screens do not
read a camera, microphone or accelerometer, and no screen registers its plugin with a live
`PluginManager`.

## Source layout

```
lib/main.dart                       runApp(LumenApp(database: InMemoryAppDatabase()))
lib/src/app.dart                    LumenApp: loads the profile, builds the router and theme
lib/src/routing/app_router.dart     routes and buildModuleScreen
lib/src/onboarding/                 OnboardingScreen, OnboardingController, ModuleInfo catalog
lib/src/home/home_screen.dart       HomeScreen and the module tiles
lib/src/modules/*_screen.dart       one screen per module
lib/src/modules/widgets/            ModuleHeader, ModuleNote, ToolCard, ToolOutput, ModuleBadge, StyledDropdown
lib/src/theme/                      AppColors, AppTheme, UiMode, ModuleScope, LogoMark, ModuleIcon, FadeSlideIn
lib/src/settings/                   SettingsScreen
lib/src/storage/                    AppDatabase and repositories
lib/src/consent/                    AppCapabilityGate, AppConsentStore
lib/src/l10n/app_strings.dart       all user facing text
```

## Startup sequence

1. `main` calls `WidgetsFlutterBinding.ensureInitialized` and runs `LumenApp` with an in-memory
   database.
2. `LumenApp` creates the repositories, loads the stored profile once, and shows the loading screen
   until that finishes.
3. It builds the router with the initial location `/onboarding` if no profile exists, or `/home`.
4. The root rebuilds the theme and text scale whenever the profile changes.
