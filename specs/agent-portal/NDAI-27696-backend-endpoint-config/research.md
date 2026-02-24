# Research: Backend Endpoint Config

**Feature**: `NDAI-27696-backend-endpoint-config`  
**Date**: 2026-02-10

## Decisions

### Decision 1: How the active environment is selected

- **Decision**: Use a **deploy-time environment identifier** to select the active environment mapping (independent of hostname).
- **Rationale**: Hostname inference is brittle (varies by deploy), while deploy-time selection supports “same build, different environments” reliably.
- **Alternatives considered**:
  - Hostname-based inference (rejected: fragile + harder to test deterministically)
  - Client-side selection (rejected: risks leaking secrets and violates server/client boundary)

### Decision 2: Where configuration values come from

- **Decision**: Read required values from the deployment runtime configuration (environment variables / secret store integration) and validate them on the server.
- **Rationale**: Keeps secrets out of source control and out of the client bundle; aligns with “never expose secrets to the client”.
- **Alternatives considered**:
  - Committing a per-environment config table in code (rejected: would embed secrets)
  - Shipping config to the client (rejected: API key leakage)

### Decision 3: Validation and failure behavior

- **Decision**: Validate configuration at runtime using a schema (URL validity for endpoint; non-empty secret for API key). If invalid/missing, **fail closed** and emit diagnostics without secrets.
- **Rationale**: Prevents accidental calls to unintended backends and reduces operational debugging time.
- **Alternatives considered**:
  - “Best effort” behavior (rejected: increases risk of production misrouting)

### Decision 4: Stage 1 scope (keys supported)

- **Decision**: Only support the insurance backend pair:
  - `APPLICATION_SERVICE_ENDPOINT`
  - `APPLICATION_SERVICE_API_KEY`
- **Rationale**: Matches the feature’s “stage 1” scope and avoids introducing a large multi-key environment matrix prematurely.

## Notes / Open Questions

No blocking open questions for planning; the exact *name* of the deploy-time environment identifier can be finalized during implementation as long as it remains server-only and deterministic.
