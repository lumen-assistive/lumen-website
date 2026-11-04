---
title: "Documentation guide"
description: "How to write and structure pages in this wiki, and the rules that keep it accurate."
---

This wiki is part of the product. A wrong page is a bug.

## Where pages live

`lumen-website/src/content/docs/docs/`, grouped by directory. Each page is a Markdown file with
frontmatter:

```markdown
---
title: Event bus
description: The LumenEventBus contract and the SenseEvent catalog.
---
```

Every new page must also be added to the `sidebar` in `astro.config.mjs`, using the page's slug (the
path without the extension, for example `docs/sdk/event-bus`).

## Accuracy rules

1. **Verify against the source.** Read the code before describing it. Quote real class names, fields,
   defaults and error types.
2. **Be honest about scope.** State what is not implemented. Do not describe a plan as a feature.
3. **No invented facts.** No metrics, user numbers, partnerships, benchmark results or model names that
   do not exist.
4. **Use real examples.** Take examples from tests and source, and check that they compile in spirit.
5. **Keep it current.** When code changes, update the page in the same change.

## Style rules

- English only. No emoji. No em dashes.
- Do not name AI coding tools anywhere. The content guard fails the build if a page does.
- Use the module identifiers `vision`, `hearing`, `safety`, `family`, `speech`, `reading`, `memory`,
  `mobility`, and the English names Vision, Hearing, Safety, Family, Speech, Reading, Memory, Mobility.
- Prefer short paragraphs, headings, tables and code blocks to long prose.
- Start a page with what it is and who needs it, then the detail.
- End with related pages where useful.

## Linking

Use absolute links ending with a slash, for example `/docs/core/plugin-manager/`. Link to the first
mention of a concept, not every mention.

## Code blocks

Tag blocks with a language (`dart`, `bash`, `yaml`, `json`, `sql`, `python`). Keep examples minimal and
correct. When showing output, show the real output.

## Diagrams

Use plain text diagrams in a code block. They render everywhere and diff cleanly.

## Checking your change

```bash
npm ci
npm run build
```

The build must pass. Then read the rendered page, and check links by clicking them.

## Page template

```markdown
---
title: <Name>
description: <One sentence.>
---

<What this is, in two or three sentences.>

## <Main section>

## What is not implemented

## Related
```
