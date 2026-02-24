# Implementation Plan: Backend Endpoint Config

**Branch**: `NDAI-27696-backend-endpoint-config` | **Date**: 2026-02-10 | **Spec**: `./spec.md`  
**Input**: Feature specification from `specs/agent-portal/NDAI-27696-backend-endpoint-config/spec.md`

## Summary

Add a server-owned configuration layer that selects the insurance backend endpoint + API key based on a deploy-time environment identifier, validates required configuration at runtime, and provides a single safe API for the rest of the server code to consume (without leaking secrets to the client).

## Technical Context

**Language/Version**: TypeScript (workspace uses TypeScript ^5)  
**Primary Dependencies**: Next.js App Router (`next` ^16), React (^19), Zod (^3)  
**Storage**: N/A (configuration only; no database)  
**Testing**: Vitest (repo root `yarn test`)  
**Target Platform**: Web (Next.js, Server Components + Server Actions where applicable)  
**Project Type**: Web application in a monorepo (`apps/*`, `packages/*`)  
**Performance Goals**: Backend selection/validation must be constant-time and not add noticeable latency to requests  
**Constraints**: Do not expose secrets to the browser; validate environment variables at startup/boundary; deterministic selection per deployment  
**Scale/Scope**: Stage 1 supports a single service pair only (`APPLICATION_SERVICE_ENDPOINT`, `APPLICATION_SERVICE_API_KEY`) across multiple environments

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Server/client separation**: API keys and backend endpoint selection live in server-only code (`apps/agent-portal/src/server/**`).
- **No secrets leakage**: `APPLICATION_SERVICE_API_KEY` must never be sent to client, logs, analytics, or error messages.
- **Runtime validation**: Environment configuration is validated at the boundary (Zod); missing/invalid config fails closed.
- **Observability**: Emit standardized diagnostic events for environment selection, fallback, and configuration errors (no PII/secrets).

## Project Structure

### Documentation (this feature)

```text
specs/agent-portal/NDAI-27696-backend-endpoint-config/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
apps/
  agent-portal/
    app/                         # Route binding (Server Components)
    src/
      server/
        config/                  # NEW: env + mapping selection + validation (server-only)
        clients/                 # (future) service clients use config
      pages/                     # Screens (client components only)
packages/
  ui/
```

**Structure Decision**: Use the existing Next.js App Router application in `apps/agent-portal`. Environment configuration will be implemented as server-only modules under `apps/agent-portal/src/server/config/**` and consumed by server loaders/actions/clients.

## Complexity Tracking

No constitution violations anticipated for this feature.
