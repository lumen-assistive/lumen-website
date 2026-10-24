---
title: Model registry
description: The ModelRegistry contract for on-demand, licensed model loading.
---

A plugin never bundles or loads a model file itself. It asks `lumen-core`'s model registry for a
handle, by id, and `lumen-core` decides how that model actually gets onto the device and into
memory.

```dart
abstract class ModelRegistry {
  List<ModelDescriptor> listAvailable();
  bool isDownloaded(String modelId);
  Future<void> ensureDownloaded(String modelId);
  Future<ModelHandle> acquire(String modelId);
}
```

## Model descriptors

```dart
class ModelDescriptor {
  final String id;
  final ModelTask task;
  final String quantization;
  final int sizeBytes;
  final String licenseId;
  final String version;
}
```

`licenseId` is not decorative: it must match an entry in `lumen-models`'s license ledger (see
[Model and dataset licensing](/docs/privacy/licensing/)), and that ledger's automated compliance
gate fails CI if a catalog entry references a license that is missing or not cleared for
Apache-2.0 distribution. A model cannot ship without its license being checked first.

## The production implementation

`lumen-core`'s `LocalModelRegistry` backs this contract with a local directory of downloaded model
packs:

- A model counts as downloaded once its directory exists on disk.
- `ensureDownloaded` delegates to an injected `ModelDownloader`; without one configured, it fails
  clearly rather than silently doing nothing.
- `acquire` returns a reference-counted `ModelHandle`: two plugins requesting the same model share
  one underlying load, and the model is only actually released once every holder has disposed its
  handle.

`lumen-core` does not bundle a concrete `ModelDownloader`: the actual download source (a
`lumen-server` endpoint, a CDN, a bundled asset) is an app-level decision, and no model has been
converted yet (`lumen-models`'s catalog is empty today — see
[Project status](/docs/introduction/status/)).

## Model tasks

```dart
enum ModelTask {
  ocr,
  automaticSpeechRecognition,
  soundClassification,
  textToSpeech,
  objectDetection,
  smallLanguageModel,
}
```

## Where models actually come from

`lumen-models` owns conversion, quantization, and benchmarking. Its `ModelDescriptor` catalog
schema mirrors this contract's shape exactly, so a cleared entry there can be published, unchanged,
as part of the manifest `lumen-server`'s `/api/v1/models` endpoint and `lumen-core`'s registry both
read.
