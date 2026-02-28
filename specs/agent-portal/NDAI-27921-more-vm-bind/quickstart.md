# Quickstart: NDAI-27921-more-vm-bind

**Branch**: `NDAI-27921-more-vm-bind`  
**Date**: 2026-02-26  

## Run locally

From repo root:

```bash
yarn dev
```

## Prefill flow (happy path)

1. Navigate to the prefill entry route: `apps/agent-portal/src/app/initial-info/page.tsx`
2. Provide an encoded payload query string (the first query segment), which is posted to the internal API route:
   - `POST /api/application-prefill` (`apps/agent-portal/src/app/api/application-prefill/route.ts`)
3. On success, the app should create a new quote draft (or load an existing one) and route to `/?quote=<quoteId>`.

## What to verify for this feature

- **Incidents**:
  - If upstream incidents exist, the Incidents step is pre-filled.
  - If not, Incidents shows the default empty incident form.
- **Reports**:
  - Reports step shows bound report summary data when present.
  - Reports step shows a clear empty state when absent (no placeholder text).
- **Coverage/Pricing**:
  - Coverage selections are pre-filled when provided upstream.
  - Pricing is displayed from bound data and is **not directly editable**.
  - After changing coverages, price does **not** change until “Recalculate/Update Price” is triggered.

## Tests

```bash
yarn test
```

If Storybook tests are used for UI regression:

```bash
yarn test:storybook
```
