---
title: "Manual accessibility testing"
description: "The manual checks required before a release, and the honest current state: not yet done."
---

No manual accessibility testing has been performed on `lumen-app`: it cannot be done in the environment
the project is built in. This is disclosed in the repository README as a required step before any
release, not claimed as done. This page is the checklist for whoever does it.

## Screen readers

Test with TalkBack on Android and VoiceOver on iOS.

| Check | What to look for |
|---|---|
| Every control is reachable | Swipe through each screen; nothing is skipped or unreachable |
| Labels make sense | Icon buttons announce a clear action (for example "Settings") |
| Results are announced | After running a tool, the result is read, not silent |
| Reading order | Header, note, then tools, in order |
| Dynamic content | Counting down in SOS and status changes are announced |

## Text scale

Set the system font size to the largest and the in-app text size to its maximum:

- Nothing is clipped or overlaps.
- Buttons wrap their labels.
- Every action is still reachable by scrolling.

## Touch and motor

- Targets are comfortable to hit with a large thumb.
- Nothing needs a precise drag or a long press.
- The SOS cancel button is easy to reach during the countdown.

## Visual

- Check in bright sunlight and in a dark room.
- Check the high contrast mode.
- Check with a color blindness simulator that meaning is not carried by color alone.

## Hearing

- Where an audio cue would exist, a visual or vibration equivalent is present (once those outputs
  exist).

## Reporting results

Record the device, OS version, assistive technology and version, the screens tested and each finding
with a severity. Only results that were actually obtained may be published.
