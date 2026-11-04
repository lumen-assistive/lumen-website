---
title: "Command line"
description: "The lumen-models command: check-licenses and render-benchmarks."
---

The package installs a `lumen-models` command (`python -m lumen_models.cli` also works). It has two
subcommands, and a subcommand is required.

## `check-licenses`

```bash
lumen-models check-licenses
```

Loads `docs/licenses.yaml` (relative to the repository root), runs the
[compliance gate](/docs/models/compliance-gate/) against the catalog, and prints:

```
All 0 catalog entries have a cleared license.
```

Exit code `0` on success. A violation raises `LicenseComplianceError` and the command fails, which fails
CI.

## `render-benchmarks`

```bash
lumen-models render-benchmarks
```

Prints the benchmark table in Markdown. With no recorded results it prints the header and the
`_no benchmarks run yet_` placeholder row. Redirect it into `docs/benchmarks.md` when real results
exist.

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `2` | Unknown command (handled by the argument parser) |

## Tests

`test_cli.py` runs both commands.
