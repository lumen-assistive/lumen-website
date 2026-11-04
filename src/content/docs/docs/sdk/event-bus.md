---
title: "Event bus"
description: "The LumenEventBus contract: typed publish and subscribe, its guarantees, and how to use it correctly."
---

Plugins never open a camera, a microphone or any other sensor directly. Instead, `lumen-core`
publishes typed events onto a shared bus, and a plugin subscribes to the types it cares about.

```dart
abstract class LumenEventBus {
  Stream<T> on<T extends SenseEvent>();
  void publish(SenseEvent event);
}
```

## `on<T>()`

Returns a stream of every event of type `T`. The stream is a broadcast stream, so any number of
subscribers can listen to the same type. Cancel the subscription in `LumenPlugin.stop`.

```dart
final subscription = context.eventBus.on<TranscriptEvent>().listen((event) {
  if (event.isFinal) handle(event.text);
});
```

## `publish(event)`

Delivers the event to every current subscriber of its **runtime type**. A subscriber of a
`SenseEvent` supertype does not receive subclasses: the implementations key their stream controllers
by `event.runtimeType` and by the requested `T`, so subscribe to the exact subclass.

## Guarantees and non-guarantees

| Property | Behavior |
|---|---|
| Typing | `on<T>()` yields only `T` events |
| Fan out | Every current subscriber receives each event |
| Replay | None. A subscriber that attaches after a publish does not see it |
| Ordering | Events of one type are delivered in publish order |
| Backpressure | None. The bus is an in-process multiplexer |
| Transport | In-process only. No network |

Because there is no replay, subscribe in `start`, before the events you care about can arrive.

## Implementations

| Class | Where | Use |
|---|---|---|
| `InMemoryEventBus` | `lumen-core` | Production bus |
| `FakeEventBus` | `lumen_sdk_testing` | Unit tests of plugins |

Both keep a map from `Type` to a broadcast `StreamController`. Each has a `close()` that closes every
controller, for orderly shutdown or a test `tearDown`.

## Publishing alerts

An alert is the way a plugin tells the app something the user should notice:

```dart
context.eventBus.publish(
  AlertEvent(
    timestamp: DateTime.now(),
    pluginId: manifest.id,
    severity: AlertSeverity.info,
    messageIt: 'Promemoria: prendere la medicina',
    messageEn: 'Reminder: take medicine',
  ),
);
```

The app is meant to subscribe to `AlertEvent` and drive visual, haptic and audible notification
consistently whichever module raised it.

## The event catalog

See [Events](/docs/sdk/events/) for every `SenseEvent` subclass and its fields.

## Testing against the bus

```dart
final context = FakePluginContext();
await plugin.initialize(context);
await plugin.start();
final next = context.eventBus.on<AlertEvent>().first;
context.eventBus.publish(OcrResultEvent(timestamp: DateTime.now(), text: '25/12/2026', confidence: 0.9));
final alert = await next;
```

Create the `first` future before publishing, because the bus does not replay.
