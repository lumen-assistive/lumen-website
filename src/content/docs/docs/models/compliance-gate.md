---
title: "Compliance gate"
description: "The automated check that blocks a model with an uncleared license from entering the catalog."
---

The gate is the automated half of the licensing policy. It is implemented in
`src/lumen_models/license_check.py` and runs both as a test and through the command line in CI.

## Data types

```python
@dataclass(frozen=True, slots=True)
class LicenseEntry:
    id: str
    component: str
    spdx: str
    compatible_with_apache_2_0: bool | None
    notes: str

class LicenseComplianceError(Exception): ...
```

## Functions

| Function | Behavior |
|---|---|
| `load_licenses(path)` | Reads `licenses.yaml` and returns a dict from license id to `LicenseEntry` |
| `check_catalog_licenses(catalog, licenses)` | Raises `LicenseComplianceError` listing every problem found, or returns normally |

## What counts as a problem

For every `ModelDescriptor` in the catalog:

| Situation | Message |
|---|---|
| `license_id` is not in the ledger | `model "<id>" references unknown license id "<license>"` |
| The entry's `compatible_with_apache_2_0` is not exactly `True` (so `False` or `None`) | `model "<id>" references license "<license>" which is not cleared for Apache-2.0 distribution` |

All problems are collected and joined with `; ` in one exception, so a developer sees everything at
once.

## What the tests prove

- A cleared license passes.
- An uncleared license, an unresolved (`null`) license and an unknown id are each rejected.
- The real ledger loads and has no uncleared catalog entries.
- The real ledger flags the known conflicts (YOLO, the Piper GPL fork, ARASAAC) as incompatible.
- The real ledger leaves the per voice Piper entry unresolved.
- The `check-licenses` command succeeds.

## Running it

```bash
lumen-models check-licenses
```

Prints `All N catalog entries have a cleared license.` and exits `0`, or fails with the error above.
With the empty catalog, `N` is `0`.

## Why it exists

Without a gate, nothing stops a model with a conflicting license from being added in a hurry. The gate
makes the safe path the only path.
