# Tasks: More view-model binding (Incidents, Reports, Coverage/Pricing)

**Input**: Design documents from `specs/agent-portal/NDAI-27921-more-vm-bind/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`  

**Tests**: Not explicitly requested in `spec.md`; this task list focuses on implementation + manual verification steps.

**Ownership note**: Tasks that require changes under `apps/agent-portal/src/features/components/**` are **DEFERRED (Designer/UI)**. Engineering work in this Jira focuses on server/loaders, view models, internal API routes, and draft persistence/binding.

**Decision update (2026-02-27)**: **Defer `quote-context` local draft persistence + “one-time prefill” behavior**. Upstream is the source of truth on reload/revisit (future: quote lock mechanism + upstream write-back). Tasks that implement `localStorage` draft behavior are now deferred/superseded.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align on artifacts and ensure baseline wiring points are understood.

- [x] T001 Review `specs/agent-portal/NDAI-27921-more-vm-bind/spec.md` clarifications and ensure plan constraints are reflected in code changes (one-time prefill, pricing recalc button, reports view-only, no upstream write-back)
- [x] T002 Review existing prefill entry flow in `apps/agent-portal/src/app/initial-info/page.tsx` and internal route `apps/agent-portal/src/app/api/application-prefill/route.ts` to confirm where additional view models must be threaded through
- [x] T003 [P] Review existing UI steps to be changed: `apps/agent-portal/src/features/components/reports/reports-page.tsx`, `apps/agent-portal/src/features/components/coverage/coverage-form.tsx`, `apps/agent-portal/src/features/components/coverage/pricing-summary.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data plumbing and persistence that all user stories depend on.

**⚠️ NOTE**: Draft persistence is deferred. Foundational work should focus on view-model binding and internal API routes only.

- [ ] T004 **DEFERRED (quote lock)** Persist Reports model to local drafts in `apps/agent-portal/src/app/quote-context.tsx` (`StoredQuote` + `localStorage`)
- [x] T005 [P] Define a concrete reports type for the quote workflow (e.g., `ThirdPartyReports` summary) by creating `apps/agent-portal/src/shared/third-party-reports.ts` and reusing/aligning with `ImportSummaryData["thirdPartyReports"]` shape
- [x] T006 Extend prefill normalized model and view models in `apps/agent-portal/src/shared/application-prefill-vm.ts` to include optional `incidents`, `reports`, `coverage`, `pricing` (per `specs/agent-portal/NDAI-27921-more-vm-bind/data-model.md`)
- [x] T007 Update `apps/agent-portal/src/server/loaders/application-prefill-loader.server.ts` to optionally extract incidents/reports/coverage/pricing from the upstream Application response, while keeping applicant/drivers/vehicles strict and returning portal-safe errors
- [x] T008 Update `apps/agent-portal/src/app/initial-info/page.tsx` `PrefillApiResponse` typing and `prefillFromApplication(...)` invocation to pass through new optional view-model fields
- [x] T009 Update `prefillFromApplication` signature and implementation in `apps/agent-portal/src/app/quote-context.tsx` to accept the expanded view models and initialize in-memory quote state (no persistence)
- [ ] T010 **DEFERRED (quote lock)** Implement the **one-time prefill rule** backed by persisted drafts (do not overwrite agent edits across reloads)
- [x] T034 Add internal API route `POST /api/application-prefill-by-quote` so the app can fetch the latest upstream view models by `quoteId` (no encoded payload required)
- [x] T035 Update `apps/agent-portal/src/app/quote-context.tsx` quote loading to fetch upstream view models on page load/revisit (instead of `localStorage`)

**Checkpoint**: Prefill can create a new draft with expanded view models, and subsequent visits/reloads do not overwrite agent edits.

---

## Phase 3: User Story 1 - Review imported Incidents/Reports/Coverage (Priority: P1) 🎯 MVP

**Goal**: When upstream provides incidents, reports, and coverage/pricing, show them pre-filled for review.

**Independent Test**: Load an upstream-prefilled quote and confirm Incidents/Reports/Coverage display bound values without manual entry.

- [x] T011 [US1] Add Application Quote calculation API to `@novo/api-client` by extending `packages/api-client/src/application/application-api.client.ts` with `calculateQuote(...)` calling `POST /application/v2/{application_uuid}/quote`
- [x] T012 [US1] Ensure Incidents bind from `quoteData.incidents` by validating the prefill mapping in `apps/agent-portal/src/shared/application-prefill-vm.ts` produces `Incident[]` compatible with `apps/agent-portal/src/features/components/incidents/types.ts`
- [ ] T013 [US1] **DEFERRED (Designer/UI)** Replace placeholder Reports UI in `apps/agent-portal/src/features/components/reports/reports-page.tsx` to render `quoteData.reports` (view-only) when present
- [ ] T014 [US1] **DEFERRED (Designer/UI)** Ensure Reports are view-only by not exposing any editing controls in `apps/agent-portal/src/features/components/reports/reports-page.tsx` and only reading from `quoteData.reports`
- [ ] T015 [US1] **DEFERRED (Designer/UI)** Update Coverage initialization behavior in `apps/agent-portal/src/features/components/coverage/coverage-form.tsx` so `quoteData.coverage` and `quoteData.pricing` are used as initial state when present (no fallback to defaults when upstream provided values exist)
- [ ] T016 [US1] **DEFERRED (Designer/UI)** Change pricing display behavior in `apps/agent-portal/src/features/components/coverage/pricing-summary.tsx` to display stored/bound `pricing` values (read-only) rather than continuously calculating pricing from `calculatePlanPricing(...)` when upstream pricing is present
- [ ] T017 [US1] **DEFERRED (Designer/UI)** Add an explicit “Recalculate/Update Price” action in `apps/agent-portal/src/features/components/coverage/pricing-summary.tsx` that triggers a pricing refresh
- [x] T018 [US1] Add a new internal API route `apps/agent-portal/src/app/api/quote-pricing-recalculate/route.ts` implementing `POST /api/quote-pricing-recalculate` per `contracts/openapi/agent-portal/quote-pricing-recalc.openapi.yaml` (request validation via Zod for `quoteId`, `coverage`, `partner`, `source`, `participation_option`; portal-safe errors; no VIN/premium/coverage details in logs or analytics)
- [x] T019 [US1] Implement `/api/quote-pricing-recalculate` by calling `createApplicationApiClient(...).calculateQuote(...)` (uses upstream `POST /application/v2/{application_uuid}/quote`) and mapping the response into `PricingSummary` / coverage selections as needed
- [ ] T020 [US1] **DEFERRED (Designer/UI)** Wire the “Recalculate/Update Price” button to call `/api/quote-pricing-recalculate` and on success update pricing via `updatePricing(...)`

**Checkpoint**: US1 is complete when all three steps show bound values and pricing updates only after explicit recalc.

---

## Phase 4: User Story 2 - Graceful fallback when upstream data is missing (Priority: P2)

**Goal**: When incidents/reports/coverage/pricing are missing upstream, the workflow remains usable with clear empty/default states.

**Independent Test**: Load a quote with only vehicles (no incidents, reports, or coverage/pricing) and confirm each step behaves as specified.

- [x] T021 [US2] Confirm Incidents default behavior remains: `apps/agent-portal/src/features/components/incidents/incidents-page.tsx` shows `createEmptyIncident()` when `quoteData.incidents` is missing/empty
- [ ] T022 [US2] **DEFERRED (Designer/UI)** Add a clear empty state to `apps/agent-portal/src/features/components/reports/reports-page.tsx` when `quoteData.reports` is absent (must not show placeholder copy implying data exists)
- [x] T023 [US2] Confirm Coverage defaults still apply when no upstream coverage/pricing exists by verifying `apps/agent-portal/src/features/components/coverage/coverage-form.tsx` falls back to defaults only in that case
- [x] T024 [US2] Ensure upstream schema mismatches for optional sections do not fail the entire prefill by making incidents/reports/coverage/pricing extraction in `apps/agent-portal/src/server/loaders/application-prefill-loader.server.ts` best-effort with safe fallbacks

**Checkpoint**: US2 is complete when missing upstream data never blocks navigation and UI states are clear.

---

## Phase 5: User Story 3 - Agent edits stay stable after pre-fill (Priority: P3)

**Goal**: After pre-fill, edits persist across navigation/reload and are never overwritten by upstream prefill.

**Independent Test**: Edit one incident field and one coverage selection, navigate away/back, refresh page, and confirm values remain.

- [ ] T025 [US3] **DEFERRED (quote lock)** Persist `reports` (and any new fields) so reports survive refresh
- [ ] T026 [US3] **DEFERRED (quote lock)** Enforce one-time prefill across reloads (depends on persisted drafts + locking)
- [ ] T027 [US3] **DEFERRED (Designer/UI)** Add a “pricing may be out of date” indicator in `apps/agent-portal/src/features/components/coverage/pricing-summary.tsx` after coverage selections change, until “Recalculate/Update Price” succeeds (per spec edge case)
- [ ] T028 [US3] **DEFERRED (Designer/UI)** Ensure pricing does not auto-update on selection changes by removing/guarding any continuous recalculation behavior in `apps/agent-portal/src/features/components/coverage/pricing-summary.tsx` when in upstream-priced mode
- [x] T029 [US3] Validate Incidents CRUD works with prefilled incidents in `apps/agent-portal/src/features/components/incidents/incidents-page.tsx` (prefilled rows render; add new; remove existing; removing last leaves one empty incident; autosave persists; no overwrite from prefill)

**Checkpoint**: US3 is complete when edits are stable and prefill never overwrites stored drafts.

---

## Final Phase: Polish & Cross-Cutting Concerns

- [x] T030 [P] Add standardized analytics event names for pricing recalculation in `packages/analytics/src/events.ts` (no PII; standardized event names)
- [ ] T033 **DEFERRED (Designer/UI)** Wire pricing recalculation analytics events from the coverage UI components using `@novo/analytics` (no PII)
- [x] T031 Update documentation artifacts if code-level decisions diverge: `specs/agent-portal/NDAI-27921-more-vm-bind/research.md`, `data-model.md`, and contracts YAMLs
- [ ] T032 Run the manual verification steps in `specs/agent-portal/NDAI-27921-more-vm-bind/quickstart.md` and confirm all acceptance scenarios in `spec.md` are satisfied (depends on DEFERRED UI tasks)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1; blocks all user stories
- **US1 (Phase 3)**: Depends on Phase 2
- **US2 (Phase 4)**: Depends on Phase 3 (primarily on the presence of the new bindings)
- **US3 (Phase 5)**: Depends on Phase 2 and overlaps with Phase 3 (one-time prefill + persistence)
- **Polish**: After US1–US3

### Parallel Opportunities

- Phase 2: T004 and T005 can be done in parallel; T006 and T007 can be started in parallel once types are agreed.
- Phase 3: UI work (Reports/Coverage) can run in parallel with server loader updates once shared view-model contracts are set.

---

## Parallel Example: User Story 1

```bash
# In parallel once Phase 2 view models are defined:
Task: "Update Reports step UI in apps/agent-portal/src/features/components/reports/reports-page.tsx"
Task: "Update Coverage pricing UI in apps/agent-portal/src/features/components/coverage/pricing-summary.tsx"
Task: "Extend upstream normalization in apps/agent-portal/src/server/loaders/application-prefill-loader.server.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2 (Foundational) including one-time prefill (T010).
2. Complete US1 (Phase 3) to bind and display incidents/reports/coverage/pricing.
3. Validate with manual checks from `quickstart.md`.

### Incremental Delivery

1. US1: Bind + display for imported quotes
2. US2: Strong empty/fallback states
3. US3: Stability guarantees and stale-price indicator

