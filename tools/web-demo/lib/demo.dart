/// Entry point compiled with `dart compile js` into
/// `public/demo/lumen-demo.js`, consumed by `src/pages/demo/index.astro`.
///
/// Exports the real `lumen-plugins` business logic to the browser's
/// global scope through `dart:js_interop`, rather than reimplementing
/// any of it in JavaScript, so the demo page runs the same code that
/// ships in the plugin packages and is covered by their test suites.
library;

import 'dart:js_interop';

import 'package:lumen_plugin_protezione/lumen_plugin_protezione.dart';
import 'package:lumen_plugin_sentire/lumen_plugin_sentire.dart';
import 'package:lumen_plugin_vedere/lumen_plugin_vedere.dart';

@JS()
external set lumenParseExpiry(JSFunction f);

@JS()
external set lumenNameColor(JSFunction f);

@JS()
external set lumenAssessMessage(JSFunction f);

@JS()
external set lumenSummarize(JSFunction f);

final _expiryDateParser = ExpiryDateParser();
final _colorNamer = ColorNamer();
const _scamFilter = ScamFilter();
final _summarizer = Summarizer();

String _parseExpiry(String text) {
  final result = _expiryDateParser.parse(text);
  if (!result.isFound) {
    return 'No expiry date recognized in this text.';
  }
  final date = result.date!;
  final iso = '${date.year.toString().padLeft(4, '0')}-'
      '${date.month.toString().padLeft(2, '0')}-'
      '${date.day.toString().padLeft(2, '0')}';
  return 'Expiry date found: $iso (pattern matched: ${result.format!.name})';
}

String _nameColor(int red, int green, int blue) {
  return _colorNamer.nameOf(RgbColor(red, green, blue));
}

String _assessMessage(String text) {
  final assessment = _scamFilter.assess(text);
  final label = switch (assessment.riskLevel) {
    ScamRiskLevel.none => 'No risk detected',
    ScamRiskLevel.low => 'Low risk',
    ScamRiskLevel.high => 'High risk',
  };
  return '$label. ${assessment.reasonEn}';
}

String _summarize(String text) {
  final sentences = _summarizer.summarize(text, maxSentences: 3);
  if (sentences.isEmpty) {
    return 'No sentences recognized in this text.';
  }
  return sentences.join(' ');
}

void main() {
  lumenParseExpiry = ((JSString text) => _parseExpiry(text.toDart).toJS).toJS;
  lumenNameColor =
      ((JSNumber r, JSNumber g, JSNumber b) =>
              _nameColor(r.toDartInt, g.toDartInt, b.toDartInt).toJS)
          .toJS;
  lumenAssessMessage =
      ((JSString text) => _assessMessage(text.toDart).toJS).toJS;
  lumenSummarize = ((JSString text) => _summarize(text.toDart).toJS).toJS;
}
