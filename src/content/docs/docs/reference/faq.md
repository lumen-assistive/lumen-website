---
title: FAQ
description: Common questions about Lumen.
---

### Is there an app I can install?

Not yet. `lumen-app` exists and runs, but there is no signed Android release. See
[Download](/download/).

### Does Lumen replace a doctor or emergency services?

No. Lumen's medical and safety features assist but do not replace a doctor or the 112 emergency
number, and Lumen is not a certified medical device.

### Does anything I say or that Lumen sees leave my phone?

No, not by default. Every essential feature runs on-device. The only exceptions are features you
explicitly turn on and consent to, like sharing status with a caregiver or syncing with the
optional server, and in those cases what is sent is end-to-end encrypted. See
[Data handling in detail](/docs/privacy/data-handling/).

### Why do some modules have no code yet?

Parlare, Leggere e Studiare, Ricordare, and Muoversi have no repository or package yet, by design:
this project does not create empty placeholder repositories. They are built once their development
phase starts. See [Project status](/docs/introduction/status/).

### Why do Vedere, Sentire, and Protezione not actually use the camera, microphone, or accelerometer yet?

Because `lumen-core` has no native sensor bridges yet. Each module's real, tested business logic
(parsing, detection algorithms, state machines) is implemented and ready; it is simply not
connected to live hardware yet. See [Architecture overview](/docs/introduction/architecture/).

### Can I add a new module?

Yes; see [Building a plugin](/docs/contributing/plugins/).

### What license is the code under?

Apache License 2.0, in every repository. Third-party models and datasets are licensed separately
and tracked in [`lumen-models`](https://github.com/lumen-assistive/lumen-models); see
[Model and dataset licensing](/docs/privacy/licensing/).

### Has this been tested with real users or screen readers?

Not yet, and this documentation does not claim otherwise. Manual screen reader testing (TalkBack,
VoiceOver) is a required step before any release, tracked openly rather than skipped silently. No
user testing results, metrics, or partnerships are published until they are real.
