/// Entry point compiled with `dart compile js` into
/// `public/demo/lumen-demo.js`, consumed by `src/pages/demo/index.astro`
/// through `src/components/PhoneDemo.astro`.
///
/// Exports the real `lumen-plugins` business logic for all eight modules
/// to the browser's global scope through `dart:js_interop`, rather than
/// reimplementing any of it in JavaScript, so the demo page runs the same
/// code that ships in the plugin packages and is covered by their test
/// suites. Stateful tools (phrase usage, people, reminders, daily status)
/// keep one instance alive for the lifetime of the page, exactly like a
/// real app session, rather than resetting on every call.
library;

import 'dart:convert';
import 'dart:js_interop';

import 'package:lumen_plugin_famiglia/lumen_plugin_famiglia.dart';
import 'package:lumen_plugin_leggere/lumen_plugin_leggere.dart';
import 'package:lumen_plugin_parlare/lumen_plugin_parlare.dart';
import 'package:lumen_plugin_protezione/lumen_plugin_protezione.dart' hide AccelerometerSample;
import 'package:lumen_plugin_ricordare/lumen_plugin_ricordare.dart';
import 'package:lumen_plugin_sentire/lumen_plugin_sentire.dart';
import 'package:lumen_plugin_vedere/lumen_plugin_vedere.dart';
import 'package:lumen_plugin_muoversi/lumen_plugin_muoversi.dart';

@JS()
external set lumenParseExpiry(JSFunction f);

@JS()
external set lumenNameColor(JSFunction f);

@JS()
external set lumenAssessMessage(JSFunction f);

@JS()
external set lumenSummarize(JSFunction f);

@JS()
external set lumenGeneratePairingCode(JSFunction f);

@JS()
external set lumenSetDailyStatus(JSFunction f);

@JS()
external set lumenGetDailyStatus(JSFunction f);

@JS()
external set lumenPhraseBoardJson(JSFunction f);

@JS()
external set lumenRecordPhraseUse(JSFunction f);

@JS()
external set lumenTopPhraseSuggestionsJson(JSFunction f);

@JS()
external set lumenSplitSyllables(JSFunction f);

@JS()
external set lumenReviewFlashcard(JSFunction f);

@JS()
external set lumenAddPerson(JSFunction f);

@JS()
external set lumenListPeopleJson(JSFunction f);

@JS()
external set lumenAddReminder(JSFunction f);

@JS()
external set lumenDueRemindersJson(JSFunction f);

@JS()
external set lumenAnalyzeGait(JSFunction f);

final _expiryDateParser = ExpiryDateParser();
final _colorNamer = ColorNamer();
const _scamFilter = ScamFilter();
final _summarizer = Summarizer();
final _pairingCodeGenerator = PairingCodeGenerator();
final _dailyStatusTracker = DailyStatusTracker();
final _phraseBoard = PhraseBoard();
final _phraseUsageTracker = PhraseUsageTracker();
const _syllableSplitter = ItalianSyllableSplitter();
const _spacedRepetitionScheduler = SpacedRepetitionScheduler();
final _personDirectory = PersonDirectory();
final _reminderScheduler = ReminderScheduler();
const _gaitStabilityMonitor = GaitStabilityMonitor();

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

String _generatePairingCode() {
  final result = _pairingCodeGenerator.generate(now: DateTime.now());
  final minutes = _pairingCodeGenerator.validity.inMinutes;
  return 'Pairing code: ${result.code} (valid for $minutes minutes)';
}

String _setDailyStatus(String value) {
  final status = value == 'ok' ? DailyStatusValue.ok : DailyStatusValue.needsAttention;
  _dailyStatusTracker.setToday(status);
  return _describeDailyStatus(_dailyStatusTracker.statusForToday());
}

String _getDailyStatus() => _describeDailyStatus(_dailyStatusTracker.statusForToday());

String _describeDailyStatus(DailyStatusValue value) => switch (value) {
      DailyStatusValue.ok => "Today's status: all ok",
      DailyStatusValue.needsAttention => "Today's status: needs attention",
      DailyStatusValue.unknown => 'No status set for today yet',
    };

String _phraseBoardJson() {
  final phrases = _phraseBoard.all()
    ..sort((a, b) => a.category.index.compareTo(b.category.index));
  return jsonEncode([
    for (final phrase in phrases)
      {
        'id': phrase.id,
        'textEn': phrase.textEn,
        'category': phrase.category.name,
      },
  ]);
}

void _recordPhraseUse(String id) {
  _phraseUsageTracker.recordUse(id);
}

String _topPhraseSuggestionsJson(int limit) {
  final ids = _phraseUsageTracker.topSuggestions(limit: limit);
  return jsonEncode([
    for (final id in ids) _phraseBoard.byId(id)?.textEn ?? id,
  ]);
}

String _splitSyllables(String word) {
  final trimmed = word.trim();
  if (trimmed.isEmpty) return '';
  return trimmed.split(RegExp(r'\s+')).map((w) => _syllableSplitter.split(w).join('-')).join(' ');
}

String _reviewFlashcard(
  int quality,
  int previousRepetitionCount,
  int previousIntervalDays,
  double previousEasinessFactor,
) {
  final outcome = _spacedRepetitionScheduler.review(
    quality: quality,
    previousRepetitionCount: previousRepetitionCount,
    previousIntervalDays: previousIntervalDays,
    previousEasinessFactor: previousEasinessFactor,
  );
  return jsonEncode({
    'intervalDays': outcome.intervalDays,
    'easinessFactor': double.parse(outcome.easinessFactor.toStringAsFixed(2)),
    'repetitionCount': outcome.repetitionCount,
  });
}

