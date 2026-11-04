/// Entry point compiled with `dart compile js` into
/// `public/demo/lumen-demo.js`, consumed by `src/pages/demo/index.astro`
/// through `src/components/PhoneDemo.astro`.
///
/// Exposes one function to the browser, `lumenCall(tool, argsJson)`, which
/// runs the real `lumen-plugins` business logic for all eight modules and
/// resolves to a JSON string. It mirrors, tool for tool, what the real
/// Flutter app's module screens call (see `lumen-app/lib/src/modules/`), so
/// the demo page runs the same code that ships in the plugin packages and
/// is covered by their test suites instead of reimplementing any of it in
/// JavaScript.
///
/// Stateful tools (phrase usage, people, reminders, the routine checklist,
/// the calendar, daily status, the check-in clock and the SOS countdown)
/// keep one instance alive for the lifetime of the page, exactly like a
/// real app session. Formatting that depends on Dart semantics (number
/// rounding, `DateTime.toString`) is done here so the demo prints the same
/// text the app prints.
library;

import 'dart:async';
import 'dart:convert';
import 'dart:js_interop';

import 'package:lumen_plugin_family/lumen_plugin_family.dart';
import 'package:lumen_plugin_hearing/lumen_plugin_hearing.dart';
import 'package:lumen_plugin_memory/lumen_plugin_memory.dart';
import 'package:lumen_plugin_mobility/lumen_plugin_mobility.dart';
import 'package:lumen_plugin_reading/lumen_plugin_reading.dart';
import 'package:lumen_plugin_safety/lumen_plugin_safety.dart' hide AccelerometerSample;
import 'package:lumen_plugin_safety/lumen_plugin_safety.dart' as safety show AccelerometerSample;
import 'package:lumen_plugin_safety/lumen_plugin_safety_testing.dart';
import 'package:lumen_plugin_speech/lumen_plugin_speech.dart';
import 'package:lumen_plugin_vision/lumen_plugin_vision.dart';

@JS()
external set lumenCall(JSFunction f);

// Vision
final _expiryDateParser = ExpiryDateParser();
final _colorNamer = ColorNamer();
const _contrastChecker = ContrastChecker();

// Hearing
final _summarizer = Summarizer();
final _alertMapper = AlertPresentationMapper();
const _captionFormatter = CaptionFormatter();

// Safety
const _scamFilter = ScamFilter();
const _fallDetector = FallDetector();
final _checkInScheduler = CheckInScheduler();
const _checkInInterval = Duration(hours: 12);
final _smsSender = FakeSmsSender();
final _sosController = SosController(
  smsSender: _smsSender,
  cancelWindow: const Duration(seconds: 5),
);

// Family
final _pairingCodeGenerator = PairingCodeGenerator();
final CalendarStore _calendarStore = InMemoryCalendarStore();
final _dailyStatusTracker = DailyStatusTracker();
const _notificationComposer = CaregiverNotificationComposer();
var _nextEventId = 1;
var _events = <CalendarEvent>[];

// Speech
final _phraseBoard = PhraseBoard();
final _usageTracker = PhraseUsageTracker();
const _sentenceBuilder = SentenceBuilder();

// Reading
const _syllableSplitter = ItalianSyllableSplitter();
const _scheduler = SpacedRepetitionScheduler();
const _readingTimeEstimator = ReadingTimeEstimator();

// Memory
final _personDirectory = PersonDirectory();
final _reminderScheduler = ReminderScheduler();
const _routineSteps = ['medication', 'lockDoor'];
final _routineTracker = RoutineChecklistTracker(steps: _routineSteps);
var _nextPersonId = 1;
var _nextReminderId = 1;

// Mobility
const _gaitMonitor = GaitStabilityMonitor();
const _breakPlanner = RestBreakPlanner();

List<safety.AccelerometerSample> _safetySamples(List<(int, double)> points) {
  final base = DateTime(2026, 1, 1, 8);
  return [
    for (final (offsetMs, magnitude) in points)
      safety.AccelerometerSample(
        x: 0,
        y: 0,
        z: magnitude,
        timestamp: base.add(Duration(milliseconds: offsetMs)),
      ),
  ];
}

final _steadySamples = _safetySamples([
  (0, 9.8),
  (200, 10.1),
  (400, 9.6),
  (600, 9.9),
  (800, 10.0),
  (1000, 9.7),
]);

final _fallSamples = _safetySamples([
  (0, 9.8),
  (100, 1.0),
  (200, 0.9),
  (300, 1.0),
  (400, 0.8),
  (450, 0.9),
  (500, 30.0),
  (600, 9.5),
  (800, 10.0),
  (1000, 9.7),
  (1200, 10.1),
  (1400, 9.6),
  (1600, 9.9),
  (1800, 10.0),
  (2000, 9.8),
  (2200, 9.9),
]);

