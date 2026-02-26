# Research: NDAI-27811 Initial API Load

**Feature**: `NDAI-27811-init-api-call`  
**Date**: 2026-02-23  
**Source**: [spec.md](./spec.md)

This document captures Phase 0 decisions and rationale so Phase 1 design can be executed without unresolved clarification markers.

## Decisions

### 1) Canonical inbound identifier

- **Decision**: Accept **only** the inbound link’s **encoded payload** as the source of truth for identifying the application/quote to load.
- **Rationale**: Matches current partner flow and reduces ambiguity about which parameter is authoritative.
- **Alternatives considered**:
  - Support `quote_id` query param directly (rejected for this feature scope).
  - Support `applicationId` directly (rejected for this feature scope).

### 2) How to parse the encoded payload

- **Decision**: Treat the encoded payload as **base64/base64url-encoded** UTF-8 text that decodes into a querystring-like format (key/value pairs). Parse decoded text using URLSearchParams.
- **Rationale**: The observed UAT link contains a base64-looking token that decodes into key/value pairs (e.g., contains `policyId=...`, `agentId=...`, etc.). Using URLSearchParams provides deterministic parsing and avoids bespoke string splitting.
- **Alternatives considered**:
  - Treat the payload as JWT (rejected; no evidence it’s a signed token and we do not need client-side validation here).
  - Treat the payload as JSON (rejected; observed shape looks like querystring).

### 3) Payload field used to load the quote/application

- **Decision**: Use the payload’s `policyId` (example name from UAT) as the identifier that maps to the Insurance API’s `quote_id` input for application lookup.
- **Rationale**: The UAT network capture shows `GET /application/v2?quote_id=<id>` where `<id>` matches the payload `policyId` format.
- **Alternatives considered**:
  - Use other payload fields (agent/channel/partner) as primary key (rejected; those are context, not identifiers).

### 4) Local draft conflict behavior

- **Decision**: If the inbound identifier resolves to a different application than the current local draft, **replace** local draft state with inbound application data.
- **Rationale**: Prevents “mixed application” edits and aligns with FR-008/FR-007.
- **Alternatives considered**:
  - Prompt the user to choose (rejected; adds UX complexity).
  - Merge local + inbound (rejected; high risk of data corruption).

### 5) Authorization failures (401/403)

- **Decision**: If the Insurance API indicates the user is not authorized, show **Access denied**, **no retry**, and **do not show any application data**.
- **Rationale**: Avoids leaking any information about the referenced application and avoids useless retry loops.
- **Alternatives considered**:
  - Generic error with retry (rejected; retry won’t fix authorization).

### 6) Retry policy for transient failures

- **Decision**: For transient failures (timeouts/5xx/429), perform **automatic retries up to 2** attempts with exponential backoff. If still failing, show an error state with a **manual Retry** action.
- **Rationale**: Balances resilience with predictable UX. Keeps server dependency flakiness from becoming user toil.
- **Alternatives considered**:
  - No automatic retries (rejected; worse UX for intermittent failures).
  - Unlimited retries (rejected; can hang UX and waste resources).

### 7) Where the Insurance API client lives

- **Decision**: Implement the Insurance API client in `packages/api-client` (`@novo/api-client`) to support future `q2b` usage.
- **Rationale**: Shared boundary + shared typing; avoids duplicating auth headers/retry logic across apps.
- **Alternatives considered**:
  - App-local client in `apps/agent-portal/src/server/clients` (rejected; would require later extraction).

### 8) Axios usage and dependency placement

- **Decision**: Use **latest axios** inside `@novo/api-client`. Apps depend on `@novo/api-client` via workspace dependency, not axios directly.
- **Rationale**: Single HTTP implementation, consistent behavior, simpler dependency management.
- **Alternatives considered**:
  - Use `fetch` in apps (rejected per requirement).
  - Add axios directly to each app (rejected; duplication).

### 9) Server/client separation

- **Decision**: `@novo/api-client` usage that requires `x-api-key` must run **server-side only**. Client components must not call Insurance API directly.
- **Rationale**: Constitution non-negotiable: no secrets to client.
- **Alternatives considered**:
  - Client-side calls with public key (rejected; not acceptable for sensitive operations).

## Notes for Phase 1

- The UI should bind data via a view-model boundary (mapping raw Insurance API application → UI tab view models).
- Observability (events/logging) should be implemented at the app boundary (agent-portal) using `@novo/analytics`; the shared API client should not emit analytics.
