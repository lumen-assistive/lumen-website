---
title: "Models overview"
description: "lumen-models: the license ledger, catalog, compliance gate, conversion interface and benchmark harness, and what is not built yet."
---

`lumen-models` holds the governance and tooling for the models Lumen might run on device. It is a
Python package (`lumen_models`).

## What it contains

| Piece | Location | State |
|---|---|---|
| [License ledger](/docs/models/license-ledger/) | `docs/LICENSES.md`, `docs/licenses.yaml` | Researched and recorded |
| Model catalog | `src/lumen_models/catalog.py` | Schema real, list empty |
| [Compliance gate](/docs/models/compliance-gate/) | `src/lumen_models/license_check.py` | Real, tested, runs in CI |
| [Conversion pipeline](/docs/models/conversion-pipeline/) | `src/lumen_models/convert/` | Interface plus a reference copy converter |
| [Benchmark harness](/docs/models/benchmark-harness/) | `src/lumen_models/benchmark/` | Real, tested |
| [Command line](/docs/models/cli/) | `src/lumen_models/cli.py` | `check-licenses`, `render-benchmarks` |
| Published benchmarks | `docs/benchmarks.md` | Empty, generated |

## Current scope

No model has been converted, quantized or benchmarked yet. The repository ships the governance and
tooling scaffold. Per framework converters (TFLite, ONNX, GGUF for whisper.cpp and llama.cpp) are
added incrementally, as each module needs a concrete model, rather than installing several heavy ML
toolchains in advance.

## How it relates to the rest of Lumen

- The catalog mirrors the shape of the SDK's `ModelDescriptor`, so its entries can later be published
  unchanged as the manifest that `lumen-server`'s `/api/v1/models` endpoint and `lumen-core`'s
  `ModelRegistry` consume.
- `ModelTask` values mirror the SDK's `ModelTask` enum in snake case.
- The licenses referenced by a descriptor's `license_id` come from this ledger.

## The path a model takes

```
choose candidate -> record verified license in the ledger -> convert and quantize
 -> benchmark on target hardware -> add to the catalog (gate passes) -> publish metadata
 -> ModelDownloader fetches it on device -> plugin acquires a handle
```

Only the first two steps and the gate exist today.

## Development

```bash
python -m venv .venv
pip install -e .[dev]
ruff check . && ruff format --check . && mypy . && pytest --cov
```
