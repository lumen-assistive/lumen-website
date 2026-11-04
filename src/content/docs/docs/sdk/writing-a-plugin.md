---
title: "Writing a plugin step by step"
description: "A complete walkthrough of building, testing and wiring a new Lumen module from an empty package."
---

This walkthrough builds a small module called `medication-note` from scratch. The same steps apply to
any module. For the contribution process, see
[Building a plugin](/docs/contributing/plugins/).

## 1. Decide what it is

A module should be one capability that is useful on its own, with an English id. Decide:

- What sense data does it consume (if any)? Does the SDK already have an event for it?
- What does it publish? Usually an `AlertEvent`.
- What capabilities does it need?
- Does it share anything outside the device? If so it needs a consent key.
- What can it do today with pure logic, and what needs a model or a sensor that does not exist?

Write down honestly what will not be implemented. That text goes in the README.

## 2. Create the package

In `lumen-plugins/packages/`:

```
packages/medication_note/
  pubspec.yaml
  analysis_options.yaml
  README.md
  CHANGELOG.md
  lib/lumen_plugin_medication_note.dart
  lib/src/...
  test/...
```

`pubspec.yaml`:

```yaml
name: lumen_plugin_medication_note
description: Lumen's Medication module: ...
version: 0.1.0
publish_to: none
environment:
  sdk: ^3.5.0
dependencies:
  meta: ^1.15.0
  lumen_sdk:
    git:
      url: https://github.com/lumen-assistive/lumen-sdk.git
      ref: v0.1.0
dev_dependencies:
  lints: ^4.0.0
  test: ^1.25.0
```

Copy `analysis_options.yaml` from an existing package so analysis is identical.

## 3. Write the logic first

Put real logic in `lib/src/`, separate from the plugin class, with injectable clocks:

```dart
class DoseTracker {
  DoseTracker({DateTime Function()? now}) : _now = now ?? DateTime.now;
  final DateTime Function() _now;
  // ...
}
```

Keep value types `@immutable`, validators returning errors, and constants as data. See
[Common patterns](/docs/plugins/common-patterns/).

## 4. Implement `LumenPlugin`

```dart
class MedicationNotePlugin implements LumenPlugin {
  late PluginContext _context;

  @override
  final PluginManifest manifest = const PluginManifest(
    id: 'medication-note',
    nameIt: 'Medication',
    nameEn: 'Medication',
    version: '0.1.0',
    sdkConstraint: '^0.1.0',
    capabilities: [],
  );

  @override
  Future<void> initialize(PluginContext context) async => _context = context;
  @override
  Future<void> start() async {}
  @override
  Future<void> stop() async {}
  @override
  Future<void> dispose() async {}
}
```

If you subscribe to events, cancel them in `stop`. If you publish something that could leave the
device, check `hasConsent` first. See [Plugin lifecycle](/docs/sdk/plugin-lifecycle/) and the
[Consent model](/docs/privacy/consent/).

## 5. Export the public API

`lib/lumen_plugin_medication_note.dart`:

```dart
library;

export 'src/dose_tracker.dart';
export 'src/medication_note_plugin.dart';
```

## 6. Test it

Test logic directly, and the plugin with `FakePluginContext`. Cover the failure paths (invalid
input, denied consent) as well as the success paths. See [Testing fakes](/docs/sdk/testing/).

## 7. Run the checks

From the package directory:

```bash
dart pub get
dart format --output=none --set-exit-if-changed .
dart analyze --fatal-infos
dart test
```

## 8. Document it

The README must state the current scope and, plainly, what is not implemented and why. Add a
CHANGELOG entry. Public classes and members need complete doc comments (`///`).

## 9. Register it in CI

Add the package name to the matrix in `lumen-plugins/.github/workflows/ci.yml` so it is tested on
every push.

## 10. Wire it into the app (separate change)

In `lumen-app`: add the dependency, a `ModuleInfo` entry in the module catalog, a screen under
`lib/src/modules/` using `ModuleHeader`, `ModuleNote` and `ToolCard`, an entry in `buildModuleScreen`,
a module color in `AppColors.moduleColors` (checked for contrast), strings, and a widget test. See
[Design system components](/docs/design/components/).

## Checklist

- [ ] English id, English names, `sdkConstraint` set
- [ ] Declares only the capabilities it uses
- [ ] Consent checked before anything leaves the device
- [ ] Logic separated from the plugin class, clocks injectable
- [ ] Tests for success and failure paths
- [ ] Format, analyze, test pass
- [ ] README states what is not implemented
- [ ] No emoji, no placeholder text, no commented out code
