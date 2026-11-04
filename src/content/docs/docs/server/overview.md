---
title: "Server overview"
description: "lumen-server: the optional FastAPI backend for caregiver pairing, encrypted sync and model metadata."
---

`lumen-server` is the optional backend for Lumen. Essential features work entirely offline; this
server exists only for features that need coordination between devices (a caregiver's phone and the
phone of the person they support) or between a device and a future model distribution point.

It never sees plaintext personal data. Calendar entries, daily status and similar records are
encrypted on the device before upload and stored as opaque blobs the server cannot decrypt.

## Stack

| Part | Technology |
|---|---|
| Web framework | FastAPI (title "Lumen Server", version `0.1.0`) |
| Database access | SQLAlchemy 2.0 |
| Migrations | Alembic |
| Validation and settings | Pydantic 2 and pydantic-settings |
| Database | SQLite by default, PostgreSQL 16 in Docker Compose (`psycopg`) |
| Runtime | Python 3.12, `uvicorn` |
| Tooling | ruff, mypy (strict untyped defs), pytest with coverage |

## What it does

| Endpoint | Purpose |
|---|---|
| `GET /health` | Liveness check |
| `POST /api/v1/pairing` | Create a caregiver account and a paired device, return a bearer token |
| `POST /api/v1/blobs` | Store an encrypted payload |
| `GET /api/v1/blobs` | List the device's own encrypted payloads |
| `GET /api/v1/models` | The model catalog (empty today) |

Details are in [Endpoints](/docs/server/endpoints/).

## What it does not do yet

- Push notifications to caregiver devices.
- Multi-device accounts beyond the pairing flow: each pairing call creates a new caregiver account.
- A real model catalog. It becomes populated once `lumen-models` produces converted, benchmarked and
  license-cleared packs.
- Serving model binaries. The models endpoint serves metadata only.
- Token rotation or revocation through the API.

## How the app uses it

The app does not call it yet: the Family module and the server are both built and not wired together.
When they are, the app will encrypt data locally, upload it as blobs, and the paired caregiver device
will fetch and decrypt it. See [Data flow](/docs/architecture/data-flow/).

## Where to go next

- [Endpoints](/docs/server/endpoints/) for requests and responses.
- [Authentication](/docs/server/authentication/) for the bearer token model.
- [Data model](/docs/server/data-model/) for the tables.
- [Configuration and deployment](/docs/server/deployment/).
- [Security notes](/docs/server/security-notes/).
