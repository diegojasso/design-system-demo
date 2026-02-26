# Tasks: NDAI-27811 Initial API Load

**Input**: Design documents from `specs/agent-portal/NDAI-27811-init-api-call/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), plus `research.md`, `data-model.md`, `contracts/`, `quickstart.md`  
**Tests**: Not explicitly requested in spec → no dedicated test tasks included (ok to add later).

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure shared package + portal wiring foundations exist for implementation.

- [x] T001 Create `packages/api-client/src/` and `packages/api-client/src/index.ts`
- [x] T002 Add axios dependency to `packages/api-client/package.json`
- [x] T003 Add `@novo/api-client` workspace dependency to `apps/agent-portal/package.json`
- [x] T004 [P] Create `packages/api-client/README.md` documenting server-only usage + configuration inputs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

- [x] T005 Use existing Application Service config (`APPLICATION_SERVICE_ENDPOINT` / `APPLICATION_SERVICE_API_KEY`) for upstream calls
- [x] T006 [P] Ensure env parsing + validation exists in `apps/agent-portal/src/server/config/application-service-env.server.ts`
- [x] T007 Ensure config accessor exists in `apps/agent-portal/src/server/config/application-service-config.server.ts`
- [x] T008 Ensure Application Service config is exported from `apps/agent-portal/src/server/config/index.ts`
- [x] T009 [P] Ensure portal-safe config error mapping exists in `apps/agent-portal/src/server/config/config-errors.server.ts` (Application Service)
- [x] T010 Implement encoded payload extraction helper in `apps/agent-portal/src/server/loaders/inbound-payload.server.ts`
- [x] T011 Implement payload decode+parse in `apps/agent-portal/src/server/loaders/decode-inbound-payload.server.ts` (base64/base64url + URLSearchParams)
- [x] T012 Implement shared view-model mapper in `apps/agent-portal/src/shared/application-prefill-vm.ts` (Application → `{ basicInfo, drivers, vehicles }`)
- [x] T013 Define standardized analytics events in `packages/analytics/src/events.ts` for prefill load lifecycle (start/success/failure/accessDenied)
- [x] T014 Export analytics events from `packages/analytics/src/index.ts`

**Checkpoint**: Foundation ready (config, payload parsing, VM mapping, analytics events).

---

## Phase 3: User Story 1 - Load application and prefill tabs (Priority: P1) 🎯 MVP

**Goal**: Opening an inbound quote link triggers initial load and binds Basic Information, Drivers, Vehicles.

**Independent Test**: Open `/initial-info?<encodedPayload>` and confirm the app loads, binds view models, then shows the quote workflow with prefilled tabs.

- [x] T015 [P] Create axios instance factory in `packages/api-client/src/http/create-axios.ts` (timeouts, baseURL support, header injection)
- [x] T016 [P] Add Application API types in `packages/api-client/src/application/types.ts` (minimal shapes needed for mapping)
- [x] T017 Implement Application API client in `packages/api-client/src/application/application-api.client.ts` (methods for endpoints used by flow)
- [x] T018 Export client + types from `packages/api-client/src/index.ts`
- [x] T019 Implement portal internal prefill route in `apps/agent-portal/src/app/api/application-prefill/route.ts` (matches `contracts/portal-application-prefill.openapi.yaml`)
- [x] T020 In `apps/agent-portal/src/app/api/application-prefill/route.ts`, validate request with Zod and ensure responses never include secrets/PII
- [x] T021 Implement server loader orchestration in `apps/agent-portal/src/server/loaders/application-prefill-loader.server.ts` (payload → quoteId → Application API calls → VM)
- [x] T022 Implement `initial-info` route page in `apps/agent-portal/src/app/initial-info/page.tsx` (client page with loading screen + triggers prefill)
- [x] T023 In `apps/agent-portal/src/app/initial-info/page.tsx`, call `/api/application-prefill` with `encodedPayload` derived from `location.search.slice(1)`
- [x] T024 Add QuoteContext action `prefillFromApplication` in `apps/agent-portal/src/app/quote-context.tsx` (bind basicInfo/drivers/vehicles + persist)
- [x] T025 Update `apps/agent-portal/src/app/initial-info/page.tsx` to invoke `prefillFromApplication` then navigate to `/`
- [x] T026 Emit analytics events from `apps/agent-portal/src/app/initial-info/page.tsx` (start/success/failure; no PII)

**Checkpoint**: US1 works end-to-end with correct prefill binding.

---

## Phase 4: User Story 2 - Handle load failures with retry (Priority: P2)

**Goal**: Friendly error state; automatic retries (max 2) for transient failures; manual retry if still failing; access denied for unauthorized.

**Independent Test**: Simulate transient failure and confirm 2 automatic retries occur, then manual retry shows; simulate 403 and confirm access denied with no retry and no data.

- [x] T027 [P] Add retry utility in `packages/api-client/src/http/retry.ts` (exponential backoff policy for transient errors)
- [x] T028 Add retry integration in `packages/api-client/src/application/application-api.client.ts` (apply policy to relevant calls)
- [x] T029 Add AccessDenied error mapping in `apps/agent-portal/src/app/api/application-prefill/route.ts` (403 → stable error code + message)
- [x] T030 Add malformed payload handling in `apps/agent-portal/src/app/api/application-prefill/route.ts` (400 → stable error code + message)
- [x] T031 Add transient error response handling in `apps/agent-portal/src/app/initial-info/page.tsx` (error UI + manual retry button)
- [x] T032 Ensure access denied UI in `apps/agent-portal/src/app/initial-info/page.tsx` (no retry, no data)
- [x] T033 Add “retry now” action in `apps/agent-portal/src/app/initial-info/page.tsx` that re-calls `/api/application-prefill`
- [x] T034 Emit analytics failure events (error codes only) from `apps/agent-portal/src/app/initial-info/page.tsx`

**Checkpoint**: US2 behaviors match FR-009/FR-010 and the Clarifications.

---

## Phase 5: User Story 3 - Refresh/return to link consistently reloads state (Priority: P3)

**Goal**: Refreshing/revisiting the same inbound link reliably reloads the same application and shows consistent state.

**Independent Test**: Load via `/initial-info?<encodedPayload>`, navigate away, refresh, and confirm same application loads again.

- [x] T035 Ensure `/initial-info` path is stable and does not depend on previously bound local draft in `apps/agent-portal/src/app/initial-info/page.tsx`
- [x] T036 Ensure QuoteContext replacement semantics are enforced in `apps/agent-portal/src/app/quote-context.tsx` (FR-008: replace, do not merge)
- [x] T037 Ensure reloading `/initial-info` triggers prefill again even if quote draft exists in localStorage (no mixed-application state)

**Checkpoint**: US3 is consistent across refresh/revisit.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, safety checks, consistency with constitution.

- [x] T038 Update `specs/agent-portal/NDAI-27811-init-api-call/quickstart.md` if any env names/paths change during implementation
- [x] T039 Confirm contract alignment: update `specs/agent-portal/NDAI-27811-init-api-call/contracts/portal-application-prefill.openapi.yaml` if response shape changes
- [x] T040 Ensure no secrets/PII are logged or tracked (review `apps/agent-portal/src/app/initial-info/page.tsx` + route handler)
- [x] T041 [P] Add minimal inline docs to `packages/api-client/src/application/application-api.client.ts` for intended server-only usage
- [x] T042 Run through `specs/agent-portal/NDAI-27811-init-api-call/quickstart.md` manually and confirm it matches behavior

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → must complete before Foundational.
- **Foundational (Phase 2)** → blocks all user stories.
- **US1 (Phase 3)** → MVP, builds the happy path.
- **US2 (Phase 4)** → layers robust failure handling + retry policy.
- **US3 (Phase 5)** → ensures refresh/revisit correctness and replacement semantics.
- **Polish (Phase 6)** → cross-cutting verification + docs.

### Parallel Opportunities

- **Phase 1**: T002–T004 can be parallelized with minimal overlap.
- **Phase 2**: T006, T009, T013 can run in parallel.
- **US1**: T015–T018 can be parallelized; T019–T025 is mostly sequential.
- **US2**: T027 and T029–T032 can be parallelized.
