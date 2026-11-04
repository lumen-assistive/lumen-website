---
title: "LocalModelRegistry"
description: "The production model registry: directory layout, download flow, reference counting and failure handling."
---

`LocalModelRegistry` is the production `ModelRegistry`, backed by a directory on local storage.
Download itself is delegated to an injected `ModelDownloader`, so the registry stays independent of
where model bytes come from.

## Construction

```dart
final registry = LocalModelRegistry(
  catalog: descriptors,                 // List<ModelDescriptor>
  modelsDirectory: Directory(path),
  downloader: myDownloader,             // optional
);
```

## Directory layout

Each model pack lives under `<modelsDirectory>/<id>-<version>/`. A model counts as downloaded when
that directory exists.

## Methods

| Method | Behavior |
|---|---|
| `listAvailable()` | The catalog |
| `isDownloaded(id)` | True if the pack directory exists. Throws a `StateError` for an unknown id |
| `ensureDownloaded(id)` | Returns immediately if present. Without a downloader it throws a `StateError`. Otherwise it creates the directory and calls the downloader |
| `acquire(id)` | Throws a `StateError` if the model is not downloaded. Otherwise returns a handle, sharing one handle between concurrent callers |

## Download flow and failure handling

1. `ensureDownloaded` creates the destination directory.
2. It calls `ModelDownloader.download(descriptor, destination)`.
3. If the downloader throws, the registry deletes the directory and rethrows, so a half written
   model is never treated as ready.

Because the directory's existence is the proof of readiness, a `ModelDownloader` must throw rather
than leave partial files.

## `ModelDownloader`

```dart
abstract class ModelDownloader {
  Future<void> download(ModelDescriptor descriptor, Directory destination);
}
```

`lumen-core` bundles no concrete downloader. The download source (a `lumen-server` endpoint, a CDN or
a bundled asset copy) is an app level concern, and without a downloader `ensureDownloaded` fails
clearly instead of silently doing nothing. The destination exists and is empty when `download` runs.

## Reference counting

Handles are reference counted so two plugins requesting the same model share one underlying load:

- The first `acquire` creates a handle with a count of one.
- Each further `acquire` of the same id increments the count and returns the same handle.
- Each `dispose` decrements the count. At zero the model is dropped from the loaded set.
- `dispose` on a handle is idempotent.

## Network consent

The SDK contract says `ensureDownloaded` does nothing without the required network consent. The
registry itself does not read consent; that policy belongs in the downloader or the caller supplied by
the app.

## Empty catalog

No model exists yet, so the registry is built with an empty catalog today (the diagnostics screen
does exactly this). See [Models](/docs/models/overview/).

## Tested behavior

Listing the catalog, "not downloaded until the directory exists", failing without a downloader,
using the downloader, cleaning up after a failed download, refusing to acquire a missing model, and
sharing one handle across concurrent callers.
