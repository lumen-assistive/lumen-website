---
title: "Data model"
description: "The records the app stores locally and the records the optional server stores, with their exact fields."
---

## On the device (`lumen-app`)

The app persists two kinds of records through the `AppDatabase` interface.

### `UserProfile`

The result of onboarding and the source of truth for the app's appearance.

| Field | Type | Meaning |
|---|---|---|
| `uiMode` | `UiMode` | One of `voiceFirstHighContrast`, `visualWithVibration`, `simple`, `complete` |
| `enabledModuleIds` | `Set<String>` | Ids of the enabled modules, for example `vision` |
| `textScale` | `double` | Multiplier applied on top of the mode's base text scale, from `1.0` to `2.0` |

`UserProfile.initial()` is a safe default (`complete`, no modules, scale `1`) used only before the
first save. The profile being `null` is how the app knows onboarding has not been completed.

### `ModuleConfig`

Per-module settings and consent.

| Field | Type | Meaning |
|---|---|---|
| `moduleId` | `String` | Stable module identifier |
| `enabled` | `bool` | Whether the module is enabled |
| `consentGranted` | `bool` | Consent to share with a paired caregiver |

A module with no stored config is treated as disabled with no consent (`ModuleConfig.disabled`).

### SQLCipher schema

`SqlCipherAppDatabase` creates two tables at schema version 1:

```sql
CREATE TABLE user_profile (
  id INTEGER PRIMARY KEY CHECK (id = 0),
  ui_mode TEXT NOT NULL,
  enabled_module_ids TEXT NOT NULL,
  text_scale REAL NOT NULL
);
CREATE TABLE module_config (
  module_id TEXT PRIMARY KEY,
  enabled INTEGER NOT NULL,
  consent_granted INTEGER NOT NULL
);
```

The `CHECK (id = 0)` constraint guarantees a single profile row. Enabled module ids are stored as a
comma separated string.

## In memory inside modules

Module screens keep their working state in memory only: the phrase usage tracker, flashcard
progress, the person directory, reminders, the daily routine, the pairing code and the calendar.
None of it is persisted today. The shapes of these records are documented per package in the
[plugin packages reference](/docs/plugins/overview/), for example `PersonProfile`, `Reminder`,
`CalendarEvent`, `CaregiverLink` and `EmergencyProfile`.

## On the server (`lumen-server`)

Three tables, created by an Alembic migration and by SQLAlchemy at startup.

| Table | Columns | Notes |
|---|---|---|
| `caregiver_accounts` | `id`, `display_name` (200), `created_at` | One row per pairing request |
| `paired_devices` | `id`, `caregiver_id` (FK), `device_label` (200), `token` (64, unique, indexed), `paired_at` | The token acts as a device scoped API key |
| `encrypted_blobs` | `id`, `device_id` (FK), `category` (100, indexed), `ciphertext` (binary), `created_at` | Ciphertext is stored exactly as uploaded |

See [Server data model](/docs/server/data-model/).

## Records described by the contracts

The SDK also defines descriptors that are not persisted by the app today: `PluginManifest` (static
plugin metadata) and `ModelDescriptor` (a downloadable model pack). Their fields are in the
[manifest](/docs/sdk/plugin-manifest/) and [model registry](/docs/sdk/model-registry/) pages.