List<AccelerometerSample> _walkFromStepOffsets(List<int> offsetsMs) {
  final base = DateTime(2026, 1, 1, 8);
  final samples = <AccelerometerSample>[
    AccelerometerSample(
      x: 0,
      y: 0,
      z: 9.0,
      timestamp: base.subtract(const Duration(milliseconds: 150)),
    ),
  ];
  for (final offset in offsetsMs) {
    final stepTime = base.add(Duration(milliseconds: offset));
    samples.add(
      AccelerometerSample(
        x: 0,
        y: 0,
        z: 9.0,
        timestamp: stepTime.subtract(const Duration(milliseconds: 120)),
      ),
    );
    samples.add(AccelerometerSample(x: 0, y: 0, z: 13.0, timestamp: stepTime));
  }
  return samples;
}

final _steadyWalk = _walkFromStepOffsets([0, 600, 1200, 1800, 2400, 3000, 3600, 4200]);
final _unsteadyWalk = _walkFromStepOffsets([0, 300, 1200, 1500, 2700, 3000, 4500, 4800]);

String _two(int value) => value.toString().padLeft(2, '0');

Future<Map<String, Object?>> _dispatch(String tool, Map<String, dynamic> args) async {
  switch (tool) {
    case 'vision.expiry':
      final result = _expiryDateParser.parse(args['text'] as String);
      if (!result.isFound) return {'found': false};
      final date = result.date!;
      return {'found': true, 'date': '${date.year}-${_two(date.month)}-${_two(date.day)}'};

    case 'vision.color':
      return {'name': _colorNamer.nameOf(RgbColor(args['r'] as int, args['g'] as int, args['b'] as int))};

    case 'vision.contrast':
      final color = RgbColor(args['r'] as int, args['g'] as int, args['b'] as int);
      final onWhite = _contrastChecker.check(color, const RgbColor(255, 255, 255));
      final onBlack = _contrastChecker.check(color, const RgbColor(0, 0, 0));
      return {
        'whiteRatio': onWhite.ratio.toStringAsFixed(2),
        'whitePass': onWhite.passes(WcagLevel.aa),
        'blackRatio': onBlack.ratio.toStringAsFixed(2),
        'blackPass': onBlack.passes(WcagLevel.aa),
      };

    case 'hearing.summarize':
      return {'sentences': _summarizer.summarize(args['text'] as String, maxSentences: 3)};

    case 'hearing.captions':
      return {'lines': _captionFormatter.wrap(args['text'] as String, maxCharactersPerLine: 32)};

    case 'hearing.alert':
      final presentation = _alertMapper.presentationFor(args['label'] as String);
      return {
        'pattern': presentation.vibrationPatternMs,
        'flash': presentation.useFlash,
        'severity': presentation.severity.name,
      };

    case 'safety.scam':
      return {'reason': _scamFilter.assess(args['text'] as String).reasonEn};

    case 'safety.fall':
      final samples = args['preset'] == 'fall' ? _fallSamples : _steadySamples;
      return {'detected': _fallDetector.detect(samples) != null};

    case 'safety.checkIn':
      _checkInScheduler.checkIn();
      return {'overdue': _checkInScheduler.isOverdue(_checkInInterval)};

    case 'safety.checkInStatus':
      return {'overdue': _checkInScheduler.isOverdue(_checkInInterval)};

    case 'safety.sosStart':
      if (_sosController.state == SosState.countdown) return _sosSnapshot();
      if (_sosController.state != SosState.idle) _sosController.reset();
      unawaited(_sosController.trigger(
        message: 'Lumen SOS: help needed.',
        recipients: const ['+390000000000'],
      ));
      return _sosSnapshot();

    case 'safety.sosCancel':
      _sosController.cancel();
      // `cancel` completes a future; yield once so `state` reflects it.
      await Future<void>.delayed(Duration.zero);
      return _sosSnapshot();

    case 'safety.sosState':
      return _sosSnapshot();

    case 'family.pairing':
      final result = _pairingCodeGenerator.generate(now: DateTime.now());
      return {'code': result.code, 'minutes': _pairingCodeGenerator.validity.inMinutes};

    case 'family.addEvent':
      final minutes = (args['minutes'] as int?) ?? 0;
      final start = DateTime.now().add(Duration(minutes: minutes));
      await _calendarStore.add(CalendarEvent(
        id: 'event-${_nextEventId++}',
        title: args['title'] as String,
        start: start,
        end: start.add(const Duration(minutes: 30)),
      ));
      _events = await _calendarStore.listBetween(
        DateTime.now().subtract(const Duration(days: 1)),
        DateTime.now().add(const Duration(days: 30)),
      );
      return {
        'events': [
          for (final event in _events) {'title': event.title, 'start': event.start.toString()},
        ],
      };

    case 'family.status':
      final value = args['value'] as String?;
      if (value == 'ok') _dailyStatusTracker.setToday(DailyStatusValue.ok);
      if (value == 'attention') _dailyStatusTracker.setToday(DailyStatusValue.needsAttention);
      return {'status': _dailyStatusTracker.statusForToday().name};

    case 'family.notification':
      final now = DateTime.now();
      final status = DailyStatus(
        date: DateTime(now.year, now.month, now.day),
        value: _dailyStatusTracker.statusForToday(),
      );
      return {'text': _notificationComposer.compose(status: status, upcomingEvents: _events)};

    case 'speech.board':
      final phrases = _phraseBoard.all()..sort((a, b) => a.category.index.compareTo(b.category.index));
      return {
        'phrases': [
          for (final phrase in phrases)
            {'id': phrase.id, 'text': phrase.textEn, 'category': phrase.category.name},
        ],
      };

    case 'speech.use':
      _usageTracker.recordUse(args['id'] as String);
      final ids = _usageTracker.topSuggestions(limit: 3);
      return {
        'suggestions': [
          for (final id in ids)
            if (_phraseBoard.byId(id) case final phrase?) {'id': phrase.id, 'text': phrase.textEn},
        ],
      };

    case 'speech.sentence':
      final phrases = [
        for (final id in (args['ids'] as List).cast<String>()) _phraseBoard.byId(id),
      ].whereType<Phrase>().toList();
      return {'text': _sentenceBuilder.compose(phrases, locale: SentenceLocale.en)};

    case 'reading.split':
      final words = (args['text'] as String).trim().split(RegExp(r'\s+'));
      return {
        'text': words
            .where((word) => word.isNotEmpty)
            .map((word) => _syllableSplitter.split(word).join('-'))
            .join(' '),
      };

    case 'reading.review':
      final outcome = _scheduler.review(
        quality: args['quality'] as int,
        previousRepetitionCount: args['repetitionCount'] as int,
        previousIntervalDays: args['intervalDays'] as int,
        previousEasinessFactor: (args['easinessFactor'] as num).toDouble(),
      );
      return {
        'repetitionCount': outcome.repetitionCount,
        'intervalDays': outcome.intervalDays,
        'easinessFactor': outcome.easinessFactor,
        'easeLabel': outcome.easinessFactor.toStringAsFixed(2),
      };

    case 'reading.time':
      return {'minutes': _readingTimeEstimator.estimateMinutesForText(args['text'] as String)};

    case 'memory.addPerson':
      final consent = args['consent'] as bool;
      try {
        _personDirectory.upsert(PersonProfile(
          id: 'person-${_nextPersonId++}',
          name: args['name'] as String,
          relationship: args['relationship'] as String,
          consentGiven: consent,
          consentTimestamp: consent ? DateTime.now() : null,
        ));
        return {'ok': true, 'people': _people()};
      } on PersonProfileConsentError catch (error) {
        return {'ok': false, 'message': error.message, 'people': _people()};
      }

    case 'memory.addReminder':
      _reminderScheduler.add(Reminder(
        id: 'reminder-${_nextReminderId++}',
        title: args['title'] as String,
        dueAt: DateTime.now().add(Duration(minutes: (args['minutes'] as int?) ?? 0)),
      ));
      return {'due': _due()};

    case 'memory.dueReminders':
      return {'due': _due()};

    case 'memory.routine':
      final step = args['step'] as String?;
      if (step != null) {
        if (args['done'] == true) {
          _routineTracker.markDone(step);
        } else {
          _routineTracker.markNotDone(step);
        }
      }
      return {
        'done': [for (final s in _routineSteps) if (_routineTracker.isDoneToday(s)) s],
        'remaining': _routineTracker.remainingToday(),
        'complete': _routineTracker.isFullyCompleteToday(),
      };

    case 'mobility.gait':
      final result = _gaitMonitor.analyze(args['preset'] == 'unsteady' ? _unsteadyWalk : _steadyWalk);
      return {
        'steps': result.stepCount,
        'cadence': result.cadenceStepsPerMinute.toStringAsFixed(0),
        'irregular': result.isIrregular,
      };

    case 'mobility.profile':
      final error = validateMobilityProfile(MobilityProfile(
        aidType: MobilityAidType.values.byName(args['aid'] as String),
        guidanceVerbosity: GuidanceVerbosity.values.byName(args['verbosity'] as String),
        notes: args['notes'] as String,
      ));
      return error == null ? {'ok': true} : {'ok': false, 'message': error.message};

    case 'mobility.breaks':
      final points = _breakPlanner.breakPoints(
        totalDuration: Duration(minutes: args['minutes'] as int),
        verbosity: GuidanceVerbosity.values.byName(args['verbosity'] as String),
      );
      return {'minutes': [for (final point in points) point.inMinutes]};
  }
  throw ArgumentError.value(tool, 'tool', 'Unknown demo tool');
}

Map<String, Object?> _sosSnapshot() => {
      'state': _sosController.state.name,
      'sent': _smsSender.sentMessages.length,
    };

List<Map<String, Object?>> _people() => [
      for (final person in _personDirectory.all())
        {
          'name': person.name,
          'relationship': person.relationship,
          'consentGiven': person.consentGiven,
        },
    ];

List<String> _due() => [for (final reminder in _reminderScheduler.dueReminders()) reminder.title];

void main() {
  lumenCall = ((JSString tool, JSString argsJson) {
    final args = jsonDecode(argsJson.toDart) as Map<String, dynamic>;
    return _dispatch(tool.toDart, args).then((result) => jsonEncode(result).toJS).toJS;
  }).toJS;
}
