---
title: "Encryption at rest"
description: "How the app encrypts local data with SQLCipher, and exactly what is and is not wired up."
---

## The design

The app's local database is meant to be an encrypted SQLite file using SQLCipher, through the
`sqflite_sqlcipher` package. `SqlCipherAppDatabase` implements `AppDatabase`:

```dart
SqlCipherAppDatabase(databasePath: path, passphrase: passphrase)
```

It opens the database with `openDatabase(path, password: passphrase, version: 1, ...)`, so the whole file
is encrypted and unreadable without the passphrase. It creates the `user_profile` and `module_config`
tables on first open.

## What it needs that is not there yet

| Need | Typical solution | State |
|---|---|---|
| A real database path | `path_provider` (documents directory) | Not a dependency yet |
| A per device passphrase | Generated once, stored in the platform keystore with `flutter_secure_storage` | Not a dependency yet |

The passphrase must never be hardcoded in source, and the caller is responsible for generating and
storing it securely.

## What runs today

Since v0.6.0, `main()` opens `SqlCipherAppDatabase` in the app documents directory. The passphrase is
generated per device and held in the Android keystore through `flutter_secure_storage`. If that fails the
app falls back to `InMemoryAppDatabase`.

## Verification status

`SqlCipherAppDatabase` is not covered by `flutter test`, which has no platform channel. It was verified in
an Android 15 emulator: state survived killing the app. It has not been tried on a physical phone.

## What encryption at rest does and does not give

| Protects against | Does not protect against |
|---|---|
| Someone reading the database file from a lost or backed up device | An attacker with the unlocked running app |
| Casual inspection of app storage | A weak or leaked passphrase |

## Server side

The server stores ciphertext produced on the client, a separate layer. See
[Server security notes](/docs/server/security-notes/).
