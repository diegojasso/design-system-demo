# Quickstart: Backend Endpoint Config

**Feature**: `NDAI-27696-backend-endpoint-config`

## Goal

Run the Agent Portal locally with a non-production insurance backend target, using the stage-1 configuration keys.

## What you need

- A non-production insurance backend endpoint URL
- A corresponding API key for that environment

## Configure

Provide these values to the portal runtime configuration:

- `APPLICATION_SERVICE_ENDPOINT`
- `APPLICATION_SERVICE_API_KEY`

Also provide the deploy-time environment identifier required by the portal via `APPLICATION_ENV` (must be one of: `dev`, `stage`, `uat`, `preprod`, `prod`).

For **local development**, use `APPLICATION_ENV=dev`.

## Run

From repo root:

```bash
yarn dev
```

## Verify

- The portal starts without configuration errors.
- When a portal flow triggers an insurance-backend-dependent operation, it uses the configured endpoint.
- Diagnostic events (if enabled) do not include secret values.
