---
title: "Configuration and deployment"
description: "Running lumen-server with Docker Compose or directly, and every setting it reads."
---

## Configuration

Settings come from environment variables with the prefix `LUMEN_SERVER_` (pydantic-settings):

| Variable | Default | Meaning |
|---|---|---|
| `LUMEN_SERVER_DATABASE_URL` | `sqlite:///./lumen_server.db` | SQLAlchemy URL. The default lets the app and its tests run with no external service |

For SQLite the engine is created with `check_same_thread` disabled; other databases use default
connection arguments.

## Docker Compose

```bash
docker compose up --build
```

This starts two services:

| Service | Image | Notes |
|---|---|---|
| `app` | built from the `Dockerfile` (`python:3.12-slim`) | Port `8000`; uses `postgresql+psycopg://lumen:lumen@db:5432/lumen`; waits for the database to be healthy |
| `db` | `postgres:16-alpine` | Port `5432`; user, password and database all `lumen`; data in the `lumen_db_data` volume; healthcheck `pg_isready` |

Apply migrations once the containers are up:

```bash
docker compose exec app alembic upgrade head
```

The API is then at `http://localhost:8000` and `GET /health` returns `{"status": "ok"}`.

The credentials in `docker-compose.yml` are for local development only. Never reuse them.

## The Dockerfile

It copies `pyproject.toml`, `app/`, `alembic/` and `alembic.ini`, installs the package with pip, exposes
port `8000` and runs `uvicorn app.main:app --host 0.0.0.0 --port 8000`.

## Running without Docker

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
uvicorn app.main:app --reload
```

With no `LUMEN_SERVER_DATABASE_URL` it creates `lumen_server.db` in the working directory.

## Production considerations

These are not provided by the repository and must be added by whoever deploys it:

- TLS termination (a reverse proxy) in front of the app.
- Real database credentials and a managed PostgreSQL, with backups.
- Restricting who can reach the service.
- Log and monitoring setup. The server itself performs no telemetry.

## Development checks

```bash
ruff check .
ruff format --check .
mypy .
pytest --cov
```

CI runs the shared Python workflow with these same steps.
