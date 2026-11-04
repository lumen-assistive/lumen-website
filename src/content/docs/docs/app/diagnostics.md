---
title: "Diagnostics screen"
description: "The developer-only diagnostics screen and why it shows empty and unavailable values."
---

The diagnostics screen is for developers. It is reached from settings once "Developer mode" is on.

## What it shows

| Item | Content today |
|---|---|
| Plugin list | "No module is registered with the engine right now." |
| Battery drain | "not available yet" |
| Mean latency | "not available yet" |

## Why it looks empty

The screen builds a real `PluginManager` (with an `InMemoryEventBus`, an empty `LocalModelRegistry`,
an `AppCapabilityGate`, an `AppConsentStore` and SDK version `0.1.0`) and lists
`registeredPluginIds`. No plugin is registered with a live manager in this release, because the
plugin packages ship business logic and the module screens call them directly. Showing an empty list
is more honest than showing a fabricated one.

Battery drain and latency are neither estimated nor invented. They need on-device instrumentation:
the benchmark harness in `lumen-models` for latency and platform battery APIs for drain. Until that
exists, both read "not available yet".

## When it will become useful

Once plugins are registered with a live `PluginManager`, the list will show each plugin id and its
`PluginState` (`initialized`, `started` or `stopped`). See
[PluginManager](/docs/core/plugin-manager/).
