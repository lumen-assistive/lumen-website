---
title: "Endpoints"
description: "Every lumen-server endpoint with its request, response, errors and an example call."
---

All endpoints live under `/api/v1/` except the health check. Bodies are JSON.

## `GET /health`

Liveness check used by Docker Compose and load balancers.

```json
{ "status": "ok" }
```

## `POST /api/v1/pairing`

Creates a caregiver account and pairs a device to it. No authentication is needed: this is how a
device obtains its token.

Request:

```json
{ "caregiver_display_name": "Maria", "device_label": "Maria's phone" }
```

Response (`200`):

```json
{ "device_id": 1, "caregiver_id": 1, "token": "<urlsafe token>" }
```

The `token` is shown exactly once; the app must store it securely and present it as a bearer token on
every later request. Each call creates a new caregiver account and a new device with a distinct token.
Reusing a caregiver account for further devices needs an extension of this endpoint and is out of
scope for the initial version.

## `POST /api/v1/blobs`

Stores an encrypted payload for the authenticated device.

Request:

```json
{ "category": "daily-status", "ciphertext_base64": "<base64 of ciphertext>" }
```

Response (`200`):

```json
{
  "id": 1,
  "category": "daily-status",
  "ciphertext_base64": "<base64 of the stored bytes>",
  "created_at": "2026-10-23T09:30:00Z"
}
```

Errors:

| Status | Cause |
|---|---|
| `400` | `ciphertext_base64` is not valid base64 (decoded with strict validation) |
| `401` | Missing, malformed or unknown bearer token |

The server stores the decoded bytes exactly as uploaded and returns them re-encoded.

## `GET /api/v1/blobs`

Lists the authenticated device's own blobs, newest first.

Query parameter: `category` (optional) filters to one category.

Response (`200`): a JSON array of the same objects as the upload response. An empty array if the
device has none. A device never sees another device's blobs.

## `GET /api/v1/models`

Returns the model catalog as an array of descriptors:

```json
[{
  "id": "ocr-small", "task": "ocr", "quantization": "int8",
  "size_bytes": 12345678, "license_id": "paddleocr-apache-2.0", "version": "1.0.0"
}]
```

The array is empty today. It mirrors the SDK's `ModelDescriptor` contract with snake case field
names, and it never serves model binaries.

## Example session

```bash
# 1. pair and capture the token
curl -s -X POST http://localhost:8000/api/v1/pairing \
  -H 'Content-Type: application/json' \
  -d '{"caregiver_display_name":"Maria","device_label":"phone"}'

# 2. upload ciphertext (base64 of bytes already encrypted on the device)
curl -s -X POST http://localhost:8000/api/v1/blobs \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"category":"daily-status","ciphertext_base64":"AAECAwQ="}'

# 3. list the device's blobs in one category
curl -s "http://localhost:8000/api/v1/blobs?category=daily-status" \
  -H "Authorization: Bearer $TOKEN"
```

## Interactive documentation

FastAPI serves an OpenAPI schema and interactive docs at `/docs` and `/openapi.json` when the app
runs.

## Tests

`test_health.py`, `test_pairing.py` (a token is returned, tokens are distinct), `test_blobs.py`
(round trip, rejection without a token, with an unknown token and with invalid base64, and isolation
between devices) and `test_model_catalog.py` (starts empty).
