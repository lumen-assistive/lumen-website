---
title: "Building a plugin"
description: "Step-by-step guide to proposing and submitting a new Lumen module in lumen-plugins."
---

New modules are welcome, from the core team or the community. Every one goes through the same pull
request workflow in a single repository,
[`lumen-plugins`](https://github.com/lumen-assistive/lumen-plugins). For a hands on tutorial of the
code itself, read [Writing a plugin step by step](/docs/sdk/writing-a-plugin/).

## 1. Propose it first

Before writing code, [open a new plugin proposal issue](https://github.com/lumen-assistive/lumen-plugins/issues/new?template=new-plugin-proposal.yml)
describing:

- What the module does for the person using Lumen, in plain language.
- Which `lumen_sdk` events and capabilities it needs. If something does not exist yet (see the
  [event catalog](/docs/sdk/events/)), say so explicitly.
- The scope you plan for a first pull request versus what you explicitly defer.

This is discussed before implementation so the approach does not need to change after you have
invested time in it.

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
  plugin.json                  # id, name, color and the icon file name
  icon.svg                     # the 24 by 24 line icon shown in the app and on the site
```

## 3. Requirements, checked in review

1. **Package name** `lumen_plugin_<name>`, matching the directory. `pubspec.yaml` sets
   `publish_to: none` and depends on `lumen_sdk` pinned to a tagged release.
2. **Only go through `lumen_sdk` contracts.** Implement `LumenPlugin`, subscribe to existing
   `SenseEvent` types on `LumenEventBus`, and request models through `ModelRegistry`. Never open a
   camera, microphone or other sensor directly, and never bundle a model.
3. **New event types or capabilities** go to [`lumen-sdk`](https://github.com/lumen-assistive/lumen-sdk)
   first. Land the contract change there, get it tagged, then build your plugin against the new tag.
   Do not duplicate shared SDK types with a local workaround.
4. **Tests are required**, covering real logic, not just construction. If part of your module needs
   infrastructure that does not exist yet, ship the logic you can implement and test today, and state
   plainly in `README.md` what is deferred and why. Look at `packages/safety` or `packages/vision` for
   the expected tone. Do not present a feature as working when it is not.
5. **Licensing** is Apache-2.0. A model or dataset is never bundled in the plugin: a plugin only
   references a model by id through `ModelRegistry`. See the
   [license ledger](/docs/models/license-ledger/).
6. **No AI tool references, no emoji, English everywhere.**
7. **Accessibility and privacy from the start.** Keep consent gating (`PluginContext.hasConsent`) and
   on-device processing in mind.
8. **Register the package in CI** by adding its name to the matrix in `.github/workflows/ci.yml`.
9. **An icon and a color**, described below. Both are checked automatically on the pull request and
   reviewed by eye from the preview image you paste into the description.

## Designing the icon and choosing the color

Every plugin has an icon and a color, shown on the app's home screen, on the
[Plugins page](/plugins/) and in the demo. The easiest way to make both is the
[Icon Studio](/plugins/icon-studio/): draw the icon on the 24 by 24 grid, pick a color, watch every
rule pass or fail live, and copy a preview image for the pull request.

`plugin.json` looks like this:

```json
{ "id": "my-plugin", "name": "My plugin", "color": "#8EE0D0", "icon": "icon.svg" }
```

**Icon rules** (`icon.svg`):

- The root is an `svg` with `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`,
  `stroke-width="1.6"`, `stroke-linecap="round"` and `stroke-linejoin="round"`.
- Only these elements: `svg`, `g`, `path`, `circle`, `ellipse`, `rect`, `line`, `polyline`, `polygon`.
- No scripts, styles, images, `use`, `foreignObject`, event attributes, external links, ids or
  transforms, and no per-shape fill or stroke overrides.
- Every coordinate is inside 1 to 23.
- Between 1 and 12 shapes, at most 2048 bytes.

**Color rules** (`plugin.json`):

- Written as uppercase `#RRGGBB`.
- The ink color `#1A1815` on it has a WCAG contrast ratio of at least 7:1, so the app can draw the icon
  and its name in ink on a solid tile.
- A CIE76 color difference (delta E) of at least 10 from every registered module color and from the
  paper color `#F3EEE3`, so tiles stay tellable apart.

The eight official colors are Vision `#5CC8E0`, Hearing `#B9A2FF`, Safety `#FF8FA3`, Family `#FF9FCB`,
Speech `#FFA860`, Reading `#7ADB98`, Memory `#9FA9FF` and Mobility `#F2C94E`.

**Manual review:** in the Icon Studio, choose Copy preview image and paste it into the pull request
description, then tick the icon checkbox in the template. A maintainer looks at the picture to confirm
the icon is clear, centered and readable at small sizes.

## 4. Send the pull request

Use the repository's pull request template and check which packages you touched. Paste the icon preview
image from the [Icon Studio](/plugins/icon-studio/) into the description. See
[Opening a pull request](/docs/contributing/pull-requests/).

## 5. After merge

Your package gets a `CHANGELOG.md` entry and is included in the next tagged release of `lumen-plugins`.
It is not yet in `lumen-app`: that integration is a separate change once the module has something a UI
can show. See the checklist in [Writing a plugin](/docs/sdk/writing-a-plugin/).

## What reviewers look for

| Question | Why |
|---|---|
| Does it use only the context? | Guarantees consent and testability |
| Is every capability needed? | Over-asking erodes trust |
| Are failure paths tested? | The happy path is the easy part |
| Does the README say what is missing? | Honesty is a project value |
| Is time and randomness injectable? | Deterministic tests |
