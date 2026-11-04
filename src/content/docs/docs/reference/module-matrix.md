---
title: "Module matrix"
description: "One table comparing all eight modules: package, capabilities, what is real, and what is pending."
---

A single view of every module. "Real" means implemented and tested as logic; "pending" means it needs a
native bridge or a model that does not exist yet.

| Module | Package | Capabilities | Real today | Pending |
|---|---|---|---|---|
| Vision | `lumen_plugin_vision` | camera | Expiry date parser (6 formats), color namer (11 colors), WCAG contrast checker | Scene description, live OCR, banknotes, medicines, obstacles, find mode |
| Hearing | `lumen_plugin_hearing` | microphone | Transcript session, extractive summarizer, caption formatter, alert presentation mapping | Speech recognition, sound classification, diarization |
| Safety | `lumen_plugin_safety` | location, smsSend, smsRead, notifications | Scam filter (6 indicators), fall detector, check-in scheduler, SOS state machine, emergency profile | Live accelerometer, real SMS sending, location, reading incoming SMS |
| Family | `lumen_plugin_family` | none | Pairing codes, recurring calendar, daily status, roles, notification text, consent gated alert | Delivery to a caregiver, sync with the server |
| Speech | `lumen_plugin_speech` | none | 19 phrase board, usage ranked suggestions, sentence builder | Text-to-speech, pictograms |
| Reading | `lumen_plugin_reading` | none | Italian syllable splitter, SM-2 scheduler and deck, reading time estimate | Reading text aloud, dyslexia specific adaptation, scanning |
| Memory | `lumen_plugin_memory` | none | Consent enforced person directory, reminders with recurrence and snooze, daily checklist | Face recognition, notification delivery |
| Mobility | `lumen_plugin_mobility` | none | Gait stability monitor, mobility profile validation, rest break planner | Live sensor feed, guidance output |

## Module colors and icons

| Module | Color | Icon |
|---|---|---|
| Vision | `#22B8D4` | Eye |
| Hearing | `#9D7CF5` | Sound bars |
| Safety | `#F2637B` | Shield |
| Family | `#F070AC` | Two people |
| Speech | `#F3914F` | Speech bubble |
| Reading | `#4FCB7C` | Open book |
| Memory | `#8B93F7` | Clock |
| Mobility | `#D9A93B` | Footprints |

## Enabled by onboarding

| Module | Enabled by |
|---|---|
| Vision | A vision difficulty |
| Hearing | A hearing difficulty |
| Safety | Wanting safety features |
| Family | Caregiver sharing |
| Speech, Reading, Memory, Mobility | Not by onboarding; enable in settings |

See the [plugin packages reference](/docs/plugins/overview/) and the [app module guides](/docs/app/overview/).
