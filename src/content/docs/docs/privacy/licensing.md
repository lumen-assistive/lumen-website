---
title: Model and dataset licensing
description: How Lumen tracks and clears the licenses of third-party models it might bundle.
---

All original Lumen code is Apache-2.0. Third-party models and datasets are a separate concern,
tracked in [`lumen-models`](https://github.com/lumen-assistive/lumen-models)'s license ledger,
because they are not all Apache-2.0, and some are deliberately not bundled at all.

## The process

1. Before any model is added to `lumen-models`'s catalog, its current, official license is checked
   against the project's own source, not from memory or from what another project's README claims.
2. The verdict is recorded in `docs/licenses.yaml` (machine-readable) and `docs/LICENSES.md`
   (human-readable), with a dated note citing what was checked.
3. An automated compliance gate (`lumen-models check-licenses`, and a corresponding test) fails the
   build if a catalog entry ever references a license that is missing from the ledger or not marked
   cleared for Apache-2.0 distribution.

## Flagged conflicts, as of the current ledger

- **Ultralytics YOLO (v8 and later)** is AGPL-3.0, dual-licensed commercially. Not used. Google
  MediaPipe already ships an Apache-2.0 object detection task sufficient for the obstacle-detection
  use case it would have served.
- **Piper's text-to-speech engine** relicensed from MIT to GPL-3.0 on 2025-10-06, when its
  maintainership moved from `rhasspy/piper` to `OHF-Voice/piper1-gpl`. The project pins to the last
  MIT-licensed tag of the archived repository instead.
- **ARASAAC pictograms** are CC-BY-NC-SA-4.0; the NonCommercial clause conflicts with unrestricted
  redistribution. Not used by any module built so far. Before any future communication-board module
  considers bundling a symbol set, it needs either explicit permission from the rights holder or a
  verified alternative.

Two things are left explicitly unresolved rather than assumed fine: which specific Piper voice to
bundle (license varies per voice), and whether the MIT-era Piper release links the GPL-3.0
`espeak-ng` at build time.

## Candidate small on-device language models

Three currently-permissive candidates exist for features like leaflet question answering: Microsoft
Phi-3-mini-4k-instruct (MIT), Google's Gemma 4 in its smaller sizes (Apache-2.0, as of its
2026-04-02 release, earlier Gemma versions used a custom, non-OSI license and are not candidates),
and Qwen2.5-1.5B-Instruct (Apache-2.0). None has been benchmarked yet; the final choice is a
`lumen-models` benchmarking decision, not a licensing one, since all three are already cleared.

See the full ledger in `lumen-models`'s
[`docs/LICENSES.md`](https://github.com/lumen-assistive/lumen-models/blob/main/docs/LICENSES.md)
for complete detail and sources.
