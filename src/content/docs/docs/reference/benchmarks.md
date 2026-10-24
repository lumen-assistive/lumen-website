---
title: Benchmarks
description: Latency, memory, and battery usage of on-device models, once any exist.
---

No model has been converted or benchmarked yet, so there is nothing to report here. This page
exists now, intentionally empty, rather than being skipped, so that the commitment to publishing
real benchmarks (and not fabricated ones) is visible from the start.

Once a model exists, this table is generated from
[`lumen-models`](https://github.com/lumen-assistive/lumen-models)'s own benchmark harness
(`lumen-models render-benchmarks`) run against real target hardware. It is not hand-edited.

| Model | Device | Mean latency (ms) | p95 latency (ms) | Peak memory (KB) | Battery drain (%) |
|---|---|---|---|---|---|
| _no benchmarks run yet_ | | | | | |

Battery drain requires on-device instrumentation (Android Battery Historian, iOS Instruments) that
is measured separately per model and supplied to the harness, not estimated.
