---
title: "Testing fakes"
description: "The lumen_sdk_testing entry point: FakeEventBus, FakeModelRegistry and FakePluginContext, with examples."
---

`package:lumen_sdk/lumen_sdk_testing.dart` provides in-memory implementations of the SDK contracts,
so a plugin can be unit tested without `lumen-core` and without any hardware. They are not for
production use: there is no backpressure, no consent enforcement and no sensor access behind them.

## `FakeEventBus`

A `LumenEventBus` backed by broadcast stream controllers keyed by event type.

```dart
final bus = FakeEventBus();
bus.on<AlertEvent>().listen(print);
bus.publish(alert);
await bus.close();   // in tearDown, to avoid leaking open streams
```

## `FakeModelRegistry`

```dart
final registry = FakeModelRegistry([descriptor]);
registry.isDownloaded('ocr-small');   // true: every descriptor passed in counts as downloaded
final handle = await registry.acquire('ocr-small');
registry.isAcquired('ocr-small');     // true
await handle.dispose();
registry.isAcquired('ocr-small');     // false
```

- Every descriptor passed to the constructor is reported as already downloaded. To test the "not
  downloaded" path, omit the descriptor.
- `ensureDownloaded` and `acquire` throw a `StateError` for an unknown id.
- `isAcquired(id)` is true between `acquire` and `dispose`. Use it to assert that a plugin releases
  its handles in `stop`.

## `FakePluginContext`

```dart
final context = FakePluginContext(
  eventBus: FakeEventBus(),          // optional, a fresh one by default
  modelRegistry: FakeModelRegistry([...]),   // optional, empty by default
  grantedConsents: {'share-status-with-caregiver'},
);
```

`hasConsent(key)` returns true only for keys in `grantedConsents`, so both the granted and the denied
path are easy to test.

## A complete plugin test

```dart
void main() {
  test('publishes an alert when an expiry date is recognized', () async {
    final plugin = VisionPlugin();
    final context = FakePluginContext();
    await plugin.initialize(context);
    await plugin.start();

    final next = context.eventBus.on<AlertEvent>().first;
    context.eventBus.publish(OcrResultEvent(
      timestamp: DateTime.now(),
      text: 'Scad. 12 DIC 2026',
      confidence: 0.9,
    ));

    final alert = await next;
    expect(alert.pluginId, 'vision');
    expect(alert.severity, AlertSeverity.info);
    await plugin.stop();
  });
}
```

## Consent test pattern

```dart
test('publishes nothing without consent', () async {
  final plugin = FamilyPlugin();
  final context = FakePluginContext();            // no consents
  await plugin.initialize(context);
  final events = <AlertEvent>[];
  context.eventBus.on<AlertEvent>().listen(events.add);

  plugin.notifyCaregiverOfStatus(DailyStatusValue.ok);
  await Future<void>.delayed(Duration.zero);
  expect(events, isEmpty);
});
```

## Tips

- Create the `first` future before you publish; the bus does not replay.
- Await `Future<void>.delayed(Duration.zero)` after publishing when you assert that nothing arrived.
- Close the fake bus in `tearDown` when a test creates many.
- For logic that is not event driven, test the class directly, no context needed.

The SDK's own tests cover the fakes: `fake_event_bus_test.dart`, `fake_plugin_context_test.dart`,
`model_descriptor_test.dart`, `plugin_manifest_test.dart` and `example_plugin_test.dart`.
