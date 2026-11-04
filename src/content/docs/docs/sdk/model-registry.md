---
title: "Model registry"
description: "The ModelRegistry, ModelHandle, ModelDescriptor and ModelTask contracts for on-demand model loading."
---

Plugins never load a model themselves. They ask the `ModelRegistry` for a handle, so loading,
on-demand download, quantization selection and memory limits are implemented once.

## `ModelRegistry`

```dart
abstract class ModelRegistry {
  List<ModelDescriptor> listAvailable();
  bool isDownloaded(String modelId);
  Future<void> ensureDownloaded(String modelId);
  Future<ModelHandle> acquire(String modelId);
}
```

| Method | Behavior |
|---|---|
| `listAvailable()` | Descriptors of every known model pack, downloaded or not |
| `isDownloaded(id)` | Whether the model's files are present on device and verified |
| `ensureDownloaded(id)` | Downloads the pack if not already present. Does nothing if the required network consent has not been granted |
| `acquire(id)` | Loads and returns a handle. Throws a `StateError` if the model has not been downloaded; call `ensureDownloaded` first |

## `ModelHandle`

An opaque, disposable handle to a loaded model instance.

```dart
abstract class ModelHandle {
  ModelDescriptor get descriptor;
  Future<void> dispose();
}
```

`dispose` releases the underlying native resources and is safe to call more than once, so that
`lumen-core` can unload models nobody uses and bound device memory.

## `ModelDescriptor`

Describes a downloadable model pack without loading it.

| Field | Type | Meaning |
|---|---|---|
| `id` | `String` | Stable identifier of the pack |
| `task` | `ModelTask` | The inference task |
| `quantization` | `String` | For example `int8`, `fp16`, or `none` |
| `sizeBytes` | `int` | Size on disk |
| `licenseId` | `String` | Must match an entry in the license ledger |
| `version` | `String` | The pack's own version |

The SDK does not interpret license text. It carries the identifier so the engine and the app can
show it and refuse to bundle a model whose license has not been cleared. See the
[license ledger](/docs/models/license-ledger/).

## `ModelTask`

| Value | Meaning |
|---|---|
| `ocr` | Optical character recognition |
| `automaticSpeechRecognition` | Speech to text |
| `soundClassification` | Classification of non-speech sounds |
| `textToSpeech` | On-device speech synthesis |
| `objectDetection` | Detection of objects or obstacles in a frame |
| `smallLanguageModel` | A small on-device language model, for example leaflet question answering |

## Typical use in a plugin

```dart
@override
Future<void> start() async {
  await _context.modelRegistry.ensureDownloaded('ocr-small');
  _handle = await _context.modelRegistry.acquire('ocr-small');
}

@override
Future<void> stop() async {
  await _handle?.dispose();
  _handle = null;
}
```

Acquire in `start`, dispose in `stop`. No official plugin does this yet, because the catalog is
empty.

## Implementations

`LocalModelRegistry` in `lumen-core` is the production implementation, see
[LocalModelRegistry](/docs/core/model-registry/). `FakeModelRegistry` in `lumen_sdk_testing` is the
test double, see [Testing fakes](/docs/sdk/testing/).
