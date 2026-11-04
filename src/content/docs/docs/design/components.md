---
title: "Components"
description: "The reusable widgets of the app: ModuleScope, ModuleHeader, ModuleNote, ToolCard, ToolOutput, ModuleGlowBadge, LogoMark and ModuleIcon."
---

These widgets give every module screen the same anatomy. Use them instead of building ad hoc layouts.

## `ModuleScope`

`lib/src/theme/module_scope.dart`. Wraps a module's screen and does two things:

1. **Re-themes** it with the module color: `colorScheme.primary` becomes the module color, filled
   buttons use it as their background, outlined buttons get a tinted fill and a colored border,
   inputs get a colored focus border, switches and sliders and chips pick it up, and the scaffold and
   app bar backgrounds become transparent.
2. **Paints a glow**: a large radial gradient of the module color at the top, fading to nothing, behind
   the page.

```dart
ModuleScope(moduleId: 'vision', child: const VisionScreen())
```

The router applies it in `buildModuleScreen`. Because everything reads the theme, module screens need no
per widget color code.

## `ModuleHeader`

The banner at the top of a module screen: the module's `ModuleGlowBadge` (72 pixels), name and one line
description, on a rounded panel with a gradient tinted with the module color.

```dart
const ModuleHeader(moduleId: 'safety')
```

The name and description come from the module catalog.

## `ModuleNote`

A quiet, outlined box with an info icon, used for the honest disclosure of what a screen demonstrates
and what is not implemented. It is deliberately muted so it informs without competing with the tools.

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

It has a large radius (28), a hairline border, a faint tint from the accent at the top, and a thin
accent bar beside the title.

## `ToolOutput`

A box for the result of running a tool: an accent tinted fill with a bold left edge, so a result reads as
distinct from the controls. It sets a semantics label equal to its text.

```dart
ToolOutput(text: result)
```

## `ModuleGlowBadge`

A module's icon inside a dark circle with a border and a soft glow in the module color. It is used on
the home cards (52 pixels), in settings (44) and in `ModuleHeader` (72).

```dart
ModuleGlowBadge(moduleId: 'hearing', diameter: 52)
```

## `ModuleIcon`

The eight original line icons, drawn with a `CustomPainter` on a 24 unit canvas, recoloring with the
surrounding `IconTheme`.

## `LogoMark`

The brand arc as a vector drawing, with a `size`, optional `color` and `strokeWidth`.

## Buttons

Built from the theme, not custom widgets:

| Kind | Use | Notes |
|---|---|---|
| `ElevatedButton` | The primary action of a tool | Pill shape, filled with the accent, at least 54 pixels tall |
| `OutlinedButton` | A secondary action | Pill shape, tinted fill and border in module screens |
| `ActionChip` | A phrase on the Speech board | Pill shaped, themed |
| `IconButton` | The settings button, back button | A raised, bordered circle |

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
