---
title: "Example plugin"
description: "The runnable example plugin shipped with lumen-sdk, explained line by line."
---

`lumen-sdk/example/example_plugin.dart` is a minimal, runnable plugin meant as the starting template
for a new module. It listens for a final transcript that contains the Italian word for "help" and
raises a critical alert.

## The plugin

```dart
class ExamplePlugin implements LumenPlugin {
  StreamSubscription<TranscriptEvent>? _subscription;
  late PluginContext _context;

  @override
  final PluginManifest manifest = const PluginManifest(
    id: 'example',
    nameIt: 'Esempio',
    nameEn: 'Example',
    version: '0.1.0',
    sdkConstraint: '^0.1.0',
    capabilities: [PluginCapability.microphone],
  );

  @override
  Future<void> initialize(PluginContext context) async {
    _context = context;
  }

  @override
  Future<void> start() async {
    _subscription = _context.eventBus.on<TranscriptEvent>().listen((event) {
      if (event.isFinal && event.text.toLowerCase().contains('aiuto')) {
        _context.eventBus.publish(
          AlertEvent(
            timestamp: DateTime.now(),
            pluginId: manifest.id,
            severity: AlertSeverity.critical,
            messageIt: 'È stata rilevata una richiesta di aiuto.',
            messageEn: 'A request for help was detected.',
          ),
        );
      }
    });
  }

  @override
  Future<void> stop() async {
    await _subscription?.cancel();
    _subscription = null;
  }

  @override
  Future<void> dispose() async {
    await stop();
  }
}
```

## What each part shows

| Part | Lesson |
|---|---|
| `manifest` as a `const` field | Static, runtime independent metadata |
| `capabilities: [microphone]` | The plugin declares what it needs and never asks the OS |
| `initialize` keeps the context | The context is the only door to the outside |
| `start` subscribes to `TranscriptEvent` | Work begins on `start`, not on `initialize` |
| `event.isFinal` check | Ignore partial results that may still change |
| `publish(AlertEvent(...))` | The way to tell the app something |
| `stop` cancels the subscription | Nothing leaks after the user disables the module |
| `dispose` calls `stop` | Safe cleanup even if `start` never ran |

## The runnable `main`

```dart
Future<void> main() async {
  final plugin = ExamplePlugin();
  final context = FakePluginContext();
  await plugin.initialize(context);
  await plugin.start();

  final nextAlert = context.eventBus.on<AlertEvent>().first;
  context.eventBus.publish(
    TranscriptEvent(timestamp: DateTime.now(), text: 'Aiuto!', isFinal: true),
  );
  final alert = await nextAlert;
  print('${alert.pluginId}: ${alert.messageEn}');
  await plugin.stop();
}
```

It prints `example: A request for help was detected.`. Run it from `lumen-sdk` with
`dart run example/example_plugin.dart`.

## Using it as a template

Copy its structure into a new package, replace the keyword check with real logic, change the
manifest, and add tests. The step by step guide is
[Writing a plugin](/docs/sdk/writing-a-plugin/).
