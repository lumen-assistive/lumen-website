---
title: Building a plugin
description: Step-by-step guide to proposing and submitting a new Lumen module.
---

New modules are welcome, from the core team or the community, and every one goes through the same
pull request workflow in a single repository,
[`lumen-plugins`](https://github.com/lumen-assistive/lumen-plugins).

## 1. Propose it first

Before writing code, [open a new plugin proposal issue](https://github.com/lumen-assistive/lumen-plugins/issues/new?template=new-plugin-proposal.yml)
describing:

- What the module does for the person using Lumen, in plain language.
- Which `lumen_sdk` events and capabilities it needs. If something does not exist yet (see
  [Event bus](/docs/sdk/event-bus/) for the current catalog), say so explicitly.
- The scope you plan for a first pull request versus what you will explicitly defer.

This is discussed before implementation so the approach does not need to change after you have
already invested time in it.

## 2. Package shape

A plugin is a pull request adding a new directory under `packages/`:

```
packages/<name>/
  pubspec.yaml
  analysis_options.yaml
  lib/
    lumen_plugin_<name>.dart   # barrel file exporting the public API
    src/
      <name>_plugin.dart       # implements LumenPlugin
      ...
  test/
    ...
  README.md
  CHANGELOG.md
```

## 3. Requirements, checked in review

1. **Package name**: `lumen_plugin_<name>`, matching the directory. `pubspec.yaml` sets
   `publish_to: none` and depends on `lumen_sdk` pinned to a tagged release:
   ```yaml
   dependencies:
     lumen_sdk:
       git:
         url: https://github.com/lumen-assistive/lumen-sdk.git
         ref: v0.1.0
   ```
2. **Only go through `lumen_sdk` contracts.** Implement `LumenPlugin`
   (see [Plugin lifecycle](/docs/sdk/plugin-lifecycle/)), subscribe to existing `SenseEvent` types
   on `LumenEventBus`, and request models through `ModelRegistry`. Never open a camera, microphone,
   or other sensor directly, and never bundle a model.
3. **If you need a new event type or capability**, open an issue or pull request against
   [`lumen-sdk`](https://github.com/lumen-assistive/lumen-sdk) first. Land the
   contract change there, get it tagged, then build your plugin against the new tag. Do not
   duplicate what belongs in the shared SDK with a local workaround type.
4. **Tests are required**, covering real logic, not just construction. If part of your module needs
   infrastructure that does not exist yet (a native bridge, a model that has not been converted),
   ship the business logic you can implement and test today, and state plainly in your package's
   `README.md` what is deferred and why. Look at `packages/protezione` or `packages/vedere` in
   `lumen-plugins` for the expected tone. Do not present a feature as working when it is not.
5. **Licensing**: Apache-2.0, matching the repository root. If your plugin needs a model or
   dataset, it is not bundled in the plugin package, see
   [Model and dataset licensing](/docs/privacy/licensing/); a plugin only references a model by id
   through `ModelRegistry`.
6. **No AI tool references, no emoji, English everywhere.**
7. **Accessibility and privacy from the start.** Keep consent gating
   (`PluginContext.hasConsent`) and on-device processing in mind even though UI wiring into
   `lumen-app` happens in a later pass.

## 4. Send the pull request

Use the repository's pull request template, and check which package(s) you touched. See
[Opening a pull request](/docs/contributing/pull-requests/) for what CI checks automatically and
how review assignment works.

## 5. After merge

Your package gets its own `CHANGELOG.md` entry and is included in the next tagged release of
`lumen-plugins`. It is not yet wired into `lumen-app`'s module host: that integration happens once
the module has something a UI can actually show, which today means once `lumen-core` has the
native bridge your module needs.
