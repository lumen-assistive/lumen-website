---
title: "Storage"
description: "The AppDatabase contract, its two implementations, the repositories on top, and what is wired in today."
---

Local state goes through one interface, `AppDatabase`, so widgets and tests never depend on a real
database.

## The contract

```dart
abstract class AppDatabase {
  Future<UserProfile?> loadUserProfile();
  Future<void> saveUserProfile(UserProfile profile);
  Future<Map<String, ModuleConfig>> loadModuleConfigs();
  Future<void> saveModuleConfig(ModuleConfig config);
}
```

`loadUserProfile` returns `null` when onboarding has not been completed. `loadModuleConfigs` omits
modules that have no stored config, which callers treat as disabled with no consent.

## Implementations

| Class | Used by | Notes |
|---|---|---|
| `InMemoryAppDatabase` | Every test, and the fallback if the keystore fails | Keeps data in memory only |
| `SqlCipherAppDatabase` | `main()` since v0.6.0 | Encrypted at rest with SQLCipher via `sqflite_sqlcipher` |

### Why SQLCipher is not wired in

`SqlCipherAppDatabase` takes a `databasePath` and a `passphrase`. A real path needs
`path_provider`, and a safe passphrase needs a secure per-device source such as
`flutter_secure_storage`. Neither is a dependency of the app yet. Shipping working in-memory
storage is preferable to shipping a build that crashes on launch or fakes persistence it does not
have, so state does not survive a restart for now. The class is not exercised by the test suite and
has not been verified end to end on a device, so review it with extra care.

## Repositories

| Class | Responsibility |
|---|---|
| `UserProfileRepository` | A `ChangeNotifier` that loads and saves the single `UserProfile` and notifies listeners, so the root widget rebuilds the theme |
| `ModuleConfigRepository` | Reads and writes per-module `ModuleConfig`, with `setEnabled`, `setConsentGranted` and `configFor` |

`UserProfileRepository.hasCompletedOnboarding` is true when a profile exists.

## Schema

See [Data model](/docs/architecture/data-model/) for the two tables.

## Consent store

`AppConsentStore` implements the core `ConsentStore` contract on top of `ModuleConfigRepository`.
See [Consent store](/docs/core/consent-store/).

## Testing

The repositories are covered by `test/storage/user_profile_repository_test.dart` and
`module_config_repository_test.dart`, using the in-memory database.
