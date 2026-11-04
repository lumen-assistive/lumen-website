---
title: "Conversion pipeline"
description: "The ModelConverter interface, the conversion manifest and the reference copy converter."
---

The conversion pipeline turns a source model file into an on-device ready artifact and records what it
did. Only the interface and a reference implementation exist today.

## Types

```python
@dataclass(frozen=True, slots=True)
class ConversionManifest:
    source_path: str
    output_path: str
    output_sha256: str
    output_size_bytes: int

class ModelConverter(ABC):
    @abstractmethod
    def convert(self, source: Path, destination: Path) -> ConversionManifest: ...
```

A converter reads `source`, writes `destination` and returns a manifest with the SHA-256 digest and
the size of the output. The digest gives a way to verify an artifact after download.

## `CopyConverter`

The reference implementation copies the source bytes unchanged:

```python
converter = CopyConverter()
manifest = converter.convert(Path("model.bin"), Path("out.bin"))
manifest.output_sha256      # hex digest of the bytes
manifest.output_size_bytes  # their length
```

It exists to exercise and test the manifest and checksum shape independently of any ML framework. The
test confirms it preserves the bytes and computes the right checksum.

## Future converters

TFLite, ONNX and GGUF converters will follow the same shape and be added per module as needed. Each
will:

1. produce the artifact,
2. record the digest and size,
3. use quantization values compatible with the SDK's `ModelDescriptor.quantization` (`int8`, `fp16`,
   `none`).

Heavy toolchains are deliberately not installed ahead of need.

## From artifact to catalog

A converted and benchmarked artifact becomes a `ModelDescriptor` in the catalog, with a `license_id`
from the [ledger](/docs/models/license-ledger/). The gate must pass before it can be merged.
