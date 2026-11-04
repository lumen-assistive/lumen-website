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

`main()` constructs `InMemoryAppDatabase`. Nothing is written to disk and nothing survives a restart. This
was chosen over shipping a build that crashes on launch or fakes persistence it does not have.

## Verification status

`SqlCipherAppDatabase` is not covered by the test suite, because `flutter test` has no platform channel
and SQLCipher needs a real device, emulator or desktop runtime. It has not been verified end to end. It
should be reviewed with extra care and exercised on a device before being wired in.

## What encryption at rest does and does not give

| Protects against | Does not protect against |
|---|---|
| Someone reading the database file from a lost or backed up device | An attacker with the unlocked running app |
| Casual inspection of app storage | A weak or leaked passphrase |

## Server side

The server stores ciphertext produced on the client, a separate layer. See
[Server security notes](/docs/server/security-notes/).
