---
title: "Model and dataset licensing"
description: "How Lumen tracks and clears the licenses of third-party models it might bundle."
---

All original Lumen code is Apache-2.0. Third-party models and datasets are a separate concern, tracked in
the [`lumen-models`](https://github.com/lumen-assistive/lumen-models) license ledger, because they are
not all Apache-2.0 and some are deliberately not bundled at all.

## The process

1. Before any model is added to the catalog, its current, official license is checked against the
   project's own source, not from memory or another project's README.
2. The verdict is recorded in `docs/licenses.yaml` (machine readable) and `docs/LICENSES.md` (human
   readable) with a dated note.
3. The [compliance gate](/docs/models/compliance-gate/) fails the build if a catalog entry references a
   license that is missing or not cleared for Apache-2.0 distribution.

## Flagged conflicts

- **Ultralytics YOLO (v8 and later)** is AGPL-3.0. Not used. MediaPipe's Apache-2.0 object detection
  covers the need.
- **Piper's engine** relicensed from MIT to GPL-3.0 on 2025-10-06. The project pins to the last MIT tag
  of the archived repository.
- **ARASAAC pictograms** are CC-BY-NC-SA-4.0. Not used by any module built so far.

Two things stay unresolved rather than assumed: which Piper voice to bundle, and whether the MIT era Piper
release links GPL-3.0 `espeak-ng` at build time.

## Candidate small on-device language models

Phi-3-mini-4k-instruct (MIT), Gemma 4 small sizes (Apache-2.0) and Qwen2.5-1.5B-Instruct (Apache-2.0) are
all cleared. None has been benchmarked, and the final choice is a benchmarking decision.

## The full ledger

See the [License ledger](/docs/models/license-ledger/) for every entry.

## Other licenses in the project

| Item | License |
|---|---|
| All original code in every repository | Apache-2.0 |
| Atkinson Hyperlegible fonts bundled in the app | SIL Open Font License |
| Dependencies | Each under its own license, recorded in its package |

## Not a legal opinion

The ledger records the project's good faith checks of current license texts. It is not legal advice.
Verify a license again before adopting a new version of any model.