String _addPerson(String name, String relationship, bool consent) {
  final id = 'person-${_personDirectory.all().length + 1}-${name.toLowerCase().hashCode}';
  try {
    _personDirectory.upsert(
      PersonProfile(
        id: id,
        name: name,
        relationship: relationship,
        consentGiven: consent,
        consentTimestamp: consent ? DateTime.now() : null,
      ),
    );
    return 'Added $name ($relationship), consent ${consent ? 'given' : 'not given'}.';
  } on PersonProfileConsentError catch (error) {
    return 'Rejected: ${error.message}';
  }
}

String _listPeopleJson() {
  return jsonEncode([
    for (final person in _personDirectory.all())
      {
        'name': person.name,
        'relationship': person.relationship,
        'consentGiven': person.consentGiven,
      },
  ]);
}

String _addReminder(String title, int minutesFromNow, String recurrence) {
  final id = 'reminder-${_reminderScheduler.all().length + 1}';
  final recurrenceValue = switch (recurrence) {
    'daily' => ReminderRecurrence.daily,
    'weekly' => ReminderRecurrence.weekly,
    _ => ReminderRecurrence.none,
  };
  _reminderScheduler.add(
    Reminder(
      id: id,
      title: title,
      dueAt: DateTime.now().add(Duration(minutes: minutesFromNow)),
      recurrence: recurrenceValue,
    ),
  );
  return 'Added reminder "$title", due in $minutesFromNow minute(s).';
}

String _dueRemindersJson() {
  return jsonEncode([
    for (final reminder in _reminderScheduler.dueReminders()) reminder.title,
  ]);
}

List<AccelerometerSample> _walkFromStepOffsets(List<int> offsetsMs) {
  final base = DateTime(2026, 1, 1, 8);
  final samples = <AccelerometerSample>[
    AccelerometerSample(x: 0, y: 0, z: 9.0, timestamp: base.subtract(const Duration(milliseconds: 150))),
  ];
  for (final offset in offsetsMs) {
    final stepTime = base.add(Duration(milliseconds: offset));
    samples.add(
      AccelerometerSample(x: 0, y: 0, z: 9.0, timestamp: stepTime.subtract(const Duration(milliseconds: 120))),
    );
    samples.add(AccelerometerSample(x: 0, y: 0, z: 13.0, timestamp: stepTime));
  }
  return samples;
}

final _steadyWalk = _walkFromStepOffsets([0, 600, 1200, 1800, 2400, 3000, 3600, 4200]);
final _unsteadyWalk = _walkFromStepOffsets([0, 300, 1200, 1500, 2700, 3000, 4500, 4800]);

String _analyzeGait(String preset) {
  final samples = preset == 'unsteady' ? _unsteadyWalk : _steadyWalk;
  final result = _gaitStabilityMonitor.analyze(samples);
  final cadence = result.cadenceStepsPerMinute.toStringAsFixed(0);
  final irregularity = result.isIrregular ? 'Irregular rhythm: possible stumble risk' : 'Steady rhythm';
  return '$irregularity. ${result.stepCount} steps detected, $cadence steps per minute.';
}

void main() {
  lumenParseExpiry = ((JSString text) => _parseExpiry(text.toDart).toJS).toJS;
  lumenNameColor = ((JSNumber r, JSNumber g, JSNumber b) =>
          _nameColor(r.toDartInt, g.toDartInt, b.toDartInt).toJS)
      .toJS;
  lumenAssessMessage = ((JSString text) => _assessMessage(text.toDart).toJS).toJS;
  lumenSummarize = ((JSString text) => _summarize(text.toDart).toJS).toJS;

  lumenGeneratePairingCode = (() => _generatePairingCode().toJS).toJS;
  lumenSetDailyStatus = ((JSString value) => _setDailyStatus(value.toDart).toJS).toJS;
  lumenGetDailyStatus = (() => _getDailyStatus().toJS).toJS;

  lumenPhraseBoardJson = (() => _phraseBoardJson().toJS).toJS;
  lumenRecordPhraseUse = ((JSString id) => _recordPhraseUse(id.toDart)).toJS;
  lumenTopPhraseSuggestionsJson = ((JSNumber limit) => _topPhraseSuggestionsJson(limit.toDartInt).toJS).toJS;

  lumenSplitSyllables = ((JSString word) => _splitSyllables(word.toDart).toJS).toJS;
  lumenReviewFlashcard = ((JSNumber quality, JSNumber prevRepetitionCount, JSNumber prevIntervalDays,
          JSNumber prevEasinessFactor) =>
      _reviewFlashcard(
        quality.toDartInt,
        prevRepetitionCount.toDartInt,
        prevIntervalDays.toDartInt,
        prevEasinessFactor.toDartDouble,
      ).toJS).toJS;

  lumenAddPerson = ((JSString name, JSString relationship, JSBoolean consent) =>
      _addPerson(name.toDart, relationship.toDart, consent.toDart).toJS).toJS;
  lumenListPeopleJson = (() => _listPeopleJson().toJS).toJS;

  lumenAddReminder = ((JSString title, JSNumber minutesFromNow, JSString recurrence) =>
      _addReminder(title.toDart, minutesFromNow.toDartInt, recurrence.toDart).toJS).toJS;
  lumenDueRemindersJson = (() => _dueRemindersJson().toJS).toJS;

  lumenAnalyzeGait = ((JSString preset) => _analyzeGait(preset.toDart).toJS).toJS;
}
