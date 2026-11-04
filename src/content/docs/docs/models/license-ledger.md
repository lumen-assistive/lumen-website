---
title: "License ledger"
description: "The recorded licenses of every model, engine and dataset considered for Lumen, with the flagged conflicts."
---

The ledger is the project's record of every model, inference engine and symbol set considered for
Lumen, with a verdict on whether it can be distributed alongside Apache-2.0 code. It lives in two
files kept in sync by hand: `docs/LICENSES.md` (human readable, with rationale) and
`docs/licenses.yaml` (machine readable, read by the compliance gate).

All entries were checked against each project's official source on 2026-10-23. Licenses can change
between releases, so they are re-verified before every new model version is adopted.

## The verdicts

| Component | License | Apache-2.0 compatible |
|---|---|---|
| OpenAI Whisper (weights, reference code) | MIT | Yes |
| whisper.cpp (inference engine) | MIT | Yes |
| Ultralytics YOLO (v8 and later) | AGPL-3.0-only | No |
| Google MediaPipe | Apache-2.0 | Yes |
| PaddleOCR | Apache-2.0 | Yes |
| YAMNet | Apache-2.0 | Yes |
| Piper TTS engine, archived MIT release | MIT | Yes |
| Piper TTS engine, current fork | GPL-3.0-only | No |
| espeak-ng (Piper dependency) | GPL-3.0-or-later | Unresolved |
| Individual Piper voices | Varies per voice | Depends on the voice chosen |
| ARASAAC pictograms | CC-BY-NC-SA-4.0 | No |
| Microsoft Phi-3-mini-4k-instruct | MIT | Yes |
| Google Gemma 4 (E2B and E4B) | Apache-2.0 | Yes |
| Qwen2.5-1.5B-Instruct | Apache-2.0 | Yes |

In the machine readable file the field is `compatible_with_apache_2_0`: `true` only after a license was
checked against its official current source, `false` for a known conflict, and `null` where the answer
depends on a choice not made yet.

## Flagged conflicts

### Ultralytics YOLO

AGPL-3.0, with a separate paid enterprise license. Bundling it in an Apache-2.0 app would impose
copyleft on the combined work. Decision: not used. Google MediaPipe already ships an Apache-2.0 object
detection task sufficient for obstacle detection.

### Piper relicensing

The original `rhasspy/piper` repository was MIT. It was archived on 2025-10-06 and development moved to
a GPL-3.0 fork. Decision: pin to the last MIT tag of the archived repository, which stays MIT, and
never sync code from the GPL fork. The cost is forgoing later upstream improvements.

### espeak-ng

Piper's phonemization has relied on `espeak-ng` (GPL-3.0-or-later). This is not resolved. Before
shipping any Piper based speech feature, verify whether the pinned MIT era release links it at build
time or only shells out to a separately installed copy, and evaluate process isolation or a non-GPL
phonemizer if it links.

### Piper voices

Voices are trained on different datasets with different licenses (CC0, MIT, Apache-2.0 and CC-BY-4.0
alongside some non-commercial ones). No voice has been chosen. Whoever picks one must read that
voice's own model card and add a specific ledger entry. The generic per voice entry stays `null`, and
the gate rejects any catalog entry that references it.

### ARASAAC pictograms

CC-BY-NC-SA-4.0: the NonCommercial clause conflicts with unrestricted redistribution. No current module
needs it. Before any communication board feature bundles a symbol set, obtain written permission,
evaluate a verified compatible alternative, or commission original icons.

## Small on-device language model candidates

Phi-3-mini-4k-instruct (MIT), Gemma 4 in its smaller sizes (Apache-2.0, released 2026-04-02) and
Qwen2.5-1.5B-Instruct (Apache-2.0) are all cleared. Earlier Gemma versions used a custom, non-OSI
terms of use and are not candidates. Choosing among them is a benchmarking decision, not a licensing
one.

## Process for adding a model

1. Add or update the ledger entry with a verified value and a dated note citing the source checked.
2. Never set `true` from memory. Check the current official license for that exact version.
3. Add the model to the catalog. The gate fails if the license is missing or not `true`.

See [Compliance gate](/docs/models/compliance-gate/) and
[Model and dataset licensing](/docs/privacy/licensing/).
