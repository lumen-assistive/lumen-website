---
title: "Authentication"
description: "How devices authenticate to lumen-server with bearer tokens, and what that does and does not protect."
---

## The scheme

A device authenticates with a bearer token:

```
Authorization: Bearer <token>
```

FastAPI's `HTTPBearer` extracts it, and the `get_current_device` dependency looks up the
`PairedDevice` whose `token` matches. If none matches, the request fails with `401` and the message
`Unknown or revoked device token.`

Endpoints that need a device (`/api/v1/blobs`) depend on `get_current_device`. Pairing, the model
catalog and the health check are public.

## Token generation

`generate_device_token` returns `secrets.token_urlsafe(32)`: 32 random bytes encoded as URL safe base64
(43 characters), drawn from the operating system's cryptographically secure source. The `token`
column is 64 characters wide, unique and indexed.

## How the token is stored

The token is stored as issued, not hashed. It functions as a long lived API key scoped to one device,
not as a user password, so there is no human chosen secret to protect with a slow hash. The
consequence is that a database leak would expose usable tokens, which is why the database itself must
be protected like any credential store.

## What a token grants

A token identifies one device. The device can:

- upload blobs under its own device id,
- list only blobs with its own device id.

It cannot read another device's blobs: queries filter by `device_id`, which comes from the token and
never from the request.

## What is not covered

| Gap | Note |
|---|---|
| Token revocation | The error text mentions revoked tokens, but there is no revoke endpoint yet |
| Token rotation | A token lives until the device row is removed |
| Caregiver to device access control | There is no endpoint where a caregiver reads the supported person's blobs yet; that needs a sharing design with client side encryption |
| Rate limiting | None |
| Transport security | The server speaks plain HTTP; run it behind a TLS terminating proxy in any real deployment |

## Why end to end encryption matters here

Even a stolen token only yields ciphertext. Confidentiality does not depend on the server: the keys
live on the devices. See [Security notes](/docs/server/security-notes/).
