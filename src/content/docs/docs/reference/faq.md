---
title: "FAQ"
description: "Frequently asked questions about Lumen, answered from the actual state of the project."
---

## General

### Is there an app I can install?

Yes, on Android. A signed APK is attached to each release of `lumen-app`; see [Download](/download/).
Version 0.6.0 keeps your data between launches, speaks aloud and uses the accelerometer for Safety and Mobility. It has no camera or microphone input yet.

### Does Lumen replace a doctor or emergency services?

No. Lumen's medical and safety features assist but do not replace a doctor or the 112 emergency number,
and Lumen is not a certified medical device.

### What license is the code under?

Apache License 2.0, in every repository. Third party models and datasets are licensed separately and
tracked in the [license ledger](/docs/models/license-ledger/).

### Has this been tested with real users or screen readers?

Not yet, and this documentation does not claim otherwise. Manual screen reader testing (TalkBack and
VoiceOver) is a required step before any release, tracked openly. No user testing results, metrics or
partnerships are published until they are real.

## Privacy

### Does anything I say or that Lumen sees leave my phone?

No, not by default. Every essential feature runs on device. The only exceptions are features you
explicitly turn on and consent to, such as sharing status with a caregiver or syncing with the optional
server, and then what is sent is encrypted. See [What leaves the device](/docs/privacy/what-leaves-the-device/).

### Does Lumen collect analytics?

No. There is no analytics, telemetry or crash reporting that leaves the device, in any repository.

### Can the server read my data?

No. It stores ciphertext produced on your device and has no key. See
[Server security notes](/docs/server/security-notes/).

## What works today

### Why don't Vision and Hearing use the camera and microphone yet?

Because no vetted on-device models exist yet and `lumen-core` has no camera or microphone bridges. The
logic is implemented and tested, and those screens run it on typed or sample input. Safety and Mobility
can use the live accelerometer. See
[Known limitations](/docs/architecture/limitations/).

### Does my data survive a restart?

Yes since v0.6.0. The app uses an encrypted SQLCipher database whose passphrase is kept in the Android
keystore. If the keystore is unavailable it falls back to memory and data is lost on restart. See
[Storage](/docs/app/storage/).

### Does the SOS button send a real message?

No. It uses a fake sender and says so on screen. The package defines the sender interface but ships no
real implementation, so it cannot send one by itself.

### Why are some outputs in Italian?

The app interface is English only. A few outputs come from plugin logic that matches Italian input: the
color names, the scam filter keywords and the Italian syllable splitter. See
[Text and localization](/docs/app/localization/).

### Is the scam filter an AI model?

No. It is a transparent, rule based check over keyword lists and short link patterns, a placeholder for
a future trained classifier. See the [Safety package](/docs/plugins/safety/).

## Building on Lumen

### Can I add a new module?

Yes. See [Building a plugin](/docs/contributing/plugins/) and
[Writing a plugin step by step](/docs/sdk/writing-a-plugin/).

### Why must plugins go through a context?

So consent and sensor access are enforced in one place and plugins can be tested without hardware. See
[Design decisions](/docs/architecture/design-decisions/).

### Why are dependencies pinned to tags?

So a breaking change cannot silently break a consumer. See
[Dependency pinning](/docs/architecture/dependency-pinning/).

### Which models does Lumen use?

None yet. The catalog is empty and no model has been benchmarked. See [Models](/docs/models/overview/).
