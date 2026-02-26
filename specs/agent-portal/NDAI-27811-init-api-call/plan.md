# Implementation Plan: NDAI-27811 Initial API Load

**Branch**: `NDAI-27811-init-api-call` | **Date**: 2026-02-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/agent-portal/NDAI-27811-init-api-call/spec.md`

## Summary

Add an initial server-side API load that reads the inbound encoded payload, loads the corresponding Insurance application, and binds it into UI view models for Basic Information, Drivers, and Vehicles. Implement the Insurance API client in `@novo/api-client` (axios-based) for future reuse by `q2b`, and expose a portal-internal prefill boundary that returns only the minimal view models needed by the UI.

## Technical Context

**Language/Version**: TypeScript (Next.js 16 / React 19)  
**Primary Dependencies**: Next.js App Router, Zod, React Hook Form, `@novo/ui`, `@novo/analytics`, axios (via `@novo/api-client`)  
**Storage**: Browser localStorage for drafts (existing); no backend persistence in this repo  
**Testing**: Vitest (unit + Storybook integration), Storybook  
**Target Platform**: Web (Next.js)  
**Project Type**: Web application (monorepo: `apps/*` + `packages/*`)  
**Performance Goals**: Users see populated Basic Information within 2 seconds for successful loads (SC-001)  
**Constraints**: No secrets to client; server/client separation; no PII in logs/analytics; transient failures retry policy (FR-010)  
**Scale/Scope**: 1 new shared package surface area (`@novo/api-client`) + 1 portal internal prefill boundary + mapping layer for 3 tabs

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Pass**: Server/client separation — Insurance API calls occur server-side only; client binds via view models.
- **Pass**: No secrets to client — `x-api-key` remains server-only.
- **Pass**: Boundary validation — inbound encoded payload is validated/parsed at boundary (Zod).
- **Pass**: Observability — errors and key actions emit standardized events; no PII.
- **Pass**: Performance — avoid blocking interactions; loading state + bounded retries.

## Project Structure

### Documentation (this feature)

```text
specs/agent-portal/NDAI-27811-init-api-call/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
apps/
  agent-portal/
    src/
      app/
        api/                     # internal route boundary (server-only)
      server/
        config/                  # env parsing + validation for Insurance API
        loaders/                 # view-model builders for screens/tabs
      shared/                    # view-model mappers (no secrets)
      features/components/       # existing UI tabs consume QuoteContext
packages/
  api-client/
    src/                         # Insurance API client + types (axios)
  analytics/
  ui/
```

**Structure Decision**: Use the existing monorepo layout. Implement the Insurance API wrapper in `packages/api-client`, and keep all secret-bearing configuration and server-side request boundaries within `apps/agent-portal/src/server/**` and `apps/agent-portal/src/app/api/**`. Implement view-model mapping as a dedicated layer between the server boundary and UI tabs.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) |  |  |
