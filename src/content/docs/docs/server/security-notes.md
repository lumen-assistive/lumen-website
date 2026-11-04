---
title: "Server security notes"
description: "The threat model of lumen-server: what it protects, what it relies on clients for, and what a deployer must add."
---

## Design goal

Compromising the server should not reveal anyone's personal data. The server stores ciphertext and
cannot decrypt it, so even a full database leak exposes only encrypted blobs, device labels, caregiver
display names, timestamps and tokens.

## What the server holds

| Data | Sensitivity |
|---|---|
| Ciphertext blobs | Opaque without the key. Category names and sizes are visible |
| Caregiver display names and device labels | Free text chosen by the user; treat as personal |
| Device tokens | Usable credentials, stored unhashed |
| Timestamps | Reveal activity patterns |

## What the clients must do

- Encrypt every payload before upload, with a key the server never sees.
- Manage and share keys between a person's device and their caregiver's device. This key exchange is
  not designed or implemented yet.
- Store the bearer token securely on the device.

## What a deployer must add

- TLS in front of the service.
- Network restrictions and rate limiting.
- Secure, backed up database storage and a secret management story.
- Operational monitoring. The repository adds none.

## Known gaps

| Gap | Impact |
|---|---|
| Tokens stored unhashed | A database leak exposes usable tokens, although not plaintext data |
| No revocation or rotation | A lost device keeps its access until its row is deleted |
| Metadata leakage | Categories, sizes and times are visible to the server |
| No caregiver access model | Sharing between devices is not implemented |

## Reporting a vulnerability

Do not open a public issue. Follow the private reporting process in the repository's `SECURITY.md`.

## Related

See [What leaves the device](/docs/privacy/what-leaves-the-device/) and
[Encryption at rest](/docs/privacy/encryption-at-rest/).
