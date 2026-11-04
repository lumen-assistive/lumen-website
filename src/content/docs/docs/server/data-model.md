---
title: "Server data model"
description: "The three tables of lumen-server, their columns, relationships and migration."
---

The schema has three tables. It is created by the Alembic migration `0001_initial_schema` and also by
SQLAlchemy `create_all` at application startup, so a fresh SQLite database works without running
migrations.

```
caregiver_accounts 1 ---- * paired_devices 1 ---- * encrypted_blobs
```

## `caregiver_accounts`

A caregiver who can pair devices and receive consented alerts.

| Column | Type | Constraints |
|---|---|---|
| `id` | integer | primary key |
| `display_name` | string(200) | not null |
| `created_at` | timestamp with time zone | not null, defaults to now (UTC) |

## `paired_devices`

A device paired to a caregiver account.

| Column | Type | Constraints |
|---|---|---|
| `id` | integer | primary key |
| `caregiver_id` | integer | foreign key to `caregiver_accounts.id`, not null |
| `device_label` | string(200) | not null |
| `token` | string(64) | not null, unique, indexed (`ix_paired_devices_token`) |
| `paired_at` | timestamp with time zone | not null, defaults to now (UTC) |

## `encrypted_blobs`

An opaque, client encrypted payload uploaded by a paired device.

| Column | Type | Constraints |
|---|---|---|
| `id` | integer | primary key |
| `device_id` | integer | foreign key to `paired_devices.id`, not null |
| `category` | string(100) | not null, indexed (`ix_encrypted_blobs_category`) |
| `ciphertext` | binary | not null |
| `created_at` | timestamp with time zone | not null, defaults to now (UTC) |

`category` lets a device fetch its own blobs by kind (for example `daily-status` or `calendar`)
without the server knowing their content. `ciphertext` is stored exactly as uploaded; the server has
no decryption key.

## Migrations

```bash
alembic upgrade head      # apply
alembic downgrade base    # revert
```

The initial migration was verified by a round trip (`upgrade head` then `downgrade base`) against a
throwaway SQLite database. In Docker Compose, run `docker compose exec app alembic upgrade head` once
the containers are up.

## Settings

`LUMEN_SERVER_DATABASE_URL` selects the database. See
[Configuration and deployment](/docs/server/deployment/).
