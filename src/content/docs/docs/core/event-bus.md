---
title: "InMemoryEventBus"
description: "The production event bus in lumen-core: how it works, its behavior and how to close it."
---

`InMemoryEventBus` is the production `LumenEventBus`. Sense data enters from native bridges, and
plugins subscribe by event type. The bus holds no sensor logic: it is a plain in-process multiplexer,
deliberately simple so that the part that matters, how native capture turns into typed events, can be
reasoned about separately from delivery.

## Implementation

```dart
class InMemoryEventBus implements LumenEventBus {
  final Map<Type, StreamController<SenseEvent>> _controllers = {};

  @override
  Stream<T> on<T extends SenseEvent>() => _controllerFor(T).stream.cast<T>();

  @override
  void publish(SenseEvent event) => _controllerFor(event.runtimeType).add(event);
}
```

A broadcast `StreamController` is created lazily per `Type`. `on<T>()` returns that controller's
stream cast to `T`, and `publish` adds the event to the controller of the event's runtime type.

## Behavior

| Aspect | Behavior |
|---|---|
| Delivery | Only to subscribers of the exact runtime type |
| Multiple subscribers | Supported, each receives every event |
| Replay | None |
| Threading | Single isolate; streams deliver asynchronously on the event loop |

## `close()`

```dart
await bus.close();
```

Closes every controller and clears the map. Use it for orderly shutdown, or in a test harness
teardown. After `close`, new subscriptions create new controllers.

## Tested behavior

- Published events are delivered only to matching subscribers.
- Several subscribers to the same event type each receive the event.

See [Event bus (SDK)](/docs/sdk/event-bus/) for the contract plugin authors rely on.
