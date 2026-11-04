---
title: "Components"
description: "The reusable widgets of the app: ModuleScope, ModuleHeader, ModuleNote, ToolCard, ToolOutput, ModuleBadge, StyledDropdown, FadeSlideIn, LogoMark and ModuleIcon."
---

These widgets give every module screen the same anatomy. Use them instead of building ad hoc layouts.

## `ModuleScope`

`lib/src/theme/module_scope.dart`. Wraps a module's screen and sets the color scheme's `secondary` to the
module's fill (with ink as `onSecondary`). `ToolCard`, `ToolOutput` and the speech banner read
`colorScheme.secondary`, and the scope also re-themes the switch track and the chip background. Buttons,
inputs and outlines stay ink, so only the accent changes between modules.

```dart
ModuleScope(moduleId: 'vision', child: const VisionScreen())
```

The router applies it in `buildModuleScreen`. There is no background glow and no recoloring of buttons.

## `ModuleHeader`

The block at the top of a module screen: one solid rectangle (radius 28, 2 pixel ink outline) in the
module fill, with a 44 pixel ink icon, the module name at `displaySmall` size in bold, and the one line
description.

```dart
const ModuleHeader(moduleId: 'safety')
```

## `ModuleNote`

A quiet box with a 1.5 pixel hairline border (radius 14), an info icon and muted text, used for the
honest disclosure of what a screen demonstrates and what is not implemented. It is deliberately muted so
it informs without competing with the tools.

```dart
ModuleNote(text: strings('visionNote'))
```

## `ToolCard`

A titled card grouping one interactive tool.

```dart
ToolCard(
  title: strings('visionExpiryTitle'),
  children: [ /* inputs, a button, a ToolOutput */ ],
)
```

A `surface` card with a 2 pixel ink outline and radius 20. Before the title sits a 16 pixel square in the
module color, outlined in ink. It fades in with `FadeSlideIn` and is built on a `Material` so list tiles
inside it keep their ink splashes.

## `ToolOutput`

A block for the result of running a tool: a solid fill in the module color (`secondary`), a 2 pixel ink
outline, radius 14, and bold ink text. It sets a semantics label equal to its text.

```dart
ToolOutput(text: result)
```

## `ModuleBadge`

A module's icon in ink on a rounded square filled with the module color and outlined in ink; the corner
radius is 30 percent of the size. It is used in settings (44 pixels) and for the onboarding questions
(96 pixels, drawn by the onboarding screen itself).

```dart
ModuleBadge(moduleId: 'hearing', size: 44)
```

## `StyledDropdown`

A dropdown drawn like the text fields: a `surface` box with a 1.5 pixel ink outline and radius 14, instead
of Material's bare underlined control. It is expanded by default and used on the Mobility and Hearing
screens and in settings.

## `FadeSlideIn`

The app's one entrance animation: the child fades in while sliding up 18 pixels the first time it is
built, with an ease-out curve. Lists pass a longer `duration` for later items, which gives a gentle
cascade without timers. It does nothing when the platform asks to reduce motion.

## `ModuleIcon`

The eight original line icons, drawn with a `CustomPainter` on a 24 unit canvas, taking their color from
the surrounding `IconTheme`.

## `LogoMark`

The brand arc as a vector drawing, with a `size`, optional `color` and `strokeWidth`.

## Buttons

Built from the theme, not custom widgets:

| Kind | Use | Notes |
|---|---|---|
| `ElevatedButton` | The primary action of a tool | Ink fill, paper text, radius 14, 56 pixels tall (`AppTheme.buttonHeight`) |
| `OutlinedButton` | A secondary action | `surface` fill, 2 pixel ink outline, radius 14, 56 pixels tall |
| `ActionChip` | A phrase on the Speech board | `surface` fill, 1.5 pixel ink outline, radius 12, bold label |
| `IconButton` | The settings button, back button | A 48 pixel `surface` square with a 2 pixel ink outline and radius 14 |

## Building a new screen

```dart
Scaffold(
  appBar: AppBar(),
  body: ListView(
    padding: const EdgeInsets.all(16),
    children: [
      const ModuleHeader(moduleId: 'vision'),
      const SizedBox(height: 16),
      ModuleNote(text: strings('visionNote')),
      const SizedBox(height: 16),
      ToolCard(title: '...', children: [/* controls */]),
    ],
  ),
)
```
