---
title: "Plugin lifecycle"
description: "The LumenPlugin contract: the four lifecycle methods, who calls them, and what each may and may not do."
---

Every Lumen module implements `LumenPlugin`. `lumen-core` owns the lifecycle: it constructs the
plugin, reads its manifest, and calls the methods below.

```dart
abstract class LumenPlugin {
  PluginManifest get manifest;
  Future<void> initialize(PluginContext context);
  Future<void> start();
  Future<void> stop();
  Future<void> dispose();
}
```

## The methods

| Method | When it is called | What to do | What not to do |
|---|---|---|---|
| `manifest` | Before anything else | Return constant metadata | Depend on runtime state: the engine reads it before `initialize` |
| `initialize(context)` | Once per process, after registration begins | Keep the context, validate that required model handles can be resolved | Start consuming sense data |
| `start()` | When the user enables the module | Subscribe to the event bus and begin work | Block for long |
| `stop()` | When the user disables the module or navigates away | Cancel subscriptions, release model handles acquired in `start` | Dispose resources from `initialize` |
| `dispose()` | When the plugin will not be used again in this process | Release resources from `initialize` | Assume `stop` was called by the engine; call it yourself |

## State transitions

`PluginManager` tracks a `PluginState` for each registered plugin:

```
          register()                 enable()                 disable()
(none) ---------------> initialized ------------> started ------------> stopped
                                                     ^                      |
                                                     '------ enable() ------'

unregister(): stops if started, calls dispose, removes the plugin
```

- `register` calls `initialize` and sets `initialized`.
- `enable` calls `start` and sets `started`. It does nothing if the plugin is already started.
- `disable` calls `stop` and sets `stopped`. It does nothing if the plugin is not started.
- `unregister` calls `stop` first if the plugin is started, then `dispose`, and forgets the plugin.

A stopped plugin can be enabled again, so `start` and `stop` must be safely repeatable.

## A minimal plugin

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
  Future<void> initialize(PluginContext context) async => _context = context;

  @override
  Future<void> start() async {
    _subscription = _context.eventBus.on<TranscriptEvent>().listen((event) {
      // react to the event, publish AlertEvent if needed
    });
  }

  @override
  Future<void> stop() async {
    await _subscription?.cancel();
    _subscription = null;
  }

  @override
  Future<void> dispose() async => stop();
}
```

The full runnable version is on the [example plugin](/docs/sdk/example-plugin/) page.

## Rules of thumb

- Make `stop` and `dispose` idempotent and safe to call when `start` never ran.
- Cancel every subscription in `stop`. A leaked subscription keeps delivering events to a plugin the
  user turned off.
- Never request an operating system permission yourself. Declare the capability in the manifest and
  let `lumen-core` and the app mediate it, see [Capabilities](/docs/sdk/capabilities/).
- Do all work through the `PluginContext`. See [Plugin context](/docs/sdk/plugin-context/).

Many official plugins have empty lifecycle methods today because the events they need do not exist
yet. That is allowed: the contract only requires the methods exist.
