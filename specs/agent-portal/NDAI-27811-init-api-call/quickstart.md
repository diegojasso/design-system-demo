# Quickstart: NDAI-27811 Initial API Load

**Feature**: `NDAI-27811-init-api-call`  
**Branch**: `NDAI-27811-init-api-call`

## Prerequisites

- Node.js (repo uses Node 20)
- Yarn workspace install completed

## Environment variables

This feature requires server-side configuration to call the Application API (hosted under `insurance-api.*`).

Set the following in `apps/agent-portal/.env.local` (values shown are examples):

```bash
APPLICATION_SERVICE_ENDPOINT="https://insurance-api.uat.novo.us/"
APPLICATION_SERVICE_API_KEY="REDACTED"
```

## Run locally

From repo root:

```bash
yarn dev
```

## Manual test flow (UAT-like)

1. Open a quote link that contains the encoded payload.
2. Confirm the app:
   - Loads application data using the encoded payload’s identifier
   - Prefills Basic Information, Drivers, Vehicles
   - Replaces local draft state if the inbound application differs
   - Shows Access denied for unauthorized (no retry)
   - Retries transient failures up to 2 times, then shows manual retry

## Troubleshooting

- If the app shows “Access denied”, verify you are authenticated/authorized for the referenced application.
- If loads fail, verify `APPLICATION_SERVICE_ENDPOINT` and `APPLICATION_SERVICE_API_KEY` are set and valid.
