# web-demo

A build tool, not part of the website itself and not part of the Lumen app. It compiles real
business logic from [lumen-plugins](https://github.com/lumen-assistive/lumen-plugins) to
JavaScript so the `/demo/` page can run it directly in the browser, instead of reimplementing
that logic in JavaScript.

`lib/demo.dart` imports `ExpiryDateParser` and `ColorNamer` from the Vedere package, `ScamFilter`
from the Protezione package, and `Summarizer` from the Sentire package, pinned to the `v0.1.0` tag
of `lumen-plugins` (the same tag every other consumer of those packages uses). It exposes a small
number of plain functions to the browser's global scope through `dart:js_interop`.

## Regenerating the compiled bundle

The compiled output is committed at `public/demo/lumen-demo.js` rather than built in CI, since
lumen-website's continuous integration has no Dart toolchain and adding one would be a large,
unplanned change to that pipeline for a single static asset that only needs to change when this
tool's source changes. Regenerate it with a local Dart SDK whenever `lib/demo.dart` changes or
`lumen-plugins` ships a new tag this should track:

```
cd tools/web-demo
dart pub get
dart compile js -O2 -o ../../public/demo/lumen-demo.js lib/demo.dart
```

Then rebuild the site (`npm run build`) and verify the demo page still produces correct results,
for example by comparing its output against the real test suites in `lumen-plugins`
(`packages/vedere/test/expiry_date_parser_test.dart`, `packages/vedere/test/color_namer_test.dart`,
`packages/protezione/test/scam_filter_test.dart`, `packages/sentire/test/summarizer_test.dart`)
before committing the regenerated file.
