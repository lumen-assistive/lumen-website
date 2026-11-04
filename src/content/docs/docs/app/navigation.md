---
title: "Navigation and routing"
description: "The route table, how the initial route is chosen, and how module screens are resolved."
---

The app uses `go_router` (version 13).

## Routes

| Path | Builds |
|---|---|
| `/onboarding` | `OnboardingScreen`, saving the profile and module configs on completion |
| `/home` | `HomeScreen`, rebuilt when the profile repository notifies |
| `/home/:moduleId` | The module screen from `buildModuleScreen`, wrapped in a `ModuleScope` |
| `/settings` | `SettingsScreen` |

The diagnostics screen is pushed with a plain `MaterialPageRoute` from settings and has no route of
its own.

## Initial location

`buildRouter` starts on `/home` if `UserProfileRepository.hasCompletedOnboarding` is true and on
`/onboarding` otherwise.

## Resolving a module screen

`buildModuleScreen(moduleId)` returns a `ModuleScope` around the screen for the module id:

| Id | Screen |
|---|---|
| `vision` | `VisionScreen` |
| `hearing` | `HearingScreen` |
| `safety` | `SafetyScreen` |
| `family` | `FamilyScreen` |
| `speech` | `SpeechScreen` |
| `reading` | `ReadingScreen` |
| `memory` | `MemoryScreen` |
| `mobility` | `MobilityScreen` |

An unknown id throws an `ArgumentError`. The wrapper sets the module color theme and background
glow, see [Design system components](/docs/design/components/).

## The root widget

`LumenApp` wraps the router in a `MaterialApp.router` configured with the app theme (forced dark),
the app strings delegate and the Material localization delegates, and a builder that applies the
user's text scale.

## Navigating

The home screen calls `context.go('/home/<id>')` and settings are opened with `context.go('/settings')`.
The back arrow on a module screen is the standard app bar leading button.
