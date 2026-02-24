# Tasks: Backend Endpoint Config

**Input**: Design documents from `specs/agent-portal/NDAI-27696-backend-endpoint-config/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), plus `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Not explicitly requested in the feature spec; focus on implementation tasks only.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the repo has the minimal structure needed for this feature’s server-owned configuration + documentation.

- [x] T001 Create server config directory `apps/agent-portal/src/server/config/` (mkdir + index structure)
- [x] T002 [P] Add placeholder analytics entrypoint `packages/analytics/src/index.ts` (no-op `track()` API, secret-safe by default)
- [x] T003 [P] Add `packages/analytics/tsconfig.json` and ensure the package builds/typings resolve from `packages/analytics/package.json`
- [x] T004 [P] Add `packages/analytics/src/events.ts` defining event name constants for this feature (no payload secrets)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core configuration selection/validation that all user stories depend on.

- [x] T005 Define the deploy-time environment identifier key as `APPLICATION_ENV` and document it in `specs/agent-portal/NDAI-27696-backend-endpoint-config/contracts/README.md` + `quickstart.md`
- [x] T006 Implement environment id parsing/validation in `apps/agent-portal/src/server/config/environment-id.server.ts` (allowed: `dev|stage|uat|preprod|prod`)
- [x] T007 Implement config schema (endpoint URL + API key) in `apps/agent-portal/src/server/config/application-service-env.server.ts` using Zod; ensure failures are “fail closed” and redact secrets
- [x] T008 Implement config selection in `apps/agent-portal/src/server/config/application-service-config.server.ts`:
  - reads `APPLICATION_ENV`, `APPLICATION_SERVICE_ENDPOINT`, `APPLICATION_SERVICE_API_KEY`
  - returns a server-only `ApplicationServiceConfiguration`
  - deterministic selection
- [x] T009 Add a single public export surface in `apps/agent-portal/src/server/config/index.ts` (export only non-secret-safe types + `getApplicationServiceConfig()`)

**Checkpoint**: Foundation ready — other code can reliably obtain the insurance backend endpoint + API key (server-only) for the active environment.

---

## Phase 3: User Story 1 - Deploy the portal to multiple environments safely (Priority: P1) 🎯 MVP

**Goal**: Same portal build routes to the correct insurance backend per deployment environment without code changes.

**Independent Test**: Run the portal twice with different `APPLICATION_ENV` + endpoint/key values and confirm the resolved endpoint differs accordingly (without exposing the key).

- [x] T010 [P] Add a safe diagnostics model in `apps/agent-portal/src/server/config/config-diagnostics.server.ts` (no secrets; includes env id + endpoint host only)
- [x] T011 Implement a minimal backend client wrapper in `apps/agent-portal/src/server/clients/application-service.client.server.ts` that builds requests from `getApplicationServiceConfig()` (API key only in headers)
- [x] T012 Implement a diagnostic route handler `apps/agent-portal/app/api/application-service/config/route.ts` that returns:
  - active `environmentId`
  - selected endpoint (redacted to origin)
  - “configValid” boolean
  - never returns API key
- [x] T013 [P] Add standardized diagnostics events in `packages/analytics/src/events.ts` for:
  - environment selected
  - fallback used
  - config invalid (field-level only)
- [x] T014 Emit diagnostic events from `apps/agent-portal/src/server/config/application-service-config.server.ts` using `@novo/analytics` (no secrets/PII)

**Checkpoint**: US1 complete — operators/developers can verify correct environment routing via a server-only config contract and a safe diagnostic endpoint.

---

## Phase 4: User Story 2 - Local development uses a predictable backend target (Priority: P2)

**Goal**: Local development defaults to a predictable non-production environment behavior without adding a `local` environment.

**Independent Test**: Run locally with `APPLICATION_ENV=dev` and confirm the diagnostic route reports `environmentId=dev` and a non-production endpoint.

- [x] T015 Update local run guidance in `specs/agent-portal/NDAI-27696-backend-endpoint-config/quickstart.md` to recommend `APPLICATION_ENV=dev` for local development
- [x] T016 Implement “missing `APPLICATION_ENV`” behavior in `apps/agent-portal/src/server/config/environment-id.server.ts`:
  - default to `dev` (safe non-production default)
  - emit “fallback used” diagnostic event
- [x] T017 [P] Add a `.env.example` at `apps/agent-portal/.env.example` showing required variables (no real secrets; placeholder values only)

**Checkpoint**: US2 complete — local development is straightforward and consistent with `dev` behavior.

---

## Phase 5: User Story 3 - Operators can detect misconfiguration quickly (Priority: P3)

**Goal**: Missing/invalid config fails closed with clear, safe diagnostics.

**Independent Test**: Start the app with missing endpoint or API key; confirm the diagnostic route reports invalid config and no secret leakage.

- [x] T018 Implement a portal-safe error shape in `apps/agent-portal/src/server/config/config-errors.server.ts` (no secrets, no raw stack traces in responses)
- [x] T019 Update `apps/agent-portal/app/api/application-service/config/route.ts` to return safe error details when config is invalid (which field failed; no values)
- [x] T020 Ensure `apps/agent-portal/src/server/clients/application-service.client.server.ts` fails closed when config is invalid (throws portal-safe error)
- [x] T021 [P] Update `specs/agent-portal/NDAI-27696-backend-endpoint-config/spec.md` edge cases section with the finalized “missing env id defaults to dev” behavior (keep language user-focused)

**Checkpoint**: US3 complete — misconfigurations are quickly detectable and safe.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation consistency and guardrails for future apps/specs.

- [x] T022 [P] Update `.specify/templates/spec-template.md` to reference the preferred layout `specs/<app>/<feature>/...`
- [x] T023 [P] Update `.specify/templates/plan-template.md` to reference the preferred layout `specs/<app>/<feature>/...`
- [x] T024 [P] Update `.specify/templates/tasks-template.md` to reference the preferred layout `specs/<app>/<feature>/...`
- [x] T025 [P] Update `.specify/scripts/bash/create-new-feature.sh --help` output examples to include `--app agent-portal`
- [x] T026 Run the quickstart steps in `specs/agent-portal/NDAI-27696-backend-endpoint-config/quickstart.md` and fix any drift in docs vs reality

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies
- **Foundational (Phase 2)**: depends on Phase 1; **blocks** all user stories
- **US1 (Phase 3)**: depends on Phase 2
- **US2 (Phase 4)**: depends on Phase 2 (can follow US1 or run after Phase 3 if you want MVP first)
- **US3 (Phase 5)**: depends on Phase 2 (best after US1, since it hardens diagnostics)
- **Polish (Phase 6)**: after desired user stories

### User Story Dependencies

- **US1**: depends on Foundational only
- **US2**: depends on Foundational only
- **US3**: depends on Foundational only (and reuses US1 diagnostic route)

### Parallel Opportunities

- Phase 1 tasks marked **[P]** can run in parallel.
- In Phase 3, T010 and T013 can be done in parallel; T011/T012 depend on the foundational config exports.
- In Phase 6, template/doc updates are parallelizable.

---

## Parallel Example: US1

```bash
Task: "Add diagnostics model in apps/agent-portal/src/server/config/config-diagnostics.server.ts"
Task: "Add analytics event constants in packages/analytics/src/events.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 + Phase 2
2. Complete Phase 3 (US1)
3. Validate by hitting `GET /api/application-service/config` in at least two environments

### Incremental Delivery

1. Add US2 defaults/docs for local (`dev`)
2. Add US3 fail-closed + safe error reporting
3. Finish with Phase 6 template/doc polish
