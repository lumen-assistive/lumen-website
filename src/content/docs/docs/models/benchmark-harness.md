---
title: "Benchmark harness"
description: "How lumen-models measures latency and memory, what it reports, and what it deliberately does not measure."
---

The harness measures wall clock latency and this process's peak memory for a caller supplied inference
function.

## `run_benchmark`

```python
result = run_benchmark(
    model_id="ocr-small",
    device_label="reference phone",
    inference=lambda: model.run(sample),
    iterations=20,
)
```

| Parameter | Meaning |
|---|---|
| `model_id` | Id of the model under test |
| `device_label` | A free text label for the device |
| `inference` | A zero argument callable that performs one inference |
| `iterations` | Number of timed calls, default `20`; must be at least `1` or a `ValueError` is raised |

The function starts `tracemalloc`, times each call with `time.perf_counter`, records the peak traced
memory, and stops tracing.

## `BenchmarkResult`

| Field | Meaning |
|---|---|
| `model_id`, `device_label`, `iterations` | The inputs |
| `mean_latency_ms` | Mean of the per call latencies |
| `p95_latency_ms` | The latency at the sorted sample index nearest to the 95th percentile |
| `peak_memory_kb` | Peak traced memory in kilobytes |
| `battery_drain_percent` | `None` unless a caller supplies a real measurement |

## What it does not measure

Battery drain. It needs on-device instrumentation (Android Battery Historian, iOS Instruments) that the
harness does not automate, so the field stays `None` and is rendered as "not measured". It must be
measured separately per model and supplied, never estimated.

`tracemalloc` measures Python allocations in the harness process; it is not a measure of native model
memory on a phone. Numbers from a development machine must not be presented as target device results.

## Rendering a table

`format_markdown_table(results)` returns a Markdown table with these columns:

| Model | Device | Iterations | Mean latency (ms) | p95 latency (ms) | Peak memory (KB) | Battery drain (%) |
|---|---|---|---|---|---|---|

With no results it renders a single placeholder row, `_no benchmarks run yet_`.

## Publishing

`docs/benchmarks.md` is generated, never hand edited:

```bash
lumen-models render-benchmarks > docs/benchmarks.md
```

It is empty today because no model has been benchmarked. See [Benchmarks](/docs/reference/benchmarks/).

## Tests

Latency and iterations are measured, zero iterations is rejected, the table renders with and without
results, and the command renders.
